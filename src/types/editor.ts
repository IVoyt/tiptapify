import { Editor } from '@tiptap/vue-3'

declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}

export { TiptapifyEditor }

export type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
export type variantFieldTypes = 'outlined' | 'plain' | 'filled' | 'solo' | 'solo-filled' | 'solo-inverted' | 'underlined' | undefined

export type TiptapifyFooterAlignment = 'start' | 'center' | 'end'

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
  stream?: false,
  [key: string]: unknown,
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

export type TiptapifyAiProvider = (request: TiptapifyAiRequest, context: TiptapifyAiEditorContext) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>

export type TiptapifyAiTokenProvider = () => Promise<string | null> | string | null

export type TiptapifyAiStorage = {
  getItem: (key: string) => string | null | Promise<string | null>,
  setItem: (key: string, value: string) => void | Promise<void>,
  removeItem: (key: string) => void | Promise<void>,
}

export type TiptapifyAiOptions = {
  aiProvider?: TiptapifyAiProvider,
  model?: string,
  promptExamples?: TiptapifyAiPromptExample[],
  mode?: TiptapifyAiMode,
  defaultPrompt?: string,
  systemPrompt?: string,
  temperature?: number,
  chatCompletionOptions?: Record<string, unknown>,
  createMessages?: (context: TiptapifyAiEditorContext) => TiptapifyAiChatMessage[],
  tokenProvider?: TiptapifyAiTokenProvider,
  storage?: TiptapifyAiStorage,
}

export type TiptapifyAiResolvedOptions = TiptapifyAiOptions & {
  enabled: boolean,
  promptExamples: TiptapifyAiPromptExample[],
}
