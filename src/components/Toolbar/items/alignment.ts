import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed } from "vue";

export function getAlignmentItems(editor: Editor) {
  return {
    alignmentLeft: {
      name: 'alignments.left',
      tooltip: 'alignments.left',
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
      name: 'alignments.center',
      tooltip: 'alignments.center',
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
      name: 'alignments.right',
      tooltip: 'alignments.right',
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
      name: 'alignments.justify',
      tooltip: 'alignments.justify',
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