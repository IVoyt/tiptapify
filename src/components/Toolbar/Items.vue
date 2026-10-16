<script setup lang="ts">

import { PropType } from 'vue'

import { toolbarSections } from '@tiptapify/types/toolbarTypes'

defineProps({
  items: { type: Array as PropType<toolbarSections>, default() { return {} } },
})

</script>

<template>
  <VToolbarItems class="tiptapify-toolbar-items">
    <template v-for="item in items" :key="item.section">
      <template v-if="item.section === '__separator__'">
        <div class="menu-divider" />
      </template>
      <template v-else-if="item.section === '__spacer__'">
        <div class="tiptapify-toolbar-spacer" />
      </template>
      <template v-else>
        <div v-if="item.group" class="tiptapify-toolbar-group">
          <template v-for="sectionItem in item.components" :key="sectionItem.name">
            <component :is="sectionItem.component" v-bind="sectionItem.props ?? {}" />
          </template>
        </div>
        <template v-else>
          <component
            :is="sectionItem.component"
            v-for="sectionItem in item.components"
            :key="sectionItem.name"
            v-bind="sectionItem.props ?? {}"
          />
        </template>
        <div class="menu-divider" />
      </template>
    </template>
  </VToolbarItems>
</template>

<style lang="scss" scoped>
.tiptapify-toolbar-items {
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 6px;
  padding: 6px 8px;
}

.tiptapify-toolbar-group {
  display: flex;
  align-items: center;
  gap: 2px;
}

.menu-divider {
  width: 1px;
  height: 20px;
  background: rgba(var(--v-border-color), var(--v-border-opacity));
}

.menu-divider:nth-last-child(1),
.menu-divider:has(+ .tiptapify-toolbar-spacer) {
  display: none;
}

.tiptapify-toolbar-spacer {
  flex: 1 0 0;
}
</style>
