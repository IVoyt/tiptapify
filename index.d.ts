import { Editor as TiptapEditor } from '@tiptap/vue-3'
import type { DefineComponent } from 'vue'
import { toolbarSections } from './src/types/toolbarTypes'

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
  [key: string]: ((...args: never[]) => never) | null
  'editor-ready': (options: {
    getHTML: () => string
    getJSON: () => never
    editor: TiptapEditor
  }) => void
}

export declare const Tiptapify: DefineComponent<
  TiptapifyProps,
  object,
  object,
  Record<string, never>,
  Record<string, never>,
  object,
  object,
  TiptapifyEmits
>

export interface TiptapifyOptions {
  i18n?: string
}

declare const TiptapifyPlugin: {
  install: (app: never, options?: TiptapifyOptions) => void
}

export default TiptapifyPlugin

export { TiptapEditor }

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Tiptapify: typeof Tiptapify
  }
}