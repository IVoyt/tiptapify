import {
  TiptapifyAiBackendProviderOptions,
  TiptapifyAiBackendRequest,
  TiptapifyAiEditorContext,
  TiptapifyAiOpenAiResponse,
  TiptapifyAiProvider,
  TiptapifyAiReasoningEffort,
  TiptapifyAiRequest,
  TiptapifyAiResponse,
  TiptapifyAiStream,
  TiptapifyAiTokenProvider,
} from '@tiptapify/types/editor'

/**
 * The instruction used when the AI options do not set a `systemPrompt`.
 * Shared between the dialog's default messages and the backend provider
 * (the `instruction` field of the backend payload).
 */
export const DEFAULT_AI_INSTRUCTION = 'You are an AI writing assistant inside a rich text editor. Return only the final text to insert.'

/**
 * Builds the minimal backend payload from the OpenAI-compatible request the
 * dialog assembles.
 *
 * `prompt` (the user's request) and `instruction` (the system prompt, or the
 * built-in default) are always present. `stream`, `thinking`,
 * `reasoning_effort`, and `model` are included only when they are set.
 */
export function buildAiBackendRequest(request: TiptapifyAiRequest, context: TiptapifyAiEditorContext): TiptapifyAiBackendRequest {
  const systemMessage = request.messages.find(message => message.role === 'system')
  const payload: TiptapifyAiBackendRequest = {
    prompt: context.prompt,
    instruction: typeof systemMessage?.content === 'string' ? systemMessage.content : DEFAULT_AI_INSTRUCTION,
  }

  if (request.model) {
    payload.model = request.model
  }

  if (request.stream === true) {
    payload.stream = true
  }

  if (request.enable_thinking === true) {
    payload.thinking = true
  }

  const reasoningEffort = request.reasoning_effort
  if (typeof reasoningEffort === 'string' && reasoningEffort !== '' && reasoningEffort !== 'default') {
    payload.reasoning_effort = reasoningEffort as TiptapifyAiReasoningEffort
  }

  return payload
}

/**
 * Creates a `TiptapifyAiProvider` that posts the minimal payload
 * (`prompt` + `instruction` + optional fields) to a backend LLM endpoint.
 *
 * The response is lenient: a plain string, a `{ content }` object, or an
 * OpenAI-compatible `choices` payload are all accepted. When the request has
 * `stream: true`, the body is read as an SSE stream (`data:` lines,
 * terminated by `data: [DONE]`); OpenAI-style deltas
 * (`choices[0].delta.content` / `.reasoning_content`), a simple
 * `{ type: 'content' | 'reasoning', data }` chunk, a flat
 * `{ content, reasoning_content }` chunk, and plain-text `data` lines are
 * all accepted.
 */
export function createAiBackendProvider(options: TiptapifyAiBackendProviderOptions): TiptapifyAiProvider {
  const { endpoint, headers, tokenProvider } = options

  return async function aiBackendProvider(request, context, stream) {
    const payload = buildAiBackendRequest(request, context)
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: await buildBackendHeaders(headers, tokenProvider),
      body: JSON.stringify(payload),
      signal: stream?.signal,
    })

    if (!response.ok) {
      throw await createBackendError(response)
    }

    if (payload.stream !== true || !response.body) {
      return parseBackendResponse(await response.text())
    }

    const { content, raw, aborted } = await readSseBody(response.body, stream)

    if (aborted) {
      // The user stopped the request — keep what has been streamed so far
      return { content }
    }

    // Lenient: the backend may ignore `stream` and answer with a plain body
    if (content === '' && raw.trim() !== '') {
      const trimmedRaw = raw.trim()
      try {
        return JSON.parse(trimmedRaw)
      } catch {
        if (!trimmedRaw.includes('data:')) {
          return trimmedRaw
        }
      }
    }

    return { content }
  }
}

async function buildBackendHeaders(headers: Record<string, string> | undefined, tokenProvider?: TiptapifyAiTokenProvider): Promise<Record<string, string>> {
  const result: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  }

  if (tokenProvider && !result.Authorization) {
    const token = await tokenProvider()
    if (token) {
      result.Authorization = `Bearer ${token}`
    }
  }

  return result
}

async function createBackendError(response: Response): Promise<Error> {
  const body = await response.text()
  let message = body

  try {
    const parsed = JSON.parse(body) as Record<string, unknown>
    const error = parsed.error

    if (typeof error === 'string') {
      message = error
    } else if (error && typeof error === 'object' && typeof (error as Record<string, unknown>).message === 'string') {
      message = (error as Record<string, unknown>).message as string
    } else if (typeof parsed.message === 'string') {
      message = parsed.message
    }
  } catch {
    // Keep the raw body
  }

  return new Error(message || `Request failed with status ${response.status}`)
}

function parseBackendResponse(text: string): TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string {
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

type SseReadResult = {
  content: string,
  raw: string,
  aborted: boolean,
}

async function readSseBody(body: ReadableStream<Uint8Array>, stream?: TiptapifyAiStream): Promise<SseReadResult> {
  const result: SseReadResult = { content: '', raw: '', aborted: false }
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }

      const chunk = decoder.decode(value, { stream: true })
      result.raw += chunk
      buffer += chunk
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        result.content += parseSseLine(line, stream)
      }
    }

    const tail = decoder.decode()
    if (tail) {
      result.raw += tail
      buffer += tail
    }

    if (buffer) {
      result.content += parseSseLine(buffer, stream)
    }
  } catch (error) {
    if (stream?.signal.aborted || isAbortError(error)) {
      result.aborted = true
      return result
    }
    throw error
  }

  return result
}

/**
 * Parses a single SSE line and forwards its content/reasoning chunks to the
 * stream callbacks. Returns the portion dispatched as content so the caller
 * can accumulate the full response.
 */
function parseSseLine(line: string, stream?: TiptapifyAiStream): string {
  const trimmed = line.replace(/\r$/, '')

  if (!trimmed.startsWith('data:')) {
    return ''
  }

  const data = trimmed.slice(5).trimStart()

  if (data === '' || data.trim() === '[DONE]') {
    return ''
  }

  let payload: unknown

  try {
    payload = JSON.parse(data)
  } catch {
    // A plain-text data line is a content chunk
    if (stream) {
      stream.onChunk(data)
    }
    return data
  }

  if (typeof payload === 'string') {
    if (stream) {
      stream.onChunk(payload)
    }
    return payload
  }

  if (typeof payload !== 'object' || payload === null) {
    return ''
  }

  const record = payload as Record<string, unknown>

  // Simple chunk format: { type: 'content' | 'reasoning', data: '...' }
  if (typeof record.data === 'string') {
    if (record.type === 'reasoning') {
      if (stream) {
        stream.onReasoning(record.data)
      }
      return ''
    }

    if (stream) {
      stream.onChunk(record.data)
    }
    return record.data
  }

  // OpenAI-compatible chunk: choices[0].delta.content / .reasoning_content
  const choice = Array.isArray(record.choices) ? record.choices[0] : null
  const delta = choice !== null && typeof choice === 'object' ? (choice as Record<string, unknown>).delta : undefined

  if (delta && typeof delta === 'object' && delta !== null) {
    const deltaRecord = delta as Record<string, unknown>
    let content = ''

    if (typeof deltaRecord.reasoning_content === 'string' && deltaRecord.reasoning_content !== '') {
      stream?.onReasoning(deltaRecord.reasoning_content)
    }

    if (typeof deltaRecord.content === 'string' && deltaRecord.content !== '') {
      stream?.onChunk(deltaRecord.content)
      content = deltaRecord.content
    }

    return content
  }

  // Flat chunk format: { content, reasoning_content }
  let content = ''

  if (typeof record.reasoning_content === 'string' && record.reasoning_content !== '') {
    stream?.onReasoning(record.reasoning_content)
  }

  if (typeof record.content === 'string' && record.content !== '') {
    stream?.onChunk(record.content)
    content = record.content
  }

  return content
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}