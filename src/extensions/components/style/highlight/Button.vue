<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from "@tiptap/vue-3";
import BtnIcon from "@tiptapify/components/UI/BtnIcon.vue";
import StyleColor from "@tiptapify/extensions/components/style/StyleColor.vue";
import { computed, inject, Ref } from "vue";
import { useTheme } from "vuetify/framework";

import defaults from '@tiptapify/constants/defaults'

defineProps({
  variantBtn: { type: String, default: defaults.variantBtn }
})

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as any

const appTheme = useTheme()

const activeColor = computed(() => {
  const defaultColor = appTheme.global.current.value.dark ? '#fff' : '#000'
  return editor.value.getAttributes('highlight').color || defaultColor
})

const selectedColor = computed(() => editor.value.getAttributes('highlight').color || '')

</script>

<template>
  <VBtn
      :id="`tiptapify-highlight-button-${editor.instanceId}`"
      :disabled="!editor.can().chain().focus().toggleHighlight().run()"
      :variant="variantBtn"
      @click="editor.chain().focus().redo().run()"
      size="32"
  >
    <VTooltip activator="parent">
      {{ t('style.color.highlight') }}
    </VTooltip>

    <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatColorFill}`" />
    <VIcon
        :icon="`mdiSvg:${mdi.mdiColorHelper}`"
        :disabled="!editor.can().chain().focus().toggleHighlight().run()"
        :color="activeColor"
        size="small"
        style="position: absolute; filter: drop-shadow(rgba(0, 0, 0, .75) 1px 1px 2px)"
    />
  </VBtn>

  <VMenu :activator="`#tiptapify-highlight-button-${editor.instanceId}`">
    <StyleColor :font-color="false" :background-color="true" :color="selectedColor" />
  </VMenu>
</template>

<style lang="scss" scoped>

</style>