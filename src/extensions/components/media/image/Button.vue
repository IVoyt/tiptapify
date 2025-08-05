<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from "@tiptap/vue-3";
import BtnIcon from "@tiptapify/components/UI/BtnIcon.vue";
import ImageDialog from "@tiptapify/extensions/components/media/image/ImageDialog.vue";
import { inject, Ref } from "vue";

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as any

</script>

<template>
  <VBtn
      :color="editor.isActive('image') ? 'primary' : ''"
      @click="editor.commands.showTiptapifyImage()"
      size="32"
  >
    <VTooltip activator="parent">
      {{ t('media.image') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiImage}`" />
  </VBtn>

  <ImageDialog />
</template>

<style lang="scss" scoped>

</style>