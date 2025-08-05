import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

export interface ViewSourceOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    viewSource: {
      showSource: () => ReturnType
    }
  }
}

export const ViewSource = Extension.create<ViewSourceOptions>({
  name: 'viewSource',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addCommands() {
    return {
      showSource: () => ({ editor }) => {
        const event = new CustomEvent('tiptapify-show-source', {
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
        key: new PluginKey('viewSource'),
      }),
    ]
  },
})