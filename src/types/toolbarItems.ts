import { ComputedRef } from "vue";

type ToolbarItemAttrs = {
  [key: string]: Function | any
}

type ToolbarItemProps = {
  [key: string]: any
}

export type ToolbarItem = {
  // type: ToolbarItemType,
  name: string|number|ComputedRef<string>,
  tooltip: string|ComputedRef<string>,
  icon: string|ComputedRef<string>,
  icon2?: string|ComputedRef<string>,
  svg?: boolean,
  noI18n?: boolean,
  enabled: boolean,
  component?: any,
  modelValue?: any,
  group?: boolean,
  icon2Props?: ToolbarItemProps,
  componentProps?: ToolbarItemProps,
  props?: ToolbarItemProps,
  attrs?: ToolbarItemAttrs,
  children?: ToolbarItems|ToolbarItem[],
}

export type ToolbarItems = {
  [key: string]: ToolbarItem
}

export type ToolbarItemSection = {
  group?: boolean,
  items: ToolbarItems | {},
}

export type ToolbarItemSections = {
  [key: string]: ToolbarItemSection
}