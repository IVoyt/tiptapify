<script setup lang="ts">

import { Editor } from '@tiptap/vue-3'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { isValidHref } from '@tiptapify/utils/validateHref'

import { computed, inject, onMounted, onUnmounted, Ref, ref, useTemplateRef, watch } from 'vue'

import TiptapifyDialog from '@tiptapify/components/UI/TiptapifyDialog.vue'
import { ComposerTranslation } from 'vue-i18n'

const { variantBtn, variantField } = useTiptapifyConfig()

const editor = inject('tiptapifyEditor') as Ref<Editor>
const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const generateLinkAttrs = () => ({
  href: '',
  target: targetAttrs.value[0],
  cssClass: '',
  rel: []
})

const relAttrs = ['alternate', 'author', 'bookmark', 'external', 'help', 'license', 'me', 'next', 'nofollow', 'noopener', 'noreferrer', 'opener', 'prev', 'privacy-policy', 'search', 'tag', 'terms-of-service']

const targetAttrs = computed(() => [
  { value: '_blank', title: t('dialog.link.target_blank') },
  { value: '_self', title: t('dialog.link.target_self') }
])

const attrs = ref(generateLinkAttrs())
const hrefInvalid = ref(false)

const dialog = useTemplateRef('dialog')

const isDisabled = computed(() => {
  const { href } = attrs.value
  return !href
})

function apply() {
  let { href, target, rel, cssClass } = attrs.value
  const relStr = rel?.length ? rel.join(' ') : null

  if (href) {
    editor.value.chain().focus().extendMarkRange('link').setLink({ href, target: target.value, rel: relStr, class: cssClass }).run()
  }

  close()
}

function clear() {
  editor.value.chain().focus().extendMarkRange('link').unsetLink().run()

  close()
}

function close() {
  attrs.value = generateLinkAttrs()

  dialog.value?.close()
}

const showLink = (event: CustomEvent) => {
  if (event.detail.editorId !== editor.value.instanceId) {
    return
  }

  attrs.value.href = event.detail.link?.href ?? ''
  attrs.value.target = targetAttrs.value.find(item => item.value === event.detail.link?.target) ?? targetAttrs.value[0]
  attrs.value.rel = event.detail.link?.rel?.split(' ')
  attrs.value.cssClass = event.detail.link?.class

  dialog.value?.open()
}

onMounted(() => {
  window.addEventListener('tiptapify-show-link', showLink as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('tiptapify-show-link', showLink as EventListener)
})

watch(() => attrs.value.href, () => {
  hrefInvalid.value = (attrs.value.href || '') !== '' && !isValidHref(attrs.value.href)
})
</script>

<template>
  <TiptapifyDialog ref="dialog" module="link">
    <template #content>
      <VCardText>
        <div class="tiptapify-dialog-grid">
          <div class="tiptapify-dialog-col">
            <VTextField
              v-model="attrs.href"
              density="compact"
              variant="outlined"
              :label="t('dialog.link.href')"
              :error-messages="hrefInvalid ? t('dialog.link.href_error') : ''"
              autofocus
            />
          </div>

          <div class="tiptapify-dialog-col tiptapify-dialog-col--4">
            <VSelect
              v-model="attrs.target"
              :items="targetAttrs"
              :label="t('dialog.link.target')"
              variant="outlined"
              return-object
              density="compact"
            />
          </div>

          <div class="tiptapify-dialog-col tiptapify-dialog-col--8">
            <VTextField v-model="attrs.cssClass" density="compact" variant="outlined" :label="t('dialog.link.class')" />
          </div>

          <div class="tiptapify-dialog-col">
            <VSelect
              v-model="attrs.rel"
              :items="relAttrs"
              :label="t('dialog.link.rel')"
              variant="outlined"
              multiple
              chips
              closable-chips
              clearable
              density="compact"
            />
          </div>
        </div>
      </VCardText>
    </template>

    <template #actions>
      <VCardActions>
        <div class="tiptapify-dialog-actions">
          <div class="tiptapify-dialog-actions__start">
            <VBtn v-if="editor.isActive('link')" color="warning" :variant="variantBtn" :disabled="isDisabled" @click="clear">
              {{ t('dialog.clear') }}
            </VBtn>
          </div>
          <div class="tiptapify-dialog-actions__end">
            <VBtn :variant="variantBtn" @click="close">
              {{ t('dialog.close') }}
            </VBtn>
            <VBtn color="primary" :variant="variantBtn" :disabled="isDisabled || hrefInvalid" @click="apply">
              {{ t('dialog.apply') }}
            </VBtn>
          </div>
        </div>
      </VCardActions>
    </template>
  </TiptapifyDialog>
</template>