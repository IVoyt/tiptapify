<script lang="ts" setup>
import * as mdi from '@mdi/js'
import { inject, Ref } from 'vue'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import EmojiPicker from './Picker.vue'
import defaults from '@tiptapify/constants/defaults'

defineProps({
  variantBtn: { type: String, default: defaults.variantBtn }
})

const editor = inject('tiptapifyEditor') as Ref<any>

const { t } = inject('tiptapifyI18n') as any
</script>

<template>
  <VBtn :id="`tiptapify-emoji-button-${editor.instanceId}`" color="" :variant="variantBtn" size="32">
    <VTooltip activator="parent">
      {{ t('media.emoji.title') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiEmoticon}`" />
  </VBtn>

  <VMenu :activator="`#tiptapify-emoji-button-${editor.instanceId}`" :close-on-content-click="false">
    <VSheet class="pa-2" max-width="570">
      <EmojiPicker :editor="editor" :t="t" />
    </VSheet>
  </VMenu>
</template>