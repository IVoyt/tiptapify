import { afterEach, describe, expect, it, vi } from 'vitest'
import { App, computed, createApp, h, nextTick, provide, shallowRef } from 'vue'
import { createVuetify } from 'vuetify'
import { Editor } from '@tiptap/vue-3'
import { Document } from '@tiptap/extension-document'
import { Highlight } from '@tiptap/extension-highlight'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { TextStyleKit } from '@tiptap/extension-text-style'
import { UndoRedo } from '@tiptap/extensions'
import StyleColor from '@tiptapify/extensions/components/style/StyleColor.vue'
import { ColorKind, loadRecent } from '@tiptapify/extensions/components/style/color/colors'

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

// Nor `ResizeObserver`, which the menu's positioning reads
if (!('ResizeObserver' in globalThis)) {
  ;(globalThis as Record<string, unknown>).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}

let app: App | null = null
let editor: Editor | null = null

async function flush() {
  for (let i = 0; i < 5; i++) {
    await nextTick()
  }
}

async function openPicker(kind: ColorKind, content = '<p>Hello</p>'): Promise<HTMLElement> {
  const instance = new Editor({
    element: document.createElement('div'),
    content,
    extensions: [Document, Paragraph, Text, TextStyleKit, Highlight.configure({ multicolor: true }), UndoRedo],
  })
  instance.commands.selectAll()
  editor = instance

  app = createApp({
    setup() {
      provide('tiptapifyEditor', shallowRef(instance))
      provide('tiptapifyI18n', { t: (key: string) => key })

      const color = computed(() => String(instance.getAttributes(kind === 'text' ? 'textStyle' : 'highlight').color ?? ''))

      return () => [
        h('button', { id: 'color-activator' }, 'open'),
        h(StyleColor, { kind, activator: '#color-activator', color: color.value }),
      ]
    },
  })
  app.use(createVuetify())
  app.mount(document.body.appendChild(document.createElement('div')))
  await flush()

  document.querySelector<HTMLElement>('#color-activator')!.click()
  await flush()

  return document.querySelector<HTMLElement>('.tiptapify-color')!
}

function swatch(popover: HTMLElement, label: string): HTMLButtonElement {
  return popover.querySelector<HTMLButtonElement>(`.tiptapify-color__swatch[aria-label="${label}"]`)!
}

function textColor(): string | undefined {
  return editor!.getAttributes('textStyle').color
}

function isOpen(): boolean {
  return !!document.querySelector('.tiptapify-color')?.closest('.v-overlay--active')
}

async function key(element: HTMLElement, name: string) {
  element.dispatchEvent(new KeyboardEvent('keydown', { key: name, bubbles: true, cancelable: true }))
  await flush()
}

async function typeHex(popover: HTMLElement, value: string): Promise<HTMLInputElement> {
  const input = popover.querySelector<HTMLInputElement>('.tiptapify-color__hex input')!
  input.value = value
  input.dispatchEvent(new Event('input'))
  await flush()

  return input
}

afterEach(() => {
  app?.unmount()
  app = null
  editor?.destroy()
  editor = null
  document.body.innerHTML = ''
  localStorage.clear()
  delete (globalThis as Record<string, unknown>).EyeDropper
  vi.restoreAllMocks()
})

describe('StyleColor', () => {
  it('previews a hovered color outside undo and applies a click as one undo step', async () => {
    const popover = await openPicker('text', '<p><span style="color: #1d4ed8">Hello</span></p>')
    const red = swatch(popover, 'style.color.names.dark_red')

    expect(swatch(popover, 'style.color.names.dark_blue').getAttribute('aria-pressed')).toBe('true')

    red.dispatchEvent(new MouseEvent('mouseenter'))
    expect(textColor()).toBe('#b91c1c')
    expect(editor!.can().undo()).toBe(false)

    red.dispatchEvent(new MouseEvent('mouseleave'))
    expect(textColor()).toBe('#1d4ed8')

    red.dispatchEvent(new MouseEvent('mouseenter'))
    red.click()
    await flush()

    expect(textColor()).toBe('#b91c1c')
    expect(isOpen()).toBe(false)
    expect(loadRecent('text')).toEqual(['#b91c1c'])

    editor!.commands.undo()
    expect(textColor()).toBe('#1d4ed8')
  })

  it('removes the color with the first cell', async () => {
    const popover = await openPicker('text', '<p><span style="color: #1d4ed8">Hello</span></p>')

    swatch(popover, 'style.color.default').click()
    await flush()

    expect(textColor()).toBeFalsy()
  })

  it('shows recent colors per kind', async () => {
    localStorage.setItem('tiptapify:recent-colors:highlight', JSON.stringify(['#123456']))
    const popover = await openPicker('highlight')

    expect(popover.textContent).toContain('style.color.recent')
    swatch(popover, '#123456').click()
    await flush()

    expect(editor!.getAttributes('highlight').color).toBe('#123456')
  })

  it('moves through the swatches with arrow keys, and Esc restores the original color', async () => {
    const popover = await openPicker('text', '<p><span style="color: #1d4ed8">Hello</span></p>')
    const blue = swatch(popover, 'style.color.names.blue')
    blue.focus()

    await key(blue, 'ArrowRight')
    expect(document.activeElement).toBe(swatch(popover, 'style.color.names.purple'))
    expect(textColor()).toBe('#a855f7')

    await key(document.activeElement as HTMLElement, 'ArrowUp')
    expect(textColor()).toBe('#7e22ce')

    await key(document.activeElement as HTMLElement, 'Escape')
    expect(isOpen()).toBe(false)
    expect(textColor()).toBe('#1d4ed8')
    expect(editor!.can().undo()).toBe(false)
  })

  it('applies a focused swatch with Enter', async () => {
    const popover = await openPicker('highlight')
    const amber = swatch(popover, 'style.color.names.amber')
    amber.focus()

    await key(amber, 'Enter')

    expect(editor!.getAttributes('highlight').color).toBe('#fcd34d')
    expect(isOpen()).toBe(false)
  })

  it('applies a typed hex color and keeps an invalid one in the field', async () => {
    const popover = await openPicker('text')

    let input = await typeHex(popover, '#abz')
    await key(input, 'Enter')
    expect(isOpen()).toBe(true)
    expect(popover.textContent).toContain('style.color.hex_invalid')
    expect(textColor()).toBeFalsy()

    input = await typeHex(popover, '#abc')
    expect(textColor()).toBe('#aabbcc')
    // Not the message text: Vuetify 4 keeps it in the DOM while its leave transition runs
    expect(popover.querySelector('.tiptapify-color__hex')!.classList).not.toContain('v-input--error')

    await key(input, 'Enter')
    expect(isOpen()).toBe(false)
    expect(textColor()).toBe('#aabbcc')

    editor!.commands.undo()
    expect(textColor()).toBeFalsy()
  })

  it('drops a typed color when Esc closes the popover', async () => {
    const popover = await openPicker('text')
    const input = await typeHex(popover, '#abc')
    input.focus()

    await key(input, 'Escape')
    input.dispatchEvent(new FocusEvent('blur'))
    await flush()

    expect(isOpen()).toBe(false)
    expect(textColor()).toBeFalsy()
    expect(editor!.can().undo()).toBe(false)
  })

  it('offers the eyedropper only where the browser has one', async () => {
    let popover = await openPicker('text')
    expect(popover.querySelector('.tiptapify-color__eyedropper')).toBeNull()

    app!.unmount()
    document.body.innerHTML = ''
    const open = vi.fn().mockResolvedValue({ sRGBHex: '#0F766E' })
    ;(globalThis as Record<string, unknown>).EyeDropper = class {
      open = open
    }

    popover = await openPicker('text')
    popover.querySelector<HTMLElement>('.tiptapify-color__eyedropper')!.click()
    await flush()

    expect(open).toHaveBeenCalled()
    expect(textColor()).toBe('#0f766e')
  })

  it('expands the custom color picker inside the popover', async () => {
    const popover = await openPicker('text')
    const toggle = popover.querySelector<HTMLElement>('.tiptapify-color__custom-toggle')!
    // jsdom draws no canvas
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)

    toggle.click()
    await flush()

    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    expect(popover.querySelector('.v-color-picker')).not.toBeNull()
    expect(isOpen()).toBe(true)
  })
})
