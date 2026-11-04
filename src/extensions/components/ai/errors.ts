// What went wrong with an AI request, to explain it in the dialog (`ai.errors.<kind>`)
export type AiErrorKind = 'network' | 'auth' | 'not_found' | 'timeout' | 'rate_limit' | 'unavailable' | 'request' | 'other'

// The messages browsers give a fetch that never got a response: the service is down, unreachable, or CORS
// blocked the answer (the browser hides which; its console tells)
const FAILED_FETCH = /^(failed to fetch|networkerror when attempting to fetch resource\.?|load failed|fetch failed)$/i

// The text backend.ts gives a failed response without a message of its own
const STATUS_ONLY = /^Request failed with status \d+$/

function statusOf(error: unknown): number | null {
  const status = (error as { status?: unknown } | null)?.status

  return typeof status === 'number' ? status : null
}

/**
 * The kind of a failed AI request: a failed fetch, the HTTP status of the response (backend.ts sets
 * `status` on its errors; a custom `aiProvider` may throw an error with `status` too), or a timeout.
 */
export function aiErrorKind(error: unknown): AiErrorKind {
  // A DOMException (AbortSignal.timeout) is not an Error everywhere
  if ((error as { name?: unknown } | null)?.name === 'TimeoutError') {
    return 'timeout'
  }

  if (error instanceof TypeError && FAILED_FETCH.test(error.message.trim())) {
    return 'network'
  }

  const status = statusOf(error)
  if (status === null) {
    return 'other'
  }

  if (status === 401 || status === 403) {
    return 'auth'
  }

  if (status === 404) {
    return 'not_found'
  }

  if (status === 408 || status === 504) {
    return 'timeout'
  }

  if (status === 429) {
    return 'rate_limit'
  }

  return status >= 500 ? 'unavailable' : 'request'
}

/**
 * The message of the service (or of a custom provider) shown after the explanation; empty when it only
 * repeats the status or the browser's network message.
 */
export function aiErrorDetail(error: unknown): string {
  if (!(error instanceof Error) || aiErrorKind(error) === 'network') {
    return ''
  }

  const message = error.message.trim()

  return STATUS_ONLY.test(message) ? '' : message
}
