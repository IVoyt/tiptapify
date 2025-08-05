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
      :color="editor.isActive('italic') ? 'primary' : ''"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      @click="editor.commands.toggleItalic()"
      size="32"
  >
    <VTooltip activator="parent">
      {{ t('format.italic') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatItalic}`" />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>