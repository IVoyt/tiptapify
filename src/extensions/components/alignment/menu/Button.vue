<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { inject, PropType, Ref } from 'vue'

import { ComposerTranslation } from 'vue-i18n'

type Alignment = 'left' | 'center' | 'right' | 'justify'

const props = defineProps({
  alignments: { type: Array as PropType<Alignment[]>, default: () => ['left', 'center', 'right', 'justify'] },
})

const { variantBtn } = useTiptapifyConfig()

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const alignmentOptions: Record<Alignment, { icon: string, hotkey: string }> = {
  left: { icon: mdi.mdiFormatAlignLeft, hotkey: 'Mod-Shift-l' },
  center: { icon: mdi.mdiFormatAlignCenter, hotkey: 'Mod-Shift-e' },
  right: { icon: mdi.mdiFormatAlignRight, hotkey: 'Mod-Shift-r' },
  justify: { icon: mdi.mdiFormatAlignJustify, hotkey: 'Mod-Shift-j' },
}

// A function, not a computed: `isActive` reads the editor state, which Vue does not track
function currentAlignmentIcon(): string {
  const active = props.alignments.find(alignment => editor.value.isActive({ textAlign: alignment }))

  return alignmentOptions[active ?? props.alignments[0] ?? 'left'].icon
}
</script>

<template>
  <VBtn
    :id="`tiptapify-align-button-${editor.instanceId}`"
    class="tiptapify-dropdown-button"
    :variant="variantBtn"
    height="32"
  >
    <Tooltip :label="t('alignment')" />
    <BtnIcon :icon="`mdiSvg:${currentAlignmentIcon()}`" />
    <BtnIcon :icon="`mdiSvg:${mdi.mdiChevronDown}`" class="tiptapify-dropdown-button__chevron" />
  </VBtn>

  <VMenu :activator="`#tiptapify-align-button-${editor.instanceId}`" content-class="tiptapify-menu">
    <VList density="compact">
      <VListItem
        v-for="alignment in alignments"
        :key="alignment"
        link
        :active="editor.isActive({ textAlign: alignment })"
        @click="editor.chain().focus().toggleTextAlign(alignment).run()"
      >
        <Tooltip :label="t(`alignments.${alignment}`)" :hotkey="alignmentOptions[alignment].hotkey" />
        <template #prepend>
          <BtnIcon :icon="`mdiSvg:${alignmentOptions[alignment].icon}`" />
        </template>
        <VListItemTitle>{{ t(`alignments.${alignment}`) }}</VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>
