import { CommandProps } from '@tiptap/core'
import Link from '@tiptap/extension-link'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { EditorState, Plugin, PluginKey, Transaction } from '@tiptap/pm/state'
import { getLinkContext, LINK_MARK } from '@tiptapify/extensions/components/media/link/linkDialog'
import { LinkCardDraft, selectedLinkCard } from '@tiptapify/extensions/components/media/linkCard'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tiptapify_link: {
      showLink: (card?: LinkCardDraft) => ReturnType
    }
  }
}

const LEGACY_LINK = 'tiptapify_link'

function hasLegacyLinks(doc: ProseMirrorNode): boolean {
  let found = false
  doc.descendants((node) => {
    found ||= node.marks.some(mark => mark.type.name === LEGACY_LINK)

    return !found
  })

  return found
}

/**
 * The `tiptapify_link` marks of a document as `link` marks: a text that had both keeps its `link`, one that
 * had only the legacy mark gets a `link` with its attributes. Null when there is nothing to change.
 */
export function migrateLegacyLinks(state: EditorState): Transaction | null {
  const legacy = state.schema.marks[LEGACY_LINK]
  const link = state.schema.marks[LINK_MARK]
  if (!legacy || !link || !hasLegacyLinks(state.doc)) {
    return null
  }

  const tr = state.tr
  state.doc.descendants((node, pos) => {
    const old = node.marks.find(mark => mark.type === legacy)
    if (!old) {
      return
    }

    const end = pos + node.nodeSize
    tr.removeMark(pos, end, legacy)
    if (!link.isInSet(node.marks)) {
      const attrs = Object.fromEntries(Object.keys(link.spec.attrs ?? {}).map(name => [name, old.attrs[name] ?? null]))
      tr.addMark(pos, end, link.create(attrs))
    }
  })

  return tr.setMeta('addToHistory', false)
}

type JSONNode = { marks?: { type: string, attrs?: Record<string, unknown> }[], content?: JSONNode[], [key: string]: unknown }

/**
 * The same for the JSON content an editor starts with, before its document is made.
 */
export function migrateLegacyLinkJSON(node: JSONNode): JSONNode {
  const marks = node.marks?.some(mark => mark.type === LEGACY_LINK)
    ? node.marks
      .filter(mark => mark.type !== LEGACY_LINK || !node.marks!.some(other => other.type === LINK_MARK))
      .map(mark => (mark.type === LEGACY_LINK ? { ...mark, type: LINK_MARK } : mark))
    : node.marks

  return {
    ...node,
    ...(marks ? { marks } : {}),
    ...(node.content ? { content: node.content.map(migrateLegacyLinkJSON) } : {}),
  }
}

/**
 * The link dialog command. Links themselves are the `link` mark; the legacy `tiptapify_link` mark stays in the
 * schema only so saved JSON that still has it loads, and its marks turn into `link` as they load.
 */
export const TiptapifyLink = Link.extend({
  name: LEGACY_LINK,

  // `link` reads the links of HTML
  parseHTML() {
    return []
  },

  // No paste rules or commands of its own (`setLink`/`unsetLink` act on `link`): a second link mark would nest links
  addPasteRules() {
    return []
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('tiptapifyLegacyLinks'),
        appendTransaction: (transactions, _oldState, newState) => (
          transactions.some(tr => tr.docChanged) ? migrateLegacyLinks(newState) : null
        ),
      }),
    ]
  },

  onBeforeCreate() {
    const { content } = this.editor.options
    if (content && typeof content === 'object' && !Array.isArray(content)) {
      this.editor.options.content = migrateLegacyLinkJSON(content as JSONNode) as never
    }
  },

  addCommands() {
    return {
      showLink: card => ({ editor }: CommandProps) => {
        const { active, attrs, text } = getLinkContext(editor)

        // `link`: the attributes of the link being edited (empty when inserting a new one);
        // `text`: its text, or the text of the selection; `card`: the selected card to edit;
        // `draft`: an address to make a card of (the dialog opens showing it as a card)
        const event = new CustomEvent('tiptapify-show-link', {
          detail: {
            link: attrs,
            active,
            text,
            card: selectedLinkCard(editor),
            draft: card ?? null,
            editorId: editor.instanceId
          }
        })

        window.dispatchEvent(event)

        return true
      },
    }
  },
})
