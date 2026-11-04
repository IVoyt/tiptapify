<script lang="ts" setup>

import { aiErrorDetail, aiErrorKind } from '@tiptapify/extensions/components/ai/errors'
import TiptapifyDialog from '@tiptapify/components/UI/TiptapifyDialog.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import {
  TiptapifyAiEditorContext,
  TiptapifyAiMode,
  TiptapifyAiOpenAiResponse,
  TiptapifyAiRequest,
  TiptapifyAiResponse,
  TiptapifyAiResolvedOptions,
  TiptapifyAiStream,
  TiptapifyEditor
} from '@tiptapify/types/editor'
import { computed, ComputedRef, inject, nextTick, Ref, ref, shallowRef, useTemplateRef, watch, watchEffect } from 'vue'
import * as mdi from '@mdi/js'
import { ComposerTranslation } from 'vue-i18n'
import { exceedsLimit } from './charLimit'
import { DEFAULT_AI_INSTRUCTION } from './backend'
import { AiContextInfo, describeAiContext, selectedTextOf, textAround, wholeWordRange } from './context'
import { changePercent, diffWords, formatChangePercent } from './diff'
import {
  aiActions,
  AiApplyAction,
  AiRange,
  applyAiResult,
  countedText,
  parseAiResult,
  plainText,
  projectedCharacters,
  renderAiResult
} from './result'
import { AiThinkingChoice, applyThinking, initialThinkingChoice, thinkingChoices } from './thinking'

const { variantBtn } = useTiptapifyConfig()

const editor = inject('tiptapifyEditor') as Ref<TiptapifyEditor>
const ai = inject('tiptapifyAi') as ComputedRef<TiptapifyAiResolvedOptions | false>
const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const dialog = useTemplateRef('dialog')
const resultEl = useTemplateRef<HTMLElement>('resultEl')
const reasoningTextEl = useTemplateRef<HTMLElement>('reasoningTextEl')

const prompt = ref('')
// The prompt of the shown result, for "Another version" after the prompt was edited
const lastPrompt = ref('')
const result = ref('')
const reasoning = ref('')
const reasoningOpen = ref(false)
const reasoningStartedAt = ref<number | null>(null)
const reasoningEndedAt = ref<number | null>(null)
const error = ref('')
const loading = ref(false)
const copied = ref(false)
const showChanges = ref(false)
const requestController = shallowRef<AbortController | null>(null)
const requestRange = ref<AiRange | null>(null)
// The selected text the result was generated from, for the change percent and the diff
const requestText = ref('')
const requestMode = ref<TiptapifyAiMode>('insert')
const context = ref<AiContextInfo>({ kind: 'cursor', paragraphs: 0, characters: 0, excerpt: '' })
const thinkingChoice = ref<AiThinkingChoice | null>(null)

const aiProvider = computed(() => ai?.value ? ai.value.aiProvider : undefined)
const promptExamples = computed(() => ai?.value ? ai.value.promptExamples : [])
const showReasoning = computed(() => ai?.value?.showReasoning === true)
const thinkingOptions = computed(() => thinkingChoices(ai?.value || {}))
// With effort options the control speaks of effort ("Effort: high"), otherwise of thinking on/off
const effortMode = computed(() => thinkingOptions.value.length > 2)
const isGenerateDisabled = computed(() => !aiProvider.value || !prompt.value.trim() || loading.value)

const contextIcon = computed(() => ({
  selection: mdi.mdiSelect,
  document: mdi.mdiTextBoxOutline,
  cursor: mdi.mdiCursorText,
})[context.value.kind])
const contextLabel = computed(() => {
  const { kind, paragraphs, characters } = context.value
  if (kind !== 'selection') {
    return t(`ai.context.${kind}`)
  }

  return t('ai.context.selection', {
    paragraphs: t('ai.context.paragraphs', paragraphs),
    characters: t('ai.context.characters', characters),
  })
})

const actions = computed(() => aiActions(context.value.kind === 'selection', ai?.value ? ai.value.mode : undefined))

const resultFragment = computed(() => parseAiResult(result.value, editor.value.schema))
const resultText = computed(() => countedText(resultFragment.value))
const changes = computed(() => diffWords(requestText.value, plainText(resultFragment.value)))
const percent = computed(() => {
  const value = loading.value ? null : changePercent(requestText.value, plainText(resultFragment.value))

  return value === null ? '' : formatChangePercent(value)
})

const characterCountLimit = computed(() => {
  const limit = getCharacterCountExtension()?.options?.limit
  return typeof limit === 'number' ? limit : null
})
const counter = computed(() => {
  if (characterCountLimit.value === null) {
    return t('ai.context.characters', resultText.value.length)
  }

  const projected = projectedCharacters(editor.value.state.doc, resultText.value, actions.value[0], requestRange.value)

  return `${projected} / ${characterCountLimit.value}`
})

// The CharacterCount extension rejects a result over its limit, so that action stays disabled; replacing frees the selected characters
function exceeds(action: AiApplyAction) {
  const limit = characterCountLimit.value
  if (limit === null || !result.value) {
    return false
  }

  return exceedsLimit(resultText.value, {
    doc: editor.value.state.doc,
    limit,
    mode: action === 'replace' ? 'replace' : 'insert',
    range: requestRange.value,
  })
}

function canApply(action: AiApplyAction) {
  return Boolean(result.value.trim()) && !loading.value && !exceeds(action)
}

const primaryExceeded = computed(() => exceeds(actions.value[0]))

// Loading shows in the result itself, not in the status line
const status = computed(() => {
  if (!aiProvider.value) {
    return { type: 'warning', text: t('ai.unavailable') }
  }
  if (error.value) {
    return { type: 'error', text: error.value }
  }
  if (primaryExceeded.value) {
    return { type: 'error', text: t('ai.limit_exceeded') }
  }

  return null
})

const reasoningLabel = computed(() => {
  if (loading.value && reasoningEndedAt.value === null) {
    return t('ai.thinking_now')
  }

  const started = reasoningStartedAt.value ?? 0
  const seconds = Math.max(1, Math.round(((reasoningEndedAt.value ?? started) - started) / 1000))

  return t('ai.thought_for', { seconds })
})

watch(reasoning, () => {
  nextTick(() => {
    const element = reasoningTextEl.value
    if (element) {
      element.scrollTop = element.scrollHeight
    }
  })
})

watchEffect(() => {
  if (resultEl.value) {
    renderAiResult(resultFragment.value, editor.value.schema, resultEl.value)
  }
}, { flush: 'post' })

defineExpose({ showDialog })

function actionLabel(action: AiApplyAction) {
  return t({ replace: 'ai.replace_selection', below: 'ai.insert_below', insert: 'ai.insert', append: 'ai.append' }[action])
}

// A menu item ("High") and the control's own label ("Effort: high"): with effort options
// thinking on is the provider's default effort
function choiceLabel(choice: AiThinkingChoice, group: 'states' | 'label' = 'states') {
  if (choice === 'off' || (choice === 'on' && !effortMode.value)) {
    return t(`ai.thinking_${group}.${choice}`)
  }

  return t(`ai.effort_${group === 'states' ? 'levels' : 'label'}.${choice === 'on' ? 'default' : choice}`)
}

function resetResult() {
  result.value = ''
  reasoning.value = ''
  reasoningOpen.value = false
  reasoningStartedAt.value = null
  reasoningEndedAt.value = null
  error.value = ''
  copied.value = false
  showChanges.value = false
}

function reset() {
  requestController.value?.abort()
  requestController.value = null
  loading.value = false

  prompt.value = ''
  lastPrompt.value = ''
  requestRange.value = null
  requestText.value = ''
  requestMode.value = 'insert'
  resetResult()
}

function showDialog() {
  reset()
  prompt.value = ai?.value && ai.value.defaultPrompt ? ai.value.defaultPrompt : ''

  const { doc, selection } = editor.value.state
  const { from, to } = wholeWordRange(doc, selection.from, selection.to)
  context.value = describeAiContext(doc, from, to)
  requestMode.value = (ai?.value ? ai.value.mode : undefined) ?? (selectedTextOf(doc, from, to) ? 'replace' : 'insert')
  thinkingChoice.value = initialThinkingChoice(ai?.value || {})

  dialog.value?.open()
}

function cancel() {
  dialog.value?.close()
}

function stop() {
  requestController.value?.abort()
}

function applyExample(examplePrompt: string) {
  prompt.value = examplePrompt
}

// Enter sends, Shift+Enter is a new line (an IME composition keeps its Enter)
function onPromptKeydown(event: KeyboardEvent) {
  if (event.key !== 'Enter' || event.shiftKey || event.isComposing) {
    return
  }

  event.preventDefault()
  generate()
}

function buildDefaultMessages(context: TiptapifyAiEditorContext) {
  const systemPrompt = ai.value && ai.value.systemPrompt
    ? ai.value.systemPrompt
    : DEFAULT_AI_INSTRUCTION

  return [
    {
      role: 'system' as const,
      content: systemPrompt,
    },
    {
      role: 'user' as const,
      content: defaultUserMessage(context),
    },
  ]
}

// A selection goes with the text around it and the rule to answer for the selection alone: given only a
// fragment, a model takes it for the whole text and completes it, and the completion lands next to the rest
function defaultUserMessage(context: TiptapifyAiEditorContext): string {
  if (!context.selectedText) {
    return context.text ? `Editor text:\n${context.text}\n\nUser request:\n${context.prompt}` : context.prompt
  }

  return [
    context.textBefore ? `Text before the selection:\n${context.textBefore}` : '',
    `Selected text:\n${context.selectedText}`,
    context.textAfter ? `Text after the selection:\n${context.textAfter}` : '',
    'Work on the selected text only and answer with its new version alone. The text before and after it stays '
    + 'in the document as it is: do not repeat it and do not continue the selection into it.',
    `User request:\n${context.prompt}`,
  ].filter(Boolean).join('\n\n')
}

function buildOpenAiRequest(context: TiptapifyAiEditorContext): TiptapifyAiRequest {
  const options = ai.value || {}
  const chatCompletionOptions = options.chatCompletionOptions ?? {}
  const defaultStream = typeof chatCompletionOptions.stream === 'boolean' ? chatCompletionOptions.stream : false
  const request: TiptapifyAiRequest = {
    ...chatCompletionOptions,
    messages: options.createMessages ? options.createMessages(context) : buildDefaultMessages(context),
    stream: options.stream ?? defaultStream,
  }

  if (options.model) {
    request.model = options.model
  }

  if (typeof options.temperature === 'number') {
    request.temperature = options.temperature
  }

  return applyThinking(request, thinkingChoice.value)
}

function isTiptapifyAiResponse(response: unknown): response is TiptapifyAiResponse {
  return typeof response === 'object' && response !== null && typeof (response as TiptapifyAiResponse).content === 'string'
}

function isOpenAiResponse(response: unknown): response is TiptapifyAiOpenAiResponse {
  return typeof response === 'object' && response !== null && Array.isArray((response as TiptapifyAiOpenAiResponse).choices)
}

function getResponseContent(response: TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string) {
  let content = ''

  if (typeof response === 'string') {
    content = response
  } else if (isTiptapifyAiResponse(response)) {
    content = response.content
  } else if (isOpenAiResponse(response)) {
    content = response.choices?.[0]?.message?.content ?? response.choices?.[0]?.text ?? ''
  }

  return content.trimStart()
}

// Thinking ends with the first chunk of the answer (or with the request)
function markThoughtEnd() {
  if (reasoningStartedAt.value !== null && reasoningEndedAt.value === null) {
    reasoningEndedAt.value = Date.now()
  }
}


function errorMessage(err: unknown): string {
  const kind = aiErrorKind(err)
  const detail = aiErrorDetail(err)

  if (kind === 'other') {
    return detail || t('ai.error')
  }

  return detail ? `${t(`ai.errors.${kind}`)} ${t('ai.errors.service_says')} ${detail}` : t(`ai.errors.${kind}`)
}
async function generate(promptText = prompt.value.trim()) {
  if (!aiProvider.value || loading.value || !promptText) {
    return
  }

  resetResult()
  loading.value = true
  lastPrompt.value = promptText

  const controller = new AbortController()
  requestController.value = controller

  const { doc, selection } = editor.value.state
  const { from, to } = wholeWordRange(doc, selection.from, selection.to)
  const selectedText = selectedTextOf(doc, from, to)
  requestRange.value = selectedText ? { from, to } : null
  requestText.value = selectedText

  const around = textAround(doc, from, to)
  const context: TiptapifyAiEditorContext = {
    prompt: promptText,
    selectedText,
    textBefore: around.before,
    textAfter: around.after,
    text: selectedText || editor.value.getText(),
    html: editor.value.getHTML(),
    json: editor.value.getJSON(),
    mode: requestMode.value,
  }
  const request = buildOpenAiRequest(context)

  const stream: TiptapifyAiStream = {
    signal: controller.signal,
    onChunk: (chunk: string) => {
      if (chunk && !controller.signal.aborted) {
        markThoughtEnd()
        result.value += chunk
      }
    },
    onReasoning: (chunk: string) => {
      if (chunk && !controller.signal.aborted) {
        reasoningStartedAt.value ??= Date.now()
        reasoning.value += chunk
      }
    },
  }

  try {
    const response = await aiProvider.value(request, context, stream)
    const content = getResponseContent(response)

    if (!controller.signal.aborted && content) {
      result.value = content
    }
  } catch (err) {
    if (!controller.signal.aborted) {
      error.value = errorMessage(err)
    }
  } finally {
    // A request the dialog already let go of (closed meanwhile) leaves the state alone
    if (requestController.value === controller) {
      loading.value = false
      requestController.value = null
      markThoughtEnd()
    }
  }
}

function getCharacterCountExtension() {
  return editor.value.options.extensions?.find(item => item.name === 'characterCount')
}

async function copyResult() {
  const container = document.createElement('div')
  renderAiResult(resultFragment.value, editor.value.schema, container)
  const text = plainText(resultFragment.value)

  try {
    if (typeof ClipboardItem === 'undefined') {
      await navigator.clipboard.writeText(text)
    } else {
      await navigator.clipboard.write([new ClipboardItem({
        'text/html': new Blob([container.innerHTML], { type: 'text/html' }),
        'text/plain': new Blob([text], { type: 'text/plain' }),
      })])
    }
  } catch {
    // No clipboard access (an insecure page or a denied permission): the button stays as it was
    return
  }

  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 1500)
}

function apply(action: AiApplyAction) {
  if (!canApply(action)) {
    return
  }

  applyAiResult(editor.value, action, result.value, requestRange.value)
  dialog.value?.close()
}

</script>

<template>
  <TiptapifyDialog ref="dialog" module="ai" :title="t('ai.title')" :max-width="640" @submit="apply(actions[0])" @closed="reset">
    <template #title>
      <VIcon size="20" class="mr-2" :icon="`mdiSvg:${mdi.mdiCreation}`" />{{ t('ai.title') }}
    </template>

    <template #content>
      <VCardText class="ai-dialog">
        <div class="ai-context">
          <VIcon size="16" :icon="`mdiSvg:${contextIcon}`" />
          <span class="ai-context__label">{{ contextLabel }}</span>
          <span v-if="context.excerpt" class="ai-context__excerpt">
            {{ t('ai.context.excerpt', { text: context.excerpt }) }}
          </span>
        </div>

        <div v-if="promptExamples.length" class="ai-examples" role="group" :aria-label="t('ai.quick_prompts')">
          <VChip
            v-for="example in promptExamples"
            :key="`${example.title}:${example.prompt}`"
            size="small"
            variant="tonal"
            :disabled="loading || !aiProvider"
            @click="applyExample(example.prompt)"
          >
            {{ example.title }}
          </VChip>
        </div>

        <div class="ai-prompt" :class="{ 'ai-prompt--disabled': !aiProvider }">
          <VTextarea
            v-model="prompt"
            class="ai-prompt__input"
            :aria-label="t('ai.prompt')"
            :placeholder="t('ai.prompt_placeholder')"
            :disabled="loading || !aiProvider"
            variant="plain"
            density="compact"
            rows="2"
            max-rows="8"
            hide-details
            auto-grow
            autofocus
            @keydown="onPromptKeydown"
          />

          <div class="ai-prompt__bar">
            <VMenu v-if="thinkingChoice" location="top start">
              <template #activator="{ props }">
                <VBtn
                  v-bind="props"
                  class="ai-thinking"
                  size="small"
                  variant="text"
                  :disabled="loading || !aiProvider"
                  :prepend-icon="`mdiSvg:${mdi.mdiBrain}`"
                  :append-icon="`mdiSvg:${mdi.mdiChevronDown}`"
                >
                  {{ choiceLabel(thinkingChoice, 'label') }}
                </VBtn>
              </template>
              <VList density="compact">
                <VListSubheader>{{ effortMode ? t('ai.reasoning_effort') : t('ai.thinking') }}</VListSubheader>
                <VListItem
                  v-for="choice in thinkingOptions"
                  :key="choice"
                  :active="choice === thinkingChoice"
                  color="primary"
                  @click="thinkingChoice = choice"
                >
                  <VListItemTitle>{{ choiceLabel(choice) }}</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>

            <VSpacer />

            <span class="ai-prompt__hint">{{ t('ai.send_hint') }}</span>

            <VBtn
              v-if="loading"
              class="ai-send ai-send--stop"
              icon
              size="32"
              variant="tonal"
              :aria-label="t('ai.stop')"
              @click="stop"
            >
              <VIcon size="18" :icon="`mdiSvg:${mdi.mdiStop}`" />
              <Tooltip :label="t('ai.stop')" />
            </VBtn>
            <VBtn
              v-else
              class="ai-send"
              icon
              size="32"
              color="primary"
              variant="flat"
              :disabled="isGenerateDisabled"
              :aria-label="t('ai.generate')"
              @click="generate()"
            >
              <VIcon size="18" :icon="`mdiSvg:${mdi.mdiArrowUp}`" />
              <Tooltip :label="t('ai.generate')" />
            </VBtn>
          </div>
        </div>

        <div v-if="status" class="ai-status" :class="`ai-status--${status.type}`" role="alert">
          <VIcon size="16" :icon="`mdiSvg:${mdi.mdiAlertCircleOutline}`" />
          <span>{{ status.text }}</span>
        </div>

        <div v-if="showReasoning && reasoning" class="ai-reasoning">
          <button
            type="button"
            class="ai-reasoning__toggle"
            :aria-expanded="reasoningOpen"
            @click="reasoningOpen = !reasoningOpen"
          >
            <VIcon size="16" :icon="`mdiSvg:${mdi.mdiBrain}`" />
            <span>{{ reasoningLabel }}</span>
            <VIcon size="16" :icon="`mdiSvg:${reasoningOpen ? mdi.mdiChevronDown : mdi.mdiChevronRight}`" />
          </button>
          <pre v-if="reasoningOpen" ref="reasoningTextEl" class="ai-reasoning__text">{{ reasoning }}</pre>
        </div>

        <div v-if="result || loading" class="ai-result" :aria-busy="loading">
          <VProgressLinear v-if="loading" class="ai-result__progress" color="primary" height="2" indeterminate />

          <div v-if="!result" class="ai-result__placeholder">
            {{ t('ai.loading') }}
          </div>
          <div v-else-if="showChanges" class="ai-result__content ai-diff">
            <span v-for="(segment, index) in changes" :key="index" :class="`ai-diff__${segment.type}`">{{ segment.text }}</span>
          </div>
          <div v-else ref="resultEl" class="ai-result__content" role="region" :aria-label="t('ai.result')" />

          <div v-if="result" class="ai-result__footer">
            <span v-if="percent" class="ai-result__meta">{{ t('ai.change_vs_original', { percent }) }}</span>
            <span class="ai-result__meta ai-result__counter" :class="{ 'ai-result__meta--exceeded': primaryExceeded }">{{ counter }}</span>

            <VSpacer />

            <VBtn
              v-if="requestText"
              size="small"
              variant="text"
              :active="showChanges"
              :disabled="loading"
              :prepend-icon="`mdiSvg:${mdi.mdiCompareHorizontal}`"
              @click="showChanges = !showChanges"
            >
              {{ t('ai.changes') }}
            </VBtn>
            <VBtn
              size="small"
              variant="text"
              :disabled="loading || !aiProvider"
              :prepend-icon="`mdiSvg:${mdi.mdiRefresh}`"
              @click="generate(lastPrompt)"
            >
              {{ t('ai.another_version') }}
            </VBtn>
            <VBtn
              size="small"
              variant="text"
              :disabled="loading"
              :prepend-icon="`mdiSvg:${copied ? mdi.mdiCheck : mdi.mdiContentCopy}`"
              @click="copyResult"
            >
              {{ copied ? t('ai.copied') : t('ai.copy') }}
            </VBtn>
          </div>
        </div>
      </VCardText>
    </template>

    <template #actions>
      <VCardActions>
        <VBtn :variant="variantBtn" @click="cancel">
          {{ t('dialog.cancel') }}
        </VBtn>

        <VSpacer />

        <VBtn :variant="variantBtn" :disabled="!canApply(actions[1])" @click="apply(actions[1])">
          {{ actionLabel(actions[1]) }}
        </VBtn>
        <VBtn type="submit" color="primary" :variant="variantBtn" :disabled="!canApply(actions[0])">
          {{ actionLabel(actions[0]) }}
        </VBtn>
      </VCardActions>
    </template>
  </TiptapifyDialog>
</template>

<style lang="scss" scoped>
.ai-dialog {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ai-context {
  align-items: center;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  display: flex;
  font-size: .8125rem;
  gap: 6px;
  min-width: 0;

  &__label {
    white-space: nowrap;
  }

  &__excerpt {
    font-style: italic;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.ai-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.ai-prompt {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: var(--tf-dialog-field-radius, 8px);
  padding: 6px 8px 6px 12px;
  transition: border-color .15s;

  &:focus-within {
    border-color: rgb(var(--v-theme-primary));
  }

  &--disabled {
    opacity: .6;
  }

  &__input :deep(.v-field__input) {
    padding-top: 4px;
    padding-bottom: 4px;
  }

  &__bar {
    align-items: center;
    display: flex;
    gap: 8px;
  }

  &__hint {
    color: rgba(var(--v-theme-on-surface), var(--v-disabled-opacity));
    font-size: .75rem;
    white-space: nowrap;
  }
}

.ai-thinking {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  letter-spacing: normal;
  margin-left: -8px;
  text-transform: none;
}

.ai-status {
  align-items: flex-start;
  display: flex;
  font-size: .8125rem;
  gap: 6px;

  &--warning {
    color: rgb(var(--v-theme-warning));
  }

  &--error {
    color: rgb(var(--v-theme-error));
  }

  .v-icon {
    margin-top: 1px;
  }
}

.ai-reasoning {
  &__toggle {
    align-items: center;
    background: none;
    border: 0;
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    font-size: .8125rem;
    gap: 6px;
    padding: 0;
  }

  &__text {
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
    font-family: 'JetBrainsMono', monospace;
    font-size: .75rem;
    line-height: 1.4;
    margin: 6px 0 0 22px;
    max-height: 200px;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-word;
  }
}

.ai-result {
  background: rgba(var(--v-theme-on-surface), .03);
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: var(--tf-dialog-field-radius, 8px);
  overflow: hidden;
  position: relative;

  &__progress {
    left: 0;
    position: absolute;
    top: 0;
  }

  &__placeholder {
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
    font-size: .875rem;
    padding: 12px;
  }

  // The preview keeps the whitespace of plain text, the way it is inserted
  &__content {
    font-size: .875rem;
    line-height: 1.55;
    max-height: 280px;
    overflow: auto;
    padding: 10px 12px;
    white-space: pre-wrap;
    word-break: break-word;

    :deep(> :first-child) {
      margin-top: 0;
    }

    :deep(> :last-child) {
      margin-bottom: 0;
    }

    :deep(p),
    :deep(ul),
    :deep(ol),
    :deep(blockquote) {
      margin: 0 0 .5em;
    }

    :deep(ul),
    :deep(ol) {
      padding-left: 1.5em;
    }

    :deep(img),
    :deep(iframe),
    :deep(video) {
      max-width: 100%;
    }
  }

  &__footer {
    align-items: center;
    border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    display: flex;
    flex-wrap: wrap;
    gap: 4px 12px;
    padding: 2px 4px 2px 12px;

    .v-btn {
      letter-spacing: normal;
      text-transform: none;
    }
  }

  &__meta {
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
    font-size: .75rem;
    white-space: nowrap;

    &--exceeded {
      color: rgb(var(--v-theme-error));
    }
  }
}

.ai-diff {
  &__insert {
    background: rgba(var(--v-theme-success), .16);
  }

  &__delete {
    background: rgba(var(--v-theme-error), .12);
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
    text-decoration: line-through;
  }
}
</style>
