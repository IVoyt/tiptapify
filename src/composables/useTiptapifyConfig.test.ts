import { describe, expect, it } from 'vitest'
import { computed, createSSRApp, h, provide, ref } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createVuetify } from 'vuetify'
import BoldButton from '@tiptapify/extensions/components/format/bold/Button.vue'
import { TIPTAPIFY_CONFIG_KEY, useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'
import { resolveSkin } from '@tiptapify/skins/registry'

const editor = {
  isActive: () => false,
  can: () => ({ chain: () => ({ focus: () => ({ toggleBold: () => ({ run: () => false }) }) }) }),
  commands: { toggleBold: () => {} },
}

const Consumer = {
  setup () {
    const { variantBtn, variantField, skin, skinName, tokens, shape } = useTiptapifyConfig()
    return () => h('span', [
      h('span', { id: 'variant-btn' }, variantBtn.value),
      h('span', { id: 'variant-field' }, variantField.value),
      h('span', { id: 'skin' }, typeof skin.value === 'string' ? skin.value : ''),
      h('span', { id: 'skin-name' }, skinName.value),
      h('span', { id: 'token-count' }, String(Object.keys(tokens.value).length)),
      h('span', { id: 'token-button-radius' }, tokens.value['--tf-button-radius'] ?? ''),
      h('span', { id: 'shape-toolbar' }, shape.value.toolbar),
      h('span', { id: 'shape-buttons' }, shape.value.buttons),
    ])
  },
}

function render (root: () => any, withConfig: boolean) {
  const app = createSSRApp({
    setup () {
      if (withConfig) {
        const pastel = resolveSkin('pastel')
        provide(TIPTAPIFY_CONFIG_KEY, {
          variantBtn: ref('tonal'),
          variantField: ref('outlined'),
          skin: ref('pastel'),
          skinName: computed(() => pastel.name),
          tokens: computed(() => pastel.tokens),
          shape: computed(() => pastel.shape),
        })
      }
      provide('tiptapifyEditor', ref(editor))
      provide('tiptapifyI18n', { t: (key: string) => key })
      return root
    },
  })
  app.use(createVuetify())

  return renderToString(app)
}

describe('useTiptapifyConfig', () => {
  it('exposes provided config values', async () => {
    const html = await render(() => h(Consumer), true)

    expect(html).toContain('<span id="variant-btn">tonal</span>')
    expect(html).toContain('<span id="variant-field">outlined</span>')
    expect(html).toContain('<span id="skin">pastel</span>')
    expect(html).toContain('<span id="skin-name">pastel</span>')
    expect(html).toContain('<span id="token-button-radius">6px</span>')
    expect(html).toContain('<span id="shape-toolbar">flat</span>')
    expect(html).toContain('<span id="shape-buttons">quiet</span>')
  })

  it('falls back to defaults when no provider is present', async () => {
    const html = await render(() => h(Consumer), false)

    expect(html).toContain('<span id="variant-btn">flat</span>')
    expect(html).toContain('<span id="variant-field">solo</span>')
    expect(html).toContain('<span id="skin">default</span>')
    // The fallback resolves the default skin: classic shape, no emitted tokens
    expect(html).toContain('<span id="skin-name">default</span>')
    expect(html).toContain('<span id="token-count">0</span>')
    expect(html).toContain('<span id="shape-toolbar">raised</span>')
    expect(html).toContain('<span id="shape-buttons">vuetify</span>')
  })

  it('is consumed by toolbar extension buttons', async () => {
    const custom = await render(() => h(BoldButton), true)
    const fallback = await render(() => h(BoldButton), false)

    expect(custom).toContain('tonal')
    expect(fallback).toContain('flat')
    expect(custom).not.toEqual(fallback)
  })
})
