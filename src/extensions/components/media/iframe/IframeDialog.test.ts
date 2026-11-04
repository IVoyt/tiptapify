import { afterEach, describe, expect, it } from 'vitest'
import { App, createApp, h, nextTick, provide, shallowRef } from 'vue'
import { createVuetify } from 'vuetify'
import { Editor } from '@tiptap/vue-3'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import Iframe from '@tiptapify/extensions/components/media/iframe'
import IframeDialog from '@tiptapify/extensions/components/media/iframe/IframeDialog.vue'

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

let app: App | null = null
let editor: Editor | null = null

async function flush() {
  for (let i = 0; i < 5; i++) {
    await nextTick()
  }
}

// The translation shows the key and its params, for the assertions
function t(key: string, params?: Record<string, unknown>) {
  return params && Object.keys(params).length ? `${key} ${JSON.stringify(params)}` : key
}

async function openDialog(content: string, selectFirst = false): Promise<HTMLElement> {
  editor = new Editor({
    element: document.createElement('div'),
    content,
    extensions: [Document, Paragraph, Text, Iframe],
  })

  app = createApp({
    setup() {
      provide('tiptapifyEditor', shallowRef(editor))
      provide('tiptapifyI18n', { t })

      return () => h(IframeDialog)
    },
  })
  app.use(createVuetify())
  app.mount(document.body.appendChild(document.createElement('div')))
  await flush()

  if (selectFirst) {
    editor.commands.setNodeSelection(0)
  }
  editor.commands.showIframe()
  await flush()

  return document.querySelector<HTMLElement>('.tiptapify-dialog')!
}

async function type(input: HTMLInputElement | HTMLTextAreaElement, value: string) {
  input.value = value
  input.dispatchEvent(new Event('input'))
  await flush()
}

async function submit(card: HTMLElement) {
  card.querySelector('form')!.requestSubmit()
  await flush()
}

function buttonWithText(card: HTMLElement, text: string): HTMLButtonElement {
  return [...card.querySelectorAll('button')].find(button => button.textContent?.trim() === text) as HTMLButtonElement
}

afterEach(() => {
  app?.unmount()
  editor?.destroy()
  app = null
  editor = null
  document.body.innerHTML = ''
})

describe('embed dialog', () => {
  it('reads a pasted code, previews it and inserts a responsive lazy embed', async () => {
    const card = await openDialog('<p></p>')

    await type(
      card.querySelector('textarea')!,
      '<iframe src="https://maps.example.com/embed?pb=1" width="600" height="450" title="Office" allowfullscreen></iframe>',
    )

    expect(card.textContent).toContain('dialog.iframe.code_parsed')
    expect(card.textContent).toContain('dialog.iframe.parsed_size')
    expect(card.textContent).toContain('dialog.iframe.size_responsive_hint {"ratio":"600 × 450"}')
    expect(card.querySelector<HTMLInputElement>('input[type="text"]')!.value).toBe('Office')

    const preview = card.querySelector('.tiptapify-iframe-dialog__preview iframe')!
    expect(preview.getAttribute('src')).toBe('https://maps.example.com/embed?pb=1')
    expect(preview.getAttribute('sandbox')).toContain('allow-scripts')

    await submit(card)

    expect(editor!.state.doc.firstChild!.attrs).toMatchObject({
      src: 'https://maps.example.com/embed?pb=1',
      title: 'Office',
      ratio: 'auto',
      width: 600,
      height: 450,
      loading: 'lazy',
      allowfullscreen: true,
      border: false,
    })
  })

  it('asks for the protocol and keeps the dialog open', async () => {
    const card = await openDialog('<p></p>')

    await type(card.querySelector('textarea')!, 'maps.example.com/embed')
    expect(card.querySelector('.tiptapify-iframe-dialog__preview iframe')).toBeNull()

    await submit(card)

    expect(card.textContent).toContain('dialog.iframe.src_protocol')
    expect(document.querySelector('.tiptapify-dialog')).not.toBeNull()
    expect(editor!.getHTML()).toBe('<p></p>')
  })

  it('rejects a code that is not a single iframe at once', async () => {
    const card = await openDialog('<p></p>')

    await type(card.querySelector('textarea')!, '<blockquote class="twitter-tweet"></blockquote><script src="https://x.example/w.js"></script>')

    expect(card.textContent).toContain('dialog.iframe.code_invalid')
  })

  it('inserts a ratio preset without a size', async () => {
    const card = await openDialog('<p></p>')

    await type(card.querySelector('textarea')!, 'https://a.example/embed')
    buttonWithText(card, '4:3').click()
    await flush()
    await submit(card)

    expect(editor!.state.doc.firstChild!.attrs).toMatchObject({ ratio: '4:3', width: null, height: null })
  })

  it('edits old content with a size as custom, in place', async () => {
    const card = await openDialog('<iframe src="https://a.example/embed" width="640" height="360" frameborder="0"></iframe>', true)

    expect(card.textContent).toContain('dialog.iframe.title_edit')
    expect(card.querySelector('textarea')!.value).toBe('https://a.example/embed')

    const [width, height] = card.querySelectorAll<HTMLInputElement>('input[type="number"]')
    expect([width.value, height.value]).toEqual(['640', '360'])

    await type(width, '800')
    expect(height.value).toBe('450')

    await submit(card)

    expect(editor!.state.doc.childCount).toBe(1)
    expect(editor!.state.doc.firstChild!.attrs).toMatchObject({ src: 'https://a.example/embed', ratio: null, width: 800, height: 450, loading: null })
  })

  it('removes the edited embed', async () => {
    const card = await openDialog('<iframe src="https://a.example/embed"></iframe><p>Text</p>', true)

    buttonWithText(card, 'dialog.remove').click()
    await flush()

    expect(editor!.getHTML()).not.toContain('iframe')
  })
})
