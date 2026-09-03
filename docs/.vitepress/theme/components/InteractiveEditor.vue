<script setup lang="ts">
import { TiptapifyAiEditorContext, TiptapifyAiRequest, TiptapifyAiStream, variantBtnTypes } from '@tiptapify/types/editor'
import { ref, onMounted, onUnmounted, PropType, computed } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps({
  height: { type: [Number,String], default() { return 400 } },
  items: { type: Array<string>, default() { return [] } },
  itemsExclude: { type: Boolean, default() { return false } },
  toolbar: { type: Boolean, default() { return true } },
  bubbleMenu: { type: Boolean, default() { return false } },
  floatingMenu: { type: Boolean, default() { return false } },
  slashCommands: { type: [Boolean,Array<string>], default() { return true } },
  placeholder: { type: String, default() { return 'Start typing...' } },
  variantBtn: { type: String as PropType<variantBtnTypes>, default() { return 'elevated' } },
  aiDemo: { type: Boolean, default() { return false } },
})

const content = ref('')
const aiMode = ref<'provider' | 'backend'>('provider')
const aiEndpoint = ref('http://localhost:1234/v1/chat/completions')
const aiModel = ref('qwen/qwen3-4b-thinking-2507')
const aiToken = ref('')
const aiStream = ref(false)
const aiThinking = ref(false)
const aiShowReasoning = ref(false)
const theme = useTheme()

const aiConfig = computed(() => {
  if (!props.aiDemo) {
    return false
  }

  if (aiMode.value === 'backend') {
    return {
      aiEndpoint: aiEndpoint.value,
      model: aiModel.value,
      stream: aiStream.value,
      thinking: aiThinking.value,
      reasoningEffort: { options: ['low', 'medium', 'high', 'xhigh', 'max'] },
      showReasoning: aiShowReasoning.value,
      ...(aiToken.value ? { aiHeaders: { Authorization: `Bearer ${aiToken.value}` } } : {}),
    }
  }

  return {
    model: aiModel.value,
    stream: aiStream.value,
    thinking: aiThinking.value,
    reasoningEffort: { options: ['low', 'medium', 'high', 'xhigh', 'max'] },
    showReasoning: aiShowReasoning.value,
    async aiProvider(request: TiptapifyAiRequest, _context: TiptapifyAiEditorContext, stream?: TiptapifyAiStream) {
      const response = await fetch(aiEndpoint.value, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(aiToken.value ? { Authorization: `Bearer ${aiToken.value}` } : {}),
        },
        body: JSON.stringify(request),
        signal: stream?.signal,
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      if (request.stream !== true || !response.body) {
        return response.json()
      }

      return readOpenAiSseStream(response.body, stream)
    },
  }
})

async function readOpenAiSseStream(body: ReadableStream<Uint8Array>, stream?: TiptapifyAiStream): Promise<string> {
  let content = ''
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        content += parseOpenAiSseLine(line, stream)
      }
    }
  } catch (error) {
    // The user stopped the request — keep what has been streamed so far
    if (stream?.signal.aborted) {
      return content
    }
    throw error
  }

  return content
}

function parseOpenAiSseLine(line: string, stream?: TiptapifyAiStream): string {
  const trimmed = line.replace(/\r$/, '').trim()

  if (!trimmed.startsWith('data:')) {
    return ''
  }

  const data = trimmed.slice(5).trim()

  if (data === '' || data === '[DONE]') {
    return ''
  }

  let chunk: unknown
  try {
    chunk = JSON.parse(data)
  } catch {
    // Ignore malformed data lines
    return ''
  }

  if (typeof chunk !== 'object' || chunk === null) {
    return ''
  }

  const record = chunk as Record<string, unknown>
  const choice = Array.isArray(record.choices) ? record.choices[0] : null
  const delta = choice && typeof choice === 'object' ? (choice as Record<string, unknown>).delta : undefined

  if (!delta || typeof delta !== 'object') {
    return ''
  }

  const deltaRecord = delta as Record<string, unknown>
  let result = ''

  if (typeof deltaRecord.reasoning_content === 'string' && deltaRecord.reasoning_content !== '') {
    stream?.onReasoning(deltaRecord.reasoning_content)
  }

  if (typeof deltaRecord.content === 'string' && deltaRecord.content !== '') {
    stream?.onChunk(deltaRecord.content)
    result = deltaRecord.content
  }

  return result
}

function syncTheme() {
  const isDark = document.documentElement.classList.contains('dark')

  theme.change(isDark ? 'tiptapifyDark' : 'tiptapifyLight')
}

onMounted(() => {
  syncTheme()
  const observer = new MutationObserver(syncTheme)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <div class="interactive-editor">
    <div v-if="aiDemo" class="ai-demo-settings">
      <div class="ai-demo-settings__header">
        <strong>AI provider</strong>
        <span>Mode, endpoint, model, token, and the stream, thinking, and reasoning toggles are used only in this page session and are not stored.</span>
      </div>

      <div class="ai-demo-settings__grid">
        <VSelect
          v-model="aiMode"
          :items="[
            { title: 'OpenAI-compatible provider', value: 'provider' },
            { title: 'Backend endpoint', value: 'backend' },
          ]"
          item-title="title"
          item-value="value"
          label="Mode"
          density="compact"
          variant="outlined"
          hide-details
        />
        <VTextField
          v-model="aiEndpoint"
          :label="aiMode === 'backend' ? 'Backend endpoint' : 'Endpoint'"
          density="compact"
          variant="outlined"
          hide-details
        />
        <VTextField
          v-model="aiModel"
          label="Model"
          density="compact"
          variant="outlined"
          hide-details
        />
        <VTextField
          v-model="aiToken"
          label="API token"
          type="password"
          density="compact"
          variant="outlined"
          autocomplete="off"
          hide-details
        />
        <VSwitch
          v-model="aiStream"
          label="Stream"
          label-position="start"
          density="compact"
          color="primary"
          hide-details
          class="ai-demo-settings__switch"
        />
        <VSwitch
          v-model="aiThinking"
          label="Thinking"
          label-position="start"
          density="compact"
          color="primary"
          hide-details
          class="ai-demo-settings__switch"
        />
        <VSwitch
          v-model="aiShowReasoning"
          label="Show reasoning"
          label-position="start"
          density="compact"
          color="primary"
          hide-details
          class="ai-demo-settings__switch"
        />
      </div>
    </div>

    <Tiptapify
      v-model="content"
      :height="height"
      :placeholder="placeholder"
      font-measure="pt"
      :items="items || []"
      :items-exclude="itemsExclude"
      :toolbar="toolbar"
      :bubble-menu="bubbleMenu"
      :floating-menu="floatingMenu"
      :slash-commands="slashCommands"
      :interactive-styles="true"
      :variant-btn="variantBtn"
      :ai="aiConfig"
    />
  </div>
</template>

<style scoped>
.interactive-editor {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  margin: 1.5rem 0;
  min-height: 320px;
}

.ai-demo-settings {
  padding: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.ai-demo-settings__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.ai-demo-settings__header strong {
  color: var(--vp-c-text-1);
}

.ai-demo-settings__header span {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.ai-demo-settings__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.ai-demo-settings__switch {
  align-self: center;
}

@media (max-width: 820px) {
  .ai-demo-settings__header {
    display: block;
  }

  .ai-demo-settings__header span {
    display: block;
    margin-top: 4px;
  }
}

@media (max-width: 560px) {
  .ai-demo-settings__grid {
    grid-template-columns: 1fr;
  }
}
</style>
