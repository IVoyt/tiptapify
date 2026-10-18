<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'
import { computed, inject, Ref, ref } from 'vue'
import { BubbleMenu } from '@tiptap/vue-3/menus'
import { NodeSelection } from '@tiptap/pm/state'
import * as mdi from '@mdi/js'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'

defineProps({
  variant: { type: String, default () { return 'flat' } },
  theme: { type: String, default () { return 'light' } },
})

const editor = inject('tiptapifyEditor') as Ref<Editor>

// The bubble shape picks the markup: a flat row of buttons vs the classic card; the quiet
// buttons carrier rides the buttons shape flag
const { shape } = useTiptapifyConfig()

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
    <div
      v-if="shape.bubble === 'flat'"
      class="tiptapify-bubble-menu"
      :class="{ 'tiptapify-quiet-buttons': shape.buttons === 'quiet' }"
    >
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

    <!-- The classic bubble menu: a small card with a divided group of compact buttons -->
    <div v-else class="bubble-menu">
      <VCard>
        <VCardText class="pa-0">
          <VToolbar :theme="theme" density="compact" height="auto" class="p-0">
            <VToolbarItems>
              <VBtnGroup divided density="compact">
                <VBtn v-for="(item, key) in items" :key="key" v-bind="item.props" size="x-small" @click="item.click">
                  <VIcon :icon="item.icon" size="20" />
                </VBtn>
              </VBtnGroup>
            </VToolbarItems>
          </VToolbar>
        </VCardText>
      </VCard>
    </div>
  </BubbleMenu>
</template>

<style scoped lang="scss">
/*
 * Bubble skin rules: one rule per shape branch, reading `var(--tf-*)`.
 * The template branch is the shape gate (`bubble: card` renders the classic card,
 * `bubble: flat` the quiet row), so each rule carries its shape's base as fallback.
 * The classic card's background/border/padding/gap are VCard/VToolbar layout (not
 * token dimensions); the flat row paints them from tokens.
 */
.bubble-menu {
  border-radius: var(--tf-bubble-radius, 6px);
  box-shadow: var(--tf-bubble-shadow, 4px 4px 20px var(--dark-gray));
}

.tiptapify-bubble-menu {
  display: flex;
  align-items: center;
  gap: var(--tf-bubble-gap, 2px);
  padding: var(--tf-bubble-padding, 4px);
  border: var(--tf-bubble-border, 1px solid rgba(var(--v-border-color), var(--v-border-opacity)));
  border-radius: var(--tf-bubble-radius, 10px);
  background: var(--tf-bubble-bg, rgb(var(--v-theme-surface)));
  box-shadow: var(--tf-bubble-shadow, 0 6px 20px rgba(0, 0, 0, 0.12));
}
</style>
