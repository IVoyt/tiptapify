<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { useI18n } from "vue-i18n";

import { ToolbarItemSection } from "@tiptapify/components/Toolbar/items";

defineProps({
  variant: { type: String, default () { return 'flat' }},
  section: { type: String, default() { return '' }},
  toolbarSection: { type: Object as PropType<ToolbarItemSection>, default() { return {} }}
})

const { t } = useI18n();

</script>

<template>
  <VBtnGroup :variant="variant" elevation="4">
    <template v-for="(toolbarItem, toolbarItemKey) in toolbarSection.items" :key="toolbarItemKey">
      <template v-if="toolbarItem.children">
        <VMenu>
          <template #activator="{ props: menuProps }">
            <VBtn v-bind="{ ...menuProps, ...toolbarItem.props }" size="32">
              <VTooltip :text="t(toolbarItem.tooltip)" location="top" activator="parent" />

              <VIcon v-if="toolbarItem.icon" :icon="toolbarItem.icon" size="small" />
              <span v-else class="menu-item-title">
                {{ t(toolbarItem.name) }}
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
                  variant="flat"
                  rounded="0"
                  v-bind="item.props"
                  v-on="item.attrs"
              >
                <VTooltip v-if="item.tooltip" :text="t(item.tooltip)" location="top" activator="parent" />

                <VIcon v-if="item.icon" :icon="item.icon" size="small" />
                <span v-else class="menu-item-title">
                  <template v-if="item.noI18n">
                    {{ item.name }}
                  </template>
                  <template v-else>
                    {{ t(item.toggle) }}
                  </template>
                </span>
              </VBtn>
            </VListItem>
          </VList>
        </VMenu>
      </template>

      <VBtn v-else v-bind="toolbarItem.props" v-on="toolbarItem.attrs" size="32">
        <VTooltip :text="t(toolbarItem.tooltip)" location="top" activator="parent" />

        <VIcon v-if="toolbarItem.icon" :icon="toolbarItem.icon" size="small" />
        <span v-else class="menu-item-title">
          {{ t(toolbarItem.name) }}
        </span>
      </VBtn>
    </template>
  </VBtnGroup>
</template>

<style lang="scss" scoped>

</style>
