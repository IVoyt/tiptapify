<script setup lang="ts">

import { Editor } from "@tiptap/vue-3";
import TiptapifyDialog from "@tiptapify/components/UI/TiptapifyDialog.vue";
import defaults from "@tiptapify/constants/defaults";

import type { iframeOptions } from '@tiptapify/types/iframe'

import { computed, inject, Ref, ref, watch } from 'vue'

defineProps({
  variantBtn: { type: String, default() { return defaults.variantBtn }},
  variantField: { type: String, default() { return defaults.variantField }}
})

const editor = inject('tiptapifyEditor') as Ref<Editor>
const { t } = inject('tiptapifyI18n') as any

const generateIframeAttrs = (): iframeOptions => ({
  src: '',
  name: '',
  title: '',
  height: null,
  width: null,
  frameborder: 0,
})

const attrs = ref(generateIframeAttrs())
const srcInvalid = ref(false)

const dialog = ref(null)

const isDisabled = computed(() => {
  const { src } = attrs.value
  return !src
})

function apply() {
  let { src, name, title, width, height, frameborder } = attrs.value

  const options: iframeOptions = {
    src,
    name,
    title,
  }

  if (width) {
    options.width = width
  }

  if (height) {
    options.height = height
  }

  if (frameborder) {
    options.frameborder = Number(frameborder)
  }

  if (src) {
    editor.value.chain().focus().setIframe(options).run()
  }

  close()
}

function clear() {
  editor.value.commands.deleteSelection()

  close()
}

function close() {
  dialog.value.close()

  attrs.value = generateIframeAttrs()
}

function open () {
  const iframe = editor.value.getAttributes('iframe')

  attrs.value.src = iframe?.src
  attrs.value.name = iframe?.name
  attrs.value.title = iframe?.title
  attrs.value.width = iframe?.width
  attrs.value.height = iframe?.height
  attrs.value.frameborder = !!iframe?.frameborder

  dialog.value.open()
}

defineExpose({ open })

watch(() => attrs.value.src, () => {
  const azAZ09 = 'a-zA-Z0-9'

  const regexHrefProto = 'https?:\\/\\/'
  const regexHrefDomain = `[${azAZ09}]+(\\.[${azAZ09}]+(-?[${azAZ09}]+)?)+`
  const regexHrefPath = `(\\/[${azAZ09}\\-]+)*`
  const regexHrefFragment = '(#[^\\s]*)?'
  const regexHrefQueryParam = `(\\?[${azAZ09}\\-_]+((\\[[${azAZ09}]+\\])?=[${azAZ09}\\-_%]+)?)?`
  const regexHrefQueryParamExtra = `(&[${azAZ09}\\-_]+((\\[[${azAZ09}]+\\])?=[${azAZ09}\\-_%]+)?)*`
  const regexHref = `${regexHrefProto}${regexHrefDomain}${regexHrefPath}${regexHrefFragment}${regexHrefQueryParam}${regexHrefQueryParamExtra}`

  const regex = new RegExp(`^(${regexHref})$`, 'i')

  srcInvalid.value = (attrs.value.src || '') !== '' && !regex.test(attrs.value.src)
})
</script>

<template>
  <TiptapifyDialog ref="dialog" module="iframe" :title="t('dialog.iframe.dialog_title')" :max-width="800">
    <template #content>
      <VCardText>
        <VRow>
          <VCol cols="12">
            <VTextField
              v-model="attrs.src"
              density="compact"
              variant="outlined"
              :label="t('dialog.iframe.src')"
              :error-messages="srcInvalid ? t('dialog.iframe.src_invalid') : ''"
            />
          </VCol>

          <VCol cols="12" md="6">
            <VRow>
              <VCol cols="12">
                <VTextField v-model="attrs.name" density="compact" variant="outlined" :label="t('dialog.iframe.name')" />
              </VCol>

              <VCol cols="12">
                <VTextField v-model="attrs.title" density="compact" variant="outlined" :label="t('dialog.iframe.title')" />
              </VCol>
            </VRow>
          </VCol>

          <VCol cols="12" md="6">
            <VRow>
              <VCol cols="12" md="6">
                <VTextField
                    v-model="attrs.width"
                    type="number"
                    density="compact"
                    variant="outlined"
                    :precision="0"
                    :min="1"
                    :label="t('dialog.iframe.width')"
                />
              </VCol>

              <VCol cols="12" md="6">
                <VTextField
                    v-model="attrs.height"
                    type="number"
                    density="compact"
                    variant="outlined"
                    :precision="0"
                    :min="1"
                    :label="t('dialog.iframe.height')"
                />
              </VCol>

              <VCol cols="12" class="ml-2">
                <VSwitch v-model="attrs.frameborder" density="compact" :hideDetails="true" :label="t('dialog.iframe.frameborder')" />
              </VCol>
            </VRow>
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