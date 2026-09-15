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
    :color="editor.isActive('codeBlock') ? 'primary' : ''"
    :disabled="!editor.can().chain().focus().toggleCodeBlock().run()"
    :variant="variantBtn"
    size="32"
    @click="editor.commands.toggleCodeBlock()"
  >
    <Tooltip :label="t('format.codeblock')" hotkey="Mod-Alt-c" />
    <BtnIcon :icon="`mdiSvg:${mdi.mdiCodeBlockTags}`" />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>