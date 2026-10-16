import { Image, ImageOptions } from '@tiptap/extension-image'
import { Editor, fromString, mergeAttributes, NodeViewRendererProps } from '@tiptap/core'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { NodeSelection, TextSelection } from '@tiptap/pm/state'

export type ImageAlign = 'left' | 'right'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageWithCaption: {
      // Swaps the selected image with the image right before (-1) or after (1) it, as slides of a slider
      moveImage: (direction: -1 | 1) => ReturnType
    }
  }
}

export interface ImageWithCaptionOptions extends ImageOptions {
  captionPlaceholder: string
}

/**
 * The image with its caption typed right under it, saved as
 * `<figure><img src alt><figcaption>caption</figcaption></figure>`. In the document the caption is
 * the image `title` attribute, so a legacy `<img title>` loads with its title as the caption.
 * The image floats left or right with `align`, saved as `float` in the image style (what sites read
 * from TinyMCE images); without it the image is centered. A double click opens the image dialog.
 */
export const ImageWithCaption = Image.extend<ImageWithCaptionOptions>({
  addOptions() {
    return {
      ...this.parent?.() as ImageOptions,
      captionPlaceholder: '',
    }
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      align: {
        default: null,
        parseHTML: (element: HTMLElement) => (['left', 'right'].includes(element.style.float) ? element.style.float : null),
        // Rendered by renderHTML onto the image only: in the editor the node view floats the whole figure
        renderHTML: () => ({}),
      },
    }
  },

  parseHTML() {
    const { editor, name, options } = this

    return [
      {
        tag: 'figure',
        getAttrs: (figure: HTMLElement) => {
          const img = figure.querySelector('img[src]')
          if (!img || (!options.allowBase64 && img.getAttribute('src')!.startsWith('data:'))) {
            return false
          }

          const attrs = parseImageAttributes(editor as Editor, name, img as HTMLElement)
          const caption = figure.querySelector('figcaption')?.textContent?.trim()

          return { ...attrs, title: caption || attrs.title || null }
        },
      },
      ...(this.parent?.() ?? []),
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    const align = node.attrs.align as ImageAlign | null
    const { title, ...imageAttributes } = mergeAttributes(
      this.options.HTMLAttributes,
      HTMLAttributes,
      align ? { style: `float: ${align}` } : {},
    )
    const figure: [string, Record<string, unknown>, ...unknown[]] = ['figure', {}, ['img', imageAttributes]]
    if (title) {
      figure.push(['figcaption', {}, String(title)])
    }

    return figure as never
  },

  addCommands() {
    return {
      ...this.parent?.(),
      moveImage: (direction: -1 | 1) => ({ state, tr, dispatch }) => {
        const { selection } = state
        if (!(selection instanceof NodeSelection) || selection.node.type.name !== this.name) {
          return false
        }

        const $image = state.doc.resolve(selection.from)
        const siblingIndex = $image.index() + direction
        if (siblingIndex < 0 || siblingIndex >= $image.parent.childCount) {
          return false
        }

        const sibling = $image.parent.child(siblingIndex)
        if (sibling.type !== selection.node.type) {
          return false
        }

        if (dispatch) {
          const image = selection.node
          if (direction < 0) {
            const from = selection.from - sibling.nodeSize
            tr.replaceWith(from, selection.to, [image, sibling])
            tr.setSelection(NodeSelection.create(tr.doc, from))
          } else {
            tr.replaceWith(selection.from, selection.to + sibling.nodeSize, [sibling, image])
            tr.setSelection(NodeSelection.create(tr.doc, selection.from + sibling.nodeSize))
          }
          dispatch(tr.scrollIntoView())
        }

        return true
      },
    }
  },

  addNodeView() {
    const createResizableView = this.parent?.()
    if (!createResizableView) {
      return null
    }

    const { captionPlaceholder } = this.options

    return (props: NodeViewRendererProps) => {
      const nodeView = createResizableView(props) as ReturnType<typeof createResizableView> & {
        dom: HTMLElement
        update: (node: ProseMirrorNode, ...args: unknown[]) => boolean
        stopEvent?: (event: Event) => boolean
        ignoreMutation?: (mutation: MutationRecord) => boolean
      }
      const editor = props.editor as Editor
      const getPos = props.getPos as () => number | undefined
      let node = props.node

      const caption = document.createElement('input')
      caption.type = 'text'
      caption.className = 'tiptapify-image-caption'
      caption.size = 1
      caption.placeholder = captionPlaceholder
      caption.value = node.attrs.title ?? ''
      caption.disabled = !editor.isEditable


      const wrapper = nodeView.dom.querySelector('[data-resize-wrapper]') ?? nodeView.dom
      const syncAlign = (align: ImageAlign | null) => {
        if (align) {
          nodeView.dom.dataset.align = align
        } else {
          delete nodeView.dom.dataset.align
        }
      }
      syncAlign(node.attrs.align)

      // The aspect ratio lets CSS cap a tall image by its height without distorting it
      const img = nodeView.dom.querySelector('img') as HTMLImageElement
      const setAspectRatio = () => {
        if (img.naturalWidth && img.naturalHeight) {
          nodeView.dom.style.setProperty('--tiptapify-image-ratio', String(img.naturalWidth / img.naturalHeight))
        }
      }
      img.addEventListener('load', setAspectRatio)
      setAspectRatio()
      nodeView.dom.classList.add('tiptapify-image')
      nodeView.dom.append(caption)

      const openDialog = () => {
        const pos = getPos()
        if (pos === undefined) {
          return
        }

        // The dialog reads the selected image, so the selection must be applied before it opens
        editor.commands.setNodeSelection(pos)
        editor.commands.showTiptapifyImage()
      }

      const saveCaption = () => {
        const pos = getPos()
        const title = caption.value.trim() === '' ? null : caption.value
        if (pos === undefined || title === (node.attrs.title ?? null)) {
          return
        }

        editor.view.dispatch(editor.state.tr.setNodeAttribute(pos, 'title', title))
      }

      // Enter leaves the caption for the text after the image
      const leaveCaption = () => {
        const pos = getPos()
        if (pos === undefined) {
          return
        }

        const after = pos + node.nodeSize
        const { state } = editor
        const selection = TextSelection.near(state.doc.resolve(Math.min(after, state.doc.content.size)))
        editor.view.dispatch(state.tr.setSelection(selection))
        editor.view.focus()
      }

      caption.addEventListener('input', saveCaption)
      caption.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
          event.preventDefault()
          leaveCaption()
        }
      })
      // Selecting caption text with the mouse must not start dragging the whole image
      caption.addEventListener('mousedown', () => {
        nodeView.dom.draggable = false
      })
      caption.addEventListener('blur', () => {
        nodeView.dom.draggable = true
      })

      wrapper.addEventListener('dblclick', openDialog)

      const updateResizableView = nodeView.update.bind(nodeView)
      nodeView.update = (updatedNode: ProseMirrorNode, ...args: unknown[]) => {
        const updated = updateResizableView(updatedNode, ...args)
        if (updated) {
          node = updatedNode
          const title = updatedNode.attrs.title ?? ''
          if (caption.value !== title && document.activeElement !== caption) {
            caption.value = title
          }
          caption.disabled = !editor.isEditable
          syncAlign(updatedNode.attrs.align)
        }

        return updated
      }
      nodeView.stopEvent = (event: Event) => caption.contains(event.target as Node)
      nodeView.ignoreMutation = (mutation: MutationRecord) => caption.contains(mutation.target)
        || (mutation.type === 'attributes' && mutation.target === nodeView.dom)

      return nodeView
    }
  },
})

/**
 * The image attributes of a `<figure>` are read from its `<img>`, each one the way its extension
 * reads it from an `<img>` (global attributes such as a media id included).
 */
function parseImageAttributes(editor: Editor, typeName: string, img: HTMLElement): Record<string, unknown> {
  const attributes: Record<string, unknown> = {}

  for (const { type, name, attribute } of editor.extensionManager.attributes) {
    if (type !== typeName) {
      continue
    }

    const value = attribute.parseHTML ? attribute.parseHTML(img) : fromString(img.getAttribute(name))
    if (value !== null && value !== undefined) {
      attributes[name] = value
    }
  }

  return attributes
}
