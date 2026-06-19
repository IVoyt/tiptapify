<script lang="ts" setup>

import * as mdi from '@mdi/js'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import ShowSourceDialog from '@tiptapify/extensions/components/misc/source/ShowSourceDialog.vue'
import { variantBtnTypes } from '@tiptapify/types/editor'
import { inject, PropType, ref, useTemplateRef } from 'vue'

import defaults from '@tiptapify/constants/defaults'
import { ComposerTranslation } from 'vue-i18n'

defineProps({
  variantBtn: { type: String as PropType<variantBtnTypes>, default() { return defaults.variantBtn } },
})

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const dialog = useTemplateRef('dialog')

function showDialog() {
  dialog.value.showDialog()
}

</script>

<template>
  <VBtn size="32" color="" :variant="variantBtn" @click="showDialog()">
    <VTooltip activator="parent">
      {{ t('misc.source') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiCodeTags}`" />
  </VBtn>

  <ShowSourceDialog ref="dialog" />
</template>

<style lang="scss" scoped>

</style>