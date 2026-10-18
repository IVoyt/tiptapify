import { registerSkin } from './registry'

/*
 * The built-in skins are registered skins, not special cases: the custom-skin
 * path resolves through exactly the same chain (spec: anti-goals).
 * 'default' carries the classic shape and the base tokens, so it emits none.
 */

export function registerBuiltins(): void {
  registerSkin('default', {})

  registerSkin('pastel', {
    toolbar: 'flat',
    groups: 'flat',
    buttons: 'quiet',
    bubble: 'flat',
    dialog: 'soft',
    menu: 'soft',
    colors: {
      toolbarBg: 'rgba(var(--v-theme-on-surface), 0.03)',
      toolbarBorderBottom: '1px solid rgba(var(--v-border-color), var(--v-border-opacity))',
      toolbarFg: 'rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))',
      groupBg: 'transparent',
      groupShadow: 'none',
      dividerColor: 'rgba(var(--v-border-color), var(--v-border-opacity))',
      buttonFg: 'rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))',
      buttonHoverBg: 'rgba(var(--v-theme-on-surface), 0.07)',
      buttonHoverFg: 'rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))',
      buttonActiveBg: 'rgba(var(--v-theme-on-surface), 0.1)',
      buttonActiveHoverBg: 'rgba(var(--v-theme-on-surface), 0.14)',
      bubbleBorder: '1px solid rgba(var(--v-border-color), var(--v-border-opacity))',
      bubbleShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
      menuBorder: '1px solid rgba(var(--v-border-color), var(--v-border-opacity))',
      menuShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
      menuItemActiveBg: 'rgba(var(--v-theme-on-surface), 0.06)',
      dialogShadow: '0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)',
      frameBg: 'rgb(var(--v-theme-surface))',
      frameShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      imageBg: 'rgba(var(--v-theme-on-surface), 0.04)',
      imageOutline: '2px solid rgb(var(--v-theme-primary))',
      imageOutlineHover: 'rgba(var(--v-theme-primary), 0.35)',
      handleBg: 'rgb(var(--v-theme-primary))',
      handleBgHover: 'rgb(var(--v-theme-primary))',
      handleBorder: '2px solid rgb(var(--v-theme-surface))',
      handleShadow: '0 0 0 1px rgba(0, 0, 0, 0.15)',
    },
    metrics: {
      itemsPadding: '6px 8px',
      itemsGap: '6px',
      itemsRowGap: '4px',
      groupGap: '2px',
      groupHeight: 'auto',
      groupRadius: '0px',
      dividerWidth: '1px',
      dividerHeight: '20px',
      buttonRadius: '6px',
      bubbleRadius: '10px',
      bubblePadding: '4px',
      bubbleGap: '2px',
      menuListPadding: '4px',
      menuRadius: '8px',
      menuItemRadius: '6px',
      menuItemPadding: '4px 8px',
      menuItemMinHeight: '34px',
      dialogRadius: '12px',
      dialogHeaderPadding: '16px 12px 12px 20px',
      dialogContentPadding: '4px 20px',
      dialogActionsPadding: '16px 20px 20px',
      dialogTitleSize: '1.125rem',
      dialogTitleWeight: '600',
      dialogFieldRadius: '8px',
      dialogActionBtnMinHeight: '38px',
      dialogActionBtnRadius: '8px',
      dialogGridGap: '16px',
      imageRadius: '4px',
      handleRadius: '50%',
    },
  })
}

registerBuiltins()
