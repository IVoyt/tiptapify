<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import { inject, onMounted, Ref } from 'vue'

import defaults from '@tiptapify/constants/defaults'

defineProps({
  variantBtn: { type: String, default: defaults.variantBtn }
})

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as any

</script>

<template>
  <VBtn
    :color="editor.isActive('horizontalRule') ? 'primary' : ''"
    size="32"
    :variant="variantBtn"
    @click="editor.chain().focus().setHorizontalRule().run()"
  >
    <VTooltip activator="parent">
      {{ t('format.line') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiMinus}`" />
  </VBtn>
</template>

<style lang="scss" scoped>

</style>