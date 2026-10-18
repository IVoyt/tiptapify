import { afterEach, describe, expect, it, vi } from 'vitest'
import { computed, createSSRApp, h, provide, ref } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createVuetify } from 'vuetify'
import Items from '@tiptapify/components/Toolbar/Items.vue'
import HeadingButton from '@tiptapify/extensions/components/style/heading/Button.vue'
import AlignmentMenuButton from '@tiptapify/extensions/components/alignment/menu/Button.vue'
import { headingLevels } from '@tiptapify/constants/style'
import { TIPTAPIFY_CONFIG_KEY } from '@tiptapify/composables/useTiptapifyConfig'
import { resolveSkin } from '@tiptapify/skins/registry'
import { variantBtnTypes } from '@tiptapify/types/editor'

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

async function renderToolbar (
  toolbarItems: typeof items = items,
  skin: unknown = 'default',
  variantBtn: variantBtnTypes = 'flat',
) {
  const warnings: string[] = []
  const warn = vi.spyOn(console, 'warn').mockImplementation((...args: unknown[]) => {
    warnings.push(args.map(String).join(' '))
  })

  // The shape the section markup reads: exactly the chain a real editor provides
  const resolved = resolveSkin(skin as never)

  const app = createSSRApp({
    setup () {
      provide('tiptapifyEditor', ref(editor))
      provide('tiptapifyI18n', { t: (key: string) => key })
      provide(TIPTAPIFY_CONFIG_KEY, {
        variantBtn: ref(variantBtn),
        variantField: ref('outlined'),
        skin: ref(skin),
        skinName: computed(() => resolved.name),
        tokens: computed(() => resolved.tokens),
        shape: computed(() => resolved.shape),
      })

      return () => h(Items, { items: toolbarItems })
    },
  })
  app.use(createVuetify())

  const html = await renderToString(app)
  warn.mockRestore()

  return { html, warnings }
}

// The opening tag of the section's group element
function groupTag (html: string): string {
  const match = html.match(/<div[^>]*class="[^"]*tiptapify-toolbar-group[^"]*"[^>]*>/)

  return match ? match[0] : ''
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

  it('renders a grouped section as a VBtnGroup under groups: box', async () => {
    const tag = groupTag(await renderToolbar(items, 'default').then((r) => r.html))

    expect(tag).toContain('tiptapify-toolbar-group')
    expect(tag).toContain('v-btn-group')
    expect(tag).toContain('elevation-4')
  })

  it('keeps the 0.3.2 variantBtn elevation class conditional', async () => {
    const flat = groupTag(await renderToolbar(items, 'default', 'flat').then((r) => r.html))
    expect(flat).toContain('v-btn-group')
    expect(flat).not.toContain('tiptapify-btn-group--elevated')

    const elevated = groupTag(await renderToolbar(items, 'default', 'elevated').then((r) => r.html))
    expect(elevated).toContain('tiptapify-btn-group--elevated')
  })

  it('renders a grouped section as a plain div under groups: flat', async () => {
    const tag = groupTag(await renderToolbar(items, 'pastel').then((r) => r.html))

    expect(tag).toContain('tiptapify-toolbar-group')
    expect(tag).not.toContain('v-btn-group')
  })

  it('an inline groups: box flag on a pastel-base skin gets the VBtnGroup markup', async () => {
    const tag = groupTag(await renderToolbar(items, { extends: 'pastel', groups: 'box' }).then((r) => r.html))

    expect(tag).toContain('tiptapify-toolbar-group')
    expect(tag).toContain('v-btn-group')
  })
})
