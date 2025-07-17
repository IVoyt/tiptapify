import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

export function useAlignmentItems(editor: Editor) {
  const { t } = useI18n();

  return {
    alignmentLeft: {
      name: computed(() => t('alignments.left')),
      tooltip: computed(() => t('alignments.left')),
      icon: mdi.mdiFormatAlignLeft,
      enabled: true,
      props: {
        active: false,
        color: computed(() => editor.isActive({ textAlign: 'left' }) ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.chain().focus().toggleTextAlign('left').run()
      }
    },
    alignmentCenter: {
      name: computed(() => t('alignments.center')),
      tooltip: computed(() => t('alignments.center')),
      icon: mdi.mdiFormatAlignCenter,
      enabled: true,
      props: {
        active: false,
        color: computed(() => editor.isActive({ textAlign: 'center' }) ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.chain().focus().toggleTextAlign('center').run()
      }
    },
    alignmentRight: {
      name: computed(() => t('alignments.right')),
      tooltip: computed(() => t('alignments.right')),
      icon: mdi.mdiFormatAlignRight,
      enabled: true,
      props: {
        active: false,
        color: computed(() => editor.isActive({ textAlign: 'right' }) ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.chain().focus().toggleTextAlign('right').run()
      }
    },
    alignmentJustify: {
      name: computed(() => t('alignments.justify')),
      tooltip: computed(() => t('alignments.justify')),
      icon: mdi.mdiFormatAlignJustify,
      enabled: true,
      props: {
        active: false,
        color: computed(() => editor.isActive({ textAlign: 'justify' }) ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.chain().focus().toggleTextAlign('justify').run()
      }
    },
  }
}