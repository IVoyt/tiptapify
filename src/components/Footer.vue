<script setup lang="ts">
import { Editor } from "@tiptap/vue-3";
import { inject, Ref } from "vue";

const editor = inject('tiptapifyEditor') as Ref<Editor>
</script>

<template>
  <div v-if="editor" class="tiptapify-footer">
    <VRow>
      <VCol class="d-flex justify-end">
        <span class="words-count">
          {{ editor.storage.characterCount.words() }} words
        </span>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped lang="scss">
.tiptapify-footer {
  padding: 8px;
  border-top: var(--border);
}

.words-count {
  color: #999;
}
</style>
