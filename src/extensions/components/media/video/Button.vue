<script lang="ts" setup>

import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import VideoDialog from '@tiptapify/extensions/components/media/video/VideoDialog.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { inject, Ref } from 'vue'

import { ComposerTranslation } from 'vue-i18n'

const { variantBtn } = useTiptapifyConfig()

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6H2v14a2 2 0 0 0 2 2h14v-2H4zm16-4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2m-8 12.5v-9l6 4.5z"/></svg>'
</script>

<template>
  <VBtn
    :color="editor.isActive('video') ? 'primary' : ''"
    :variant="variantBtn"
    size="32"
    @click="editor.commands.showTiptapifyVideo()"
  >
    <Tooltip :label="t('media.video')" />
    <BtnIcon :icon="icon" />
  </VBtn>

  <VideoDialog />
</template>

<style lang="scss" scoped>

</style>