<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { inject, nextTick, ref, Ref } from 'vue'

import { ComposerTranslation } from 'vue-i18n'

const { variantBtn } = useTiptapifyConfig()

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const showDialog = ref(false)

async function dialogOpen() {
  showDialog.value = true

  await changeEditorContainer('tiptapify-editor', 'tiptapify-editor-fullscreen')
}

async function dialogClose() {
  showDialog.value = false

  await changeEditorContainer('tiptapify-editor-fullscreen', 'tiptapify-editor')
}

async function changeEditorContainer(source: string, target: string) {
  await nextTick()

  const sourceElm = document.querySelector(`#${source}-${editor.value.instanceId} > div`)

  const targetElm = document.querySelector(`#${target}-${editor.value.instanceId}`)

  targetElm.appendChild(sourceElm)
}

</script>

<template>
  <VBtn
    size="32"
    :color="showDialog ? 'primary' : ''"
    :variant="variantBtn"
    @click="showDialog ? dialogClose() : dialogOpen()"
  >
    <Tooltip :label="t('misc.fullscreen')" />
    <BtnIcon :icon="showDialog ? `mdiSvg:${mdi.mdiFullscreenExit}` : `mdiSvg:${mdi.mdiFullscreen}`" />
  </VBtn>

  <VDialog v-model="showDialog" fullscreen @close="dialogClose()" @update:model-value="!showDialog ? dialogClose() : ''">
    <VCard>
      <div :id="`tiptapify-editor-fullscreen-${editor?.instanceId}`" />
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped>

</style>