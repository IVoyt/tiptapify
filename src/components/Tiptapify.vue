<script setup lang="ts">

import defaults from '@tiptapify/constants/defaults'
import { itemsPropType, toolbarSections } from '@tiptapify/types/toolbarTypes'
import { SlashCommandsConfig } from '@tiptapify/types/slashCommandsTypes'
import { computed, onBeforeUnmount, PropType, provide, ref, ShallowRef } from 'vue'
import { default as Toolbar } from '@tiptapify/components/Toolbar/Index.vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { TiptapifyAiOptions, TiptapifyEditor, variantBtnTypes, variantFieldTypes } from '@tiptapify/types/editor'
import MenuBubble from '@tiptapify/components/MenuBubble.vue'
import MenuFloating from '@tiptapify/components/MenuFloating.vue'

import { useI18n } from 'vue-i18n'

import { getTiptapEditor } from '@tiptapify/components/index'

import Footer from '@tiptapify/components/Footer.vue'
import { useTheme } from 'vuetify/framework'

const props = defineProps({
  locale: { type: String, default () { return 'en' } },
  content: { type: [String, Object] as PropType<string | Record<string, never>>, required: true },
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
  defaultFontFamily: { type: String, default () { return 'Inter' } },
  fontMeasure: { type: String, default () { return 'px' } },
  rounded: { type: String, default () { return '0' } },
  customExtensions: { type: Array as PropType<toolbarSections>, default() { return [] } },
  ai: { type: [Boolean, Object] as PropType<boolean | TiptapifyAiOptions>, default() { return false } },
  interactiveStyles: { type: Boolean, default() { return true } },
  loading: { type: Boolean, default() { return false } },
  loadingColor: { type: String, default() { return 'default' } },
  loadingHeight: { type: String, default() { return '1px' } },
})

const loadingProgress = ref(0)

const { t } = useI18n()

const appTheme = useTheme()
const currentTheme = ref(appTheme.global.name)

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

  return {
    ...options,
    enabled: true,
    promptExamples: options.promptExamples?.length ? options.promptExamples : defaultAiPromptExamples.value,
  }
})

function contentChanged() {
  emit('content-changed', { html: editor.value?.getHTML(), json: editor.value?.getJSON() })
}

const editor: ShallowRef<Editor | undefined> = getTiptapEditor(
    props.content,
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
)

const emit = defineEmits(['update:modelValue', 'editor-ready', 'content-changed'])

provide('tiptapifyEditor', editor)
provide('tiptapifyI18n', { t })
provide('tiptapifyAi', tiptapifyAi)

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
    <div :class="`border border-t-0 rounded-t-${rounded} rounded-b-${rounded}`">
      <template v-if="toolbar">
        <Toolbar
          v-if="editor"
          :variant-btn="variantBtn"
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

      <div class="pa-2 tiptapify-container resizable" :style="computeResizableHeight">
        <MenuFloating v-if="floatingMenu" :variant="variantBtn" :theme="currentTheme" />

        <MenuBubble v-if="bubbleMenu" :variant="variantBtn" :theme="currentTheme" />

        <EditorContent :editor="editor" class="tiptapify-editor" />
      </div>

      <Footer :show-words-count="showWordsCount" :show-characters-count="showCharactersCount" />
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
  --red-light: #FFEBE5;
  --shadow: 0px 12px 33px 0px rgba(0, 0, 0, .06), 0px 3.618px 9.949px 0px rgba(0, 0, 0, .04);
  --border: 1px solid var(--gray-2);
}

.resizable {
  resize: vertical;
  overflow: auto;
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

  [data-node="image"].has-focus {
    [data-resize-handle] {
      position: absolute;
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.8);
      border-radius: 2px;
      z-index: 10;

      &:hover {
        background: rgba(0, 0, 0, 0.8);
      }

      /* Corner handles */
      &[data-resize-handle='top-left'],
      &[data-resize-handle='top-right'],
      &[data-resize-handle='bottom-left'],
      &[data-resize-handle='bottom-right'] {
        width: 8px;
        height: 8px;
      }

      &[data-resize-handle='top-left'] {
        top: -4px;
        left: -4px;
        cursor: nwse-resize;
      }

      &[data-resize-handle='top-right'] {
        top: -4px;
        right: -4px;
        cursor: nesw-resize;
      }

      &[data-resize-handle='bottom-left'] {
        bottom: -4px;
        left: -4px;
        cursor: nesw-resize;
      }

      &[data-resize-handle='bottom-right'] {
        bottom: -4px;
        right: -4px;
        cursor: nwse-resize;
      }

      /* Edge handles */
      &[data-resize-handle='top'],
      &[data-resize-handle='bottom'] {
        height: 6px;
        left: 8px;
        right: 8px;
      }

      &[data-resize-handle='top'] {
        top: -3px;
        cursor: ns-resize;
      }

      &[data-resize-handle='bottom'] {
        bottom: -3px;
        cursor: ns-resize;
      }

      &[data-resize-handle='left'],
      &[data-resize-handle='right'] {
        width: 6px;
        top: 8px;
        bottom: 8px;
      }

      &[data-resize-handle='left'] {
        left: -3px;
        cursor: ew-resize;
      }

      &[data-resize-handle='right'] {
        right: -3px;
        cursor: ew-resize;
      }
    }

    [data-resize-state='true'] [data-resize-wrapper] {
      outline: 1px solid rgba(0, 0, 0, 0.25);
      border-radius: 0.125rem;
    }
  }
}
</style>
