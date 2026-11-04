import { afterEach, describe, expect, it, vi } from 'vitest'
import { Editor } from '@tiptap/vue-3'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { UndoRedo } from '@tiptap/extensions'
import {
  ResetChanges,
  resetChanges,
  resetConfirmationOff,
  turnOffResetConfirmation,
} from '@tiptapify/extensions/components/actions/reset/resetChanges'

let editor: Editor | null = null

function createEditor(content: string, onUpdate: () => void = () => {}) {
  editor = new Editor({
    element: document.createElement('div'),
    content,
    extensions: [Document, Paragraph, Text, UndoRedo, ResetChanges],
    onUpdate,
  })

  return editor
}

afterEach(() => {
  editor?.destroy()
  editor = null
  vi.restoreAllMocks()
  localStorage.clear()
})

describe('the reset confirmation', () => {
  it('asks until the user turns it off, and remembers that', () => {
    expect(resetConfirmationOff()).toBe(false)

    turnOffResetConfirmation()

    expect(resetConfirmationOff()).toBe(true)
    expect(localStorage.getItem('tiptapify:reset-changes:confirm')).toBe('off')
  })

  it('keeps asking where the storage is blocked', () => {
    vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
      throw new Error('blocked')
    })

    expect(() => turnOffResetConfirmation()).not.toThrow()
    expect(resetConfirmationOff()).toBe(false)
  })
})

describe('resetChanges', () => {
  it('returns the document to the content the editor opened with', () => {
    const instance = createEditor('<p>Original</p>')
    instance.commands.insertContentAt(instance.state.doc.content.size, '<p>Added</p>')
    instance.commands.setContent('<p>Replaced</p>')

    expect(resetChanges(instance)).toBe(true)

    expect(instance.getHTML()).toBe('<p>Original</p>')
  })

  it('empties the undo and redo history, so the reset itself cannot be undone', () => {
    const instance = createEditor('<p>Original</p>')
    instance.commands.insertContentAt(instance.state.doc.content.size, '<p>Added</p>')
    instance.commands.insertContentAt(instance.state.doc.content.size, '<p>More</p>')
    instance.commands.undo()
    expect(instance.can().redo()).toBe(true)

    resetChanges(instance)

    expect(instance.can().undo()).toBe(false)
    expect(instance.can().redo()).toBe(false)

    instance.commands.insertContentAt(instance.state.doc.content.size, '<p>After</p>')
    instance.commands.undo()
    expect(instance.getHTML()).toBe('<p>Original</p>')
  })

  it('does nothing before the first change', () => {
    const instance = createEditor('<p>Original</p>')

    expect(resetChanges(instance)).toBe(false)
    expect(instance.getHTML()).toBe('<p>Original</p>')
  })

  it('reports the reset as a content change, for the host to save', () => {
    let updates = 0
    const instance = createEditor('<p>Original</p>', () => updates++)
    instance.commands.insertContentAt(instance.state.doc.content.size, '<p>Added</p>')
    updates = 0

    resetChanges(instance)

    expect(updates).toBe(1)
  })
})
