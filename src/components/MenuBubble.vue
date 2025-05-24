<script setup lang="ts">
import LinkDialog from "@tiptapify/components/extensions/components/LinkDialog.vue";
import { useEditor } from "@tiptapify/composable/useEditor";
import { computed, defineProps, ref } from "vue";
import { BubbleMenu } from '@tiptap/vue-3/menus'
import * as mdi from '@mdi/js'

defineProps({
  variant: { type: String, default () { return 'flat' }},
})

const { editor } = useEditor()
const editorInstance = ref(editor.getInstance())

const bubbleMenuLinkButton = ref(null)

const items = ref([
  {
    name: 'bold',
    icon: mdi.mdiFormatBold,
    props: {
      active: false,
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleBold().run()),
      color: computed(() => editorInstance.value.isActive('bold') ? 'primary' : ''),
    },
    click: () => editorInstance.value.chain().focus().toggleBold().run(),
  },
  {
    name: 'italic',
    icon: mdi.mdiFormatItalic,
    props: {
      active: false,
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleItalic().run()),
      color: computed(() => editorInstance.value.isActive('italic') ? 'primary' : ''),
    },
    click: () => editorInstance.value.chain().focus().toggleItalic().run(),
  },
  {
    name: 'strike',
    icon: mdi.mdiFormatStrikethroughVariant,
    props: {
      active: false,
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleStrike().run()),
      color: computed(() => editorInstance.value.isActive('strike') ? 'primary' : ''),
    },
    click: () => editorInstance.value.chain().focus().toggleStrike().run(),
  },
  {
    name: 'underline',
    icon: mdi.mdiFormatUnderline,
    props: {
      active: false,
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleUnderline().run()),
      color: computed(() => editorInstance.value.isActive('underline') ? 'primary' : ''),
    },
    click: () => editorInstance.value.chain().focus().toggleUnderline().run(),
  },
  {
    name: 'highlight',
    icon: mdi.mdiFormatColorHighlight,
    props: {
      active: false,
      disabled: computed(() => !editorInstance.value.can().chain().focus().toggleHighlight().run()),
      color: computed(() => editorInstance.value.isActive('highlight') ? 'primary' : ''),
    },
    click: () => editorInstance.value.chain().focus().toggleHighlight().run(),
  },
  {
    name: 'link',
    icon: computed(() => editorInstance.value.isActive('link') ? mdi.mdiLinkOff : mdi.mdiLink),
    props: {
      active: false,
      color: computed(() => editorInstance.value.isActive('link') ? 'primary' : ''),
      disabled: computed(() => editorInstance.value.isActive('code') || editorInstance.value.isActive('codeBlock')),
    },
    click: () => linkAction(),
  }
])

function linkAction() {
  return editorInstance.value.isActive('link')
      ? editorInstance.value.chain().focus().unsetLink().run()
      : bubbleMenuLinkButton.value?.open()
}
</script>

<template>
<!--  <BubbleMenu v-if="editorInstance" :editor="editorInstance" :tippy-options="{ duration: 100 }">-->
  <BubbleMenu v-if="editorInstance" :editor="editorInstance">
    <div class="bubble-menu">
      <VBtnToggle divided density="compact" :variant="variant">
        <VBtn v-for="(item, key) in items" :key="key" v-bind="item.props" @click="item.click" size="small">
          <VIcon :icon="item.icon" size="16" />
        </VBtn>
      </VBtnToggle>
    </div>
  </BubbleMenu>

  <LinkDialog ref="bubbleMenuLinkButton" />
</template>

<style scoped lang="scss">
.bubble-menu {
  border-radius: 4px;
  border-color: var(--gray-3);
  border-style: solid;
  border-width: 1px;
  box-shadow: var(--shadow);
}
</style>
