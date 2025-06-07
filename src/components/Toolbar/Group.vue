<script setup lang="ts">
import GroupDropdown from "@tiptapify/components/Toolbar/GroupDropdown.vue";
import { defineProps, PropType } from 'vue'
import { useI18n } from "vue-i18n";

import { ToolbarItemSection } from "@tiptapify/components/Toolbar/items";

import helpers from "@tiptapify/utils/helpers";

defineProps({
  variant: { type: String, default () { return 'flat' }},
  section: { type: String, default() { return '' }},
  toolbarSection: { type: Object as PropType<ToolbarItemSection>, default() { return {} }}
})

const { t } = useI18n();

const { ucFirst } = helpers;

</script>

<template>
  <VBtnGroup :variant="variant" elevation="4">
    <template v-for="(toolbarItem, toolbarItemKey) in toolbarSection.items" :key="toolbarItemKey">
      <template v-if="toolbarItem.children">
        <GroupDropdown :toolbar-item="toolbarItem" :variant="variant" />
      </template>

      <VBtn v-else v-bind="toolbarItem.props" v-on="toolbarItem.attrs" size="32">
        <VTooltip :text="ucFirst(t(toolbarItem.tooltip))" location="top" activator="parent" />

        <VIcon v-if="toolbarItem.icon" :icon="toolbarItem.icon" size="small" />
        <span v-else class="menu-item-title">
          {{ ucFirst(t(toolbarItem.name)) }}
        </span>
      </VBtn>
    </template>
  </VBtnGroup>
</template>

<style lang="scss" scoped>

</style>
