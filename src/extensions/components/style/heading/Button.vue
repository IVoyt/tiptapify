<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from "@tiptap/vue-3";
import BtnIcon from "@tiptapify/components/UI/BtnIcon.vue";
import { inject, Ref } from "vue";

const props = defineProps({
  customHeadingLevels: { type: Array<number>, default: () => [] }
})

interface MDIIcons {
  [key: string]: string
}
const mdiIcons = mdi as MDIIcons

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as any

import { headingLevels, setHeadingLevels } from "@tiptapify/constants/style";
setHeadingLevels(props.customHeadingLevels)

</script>

<template>
  <VBtn
      :id="`tiptapify-heading-button-${editor.instanceId}`"
      :color="editor.isActive('heading') ? 'primary' : ''"
      @click="editor.chain().focus().redo().run()"
      size="32"
  >
    <VTooltip activator="parent">
      {{ t('style.heading') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatHeaderPound}`" />
  </VBtn>

  <VMenu :activator="`#tiptapify-heading-button-${editor.instanceId}`">
    <VList density="compact">
      <VListItem link :color="editor.isActive('paragraph') ? 'primary' : ''" @click="editor.chain().focus().setParagraph().run()">
        <VListItemTitle class="d-flex justify-center align-center">
          <BtnIcon :icon="`mdiSvg:${mdiIcons['mdiFormatParagraph']}`" />
        </VListItemTitle>
      </VListItem>
      <VListItem
          v-for="headingLevel in headingLevels" :key="headingLevel"
          :color="editor.isActive('heading', {level: headingLevel}) ? 'primary' : ''"
          @click="editor.chain().focus().toggleHeading({ level: headingLevel }).run()"
      >
        <VListItemTitle class="d-flex justify-center align-center">
          <BtnIcon :icon="`mdiSvg:${mdiIcons[`mdiFormatHeader${headingLevel}`]}`" />
        </VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>

<style lang="scss" scoped>

</style>