<script setup lang="ts">
import { ref, watch } from 'vue'
import * as mdi from '@mdi/js'
import type { SlashCommand } from '@tiptapify/types/slashCommandsTypes'

const props = defineProps<{
  items: SlashCommand[]
  command: (item: SlashCommand) => void
}>()

const selectedIndex = ref(0)

watch(() => props.items, () => {
  selectedIndex.value = 0
}, { deep: true })

function onKeyDown({ event }: { event: KeyboardEvent }) {
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

function selectItem(index: number) {
  const item = props.items[index]

  if (item) {
    props.command(item)
  }
}

function getIcon(iconName: string) {
  const iconKey = `mdi${iconName}` as keyof typeof mdi
  return mdi[iconKey] || mdi.mdiImageBrokenVariant
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
      <button
        v-for="(item, index) in items"
        :key="index"
        class="item"
        :class="{ 'is-selected': index === selectedIndex }"
        @click="selectItem(index)"
        @mouseenter="selectedIndex = index"
      >
        <span class="item-icon">
          <VIcon :icon="`mdiSvg:${getIcon(item.icon)}`" size="18" />
        </span>
        <span class="item-title">{{ item.title }}</span>
      </button>
    </template>
    <div v-else class="no-result">
      No result
    </div>
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
  max-height: 300px;
  min-width: 200px;
}

.item {
  align-items: center;
  background: transparent;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  text-align: left;
  transition: background-color 0.15s ease;

  &:hover,
  &.is-selected {
    background: var(--gray-1);
  }
}

.item-icon {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 24px;
}

.item-title {
  color: var(--black);
  font-size: 0.875rem;
  font-weight: 500;
}

.no-result {
  color: var(--gray-5);
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
}
</style>
