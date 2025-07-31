import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useAlignmentRight() {
  const { t } = useI18n();

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: computed(() => t('alignments.right')),
    tooltip: computed(() => t('alignments.right')),
    icon: `mdiSvg:${mdi.mdiFormatAlignRight}`,
    enabled: true,
    props: {
      active: false,
      color: computed(() => editor.value.isActive({ textAlign: 'right' }) ? 'primary' : ''),
    },
    attrs: {
      click: () => editor.value.chain().focus().toggleTextAlign('right').run()
    }
  }
}