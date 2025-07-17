<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { useI18n } from "vue-i18n";

import { ToolbarItemSection } from "@tiptapify/components/Toolbar/items";

defineProps({
  variant: { type: String, default () { return 'flat' }},
  toolbarSection: { type: Object as PropType<ToolbarItemSection>, default() { return {} }}
})

const { t } = useI18n();

</script>

<template>
  <VBtnToggle :variant="variant" elevation="4">
    <template v-for="(item, key) in toolbarSection.items" :key="key">
      <VBtn v-bind="item.props" v-on="item.attrs" size="32">
        <VTooltip :text="item.name" location="top" activator="parent" />

        <VIcon v-if="item.icon" :icon="item.icon" size="small" />
        <span v-else class="menu-item-title">
          {{ item.name }}
        </span>
      </VBtn>
    </template>
  </VBtnToggle>
</template>

<style lang="scss" scoped>

</style>
