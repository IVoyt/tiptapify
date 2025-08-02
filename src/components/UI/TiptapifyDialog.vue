<script lang="ts" setup>

import * as mdi from "@mdi/js";
import { inject, nextTick, ref, watch } from "vue";

const props = defineProps({
  module: String,
  title: String,
  fullscreen: { type: Boolean, default () { return false } },
  maxWidth: { type: Number, default () { return 800 } },
})

const { t } = inject('tiptapifyI18n') as any

defineExpose({ open, close })
const emits = defineEmits(['closeDialog'])

const dialog = ref<boolean>(false)
const movableHandler = ref(null)

function open() {
  dialog.value = true
}

function close() {
  dialog.value = false
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
    e.preventDefault();

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

watch(() => dialog.value, async () => {
  await nextTick()

  if (!movableHandler.value) {
    return
  }

  if (dialog.value && !props.fullscreen) {
    dragElement(movableHandler.value.$el as HTMLElement, movableHandler.value.$el.parentNode as HTMLElement)
  }
})
</script>

<template>
  <VDialog v-model="dialog" :max-width="maxWidth" :fullscreen="fullscreen" @click:outside="emitClose">
    <VCard>
      <VCardTitle ref="movableHandler" :class="`d-flex ${!fullscreen ? 'tiptapify-movable-handler' : ''}`" style="user-select: none;">
        <VLabel>
          {{ title ?? t(`dialog.${module}.title`) }}
        </VLabel>

        <VSpacer />

        <VBtn density="compact" class="tiptapify-dialog-close" variant="elevated" elevation="4" icon @click="emitClose">
          <VIcon size="x-small" :icon="`mdiSvg:${mdi.mdiClose}`" />
        </VBtn>
      </VCardTitle>

      <VDivider />

      <slot name="content" />

      <slot name="actions" />
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped>
  :deep(.v-overlay__content) {
    position: fixed;
  }

  .tiptapify-movable-handler, :deep(.tiptapify-movable-handler > *) {
    cursor: move;
  }

  .tiptapify-dialog-close:hover {
    cursor: pointer;
  }
</style>