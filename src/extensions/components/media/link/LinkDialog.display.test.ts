import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App, createApp, h, nextTick, provide, ref, shallowRef } from 'vue'
import { createVuetify } from 'vuetify'
import { Editor } from '@tiptap/vue-3'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { Link } from '@tiptap/extension-link'
import { TiptapifyLink } from '@tiptapify/extensions/components/media/link'
import LinkDialog from '@tiptapify/extensions/components/media/link/LinkDialog.vue'
import { LinkCard, LinkCardDraft } from '@tiptapify/extensions/components/media/linkCard'
import { resetLinkPreviewChecks } from '@tiptapify/extensions/components/media/linkCard/linkPreview'
import { TIPTAPIFY_LINK_PREVIEW_KEY } from '@tiptapify/composables/useTiptapifyLinkPreview'

// jsdom has no `visualViewport`; Vuetify's overlay positioning reads it
if (!('visualViewport' in globalThis)) {
  ;(globalThis as Record<string, unknown>).visualViewport = {
    scale: 1,
    offsetLeft: 0,
    offsetTop: 0,
    addEventListener: () => {},
    removeEventListener: () => {},
  }
}

// Nor `ResizeObserver`, which the growing description field reads
if (!('ResizeObserver' in globalThis)) {
  ;(globalThis as Record<string, unknown>).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}

const ENDPOINT = 'https://cms.example.com/link-preview'

const page = {
  url: 'https://news.example.com/a',
  title: 'Talks enter a new stage',
  description: 'The president named the terms',
  image: 'https://cdn.example.com/og.jpg',
  siteName: 'News',
}

const cardHtml = '<a class="tiptapify-link-card" data-link-card="compact" href="https://news.example.com/a" target="_blank" rel="noopener noreferrer">'
  + '<span class="tiptapify-link-card__body"><span class="tiptapify-link-card__title">My own title</span></span></a>'

let app: App | null = null
let editor: Editor | null = null
let answer: (url: string) => Response = () => json(page)
const fetchMock = vi.fn(async (input: string) => {
  const url = new URL(input).searchParams.get('url')

  return url ? answer(url) : json({ tiptapifyLinkPreview: 1 })
})

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
}

function pageRequests(): string[] {
  return fetchMock.mock.calls.map(([input]) => new URL(input).searchParams.get('url')).filter(url => url !== null)
}

async function flush() {
  for (let i = 0; i < 10; i++) {
    await nextTick()
    await Promise.resolve()
  }
}

type OpenOptions = { content?: string, available?: boolean, caret?: number, selectCard?: number, draft?: LinkCardDraft }

async function openDialog({ content = '<p></p>', available = true, caret = 1, selectCard, draft }: OpenOptions = {}): Promise<HTMLElement> {
  editor = new Editor({
    element: document.createElement('div'),
    content,
    extensions: [
      Document,
      Paragraph,
      Text,
      Link.configure({ openOnClick: false, enableClickSelection: true, defaultProtocol: 'https' }),
      TiptapifyLink.configure({ openOnClick: false, defaultProtocol: 'https' }),
      LinkCard,
    ],
  })

  app = createApp({
    setup() {
      provide('tiptapifyEditor', shallowRef(editor))
      provide('tiptapifyI18n', {
        t: (key: string, params?: Record<string, unknown>) => (params ? `${key} ${JSON.stringify(params)}` : key),
      })
      provide(TIPTAPIFY_LINK_PREVIEW_KEY, { options: ref(available ? { endpoint: ENDPOINT } : null), available: ref(available) })

      return () => h(LinkDialog)
    },
  })
  app.use(createVuetify())
  app.mount(document.body.appendChild(document.createElement('div')))
  await flush()

  if (selectCard !== undefined) {
    editor.commands.setNodeSelection(selectCard)
  } else {
    editor.commands.setTextSelection(caret)
  }

  if (draft) {
    editor.commands.showLinkCard(draft)
  } else {
    editor.commands.showLink()
  }
  await flush()

  return document.querySelector<HTMLElement>('.tiptapify-dialog')!
}

function field(card: HTMLElement, label: string): HTMLInputElement {
  const wrapper = [...card.querySelectorAll('.v-input')].find(input => input.querySelector('label')?.textContent?.includes(label))!

  return wrapper.querySelector<HTMLInputElement>('input, textarea')!
}

async function type(input: HTMLInputElement, value: string) {
  input.value = value
  input.dispatchEvent(new Event('input'))
  await flush()
}

async function submit(card: HTMLElement) {
  card.querySelector('form')!.requestSubmit()
  await flush()
}

function buttonWithText(card: HTMLElement, text: string): HTMLButtonElement | undefined {
  return [...card.querySelectorAll('button')].find(button => button.textContent?.includes(text))
}

async function showAs(card: HTMLElement, display: 'link' | 'card') {
  buttonWithText(card, `dialog.linkCard.display_${display}`)!.click()
  await flush()
}

beforeEach(() => {
  answer = () => json(page)
  fetchMock.mockClear()
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  app?.unmount()
  editor?.destroy()
  app = null
  editor = null
  document.body.innerHTML = ''
  vi.useRealTimers()
  vi.unstubAllGlobals()
  resetLinkPreviewChecks()
})

describe('link dialog display', () => {
  it('offers no card without the link preview endpoint', async () => {
    const card = await openDialog({ available: false })

    expect(buttonWithText(card, 'dialog.linkCard.display_card')).toBeUndefined()
    expect(card.textContent).toContain('dialog.link.text')
  })

  it('opens a draft address as a link without the endpoint, asking nothing', async () => {
    const card = await openDialog({ available: false, draft: { href: page.url } })

    expect(card.textContent).toContain('dialog.link.title_insert')
    expect(buttonWithText(card, 'dialog.linkCard.display_card')).toBeUndefined()
    expect(field(card, 'dialog.link.href').value).toBe(page.url)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('inserts a card of the page in place of the empty paragraph, asked on submit right after typing', async () => {
    const card = await openDialog({ content: '<p>Before</p><p></p>', caret: 9 })

    await showAs(card, 'card')

    // Text, rel and class do not apply to a card
    expect(card.textContent).toContain('dialog.linkCard.title_insert')
    expect(card.textContent).not.toContain('dialog.link.text')
    expect(card.textContent).not.toContain('dialog.link.advanced')

    await type(field(card, 'dialog.link.href'), page.url)
    await submit(card)

    await vi.waitFor(() => expect(editor!.state.doc.child(1).type.name).toBe('linkCard'))
    expect(pageRequests()).toEqual([page.url])
    expect(editor!.state.doc.childCount).toBe(2)
    expect(editor!.state.doc.child(1).attrs).toMatchObject({ href: page.url, title: page.title, siteName: page.siteName, newTab: false })
  })

  it('fetches the page of a draft address at once and inserts its card with the chosen layout', async () => {
    const card = await openDialog({ draft: { href: page.url, newTab: true } })

    expect(card.textContent).toContain('dialog.linkCard.title_insert')
    await vi.waitFor(() => expect(field(card, 'dialog.linkCard.page_title').value).toBe(page.title))
    expect(pageRequests()).toEqual([page.url])
    expect(field(card, 'dialog.linkCard.site_name').value).toBe(page.siteName)
    expect(card.querySelector('.tiptapify-link-card-fields__image img')!.getAttribute('src')).toBe(page.image)

    buttonWithText(card, 'dialog.linkCard.layout_large')!.click()
    await flush()
    await submit(card)

    expect(editor!.state.doc.firstChild!.type.name).toBe('linkCard')
    expect(editor!.state.doc.firstChild!.attrs).toEqual({
      href: page.url,
      title: page.title,
      description: page.description,
      image: page.image,
      siteName: page.siteName,
      layout: 'large',
      newTab: true,
    })
  })

  it('fetches a typed address once the typing stops, and never one without a protocol', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    const card = await openDialog()
    await showAs(card, 'card')
    const href = field(card, 'dialog.link.href')

    await type(href, 'news.example.com/a')
    expect(card.textContent).toContain('dialog.link.protocol_missing')
    await vi.advanceTimersByTimeAsync(500)
    expect(pageRequests()).toEqual([])

    await submit(card)
    expect(pageRequests()).toEqual([])

    await type(href, 'https://news.example.com/b')
    await type(href, page.url)
    await vi.advanceTimersByTimeAsync(500)
    await flush()

    expect(pageRequests()).toEqual([page.url])
    expect(field(card, 'dialog.linkCard.page_title').value).toBe(page.title)
  })

  it('needs an http(s) address for a card', async () => {
    const card = await openDialog()
    await showAs(card, 'card')

    await type(field(card, 'dialog.link.href'), '/page')
    await submit(card)

    expect(card.textContent).toContain('dialog.linkCard.protocol_missing')
    expect(pageRequests()).toEqual([])
    expect(editor!.getHTML()).toBe('<p></p>')
  })

  it('shows the error of the endpoint under the address and inserts the fields filled by hand', async () => {
    answer = () => json({ error: 'The page answered 404' }, 422)
    const card = await openDialog()
    await showAs(card, 'card')

    await type(field(card, 'dialog.link.href'), page.url)
    await submit(card)

    await vi.waitFor(() => expect(card.textContent).toContain('dialog.linkCard.fetch_failed {"error":"The page answered 404"}'))
    expect(editor!.getHTML()).toBe('<p></p>')

    await type(field(card, 'dialog.linkCard.page_title'), 'By hand')
    await submit(card)

    expect(pageRequests()).toEqual([page.url])
    expect(editor!.state.doc.firstChild!.attrs).toMatchObject({ href: page.url, title: 'By hand', image: null })
  })

  it('converts the link being edited into a card', async () => {
    const card = await openDialog({ content: '<p><a href="https://news.example.com/a">Page</a></p>', caret: 2 })

    expect(card.textContent).toContain('dialog.link.title_edit')
    expect(buttonWithText(card, 'dialog.link.remove')).toBeDefined()

    await showAs(card, 'card')
    expect(card.textContent).toContain('dialog.linkCard.title_edit')
    await vi.waitFor(() => expect(field(card, 'dialog.linkCard.page_title').value).toBe(page.title))
    await submit(card)

    expect(editor!.state.doc.childCount).toBe(1)
    expect(editor!.state.doc.firstChild!.type.name).toBe('linkCard')
    expect(editor!.state.doc.firstChild!.attrs).toMatchObject({ href: page.url, title: page.title })
  })

  it('edits the selected card without fetching on open; the data is fetched again only by Refresh', async () => {
    const card = await openDialog({ content: cardHtml, selectCard: 0 })

    expect(card.textContent).toContain('dialog.linkCard.title_edit')
    expect(buttonWithText(card, 'dialog.remove')).toBeDefined()
    expect(pageRequests()).toEqual([])
    expect(field(card, 'dialog.linkCard.page_title').value).toBe('My own title')

    card.querySelector<HTMLButtonElement>('[aria-label="dialog.linkCard.refresh"]')!.click()
    await vi.waitFor(() => expect(field(card, 'dialog.linkCard.page_title').value).toBe(page.title))
    expect(pageRequests()).toEqual([page.url])

    buttonWithText(card, 'dialog.linkCard.layout_text')!.click()
    await flush()
    await submit(card)

    expect(editor!.state.doc.childCount).toBe(1)
    expect(editor!.state.doc.firstChild!.attrs).toMatchObject({ title: page.title, layout: 'text', image: page.image, newTab: true })
  })

  it('edits a card by hand without the endpoint', async () => {
    const card = await openDialog({ content: cardHtml, available: false, selectCard: 0 })

    expect(card.querySelector('[aria-label="dialog.linkCard.refresh"]')).toBeNull()
    // The card can still be shown as a link
    expect(buttonWithText(card, 'dialog.linkCard.display_link')).toBeDefined()

    await type(field(card, 'dialog.linkCard.description'), 'Written by hand')
    await submit(card)

    expect(fetchMock).not.toHaveBeenCalled()
    expect(editor!.state.doc.firstChild!.attrs).toMatchObject({ title: 'My own title', description: 'Written by hand' })
  })

  it('turns the selected card back into a link with its title as the text', async () => {
    const card = await openDialog({ content: cardHtml, available: false, selectCard: 0 })

    await showAs(card, 'link')
    expect(card.textContent).toContain('dialog.link.title_edit')
    await submit(card)

    expect(editor!.getHTML()).toBe(
      '<p><a target="_blank" rel="noopener noreferrer" href="https://news.example.com/a">My own title</a></p>',
    )
  })

  it('removes the selected card', async () => {
    const card = await openDialog({ content: `${cardHtml}<p>Text</p>`, selectCard: 0 })

    buttonWithText(card, 'dialog.remove')!.click()
    await flush()

    expect(editor!.getHTML()).toBe('<p>Text</p>')
  })

  it('embeds a picked image as base64 without the upload and removes it', async () => {
    const card = await openDialog({ content: cardHtml, selectCard: 0 })

    const input = card.querySelector<HTMLInputElement>('input[accept="image/*"]')!
    Object.defineProperty(input, 'files', { value: [new File(['x'], 'og.png', { type: 'image/png' })], configurable: true })
    input.dispatchEvent(new Event('change'))
    await vi.waitFor(() => expect(card.querySelector('.tiptapify-link-card-fields__image img')).not.toBeNull())

    expect(card.querySelector('.tiptapify-link-card-fields__image img')!.getAttribute('src')).toMatch(/^data:image\/png;base64,/)

    buttonWithText(card, 'dialog.linkCard.image_remove')!.click()
    await flush()
    await submit(card)

    expect(editor!.state.doc.firstChild!.attrs.image).toBeNull()
  })
})
