import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

export interface ViewSourceOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    viewSource: {
      /**
       * Показать исходный HTML-код
       */
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
            // html: editor.getHTML()
            html: editor.getHTML({ blockSeparator: '\n\n' })
            // html: editor.getText({ blockSeparator: '\n\n' })
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