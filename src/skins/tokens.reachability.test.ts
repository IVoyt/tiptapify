import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { skinColorKeys, skinMetricKeys, cssVarName } from '@tiptapify/skins/tokens'

/*
 * Reachability contract guard (spec 2026-10-18-skins-design.md, task 7): every catalog
 * token must have at least one CSS consumer in the skin layer. Gating is per shape:
 * quiet-button tokens are consumed under the quiet gates, menu-soft tokens under the
 * `--soft` menu rules, dialog-soft tokens under the `--soft` dialog rules, and the
 * default-path tokens in the base rules — this guard checks consumption, the fixture
 * gate (skin-baseline.json) checks the painted result.
 *
 * Parsing the SOURCE files (not dist): the source is where a token can be dropped;
 * dist adds noise (bundling, minification) and is produced by the build anyway.
 */
const SOURCES = [
  '../components/Tiptapify.vue',
  '../components/Toolbar/Index.vue',
  '../components/Toolbar/Items.vue',
  '../components/MenuBubble.vue',
  '../components/ImageBubbleMenu.vue',
  '../components/UI/TiptapifyDialog.vue',
  './menu.css',
  '../extensions/components/list/styles/ListStyleButton.vue',
]

const css = SOURCES.map((file) => readFileSync(new URL(file, import.meta.url), 'utf8')).join('\n')

describe('skin token reachability', () => {
  for (const key of [...skinColorKeys, ...skinMetricKeys]) {
    it(`consumes ${cssVarName(key)} (from ${key})`, () => {
      expect(css).toContain(`var(${cssVarName(key)}`)
    })
  }

  it('has no library rule keyed on a built-in skin name (escape hatch has no consumers)', () => {
    // `.tiptapify-skin-{name}` is the documented escape hatch for consumer CSS; the
    // library itself gates on shape classes and tokens only (spec: Layered model).
    const rule = css.match(/\.tiptapify-skin-(pastel|default)\b[^{]*\{/g)

    expect(rule).toBeNull()
  })
})
