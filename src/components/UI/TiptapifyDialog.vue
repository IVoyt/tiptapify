<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { inject, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ComposerTranslation } from 'vue-i18n'

const props = defineProps({
  module: String,
  title: String,
  fullscreen: { type: Boolean, default () { return false } },
  maxWidth: { type: Number, default () { return 800 } },
})

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

defineExpose({ open, close })
const emits = defineEmits(['closeDialog'])

const showDialog = ref<boolean>(false)

const field = { variant: 'outlined', density: 'comfortable' }
const fieldDefaults = {
  VTextField: field,
  VTextarea: field,
  VSelect: field,
  VAutocomplete: field,
  VCombobox: field,
}
const movableHandler = ref(null)

function open() {
  showDialog.value = true
}

function close() {
  showDialog.value = false
}

function emitClose() {
  emits('closeDialog')

  close()
}

function dragElement(trigger: HTMLElement, container: HTMLElement) {
  const coordinates = {
    moveX: 0,
    moveY: 0,
    cursorX: 0,
    cursorY: 0,
  }

  trigger.onmousedown = dragMouseDown

  function dragMouseDown(e: MouseEvent) {
    e.preventDefault()

    coordinates.cursorX = e.clientX
    coordinates.cursorY = e.clientY

    document.onmouseup = closeDragElement
    document.onmousemove = elementDrag
  }

  function elementDrag(e: MouseEvent) {
    e.preventDefault()

    coordinates.moveX = coordinates.cursorX - e.clientX
    coordinates.moveY = coordinates.cursorY - e.clientY
    coordinates.cursorX = e.clientX
    coordinates.cursorY = e.clientY

    const parentOffsetLeft = container.parentNode.offsetLeft
    const parentOffsetTop = container.parentNode.offsetTop

    let left = container.offsetLeft - coordinates.moveX
    if (left < (parentOffsetLeft * -1)) {
      left = (parentOffsetLeft * -1)
    }
    if (left >= parentOffsetLeft) {
      left = parentOffsetLeft
    }

    let top = container.offsetTop - coordinates.moveY
    if (top < (parentOffsetTop * -1)) {
      top = (parentOffsetTop * -1)
    }
    if (top >= parentOffsetTop) {
      top = parentOffsetTop
    }

    container.style.left = `${left}px`
    container.style.top = `${top}px`
  }

  function closeDragElement() {
    document.onmouseup = null
    document.onmousemove = null
  }
}

watch(() => showDialog.value, async () => {
  await nextTick()

  if (!movableHandler.value) {
    return
  }

  if (showDialog.value && !props.fullscreen) {
    dragElement(movableHandler.value.$el as HTMLElement, movableHandler.value.$el.parentNode as HTMLElement)
  }
})

function resizeListener() {
  if (!showDialog.value) {
    return
  }

  const dialogCoordinates = movableHandler.value.$el.parentNode.getBoundingClientRect()

  function checkBoundLeftTop(type: string) {
    if (dialogCoordinates[type] < 0) {
      const dialogOffset = movableHandler.value.$el.parentNode.style[type]
      const newOffset = parseInt(dialogOffset) - dialogCoordinates[type]
      movableHandler.value.$el.parentNode.style[type] = `${newOffset}px`
    }
  }
  checkBoundLeftTop('left')
  checkBoundLeftTop('top')

  function checkBoundRightBottom(type: 'right' | 'bottom') {
    const data = { side: type === 'right' ? 'left' : 'top', dim: type === 'right' ? 'width' : 'height', windowDim: type === 'right' ? 'innerWidth' : 'innerHeight' }
    if ((dialogCoordinates[data.side] + dialogCoordinates[data.dim]) > window[data.windowDim]) {
      const newOffset = ((window[data.windowDim] - dialogCoordinates[data.dim]) / 2).toFixed()
      movableHandler.value.$el.parentNode.style[data.side] = `${newOffset}px`
    }
  }
  checkBoundRightBottom('right')
  checkBoundRightBottom('bottom')
}

onMounted(() => {
  addEventListener('resize', resizeListener)
})

onBeforeUnmount(() => {
  removeEventListener('resize', resizeListener)
})
</script>

<template>
  <VDialog v-model="showDialog" :max-width="maxWidth" :fullscreen="fullscreen" @click:outside="emitClose">
    <VCard class="tiptapify-dialog" :class="{ 'tiptapify-dialog--fullscreen': fullscreen }">
      <VCardTitle
        ref="movableHandler"
        class="tiptapify-dialog-header"
        :class="!fullscreen ? 'tiptapify-movable-handler' : ''"
        style="user-select: none;"
      >
        <span class="tiptapify-dialog-title">
          {{ title ?? t(`dialog.${module}.title`) }}
        </span>

        <VSpacer />

        <VBtn class="tiptapify-dialog-close" variant="text" size="32" icon @click="emitClose">
          <VIcon size="20" :icon="`mdiSvg:${mdi.mdiClose}`" />
        </VBtn>
      </VCardTitle>

      <!-- Fields a dialog does not style itself get the light outlined look -->
      <VDefaultsProvider :defaults="fieldDefaults">
        <slot name="content" />

        <slot name="actions" />
      </VDefaultsProvider>
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped>
  /* A light card in the spirit of Flux modals: generous padding, soft corners and shadow, no rules */
  .tiptapify-dialog {
    border-radius: 12px !important;
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06) !important;

    &.tiptapify-dialog--fullscreen {
      border-radius: 0 !important;
    }

    :deep(.v-card-text) {
      padding: 4px 20px !important;
    }

    :deep(.v-field--variant-outlined) {
      border-radius: 8px;

      .v-field__outline__start {
        border-start-start-radius: 8px;
        border-end-start-radius: 8px;
      }

      .v-field__outline__end {
        border-start-end-radius: 8px;
        border-end-end-radius: 8px;
      }
    }

    :deep(.v-card-actions) {
      gap: 8px;
      padding: 16px 20px 20px !important;
    }

    :deep(.v-card-actions .v-btn),
    :deep(.tiptapify-dialog-actions .v-btn) {
      min-height: 38px;
      padding-inline: 16px;
      border-radius: 8px;
      font-weight: 500;
      letter-spacing: normal;
      text-transform: none;
    }
  }

  .tiptapify-dialog-header {
    display: flex;
    align-items: center;
    padding: 16px 12px 12px 20px !important;
  }

  .tiptapify-dialog-title {
    color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.4;
    white-space: normal;
  }

  .tiptapify-dialog-close {
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  }

  :deep(.v-overlay__content) {
    position: fixed;
  }

  .tiptapify-movable-handler {
    cursor: move;
  }

  .tiptapify-dialog-close:hover {
    cursor: pointer;
  }
</style>
