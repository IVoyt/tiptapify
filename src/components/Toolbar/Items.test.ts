import { afterEach, describe, expect, it, vi } from 'vitest'
import { createSSRApp, h, provide, ref } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createVuetify } from 'vuetify'
import Items from '@tiptapify/components/Toolbar/Items.vue'
import HeadingButton from '@tiptapify/extensions/components/style/heading/Button.vue'
import AlignmentMenuButton from '@tiptapify/extensions/components/alignment/menu/Button.vue'
import { headingLevels } from '@tiptapify/constants/style'

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

async function renderToolbar (toolbarItems: typeof items = items) {
  const warnings: string[] = []
  const warn = vi.spyOn(console, 'warn').mockImplementation((...args: unknown[]) => {
    warnings.push(args.map(String).join(' '))
  })

  const app = createSSRApp({
    setup () {
      provide('tiptapifyEditor', ref(editor))
      provide('tiptapifyI18n', { t: (key: string) => key })

      return () => h(Items, { items: toolbarItems })
    },
  })
  app.use(createVuetify())

  const html = await renderToString(app)
  warn.mockRestore()

  return { html, warnings }
}

describe('Toolbar Items', () => {
  afterEach(() => {
    headingLevels.value = [1, 2, 3, 4, 5, 6]
  })

  it('does not pass undeclared attributes to toolbar buttons', async () => {
    const { html, warnings } = await renderToolbar()

    expect(html).toContain('tiptapify-heading-button-1')
    expect(warnings.join('\n')).not.toContain('Extraneous non-props attributes')
  })

  it('renders heading levels as separate buttons in inline mode', async () => {
    const { html } = await renderToolbar([
      {
        section: 'style',
        group: true,
        components: [{
          name: 'heading',
          component: HeadingButton,
          props: { inline: true, withParagraph: true, customHeadingLevels: [2, 3] },
        }],
      },
    ])

    expect(html).not.toContain('tiptapify-heading-button-1')
    expect(html.match(/<button/g)).toHaveLength(3)
  })

  it('renders a spacer that pushes the next items to the end', async () => {
    const { html } = await renderToolbar([
      items[0],
      { section: '__spacer__', group: false, components: [] },
      { section: 'actions', group: true, components: [{ name: 'heading', component: HeadingButton }] },
    ])

    expect(html).toContain('tiptapify-toolbar-spacer')
  })

  it('renders the alignment dropdown with the chosen alignments', async () => {
    const { html } = await renderToolbar([
      {
        section: 'alignment',
        group: true,
        components: [{ name: 'align', component: AlignmentMenuButton, props: { alignments: ['left', 'center'] } }],
      },
    ])

    expect(html).toContain('tiptapify-align-button-1')
    expect(html).toContain('tiptapify-dropdown-button__chevron')
  })
})
