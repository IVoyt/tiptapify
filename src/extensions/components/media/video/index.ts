import { Editor, Extension } from '@tiptap/core'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { NodeSelection, Plugin, PluginKey } from '@tiptap/pm/state'
import { parseVideoUrl, VideoNodeContent } from '@tiptapify/extensions/components/media/video/providers'

const name: string = 'tiptapifyVideo'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tiptapifyVideo: {
      showTiptapifyVideo: () => ReturnType
    }
  }
}

/**
 * The selected node the video dialog edits: a youtube or `video` node, or an iframe with
 * a provider's player (Vimeo); null when none is selected.
 */
export function selectedVideoNode(editor: Editor): VideoNodeContent | null {
  const { selection } = editor.state

  if (!(selection instanceof NodeSelection)) {
    return null
  }

  const { type, attrs } = selection.node

  return isVideoNode(selection.node) ? { type: type.name, attrs: { ...attrs } } : null
}

function isVideoNode({ type, attrs }: ProseMirrorNode): boolean {
  return type.name === 'youtube' || type.name === 'video' || parseVideoUrl(attrs.src ?? '')?.provider.nodeType === type.name
}

/**
 * Inserts the video node, or updates the selected one being edited. The edited node keeps the
 * attributes the dialog does not know about; a node of another type (another provider) replaces it.
 */
export function applyVideoNode(editor: Editor, content: VideoNodeContent, edited: VideoNodeContent | null): boolean {
  if (edited?.type === content.type) {
    return editor.chain().focus().updateAttributes(content.type, content.attrs).run()
  }

  if (edited) {
    const { from, to } = editor.state.selection

    return editor.chain().focus().insertContentAt({ from, to }, content).run()
  }

  return editor.chain().focus().insertContent(content).run()
}

export const TiptapifyVideo = Extension.create({
  name,

  addCommands() {
    return {
      showTiptapifyVideo: () => ({ editor }) => {
        const event = new CustomEvent(`tiptapify-show-${name}`, {
          detail: {
            node: selectedVideoNode(editor),
            editorId: editor.instanceId,
          },
        })

        window.dispatchEvent(event)

        return true
      },
    }
  },

  // While editing, a player takes no clicks (see the editor styles): a click selects the video block, and
  // a double click opens the dialog for it
  addProseMirrorPlugins() {
    const { editor } = this

    return [
      new Plugin({
        key: new PluginKey(name),
        props: {
          handleDoubleClickOn: (_view, _pos, node, nodePos) => {
            if (!isVideoNode(node)) {
              return false
            }

            editor.commands.setNodeSelection(nodePos)
            editor.commands.showTiptapifyVideo()

            return true
          },
        },
      }),
    ]
  },
})
