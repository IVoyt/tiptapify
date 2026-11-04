<script setup lang="ts">
/*
 * How a link card looks in the editor: one card of the given layout in a read-only editor without a toolbar
 */
import type { Editor } from '@tiptap/core'
import { onBeforeUnmount, onMounted, PropType } from 'vue'
import { useTheme } from 'vuetify'
import { withBase } from 'vitepress'
import { useDocsStrings } from '../docsStrings'

const props = defineProps({
  layout: { type: String as PropType<'compact' | 'large' | 'text'>, default: 'compact' },
})

const theme = useTheme()
const { demo } = useDocsStrings().value

function escape(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function card(layout: 'compact' | 'large' | 'text'): string {
  const image = layout === 'text' ? '' : `<img class="tiptapify-link-card__image" src="${withBase('/link-card-demo.svg')}" alt="">`

  return `<a class="tiptapify-link-card" data-link-card="${layout}" href="https://example.com/blog/getting-started" target="_blank" rel="noopener noreferrer">${image}`
    + '<span class="tiptapify-link-card__body">'
    + `<span class="tiptapify-link-card__site">${escape(demo.cardSite)}</span>`
    + `<span class="tiptapify-link-card__title">${escape(demo.cardTitle)}</span>`
    + `<span class="tiptapify-link-card__description">${escape(demo.cardDescription)}</span>`
    + '</span></a>'
}

const content = card(props.layout)

function onEditorReady({ editor }: { editor: Editor }) {
  editor.setEditable(false)
}

function syncTheme() {
  theme.change(document.documentElement.classList.contains('dark') ? 'tiptapifyDark' : 'tiptapifyLight')
}

let themeObserver: MutationObserver | null = null

onMounted(() => {
  syncTheme()
  themeObserver = new MutationObserver(syncTheme)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onBeforeUnmount(() => themeObserver?.disconnect())
</script>

<template>
  <div class="link-cards-preview">
    <ClientOnly>
      <Tiptapify
        :content="content"
        :toolbar="false"
        :bubble-menu="false"
        :floating-menu="false"
        :slash-commands="false"
        :show-words-count="false"
        :show-characters-count="false"
        @editor-ready="onEditorReady"
      />
    </ClientOnly>
  </div>
</template>

<style scoped>
.link-cards-preview {
  margin: 1.5rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

/* The block is the frame: the editor's own one has no top edge without a toolbar */
.link-cards-preview :deep(.tiptapify-frame) {
  border: none;
}

.link-cards-preview :deep(.tiptapify-container) {
  padding: 16px 20px;
  resize: none;
}

.link-cards-preview :deep(.tiptapify-link-card) {
  margin: 0;
}

/* The card is the whole document, so the editor selects it; nothing is edited here */
.link-cards-preview :deep(.ProseMirror-selectednode) {
  outline: none;
}
</style>
