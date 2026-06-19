<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import { variantBtnTypes } from '@tiptapify/types/editor'
import { inject, PropType, Ref } from 'vue'

import defaults from '@tiptapify/constants/defaults'
import { ComposerTranslation } from 'vue-i18n'

defineProps({
  variantBtn: { type: String as PropType<variantBtnTypes>, default() { return defaults.variantBtn } },
})

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

</script>

<template>
  <VBtn
    :disabled="!editor.can().chain().focus().unsetAllMarks().run()"
    :variant="variantBtn"
    size="32"
    color=""
    @click="editor.chain().focus().unsetAllMarks().clearNodes().run()"
  >
    <VTooltip activator="parent">
      {{ t('format.formatClear') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatClear}`" />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>