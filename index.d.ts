import { Editor as TiptapEditor } from '@tiptap/vue-3'
import {
  Extension,
  ExtendableConfig,
  InputRule,
  PasteRule,
  Node,
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes
} from '@tiptap/core'
import type {
  AnyExtension,
  CanCommands,
  ChainedCommands,
  Command,
  CommandProps,
  Commands,
  Content,
  EditorOptions,
  EditorEvents,
  Extensions,
  ExtensionConfig,
  InputRuleMatch,
  JSONContent,
  MarkConfig,
  NodeConfig,
  PasteRuleMatch,
  Range,
  RawCommands,
  SingleCommands,
} from '@tiptap/core'

import '@tiptap/extension-text-style'
import '@tiptap/extension-list'
import '@tiptap/extensions'
import '@tiptap/extension-document'
import '@tiptap/extension-text'
import '@tiptap/extension-paragraph'
import '@tiptap/extension-heading'
import '@tiptap/extension-bold'
import '@tiptap/extension-italic'
import '@tiptap/extension-strike'
import '@tiptap/extension-code'
import '@tiptap/extension-blockquote'
import '@tiptap/extension-hard-break'
import '@tiptap/extension-horizontal-rule'
import '@tiptap/extension-typography'
import '@tiptap/extension-highlight'
import '@tiptap/extension-image'
import '@tiptap/extension-youtube'
import '@tiptap/extension-superscript'
import '@tiptap/extension-subscript'
import '@tiptap/extension-text-align'
import '@tiptap/extension-underline'
import '@tiptap/extension-table'
import '@tiptap/extension-code-block-lowlight'
import '@tiptap/extension-invisible-characters'

import Tiptapify from './src/components/Tiptapify.vue'
import TiptapifyDialog from './src/components/UI/TiptapifyDialog.vue'
import * as mdi from '@mdi/js'

export interface TiptapifyOptions {
  i18n?: string
}

declare const TiptapifyPlugin: {
  install: (app: never, options?: TiptapifyOptions) => void
}

export default TiptapifyPlugin

export {
  mdi,
  Tiptapify,
  TiptapifyDialog,
  TiptapEditor,
  Extension,
  ExtendableConfig,
  InputRule,
  Mark,
  mergeAttributes,
  markInputRule,
  markPasteRule,
  Node,
  PasteRule,
}

export type {
  AnyExtension,
  CanCommands,
  ChainedCommands,
  Command,
  CommandProps,
  Commands,
  Content,
  EditorOptions,
  EditorEvents,
  Extensions,
  ExtensionConfig,
  InputRuleMatch,
  JSONContent,
  MarkConfig,
  NodeConfig,
  PasteRuleMatch,
  Range,
  RawCommands,
  SingleCommands,
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Tiptapify: typeof Tiptapify
  }
}