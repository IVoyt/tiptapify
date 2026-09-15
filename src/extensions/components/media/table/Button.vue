<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import ColumnActions from '@tiptapify/extensions/components/media/table/ColumnActions.vue'
import RowActions from '@tiptapify/extensions/components/media/table/RowActions.vue'
import TableBuilder from '@tiptapify/extensions/components/media/table/TableBuilder.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { inject, Ref } from 'vue'

import { ComposerTranslation } from 'vue-i18n'

const { variantBtn } = useTiptapifyConfig()

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }


const rowActionsDisabled = () => {
  return !editor.value.can().chain().focus().addRowBefore().run() &&
  !editor.value.can().chain().focus().addRowAfter().run() &&
  !editor.value.can().chain().focus().deleteRow().run()
}

const columnActionsDisabled = () => {
  return !editor.value.can().chain().focus().addColumnBefore().run() &&
      !editor.value.can().chain().focus().addColumnAfter().run() &&
      !editor.value.can().chain().focus().deleteColumn().run()
}
</script>

<template>
  <VBtn
    :id="`tiptapify-table-button-${editor.instanceId}`"
    :color="editor.isActive('table') ? 'primary' : ''"
    :disabled="!editor.can().chain().focus().insertTable().run()"
    :variant="variantBtn"
    size="32"
  >
    <BtnIcon :icon="`mdiSvg:${mdi.mdiTable}`" />
  </VBtn>

  <VMenu :activator="`#tiptapify-table-button-${editor.instanceId}`" :close-on-content-click="false">
    <VList density="compact">
      <VListItem link>
        <Tooltip :label="t('media.tables.insertTable')" />
        <VListItemTitle class="d-flex justify-center align-center">
          <BtnIcon :icon="`mdiSvg:${mdi.mdiTablePlus}`" />
        </VListItemTitle>

        <VMenu
          submenu
          activator="parent"
          :open-on-hover="true"
          open-on-click
          :close-on-content-click="false"
          :disabled="!editor.can().chain().focus().insertTable().run()"
        >
          <TableBuilder />
        </VMenu>
      </VListItem>

      <VListItem link :disabled="!editor.can().chain().focus().deleteTable().run()" @click="editor.chain().focus().deleteTable().run()">
        <Tooltip :label="t('media.tables.deleteTable')" />
        <VListItemTitle class="d-flex justify-center align-center">
          <BtnIcon :icon="`mdiSvg:${mdi.mdiTableMinus}`" />
        </VListItemTitle>
      </VListItem>

      <VListItem link :disabled="rowActionsDisabled()">
        <Tooltip :label="t('media.tables.row')" />

        <VListItemTitle class="d-flex justify-center align-center">
          <BtnIcon :icon="`mdiSvg:${mdi.mdiTableRow}`" />
        </VListItemTitle>

        <RowActions />
      </VListItem>

      <VListItem link :disabled="columnActionsDisabled()">
        <Tooltip :label="t('media.tables.col')" />

        <VListItemTitle class="d-flex justify-center align-center">
          <BtnIcon :icon="`mdiSvg:${mdi.mdiTableColumn}`" />
        </VListItemTitle>

        <ColumnActions />
      </VListItem>

      <VListItem link :disabled="!editor.can().chain().focus().mergeCells().run()" @click="editor.chain().focus().mergeCells().run()">
        <Tooltip :label="t('media.tables.mergeCells')" />

        <VListItemTitle class="d-flex justify-center align-center">
          <BtnIcon :icon="`mdiSvg:${mdi.mdiTableMergeCells}`" />
        </VListItemTitle>
      </VListItem>

      <VListItem link :disabled="!editor.can().chain().focus().splitCell().run()" @click="editor.chain().focus().splitCell().run()">
        <Tooltip :label="t('media.tables.splitCell')" />

        <VListItemTitle class="d-flex justify-center align-center">
          <BtnIcon :icon="`mdiSvg:${mdi.mdiTableSplitCell}`" />
        </VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>

<style lang="scss" scoped>

</style>