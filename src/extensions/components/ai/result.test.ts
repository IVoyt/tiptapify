import { afterEach, describe, expect, it } from 'vitest'
import { Editor } from '@tiptap/core'
import { Bold } from '@tiptap/extension-bold'
import { Document } from '@tiptap/extension-document'
import { Link } from '@tiptap/extension-link'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { exceedsLimit } from './charLimit'
import {
  aiActions,
  AiApplyAction,
  applyAiResult,
  countedText,
  parseAiResult,
  plainText,
  positionBelow,
  projectedCharacters,
  renderAiResult,
} from './result'

let editor: Editor | null = null

function createEditor(content: string) {
  editor = new Editor({
    element: document.createElement('div'),
    content,
    extensions: [Document, Paragraph, Text, Bold, Link],
  })

  return editor
}

afterEach(() => {
  editor?.destroy()
  editor = null
})

describe('aiActions', () => {
  it('replaces or goes below a selection, inserts or appends without one', () => {
    expect(aiActions(true)).toEqual(['replace', 'below'])
    expect(aiActions(false)).toEqual(['insert', 'append'])
    expect(aiActions(true, 'insert')).toEqual(['replace', 'below'])
  })

  it('keeps a configured append mode as the primary action', () => {
    expect(aiActions(false, 'append')).toEqual(['append', 'insert'])
    expect(aiActions(true, 'append')).toEqual(['append', 'replace'])
  })
})

describe('parseAiResult and renderAiResult', () => {
  it('renders HTML through the schema, without scripts, handlers or unsafe links', () => {
    const { schema } = createEditor('<p></p>')
    const fragment = parseAiResult('<p onclick="x()">Hi <b>there</b><script>alert(1)</script> <a href="javascript:alert(1)">link</a></p>', schema)
    const target = document.createElement('div')

    renderAiResult(fragment, schema, target)

    expect(target.innerHTML).toBe('<p>Hi <strong>there</strong> link</p>')
  })

  it('keeps plain text and its line breaks as they will be inserted', () => {
    const { schema } = createEditor('<p></p>')
    const fragment = parseAiResult('First line\n\nSecond', schema)

    expect(plainText(fragment)).toBe('First line\n\nSecond')
    expect(countedText(fragment)).toBe('First line\n\nSecond')
  })

  it('counts paragraphs of a result without separators, like the CharacterCount extension', () => {
    const { schema } = createEditor('<p></p>')
    const fragment = parseAiResult('<p>ab</p><p>cd</p>', schema)

    expect(countedText(fragment)).toBe('abcd')
    expect(plainText(fragment)).toBe('ab\ncd')
  })

  it('is empty for an empty result', () => {
    const { schema } = createEditor('<p></p>')

    expect(parseAiResult('', schema).size).toBe(0)
  })
})

describe('projectedCharacters', () => {
  it('agrees with the limit check of the dialog', () => {
    const { state } = createEditor('<p>Hello world</p>')
    const range = { from: 1, to: 6 }
    const cases: Array<[AiApplyAction, number]> = [['replace', 15], ['insert', 10], ['below', 10], ['append', 10]]

    for (const [action, length] of cases) {
      const text = 'x'.repeat(length)
      const projected = projectedCharacters(state.doc, text, action, range)
      const mode = action === 'replace' ? 'replace' : 'insert'

      expect(projected > 20).toBe(exceedsLimit(text, { doc: state.doc, limit: 20, mode, range }))
      expect(projected > 21).toBe(exceedsLimit(text, { doc: state.doc, limit: 21, mode, range }))
    }
  })
})

describe('applyAiResult', () => {
  it('replaces the selected range', () => {
    const instance = createEditor('<p>Hello world</p>')
    instance.commands.setTextSelection({ from: 7, to: 12 })

    applyAiResult(instance, 'replace', 'there', { from: 7, to: 12 })

    expect(instance.getHTML()).toBe('<p>Hello there</p>')
  })

  it('inserts below the block of the selection, keeping it', () => {
    const instance = createEditor('<p>Hello world</p><p>Last</p>')

    applyAiResult(instance, 'below', 'New text', { from: 7, to: 12 })

    expect(instance.getHTML()).toBe('<p>Hello world</p><p>New text</p><p>Last</p>')
  })

  it('inserts HTML below the selection', () => {
    const instance = createEditor('<p>Hello</p>')

    applyAiResult(instance, 'below', '<p><b>Bold</b></p>', { from: 1, to: 6 })

    expect(instance.getHTML()).toBe('<p>Hello</p><p><strong>Bold</strong></p>')
  })

  it('inserts at the cursor and appends to the end', () => {
    const instance = createEditor('<p>Hello</p><p>World</p>')
    instance.commands.setTextSelection(6)

    applyAiResult(instance, 'insert', '!', null)
    applyAiResult(instance, 'append', '<p>End</p>', null)

    expect(instance.getHTML()).toBe('<p>Hello!</p><p>World</p><p>End</p>')
  })

  it('finds the position below a nested block at the top level', () => {
    const { state } = createEditor('<p>One</p><p>Two</p>')

    expect(positionBelow(state.doc, 2)).toBe(5)
    expect(positionBelow(state.doc, state.doc.content.size)).toBe(state.doc.content.size)
  })
})
