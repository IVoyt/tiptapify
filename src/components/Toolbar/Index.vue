<script setup lang="ts">
import { Editor } from "@tiptap/vue-3";
import { getDefaultComponents } from "@tiptapify/components/Toolbar/defaultExtensionComponents";
import Items from "@tiptapify/components/Toolbar/Items.vue";
import { computed, defineProps, inject, PropType, ref, Ref, ShallowRef, shallowRef, triggerRef } from 'vue'
import { extensionsComponents } from '@tiptapify/types/overridable-extensions'

import { toolbarItems } from "@tiptapify/components/Toolbar/items";

const props = defineProps({
  variantBtn: { type: String, default () { return 'elevated' }},
  variantField: { type: String, default () { return 'solo' }},
  items: { type: Array<string>, default() { return [] }},
  itemsExclude: { type: Boolean, default() { return false } },
  headingLevels: { type: Array<number>, default() { return [] }},
  fontMeasure: { type: String, default () { return 'px' }},
  customFonts: { type: Array<string>, default () { return [] } },
  customFontsOverride: { type: Boolean, default() { return false } },
  theme: { type: String, default() { return 'light' } },
  rounded: { type: String, default() { return '0' } },
  toolbarScrollable: { type: Boolean, default() { return false } },
  overrideExtensionsComponents: { type: Object as PropType<extensionsComponents>, default() { return {} } },
})

const editor = inject('tiptapifyEditor') as Ref<Editor>

const items = toolbarItems(
    editor,
    computed(() => props.fontMeasure).value,
    { list: computed(() => props.items).value, exclude: computed(() => props.itemsExclude).value },
    computed(() => props.headingLevels).value
)

const defaultComponents: extensionsComponents = getDefaultComponents(props.variantField)

const extensions: ShallowRef<extensionsComponents> = shallowRef({})
Object.keys(defaultComponents).forEach(extension => {
  extensions.value[extension] = props.overrideExtensionsComponents[extension] ?? defaultComponents[extension]
})

</script>

<template>
  <div v-if="editor">
    <VToolbar elevation="1" :theme="theme" height="auto" :class="`ps-1 rounded-t-${rounded}`">
      <VToolbarItems class="py-2">
        <template v-for="(toolbarSection, sectionKey) in toolbarItemsRef" :key="sectionKey">
          <Group v-if="toolbarSection.group" :variant="variantBtn" :toolbar-section="toolbarSection" />

          <Toggle v-else-if="toolbarSection.toggle" :variant="variantBtn" :toolbar-section="toolbarSection" />

      <Items v-else :items="items" />
    </VToolbar>

    <template v-for="extension in extensions">
      <component :is="extension.component" v-bind="extension?.props ?? {}"  />
    </template>
  </div>
</template>

<style lang="scss" scoped>

</style>
