<script setup lang="ts">
import Group from "@tiptapify/components/Toolbar/Group.vue";
import { computed, defineProps, PropType, Ref, ref } from 'vue'

import { ToolbarItemSections } from "@tiptapify/types/toolbarItems";

const props = defineProps({
  variantBtn: { type: String, default () { return 'elevated' }},
  items: { type: Object as PropType<ToolbarItemSections>, default() { return {} }},
})

const toolbarItemsRef: Ref<ToolbarItemSections> = ref(computed(() => props.items).value)

</script>

<template>
  <VToolbarItems class="py-2">
    <template v-for="(toolbarSection, sectionKey) in toolbarItemsRef" :key="sectionKey">
      <Group v-if="toolbarSection.group" :variant="variantBtn" :toolbar-section="toolbarSection" />

      <VBtn
          v-else
          v-for="(toolbarItem, itemKey) in toolbarSection.items"
          :key="itemKey"
          :variant="variantBtn"
          v-bind="toolbarItem?.props ?? {}"
          v-on="toolbarItem?.attrs ?? {}"
          class="menu-button"
          size="32"
          elevation="4"
          rounded="sm"
      >
        <VTooltip :text="toolbarItem.tooltip" location="top" activator="parent" />

        <VIcon v-if="toolbarItem.icon" :icon="toolbarItem.icon" size="16" />
        <span v-else class="menu-item-title">
          {{ toolbarItem.name }}
        </span>
      </VBtn>

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
