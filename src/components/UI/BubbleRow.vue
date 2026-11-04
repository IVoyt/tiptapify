<script setup lang="ts">
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'

// The surface of the menus floating over the text (selection, empty line, image): one row of 32px icon
// buttons in groups split by `.tiptapify-bubble-divider`; an active button carries `.tiptapify-btn--active`
const { shape } = useTiptapifyConfig()
</script>

<template>
  <div class="tiptapify-bubble-row" :class="{ 'tiptapify-quiet-buttons': shape.buttons === 'quiet' }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
/* The fallbacks are the classic shape's base: the default skin emits no bubble tokens */
.tiptapify-bubble-row {
  display: flex;
  align-items: center;
  gap: var(--tf-bubble-gap, 2px);
  padding: var(--tf-bubble-padding, 4px);
  border: var(--tf-bubble-border, none);
  border-radius: var(--tf-bubble-radius, 6px);
  background: var(--tf-bubble-bg, rgb(var(--v-theme-surface)));
  box-shadow: var(--tf-bubble-shadow, 0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08));
}

:slotted(.tiptapify-bubble-divider) {
  flex: none;
  width: 1px;
  height: 20px;
  margin: 0 4px;
  background: rgba(var(--v-border-color), var(--v-border-opacity));
}

/* The classic pressed look: a primary tint (the quiet shape paints its own, Toolbar/Index.vue) */
.tiptapify-bubble-row:not(.tiptapify-quiet-buttons) :slotted(.v-btn.tiptapify-btn--active) {
  background-color: rgba(var(--v-theme-primary), 0.12);
  color: rgb(var(--v-theme-primary));
}
</style>
