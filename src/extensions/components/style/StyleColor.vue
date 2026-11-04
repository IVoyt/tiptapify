<script setup lang="ts">

import * as mdi from '@mdi/js'
import { Editor } from '@tiptap/vue-3'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import {
  addRecent,
  ColorKind,
  GridPosition,
  loadRecent,
  moveInGrid,
  normalizeHex,
  palettes,
  sameColor,
  saveRecent,
  Swatch,
  writeColor,
} from '@tiptapify/extensions/components/style/color/colors'
import { computed, inject, PropType, Ref, ref, watch } from 'vue'
import { ComposerTranslation } from 'vue-i18n'

const props = defineProps({
  kind: { type: String as PropType<ColorKind>, required: true },
  // The toolbar button that opens the popover (a CSS selector)
  activator: { type: String, required: true },
  color: { type: String, default: '' },
})

const editor = inject('tiptapifyEditor') as Ref<Editor>

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

type EyeDropperApi = { open: () => Promise<{ sRGBHex: string }> }
const EyeDropper = (globalThis as { EyeDropper?: new () => EyeDropperApi }).EyeDropper

const menu = ref(false)
// The color a preview falls back to: the one the popover opened with, then the last applied one
const original = ref('')
const previewing = ref(false)
const recent = ref<string[]>(loadRecent(props.kind))
const focused = ref<GridPosition>({ row: 0, col: 0 })
const swatchesEl = ref<HTMLElement>()

const hex = ref('')
const hexDirty = ref(false)
const hexError = ref(false)

const customOpen = ref(false)
const pickerColor = ref('')
const pickerDirty = ref(false)

const title = computed(() => t(props.kind === 'text' ? 'style.color.text' : 'style.color.highlight'))
const palette = computed(() => palettes[props.kind])
const rows = computed<Swatch[][]>(() => {
  const recentRow = recent.value.map(value => ({ value, name: '' }))

  return recentRow.length ? [...palette.value, recentRow] : palette.value
})
const hexSample = computed(() => normalizeHex(hex.value) ?? (hex.value ? '' : original.value))

function swatchLabel(swatch: Swatch): string {
  return swatch.name ? t(`style.color.${swatch.name}`) : String(swatch.value).toUpperCase()
}

function isActive(swatch: Swatch): boolean {
  return swatch.value === null ? !original.value : sameColor(swatch.value, original.value)
}

function activePosition(): GridPosition {
  for (const [row, swatches] of rows.value.entries()) {
    const col = swatches.findIndex(isActive)
    if (col !== -1) {
      return { row, col }
    }
  }

  return { row: 0, col: 0 }
}

function preview(value: string | null) {
  writeColor(editor.value, props.kind, value, { history: false })
  previewing.value = true
}

function endPreview() {
  if (!previewing.value) {
    return
  }

  previewing.value = false
  writeColor(editor.value, props.kind, original.value || null, { history: false })
}

/**
 * The preview is reverted first: re-setting the color it already shows would add no step,
 * and undo would then skip this change.
 */
function apply(value: string | null, close = true) {
  endPreview()
  writeColor(editor.value, props.kind, value, { focus: close })

  original.value = value ?? ''
  hex.value = value ?? ''
  hexDirty.value = false
  hexError.value = false

  if (value) {
    recent.value = addRecent(recent.value, value)
    saveRecent(props.kind, recent.value)
  }

  if (close) {
    menu.value = false
  }
}

function swatchElement(position: GridPosition): HTMLElement | null {
  return swatchesEl.value?.querySelector<HTMLElement>(`[data-row="${position.row}"][data-col="${position.col}"]`) ?? null
}

function onSwatchKeydown(event: KeyboardEvent, position: GridPosition, swatch: Swatch) {
  // Handled here: the menu turns Enter into "focus the next field"
  if (event.key === 'Enter') {
    event.preventDefault()
    event.stopPropagation()
    apply(swatch.value)

    return
  }

  const next = moveInGrid(rows.value.map(row => row.length), position, event.key)
  if (!next) {
    return
  }

  event.preventDefault()
  focused.value = next
  swatchElement(next)?.focus()
  preview(rows.value[next.row][next.col].value)
}

function onSwatchesFocusout(event: FocusEvent) {
  if (!swatchesEl.value?.contains(event.relatedTarget as Node | null)) {
    endPreview()
  }
}

function onHexInput() {
  hexDirty.value = true
  const value = normalizeHex(hex.value)
  if (value) {
    hexError.value = false
    preview(value)
  } else {
    endPreview()
  }
}

function commitHex(close: boolean) {
  // A blur caused by Esc closing the popover must not apply what was typed
  if (!menu.value || (!close && !hexDirty.value) || !hex.value.trim()) {
    return
  }

  const value = normalizeHex(hex.value)
  if (!value) {
    hexError.value = true

    return
  }

  apply(value, close)
}

function toggleCustom() {
  customOpen.value = !customOpen.value
  pickerColor.value = normalizeHex(hex.value) ?? normalizeHex(original.value) ?? String(palette.value[1][0].value)
  pickerDirty.value = false
}

function onPick(value: string) {
  const picked = normalizeHex(value)
  if (!picked || picked === normalizeHex(pickerColor.value)) {
    return
  }

  pickerColor.value = picked
  pickerDirty.value = true
  hex.value = picked
  hexError.value = false
  preview(picked)
}

// The picker reports every step of a drag; the color is applied once, when the pointer is released
function onPickerPointerdown() {
  window.addEventListener('pointerup', commitPick, { once: true })
}

function commitPick() {
  if (!menu.value || !pickerDirty.value) {
    return
  }

  pickerDirty.value = false
  apply(pickerColor.value, false)
}

async function pickFromScreen() {
  if (!EyeDropper) {
    return
  }

  try {
    const value = normalizeHex((await new EyeDropper().open()).sRGBHex)
    if (value) {
      apply(value)
    }
  } catch {
    // Picking was cancelled
  }
}

watch(menu, open => {
  if (!open) {
    hexDirty.value = false
    customOpen.value = false
    endPreview()

    return
  }

  original.value = props.color
  previewing.value = false
  hex.value = normalizeHex(props.color) ?? ''
  hexError.value = false
  // Another editor on the page may have added colors since
  recent.value = loadRecent(props.kind)
  focused.value = activePosition()
})

</script>

<template>
  <VMenu
    v-model="menu"
    :activator="activator"
    :close-on-content-click="false"
    location="bottom start"
    @after-enter="swatchElement(focused)?.focus()"
  >
    <VSheet class="tiptapify-color pa-2" :width="272" role="dialog" :aria-label="title">
      <div ref="swatchesEl" @focusout="onSwatchesFocusout">
        <template v-for="(row, rowIndex) in rows" :key="rowIndex">
          <div v-if="rowIndex === palette.length" class="tiptapify-color__label text-caption text-medium-emphasis">
            {{ t('style.color.recent') }}
          </div>
          <div class="tiptapify-color__row">
            <button
              v-for="(swatch, colIndex) in row"
              :key="`${swatch.value}-${colIndex}`"
              type="button"
              class="tiptapify-color__swatch"
              :class="{
                'tiptapify-color__swatch--none': swatch.value === null,
                'tiptapify-color__swatch--active': isActive(swatch),
              }"
              :style="swatch.value ? { backgroundColor: swatch.value } : undefined"
              :data-row="rowIndex"
              :data-col="colIndex"
              :tabindex="focused.row === rowIndex && focused.col === colIndex ? 0 : -1"
              :aria-label="swatchLabel(swatch)"
              :aria-pressed="isActive(swatch)"
              @mouseenter="preview(swatch.value)"
              @mouseleave="endPreview()"
              @focus="focused = { row: rowIndex, col: colIndex }"
              @keydown="onSwatchKeydown($event, { row: rowIndex, col: colIndex }, swatch)"
              @click="apply(swatch.value)"
            >
              <Tooltip :label="swatchLabel(swatch)" :open-delay="300" />
            </button>
          </div>
        </template>
      </div>

      <VDivider class="my-2" />

      <div class="tiptapify-color__custom">
        <VTextField
          v-model="hex"
          class="tiptapify-color__hex"
          variant="outlined"
          density="compact"
          hide-details="auto"
          placeholder="#000000"
          spellcheck="false"
          :aria-label="t('style.color.hex')"
          :error-messages="hexError ? t('style.color.hex_invalid') : []"
          @update:model-value="onHexInput"
          @keydown.enter.stop.prevent="commitHex(true)"
          @blur="commitHex(false)"
        >
          <template #prepend-inner>
            <span
              class="tiptapify-color__sample"
              :class="{ 'tiptapify-color__swatch--none': !hexSample }"
              :style="hexSample ? { backgroundColor: hexSample } : undefined"
            />
          </template>
        </VTextField>

        <VBtn
          v-if="EyeDropper"
          class="tiptapify-color__eyedropper"
          variant="text"
          :size="32"
          icon
          :aria-label="t('style.color.eyedropper')"
          @click="pickFromScreen"
        >
          <VIcon :icon="`mdiSvg:${mdi.mdiEyedropperVariant}`" size="small" />
          <Tooltip :label="t('style.color.eyedropper')" />
        </VBtn>

        <!-- An icon, not a text label: a translated label would squeeze the HEX field -->
        <VBtn
          class="tiptapify-color__custom-toggle"
          variant="text"
          size="small"
          icon
          :color="customOpen ? 'primary' : ''"
          :aria-label="t('style.color.custom')"
          :aria-expanded="customOpen"
          @click="toggleCustom"
        >
          <VIcon :icon="`mdiSvg:${mdi.mdiPaletteOutline}`" size="small" />
          <Tooltip :label="t('style.color.custom')" />
        </VBtn>
      </div>

      <div
        v-if="customOpen"
        class="tiptapify-color__picker mt-2"
        @pointerdown="onPickerPointerdown"
        @keydown.enter.stop.prevent="commitPick"
      >
        <VColorPicker
          :model-value="pickerColor"
          mode="hex"
          :modes="['hex']"
          :width="256"
          :canvas-height="120"
          elevation="0"
          hide-inputs
          @update:model-value="onPick"
        />
      </div>
    </VSheet>
  </VMenu>
</template>

<style lang="scss" scoped>
.tiptapify-color__label {
  margin: 8px 2px 2px;
}

.tiptapify-color__row {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  justify-items: center;
}

.tiptapify-color__swatch {
  width: 24px;
  height: 24px;
  margin: 4px 0;
  border-radius: 4px;
  border: 1px solid rgba(var(--v-border-color), .24);
  cursor: pointer;
  transition: transform .1s;

  &:hover, &:focus-visible {
    transform: scale(1.15);
  }

  &:focus-visible {
    outline: 2px solid rgb(var(--v-theme-on-surface));
    outline-offset: 1px;
  }
}

.tiptapify-color__swatch--active {
  box-shadow: 0 0 0 2px rgb(var(--v-theme-surface)), 0 0 0 4px rgb(var(--v-theme-primary));
}

// "Default" / "No highlight": an empty cell crossed out in red
.tiptapify-color__swatch--none {
  background:
    linear-gradient(to top right, transparent calc(50% - 1px), #e53935 calc(50% - 1px), #e53935 calc(50% + 1px), transparent calc(50% + 1px)),
    rgb(var(--v-theme-surface));
}

.tiptapify-color__custom {
  display: flex;
  align-items: flex-start;
  gap: 4px;
}

.tiptapify-color__hex {
  flex: 1 1 auto;
  min-width: 0;

  :deep(input) {
    font-family: monospace;
  }
}

.tiptapify-color__eyedropper, .tiptapify-color__custom-toggle {
  margin-top: 4px;
}

.tiptapify-color__sample {
  flex: none;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  border: 1px solid rgba(var(--v-border-color), .24);
}
</style>
