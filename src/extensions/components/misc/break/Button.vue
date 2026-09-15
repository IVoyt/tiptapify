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
  <VBtn size="32" :variant="variantBtn" @click="editor.chain().focus().setHardBreak().run()">
    <Tooltip :label="t('format.break')" hotkey="Mod-Enter" />
    <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatPageBreak}`" />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>