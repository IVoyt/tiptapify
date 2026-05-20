<script lang="ts" setup>
import type { Editor } from '@tiptap/core'
import tiptapifyCharMap from '@tiptapify/extensions/charmap'
import { PickerEventBus } from '@tiptapify/extensions/PickerEventBus'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  editor: Editor,
  t: any
}>()

const filter = ref('')
const activeTab = ref('punctuation')
const sorted = tiptapifyCharMap.sort((previous, current) => {
  if (previous.order < current.order) {
    return -1
  }
  if (previous.order > current.order) {
    return 1
  }
  return 0
})

if (!activeTab.value && sorted.length > 0) {
  activeTab.value = sorted[0].name
}

const chars = computed(() => sorted.map(item => ({ group: item.name, items: item.items })))
const filteredChars = ref(JSON.parse(JSON.stringify(chars.value)))

const handleCharacterClick = (charItem: any) => {
  props.editor.chain().focus().insertContent(charItem.char).run()
  PickerEventBus.emit('close', { type: 'charmap' })
}

const filterChars = () => {
  if (!filter.value) {
    filteredChars.value = JSON.parse(JSON.stringify(chars.value))
    return
  }

  const filtered: any[] = []
  filteredChars.value.forEach((group: any) => {
    const matchingChars = group.items.filter((item: any) =>
        item.name.toLowerCase().match(filter.value.toLowerCase())
    )
    if (matchingChars.length > 0) {
      filtered.push({ ...group, items: matchingChars })
    }
  })
  filteredChars.value = filtered
  if (filtered.length > 0) {
    activeTab.value = filtered[0].group
  }
}

const resetFilter = () => {
  filter.value = ''
  filteredChars.value = JSON.parse(JSON.stringify(chars.value))
}

watch(filter, filterChars)
</script>

<template>
  <div class="tiptapify-slash-picker">
    <div class="tiptapify-slash-picker__sidebar">
      <button
          v-for="item in filteredChars"
          :key="item.group"
          :class="['tiptapify-slash-picker__tab', { 'tiptapify-slash-picker__tab--active': activeTab === item.group }]"
          @click="activeTab = item.group"
      >
        <VTooltip activator="parent">
          {{ t(`media.charmap.categories.${item.group}`) }}
        </VTooltip>
        {{ item.items[0]?.char }}
      </button>
    </div>

    <div class="tiptapify-slash-picker__content">
      <div class="tiptapify-slash-picker__search">
        <input
            v-model="filter"
            type="text"
            placeholder="Search characters..."
            class="tiptapify-slash-picker__search-input"
        />
        <button v-if="filter" class="tiptapify-slash-picker__clear" @click="resetFilter">&times;</button>
      </div>

      <div class="tiptapify-slash-picker__grid-container">
        <div
            v-for="item in filteredChars"
            :key="item.group"
            class="tiptapify-slash-picker__group"
        >
          <div v-show="activeTab === item.group" class="tiptapify-slash-picker__grid">
            <button
                v-for="charItem in item.items"
                :key="charItem.char"
                class="tiptapify-slash-picker__item"
                :title="charItem.name"
                @click="handleCharacterClick(charItem)"
            >
              {{ charItem.char }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tiptapify-slash-picker {
  display: flex;
  width: 450px;
  height: 400px;
  background: rgb(var(--v-theme-surface));
  border-radius: 8px;
  overflow: hidden;
}

.tiptapify-slash-picker__sidebar {
  width: 48px;
  background: rgba(var(--v-theme-on-surface), 0.04);
  border-right: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  padding: 8px 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
}

.tiptapify-slash-picker__tab {
  width: 40px;
  height: 32px;
  font-size: 16px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tiptapify-slash-picker__tab:hover {
  background: rgba(var(--v-theme-on-surface), 0.08);
}

.tiptapify-slash-picker__tab--active {
  background: rgba(var(--v-theme-primary), 0.12);
  color: rgb(var(--v-theme-primary));
}

.tiptapify-slash-picker__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 12px;
}

.tiptapify-slash-picker__search {
  position: relative;
  margin-bottom: 12px;
}

.tiptapify-slash-picker__search-input {
  width: 100%;
  padding: 8px 32px 8px 12px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.24);
  border-radius: 4px;
  font-size: 14px;
  background: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
}

.tiptapify-slash-picker__search-input:focus {
  outline: none;
  border-color: rgb(var(--v-theme-primary));
}

.tiptapify-slash-picker__clear {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  color: rgba(var(--v-theme-on-surface), 0.6);
}

.tiptapify-slash-picker__grid-container {
  flex: 1;
  overflow-y: auto;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 4px;
}

.tiptapify-slash-picker__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(32px, 1fr));
  gap: 2px;
  padding: 4px;
}

.tiptapify-slash-picker__item {
  width: 32px;
  height: 32px;
  font-size: 16px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tiptapify-slash-picker__item:hover {
  background: rgba(var(--v-theme-on-surface), 0.08);
}
</style>
