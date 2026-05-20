<script lang="ts" setup>
import * as mdi from '@mdi/js'
import { inject, Ref } from 'vue'
import CharmapPicker from './Picker.vue';

defineProps({
  variantBtn: { type: String, default: 'flat' },
})

const editor = inject('tiptapifyEditor') as Ref<any>
const { t } = inject('tiptapifyI18n') as any
</script>

<template>
  <VBtn :id="`tiptapify-charmap-button-${editor.instanceId}`" :variant="variantBtn" size="32">
    <VTooltip activator="parent">
      {{ t('media.charmap.title') }}
    </VTooltip>
    <VIcon :icon="`mdiSvg:${mdi.mdiAppleKeyboardCommand}`" tag="svg" size="small" />
  </VBtn>

  <VMenu :activator="`#tiptapify-charmap-button-${editor.instanceId}`" :close-on-content-click="false">
    <VSheet class="pa-2" max-width="580">
      <CharmapPicker :editor="editor" :t="t" />
    </VSheet>
  </VMenu>
</template>
