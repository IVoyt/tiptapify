<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import FontSize from '@tiptapify/extensions/components/style/fontSize/FontSize.vue'
import { fontSizes } from '@tiptapify/constants/style'
import { variantBtnTypes } from '@tiptapify/types/editor'
import { computed, inject, PropType, Ref } from 'vue'

import defaults from '@tiptapify/constants/defaults'
import { ComposerTranslation } from 'vue-i18n'

const props = defineProps({
  fontMeasure: { type: String, default () { return 'px' } },
  variantBtn: { type: String as PropType<variantBtnTypes>, default() { return defaults.variantBtn } },
})

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const activeFontSize = computed(() => {
  let fontSize = null
  for (const size of fontSizes) {
    if (editor.value.isActive('textStyle', { fontSize: `${size}${props.fontMeasure}` })) {
      fontSize = size
      break
    }
  }

  return fontSize
})

function getColor() {
  let color = ''
  for (const size of fontSizes) {
    if (editor.value.isActive('textStyle', { fontSize: `${size}${props.fontMeasure}` })) {
      color = 'primary'
      break
    }
  }

  return color
}

</script>

<template>
  <VBtn
    :id="`tiptapify-font-size-button-${editor.instanceId}`"
    :disabled="!editor.can().chain().focus().unsetFontSize().run()"
    :color="getColor()"
    :variant="variantBtn"
    size="32"
  >
    <VTooltip activator="parent">
      {{ t('style.fontSize') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatSize}`" />
  </VBtn>

  <VMenu :activator="`#tiptapify-font-size-button-${editor.instanceId}`">
    <FontSize :sizes="fontSizes" :measure="fontMeasure" :font-size="activeFontSize" />
  </VMenu>
</template>

<style lang="scss" scoped>

</style>