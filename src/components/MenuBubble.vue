<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'
import { computed, inject, Ref, ref } from 'vue'
import { BubbleMenu } from '@tiptap/vue-3/menus'
import { NodeSelection } from '@tiptap/pm/state'
import * as mdi from '@mdi/js'

defineProps({
  variant: { type: String, default () { return 'flat' } },
  theme: { type: String, default () { return 'light' } },
})

const editor = inject('tiptapifyEditor') as Ref<Editor>

// The menu follows its text or image when the editor scrolls inside its own box; it is created once the
// box is there, as the menu reads its options only when it is created
const scrollTarget = inject<Ref<HTMLElement | null>>('tiptapifyScrollContainer', ref(null))

const items = ref([
  {
    name: 'bold',
    icon: `mdiSvg:${mdi.mdiFormatBold}`,
    props: {
      disabled: computed(() => !editor?.value.can().chain().focus().toggleBold().run()),
      color: computed(() => editor.value.isActive('bold') ? 'primary' : ''),
    },
    click: () => editor.value.chain().focus().toggleBold().run(),
  },
  {
    name: 'italic',
    icon: `mdiSvg:${mdi.mdiFormatItalic}`,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleItalic().run()),
      color: computed(() => editor.value.isActive('italic') ? 'primary' : ''),
    },
    click: () => editor.value.chain().focus().toggleItalic().run(),
  },
  {
    name: 'strike',
    icon: `mdiSvg:${mdi.mdiFormatStrikethroughVariant}`,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleStrike().run()),
      color: computed(() => editor.value.isActive('strike') ? 'primary' : ''),
    },
    click: () => editor.value.chain().focus().toggleStrike().run(),
  },
  {
    name: 'underline',
    icon: `mdiSvg:${mdi.mdiFormatUnderline}`,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleUnderline().run()),
      color: computed(() => editor.value.isActive('underline') ? 'primary' : ''),
    },
    click: () => editor.value.chain().focus().toggleUnderline().run(),
  },
  {
    name: 'highlight',
    icon: `mdiSvg:${mdi.mdiFormatColorHighlight}`,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleHighlight().run()),
      color: computed(() => editor.value.isActive('highlight') ? 'primary' : ''),
    },
    click: () => editor.value.chain().focus().toggleHighlight().run(),
  },
  {
    name: 'code',
    icon: `mdiSvg:${mdi.mdiXml}`,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleCode().run()),
      color: computed(() => editor.value.isActive('code') ? 'primary' : ''),
    },
    click: () => editor.value.chain().focus().toggleCode().run(),
  },
  {
    name: 'link',
    icon: computed(() => editor.value.isActive('link') ? `mdiSvg:${mdi.mdiLinkOff}` : `mdiSvg:${mdi.mdiLink}`),
    props: {
      color: computed(() => editor.value.isActive('link') ? 'primary' : ''),
      disabled: computed(() => editor.value.isActive('code') || editor.value.isActive('codeBlock')),
    },
    click: () => editor.value.commands.showLink()
  },
  {
    name: 'format clear',
    icon: `mdiSvg:${mdi.mdiFormatClear}`,
    click: () => editor.value.chain().focus().unsetAllMarks().clearNodes().run(),
  }
])
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
    <div class="tiptapify-bubble-menu tiptapify-quiet-buttons">
      <VBtn
        v-for="(item, key) in items"
        :key="key"
        size="32"
        variant="text"
        color=""
        :disabled="item.props?.disabled"
        :class="{ 'tiptapify-btn--active': item.props?.color === 'primary' }"
        @click="item.click"
      >
        <VIcon :icon="item.icon" size="20" />
      </VBtn>
    </div>
  </BubbleMenu>
</template>

<style scoped lang="scss">
.tiptapify-bubble-menu {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 10px;
  background: rgb(var(--v-theme-surface));
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}
</style>
