<script lang="ts" setup>

import * as mdi from '@mdi/js'
import { computed, inject, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ComposerTranslation } from 'vue-i18n'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'

const props = defineProps({
  module: String,
  title: String,
  fullscreen: { type: Boolean, default () { return false } },
  maxWidth: { type: Number, default () { return 800 } },
})

const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

// The dialog is teleported to the overlay root, so the skin reaches it by injection,
// not by the editor's DOM
const { shape, tokens } = useTiptapifyConfig()

// The soft dialog shape drives every dialog site (carrier class, close variant, field defaults):
// one computed keeps the template readable (task-7 cleanup)
const dialogSoft = computed(() => shape.value.dialog === 'soft')

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
    <VCard
      class="tiptapify-dialog"
      :class="{ 'tiptapify-dialog--soft': dialogSoft, 'tiptapify-dialog--fullscreen': fullscreen }"
      :style="tokens"
    >
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

        <VBtn
          class="tiptapify-dialog-close"
          :variant="dialogSoft ? 'text' : 'elevated'"
          :elevation="dialogSoft ? undefined : 4"
          :density="dialogSoft ? 'default' : 'compact'"
          :size="dialogSoft ? '32' : undefined"
          icon
          @click="emitClose"
        >
          <VIcon :size="dialogSoft ? 20 : 'x-small'" :icon="`mdiSvg:${mdi.mdiClose}`" />
        </VBtn>
      </VCardTitle>

      <VDivider v-if="!dialogSoft" />

      <!-- In the soft dialog shape, fields a dialog does not style itself get the light outlined look -->
      <VDefaultsProvider :defaults="dialogSoft ? fieldDefaults : {}">
        <slot name="content" />

        <slot name="actions" />
      </VDefaultsProvider>
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped>
  /*
   * Dialog skin rules: the base block reads the dialog tokens with
   * the classic fallbacks; the soft block (carrier `tiptapify-dialog--soft`, teleported
   * surfaces cannot ride the root's shape classes) reads the same tokens with the soft
   * shape's base as fallback. The VCard itself carries the token `:style` (SkinScope step),
   * so the tokens reach every rule here.
   * The `!important`s stay exactly where Vuetify paints the pixel with an INLINE
   * style (the card radius/shadow via the elevation/rounded composables, the content
   * padding via density) — no selector can outrank an inline style, and these are the
   * base-commit set, no additions. The header and actions padding keep the base-commit
   * !importants dropped: Vuetify paints them as plain class rules, and the doubled
   * scoped carrier outranks them (proven by the fixture gate).
   */
  .tiptapify-dialog-header {
    display: flex;
    align-items: center;
  }

  /* The classic title paints like a VLabel: a light, roomy label */
  .tiptapify-dialog-title {
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
    font-size: var(--tf-dialog-title-size, 1.25rem);
    font-weight: var(--tf-dialog-title-weight, 400);
    line-height: 1.75;
    white-space: normal;
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

  /**
   * Soft dialog shape: a light card in the spirit of Flux modals: generous padding,
   * soft corners and shadow, no rules
   */
  .tiptapify-dialog--soft {
    border-radius: var(--tf-dialog-radius, 12px) !important;
    box-shadow: var(--tf-dialog-shadow, 0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)) !important;

    &.tiptapify-dialog--fullscreen {
      border-radius: 0 !important;
    }

    :deep(.v-card-text) {
      padding: var(--tf-dialog-content-padding, 4px 20px) !important;
    }

    :deep(.v-field--variant-outlined) {
      border-radius: var(--tf-dialog-field-radius, 8px);

      .v-field__outline__start {
        border-start-start-radius: var(--tf-dialog-field-radius, 8px);
        border-end-start-radius: var(--tf-dialog-field-radius, 8px);
      }

      .v-field__outline__end {
        border-start-end-radius: var(--tf-dialog-field-radius, 8px);
        border-end-end-radius: var(--tf-dialog-field-radius, 8px);
      }
    }

    :deep(.v-card-actions) {
      gap: 8px;
      padding: var(--tf-dialog-actions-padding, 16px 20px 20px);
    }

    :deep(.v-card-actions .v-btn),
    :deep(.tiptapify-dialog-actions .v-btn) {
      min-height: var(--tf-dialog-action-btn-min-height, 38px);
      padding-inline: 16px;
      border-radius: var(--tf-dialog-action-btn-radius, 8px);
      font-weight: 500;
      letter-spacing: normal;
      text-transform: none;
    }
  }

  .tiptapify-dialog--soft .tiptapify-dialog-header {
    padding: var(--tf-dialog-header-padding, 16px 12px 12px 20px);
  }

  .tiptapify-dialog--soft .tiptapify-dialog-title {
    color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
    font-size: var(--tf-dialog-title-size, 1.125rem);
    font-weight: var(--tf-dialog-title-weight, 600);
    line-height: 1.4;
  }

  .tiptapify-dialog--soft .tiptapify-dialog-close {
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  }
</style>
