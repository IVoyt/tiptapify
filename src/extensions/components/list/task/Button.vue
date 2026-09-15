<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { computed, inject, Ref } from 'vue'

import { ComposerTranslation } from 'vue-i18n'

const { variantBtn } = useTiptapifyConfig()

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const buttonDisabled = computed(() => {
  return !editor.value.can().chain().focus().toggleBulletList().run() &&
      !editor.value.can().chain().focus().toggleBulletListCircle().run() &&
      !editor.value.can().chain().focus().toggleBulletListSquare().run() &&
      !editor.value.can().chain().focus().toggleOrderedList().run() &&
      !editor.value.can().chain().focus().toggleTaskList().run()
})
</script>

<template>
  <VBtn
    :color="editor.isActive('taskList') ? 'primary' : ''"
    :disabled="buttonDisabled"
    :variant="variantBtn"
    size="32"
    @click="editor.commands.toggleTaskList()"
  >
    <Tooltip :label="t('lists.task')" hotkey="Mod-Shift-9" />
    <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatListChecks}`" />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>