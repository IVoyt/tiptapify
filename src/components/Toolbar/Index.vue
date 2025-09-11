<script setup lang="ts">
import { Editor } from "@tiptap/vue-3";
import Items from "@tiptapify/components/Toolbar/Items.vue";
import defaults from "@tiptapify/constants/defaults";
import { computed, inject, PropType, Ref } from 'vue'
import { itemsPropType, toolbarSections } from '@tiptapify/types/toolbarTypes'

import { default as items, availableItems } from "@tiptapify/components/Toolbar/items";

const props = defineProps({
  variantBtn: { type: String, default () { return defaults.variantBtn } },
  variantField: { type: String, default () { return defaults.variantField } },
  items: { type: [Array, Object as PropType<itemsPropType>], default() { return [] } },
  itemsExclude: { type: Boolean, default() { return false } },
  fontMeasure: { type: String, default () { return 'px' } },
  customFonts: { type: Array<string>, default () { return [] } },
  customFontsOverride: { type: Boolean, default() { return false } },
  theme: { type: String, default() { return 'light' } },
  rounded: { type: String, default() { return '0' } },
  toolbarScrollable: { type: Boolean, default() { return false } },
  customExtensions: { type: Array as PropType<toolbarSections>, default() { return [] } },
})

const editor = inject('tiptapifyEditor') as Ref<Editor>

const propsItems = computed(() => props.items)
const propsItemsIsList = computed(() => Array.isArray(propsItems.value))
const propsItemsExclude = computed(() => props.itemsExclude)

// this prevents from overriding the default items
let toolbarItems = [...Object.values(items)]
const availableItemsKeys = Object.keys(availableItems)

type toolbarItemsType = { [key: string]: { section: string, group: boolean, components: any[] } }
propsItemsExclude.value ? prepareExcludeToolbarItems() : prepareToolbarItems()

function prepareToolbarItems() {
  const _toolbarItems: toolbarItemsType = {}

  if (!propsItemsIsList.value) {
    for (const propsItemSection in propsItems.value as itemsPropType) {
      if (propsItems.value[propsItemSection].length === 0) {
        continue
      }

      for (const propsItem of propsItems.value[propsItemSection]) {
        const item = propsItem.split(':')
        if (!availableItemsKeys.includes(item[0])) {
          throw new Error(`The ${propsItem} is unknown extension. Please use one of the following: ${availableItemsKeys.join(', ')}`)
        }

        addToolbarItem(_toolbarItems, propsItems.value[propsItemSection], propsItem)
      }
    }
  } else if (propsItems.value.length > 0) {
    for (const propsItem of propsItems.value as string[]) {
      const item = propsItem.split(':')
      if (!availableItemsKeys.includes(item[0])) {
        throw new Error(`The ${propsItem} is unknown extension. Please use one of the following: ${availableItemsKeys.join(', ')}`)
      }

      addToolbarItem(_toolbarItems, propsItems.value, propsItem)
    }
  } else {
    return
  }

  toolbarItems = Object.values(_toolbarItems)
}

function prepareExcludeToolbarItems() {
  const _toolbarItems: toolbarItemsType = {}
  const excludeItems = []
  for (const propsItemSection in propsItems.value as itemsPropType) {
    for (const propsItem of propsItems.value[propsItemSection]) {
      excludeItems.push(propsItem)
    }
  }

  for (const item in availableItems) {
    addToolbarItem(_toolbarItems, excludeItems, item)
  }

  toolbarItems = Object.values(_toolbarItems)
}

function addToolbarItem(_toolbarItems: toolbarItemsType, itemsList: any, itemTitle: string, group: boolean|null = null): boolean {
  const item = itemTitle.split(':')
  const _itemTitle = item[0]
  const _itemOptions = item[1] ? item[1].split(',') : []

  const itemSection = availableItems[_itemTitle]
  const section = items[itemSection]

  const component = section?.components.find((component: any) => component.name === _itemTitle)

  let itemExists = itemsList.includes(itemTitle)
  itemExists = propsItemsExclude.value ? itemExists : !itemExists
  if (!component || itemExists) {
    return false
  }

  if (group === null) {
    group = section.group
  }

  if (typeof _toolbarItems[itemSection] === 'undefined') {
    _toolbarItems[itemSection] = {
      section: itemSection,
      group,
      components: []
    }
  }

  if (_itemTitle === 'heading' && _itemOptions.length > 0) {
    const paragraphIndex = _itemOptions.findIndex((item: any) => item === 'p')
    const withParagraph = paragraphIndex > -1
    if (withParagraph) {
      _itemOptions.splice(paragraphIndex, 1)
    }

    component.props = {
      withParagraph,
      customHeadingLevels: _itemOptions,
    }
  }

  if (_itemTitle === 'bulletList' && _itemOptions.length > 0) {
    const paragraphIndex = _itemOptions.findIndex((item: any) => item === 'p')
    const withParagraph = paragraphIndex > -1
    if (withParagraph) {
      _itemOptions.splice(paragraphIndex, 1)
    }

    component.props = {
      withDisc: _itemOptions.includes('disc'),
      withCircle: _itemOptions.includes('circle'),
      withSquare: _itemOptions.includes('square'),
    }
  }

  _toolbarItems[itemSection].components.push(component)

  return true
}

Object.keys(props.customExtensions).forEach((key: any) => {
  toolbarItems.push(props.customExtensions[key])
})

</script>

<template>
  <div v-if="editor" class="tiptapify-toolbar">
    <VToolbar elevation="1" :theme="theme" height="auto" :class="`ps-1 pr-1 rounded-t-${rounded}`">
      <VSlideGroup v-if="toolbarScrollable">
        <Items :items="toolbarItems" />
      </VSlideGroup>

      <Items v-else :items="toolbarItems" />
    </VToolbar>
  </div>
</template>

<style lang="scss" scoped>

</style>
