<script setup lang="ts">
import { useEditor } from "@tiptapify/composable/useEditor";
import { ref } from 'vue'

const { editor } = useEditor()
const editorInstance = ref(editor.getInstance())
</script>

<template>
  <div v-if="editorInstance" class="tiptapify-footer">
    <VRow>
      <VCol class="d-flex justify-end">
        <span class="words-count">
          {{ editorInstance.storage.characterCount.words() }} words
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
