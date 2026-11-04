import { TiptapifyLinkPreviewData, TiptapifyLinkPreviewOptions } from '@tiptapify/types/editor'

// The version of the endpoint contract: the handshake answers `{ "tiptapifyLinkPreview": 1 }`
export const LINK_PREVIEW_CONTRACT = 1

const PREVIEW_FIELDS = ['title', 'description', 'image', 'siteName'] as const

// One handshake per endpoint for all the editors of the page
const checks = new Map<string, Promise<boolean>>()

function requestInit(options: TiptapifyLinkPreviewOptions, signal?: AbortSignal): RequestInit {
  return { method: 'GET', headers: { Accept: 'application/json', ...options.headers }, signal }
}

async function handshake(options: TiptapifyLinkPreviewOptions): Promise<boolean> {
  try {
    const response = await fetch(options.endpoint, requestInit(options))
    if (response.status !== 200) {
      return false
    }

    const body = await response.json()

    return body?.tiptapifyLinkPreview === LINK_PREVIEW_CONTRACT
  } catch {
    return false
  }
}

/**
 * Whether the endpoint answers the link preview contract: a GET without a url answers
 * `200 { "tiptapifyLinkPreview": 1 }` and fetches no page. A plain 200 or 204 proves nothing (a SPA
 * fallback or a login page answers 200 too). The answer is kept for the page; a failed endpoint is
 * asked again only on `recheckFailed` (it may be up by now).
 */
export async function checkLinkPreview(
  options: TiptapifyLinkPreviewOptions,
  { recheckFailed = false }: { recheckFailed?: boolean } = {},
): Promise<boolean> {
  const cached = checks.get(options.endpoint)
  if (cached && !(recheckFailed && !(await cached))) {
    return cached
  }

  const check = handshake(options)
  checks.set(options.endpoint, check)

  return check
}

export function resetLinkPreviewChecks(): void {
  checks.clear()
}

function previewUrl(endpoint: string, url: string): string {
  return `${endpoint}${endpoint.includes('?') ? '&' : '?'}url=${encodeURIComponent(url)}`
}

/**
 * The OpenGraph data of a page: `GET {endpoint}?url=<page>` answers `200 { url, title, description,
 * image, siteName }` (all but `url` optional), or an error with `{ error }`. Empty fields are dropped.
 */
export async function fetchLinkPreview(
  options: TiptapifyLinkPreviewOptions,
  url: string,
  signal?: AbortSignal,
): Promise<TiptapifyLinkPreviewData> {
  const response = await fetch(previewUrl(options.endpoint, url), requestInit(options, signal))
  const body = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(typeof body?.error === 'string' && body.error ? body.error : `${response.status} ${response.statusText}`.trim())
  }

  const preview: TiptapifyLinkPreviewData = { url: typeof body?.url === 'string' && body.url ? body.url : url }
  for (const field of PREVIEW_FIELDS) {
    const value = typeof body?.[field] === 'string' ? body[field].trim() : ''
    if (value) {
      preview[field] = value
    }
  }

  return preview
}
