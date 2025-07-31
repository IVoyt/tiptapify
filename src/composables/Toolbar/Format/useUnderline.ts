import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useUnderline() {
  const { t } = useI18n();

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'underline',
    tooltip: computed(() => t('format.underline')),
    icon: `mdiSvg:${mdi.mdiFormatUnderline}`,
    enabled: true,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleUnderline().run()),
      color: computed(() => editor.value.isActive('underline') ? 'primary' : ''),
    },
    attrs: {
      click: () => editor.value.chain().focus().toggleUnderline().run()
    }
  }
}