<script setup lang="ts">

import defaults from '@tiptapify/constants/defaults'
import { variantBtnTypes } from '@tiptapify/types/editor'
import { PropType } from 'vue'

import { toolbarSections } from '@tiptapify/types/toolbarTypes'

defineProps({
  variantBtn: { type: String as PropType<variantBtnTypes>, default() { return defaults.variantBtn } },
  items: { type: Array as PropType<toolbarSections>, default() { return {} } },
})

</script>

<template>
  <VToolbarItems class="px-2 py-3">
    <template v-for="item in items" :key="item.section">
      <template v-if="item.section === '__separator__'">
        <div class="menu-divider" />
      </template>
      <template v-else>
        <VBtnGroup v-if="item.group" elevation="4" :class="{ 'tiptapify-btn-group--elevated': variantBtn === 'elevated' }">
          <template v-for="sectionItem in item.components" :key="sectionItem.name">
            <component :is="sectionItem.component" v-bind="{ variantBtn, ...sectionItem.props ?? {} }" />
          </template>
        </VBtnGroup>
        <template v-else>
          <component
            :is="sectionItem.component"
            v-for="sectionItem in item.components"
            :key="sectionItem.name"
            v-bind="{ variantBtn, ...sectionItem.props ?? {} }"
          />
        </template>
        <div class="menu-divider" />
      </template>
    </template>
  </VToolbarItems>
</template>

<style lang="scss" scoped>
.tiptapify-btn-group--elevated {
  box-shadow:
      0 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
      0 2px 2px 0 var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
      0 1px 5px 0 var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
}

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
