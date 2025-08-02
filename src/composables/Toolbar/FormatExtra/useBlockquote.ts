import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed, inject, Ref } from "vue";

export function useBlockquote() {
  const { t } = inject('tiptapifyI18n') as any

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'blockquote',
    tooltip: computed(() => t('format.blockquote')),
    icon: `mdiSvg:${mdi.mdiCommentQuote}`,
    enabled: true,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleBlockquote().run() || editor.value.isActive('codeBlock') || editor.value.isActive('code')),
      color: computed(() => editor.value.isActive('blockquote') ? 'primary' : ''),
    },
    attrs: {
      click: () => editor.value.chain().focus().toggleBlockquote().run()
    }
  }
}