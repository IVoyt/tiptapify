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
  <VBtn @click="editor.chain().focus().setHardBreak().run()" size="32" :variant="variantBtn">
    <VTooltip activator="parent">
      {{ t('format.break') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatPageBreak}`" />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>