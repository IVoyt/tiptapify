<script lang="ts" setup>

import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import IframeDialog from '@tiptapify/extensions/components/media/iframe/IframeDialog.vue'
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

const icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M1 12h9.8L8.3 9.5l1.4-1.4l4.9 4.9l-4.9 4.9l-1.4-1.4l2.5-2.5H1zM21 2H3c-1.1 0-2 .9-2 2v6.1h2V6h18v14H3v-4H1v4c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2"/></svg>'
</script>

<template>
  <VBtn
    :color="editor.isActive('iframe') ? 'primary' : ''"
    :variant="variantBtn"
    size="32"
    @click="dialog?.open()"
  >
    <VTooltip activator="parent">
      {{ t('media.iframe') }}
    </VTooltip>
    <BtnIcon :icon="icon" />
  </VBtn>

  <IframeDialog ref="dialog" />
  <!-- Dialog here -->
</template>

<style lang="scss" scoped>

</style>