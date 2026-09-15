<script lang="ts" setup>
import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/core'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { inject, Ref } from 'vue'
import { ComposerTranslation } from 'vue-i18n'
import CharmapPicker from './Picker.vue'

const { variantBtn } = useTiptapifyConfig()

const editor = inject('tiptapifyEditor') as Ref<Editor>
const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }
</script>

<template>
  <VBtn :id="`tiptapify-charmap-button-${editor.instanceId}`" :variant="variantBtn" size="32">
    <Tooltip :label="t('media.charmap.title')" />
    <VIcon :icon="`mdiSvg:${mdi.mdiAppleKeyboardCommand}`" tag="svg" size="small" />
  </VBtn>

  <VMenu :activator="`#tiptapify-charmap-button-${editor.instanceId}`" :close-on-content-click="false">
    <VSheet class="pa-2" max-width="580">
      <CharmapPicker :editor="editor" :t="t" />
    </VSheet>
  </VMenu>
</template>
