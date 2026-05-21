import { Editor } from "@tiptap/vue-3";
import {
  Component,
  ComponentOptionsMixin, ComponentProvideOptions,
  ComputedOptions, Directive,
  EmitsOptions,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps, SlotsType
} from "@vue/runtime-core";
import type { DefineComponent } from 'vue'
import { toolbarSections } from "./src/types/toolbarTypes";

export interface TiptapifyProps {
  content: string|object
  variantBtn: string
  variantField: string
  toolbar: boolean
  items: [string]
  itemsExclude: boolean
  bubbleMenu: boolean
  floatingMenu: boolean
  slashCommands: boolean
  placeholder: string
  showWordsCount: boolean
  showCharactersCount: boolean
  defaultFontFamily: string
  fontMeasure: string
  rounded: string
  customExtensions: toolbarSections
}

export interface TiptapifyEmits {
  [key: string]: ((...args: any[]) => any) | null
  'editor-ready': (options: {
    getHTML: () => string
    getJSON: () => any
    editor: Editor
  }) => void
}

export declare const Tiptapify: DefineComponent<TiptapifyProps, {}, {}, {}, {}, {}, {}, TiptapifyEmits>

export interface TiptapifyOptions {
  locale?: string
}

declare const TiptapifyPlugin: {
  install: (app: any, options?: TiptapifyOptions) => void
}

export default TiptapifyPlugin

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Tiptapify: typeof Tiptapify
  }
}