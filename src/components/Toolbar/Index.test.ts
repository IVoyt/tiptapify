import { describe, expect, it, vi } from 'vitest'
import { createSSRApp, defineComponent, h, markRaw, provide, shallowRef } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createVuetify } from 'vuetify'
import Toolbar from '@tiptapify/components/Toolbar/Index.vue'

// Every editor call answers with something callable, so toolbar buttons can render
function permissive (): unknown {
  return new Proxy(() => false, {
    get: (_, key) => {
      if (key === '__v_skip') {
        return true
      }
      if (key === Symbol.toPrimitive) {
        return () => ''
      }
      if (typeof key === 'symbol' || key.startsWith('__v') || key === 'then') {
        return undefined
      }

      return key === 'instanceId' ? 1 : permissive()
    },
    apply: () => permissive(),
  })
}

const stub = (className: string) => markRaw(defineComponent({ render: () => h('i', { class: className }) }))

async function renderToolbar (items: string[], customExtensions: unknown[]) {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  const app = createSSRApp({
    setup () {
      provide('tiptapifyEditor', shallowRef(permissive()))
      provide('tiptapifyI18n', { t: (key: string) => key })

      return () => h(Toolbar, { items, customExtensions })
    },
  })
  app.use(createVuetify())

  return renderToString(app)
}

describe('Toolbar', () => {
  it('adds a custom button to an existing section after its own buttons', async () => {
    const html = await renderToolbar(['sup', 'blockquote'], [
      { section: 'formatExtra', group: true, components: [{ name: 'disclaimer', component: stub('custom-disclaimer') }] },
    ])

    expect(html).toContain('custom-disclaimer')
    expect(html.indexOf('custom-disclaimer')).toBeGreaterThan(html.indexOf('tiptapify-toolbar-group'))
  })

  it('puts custom sections before the spacer', async () => {
    const html = await renderToolbar(['bold', '~', 'undo'], [
      { section: 'extra', group: true, components: [{ name: 'snippet', component: stub('custom-snippet') }] },
    ])

    expect(html.indexOf('custom-snippet')).toBeLessThan(html.indexOf('tiptapify-toolbar-spacer'))
  })

  it('does not leak custom buttons into the next editor', async () => {
    await renderToolbar([], [
      { section: 'formatExtra', group: true, components: [{ name: 'disclaimer', component: stub('custom-disclaimer') }] },
    ])
    const html = await renderToolbar([], [])

    expect(html).not.toContain('custom-disclaimer')
  })

  it('groups the items by the separators, across sections', async () => {
    const html = await renderToolbar(['bold', 'link', '|', 'blockquote', 'custom-note', '|', 'undo'], [
      { section: 'extra', group: true, components: [{ name: 'custom-note', component: stub('custom-note') }] },
    ])

    const groups = html.split('tiptapify-toolbar-group').slice(1)
    expect(groups).toHaveLength(3)
    expect(groups[1]).toContain('custom-note')
    expect(groups[0]).not.toContain('custom-note')
  })

  it('drops the place of a custom button the editor does not have', async () => {
    const html = await renderToolbar(['bold', '|', 'custom-note', '|', 'undo'], [])

    expect(html.split('tiptapify-toolbar-group').slice(1)).toHaveLength(2)
  })

  it('replaces a built-in button by a custom one of the same name in its place', async () => {
    const html = await renderToolbar(['bold', '|', 'image', 'link'], [
      { section: 'media', group: true, components: [{ name: 'image', component: stub('custom-image') }] },
    ])

    expect(html).toContain('custom-image')
    expect(html.split('tiptapify-toolbar-group').slice(1)).toHaveLength(2)
  })
})
