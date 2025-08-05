<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from "@tiptap/vue-3";
import BtnIcon from "@tiptapify/components/UI/BtnIcon.vue";
import LinkDialog from "@tiptapify/extensions/components/media/link/LinkDialog.vue";
import { computed, inject, Ref } from "vue";

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as any

const icon = computed(() => editor.value.isActive('tiptapifyLink') ? `mdiSvg:${mdi.mdiLinkOff}` : `mdiSvg:${mdi.mdiLink}`)

</script>

<template>
  <VBtn
      :color="editor.isActive('link') ? 'primary' : ''"
      @click="editor.commands.showLink()"
      size="32"
  >
    <VTooltip activator="parent">
      {{ t('media.link') }}
    </VTooltip>
    <BtnIcon :icon="icon" />
  </VBtn>

  <LinkDialog />
</template>

<style lang="scss" scoped>

</style>