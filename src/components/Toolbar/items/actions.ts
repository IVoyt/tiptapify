import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed } from "vue";

export function getActionsItems(editor: Editor) {
  return {
    undo: {
      name: 'undo',
      tooltip: 'action.undo',
      icon: mdi.mdiUndo,
      enabled: true,
      props: {
        disabled: computed(() => !editor.can().chain().focus().undo().run()),
      },
      attrs: {
        click: () => editor.chain().focus().undo().run()
      }
    },
    redo: {
      name: 'redo',
      tooltip: 'action.redo',
      icon: mdi.mdiRedo,
      enabled: true,
      props: {
        disabled: computed(() => !editor.can().chain().focus().redo().run()),
      },
      attrs: {
        click: () => editor.chain().focus().redo().run()
      }
    }
  }
}