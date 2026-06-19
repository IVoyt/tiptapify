<script lang="ts" setup>

import * as mdi from '@mdi/js'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import LinkDialog from '@tiptapify/extensions/components/media/link/LinkDialog.vue'
import { TiptapifyEditor, variantBtnTypes } from '@tiptapify/types/editor'
import { computed, inject, PropType, Ref } from 'vue'

import defaults from '@tiptapify/constants/defaults'
import { ComposerTranslation } from 'vue-i18n'

defineProps({
  variantBtn: { type: String as PropType<variantBtnTypes>, default() { return defaults.variantBtn } },
})

const editor = inject('tiptapifyEditor') as Ref<TiptapifyEditor>

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const icon = computed(() => editor.value.isActive('tiptapifyLink') ? `mdiSvg:${mdi.mdiLinkOff}` : `mdiSvg:${mdi.mdiLink}`)

</script>

<template>
  <VBtn
    :color="editor.isActive('link') ? 'primary' : ''"
    :variant="variantBtn"
    size="32"
    @click="editor.commands.showLink()"
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