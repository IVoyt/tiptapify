<script lang="ts" setup>
import * as mdi from '@mdi/js'
import { TiptapifyEditor, variantBtnTypes } from '@tiptapify/types/editor'
import { inject, PropType, Ref } from 'vue'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import { ComposerTranslation } from 'vue-i18n'
import EmojiPicker from './Picker.vue'
import defaults from '@tiptapify/constants/defaults'

defineProps({
  variantBtn: { type: String as PropType<variantBtnTypes>, default() { return defaults.variantBtn } },
})

const editor = inject('tiptapifyEditor') as Ref<TiptapifyEditor>

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }
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