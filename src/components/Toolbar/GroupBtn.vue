<script setup lang="ts">
import BtnIcon from "@tiptapify/components/UI/BtnIcon.vue";
import { defineProps, PropType } from 'vue'


import { ToolbarItem } from '@tiptapify/types/toolbarItems'

defineProps({
  variant: { type: String, default () { return 'flat' }},
  toolbarItem: { type: Object as PropType<ToolbarItem>, default() { return {} }}
})

</script>

<template>
  <VBtn v-bind="toolbarItem?.props ?? {}" v-on="toolbarItem?.attrs ?? {}" size="32">
    <VTooltip :text="toolbarItem.tooltip" location="top" activator="parent" />

    <BtnIcon :icon="toolbarItem.icon" />

    <VIcon
        v-if="toolbarItem.icon2"
        v-bind="toolbarItem?.icon2Props ?? {}"
        :icon="toolbarItem.icon2"
        size="small"
        style="position: absolute;"
    />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>
