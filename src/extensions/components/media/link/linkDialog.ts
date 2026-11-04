import { Editor, getMarkRange } from '@tiptap/core'
import { LinkCardAttrs } from '@tiptapify/extensions/components/media/linkCard'

// Legacy `tiptapify_link` marks turn into this one as content loads (`migrateLegacyLinks` in ./index.ts)
export const LINK_MARK = 'link'

// Link types from the HTML spec, offered as suggestions; any other value is accepted too
export const REL_SUGGESTIONS = [
  'alternate', 'author', 'bookmark', 'external', 'help', 'license', 'me', 'next', 'nofollow', 'noopener',
  'noreferrer', 'opener', 'prev', 'privacy-policy', 'search', 'sponsored', 'tag', 'ugc',
]

// Added automatically to a link that opens in a new tab
export const NEW_TAB_REL = ['noopener', 'noreferrer']

export interface LinkContext {
  // A link is under the caret or selected: the dialog edits it
  active: boolean
  attrs: Record<string, unknown>
  // Text of the link being edited, or of the selection
  text: string
}

export interface LinkForm {
  href: string
  text: string
  newTab: boolean
  rel: string[]
  cssClass: string
}

const schemeRegex = /^[a-z][a-z0-9+-]*:/i
// A host with a dot (optionally a port), then a path, query, fragment or the end
const hostRegex = /^[^\s/?#@:]+\.[^\s/?#@:.]+(:\d+)?([/?#]|$)/
// A host with a port and no dot (`localhost:8080`): it looks like a scheme, but the digits are a port
const hostPortRegex = /^[^\s/?#@:.]+:\d+([/?#]|$)/

// Offered when an address has no protocol: the editor never picks one itself
export const LINK_PROTOCOLS = ['https', 'http', 'ftp']

/**
 * An address of a host typed without a protocol (`example.com/page`, `internal.com:21`, `localhost:8080`):
 * a browser can't open it, and only the author knows which protocol it is, so the dialog asks for one.
 * Explicit protocols, anchors, relative paths and queries are complete
 */
export function missingProtocol(value: string): boolean {
  const href = (value ?? '').trim()

  return hostPortRegex.test(href) || (!schemeRegex.test(href) && hostRegex.test(href))
}

export function withProtocol(value: string, protocol: string): string {
  return `${protocol}://${(value ?? '').trim()}`
}

/**
 * Rel values from an attribute string or a list (chips, pasted text): split on spaces and commas,
 * trimmed, lowercased, deduplicated
 */
export function parseRel(value: string | string[] | null | undefined): string[] {
  const parts = Array.isArray(value) ? value : [value ?? '']
  const values = parts.flatMap(part => String(part ?? '').split(/[\s,]+/))
    .map(item => item.trim().toLowerCase())
    .filter(Boolean)

  return [...new Set(values)]
}

export function serializeRel(values: string[]): string | null {
  const rel = parseRel(values)

  return rel.length ? rel.join(' ') : null
}

export function withNewTabRel(rel: string[], newTab: boolean): string[] {
  return newTab ? parseRel([...rel, ...NEW_TAB_REL]) : parseRel(rel)
}

// The values the form shows: those added automatically for a new tab are implied by the checkbox
export function formRel(rel: string | null | undefined, newTab: boolean): string[] {
  const values = parseRel(rel)

  return newTab ? values.filter(item => !NEW_TAB_REL.includes(item)) : values
}

export function hasAdvancedValues(rel: string[], cssClass: string): boolean {
  return rel.some(item => !NEW_TAB_REL.includes(item)) || cssClass.trim() !== ''
}

export function linkAttrs(form: LinkForm) {
  return {
    href: form.href.trim(),
    target: form.newTab ? '_blank' : null,
    rel: serializeRel(withNewTabRel(form.rel, form.newTab)),
    class: form.cssClass.trim() || null,
  }
}

export function getLinkContext(editor: Editor): LinkContext {
  const { state } = editor
  const { selection, doc } = state
  const markType = state.schema.marks[LINK_MARK]
  const range = markType && editor.isActive(LINK_MARK) ? getMarkRange(selection.$from, markType) : undefined

  if (range) {
    return { active: true, attrs: editor.getAttributes(LINK_MARK), text: doc.textBetween(range.from, range.to, ' ') }
  }

  return { active: false, attrs: {}, text: doc.textBetween(selection.from, selection.to, ' ') }
}

/**
 * Sets the link on the selection or on the whole link being edited. A changed text (or no text
 * to link) replaces the range with the text carrying the link; otherwise only the mark is set,
 * which keeps the attributes the dialog does not know about (e.g. `title`)
 */
export function applyLink(editor: Editor, form: LinkForm, context: LinkContext): boolean {
  const attrs = linkAttrs(form)
  const replaceText = form.text !== context.text || (!context.active && editor.state.selection.empty)
  const chain = editor.chain().focus().extendMarkRange(LINK_MARK).setMeta('preventAutolink', true)

  if (!replaceText) {
    return chain.setMark(LINK_MARK, attrs).run()
  }

  const text = form.text.trim() ? form.text : attrs.href

  return chain
    .insertContent({ type: 'text', text, marks: [{ type: LINK_MARK, attrs: { ...context.attrs, ...attrs } }] })
    // The mark is inclusive: what is typed right after the new link must not extend it
    .unsetMark(LINK_MARK)
    .run()
}

export function removeLink(editor: Editor): boolean {
  return editor.chain().focus().extendMarkRange(LINK_MARK).unsetMark(LINK_MARK).run()
}

/**
 * The link being edited (or the selection, or the caret) replaced with a card of the link. A link that is
 * the whole text of its paragraph takes the paragraph's place, as does a card made in an empty paragraph.
 */
export function linkToCard(editor: Editor, attrs: LinkCardAttrs, context: LinkContext): boolean {
  const { state } = editor
  const { $from } = state.selection
  const markType = state.schema.marks[LINK_MARK]
  const range = (context.active && markType ? getMarkRange($from, markType) : undefined)
    ?? { from: state.selection.from, to: state.selection.to }
  const wholeParagraph = $from.parent.type.name === 'paragraph' && $from.depth > 0
    && range.from === $from.start() && range.to === $from.end()
  const target = wholeParagraph ? { from: $from.before(), to: $from.after() } : range

  return editor.chain().focus().insertContentAt(target, { type: 'linkCard', attrs }).run()
}
