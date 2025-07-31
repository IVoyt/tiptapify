<script setup lang="ts">

import { extensionComponents } from "@tiptapify/types/extensionComponents";
import { computed, onBeforeUnmount, PropType, provide, ref, ShallowRef, watch } from "vue";
import { default as Toolbar } from "@tiptapify/components/Toolbar/Index.vue";
import { Editor, EditorContent } from '@tiptap/vue-3'
import MenuBubble from '@tiptapify/components/MenuBubble.vue'
import MenuFloating from '@tiptapify/components/MenuFloating.vue'

import { useI18n } from "vue-i18n";

import { getTiptapEditor } from "@tiptapify/components/index";

import Footer from '@tiptapify/components/Footer.vue'
import { useTheme } from "vuetify/framework";

const { t } = useI18n();

const props = defineProps({
  content: String|Object,
  variantBtn: { type: String, default () { return 'elevated' } },
  variantField: { type: String, default () { return 'solo' } },
  toolbar: { type: Boolean, default () { return true } },
  items: { type: Array<string>, default() { return [] }},
  itemsExclude: { type: Boolean, default() { return false } },
  bubbleMenu: { type: Boolean, default () { return true } },
  floatingMenu: { type: Boolean, default () { return true } },
  slashCommands: { type: Boolean, default () { return true } },
  placeholder: { type: String, default () { return '' } },
  showWordsCount: { type: Boolean, default () { return true } },
  showCharactersCount: { type: Boolean, default () { return true } },
  defaultFontFamily: { type: String, default () { return 'Inter' } },
  fontMeasure: { type: String, default () { return 'px' } },
  rounded: { type: String, default () { return '0' } },
  customExtensions: { type: Object as PropType<extensionComponents>, default() { return {} } },
})

const appTheme = useTheme()
const currentTheme = ref(appTheme.global.name)

const editor: ShallowRef<Editor | undefined> = getTiptapEditor(
    props.content,
    computed(() => props.placeholder || t('content.placeholder')).value,
    props.slashCommands,
    props.customExtensions
)

const emit = defineEmits(['update:modelValue', 'editor-ready']);

provide('tiptapifyEditor', editor)

editor.value?.chain().setFontFamily(props.defaultFontFamily).run()

watch(() => editor.value, (editorInstance) => {
  if (editorInstance instanceof Editor) {
    emit('editor-ready', {
      editor: editorInstance,
      getHTML: () => editorInstance.getHTML(),
      getJSON: () => editorInstance.getJSON(),
    });
  }
}, { immediate: true });

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<template>
  <VContainer>
    <VRow>
      <VCol>
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

        <div :class="`border border-t-0 rounded-b-${rounded}`">
          <div class="pa-2 tiptapify-container">
            <MenuFloating v-if="floatingMenu" :variant="variantBtn" :theme="currentTheme" />

            <MenuBubble v-if="bubbleMenu" :variant="variantBtn" :theme="currentTheme" />

            <EditorContent :editor="editor" class="tiptapify-editor" />
          </div>

          <Footer :show-words-count="showWordsCount" :show-characters-count="showCharactersCount" />
        </div>
      </VCol>
    </VRow>
  </VContainer>
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
    margin: none;
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

}
</style>
