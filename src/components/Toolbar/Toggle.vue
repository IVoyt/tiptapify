<script setup lang="ts">
import { defineProps, inject, PropType } from 'vue'
import * as mdi from '@mdi/js'

import { ToolbarItemSection } from "@tiptapify/components/Toolbar/items";

defineProps({
  variant: { type: String, default () { return 'flat' }},
  toolbarSection: { type: Object as PropType<ToolbarItemSection>, default() { return {} }}
})

const { t } = inject('tiptapifyI18n') as any

</script>

<template>
  <VBtnToggle :variant="variant" elevation="4">
    <template v-for="(item, key) in toolbarSection.items" :key="key">
      <VBtn v-bind="item.props" v-on="item.attrs" size="32">
        <VTooltip :text="item.name" location="top" activator="parent" />

        <VIcon :icon="item.icon || `mdiSvg:${mdi.mdiImageBrokenVariant}`" size="small" />
      </VBtn>
    </template>
  </VBtnToggle>
</template>

<style lang="scss" scoped>

</style>
