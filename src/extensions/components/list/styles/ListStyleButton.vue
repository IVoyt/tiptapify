<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { ListStylePreset, ListType } from '@tiptapify/extensions/components/list/styles'
import { inject, PropType, Ref } from 'vue'
import { ComposerTranslation } from 'vue-i18n'

// A list button with a dropdown of marker styles next to it, like TinyMCE's advlist
const props = defineProps({
  listType: { type: String as PropType<ListType>, required: true },
  icon: { type: String, required: true },
  label: { type: String, required: true },
  hotkey: { type: String, default: '' },
  presets: { type: Array as PropType<ListStylePreset[]>, required: true },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['toggle'])

const { variantBtn } = useTiptapifyConfig()

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

function isPresetActive(preset: ListStylePreset): boolean {
  return editor.value.isActive(props.listType) && (editor.value.getAttributes(props.listType).listStyleType ?? null) === preset.value
}

function presetLabel(preset: ListStylePreset): string {
  return t(`lists.styles.${(preset.value ?? 'default').replace('-', '_')}`)
}
</script>

<template>
  <div class="tiptapify-list-style-button">
    <VBtn
      :color="editor.isActive(listType) ? 'primary' : ''"
      :disabled="disabled"
      :variant="variantBtn"
      size="32"
      @click="emit('toggle')"
    >
      <Tooltip :label="label" :hotkey="hotkey" />
      <BtnIcon :icon="`mdiSvg:${icon}`" />
    </VBtn>

    <VMenu content-class="tiptapify-menu">
      <template #activator="{ props: menuProps }">
        <VBtn
          class="tiptapify-list-style-button__chevron"
          :disabled="disabled"
          :variant="variantBtn"
          height="32"
          width="16"
          v-bind="menuProps"
        >
          <BtnIcon :icon="`mdiSvg:${mdi.mdiChevronDown}`" />
        </VBtn>
      </template>

      <div class="tiptapify-list-style-grid">
        <button
          v-for="preset in presets"
          :key="preset.value ?? 'default'"
          type="button"
          class="tiptapify-list-style-grid__item"
          :class="{ 'tiptapify-list-style-grid__item--active': isPresetActive(preset) }"
          :title="presetLabel(preset)"
          :aria-label="presetLabel(preset)"
          @click="editor.chain().focus().setListStyle(listType, preset.value).run()"
        >
          <span v-for="(marker, index) in preset.markers" :key="index" class="tiptapify-list-style-grid__line">
            <span class="tiptapify-list-style-grid__marker">{{ marker }}</span>
            <span class="tiptapify-list-style-grid__bar" />
          </span>
        </button>
      </div>
    </VMenu>
  </div>
</template>

<style lang="scss" scoped>
.tiptapify-list-style-button {
  display: flex;
  align-items: center;

  :deep(.tiptapify-list-style-button__chevron) {
    min-width: 16px !important;
    padding: 0 !important;

    .v-icon {
      width: 16px;
      height: 16px;
    }
  }
}
</style>

<style lang="scss">
/* Teleported with the menu, so not scoped */
.tiptapify-list-style-grid {
  display: grid;
  grid-template-columns: repeat(3, 64px);
  gap: 6px;
  padding: 6px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  background: rgb(var(--v-theme-surface));
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.tiptapify-list-style-grid__item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 6px;
  border: 1px solid transparent;
  border-radius: 6px;
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
  cursor: pointer;

  &:hover {
    background: rgba(var(--v-theme-on-surface), 0.05);
  }

  &--active {
    border-color: rgb(var(--v-theme-primary));
    background: rgba(var(--v-theme-primary), 0.06);
  }
}

.tiptapify-list-style-grid__line {
  display: flex;
  align-items: center;
  gap: 4px;
}

.tiptapify-list-style-grid__marker {
  min-width: 16px;
  font-size: 10px;
  line-height: 10px;
  text-align: right;
}

.tiptapify-list-style-grid__bar {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: rgba(var(--v-theme-on-surface), 0.18);
}
</style>
