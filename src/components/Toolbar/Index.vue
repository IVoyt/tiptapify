<script setup lang="ts">
import { Editor } from "@tiptap/vue-3";
import Items from "@tiptapify/components/Toolbar/Items.vue";
import { defineProps, inject, PropType, Ref } from 'vue'
import { toolbarSections } from '@tiptapify/types/toolbarSections'

import items from "@tiptapify/components/Toolbar/items";

const props = defineProps({
  variantBtn: { type: String, default () { return 'elevated' }},
  variantField: { type: String, default () { return 'solo' }},
  items: { type: Array<string>, default() { return [] }},
  itemsExclude: { type: Boolean, default() { return false } },
  headingLevels: { type: Array<number>, default() { return [] }},
  fontMeasure: { type: String, default () { return 'px' }},
  customFonts: { type: Array<string>, default () { return [] } },
  customFontsOverride: { type: Boolean, default() { return false } },
  theme: { type: String, default() { return 'light' } },
  rounded: { type: String, default() { return '0' } },
  toolbarScrollable: { type: Boolean, default() { return false } },
  customExtensions: { type: Array as PropType<toolbarSections>, default() { return [] } },
})

const editor = inject('tiptapifyEditor') as Ref<Editor>

// this prevents from overriding the default items
const toolbarItems = [...items]

Object.keys(props.customExtensions).forEach((key: any) => {
  toolbarItems.push(props.customExtensions[key])
})

</script>

<template>
  <div v-if="editor" class="tiptapify-toolbar">
    <VToolbar elevation="1" :theme="theme" height="auto" :class="`ps-1 pr-1 rounded-t-${rounded}`">
      <VSlideGroup v-if="toolbarScrollable">
        <Items :items="toolbarItems" />
      </VSlideGroup>

      <Items v-else :items="toolbarItems" />
    </VToolbar>
  </div>
</template>

<style lang="scss" scoped>

</style>
