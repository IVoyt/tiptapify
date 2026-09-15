<script setup lang="ts">

import { Editor } from '@tiptap/vue-3'
import TiptapifyDialog from '@tiptapify/components/UI/TiptapifyDialog.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'

import { computed, inject, onMounted, onUnmounted, Ref, ref, useTemplateRef } from 'vue'
import { ComposerTranslation } from 'vue-i18n'

const { variantBtn, variantField } = useTiptapifyConfig()

const editor = inject('tiptapifyEditor') as Ref<Editor>
const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

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

const dialog = useTemplateRef('dialog')

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
        <div class="tiptapify-dialog-grid">
          <!--          <div class="tiptapify-dialog-col">-->
          <!--            <VSelect v-model="attrs.type" density="compact" variant="outlined" :label="t('dialog.video.src')" />-->
          <!--          </div>-->

          <div class="tiptapify-dialog-col">
            <VTextField v-model="attrs.src" density="compact" variant="outlined" :label="t('dialog.video.src')" />
          </div>

          <div class="tiptapify-dialog-col tiptapify-dialog-col--3">
            <VTextField
              v-model="attrs.width"
              type="number"
              density="compact"
              variant="outlined"
              :precision="0"
              :min="1"
              :label="t('dialog.video.width')"
            />
          </div>

          <div class="tiptapify-dialog-col tiptapify-dialog-col--3">
            <VTextField
              v-model="attrs.height"
              type="number"
              density="compact"
              variant="outlined"
              :precision="0"
              :min="1"
              :label="t('dialog.video.height')"
            />
          </div>
        </div>
      </VCardText>
    </template>

    <template #actions>
      <VCardActions>
        <div class="tiptapify-dialog-actions">
          <div class="tiptapify-dialog-actions__start">
            <VBtn v-if="editor.isActive('image')" color="warning" :variant="variantBtn" :disabled="isDisabled" @click="clear">
              {{ t('dialog.clear') }}
            </VBtn>
          </div>
          <div class="tiptapify-dialog-actions__end">
            <VBtn :variant="variantBtn" @click="close">
              {{ t('dialog.close') }}
            </VBtn>
            <VBtn color="primary" :variant="variantBtn" :disabled="isDisabled" @click="apply">
              {{ t('dialog.apply') }}
            </VBtn>
          </div>
        </div>
      </VCardActions>
    </template>
  </TiptapifyDialog>
</template>