import { describe, expect, it } from 'vitest'
import { computed, createSSRApp, h, provide, ref } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createVuetify } from 'vuetify'
import SkinScope from '@tiptapify/components/SkinScope.vue'
import { menuContentClass } from '@tiptapify/skins/menu'
import { TIPTAPIFY_CONFIG_KEY } from '@tiptapify/composables/useTiptapifyConfig'
import { resolveSkin } from '@tiptapify/skins/registry'

// Menus teleport out of the editor DOM, so SkinScope re-anchors the skin tokens
// on the menu content: a plain div with the provided `--tf-*` record inline.
async function renderScope (tokens: Record<string, string> | null) {
  const app = createSSRApp({
    setup () {
      if (tokens) {
        provide(TIPTAPIFY_CONFIG_KEY, {
          variantBtn: ref('flat'),
          variantField: ref('outlined'),
          skin: ref('pastel'),
          skinName: computed(() => 'pastel'),
          tokens: computed(() => tokens),
          shape: computed(() => resolveSkin('pastel').shape),
        })
      }
      return () => h(SkinScope, null, { default: () => h('div', { id: 'slot-child' }, 'content') })
    },
  })
  app.use(createVuetify())

  return renderToString(app)
}

describe('SkinScope', () => {
  it('renders div.tiptapify-skin-scope with the provided --tf-* tokens inline', async () => {
    const html = await renderScope({ '--tf-menu-list-padding': '4px', '--tf-menu-radius': '8px' })

    expect(html).toContain('class="tiptapify-skin-scope"')
    expect(html).toContain('--tf-menu-list-padding:4px')
    expect(html).toContain('--tf-menu-radius:8px')
    expect(html).toContain('id="slot-child"')
  })

  it('renders the scope div through the full pastel resolution, slot content inside', async () => {
    const html = await renderScope(resolveSkin('pastel').tokens)

    expect(html).toMatch(/^<div class="tiptapify-skin-scope" style="--tf-/)
    expect(html).toContain('--tf-menu-list-padding:4px')
    expect(html).toContain('--tf-dialog-radius:12px')
    // The slot renders inside the scope (SSR wraps slot output in hydration comments)
    expect(html).toContain('<div id="slot-child">content</div><!--]--></div>')
  })

  it('emits no inline vars without a provider (default skin emits none, css fallbacks carry the base)', async () => {
    const html = await renderScope(null)

    expect(html).toContain('class="tiptapify-skin-scope"')
    expect(html).not.toContain('--tf-')
    expect(html).toContain('id="slot-child"')
  })
})

describe('menuContentClass', () => {
  it('carries the soft menu class for the soft menu shape and the plain base otherwise', () => {
    expect(menuContentClass(true)).toBe('tiptapify-menu tiptapify-menu--soft')
    expect(menuContentClass(false)).toBe('tiptapify-menu')
  })

  it('the soft carrier rides the menu shape flag, not the skin name: a custom skin extending pastel keeps it', () => {
    expect(menuContentClass(resolveSkin('pastel').shape.menu === 'soft')).toBe('tiptapify-menu tiptapify-menu--soft')
    expect(menuContentClass(resolveSkin({ extends: 'pastel' }).shape.menu === 'soft')).toBe('tiptapify-menu tiptapify-menu--soft')
    expect(menuContentClass(resolveSkin('default').shape.menu === 'soft')).toBe('tiptapify-menu')
    expect(menuContentClass(resolveSkin({ menu: 'soft' }).shape.menu === 'soft')).toBe('tiptapify-menu tiptapify-menu--soft')
  })
})
