import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed } from "vue";

export function getMiscItems(editor: Editor) {
  return {
    line: {
      name: 'line',
      tooltip: 'format.line',
      icon: mdi.mdiMinus,
      enabled: true,
      props: {},
      attrs: {
        click: () => editor.chain().focus().setHorizontalRule().run()
      }
    },
    break: {
      name: 'break',
      tooltip: 'format.break',
      icon: mdi.mdiFormatPageBreak,
      enabled: true,
      props: {},
      attrs: {
        click: () => editor.chain().focus().setHardBreak().run()
      }
    },
    source: {
      name: 'source',
      tooltip: 'misc.source',
      icon: mdi.mdiCodeTags,
      enabled: true,
      props: {},
      attrs: {
        click: () => editor.commands.showSource()
      }
    },
    preview: {
      name: 'preview',
      tooltip: 'misc.preview',
      icon: mdi.mdiFileEyeOutline,
      enabled: true,
      attrs: {
        click: () => editor.commands.showPreview()
      }
    },
    formatClear: {
      name: 'format clear',
      tooltip: 'format.formatClear',
      icon: mdi.mdiFormatClear,
      enabled: true,
      props: {
        disabled: computed(() => !editor.can().chain().focus().unsetAllMarks().run()),
      },
      attrs: {
        click: () => editor.chain().focus().unsetAllMarks().clearNodes().run()
      }
    },
  }
}