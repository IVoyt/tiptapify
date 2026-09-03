import type { Node } from '@tiptap/pm/model'
import type { TiptapifyAiMode } from '@tiptapify/types/editor'

export type CharLimitOptions = {
  doc: Node
  limit: number
  mode: TiptapifyAiMode
  range?: { from: number, to: number } | null
}

/**
 * Whether inserting `text` would push the document past `limit` characters,
 * counted the same way as the CharacterCount extension (textSize mode, default
 * counter: the length of the document text with a single space per block boundary).
 *
 * In replace mode the characters of the selected `range` are freed by the
 * removal that precedes the insert, so they are added back to the budget.
 */
export function exceedsLimit(text: string, options: CharLimitOptions): boolean {
  const { doc, limit, mode, range } = options
  const currentChars = doc.textBetween(0, doc.content.size, undefined, ' ').length

  let removedChars = 0
  if (mode === 'replace' && range) {
    removedChars = doc.textBetween(range.from, range.to, undefined, ' ').length
  }

  const budget = limit - currentChars + removedChars
  return text.length > budget
}