import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";

export function useLine() {
  const { t } = inject('tiptapifyI18n') as any

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'line',
    tooltip: computed(() => t('format.line')),
    icon: `mdiSvg:${mdi.mdiMinus}`,
    enabled: true,
    props: {},
    attrs: {
      click: () => editor.value.chain().focus().setHorizontalRule().run()
    }
  }
}