<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from "@tiptap/vue-3";
import BtnIcon from "@tiptapify/components/UI/BtnIcon.vue";
import { inject, Ref } from "vue";

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as any

const rowCanAddBefore = () => {
  return editor.value.can().chain().focus().addRowBefore().run()
}

const rowCanAddAfter = () => {
  return editor.value.can().chain().focus().addRowAfter().run()
}

const rowCanDelete = () => {
  return editor.value.can().chain().focus().deleteRow().run()
}
</script>

<template>
  <VMenu submenu activator="parent" open-on-hover open-on-click>
    <VList>
      <VListItem link :disabled="!rowCanAddBefore()" @click="editor.chain().focus().addRowBefore().run()">
        <VTooltip activator="parent">
          {{ t('media.tables.insertRowBefore') }}
        </VTooltip>
        <BtnIcon :icon="`mdiSvg:${mdi.mdiTableRowPlusBefore}`" />
      </VListItem>
      <VListItem link :disabled="!rowCanAddAfter()" @click="editor.chain().focus().addRowAfter().run()">
        <VTooltip activator="parent">
          {{ t('media.tables.insertRowAfter') }}
        </VTooltip>
        <BtnIcon :icon="`mdiSvg:${mdi.mdiTableRowPlusAfter}`" />
      </VListItem>
      <VListItem link :disabled="!rowCanDelete()" @click="editor.chain().focus().deleteRow().run()">
        <VTooltip activator="parent">
          {{ t('media.tables.deleteRow') }}
        </VTooltip>
        <BtnIcon :icon="`mdiSvg:${mdi.mdiTableRowRemove}`" />
      </VListItem>
    </VList>
  </VMenu>
</template>

<style lang="scss" scoped>

</style>