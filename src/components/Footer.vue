<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'
import { TiptapifyFooterAlignment } from '@tiptapify/types/editor'
import { computed, inject, PropType, ref, Ref } from 'vue'
import { ComposerTranslation } from 'vue-i18n'

const props = defineProps({
  showWordsCount: { type: Boolean, default: true },
  showCharactersCount: { type: Boolean, default: true },
  limit: { type: Number, default: 0 },
  limitDefaultColor: { type: String, default: 'purple' },
  limitAlertColor: { type: String, default: 'orange' },
  limitWarningColor: { type: String, default: 'red' },
  alignment: { type: String as PropType<TiptapifyFooterAlignment>, default: 'end' },
})

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const editor = inject('tiptapifyEditor') as Ref<Editor>

const statusItems = ref([
  {
    enabled: computed(() => props.showWordsCount),
    text: 'footer.words',
    value: computed(() => editor.value.storage.characterCount.words())
  },
  {
    enabled: computed(() => props.showCharactersCount),
    text: 'footer.chars',
    value: computed(() => editor.value.storage.characterCount.characters())
  }
])

const percentage = computed(() => {
  if (props.limit === 0) {
    return 100
  }
  return Math.round((100 / props.limit) * editor.value.storage.characterCount.characters())
})
const limitText = computed(() => {
  const current = editor.value.storage.characterCount.characters()
  return `${t('footer.limit')}<br>${current} / ${props.limit}`
})

function printStatusItemText(text: string): string {
  return t(text)
}

function showFooter() {
  return editor.value && (props.showWordsCount || props.showCharactersCount)
}
</script>

<template>
  <div v-if="showFooter()" class="tiptapify-footer">
    <VRow>
      <VCol class="d-flex align-center" :class="`justify-${alignment}`">
        <template v-if="limit > 0">
          <VTooltip>
            <template #default>
              <span v-html="limitText" />
            </template>
            <template #activator="{ props }">
              <svg
                height="25"
                width="25"
                viewBox="0 0 20 20"
                v-bind="props"
                :class="{
                  'character-count': true,
                  'character-count--alert': percentage > 75,
                  'character-count--warning': editor.storage.characterCount.characters() === limit,
                }"
              >
                <circle r="8" cx="10" cy="10" fill="#e9ecef" />
                <circle
                  r="5"
                  cx="10"
                  cy="10"
                  fill="transparent"
                  stroke="currentColor"
                  stroke-width="6"
                  :stroke-dasharray="`calc(${percentage} * 31.4 / 100) 31.4`"
                  transform="rotate(-90) translate(-20)"
                />
                <circle r="6" cx="10" cy="10" fill="white" />
              </svg>
            </template>
          </VTooltip>

          <VDivider class="tiptapify-footer--divider" vertical />
        </template>
        <template v-for="statusItem in statusItems" :key="statusItem.text">
          <span v-if="statusItem.enabled" class="tiptapify-footer--status-item">
            {{ printStatusItemText(statusItem.text) }}: {{ statusItem.value }}
          </span>

          <VDivider class="tiptapify-footer--divider" vertical />
        </template>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped lang="scss">
.tiptapify-footer {
  padding: 8px;
  border-top: var(--border);
}

.tiptapify-footer--status-item {
  color: #999;
}

.tiptapify-footer--divider:not(:last-child) {
  margin: 0 8px;
}

.tiptapify-footer--divider:last-child {
  display: none;
}

/* Character count */
.character-count {
  color: v-bind(limitDefaultColor);

  &--alert {
    color: v-bind(limitAlertColor);
  }

  &--warning {
      color: v-bind(limitWarningColor);
  }
}
</style>
