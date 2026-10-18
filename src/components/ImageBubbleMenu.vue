<script setup lang="ts">
import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import { BubbleMenu } from '@tiptap/vue-3/menus'
import { NodeSelection } from '@tiptap/pm/state'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import { ImageAlign } from '@tiptapify/extensions/components/media/image/caption'
import { inject, Ref, ref } from 'vue'
import { ComposerTranslation } from 'vue-i18n'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'

// The toolbar on a selected image: float toggles (or, for a slide, its place in the slider), download, edit, removal
const editor = inject('tiptapifyEditor') as Ref<Editor>

// The image menu follows the buttons shape flag: a quiet carrier in the quiet shape
const { shape } = useTiptapifyConfig()

// The menu follows its text or image when the editor scrolls inside its own box; it is created once the
// box is there, as the menu reads its options only when it is created
const scrollTarget = inject<Ref<HTMLElement | null>>('tiptapifyScrollContainer', ref(null))

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

// Without a float the image stands centered on its own line; a second click on a float removes it
const alignments: Array<{ value: ImageAlign, icon: string, label: string }> = [
  { value: 'left', icon: mdi.mdiFormatFloatLeft, label: 'media.image_toolbar.align_left' },
  { value: 'right', icon: mdi.mdiFormatFloatRight, label: 'media.image_toolbar.align_right' },
]

function isImageSelected({ state }: { state: Editor['state'] }): boolean {
  return state.selection instanceof NodeSelection && state.selection.node.type.name === 'image'
}

function toggleAlign(align: ImageAlign) {
  const current = editor.value.getAttributes('image').align ?? null
  editor.value.chain().focus().updateAttributes('image', { align: current === align ? null : align }).run()
}

// A slide of a slider (extensions/components/media/image/slider.ts) moves among the slides instead of floating
function isSlide(): boolean {
  if (!isImageSelected(editor.value)) {
    return false
  }

  // The selection may sit in text while the menu hides, where the node at it is a text node
  const dom = editor.value.view.nodeDOM(editor.value.state.selection.from)

  return dom instanceof HTMLElement && dom.classList.contains('tiptapify-slide')
}

function download() {
  const { src } = editor.value.getAttributes('image')
  if (src) {
    window.open(src, '_blank', 'noopener')
  }
}

</script>

<template>
  <BubbleMenu
    v-if="editor && scrollTarget"
    :editor="editor"
    plugin-key="tiptapifyImageMenu"
    :options="{ placement: 'top', offset: -52, flip: false, scrollTarget }"
    :should-show="isImageSelected"
  >
    <div class="tiptapify-image-menu" :class="{ 'tiptapify-quiet-buttons': shape.buttons === 'quiet' }">
      <template v-if="isSlide()">
        <VBtn size="32" variant="text" color="" :disabled="!editor.can().moveImage(-1)" @click="editor.chain().focus().moveImage(-1).run()">
          <Tooltip :label="t('media.image_toolbar.move_back')" />
          <BtnIcon :icon="`mdiSvg:${mdi.mdiArrowLeft}`" />
        </VBtn>
        <VBtn size="32" variant="text" color="" :disabled="!editor.can().moveImage(1)" @click="editor.chain().focus().moveImage(1).run()">
          <Tooltip :label="t('media.image_toolbar.move_forward')" />
          <BtnIcon :icon="`mdiSvg:${mdi.mdiArrowRight}`" />
        </VBtn>
      </template>
      <template v-else>
        <VBtn
          v-for="alignment in alignments"
          :key="alignment.label"
          size="32"
          variant="text"
          color=""
          :class="{ 'tiptapify-btn--active': (editor.getAttributes('image').align ?? null) === alignment.value }"
          @click="toggleAlign(alignment.value)"
        >
          <Tooltip :label="t(alignment.label)" />
          <BtnIcon :icon="`mdiSvg:${alignment.icon}`" />
        </VBtn>
      </template>

      <div class="tiptapify-image-menu__divider" />

      <VBtn size="32" variant="text" color="" @click="download">
        <Tooltip :label="t('media.image_toolbar.download')" />
        <BtnIcon :icon="`mdiSvg:${mdi.mdiTrayArrowDown}`" />
      </VBtn>
      <VBtn size="32" variant="text" color="" @click="editor.commands.showTiptapifyImage()">
        <Tooltip :label="t('media.image_toolbar.edit')" />
        <BtnIcon :icon="`mdiSvg:${mdi.mdiImageEditOutline}`" />
      </VBtn>

      <div class="tiptapify-image-menu__divider" />

      <VBtn size="32" variant="text" color="" @click="editor.chain().focus().deleteSelection().run()">
        <Tooltip :label="t('media.image_toolbar.delete')" />
        <BtnIcon :icon="`mdiSvg:${mdi.mdiTrashCanOutline}`" />
      </VBtn>
    </div>
  </BubbleMenu>
</template>

<style scoped lang="scss">
/*
 * The image menu follows the bubble tokens: one rule, the classic shape's base as fallback;
 * the quiet shape paints its border/radius/shadow from the same tokens.
 * The internal divider is this menu's own layout, not the toolbar divider surface.
 */
.tiptapify-image-menu {
  display: flex;
  align-items: center;
  gap: var(--tf-bubble-gap, 2px);
  padding: var(--tf-bubble-padding, 4px);
  border: var(--tf-bubble-border, none);
  border-radius: var(--tf-bubble-radius, 6px);
  background: var(--tf-bubble-bg, rgb(var(--v-theme-surface)));
  box-shadow: var(--tf-bubble-shadow, 4px 4px 20px var(--dark-gray));
}

.tiptapify-image-menu__divider {
  width: 1px;
  height: 20px;
  margin: 0 4px;
  background: rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>
