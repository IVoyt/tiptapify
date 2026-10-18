import { Editor as TiptapEditor, nodeViewProps, NodeViewWrapper, VueNodeViewRenderer } from '@tiptap/vue-3'
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

import '@tiptap/extensions'
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
import '@tiptap/extension-link'
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
import { TIPTAPIFY_CONFIG_KEY, useTiptapifyConfig, TiptapifyConfig } from './src/composables/useTiptapifyConfig'
import * as mdi from '@mdi/js'

export type TiptapifyFooterAlignment = 'start' | 'center' | 'end'

export type TiptapifySkin = 'default' | 'pastel'

// Structural variants a token cannot express (component markup, vuetify prop bindings)
export interface TiptapifyShape {
  toolbar?: 'raised' | 'flat'
  groups?: 'box' | 'flat'
  buttons?: 'vuetify' | 'quiet'
  bubble?: 'card' | 'flat'
  dialog?: 'classic' | 'soft'
  menu?: 'vuetify' | 'soft'
}

// The shape after resolution: every key set (missing keys fall back to classic)
export type ResolvedShape = Required<TiptapifyShape>

export interface TiptapifySkinColors {
  toolbarBg: string
  toolbarBorderBottom: string
  toolbarFg: string
  groupBg: string
  groupShadow: string
  dividerColor: string
  buttonFg: string
  buttonHoverBg: string
  buttonHoverFg: string
  buttonActiveBg: string
  buttonActiveHoverBg: string
  bubbleBg: string
  bubbleBorder: string
  bubbleShadow: string
  menuBorder: string
  menuShadow: string
  menuItemActiveBg: string
  dialogShadow: string
  frameBg: string
  frameShadow: string
  frameBorder: string
  imageBg: string
  imageOutline: string
  imageOutlineHover: string
  handleBg: string
  handleBgHover: string
  handleBorder: string
  handleShadow: string
}

export interface TiptapifySkinMetrics {
  itemsPadding: string
  itemsGap: string
  itemsRowGap: string
  groupGap: string
  groupHeight: string
  groupRadius: string
  dividerWidth: string
  dividerHeight: string
  buttonRadius: string
  bubbleRadius: string
  bubblePadding: string
  bubbleGap: string
  menuListPadding: string
  menuRadius: string
  menuItemRadius: string
  menuItemPadding: string
  menuItemMinHeight: string
  dialogRadius: string
  dialogHeaderPadding: string
  dialogContentPadding: string
  dialogActionsPadding: string
  dialogTitleSize: string
  dialogTitleWeight: string
  dialogFieldRadius: string
  dialogActionBtnMinHeight: string
  dialogActionBtnRadius: string
  dialogGridGap: string
  imageRadius: string
  handleRadius: string
}

// A skin as data: token overrides + shape flags, inheriting from a registered skin
export type TiptapifySkinConfig = TiptapifyShape & {
  name?: string
  // registered skin name; implicit 'default'
  extends?: string
  colors?: Partial<TiptapifySkinColors>
  metrics?: Partial<TiptapifySkinMetrics>
}

// The `skin` prop: a registered name (string) or an inline object
export type TiptapifySkinInput = string | TiptapifySkinConfig

export declare function registerSkin(name: string, skin: TiptapifySkinConfig): void

// Identity for typed const definitions; the object never enters the registry
export declare function defineSkin(skin: TiptapifySkinConfig): TiptapifySkinConfig

export interface TiptapifyOptions {
  i18n?: string
}

export type TiptapifyAiMode = 'insert' | 'replace' | 'append'

export interface TiptapifyAiPromptExample {
  title: string
  prompt: string
}

export type TiptapifyAiChatRole = 'system' | 'user' | 'assistant' | 'developer' | 'tool'

export interface TiptapifyAiChatMessage {
  role: TiptapifyAiChatRole
  content: string
}

export interface TiptapifyAiEditorContext {
  prompt: string
  selectedText: string
  text: string
  html: string
  json: object
  mode: TiptapifyAiMode
}

export interface TiptapifyAiRequest {
  model?: string
  messages: TiptapifyAiChatMessage[]
  temperature?: number
  stream?: boolean
  [key: string]: unknown
}

export type TiptapifyAiReasoningEffort = 'low' | 'medium' | 'high' | 'xhigh' | 'max'

export interface TiptapifyAiReasoningEffortOptions {
  options: TiptapifyAiReasoningEffort[]
  default?: TiptapifyAiReasoningEffort
}

export interface TiptapifyAiResponse {
  content: string
}

export interface TiptapifyAiOpenAiResponse {
  choices?: Array<{
    message?: {
      content?: string
    }
    text?: string
  }>
}

export interface TiptapifyAiStream {
  signal: AbortSignal
  onChunk: (chunk: string) => void
  onReasoning: (chunk: string) => void
}

export type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>

export type TiptapifyAiTokenProvider = () => Promise<string | null> | string | null

export interface TiptapifyAiBackendRequest {
  prompt: string
  instruction: string
  stream?: boolean
  thinking?: boolean
  reasoning_effort?: TiptapifyAiReasoningEffort
  model?: string
}

export interface TiptapifyAiBackendProviderOptions {
  endpoint: string
  headers?: Record<string, string>
  tokenProvider?: TiptapifyAiTokenProvider
}

export declare function createAiBackendProvider(options: TiptapifyAiBackendProviderOptions): TiptapifyAiProvider

export interface TiptapifyAiStorage {
  getItem: (key: string) => string | null | Promise<string | null>
  setItem: (key: string, value: string) => void | Promise<void>
  removeItem: (key: string) => void | Promise<void>
}

export interface TiptapifyAiOptions {
  aiProvider?: TiptapifyAiProvider
  aiEndpoint?: string
  aiHeaders?: Record<string, string>
  model?: string
  promptExamples?: TiptapifyAiPromptExample[]
  mode?: TiptapifyAiMode
  defaultPrompt?: string
  systemPrompt?: string
  temperature?: number
  stream?: boolean
  thinking?: boolean
  reasoningEffort?: TiptapifyAiReasoningEffortOptions
  showReasoning?: boolean
  chatCompletionOptions?: Record<string, unknown>
  createMessages?: (context: TiptapifyAiEditorContext) => TiptapifyAiChatMessage[]
  tokenProvider?: TiptapifyAiTokenProvider
  storage?: TiptapifyAiStorage
}

declare const TiptapifyPlugin: {
  install: (app: never, options?: TiptapifyOptions) => void
}

export default TiptapifyPlugin

export {
  mdi,
  Tiptapify,
  TiptapifyDialog,
  TIPTAPIFY_CONFIG_KEY,
  useTiptapifyConfig,
  TiptapEditor,
  TiptapEditor as TipTapEditor,
  nodeViewProps,
  NodeViewWrapper,
  VueNodeViewRenderer,
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

export type { TiptapifyConfig }

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Tiptapify: typeof Tiptapify
  }
}
