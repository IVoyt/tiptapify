<script setup lang="ts">

import * as mdi from '@mdi/js'
import { Editor } from "@tiptap/vue-3";

import { useI18n } from 'vue-i18n'
import { computed, inject, onMounted, onUnmounted, Ref, ref } from 'vue'

import helpers from '@tiptapify/utils/helpers'

defineProps({
  variantBtn: { type: String, default() { return 'elevated' }},
  variantField: { type: String, default() { return 'solo' }}
})

const { ucFirst } = helpers

const editor = inject('tiptapifyEditor') as Ref<Editor>
const { t } = useI18n()

const generateImageAttrs = () => ({
  src: '',
  alt: '',
  height: null,
  width: null
})

const attrs = ref(generateImageAttrs())

const dialog = ref<boolean>(false)

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
  dialog.value = false

  attrs.value = generateImageAttrs()
}

const showTiptapifyImage = (event: CustomEvent) => {
  attrs.value.src = event.detail.image?.src
  attrs.value.alt = event.detail.image?.alt
  attrs.value.width = event.detail.image?.width
  attrs.value.height = event.detail.image?.height

  dialog.value = true;
}

onMounted(() => {
  window.addEventListener('tiptapify-show-tiptapifyImage', showTiptapifyImage as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('tiptapify-show-tiptapifyImage', showTiptapifyImage as EventListener)
})
</script>

<template>
  <VDialog v-model="dialog" max-width="800" absolute @click:outside="close">
    <VCard>
      <VToolbar class="px-6" density="compact">
        <span class="headline">{{ ucFirst(t('dialog.image.title')) }}</span>

        <VSpacer />

        <VBtn class="mx-0" icon @click="close">
          <VIcon :icon="mdi.mdiClose" />
        </VBtn>
      </VToolbar>

      <VCardText>
        <VRow>
          <VCol cols="12">
            <VTextField v-model="attrs.src" :variant="variantField" :label="ucFirst(t('dialog.image.src'))" />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField v-model="attrs.alt" :variant="variantField" :label="ucFirst(t('dialog.image.alt'))" />
          </VCol>

          <VCol cols="12" md="3">
            <VTextField v-model="attrs.width" type="number" :variant="variantField" :precision="0" :min="1" :label="ucFirst(t('dialog.image.width'))" />
          </VCol>

          <VCol cols="12" md="3">
            <VTextField v-model="attrs.height" type="number" :variant="variantField" :precision="0" :min="1" :label="ucFirst(t('dialog.image.height'))" />
          </VCol>
        </VRow>
      </VCardText>

      <VCardActions>
        <VRow>
          <VCol class="d-flex justify-start">
            <VBtn color="warning" v-if="editor.isActive('image')" :variant="variantBtn" :disabled="isDisabled" @click="clear">
              {{ ucFirst(t('dialog.clear')) }}
            </VBtn>
          </VCol>
          <VCol class="d-flex justify-end">
            <VBtn :variant="variantBtn" @click="close" class="mr-2">
              {{ ucFirst(t('dialog.close')) }}
            </VBtn>
            <VBtn color="primary" :variant="variantBtn" :disabled="isDisabled" @click="apply">
              {{ ucFirst(t('dialog.apply')) }}
            </VBtn>
          </VCol>
        </VRow>
      </VCardActions>
    </VCard>
  </VDialog>
</template>