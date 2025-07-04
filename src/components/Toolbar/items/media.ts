import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import TableBuilder from "@tiptapify/extensions/components/TableBuilder.vue";
import { computed, markRaw } from "vue";

export function getMediaItems(editor: Editor) {
  return {
    link: {
      name: 'media.link',
      tooltip: 'media.link',
      icon: computed(() => editor.isActive('link') ? mdi.mdiLinkOff : mdi.mdiLink),
      enabled: true,
      props: {
        color: computed(() => editor.isActive('link') ? 'primary' : ''),
        disabled: computed(() => editor.isActive('code') || editor.isActive('codeBlock')),
      },
      attrs: {
        click: () => editor.commands.showLink()
      }
    },
    image: {
      name: 'media.image',
      tooltip: 'media.image',
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
      tooltip: 'media.tables.table',
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
          tooltip: 'media.tables.insertTable',
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
          tooltip: 'media.tables.deleteTable',
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
          tooltip: 'media.tables.row',
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
              tooltip: 'media.tables.insertRowBefore',
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
              tooltip: 'media.tables.insertRowAfter',
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
              tooltip: 'media.tables.deleteRow',
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
          tooltip: 'media.tables.col',
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
              tooltip: 'media.tables.insertColBefore',
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
              tooltip: 'media.tables.insertColAfter',
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
              tooltip: 'media.tables.deleteCol',
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
          tooltip: 'media.tables.mergeCells',
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
          tooltip: 'media.tables.splitCell',
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