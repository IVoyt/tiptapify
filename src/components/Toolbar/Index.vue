<script setup lang="ts">
import LinkDialog from "@tiptapify/components/extensions/components/LinkDialog.vue";
import { useEditor } from "@tiptapify/composable/useEditor";
import { computed, defineProps, Ref, ref } from 'vue'
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
})

const { t } = useI18n();

const { editor } = useEditor()
const editorInstance = ref(editor.getInstance())

const toolbarLinkButton = ref(null)

const items = toolbarItems(
    editorInstance,
    computed(() => props.fontMeasure).value,
    { list: computed(() => props.items).value, exclude: computed(() => props.itemsExclude).value },
    computed(() => props.headingLevels).value,
    toolbarLinkButton
)
const toolbarItemsRef: Ref<ToolbarItemSections> = ref(items)

</script>

<template>
  <div v-if="editor" class="d-flex flex-wrap gap-x-4 gap-y-2 tiptapify-menu">
    <template v-for="(toolbarItems, sectionKey) in toolbarItemsRef" :key="sectionKey">
      <template v-for="(toolbarItem, toolbarItemKey) in toolbarItems" :key="toolbarItemKey">
        <VDivider v-if="toolbarItem.name === '|'" vertical class="menu-divider" />

        <template v-else-if="toolbarItem.enabled">
          <template v-if="toolbarItem.children">
            <VBtnToggle v-if="toolbarItem.group" :variant="variant">
              <VBtn
                  v-for="(item, key) of toolbarItem.children"
                  v-bind="{ ...props, ...item.props}" v-on="item.attrs" size="32"
                  :key="`${item.name}-${key}`"
              >
                <VTooltip :text="t(item.name)" location="top" activator="parent" />

                <VIcon v-if="item.icon" :icon="item.icon" size="small" />
                <span v-else class="menu-item-title">
                {{ t(toolbarItem.name) }}
              </span>
              </VBtn>
            </VBtnToggle>

            <VMenu v-else>
              <template #activator="{ props: menuProps }">
                <VBtn :variant="variant" v-bind="menuProps" size="32" class="menu-button">
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
                    v-bind="item.props"
                    v-on="item.attrs"
                >
                  <VTooltip v-if="item.tooltip" :text="t(item.tooltip)" location="top" activator="parent" />

                  <VListItemTitle>
                    <VIcon v-if="item.icon" :icon="item.icon" size="small" />
                    <span v-else class="menu-item-title">
                      <template v-if="item.noI18n">
                        {{ item.name }}
                      </template>
                      <template v-else>
                        {{ t(item.name) }}
                      </template>
                    </span>
                  </VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </template>

          <VBtn v-else :variant="variant" v-bind="toolbarItem.props" v-on="toolbarItem.attrs" class="menu-button" size="32">
            <VTooltip :text="t(toolbarItem.tooltip)" location="top" activator="parent" />

            <VIcon v-if="toolbarItem.icon" :icon="toolbarItem.icon" size="16" />
            <span v-else class="menu-item-title">
            {{ t(toolbarItem.name) }}
          </span>
          </VBtn>
        </template>
      </template>

      <VDivider vertical class="menu-divider" />
    </template>

    <LinkDialog ref="toolbarLinkButton" />
  </div>
</template>

<style lang="scss" scoped>
.tiptapify-menu {
  padding: 8px;
  border-bottom: var(--border);
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

.v-divider.menu-divider {
  margin: 0 10px;
}

.v-divider.menu-divider:nth-last-child(1) {
  display: none;
}
</style>
