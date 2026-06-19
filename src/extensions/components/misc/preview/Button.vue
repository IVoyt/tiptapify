<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import TiptapifyDialog from '@tiptapify/components/UI/TiptapifyDialog.vue'
import { variantBtnTypes } from '@tiptapify/types/editor'
import { inject, PropType, ref, Ref, useTemplateRef } from 'vue'

import defaults from '@tiptapify/constants/defaults'
import { ComposerTranslation } from 'vue-i18n'

defineProps({
  variantBtn: { type: String as PropType<variantBtnTypes>, default() { return defaults.variantBtn } },
})

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const dialog = useTemplateRef('dialog')

</script>

<template>
  <VBtn size="32" color="" :variant="variantBtn" @click="dialog.open()">
    <VTooltip activator="parent">
      {{ t('misc.preview') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiFileEyeOutline}`" />
  </VBtn>

  <TiptapifyDialog ref="dialog" module="preview" fullscreen>
    <template #content>
      <VCardItem>
        <div class="tiptap" v-html="editor.getHTML()" />
      </VCardItem>
    </template>
  </TiptapifyDialog>
</template>

<style lang="scss" scoped>

</style>