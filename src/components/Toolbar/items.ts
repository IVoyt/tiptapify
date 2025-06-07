import { getActionsItems } from "@tiptapify/components/Toolbar/items/actions";
import { getAlignmentItems } from "@tiptapify/components/Toolbar/items/alignment";
import { getFormatExtraItems } from "@tiptapify/components/Toolbar/items/formatExtra";
import { getFormatItems } from "@tiptapify/components/Toolbar/items/format";
import { getListItems } from "@tiptapify/components/Toolbar/items/list";
import { getMediaItems } from "@tiptapify/components/Toolbar/items/media";
import { getMiscItems } from "@tiptapify/components/Toolbar/items/misc";
import { getStyleItems } from "@tiptapify/components/Toolbar/items/style";
import { ComputedRef, Ref, ref } from "vue";

interface ToolbarItemAttrs {
  [key: string]: Function | any
}

interface ToolbarItemProps {
  [key: string]: any
}

export interface ToolbarItem {
  name: string|number,
  tooltip: string,
  icon: string|ComputedRef<string>,
  noI18n?: boolean,
  enabled: boolean,
  component?: any,
  modelValue?: any,
  group?: boolean,
  toggle?: boolean,
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
  fontMeasure: string,
  items: { list: Array<string>, exclude: boolean },
  customHeadingLevels: Array<number>,
  toolbarLinkButton: Ref,
): ToolbarItemSections {
  const styleItems = ref(getStyleItems(editor.value, fontMeasure, customHeadingLevels))
  const formatItems = ref(getFormatItems(editor.value))
  const formatExtraItems = ref(getFormatExtraItems(editor.value))
  const alignmentItems = ref(getAlignmentItems(editor.value))
  const listItems = ref(getListItems(editor.value))
  const actionsItems = ref(getActionsItems(editor.value))
  const miscItems = ref(getMiscItems(editor.value))
  const mediaItems = ref(getMediaItems(editor.value, toolbarLinkButton))

  const allMenuItems: ToolbarItemSections = {
    /**
     * todo
     *
     * font color, backgroundcolor
     * tables
     * media (image, video)
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

  const sections = {}

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