import { afterEach, describe, expect, it } from 'vitest'
import { Editor } from '@tiptap/core'
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { countWords, describeAiContext, excerpt, selectedTextOf, textAround, wholeWordRange } from './context'

let editor: Editor | null = null

function docOf(content: string) {
  editor = new Editor({ content, extensions: [Document, Paragraph, Text] })

  return editor.state.doc
}

afterEach(() => {
  editor?.destroy()
  editor = null
})

describe('excerpt', () => {
  it('keeps short text whole on one line', () => {
    expect(excerpt('  Hello\n  world  ')).toBe('Hello world')
  })

  it('cuts after the first words', () => {
    expect(excerpt('one two three four five six seven eight')).toBe('one two three four five six…')
  })

  it('cuts a very long word run by characters', () => {
    expect(excerpt('a'.repeat(100), 6, 10)).toBe(`${'a'.repeat(10)}…`)
  })
})

describe('countWords', () => {
  it('counts words separated by any whitespace', () => {
    expect(countWords('')).toBe(0)
    expect(countWords('  one\ttwo\n\nthree ')).toBe(3)
  })
})

describe('describeAiContext', () => {
  it('describes a selection over two paragraphs', () => {
    const doc = docOf('<p>Hello world</p><p>Second part</p>')
    // From inside the first paragraph to the middle of the second
    const info = describeAiContext(doc, 7, 20)

    expect(info).toEqual({
      kind: 'selection',
      paragraphs: 2,
      characters: 'world'.length + 'Second'.length,
      excerpt: 'world Second',
    })
  })

  it('does not count a paragraph the selection only touches at its start', () => {
    const doc = docOf('<p>Hello</p><p>World</p>')
    // From the start of "Hello" to the start of "World"
    expect(describeAiContext(doc, 1, 8).paragraphs).toBe(1)
  })

  it('falls back to the whole text without a selection, as the request does', () => {
    const doc = docOf('<p>Hello</p>')

    expect(describeAiContext(doc, 3, 3).kind).toBe('document')
    expect(selectedTextOf(doc, 3, 3)).toBe('')
  })

  it('is only the cursor in an empty document', () => {
    expect(describeAiContext(docOf('<p></p>'), 1, 1).kind).toBe('cursor')
  })

  it('sends the selected blocks separated by new lines', () => {
    const doc = docOf('<p>Hello</p><p>World</p>')

    expect(selectedTextOf(doc, 0, doc.content.size)).toBe('Hello\nWorld')
  })
})

describe('wholeWordRange', () => {
  // Positions of `<p>…</p>`: the text starts at 1
  const text = 'The talks has entered a new stage.'
  const at = (part: string) => 1 + text.indexOf(part)

  function selected(from: number, to: number) {
    const doc = docOf(`<p>${text}</p>`)
    const range = wholeWordRange(doc, from, to)

    return doc.textBetween(range.from, range.to)
  }

  it('takes the whole word a selection ends inside of', () => {
    expect(selected(1, at('ew stage'))).toBe('The talks has entered a new')
  })

  it('takes the whole word a selection starts inside of', () => {
    expect(selected(at('alks'), at(' has'))).toBe('talks')
  })

  it('keeps a selection on word boundaries', () => {
    expect(selected(at('talks'), at(' has'))).toBe('talks')
    expect(selected(at(' has'), at(' entered'))).toBe(' has')
    expect(selected(at('stage'), at('.') + 1)).toBe('stage.')
  })

  it('widens a selection inside one word to the word', () => {
    expect(selected(at('nter'), at('red'))).toBe('entered')
  })

  it('keeps an apostrophe inside a word', () => {
    const doc = docOf('<p>We don\'t stop</p>')
    const range = wholeWordRange(doc, 1, 6)

    expect(doc.textBetween(range.from, range.to)).toBe('We don\'t')
  })

  it('leaves a collapsed selection and one across paragraphs on boundaries alone', () => {
    const doc = docOf('<p>one two</p><p>three four</p>')

    expect(wholeWordRange(doc, 3, 3)).toEqual({ from: 3, to: 3 })
    expect(doc.textBetween(...Object.values(wholeWordRange(doc, 6, 13)) as [number, number], '\n')).toBe('two\nthree')
  })
})

describe('textAround', () => {
  it('gives the text of the selection\'s paragraph before and after it', () => {
    const doc = docOf('<p>First one.</p><p>The talks has entered a new stage.</p><p>Last one.</p>')
    const from = 13 + 'The talks '.length
    const to = from + 'has'.length

    expect(doc.textBetween(from, to)).toBe('has')
    expect(textAround(doc, from, to)).toEqual({ before: 'The talks ', after: ' entered a new stage.' })
  })

  it('gives nothing around a whole paragraph or a collapsed selection', () => {
    const doc = docOf('<p>one two</p>')

    expect(textAround(doc, 1, 8)).toEqual({ before: '', after: '' })
    expect(textAround(doc, 3, 3)).toEqual({ before: '', after: '' })
  })

  it('takes at most 500 characters on each side, the nearest ones', () => {
    const doc = docOf(`<p>${'a'.repeat(600)}X${'b'.repeat(600)}</p>`)
    const { before, after } = textAround(doc, 601, 602)

    expect(before).toBe('a'.repeat(500))
    expect(after).toBe('b'.repeat(500))
  })
})
