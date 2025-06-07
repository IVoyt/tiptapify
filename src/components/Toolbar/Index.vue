<script setup lang="ts">
import { Editor } from "@tiptap/vue-3";
import LinkDialog from "@tiptapify/extensions/components/LinkDialog.vue";
import ShowSourceDialog from "@tiptapify/extensions/components/ShowSourceDialog.vue";
import PreviewDialog from "@tiptapify/extensions/components/PreviewDialog.vue";
import Group from "@tiptapify/components/Toolbar/Group.vue";
import Toggle from "@tiptapify/components/Toolbar/Toggle.vue";
import { computed, defineProps, inject, Ref, ref } from 'vue'
import { useI18n } from "vue-i18n";

import { toolbarItems, ToolbarItemSections } from "@tiptapify/components/Toolbar/items";

const props = defineProps({
  variant: { type: String, default () { return 'flat' }},
  items: { type: Array<string>, default() { return [] }},
  itemsExclude: { type: Boolean, default() { return false } },
  headingLevels: { type: Array<number>, default() { return [] }},
  fontMeasure: { type: String, default () { return 'px' }},
  customFonts: { type: Array<string>, default () { return [] } },
  customFontsOverride: { type: Boolean, default() { return false } },
  theme: { type: String, default() { return 'light' } },
  rounded: { type: String, default() { return '0' } },
})

const { t } = useI18n();

const editor = inject('tiptapifyEditor') as Ref<Editor>

const toolbarLinkButton = ref(null)

const items = toolbarItems(
    editor,
    computed(() => props.fontMeasure).value,
    { list: computed(() => props.items).value, exclude: computed(() => props.itemsExclude).value },
    computed(() => props.headingLevels).value,
    toolbarLinkButton
)
const toolbarItemsRef: Ref<ToolbarItemSections> = ref(items)

</script>

<template>
  <div v-if="editor">
    <VToolbar elevation="1" :theme="theme" height="auto" :class="`ps-1 rounded-t-${rounded}`">
      <VToolbarItems class="py-2">
        <template v-for="(toolbarSection, sectionKey) in toolbarItemsRef" :key="sectionKey">
          <Group v-if="toolbarSection.group" :variant="variant" :toolbar-section="toolbarSection" />

          <Toggle v-else-if="toolbarSection.toggle" :variant="variant" :toolbar-section="toolbarSection" />

          <VBtn
              v-else
              v-for="(toolbarItem, itemKey) in toolbarSection.items"
              :key="itemKey"
              :variant="variant"
              v-bind="toolbarItem.props"
              v-on="toolbarItem.attrs"
              class="menu-button"
              size="32"
              elevation="4"
              rounded="sm"
          >
            <VTooltip :text="t(toolbarItem.tooltip)" location="top" activator="parent" />

            <VIcon v-if="toolbarItem.icon" :icon="toolbarItem.icon" size="16" />
            <span v-else class="menu-item-title">
              {{ t(toolbarItem.name) }}
            </span>
          </VBtn>

          <div class="menu-divider"></div>
        </template>
      </VToolbarItems>
    </VToolbar>

    <LinkDialog ref="toolbarLinkButton" />
    <PreviewDialog />
    <ShowSourceDialog />
  </div>
</template>

<style lang="scss" scoped>
.tiptapify-menu {
  padding: 8px;
  border-bottom: var(--border);
}

:deep(.toolbar__items) {
  flex-wrap: wrap;
}

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
