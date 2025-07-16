import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed } from "vue";

export function getFormatItems(editor: Editor) {
  return {
    bold: {
      name: 'bold',
      tooltip: 'format.bold',
      icon: mdi.mdiFormatBold,
      enabled: true,
      props: {
        disabled: computed(() => !editor.can().chain().focus().toggleBold().run()),
        color: computed(() => editor.isActive('bold') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.chain().focus().toggleBold().run()
      }
    },
    italic: {
      name: 'italic',
      tooltip: 'format.italic',
      icon: mdi.mdiFormatItalic,
      enabled: true,
      props: {
        disabled: computed(() => !editor.can().chain().focus().toggleItalic().run()),
        color: computed(() => editor.isActive('italic') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.chain().focus().toggleItalic().run()
      }
    },
    underline: {
      name: 'underline',
      tooltip: 'format.underline',
      icon: mdi.mdiFormatUnderline,
      enabled: true,
      props: {
        disabled: computed(() => !editor.can().chain().focus().toggleUnderline().run()),
        color: computed(() => editor.isActive('underline') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.chain().focus().toggleUnderline().run()
      }
    },
    strike: {
      name: 'strike',
      tooltip: 'format.strike',
      icon: mdi.mdiFormatStrikethroughVariant,
      enabled: true,
      props: {
        disabled: computed(() => !editor.can().chain().focus().toggleStrike().run()),
        color: computed(() => editor.isActive('strike') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.chain().focus().toggleStrike().run()
      }
    }
  }
}