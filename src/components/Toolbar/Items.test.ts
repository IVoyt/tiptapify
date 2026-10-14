import { describe, expect, it, vi } from 'vitest'
import { createSSRApp, h, provide, ref } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createVuetify } from 'vuetify'
import Items from '@tiptapify/components/Toolbar/Items.vue'
import HeadingButton from '@tiptapify/extensions/components/style/heading/Button.vue'

const editor = {
  instanceId: 1,
  isActive: () => false,
  can: () => ({ chain: () => ({ focus: () => ({ toggleHeading: () => ({ run: () => false }) }) }) }),
  chain: () => ({ focus: () => ({ redo: () => ({ run: () => false }) }) }),
  commands: {},
}

const items = [
  {
    section: 'style',
    group: true,
    components: [{ name: 'heading', component: HeadingButton }],
  },
]

async function renderToolbar () {
  const warnings: string[] = []
  const warn = vi.spyOn(console, 'warn').mockImplementation((...args: unknown[]) => {
    warnings.push(args.map(String).join(' '))
  })

  const app = createSSRApp({
    setup () {
      provide('tiptapifyEditor', ref(editor))
      provide('tiptapifyI18n', { t: (key: string) => key })

      return () => h(Items, { items })
    },
  })
  app.use(createVuetify())

  const html = await renderToString(app)
  warn.mockRestore()

  return { html, warnings }
}

describe('Toolbar Items', () => {
  it('does not pass undeclared attributes to toolbar buttons', async () => {
    const { html, warnings } = await renderToolbar()

    expect(html).toContain('tiptapify-heading-button-1')
    expect(warnings.join('\n')).not.toContain('Extraneous non-props attributes')
  })
})
