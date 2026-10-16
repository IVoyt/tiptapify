<script setup lang="ts">

import defaults from '@tiptapify/constants/defaults'
import { itemsPropType, toolbarSections } from '@tiptapify/types/toolbarTypes'
import { SlashCommandsConfig } from '@tiptapify/types/slashCommandsTypes'
import { computed, onBeforeUnmount, PropType, provide, ref, ShallowRef, toRef } from 'vue'
import { default as Toolbar } from '@tiptapify/components/Toolbar/Index.vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { TiptapifyAiOptions, TiptapifyAiResolvedOptions, TiptapifyEditor, TiptapifyFooterAlignment, variantBtnTypes, variantFieldTypes } from '@tiptapify/types/editor'
import MenuBubble from '@tiptapify/components/MenuBubble.vue'
import MenuFloating from '@tiptapify/components/MenuFloating.vue'
import ImageBubbleMenu from '@tiptapify/components/ImageBubbleMenu.vue'

import { useI18n } from 'vue-i18n'

import { getTiptapEditor } from '@tiptapify/components/index'
import { TIPTAPIFY_CONFIG_KEY } from '@tiptapify/composables/useTiptapifyConfig'
import { createAiBackendProvider } from '@tiptapify/extensions/components/ai/backend'

import Footer from '@tiptapify/components/Footer.vue'
import { useTheme } from 'vuetify/framework'

const props = defineProps({
  locale: { type: String, default () { return 'en' } },
  content: { type: [String, Object] as PropType<string | Record<string, never>>, default () { return '' } },
  modelValue: { type: [String, Object] as PropType<string | Record<string, never>>, default () { return '' } },
  height: { type: [Number, String], default () { return null } },
  variantBtn: { type: String as PropType<variantBtnTypes>, default() { return defaults.variantBtn } },
  variantField: { type: String as PropType<variantFieldTypes>, default() { return defaults.variantField } },
  toolbar: { type: Boolean, default () { return true } },
  items: { type: [Array, Object] as PropType<itemsPropType>, default() { return [] } },
  itemsExclude: { type: Boolean, default() { return false } },
  bubbleMenu: { type: Boolean, default () { return true } },
  floatingMenu: { type: Boolean, default () { return true } },
  slashCommands: { type: [Boolean, Array] as PropType<SlashCommandsConfig>, default () { return true } },
  placeholder: { type: String, default () { return '' } },
  showWordsCount: { type: Boolean, default () { return true } },
  showCharactersCount: { type: Boolean, default () { return true } },
  limit: { type: Number as PropType<number | null>, default () { return null } },
  limitDefaultColor: { type: String, default () { return 'purple' } },
  limitAlertColor: { type: String, default () { return 'orange' } },
  limitWarningColor: { type: String, default () { return 'red' } },
  footerAlignment: { type: String as PropType<TiptapifyFooterAlignment>, default () { return 'end' } },
  defaultFontFamily: { type: String, default () { return 'Inter' } },
  fontMeasure: { type: String, default () { return 'px' } },
  rounded: { type: String, default () { return '0' } },
  customExtensions: { type: Array as PropType<toolbarSections>, default() { return [] } },
  ai: { type: [Boolean, Object] as PropType<boolean | TiptapifyAiOptions>, default() { return false } },
  interactiveStyles: { type: Boolean, default() { return true } },
  loading: { type: Boolean, default() { return false } },
  loadingColor: { type: String, default() { return 'default' } },
  loadingHeight: { type: String, default() { return '1px' } },
  // From this many images in a row the editor shows them as a slider grid; 0 turns it off
  imageSlider: { type: Number, default() { return 0 } },
})

const emit = defineEmits(['update:modelValue', 'editor-ready', 'content-changed'])

const loadingProgress = ref(0)

const { t } = useI18n()

const appTheme = useTheme()
const currentTheme = computed(() => appTheme.name.value)

const defaultAiPromptExamples = computed(() => [
  {
    title: t('ai.defaultExamples.improve.title'),
    prompt: t('ai.defaultExamples.improve.prompt'),
  },
  {
    title: t('ai.defaultExamples.proofReading.title'),
    prompt: t('ai.defaultExamples.proofReading.prompt'),
  },
  {
    title: t('ai.defaultExamples.summarize.title'),
    prompt: t('ai.defaultExamples.summarize.prompt'),
  },
  {
    title: t('ai.defaultExamples.expand.title'),
    prompt: t('ai.defaultExamples.expand.prompt'),
  },
])

const tiptapifyAi = computed(() => {
  if (props.ai === false) {
    return false
  }

  const options = props.ai === true ? {} : props.ai

  const resolved: TiptapifyAiResolvedOptions = {
    ...options,
    enabled: true,
    promptExamples: options.promptExamples?.length ? options.promptExamples : defaultAiPromptExamples.value,
  }

  // Backend generation: when no `aiProvider` is given but an `aiEndpoint`
  // is set, synthesize a provider that posts the request to the endpoint.
  // An explicit `aiProvider` always wins.
  if (!resolved.aiProvider && resolved.aiEndpoint) {
    resolved.aiProvider = createAiBackendProvider({
      endpoint: resolved.aiEndpoint,
      headers: resolved.aiHeaders,
      tokenProvider: resolved.tokenProvider,
    })
  }

  return resolved
})

function contentChanged() {
  const html = editor.value?.getHTML() ?? ''
  emit('update:modelValue', html)
  emit('content-changed', { html, json: editor.value?.getJSON() })
}

function onContainerClick(event: MouseEvent) {
  if ((event.target as Element).closest('.ProseMirror')) {
    return
  }

  editor.value?.chain().focus().run()
}

const editor: ShallowRef<Editor | undefined> = getTiptapEditor(
    props.content || props.modelValue,
    computed(() => props.placeholder || t('content.placeholder')).value,
    props.slashCommands,
    props.customExtensions,
    props.limit,
    contentChanged,
    (editorInstance: Editor) => {
      (<TiptapifyEditor>editorInstance).interactiveStyles = props.interactiveStyles
      emit('editor-ready', {
        editor: editorInstance,
        getHTML: () => editorInstance.getHTML(),
        getJSON: () => editorInstance.getJSON(),
      })
    },
    {
      captionPlaceholder: t('dialog.image.caption_placeholder'),
      sliderMinImages: props.imageSlider,
      sliderLabel: t('media.slider'),
    },
)

provide('tiptapifyEditor', editor)

const scrollContainer = ref<HTMLElement | null>(null)
provide('tiptapifyScrollContainer', scrollContainer)
provide('tiptapifyI18n', { t })
provide('tiptapifyAi', tiptapifyAi)
provide(TIPTAPIFY_CONFIG_KEY, {
  variantBtn: toRef(props, 'variantBtn'),
  variantField: toRef(props, 'variantField'),
})

editor.value?.chain().setFontFamily(props.defaultFontFamily).run()

const computeResizableHeight = computed(() => {
  let height = props.height
  if (typeof height === 'string') {
    height = parseInt(height)
  }

  return height > 0 ? `height: ${height}px` : ''
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<template>
  <div :id="`tiptapify-editor-${editor?.instanceId}`">
    <div :class="`tiptapify-frame rounded-${rounded}`">
      <template v-if="toolbar">
        <Toolbar
          v-if="editor"
          :variant-field="variantField"
          :font-measure="fontMeasure"
          :items="items"
          :items-exclude="itemsExclude"
          :rounded="rounded"
          :custom-extensions="customExtensions"
          :theme="currentTheme"
        />
      </template>

      <VProgressLinear v-model="loadingProgress" :color="loadingColor" :height="loadingHeight" :indeterminate="loading" />

      <div ref="scrollContainer" class="pa-2 tiptapify-container resizable" :style="computeResizableHeight" @click="onContainerClick">
        <MenuFloating v-if="floatingMenu" :variant="variantBtn" :theme="currentTheme" />

        <MenuBubble v-if="bubbleMenu" :variant="variantBtn" :theme="currentTheme" />

        <ImageBubbleMenu />

        <EditorContent :editor="editor" class="tiptapify-editor" />
      </div>

      <Footer
        :show-words-count="showWordsCount"
        :show-characters-count="showCharactersCount"
        :limit="limit ?? 0"
        :limit-default-color="limitDefaultColor"
        :limit-alert-color="limitAlertColor"
        :limit-warning-color="limitWarningColor"
        :alignment="footerAlignment"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tiptapify-editor::v-deep(.ProseMirror:focus) {
  outline: none;
}
</style>

<style lang="scss">
:root {
  --white: #FFF;
  --black: #2E2B29;
  --black-contrast: #110F0E;
  --dark-gray: rgb(98, 98, 98);
  --gray: rgb(223 223 223);
  --gray-1: rgba(61, 37, 20, .05);
  --gray-2: rgba(61, 37, 20, .08);
  --gray-3: rgba(61, 37, 20, .12);
  --gray-4: rgba(53, 38, 28, .3);
  --gray-5: rgba(28, 25, 23, .6);
  --green: #22C55E;
  --purple: #6A00F5;
  --purple-contrast: #5800CC;
  --purple-light: rgba(88, 5, 255, .05);
  --yellow-contrast: #FACC15;
  --yellow: rgba(250, 204, 21, .4);
  --yellow-light: #FFFAE5;
  --red: #FF5C33;
  --red-soft: #B24A40;
  --red-light: #FFEBE5;
  --shadow: 0px 12px 33px 0px rgba(0, 0, 0, .06), 0px 3.618px 9.949px 0px rgba(0, 0, 0, .04);
  --border: 1px solid var(--gray-2);
}

.tiptapify-frame {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-bottom-color: rgba(var(--v-border-color), calc(var(--v-border-opacity) * 1.6));
  background: rgb(var(--v-theme-surface));
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.resizable {
  resize: vertical;
  overflow: auto;
}

.tiptapify-container {
  /* The containing block of the bubble menus, so they scroll with the text they belong to */
  position: relative;
  display: flex;
  flex-direction: column;
}

.tiptapify-container .tiptapify-editor {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.tiptapify-container .tiptapify-editor > .ProseMirror {
  flex: 1;
}

/* Basic editor styles */
.tiptap {
  :first-child {
    margin-top: 0;
  }

  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="Gray" d="M7 10l5 5 5-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: right .1rem center;
    background-size: 1.25rem 1.25rem;

    border-radius: .5rem;
    border: none;
    color: var(--black);
    font-family: inherit;
    font-size: .875rem;
    font-weight: 500;
    line-height: 1.15;
    margin: unset;
    padding: .375rem .625rem;
    transition: all .2s cubic-bezier(.65,.05,.36,1);
  }

  /* List styles */
  ul, ol {
    /* Next to a floated image the markers stay out of it */
    display: flow-root;
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Task list specific styles */
  ul[data-type='taskList'] {
    list-style: none;
    margin-left: 0;
    padding: 0;

    li {
      align-items: flex-start;
      display: flex;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }

    input[type='checkbox'] {
      cursor: pointer;
    }

    ul[data-type='taskList'] {
      margin: 0;
    }
  }

  /* Heading styles */
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1, h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4, h5, h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }

    /* Code styling */
    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #fbbc88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #b9f18d;
    }

    .hljs-title,
    .hljs-section {
      color: #faf594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70cff8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }

  /* Table-specific styling */
  table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;

    td, th {
      border: 1px solid var(--gray-3);
      box-sizing: border-box;
      min-width: 1em;
      padding: 6px 8px;
      position: relative;
      vertical-align: top;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      background-color: var(--gray-1);
      font-weight: bold;
      text-align: left;
    }

    .selectedCell:after {
      background: var(--gray-2);
      content: '';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      position: absolute;
      z-index: 2;
    }

    .column-resize-handle {
      background-color: var(--purple);
      bottom: -2px;
      pointer-events: none;
      position: absolute;
      right: -2px;
      top: 0;
      width: 4px;
    }
  }

  p.is-editor-empty:first-child::before {
    color: var(--gray-4);
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }

  .tableWrapper {
    margin: 1.5rem 0;
    overflow-x: auto;
  }

  &.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }

  ul.list-style-circle {
    list-style-type: circle !important;
  }

  ul.list-style-square {
    list-style-type: square !important;
  }

  img {
    display: block;
  }

  /* Image with the caption under it (see extensions/components/media/image/caption.ts) */
  .tiptapify-image {
    --tiptapify-image-max-height: 400px;

    flex-direction: column;
    gap: 4px;
    width: fit-content;
    max-width: 100%;
    margin: 1rem 0;

    /* Never wider than the text, never taller than the max height: big photos stay out of the way */
    img {
      max-width: 100%;
      height: auto !important;
      margin: 0;
      border-radius: 4px;
      background: rgba(var(--v-theme-on-surface), 0.04);
    }

    [data-resize-wrapper] {
      max-width: min(100%, calc(var(--tiptapify-image-max-height) * var(--tiptapify-image-ratio, 100)));
      border-radius: 4px;
      outline: 2px solid transparent;
      outline-offset: 2px;
      transition: outline-color 0.15s;
    }

    /* One block: hovering outlines it, a click selects it and shows its toolbar */
    img {
      cursor: pointer;
    }

    &:hover [data-resize-wrapper] {
      outline-color: rgba(var(--v-theme-primary), 0.35);
    }

    &.ProseMirror-selectednode [data-resize-wrapper] {
      outline-color: rgb(var(--v-theme-primary));
    }

    /* Centered unless floated; a floated image lets the text wrap around it */
    &:not([data-align]):not(.tiptapify-slide) {
      align-items: center;
      margin-inline: auto;

      .tiptapify-image-caption {
        text-align: center;
      }
    }

    &[data-align='left'],
    &[data-align='right'] {
      max-width: 50%;
      margin-top: 0.25rem;
    }

    &[data-align='left'] {
      float: left;
      margin-right: 1.25rem;
    }

    &[data-align='right'] {
      float: right;
      margin-left: 1.25rem;
    }
  }

  /* Images in a row shown as a slider (extensions/components/media/image/slider.ts): a numbered grid */
  .tiptapify-image.tiptapify-slide {
    position: relative;
    display: inline-flex !important;
    box-sizing: border-box;
    width: calc(100% / 3);
    margin: 0;
    padding: 8px 6px;
    vertical-align: top;
    background: rgba(var(--v-theme-primary), 0.06);

    [data-resize-wrapper] {
      width: 100%;
    }

    img {
      width: 100% !important;
      max-width: none;
      aspect-ratio: 4 / 3;
      object-fit: cover;
    }

    [data-resize-handle] {
      display: none !important;
    }

    &::before {
      position: absolute;
      top: 14px;
      left: 12px;
      z-index: 1;
      padding: 0 6px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      content: attr(data-slide-label);
      font-size: 12px;
      font-weight: 600;
      line-height: 20px;
      pointer-events: none;
    }
  }

  &:has(.tiptapify-slide) {
    container-type: inline-size;
  }

  /* The caret between two slides: a vertical line at the edge of the slide before it */
  .tiptapify-slide + .ProseMirror-gapcursor:has(+ .tiptapify-slide) {
    display: inline-block;

    &::after {
      top: 8px;
      width: 0;
      height: calc((100cqw / 3 - 12px) * 0.75);
      border-top: 0;
      border-left: 2px solid currentColor;
    }
  }

  .tiptapify-image-caption {
    width: 100%;
    min-width: 0;
    padding: 2px 0 3px;
    border: 0;
    border-bottom: 1px dashed transparent;
    background: transparent;
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
    font: inherit;
    font-size: 0.875em;
    outline: none;
    transition: border-color 0.15s;

    &::placeholder {
      color: rgba(var(--v-theme-on-surface), var(--v-disabled-opacity));
    }

    &:hover:not(:disabled),
    &:focus {
      border-bottom-color: rgba(var(--v-border-color), 0.4);
    }

    &:disabled:placeholder-shown {
      display: none;
    }
  }

  /* Resize handles of a selected image: dots on its corners and edge middles */
  [data-node='image'] [data-resize-handle] {
    display: none;
  }

  [data-node='image'].ProseMirror-selectednode [data-resize-handle] {
    position: absolute;
    z-index: 10;
    display: block;
    width: 10px;
    height: 10px;
    border: 2px solid rgb(var(--v-theme-surface));
    border-radius: 50%;
    background: rgb(var(--v-theme-primary));
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);

    &[data-resize-handle='top-left'] { top: -5px !important; left: -5px !important; cursor: nwse-resize; }
    &[data-resize-handle='top-right'] { top: -5px !important; right: -5px !important; left: auto !important; cursor: nesw-resize; }
    &[data-resize-handle='bottom-left'] { bottom: -5px !important; left: -5px !important; top: auto !important; cursor: nesw-resize; }
    &[data-resize-handle='bottom-right'] { right: -5px !important; bottom: -5px !important; top: auto !important; left: auto !important; cursor: nwse-resize; }
    &[data-resize-handle='top'] { top: -5px !important; left: calc(50% - 5px) !important; right: auto !important; cursor: ns-resize; }
    &[data-resize-handle='bottom'] { bottom: -5px !important; top: auto !important; left: calc(50% - 5px) !important; right: auto !important; cursor: ns-resize; }
    &[data-resize-handle='left'] { left: -5px !important; top: calc(50% - 5px) !important; bottom: auto !important; cursor: ew-resize; }
    &[data-resize-handle='right'] { right: -5px !important; left: auto !important; top: calc(50% - 5px) !important; bottom: auto !important; cursor: ew-resize; }
  }
}

/*
 * Dialog layout primitives.
 *
 * Dialogs lay their fields out with a self-contained 12-column grid instead
 * of VRow/VCol. The bundled Vuetify 3 components emit v3 grid classes
 * (.v-col-*, .v-col-md-*), but Vuetify 4 renamed them (.v-col--cols-*), so
 * the consumer's Vuetify stylesheet does not size the columns and every
 * field collapses onto a single row. Keeping the layout inside tiptapify
 * makes it work with Vuetify 3 and 4 alike, regardless of the CSS the
 * consumer loads.
 *
 * The 960px breakpoint preserves the Vuetify 3 "md" threshold
 * (Vuetify 4 lowered it to 840px).
 */
.tiptapify-dialog-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(12, minmax(0, 1fr));

  > .tiptapify-dialog-col {
    grid-column: 1 / -1;
    min-width: 0;
  }

  @media (min-width: 960px) {
    > .tiptapify-dialog-col--3 {
      grid-column: span 3;
    }

    > .tiptapify-dialog-col--4 {
      grid-column: span 4;
    }

    > .tiptapify-dialog-col--6 {
      grid-column: span 6;
    }

    > .tiptapify-dialog-col--8 {
      grid-column: span 8;
    }
  }
}

.tiptapify-dialog-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;

  > .tiptapify-dialog-actions__start,
  > .tiptapify-dialog-actions__end {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
