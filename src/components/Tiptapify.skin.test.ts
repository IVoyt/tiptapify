import { afterEach, describe, expect, it, vi } from 'vitest'
import { createApp, createSSRApp, h, nextTick, ref, Ref } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createVuetify } from 'vuetify'
import { createI18n } from 'vue-i18n'
import Tiptapify from '@tiptapify/components/Tiptapify.vue'
import { messages } from '@tiptapify/i18n'

function withPlugins (app: { use: (plugin: never) => unknown }) {
  app.use(createVuetify() as never)
  app.use(createI18n({ legacy: false, locale: 'en', fallbackLocale: 'en', messages }) as never)
}

async function renderShell (skin: unknown): Promise<string> {
  const app = createSSRApp({ setup: () => () => h(Tiptapify, { skin }) })
  withPlugins(app)

  return renderToString(app)
}

// The opening tag of the editor root div, so assertions see the skin class and the token style
function rootTag (html: string): string {
  const start = html.indexOf('tiptapify-editor-')

  return html.slice(0, html.indexOf('>', start) + 1)
}

async function mountEditor (skinRef: Ref<unknown>) {
  const app = createApp({ setup: () => () => h(Tiptapify, { skin: skinRef.value }) })
  withPlugins(app)
  const host = document.createElement('div')
  document.body.appendChild(host)
  app.mount(host)
  await nextTick()
  await nextTick()

  return { app, host }
}

describe('Tiptapify skin resolution', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the default skin class and emits no token vars', async () => {
    const html = await renderShell('default')

    expect(rootTag(html)).toContain('tiptapify-skin-default')
    expect(rootTag(html)).not.toContain('--tf-')
  })

  it('renders the pastel skin class and emits its token overrides', async () => {
    const html = await renderShell('pastel')

    expect(rootTag(html)).toContain('tiptapify-skin-pastel')
    expect(rootTag(html)).toContain('--tf-toolbar-bg:rgba(var(--v-theme-on-surface), 0.03)')
    expect(rootTag(html)).toContain('--tf-group-shadow:none')
    expect(rootTag(html)).toContain('--tf-button-radius:6px')
  })

  it('renders an inline skin object under tiptapify-skin-inline with merged tokens', async () => {
    const html = await renderShell({ colors: { toolbarBg: 'rgb(1, 2, 3)' }, metrics: { buttonRadius: '9px' } })

    expect(rootTag(html)).toContain('tiptapify-skin-inline')
    expect(rootTag(html)).toContain('--tf-toolbar-bg:rgb(1, 2, 3)')
    expect(rootTag(html)).toContain('--tf-button-radius:9px')
  })

  it('a named inline object renders under tiptapify-skin-{name}, not the inline name', async () => {
    const html = await renderShell({
      name: 'mint',
      extends: 'pastel',
      colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' },
    })

    expect(rootTag(html)).toContain('tiptapify-skin-mint')
    expect(rootTag(html)).not.toContain('tiptapify-skin-inline')
    expect(rootTag(html)).toContain('--tf-toolbar-bg:rgba(0, 128, 0, 0.05)')
  })

  it('falls back to the default skin for an unknown name', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const html = await renderShell('nope')

    expect(rootTag(html)).toContain('tiptapify-skin-default')
    expect(rootTag(html)).not.toContain('--tf-')
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('nope'))
  })

  it('re-resolves the skin when the prop changes, without re-rendering the editor', async () => {
    const skin = ref<unknown>('default')
    const { app, host } = await mountEditor(skin)

    const root = host.querySelector('[id^=tiptapify-editor-]') as HTMLElement
    expect(root.className).toContain('tiptapify-skin-default')

    const proseMirror = host.querySelector('.ProseMirror')
    expect(proseMirror).toBeTruthy()

    skin.value = { colors: { toolbarBg: 'rgb(9, 9, 9)' } }
    await nextTick()

    expect(root.className).toContain('tiptapify-skin-inline')
    expect(root.style.getPropertyValue('--tf-toolbar-bg')).toBe('rgb(9, 9, 9)')
    // The editor DOM is the same node: a skin change never recreates the editor
    expect(host.querySelector('.ProseMirror')).toBe(proseMirror)

    app.unmount()
    host.remove()
  })

  it('keeps the pastel toolbar quiet through the resolved skin name', async () => {
    const skin = ref<unknown>('pastel')
    const { app, host } = await mountEditor(skin)

    const toolbar = host.querySelector('.v-toolbar')
    expect(toolbar?.classList.contains('v-toolbar--flat')).toBe(true)

    app.unmount()
    host.remove()
  })

  it('the root carries all six shape classes: classic values for the default skin', async () => {
    const tag = rootTag(await renderShell('default'))

    expect(tag).toContain('tiptapify-shape-toolbar-raised')
    expect(tag).toContain('tiptapify-shape-groups-box')
    expect(tag).toContain('tiptapify-shape-buttons-vuetify')
    expect(tag).toContain('tiptapify-shape-bubble-card')
    expect(tag).toContain('tiptapify-shape-dialog-classic')
    expect(tag).toContain('tiptapify-shape-menu-vuetify')
  })

  it('the pastel root carries the quiet shape classes and keeps the skin name class', async () => {
    const tag = rootTag(await renderShell('pastel'))

    expect(tag).toContain('tiptapify-skin-pastel')
    expect(tag).toContain('tiptapify-shape-toolbar-flat')
    expect(tag).toContain('tiptapify-shape-groups-flat')
    expect(tag).toContain('tiptapify-shape-buttons-quiet')
    expect(tag).toContain('tiptapify-shape-bubble-flat')
    expect(tag).toContain('tiptapify-shape-dialog-soft')
    expect(tag).toContain('tiptapify-shape-menu-soft')
    expect(tag).not.toContain('tiptapify-shape-dialog-classic')
    expect(tag).not.toContain('tiptapify-shape-buttons-vuetify')
  })

  it('an inline shape object lands on the root classes; the flags it omits stay classic', async () => {
    const tag = rootTag(await renderShell({ buttons: 'quiet', dialog: 'soft' }))

    expect(tag).toContain('tiptapify-skin-inline')
    expect(tag).toContain('tiptapify-shape-buttons-quiet')
    expect(tag).toContain('tiptapify-shape-dialog-soft')
    expect(tag).toContain('tiptapify-shape-toolbar-raised')
    expect(tag).toContain('tiptapify-shape-groups-box')
    expect(tag).toContain('tiptapify-shape-bubble-card')
    expect(tag).toContain('tiptapify-shape-menu-vuetify')
  })

  it('a custom skin extending pastel keeps the pastel shape classes under the inline name', async () => {
    const tag = rootTag(await renderShell({ extends: 'pastel' }))

    expect(tag).toContain('tiptapify-skin-inline')
    expect(tag).toContain('tiptapify-shape-toolbar-flat')
    expect(tag).toContain('tiptapify-shape-groups-flat')
    expect(tag).toContain('tiptapify-shape-buttons-quiet')
    expect(tag).toContain('tiptapify-shape-bubble-flat')
    expect(tag).toContain('tiptapify-shape-dialog-soft')
    expect(tag).toContain('tiptapify-shape-menu-soft')
  })

  it('the toolbar elevation follows the toolbar shape flag, not the skin name', async () => {
    const skin = ref<unknown>({ toolbar: 'flat' })
    const { app, host } = await mountEditor(skin)

    expect(host.querySelector('.v-toolbar')?.classList.contains('v-toolbar--flat')).toBe(true)

    skin.value = { toolbar: 'raised' }
    await nextTick()

    expect(host.querySelector('.v-toolbar')?.classList.contains('v-toolbar--flat')).toBe(false)

    app.unmount()
    host.remove()
  })
})
