<script lang="ts" setup>

import * as mdi from '@mdi/js'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import AiDialog from '@tiptapify/extensions/components/ai/Dialog.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { TiptapifyAiResolvedOptions } from '@tiptapify/types/editor'
import { computed, ComputedRef, inject, useTemplateRef } from 'vue'
import { ComposerTranslation } from 'vue-i18n'

const { variantBtn } = useTiptapifyConfig()

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }
const ai = inject('tiptapifyAi') as ComputedRef<TiptapifyAiResolvedOptions | false>
const dialog = useTemplateRef('dialog')

const isAvailable = computed(() => Boolean(ai?.value && ai.value.aiProvider))
const mdiIcons = mdi as Record<string, string>
const icon = computed(() => `mdiSvg:${mdiIcons.mdiSparklesOutline ?? mdiIcons.mdiSparkles ?? mdi.mdiCreationOutline}`)

function showDialog() {
  if (!isAvailable.value) {
    return
  }

  dialog.value?.showDialog()
}

</script>

<template>
  <VBtn color="" :variant="variantBtn" size="32" :disabled="!isAvailable" @click="showDialog">
    <Tooltip :label="isAvailable ? t('ai.title') : t('ai.unavailable')" />
    <BtnIcon :icon="icon" />
  </VBtn>

  <AiDialog ref="dialog" />
</template>
