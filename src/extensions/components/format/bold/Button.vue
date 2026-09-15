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
    :color="editor.isActive('bold') ? 'primary' : ''"
    :disabled="!editor.can().chain().focus().toggleBold().run()"
    :variant="variantBtn"
    size="32"
    @click="editor.commands.toggleBold()"
  >
    <Tooltip :label="t('format.bold')" hotkey="Mod-b" />
    <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatBold}`" />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>