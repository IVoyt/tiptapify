<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from "@tiptap/vue-3";
import tiptapifyEmojis from "@tiptapify/extensions/emoji"
import { computed, inject, Ref, ref, watch } from 'vue'
import BtnIcon from "@tiptapify/components/UI/BtnIcon.vue";

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as any

const filter = ref(null)
const tab = ref('smileys_and_emotion')
const sorted = tiptapifyEmojis.sort((previous, current) => {
  if (previous.order < current.order) {
    return -1
  }
  if (previous.order > current.order) {
    return 1
  }

  return 0
})
const emojis = computed(() => sorted.map(item => { return { group: item.name, emojis: item.items } }))
const emojisRef = ref(JSON.parse(JSON.stringify(emojis.value)))

const handleEmojiClick = (emoji: any) => {
  editor.value.chain().focus().insertContent(emoji.char).run()
}

const filterEmoji = (filterValue: string) => {
  resetFilter()
  if (!filterValue) {
    return
  }

  const filtered: any[] = []

  const groupItems = emojisRef.value.find(item => item.group === tab.value)
  if (groupItems?.emojis) {
    groupItems.emojis.forEach(item => {
      if (item.name.toLowerCase().match(filterValue)) {
        filtered.push(item)
      }
    })

    groupItems.emojis = filtered
  }
}

const resetFilter = () => {
  emojisRef.value = JSON.parse(JSON.stringify(emojis.value))
}

watch(() => tab.value, () => {
  resetFilter()
  filter.value = null
})

</script>

<template>
  <VBtn
      id="tiptapify-emoji-button"
      :color="editor.isActive('image') ? 'primary' : ''"
      size="32"
  >
    <VTooltip activator="parent">
      {{ t('media.emoji.title') }}
    </VTooltip>
    <BtnIcon :icon="`mdiSvg:${mdi.mdiEmoticon}`" />
  </VBtn>

  <VMenu activator="#tiptapify-emoji-button" :close-on-content-click="false">
    <VSheet class="pa-2" max-width="570">
      <div class="d-flex flex-row">
        <VTabs v-model="tab" mandatory direction="vertical" color="primary" density="compact">
          <VTab
              v-for="item of emojisRef"
              :text="item.group"
              :value="item.group"
              :key="item.group"
              density="compact"
              rounded
              size="small"
          >
            {{ t(`media.emoji.${item.group}`) }}
          </VTab>
        </VTabs>

        <div>
          <VTextField
              v-model="filter"
              label="Filter emoji"
              density="compact"
              variant="solo"
              :prepend-inner-icon="`mdiSvg:${mdi.mdiMagnify}`"
              class="mb-2"
              hide-details
              clearable
              @input="filterEmoji($event.target.value)"
              @click:clear="resetFilter"
          />
          <div class="tiptapify-emoji-container">
            <VWindow v-model="tab" direction="vertical">
              <VWindowItem v-for="item of emojisRef" :value="item.group">
                <div
                    v-for="emojiItem in item.emojis"
                    class="tiptapify-emoji-container-item"
                    @click="handleEmojiClick(emojiItem)"
                    :title="emojiItem.name"
                >
                  <div class="tiptapify-emoji-container-item__overlay">
                  <span>
                    {{ emojiItem.char }}
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

<style lang="scss" scoped>
.tiptapify-emoji-container {
  width: 360px;
  height: 500px;
  overflow-y: auto;

  border: 1px solid rgba(var(--v-theme-on-background), calc(var(--v-border-opacity)));
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(var(--v-theme-on-background), calc(var(--v-border-opacity))) inset;
}

.tiptapify-emoji-container-item__overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 5px;
  z-index: 1;
}

.tiptapify-emoji-container-item {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 32px;
  height: 32px;
  filter: drop-shadow(1px 2px 3px #777);
  transition: background-color 0.2s ease-in-out;
}

.tiptapify-emoji-container-item:hover .tiptapify-emoji-container-item__overlay {
  background-color: rgba(var(--v-theme-on-background), calc(var(--v-hover-opacity) * var(--v-theme-overlay-multiplier)));
}
</style>