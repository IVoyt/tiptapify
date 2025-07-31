import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useStrike() {
  const { t } = useI18n();

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