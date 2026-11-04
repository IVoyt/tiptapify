import { afterEach, describe, expect, it } from 'vitest'
import { App, createApp, h, nextTick } from 'vue'
import { createVuetify } from 'vuetify'
import { createI18n } from 'vue-i18n'
import Tiptapify from '@tiptapify/components/Tiptapify.vue'
import { messages } from '@tiptapify/i18n'

// jsdom has no `visualViewport` nor `ResizeObserver`; Vuetify's overlays read them
if (!('visualViewport' in globalThis)) {
  ;(globalThis as Record<string, unknown>).visualViewport = {
    scale: 1, offsetLeft: 0, offsetTop: 0, addEventListener: () => {}, removeEventListener: () => {},
  }
}
if (!('ResizeObserver' in globalThis)) {
  ;(globalThis as Record<string, unknown>).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}

let app: App | null = null

async function flush() {
  for (let i = 0; i < 8; i++) {
    await nextTick()
  }
}

afterEach(() => {
  app?.unmount()
  app = null
  document.body.innerHTML = ''
})

describe('fullscreen', () => {
  it('keeps the skin of the editor: its container carries the root classes and tokens', async () => {
    app = createApp({ setup: () => () => h(Tiptapify, { skin: 'pastel', items: ['fullscreen'] }) })
    app.use(createVuetify())
    app.use(createI18n({ legacy: false, locale: 'en', fallbackLocale: 'en', messages }))
    app.mount(document.body.appendChild(document.createElement('div')))
    await flush()

    const root = document.querySelector<HTMLElement>('[id^="tiptapify-editor-"]')!
    document.querySelector<HTMLButtonElement>('.tiptapify-toolbar .v-btn')!.click()
    await flush()

    const container = document.querySelector<HTMLElement>('[id^="tiptapify-editor-fullscreen-"]')!
    expect(container.classList).toContain('tiptapify-skin-pastel')
    expect(container.classList).toContain('tiptapify-shape-groups-flat')
    expect([...container.classList]).toEqual([...root.classList])
    expect(container.getAttribute('style')).toBe(root.getAttribute('style'))
    expect(container.querySelector('.tiptapify-frame')).not.toBeNull()
  })
})
