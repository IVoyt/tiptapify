<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import FontFamily from '@tiptapify/extensions/components/style/fontFamily/FontFamily.vue'
import { fonts } from '@tiptapify/constants/style'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { computed, inject, Ref } from 'vue'

import { ComposerTranslation } from 'vue-i18n'

const { variantBtn } = useTiptapifyConfig()

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const activeFontFamily = computed(() => {
  let fontFamily = ''
  for (const font in fonts) {
    if (editor.value.isActive('textStyle', { fontFamily: fonts[font].fontFamily })) {
      fontFamily = fonts[font].fontFamily
      break
    }
  }

  return fontFamily
})

function getColor() {
  let color = ''
  for (const font in fonts) {
    if (editor.value.isActive('textStyle', { fontFamily: fonts[font].fontFamily })) {
      color = 'primary'
      break
    }
  }

  return color
}

</script>

<template>
  <VBtn
    :id="`tiptapify-font-family-button-${editor.instanceId}`"
    :disabled="!editor.can().chain().focus().unsetFontFamily().run()"
    :color="getColor()"
    :variant="variantBtn"
    size="32"
  >
    <Tooltip :label="t('style.fontFamily')" />
    <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatFont}`" />
  </VBtn>

  <VMenu :activator="`#tiptapify-font-family-button-${editor.instanceId}`">
    <FontFamily :fonts="fonts" :font-family="activeFontFamily" />
  </VMenu>
</template>

<style lang="scss" scoped>

</style>