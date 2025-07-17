import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

export function useMiscItems(editor: Editor) {
  const { t } = useI18n();

  return {
    line: {
      name: 'line',
      tooltip: computed(() => t('format.line')),
      icon: mdi.mdiMinus,
      enabled: true,
      props: {},
      attrs: {
        click: () => editor.chain().focus().setHorizontalRule().run()
      }
    },
    break: {
      name: 'break',
      tooltip: computed(() => t('format.break')),
      icon: mdi.mdiFormatPageBreak,
      enabled: true,
      props: {},
      attrs: {
        click: () => editor.chain().focus().setHardBreak().run()
      }
    },
    source: {
      name: 'source',
      tooltip: computed(() => t('misc.source')),
      icon: mdi.mdiCodeTags,
      enabled: true,
      props: {},
      attrs: {
        click: () => editor.commands.showSource()
      }
    },
    preview: {
      name: 'preview',
      tooltip: computed(() => t('misc.preview')),
      icon: mdi.mdiFileEyeOutline,
      enabled: true,
      attrs: {
        click: () => editor.commands.showPreview()
      }
    },
    formatClear: {
      name: 'format clear',
      tooltip: computed(() => t('format.formatClear')),
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