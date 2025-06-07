<script setup lang="ts">
import { Editor } from "@tiptap/vue-3";
import { defineProps, inject, Ref } from "vue";
import { FloatingMenu } from '@tiptap/vue-3/menus'
import * as mdi from '@mdi/js'

defineProps({
  variant: { type: String, default () { return '' }},
  theme: { type: String, default () { return 'light' }},
})

const editor = inject('tiptapifyEditor') as Ref<Editor>
</script>

<template>
  <FloatingMenu v-if="editor" :editor="editor">
    <div class="floating-menu">
      <VCard>
        <VCardText class="pa-0">
          <VToolbar :theme="theme" density="compact" height="auto" class="p-0">
            <VToolbarItems>
              <VBtnGroup divided density="compact">
                <VBtn
                    @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                    :color="`${editor.isActive('heading', { level: 1 }) ? 'primary' : ''}`"
                    size="small"
                >
                  <VIcon :icon="mdi['mdiFormatHeader1']" size="16" />
                </VBtn>
                <VBtn
                    @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                    :color="`${editor.isActive('heading', { level: 2 }) ? 'primary' : ''}`"
                    size="small"
                >
                  <VIcon :icon="mdi['mdiFormatHeader2']" size="16" />
                </VBtn>
                <VBtn
                    @click="editor.chain().focus().toggleBulletList().run()"
                    :color="`${editor.isActive('bulletList') ? 'primary' : ''}`"
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
