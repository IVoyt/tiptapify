<script setup lang="ts">
import { Editor } from "@tiptap/vue-3";
import { computed, defineProps, inject, Ref, ref } from "vue";
import { BubbleMenu } from '@tiptap/vue-3/menus'
import * as mdi from '@mdi/js'

defineProps({
  variant: { type: String, default () { return 'flat' }},
  theme: { type: String, default () { return 'light' }},
})

const editor = inject('tiptapifyEditor') as Ref<Editor>

const items = ref([
  {
    name: 'bold',
    icon: mdi.mdiFormatBold,
    props: {
      disabled: computed(() => !editor?.value.can().chain().focus().toggleBold().run()),
      color: computed(() => editor.value.isActive('bold') ? 'primary' : ''),
    },
    click: () => editor.value.chain().focus().toggleBold().run(),
  },
  {
    name: 'italic',
    icon: mdi.mdiFormatItalic,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleItalic().run()),
      color: computed(() => editor.value.isActive('italic') ? 'primary' : ''),
    },
    click: () => editor.value.chain().focus().toggleItalic().run(),
  },
  {
    name: 'strike',
    icon: mdi.mdiFormatStrikethroughVariant,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleStrike().run()),
      color: computed(() => editor.value.isActive('strike') ? 'primary' : ''),
    },
    click: () => editor.value.chain().focus().toggleStrike().run(),
  },
  {
    name: 'underline',
    icon: mdi.mdiFormatUnderline,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleUnderline().run()),
      color: computed(() => editor.value.isActive('underline') ? 'primary' : ''),
    },
    click: () => editor.value.chain().focus().toggleUnderline().run(),
  },
  {
    name: 'highlight',
    icon: mdi.mdiFormatColorHighlight,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleHighlight().run()),
      color: computed(() => editor.value.isActive('highlight') ? 'primary' : ''),
    },
    click: () => editor.value.chain().focus().toggleHighlight().run(),
  },
  {
    name: 'code',
    icon: mdi.mdiXml,
    props: {
      disabled: computed(() => !editor.value.can().chain().focus().toggleCode().run()),
      color: computed(() => editor.value.isActive('code') ? 'primary' : ''),
    },
    click: () => editor.value.chain().focus().toggleCode().run(),
  },
  {
    name: 'link',
    icon: computed(() => editor.value.isActive('link') ? mdi.mdiLinkOff : mdi.mdiLink),
    props: {
      color: computed(() => editor.value.isActive('link') ? 'primary' : ''),
      disabled: computed(() => editor.value.isActive('code') || editor.value.isActive('codeBlock')),
    },
    click: () => editor.value.commands.showLink()
  },
  {
    name: 'format clear',
    icon: mdi.mdiFormatClear,
    click: () => editor.value.chain().focus().unsetAllMarks().clearNodes().run(),
  }
])
</script>

<template>
  <BubbleMenu
      v-if="editor"
      :editor="editor"
      :options="{ placement: 'bottom' }"
      :shouldShow="({ editor, view, state, from, to }) => {
        if (editor.isActive('image') || editor.isActive('code') || editor.isActive('codeBlock')) {
          return false
        }

        const docSize = editor.state.doc.content.size
        const isAllSelected = from === 0 && to === docSize

        return (from !== to) && !isAllSelected
      }"
  >
    <div class="bubble-menu">
      <VCard>
        <VCardText class="pa-0">
          <VToolbar :theme="theme" density="compact" height="auto" class="p-0">
            <VToolbarItems>
              <VBtnGroup divided density="compact">
                <VBtn v-for="(item, key) in items" :key="key" v-bind="item.props" @click="item.click" size="x-small">
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
.bubble-menu {
  border-radius: 6px;
  box-shadow: 4px 4px 20px var(--dark-gray);
}
</style>
