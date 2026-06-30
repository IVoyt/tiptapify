<script setup lang="ts">
import { variantBtnTypes } from '@tiptapify/types/editor'
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
  variantBtn: { type: String as PropType<variantBtnTypes>, default() { return 'solo' } },
  aiDemo: { type: Boolean, default() { return false } },
})

const content = ref('')
const aiEndpoint = ref('http://localhost:1234/v1/chat/completions')
const aiModel = ref('qwen/qwen3-4b-thinking-2507')
const aiToken = ref('')
const theme = useTheme()

const aiConfig = computed(() => {
  if (!props.aiDemo) {
    return false
  }

  return {
    model: aiModel.value,
    async aiProvider(request: object) {
      const response = await fetch(aiEndpoint.value, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(aiToken.value ? { Authorization: `Bearer ${aiToken.value}` } : {}),
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      return response.json()
    },
  }
})

function syncTheme() {
  const isDark = document.documentElement.classList.contains('dark')
  const newTheme = isDark ? 'dark' : 'light'
  console.log('isDark', isDark)
  console.log('newTheme', newTheme)
  theme.change(newTheme)
  // if (theme.global.name.value !== newTheme) {
  //   theme.global.name.value = newTheme
  //
  //   theme.change(newTheme)
  // }
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
        <span>Endpoint is required. Model and token depend on your provider. Values are not stored.</span>
      </div>

      <div class="ai-demo-settings__grid">
        <VTextField
          v-model="aiEndpoint"
          label="Endpoint"
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
  grid-template-columns: minmax(220px, 2fr) minmax(180px, 1.2fr) minmax(180px, 1fr);
  gap: 12px;
}

@media (max-width: 820px) {
  .ai-demo-settings__header {
    display: block;
  }

  .ai-demo-settings__header span {
    display: block;
    margin-top: 4px;
  }

  .ai-demo-settings__grid {
    grid-template-columns: 1fr;
  }
}
</style>
