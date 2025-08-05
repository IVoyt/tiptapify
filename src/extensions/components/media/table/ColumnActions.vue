<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from "@tiptap/vue-3";
import BtnIcon from "@tiptapify/components/UI/BtnIcon.vue";
import { inject, Ref } from "vue";

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as any

const columnCanAddBefore = () => {
  return editor.value.can().chain().focus().addColumnBefore().run()
}

const columnCanAddAfter = () => {
  return editor.value.can().chain().focus().addColumnAfter().run()
}

const columnCanDelete = () => {
  return editor.value.can().chain().focus().deleteColumn().run()
}
</script>

<template>
  <VMenu submenu activator="parent" open-on-hover open-on-click>
    <VList>
      <VListItem link :disabled="!columnCanAddBefore()" @click="editor.chain().focus().addColumnBefore().run()">
        <VTooltip activator="parent">
          {{ t('media.tables.insertColBefore') }}
        </VTooltip>
        <BtnIcon :icon="`mdiSvg:${mdi.mdiTableColumnPlusBefore}`" />
      </VListItem>
      <VListItem link :disabled="!columnCanAddAfter()" @click="editor.chain().focus().addColumnAfter().run()">
        <VTooltip activator="parent">
          {{ t('media.tables.insertColAfter') }}
        </VTooltip>
        <BtnIcon :icon="`mdiSvg:${mdi.mdiTableColumnPlusAfter}`" />
      </VListItem>
      <VListItem link :disabled="!columnCanDelete()" @click="editor.chain().focus().deleteColumn().run()">
        <VTooltip activator="parent">
          {{ t('media.tables.deleteCol') }}
        </VTooltip>
        <BtnIcon :icon="`mdiSvg:${mdi.mdiTableColumnRemove}`" />
      </VListItem>
    </VList>
  </VMenu>
</template>

<style lang="scss" scoped>

</style>