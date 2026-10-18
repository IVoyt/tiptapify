# Skins

A **skin** is one look of the editor chrome: the toolbar, the buttons and groups in it, the bubble menus, the dropdown menus, the dialogs, the frame around the content, and the image selection chrome. The `skin` prop selects it:

```vue
<Tiptapify skin="pastel" />
```

A skin is two things: **tokens** (paint and sizes as CSS variables) and **shape** (structural variants a token cannot express). The two built-ins are `default` — the classic look, a raised toolbar with raised button groups — and `pastel`, the quiet look introduced in 0.3.3. Custom skins are first-class: `registerSkin()` and inline skin objects resolve through exactly the same machinery, and the built-ins are registered skins, not special cases.

## Terminology: skin vs Vuetify theme

- **skin** — the user-facing term for one look of the editor chrome: tokens + shape. The prop is `skin`, the types are `TiptapifySkin*`, the registry is `registerSkin()`, the root class is `tiptapify-skin-{name}`.
- **theme** — reserved for Vuetify's light/dark themes. Tiptapify components keep their `theme` props fed from Vuetify's current theme name; the skin system never touches them.

They compose: most built-in token colors reference Vuetify theme variables (`rgb(var(--v-theme-surface))`, …), so the skins follow light/dark automatically. The fixed-dark cells in the classic column — the resize handle (`rgba(0, 0, 0, .5/.8)`), the plain image outline, the bubble shadow, and the menu/dialog elevation shadows — are deliberate: the classic look paints neutral dark chrome in both themes, and the measured baseline pins them. A custom skin can reference theme variables freely — see the token table.

## Concept

### Tokens

A token is a CSS custom property named `--tf-*`. The catalog key is the camelCase of the CSS suffix: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Values are plain strings — colors, full border shorthands, shadows, paddings, radii.

Every skin rule in the library exists **once**, reading its token with a fallback equal to the classic (base) value:

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

A resolved skin emits only its **overrides** as variables; the CSS fallbacks carry the base. The variables land on the editor root — and, because menus and dialogs teleport out of it, on each menu's `SkinScope` wrapper and on the dialog card itself, so the tokens follow every surface.

### Shape

Six flags decide which rule sets apply; the tokens paint them:

| flag | values | what it switches |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbar elevation + no inner hairline vs flat tinted bar |
| `groups` | `box` · `flat` | toolbar sections as raised **VBtnGroup** boxes (0.3.2 markup: joined buttons, the group tokens paint the box) vs plain flex div runs |
| `buttons` | `vuetify` · `quiet` | native Vuetify buttons vs ghost buttons with a neutral pressed state |
| `bubble` | `card` · `flat` | bubble menu: VCard + divided VBtnGroup vs flat row of quiet buttons |
| `dialog` | `classic` · `soft` | divider under the title, elevated close vs soft card, text close |
| `menu` | `vuetify` · `soft` | dropdown menus: Vuetify list vs the light padded card |

The resolved shape is encoded on the editor root as six `.tiptapify-shape-{flag}-{value}` classes, and exposed as a `shape: ComputedRef<ResolvedShape>` on [`useTiptapifyConfig()`](/api/types#usetiptapifyconfig) for custom toolbar components.

### Extends

A skin resolves over the classic base, then its `extends` chain root-first, then its own members:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Missing links resolve to the accumulated chain (with a dev warning); a cycle resolves to classic (with a dev warning). A registered skin is referenced by name; an inline skin object may `extends` a registered name and never enters the global registry — custom skins never leak between editors. Unknown token keys are ignored with a dev warning.

Live demos of all three forms are on the [Skins examples page](/examples/skins).

## Token catalog

The tables below are the **v1 contract**: the catalog keys (`TiptapifySkinColors` / `TiptapifySkinMetrics`) are the names you can set. Classic cells are the CSS fallbacks — the value the base rules paint when no skin overrides the token.

### Toolbar / bar

| token | CSS variable | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Items / groups / dividers

| token | CSS variable | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify elevation 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (spacer: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ The measured classic cell is `normal` — Vuetify's native flex value, which is what the CSS fallback carries. The catalog base value `0px` is the equivalent explicit length for skin overrides.

<a id="shadow-cells"></a>² Cells reading "Vuetify elevation *n*" are descriptive: the exact triple-shadow string is the measured value in the committed baseline fixture (`src/skins/__fixtures__/skin-baseline.json`) and is the CSS fallback. For `groupShadow` that is **elevation 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — under `groups: 'box'` the section is a VBtnGroup (`elevation="4"`), and the token rule paints the box with this triple over the group's own elevation: the box owns the elevation, the joined child buttons carry none.

### Buttons

These tokens are consumed **only under `buttons: 'quiet'`** — see [Reachability](#reachability).

| token | CSS variable | quiet value (classic: native Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Bubble menus (text and image)

| token | CSS variable | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | same |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `4px 4px 20px var(--dark-gray)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `0px` (card layout) | `4px` |
| `bubbleGap` | `--tf-bubble-gap` | `0px` | `2px` |

### Dropdown menus

| token | CSS variable | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify elevation 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ The **list** box (radius, shadow, list padding) of the classic menu is a skin rule today — the `SkinScope` token wrapper sits between Vuetify's own child rule and the list, so the library restores those pixels as skin rules reading the tokens above. The **item** pixels stay native Vuetify (the fixture measures the Vuetify defaults there): the four item tokens are inert while `menu: 'vuetify'`.

### Dialogs

| token | CSS variable | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard elevation [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | field default (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Frame (editor border wrapper)

| token | CSS variable | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, no top edge | full border |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Under the flat toolbar shape the frame also paints a per-side delta (a top edge, and the bottom edge at 1.6× border opacity). That delta belongs to the shape, not to a token: it is not token-reachable.

### Images and resize handles

| token | CSS variable | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (selected) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (hover) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

The image toolbar follows the `buttons` flag: under the quiet shape it gets the quiet surface — its 2px/4px spacing reads `--tf-bubble-gap` / `--tf-bubble-padding` with the image-menu fallbacks; there is no dedicated image-toolbar token.

### Not in the catalog (escape-hatch territory)

Some dimensions named in the design overview have no catalog token in v1: **toolbar height, frame width, frame radius, button width, button padding, dialog width**. The catalog tables above are the contract; for these pixels open the [escape hatch](#escape-hatch-the-root-class) and style the stable classes directly.

## Reachability

The contract, stated once and honored by every group above:

> A token paints a surface only when the shape activates that surface; native Vuetify visuals are styled via Vuetify theme colors.

Per group:

- **Toolbar, frame, image/handle chrome** — active in every shape; the tokens paint them, the classic cells are the native look the tokens fall back to.
- **Groups box** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — under `groups: 'box'` the section is a VBtnGroup (0.3.2 structure: the buttons join, the box carries the elevation); the box rules paint it with the group tokens, and `--tf-group-height` keeps the 32px contract with a `!important` (Vuetify's density rule fights it, as in 0.3.2). Under `groups: 'flat'` the sections are plain div runs (transparent, shadowless, radius 0 is the shape's base).
- **Divider hairlines** (`dividerWidth/Height/Color`) — the visible hairline is a `groups: 'flat'` affordance; in the box shape the divider is a zero-size spacer (`margin: 0 4px` from the base rule).
- **Items padding/gaps** — the compact `6px 8px` run is gated on the flat bar (`toolbar: 'flat'`), the group gaps on the flat sections (`groups: 'flat'`); the raised bar keeps the classic metrics.
- **Buttons** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — inert under `buttons: 'vuetify'`: the native Vuetify buttons paint their own states. Style them with Vuetify theme colors (`primary`, `surface`, …) — the classic shapes deliberately inherit them.
- **Menu item metrics** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — inert under `menu: 'vuetify'`; Vuetify owns those item pixels. The menu **list** box (radius/shadow/padding) is skin-painted in both shapes (see the [menu note](#menu-classic-note)).
- **Dialog soft chrome** (`dialogActionBtn*`, `dialogFieldRadius`, the soft paddings, the missing divider) — painted under `dialog: 'soft'`; under `dialog: 'classic'` the dialog is a VCard with the classic paddings.
- **Bubble chrome** (`bubblePadding`, `bubbleGap`, `bubbleBorder`) — the flat bubble rules are gated on `bubble: 'flat'`; the card shape paints its VCard metrics.

An override equal to the catalog base is **not emitted** — under a non-classic shape the shape's own base paints via the CSS fallback, so "restoring" a classic value (e.g. setting `buttonActiveBg` back to `rgb(var(--v-theme-primary))` under `buttons: 'quiet'`) silently does nothing. To force a classic-looking value under a non-classic shape, set an override that differs from the catalog base — an equivalent literal like `rgba(var(--v-theme-primary), 1)` paints identically and survives the skip.

Tokens are deliberately not wired into native paths — that is what keeps `default` pixel-identical to the classic look while everything routes through the catalog.

## Recipes

### Extend pastel

Inherit the quiet shape and repaint a few surfaces. Registered names work on any editor:

```ts
// main.ts — call once, before any editor mounts
import { registerSkin } from 'tiptapify'

registerSkin('mint', {
  extends: 'pastel',
  colors: {
    toolbarBg: 'rgba(0, 128, 0, 0.05)',   // mint tint over the pastel wash
    handleBg: 'rgb(0, 100, 0)',           // deep green handles
    handleBgHover: 'rgb(0, 128, 0)',
    imageOutline: '2px solid rgb(0, 100, 0)',
    imageOutlineHover: 'rgba(0, 100, 0, 0.35)',
  },
})
```

```vue
<Tiptapify skin="mint" />
```

The shape (flat/quiet/soft) comes from pastel; untouched tokens keep pastel's values — the quiet button wash stays neutral, only what you override moves. This is the skin rendered live on the [examples page](/examples/skins#custom-mint).

### Extend default

Keep the classic structure, tune the paint:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` is the implicit root, so the key can be omitted: `{ toolbar: 'flat', … }` starts from classic too.

### Full custom

No `extends`, no registration: pass the object to the `skin` prop and set shape flags and tokens freely. A `name` puts your own label on the root class (see below); without one it is `tiptapify-skin-inline`.

```vue
<script setup lang="ts">
import { defineSkin } from 'tiptapify'

const slate = defineSkin({
  name: 'slate',
  toolbar: 'flat',
  groups: 'flat',
  buttons: 'quiet',
  bubble: 'flat',
  dialog: 'soft',
  menu: 'soft',
  colors: { toolbarBg: 'rgb(30, 41, 59)', toolbarFg: 'rgb(226, 232, 240)' },
  metrics: { buttonRadius: '8px' },
})
</script>

<template>
  <Tiptapify :skin="slate" />
</template>
```

`defineSkin` is the identity helper for typed const definitions (it enters no registry). Shape flags may be set individually — every flag you omit stays classic.

## Escape hatch: the root class

Every editor root carries `tiptapify-skin-{name}` (`tiptapify-skin-inline` for a nameless inline object). The library **never keys any rule on a skin name** — the class is yours:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

The stable hooks to write against:

| class | where |
|---|---|
| `tiptapify-skin-{name}` | editor root |
| `tiptapify-shape-{flag}-{value}` ×6 | editor root — the resolved shape |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | the toolbar and its sections |
| `tiptapify-quiet-buttons` | toolbar and bubble roots under `buttons: 'quiet'` |
| `tiptapify-bubble-menu` | the flat bubble menu root |
| `tiptapify-menu` · `tiptapify-menu--soft` | dropdown overlay content, the carrier of the soft menu rules |
| `tiptapify-skin-scope` | the token scope div inside teleported menus |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | the dialog card and its soft carrier |
| `tiptapify-frame` | the editor border wrapper |

**Consumer-theme defense.** The skin layer is built to survive admin themes that pad and repaint Vuetify internals: rules gate on shape/carrier classes, use doubled classes (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) for specificity, and keep `!important` only where the base commit's admin-theme case proved it necessary (the menu.css defense set). Conventions that keep your own overrides working on the same battlefield:

- scope your CSS under `.tiptapify-skin-{name}` (or a shape class) — never on bare Vuetify internals;
- prefer tokens (`--tf-*`) for the catalog dimensions, classes for the rest;
- match the doubling when overriding Vuetify components (a single `.v-list-item` loses to the skin rules).

## Visual contract (contributor note)

The computed styles of the built-in skins are pinned by the baseline fixture `src/skins/__fixtures__/skin-baseline.json` (13 sections × light/dark): the CSS layer is done when the measured matrix matches it. Reading notes for the fixture:

- Hover/active dimensions cannot be forced from the page, so the recording reads the **first-hit CSSOM rule's declaration text** for each hover selector and resolves it through a probe element inside the skin root (the `resolved` field) — it is the winning rule's contract, not a live `:hover` snapshot.
- `_meta.selectors.menu` records the pre-`SkinScope` selector text. The fixture is frozen (normative values), so the field is stale on purpose; the recording bundle pins the current selector.
- The fixture carries its sanctioned changes in `_meta.notes`: the 2026-10-18 restoration of the VBtnGroup markup under `groups: 'box'` re-measured the classic `groupBtn`/`buttonsActive` child-button fields (joined corners, the box owns the elevation). Pastel fields are untouched — a deliberate visual change updates only the affected classic cells, records a note, and ships a CHANGELOG line.

## See also

- [Skins examples](/examples/skins) — classic, pastel, and the custom mint skin, live.
- [`skin` prop](/api/props#skin) · [skin types](/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/api/types#tiptapifyskininput).
