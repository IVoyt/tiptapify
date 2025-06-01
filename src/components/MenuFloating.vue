<script setup lang="ts">
import { useEditor } from "@tiptapify/composable/useEditor";
import { defineProps, ref } from "vue";
import { FloatingMenu } from '@tiptap/vue-3/menus'
import * as mdi from '@mdi/js'

defineProps({
  variant: { type: String, default () { return '' }},
  theme: { type: String, default () { return 'light' }},
})

const editorInstance = ref(useEditor().editor.getInstance())
</script>

<template>
  <FloatingMenu v-if="editorInstance" :editor="editorInstance">
    <div class="floating-menu">
      <VCard>
        <VCardText class="pa-0">
          <VToolbar :theme="theme" density="compact" height="auto" class="p-0">
            <VToolbarItems>
              <VBtnGroup divided density="compact">
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
              </VBtnGroup>
            </VToolbarItems>
          </VToolbar>
        </VCardText>
      </VCard>
    </div>
  </FloatingMenu>
</template>

<style scoped lang="scss">
.floating-menu {
  border-radius: 6px;
  box-shadow: 4px 4px 20px var(--dark-gray);
}
</style>
