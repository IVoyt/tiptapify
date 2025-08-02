import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";

export function useAlignmentLeft() {
  const { t } = inject('tiptapifyI18n') as any

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: computed(() => t('alignments.left')),
    tooltip: computed(() => t('alignments.left')),
    icon: `mdiSvg:${mdi.mdiFormatAlignLeft}`,
    enabled: true,
    props: {
      active: false,
      color: computed(() => editor.value.isActive({ textAlign: 'left' }) ? 'primary' : ''),
    },
    attrs: {
      click: () => editor.value.chain().focus().toggleTextAlign('left').run()
    }
  }
}