import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useFormatClear() {
  const { t } = useI18n();

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'format clear',
    tooltip: computed(() => t('format.formatClear')),
    icon: `mdiSvg:${mdi.mdiFormatClear}`,
    enabled: true,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().unsetAllMarks().run()),
    },
    attrs: {
      click: () => editor.value.chain().focus().unsetAllMarks().clearNodes().run()
    }
  }
}