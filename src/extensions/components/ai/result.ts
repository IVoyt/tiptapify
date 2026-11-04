import { createNodeFromContent } from '@tiptap/core'
import type { Editor } from '@tiptap/core'
import { DOMSerializer, Fragment } from '@tiptap/pm/model'
import type { Node, Schema } from '@tiptap/pm/model'
import type { TiptapifyAiMode } from '@tiptapify/types/editor'

/**
 * Where a result goes: `replace` the selection, `below` it (after its block), `insert`
 * at the cursor or `append` to the end of the document
 */
export type AiApplyAction = 'replace' | 'below' | 'insert' | 'append'

export type AiRange = { from: number, to: number }

/**
 * The primary and the secondary action of the dialog. With a selection the result
 * replaces it or goes below it; without one it goes to the cursor or the end. A
 * configured `append` mode keeps appending as the primary action.
 */
export function aiActions(hasSelection: boolean, configuredMode?: TiptapifyAiMode): [AiApplyAction, AiApplyAction] {
  if (configuredMode === 'append') {
    return ['append', hasSelection ? 'replace' : 'insert']
  }

  return hasSelection ? ['replace', 'below'] : ['insert', 'append']
}

/**
 * The result as the editor will insert it: `insertContent` parses the string as HTML
 * (plain text stays text, whitespace kept), so parsing it with the editor schema
 * gives the exact content, without anything the schema does not know (scripts, event
 * attributes, unsafe links)
 */
export function parseAiResult(content: string, schema: Schema): Fragment {
  if (!content) {
    return Fragment.empty
  }

  try {
    const parsed = createNodeFromContent(content, schema, { parseOptions: { preserveWhitespace: 'full' } })

    return parsed instanceof Fragment ? parsed : Fragment.from(parsed)
  } catch {
    return Fragment.from(schema.text(content))
  }
}

/** The text of the result counted like the CharacterCount extension counts the document */
export function countedText(fragment: Fragment): string {
  return fragment.textBetween(0, fragment.size, undefined, ' ')
}

/** The text of the result with block boundaries as new lines, to compare it with the selected text */
export function plainText(fragment: Fragment): string {
  return fragment.textBetween(0, fragment.size, '\n')
}

/** DOM of the parsed result for the preview, built by the schema's own `renderHTML` */
export function renderAiResult(fragment: Fragment, schema: Schema, target: HTMLElement) {
  try {
    target.replaceChildren(DOMSerializer.fromSchema(schema).serializeFragment(fragment, { document: target.ownerDocument }))
  } catch {
    target.textContent = plainText(fragment)
  }
}

/**
 * The document length after the action, counted like the CharacterCount extension:
 * replacing frees the characters of the selected range
 */
export function projectedCharacters(doc: Node, resultText: string, action: AiApplyAction, range: AiRange | null): number {
  const current = doc.textBetween(0, doc.content.size, undefined, ' ').length
  const removed = action === 'replace' && range ? doc.textBetween(range.from, range.to, undefined, ' ').length : 0

  return current - removed + resultText.length
}

/** Right after the top-level block that holds `pos` (a position between blocks stays as is) */
export function positionBelow(doc: Node, pos: number): number {
  const $pos = doc.resolve(pos)

  return $pos.depth > 0 ? $pos.after(1) : pos
}

export function applyAiResult(editor: Editor, action: AiApplyAction, content: string, range: AiRange | null) {
  const chain = editor.chain().focus()

  if (action === 'replace' && range) {
    chain.deleteRange(range)
  }

  if (action === 'append') {
    chain.insertContentAt(editor.state.doc.content.size, content)
  } else if (action === 'below') {
    chain.insertContentAt(positionBelow(editor.state.doc, range?.to ?? editor.state.selection.to), content)
  } else {
    chain.insertContent(content)
  }

  return chain.run()
}
