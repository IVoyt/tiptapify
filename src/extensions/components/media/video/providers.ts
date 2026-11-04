export type VideoProviderName = 'youtube' | 'vimeo' | 'file'

export type VideoSize = { width: number | null, height: number | null }

export type VideoNodeContent = { type: string, attrs: Record<string, unknown> }

export interface VideoProvider {
  name: VideoProviderName
  label: string
  // Whether the player can start at a given time (shows the "Start at" field)
  supportsStart: boolean
  // The editor node the provider's videos are stored in
  nodeType: string
  // The video id from a parsed link, or null when the link is not this provider's
  parseId: (url: URL) => string | null
  // The player URL for the preview
  embedUrl: (id: string, start: number) => string
  toNode: (id: string, start: number, size: VideoSize) => VideoNodeContent
}

// `label` is the badge of the dialog: the provider name, or the format of a video file (MP4)
export type VideoLink = { provider: VideoProvider, id: string, start: number, label: string }

const youtubeHosts = ['youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtube-nocookie.com']

const youtube: VideoProvider = {
  name: 'youtube',
  label: 'YouTube',
  supportsStart: true,
  nodeType: 'youtube',
  parseId(url) {
    const host = url.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      return url.pathname.match(/^\/([\w-]+)/)?.[1] ?? null
    }

    if (!youtubeHosts.includes(host)) {
      return null
    }

    if (url.pathname === '/watch') {
      return url.searchParams.get('v')?.match(/^[\w-]+$/)?.[0] ?? null
    }

    return url.pathname.match(/^\/(?:shorts|embed|live|v)\/([\w-]+)/)?.[1] ?? null
  },
  embedUrl: (id, start) => `https://www.youtube-nocookie.com/embed/${id}${start ? `?start=${start}` : ''}`,
  // The youtube node builds the (nocookie) player URL itself from a watch link and its start
  toNode: (id, start, size) => ({
    type: 'youtube',
    attrs: { src: `https://www.youtube.com/watch?v=${id}`, start, ...size },
  }),
}

const vimeo: VideoProvider = {
  name: 'vimeo',
  label: 'Vimeo',
  supportsStart: true,
  nodeType: 'iframe',
  parseId(url) {
    const host = url.hostname.replace(/^www\./, '')

    if (host === 'vimeo.com') {
      return url.pathname.match(/^\/(\d+)(?:\/|$)/)?.[1] ?? null
    }

    if (host === 'player.vimeo.com') {
      return url.pathname.match(/^\/video\/(\d+)/)?.[1] ?? null
    }

    return null
  },
  embedUrl: (id, start) => `https://player.vimeo.com/video/${id}${start ? `#t=${start}s` : ''}`,
  // Vimeo has no node of its own: it is stored as a plain iframe with the player URL
  toNode: (id, start, size) => ({
    type: 'iframe',
    attrs: { src: vimeo.embedUrl(id, start), ...size },
  }),
}

// A new provider is added here; the dialog's badge shows its label
export const videoProviders: VideoProvider[] = [youtube, vimeo]

const videoFileRegex = /\.(mp4|m4v|webm|ogv|ogg|mov)$/i

/**
 * A link straight to a video file, played by the browser's own player (the `video` node). Its `id` is the
 * file address as typed, without the `#t=` start: an absolute http(s) link, a protocol-relative `//host`
 * or a path on the site. A protocol is never guessed: `cdn.example.com/a.mp4` could be http or https.
 */
export const videoFileProvider: VideoProvider = {
  name: 'file',
  label: '',
  supportsStart: true,
  nodeType: 'video',
  parseId(url) {
    return videoFileRegex.test(url.pathname) ? url.href.replace(/#.*$/, '') : null
  },
  embedUrl: (id, start) => `${id}${start ? `#t=${start}` : ''}`,
  toNode: (id, start, size) => ({ type: 'video', attrs: { src: id, start, ...size } }),
}

// A video file address typed without a protocol (`cdn.example.com/a.mp4`): the dialog asks for one
export function isVideoFileWithoutProtocol(input: string): boolean {
  const value = input.trim()

  return !/^[a-z][a-z\d+.-]*:|^\//i.test(value) && videoFileRegex.test(value.replace(/[?#].*$/, ''))
}

function parseVideoFile(input: string): VideoLink | null {
  const value = input.trim()

  if (!/^(https?:)?\/\/\S+$|^\/\S+$/i.test(value)) {
    return null
  }

  // A base only to read the path and the fragment of a relative address; the address itself is kept as typed
  const url = new URL(value, 'https://relative.invalid')
  const extension = url.pathname.match(videoFileRegex)?.[1]

  if (!extension) {
    return null
  }

  return {
    provider: videoFileProvider,
    id: value.replace(/#.*$/, ''),
    start: parseUrlStart(url),
    label: extension.toUpperCase(),
  }
}

function toUrl(input: string): URL | null {
  const value = input.trim()

  if (!value) {
    return null
  }

  try {
    // Links pasted without a scheme ("youtu.be/…") are common
    return new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`)
  } catch {
    return null
  }
}

/**
 * Seconds from a link time value: "42", "42s", "1m2s", "1h2m3s"; 0 when it is not one.
 */
function parseDuration(value: string | null): number {
  const match = value?.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/)

  if (!match) {
    return 0
  }

  const [, hours, minutes, seconds] = match

  return Number(hours ?? 0) * 3600 + Number(minutes ?? 0) * 60 + Number(seconds ?? 0)
}

/**
 * The start time a link carries: `?t=42`, `?t=1m2s`, `?start=42` or `#t=42`; 0 when there is none.
 */
export function parseUrlStart(url: URL): number {
  const hashTime = new URLSearchParams(url.hash.replace(/^#/, '')).get('t')

  return parseDuration(url.searchParams.get('t'))
    || parseDuration(url.searchParams.get('start'))
    || parseDuration(hashTime)
}

/**
 * The provider, video id and start time of a link; null when no provider recognizes it.
 */
export function parseVideoUrl(input: string): VideoLink | null {
  const file = parseVideoFile(input)

  if (file) {
    return file
  }

  const url = toUrl(input)

  if (!url) {
    return null
  }

  for (const provider of videoProviders) {
    const id = provider.parseId(url)

    if (id) {
      return { provider, id, start: provider.supportsStart ? parseUrlStart(url) : 0, label: provider.label }
    }
  }

  return null
}

/**
 * Seconds from a time typed in the dialog ("1:30", "1:02:03" or plain seconds); 0 for an empty
 * value and null for an invalid one.
 */
export function parseTimecode(value: string): number | null {
  const trimmed = value.trim()

  if (!trimmed) {
    return 0
  }

  if (!/^\d+(?::\d{1,2}){0,2}$/.test(trimmed)) {
    return null
  }

  const parts = trimmed.split(':').map(Number)

  // Every part after the first is a minute or a second part
  if (parts.slice(1).some(part => part > 59)) {
    return null
  }

  return parts.reduce((total, part) => total * 60 + part, 0)
}

/**
 * "m:ss" or "h:mm:ss" for seconds; an empty string for 0.
 */
export function formatTimecode(seconds: number): string {
  if (!seconds || seconds < 0) {
    return ''
  }

  const whole = Math.floor(seconds)
  const hours = Math.floor(whole / 3600)
  const minutes = Math.floor((whole % 3600) / 60)
  const secs = String(whole % 60).padStart(2, '0')

  return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${secs}` : `${minutes}:${secs}`
}
