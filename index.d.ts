import { Editor } from "@tiptap/vue-3";
import type { DefineComponent } from 'vue'
import { extensionsComponents } from "./src/types/overridable-extensions";

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
  overrideExtensionsComponents: extensionsComponents
}

export interface TiptapifyEmits {
  'editor-ready': (options: {
    getHTML: () => string
    getJSON: () => any
    editor: Editor
  }) => void
}

export declare const Tiptapify: DefineComponent<TiptapifyProps, {}, {}, {}, {}, {}, {}, TiptapifyEmits>

// Плагин
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