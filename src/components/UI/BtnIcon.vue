<script setup lang="ts">
import * as mdi from '@mdi/js'

defineProps({
  icon: String
})

const isSvgString = (icon: any) => {
  return typeof icon === 'string' && icon.includes('<svg')
}
</script>

<template>
  <div v-if="isSvgString(icon)" v-html="icon" class="v-icon tiptapify-btn-svg-icon"></div>
  <VIcon v-else :icon="icon || `mdiSvg:${mdi.mdiImageBrokenVariant}`" size="20" />
</template>

<style lang="scss" scoped>
.tiptapify-btn-svg-icon {
  width: 20px;
  height: 20px;
}
</style>
