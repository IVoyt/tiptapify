<script setup lang="ts">
import { ref, watch } from 'vue'
import * as mdi from '@mdi/js'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  command: {
    type: Function,
    required: true,
  },
})

const selectedIndex = ref(0)

watch(() => props.items, () => {
  selectedIndex.value = 0
}, { deep: true })

function onKeyDown({ event }) {
  if (event.key === 'ArrowUp') {
    upHandler()
    return true
  }

  if (event.key === 'ArrowDown') {
    downHandler()
    return true
  }

  if (event.key === 'Enter') {
    enterHandler()
    return true
  }

  return false
}

function upHandler() {
  selectedIndex.value = (selectedIndex.value + props.items.length - 1) % props.items.length
}

function downHandler() {
  selectedIndex.value = (selectedIndex.value + 1) % props.items.length
}

function enterHandler() {
  selectItem(selectedIndex.value)
}

function selectItem(index) {
  const item = props.items[index]

  if (item) {
    props.command(item)
  }
}

defineExpose({
  onKeyDown,
  upHandler,
  downHandler,
  enterHandler,
  selectItem
})
</script>

<template>
  <div class="dropdown-menu">
    <template v-if="items.length">
      <VBtn
          variant="text"
          v-for="(item, index) in items"
          :key="index"
          @click="selectItem(index)"
          size="small"
      >
        <VIcon v-if="item.icon" :icon="mdi[`mdi${item.icon}`]" size="16" />
        <span v-else>
          {{ item.title }}
        </span>
      </VBtn>
    </template>
    <div class="item" v-else>No result</div>
  </div>
</template>

<style scoped lang="scss">
.dropdown-menu {
  background: var(--white);
  border: 1px solid var(--gray-1);
  border-radius: 0.7rem;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  overflow: auto;
  padding: 0.4rem;
  position: relative;
}
</style>