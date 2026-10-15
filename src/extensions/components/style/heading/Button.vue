<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Level } from '@tiptap/extension-heading'
import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { inject, Ref } from 'vue'

const props = defineProps({
  customHeadingLevels: { type: Array<Level>, default: () => [] },
  withParagraph: { type: Boolean, default: () => true },
  inline: { type: Boolean, default: () => false },
})

const { variantBtn } = useTiptapifyConfig()

interface MDIIcons { [key: string]: string }
const mdiIcons = mdi as MDIIcons

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

import { headingLevels, setHeadingLevels } from '@tiptapify/constants/style'
import { ComposerTranslation } from 'vue-i18n'
setHeadingLevels(props.customHeadingLevels)
</script>

<template>
  <template v-if="inline">
    <VBtn
      v-if="withParagraph"
      :color="editor.isActive('paragraph') ? 'primary' : ''"
      :variant="variantBtn"
      size="32"
      @click="editor.chain().focus().setParagraph().run()"
    >
      <Tooltip :label="t('style.paragraph')" hotkey="Mod-Alt-0" />
      <BtnIcon :icon="`mdiSvg:${mdiIcons['mdiFormatParagraph']}`" />
    </VBtn>
    <VBtn
      v-for="headingLevel in headingLevels"
      :key="headingLevel"
      :color="editor.isActive('heading', { level: headingLevel }) ? 'primary' : ''"
      :variant="variantBtn"
      size="32"
      @click="editor.chain().focus().toggleHeading({ level: headingLevel }).run()"
    >
      <Tooltip :label="t(`style.headings.h${headingLevel}`)" :hotkey="`Mod-Alt-${headingLevel}`" />
      <BtnIcon :icon="`mdiSvg:${mdiIcons[`mdiFormatHeader${headingLevel}`]}`" />
    </VBtn>
  </template>

  <template v-else>
    <VBtn
      :id="`tiptapify-heading-button-${editor.instanceId}`"
      :color="editor.isActive('heading') ? 'primary' : ''"
      :variant="variantBtn"
      size="32"
      @click="editor.chain().focus().redo().run()"
    >
      <Tooltip :label="t('style.heading')" hotkey="Mod-Alt-1..6" />
      <BtnIcon :icon="`mdiSvg:${mdi.mdiFormatHeaderPound}`" />
    </VBtn>

    <VMenu :activator="`#tiptapify-heading-button-${editor.instanceId}`">
      <VList density="compact">
        <VListItem
          v-if="withParagraph"
          link
          :color="editor.isActive('paragraph') ? 'primary' : ''"
          @click="editor.chain().focus().setParagraph().run()"
        >
          <Tooltip :label="t('style.paragraph')" hotkey="Mod-Alt-0" />
          <VListItemTitle class="d-flex justify-center align-center">
            <BtnIcon :icon="`mdiSvg:${mdiIcons['mdiFormatParagraph']}`" />
          </VListItemTitle>
        </VListItem>
        <VListItem
          v-for="headingLevel in headingLevels"
          :key="headingLevel"
          :color="editor.isActive('heading', { level: headingLevel }) ? 'primary' : ''"
          @click="editor.chain().focus().toggleHeading({ level: headingLevel }).run()"
        >
          <Tooltip :label="t(`style.headings.h${headingLevel}`)" :hotkey="`Mod-Alt-${headingLevel}`" />
          <VListItemTitle class="d-flex justify-center align-center">
            <BtnIcon :icon="`mdiSvg:${mdiIcons[`mdiFormatHeader${headingLevel}`]}`" />
          </VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </template>
</template>

<style lang="scss" scoped>

</style>