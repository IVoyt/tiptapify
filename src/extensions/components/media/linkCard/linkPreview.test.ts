import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  checkLinkPreview,
  fetchLinkPreview,
  resetLinkPreviewChecks,
} from '@tiptapify/extensions/components/media/linkCard/linkPreview'

function respond(status: number, body: unknown) {
  return Promise.resolve(new Response(typeof body === 'string' ? body : JSON.stringify(body), { status }))
}

describe('link preview endpoint', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    resetLinkPreviewChecks()
  })

  it('is available when the handshake answers the tiptapify contract', async () => {
    const fetch = vi.fn(() => respond(200, { tiptapifyLinkPreview: 1 }))
    vi.stubGlobal('fetch', fetch)

    expect(await checkLinkPreview({ endpoint: '/api/link-preview', headers: { 'X-Key': 'k' } })).toBe(true)
    expect(fetch).toHaveBeenCalledWith('/api/link-preview', expect.objectContaining({
      method: 'GET',
      headers: expect.objectContaining({ Accept: 'application/json', 'X-Key': 'k' }),
    }))
  })

  it.each([
    ['any page answering 200', 200, '<!doctype html><html></html>'],
    ['an empty 204', 204, ''],
    ['another JSON', 200, { ok: true }],
    ['another version of the contract', 200, { tiptapifyLinkPreview: 2 }],
    ['an error', 500, { error: 'down' }],
  ])('is not available for %s', async (_, status, body) => {
    vi.stubGlobal('fetch', vi.fn(() => respond(status as number, body)))

    expect(await checkLinkPreview({ endpoint: '/api/link-preview' })).toBe(false)
  })

  it('is not available when the endpoint can not be reached', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new TypeError('Failed to fetch'))))

    expect(await checkLinkPreview({ endpoint: '/api/link-preview' })).toBe(false)
  })

  it('checks an endpoint once for all the editors of the page', async () => {
    const fetch = vi.fn(() => respond(200, { tiptapifyLinkPreview: 1 }))
    vi.stubGlobal('fetch', fetch)

    await Promise.all([checkLinkPreview({ endpoint: '/a' }), checkLinkPreview({ endpoint: '/a' }), checkLinkPreview({ endpoint: '/a' })])

    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('checks a failed endpoint again when asked: it may be up by now', async () => {
    const fetch = vi.fn()
      .mockReturnValueOnce(respond(503, ''))
      .mockReturnValueOnce(respond(200, { tiptapifyLinkPreview: 1 }))
    vi.stubGlobal('fetch', fetch)

    expect(await checkLinkPreview({ endpoint: '/a' })).toBe(false)
    expect(await checkLinkPreview({ endpoint: '/a' })).toBe(false)
    expect(await checkLinkPreview({ endpoint: '/a' }, { recheckFailed: true })).toBe(true)
    expect(fetch).toHaveBeenCalledTimes(2)
  })

  it('gets the preview of a page with the url as a query parameter', async () => {
    const fetch = vi.fn(() => respond(200, {
      url: 'https://news.example.com/a',
      title: ' Title ',
      description: 'Description',
      image: 'https://news.example.com/og.jpg',
      siteName: 'News',
      extra: 'ignored',
    }))
    vi.stubGlobal('fetch', fetch)

    const preview = await fetchLinkPreview({ endpoint: '/api/link-preview?lang=uk' }, 'https://news.example.com/a?x=1&y=2')

    expect(fetch.mock.calls[0][0]).toBe('/api/link-preview?lang=uk&url=https%3A%2F%2Fnews.example.com%2Fa%3Fx%3D1%26y%3D2')
    expect(preview).toEqual({
      url: 'https://news.example.com/a',
      title: 'Title',
      description: 'Description',
      image: 'https://news.example.com/og.jpg',
      siteName: 'News',
    })
  })

  it('keeps only the fields it got: they are optional', async () => {
    vi.stubGlobal('fetch', vi.fn(() => respond(200, { url: 'https://a.example', title: 'A', image: '' })))

    expect(await fetchLinkPreview({ endpoint: '/p' }, 'https://a.example')).toEqual({ url: 'https://a.example', title: 'A' })
  })

  it('fails with the error of the endpoint', async () => {
    vi.stubGlobal('fetch', vi.fn(() => respond(422, { error: 'The page does not answer' })))

    await expect(fetchLinkPreview({ endpoint: '/p' }, 'https://a.example')).rejects.toThrow('The page does not answer')
  })
})
