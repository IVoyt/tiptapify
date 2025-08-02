import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";

export function useBreak() {
  const { t } = inject('tiptapifyI18n') as any

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'break',
    tooltip: computed(() => t('format.break')),
    icon: `mdiSvg:${mdi.mdiFormatPageBreak}`,
    enabled: true,
    props: {},
    attrs: {
      click: () => editor.value.chain().focus().setHardBreak().run()
    }
  }
}