<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from "@tiptap/vue-3";
import BtnIcon from "@tiptapify/components/UI/BtnIcon.vue";
import { inject, nextTick, ref, Ref } from "vue";

import defaults from '@tiptapify/constants/defaults'

defineProps({
  variantBtn: { type: String, default: defaults.variantBtn }
})

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as any

const dialog = ref(false)

async function dialogOpen() {
  dialog.value = true

  await changeEditorContainer('tiptapify-editor', 'tiptapify-editor-fullscreen')
}

async function dialogClose() {
  dialog.value = false

  await changeEditorContainer('tiptapify-editor-fullscreen', 'tiptapify-editor')
}

async function changeEditorContainer(source: string, target: string) {
  await nextTick()

  const sourceElm = document.querySelector(`#${source}-${editor.value.instanceId} > div`);

  const targetElm = document.querySelector(`#${target}-${editor.value.instanceId}`);

  targetElm.appendChild(sourceElm);
}

</script>

<template>
  <VBtn @click="dialog ? dialogClose() : dialogOpen()" size="32" :variant="variantBtn">
    <VTooltip activator="parent">
      {{ t('misc.preview') }}
    </VTooltip>
    <BtnIcon :icon="dialog ? `mdiSvg:${mdi.mdiFullscreenExit}` : `mdiSvg:${mdi.mdiFullscreen}`" />
  </VBtn>

  <VDialog v-model="dialog" fullscreen @close="dialogClose()" @update:modelValue="!dialog ? dialogClose() : ''">
    <VCard>
      <div :id="`tiptapify-editor-fullscreen-${editor?.instanceId}`"></div>
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped>

</style>