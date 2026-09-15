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
    :disabled="!editor.can().chain().focus().redo().run()"
    size="32"
    color=""
    :variant="variantBtn"
    @click="editor.chain().focus().redo().run()"
  >
    <Tooltip :label="t('action.redo')" hotkey="Mod-Shift-z" />
    <BtnIcon :icon="`mdiSvg:${mdi.mdiRedo}`" />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>