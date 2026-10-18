import { TiptapifySkinColors, TiptapifySkinMetrics } from '@tiptapify/types/editor'

/*
 * The typed token catalog (public contract; spec 2026-10-18-skins-design.md).
 * Every skin rule consumes its tokens as CSS custom properties with a fallback
 * equal to the base (classic) value: the values below. Cells of the spec table
 * reading "Vuetify" / "VCard elevation" are filled by the committed baseline
 * fixture (src/skins/__fixtures__/skin-baseline.json) — its measured value
 * at that selector is canonical and is the fallback stored here.
 *
 * Key naming: the camelCase key is the CSS suffix — `groupShadow` ↔
 * `--tf-group-shadow`. Composite values split by nature: `--tf-items-gap`
 * expands to `itemsGap` (column) + `itemsRowGap` (the classic row gap).
 * Colors are paint (including full border shorthands and shadows); lengths,
 * paddings, gaps, radii, min-heights are metrics.
 */

// Base values = the classic look. Button tokens paint only when the shape
// activates the quiet buttons; the classic values below are the native vuetify
// rendering the fixture measures (reachability contract: inert under
// buttons:'vuetify'). The quiet/pastel values ship with the pastel skin.
export const baseColors: TiptapifySkinColors = {
  toolbarBg: 'rgb(var(--v-theme-surface))',
  toolbarBorderBottom: 'none',
  toolbarFg: 'inherit',
  groupBg: 'rgb(var(--v-theme-surface))',
  groupShadow: '0 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0 2px 2px 0 var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0 1px 5px 0 var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12))',
  dividerColor: 'transparent',
  buttonFg: 'inherit',
  buttonHoverBg: 'rgba(var(--v-theme-on-surface), var(--v-hover-opacity))',
  buttonHoverFg: 'inherit',
  buttonActiveBg: 'rgb(var(--v-theme-primary))',
  buttonActiveHoverBg: 'rgb(var(--v-theme-primary))',
  bubbleBg: 'rgb(var(--v-theme-surface))',
  bubbleBorder: 'none',
  bubbleShadow: '4px 4px 20px var(--dark-gray)',
  menuBorder: 'none',
  menuShadow: '0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12)',
  menuItemActiveBg: 'rgba(0, 0, 0, 0)',
  dialogShadow: '0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12)',
  frameBg: 'transparent',
  frameShadow: 'none',
  // the classic frame: a hairline around the editor, the toolbar edge on top of it (border-top removed by the rule)
  frameBorder: '1px solid rgba(var(--v-border-color), var(--v-border-opacity))',
  imageBg: 'transparent',
  imageOutline: '1px solid rgba(0, 0, 0, 0.25)',
  imageOutlineHover: 'transparent',
  handleBg: 'rgba(0, 0, 0, 0.5)',
  handleBgHover: 'rgba(0, 0, 0, 0.8)',
  handleBorder: 'none',
  handleShadow: 'none',
}

export const baseMetrics: TiptapifySkinMetrics = {
  itemsPadding: '12px 16px',
  itemsGap: '0px',
  itemsRowGap: '5px',
  groupGap: '0px',
  groupHeight: '32px',
  groupRadius: '4px',
  dividerWidth: '0px',
  dividerHeight: '0px',
  buttonRadius: '4px',
  bubbleRadius: '6px',
  bubblePadding: '0px',
  bubbleGap: '0px',
  menuListPadding: '8px 0px',
  menuRadius: '4px',
  menuItemRadius: '0px',
  menuItemPadding: '4px 16px',
  menuItemMinHeight: '40px',
  dialogRadius: '4px',
  dialogHeaderPadding: '8px 16px',
  dialogContentPadding: '16px 24px 24px',
  dialogActionsPadding: '8px',
  dialogTitleSize: '1.25rem',
  dialogTitleWeight: '400',
  dialogFieldRadius: '4px',
  dialogActionBtnMinHeight: 'auto',
  dialogActionBtnRadius: '4px',
  dialogGridGap: '24px',
  imageRadius: '0.125rem',
  handleRadius: '2px',
}

export const skinColorKeys = Object.keys(baseColors) as (keyof TiptapifySkinColors)[]
export const skinMetricKeys = Object.keys(baseMetrics) as (keyof TiptapifySkinMetrics)[]

// 'toolbarBg' -> '--tf-toolbar-bg', 'itemsRowGap' -> '--tf-items-row-gap'
export function cssVarName(key: string): string {
  return '--tf-' + key.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())
}
