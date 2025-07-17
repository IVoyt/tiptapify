<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { useI18n } from "vue-i18n";

import { ToolbarItem } from "@tiptapify/components/Toolbar/items";

defineProps({
  variant: { type: String, default () { return 'flat' }},
  nested: { type: Boolean, default () { return false }},
  toolbarItem: { type: Object as PropType<ToolbarItem>, default() { return {} }}
})

const { t } = useI18n();

</script>

<template>
  <VMenu v-model="toolbarItem.modelValue" v-bind="toolbarItem.props">
    <template v-if="!nested" #activator="{ props: menuProps }">
      <VBtn v-bind="{ ...menuProps, ...toolbarItem.props }" size="32">
        <VTooltip :text="toolbarItem.tooltip" location="top" activator="parent" />

        <VIcon v-if="toolbarItem.icon" :icon="toolbarItem.icon" size="small" />
        <span v-else class="menu-item-title">
          {{ toolbarItem.name }}
        </span>
      </VBtn>
    </template>

    <VList v-model="toolbarItem.modelValue" max-height="430px">
      <VListItem
          v-for="(item, menuItemKey) in toolbarItem.children"
          :key="menuItemKey"
          :value="item.name"
          density="compact"
          class="pa-0"
      >
        <VBtn
            variant="text"
            block
            class="justify-start"
            rounded="0"
            v-bind="item.props ?? {}"
            v-on="item?.attrs ?? {}"
        >
          <VTooltip v-if="item.tooltip" :text="item.tooltip" location="top" activator="parent" />

          <VIcon v-if="item.icon" :icon="item.icon" size="small" />

          <span v-else class="menu-item-title">
            <template v-if="item.noI18n">
              {{ item.name }}
            </template>
            <template v-else>
              {{ item.toggle }}
            </template>
          </span>

          <VMenu
              v-if="item.component"
              v-bind="item.props"
          >
            <VList>
              <VListItem density="compact">
                <component :is="item.component" @close="toolbarItem.modelValue = false" />
              </VListItem>
            </VList>
          </VMenu>

          <template v-if="item.children?.length">
            <GroupDropdown :toolbar-item="item" variant="outline" :nested="true" />
          </template>
        </VBtn>
      </VListItem>
    </VList>
  </VMenu>
</template>

<style lang="scss" scoped>

</style>
