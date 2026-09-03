import { describe, expect, it } from 'vitest'
import { Document } from '@tiptap/extension-document'
import { Editor } from '@tiptap/vue-3'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'

import { exceedsLimit } from './charLimit'

function createDoc(content: string) {
  const editor = new Editor({
    content,
    extensions: [Document, Paragraph, Text],
  })

  return { doc: editor.state.doc, destroy: () => editor.destroy() }
}

describe('exceedsLimit', () => {
  it('is false when the text fits the budget', () => {
    const { doc, destroy } = createDoc('<p>hello</p>') // 5 characters, budget 5

    expect(exceedsLimit('abcd', { doc, limit: 10, mode: 'insert' })).toBe(false)

    destroy()
  })

  it('is true when the text would exceed the limit', () => {
    const { doc, destroy } = createDoc('<p>hello</p>') // 5 characters, budget 5

    expect(exceedsLimit('abcdefgh', { doc, limit: 10, mode: 'insert' })).toBe(true)
    expect(exceedsLimit('abcdefgh', { doc, limit: 10, mode: 'append' })).toBe(true)

    destroy()
  })

  it('accounts for the freed range in replace mode', () => {
    const { doc, destroy } = createDoc('<p>hello</p>') // 5 characters

    // Replacing "hello" (1..6) frees 5 characters → budget 10, "1234567890" fits
    expect(exceedsLimit('1234567890', { doc, limit: 10, mode: 'replace', range: { from: 1, to: 6 } })).toBe(false)

    // Without the range the same text would exceed the limit
    expect(exceedsLimit('1234567890', { doc, limit: 10, mode: 'insert' })).toBe(true)

    destroy()
  })

  it('is true when the document is already at the limit', () => {
    const { doc, destroy } = createDoc('<p>1234567890</p>') // 10 characters, budget 0

    expect(exceedsLimit('x', { doc, limit: 10, mode: 'insert' })).toBe(true)

    destroy()
  })
})