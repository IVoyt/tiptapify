<script setup lang="ts">

import { Editor } from "@tiptap/vue-3";

import { computed, inject, Ref, ref } from 'vue'

const props = defineProps({
  fonts: { type: Array<{ name: string, fontFamily: string }>, default: [] },
  fontFamily: { type: String, default: '' },
})

const { t } = inject('tiptapifyI18n') as any

const editor = inject('tiptapifyEditor') as Ref<Editor>

const initialFontFamily = ref(computed(() => props.fontFamily).value)

const fontSelected = ref<boolean>(false)

function hoverFontFamily(font: string) {
  fontSelected.value = false

  editor.value.chain().focus().setFontFamily(font).run()
}

function resetFontFamily() {
  if (fontSelected.value) {
    return
  }

  initialFontFamily.value
    ? editor.value.chain().focus().setFontFamily(initialFontFamily.value).run()
    : editor.value.chain().focus().unsetFontFamily().run()
}

function clearFontFamily() {
  editor.value.chain().focus().unsetFontFamily().run()
}

function setFontFamily() {
  fontSelected.value = true
}

function isFontFamilyActive(fontFamily: string): boolean {
  return editor.value.isActive('textStyle', { fontFamily }) || fontFamily === initialFontFamily.value
}
</script>

<template>
  <VList class="tiptapify-font-family-list">
    <VListItem :disabled="fontFamily === ''" density="compact" @click="clearFontFamily">
      <VListItemTitle class="font-italic text-grey-darken-1">
        {{ t('defaultValue') }}
      </VListItemTitle>
    </VListItem>
    <VListItem
      v-for="font in fonts"
      :active="isFontFamilyActive(font.fontFamily)"
      :color="font.fontFamily === initialFontFamily ? 'primary' : ''"
      density="compact"
      @click="setFontFamily"
      @mouseover="hoverFontFamily(font.fontFamily)"
      @mouseleave="resetFontFamily"
    >
      <VListItemTitle>
        {{ font.name }}
      </VListItemTitle>
    </VListItem>
  </VList>
</template>

<style lang="scss" scoped>
.tiptapify-font-family-list {
  max-height: 390px;
}
</style>