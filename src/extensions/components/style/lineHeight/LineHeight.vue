<script setup lang="ts">

import { Editor } from "@tiptap/vue-3";

import { computed, inject, Ref, ref } from 'vue'

const props = defineProps({
  lineHeights: { type: Array<number>, default () { return [] } },
  lineHeight: { type: Number, default () { return null } },
})

const { t } = inject('tiptapifyI18n') as any

const editor = inject('tiptapifyEditor') as Ref<Editor>

const initialLineHeight = ref(computed(() => props.lineHeight).value)

const lineHeightSelected = ref<boolean>(false)

function hoverLineHeight(lineHeight: number) {
  lineHeightSelected.value = false

  editor.value.chain().focus().setLineHeight(lineHeight.toString()).run()
}

function resetLineHeight() {
  if (lineHeightSelected.value) {
    return
  }

  initialLineHeight.value
    ? editor.value.chain().focus().setLineHeight(initialLineHeight.value.toString()).run()
    : editor.value.chain().focus().unsetLineHeight().run()
}

function clearLineHeight() {
  editor.value.chain().focus().unsetLineHeight().run()
}

function setLineHeight() {
  lineHeightSelected.value = true

}

function isLineHeightActive(lineHeight: number): boolean {
  return editor.value.isActive('textStyle', { lineHeight }) || lineHeight === initialLineHeight.value
}
</script>

<template>
  <VList class="tiptapify-line-height-list">
    <VListItem :disabled="lineHeight === null" density="compact" @click="clearLineHeight">
      <VListItemTitle class="font-italic text-grey-darken-1">
        {{ t('defaultValue') }}
      </VListItemTitle>
    </VListItem>
    <VListItem
      v-for="lineHeight in lineHeights"
      :active="isLineHeightActive(lineHeight)"
      :color="lineHeight === initialLineHeight ? 'primary' : ''"
      density="compact"
      @click="setLineHeight"
      @mouseover="hoverLineHeight(lineHeight)"
      @mouseleave="resetLineHeight"
    >
      <VListItemTitle>
        {{ lineHeight }}
      </VListItemTitle>
    </VListItem>
  </VList>
</template>

<style lang="scss" scoped>
.tiptapify-line-height-list {
  max-height: 390px;
}
</style>