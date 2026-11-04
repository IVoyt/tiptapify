import { Editor, Node } from '@tiptap/core'
import { NodeSelection, Plugin, PluginKey } from '@tiptap/pm/state'

export type LinkCardLayout = 'compact' | 'large' | 'text'

export type LinkCardAttrs = {
  href: string,
  title: string | null,
  description: string | null,
  image: string | null,
  siteName: string | null,
  layout: LinkCardLayout,
  newTab: boolean,
}

// An address the link dialog opens with to make a card of
export type LinkCardDraft = { href: string, newTab?: boolean }

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    linkCard: {
      setLinkCard: (attrs: Partial<LinkCardAttrs> & { href: string }) => ReturnType
      showLinkCard: (draft?: LinkCardDraft) => ReturnType
    }
  }
}

const name = 'linkCard'
const LAYOUTS: LinkCardLayout[] = ['compact', 'large', 'text']
const CLASS = 'tiptapify-link-card'

function childText(element: HTMLElement, part: string): string | null {
  return element.querySelector(`.${CLASS}__${part}`)?.textContent?.trim() || null
}

function span(part: string, text: string | null): unknown[] {
  return text ? [['span', { class: `${CLASS}__${part}` }, text]] : []
}

/**
 * A link shown as a card with the page's OpenGraph data (image, site, title, description). Its own node, not
 * an image with a link, so the link dialog edits it; saved as one `<a>`, so the whole card is a link.
 */
export const LinkCard = Node.create({
  name,

  group: 'block',

  atom: true,

  draggable: true,

  addAttributes() {
    return {
      href: { default: '', rendered: false, parseHTML: element => element.getAttribute('href') ?? '' },
      title: { default: null, rendered: false, parseHTML: element => childText(element, 'title') },
      description: { default: null, rendered: false, parseHTML: element => childText(element, 'description') },
      image: {
        default: null,
        rendered: false,
        parseHTML: element => element.querySelector(`.${CLASS}__image`)?.getAttribute('src') || null,
      },
      siteName: { default: null, rendered: false, parseHTML: element => childText(element, 'site') },
      layout: {
        default: 'compact',
        rendered: false,
        parseHTML: (element) => {
          const layout = element.getAttribute('data-link-card') as LinkCardLayout

          return LAYOUTS.includes(layout) ? layout : 'compact'
        },
      },
      newTab: { default: true, rendered: false, parseHTML: element => element.getAttribute('target') === '_blank' },
    }
  },

  // Before the link mark (and so the image in it), which would read the card as a link and an image
  parseHTML() {
    return [{ tag: 'a[data-link-card]', priority: 1000 }]
  },

  renderHTML({ node }) {
    const attrs = node.attrs as LinkCardAttrs
    const image = attrs.image && attrs.layout !== 'text'
      ? [['img', { class: `${CLASS}__image`, src: attrs.image, alt: '' }]]
      : []

    return [
      'a',
      {
        class: CLASS,
        'data-link-card': attrs.layout,
        href: attrs.href,
        ...(attrs.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
      },
      ...image,
      [
        'span',
        { class: `${CLASS}__body` },
        ...span('site', attrs.siteName),
        ...span('title', attrs.title),
        ...span('description', attrs.description),
      ],
    ] as never
  },

  addCommands() {
    return {
      setLinkCard: attrs => ({ commands }) => commands.insertContent({ type: name, attrs }),

      // The link dialog shows cards too: the selected card, else a card of the draft address (empty: a new one)
      showLinkCard: draft => ({ commands }) => commands.showLink(draft ?? { href: '' }),
    }
  },

  addProseMirrorPlugins() {
    const { editor } = this

    return [
      new Plugin({
        key: new PluginKey(name),
        props: {
          // While editing, the card's link does not open (its first click would, in a new tab)
          handleDOMEvents: {
            click: (view, event) => {
              if (view.editable && (event.target as Element | null)?.closest?.('a[data-link-card]')) {
                event.preventDefault()
              }

              return false
            },
          },
          // A click selects the card. ProseMirror asks handleClickOn before handleClick, where the link mark
          // (enableClickSelection) would put a text selection on the card's <a>
          handleClickOn: (view, _pos, node, nodePos, _event, direct) => {
            if (!direct || node.type.name !== name || !view.editable) {
              return false
            }

            view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, nodePos)))

            return true
          },
          handleDoubleClickOn: (_view, _pos, node, nodePos) => {
            if (node.type.name !== name) {
              return false
            }

            editor.commands.setNodeSelection(nodePos)
            editor.commands.showLink()

            return true
          },
        },
      }),
    ]
  },
})

export function selectedLinkCard(editor: Editor): LinkCardAttrs | null {
  const { selection } = editor.state

  return selection instanceof NodeSelection && selection.node.type.name === name
    ? { ...selection.node.attrs } as LinkCardAttrs
    : null
}

/**
 * Updates the selected card being edited, or inserts a card in place of the selection (a link made a card).
 */
export function applyLinkCard(editor: Editor, attrs: LinkCardAttrs, edited: boolean): boolean {
  if (edited) {
    return editor.chain().focus().updateAttributes(name, attrs).run()
  }

  return editor.chain().focus().insertContent({ type: name, attrs }).run()
}
