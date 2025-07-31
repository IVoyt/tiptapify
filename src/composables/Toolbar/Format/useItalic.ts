import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useItalic() {
  const { t } = useI18n();

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'italic',
    tooltip: computed(() => t('format.italic')),
    icon: `mdiSvg:${mdi.mdiFormatItalic}`,
    enabled: true,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleItalic().run()),
      color: computed(() => editor.value.isActive('italic') ? 'primary' : ''),
    },
    attrs: {
      click: () => editor.value.chain().focus().toggleItalic().run()
    }
  }
}