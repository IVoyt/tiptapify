import type {
  TiptapifyAiReasoningEffort,
  TiptapifyAiReasoningEffortOptions,
  TiptapifyAiRequest,
} from '@tiptapify/types/editor'

/**
 * The one thinking control of the dialog: thinking off, on (the provider's default
 * effort), or on with an explicit reasoning effort
 */
export type AiThinkingChoice = 'off' | 'on' | TiptapifyAiReasoningEffort

export type AiThinkingConfig = {
  thinking?: boolean,
  reasoningEffort?: TiptapifyAiReasoningEffortOptions,
}

export function effortOptions(config: AiThinkingConfig): TiptapifyAiReasoningEffort[] {
  const options = config.reasoningEffort?.options

  return Array.isArray(options) ? options.filter(option => (option as string) !== 'default') : []
}

/** No choices when thinking is not configured: the effort applies only with thinking on */
export function thinkingChoices(config: AiThinkingConfig): AiThinkingChoice[] {
  return config.thinking === true ? ['off', 'on', ...effortOptions(config)] : []
}

/** Thinking starts on, at the configured default effort when it is one of the options */
export function initialThinkingChoice(config: AiThinkingConfig): AiThinkingChoice | null {
  if (config.thinking !== true) {
    return null
  }

  const preferred = config.reasoningEffort?.default

  return preferred && effortOptions(config).includes(preferred) ? preferred : 'on'
}

export function isEffort(choice: AiThinkingChoice | null): choice is TiptapifyAiReasoningEffort {
  return choice !== null && choice !== 'off' && choice !== 'on'
}

/**
 * Sets the thinking fields of the request: an explicit effort goes as `reasoning_effort`
 * (and `enable_thinking` is dropped), otherwise `enable_thinking` says whether thinking is on
 */
export function applyThinking(request: TiptapifyAiRequest, choice: AiThinkingChoice | null): TiptapifyAiRequest {
  if (isEffort(choice)) {
    delete request.enable_thinking
    request.reasoning_effort = choice
  } else {
    delete request.reasoning_effort
    request.enable_thinking = choice === 'on'
  }

  return request
}
