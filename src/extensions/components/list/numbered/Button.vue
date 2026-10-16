<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { computed, inject, Ref } from 'vue'

import { ComposerTranslation } from 'vue-i18n'
import ListStyleButton from '@tiptapify/extensions/components/list/styles/ListStyleButton.vue'
import { orderedListStyles } from '@tiptapify/extensions/components/list/styles'

defineProps({
  // The numbering styles dropdown (`orderedList:styles`)
  withStyles: { type: Boolean, default: false },
})

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
  <ListStyleButton
    v-if="withStyles"
    list-type="orderedList"
    :icon="mdi.mdiFormatListNumbered"
    :label="t('lists.numbered')"
    hotkey="Mod-Shift-7"
    :presets="orderedListStyles"
    :disabled="buttonDisabled"
    @toggle="editor.commands.toggleOrderedList()"
  />

  <VBtn
    v-else
    :color="editor.isActive('orderedList') ? 'primary' : ''"
    :disabled="buttonDisabled"
    :variant="variantBtn"
    size="32"
    @click="editor.commands.toggleOrderedList()"
  >
    <Tooltip :label="t('lists.numbered')" hotkey="Mod-Shift-7" />
    <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatListNumbered}`" />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>