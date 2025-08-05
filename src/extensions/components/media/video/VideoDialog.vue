<script setup lang="ts">

import { Editor } from "@tiptap/vue-3";
import TiptapifyDialog from "@tiptapify/components/UI/TiptapifyDialog.vue";

import { computed, inject, onMounted, onUnmounted, Ref, ref } from 'vue'

defineProps({
  variantBtn: { type: String, default() { return 'elevated' }},
  variantField: { type: String, default() { return 'solo' }}
})

const editor = inject('tiptapifyEditor') as Ref<Editor>
const { t } = inject('tiptapifyI18n') as any

type videoAttrs = {
  src: string,
  width?: number,
  height?: number
}
const generateVideoAttrs = () => ({
  src: '',
  height: null,
  width: null
})

const attrs = ref(generateVideoAttrs())

const dialog = ref(null)

const isDisabled = computed(() => {
  const { src } = attrs.value
  return !src
})

function apply() {
  let { src, width, height } = attrs.value

  const videoOptions: videoAttrs = { src }

  if (width) {
    videoOptions.width = width
  }

  if (height) {
    videoOptions.height = height
  }

  if (src) {
    editor.value.commands.setYoutubeVideo(videoOptions)
    // editor.value.commands.setYoutubeVideo({
    //   src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    //   width: 640,
    //   height: 480,
    // })
  }

  close()
}

function clear() {
  editor.value.commands.deleteSelection()

  close()
}

function close() {
  dialog.value.close()

  attrs.value = generateVideoAttrs()
}

const showTiptapifyVideo = (event: CustomEvent) => {
  if (event.detail.editorId !== editor.value.instanceId) {
    return
  }

  attrs.value.src = event.detail.video?.src
  attrs.value.width = event.detail.video?.width
  attrs.value.height = event.detail.video?.height

  dialog.value.open()
}

onMounted(() => {
  window.addEventListener('tiptapify-show-tiptapifyVideo', showTiptapifyVideo as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('tiptapify-show-tiptapifyVideo', showTiptapifyVideo as EventListener)
})
</script>

<template>
  <TiptapifyDialog ref="dialog" module="video" :max-width="800">
    <template #content>
      <VCardText>
        <VRow>
<!--          <VCol cols="12">-->
<!--            <VSelect v-model="attrs.type" density="compact" variant="outlined" :label="t('dialog.video.src')" />-->
<!--          </VCol>-->

          <VCol cols="12">
            <VTextField v-model="attrs.src" density="compact" variant="outlined" :label="t('dialog.video.src')" />
          </VCol>

          <VCol cols="12" md="3">
            <VTextField v-model="attrs.width" type="number" density="compact" variant="outlined" :precision="0" :min="1" :label="t('dialog.video.width')" />
          </VCol>

          <VCol cols="12" md="3">
            <VTextField v-model="attrs.height" type="number" density="compact" variant="outlined" :precision="0" :min="1" :label="t('dialog.video.height')" />
          </VCol>
        </VRow>
      </VCardText>
    </template>

    <template #actions>
      <VCardActions>
        <VRow>
          <VCol class="d-flex justify-start">
            <VBtn color="warning" v-if="editor.isActive('image')" :variant="variantBtn" :disabled="isDisabled" @click="clear">
              {{ t('dialog.clear') }}
            </VBtn>
          </VCol>
          <VCol class="d-flex justify-end">
            <VBtn :variant="variantBtn" @click="close" class="mr-2">
              {{ t('dialog.close') }}
            </VBtn>
            <VBtn color="primary" :variant="variantBtn" :disabled="isDisabled" @click="apply">
              {{ t('dialog.apply') }}
            </VBtn>
          </VCol>
        </VRow>
      </VCardActions>
    </template>
  </TiptapifyDialog>
</template>