import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useBold() {
  const { t } = useI18n();

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'bold',
    tooltip: computed(() => t('format.bold')),
    icon: `mdiSvg:${mdi.mdiFormatBold}`,
    enabled: true,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleBold().run()),
      color: computed(() => editor.value.isActive('bold') ? 'primary' : ''),
    },
    attrs: {
      click: () => editor.value.chain().focus().toggleBold().run()
    }
  }
}