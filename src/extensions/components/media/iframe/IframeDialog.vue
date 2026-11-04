<script setup lang="ts">

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import TiptapifyDialog from '@tiptapify/components/UI/TiptapifyDialog.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import {
  IframeAttrs,
  IframeSizeMode,
  parsedFields,
  parseEmbedInput,
  ParsedIframe,
  ratioPresets,
  sizeFromAttrs,
  sizeToAttrs,
  srcError,
} from '@tiptapify/extensions/components/media/iframe/embed'
import { MediaSize, ratioOf, resizeSide, toSize } from '@tiptapify/utils/mediaSize'

import { computed, inject, onMounted, onUnmounted, reactive, Ref, ref, useTemplateRef, watch } from 'vue'
import { ComposerTranslation } from 'vue-i18n'

const { variantBtn } = useTiptapifyConfig()

const editor = inject('tiptapifyEditor') as Ref<Editor>
const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const dialog = useTemplateRef('dialog')

// The preview runs the embedded page, but keeps it from navigating the editor's page
const previewSandbox = 'allow-scripts allow-same-origin allow-popups allow-presentation allow-forms'

const generateForm = () => ({
  input: '',
  title: '',
  sizeMode: 'responsive' as IframeSizeMode,
  width: null as number | string | null,
  height: null as number | string | null,
  name: '',
  allow: '',
  sandbox: '',
  lazy: true,
  border: false,
  allowfullscreen: true,
})

const form = ref(generateForm())
// The size the embed code or the edited iframe has: the proportions of the responsive size
const known = ref<MediaSize>({ width: null, height: null })
// Field errors of a typed address show once the field was left or the form submitted, not while typing
const touched = reactive({ input: false, size: false })
const advancedOpen = ref(false)
const applyError = ref('')
const edited = ref<IframeAttrs | null>(null)

const isEdit = computed(() => edited.value !== null)

const embed = computed(() => parseEmbedInput(form.value.input))
const parsedIframe = computed(() => (embed.value.kind === 'code' ? embed.value.iframe : null))

const src = computed(() => {
  if (embed.value.kind === 'url') {
    return embed.value.src
  }

  return parsedIframe.value?.src ?? ''
})

const isValidSrc = computed(() => embed.value.kind !== 'invalid_code' && srcError(src.value) === null)

const inputError = computed(() => {
  const { kind } = embed.value

  if (kind === 'invalid_code') {
    return t('dialog.iframe.code_invalid')
  }

  // A pasted code is checked at once; a typed address once it is done
  if (kind !== 'code' && !touched.input) {
    return ''
  }

  const error = srcError(src.value)

  return error ? t(`dialog.iframe.src_${error}`) : ''
})

const parsedSummary = computed(() => {
  if (!parsedIframe.value || !isValidSrc.value) {
    return ''
  }

  const fields = parsedFields(parsedIframe.value).map(({ key, params }) => t(`dialog.iframe.${key}`, params ?? {}))

  return t('dialog.iframe.code_parsed', { fields: fields.join(', ') })
})

const titleMissing = computed(() => form.value.title.trim() === '')

const sizeModes = computed(() => [
  { value: 'responsive', label: t('dialog.iframe.size_responsive') },
  ...ratioPresets.map(ratio => ({ value: ratio, label: ratio })),
  { value: 'custom', label: t('dialog.iframe.size_custom') },
])

const responsiveHint = computed(() => {
  const { width, height } = known.value

  return t('dialog.iframe.size_responsive_hint', { ratio: width && height ? `${width} × ${height}` : '16:9' })
})

const widthError = computed(() => (
  touched.size && form.value.sizeMode === 'custom' && !toSize(form.value.width) ? t('dialog.iframe.size_invalid') : ''
))

const heightError = computed(() => (
  touched.size && form.value.sizeMode === 'custom' && !toSize(form.value.height) ? t('dialog.iframe.size_invalid') : ''
))

// A pasted code fills the fields it has; it is read again only when it changes, not on every key
watch(() => JSON.stringify(parsedIframe.value), () => {
  if (parsedIframe.value) {
    fillFromCode(parsedIframe.value)
  }
})

function fillFromCode(iframe: ParsedIframe) {
  const { title, name, allow, sandbox, loading, border, width, height } = iframe

  Object.assign(form.value, {
    ...(title && { title }),
    ...(name && { name }),
    ...(allow && { allow }),
    ...(sandbox !== undefined && { sandbox }),
    ...(loading && { lazy: loading === 'lazy' }),
    ...(border !== undefined && { border }),
    allowfullscreen: !!iframe.allowfullscreen,
  })

  if (width && height) {
    known.value = { width, height }
  }

  if (name || allow || sandbox !== undefined) {
    advancedOpen.value = true
  }
}

// The custom size keeps its ratio while locked: the ratio of the code's or the edited size, else 16:9
const keepRatio = ref(true)
const ratio = ref(16 / 9)

function selectSizeMode(mode: IframeSizeMode) {
  form.value.sizeMode = mode

  if (mode === 'custom' && !toSize(form.value.width)) {
    const { width, height } = known.value.width && known.value.height ? known.value : { width: 640, height: 360 }

    Object.assign(form.value, { width, height })
    ratio.value = ratioOf({ width, height }, 16 / 9)
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

function text(value: string): string | null {
  return value.trim() || null
}

function iframeAttrs(): IframeAttrs | null {
  Object.assign(touched, { input: true, size: true })

  if (!isValidSrc.value || widthError.value || heightError.value) {
    return null
  }

  const { title, name, allow, sandbox, lazy, border, allowfullscreen, sizeMode, width, height } = form.value

  return {
    src: src.value,
    title: text(title),
    name: text(name),
    allow: text(allow),
    sandbox: text(sandbox),
    loading: lazy ? 'lazy' : null,
    allowfullscreen,
    border,
    ...sizeToAttrs(sizeMode, { width: toSize(width), height: toSize(height) }, known.value),
  }
}

function apply() {
  applyError.value = ''

  const attrs = iframeAttrs()

  if (!attrs) {
    return
  }

  const chain = editor.value.chain().focus()
  const done = isEdit.value ? chain.updateAttributes('iframe', attrs).run() : chain.setIframe(attrs).run()

  if (!done) {
    applyError.value = t('dialog.iframe.apply_failed')

    return
  }

  close()
}

// Enter submits; a pasted code keeps its line breaks
function submitOnEnter(event: KeyboardEvent) {
  event.preventDefault()
  ;(event.target as HTMLElement).closest('form')?.requestSubmit()
}

function remove() {
  editor.value.chain().focus().deleteSelection().run()

  close()
}

function close() {
  dialog.value?.close()
}

function reset() {
  form.value = generateForm()
  known.value = { width: null, height: null }
  Object.assign(touched, { input: false, size: false })
  advancedOpen.value = false
  applyError.value = ''
  edited.value = null
  keepRatio.value = true
  ratio.value = 16 / 9
}

function prefill(node: IframeAttrs) {
  const size = sizeFromAttrs(node)

  edited.value = node

  Object.assign(form.value, {
    input: String(node.src ?? ''),
    title: node.title ?? '',
    name: node.name ?? '',
    allow: node.allow ?? '',
    sandbox: node.sandbox ?? '',
    lazy: node.loading === 'lazy',
    border: !!node.border,
    allowfullscreen: node.allowfullscreen !== false,
    sizeMode: size.mode,
    width: size.width,
    height: size.height,
  })
  known.value = size.width && size.height ? { width: size.width, height: size.height } : { width: null, height: null }
  ratio.value = ratioOf(size, 16 / 9)
  advancedOpen.value = !!(node.name || node.allow || node.sandbox !== null)
}

const showIframe = (event: CustomEvent) => {
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
  window.addEventListener('tiptapify-show-iframe', showIframe as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('tiptapify-show-iframe', showIframe as EventListener)
})
</script>

<template>
  <TiptapifyDialog
    ref="dialog"
    module="iframe"
    :title="t(isEdit ? 'dialog.iframe.title_edit' : 'dialog.iframe.title_insert')"
    :max-width="600"
    @submit="apply"
    @closed="reset"
  >
    <template #content>
      <VCardText>
        <div class="tiptapify-iframe-dialog">
          <VTextarea
            v-model="form.input"
            class="tiptapify-iframe-dialog__input"
            rows="2"
            density="compact"
            variant="outlined"
            spellcheck="false"
            :label="t('dialog.iframe.input')"
            :hint="parsedSummary ? undefined : t('dialog.iframe.input_hint')"
            :messages="parsedSummary ? [parsedSummary] : []"
            :error-messages="inputError"
            hide-details="auto"
            autofocus
            @blur="touched.input = true"
            @keydown.enter.exact="submitOnEnter"
          />

          <div class="tiptapify-iframe-dialog__preview">
            <iframe
              v-if="isValidSrc"
              :src="src"
              :title="t('dialog.iframe.preview')"
              :sandbox="previewSandbox"
              referrerpolicy="strict-origin-when-cross-origin"
            />
            <div v-else class="tiptapify-iframe-dialog__placeholder text-body-2">
              <VIcon size="40" :icon="`mdiSvg:${mdi.mdiApplicationOutline}`" />
              {{ t('dialog.iframe.preview_empty') }}
            </div>
          </div>

          <VTextField
            v-model="form.title"
            density="compact"
            variant="outlined"
            :label="t('dialog.iframe.title_text')"
            :messages="titleMissing ? [t('dialog.iframe.title_missing')] : []"
            hide-details="auto"
          >
            <template #message="{ message }">
              <span class="text-warning">{{ message }}</span>
            </template>
          </VTextField>

          <div class="tiptapify-iframe-dialog__group" role="group" :aria-label="t('dialog.iframe.size')">
            <div class="text-body-2 text-medium-emphasis">
              {{ t('dialog.iframe.size') }}
            </div>
            <VBtnToggle
              :model-value="form.sizeMode"
              class="tiptapify-iframe-dialog__toggle"
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
            <div v-if="form.sizeMode === 'responsive'" class="text-caption text-medium-emphasis">
              {{ responsiveHint }}
            </div>
          </div>

          <div v-if="form.sizeMode === 'custom'" class="tiptapify-iframe-dialog__size">
            <VTextField
              :model-value="form.width"
              type="number"
              min="1"
              density="compact"
              variant="outlined"
              suffix="px"
              :label="t('dialog.iframe.width')"
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
              :label="t('dialog.iframe.height')"
              :error-messages="heightError"
              hide-details="auto"
              @update:model-value="resize('height', $event)"
              @blur="touched.size = true"
            />
            <VBtn
              :color="keepRatio ? 'primary' : undefined"
              :variant="variantBtn"
              :aria-label="t('dialog.iframe.keep_ratio')"
              :aria-pressed="keepRatio"
              size="36"
              icon
              @click="toggleKeepRatio"
            >
              <VIcon size="20" :icon="keepRatio ? `mdiSvg:${mdi.mdiLock}` : `mdiSvg:${mdi.mdiLockOpenVariant}`" />
              <Tooltip :label="t('dialog.iframe.keep_ratio')" />
            </VBtn>
          </div>

          <div>
            <VBtn
              variant="text"
              size="small"
              class="tiptapify-iframe-dialog__advanced-toggle"
              :aria-expanded="advancedOpen"
              :append-icon="`mdiSvg:${advancedOpen ? mdi.mdiChevronUp : mdi.mdiChevronDown}`"
              @click="advancedOpen = !advancedOpen"
            >
              {{ t('dialog.iframe.advanced') }}
            </VBtn>

            <VExpandTransition>
              <div v-show="advancedOpen" class="tiptapify-iframe-dialog__advanced">
                <VTextField
                  v-model="form.name"
                  density="compact"
                  variant="outlined"
                  :label="t('dialog.iframe.name')"
                  hide-details="auto"
                />
                <VTextField
                  v-model="form.allow"
                  density="compact"
                  variant="outlined"
                  :label="t('dialog.iframe.allow')"
                  :hint="t('dialog.iframe.allow_hint')"
                  hide-details="auto"
                />
                <VTextField
                  v-model="form.sandbox"
                  density="compact"
                  variant="outlined"
                  :label="t('dialog.iframe.sandbox')"
                  :hint="t('dialog.iframe.sandbox_hint')"
                  hide-details="auto"
                />
                <div class="tiptapify-iframe-dialog__options">
                  <VCheckbox v-model="form.lazy" :label="t('dialog.iframe.lazy')" density="compact" hide-details />
                  <VCheckbox v-model="form.border" :label="t('dialog.iframe.border')" density="compact" hide-details />
                </div>
              </div>
            </VExpandTransition>
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
            <VBtn type="submit" color="primary" :variant="variantBtn" :disabled="!form.input.trim()">
              {{ t(isEdit ? 'dialog.save' : 'dialog.insert') }}
            </VBtn>
          </div>
        </div>
      </VCardActions>
    </template>
  </TiptapifyDialog>
</template>

<style lang="scss" scoped>
.tiptapify-iframe-dialog,
.tiptapify-iframe-dialog__group,
.tiptapify-iframe-dialog__advanced {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.tiptapify-iframe-dialog {
  gap: 16px;
  padding-top: 8px;
}

.tiptapify-iframe-dialog__group {
  gap: 8px;
}

.tiptapify-iframe-dialog__input :deep(textarea) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.8125rem;
}

.tiptapify-iframe-dialog__preview {
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  background: rgba(var(--v-theme-on-surface), 0.04);

  iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }
}

.tiptapify-iframe-dialog__placeholder {
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

.tiptapify-iframe-dialog__toggle {
  align-self: flex-start;
  max-width: 100%;
}

.tiptapify-iframe-dialog__size {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
}

.tiptapify-iframe-dialog__advanced-toggle {
  text-transform: none;
}

.tiptapify-iframe-dialog__advanced {
  gap: 16px;
  padding-top: 12px;
}

.tiptapify-iframe-dialog__options {
  display: flex;
  flex-wrap: wrap;
  gap: 0 16px;
}
</style>
