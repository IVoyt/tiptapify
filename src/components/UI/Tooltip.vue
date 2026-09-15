<script setup lang="ts">

import HotkeyTooltip from '@tiptapify/components/UI/HotkeyTooltip.vue'

defineProps({
  label: { type: String, default: '' },
  hotkey: { type: String, default: '' },
  openDelay: { type: Number, default: 500 },
})

</script>

<template>
  <VTooltip activator="parent" :open-delay="openDelay">
    <HotkeyTooltip v-if="hotkey" :label="label" :hotkey="hotkey" />
    <slot v-else>
      {{ label }}
    </slot>
  </VTooltip>
</template>
