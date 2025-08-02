import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";

export function useUndo() {
  const { t } = inject('tiptapifyI18n') as any

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'undo',
    tooltip: computed(() => t('action.undo')),
    icon: `mdiSvg:${mdi.mdiUndo}`,
    enabled: true,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().undo().run()),
    },
    attrs: {
      click: () => editor.value.chain().focus().undo().run()
    }
  }
}