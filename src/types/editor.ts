import { Editor } from '@tiptap/vue-3'

declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}

export { TiptapifyEditor }

export type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
export type variantFieldTypes = 'outlined' | 'plain' | 'filled' | 'solo' | 'solo-filled' | 'solo-inverted' | 'underlined' | undefined

export type TiptapifyFooterAlignment = 'start' | 'center' | 'end'

// The skin of the editor chrome: 'default' is the classic look, 'pastel' is the quiet 0.3.3 look
export type TiptapifySkin = 'default' | 'pastel'

// Structural variants a token cannot express (component markup, vuetify prop bindings).
// The shape decides which skin rule sets apply; the tokens paint them.
export type TiptapifyShape = {
  // VToolbar elevation 1 + no inner hairline vs flat + tinted bar
  toolbar?: 'raised' | 'flat'
  // toolbar sections as raised boxes vs plain flex runs
  groups?: 'box' | 'flat'
  // native vuetify buttons vs ghost buttons with a neutral pressed state
  buttons?: 'vuetify' | 'quiet'
  // bubble menu: VCard + divided VBtnGroup vs flat row of quiet buttons
  bubble?: 'card' | 'flat'
  // divider under the title, elevated close, field defaults vs soft card, text close, outlined defaults
  dialog?: 'classic' | 'soft'
  // dropdown menus: vuetify list vs the light padded card
  menu?: 'vuetify' | 'soft'
}

// The shape after resolution: every key set (missing keys fall back to classic)
export type ResolvedShape = Required<TiptapifyShape>

export type TiptapifySkinColors = {
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

export type TiptapifySkinMetrics = {
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

// The `skin` prop: a registered name (string) or an inline object; inline objects
// resolve through the same chain and never enter the global registry
export type TiptapifySkinInput = string | TiptapifySkinConfig

export type TiptapifyAiMode = 'insert' | 'replace' | 'append'

export type TiptapifyAiPromptExample = {
  title: string,
  prompt: string,
}

export type TiptapifyAiChatRole = 'system' | 'user' | 'assistant' | 'developer' | 'tool'

export type TiptapifyAiChatMessage = {
  role: TiptapifyAiChatRole,
  content: string,
}

export type TiptapifyAiEditorContext = {
  prompt: string,
  selectedText: string,
  text: string,
  html: string,
  json: object,
  mode: TiptapifyAiMode,
}

export type TiptapifyAiRequest = {
  model?: string,
  messages: TiptapifyAiChatMessage[],
  temperature?: number,
  stream?: boolean,
  [key: string]: unknown,
}

export type TiptapifyAiReasoningEffort = 'low' | 'medium' | 'high' | 'xhigh' | 'max'

export type TiptapifyAiReasoningEffortOptions = {
  options: TiptapifyAiReasoningEffort[],
  default?: TiptapifyAiReasoningEffort,
}

export type TiptapifyAiResponse = {
  content: string,
}

export type TiptapifyAiOpenAiResponse = {
  choices?: Array<{
    message?: {
      content?: string,
    },
    text?: string,
  }>,
}

export type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}

export type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>

export type TiptapifyAiTokenProvider = () => Promise<string | null> | string | null

export type TiptapifyAiBackendRequest = {
  prompt: string,
  instruction: string,
  stream?: boolean,
  thinking?: boolean,
  reasoning_effort?: TiptapifyAiReasoningEffort,
  model?: string,
}

export type TiptapifyAiBackendProviderOptions = {
  endpoint: string,
  headers?: Record<string, string>,
  tokenProvider?: TiptapifyAiTokenProvider,
}

export type TiptapifyAiStorage = {
  getItem: (key: string) => string | null | Promise<string | null>,
  setItem: (key: string, value: string) => void | Promise<void>,
  removeItem: (key: string) => void | Promise<void>,
}

export type TiptapifyAiOptions = {
  aiProvider?: TiptapifyAiProvider,
  aiEndpoint?: string,
  aiHeaders?: Record<string, string>,
  model?: string,
  promptExamples?: TiptapifyAiPromptExample[],
  mode?: TiptapifyAiMode,
  defaultPrompt?: string,
  systemPrompt?: string,
  temperature?: number,
  stream?: boolean,
  thinking?: boolean,
  reasoningEffort?: TiptapifyAiReasoningEffortOptions,
  showReasoning?: boolean,
  chatCompletionOptions?: Record<string, unknown>,
  createMessages?: (context: TiptapifyAiEditorContext) => TiptapifyAiChatMessage[],
  tokenProvider?: TiptapifyAiTokenProvider,
  storage?: TiptapifyAiStorage,
}

export type TiptapifyAiResolvedOptions = TiptapifyAiOptions & {
  enabled: boolean,
  promptExamples: TiptapifyAiPromptExample[],
}
