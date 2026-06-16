<script setup lang="ts">

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import TiptapifyDialog from '@tiptapify/components/UI/TiptapifyDialog.vue'
import defaults from '@tiptapify/constants/defaults'

import { computed, inject, onMounted, onUnmounted, Ref, ref } from 'vue'

defineProps({
  variantBtn: { type: String, default() { return defaults.variantBtn } },
  variantField: { type: String, default() { return defaults.variantField } }
})

const editor = inject('tiptapifyEditor') as Ref<Editor>
const { t } = inject('tiptapifyI18n') as any

const generateImageAttrs = () => ({
  src: '',
  alt: '',
  title: null,
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
  let { src, alt, title, width, height } = attrs.value

  const imageOptions: { src: string, alt: string, title?: string, width?: number, height?: number} = {
    src,
    alt
  }

  if (title) {
    imageOptions.title = title
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
  attrs.value.title = event.detail.image?.title
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
        <div class="tiptapify-grid-row">
          <div>
            <VTextField v-model="attrs.src" density="comfortable" :label="t('dialog.image.src')" />
          </div>
        </div>

        <div class="tiptapify-grid-row">
          <div>
            <VTextField
              v-model="attrs.alt"
              density="comfortable"
              :label="t('dialog.image.alt')"
            />
          </div>
        </div>

        <div class="tiptapify-grid-row">
          <div>
            <VTextField
              v-model="attrs.title"
              density="comfortable"
              :label="t('dialog.image.title')"
            />
          </div>
        </div>

        <div class="tiptapify-grid-row">
          <div class="tiptapify-image-inputs-container">
            <VTextField
              v-model="attrs.width"
              type="number"
              density="comfortable"
              :precision="0"
              :min="1"
              :label="t('dialog.image.width')"
              @change="setRatio"
              @update:model-value="updateSizeRatio('width')"
            />
            <VTextField
              v-model="attrs.height"
              type="number"
              density="comfortable"
              :precision="0"
              :min="1"
              :label="t('dialog.image.height')"
              @change="setRatio"
              @update:model-value="updateSizeRatio('height')"
            />
          </div>
          <div>
            <VBtn
              v-model="keepRatio"
              :color="keepRatio ? 'primary' : 'secondary'"
              size="48"
              :variant="variantBtn"
              @click="keepRatio = !keepRatio"
            >
              <VIcon :icon="keepRatio ? `mdiSvg:${mdi.mdiLock}` : `mdiSvg:${mdi.mdiLockOpenVariant}`" />
              <VTooltip activator="parent">
                {{ t('dialog.image.keep_ratio') }}
              </VTooltip>
            </VBtn>
          </div>
        </div>
      </VCardText>
    </template>

    <template #actions>
      <VCardActions>
        <VRow>
          <VCol class="d-flex justify-start">
            <VBtn v-if="editor.isActive('image')" color="warning" :variant="variantBtn" :disabled="isDisabled" @click="clear">
              {{ t('dialog.clear') }}
            </VBtn>
          </VCol>
          <VCol class="d-flex justify-end">
            <VBtn :variant="variantBtn" class="mr-2" @click="close">
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

<style lang="scss" scoped>
.tiptapify-grid-row {
  margin-top: 8px;
  gap: 16px;
  display: grid;
  grid-template-columns: 9fr 1fr;
  justify-items: end;

  :nth-child(1) {
    width: 100%;
  }

  .tiptapify-image-inputs-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
}
</style>