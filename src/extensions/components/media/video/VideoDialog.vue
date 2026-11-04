<script setup lang="ts">

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import TiptapifyDialog from '@tiptapify/components/UI/TiptapifyDialog.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { useTiptapifyUpload } from '@tiptapify/composables/useTiptapifyUpload'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import { ratioOf, resizeSide, toSize } from '@tiptapify/utils/mediaSize'
import { applyVideoNode } from '@tiptapify/extensions/components/media/video'
import {
  formatTimecode,
  isVideoFileWithoutProtocol,
  parseTimecode,
  parseVideoUrl,
  VideoNodeContent,
  VideoSize,
} from '@tiptapify/extensions/components/media/video/providers'

import { computed, inject, onMounted, onUnmounted, reactive, Ref, ref, useId, useTemplateRef, watch } from 'vue'
import { ComposerTranslation } from 'vue-i18n'

type Source = 'url' | 'upload'
type SizeMode = 'responsive' | 'custom'

const { variantBtn } = useTiptapifyConfig()
// A video file needs the upload prop; a poster without it is embedded as base64
const { canUploadVideo: canUpload, uploadFile } = useTiptapifyUpload()

const editor = inject('tiptapifyEditor') as Ref<Editor>
const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const dialog = useTemplateRef('dialog')
const videoInput = useTemplateRef<HTMLInputElement>('videoInput')
const posterInput = useTemplateRef<HTMLInputElement>('posterInput')
const startId = useId()

const generateForm = () => ({
  source: 'url' as Source,
  url: '',
  start: '',
  sizeMode: 'responsive' as SizeMode,
  width: null as number | string | null,
  height: null as number | string | null,
  poster: '' as string | null,
  controls: true,
  autoplay: false,
  loop: false,
})

const generateFile = () => ({
  src: '',
  name: '',
  size: 0,
  progress: 0,
  uploading: false,
  error: '',
})

const form = ref(generateForm())
// The video file: `src` is set once its upload is done (or by the edited node)
const file = reactive(generateFile())
const poster = reactive({ uploading: false, error: '' })
// Field errors show once the field was left or the form submitted, not while typing
const touched = reactive({ url: false, start: false, size: false })
const applyError = ref('')
const edited = ref<VideoNodeContent | null>(null)

let videoUpload: AbortController | null = null
let posterUpload: AbortController | null = null

const isEdit = computed(() => edited.value !== null)
// An edited video file keeps its tab even when the editor takes no uploads
const showUpload = computed(() => canUpload.value || edited.value?.type === 'video')
const isUpload = computed(() => showUpload.value && form.value.source === 'upload')

const link = computed(() => parseVideoUrl(form.value.url))
// A link straight to a video file: the browser's own player, with the options of an uploaded file
const isFileLink = computed(() => !isUpload.value && link.value?.provider.nodeType === 'video')
const hasFileOptions = computed(() => isUpload.value || isFileLink.value)
const supportsStart = computed(() => isUpload.value || !!link.value?.provider.supportsStart)
const startSeconds = computed(() => parseTimecode(form.value.start))

const urlError = computed(() => {
  if (isUpload.value || !touched.url) {
    return ''
  }

  if (!form.value.url.trim()) {
    return t('dialog.video.url_required')
  }

  if (link.value) {
    return ''
  }

  return t(isVideoFileWithoutProtocol(form.value.url) ? 'dialog.video.url_file_protocol' : 'dialog.video.url_unsupported')
})

const startError = computed(() => (
  touched.start && supportsStart.value && startSeconds.value === null ? t('dialog.video.start_invalid') : ''
))

const widthError = computed(() => (
  touched.size && form.value.sizeMode === 'custom' && !toSize(form.value.width) ? t('dialog.video.size_invalid') : ''
))

const heightError = computed(() => {
  const { sizeMode, height } = form.value
  const filled = String(height ?? '').trim() !== ''

  return touched.size && sizeMode === 'custom' && filled && !toSize(height) ? t('dialog.video.size_invalid') : ''
})

const previewUrl = computed(() => {
  if (!link.value) {
    return ''
  }

  const start = supportsStart.value ? (startSeconds.value ?? link.value.start) : 0

  return link.value.provider.embedUrl(link.value.id, start)
})

const sizeModes = computed(() => [
  { value: 'responsive', label: t(hasFileOptions.value ? 'dialog.video.size_responsive' : 'dialog.video.size_responsive_embed') },
  { value: 'custom', label: t('dialog.video.size_custom') },
])

const progressLabel = computed(() => t('dialog.video.upload_progress', {
  loaded: megabytes(file.size * file.progress),
  total: megabytes(file.size),
}))

const canSubmit = computed(() => {
  if (isUpload.value) {
    return !!file.src && !file.uploading && !poster.uploading
  }

  return !!form.value.url.trim()
})

watch(link, (current, previous) => {
  if (current?.start && current.start !== previous?.start) {
    form.value.start = formatTimecode(current.start)
  }
})

function megabytes(bytes: number): string {
  const value = bytes / 1024 / 1024

  return value < 10 ? value.toFixed(1) : String(Math.round(value))
}

function fileName(src: string): string {
  const name = src.split(/[?#]/)[0].split('/').pop() || src

  try {
    return decodeURIComponent(name)
  } catch {
    return name
  }
}

// The custom size keeps its ratio while locked: the ratio of the size being edited, else of the uploaded
// file itself, else 16:9 of the embedded players
const keepRatio = ref(true)
const ratio = ref(16 / 9)
const fileRatio = ref<number | null>(null)

function selectSizeMode(mode: SizeMode) {
  form.value.sizeMode = mode

  if (mode === 'custom' && !toSize(form.value.width)) {
    ratio.value = (hasFileOptions.value && fileRatio.value) || 16 / 9
    form.value.width = 640
    form.value.height = toSize(640 / ratio.value)
  }
}

function resize(side: 'width' | 'height', value: unknown) {
  const current = { width: toSize(form.value.width), height: toSize(form.value.height) }
  Object.assign(form.value, resizeSide(current, side, value, keepRatio.value ? ratio.value : null))
}

function toggleKeepRatio() {
  keepRatio.value = !keepRatio.value

  if (keepRatio.value) {
    ratio.value = ratioOf({ width: toSize(form.value.width), height: toSize(form.value.height) }, ratio.value)
  }
}

function readFileRatio(src: string, isCurrent: () => boolean) {
  const probe = document.createElement('video')
  probe.preload = 'metadata'
  probe.onloadedmetadata = () => {
    if (isCurrent() && probe.videoWidth && probe.videoHeight) {
      fileRatio.value = probe.videoWidth / probe.videoHeight
    }
  }
  probe.src = src
}

watch(() => (isFileLink.value ? link.value!.id : ''), (src) => {
  fileRatio.value = null
  if (src) {
    readFileRatio(src, () => isFileLink.value && link.value?.id === src)
  }
})

function size(embed: boolean): VideoSize {
  if (form.value.sizeMode === 'responsive') {
    return { width: null, height: null }
  }

  const width = toSize(form.value.width)
  // A player without a height is 150px tall: an embed gets a 16:9 one
  const height = toSize(form.value.height) ?? (embed && width ? Math.round(width * 9 / 16) : null)

  return { width, height }
}

function videoContent(): VideoNodeContent | null {
  Object.assign(touched, { url: true, start: true, size: true })

  if (startError.value || widthError.value || heightError.value) {
    return null
  }

  const start = startSeconds.value ?? 0

  const { controls, autoplay, loop } = form.value
  const fileOptions = { poster: form.value.poster?.trim() || null, controls, autoplay, loop }

  if (!isUpload.value) {
    if (!link.value || poster.uploading) {
      return null
    }

    const content = link.value.provider.toNode(link.value.id, supportsStart.value ? start : 0, size(!isFileLink.value))

    return isFileLink.value ? { ...content, attrs: { ...content.attrs, ...fileOptions } } : content
  }

  if (!file.src || file.uploading || poster.uploading) {
    return null
  }

  return { type: 'video', attrs: { src: file.src, start, ...fileOptions, ...size(false) } }
}

function apply() {
  applyError.value = ''

  const content = videoContent()

  if (!content) {
    return
  }

  if (!applyVideoNode(editor.value, content, edited.value)) {
    applyError.value = t('dialog.video.apply_failed')

    return
  }

  close()
}

function remove() {
  editor.value.chain().focus().deleteSelection().run()

  close()
}

function close() {
  dialog.value?.close()
}

function cancelVideoUpload() {
  videoUpload?.abort()
  videoUpload = null
  Object.assign(file, generateFile())
}

function cancelPosterUpload() {
  posterUpload?.abort()
  posterUpload = null
  poster.uploading = false
}

function reset() {
  cancelVideoUpload()
  cancelPosterUpload()

  form.value = generateForm()
  poster.error = ''
  Object.assign(touched, { url: false, start: false, size: false })
  applyError.value = ''
  edited.value = null
  keepRatio.value = true
  ratio.value = 16 / 9
  fileRatio.value = null
}

function pickedFile(event: Event): File | null {
  const input = event.target as HTMLInputElement
  const picked = input.files?.[0] ?? null

  // Picking the same file again (after a cancel) must fire `change` again
  input.value = ''

  return picked
}

function uploadErrorMessage(error: unknown): string {
  return error instanceof Error && error.message ? error.message : t('dialog.video.upload_failed')
}

async function uploadVideo(event: Event) {
  const picked = pickedFile(event)

  if (!picked || !canUpload.value) {
    return
  }

  cancelVideoUpload()

  const controller = new AbortController()
  videoUpload = controller
  Object.assign(file, { name: picked.name, size: picked.size, uploading: true })
  fileRatio.value = null

  // A canceled or replaced upload (another controller) leaves the form alone when it settles
  try {
    const { url } = await uploadFile(picked, {
      kind: 'video',
      onProgress: (fraction) => {
        if (videoUpload === controller) {
          file.progress = fraction
        }
      },
      signal: controller.signal,
    })

    if (videoUpload === controller) {
      file.src = url
      readFileRatio(url, () => file.src === url)
    }
  } catch (error) {
    // The endpoint's own message tells best what went wrong
    if (videoUpload === controller) {
      file.error = uploadErrorMessage(error)
    }
  } finally {
    if (videoUpload === controller) {
      videoUpload = null
      file.uploading = false
    }
  }
}

async function uploadPoster(event: Event) {
  const picked = pickedFile(event)

  if (!picked) {
    return
  }

  cancelPosterUpload()

  const controller = new AbortController()
  posterUpload = controller
  poster.uploading = true
  poster.error = ''

  try {
    const { url } = await uploadFile(picked, { kind: 'image', onProgress: () => {}, signal: controller.signal })

    if (posterUpload === controller) {
      form.value.poster = url
    }
  } catch (error) {
    if (posterUpload === controller) {
      poster.error = uploadErrorMessage(error)
    }
  } finally {
    if (posterUpload === controller) {
      posterUpload = null
      poster.uploading = false
    }
  }
}

function prefill(node: VideoNodeContent) {
  const { attrs } = node
  const width = toSize(attrs.width)

  edited.value = node

  Object.assign(form.value, {
    source: node.type === 'video' ? 'upload' : 'url',
    start: formatTimecode(Number(attrs.start) || 0),
    sizeMode: width ? 'custom' : 'responsive',
    width,
    height: toSize(attrs.height),
  })
  ratio.value = ratioOf({ width, height: toSize(attrs.height) }, 16 / 9)

  if (node.type !== 'video') {
    // A Vimeo player link carries its start (`#t=42s`), which the link watcher fills in
    form.value.url = String(attrs.src ?? '')

    return
  }

  Object.assign(form.value, {
    poster: String(attrs.poster ?? ''),
    controls: attrs.controls !== false,
    autoplay: !!attrs.autoplay,
    loop: !!attrs.loop,
  })

  // A video linked by its file address opens as that link; an uploaded one (an address without a
  // video extension, e.g. /media/123) opens on the upload tab
  const src = String(attrs.src ?? '')
  if (parseVideoUrl(src)?.provider.nodeType === 'video') {
    Object.assign(form.value, { source: 'url', url: src })

    return
  }

  file.src = src
  file.name = fileName(file.src)
}

const showTiptapifyVideo = (event: CustomEvent) => {
  if (event.detail.editorId !== editor.value.instanceId) {
    return
  }

  reset()

  if (event.detail.node) {
    prefill(event.detail.node)
  }

  dialog.value?.open()
}

onMounted(() => {
  window.addEventListener('tiptapify-show-tiptapifyVideo', showTiptapifyVideo as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('tiptapify-show-tiptapifyVideo', showTiptapifyVideo as EventListener)

  cancelVideoUpload()
  cancelPosterUpload()
})
</script>

<template>
  <TiptapifyDialog
    ref="dialog"
    module="video"
    :title="t(isEdit ? 'dialog.video.title_edit' : 'dialog.video.title_insert')"
    :max-width="560"
    @submit="apply"
    @closed="reset"
  >
    <template #content>
      <VCardText>
        <div class="tiptapify-video-dialog">
          <VBtnToggle
            v-if="showUpload"
            v-model="form.source"
            class="tiptapify-video-dialog__toggle"
            mandatory
            density="compact"
            variant="outlined"
            divided
          >
            <VBtn value="url" :prepend-icon="`mdiSvg:${mdi.mdiLinkVariant}`">
              {{ t('dialog.video.source_url') }}
            </VBtn>
            <VBtn value="upload" :prepend-icon="`mdiSvg:${mdi.mdiUpload}`">
              {{ t('dialog.video.source_upload') }}
            </VBtn>
          </VBtnToggle>

          <template v-if="!isUpload">
            <VTextField
              v-model="form.url"
              density="compact"
              variant="outlined"
              :label="t('dialog.video.url')"
              :error-messages="urlError"
              hide-details="auto"
              autofocus
              @blur="touched.url = true"
            >
              <template v-if="link" #append-inner>
                <VChip size="small" color="primary" variant="tonal" label>
                  {{ link.label }}
                </VChip>
              </template>
            </VTextField>

            <div class="tiptapify-video-dialog__preview">
              <video v-if="previewUrl && isFileLink" :src="previewUrl" controls preload="metadata" />
              <iframe
                v-else-if="previewUrl"
                :src="previewUrl"
                :title="t('dialog.video.preview')"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              />
              <div v-else class="tiptapify-video-dialog__placeholder text-body-2">
                <VIcon size="40" :icon="`mdiSvg:${mdi.mdiPlayBoxOutline}`" />
                {{ t('dialog.video.preview_empty') }}
              </div>
            </div>
          </template>

          <template v-else>
            <input ref="videoInput" type="file" accept="video/*" hidden @change="uploadVideo">

            <div v-if="file.uploading || file.src" class="tiptapify-video-dialog__file">
              <VIcon :icon="`mdiSvg:${mdi.mdiFileVideoOutline}`" />
              <div class="tiptapify-video-dialog__file-info">
                <div class="text-body-2 text-truncate">
                  {{ file.name }}
                </div>
                <template v-if="file.uploading">
                  <VProgressLinear :model-value="file.progress * 100" color="primary" height="4" rounded />
                  <div class="text-caption text-medium-emphasis">
                    {{ progressLabel }}
                  </div>
                </template>
              </div>
              <VBtn v-if="file.uploading" size="small" variant="text" @click="cancelVideoUpload">
                {{ t('dialog.cancel') }}
              </VBtn>
              <VBtn v-else-if="canUpload" size="small" variant="text" @click="videoInput?.click()">
                {{ t('dialog.video.upload_replace') }}
              </VBtn>
            </div>

            <VBtn
              v-else
              class="tiptapify-video-dialog__pick"
              variant="outlined"
              :prepend-icon="`mdiSvg:${mdi.mdiUpload}`"
              @click="videoInput?.click()"
            >
              {{ t('dialog.video.upload_choose') }}
            </VBtn>

            <div v-if="file.error" class="text-error text-body-2" role="alert">
              {{ file.error }}
            </div>
          </template>

          <template v-if="hasFileOptions">
            <div class="tiptapify-video-dialog__group" role="group" :aria-label="t('dialog.video.poster')">
              <div class="text-body-2 text-medium-emphasis">
                {{ t('dialog.video.poster') }}
              </div>
              <div class="tiptapify-video-dialog__poster">
                <input ref="posterInput" type="file" accept="image/*" hidden @change="uploadPoster">
                <button
                  type="button"
                  class="tiptapify-video-dialog__poster-tile"
                  :disabled="poster.uploading"
                  :aria-label="t('dialog.video.poster_choose')"
                  :style="form.poster ? { backgroundImage: `url(${JSON.stringify(form.poster)})` } : undefined"
                  @click="posterInput?.click()"
                >
                  <VProgressCircular v-if="poster.uploading" indeterminate size="20" width="2" />
                  <template v-else-if="!form.poster">
                    <VIcon size="20" :icon="`mdiSvg:${mdi.mdiImagePlusOutline}`" />
                    <span class="text-caption">{{ t('dialog.video.poster_choose') }}</span>
                  </template>
                </button>
                <VTextField
                  v-model="form.poster"
                  density="compact"
                  variant="outlined"
                  :label="t('dialog.video.poster_url')"
                  :hint="t('dialog.video.poster_hint')"
                  :error-messages="poster.error"
                  hide-details="auto"
                  clearable
                />
              </div>
            </div>

            <div class="tiptapify-video-dialog__options">
              <VCheckbox v-model="form.controls" :label="t('dialog.video.controls')" density="compact" hide-details />
              <VCheckbox v-model="form.autoplay" :label="t('dialog.video.autoplay')" density="compact" hide-details />
              <VCheckbox v-model="form.loop" :label="t('dialog.video.loop')" density="compact" hide-details />
            </div>
          </template>

          <div class="tiptapify-video-dialog__row">
            <div v-if="supportsStart" class="tiptapify-video-dialog__group tiptapify-video-dialog__start">
              <label class="text-body-2 text-medium-emphasis" :for="startId">
                {{ t('dialog.video.start') }}
              </label>
              <VTextField
                :id="startId"
                v-model="form.start"
                density="compact"
                variant="outlined"
                placeholder="0:00"
                :error-messages="startError"
                hide-details="auto"
                @blur="touched.start = true"
              />
            </div>

            <div class="tiptapify-video-dialog__group" role="group" :aria-label="t('dialog.video.size')">
              <div class="text-body-2 text-medium-emphasis">
                {{ t('dialog.video.size') }}
              </div>
              <VBtnToggle
                :model-value="form.sizeMode"
                class="tiptapify-video-dialog__toggle"
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
            </div>
          </div>

          <div v-if="form.sizeMode === 'custom'" class="tiptapify-video-dialog__size">
            <VTextField
              :model-value="form.width"
              type="number"
              min="1"
              density="compact"
              variant="outlined"
              suffix="px"
              :label="t('dialog.video.width')"
              :error-messages="widthError"
              hide-details="auto"
              @update:model-value="resize('width', $event)"
              @blur="touched.size = true"
            />
            <span class="text-medium-emphasis">×</span>
            <VTextField
              :model-value="form.height"
              type="number"
              min="1"
              density="compact"
              variant="outlined"
              suffix="px"
              :label="t('dialog.video.height')"
              :error-messages="heightError"
              hide-details="auto"
              @update:model-value="resize('height', $event)"
              @blur="touched.size = true"
            />
            <VBtn
              :color="keepRatio ? 'primary' : undefined"
              :variant="variantBtn"
              :aria-label="t('dialog.video.keep_ratio')"
              :aria-pressed="keepRatio"
              size="36"
              icon
              @click="toggleKeepRatio"
            >
              <VIcon size="20" :icon="keepRatio ? `mdiSvg:${mdi.mdiLock}` : `mdiSvg:${mdi.mdiLockOpenVariant}`" />
              <Tooltip :label="t('dialog.video.keep_ratio')" />
            </VBtn>
          </div>

          <div v-if="applyError" class="text-error text-body-2" role="alert">
            {{ applyError }}
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
            <VBtn type="submit" color="primary" :variant="variantBtn" :disabled="!canSubmit">
              {{ t(isEdit ? 'dialog.save' : 'dialog.insert') }}
            </VBtn>
          </div>
        </div>
      </VCardActions>
    </template>
  </TiptapifyDialog>
</template>

<style lang="scss" scoped>
.tiptapify-video-dialog,
.tiptapify-video-dialog__group {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.tiptapify-video-dialog {
  gap: 16px;
  padding-top: 8px;
}

.tiptapify-video-dialog__group {
  gap: 8px;
}

.tiptapify-video-dialog__toggle {
  align-self: flex-start;
  max-width: 100%;
}

.tiptapify-video-dialog__preview {
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  background: rgba(var(--v-theme-on-surface), 0.04);

  iframe,
  video {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }
}

.tiptapify-video-dialog__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 100%;
  padding: 16px;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  text-align: center;
}

.tiptapify-video-dialog__file {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
}

.tiptapify-video-dialog__file-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.tiptapify-video-dialog__pick {
  height: 64px !important;
  border-style: dashed;
  text-transform: none;
}

.tiptapify-video-dialog__poster {
  display: flex;
  align-items: flex-start;
  gap: 12px;

  > .v-text-field {
    flex: 1;
    min-width: 0;
  }
}

.tiptapify-video-dialog__poster-tile {
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 112px;
  aspect-ratio: 16 / 9;
  border: 1px dashed rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  background: rgba(var(--v-theme-on-surface), 0.04) center / cover no-repeat;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
}

.tiptapify-video-dialog__options {
  display: flex;
  flex-wrap: wrap;
  gap: 0 16px;
}

.tiptapify-video-dialog__row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px;
}

.tiptapify-video-dialog__start {
  flex: 0 0 120px;
}

.tiptapify-video-dialog__size {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
}
</style>
