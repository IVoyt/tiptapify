<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from "@tiptap/vue-3";
import BtnIcon from "@tiptapify/components/UI/BtnIcon.vue";
import TiptapifyDialog from "@tiptapify/components/UI/TiptapifyDialog.vue";
import { inject, ref, Ref } from "vue";

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as any

const dialog = ref(null)

</script>

<template>
  <VBtn @click="dialog.open()" size="32">
    <VTooltip activator="parent">
      {{ t('misc.preview') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiFileEyeOutline}`" />
  </VBtn>

  <TiptapifyDialog ref="dialog" module="preview" fullscreen>
    <template #content>
      <VCardItem>
        <div class="tiptap" v-html="editor.getHTML()"></div>
      </VCardItem>
    </template>
  </TiptapifyDialog>
</template>

<style lang="scss" scoped>

</style>