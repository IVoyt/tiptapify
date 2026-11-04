import { afterEach, describe, expect, it, vi } from 'vitest'
import { App, createApp, h, nextTick, provide, ref, shallowRef } from 'vue'
import { createVuetify } from 'vuetify'
import { Editor } from '@tiptap/vue-3'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { Link } from '@tiptap/extension-link'
import { LinkCard } from '@tiptapify/extensions/components/media/linkCard'
import PasteCardMenu from '@tiptapify/extensions/components/media/linkCard/PasteCardMenu.vue'
import { LinkCardPaste, pastedLink } from '@tiptapify/extensions/components/media/linkCard/pasteCard'
import { TIPTAPIFY_LINK_PREVIEW_KEY } from '@tiptapify/composables/useTiptapifyLinkPreview'

// jsdom has no `ResizeObserver`; the spinner of the loading button reads it
if (!('ResizeObserver' in globalThis)) {
  ;(globalThis as Record<string, unknown>).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}

// Nor the layout of a range, which the menu position reads
if (!Range.prototype.getClientRects) {
  Range.prototype.getClientRects = () => [] as unknown as DOMRectList
  Range.prototype.getBoundingClientRect = () => new DOMRect()
}

const url = 'https://news.example.com/a'

let app: App | null = null
let editor: Editor | null = null

async function flush() {
  for (let i = 0; i < 5; i++) {
    await nextTick()
  }
}

async function mountMenu(available: boolean): Promise<Editor> {
  const scroll = document.body.appendChild(document.createElement('div'))
  editor = new Editor({
    element: scroll.appendChild(document.createElement('div')),
    content: '<p>Before</p><p></p>',
    extensions: [Document, Paragraph, Text, Link.configure({ openOnClick: false }), LinkCard, LinkCardPaste],
  })

  app = createApp({
    setup() {
      provide('tiptapifyEditor', shallowRef(editor))
      provide('tiptapifyScrollContainer', ref(scroll))
      provide('tiptapifyI18n', { t: (key: string) => key })
      provide(TIPTAPIFY_LINK_PREVIEW_KEY, {
        options: ref({ endpoint: 'https://cms.example.com/preview' }),
        available: ref(available),
      })

      return () => h(PasteCardMenu)
    },
  })
  app.use(createVuetify())
  app.mount(document.body.appendChild(document.createElement('div')))
  await flush()

  editor.commands.setTextSelection(9)
  editor.view.pasteText(url, new Event('paste') as ClipboardEvent)
  await flush()

  return editor
}

function menu(): HTMLElement | null {
  return document.querySelector<HTMLElement>('.tiptapify-link-card-paste')
}

function buttonWithText(text: string): HTMLButtonElement {
  return [...menu()!.querySelectorAll('button')].find(button => button.textContent?.includes(text))!
}

function respond(body: unknown, status = 200) {
  return vi.fn(async () => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } }))
}

afterEach(() => {
  app?.unmount()
  editor?.destroy()
  app = null
  editor = null
  document.body.innerHTML = ''
  vi.unstubAllGlobals()
})

describe('paste card menu', () => {
  it('is not offered without the link preview endpoint', async () => {
    const ed = await mountMenu(false)

    expect(pastedLink(ed.state)?.url).toBe(url)
    expect(menu()).toBeNull()
  })

  it('keeps the link on Link', async () => {
    const ed = await mountMenu(true)

    buttonWithText('dialog.linkCard.display_link').click()
    await flush()

    expect(menu()).toBeNull()
    expect(ed.getHTML()).toContain(`href="${url}"`)
  })

  it('replaces the pasted link with its card on Card', async () => {
    vi.stubGlobal('fetch', respond({ title: 'Talks', siteName: 'News' }))
    const ed = await mountMenu(true)

    buttonWithText('dialog.linkCard.display_card').click()

    await vi.waitFor(() => expect(ed.state.doc.child(1).type.name).toBe('linkCard'))
    expect(ed.state.doc.child(1).attrs).toMatchObject({ href: url, title: 'Talks', siteName: 'News', newTab: true })
    await flush()
    expect(menu()).toBeNull()
  })

  it('keeps the link with a short error when the page has no preview', async () => {
    vi.stubGlobal('fetch', respond({ error: 'Not found' }, 404))
    const ed = await mountMenu(true)

    buttonWithText('dialog.linkCard.display_card').click()

    await vi.waitFor(() => expect(menu()!.textContent).toContain('dialog.linkCard.paste_error'))
    expect(ed.state.doc.child(1).type.name).toBe('paragraph')
    expect(ed.getHTML()).toContain(`href="${url}"`)
  })
})
