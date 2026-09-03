import { describe, expect, it } from 'vitest'
import { Editor } from '@tiptap/vue-3'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { CharacterCount } from '@tiptap/extensions'

function createEditor() {
  return new Editor({
    content: '<p>hello</p>',
    extensions: [Document, Paragraph, Text, CharacterCount.configure({ limit: 100 })],
  })
}

describe('character count limit', () => {
  it('rejects an insert that would exceed the character limit', () => {
    const editor = createEditor()
    const before = JSON.stringify(editor.getJSON())

    editor.chain().focus().insertContent('a'.repeat(200)).run()

    // The CharacterCount filterTransaction rejects the transaction, so the doc is unchanged
    expect(JSON.stringify(editor.getJSON())).toBe(before)

    editor.destroy()
  })
})