<script setup lang="ts">

import { Editor } from "@tiptap/vue-3";

import { computed, inject, Ref, ref } from 'vue'

const { t } = inject('tiptapifyI18n') as any

defineExpose({ open, close })

const props = defineProps({
  fontColor: { type: Boolean, default: false },
  backgroundColor: { type: Boolean, default: false },
  color: { type: String, default: '' },
})

const editor = inject('tiptapifyEditor') as Ref<Editor>

const colorPicker = ref(false)
const initialColor = ref(computed(() => props.color).value)
const customColor = ref(computed(() => props.color).value)

const colorSelected = ref<boolean>(false)

const greyShades = {
  black: '#000',
  '#222': '#222',
  darkgray: '#444',
  gray: '#888',
  lightgray: '#ccc',
  white: '#fff',
}
const blueShades = {
  '#000044': '#000044',
  '#00006e': '#00006e',
  '#0000bb': '#0000bb',
  blue: '#0000ff',
  lightblue: '#0088ff',
  cyan: '#00FFFF',
}
const greenShades = {
  '#003100': '#003100',
  '#005200': '#005200',
  '#007000': '#007000',
  '#00b700': '#00b700',
  green: '#00ff00',
  '#70ff70': '#70ff70',
}
const redShades = {
  '#520000': '#520000',
  '#810000': '#810000',
  '#b20000': '#b20000',
  red: '#ff0000',
  '#ff2323': '#ff2323',
  '#ff5c5c': '#ff5c5c',
}
const otherShades = {
  brown: '#964B00',
  orange: '#ff9900',
  yellow: '#ffff00',
  pink: '#ff00ff',
  purple: '#800080',
  indigo: '#4b0082',
}
const colors = { ...greyShades, ...blueShades, ...greenShades, ...redShades, ...otherShades }

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

function hoverColor(color: string) {
  colorSelected.value = false

  const interactiveStyles = editor.value.interactiveStyles

  if (props.fontColor && interactiveStyles) {
    editor.value.chain().focus().setColor(color).run()
  }

  if (props.backgroundColor && interactiveStyles) {
    editor.value.chain().focus().setHighlight({ color: color }).run()
  }
}

function close() {
  resetColor()
}

function resetColor() {
  if (colorSelected.value) {
    return
  }

  if (props.fontColor) {
    editor.value.chain().focus().setColor(initialColor.value).run()
  }

  if (props.backgroundColor) {
    if (initialColor.value) {
      editor.value.chain().focus().setHighlight({ color: initialColor.value }).run()
    } else {
      editor.value.chain().focus().unsetHighlight().run()
    }
  }
}

function setColor() {
  colorSelected.value = true
}

function unsetColor() {
  if (props.fontColor) {
    editor.value.chain().focus().unsetColor().run()
  }

  if (props.backgroundColor) {
    editor.value.chain().focus().unsetHighlight().run()
  }
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
            @mouseenter="hoverColor(colorCode)"
            @mouseleave="resetColor()"
            @click="setColor"
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
        <VBtn v-bind="menuProps" color="default" variant="flat" block>
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
          <VColorPicker v-model="customColor" elevated elevation="24" hide-inputs @update:model-value="hoverColor($event)" />
        </VCardItem>

        <VCardActions>
          <VBtn variant="flat" color="primary" @click="setColor">OK</VBtn>
          <VBtn variant="flat" color="grey-400" @click="colorPicker = !colorPicker; customColor = initialColor; resetColor()">Cancel</VBtn>
        </VCardActions>
      </VCard>
    </VMenu>

    <VDivider class="mt-2 mb-2" />

    <VBtn @click="unsetColor" color="default" block variant="flat">
      {{ t('style.color.unset') }}
    </VBtn>
  </VSheet>
</template>

<style lang="scss" scoped>
.tiptapify-style-color-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
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