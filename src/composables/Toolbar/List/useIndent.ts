import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useIndent() {
  const { t } = useI18n();

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: computed(() => t('lists.indent')),
    tooltip: computed(() => t('lists.indent')),
    icon: `mdiSvg:${mdi.mdiFormatIndentIncrease}`,
    enabled: true,
    props: {
      disabled: computed(() => !editor.value.can().sinkListItem('listItem')),
      active: false,
    },
    attrs: {
      click: () => editor.value.chain().focus().sinkListItem('listItem').run()
    }
  }
}