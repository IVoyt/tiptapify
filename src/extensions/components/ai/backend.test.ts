import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TiptapifyAiEditorContext, TiptapifyAiRequest, TiptapifyAiStream } from '@tiptapify/types/editor'

import { buildAiBackendRequest, createAiBackendProvider, DEFAULT_AI_INSTRUCTION } from './backend'

function createContext(overrides: Partial<TiptapifyAiEditorContext> = {}): TiptapifyAiEditorContext {
  return {
    prompt: 'Improve this text',
    selectedText: '',
    text: '',
    html: '',
    json: {},
    mode: 'insert',
    ...overrides,
  }
}

function createRequest(overrides: Partial<TiptapifyAiRequest> = {}): TiptapifyAiRequest {
  return {
    messages: [
      { role: 'system', content: 'Be concise' },
      { role: 'user', content: 'Improve this text' },
    ],
    ...overrides,
  }
}

function createStream() {
  const controller = new AbortController()
  const chunks: string[] = []
  const reasoning: string[] = []

  const stream: TiptapifyAiStream = {
    signal: controller.signal,
    onChunk: (chunk: string) => chunks.push(chunk),
    onReasoning: (chunk: string) => reasoning.push(chunk),
  }

  return { stream, chunks, reasoning, controller }
}

function createSseBody(lines: string[], { failAfter = -1 } = {}) {
  let index = 0

  return {
    getReader() {
      return {
        async read() {
          if (failAfter >= 0 && index > failAfter) {
            throw new DOMException('The operation was aborted', 'AbortError')
          }

          index += 1

          if (index <= lines.length) {
            return { done: false, value: new TextEncoder().encode(lines[index - 1]) }
          }

          return { done: true, value: undefined }
        },
      }
    },
  } as unknown as ReadableStream<Uint8Array>
}

function createResponse(init: { status?: number, body?: string, sse?: string[], sseFailAfter?: number } = {}) {
  const status = init.status ?? 200

  return {
    ok: status >= 200 && status < 300,
    status,
    body: init.sse ? createSseBody(init.sse, { failAfter: init.sseFailAfter }) : null,
    text: async () => (init.body ?? ''),
  } as unknown as Response
}

let fetchCalls: Array<{ url: string, init: RequestInit | undefined }>
let responseToReturn: Response | null

beforeEach(() => {
  fetchCalls = []
  responseToReturn = null

  vi.stubGlobal('fetch', vi.fn(async (url: string, init: RequestInit) => {
    fetchCalls.push({ url, init })

    return responseToReturn as Response
  }))
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('buildAiBackendRequest', () => {
  it('always sends prompt and instruction', () => {
    const payload = buildAiBackendRequest(createRequest(), createContext())

    expect(payload).toEqual({
      prompt: 'Improve this text',
      instruction: 'Be concise',
    })
  })

  it('falls back to the default instruction when there is no system message', () => {
    const request = createRequest({ messages: [{ role: 'user', content: 'x' }] })

    expect(buildAiBackendRequest(request, createContext()).instruction).toBe(DEFAULT_AI_INSTRUCTION)
  })

  it('sends optional fields only when they are set', () => {
    const payload = buildAiBackendRequest(
      createRequest({ model: 'gpt-4.1-mini', stream: true, enable_thinking: true, reasoning_effort: 'high' }),
      createContext(),
    )

    expect(payload).toEqual({
      prompt: 'Improve this text',
      instruction: 'Be concise',
      model: 'gpt-4.1-mini',
      stream: true,
      thinking: true,
      reasoning_effort: 'high',
    })
  })

  it('omits thinking when it is not enabled', () => {
    const payload = buildAiBackendRequest(createRequest({ enable_thinking: false }), createContext())

    expect(payload.thinking).toBeUndefined()
  })

  it('omits reasoning_effort for default or non-string values', () => {
    expect(buildAiBackendRequest(createRequest({ reasoning_effort: 'default' }), createContext()).reasoning_effort).toBeUndefined()
    expect(buildAiBackendRequest(createRequest({ reasoning_effort: 5 }), createContext()).reasoning_effort).toBeUndefined()
  })
})

describe('createAiBackendProvider', () => {
  it('posts the minimal payload as JSON to the endpoint', async () => {
    responseToReturn = createResponse({ body: JSON.stringify({ content: 'Done' }) })
    const provider = createAiBackendProvider({ endpoint: '/api/ai/generate' })

    await provider(createRequest({ model: 'gpt-4.1-mini', stream: true }), createContext())

    expect(fetchCalls).toHaveLength(1)
    expect(fetchCalls[0].url).toBe('/api/ai/generate')
    const init = fetchCalls[0].init as RequestInit

    expect(init.method).toBe('POST')
    expect((init.headers as Record<string, string>)['Content-Type']).toBe('application/json')
    expect(JSON.parse(init.body as string)).toEqual({
      prompt: 'Improve this text',
      instruction: 'Be concise',
      model: 'gpt-4.1-mini',
      stream: true,
    })
  })

  it('returns a JSON response body', async () => {
    responseToReturn = createResponse({ body: JSON.stringify({ content: 'Done' }) })
    const result = await createAiBackendProvider({ endpoint: '/api' })(createRequest(), createContext())

    expect(result).toEqual({ content: 'Done' })
  })

  it('returns a plain text response body', async () => {
    responseToReturn = createResponse({ body: 'Plain answer' })
    const result = await createAiBackendProvider({ endpoint: '/api' })(createRequest(), createContext())

    expect(result).toBe('Plain answer')
  })

  it('throws the backend error message on a non-OK response', async () => {
    responseToReturn = createResponse({ status: 500, body: JSON.stringify({ error: 'Model is busy' }) })
    const provider = createAiBackendProvider({ endpoint: '/api' })

    await expect(provider(createRequest(), createContext())).rejects.toThrow('Model is busy')
  })

  it('throws a status error when the error body is not JSON', async () => {
    responseToReturn = createResponse({ status: 502 })
    const provider = createAiBackendProvider({ endpoint: '/api' })

    await expect(provider(createRequest(), createContext())).rejects.toThrow('Request failed with status 502')
  })

  it('sends static headers and the tokenProvider token as Bearer', async () => {
    responseToReturn = createResponse({ body: 'ok' })
    const provider = createAiBackendProvider({
      endpoint: '/api',
      headers: { 'X-Api-Key': 'key' },
      tokenProvider: () => 'secret',
    })

    await provider(createRequest(), createContext())
    const headers = (fetchCalls[0].init as RequestInit).headers as Record<string, string>

    expect(headers['Content-Type']).toBe('application/json')
    expect(headers['X-Api-Key']).toBe('key')
    expect(headers.Authorization).toBe('Bearer secret')
  })

  it('keeps a static Authorization header over the tokenProvider token', async () => {
    responseToReturn = createResponse({ body: 'ok' })
    const provider = createAiBackendProvider({
      endpoint: '/api',
      headers: { Authorization: 'Token abc' },
      tokenProvider: () => 'secret',
    })

    await provider(createRequest(), createContext())
    const headers = (fetchCalls[0].init as RequestInit).headers as Record<string, string>

    expect(headers.Authorization).toBe('Token abc')
  })

  it('streams OpenAI-style SSE deltas into onChunk/onReasoning', async () => {
    responseToReturn = createResponse({
      sse: [
        'data: {"choices":[{"delta":{"reasoning_content":"Let me"}}]}\n',
        'data: {"choices":[{"delta":{"reasoning_content":" think"}}]}\n',
        'data: {"choices":[{"delta":{"content":"Hello"}}]}\n',
        'data: {"choices":[{"delta":{"content":" world"}}]}\n',
        'data: [DONE]\n',
      ],
    })
    const { stream, chunks, reasoning } = createStream()
    const provider = createAiBackendProvider({ endpoint: '/api' })
    const result = await provider(createRequest({ stream: true }), createContext(), stream)

    expect(chunks).toEqual(['Hello', ' world'])
    expect(reasoning).toEqual(['Let me', ' think'])
    expect(result).toEqual({ content: 'Hello world' })
    expect((fetchCalls[0].init as RequestInit).signal).toBe(stream.signal)
  })

  it('accepts the simple { type, data } chunk format', async () => {
    responseToReturn = createResponse({
      sse: [
        'data: {"type":"reasoning","data":"plan"}\n',
        'data: {"type":"content","data":"One "}\n',
        'data: {"type":"content","data":"two"}\n',
      ],
    })
    const { stream, chunks, reasoning } = createStream()
    const result = await createAiBackendProvider({ endpoint: '/api' })(createRequest({ stream: true }), createContext(), stream)

    expect(chunks).toEqual(['One ', 'two'])
    expect(reasoning).toEqual(['plan'])
    expect(result).toEqual({ content: 'One two' })
  })

  it('treats plain-text data lines as content chunks', async () => {
    responseToReturn = createResponse({
      sse: [
        'data: Hello \n',
        'data: world\n',
      ],
    })
    const { stream, chunks } = createStream()
    const result = await createAiBackendProvider({ endpoint: '/api' })(createRequest({ stream: true }), createContext(), stream)

    expect(chunks).toEqual(['Hello ', 'world'])
    expect(result).toEqual({ content: 'Hello world' })
  })

  it('reassembles chunks split across reader reads', async () => {
    responseToReturn = createResponse({
      sse: [
        'data: {"choices":[{"delta":{"conte',
        'nt":"Hel"}}]}\n',
        'data: {"choices":[{"delta":{"content":"lo"}}]}\n',
        'data: [DONE]\n',
      ],
    })
    const { stream, chunks } = createStream()
    const result = await createAiBackendProvider({ endpoint: '/api' })(createRequest({ stream: true }), createContext(), stream)

    expect(chunks).toEqual(['Hel', 'lo'])
    expect(result).toEqual({ content: 'Hello' })
  })

  it('keeps partially streamed content when the request is aborted', async () => {
    responseToReturn = createResponse({ sse: ['data: {"choices":[{"delta":{"content":"Part"}}]}\n'], sseFailAfter: 0 })
    const { stream, chunks } = createStream()
    const provider = createAiBackendProvider({ endpoint: '/api' })
    const result = await provider(createRequest({ stream: true }), createContext(), stream)

    expect(chunks).toEqual(['Part'])
    expect(result).toEqual({ content: 'Part' })
  })

  it('falls back to a plain body when the backend ignores stream', async () => {
    responseToReturn = createResponse({ sse: ['{"content":"Full answer"}\n'] })
    const { stream } = createStream()
    const result = await createAiBackendProvider({ endpoint: '/api' })(createRequest({ stream: true }), createContext(), stream)

    expect(result).toEqual({ content: 'Full answer' })
  })

  it('returns empty content when only reasoning was streamed', async () => {
    responseToReturn = createResponse({
      sse: [
        'data: {"choices":[{"delta":{"reasoning_content":"think"}}]}\n',
        'data: [DONE]\n',
      ],
    })
    const { stream } = createStream()
    const result = await createAiBackendProvider({ endpoint: '/api' })(createRequest({ stream: true }), createContext(), stream)

    expect(result).toEqual({ content: '' })
  })
})