<script lang="ts" setup>
import type { Editor } from '@tiptap/core'
import EmojiPicker from '@tiptapify/extensions/components/media/emoji/Picker.vue'
import CharmapPicker from '@tiptapify/extensions/components/media/charmap/Picker.vue'
import { PickerEventBus } from '@tiptapify/extensions/PickerEventBus'

const props = defineProps<{
  editor: Editor
  t: any
  type: 'emoji' | 'charmap'
}>()

const handleClose = () => {
  PickerEventBus.emit('close', { type: props.type })
}
</script>

<template>
  <div class="tiptapify-picker-dialog" @click.self="handleClose">
    <div class="tiptapify-picker-dialog__content">
      <EmojiPicker v-if="type === 'emoji'" :editor="editor" :t="t" />
      <CharmapPicker v-else-if="type === 'charmap'" :editor="editor" :t="t" />
    </div>
  </div>
</template>

<style scoped>
.tiptapify-picker-dialog {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.tiptapify-picker-dialog__content {
  background: rgb(var(--v-theme-surface));
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}
</style>
