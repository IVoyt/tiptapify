import { useActionsItems } from "@tiptapify/composables/Toolbar/useActionsItems";
import { useAlignmentItems } from "@tiptapify/composables/Toolbar/useAlignmentItems";
import { useFormatExtraItems } from "@tiptapify/composables/Toolbar/useFormatExtraItems";
import { useFormatItems } from "@tiptapify/composables/Toolbar/useFormatItems";
import { useListItems } from "@tiptapify/composables/Toolbar/useListItems";
import { useMediaItems } from "@tiptapify/composables/Toolbar/useMediaItems";
import { useMiscItems } from "@tiptapify/composables/Toolbar/useMiscItems";
import { useStyleItems } from "@tiptapify/composables/Toolbar/useStyleItems";
import { ComputedRef, ref } from "vue";

interface ToolbarItemAttrs {
  [key: string]: Function | any
}

interface ToolbarItemProps {
  [key: string]: any
}

export interface ToolbarItem {
  name: string|number|ComputedRef<string>,
  tooltip: string|ComputedRef<string>,
  icon: string|ComputedRef<string>,
  icon2?: string|ComputedRef<string>,
  noI18n?: boolean,
  enabled: boolean,
  component?: any,
  modelValue?: any,
  group?: boolean,
  toggle?: boolean,
  icon2Props?: ToolbarItemProps,
  componentProps?: ToolbarItemProps,
  props?: ToolbarItemProps,
  attrs?: ToolbarItemAttrs,
  children?: ToolbarItems|ToolbarItem[],
}

export interface ToolbarItems {
  [key: string]: ToolbarItem
}

export interface ToolbarItemSection {
  group?: boolean,
  toggle?: boolean,
  items: ToolbarItems,
}

export interface ToolbarItemSections {
  [key: string]: ToolbarItemSection
}

export function toolbarItems(
  editor: any,
  theme: any,
  fontMeasure: string,
  items: { list: Array<string>, exclude: boolean },
  customHeadingLevels: Array<number>
): ToolbarItemSections {
  const styleItems = ref(useStyleItems(editor.value, theme, fontMeasure, customHeadingLevels))
  const formatItems = ref(useFormatItems(editor.value))
  const formatExtraItems = ref(useFormatExtraItems(editor.value))
  const alignmentItems = ref(useAlignmentItems(editor.value))
  const listItems = ref(useListItems(editor.value))
  const actionsItems = ref(useActionsItems(editor.value))
  const miscItems = ref(useMiscItems(editor.value))
  const mediaItems = ref(useMediaItems(editor.value))

  const allMenuItems: ToolbarItemSections = {
    /**
     * todo
     *
     * media (video)
     */
    style: { group: true, items: styleItems.value },
    format: { group: true, items: formatItems.value },
    format_extra: { group: true, items: formatExtraItems.value },
    media: { group: true, items: mediaItems.value },
    alignment: { toggle: true, items: alignmentItems.value },
    list: { group: true, items: listItems.value },
    actions: { group: true, items: actionsItems.value },
    misc: { group: true, items: miscItems.value },
  }

  const pluginsList: Array<string> = []
  Object.keys(allMenuItems).forEach(section => {
    Object.keys(allMenuItems[section]).forEach(item => pluginsList.push(item))
  })

  if (items.list.length) {
    items.list.forEach(item => {
      if (!pluginsList.includes(item)) {
        throw new Error(`Unknown plugin name: ${item}! Supported plugins: ${pluginsList.join(', ')}`)
      }
    })
  }

  const toolbarItems: ToolbarItemSections = {}

  const sections: { [key: string]: number } = {}

  Object.keys(allMenuItems).forEach(sectionName => {
    const section = allMenuItems[sectionName]
    Object.keys(section.items).forEach(plugin => {
      const item = section.items[plugin]

      if (items.list.length) {
        item.enabled = items.list.includes(plugin)
        if (items.exclude) {
          item.enabled = !item.enabled
        }
      }

      if (typeof toolbarItems[sectionName] === 'undefined') {
        sections[sectionName] = 0
        toolbarItems[sectionName] = {
          group: section.group ?? false,
          toggle: section.toggle ?? false,
          items: {},
        }
      }

      toolbarItems[sectionName].items[plugin] = item

      if (item.enabled) {
        sections[sectionName]++
      }
    })
  })

  Object.keys(sections).forEach(sectionName => {
    if (sections[sectionName] === 0) {
      delete toolbarItems[sectionName]
    }
  })

  return toolbarItems
}