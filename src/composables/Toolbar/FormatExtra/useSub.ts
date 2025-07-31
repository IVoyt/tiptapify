import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useSub() {
  const { t } = useI18n();

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'sub',
    tooltip: computed(() => t('format.sub')),
    icon: `mdiSvg:${mdi.mdiFormatSubscript}`,
    enabled: true,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleSubscript().run()),
      color: computed(() => editor.value.isActive('subscript') ? 'primary' : ''),
    },
    attrs: {
      click: () => editor.value.chain().focus().toggleSubscript().run()
    }
  }
}