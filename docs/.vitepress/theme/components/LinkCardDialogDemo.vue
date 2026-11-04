<script setup lang="ts">
/*
 * The link dialog with link cards, shown inline on the page: a hidden editor owns it, a demo endpoint answers
 * in the browser (the docs have no server), and the dialog sits in this block instead of over the page.
 */
import type { Editor } from '@tiptap/core'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import { withBase } from 'vitepress'
import { useDocsStrings } from '../docsStrings'

const ENDPOINT = '/__tiptapify-demo/link-preview'
const ADDRESS = 'https://example.com/blog/getting-started'

const theme = useTheme()
const strings = useDocsStrings()
const container = ref<HTMLElement | null>(null)
const editor = ref<Editor | null>(null)

// The dialog renders into the block: no scrim, no page scroll lock, no focus trap, a click outside does not close it.
// The block itself, not a selector: the editor mounts only once the block is in the page
const dialogDefaults = computed(() => ({
  VDialog: {
    attach: container.value ?? undefined,
    contained: true,
    persistent: true,
    noClickAnimation: true,
    scrim: false,
    scrollStrategy: 'none',
    retainFocus: false,
  },
}))

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
}

// The demo endpoint: the handshake, and the same page data for any address (after a short delay, as a server would)
const realFetch = typeof window === 'undefined' ? null : window.fetch.bind(window)

async function demoFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const url = new URL(input instanceof Request ? input.url : String(input), window.location.href)
  if (url.pathname !== ENDPOINT) {
    return realFetch!(input, init)
  }

  const page = url.searchParams.get('url')
  if (!page) {
    return json({ tiptapifyLinkPreview: 1 })
  }

  await new Promise(resolve => setTimeout(resolve, 400))

  return json({
    url: page,
    title: strings.value.demo.cardTitle,
    description: strings.value.demo.cardDescription,
    image: new URL(withBase('/link-card-demo.svg'), window.location.href).href,
    siteName: strings.value.demo.cardSite,
  })
}

if (realFetch) {
  window.fetch = demoFetch
}

const visible = ref(false)
let opened = false
let themeObserver: MutationObserver | null = null
let visibility: IntersectionObserver | null = null
let fieldsObserver: MutationObserver | null = null

/*
 * The fields of the dialog are read-only: the demo endpoint answers the same page for any address, so an edited
 * address would show nothing new. The Display switches stay, they show the dialog itself. Done on the DOM: Vuetify
 * starts a dialog's content from the app's defaults, so a defaults provider around the editor does not reach it
 */
function lockFields() {
  for (const field of container.value?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    '.tiptapify-dialog input:not([type=checkbox]):not([type=file]), .tiptapify-dialog textarea',
  ) ?? []) {
    field.readOnly = true
  }
}

// The new-tab checkbox and the rel chips change on a click or Space; the demo keeps them as they are
function keepChoice(event: Event) {
  const target = event.target as Element | null
  const locked = target?.closest('.tiptapify-dialog .v-checkbox, .tiptapify-dialog .v-chip__close')
  if (locked && (event.type === 'click' || (event as KeyboardEvent).key === ' ')) {
    event.preventDefault()
    event.stopPropagation()
  }
}

// Opened once the block is on screen and the editor is ready: the dialog focuses its address field, which
// would scroll the page to it
watch([visible, editor], () => {
  if (visible.value && editor.value && !opened) {
    opened = true
    visibility?.disconnect()
    // The handshake of the demo endpoint is done by now, so the dialog offers cards
    setTimeout(open, 100)
  }
})

function open() {
  editor.value?.commands.showLink({ href: ADDRESS, newTab: true })
}

function syncTheme() {
  theme.change(document.documentElement.classList.contains('dark') ? 'tiptapifyDark' : 'tiptapifyLight')
}

onMounted(() => {
  syncTheme()
  themeObserver = new MutationObserver(syncTheme)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  visibility = new IntersectionObserver(([entry]) => {
    visible.value = entry.isIntersecting
  }, { threshold: 0.4 })
  visibility.observe(container.value!)

  fieldsObserver = new MutationObserver(lockFields)
  fieldsObserver.observe(container.value!, { childList: true, subtree: true })
  container.value!.addEventListener('click', keepChoice, true)
  container.value!.addEventListener('keydown', keepChoice, true)
})

onBeforeUnmount(() => {
  themeObserver?.disconnect()
  visibility?.disconnect()
  fieldsObserver?.disconnect()
  if (realFetch && window.fetch === demoFetch) {
    window.fetch = realFetch
  }
})
</script>

<template>
  <div class="link-card-dialog-demo">
    <VDefaultsProvider :defaults="dialogDefaults">
      <div v-if="container" class="link-card-dialog-demo__editor" aria-hidden="true">
        <Tiptapify
          :items="['link']"
          :bubble-menu="false"
          :floating-menu="false"
          :slash-commands="false"
          :link-preview="{ endpoint: ENDPOINT }"
          @editor-ready="editor = $event.editor"
        />
      </div>
    </VDefaultsProvider>

    <div ref="container" class="link-card-dialog-demo__stage">
      <VBtn class="link-card-dialog-demo__reopen" variant="tonal" @click="open">
        {{ strings.demo.openLinkDialog }}
      </VBtn>
    </div>
  </div>
</template>

<style scoped>
.link-card-dialog-demo {
  margin: 1.5rem 0;
}

.link-card-dialog-demo__editor {
  display: none;
}

/* The dialog is centered in the block, over the button that opens it again */
.link-card-dialog-demo__stage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 680px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

/* A dialog is fixed to the window to be dragged around it; here it stays in the block and scrolls with the page */
.link-card-dialog-demo__stage :deep(.v-overlay__content) {
  position: absolute;
}
</style>
