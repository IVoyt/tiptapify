<script setup lang="ts">
import LinkDialog from "@tiptapify/components/extensions/components/LinkDialog.vue";
import { useEditor } from "@tiptapify/composable/useEditor";
import { computed, defineProps, ref } from "vue";
import { BubbleMenu } from '@tiptap/vue-3/menus'
import * as mdi from '@mdi/js'

defineProps({
  variant: { type: String, default () { return 'flat' }},
  theme: { type: String, default () { return 'light' }},
})

const { editor } = useEditor()
const editorInstance = ref(editor.getInstance())

const bubbleMenuLinkButton = ref(null)

const items = ref([
  {
    name: 'bold',
    icon: mdi.mdiFormatBold,
    props: {
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleBold().run()),
      color: computed(() => editorInstance.value.isActive('bold') ? 'primary' : ''),
    },
    click: () => editorInstance.value.chain().focus().toggleBold().run(),
  },
  {
    name: 'italic',
    icon: mdi.mdiFormatItalic,
    props: {
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleItalic().run()),
      color: computed(() => editorInstance.value.isActive('italic') ? 'primary' : ''),
    },
    click: () => editorInstance.value.chain().focus().toggleItalic().run(),
  },
  {
    name: 'strike',
    icon: mdi.mdiFormatStrikethroughVariant,
    props: {
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleStrike().run()),
      color: computed(() => editorInstance.value.isActive('strike') ? 'primary' : ''),
    },
    click: () => editorInstance.value.chain().focus().toggleStrike().run(),
  },
  {
    name: 'underline',
    icon: mdi.mdiFormatUnderline,
    props: {
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleUnderline().run()),
      color: computed(() => editorInstance.value.isActive('underline') ? 'primary' : ''),
    },
    click: () => editorInstance.value.chain().focus().toggleUnderline().run(),
  },
  {
    name: 'highlight',
    icon: mdi.mdiFormatColorHighlight,
    props: {
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleHighlight().run()),
      color: computed(() => editorInstance.value.isActive('highlight') ? 'primary' : ''),
    },
    click: () => editorInstance.value.chain().focus().toggleHighlight().run(),
  },
  {
    name: 'code',
    icon: mdi.mdiXml,
    props: {
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleCode().run()),
      color: computed(() => editorInstance.value.isActive('code') ? 'primary' : ''),
    },
    click: () => editorInstance.value.chain().focus().toggleCode().run(),
  },
  {
    name: 'link',
    icon: computed(() => editorInstance.value.isActive('link') ? mdi.mdiLinkOff : mdi.mdiLink),
    props: {
      color: computed(() => editorInstance.value.isActive('link') ? 'primary' : ''),
      disabled: computed(() => editorInstance.value.isActive('code') || editorInstance.value.isActive('codeBlock')),
    },
    click: () => linkAction(),
  },
  {
    name: 'format clear',
    icon: mdi.mdiFormatClear,
    click: () => editorInstance.value.chain().focus().unsetAllMarks().clearNodes().run(),
  }
])

function linkAction() {
  return editorInstance.value.isActive('link')
      ? editorInstance.value.chain().focus().unsetLink().run()
      : bubbleMenuLinkButton.value?.open()
}
</script>

<template>
  <BubbleMenu v-if="editorInstance" :editor="editorInstance" :options="{ placement: 'bottom' }">
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

  <LinkDialog ref="bubbleMenuLinkButton" />
</template>

<style scoped lang="scss">
.bubble-menu {
  border-radius: 6px;
  box-shadow: 4px 4px 20px var(--dark-gray);
}
</style>
