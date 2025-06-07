<script setup lang="ts">

import * as mdi from '@mdi/js'
import { Editor } from "@tiptap/vue-3";

import { useI18n } from 'vue-i18n'
import { computed, inject, Ref, ref, watch } from 'vue'

import helpers from '@tiptapify/utils/helpers'

defineExpose({ open })

const { ucFirst } = helpers

interface Props {
  value?: string
  target?: '_self' | '_blank'
  destroy?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  target: '_blank',
  destroy: undefined
})

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = useI18n()

const generateLinkAttrs = () => ({
  href: '',
  target: '_blank'
})

const attrs = ref(generateLinkAttrs())

const dialog = ref<boolean>(false)

const isDisabled = computed(() => {
  const { href, target } = attrs.value
  if (!href) return true

  return props.value === href && props.target === target
})

function apply() {
  const { href, target } = attrs.value

  if (href) {
    editor.value.chain().focus().extendMarkRange('link').setLink({ href, target }).run()
  }
  close()
}

function open() {
  dialog.value = true
}

function close() {
  dialog.value = false
  attrs.value = generateLinkAttrs()

  setTimeout(() => props.destroy?.(), 300)
}

watch(dialog, val => {
  if (!val) return

  attrs.value = {
    href: props.value,
    target: props.target
  }
})
</script>

<template>
  <VDialog v-model="dialog" max-width="400" absolute @click:outside="close">
    <VCard>
      <VToolbar class="px-6" density="compact">
        <span class="headline">{{ ucFirst(t('dialog.link.title')) }}</span>

        <VSpacer />

        <VBtn class="mx-0" icon @click="close">
          <VIcon :icon="mdi.mdiClose" />
        </VBtn>
      </VToolbar>

      <VCardText>
        <VTextField v-model="attrs.href" :label="ucFirst(t('dialog.link.placeholder'))" autofocus />
      </VCardText>

      <VCardActions>
        <VBtn :disabled="isDisabled" @click="apply">
          {{ ucFirst(t('dialog.apply')) }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>