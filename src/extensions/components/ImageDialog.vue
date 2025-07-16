<script setup lang="ts">

import { Editor } from "@tiptap/vue-3";
import Dialog from "@tiptapify/components/UI/Dialog.vue";

import { useI18n } from 'vue-i18n'
import { computed, inject, onMounted, onUnmounted, Ref, ref } from 'vue'

defineProps({
  variantBtn: { type: String, default() { return 'elevated' }},
  variantField: { type: String, default() { return 'solo' }}
})

const editor = inject('tiptapifyEditor') as Ref<Editor>
const { t } = useI18n()

const generateImageAttrs = () => ({
  src: '',
  alt: '',
  height: null,
  width: null
})

const attrs = ref(generateImageAttrs())

const dialog = ref(null)

const isDisabled = computed(() => {
  const { src } = attrs.value
  return !src
})

function apply() {
  let { src, alt, width, height } = attrs.value

  const imageOptions: { src: string, alt: string, width?: number, height?: number} = {
    src,
    alt
  }

  if (width) {
    imageOptions.width = width
  }

  if (height) {
    imageOptions.height = height
  }

  if (src) {
    editor.value.chain().focus().setImage(imageOptions).run()
  }

  close()
}

function clear() {
  editor.value.commands.deleteSelection()

  close()
}

function close() {
  dialog.value.close()

  attrs.value = generateImageAttrs()
}

const showTiptapifyImage = (event: CustomEvent) => {
  attrs.value.src = event.detail.image?.src
  attrs.value.alt = event.detail.image?.alt
  attrs.value.width = event.detail.image?.width
  attrs.value.height = event.detail.image?.height

  dialog.value.open()
}

onMounted(() => {
  window.addEventListener('tiptapify-show-tiptapifyImage', showTiptapifyImage as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('tiptapify-show-tiptapifyImage', showTiptapifyImage as EventListener)
})
</script>

<template>
  <Dialog ref="dialog" module="image" :max-width="800">
    <template #content>
      <VCardText>
        <VRow>
          <VCol cols="12">
            <VTextField v-model="attrs.src" density="compact" variant="outlined" :label="t('dialog.image.src')" />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField v-model="attrs.alt" density="compact" variant="outlined" :label="t('dialog.image.alt')" />
          </VCol>

          <VCol cols="12" md="3">
            <VTextField v-model="attrs.width" type="number" density="compact" variant="outlined" :precision="0" :min="1" :label="t('dialog.image.width')" />
          </VCol>

          <VCol cols="12" md="3">
            <VTextField v-model="attrs.height" type="number" density="compact" variant="outlined" :precision="0" :min="1" :label="t('dialog.image.height')" />
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
  </Dialog>
</template>