import { afterEach, describe, expect, it } from 'vitest'
import { App, createApp, h, nextTick, provide, ref, shallowRef } from 'vue'
import { createVuetify } from 'vuetify'
import { Editor } from '@tiptap/vue-3'
import { Bold } from '@tiptap/extension-bold'
import { Code } from '@tiptap/extension-code'
import { Document } from '@tiptap/extension-document'
import { Highlight } from '@tiptap/extension-highlight'
import { Italic } from '@tiptap/extension-italic'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Strike } from '@tiptap/extension-strike'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { Text } from '@tiptap/extension-text'
import { Underline } from '@tiptap/extension-underline'
import MenuBubble from '@tiptapify/components/MenuBubble.vue'

// jsdom has no layout of a range, which the menu position reads
if (!Range.prototype.getClientRects) {
  Range.prototype.getClientRects = () => [] as unknown as DOMRectList
  Range.prototype.getBoundingClientRect = () => new DOMRect()
}

let app: App | null = null
let editor: Editor | null = null

async function flush() {
  for (let i = 0; i < 5; i++) {
    await nextTick()
  }
}

async function mountMenu(): Promise<HTMLElement> {
  editor = new Editor({
    element: document.body.appendChild(document.createElement('div')),
    content: '<p><strong>Bold</strong> text</p>',
    extensions: [Document, Paragraph, Text, Bold, Italic, Underline, Strike, Superscript, Subscript, Highlight, Code],
  })
  // The menu shows for a selection in the focused editor
  editor.commands.focus()
  editor.commands.setTextSelection({ from: 1, to: 5 })

  app = createApp({
    setup() {
      provide('tiptapifyEditor', shallowRef(editor))
      provide('tiptapifyI18n', { t: (key: string) => key })
      provide('tiptapifyScrollContainer', ref(document.body))

      return () => h(MenuBubble)
    },
  })
  app.use(createVuetify())
  app.mount(document.body.appendChild(document.createElement('div')))
  await flush()

  return document.querySelector<HTMLElement>('.tiptapify-bubble-menu')!
}

afterEach(() => {
  app?.unmount()
  editor?.destroy()
  app = null
  editor = null
  document.body.innerHTML = ''
})

describe('selection bubble menu', () => {
  it('is one row of icon buttons in groups split by dividers', async () => {
    const menu = await mountMenu()
    const children = [...menu.children].map(child => (child.classList.contains('tiptapify-bubble-divider') ? '|' : 'btn'))

    expect(menu.classList).toContain('tiptapify-bubble-row')
    expect(menu.querySelector('.v-card, .v-toolbar, .v-btn-group')).toBeNull()
    expect(children.join(' ')).toBe('btn btn btn btn | btn btn | btn btn | btn | btn')
  })

  it('marks the active marks of the selection as pressed', async () => {
    const menu = await mountMenu()
    const pressed = [...menu.querySelectorAll('.v-btn')].map(button => button.classList.contains('tiptapify-btn--active'))

    expect(pressed).toEqual([true, false, false, false, false, false, false, false, false, false])
    expect(menu.querySelector('.v-btn')!.getAttribute('aria-pressed')).toBe('true')
  })

  it('applies a mark from its button', async () => {
    const menu = await mountMenu()

    ;(menu.querySelectorAll<HTMLButtonElement>('.v-btn')[1]).click()
    // The reactive state of the vue editor follows a transaction on the next frame
    await new Promise(resolve => setTimeout(resolve, 50))
    await flush()

    expect(editor!.getHTML()).toBe('<p><strong><em>Bold</em></strong> text</p>')
    expect(document.querySelectorAll('.tiptapify-bubble-menu .v-btn')[1].classList).toContain('tiptapify-btn--active')
  })
})

describe('selection bubble menu indexes', () => {
  it('applies both indexes to the selection, each from its button', async () => {
    const menu = await mountMenu()
    const buttons = () => document.querySelectorAll<HTMLButtonElement>('.tiptapify-bubble-menu .v-btn')

    expect(menu.querySelectorAll('.v-btn')[4].getAttribute('aria-pressed')).toBe('false')

    buttons()[4].click()
    await new Promise(resolve => setTimeout(resolve, 50))
    await flush()

    expect(editor!.getHTML()).toBe('<p><strong><sup>Bold</sup></strong> text</p>')
    expect(buttons()[4].classList).toContain('tiptapify-btn--active')

    buttons()[5].click()
    await new Promise(resolve => setTimeout(resolve, 50))
    await flush()

    expect(editor!.getHTML()).toBe('<p><strong><sup><sub>Bold</sub></sup></strong> text</p>')
    expect(buttons()[4].classList).toContain('tiptapify-btn--active')
    expect(buttons()[5].classList).toContain('tiptapify-btn--active')
  })
})
