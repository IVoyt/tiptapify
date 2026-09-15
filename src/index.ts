import { Plugin } from 'vue'
import Tiptapify from '@tiptapify/components/Tiptapify.vue'
import TiptapifyDialog from '@tiptapify/components/UI/TiptapifyDialog.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { TiptapifyFooterAlignment } from '@tiptapify/types/editor'
import { createAiBackendProvider } from '@tiptapify/extensions/components/ai/backend'

import { Editor as TipTapEditor, nodeViewProps, NodeViewWrapper, VueNodeViewRenderer } from '@tiptap/vue-3'
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
  nodeViewProps,
  NodeViewWrapper,
  VueNodeViewRenderer,
  Tiptapify,
  TiptapifyDialog,
  useTiptapifyConfig,
  createAiBackendProvider,
  Node,
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
}

export type { TiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
export type { TiptapifyFooterAlignment }
export type { CommandProps, InputRuleMatch, PasteRuleMatch }
export type {
  TiptapifyAiBackendProviderOptions,
  TiptapifyAiBackendRequest,
  TiptapifyAiMode,
  TiptapifyAiOptions,
  TiptapifyAiChatMessage,
  TiptapifyAiChatRole,
  TiptapifyAiEditorContext,
  TiptapifyAiOpenAiResponse,
  TiptapifyAiPromptExample,
  TiptapifyAiReasoningEffort,
  TiptapifyAiReasoningEffortOptions,
  TiptapifyAiProvider,
  TiptapifyAiRequest,
  TiptapifyAiResponse,
  TiptapifyAiStorage,
  TiptapifyAiStream,
  TiptapifyAiTokenProvider,
} from '@tiptapify/types/editor'
