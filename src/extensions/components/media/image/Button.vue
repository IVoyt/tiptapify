<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import ImageDialog from '@tiptapify/extensions/components/media/image/ImageDialog.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { inject, Ref } from 'vue'

import { ComposerTranslation } from 'vue-i18n'

const { variantBtn } = useTiptapifyConfig()

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

</script>

<template>
  <VBtn
    :color="editor.isActive('image') ? 'primary' : ''"
    :variant="variantBtn"
    size="32"
    @click="editor.commands.showTiptapifyImage()"
  >
    <Tooltip :label="t('media.image')" />
    <BtnIcon :icon="`mdiSvg:${mdi.mdiImage}`" />
  </VBtn>

  <ImageDialog />
</template>

<style lang="scss" scoped>

</style>