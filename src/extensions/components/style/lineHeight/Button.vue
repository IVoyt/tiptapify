<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from "@tiptap/vue-3";
import BtnIcon from "@tiptapify/components/UI/BtnIcon.vue";
import LineHeight from "@tiptapify/extensions/components/style/lineHeight/LineHeight.vue";
import { lineHeights } from "@tiptapify/constants/style";
import { computed, inject, Ref } from "vue";

import defaults from '@tiptapify/constants/defaults'

defineProps({
  variantBtn: { type: String, default: defaults.variantBtn }
})

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as any

const activeLineHeight = computed(() => {
  let lineHeight = null
  for (const height of lineHeights) {
    if (editor.value.isActive('textStyle', { lineHeight: height.toString() })) {
      lineHeight = height
      break;
    }
  }

  return lineHeight
})

function getColor() {
  let color = ''
  for (const height of lineHeights) {
    if (editor.value.isActive('textStyle', { lineHeight: height.toString() })) {
      color = 'primary'
      break;
    }
  }

  return color
}

</script>

<template>
  <VBtn
      :id="`tiptapify-line-height-button-${editor.instanceId}`"
      :disabled="!editor.can().chain().focus().unsetLineHeight().run()"
      :color="getColor()"
      :variant="variantBtn"
      size="32"
  >
    <VTooltip activator="parent">
      {{ t('style.lineHeight') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatLineHeight}`" />
  </VBtn>

  <VMenu :activator="`#tiptapify-line-height-button-${editor.instanceId}`">
    <LineHeight :line-heights="lineHeights" :line-height="activeLineHeight" />
  </VMenu>
</template>

<style lang="scss" scoped>

</style>