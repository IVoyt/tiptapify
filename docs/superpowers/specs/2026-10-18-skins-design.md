# Skin System Design (0.3.4)

Date: 2026-10-18
Status: draft for approval
Branch: `0.3.4` (base: the uncommitted skin-prop work of 2026-10-18)

## Terminology

- **skin** — the user-facing term for one look of the editor chrome: tokens + shape.
  The prop is `skin`, the types are `TiptapifySkin*`, the registry is `registerSkin()`,
  the root class is `tiptapify-skin-{name}`.
- **theme** — reserved for Vuetify's light/dark themes. Tiptapify components keep their
  `theme` props fed from `currentTheme` (Vuetify's name); the skin system never touches them.
- **skin rules** — the CSS layer that consumes the `--tf-*` tokens; "the skin" of an editor
  is the set of rules its resolved skin produces.

(The base commit of this branch uses `theme` for the prop; the rename to `skin` is part of
the implementation, step 2 — nothing is published, so the rename is free.)

## Intent

0.3.3 replaced the editor chrome with a "quiet" visual style; consumers pushed back.
0.3.4 returns the classic look as the default and exposes the 0.3.3 look as a built-in skin
(`skin="pastel"`). Consumers now ask for the next step: **their own skins**, not just
a choice between two built-ins. This design turns the closed `default | pastel` enum
into an open skin system without breaking what the base commit already provides.

## Goals

- Two built-in skins (`default` classic, `pastel` quiet) with the visual behavior of the base commit, unchanged.
- Users define a custom skin as data: named token overrides + structural shape flags, inheriting from a built-in (`extends`).
- One mechanism for built-ins and custom skins: built-ins are registered skins, not special cases.
- Every visual dimension of the chrome (colors, radii, shadows, paddings, gaps) reachable
  through documented typed tokens — where that surface is activated by the shape (see
  Reachability contract). Native Vuetify surfaces are painted through Vuetify theme colors,
  not through `--tf-*`.
- Teleported surfaces (VDialog cards, VMenu dropdowns, Tiptap bubble menus) carry the skin correctly — they leave the editor DOM.
- Dark/light Vuetify themes keep working with every custom skin for free.
- Backward compatible: `skin="default" | "pastel"` keep the meanings the base commit gave them.

## Non-goals

- Per-instance styling of individual extensions' internals (dialogs' own field layouts, source-code editor, AI panel internals) beyond the token catalog.
- Runtime skin switching UI; SSR skin serialization; CSS-in-JS.
- Arbitrary template injection / slot-based skins.
- Skins that change editor behavior (features are skin-independent).

## Anti-goals

- A skin system whose built-ins are hard-coded special cases the custom path cannot express.
- An open bag of unnamed CSS variables that turns every user override into a library bug report.
- Shipping the fix for the 0.3.3 look gated behind an unfinished feature: the two built-in skins must work at every commit on this branch, while the custom-skin layer lands on top.

## Decisions made by the product owner

- One release (0.3.4) carries both the `skin` prop and the custom-skin system; 0.3.4 is not published, there is no external pressure to split.
- Terminology (2026-10-18): the public term is **skin**; "theme" stays only for Vuetify's light/dark.
- Skin values: `default` (classic, the default), `pastel` (the quiet 0.3.3 look).
- Custom skins: approved in principle; granularity choices below follow my recommendation, flagged as such.
- Sequencing: the staged base work (prop + built-ins, with the rename to skin terminology applied to it) is committed first, then the
  custom-skin layer lands as individually green commits — each commit requires explicit
  approval from the product owner (standing rule of this project).

## Normative baseline (work item 0)

The token table's "classic" column is descriptive; values like "Vuetify", "VCard elevation"
cannot be pasted into CSS as written. The normative source is a measured fixture:

- Record computed styles for every token dimension on the current base-commit CSS (the
  verification matrix from 2026-10-18, session copy: `2026-10-18-baseline-matrix.json` next to
  this spec — safety net only; truncated fields must be re-measured), for `default` and `pastel`,
  in light and dark Vuetify themes.
- Commit it as `src/skins/__fixtures__/skin-baseline.json` (selector → property → computed value),
  with a docs-dev script `scripts/record-skin-baseline.ts` to regenerate it.
- The fixture is the acceptance criterion for the CSS rewrite (step 5): every value must match,
  and it fills the descriptive table cells (a value cell reading "Vuetify" means: the fixture's
  value at that selector is canonical; the token's CSS fallback is that value).
- Baseline is recorded **before** the token extraction starts; it never changes afterwards
  in 0.3.4 (a deliberate visual change requires a fixture update + a note in the changelog).

## Design

### Layered model: tokens + shape + registry

A skin is an object with three kinds of members:

1. **Tokens** — CSS custom properties (`--tf-*`) that every skin rule consumes with a
   fallback equal to the classic (base) value. Open to users, typed catalog (~45 names).
2. **Shape flags** — a closed enum set for the structural variants that cannot be expressed
   in CSS (component markup, Vuetify prop bindings). Users select; the library implements.
3. **Registry + resolution** — built-ins and custom skins resolve through one chain:
   `base tokens (classic) → extends chain → own tokens/shape`.

```ts
export type TiptapifyShape = {
  toolbar?: 'raised' | 'flat'    // VToolbar elevation 1 + no inner hairline  vs  flat + tinted bar
  groups?: 'box' | 'flat'        // toolbar sections as raised boxes          vs  plain flex runs
  buttons?: 'vuetify' | 'quiet'  // native Vuetify buttons                    vs  ghost buttons w/ neutral pressed state
  bubble?: 'card' | 'flat'       // bubble menu: VCard + divided VBtnGroup    vs  flat row of quiet buttons
  dialog?: 'classic' | 'soft'    // divider under title, elevated close, field defaults vs soft card, text close, outlined defaults
  menu?: 'vuetify' | 'soft'      // dropdown menus: Vuetify list vs the light padded card
}

export type TiptapifySkinConfig = TiptapifyShape & {
  name?: string
  extends?: string                                  // registered skin name; implicit 'default'
  colors?: Partial<TiptapifySkinColors>             // typed catalog, see table
  metrics?: Partial<TiptapifySkinMetrics>           // typed catalog, see table
}

export function registerSkin(name: string, skin: TiptapifySkinConfig): void
export function defineSkin(skin: TiptapifySkinConfig): TiptapifySkinConfig // identity, for typed const
```

The `skin` prop accepts a registered name (string) or an inline object. Inline objects are
resolved through the same chain; they do not enter the global registry.

My calls (builder's decisions, product owner may veto):

- **Curated token catalog, not an open bag.** Unknown token keys are ignored in dev with a console warning. Free CSS stays available via the documented stable classes and the root `tiptapify-skin-{name}` class (escape hatch).
- **No `density` shape flag.** Density is expressible through metric tokens (`toolbarPadding`, `itemsGap`, …); a flag would duplicate them.
- **Prefix `--tf-`** (tiptapify) for all tokens: short, collision-safe, stable contract.
- **Unknown skin name** at runtime: dev-mode warning, falls back to `default`.
- **Circular/missing `extends`**: resolved to `default`, dev-mode warning.
- **Skin reactivity**: `skin` prop changes re-resolve tokens and shape (they are computed refs in `TiptapifyConfig`); no full editor re-render.

### Token catalog (names are the public contract)

Defaults below are the **classic** values; the pastel values are what 0.3.4 paints today.
All color defaults reference Vuetify theme variables, so dark/light works with no user effort.
Cells reading "Vuetify" / "VCard elevation" are descriptive: the committed baseline fixture is
canonical and supplies the exact fallback.

**TS key naming (public contract):** the object key is the camelCase of the CSS suffix —
`--tf-group-shadow` → `groupShadow`, `--tf-dialog-title-size` → `dialogTitleSize`; one flat
mapping in each direction, values are plain strings. Composite values split by nature, not by
CSS shorthand: a full border shorthand (`--tf-toolbar-border-bottom`, `--tf-frame-border`,
`--tf-bubble-border`, `--tf-menu-border`, `--tf-image-outline`, `--tf-handle-border`) and
shadows (`--tf-group-shadow`, `--tf-bubble-shadow`, `--tf-dialog-shadow`, `--tf-handle-shadow`,
`--tf-frame-shadow`) are **colors** (paint); lengths, paddings, gaps, radii, min-heights are
**metrics**. `--tf-items-gap` expands to two metric keys: `itemsGap` (column-gap) and
`itemsRowGap` (the classic row-gap exception, per the base code).

Toolbar / bar:

| token | classic | pastel |
|---|---|---|
| `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` (VToolbar) | `rgba(var(--v-theme-on-surface), 0.03)` |
| `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `--tf-toolbar-fg` | (inherited) | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

Items / groups / dividers:

| token | classic | pastel |
|---|---|---|
| `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `--tf-items-gap` | `0px` (row-gap `5px`) | `4px 6px` |
| `--tf-group-gap` | `0px` | `2px` |
| `--tf-group-height` | `32px` | `auto` |
| `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `--tf-group-radius` | `4px` | `0px` |
| `--tf-group-shadow` | elevation-4 triple shadow | `none` |
| `--tf-divider-size` | `0px` (spacer: margin `0 4px`) | `1px x 20px` |
| `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

Buttons (applied only when `buttons: quiet` — shape gates the rules, tokens paint them):

| token | pastel value (classic: native Vuetify) |
|---|---|
| `--tf-button-radius` | `6px` |
| `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |

Bubble menus (text and image):

| token | classic | pastel |
|---|---|---|
| `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | same |
| `--tf-bubble-radius` | `6px` | `10px` |
| `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `--tf-bubble-shadow` | `4px 4px 20px var(--dark-gray)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `--tf-bubble-padding` | `0px` (card layout) | `4px` |
| `--tf-bubble-gap` | `0px` | `2px` |

Dropdown menus (VMenu content; `menu: soft` gates the item metrics):

| token | classic | pastel |
|---|---|---|
| `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `--tf-menu-radius` | `4px` | `8px` |
| `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `--tf-menu-shadow` | Vuetify elevation-6 | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `--tf-menu-item-radius` | `0px` | `6px` |
| `--tf-menu-item-padding` | Vuetify | `4px 8px` |
| `--tf-menu-item-min-height` | Vuetify | `34px` |
| `--tf-menu-item-active-bg` | Vuetify primary tint | `rgba(var(--v-theme-on-surface), 0.06)` |

Dialogs:

| token | classic | pastel |
|---|---|---|
| `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `--tf-dialog-shadow` | VCard elevation | `0 20px 48px rgba(0,0,0,.16), 0 2px 6px rgba(0,0,0,.06)` |
| `--tf-dialog-header-padding` | VCardTitle default | `16px 12px 12px 20px` |
| `--tf-dialog-content-padding` | VCardText default | `4px 20px` |
| `--tf-dialog-actions-padding` | VCardActions default | `16px 20px 20px` |
| `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `--tf-dialog-title-weight` | `400` | `600` |
| `--tf-dialog-field-radius` | field default | `8px` (outlined) |
| `--tf-dialog-action-btn-min-height` | Vuetify | `38px` |
| `--tf-dialog-action-btn-radius` | Vuetify | `8px` |
| `--tf-dialog-grid-gap` | `24px` | `16px` |

Frame (editor border wrapper):

| token | classic | pastel |
|---|---|---|
| `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity)); border-top: 0` | full border, `border-bottom` at 1.6x opacity |
| `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Images:

| token | classic | pastel |
|---|---|---|
| `--tf-image-radius` | `0.125rem` | `4px` |
| `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (selected) | `2px solid rgb(var(--v-theme-primary))` |
| `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` (hover `.8`) | `rgb(var(--v-theme-primary))` |
| `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `--tf-handle-radius` | `2px` | `50%` |
| `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |

Slider and caption styles stay shared (feature layout, not chrome); the slide label chip colors remain literals.

### Token delivery (the teleport problem)

`Tiptapify.vue` resolves the skin into `tokens: ComputedRef<Record<string, string>>`
(token name → value) and `shape: ComputedRef<Required<TiptapifyShape>>`, provides both
through `TiptapifyConfig` (the existing `useTiptapifyConfig()`).

- Root div: `:style="tokenVars"` + class `tiptapify-skin-{name}` (escape hatch).
- `TiptapifyDialog`: `:style="tokenVars"` on the VCard (teleported overlay — CSS vars must
  be present on the overlay element itself).
- `VMenu` content: `:style` is not accepted through `content-class`; menus wrap their content
  in a skinned container. **Call:** each tiptapify menu's content root gets `:style="tokenVars"`
  via a tiny shared component `SkinScope.vue` (renders a div with the vars; one component,
  four call sites: heading, align, bullet, list-styles).
- Bubble menus are inside the editor DOM → inherit root vars; `MenuFloating` unchanged.

**Menu CSS strategy (SkinScope).** The base commit styles menus as
`.tiptapify-menu--pastel > .v-list.v-list` with doubled classes and `!important`, added to beat
a consumer "admin theme" (see the comment in Toolbar/Index.vue). Inserting a SkinScope wrapper
between the content-class element and the VList changes the child combinators, so one decision
covers all four menus: the menu skin rules move to a single shared stylesheet (`src/skins/menu.css`
imported by the package), rewritten as `.tiptapify-menu--soft > .tiptapify-skin-scope > .v-list.v-list`
(wrapper is the scope root), specificity kept via doubled classes, and `!important` dropped
exactly where reading tokens makes it unnecessary — the anti-admin-theme case from the base
commit's comment is a named test of this step. The list-style grid (scoped styles inside the
same menu) is rewritten against the scope root as well.

**TiptapifyConfig surface.** The interface member is `skin: Ref<TiptapifySkinInput>` (renamed
from the base commit's `theme`; the Vuetify light/dark name stays the component prop `theme`
fed from `currentTheme` — the base commit's `const { theme: skin }` destructures collapse to
plain `const { skin }`). New members:
`tokens: ComputedRef<Record<string, string>>` and `shape: ComputedRef<ResolvedShape>`.
The non-injected fallback of `useTiptapifyConfig()` resolves the `default` skin — components
rendered outside an editor (docs playground) emit base tokens and classic shape, not an empty record.

**Inline skin class.** An inline skin object without `name` renders root class
`tiptapify-skin-inline`; a registered name wins when given.

### Shape wiring (replaces `isPastel`)

| flag | sites |
|---|---|
| `toolbar` | Toolbar: `:elevation` / `:flat` bindings |
| `groups`, `buttons` | Items.vue + Toolbar CSS gates: apply quiet-button rules iff `buttons==='quiet'`; group box rules iff `groups==='box'` |
| `bubble` | MenuBubble: card vs flat template branch (both exist today) |
| `dialog` | TiptapifyDialog: divider / close variant / VDefaultsProvider |
| `menu` | menu content-class `tiptapify-menu--soft` when `menu: 'soft'` |
| Image menu | follows `buttons` (quiet class) and bubble tokens |

CSS: every skin rule exists **once**, reading tokens; shape decides which rule sets apply.
`.tiptapify-shape-{flag}-{value}` classes on the root encode shape for CSS; templates use the
computed refs. The base commit's `.tiptapify-theme-pastel` prefix disappears; built-in skins
carry shape + tokens like any custom skin.

### Reachability contract (my call)

A token paints a surface only when the shape activates that surface: e.g. `menuItemPadding` and
`menuShadow` are inert while `menu: 'vuetify'` (Vuetify owns those pixels), `buttonHoverBg` is
inert while `buttons: 'vuetify'`. Native-mode visuals remain styleable through Vuetify theme
colors (`primary`, `surface`, …), which the classic shapes deliberately inherit. The Skins
guide states this per token group; tokens are not wired into native paths.

Specificity convention for the whole skin layer: shape-class gating, doubled classes for
consumer-theme defense (the admin-theme case), and no new `!important` beyond what exists today.

### Built-in skin definitions

```ts
registerSkin('default', { /* classic: raised/box/vuetify/card/classic/vuetify; tokens = base defaults, emit none */ })
registerSkin('pastel', {
  toolbar: 'flat', groups: 'flat', buttons: 'quiet', bubble: 'flat', dialog: 'soft', menu: 'soft',
  colors: { /* table above, pastel column */ },
  metrics: { /* table above, pastel column */ },
})
```

## Implementation plan

Each numbered step is a green, individually reviewable commit; every commit requires the
product owner's explicit approval (standing rule).

1. Rename the staged base work to the skin terminology (prop, types, classes, docs page,
   sidebar, CHANGELOG draft) and re-verify: 113 tests, build, both skins' computed-style matrix.
   This completes the base commit.
2. Record the normative baseline fixture (see "Normative baseline") — pure addition, no behavior change.
3. `src/skins/` module: catalogs (`tokens.ts` types + base values), built-in definitions,
   `registry.ts` (`registerSkin`, `resolveSkin` with extends-chain + warnings).
4. `Tiptapify.vue`: prop `skin: [String, Object]`, resolve via registry, provide
   `tokens`/`shape` in config; root `:style` + class.
5. `SkinScope.vue` + token `:style` on dialog VCard and 4 menus.
6. Replace `isPastel` with shape refs (Toolbar, Items, MenuBubble, ImageBubbleMenu, Dialog).
7. Rewrite skin CSS: single rules reading `var(--tf-*)`; shape class gates.
8. Exports: `registerSkin`, `defineSkin`, types in `index.ts` / `index.d.ts`.
9. Tests + docs + README + CHANGELOG (0.3.4 final list).

Rough surface: ~20 files — the 0.3.4 base commit's set, plus `src/skins/` (3 files) and
`SkinScope.vue`.

## Validation

- Vitest: `resolveSkin` (merge, extends chain, unknown skin name, unknown token warning),
  registry isolation (custom skins must not leak across editors), token var emission.
- Component tests: shape flags select the right markup (bubble card vs flat; dialog divider
  present; menu content-class).
- Build + docs dev: computed-style matrix on `docs/examples/skins.md` extended with a
  **custom skin demo** (`registerSkin('mint', { extends: 'pastel', colors: {...} })`),
  asserting the same dimensions checked for the built-ins today (bg/padding/shadow/radius).
- Regression guard: built-in `default` and `pastel` computed styles must match the committed
  `skin-baseline.json` fixture (the CSS rewrite is done when the fixture matches bit-for-bit
  on the recorded dimensions).

## Docs

- `docs/guide/skins.md`: concept (tokens/shape/extends), token table, 3 recipes
  (extend pastel, extend default, full custom), escape-hatch section (stable classes),
  Terminology block (skin vs Vuetify theme).
- `docs/examples/skins.md`: three live editors (classic, pastel, custom).
- `docs/api/props.md` + `docs/api/types.md` updates; README feature line.

## CHANGELOG draft (0.3.4, final — needs approval)

```markdown
### 0.3.4
- `skin` prop: `default` is the classic look, `pastel` is the quiet 0.3.3 one; the editor is classic by default again
- custom skins: `registerSkin('name', { extends, colors, metrics, shape })` or an inline object on the `skin` prop
- skin tokens as CSS variables (`--tf-*`): toolbar, buttons, groups, bubble menus, dropdowns, dialogs, frame, images
- shape flags: toolbar raised/flat, groups box/flat, buttons vuetify/quiet, bubble card/flat, dialog classic/soft, menu vuetify/soft
- typings: `TiptapifySkinConfig`, `TiptapifyShape`; docs: Skins guide with the token table
```

## Open questions for the product owner

Resolved with the builder's recommendations; veto any line and I will amend before code:

1. Token catalog: the tables above (~45 names) are the v1 contract.
2. `extends` on inline objects may reference registered names.
3. Docs demo skin: I pick a "mint" brand (`extends: 'pastel'`, mint toolbar tint, deep-green
   primary for outlines/handles).
4. Baseline fixture as the normative classic defaults, and the commit split 1→9.

## Handoff (state as of 2026-10-18, for the implementation session)

- Branch `0.3.4` is checked out; the base work (22 files, prop `theme` + built-ins + docs) is
  **staged, not committed**. The spec files are untracked. No pushes; the remote was not touched.
- Standing rule: **no commits without the product owner's explicit approval, per commit.**
- The docs page `docs/examples/themes.md` and all public names in the staged work still use the
  old `theme` terminology; step 1 renames them (prop, classes, `docs/examples/skins.md`,
  sidebar in `docs/.vitepress/config.ts`, props.md, types.md, README, CHANGELOG draft).
- Verification commands: `pnpm test` (113 tests), `pnpm build`; vue-tsc is not a gate (the repo's
  tsconfig has pre-existing deprecation errors; 78 strict errors are identical on main and branch —
  do not chase them). Visual/DOM checks: `pnpm docs:dev` (vitepress on :5173/tiptapify/, serves
  `docs/examples/*`, imports dist CSS — run `pnpm build` after CSS edits) + CDP `getComputedStyle`
  matrix; the recorded matrix this session used is the session baseline JSON.
- Environment notes: `dist/`, `docs/.vitepress/cache|dist` are gitignored; the repo working tree
  carries pre-existing untracked noise (.DS_Store files, `.opencode/`, `backend/`) — leave it be.
- The MenuBubble/ImageBubbleMenu/Dialog components read the skin via `useTiptapifyConfig()`;
  the base commit's local alias is `const { theme: skin }` — step 1 collapses it to `const { skin }`.
