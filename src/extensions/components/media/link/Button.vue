<script lang="ts" setup>

import * as mdi from '@mdi/js'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import LinkDialog from '@tiptapify/extensions/components/media/link/LinkDialog.vue'
import { TiptapifyEditor } from '@tiptapify/types/editor'
import { computed, inject, Ref } from 'vue'

import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { ComposerTranslation } from 'vue-i18n'

const { variantBtn } = useTiptapifyConfig()

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
    <Tooltip :label="t('media.link')" />
    <BtnIcon :icon="icon" />
  </VBtn>

  <LinkDialog />
</template>

<style lang="scss" scoped>

</style>