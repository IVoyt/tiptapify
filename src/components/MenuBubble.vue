<script setup lang="ts">
import LinkDialog from "@tiptapify/components/extensions/components/LinkDialog.vue";
import { useEditor } from "@tiptapify/composable/useEditor";
import { defineProps, ref } from "vue";
import { BubbleMenu } from '@tiptap/vue-3/menus'
import * as mdi from '@mdi/js'

defineProps({
  variant: { type: String, default () { return 'flat' }},
})

const { editor } = useEditor()
const editorInstance = ref(editor.getInstance())

const bubbleMenuLinkButton = ref(null)

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
        <VBtn
            @click="editorInstance.chain().focus().toggleBold().run()"
            :active="editorInstance.isActive('bold')"
            size="small"
        >
          <VIcon :icon="mdi.mdiFormatBold" size="16" />
        </VBtn>
        <VBtn
            @click="editorInstance.chain().focus().toggleItalic().run()"
            :active="editorInstance.isActive('italic')"
            size="small"
        >
          <VIcon :icon="mdi.mdiFormatItalic" size="16" />
        </VBtn>
        <VBtn
            @click="editorInstance.chain().focus().toggleStrike().run()"
            :active="editorInstance.isActive('strike')"
            size="small"
        >
          <VIcon :icon="mdi.mdiFormatStrikethroughVariant" size="16" />
        </VBtn>
        <VBtn @click="linkAction" :active="editorInstance.isActive('link')" size="small">
          <VIcon :icon="`${ editorInstance.isActive('link') ? mdi.mdiLinkOff : mdi.mdiLink}`" size="16" />
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
