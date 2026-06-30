<script lang="ts" setup>

import TiptapifyDialog from '@tiptapify/components/UI/TiptapifyDialog.vue'
import defaults from '@tiptapify/constants/defaults'
import {
  TiptapifyAiEditorContext,
  TiptapifyAiMode,
  TiptapifyAiOpenAiResponse,
  TiptapifyAiRequest,
  TiptapifyAiResponse,
  TiptapifyAiResolvedOptions,
  TiptapifyEditor,
  variantBtnTypes,
  variantFieldTypes
} from '@tiptapify/types/editor'
import { computed, ComputedRef, inject, PropType, Ref, ref, useTemplateRef } from 'vue'
import { ComposerTranslation } from 'vue-i18n'

defineProps({
  variantBtn: { type: String as PropType<variantBtnTypes>, default() { return defaults.variantBtn } },
  variantField: { type: String as PropType<variantFieldTypes>, default() { return defaults.variantField } },
})

const editor = inject('tiptapifyEditor') as Ref<TiptapifyEditor>
const ai = inject('tiptapifyAi') as ComputedRef<TiptapifyAiResolvedOptions | false>
const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const dialog = useTemplateRef('dialog')
const prompt = ref('')
const result = ref('')
const error = ref('')
const loading = ref(false)
const requestRange = ref<{ from: number, to: number } | null>(null)
const requestMode = ref<TiptapifyAiMode>('insert')

const aiProvider = computed(() => ai?.value ? ai.value.aiProvider : undefined)
const promptExamples = computed(() => ai?.value ? ai.value.promptExamples : [])
const isGenerateDisabled = computed(() => !aiProvider.value || !prompt.value.trim() || loading.value)
const isApplyDisabled = computed(() => !result.value.trim() || loading.value)

defineExpose({ showDialog })

function showDialog() {
  prompt.value = ai?.value && ai.value.defaultPrompt ? ai.value.defaultPrompt : ''
  result.value = ''
  error.value = ''
  requestRange.value = null
  requestMode.value = 'insert'

  dialog.value?.open()
}

function close() {
  prompt.value = ''
  result.value = ''
  error.value = ''
  requestRange.value = null
  requestMode.value = 'insert'

  dialog.value?.close()
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
    : 'You are an assistant inside a rich text editor. Return only the final text to insert.'
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
  const request: TiptapifyAiRequest = {
    ...options.chatCompletionOptions,
    messages: options.createMessages ? options.createMessages(context) : buildDefaultMessages(context),
    stream: false,
  }

  if (options.model) {
    request.model = options.model
  }

  if (typeof options.temperature === 'number') {
    request.temperature = options.temperature
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
  loading.value = true

  const { from, to } = editor.value.state.selection
  const selectedText = getSelectedText(from, to)
  requestRange.value = selectedText ? { from, to } : null
  requestMode.value = ai.value ? ai.value.mode ?? (selectedText ? 'replace' : 'insert') : 'insert'

  const context: TiptapifyAiEditorContext = {
    prompt: prompt.value.trim(),
    selectedText,
    text: selectedText || editor.value.getText(),
    html: editor.value.getHTML(),
    json: editor.value.getJSON(),
    mode: requestMode.value,
  }
  const request = buildOpenAiRequest(context)

  try {
    const response = await aiProvider.value(request, context)
    result.value = getResponseContent(response)
  } catch (err) {
    error.value = err instanceof Error ? err.message : t('ai.error')
  } finally {
    loading.value = false
  }
}

function apply() {
  if (isApplyDisabled.value) {
    return
  }

  const chain = editor.value.chain().focus()
  if (requestRange.value) {
    chain.deleteRange(requestRange.value)
  }

  if (!requestRange.value && requestMode.value === 'append') {
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

        <VTextarea
          v-model="prompt"
          :label="t('ai.prompt')"
          :variant="variantField"
          :disabled="loading || !aiProvider"
          rows="4"
          auto-grow
          autofocus
        />

        <div v-if="promptExamples.length" class="mb-4">
          <VLabel class="mb-2 d-block">
            {{ t('ai.examples') }}
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
          v-model="result"
          :label="t('ai.result')"
          :variant="variantField"
          :loading="loading"
          :disabled="loading"
          rows="5"
          auto-grow
        />

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
        <VBtn color="primary" :variant="variantBtn" :disabled="isApplyDisabled" @click="apply">
          {{ t('ai.apply') }}
        </VBtn>
      </VCardActions>
    </template>
  </TiptapifyDialog>
</template>
