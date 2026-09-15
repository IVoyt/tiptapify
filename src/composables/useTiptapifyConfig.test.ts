import { describe, expect, it } from 'vitest'
import { createSSRApp, h, provide, ref } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createVuetify } from 'vuetify'
import BoldButton from '@tiptapify/extensions/components/format/bold/Button.vue'
import { TIPTAPIFY_CONFIG_KEY, useTiptapifyConfig } from '@tiptapify/composables/useTiptapifyConfig'

const editor = {
  isActive: () => false,
  can: () => ({ chain: () => ({ focus: () => ({ toggleBold: () => ({ run: () => false }) }) }) }),
  commands: { toggleBold: () => {} },
}

const Consumer = {
  setup () {
    const { variantBtn, variantField } = useTiptapifyConfig()
    return () => h('span', [
      h('span', { id: 'variant-btn' }, variantBtn.value),
      h('span', { id: 'variant-field' }, variantField.value),
    ])
  },
}

function render (root: () => any, withConfig: boolean) {
  const app = createSSRApp({
    setup () {
      if (withConfig) {
        provide(TIPTAPIFY_CONFIG_KEY, {
          variantBtn: ref('tonal'),
          variantField: ref('outlined'),
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
  })

  it('falls back to defaults when no provider is present', async () => {
    const html = await render(() => h(Consumer), false)

    expect(html).toContain('<span id="variant-btn">flat</span>')
    expect(html).toContain('<span id="variant-field">solo</span>')
  })

  it('is consumed by toolbar extension buttons', async () => {
    const custom = await render(() => h(BoldButton), true)
    const fallback = await render(() => h(BoldButton), false)

    expect(custom).toContain('tonal')
    expect(fallback).toContain('flat')
    expect(custom).not.toEqual(fallback)
  })
})
