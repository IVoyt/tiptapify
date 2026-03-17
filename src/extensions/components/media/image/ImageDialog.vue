<script setup lang="ts">

import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import TiptapifyDialog from "@tiptapify/components/UI/TiptapifyDialog.vue";
import defaults from "@tiptapify/constants/defaults";

import { computed, inject, onMounted, onUnmounted, Ref, ref } from 'vue'

defineProps({
  variantBtn: { type: String, default() { return defaults.variantBtn }},
  variantField: { type: String, default() { return defaults.variantField }}
})

const editor = inject('tiptapifyEditor') as Ref<Editor>
const { t } = inject('tiptapifyI18n') as any

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

const keepRatio = ref(true)
const ratio = ref(null)
function setRatio(force: boolean = false) {
  if (!keepRatio.value && !force) {
    return
  }

  if ((!ratio.value || force) && attrs.value.width && attrs.value.height) {
    ratio.value = parseFloat(attrs.value.width / attrs.value.height).toFixed(4)
  }
}
function updateSizeRatio(dim: string) {
  if (!ratio.value || !attrs.value.width || !attrs.value.height) {
    return
  }

  if (!keepRatio.value) {
    setRatio(true)
    return
  }

  const source = dim.toLowerCase()
  const sizeRatio = source === 'width'
    ? (attrs.value.width / ratio.value)
    : (attrs.value.height * ratio.value)

  const target = source === 'width' ? 'height' : 'width'

  attrs.value[target] = parseFloat(sizeRatio).toFixed(0)
}

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
  ratio.value = null
}

const showTiptapifyImage = (event: CustomEvent) => {
  if (event.detail.editorId !== editor.value.instanceId) {
    return
  }

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
  <TiptapifyDialog ref="dialog" module="image" :max-width="800">
    <template #content>
      <VCardText>
        <VRow>
          <VCol cols="12">
            <VTextField v-model="attrs.src" density="compact" variant="outlined" :label="t('dialog.image.src')" />
          </VCol>

          <VCol cols="12" md="5">
            <VTextField v-model="attrs.alt" density="compact" variant="outlined" :label="t('dialog.image.alt')" />
          </VCol>

          <VCol cols="5" md="3">
            <VTextField
                v-model="attrs.width"
                type="number"
                density="compact"
                variant="outlined"
                :precision="0"
                :min="1"
                :label="t('dialog.image.width')"
                @change="setRatio"
                @update:model-value="updateSizeRatio('width')"
            />
          </VCol>

          <VCol cols="5" md="3">
            <VTextField
                v-model="attrs.height"
                type="number"
                density="compact"
                variant="outlined"
                :precision="0"
                :min="1"
                :label="t('dialog.image.height')"
                @change="setRatio"
                @update:model-value="updateSizeRatio('height')"
            />
          </VCol>

          <VCol cols="2" md="1">
            <VBtn size="40" :variant="variantBtn" v-model="keepRatio" @click="keepRatio = !keepRatio">
              <VIcon :icon="keepRatio ? `mdiSvg:${mdi.mdiLock}` : `mdiSvg:${mdi.mdiLockOpen}`" />
              <VTooltip activator="parent">
                {{ t('dialog.image.keep_ratio') }}
              </VTooltip>
            </VBtn>
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