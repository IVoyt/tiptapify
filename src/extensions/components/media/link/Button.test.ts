import { afterEach, describe, expect, it, vi } from 'vitest'
import { App, createApp, h, nextTick, provide, ref, shallowRef } from 'vue'
import { createVuetify } from 'vuetify'
import { Editor } from '@tiptap/vue-3'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { Link } from '@tiptap/extension-link'
import { TiptapifyLink } from '@tiptapify/extensions/components/media/link'
import LinkButton from '@tiptapify/extensions/components/media/link/Button.vue'
import { LinkCard } from '@tiptapify/extensions/components/media/linkCard'
import { TIPTAPIFY_LINK_PREVIEW_KEY } from '@tiptapify/composables/useTiptapifyLinkPreview'

const cardHtml = '<a class="tiptapify-link-card" data-link-card="compact" href="https://news.example.com/a">'
  + '<span class="tiptapify-link-card__body"><span class="tiptapify-link-card__title">Talks</span></span></a>'

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

// Nor `ResizeObserver`, which the description field of the opened dialog reads
if (!('ResizeObserver' in globalThis)) {
  ;(globalThis as Record<string, unknown>).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}

let app: App | null = null
let editor: Editor | null = null
let root: HTMLElement

async function flush() {
  for (let i = 0; i < 5; i++) {
    await nextTick()
  }
}

async function mountButton(content: string) {
  editor = new Editor({
    element: document.createElement('div'),
    content,
    extensions: [Document, Paragraph, Text, Link.configure({ openOnClick: false }), TiptapifyLink, LinkCard],
  })

  app = createApp({
    setup() {
      provide('tiptapifyEditor', shallowRef(editor))
      provide('tiptapifyI18n', { t: (key: string) => key })
      provide(TIPTAPIFY_LINK_PREVIEW_KEY, { options: ref(null), available: ref(false) })

      return () => h(LinkButton)
    },
  })
  app.use(createVuetify())
  root = document.body.appendChild(document.createElement('div'))
  app.mount(root)
  await flush()
}

afterEach(() => {
  app?.unmount()
  editor?.destroy()
  app = null
  editor = null
  document.body.innerHTML = ''
})

describe('link toolbar button', () => {
  it('is active while a link card is selected and opens the link dialog with it', async () => {
    await mountButton(`<p>Text</p>${cardHtml}`)
    editor!.commands.setTextSelection(1)
    await flush()

    expect(root.querySelector('.v-btn')!.className).not.toContain('primary')

    // The editor state reaches Vue after two animation frames
    editor!.commands.setNodeSelection(6)
    await vi.waitFor(() => expect(root.querySelector('.v-btn')!.className).toContain('primary'))

    const listener = vi.fn()
    window.addEventListener('tiptapify-show-link', listener)
    root.querySelector<HTMLButtonElement>('.v-btn')!.click()
    window.removeEventListener('tiptapify-show-link', listener)

    expect(listener.mock.calls[0][0].detail.card).toMatchObject({ href: 'https://news.example.com/a', title: 'Talks' })
  })
})
