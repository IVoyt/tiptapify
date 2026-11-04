import { describe, expect, it } from 'vitest'
import {
  iframeStyle,
  parsedFields,
  parseEmbedInput,
  pixelSize,
  sizeFromAttrs,
  sizeToAttrs,
  srcError,
} from '@tiptapify/extensions/components/media/iframe/embed'

describe('embed input', () => {
  it('takes a plain address as it is', () => {
    expect(parseEmbedInput('  https://example.com/embed  ')).toEqual({ kind: 'url', src: 'https://example.com/embed' })
    expect(parseEmbedInput(' ')).toEqual({ kind: 'empty' })
  })

  it('reads a pasted iframe code', () => {
    const code = `<iframe src="https://www.google.com/maps/embed?pb=1" width="600" height="450" style="border:0;"
      allowfullscreen="" loading="lazy" title="Office map" allow="geolocation" referrerpolicy="no-referrer"></iframe>`

    expect(parseEmbedInput(code)).toEqual({
      kind: 'code',
      iframe: {
        src: 'https://www.google.com/maps/embed?pb=1',
        width: 600,
        height: 450,
        title: 'Office map',
        allow: 'geolocation',
        loading: 'lazy',
        allowfullscreen: true,
        border: false,
      },
    })
  })

  it('reads the deprecated frameborder and an empty sandbox', () => {
    const input = parseEmbedInput('<iframe src="https://a.example/x" frameborder="1" sandbox name="frame"></iframe>')

    expect(input).toMatchObject({ kind: 'code', iframe: { border: true, sandbox: '', name: 'frame', allowfullscreen: false } })
  })

  it('takes the iframe out of a responsive wrapper box', () => {
    const code = '<div style="position:relative;padding-bottom:56%"><iframe src="https://www.loom.com/embed/1"></iframe></div>'

    expect(parseEmbedInput(code)).toMatchObject({ kind: 'code', iframe: { src: 'https://www.loom.com/embed/1' } })
  })

  it('ignores a size in percent', () => {
    const input = parseEmbedInput('<iframe src="https://a.example/x" width="100%" height="450"></iframe>')

    expect(input.kind === 'code' && input.iframe.width).toBeUndefined()
    expect(pixelSize('100%')).toBeNull()
    expect(pixelSize('640px')).toBe(640)
  })

  it.each([
    ['a script', '<iframe src="https://a.example/x"></iframe><script src="https://a.example/x.js"></script>'],
    ['a leading script', '<script>alert(1)</script><iframe src="https://a.example/x"></iframe>'],
    ['two iframes', '<iframe src="https://a.example/x"></iframe><iframe src="https://a.example/y"></iframe>'],
    ['text around', '<iframe src="https://a.example/x"></iframe><p>By <a href="https://a.example">A</a></p>'],
    ['no iframe', '<blockquote class="twitter-tweet"></blockquote>'],
    ['no address', '<iframe width="600"></iframe>'],
  ])('rejects a code with %s', (_, code) => {
    expect(parseEmbedInput(code)).toEqual({ kind: 'invalid_code' })
  })

  it('lists what the code filled', () => {
    const fields = parsedFields({ src: 'https://a.example/x', width: 600, height: 450, allowfullscreen: true, sandbox: '' })

    expect(fields).toEqual([
      { key: 'parsed_src' },
      { key: 'parsed_size', params: { width: 600, height: 450 } },
      { key: 'parsed_sandbox' },
      { key: 'parsed_fullscreen' },
    ])
  })
})

describe('embed address', () => {
  it('needs a web address with its protocol', () => {
    expect(srcError('https://example.com/embed?a=1')).toBeNull()
    expect(srcError('http://intranet/embed')).toBeNull()
    expect(srcError('')).toBe('required')
  })

  it.each(['example.com/embed', '//example.com/embed', 'localhost:8080/embed'])('asks for the protocol of %s', (src) => {
    expect(srcError(src)).toBe('protocol')
  })

  it.each(['javascript:alert(1)', 'mailto:a@b.c', '/embed/page', 'ftp://example.com/file', 'https://exa mple.com'])(
    'rejects %s',
    (src) => {
      expect(srcError(src)).toBe('invalid')
    },
  )
})

describe('embed size', () => {
  it('stores each size mode and reads it back', () => {
    const known = { width: 600, height: 450 }

    for (const mode of ['responsive', '16:9', '4:3', '1:1'] as const) {
      expect(sizeFromAttrs(sizeToAttrs(mode, { width: null, height: null }, known)).mode).toBe(mode)
    }

    expect(sizeFromAttrs(sizeToAttrs('custom', { width: 800, height: 600 }, known))).toEqual({ mode: 'custom', width: 800, height: 600 })
    expect(sizeToAttrs('responsive', { width: null, height: null }, known)).toEqual({ ratio: 'auto', width: 600, height: 450 })
  })

  it('reads old content with a width and a height as custom, without a size as responsive', () => {
    expect(sizeFromAttrs({ ratio: null, width: '640', height: 360 } as never)).toEqual({ mode: 'custom', width: 640, height: 360 })
    expect(sizeFromAttrs({ ratio: null, width: null, height: null }).mode).toBe('responsive')
  })

  it('renders the proportions and the border as a style', () => {
    expect(iframeStyle({ ratio: 'auto', width: 600, height: 450, border: false }))
      .toBe('width: 100%; height: auto; aspect-ratio: 600 / 450; border: 0;')
    expect(iframeStyle({ ratio: 'auto', width: null, height: null, border: false })).toContain('aspect-ratio: 16 / 9')
    expect(iframeStyle({ ratio: '4:3', width: null, height: null, border: false })).toContain('aspect-ratio: 4 / 3')
    expect(iframeStyle({ ratio: null, width: 640, height: 360, border: true })).toBe('border: 1px solid rgba(128, 128, 128, 0.5);')
  })
})
