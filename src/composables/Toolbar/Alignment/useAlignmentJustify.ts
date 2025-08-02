import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";

export function useAlignmentJustify() {
  const { t } = inject('tiptapifyI18n') as any

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: computed(() => t('alignments.justify')),
    tooltip: computed(() => t('alignments.justify')),
    icon: `mdiSvg:${mdi.mdiFormatAlignJustify}`,
    enabled: true,
    props: {
      active: false,
      color: computed(() => editor.value.isActive({ textAlign: 'justify' }) ? 'primary' : ''),
    },
    attrs: {
      click: () => editor.value.chain().focus().toggleTextAlign('justify').run()
    }
  }
}