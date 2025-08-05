<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from "@tiptap/vue-3";
import BtnIcon from "@tiptapify/components/UI/BtnIcon.vue";
import { inject, Ref } from "vue";

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as any

</script>

<template>
  <VBtn
      :disabled="!editor.can().chain().focus().unsetAllMarks().run()"
      @click="editor.chain().focus().unsetAllMarks().clearNodes().run()"
      size="32"
  >
    <VTooltip activator="parent">
      {{ t('format.formatClear') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatClear}`" />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>