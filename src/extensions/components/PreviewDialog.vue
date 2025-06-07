<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from "vue-i18n";
import * as mdi from '@mdi/js'

const { t } = useI18n();

const content = ref()

const dialog = ref(false)

const showDialog = (event: CustomEvent) => {
  console.log('preview event', event)
  content.value = event.detail.html
  dialog.value = true;
}

onMounted(() => {
  window.addEventListener('tiptapify-show-preview', showDialog as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('tiptapify-show-preview', showDialog as EventListener)
})
</script>

<template>
  <VDialog v-model="dialog" fullscreen>
    <VCard>
      <VToolbar>
        <VBtn :icon="mdi.mdiClose" @click="dialog = false" />

        <VToolbarTitle>Preview</VToolbarTitle>
      </VToolbar>

      <VCardItem>
        <div class="tiptap" v-html="content"></div>
      </VCardItem>
    </VCard>
  </VDialog>
</template>

<style lang="scss">

</style>