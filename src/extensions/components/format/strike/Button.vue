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
    :color="editor.isActive('strike') ? 'primary' : ''"
    :disabled="!editor.can().chain().focus().toggleStrike().run()"
    :variant="variantBtn"
    size="32"
    @click="editor.commands.toggleStrike()"
  >
    <Tooltip :label="t('format.strike')" hotkey="Mod-Shift-s" />
    <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatStrikethroughVariant}`" />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>