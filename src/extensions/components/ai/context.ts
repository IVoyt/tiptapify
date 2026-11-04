import type { Node } from '@tiptap/pm/model'

/**
 * What a request works on: the selected text, or (no selection) the whole document with the result
 * going to the cursor; an empty document gives only the cursor.
 */
export type AiContextKind = 'selection' | 'document' | 'cursor'

export type AiContextInfo = {
  kind: AiContextKind,
  paragraphs: number,
  characters: number,
  excerpt: string,
}

const EXCERPT_WORDS = 6
const EXCERPT_CHARS = 60

export function words(text: string): string[] {
  return text.split(/\s+/).filter(Boolean)
}

export function countWords(text: string): number {
  return words(text).length
}

/** The first words of `text` on one line, with an ellipsis when something is cut off */
export function excerpt(text: string, maxWords = EXCERPT_WORDS, maxChars = EXCERPT_CHARS): string {
  const all = words(text)
  let value = all.slice(0, maxWords).join(' ')
  let cut = all.length > maxWords

  if (value.length > maxChars) {
    value = value.slice(0, maxChars).trimEnd()
    cut = true
  }

  return cut ? `${value}…` : value
}

// A letter, a mark or a digit, and an apostrophe inside a word (don't, l'homme)
const WORD_CHAR = /[\p{L}\p{M}\p{N}_'’]/u

// One character per position of the text block's content: text as is, an inline leaf (image, break) as one char
const LEAF_CHAR = '\uFFFC'

function isWordAt(text: string, index: number): boolean {
  return index >= 0 && index < text.length && WORD_CHAR.test(text[index])
}

/**
 * The selection widened to whole words: a selection that starts or ends inside a word takes the whole word,
 * or the result replacing it would leave the rest of the word behind.
 * A collapsed selection, or one already on word boundaries, stays as is.
 */
export function wholeWordRange(doc: Node, from: number, to: number): { from: number, to: number } {
  if (from === to) {
    return { from, to }
  }

  const widen = (pos: number, side: -1 | 1): number => {
    const $pos = doc.resolve(pos)
    if (!$pos.parent.isTextblock) {
      return pos
    }

    const text = $pos.parent.textBetween(0, $pos.parent.content.size, undefined, LEAF_CHAR)
    let offset = $pos.parentOffset
    if (!isWordAt(text, offset - 1) || !isWordAt(text, offset)) {
      return pos
    }

    while (side < 0 ? isWordAt(text, offset - 1) : isWordAt(text, offset)) {
      offset += side
    }

    return $pos.start() + offset
  }

  return { from: widen(from, -1), to: widen(to, 1) }
}

const AROUND_CHARS = 500

/**
 * The text of the selection's paragraphs before and after it, at most `AROUND_CHARS` on each side (cut at the
 * far end).
 */
export function textAround(doc: Node, from: number, to: number): { before: string, after: string } {
  if (from === to) {
    return { before: '', after: '' }
  }

  const $from = doc.resolve(from)
  const $to = doc.resolve(to)
  const before = $from.parent.isTextblock ? doc.textBetween($from.start(), from, '\n') : ''
  const after = $to.parent.isTextblock ? doc.textBetween(to, $to.end(), '\n') : ''

  return { before: before.slice(-AROUND_CHARS), after: after.slice(0, AROUND_CHARS) }
}

/**
 * The same text the dialog sends as `selectedText` (block boundaries as new lines):
 * an empty string means the request falls back to the whole document
 */
export function selectedTextOf(doc: Node, from: number, to: number): string {
  return from === to ? '' : doc.textBetween(from, to, '\n')
}

export function describeAiContext(doc: Node, from: number, to: number): AiContextInfo {
  const selectedText = selectedTextOf(doc, from, to)

  if (!selectedText) {
    return {
      kind: doc.textContent.trim() ? 'document' : 'cursor',
      paragraphs: 0,
      characters: 0,
      excerpt: '',
    }
  }

  // A text block counts only when some of its text is selected: a selection that
  // ends at the very start of the next paragraph does not count that paragraph
  let paragraphs = 0
  doc.nodesBetween(from, to, (node, pos) => {
    if (!node.isTextblock) {
      return true
    }

    const start = Math.max(from, pos + 1)
    const end = Math.min(to, pos + 1 + node.content.size)
    if (end > start) {
      paragraphs++
    }

    return false
  })

  return {
    kind: 'selection',
    paragraphs: Math.max(paragraphs, 1),
    characters: doc.textBetween(from, to, '').length,
    excerpt: excerpt(selectedText),
  }
}
