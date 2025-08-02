import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";

export function useCode() {
  const { t } = inject('tiptapifyI18n') as any

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'code',
    tooltip: computed(() => t('format.code')),
    icon: `mdiSvg:${mdi.mdiXml}`,
    enabled: true,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleCode().run()),
      color: computed(() => editor.value.isActive('code') ? 'primary' : ''),
    },
    attrs: {
      click: () => editor.value.chain().focus().toggleCode().run()
    }
  }
}