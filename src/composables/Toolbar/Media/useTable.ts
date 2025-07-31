import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import TableBuilder from "@tiptapify/extensions/components/TableBuilder.vue";
import { computed, inject, markRaw, Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useTable() {
  const { t } = useI18n();

  const editor = inject('tiptapifyEditor') as Ref<Editor>

  return {
    name: 'tables',
    tooltip: computed(() => t('media.tables.table')),
    icon: `mdiSvg:${mdi.mdiTable}`,
    modelValue: false,
    enabled: true,
    props: {
      color: computed(() => editor.value.isActive('table') ? 'primary' : ''),
      disabled: computed(() => !editor.value.can().chain().focus().insertTable().run()),
    },
    children: [
      {
        name: 'insert table',
        tooltip: computed(() => t('media.tables.insertTable')),
        icon: `mdiSvg:${mdi.mdiTablePlus}`,
        enabled: true,
        props: {
          disabled: computed(() => !editor.value.can().chain().focus().insertTable().run()),
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
        icon: `mdiSvg:${mdi.mdiTableMinus}`,
        enabled: true,
        props: {
          disabled: computed(() => !editor.value.can().chain().focus().deleteTable().run()),
        },
        attrs: {
          click: () => editor.value.chain().focus().deleteTable().run()
        }
      },
      {
        name: 'table row',
        tooltip: computed(() => t('media.tables.row')),
        icon: `mdiSvg:${mdi.mdiTableRow}`,
        enabled: true,
        props: {
          disabled: computed(
            () =>
              !editor.value.can().chain().focus().addRowBefore().run() &&
              !editor.value.can().chain().focus().addRowAfter().run() &&
              !editor.value.can().chain().focus().deleteRow().run()
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
            icon: `mdiSvg:${mdi.mdiTableRowPlusBefore}`,
            enabled: true,
            props: {
              disabled: computed(() => !editor.value.can().chain().focus().addRowBefore().run()),
            },
            attrs: {
              click: () => editor.value.chain().focus().addRowBefore().run()
            }
          },
          {
            name: 'insert row after',
            tooltip: computed(() => t('media.tables.insertRowAfter')),
            icon: `mdiSvg:${mdi.mdiTableRowPlusAfter}`,
            enabled: true,
            props: {
              disabled: computed(() => !editor.value.can().chain().focus().addRowAfter().run()),
            },
            attrs: {
              click: () => editor.value.chain().focus().addRowAfter().run()
            }
          },
          {
            name: 'delete row',
            tooltip: computed(() => t('media.tables.deleteRow')),
            icon: `mdiSvg:${mdi.mdiTableRowRemove}`,
            enabled: true,
            props: {
              disabled: computed(() => !editor.value.can().chain().focus().deleteRow().run()),
            },
            attrs: {
              click: () => editor.value.chain().focus().deleteRow().run()
            }
          },
        ]
      },
      {
        name: 'column',
        tooltip: computed(() => t('media.tables.col')),
        icon: `mdiSvg:${mdi.mdiTableColumn}`,
        enabled: true,
        props: {
          disabled: computed(
            () =>
              !editor.value.can().chain().focus().addColumnBefore().run() &&
              !editor.value.can().chain().focus().addColumnAfter().run() &&
              !editor.value.can().chain().focus().deleteColumn().run()
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
            icon: `mdiSvg:${mdi.mdiTableColumnPlusBefore}`,
            enabled: true,
            props: {
              disabled: computed(() => !editor.value.can().chain().focus().addColumnBefore().run()),
            },
            attrs: {
              click: () => editor.value.chain().focus().addColumnBefore().run()
            }
          },
          {
            name: 'insert column after',
            tooltip: computed(() => t('media.tables.insertColAfter')),
            icon: `mdiSvg:${mdi.mdiTableColumnPlusAfter}`,
            enabled: true,
            props: {
              disabled: computed(() => !editor.value.can().chain().focus().addColumnAfter().run()),
            },
            attrs: {
              click: () => editor.value.chain().focus().addColumnAfter().run()
            }
          },
          {
            name: 'delete column',
            tooltip: computed(() => t('media.tables.deleteCol')),
            icon: `mdiSvg:${mdi.mdiTableColumnRemove}`,
            enabled: true,
            props: {
              disabled: computed(() => !editor.value.can().chain().focus().deleteColumn().run()),
            },
            attrs: {
              click: () => editor.value.chain().focus().deleteColumn().run()
            }
          }
        ]
      },
      {
        name: 'merge cells',
        tooltip: computed(() => t('media.tables.mergeCells')),
        icon: `mdiSvg:${mdi.mdiTableMergeCells}`,
        enabled: true,
        props: {
          disabled: computed(() => !editor.value.can().chain().focus().mergeCells().run()),
        },
        attrs: {
          click: () => editor.value.chain().focus().mergeCells().run()
        }
      },
      {
        name: 'split cell',
        tooltip: computed(() => t('media.tables.splitCell')),
        icon: `mdiSvg:${mdi.mdiTableSplitCell}`,
        enabled: true,
        props: {
          disabled: computed(() => !editor.value.can().chain().focus().splitCell().run()),
        },
        attrs: {
          click: () => editor.value.chain().focus().splitCell().run()
        }
      }
    ]
  }
}