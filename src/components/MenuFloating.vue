<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'
import { inject, Ref } from 'vue'
import { FloatingMenu } from '@tiptap/vue-3/menus'
import * as mdi from '@mdi/js'
import BubbleRow from '@tiptapify/components/UI/BubbleRow.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import { ComposerTranslation } from 'vue-i18n'

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

// What an empty line may become
const items = [
  {
    name: 'h1',
    icon: mdi.mdiFormatHeader1,
    label: 'style.headings.h1',
    hotkey: 'Mod-Alt-1',
    active: () => editor.value.isActive('heading', { level: 1 }),
    click: () => editor.value.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    name: 'h2',
    icon: mdi.mdiFormatHeader2,
    label: 'style.headings.h2',
    hotkey: 'Mod-Alt-2',
    active: () => editor.value.isActive('heading', { level: 2 }),
    click: () => editor.value.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    name: 'bulletList',
    icon: mdi.mdiFormatListBulleted,
    label: 'lists.bullet',
    hotkey: 'Mod-Shift-8',
    active: () => editor.value.isActive('bulletList'),
    click: () => editor.value.chain().focus().toggleBulletList().run(),
  },
]
</script>

<template>
  <FloatingMenu v-if="editor" :editor="editor">
    <BubbleRow class="floating-menu">
      <VBtn
        v-for="item in items"
        :key="item.name"
        size="32"
        variant="text"
        color=""
        :class="{ 'tiptapify-btn--active': item.active() }"
        :aria-pressed="item.active()"
        @click="item.click"
      >
        <Tooltip :label="t(item.label)" :hotkey="item.hotkey" />
        <VIcon :icon="`mdiSvg:${item.icon}`" size="20" />
      </VBtn>
    </BubbleRow>
  </FloatingMenu>
</template>
