<script lang="ts" setup>

import * as mdi from '@mdi/js'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import AiDialog from '@tiptapify/extensions/components/ai/Dialog.vue'
import defaults from '@tiptapify/constants/defaults'
import { TiptapifyAiResolvedOptions, variantBtnTypes } from '@tiptapify/types/editor'
import { computed, ComputedRef, inject, PropType, useTemplateRef } from 'vue'
import { ComposerTranslation } from 'vue-i18n'

defineProps({
  variantBtn: { type: String as PropType<variantBtnTypes>, default() { return defaults.variantBtn } },
})

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
    <VTooltip activator="parent">
      {{ isAvailable ? t('ai.title') : t('ai.unavailable') }}
    </VTooltip>
    <BtnIcon :icon="icon" />
  </VBtn>

  <AiDialog ref="dialog" />
</template>
