<script setup lang="ts">

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import TiptapifyDialog from '@tiptapify/components/UI/TiptapifyDialog.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { useTiptapifyUpload } from '@tiptapify/composables/useTiptapifyUpload'
import { ImageAlign } from '@tiptapify/extensions/components/media/image/caption'
import {
  applyImage,
  ImageSize,
  ImageSizeMode,
  initialSizeMode,
  loadNaturalSize,
  NaturalSize,
  removeImage,
  resizeSide,
  sizeForMode,
  textColumnWidth,
  toSize,
} from '@tiptapify/extensions/components/media/image/imageDialog'

import { computed, inject, onMounted, onUnmounted, Ref, ref, useTemplateRef, watch } from 'vue'
import { ComposerTranslation } from 'vue-i18n'

// A centered image has no align
type ImagePosition = 'center' | ImageAlign

const { variantBtn } = useTiptapifyConfig()
// Without the upload prop a picked image is embedded as base64, so the Upload source is always there
const { canUploadImage: canUpload, uploadFile: storeFile } = useTiptapifyUpload()

const editor = inject('tiptapifyEditor') as Ref<Editor>
const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const dialog = useTemplateRef('dialog')

const generateForm = () => ({
  src: '',
  alt: '',
  title: '',
  position: 'center' as ImagePosition,
})

const form = ref(generateForm())
const isEdit = ref(false)
const source = ref<'url' | 'upload'>('url')
const applyError = ref('')

const sizeMode = ref<ImageSizeMode>('original')
const customSize = ref<ImageSize>({ width: null, height: null })
const keepRatio = ref(true)
// The ratio of the custom size, kept for an image whose natural size is unknown
const customRatio = ref<number | null>(null)
const textWidth = ref<number | null>(null)

const naturalSize = ref<NaturalSize | null>(null)
const previewFailed = ref(false)
// Drops a natural size that loads after the source changed again or the dialog closed
let naturalSizeRequest = 0

const pickedFile = ref<File | null>(null)
const uploadProgress = ref(0)
const uploading = ref(false)
const uploadError = ref('')
let uploadController: AbortController | null = null

const hasSource = computed(() => form.value.src.trim() !== '')
const altMissing = computed(() => form.value.alt.trim() === '')
const ratio = computed(() => (naturalSize.value ? naturalSize.value.width / naturalSize.value.height : customRatio.value))
const size = computed(() => (sizeMode.value === 'custom'
  ? customSize.value
  : sizeForMode(sizeMode.value, naturalSize.value, textWidth.value)))

const sizeModes = computed(() => [
  { value: 'original', label: t('dialog.image.size_original') },
  { value: 'text', label: t('dialog.image.size_text') },
  { value: 'custom', label: t('dialog.image.size_custom') },
])

const positions = computed(() => [
  { value: 'center', icon: mdi.mdiFormatFloatCenter, label: t('dialog.image.position_center') },
  { value: 'left', icon: mdi.mdiFormatFloatLeft, label: t('dialog.image.position_left') },
  { value: 'right', icon: mdi.mdiFormatFloatRight, label: t('dialog.image.position_right') },
])

watch(() => form.value.src.trim(), async (src) => {
  const request = ++naturalSizeRequest
  naturalSize.value = null
  previewFailed.value = false
  if (!src) {
    return
  }

  const loaded = await loadNaturalSize(src)
  if (request !== naturalSizeRequest) {
    return
  }

  naturalSize.value = loaded
  previewFailed.value = loaded === null
})

// Custom starts from the size the image had in the mode left
function selectSizeMode(mode: ImageSizeMode) {
  if (mode === 'custom' && sizeMode.value !== 'custom' && size.value.width) {
    customSize.value = { ...size.value }
    customRatio.value = size.value.height ? size.value.width / size.value.height : null
  }

  sizeMode.value = mode
}

function resize(side: keyof ImageSize, value: unknown) {
  customSize.value = resizeSide(customSize.value, side, value, keepRatio.value ? ratio.value : null)
}

function toggleKeepRatio() {
  keepRatio.value = !keepRatio.value

  const { width, height } = customSize.value
  if (keepRatio.value && width && height) {
    customRatio.value = width / height
  }
}

async function uploadFile(picked: File | File[] | null) {
  cancelUpload()

  const file = (Array.isArray(picked) ? picked[0] : picked) ?? null
  pickedFile.value = file
  uploadError.value = ''
  if (!file) {
    return
  }

  const controller = new AbortController()
  uploadController = controller
  uploading.value = true
  uploadProgress.value = 0

  try {
    const { url } = await storeFile(file, {
      kind: 'image',
      onProgress: (fraction: number) => {
        if (uploadController === controller) {
          uploadProgress.value = fraction
        }
      },
      signal: controller.signal,
    })
    if (!controller.signal.aborted) {
      form.value.src = url
    }
  } catch (error) {
    // A cancelled upload is not an error; the host's own message tells best what went wrong
    if (!controller.signal.aborted) {
      uploadError.value = error instanceof Error && error.message ? error.message : t('dialog.image.upload_error')
    }
  } finally {
    if (uploadController === controller) {
      uploadController = null
      uploading.value = false
    }
  }
}

function cancelUpload() {
  uploadController?.abort()
  uploadController = null
  uploading.value = false
}

function apply() {
  // Enter in a field submits even while the submit button is disabled
  if (!hasSource.value) {
    return
  }

  const { src, alt, title, position } = form.value
  const applied = applyImage(editor.value, {
    src,
    alt,
    title,
    width: size.value.width,
    height: size.value.height,
    align: position === 'center' ? null : position,
  })
  if (!applied) {
    applyError.value = t('dialog.image.apply_error')

    return
  }

  close()
}

function remove() {
  if (!removeImage(editor.value)) {
    applyError.value = t('dialog.image.remove_error')

    return
  }

  close()
}

function close() {
  dialog.value?.close()
}

// The dialog closed in any way: its form starts over and a running upload stops
function reset() {
  cancelUpload()
  naturalSizeRequest++

  form.value = generateForm()
  isEdit.value = false
  source.value = 'url'
  applyError.value = ''
  sizeMode.value = 'original'
  customSize.value = { width: null, height: null }
  keepRatio.value = true
  customRatio.value = null
  naturalSize.value = null
  previewFailed.value = false
  pickedFile.value = null
  uploadProgress.value = 0
  uploadError.value = ''
}

const showTiptapifyImage = (event: CustomEvent) => {
  if (event.detail.editorId !== editor.value.instanceId) {
    return
  }

  const image: Record<string, unknown> | null = event.detail.image
  const width = toSize(image?.width)
  const height = toSize(image?.height)

  isEdit.value = image !== null
  form.value = {
    src: String(image?.src ?? ''),
    alt: String(image?.alt ?? ''),
    title: String(image?.title ?? ''),
    position: (image?.align as ImageAlign | null) ?? 'center',
  }
  sizeMode.value = initialSizeMode(image)
  customSize.value = { width, height }
  customRatio.value = width && height ? width / height : null
  textWidth.value = textColumnWidth(editor.value.view.dom)

  dialog.value?.open()
}

onMounted(() => {
  window.addEventListener('tiptapify-show-tiptapifyImage', showTiptapifyImage as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('tiptapify-show-tiptapifyImage', showTiptapifyImage as EventListener)
  cancelUpload()
})
</script>

<template>
  <TiptapifyDialog
    ref="dialog"
    module="image"
    :title="t(isEdit ? 'dialog.image.title_edit' : 'dialog.image.title_insert')"
    :max-width="720"
    @submit="apply"
    @closed="reset"
  >
    <template #content>
      <VCardText>
        <div class="tiptapify-image-dialog">
          <div class="tiptapify-image-dialog__aside">
            <div class="tiptapify-image-dialog__preview">
              <img v-if="hasSource && !previewFailed" :src="form.src" alt="">
              <VIcon v-else size="48" :icon="`mdiSvg:${mdi.mdiImageOutline}`" />
            </div>
            <div v-if="naturalSize" class="tiptapify-image-dialog__natural text-caption text-medium-emphasis">
              {{ t('dialog.image.original_size', naturalSize) }}
            </div>
          </div>

          <div class="tiptapify-image-dialog__fields">
            <VBtnToggle
              v-if="canUpload"
              v-model="source"
              class="tiptapify-image-dialog__toggle"
              mandatory
              density="compact"
              variant="outlined"
              divided
            >
              <VBtn value="url" :prepend-icon="`mdiSvg:${mdi.mdiLinkVariant}`">
                {{ t('dialog.image.source_url') }}
              </VBtn>
              <VBtn value="upload" :prepend-icon="`mdiSvg:${mdi.mdiUpload}`">
                {{ t('dialog.image.source_upload') }}
              </VBtn>
            </VBtnToggle>

            <div v-if="canUpload && source === 'upload'" class="tiptapify-image-dialog__upload">
              <VFileInput
                :model-value="pickedFile"
                accept="image/*"
                density="compact"
                variant="outlined"
                :label="t('dialog.image.upload_file')"
                prepend-icon=""
                :prepend-inner-icon="`mdiSvg:${mdi.mdiPaperclip}`"
                :error-messages="uploadError"
                hide-details="auto"
                @update:model-value="uploadFile"
              />
              <div v-if="uploading" class="tiptapify-image-dialog__progress">
                <VProgressLinear :model-value="uploadProgress * 100" color="primary" height="4" rounded />
                <VBtn size="small" variant="text" @click="cancelUpload">
                  {{ t('dialog.image.upload_cancel') }}
                </VBtn>
              </div>
            </div>
            <VTextField
              v-else
              v-model="form.src"
              density="compact"
              variant="outlined"
              :label="t('dialog.image.src')"
              hide-details="auto"
              autofocus
            />

            <VTextField
              v-model="form.alt"
              density="compact"
              variant="outlined"
              :label="t('dialog.image.alt_text')"
              :messages="altMissing ? [t('dialog.image.alt_missing')] : []"
              hide-details="auto"
            >
              <template #message="{ message }">
                <span class="text-warning">{{ message }}</span>
              </template>
            </VTextField>

            <VTextField
              v-model="form.title"
              density="compact"
              variant="outlined"
              :label="t('dialog.image.caption')"
              hide-details="auto"
            />

            <div class="tiptapify-image-dialog__group" role="group" :aria-label="t('dialog.image.size')">
              <div class="text-body-2 text-medium-emphasis">
                {{ t('dialog.image.size') }}
              </div>
              <VBtnToggle
                :model-value="sizeMode"
                class="tiptapify-image-dialog__toggle"
                mandatory
                density="compact"
                variant="outlined"
                divided
                @update:model-value="selectSizeMode"
              >
                <VBtn v-for="mode in sizeModes" :key="mode.value" :value="mode.value">
                  {{ mode.label }}
                </VBtn>
              </VBtnToggle>

              <div v-if="sizeMode === 'custom'" class="tiptapify-image-dialog__size">
                <VTextField
                  :model-value="customSize.width"
                  type="number"
                  min="1"
                  density="compact"
                  variant="outlined"
                  :label="t('dialog.image.width')"
                  hide-details
                  @update:model-value="resize('width', $event)"
                />
                <span class="text-medium-emphasis">×</span>
                <VTextField
                  :model-value="customSize.height"
                  type="number"
                  min="1"
                  density="compact"
                  variant="outlined"
                  :label="t('dialog.image.height')"
                  hide-details
                  @update:model-value="resize('height', $event)"
                />
                <VBtn
                  :color="keepRatio ? 'primary' : undefined"
                  :variant="variantBtn"
                  :aria-label="t('dialog.image.keep_ratio')"
                  :aria-pressed="keepRatio"
                  size="36"
                  icon
                  @click="toggleKeepRatio"
                >
                  <VIcon size="20" :icon="keepRatio ? `mdiSvg:${mdi.mdiLock}` : `mdiSvg:${mdi.mdiLockOpenVariant}`" />
                  <Tooltip :label="t('dialog.image.keep_ratio')" />
                </VBtn>
              </div>
            </div>

            <div class="tiptapify-image-dialog__group" role="group" :aria-label="t('dialog.image.position')">
              <div class="text-body-2 text-medium-emphasis">
                {{ t('dialog.image.position') }}
              </div>
              <VBtnToggle
                v-model="form.position"
                class="tiptapify-image-dialog__toggle"
                mandatory
                density="compact"
                variant="outlined"
                divided
              >
                <VBtn
                  v-for="position in positions"
                  :key="position.value"
                  :value="position.value"
                  :prepend-icon="`mdiSvg:${position.icon}`"
                >
                  {{ position.label }}
                </VBtn>
              </VBtnToggle>
            </div>

            <div v-if="applyError" class="text-error text-body-2" role="alert">
              {{ applyError }}
            </div>
          </div>
        </div>
      </VCardText>
    </template>

    <template #actions>
      <VCardActions>
        <div class="tiptapify-dialog-actions">
          <div class="tiptapify-dialog-actions__start">
            <VBtn v-if="isEdit" color="error" :variant="variantBtn" @click="remove">
              {{ t('dialog.remove') }}
            </VBtn>
          </div>
          <div class="tiptapify-dialog-actions__end">
            <VBtn :variant="variantBtn" @click="close">
              {{ t('dialog.cancel') }}
            </VBtn>
            <VBtn type="submit" color="primary" :variant="variantBtn" :disabled="!hasSource">
              {{ t(isEdit ? 'dialog.save' : 'dialog.insert') }}
            </VBtn>
          </div>
        </div>
      </VCardActions>
    </template>
  </TiptapifyDialog>
</template>

<style lang="scss" scoped>
.tiptapify-image-dialog {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 24px;
  padding-top: 8px;

  @media (max-width: 600px) {
    grid-template-columns: minmax(0, 1fr);
  }
}

.tiptapify-image-dialog__preview {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  overflow: hidden;
  border-radius: 8px;
  background: rgba(var(--v-theme-on-surface), 0.04);
  color: rgba(var(--v-theme-on-surface), var(--v-disabled-opacity));

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.tiptapify-image-dialog__natural {
  margin-top: 8px;
  text-align: center;
}

.tiptapify-image-dialog__fields,
.tiptapify-image-dialog__upload,
.tiptapify-image-dialog__group {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.tiptapify-image-dialog__fields {
  gap: 16px;
}

.tiptapify-image-dialog__upload,
.tiptapify-image-dialog__group {
  gap: 8px;
}

.tiptapify-image-dialog__toggle {
  align-self: flex-start;
  max-width: 100%;
}

.tiptapify-image-dialog__progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tiptapify-image-dialog__size {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}
</style>
