import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";

export function useAlignmentCenter() {
  const { t } = inject('tiptapifyI18n') as any

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: computed(() => t('alignments.center')),
    tooltip: computed(() => t('alignments.center')),
    icon: `mdiSvg:${mdi.mdiFormatAlignCenter}`,
    enabled: true,
    props: {
      active: false,
      color: computed(() => editor.value.isActive({ textAlign: 'center' }) ? 'primary' : ''),
    },
    attrs: {
      click: () => editor.value.chain().focus().toggleTextAlign('center').run()
    }
  }
}