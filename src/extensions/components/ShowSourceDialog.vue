<script setup lang="ts">
import { Editor } from "@tiptap/vue-3";
import { ref, onMounted, onUnmounted, watch, inject, Ref } from 'vue'
import { useI18n } from "vue-i18n";

import helpers from "@tiptapify/utils/helpers";

const props = defineProps({
  indent: { type: Number, default: 2 },
})

const { ucFirst } = helpers;

const { t } = useI18n();

const editor = inject('tiptapifyEditor') as Ref<Editor>

const dialog = ref(false)
const formatted = ref(false)
const sourceCode = ref('')

const formatHtml = (html: string): string => {
  let formatted = html.replace(/>/g, '>\n');

  formatted = formatted.replace(/\n</g, '\n<');
  formatted = formatted.replace(/([^>\n])</g, '$1\n<');

  const lines = formatted.split('\n');
  let indentLevel = 0;

  return lines
      .map(line => {
        if (line.match(/<\//)) {
          indentLevel = Math.max(0, indentLevel - 1);
        }

        const indentedLine = ' '.repeat(indentLevel * props.indent) + line;

        if (line.match(/<[^\/][^>]*>/) && !line.match(/<.*\/>/)) {
          indentLevel++;
        }

        return indentedLine;
      })
      .filter(line => line.trim())
      .join('\n');
}

const unformatHtml = (html: string): string => {
  return html
      .replace(/\n/g, '')
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
}

const showDialog = (event: CustomEvent) => {
  sourceCode.value = event.detail.html
  dialog.value = true;
}

const saveChanges = () => {
  dialog.value = false

  editor.value.commands.setContent(sourceCode.value, true)
}

onMounted(() => {
  window.addEventListener('tiptapify-show-source', showDialog as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('tiptapify-show-source', showDialog as EventListener)
})

watch(() => formatted.value, () => {
  sourceCode.value = formatted.value ? formatHtml(sourceCode.value) : unformatHtml(sourceCode.value)
})
</script>

<template>
  <VDialog v-model="dialog" max-width="1500">
    <VCard>
      <VCardTitle>{{ ucFirst(t('dialog.source.title')) }}</VCardTitle>

      <VCardText>
        <VContainer fluid class="pt-0 pl-0 pr-0">
          <VRow>
            <VCol>
              <VBtn v-model="formatted" :color="`${formatted ? 'primary' : ''}`" @click="formatted = !formatted">
                {{ ucFirst(t('dialog.source.prettify')) }}
              </VBtn>
            </VCol>
          </VRow>
        </VContainer>

        <VTextarea
            v-model="sourceCode"
            no-resize
            rows="100"
            variant="outlined"
            class="source-code-area"
        />
      </VCardText>

      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn color="primary" @click="dialog = false">
          {{ ucFirst(t('dialog.close')) }}
        </VBtn>
        <VBtn color="primary" @click="saveChanges">
          {{ ucFirst(t('dialog.apply')) }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped lang="scss">
.source-code-area {
  font-family: monospace;
  white-space: pre-wrap;
}

:deep(.source-code-area textarea) {
  max-height: 900px;
  overflow-y: auto;
}
</style>