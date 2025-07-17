import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

export function useFormatExtraItems(editor: Editor) {
  const { t } = useI18n();

  return {
    sup: {
      name: 'sup',
      tooltip: computed(() => t('format.sup')),
      icon: mdi.mdiFormatSuperscript,
      enabled: true,
      props: {
        disabled: computed(() => !editor.can().chain().focus().toggleSuperscript().run()),
        color: computed(() => editor.isActive('superscript') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.chain().focus().toggleSuperscript().run()
      }
    },
    sub: {
      name: 'sub',
      tooltip: computed(() => t('format.sub')),
      icon: mdi.mdiFormatSubscript,
      enabled: true,
      props: {
        disabled: computed(() => !editor.can().chain().focus().toggleSubscript().run()),
        color: computed(() => editor.isActive('subscript') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.chain().focus().toggleSubscript().run()
      }
    },
    code: {
      name: 'code',
      tooltip: computed(() => t('format.code')),
      icon: mdi.mdiXml,
      enabled: true,
      props: {
        disabled: computed(() => !editor.can().chain().focus().toggleCode().run()),
        color: computed(() => editor.isActive('code') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.chain().focus().toggleCode().run()
      }
    },
    codeBlock: {
      name: 'codeblock',
      tooltip: computed(() => t('format.codeblock')),
      icon: mdi.mdiCodeBlockTags,
      enabled: true,
      props: {
        disabled: computed(() => !editor.can().chain().focus().toggleCodeBlock().run()),
        color: computed(() => editor.isActive('codeBlock') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.chain().focus().toggleCodeBlock().run()
      }
    },
    blockquote: {
      name: 'blockquote',
      tooltip: computed(() => t('format.blockquote')),
      icon: mdi.mdiCommentQuote,
      enabled: true,
      props: {
        disabled: computed(() => !editor.can().chain().focus().toggleBlockquote().run() || editor.isActive('codeBlock') || editor.isActive('code')),
        color: computed(() => editor.isActive('blockquote') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.chain().focus().toggleBlockquote().run()
      }
    }
  }
}