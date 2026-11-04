import { Editor, Extension } from '@tiptap/core'
import { EditorState, Plugin, PluginKey, Transaction } from '@tiptap/pm/state'
import { LinkCardAttrs } from '@tiptapify/extensions/components/media/linkCard'

// A link pasted alone into an empty paragraph: its paragraph (mapped through later changes) and its address
export type PastedLinkState = { pos: number, url: string }

// The pasted link the menu offers to show as a card: the paragraph range and the link text range in it
export type PastedLink = { url: string, from: number, to: number, paragraphFrom: number, paragraphTo: number }

// The class of the paste menu: the editor losing focus to it keeps the pasted link
export const PASTE_CARD_MENU_CLASS = 'tiptapify-link-card-paste'

export const linkCardPasteKey = new PluginKey<PastedLinkState | null>('linkCardPaste')

/**
 * The text as one http(s) address, as typed (no protocol of our own), or null: anything else, spaces
 * inside included, is ordinary text.
 */
export function pastedLinkUrl(text: string | null | undefined): string | null {
  const url = (text ?? '').trim()

  if (!url || /\s/.test(url)) {
    return null
  }

  try {
    const { protocol } = new URL(url)

    return protocol === 'http:' || protocol === 'https:' ? url : null
  } catch {
    return null
  }
}

function isEmptyParagraph(state: EditorState): boolean {
  const { selection } = state
  const parent = selection.$from.parent

  return selection.empty && parent.type.name === 'paragraph' && parent.content.size === 0
}

// The paragraph a paste into an empty paragraph produced, when it holds just one address
function trackPaste(tr: Transaction, oldState: EditorState): PastedLinkState | null {
  if (!isEmptyParagraph(oldState)) {
    return null
  }

  const { $from } = tr.selection
  const url = $from.parent.type.name === 'paragraph' ? pastedLinkUrl($from.parent.textContent) : null

  return url && $from.depth > 0 ? { pos: $from.before(), url } : null
}

function blurredToMenu(meta: unknown): boolean {
  const target = (meta as { event?: FocusEvent } | undefined)?.event?.relatedTarget

  return target instanceof Element && !!target.closest(`.${PASTE_CARD_MENU_CLASS}`)
}

function applyTransaction(tr: Transaction, value: PastedLinkState | null, oldState: EditorState): PastedLinkState | null {
  if (tr.getMeta('paste') || tr.getMeta('uiEvent') === 'paste') {
    return trackPaste(tr, oldState)
  }

  if (!value || tr.getMeta(linkCardPasteKey)?.dismiss) {
    return null
  }

  // What the paste brought along: the link mark of the paste rules
  if (tr.getMeta('appendedTransaction')) {
    return { ...value, pos: tr.mapping.map(value.pos) }
  }

  // Typing, a moved selection or the editor left for anything but the menu
  if (tr.docChanged || !tr.selection.eq(oldState.selection) || (tr.getMeta('blur') && !blurredToMenu(tr.getMeta('blur')))) {
    return null
  }

  return value
}

/**
 * The pasted link with its ranges, while it is still the whole text of its paragraph.
 */
export function pastedLink(state: EditorState): PastedLink | null {
  const tracked = linkCardPasteKey.getState(state)
  const node = tracked ? state.doc.nodeAt(tracked.pos) : null

  if (!tracked || !node || node.type.name !== 'paragraph' || pastedLinkUrl(node.textContent) !== tracked.url) {
    return null
  }

  const paragraphTo = tracked.pos + node.nodeSize

  return { url: tracked.url, from: tracked.pos + 1, to: paragraphTo - 1, paragraphFrom: tracked.pos, paragraphTo }
}

export function dismissPastedLink(editor: Editor): void {
  if (linkCardPasteKey.getState(editor.state)) {
    editor.view.dispatch(editor.state.tr.setMeta(linkCardPasteKey, { dismiss: true }).setMeta('addToHistory', false))
  }
}

/**
 * The paragraph of the pasted link replaced with the card of that link; false when the link is gone
 * (the author typed or moved on meanwhile).
 */
export function replacePastedLink(editor: Editor, attrs: LinkCardAttrs): boolean {
  const link = pastedLink(editor.state)

  if (!link || link.url !== attrs.href) {
    return false
  }

  return editor.chain()
    .focus()
    .insertContentAt({ from: link.paragraphFrom, to: link.paragraphTo }, { type: 'linkCard', attrs })
    .setMeta(linkCardPasteKey, { dismiss: true })
    .run()
}

/**
 * Remembers a link pasted alone into an empty paragraph, so the paste menu can offer it as a card. The
 * paste itself is left as it is (a link); nothing is replaced unless the author picks the card. Any
 * typing, a moved selection, leaving the editor or Esc forgets it.
 */
export const LinkCardPaste = Extension.create({
  name: 'linkCardPaste',

  addProseMirrorPlugins() {
    return [
      new Plugin<PastedLinkState | null>({
        key: linkCardPasteKey,
        state: {
          init: () => null,
          apply: (tr, value, oldState) => applyTransaction(tr, value, oldState),
        },
        props: {
          handleKeyDown: (view, event) => {
            if (event.key !== 'Escape' || !linkCardPasteKey.getState(view.state)) {
              return false
            }

            view.dispatch(view.state.tr.setMeta(linkCardPasteKey, { dismiss: true }).setMeta('addToHistory', false))

            return true
          },
        },
      }),
    ]
  },
})
