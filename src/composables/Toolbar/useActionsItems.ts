import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

export function useActionsItems(editor: Editor) {
  const { t } = useI18n();

  return {
    undo: {
      name: 'undo',
      tooltip: computed(() => t('action.undo')),
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
      tooltip: computed(() => t('action.redo')),
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