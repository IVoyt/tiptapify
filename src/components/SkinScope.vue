<script lang="ts" setup>

import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'

/*
 * Menus teleport out of the editor DOM, so `:style` cannot ride along with a
 * VMenu `content-class`: every tiptapify menu wraps its content in this scope
 * and the skin tokens land on it (spec: Token delivery). The CSS that skins
 * the menus hangs off `.tiptapify-skin-scope` (src/skins/menu.css).
 */
const { tokens } = useTiptapifyConfig()
</script>

<template>
  <div class="tiptapify-skin-scope" :style="tokens">
    <slot />
  </div>
</template>
