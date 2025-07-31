import { useActionsItems } from "@tiptapify/composables/Toolbar/useActionsItems";
import { useAlignmentItems } from "@tiptapify/composables/Toolbar/useAlignmentItems";
import { useFormatExtraItems } from "@tiptapify/composables/Toolbar/useFormatExtraItems";
import { useFormatItems } from "@tiptapify/composables/Toolbar/useFormatItems";
import { useListItems } from "@tiptapify/composables/Toolbar/useListItems";
import { useMediaItems } from "@tiptapify/composables/Toolbar/useMediaItems";
import { useMiscItems } from "@tiptapify/composables/Toolbar/useMiscItems";
import { useStyleItems } from "@tiptapify/composables/Toolbar/useStyleItems";
import { extensionComponents } from "@tiptapify/types/extensionComponents";
import { ref } from "vue";

import { ToolbarItem, ToolbarItemSections } from '@tiptapify/types/toolbarItems'

export function toolbarItems(
  theme: any,
  fontMeasure: string,
  items: { list: Array<ToolbarItem>, exclude: boolean },
  customHeadingLevels: Array<number>,
  customExtensions: extensionComponents
): ToolbarItemSections {
  const styleItems = ref(useStyleItems(theme, fontMeasure, customHeadingLevels))
  const formatItems = ref(useFormatItems())
  const formatExtraItems = ref(useFormatExtraItems())
  const alignmentItems = ref(useAlignmentItems())
  const listItems = ref(useListItems())
  const actionsItems = ref(useActionsItems())
  const miscItems = ref(useMiscItems())
  const mediaItems = ref(useMediaItems())

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
    extra: { group: true, items: {} },
  }

  const pluginsList: Array<string> = []
  Object.keys(allMenuItems).forEach(section => {
    Object.keys(allMenuItems[section]).forEach(item => pluginsList.push(item))
  })

  // if (items.list.length) {
  //   items.list.forEach(item => {
  //     if (!pluginsList.includes(item)) {
  //       throw new Error(`Unknown plugin name: ${item}! Supported plugins: ${pluginsList.join(', ')}`)
  //     }
  //   })
  // }

  const toolbarItems: ToolbarItemSections = {}

  const sections: { [key: string]: number } = {}

  Object.keys(allMenuItems).forEach(sectionName => {
    const section = allMenuItems[sectionName]
    Object.keys(section.items).forEach(plugin => {
      const item: ToolbarItem = section.items[plugin]

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

  // add/override custom extensions
  Object.keys(customExtensions).forEach(extension => {
    const section = customExtensions[extension].section

    if (typeof customExtensions[extension]?.props === 'undefined') {
      customExtensions[extension].props = toolbarItems[section]?.items[extension]?.props ?? {}
    }

    if (typeof customExtensions[extension]?.attrs === 'undefined') {
      customExtensions[extension].attrs = toolbarItems[section]?.items[extension]?.attrs ?? {}
    }

    if (typeof toolbarItems[section] === 'undefined') {
      toolbarItems[section] = { group: true, items: {} }
      toolbarItems[section].items[extension] = {}
    }
    toolbarItems[section].items[extension] = customExtensions[extension]
  })

  return toolbarItems
}