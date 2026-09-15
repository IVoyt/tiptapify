<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import StyleColor from '@tiptapify/extensions/components/style/StyleColor.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { computed, inject, Ref } from 'vue'
import { ComposerTranslation } from 'vue-i18n'
import { useTheme } from 'vuetify/framework'


const { variantBtn } = useTiptapifyConfig()

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const appTheme = useTheme()

const activeColor = computed(() => {
  const defaultColor = appTheme.global.current.value.dark ? '#fff' : '#000'
  return editor.value.getAttributes('textStyle').color || defaultColor
})

const selectedColor = computed(() => editor.value.getAttributes('textStyle').color || '')

</script>

<template>
  <VBtn
    :id="`tiptapify-color-button-${editor.instanceId}`"
    :variant="variantBtn"
    size="32"
  >
    <Tooltip :label="t('style.color.text')" />

    <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatColorText}`" />
    <VIcon
      :icon="`mdiSvg:${mdi.mdiColorHelper}`"
      :color="activeColor"
      size="small"
      style="position: absolute; filter: drop-shadow(rgba(0, 0, 0, .75) 1px 1px 2px)"
    />
  </VBtn>

  <VMenu :activator="`#tiptapify-color-button-${editor.instanceId}`">
    <StyleColor :font-color="true" :background-color="false" :color="selectedColor" />
  </VMenu>
</template>

<style lang="scss" scoped>

</style>