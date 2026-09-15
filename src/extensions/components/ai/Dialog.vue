<script lang="ts" setup>

import TiptapifyDialog from '@tiptapify/components/UI/TiptapifyDialog.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import {
  TiptapifyAiEditorContext,
  TiptapifyAiMode,
  TiptapifyAiOpenAiResponse,
  TiptapifyAiReasoningEffort,
  TiptapifyAiRequest,
  TiptapifyAiResponse,
  TiptapifyAiResolvedOptions,
  TiptapifyAiStream,
  TiptapifyEditor
} from '@tiptapify/types/editor'
import { computed, ComputedRef, inject, nextTick, Ref, ref, useTemplateRef, watch } from 'vue'
import * as mdi from '@mdi/js'
import { ComposerTranslation } from 'vue-i18n'
import { exceedsLimit } from './charLimit'
import { DEFAULT_AI_INSTRUCTION } from './backend'

const { variantBtn, variantField } = useTiptapifyConfig()

const editor = inject('tiptapifyEditor') as Ref<TiptapifyEditor>
const ai = inject('tiptapifyAi') as ComputedRef<TiptapifyAiResolvedOptions | false>
const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const dialog = useTemplateRef('dialog')
const prompt = ref('')
const result = ref('')
const reasoning = ref('')
const reasoningPanel = ref<number[]>([])
const reasoningTextEl = ref<HTMLElement | null>(null)
const error = ref('')
const loading = ref(false)
const requestController = ref<AbortController | null>(null)
const requestRange = ref<{ from: number, to: number } | null>(null)
const requestMode = ref<TiptapifyAiMode>('insert')
const thinkingEnabled = ref(false)
const reasoningEffort = ref<'default' | TiptapifyAiReasoningEffort | null>(null)

watch(loading, (value) => {
  if (value) {
    reasoningPanel.value = [0]
  }
})

watch(reasoning, () => {
  nextTick(() => {
    const element = reasoningTextEl.value
    if (element) {
      element.scrollTop = element.scrollHeight
    }
  })
})

const aiProvider = computed(() => ai?.value ? ai.value.aiProvider : undefined)
const promptExamples = computed(() => ai?.value ? ai.value.promptExamples : [])
const reasoningEffortOptions = computed<TiptapifyAiReasoningEffort[]>(() => {
  const configured = ai?.value?.reasoningEffort
  if (!configured || !Array.isArray(configured.options)) {
    return []
  }

  return configured.options.filter(option => option !== 'default')
})
const reasoningEffortItems = computed<Array<'default' | TiptapifyAiReasoningEffort>>(() => {
  return ['default', ...reasoningEffortOptions.value]
})
const reasoningEffortSupported = computed(() => reasoningEffortOptions.value.length > 0)
const thinkingSupported = computed(() => ai?.value?.thinking === true)
const showReasoning = computed(() => ai?.value?.showReasoning === true)
const showReasoningEffort = computed(() => thinkingSupported.value && reasoningEffortSupported.value && thinkingEnabled.value)
const useReasoningEffort = computed(() => {
  return thinkingSupported.value
    && thinkingEnabled.value
    && reasoningEffortSupported.value
    && reasoningEffort.value !== null
    && reasoningEffort.value !== 'default'
})
const isGenerateDisabled = computed(() => !aiProvider.value || !prompt.value.trim() || loading.value)
const characterCountLimit = computed(() => {
  const limit = getCharacterCountExtension()?.options?.limit
  return typeof limit === 'number' ? limit : null
})
const limitExceeded = computed(() => {
  const limit = characterCountLimit.value
  if (limit === null || !result.value) {
    return false
  }

  return exceedsLimit(result.value, {
    doc: editor.value.state.doc,
    limit,
    mode: requestMode.value,
    range: requestRange.value,
  })
})
// A result that exceeds the character limit cannot be inserted (the
// CharacterCount extension rejects it), so the apply action (and its
// alternative modes) is disabled until the result is shortened.
const isApplyDisabled = computed(() => !result.value.trim() || loading.value || limitExceeded.value)
const actionLabel = computed(() => t(`ai.${requestMode.value}`))
const modeOptions: TiptapifyAiMode[] = ['insert', 'replace', 'append']
const alternativeModes = computed(() => modeOptions.filter(mode => mode !== requestMode.value))

function applyInMode(mode: TiptapifyAiMode) {
  if (isApplyDisabled.value) {
    return
  }

  requestMode.value = mode
  apply()
}

defineExpose({ showDialog })

function resetReasoningEffort() {
  const configured = ai?.value?.reasoningEffort
  const options = reasoningEffortOptions.value

  if (options.length === 0) {
    reasoningEffort.value = null
    return
  }

  reasoningEffort.value = configured?.default && options.includes(configured.default)
    ? configured.default
    : 'default'
}

function showDialog() {
  prompt.value = ai?.value && ai.value.defaultPrompt ? ai.value.defaultPrompt : ''
  result.value = ''
  reasoning.value = ''
  error.value = ''
  requestRange.value = null
  const { from, to } = editor.value.state.selection
  requestMode.value = ai.value?.mode ?? (getSelectedText(from, to) ? 'replace' : 'insert')
  thinkingEnabled.value = true
  resetReasoningEffort()

  dialog.value?.open()
}

function close() {
  requestController.value?.abort()
  requestController.value = null

  prompt.value = ''
  result.value = ''
  reasoning.value = ''
  error.value = ''
  requestRange.value = null
  requestMode.value = 'insert'

  dialog.value?.close()
}

function stop() {
  requestController.value?.abort()
}

function applyExample(examplePrompt: string) {
  prompt.value = examplePrompt
}

function getSelectedText(from: number, to: number) {
  if (from === to) {
    return ''
  }

  return editor.value.state.doc.textBetween(from, to, '\n')
}

function buildDefaultMessages(context: TiptapifyAiEditorContext) {
  const systemPrompt = ai.value && ai.value.systemPrompt
    ? ai.value.systemPrompt
    : DEFAULT_AI_INSTRUCTION
  const contextText = context.selectedText || context.text
  const contextLabel = context.selectedText ? 'Selected text' : 'Editor text'

  return [
    {
      role: 'system' as const,
      content: systemPrompt,
    },
    {
      role: 'user' as const,
      content: contextText
        ? `${contextLabel}:\n${contextText}\n\nUser request:\n${context.prompt}`
        : context.prompt,
    },
  ]
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

  if (useReasoningEffort.value) {
    delete request.enable_thinking
    request.reasoning_effort = reasoningEffort.value
  } else {
    delete request.reasoning_effort

    request.enable_thinking = thinkingSupported.value && thinkingEnabled.value
  }

  return request
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

async function generate() {
  if (isGenerateDisabled.value || !aiProvider.value) {
    return
  }

  error.value = ''
  result.value = ''
  reasoning.value = ''
  loading.value = true

  const controller = new AbortController()
  requestController.value = controller

  const { from, to } = editor.value.state.selection
  const selectedText = getSelectedText(from, to)
  requestRange.value = selectedText ? { from, to } : null

  const context: TiptapifyAiEditorContext = {
    prompt: prompt.value.trim(),
    selectedText,
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
        result.value += chunk
      }
    },
    onReasoning: (chunk: string) => {
      if (chunk && !controller.signal.aborted) {
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
      error.value = err instanceof Error ? err.message : t('ai.error')
    }
  } finally {
    loading.value = false
  }
}

function getCharacterCountExtension() {
  return editor.value.options.extensions?.find(item => item.name === 'characterCount')
}

function apply() {
  if (isApplyDisabled.value) {
    return
  }

  const chain = editor.value.chain().focus()
  if (requestMode.value === 'replace' && requestRange.value) {
    chain.deleteRange(requestRange.value)
  }

  if (requestMode.value === 'append') {
    chain.insertContentAt(editor.value.state.doc.content.size, result.value).run()
  } else {
    chain.insertContent(result.value).run()
  }

  close()
}

</script>

<template>
  <TiptapifyDialog ref="dialog" module="ai" :title="t('ai.title')" :max-width="720" @close-dialog="close">
    <template #content>
      <VCardText>
        <VAlert v-if="!aiProvider" type="warning" variant="tonal" density="compact" class="mb-4">
          {{ t('ai.unavailable') }}
        </VAlert>

        <div v-if="promptExamples.length" class="mb-4">
          <VLabel class="mb-2 d-block">
            {{ t('ai.quick_prompts') }}
          </VLabel>
          <div class="d-flex flex-wrap ga-2">
            <VChip
              v-for="example in promptExamples"
              :key="`${example.title}:${example.prompt}`"
              variant="tonal"
              :disabled="loading || !aiProvider"
              @click="applyExample(example.prompt)"
            >
              {{ example.title }}
            </VChip>
          </div>
        </div>

        <VTextarea
          v-model="prompt"
          :label="t('ai.prompt')"
          :variant="variantField"
          :disabled="loading || !aiProvider"
          rows="4"
          auto-grow
          autofocus
        />

        <div v-if="thinkingSupported" class="ai-thinking-toggle d-flex align-center mb-4">
          <VIcon size="x-small" class="mr-2" :icon="`mdiSvg:${mdi.mdiBrain}`" />
          <VLabel>{{ t('ai.thinking') }}</VLabel>
          <VSwitch
            v-model="thinkingEnabled"
            :disabled="loading || useReasoningEffort"
            density="compact"
            hide-details
            color="primary"
            class="ai-thinking-toggle__switch"
          />
        </div>

        <div v-if="showReasoningEffort" class="ai-reasoning-effort d-flex align-center mb-4">
          <VIcon size="x-small" class="mr-2" :icon="`mdiSvg:${mdi.mdiGauge}`" />
          <VLabel>{{ t('ai.reasoning_effort') }}</VLabel>
          <VSelect
            v-model="reasoningEffort"
            :items="reasoningEffortItems"
            :disabled="loading"
            :variant="variantField"
            density="compact"
            hide-details
            class="ai-reasoning-effort__select"
          />
        </div>

        <VExpansionPanels v-if="showReasoning && reasoning" v-model="reasoningPanel" variant="default" class="ai-reasoning mb-4">
          <VExpansionPanel :value="0">
            <template #title>
              <VIcon size="x-small" :icon="`mdiSvg:${mdi.mdiBrain}`" />
              <span class="ml-2">{{ t('ai.thinking') }}</span>
            </template>
            <template #text>
              <pre ref="reasoningTextEl" class="ai-reasoning__text">{{ reasoning }}</pre>
            </template>
          </VExpansionPanel>
        </VExpansionPanels>

        <VTextarea
          v-model="result"
          :label="t('ai.result')"
          :variant="variantField"
          :loading="loading && !result"
          :readonly="loading"
          rows="5"
          auto-grow
        />

        <VLabel
          v-if="characterCountLimit !== null && result"
          class="ai-char-count d-block"
          :class="{ 'ai-char-count--exceeded': limitExceeded }"
        >
          {{ result.length }} / {{ characterCountLimit }}
        </VLabel>

        <VAlert
          v-if="limitExceeded"
          type="error"
          variant="tonal"
          density="compact"
          class="ai-limit-alert mt-4"
        >
          {{ t('ai.limit_exceeded') }}
        </VAlert>

        <VAlert v-if="loading" type="info" variant="tonal" density="compact" class="mt-4">
          {{ t('ai.loading') }}
        </VAlert>

        <VAlert v-if="error" type="error" variant="tonal" density="compact" class="mt-4">
          {{ error }}
        </VAlert>
      </VCardText>
    </template>

    <template #actions>
      <VCardActions>
        <VSpacer />
        <VBtn :variant="variantBtn" @click="close">
          {{ t('dialog.close') }}
        </VBtn>
        <VBtn color="primary" :variant="variantBtn" :disabled="isGenerateDisabled" :loading="loading" @click="generate">
          {{ t('ai.generate') }}
        </VBtn>
        <VBtn v-if="loading" color="warning" :variant="variantBtn" @click="stop">
          {{ t('ai.stop') }}
        </VBtn>

        <VBtnGroup
          :class="{ 'tiptapify-btn-group--elevated': variantBtn === 'elevated' && !isApplyDisabled }"
          density="compact"
          :variant="variantBtn"
          divided
        >
          <VBtn
            color="primary"
            :variant="variantBtn"
            :disabled="isApplyDisabled"
            @click="apply"
          >
            {{ t('ai.insert') }}
          </VBtn>

          <VMenu>
            <template #activator="{ props }">
              <VBtn
                v-bind="{ ...props, minWidth: 30 }"
                color="primary"
                :disabled="isApplyDisabled"
                :variant="variantBtn"
              >
                <VIcon :icon="`mdiSvg:${mdi.mdiDotsVertical}`" />
              </VBtn>
            </template>
            <VList>
              <VListItem
                v-for="mode in alternativeModes"
                :key="mode"
                @click="applyInMode(mode)"
              >
                <VListItemTitle>{{ t(`ai.${mode}`) }}</VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </VBtnGroup>
      </VCardActions>
    </template>
  </TiptapifyDialog>
</template>

<style lang="scss" scoped>
.tiptapify-btn-group--elevated {
  box-shadow:
    0 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0 2px 2px 0 var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0 1px 5px 0 var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
}

.ai-thinking-toggle {
  &__switch {
    flex: 0 0 auto;
    margin-left: auto;

    --v-switch-scale: 1;
    --v-switch-track-height: 14px;
    --v-switch-thumb-height: 20px;
    --v-switch-thumb-width: 20px;
  }
}

.ai-reasoning-effort {
  &__select {
    flex: 0 0 auto;
    margin-left: auto;

    :deep(.v-input) {
      width: 140px;
    }
  }
}

.ai-reasoning {
  :deep(.v-expansion-panel-title) {
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
    font-size: .8125rem;
    font-weight: 500;
    padding: .625rem .75rem;
  }

  :deep(.v-expansion-panel-title__icon) {
    color: rgba(var(--v-theme-on-surface), var(--v-disabled-opacity));
  }
}

.ai-reasoning__text {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  font-family: 'JetBrainsMono', monospace;
  font-size: .75rem;
  line-height: 1.4;
  margin: 0;
  max-height: 200px;
  overflow: auto;
  padding: .25rem .75rem .625rem;
  white-space: pre-wrap;
  word-break: break-word;
}

.ai-char-count {
  font-size: .75rem;
  margin-top: .25rem;
  text-align: right;

  &--exceeded {
    color: var(--red-soft);
  }
}

.ai-limit-alert {
  color: var(--red-soft, #B24A40) !important;
}
</style>
