import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";

export function useNumbered() {
  const { t } = inject('tiptapifyI18n') as any

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: computed(() => t('lists.numbered')),
    tooltip: computed(() => t('lists.numbered')),
    icon: `mdiSvg:${mdi.mdiFormatListNumbered}`,
    enabled: true,
    props: {
      color: computed(() => editor.value.isActive('orderedList') ? 'primary' : ''),
    },
    attrs: {
      click: () => editor.value.chain().focus().toggleOrderedList().run()
    }
  }
}