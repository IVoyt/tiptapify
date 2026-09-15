<script lang="ts" setup>

import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import IframeDialog from '@tiptapify/extensions/components/media/iframe/IframeDialog.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { inject, ref, Ref, useTemplateRef } from 'vue'

import { ComposerTranslation } from 'vue-i18n'

const { variantBtn } = useTiptapifyConfig()

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
    <Tooltip :label="t('media.iframe')" />
    <BtnIcon :icon="icon" />
  </VBtn>

  <IframeDialog ref="dialog" />
</template>

<style lang="scss" scoped>

</style>