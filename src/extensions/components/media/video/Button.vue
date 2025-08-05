<script lang="ts" setup>

import { Editor } from "@tiptap/vue-3";
import BtnIcon from "@tiptapify/components/UI/BtnIcon.vue";
import VideoDialog from "@tiptapify/extensions/components/media/video/VideoDialog.vue";
import { inject, Ref } from "vue";

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as any

const icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6H2v14a2 2 0 0 0 2 2h14v-2H4zm16-4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2m-8 12.5v-9l6 4.5z"/></svg>'
</script>

<template>
  <VBtn
      :color="editor.isActive('video') ? 'primary' : ''"
      @click="editor.commands.showTiptapifyVideo()"
      size="32"
  >
    <VTooltip activator="parent">
      {{ t('media.video') }}
    </VTooltip>
    <BtnIcon :icon="icon" />
  </VBtn>

  <VideoDialog />
</template>

<style lang="scss" scoped>

</style>