import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";

export function usePreview() {
  const { t } = inject('tiptapifyI18n') as any

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'preview',
    tooltip: computed(() => t('misc.preview')),
    icon: `mdiSvg:${mdi.mdiFileEyeOutline}`,
    enabled: true,
    attrs: {
      click: () => editor.value.commands.showPreview()
    }
  }
}