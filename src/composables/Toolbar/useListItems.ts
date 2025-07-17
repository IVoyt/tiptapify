import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

export function useListItems(editor: Editor) {
  const { t } = useI18n();

  return {
    listBullet: {
      name: computed(() => t('lists.bullet')),
      tooltip: computed(() => t('lists.bullet')),
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
      name: computed(() => t('lists.numbered')),
      tooltip: computed(() => t('lists.numbered')),
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
      name: computed(() => t('lists.task')),
      tooltip: computed(() => t('lists.task')),
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
      name: computed(() => t('lists.indent')),
      tooltip: computed(() => t('lists.indent')),
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
      name: computed(() => t('lists.outdent')),
      tooltip: computed(() => t('lists.outdent')),
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