<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'
import { inject, Ref, ref } from 'vue'
import { BubbleMenu } from '@tiptap/vue-3/menus'
import { NodeSelection } from '@tiptap/pm/state'
import * as mdi from '@mdi/js'
import BubbleRow from '@tiptapify/components/UI/BubbleRow.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import { ComposerTranslation } from 'vue-i18n'

const editor = inject('tiptapifyEditor') as Ref<Editor>

// The menu follows its text or image when the editor scrolls inside its own box; it is created once the
// box is there, as the menu reads its options only when it is created
const scrollTarget = inject<Ref<HTMLElement | null>>('tiptapifyScrollContainer', ref(null))

type BubbleItem = {
  name: string,
  icon: string,
  label: string,
  hotkey?: string,
  active?: () => boolean,
  disabled?: () => boolean,
  click: () => void,
}

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const groups: BubbleItem[][] = [
  [
    {
      name: 'bold',
      icon: mdi.mdiFormatBold,
      label: 'format.bold',
      hotkey: 'Mod-b',
      active: () => editor.value.isActive('bold'),
      disabled: () => !editor.value.can().chain().focus().toggleBold().run(),
      click: () => editor.value.chain().focus().toggleBold().run(),
    },
    {
      name: 'italic',
      icon: mdi.mdiFormatItalic,
      label: 'format.italic',
      hotkey: 'Mod-i',
      active: () => editor.value.isActive('italic'),
      disabled: () => !editor.value.can().chain().focus().toggleItalic().run(),
      click: () => editor.value.chain().focus().toggleItalic().run(),
    },
    {
      name: 'underline',
      icon: mdi.mdiFormatUnderline,
      label: 'format.underline',
      hotkey: 'Mod-u',
      active: () => editor.value.isActive('underline'),
      disabled: () => !editor.value.can().chain().focus().toggleUnderline().run(),
      click: () => editor.value.chain().focus().toggleUnderline().run(),
    },
    {
      name: 'strike',
      icon: mdi.mdiFormatStrikethroughVariant,
      label: 'format.strike',
      hotkey: 'Mod-Shift-s',
      active: () => editor.value.isActive('strike'),
      disabled: () => !editor.value.can().chain().focus().toggleStrike().run(),
      click: () => editor.value.chain().focus().toggleStrike().run(),
    },
  ],
  [
    {
      name: 'superscript',
      icon: mdi.mdiFormatSuperscript,
      label: 'format.sup',
      hotkey: 'Mod-.',
      active: () => editor.value.isActive('superscript'),
      disabled: () => !editor.value.can().chain().focus().toggleSuperscript().run(),
      click: () => editor.value.chain().focus().toggleSuperscript().run(),
    },
    {
      name: 'subscript',
      icon: mdi.mdiFormatSubscript,
      label: 'format.sub',
      hotkey: 'Mod-,',
      active: () => editor.value.isActive('subscript'),
      disabled: () => !editor.value.can().chain().focus().toggleSubscript().run(),
      click: () => editor.value.chain().focus().toggleSubscript().run(),
    },
  ],
  [
    {
      name: 'highlight',
      icon: mdi.mdiFormatColorHighlight,
      label: 'style.color.highlight',
      active: () => editor.value.isActive('highlight'),
      disabled: () => !editor.value.can().chain().focus().toggleHighlight().run(),
      click: () => editor.value.chain().focus().toggleHighlight().run(),
    },
    {
      name: 'code',
      icon: mdi.mdiCodeTags,
      label: 'format.code',
      hotkey: 'Mod-e',
      active: () => editor.value.isActive('code'),
      disabled: () => !editor.value.can().chain().focus().toggleCode().run(),
      click: () => editor.value.chain().focus().toggleCode().run(),
    },
  ],
  [
    {
      name: 'link',
      icon: mdi.mdiLink,
      label: 'media.link',
      active: () => editor.value.isActive('link'),
      click: () => editor.value.commands.showLink(),
    },
  ],
  [
    {
      name: 'format clear',
      icon: mdi.mdiFormatClear,
      label: 'format.formatClear',
      click: () => editor.value.chain().focus().unsetAllMarks().clearNodes().run(),
    },
  ],
]
</script>

<template>
  <BubbleMenu
    v-if="editor && scrollTarget"
    :editor="editor"
    :options="{ placement: 'bottom', scrollTarget }"
    :should-show="({ editor, state, from, to }) => {
      // A selected block (image, paywall, widget) is not text to format
      if (state.selection instanceof NodeSelection) {
        return false
      }

      if (editor.isActive('code') || editor.isActive('codeBlock')) {
        return false
      }

      const docSize = editor.state.doc.content.size
      const isAllSelected = from === 0 && to === docSize

      return (from !== to) && !isAllSelected
    }"
  >
    <BubbleRow class="tiptapify-bubble-menu">
      <template v-for="(group, index) in groups" :key="index">
        <div v-if="index > 0" class="tiptapify-bubble-divider" />
        <VBtn
          v-for="item in group"
          :key="item.name"
          size="32"
          variant="text"
          color=""
          :disabled="item.disabled?.()"
          :class="{ 'tiptapify-btn--active': item.active?.() }"
          :aria-pressed="item.active ? item.active() : undefined"
          @click="item.click"
        >
          <Tooltip :label="t(item.label)" :hotkey="item.hotkey" />
          <VIcon :icon="`mdiSvg:${item.icon}`" size="20" />
        </VBtn>
      </template>
    </BubbleRow>
  </BubbleMenu>
</template>
