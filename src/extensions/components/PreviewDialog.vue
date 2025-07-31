<script setup lang="ts">
import { Editor } from "@tiptap/vue-3";
import TiptapifyDialog from "@tiptapify/components/UI/TiptapifyDialog.vue";
import { ref, onMounted, onUnmounted, inject, Ref } from 'vue'

const content = ref()

const editor = inject('tiptapifyEditor') as Ref<Editor>

const dialog = ref(null)

const showDialog = (event: CustomEvent) => {
  if (event.detail.editorId !== editor.value.instanceId) {
    return
  }

  content.value = event.detail.html

  dialog.value.open()
}

onMounted(() => {
  window.addEventListener('tiptapify-show-preview', showDialog as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('tiptapify-show-preview', showDialog as EventListener)
})
</script>

<template>
  <TiptapifyDialog ref="dialog" module="preview" fullscreen>
    <template #content>
      <VCardItem>
        <div class="tiptap" v-html="content"></div>
      </VCardItem>
    </template>
  </TiptapifyDialog>
</template>

<style lang="scss">

</style>