<script setup lang="ts">
import Dialog from "@tiptapify/components/UI/Dialog.vue";
import { ref, onMounted, onUnmounted } from 'vue'

const content = ref()

const dialog = ref(null)

const showDialog = (event: CustomEvent) => {
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
  <Dialog ref="dialog" module="preview" fullscreen>
    <template #content>
      <VCardItem>
        <div class="tiptap" v-html="content"></div>
      </VCardItem>
    </template>
  </Dialog>
</template>

<style lang="scss">

</style>