import { afterEach, describe, expect, it, vi } from 'vitest'
import { App, computed, createApp, h, nextTick, provide, ref, shallowRef } from 'vue'
import { createVuetify } from 'vuetify'
import { Editor } from '@tiptap/vue-3'
import { Bold } from '@tiptap/extension-bold'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { CharacterCount } from '@tiptap/extensions'
import AiDialog from '@tiptapify/extensions/components/ai/Dialog.vue'
import { TiptapifyAiOptions, TiptapifyAiProvider } from '@tiptapify/types/editor'

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

// Nor `ResizeObserver`, which the auto-growing prompt textarea reads
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

type Setup = {
  content: string,
  selection?: { from: number, to: number },
  options?: TiptapifyAiOptions,
  limit?: number,
}

async function openDialog({ content, selection, options = {}, limit }: Setup): Promise<HTMLElement> {
  editor = new Editor({
    element: document.createElement('div'),
    content,
    extensions: [Document, Paragraph, Text, Bold, ...(limit ? [CharacterCount.configure({ limit })] : [])],
  })
  if (selection) {
    editor.commands.setTextSelection(selection)
  }

  const dialog = ref<{ showDialog: () => void } | null>(null)
  app = createApp({
    setup() {
      provide('tiptapifyEditor', shallowRef(editor))
      provide('tiptapifyI18n', { t: (key: string) => key })
      provide('tiptapifyAi', computed(() => ({ enabled: true, promptExamples: [], ...options })))

      return () => h(AiDialog, { ref: dialog })
    },
  })
  app.use(createVuetify())
  app.mount(document.body.appendChild(document.createElement('div')))
  await flush()

  dialog.value!.showDialog()
  await flush()

  return document.querySelector<HTMLElement>('.tiptapify-dialog')!
}

async function typePrompt(card: HTMLElement, value: string) {
  const textarea = card.querySelector('textarea')!
  textarea.value = value
  textarea.dispatchEvent(new Event('input'))
  await flush()

  return textarea
}

async function pressEnter(textarea: HTMLTextAreaElement, shiftKey = false) {
  const event = new KeyboardEvent('keydown', { key: 'Enter', shiftKey, bubbles: true, cancelable: true })
  textarea.dispatchEvent(event)
  await flush()

  return event
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

describe('ai dialog', () => {
  it('generates on Enter for the selection and replaces it with the formatted result', async () => {
    const aiProvider = vi.fn<TiptapifyAiProvider>(async (_request, _context, stream) => {
      stream!.onChunk('<b>there</b>')

      return ''
    })
    const card = await openDialog({ content: '<p>Hello world</p>', selection: { from: 7, to: 12 }, options: { aiProvider } })

    expect(card.querySelector('.ai-context')!.textContent).toContain('ai.context.selection')
    expect(buttonWithText(card, 'ai.replace_selection').disabled).toBe(true)

    const textarea = await typePrompt(card, 'Make it friendly')
    const event = await pressEnter(textarea)

    expect(event.defaultPrevented).toBe(true)
    expect(aiProvider).toHaveBeenCalledTimes(1)
    const [request, context] = aiProvider.mock.calls[0]
    expect(context).toMatchObject({ prompt: 'Make it friendly', selectedText: 'world', mode: 'replace' })
    expect(request.enable_thinking).toBe(false)
    expect(card.querySelector('.ai-result__content')!.innerHTML).toBe('<strong>there</strong>')

    card.querySelector('form')!.requestSubmit()
    await flush()

    expect(editor!.getHTML()).toBe('<p>Hello <strong>there</strong></p>')
  })

  it('sends a selection cut inside a word as whole words, with the text around it', async () => {
    const aiProvider = vi.fn<TiptapifyAiProvider>(async () => 'have entered a new')
    const text = 'The talks has entered a new stage.'
    const card = await openDialog({
      content: `<p>${text}</p>`,
      selection: { from: 1 + text.indexOf('as entered'), to: 1 + text.indexOf('ew stage') },
      options: { aiProvider },
    })

    await pressEnter(await typePrompt(card, 'Fix grammar'))

    const [request, context] = aiProvider.mock.calls[0]
    expect(context).toMatchObject({ selectedText: 'has entered a new', textBefore: 'The talks ', textAfter: ' stage.' })
    const message = request.messages.at(-1)!.content as string
    expect(message).toContain('Text before the selection:\nThe talks ')
    expect(message).toContain('Selected text:\nhas entered a new')
    expect(message).toContain('Text after the selection:\n stage.')
    expect(message).toContain('User request:\nFix grammar')

    card.querySelector('form')!.requestSubmit()
    await flush()

    expect(editor!.getHTML()).toBe('<p>The talks have entered a new stage.</p>')
  })

  it('inserts the result below the selection, keeping it', async () => {
    const aiProvider: TiptapifyAiProvider = async () => 'Added'
    const card = await openDialog({ content: '<p>Hello world</p>', selection: { from: 1, to: 6 }, options: { aiProvider } })

    await pressEnter(await typePrompt(card, 'Continue'))
    buttonWithText(card, 'ai.insert_below').click()
    await flush()

    expect(editor!.getHTML()).toBe('<p>Hello world</p><p>Added</p>')
  })

  it('inserts at the cursor or appends to the end without a selection', async () => {
    const aiProvider: TiptapifyAiProvider = async () => ({ content: '<p>End</p>' })
    const card = await openDialog({ content: '<p>Hello</p><p>World</p>', options: { aiProvider } })

    expect(card.querySelector('.ai-context')!.textContent).toContain('ai.context.document')
    expect(buttonWithText(card, 'ai.insert')).toBeTruthy()

    await pressEnter(await typePrompt(card, 'Write an ending'))
    buttonWithText(card, 'ai.append').click()
    await flush()

    expect(editor!.getHTML()).toBe('<p>Hello</p><p>World</p><p>End</p>')
  })

  it('keeps Shift+Enter as a new line', async () => {
    const aiProvider = vi.fn<TiptapifyAiProvider>(async () => 'x')
    const card = await openDialog({ content: '<p></p>', options: { aiProvider } })

    const event = await pressEnter(await typePrompt(card, 'Line'), true)

    expect(event.defaultPrevented).toBe(false)
    expect(aiProvider).not.toHaveBeenCalled()
  })

  it('stops a streaming request and keeps the partial result without an error', async () => {
    const aiProvider: TiptapifyAiProvider = (_request, _context, stream) => new Promise((_resolve, reject) => {
      stream!.onChunk('Partial')
      stream!.signal.addEventListener('abort', () => reject(new Error('aborted')))
    })
    const card = await openDialog({ content: '<p></p>', options: { aiProvider } })

    await pressEnter(await typePrompt(card, 'Write'))
    expect(card.querySelector('.ai-send--stop')).not.toBeNull()

    card.querySelector<HTMLButtonElement>('.ai-send--stop')!.click()
    await flush()

    expect(card.querySelector('.ai-send--stop')).toBeNull()
    expect(card.querySelector('.ai-result__content')!.textContent).toBe('Partial')
    expect(card.querySelector('.ai-status')).toBeNull()
    expect(buttonWithText(card, 'ai.insert').disabled).toBe(false)
  })

  it('explains a request the browser could not complete (service down or CORS) instead of "Failed to fetch"', async () => {
    const aiProvider: TiptapifyAiProvider = async () => {
      throw new TypeError('Failed to fetch')
    }
    const card = await openDialog({ content: '<p></p>', options: { aiProvider } })

    await pressEnter(await typePrompt(card, 'Write'))

    const status = card.querySelector('.ai-status--error')!.textContent!
    expect(status).toContain('ai.errors.network')
    expect(status).not.toContain('Failed to fetch')
  })

  it('explains an error status and keeps the message of the service', async () => {
    const aiProvider: TiptapifyAiProvider = async () => {
      throw Object.assign(new Error('missing or wrong API key'), { status: 401 })
    }
    const card = await openDialog({ content: '<p></p>', options: { aiProvider } })

    await pressEnter(await typePrompt(card, 'Write'))

    const status = card.querySelector('.ai-status--error')!.textContent!
    expect(status).toContain('ai.errors.auth')
    expect(status).toContain('missing or wrong API key')
  })

  it('shows a provider error inline', async () => {
    const aiProvider: TiptapifyAiProvider = async () => {
      throw new Error('Quota exceeded')
    }
    const card = await openDialog({ content: '<p></p>', options: { aiProvider } })

    await pressEnter(await typePrompt(card, 'Write'))

    expect(card.querySelector('.ai-status--error')!.textContent).toContain('Quota exceeded')
  })

  it('blocks a result over the character limit', async () => {
    const aiProvider: TiptapifyAiProvider = async () => 'x'.repeat(20)
    const card = await openDialog({ content: '<p>Hello</p>', options: { aiProvider }, limit: 10 })

    await pressEnter(await typePrompt(card, 'Write'))

    expect(card.querySelector('.ai-status--error')!.textContent).toContain('ai.limit_exceeded')
    expect(card.querySelector('.ai-result__counter')!.textContent).toBe('25 / 10')
    expect(buttonWithText(card, 'ai.insert').disabled).toBe(true)
  })

  it('says when no provider is configured', async () => {
    const card = await openDialog({ content: '<p></p>' })

    expect(card.querySelector('.ai-status--warning')!.textContent).toContain('ai.unavailable')
    expect(card.querySelector('textarea')!.disabled).toBe(true)
  })

  it('sends the configured default effort and shows the reasoning collapsed', async () => {
    const aiProvider = vi.fn<TiptapifyAiProvider>(async (_request, _context, stream) => {
      stream!.onReasoning('Considering')
      stream!.onChunk('Done')

      return ''
    })
    const card = await openDialog({
      content: '<p></p>',
      options: { aiProvider, thinking: true, showReasoning: true, reasoningEffort: { options: ['low', 'high'], default: 'high' } },
    })

    await pressEnter(await typePrompt(card, 'Write'))

    expect(aiProvider.mock.calls[0][0]).toMatchObject({ reasoning_effort: 'high' })
    expect(aiProvider.mock.calls[0][0]).not.toHaveProperty('enable_thinking')
    expect(card.querySelector('.ai-reasoning__toggle')!.textContent).toContain('ai.thought_for')
    expect(card.querySelector('.ai-reasoning__text')).toBeNull()

    card.querySelector<HTMLButtonElement>('.ai-reasoning__toggle')!.click()
    await flush()

    expect(card.querySelector('.ai-reasoning__text')!.textContent).toBe('Considering')
  })

  it('turns thinking off from the one compact control', async () => {
    const aiProvider = vi.fn<TiptapifyAiProvider>(async () => 'Done')
    const card = await openDialog({ content: '<p></p>', options: { aiProvider, thinking: true } })
    const control = card.querySelector<HTMLButtonElement>('.ai-thinking')!

    expect(control.textContent).toContain('ai.thinking_label.on')

    control.click()
    await flush()
    const off = [...document.querySelectorAll<HTMLElement>('.v-list-item')].find(item => item.textContent?.includes('ai.thinking_states.off'))!
    off.click()
    await flush()

    expect(control.textContent).toContain('ai.thinking_label.off')

    await pressEnter(await typePrompt(card, 'Write'))

    expect(aiProvider.mock.calls[0][0]).toMatchObject({ enable_thinking: false })
  })

  it('shows the word changes against the selection and regenerates another version', async () => {
    let version = 0
    const aiProvider = vi.fn<TiptapifyAiProvider>(async () => (++version === 1 ? 'Hello there' : 'Hi there'))
    const card = await openDialog({ content: '<p>Hello world</p>', selection: { from: 1, to: 12 }, options: { aiProvider } })

    await pressEnter(await typePrompt(card, 'Rewrite'))
    buttonWithText(card, 'ai.changes').click()
    await flush()

    expect(card.querySelector('.ai-diff__delete')!.textContent).toBe('world')
    expect(card.querySelector('.ai-diff__insert')!.textContent).toBe('there')

    await typePrompt(card, 'Something else')
    buttonWithText(card, 'ai.another_version').click()
    await flush()

    expect(aiProvider).toHaveBeenCalledTimes(2)
    expect(aiProvider.mock.calls[1][1].prompt).toBe('Rewrite')
    expect(card.querySelector('.ai-result__content')!.textContent).toBe('Hi there')
  })
})
