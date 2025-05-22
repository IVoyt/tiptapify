<script setup lang="ts">
import { useEditor } from "@tiptapify/composable/useEditor";
import { defineProps, ref } from "vue";
import { FloatingMenu } from '@tiptap/vue-3/menus'
import * as mdi from '@mdi/js'

defineProps({
  variant: { type: String, default () { return '' }},
})

const { editor } = useEditor()
const editorInstance = ref(editor.getInstance())
</script>

<template>
<!--  <FloatingMenu v-if="editorInstance" :editor="editorInstance" :tippy-options="{ duration: 100 }" >-->
  <FloatingMenu v-if="editorInstance" :editor="editorInstance">
    <div class="floating-menu">
      <VBtnToggle divided density="compact" :variant="`${variant || 'plain'}`">
        <VBtn
            @click="editorInstance.chain().focus().toggleHeading({ level: 1 }).run()"
            :color="`${editorInstance.isActive('heading', { level: 1 }) ? 'primary' : ''}`"
            size="small"
        >
          <VIcon :icon="mdi['mdiFormatHeader1']" size="16" />
        </VBtn>
        <VBtn
            @click="editorInstance.chain().focus().toggleHeading({ level: 2 }).run()"
            :color="`${editorInstance.isActive('heading', { level: 2 }) ? 'primary' : ''}`"
            size="small"
        >
          <VIcon :icon="mdi['mdiFormatHeader2']" size="16" />
        </VBtn>
        <VBtn
            @click="editorInstance.chain().focus().toggleBulletList().run()"
            :color="`${editorInstance.isActive('bulletList') ? 'primary' : ''}`"
            size="small"
        >
          <VIcon :icon="mdi['mdiFormatListBulleted']" size="16" />
        </VBtn>
      </VBtnToggle>
    </div>
  </FloatingMenu>
</template>

<style scoped lang="scss">
.floating-menu {
  border-radius: 4px;
  border-color: var(--gray-3);
  border-style: solid;
  border-width: 1px;
  box-shadow: var(--shadow);
}
</style>
