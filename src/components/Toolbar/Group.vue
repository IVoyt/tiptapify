<script setup lang="ts">
import GroupBtn from "@tiptapify/components/Toolbar/GroupBtn.vue";
import GroupDropdown from "@tiptapify/components/Toolbar/GroupDropdown.vue";
import { defineProps, PropType } from 'vue'

import { ToolbarItemSection } from "@tiptapify/types/toolbarItems";

defineProps({
  variant: { type: String, default () { return 'flat' }},
  section: { type: String, default() { return '' }},
  toolbarSection: { type: Object as PropType<ToolbarItemSection>, default() { return {} }}
})

</script>

<template>
  <VBtnGroup :variant="variant" elevation="4">
    <template v-for="(toolbarItem, toolbarItemKey) in toolbarSection.items" :key="toolbarItemKey">
      <template v-if="toolbarItem.children">
        <GroupDropdown :toolbar-item="toolbarItem" :variant="variant" />
      </template>

      <VMenu v-else-if="toolbarItem?.component" v-model="toolbarItem.modelValue" :close-on-content-click="false" v-bind="toolbarItem.props">
        <template #activator="{ props: menuProps }">
          <GroupBtn v-bind="menuProps" :toolbar-item="toolbarItem" :variant="variant" />
        </template>

        <component
            :is="toolbarItem.component"
            v-bind="toolbarItem?.componentProps ?? {}"
            @close="toolbarItem.modelValue = false"
        />
      </VMenu>

      <GroupBtn v-else :toolbar-item="toolbarItem" :variant="variant" />
    </template>
  </VBtnGroup>
</template>

<style lang="scss" scoped>

</style>
