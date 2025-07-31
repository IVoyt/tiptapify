import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useSup() {
  const { t } = useI18n();

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'sup',
    tooltip: computed(() => t('format.sup')),
    icon: `mdiSvg:${mdi.mdiFormatSuperscript}`,
    enabled: true,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleSuperscript().run()),
      color: computed(() => editor.value.isActive('superscript') ? 'primary' : ''),
    },
    attrs: {
      click: () => editor.value.chain().focus().toggleSuperscript().run()
    }
  }
}