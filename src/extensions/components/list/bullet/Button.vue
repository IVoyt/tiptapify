<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from "@tiptap/vue-3";
import BtnIcon from "@tiptapify/components/UI/BtnIcon.vue";
import { inject, Ref } from "vue";

import defaults from '@tiptapify/constants/defaults'

defineProps({
  variantBtn: { type: String, default: defaults.variantBtn }
})

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as any

</script>

<template>
  <VBtn
      :color="editor.isActive('bulletList') ? 'primary' : ''"
      :disabled="!editor.can().chain().focus().toggleBulletList().run()"
      :variant="variantBtn"
      @click="editor.commands.toggleBulletList()"
      size="32"
  >
    <VTooltip activator="parent">
      {{ t('lists.bullet') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatListBulleted}`" />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>