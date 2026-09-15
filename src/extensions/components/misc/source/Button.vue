<script lang="ts" setup>

import * as mdi from '@mdi/js'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import ShowSourceDialog from '@tiptapify/extensions/components/misc/source/ShowSourceDialog.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { inject, ref, useTemplateRef } from 'vue'

import { ComposerTranslation } from 'vue-i18n'

const { variantBtn } = useTiptapifyConfig()

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const dialog = useTemplateRef('dialog')

function showDialog() {
  dialog.value.showDialog()
}

</script>

<template>
  <VBtn size="32" color="" :variant="variantBtn" @click="showDialog()">
    <Tooltip :label="t('misc.source')" />
    <BtnIcon :icon="`mdiSvg:${mdi.mdiCodeTags}`" />
  </VBtn>

  <ShowSourceDialog ref="dialog" />
</template>

<style lang="scss" scoped>

</style>