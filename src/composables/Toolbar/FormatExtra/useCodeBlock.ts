import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useCodeBlock() {
  const { t } = useI18n();

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'codeblock',
    tooltip: computed(() => t('format.codeblock')),
    icon: `mdiSvg:${mdi.mdiCodeBlockTags}`,
    enabled: true,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleCodeBlock().run()),
      color: computed(() => editor.value.isActive('codeBlock') ? 'primary' : ''),
    },
    attrs: {
      click: () => editor.value.chain().focus().toggleCodeBlock().run()
    }
  }
}