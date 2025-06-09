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

const generateLinkAttrs = () => ({
  href: '',
  target: '_blank',
  cssClass: '',
  rel: ''
})

const relAttrs = ['alternate', 'author', 'bookmark', 'external', 'help', 'license', 'next', 'nofollow', 'noreferrer', 'noopener', 'prev', 'search', 'tag']

const attrs = ref(generateLinkAttrs())

const dialog = ref<boolean>(false)

const isDisabled = computed(() => {
  const { href } = attrs.value
  return !href
})

function apply() {
  let { href, target, rel, cssClass } = attrs.value
  target = target ? '_blank' : '_self'
  rel = rel.join(' ')

  if (href) {
    editor.value.chain().focus().extendMarkRange('link').setLink({ href, target, rel, class: cssClass }).run()
  }

  close()
}

function clear() {
  editor.value.chain().focus().extendMarkRange('link').unsetLink().run()

  close()
}

function close() {
  dialog.value = false

  attrs.value = generateLinkAttrs()
}

const showLink = (event: CustomEvent) => {
  attrs.value.href = event.detail.link?.href
  attrs.value.target = event.detail.link?.target === '_blank'
  attrs.value.rel = event.detail.link?.rel?.split(' ')
  attrs.value.cssClass = event.detail.link?.class

  dialog.value = true;
}

onMounted(() => {
  window.addEventListener('tiptapify-show-link', showLink as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('tiptapify-show-link', showLink as EventListener)
})
</script>

<template>
  <VDialog v-model="dialog" max-width="800" absolute @click:outside="close">
    <VCard>
      <VToolbar class="px-6" density="compact">
        <span class="headline">{{ ucFirst(t('dialog.link.title')) }}</span>

        <VSpacer />

        <VBtn class="mx-0" icon @click="close">
          <VIcon :icon="mdi.mdiClose" />
        </VBtn>
      </VToolbar>

      <VCardText>
        <VRow>
          <VCol cols="12" md="9">
            <VTextField v-model="attrs.href" :variant="variantField" :label="ucFirst(t('dialog.link.href'))" autofocus />
          </VCol>

          <VCol cols="12" md="3">
            <VCheckbox v-model="attrs.target" color="primary" :label="ucFirst(t('dialog.link.target'))" />
          </VCol>

          <VCol cols="12">
            <VSelect
                v-model="attrs.rel"
                :items="relAttrs"
                :label="ucFirst(t('dialog.link.rel'))"
                :variant="variantField"
                multiple
                chips
                closable-chips
                clearable
            />
          </VCol>

          <VCol cols="12">
            <VTextField v-model="attrs.cssClass" :variant="variantField" :label="ucFirst(t('dialog.link.class'))" />
          </VCol>
        </VRow>
      </VCardText>

      <VCardActions>
        <VRow>
          <VCol class="d-flex justify-start">
            <VBtn color="warning" v-if="editor.isActive('link')" :variant="variantBtn" :disabled="isDisabled" @click="clear">
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