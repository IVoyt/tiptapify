import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useOutdent() {
  const { t } = useI18n();

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: computed(() => t('lists.outdent')),
    tooltip: computed(() => t('lists.outdent')),
    icon: `mdiSvg:${mdi.mdiFormatIndentDecrease}`,
    enabled: true,
    props: {
      disabled: computed(() => !editor.value.can().liftListItem('listItem')),
      active: false,
    },
    attrs: {
      click: () => editor.value.chain().focus().liftListItem('listItem').run()
    }
  }
}