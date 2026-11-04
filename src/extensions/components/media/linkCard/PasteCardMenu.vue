<script setup lang="ts">
import * as mdi from '@mdi/js'
import { posToDOMRect } from '@tiptap/core'
import { Editor } from '@tiptap/vue-3'
import { BubbleMenu } from '@tiptap/vue-3/menus'
import BtnIcon from '@tiptapify/components/UI/BtnIcon.vue'
import Tooltip from '@tiptapify/components/UI/Tooltip.vue'
import { useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { useTiptapifyLinkPreview } from '@tiptapify/composables/useTiptapifyLinkPreview'
import { useTiptapifyUpload } from '@tiptapify/composables/useTiptapifyUpload'
import { makeLinkCard } from '@tiptapify/extensions/components/media/linkCard/makeLinkCard'
import {
  dismissPastedLink,
  PASTE_CARD_MENU_CLASS,
  pastedLink,
  replacePastedLink,
} from '@tiptapify/extensions/components/media/linkCard/pasteCard'
import { inject, onBeforeUnmount, Ref, ref, watch } from 'vue'
import { ComposerTranslation } from 'vue-i18n'

// The choice after a link is pasted alone into an empty paragraph: keep the link, or show it as a card
const editor = inject('tiptapifyEditor') as Ref<Editor>
const scrollTarget = inject<Ref<HTMLElement | null>>('tiptapifyScrollContainer', ref(null))
const { t } = inject('tiptapifyI18n') as { t: ComposerTranslation }

const { shape } = useTiptapifyConfig()
const { available, fetchPreview } = useTiptapifyLinkPreview()
const { upload } = useTiptapifyUpload()

// The address of the pasted link the menu is for, kept in step with the editor state
const url = ref<string | null>(null)
const loading = ref(false)
const error = ref('')
let request: AbortController | null = null

function sync() {
  url.value = editor.value ? pastedLink(editor.value.state)?.url ?? null : null
}

watch(editor, (current, previous) => {
  previous?.off('transaction', sync)
  current?.on('transaction', sync)
  sync()
}, { immediate: true })

onBeforeUnmount(() => {
  editor.value?.off('transaction', sync)
  request?.abort()
})

// A new link or none: what the menu showed for the previous one is gone, a pending card too
watch(url, () => {
  request?.abort()
  request = null
  loading.value = false
  error.value = ''
})

function shouldShow({ state }: { state: Editor['state'] }): boolean {
  return available.value && !!pastedLink(state)
}

function linkEnd() {
  const link = editor.value ? pastedLink(editor.value.state) : null
  if (!link) {
    return null
  }

  const rect = posToDOMRect(editor.value.view, link.to, link.to)

  return { getBoundingClientRect: () => rect, getClientRects: () => [rect] }
}

function keepLink() {
  dismissPastedLink(editor.value)
}

async function showCard() {
  const link = pastedLink(editor.value.state)
  if (!link || loading.value) {
    return
  }

  const current = new AbortController()
  request = current
  loading.value = true
  error.value = ''

  try {
    const attrs = await makeLinkCard(link.url, { fetchPreview, upload: upload.value, signal: current.signal })
    if (!current.signal.aborted) {
      replacePastedLink(editor.value, attrs)
    }
  } catch {
    if (!current.signal.aborted) {
      error.value = t('dialog.linkCard.paste_error')
    }
  } finally {
    if (request === current) {
      request = null
      loading.value = false
    }
  }
}
</script>

<template>
  <BubbleMenu
    v-if="editor && scrollTarget"
    :editor="editor"
    plugin-key="tiptapifyLinkCardPasteMenu"
    :options="{ placement: 'right', offset: 8, flip: { fallbackPlacements: ['bottom-end', 'top-end'] }, scrollTarget }"
    :should-show="shouldShow"
    :get-referenced-virtual-element="linkEnd"
  >
    <div
      v-if="available && url"
      :class="[PASTE_CARD_MENU_CLASS, { 'tiptapify-quiet-buttons': shape.buttons === 'quiet' }]"
      @mousedown.prevent
    >
      <VBtn size="small" variant="text" color="" :disabled="loading" @click="keepLink">
        {{ t('dialog.linkCard.display_link') }}
      </VBtn>
      <VBtn size="small" variant="text" color="" :loading="loading" @click="showCard">
        {{ t('dialog.linkCard.display_card') }}
      </VBtn>

      <span v-if="error" class="tiptapify-link-card-paste__error text-caption text-error">{{ error }}</span>

      <div class="tiptapify-link-card-paste__divider" />

      <VBtn size="28" variant="text" color="" @click="keepLink">
        <Tooltip :label="t('dialog.linkCard.paste_dismiss')" />
        <BtnIcon :icon="`mdiSvg:${mdi.mdiClose}`" />
      </VBtn>
    </div>
  </BubbleMenu>
</template>

<style scoped lang="scss">
/* The look of the image menu: the bubble tokens, the classic shape's base as fallback */
.tiptapify-link-card-paste {
  display: flex;
  align-items: center;
  gap: var(--tf-bubble-gap, 2px);
  padding: var(--tf-bubble-padding, 4px);
  border: var(--tf-bubble-border, none);
  border-radius: var(--tf-bubble-radius, 6px);
  background: var(--tf-bubble-bg, rgb(var(--v-theme-surface)));
  box-shadow: var(--tf-bubble-shadow, 0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08));

  .v-btn {
    letter-spacing: normal;
    text-transform: none;
  }
}

.tiptapify-link-card-paste__error {
  padding: 0 6px;
}

.tiptapify-link-card-paste__divider {
  width: 1px;
  height: 20px;
  margin: 0 4px;
  background: rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>
