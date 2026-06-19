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
    :color="editor.isActive('blockquote') ? 'primary' : ''"
    :disabled="!editor.can().chain().focus().toggleBlockquote().run()"
    :variant="variantBtn"
    size="32"
    @click="editor.commands.toggleBlockquote()"
  >
    <VTooltip activator="parent">
      {{ t('format.blockquote') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiCommentQuote}`" />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>