<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'
import Items from '@tiptapify/components/Toolbar/Items.vue'
import defaults from '@tiptapify/constants/defaults'
import { variantFieldTypes } from '@tiptapify/types/editor'
import { computed, inject, PropType, Ref } from 'vue'
import { itemsPropType, toolbarSections } from '@tiptapify/types/toolbarTypes'

import { default as toolbarItemsGroups, availableItems } from '@tiptapify/components/Toolbar/items'

const props = defineProps({
  variantField: { type: String as PropType<variantFieldTypes>, default() { return defaults.variantField } },
  items: { type: [Array, Object] as PropType<itemsPropType>, default() { return [] } },
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
const propsItemsExclude = computed(() => props.itemsExclude)

// this prevents from overriding the default items
let toolbarItems = Object.values(toolbarItemsGroups).map(section => ({
  ...section,
  components: section.components.map(component => ({ ...component })),
}))
const availableItemsKeys = Object.keys(availableItems)

type toolbarItemsType = { [key: string]: { section: string, group: boolean, components: any[] } }
if (propsItemsExclude.value) {
  prepareExcludeToolbarItems()
} else if (Array.isArray(propsItems.value) && propsItems.value.includes('|')) {
  prepareGroupedToolbarItems(propsItems.value as string[])
} else {
  prepareToolbarItems()
}

/**
 * Items split by `'|'` into groups of their own, whatever sections the buttons come from. A name that is
 * not a built-in item keeps a place for the custom button of that name; editors without it drop the place.
 */
function prepareGroupedToolbarItems(items: string[]) {
  const groups: toolbarItemsType[string][] = []
  const newGroup = () => ({ section: `__group_${groups.length}__`, group: true, components: [] as any[] })
  let group = newGroup()

  const flush = () => {
    if (group.components.length > 0) {
      groups.push(group)
    }
    group = newGroup()
  }

  for (const propsItem of items) {
    if (propsItem === '|') {
      flush()
      continue
    }

    if (propsItem === '~') {
      flush()
      groups.push({ section: '__spacer__', group: false, components: [] })
      group = newGroup()
      continue
    }

    const itemName = propsItem.split(':')[0]
    if (!availableItemsKeys.includes(itemName)) {
      group.components.push({ name: itemName, component: null })
      continue
    }

    const itemSections: toolbarItemsType = {}
    addToolbarItem(itemSections, items, propsItem)
    group.components.push(...Object.values(itemSections).flatMap(section => section.components))
  }
  flush()

  toolbarItems = groups
}

function prepareToolbarItems() {
  const _toolbarItems: toolbarItemsType = {}

  if (!Array.isArray(propsItems.value)) {
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
      if (propsItem === '|') {
        if (typeof _toolbarItems['__separator__'] === 'undefined') {
          _toolbarItems['__separator__'] = {
            section: '__separator__',
            group: false,
            components: []
          }
        }
        continue
      }
      // `~` pushes the items after it to the end of the toolbar
      if (propsItem === '~') {
        _toolbarItems['__spacer__'] ??= {
          section: '__spacer__',
          group: false,
          components: []
        }
        continue
      }
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

function addToolbarItem(_toolbarItems: toolbarItemsType, itemsList: Array<any>, itemTitle: string, group: boolean|null = null): boolean {
  const item = itemTitle.split(':')
  const _itemTitle = item[0]
  const _itemOptions = item[1] ? item[1].split(',') : []

  const itemSection = availableItems[_itemTitle]
  const section = toolbarItemsGroups[itemSection]

  // A copy: item options set its props, which must not reach the toolbars of other editors
  const sectionComponent = section?.components.find((component: { name: string }) => component.name === _itemTitle)
  const component = sectionComponent ? { ...sectionComponent } : undefined

  let itemExists = itemsList.includes(itemTitle)
  itemExists = propsItemsExclude.value ? itemExists : !itemExists
  if (!component || itemExists) {
    return false
  }

  if (group === null) {
    group = section.group ?? true
  }

  if (typeof _toolbarItems[itemSection] === 'undefined') {
    _toolbarItems[itemSection] = {
      section: itemSection,
      group,
      components: []
    }
  }

  if (_itemTitle === 'heading' && _itemOptions.length > 0) {
    const paragraphIndex = _itemOptions.findIndex((item: string) => item === 'p')
    const withParagraph = paragraphIndex > -1
    if (withParagraph) {
      _itemOptions.splice(paragraphIndex, 1)
    }

    const inlineIndex = _itemOptions.findIndex((item: string) => item === 'inline')
    const inline = inlineIndex > -1
    if (inline) {
      _itemOptions.splice(inlineIndex, 1)
    }

    component.props = {
      withParagraph,
      inline,
      customHeadingLevels: _itemOptions.map((item: string) => parseInt(item)),
    }
  }

  // `orderedList:styles` adds the numbering styles dropdown
  if (_itemTitle === 'orderedList' && _itemOptions.includes('styles')) {
    component.props = {
      withStyles: true,
    }
  }

  // `align` is the alignment dropdown; `align:left,center,right` limits its options
  if (_itemTitle === 'align' && _itemOptions.length > 0) {
    component.props = {
      alignments: _itemOptions,
    }
  }

  if (_itemTitle === 'bulletList' && _itemOptions.length > 0) {
    const paragraphIndex = _itemOptions.findIndex((item: any) => item === 'p')
    const withParagraph = paragraphIndex > -1
    if (withParagraph) {
      _itemOptions.splice(paragraphIndex, 1)
    }

    component.props = {
      withStyles: _itemOptions.includes('styles'),
      withDisc: _itemOptions.includes('disc'),
      withCircle: _itemOptions.includes('circle'),
      withSquare: _itemOptions.includes('square'),
    }
  }

  _toolbarItems[itemSection].components.push(component)

  return true
}

// A custom button takes the place of the item of its name, joins its section or comes as a section of its own
for (const customSection of props.customExtensions) {
  const unplaced = []
  for (const component of customSection.components) {
    const place = toolbarItems.flatMap(item => item.components).find(_component => _component.name === component.name)
    if (place) {
      Object.assign(place, component)
    } else {
      unplaced.push(component)
    }
  }

  if (unplaced.length === 0) {
    continue
  }

  const existingSection = toolbarItems.find(item => item.section === customSection.section)
  if (existingSection) {
    existingSection.components.push(...unplaced)
  } else {
    const spacerIndex = toolbarItems.findIndex(item => item.section === '__spacer__')
    toolbarItems.splice(spacerIndex > -1 ? spacerIndex : toolbarItems.length, 0, { ...customSection, components: unplaced })
  }
}

toolbarItems = toolbarItems
  .map(item => ({ ...item, components: item.components.filter(component => component.component) }))
  .filter(item => item.components.length > 0 || ['__spacer__', '__separator__'].includes(item.section))

</script>

<template>
  <div v-if="editor" class="tiptapify-toolbar">
    <VToolbar flat :theme="theme" height="auto" :class="`rounded-t-${rounded}`">
      <VSlideGroup v-if="toolbarScrollable">
        <Items :items="toolbarItems" />
      </VSlideGroup>

      <Items v-else :items="toolbarItems" />
    </VToolbar>
  </div>
</template>

<style lang="scss">
/*
 * Quiet toolbar: a tinted bar under a hairline, ghost icon buttons that only get a background on
 * hover, and a neutral "pressed" state instead of the filled primary button. The buttons keep
 * coloring themselves with `color="primary"` when active; the toolbar maps that to the pressed look.
 */
.tiptapify-toolbar {
  > .v-toolbar {
    background: rgba(var(--v-theme-on-surface), 0.03);
    border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
  }
}

/*
 * Quiet buttons of the toolbar and the bubble menus. Tripled class: outranks Vuetify's color utilities and
 * the theme rules that repaint colored buttons on hover, focus and press (`.bg-primary:focus` and the like).
 * Active buttons keep `color="primary"` (or `.tiptapify-btn--active`) and get the neutral pressed look.
 */
.tiptapify-toolbar,
.tiptapify-quiet-buttons {
  .v-btn.v-btn.v-btn {
    border-radius: 6px;
    box-shadow: none !important;
    background-color: transparent !important;
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity)) !important;
    transition: background-color 0.15s, color 0.15s;

    > .v-btn__overlay,
    > .v-btn__underlay {
      display: none;
    }

    &:hover,
    &:focus-visible,
    &[aria-expanded='true'] {
      background-color: rgba(var(--v-theme-on-surface), 0.07) !important;
      color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity)) !important;
    }

    &.bg-primary,
    &.text-primary,
    &.tiptapify-btn--active {
      &,
      &:focus,
      &:active {
        background-color: rgba(var(--v-theme-on-surface), 0.1) !important;
        color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity)) !important;
      }

      &:hover,
      &:focus-visible,
      &[aria-expanded='true'] {
        background-color: rgba(var(--v-theme-on-surface), 0.14) !important;
      }
    }

    &:focus-visible {
      outline: 2px solid rgba(var(--v-theme-on-surface), 0.25);
      outline-offset: -2px;
    }
  }
}

/* A toolbar button that opens a dropdown: the current choice and a chevron */
.tiptapify-toolbar .v-btn.tiptapify-dropdown-button {
  min-width: 0;
  padding-inline: 6px 4px;

  .tiptapify-dropdown-button__chevron {
    margin-inline-start: 2px;
    opacity: 0.7;
  }
}

/* Dropdowns opened from the toolbar: a light card with compact rows of icon + label. */
.tiptapify-menu {
  /* Doubled classes: the admin theme pads menu lists and items with its own !important rules */
  > .v-list.v-list {
    padding: 4px !important;
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

    > .v-list-item.v-list-item {
      min-height: 34px;
      margin: 0 !important;
      padding: 4px 8px !important;
      border-radius: 6px;
      color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));

      .v-list-item__prepend > .v-icon {
        margin-inline-end: 0;
        opacity: 0.6;
      }

      .v-list-item__spacer {
        width: 10px !important;
      }

      .v-list-item-title {
        font-size: 14px;
        font-weight: 500;
      }

      &.v-list-item--active {
        background: rgba(var(--v-theme-on-surface), 0.06);
        color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity)) !important;

        > .v-list-item__overlay {
          opacity: 0;
        }
      }
    }
  }
}
</style>
