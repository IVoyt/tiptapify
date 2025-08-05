<script lang="ts" setup>

import * as mdi from '@mdi/js'
import BtnIcon from "@tiptapify/components/UI/BtnIcon.vue";
import ShowSourceDialog from "@tiptapify/extensions/components/misc/source/ShowSourceDialog.vue";
import { inject, ref, Ref } from "vue";

const { t } = inject('tiptapifyI18n') as any

const dialog = ref(null)

function showDialog() {
  dialog.value.showDialog()
}

</script>

<template>
  <VBtn @click="showDialog()" size="32">
    <VTooltip activator="parent">
      {{ t('misc.source') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiCodeTags}`" />
  </VBtn>

  <ShowSourceDialog ref="dialog" />
</template>

<style lang="scss" scoped>

</style>