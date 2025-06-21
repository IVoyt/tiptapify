<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { useI18n } from "vue-i18n";

import { ToolbarItem } from "@tiptapify/components/Toolbar/items";

import helpers from "@tiptapify/utils/helpers";

defineProps({
  variant: { type: String, default () { return 'flat' }},
  toolbarItem: { type: Object as PropType<ToolbarItem>, default() { return {} }}
})

const { t } = useI18n();

const { ucFirst } = helpers;
</script>

<template>
  <VBtn v-bind="toolbarItem?.props ?? {}" v-on="toolbarItem?.attrs ?? {}" size="32">
    <VTooltip :text="ucFirst(t(toolbarItem.tooltip))" location="top" activator="parent" />

    <VIcon v-if="toolbarItem.icon" :icon="toolbarItem.icon" size="small" />
    <span v-else class="menu-item-title">
      {{ ucFirst(t(toolbarItem.name)) }}
    </span>

    <VIcon v-if="toolbarItem.icon2" v-bind="toolbarItem?.icon2Props ?? {}" :icon="toolbarItem.icon2" size="small" style="position: absolute;" />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>
