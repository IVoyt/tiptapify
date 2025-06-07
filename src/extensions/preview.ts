import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

const name: string = 'preview'

export interface ViewSourceOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    preview: {
      /**
       * Показать исходный HTML-код
       */
      showPreview: () => ReturnType
    }
  }
}

export const Preview = Extension.create<ViewSourceOptions>({
  name,

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addCommands() {
    return {
      showPreview: () => ({ editor }) => {
        const event = new CustomEvent('tiptapify-show-preview', {
          detail: {
            html: editor.getHTML()
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