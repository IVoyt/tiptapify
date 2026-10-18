<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Level } from '@tiptap/extension-heading'
import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import SkinScope from '@tiptapify/components/SkinScope.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { menuContentClass } from '@tiptapify/skins/menu'
import { inject, Ref } from 'vue'

const props = defineProps({
  customHeadingLevels: { type: Array<Level>, default: () => [] },
  withParagraph: { type: Boolean, default: () => true },
  inline: { type: Boolean, default: () => false },
})

const { variantBtn, shape } = useTiptapifyConfig()

interface MDIIcons { [key: string]: string }
const mdiIcons = mdi as MDIIcons

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

import { headingLevels, setHeadingLevels } from '@tiptapify/constants/style'
import { ComposerTranslation } from 'vue-i18n'
setHeadingLevels(props.customHeadingLevels)

// A function, not a computed: `isActive` reads the editor state, which Vue does not track
function currentStyleIcon(): string {
  const activeLevel = headingLevels.value.find(level => editor.value.isActive('heading', { level }))

  return activeLevel ? `mdiFormatHeader${activeLevel}` : 'mdiFormatParagraph'
}
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
      class="tiptapify-dropdown-button"
      :color="editor.isActive('heading') ? 'primary' : ''"
      :variant="variantBtn"
      height="32"
    >
      <Tooltip :label="t('style.heading')" hotkey="Mod-Alt-1..6" />
      <BtnIcon :icon="`mdiSvg:${mdiIcons[currentStyleIcon()]}`" />
      <BtnIcon :icon="`mdiSvg:${mdi.mdiChevronDown}`" class="tiptapify-dropdown-button__chevron" />
    </VBtn>

    <VMenu :activator="`#tiptapify-heading-button-${editor.instanceId}`" :content-class="menuContentClass(shape.menu === 'soft')">
      <SkinScope>
        <VList density="compact">
          <VListItem
            v-if="withParagraph"
            link
            :active="editor.isActive('paragraph')"
            @click="editor.chain().focus().setParagraph().run()"
          >
            <Tooltip :label="t('style.paragraph')" hotkey="Mod-Alt-0" />
            <template #prepend>
              <BtnIcon :icon="`mdiSvg:${mdiIcons['mdiFormatParagraph']}`" />
            </template>
            <VListItemTitle>{{ t('style.paragraph') }}</VListItemTitle>
          </VListItem>
          <VListItem
            v-for="headingLevel in headingLevels"
            :key="headingLevel"
            link
            :active="editor.isActive('heading', { level: headingLevel })"
            @click="editor.chain().focus().toggleHeading({ level: headingLevel }).run()"
          >
            <Tooltip :label="t(`style.headings.h${headingLevel}`)" :hotkey="`Mod-Alt-${headingLevel}`" />
            <template #prepend>
              <BtnIcon :icon="`mdiSvg:${mdiIcons[`mdiFormatHeader${headingLevel}`]}`" />
            </template>
            <VListItemTitle>{{ t(`style.headings.h${headingLevel}`) }}</VListItemTitle>
          </VListItem>
        </VList>
      </SkinScope>
    </VMenu>
  </template>
</template>

<style lang="scss" scoped>

</style>
