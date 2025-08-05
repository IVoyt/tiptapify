<script setup lang="ts">

import { Editor } from "@tiptap/vue-3";

import { computed, inject, Ref, ref } from 'vue'

const props = defineProps({
  sizes: { type: Array<number>, default: [] },
  measure: { type: String, default: 'px' },
  fontSize: { type: Number, default () { return null } },
})

const { t } = inject('tiptapifyI18n') as any

const editor = inject('tiptapifyEditor') as Ref<Editor>

const initialFontSize = ref(computed(() => props.fontSize).value)

const fontSizeSelected = ref<boolean>(false)

function hoverFontSize(fontSize: number) {
  fontSizeSelected.value = false

  editor.value.chain().focus().setFontSize(`${fontSize}${props.measure}`).run()
}

function resetFontSize() {
  if (fontSizeSelected.value) {
    return
  }

  initialFontSize.value
    ? editor.value.chain().focus().setFontSize(`${initialFontSize.value}${props.measure}`).run()
    : editor.value.chain().focus().unsetFontSize().run()
}

function clearFontSize() {
  editor.value.chain().focus().unsetFontSize().run()
}

function setFontSize() {
  fontSizeSelected.value = true
}

function isFontSizeActive(fontSize: number): boolean {
  return editor.value.isActive('textStyle', { fontSize: `${fontSize}${props.measure}` }) || fontSize === initialFontSize.value
}
</script>

<template>
  <VList class="tiptapify-font-size-list">
    <VListItem :disabled="fontSize === null" density="compact" @click="clearFontSize">
      <VListItemTitle class="font-italic text-grey-darken-1">
        {{ t('defaultValue') }}
      </VListItemTitle>
    </VListItem>
    <VListItem
      v-for="size in sizes"
      :active="isFontSizeActive(size)"
      :color="size === initialFontSize ? 'primary' : ''"
      density="compact"
      @click="setFontSize"
      @mouseover="hoverFontSize(size)"
      @mouseleave="resetFontSize"
    >
      <VListItemTitle>
        {{ size }}{{ measure}}
      </VListItemTitle>
    </VListItem>
  </VList>
</template>

<style lang="scss" scoped>
.tiptapify-font-size-list {
  max-height: 390px;
}
</style>