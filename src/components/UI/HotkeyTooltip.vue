<script setup lang="ts">

import { computed } from 'vue'
import { hotkeyParts } from '@tiptapify/utils/hotkeys'

const props = defineProps({
  label: { type: String, required: true },
  hotkey: { type: String, required: true },
})

const parts = computed(() => hotkeyParts(props.hotkey))

</script>

<template>
  <span class="t-hotkey-tooltip">
    <span class="t-hotkey-tooltip__label">{{ label }}</span>
    <span class="t-hotkey-tooltip__hotkey">
      <template v-for="(part, index) in parts" :key="index">
        <span v-if="index" class="t-hotkey-sep">+</span>
        <VIcon v-if="part.icon" :icon="part.icon" size="12" class="t-hotkey-icon" />
        <span v-else>{{ part.label }}</span>
      </template>
    </span>
  </span>
</template>

<style scoped lang="scss">
.t-hotkey-tooltip {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 4px 0;
  white-space: nowrap;
}

.t-hotkey-tooltip__hotkey {
  align-items: center;
  background: rgba(127, 127, 127, .2);
  background: color-mix(in srgb, currentColor 14%, transparent);
  border-radius: 4px;
  display: inline-flex;
  font-family: 'JetBrainsMono', ui-monospace, Menlo, Consolas, monospace;
  font-size: 11px;
  gap: 4px;
  letter-spacing: .03em;
  padding: 3px 6px;

  .t-hotkey-icon {
    font-size: 12px;
  }
}
</style>
