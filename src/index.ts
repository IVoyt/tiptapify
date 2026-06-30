import { Plugin } from 'vue'
import Tiptapify from '@tiptapify/components/Tiptapify.vue'
import TiptapifyDialog from '@tiptapify/components/UI/TiptapifyDialog.vue'

import { Editor as TipTapEditor } from '@tiptap/vue-3'
import { Node, Mark, markInputRule, markPasteRule, mergeAttributes } from '@tiptap/core'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from '@tiptap/core'

import * as mdi from '@mdi/js'

import { messages } from './i18n'

interface PackageOptions {
  i18n?: any;
}

const TiptapifyPlugin: Plugin = {
  install(app, options: PackageOptions = {}) {
    app.component('Tiptapify', Tiptapify)
    app.component('TiptapifyDialog', TiptapifyDialog)

    const i18n = options.i18n
    for (const locale of Object.keys(messages)) {
      i18n.global.mergeLocaleMessage(locale, messages[locale])
    }
  }
}

export default TiptapifyPlugin

export {
  mdi,
  TipTapEditor,
  Tiptapify,
  TiptapifyDialog,
  Node,
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
}

export type { CommandProps, InputRuleMatch, PasteRuleMatch }
export type {
  TiptapifyAiMode,
  TiptapifyAiOptions,
  TiptapifyAiChatMessage,
  TiptapifyAiChatRole,
  TiptapifyAiEditorContext,
  TiptapifyAiOpenAiResponse,
  TiptapifyAiPromptExample,
  TiptapifyAiProvider,
  TiptapifyAiRequest,
  TiptapifyAiResponse,
  TiptapifyAiStorage,
  TiptapifyAiTokenProvider,
} from '@tiptapify/types/editor'
