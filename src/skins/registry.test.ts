import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { registerSkin, defineSkin, resolveSkin, resetSkins, registeredSkins, CLASSIC_SHAPE } from '@tiptapify/skins/registry'
import { baseColors, baseMetrics, skinColorKeys, skinMetricKeys, cssVarName } from '@tiptapify/skins/tokens'
import { registerBuiltins } from '@tiptapify/skins/builtins'

describe('skin registry', () => {
  beforeEach(() => {
    resetSkins()
    registerBuiltins()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('resolves the default skin to the classic shape and emits no tokens', () => {
    const skin = resolveSkin('default')

    expect(skin.name).toBe('default')
    expect(skin.className).toBe('tiptapify-skin-default')
    expect(skin.shape).toEqual(CLASSIC_SHAPE)
    expect(skin.tokens).toEqual({})
  })

  it('resolves the pastel skin to the quiet shape with its tokens', () => {
    const skin = resolveSkin('pastel')

    expect(skin.shape).toEqual({
      toolbar: 'flat', groups: 'flat', buttons: 'quiet',
      bubble: 'flat', dialog: 'soft', menu: 'soft',
    })
    expect(skin.tokens['--tf-toolbar-bg']).toBe('rgba(var(--v-theme-on-surface), 0.03)')
    expect(skin.tokens['--tf-button-radius']).toBe('6px')
    expect(skin.tokens['--tf-dialog-grid-gap']).toBe('16px')
  })

  it('falls back to default for an unregistered name with a dev warning', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const skin = resolveSkin('nope')

    expect(skin.name).toBe('default')
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('nope'))
  })

  it('merges an inline skin over the default base', () => {
    const skin = resolveSkin({ colors: { toolbarBg: 'rebeccapurple' }, metrics: { groupRadius: '10px' } })

    expect(skin.className).toBe('tiptapify-skin-inline')
    expect(skin.tokens['--tf-toolbar-bg']).toBe('rebeccapurple')
    expect(skin.tokens['--tf-group-radius']).toBe('10px')
    expect(skin.shape).toEqual(CLASSIC_SHAPE)
  })

  it('drops an override that equals the base value (emit-skip-equal-to-base)', () => {
    // a skin that re-states the classic values is a twin of default: nothing to emit
    registerSkin('twin', {
      colors: { toolbarBg: baseColors.toolbarBg, handleBg: baseColors.handleBg },
      metrics: { itemsGap: baseMetrics.itemsGap, buttonRadius: '9px' },
    })

    const skin = resolveSkin('twin')

    // the base-valued keys are excluded; the one real override rides through
    expect(skin.tokens).toEqual({ '--tf-button-radius': '9px' })
  })

  it('inherits shape and tokens through extends, own members win', () => {
    registerSkin('mint', {
      extends: 'pastel',
      colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)', handleBg: 'rgb(0, 100, 0)' },
      metrics: { dialogRadius: '14px' },
    })

    const skin = resolveSkin('mint')

    expect(skin.shape).toEqual(resolveSkin('pastel').shape)
    expect(skin.tokens['--tf-toolbar-bg']).toBe('rgba(0, 128, 0, 0.05)')
    expect(skin.tokens['--tf-handle-bg']).toBe('rgb(0, 100, 0)')
    expect(skin.tokens['--tf-dialog-radius']).toBe('14px')
    // untouched pastel tokens are inherited
    expect(skin.tokens['--tf-button-radius']).toBe('6px')
  })

  it('an inline object may extend a registered skin', () => {
    const skin = resolveSkin({ extends: 'pastel', metrics: { bubbleRadius: '2px' } })

    expect(skin.className).toBe('tiptapify-skin-inline')
    expect(skin.shape.bubble).toBe('flat')
    expect(skin.tokens['--tf-bubble-radius']).toBe('2px')
    expect(skin.tokens['--tf-bubble-padding']).toBe('4px')
  })

  it('ignores unknown token keys in dev with a warning', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const skin = resolveSkin({ colors: { notAToken: 'red' } as never })

    expect(skin.tokens['--tf-not-a-token']).toBeUndefined()
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('notAToken'))
  })

  it('resolves a missing extends to default with a dev warning', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const skin = resolveSkin({ extends: 'ghost' })

    expect(skin.shape).toEqual(CLASSIC_SHAPE)
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('ghost'))
  })

  it('resolves a circular extends chain to default with a dev warning', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    registerSkin('a', { extends: 'b' })
    registerSkin('b', { extends: 'a' })

    const skin = resolveSkin('a')

    expect(skin.name).toBe('a')
    expect(skin.shape).toEqual(CLASSIC_SHAPE)
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('a'))
  })

  it('inline skins never enter the global registry', () => {
    resolveSkin({ name: 'mint', colors: { toolbarBg: 'green' } })

    expect(registeredSkins()).not.toContain('mint')
    const registered = registerSkin('mint', { colors: { toolbarBg: 'lime' } })
    expect(registered).toBeUndefined()
    expect(registeredSkins()).toContain('mint')
  })

  it('defineSkin is identity typed', () => {
    const cfg = defineSkin({ extends: 'pastel', metrics: { itemsPadding: '1px 2px' } })

    expect(cfg).toEqual({ extends: 'pastel', metrics: { itemsPadding: '1px 2px' } })
  })

  it('emits css variables only for keys present in the typed catalogs', () => {
    expect(cssVarName('toolbarBg')).toBe('--tf-toolbar-bg')
    expect(cssVarName('itemsRowGap')).toBe('--tf-items-row-gap')
    expect(skinColorKeys.length).toBeGreaterThan(10)
    expect(skinMetricKeys.length).toBeGreaterThan(10)
    // every catalog key has a base value
    for (const key of skinColorKeys) expect(typeof baseColors[key]).toBe('string')
    for (const key of skinMetricKeys) expect(typeof baseMetrics[key]).toBe('string')
  })
})

describe('skin registry without builtins', () => {
  // The registry used standalone (no builtins.ts load): 'default' is the implicit
  // root of every extends chain, so walking to it must not warn about a missing link
  beforeEach(() => {
    resetSkins()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('treats the implicit default root as present, no dev warning', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const skin = resolveSkin({ extends: 'default', colors: { toolbarBg: 'red' } })
    const inline = resolveSkin({ colors: { toolbarBg: 'blue' } })

    expect(skin.shape).toEqual(CLASSIC_SHAPE)
    expect(skin.tokens['--tf-toolbar-bg']).toBe('red')
    expect(inline.tokens['--tf-toolbar-bg']).toBe('blue')
    expect(warn).not.toHaveBeenCalled()
  })

  it('still warns for a genuinely missing extends link', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    resolveSkin({ extends: 'ghost' })

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('ghost'))
  })
})
