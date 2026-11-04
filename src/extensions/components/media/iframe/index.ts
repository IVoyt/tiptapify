import { Editor, Node } from '@tiptap/core'
import { NodeSelection, Plugin, PluginKey } from '@tiptap/pm/state'
import { IframeAttrs, iframeStyle, parseRatio, readBorder } from '@tiptapify/extensions/components/media/iframe/embed'
import { parseVideoUrl } from '@tiptapify/extensions/components/media/video/providers'

export interface IframeOptions {
  allowFullscreen: boolean
  HTMLAttributes: {
    [key: string]: unknown
  }
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    iframe: {
      /**
       * Add an iframe
       */
      setIframe: (options: Partial<IframeAttrs> & { src: string }) => ReturnType
      /**
       * Open the embed dialog: for the selected iframe, else to insert one
       */
      showIframe: () => ReturnType
    }
  }
}

// A Vimeo player is stored as an iframe too, but the video dialog edits it
export function isVideoIframe(src: unknown): boolean {
  return parseVideoUrl(String(src ?? ''))?.provider.nodeType === 'iframe'
}

/**
 * The attributes of the selected iframe the embed dialog edits (not a Vimeo player); null when none is selected.
 */
export function selectedIframe(editor: Editor): IframeAttrs | null {
  const { selection } = editor.state

  if (!(selection instanceof NodeSelection) || selection.node.type.name !== 'iframe' || isVideoIframe(selection.node.attrs.src)) {
    return null
  }

  return { ...selection.node.attrs } as IframeAttrs
}

export default Node.create<IframeOptions>({
  name: 'iframe',

  group: 'block',

  atom: true,

  addOptions() {
    return {
      allowFullscreen: true,
      HTMLAttributes: {
        class: 'iframe-wrapper',
      },
    }
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      name: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
      allow: {
        default: null,
      },
      sandbox: {
        default: null,
      },
      loading: {
        default: null,
      },
      allowfullscreen: {
        default: this.options.allowFullscreen,
        // Embeds get fullscreen unless the editor turns it off (`allowFullscreen: false`)
        parseHTML: element => element.hasAttribute('allowfullscreen') || this.options.allowFullscreen,
        renderHTML: ({ allowfullscreen }) => (allowfullscreen ? { allowfullscreen: 'true' } : {}),
      },
      // The border and the ratio render as the iframe style (see renderHTML)
      border: {
        default: false,
        parseHTML: element => readBorder(element) ?? false,
        rendered: false,
      },
      ratio: {
        default: null,
        parseHTML: element => parseRatio(element.getAttribute('data-ratio')),
        renderHTML: ({ ratio }) => (ratio ? { 'data-ratio': ratio } : {}),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'iframe',
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    const style = iframeStyle(node.attrs as IframeAttrs)

    return ['div', this.options.HTMLAttributes, ['iframe', { ...HTMLAttributes, style }]]
  },

  addCommands() {
    return {
      setIframe:
        options =>
          ({ tr, dispatch }) => {
            const { selection } = tr
            const node = this.type.create(options)

            if (dispatch) {
              tr.replaceRangeWith(selection.from, selection.to, node)
            }

            return true
          },
      showIframe: () => ({ editor }) => {
        const event = new CustomEvent('tiptapify-show-iframe', {
          detail: {
            node: selectedIframe(editor),
            editorId: editor.instanceId,
          },
        })

        window.dispatchEvent(event)

        return true
      },
    }
  },

  // While editing, an iframe takes no clicks (see the editor styles): a click selects its block, and a
  // double click opens the embed dialog for it. A Vimeo player opens the video dialog instead.
  addProseMirrorPlugins() {
    const { editor } = this

    return [
      new Plugin({
        key: new PluginKey('iframe'),
        props: {
          handleDoubleClickOn: (_view, _pos, node, nodePos) => {
            if (node.type.name !== 'iframe' || isVideoIframe(node.attrs.src)) {
              return false
            }

            editor.commands.setNodeSelection(nodePos)
            editor.commands.showIframe()

            return true
          },
        },
      }),
    ]
  },
})
