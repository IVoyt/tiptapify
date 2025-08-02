import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";

export function useStrike() {
  const { t } = inject('tiptapifyI18n') as any

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'strike',
    tooltip: computed(() => t('format.strike')),
    icon: `mdiSvg:${mdi.mdiFormatStrikethroughVariant}`,
    enabled: true,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleStrike().run()),
      color: computed(() => editor.value.isActive('strike') ? 'primary' : ''),
    },
    attrs: {
      click: () => editor.value.chain().focus().toggleStrike().run()
    }
  }
}