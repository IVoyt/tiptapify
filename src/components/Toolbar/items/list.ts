import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed } from "vue";

export function getListItems(editor: Editor) {
  return {
    listBullet: {
      name: 'lists.bullet',
      tooltip: 'lists.bullet',
      icon: mdi.mdiFormatListBulleted,
      enabled: true,
      props: {
        color: computed(() => editor.isActive('bulletList') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.chain().focus().toggleBulletList().run()
      }
    },
    listNumbered: {
      name: 'lists.numbered',
      tooltip: 'lists.numbered',
      icon: mdi.mdiFormatListNumbered,
      enabled: true,
      props: {
        color: computed(() => editor.isActive('orderedList') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.chain().focus().toggleOrderedList().run()
      }
    },
    listTask: {
      name: 'lists.task',
      tooltip: 'lists.task',
      icon: mdi.mdiFormatListChecks,
      enabled: true,
      props: {
        color: computed(() => editor.isActive('taskList') ? 'primary' : ''),
      },
      attrs: {
        click: () => editor.chain().focus().toggleTaskList().run()
      }
    },
    listIndent: {
      name: 'lists.indent',
      tooltip: 'lists.indent',
      icon: mdi.mdiFormatIndentIncrease,
      enabled: true,
      props: {
        disabled: computed(() => !editor.can().sinkListItem('listItem')),
        active: false,
      },
      attrs: {
        click: () => editor.chain().focus().sinkListItem('listItem').run()
      }
    },
    listOutdent: {
      name: 'lists.outdent',
      tooltip: 'lists.outdent',
      icon: mdi.mdiFormatIndentDecrease,
      enabled: true,
      props: {
        disabled: computed(() => !editor.can().liftListItem('listItem')),
        active: false,
      },
      attrs: {
        click: () => editor.chain().focus().liftListItem('listItem').run()
      }
    }
  }
}