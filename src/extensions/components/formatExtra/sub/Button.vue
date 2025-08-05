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
      :color="editor.isActive('sub') ? 'primary' : ''"
      :disabled="!editor.can().chain().focus().toggleSubscript().run()"
      @click="editor.commands.toggleSubscript()"
      size="32"
  >
    <VTooltip activator="parent">
      {{ t('format.sub') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatSubscript}`" />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>