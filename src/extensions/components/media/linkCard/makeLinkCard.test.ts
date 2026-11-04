import { afterEach, describe, expect, it, vi } from 'vitest'
import { makeLinkCard } from '@tiptapify/extensions/components/media/linkCard/makeLinkCard'

const preview = {
  url: 'https://news.example.com/a',
  title: 'Title',
  description: 'Description',
  image: 'https://cdn.example.com/og.jpg',
  siteName: 'News',
}

describe('makeLinkCard', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('makes a card of the page data', async () => {
    const card = await makeLinkCard('https://news.example.com/a', { fetchPreview: async () => preview, upload: null })

    expect(card).toEqual({
      href: 'https://news.example.com/a',
      title: 'Title',
      description: 'Description',
      image: 'https://cdn.example.com/og.jpg',
      siteName: 'News',
      layout: 'compact',
      newTab: true,
    })
  })

  it('keeps the address typed by the author, not the one the endpoint resolved', async () => {
    const card = await makeLinkCard('https://news.example.com/a?utm=1', {
      fetchPreview: async () => ({ ...preview, url: 'https://news.example.com/a' }),
      upload: null,
      newTab: false,
      layout: 'large',
    })

    expect(card).toMatchObject({ href: 'https://news.example.com/a?utm=1', newTab: false, layout: 'large' })
  })

  it('stores the page image with the upload of the editor: a page may change or drop it', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(new Response(new Blob(['png'], { type: 'image/png' })))))
    const upload = vi.fn(async (file: File) => ({ url: `https://media.example.com/${file.name}` }))

    const card = await makeLinkCard('https://news.example.com/a', { fetchPreview: async () => preview, upload })

    expect(upload).toHaveBeenCalledWith(expect.any(File), expect.objectContaining({ kind: 'image' }))
    expect(card.image).toBe('https://media.example.com/og.jpg')
  })

  it('keeps the page image link when the image can not be read or stored', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new TypeError('CORS'))))
    const upload = vi.fn()

    const card = await makeLinkCard('https://news.example.com/a', { fetchPreview: async () => preview, upload })

    expect(upload).not.toHaveBeenCalled()
    expect(card.image).toBe('https://cdn.example.com/og.jpg')
  })
})
