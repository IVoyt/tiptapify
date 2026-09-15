<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { inject, Ref } from 'vue'

import { ComposerTranslation } from 'vue-i18n'

const { variantBtn } = useTiptapifyConfig()

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
    <Tooltip :label="t('format.blockquote')" hotkey="Mod-Shift-b" />
    <BtnIcon :icon="`mdiSvg:${mdi.mdiCommentQuote}`" />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>