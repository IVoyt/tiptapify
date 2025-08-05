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
      :color="editor.isActive('blockquote') ? 'primary' : ''"
      :disabled="!editor.can().chain().focus().toggleBlockquote().run()"
      @click="editor.commands.toggleBlockquote()"
      size="32"
  >
    <VTooltip activator="parent">
      {{ t('format.blockquote') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiCommentQuote}`" />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>