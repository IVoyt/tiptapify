import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import TableBuilder from "@tiptapify/extensions/components/TableBuilder.vue";
import { computed, markRaw } from "vue";
import { useI18n } from "vue-i18n";

export function useMediaItems(editor: Editor) {
  const { t } = useI18n();
  return {
    link: {
      name: computed(() => t('media.link')),
      tooltip: computed(() => t('media.link')),
      icon: computed(() => editor.isActive('tiptapifyLink') ? mdi.mdiLinkOff : mdi.mdiLink),
      enabled: true,
      props: {
        color: computed(() => editor.isActive('tiptapifyLink') ? 'primary' : ''),
        disabled: computed(() => editor.isActive('code') || editor.isActive('codeBlock')),
      },
      attrs: {
        click: () => editor.commands.showLink()
      }
    },
    image: {
      name: computed(() => t('media.image')),
      tooltip: computed(() => t('media.image')),
      icon: mdi.mdiImage,
      enabled: true,
      props: {
        color: computed(() => editor.isActive('image') ? 'primary' : ''),
        disabled: computed(() => editor.isActive('code') || editor.isActive('codeBlock')),
      },
      attrs: {
        click: () => editor.commands.showTiptapifyImage()
      }
    },
    table: {
      name: 'tables',
      tooltip: computed(() => t('media.tables.table')),
      icon: mdi.mdiTable,
      modelValue: false,
      enabled: true,
      props: {
        color: computed(() => editor.isActive('table') ? 'primary' : ''),
        disabled: computed(() => !editor.can().chain().focus().insertTable().run()),
      },
      children: [
        {
          name: 'insert table',
          tooltip: computed(() => t('media.tables.insertTable')),
          icon: mdi.mdiTablePlus,
          enabled: true,
          props: {
            disabled: computed(() => !editor.can().chain().focus().insertTable().run()),
            activator: 'parent',
            openOnClick: true,
            openOnHover: false,
            closeOnContentClick: false,
            submenu: true
          },
          component: markRaw(TableBuilder),
        },
        {
          name: 'delete table',
          tooltip: computed(() => t('media.tables.deleteTable')),
          icon: mdi.mdiTableMinus,
          enabled: true,
          props: {
            disabled: computed(() => !editor.can().chain().focus().deleteTable().run()),
          },
          attrs: {
            click: () => editor.chain().focus().deleteTable().run()
          }
        },
        {
          name: 'table row',
          tooltip: computed(() => t('media.tables.row')),
          icon: mdi.mdiTableRow,
          enabled: true,
          props: {
            disabled: computed(
              () =>
                !editor.can().chain().focus().addRowBefore().run() &&
                !editor.can().chain().focus().addRowAfter().run() &&
                !editor.can().chain().focus().deleteRow().run()
            ),
            openOnHover: true,
            openOnClick: true,
            activator: 'parent',
            submenu: true
          },
          children: [
            {
              name: 'insert row before',
              tooltip: computed(() => t('media.tables.insertRowBefore')),
              icon: mdi.mdiTableRowPlusBefore,
              enabled: true,
              props: {
                disabled: computed(() => !editor.can().chain().focus().addRowBefore().run()),
              },
              attrs: {
                click: () => editor.chain().focus().addRowBefore().run()
              }
            },
            {
              name: 'insert row after',
              tooltip: computed(() => t('media.tables.insertRowAfter')),
              icon: mdi.mdiTableRowPlusAfter,
              enabled: true,
              props: {
                disabled: computed(() => !editor.can().chain().focus().addRowAfter().run()),
              },
              attrs: {
                click: () => editor.chain().focus().addRowAfter().run()
              }
            },
            {
              name: 'delete row',
              tooltip: computed(() => t('media.tables.deleteRow')),
              icon: mdi.mdiTableRowRemove,
              enabled: true,
              props: {
                disabled: computed(() => !editor.can().chain().focus().deleteRow().run()),
              },
              attrs: {
                click: () => editor.chain().focus().deleteRow().run()
              }
            },
          ]
        },
        {
          name: 'column',
          tooltip: computed(() => t('media.tables.col')),
          icon: mdi.mdiTableColumn,
          enabled: true,
          props: {
            disabled: computed(
              () =>
                !editor.can().chain().focus().addColumnBefore().run() &&
                !editor.can().chain().focus().addColumnAfter().run() &&
                !editor.can().chain().focus().deleteColumn().run()
            ),
            openOnHover: true,
            openOnClick: true,
            activator: 'parent',
            submenu: true
          },
          children: [
            {
              name: 'insert col before',
              tooltip: computed(() => t('media.tables.insertColBefore')),
              icon: mdi.mdiTableColumnPlusBefore,
              enabled: true,
              props: {
                disabled: computed(() => !editor.can().chain().focus().addColumnBefore().run()),
              },
              attrs: {
                click: () => editor.chain().focus().addColumnBefore().run()
              }
            },
            {
              name: 'insert column after',
              tooltip: computed(() => t('media.tables.insertColAfter')),
              icon: mdi.mdiTableColumnPlusAfter,
              enabled: true,
              props: {
                disabled: computed(() => !editor.can().chain().focus().addColumnAfter().run()),
              },
              attrs: {
                click: () => editor.chain().focus().addColumnAfter().run()
              }
            },
            {
              name: 'delete column',
              tooltip: computed(() => t('media.tables.deleteCol')),
              icon: mdi.mdiTableColumnRemove,
              enabled: true,
              props: {
                disabled: computed(() => !editor.can().chain().focus().deleteColumn().run()),
              },
              attrs: {
                click: () => editor.chain().focus().deleteColumn().run()
              }
            }
          ]
        },
        {
          name: 'merge cells',
          tooltip: computed(() => t('media.tables.mergeCells')),
          icon: mdi.mdiTableMergeCells,
          enabled: true,
          props: {
            disabled: computed(() => !editor.can().chain().focus().mergeCells().run()),
          },
          attrs: {
            click: () => editor.chain().focus().mergeCells().run()
          }
        },
        {
          name: 'split cell',
          tooltip: computed(() => t('media.tables.splitCell')),
          icon: mdi.mdiTableSplitCell,
          enabled: true,
          props: {
            disabled: computed(() => !editor.can().chain().focus().splitCell().run()),
          },
          attrs: {
            click: () => editor.chain().focus().splitCell().run()
          }
        }
      ]
    }
  }
}