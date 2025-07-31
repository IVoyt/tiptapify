import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

const name: string = 'preview'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    preview: {
      showPreview: () => ReturnType
    }
  }
}

export const Preview = Extension.create({
  name,

  addCommands() {
    return {
      showPreview: () => ({ editor }) => {
        const event = new CustomEvent(`tiptapify-show-${name}`, {
          detail: {
            html: editor.getHTML(),
            editorId: editor.instanceId
          }
        })

        window.dispatchEvent(event)

        return true
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey(name),
      }),
    ]
  },
})