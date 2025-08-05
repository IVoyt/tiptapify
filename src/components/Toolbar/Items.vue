<script setup lang="ts">

import { defineProps, PropType } from 'vue'

import { toolbarSections } from "@tiptapify/types/toolbarSections";

defineProps({
  variantBtn: { type: String, default () { return 'elevated' }},
  items: { type: Array as PropType<toolbarSections>, default() { return {} }},
})

</script>

<template>
  <VToolbarItems class="py-2">
    <template v-for="(item, key) in items" :key="item.section">
      <VBtnGroup v-if="item.group" elevation="4">
        <template v-for="sectionItem in item.components" :key="sectionItem.name">
          <component :is="sectionItem.component" />
        </template>
      </VBtnGroup>
      <template v-else>
        <component v-for="sectionItem in item.components" :key="sectionItem.name" :is="sectionItem.component" />
      </template>

      <div class="menu-divider"></div>
    </template>
  </VToolbarItems>
</template>

<style lang="scss" scoped>
:deep(.v-btn-group) {
  height: 32px !important;
}

.menu-item-title {
  font-size: 14px;
}

.menu-button {
  margin: 0 1px;
}

.menu-divider {
  margin: 0 4px;
}

.menu-divider:nth-last-child(1) {
  display: none;
}

.v-toolbar-items {
  flex-wrap: wrap;
  row-gap: 5px;
}
</style>
