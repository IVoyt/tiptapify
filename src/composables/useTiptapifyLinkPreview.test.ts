import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { createLinkPreviewState } from '@tiptapify/composables/useTiptapifyLinkPreview'
import { resetLinkPreviewChecks } from '@tiptapify/extensions/components/media/linkCard/linkPreview'
import { TiptapifyLinkPreviewOptions } from '@tiptapify/types/editor'

const flush = () => new Promise(resolve => setTimeout(resolve))

describe('linkPreview prop', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    resetLinkPreviewChecks()
  })

  it('makes link cards available once the endpoint answers the handshake', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(new Response(JSON.stringify({ tiptapifyLinkPreview: 1 })))))

    const { available } = createLinkPreviewState(ref({ endpoint: '/api/link-preview' }))
    expect(available.value).toBe(false)

    await flush()
    expect(available.value).toBe(true)
  })

  it('keeps link cards off without an endpoint, and asks nothing', async () => {
    const fetch = vi.fn()
    vi.stubGlobal('fetch', fetch)

    const { available } = createLinkPreviewState(ref(null))
    await flush()

    expect(available.value).toBe(false)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('checks a new endpoint when the prop changes', async () => {
    vi.stubGlobal('fetch', vi.fn((url: string) => Promise.resolve(
      new Response(url === '/ok' ? JSON.stringify({ tiptapifyLinkPreview: 1 }) : 'nope', { status: url === '/ok' ? 200 : 404 }),
    )))
    const options = ref<TiptapifyLinkPreviewOptions | null>({ endpoint: '/missing' })

    const { available } = createLinkPreviewState(options)
    await flush()
    expect(available.value).toBe(false)

    options.value = { endpoint: '/ok' }
    await nextTick()
    await flush()
    expect(available.value).toBe(true)
  })
})
