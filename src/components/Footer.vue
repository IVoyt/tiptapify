<script setup lang="ts">
import { Editor } from "@tiptap/vue-3";
import { computed, inject, ref, Ref } from "vue";

const props = defineProps({
  showWordsCount: { type: Boolean, default: true },
  showCharactersCount: { type: Boolean, default: true },
})

const { t } = inject('tiptapifyI18n') as any

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
      <VCol class="d-flex justify-end">
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
</style>
