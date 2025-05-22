import { useEditor as useEditorOriginal } from '@tiptap/vue-3'

import { editorExtensions } from '@tiptapify/components/editorExtensions'

let editorInstance: any = null

export function useEditor(content: any = '', placeholder: string = '') {
  class TiptapifyEditor {
    private editor

    constructor() {
      const extensions = editorExtensions(placeholder)
      this.editor = useEditorOriginal({
        content,
        extensions,
      })
    }

    getInstance() {
      return this.editor
    }

    destroy() {
      this.editor.value.destroy()
    }
  }

  if (!editorInstance) {
    editorInstance = new TiptapifyEditor()
  }

  return {
    editor: editorInstance
  }
}