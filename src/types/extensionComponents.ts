import { ToolbarSections } from "@tiptapify/types/toolbarSections";
import { ComputedRef } from "vue";

export enum ToolbarItemType {
  dropdown = 'dropdown',
  modal = 'modal',
}

export type extensionComponents = {
  [key: string]: {
    type: ToolbarItemType,
    component: any,
    extensions?: Array<any>,
    componentProps?: any
    props?: any
    attrs?: any
    section: ToolbarSections,
    name: ComputedRef|string,
    tooltip: ComputedRef|string,
    icon: ComputedRef|string,
  }
}