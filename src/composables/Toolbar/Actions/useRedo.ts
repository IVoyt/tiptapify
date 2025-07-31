import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useRedo() {
  const { t } = useI18n();

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'redo',
    tooltip: computed(() => t('action.redo')),
    icon: `mdiSvg:${mdi.mdiRedo}`,
    enabled: true,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().redo().run()),
    },
    attrs: {
      click: () => editor.value.chain().focus().redo().run()
    }
  }
}