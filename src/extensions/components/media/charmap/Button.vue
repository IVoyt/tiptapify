<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import tiptapifyCharMap from "@tiptapify/extensions/charmap"
import { computed, inject, Ref, ref, watch } from 'vue'
import * as mdi from '@mdi/js'

defineProps({
  variantBtn: { type: String, default: 'flat' },
})

const editor = inject('tiptapifyEditor') as Ref<Editor>
const { t } = inject('tiptapifyI18n') as any

const filter = ref(null)
const tab = ref('punctuation')
const sorted = tiptapifyCharMap.sort((previous, current) => {
  if (previous.order < current.order) {
    return -1
  }
  if (previous.order > current.order) {
    return 1
  }

  return 0
})

if (!tab.value && sorted.length > 0) {
  tab.value = sorted[0].name
}
const chars = computed(() => sorted.map(item => { return { group: item.name, emojis: item.items } }))
const charMapRef = ref(JSON.parse(JSON.stringify(chars.value)))

const handleCharacterClick = (charItem: any) => {
  editor.value.chain().focus().insertContent(charItem.char).run()
}

const filterChars = (filterValue: string) => {
  resetFilter()
  if (!filterValue) {
    return
  }

  const filtered: any[] = []

  const groupItems = charMapRef.value.find((item: any) => item.group === tab.value)
  if (groupItems?.emojis) {
    groupItems.emojis.forEach((item: any) => {
      if (item.name.toLowerCase().match(filterValue)) {
        filtered.push(item)
      }
    })

    groupItems.emojis = filtered
  }
}

const resetFilter = () => {
  charMapRef.value = JSON.parse(JSON.stringify(chars.value))
}

watch(() => tab.value, () => {
  resetFilter()
  filter.value = null
})

</script>

<template>
  <VBtn :id="`tiptapify-charmap-button-${editor.instanceId}`" :variant="variantBtn" size="32" @click="console.log('click charmap')">
    <VTooltip activator="parent">
      {{ t('media.charmap.title') }}
    </VTooltip>
    <VIcon :icon="`mdiSvg:${mdi.mdiAppleKeyboardCommand}`" tag="svg" size="small" />
  </VBtn>

  <VMenu :activator="`#tiptapify-charmap-button-${editor.instanceId}`" :close-on-content-click="false">
    <VSheet class="pa-2" max-width="580">
      <div class="d-flex flex-row">
        <VTabs v-model="tab" mandatory direction="vertical" color="primary" density="compact">
          <VTab
              v-for="item of charMapRef"
              :text="item.group"
              :value="item.group"
              :key="item.group"
              density="compact"
              rounded
              size="small"
          >
            {{ t(`media.charmap.categories.${item.group}`) }}
          </VTab>
        </VTabs>

        <div class="d-flex flex-column">
          <VTextField
              v-model="filter"
              :label="t('media.charmap.search')"
              density="compact"
              variant="solo"
              :prepend-inner-icon="`mdiSvg:${mdi.mdiMagnify}`"
              class="mb-2 tiptapify-charmap-search"
              hide-details
              clearable
              @update:model-value="filterChars($event)"
              @click:clear="resetFilter"
          />
          <div class="tiptapify-charmap-container">
            <VWindow v-model="tab" direction="vertical">
              <VWindowItem v-for="item of charMapRef" :value="item.group" :transition="false" :reverse-transition="false">
                <div
                    v-for="charItem in item.emojis"
                    class="tiptapify-charmap-container-item"
                    @click="handleCharacterClick(charItem)"
                    :title="charItem.name"
                >
                  <div class="tiptapify-charmap-container-item__overlay">
                    <span>
                      {{ charItem.char }}
                    </span>
                  </div>
                </div>
              </VWindowItem>
            </VWindow>
          </div>
        </div>
      </div>
    </VSheet>
  </VMenu>
</template>

<style scoped lang="scss">
.tiptapify-charmap-container {
  width: 360px;
  height: 550px;
  overflow-y: auto;

  border: 1px solid rgba(var(--v-theme-on-background), calc(var(--v-border-opacity)));
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(var(--v-theme-on-background), calc(var(--v-border-opacity))) inset;
}

.tiptapify-charmap-container-item__overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 5px;
  z-index: 1;
}

.tiptapify-charmap-container-item {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 32px;
  height: 32px;
  transition: background-color 0.2s ease-in-out;
}

.tiptapify-charmap-container-item:hover .tiptapify-emoji-container-item__overlay {
  background-color: rgba(var(--v-theme-on-background), calc(var(--v-hover-opacity) * var(--v-theme-overlay-multiplier)));
}
</style>
