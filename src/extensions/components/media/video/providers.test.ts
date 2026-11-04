import { describe, expect, it } from 'vitest'
import {
  formatTimecode,
  isVideoFileWithoutProtocol,
  parseTimecode,
  parseVideoUrl,
  videoProviders,
} from '@tiptapify/extensions/components/media/video/providers'

function link(input: string) {
  const parsed = parseVideoUrl(input)

  return parsed && { provider: parsed.provider.name, id: parsed.id, start: parsed.start }
}

describe('video providers', () => {
  it.each([
    ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
    ['https://m.youtube.com/watch?v=dQw4w9WgXcQ&list=PL1', 'dQw4w9WgXcQ'],
    ['https://youtu.be/dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
    ['youtu.be/dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
    ['https://www.youtube.com/shorts/abc_-123', 'abc_-123'],
    ['https://www.youtube.com/embed/dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
    ['https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
  ])('recognizes the YouTube link %s', (input, id) => {
    expect(link(input)).toEqual({ provider: 'youtube', id, start: 0 })
  })

  it.each([
    ['https://vimeo.com/76979871', '76979871'],
    ['https://player.vimeo.com/video/76979871', '76979871'],
  ])('recognizes the Vimeo link %s', (input, id) => {
    expect(link(input)).toEqual({ provider: 'vimeo', id, start: 0 })
  })

  it.each([
    'https://example.com/video.html',
    'https://www.youtube.com/',
    'https://www.youtube.com/watch',
    'https://vimeo.com/channels',
    'https://notyoutube.com/watch?v=dQw4w9WgXcQ',
    'not a link',
    '',
  ])('does not recognize %s', (input) => {
    expect(parseVideoUrl(input)).toBeNull()
  })

  it.each([
    ['https://youtu.be/dQw4w9WgXcQ?t=42', 42],
    ['https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1m2s', 62],
    ['https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1h0m5s', 3605],
    ['https://www.youtube.com/embed/dQw4w9WgXcQ?start=90', 90],
    ['https://www.youtube.com/watch?v=dQw4w9WgXcQ#t=42', 42],
    ['https://vimeo.com/76979871#t=42s', 42],
    ['https://player.vimeo.com/video/76979871#t=1m30s', 90],
  ])('reads the start time of %s', (input, start) => {
    expect(parseVideoUrl(input)?.start).toBe(start)
  })

  it('builds the preview player URLs', () => {
    const [youtube, vimeo] = videoProviders

    expect(youtube.embedUrl('abc', 0)).toBe('https://www.youtube-nocookie.com/embed/abc')
    expect(youtube.embedUrl('abc', 42)).toBe('https://www.youtube-nocookie.com/embed/abc?start=42')
    expect(vimeo.embedUrl('123', 0)).toBe('https://player.vimeo.com/video/123')
    expect(vimeo.embedUrl('123', 42)).toBe('https://player.vimeo.com/video/123#t=42s')
  })

  it('stores YouTube as a youtube node and Vimeo as an iframe', () => {
    const [youtube, vimeo] = videoProviders

    expect(youtube.toNode('abc', 42, { width: null, height: null })).toEqual({
      type: 'youtube',
      attrs: { src: 'https://www.youtube.com/watch?v=abc', start: 42, width: null, height: null },
    })
    expect(vimeo.toNode('123', 5, { width: 640, height: 360 })).toEqual({
      type: 'iframe',
      attrs: { src: 'https://player.vimeo.com/video/123#t=5s', width: 640, height: 360 },
    })
  })
})

describe('timecodes', () => {
  it.each([
    ['', 0],
    ['  ', 0],
    ['42', 42],
    ['1:30', 90],
    ['0:05', 5],
    ['1:02:03', 3723],
  ])('parses "%s" as %i seconds', (input, seconds) => {
    expect(parseTimecode(input)).toBe(seconds)
  })

  it.each(['1:60', '1:61:00', 'abc', '1:2:3:4', '-5', '1.5', '1:'])('rejects "%s"', (input) => {
    expect(parseTimecode(input)).toBeNull()
  })

  it.each([
    [0, ''],
    [5, '0:05'],
    [90, '1:30'],
    [3723, '1:02:03'],
  ])('formats %i seconds as "%s"', (seconds, text) => {
    expect(formatTimecode(seconds)).toBe(text)
  })
})

describe('video file links', () => {
  it.each([
    ['https://www.w3schools.com/tags/mov_bbb.mp4', 'https://www.w3schools.com/tags/mov_bbb.mp4', 'MP4'],
    ['http://intranet/media/clip.webm?v=2', 'http://intranet/media/clip.webm?v=2', 'WEBM'],
    ['/media/clip.ogv', '/media/clip.ogv', 'OGV'],
    ['//cdn.example.com/a.MOV', '//cdn.example.com/a.MOV', 'MOV'],
  ])('%s is a video file played by the <video> node', (input, src, label) => {
    const link = parseVideoUrl(input)!

    expect(link.provider.nodeType).toBe('video')
    expect(link.label).toBe(label)
    expect(link.provider.toNode(link.id, 0, { width: null, height: null })).toEqual({
      type: 'video',
      attrs: { src, start: 0, width: null, height: null },
    })
  })

  it('takes the start from the #t= fragment and keeps it out of the src', () => {
    const link = parseVideoUrl('https://cdn.example.com/a.mp4#t=42')!

    expect([link.id, link.start]).toEqual(['https://cdn.example.com/a.mp4', 42])
    expect(link.provider.embedUrl(link.id, 42)).toBe('https://cdn.example.com/a.mp4#t=42')
  })

  it('never guesses a protocol for a file link', () => {
    expect(parseVideoUrl('cdn.example.com/a.mp4')).toBeNull()
    expect(isVideoFileWithoutProtocol('cdn.example.com/a.mp4')).toBe(true)
    expect(isVideoFileWithoutProtocol('https://cdn.example.com/a.mp4')).toBe(false)
    expect(isVideoFileWithoutProtocol('youtu.be/dQw4w9WgXcQ')).toBe(false)
  })

  it('is not a video file without a video extension', () => {
    expect(parseVideoUrl('https://example.com/page.html')).toBeNull()
    expect(parseVideoUrl('https://example.com/mp4')).toBeNull()
  })

  it('labels the embedded players with the provider name', () => {
    expect(parseVideoUrl('https://youtu.be/dQw4w9WgXcQ')!.label).toBe('YouTube')
  })
})
