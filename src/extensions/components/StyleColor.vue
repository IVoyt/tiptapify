<script setup lang="ts">

import { Editor } from "@tiptap/vue-3";
import { useI18n } from 'vue-i18n'

import { computed, inject, Ref, ref } from 'vue'

const { t } = useI18n()

defineExpose({ open })

const props = defineProps({
  show: { type: Boolean, default: true },
  fontColor: { type: Boolean, default: false },
  backgroundColor: { type: Boolean, default: false },
  color: { type: String, default: '' },
})

const emit = defineEmits(['close'])

const editor = inject('tiptapifyEditor') as Ref<Editor>

const colorPicker = ref(false)
const customColor = ref(computed(() => props.color).value)

const colors = {
  black: '#000',
  darkgray: '#444',
  gray: '#888',
  lightgray: '#ccc',
  white: '#fff',
  cyan: '#00FFFF',
  light: '#0088ff',
  blue: '#0000ff',
  indigo: '#4b0082',
  purple: '#800080',
  pink: '#ff00ff',
  red: '#ff0000',
  orange: '#ff9900',
  yellow: '#ffff00',
  green: '#00ff00',
}

type Color = { r: number, g: number, b: number, a?: number }

function calculateShadowColor(color: string): string {
  const rgb: Color = hexToRgb(color)

  for (const channel of Object.keys(rgb)) {
    rgb[channel] = Math.round(rgb[channel] * .35)
  }

  return Object.values(rgb).join(', ')
}

function hexToRgb(hex: string): Color {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return {
    r: result ? parseInt(result[1], 16) : 0,
    g: result ? parseInt(result[2], 16) : 0,
    b: result ? parseInt(result[3], 16) : 0
  };
}

function setColor(color: string) {
  if (props.fontColor) {
    editor.value.chain().focus().setColor(color).run()
  }

  if (props.backgroundColor) {
    editor.value.chain().focus().setHighlight({ color }).run()
  }

  emit('close')
}

function unsetColor() {
  if (props.fontColor) {
    editor.value.chain().focus().unsetColor().run()
  }

  if (props.backgroundColor) {
    editor.value.chain().focus().unsetHighlight().run()
  }

  emit('close')
}

function isColorActive(color: string): boolean {
  return props.color === color
}
</script>

<template>
  <VSheet class="pa-2">
    <div class="tiptapify-style-color-container">
      <template v-for="colorCode in colors">
        <div
            class="tiptapify-style-color-item"
            :class="isColorActive(colorCode) ? 'tiptapify-style-color-item-active' : ''"
            @click="setColor(colorCode)"
        >
          <div
              class="tiptapify-style-color-picker"
              :style="`background-color: ${colorCode}; box-shadow: 1px 1px 4px rgb(${calculateShadowColor(colorCode)});`"
          ></div>
        </div>
      </template>
    </div>

    <VDivider class="mt-2 mb-2" />

    <VMenu v-model="colorPicker" :close-on-content-click="false">
      <template #activator="{ props: menuProps }">
        <VBtn v-bind="menuProps" variant="flat" block>
          <template #prepend>
            <div
                class="tiptapify-style-color-picker"
                :style="`background-color: ${customColor}; box-shadow: 1px 1px 4px rgb(0, 0, 0, .35);`"
            >
            </div>
          </template>
          <template #default>
            {{ t('style.color.custom') }}
          </template>
        </VBtn>
      </template>

      <VCard>
        <VCardItem>
          <VColorPicker v-model="customColor" elevated elevation="24" hide-inputs />
        </VCardItem>

        <VCardActions>
          <VBtn variant="flat" color="primary" @click="setColor(customColor)">OK</VBtn>
          <VBtn variant="flat" color="grey-400" @click="colorPicker = !colorPicker; customColor = color">Cancel</VBtn>
        </VCardActions>
      </VCard>
    </VMenu>

    <VDivider class="mt-2 mb-2" />

    <VBtn @click="unsetColor" block variant="flat">
      {{ t('style.color.unset') }}
    </VBtn>
  </VSheet>
</template>

<style lang="scss" scoped>
.tiptapify-style-color-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.tiptapify-style-color-item {
  cursor: pointer;
  border-radius: 8px;
  padding: 5px;
  transition: background-color .2s;
}

.tiptapify-style-color-item:hover, .tiptapify-style-color-item-active {
  background-color: #dedede;
}

.tiptapify-style-color-picker {
  width: 24px;
  height: 24px;
  margin: 2px;
  border-radius: 4px;
}
</style>