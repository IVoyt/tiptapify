<script setup lang="ts">

import { Editor } from "@tiptap/vue-3";
import { useI18n } from 'vue-i18n'

import tiptapifyEmojis from "@tiptapify/extensions/emoji"

import { computed, inject, Ref, ref } from 'vue'

const { t } = useI18n()

defineExpose({ open, close })

const emit = defineEmits(['close'])

const editor = inject('tiptapifyEditor') as Ref<Editor>

const tab = ref('smileys_and_emotion')
const sorted = tiptapifyEmojis.sort((previous, current) => {
  if (previous.order < current.order) {
    return -1
  }
  if (previous.order > current.order) {
    return 1
  }

  return 0
})
const emojis = computed(() => sorted.map(item => { return { group: item.name, emojis: item.items } }))

const handleEmojiClick = (emoji: any) => {
  editor.value.chain().focus().insertContent(emoji.char).run()
  close()
}

function close() {
  emit('close')
}
</script>

<template>
  <VSheet class="pa-2" max-width="570">
    <div class="d-flex flex-row">
      <VTabs v-model="tab" mandatory direction="vertical" color="primary" density="compact">
        <VTab
            v-for="item of emojis"
            :text="item.group"
            :value="item.group"
            :key="item.group"
            density="compact"
            rounded
            size="small"
        >
          {{ t(`media.emoji.${item.group}`) }}
        </VTab>
      </VTabs>

      <VWindow v-model="tab" direction="vertical">
        <VWindowItem v-for="item of emojis" :value="item.group">
          <div class="tiptapify-emoji-container">
            <div v-for="emojiItem in item.emojis" class="tiptapify-emoji-container-item" @click="handleEmojiClick(emojiItem)" :title="emojiItem.name">
              <div class="tiptapify-emoji-container-item__overlay">
                <span>
                  {{ emojiItem.char }}
                </span>
              </div>
            </div>
          </div>
        </VWindowItem>
      </VWindow>
    </div>
  </VSheet>
</template>

<style lang="scss" scoped>
.tiptapify-emoji-container {
  max-height: 500px;
  overflow-y: auto;

  border: 1px solid #ddd;
  border-radius: 8px;
  filter: drop-shadow(1px 2px 3px #777);
}

.tiptapify-emoji-container-item__overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 5px;
  z-index: 1;
}

.tiptapify-emoji-container-item {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 32px;
  height: 32px;
  transition: background-color 0.2s ease-in-out;
}

.tiptapify-emoji-container-item:hover .tiptapify-emoji-container-item__overlay {
  background-color: rgba(var(--v-theme-on-background), calc(var(--v-hover-opacity) * var(--v-theme-overlay-multiplier)));
}
</style>