# Skins {#skins}

Ein **Skin** ist ein Erscheinungsbild des Editor-Chromes: die Symbolleiste, ihre Schaltflächen und Gruppen, die Bubble-Menüs, die Dropdown-Menüs, die Dialoge, der Rahmen um den Inhalt und das Chrome der Bildauswahl. Die Prop `skin` wählt ihn aus:

```vue
<Tiptapify skin="pastel" />
```

Ein Skin besteht aus zwei Dingen: **Tokens** (Farben und Größen als CSS-Variablen) und **Form** (strukturelle Varianten, die ein Token nicht ausdrücken kann). Die beiden eingebauten Skins sind `default` — der klassische Look, eine erhabene Toolbar mit erhabenen Button-Gruppen — und `pastel`, der ruhige Look. Eigene Skins sind gleichberechtigt: `registerSkin()` und Inline-Skin-Objekte werden über genau denselben Mechanismus aufgelöst, und die eingebauten Skins sind registrierte Skins, keine Sonderfälle.

## Begriffe: Skin vs. Vuetify-Theme {#terminology-skin-vs-vuetify-theme}

- **skin** — der für Nutzer sichtbare Begriff für ein Erscheinungsbild des Editor-Chromes: Tokens + Form. Die Prop heißt `skin`, die Typen heißen `TiptapifySkin*`, die Registry ist `registerSkin()`, die Root-Klasse ist `tiptapify-skin-{name}`.
- **theme** — reserviert für die hellen/dunklen Themes von Vuetify. Die Komponenten von Tiptapify speisen ihre `theme`-Props weiterhin aus dem aktuellen Theme-Namen von Vuetify; das Skin-System berührt sie nie.

Sie lassen sich kombinieren: Die meisten eingebauten Token-Farben verweisen auf Vuetify-Theme-Variablen (`rgb(var(--v-theme-surface))`, …), sodass die Skins automatisch Hell/Dunkel folgen. Die fest dunklen Zellen in der Classic-Spalte — der Resize-Handle (`rgba(0, 0, 0, .5/.8)`), die einfache Bildkontur, der Bubble-Schatten und die Erhebungsschatten von Menüs/Dialogen — sind Absicht: Das klassische Erscheinungsbild malt in beiden Themes ein neutrales dunkles Chrome, und die gemessene Baseline legt sie fest. Ein eigener Skin kann Theme-Variablen frei referenzieren — siehe die Token-Tabelle.

## Konzept {#concept}

### Tokens {#tokens}

Ein Token ist eine CSS-Custom-Property mit dem Namen `--tf-*`. Der Katalogschlüssel ist die camelCase-Form des CSS-Suffixes: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Werte sind einfache Strings — Farben, vollständige Border-Kurzschreibweisen, Schatten, Paddings, Radien.

Jede Skin-Regel der Bibliothek existiert **einmal** und liest ihr Token mit einem Fallback, der dem klassischen (Basis-)Wert entspricht:

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Ein aufgelöster Skin gibt nur seine **Überschreibungen** als Variablen aus; die CSS-Fallbacks tragen die Basis. Die Variablen landen am Editor-Root — und, weil Menüs und Dialoge aus ihm herausteleportiert werden, am `SkinScope`-Wrapper jedes Menüs und an der Dialogkarte selbst, sodass die Tokens jeder Oberfläche folgen.

### Form {#shape}

Sechs Flags entscheiden, welche Regelsätze gelten; die Tokens bemalen sie:

| flag | values | what it switches |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbar-Erhebung + keine innere Haarlinie vs. flache getönte Leiste |
| `groups` | `box` · `flat` | Symbolleisten-Bereiche als erhabene **VBtnGroup**-Boxen (Markup von 0.3.2: verbundene Schaltflächen, die Gruppen-Tokens bemalen die Box) vs. einfache Flex-div-Reihen |
| `buttons` | `vuetify` · `quiet` | native Vuetify-Schaltflächen vs. Ghost-Schaltflächen mit neutralem Gedrückt-Zustand |
| `bubble` | `card` · `flat` | aus Kompatibilitätsgründen beibehalten: Die Bubble-Menüs sind in beiden Formen eine mit Tokens bemalte Reihe von Icon-Schaltflächen (ihre Schaltflächen folgen `buttons`) |
| `dialog` | `classic` · `soft` | Trennlinie unter dem Titel, erhabenes Schließen vs. weiche Karte, Text-Schließen |
| `menu` | `vuetify` · `soft` | Dropdown-Menüs: Vuetify-Liste vs. helle Karte mit Innenabstand |

Die aufgelöste Form wird am Editor-Root als sechs Klassen `.tiptapify-shape-{flag}-{value}` kodiert und als `shape: ComputedRef<ResolvedShape>` in [`useTiptapifyConfig()`](/de/api/types#usetiptapifyconfig) für eigene Symbolleisten-Komponenten bereitgestellt.

### Extends {#extends}

Ein Skin wird über der klassischen Basis aufgelöst, dann über seiner `extends`-Kette von der Wurzel her, dann über seine eigenen Member:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Fehlende Glieder werden zur bisher aufgebauten Kette aufgelöst (mit einer Dev-Warnung); ein Zyklus wird zu classic aufgelöst (mit einer Dev-Warnung). Ein registrierter Skin wird über seinen Namen referenziert; ein Inline-Skin-Objekt darf einen registrierten Namen per `extends` erweitern und gelangt nie in die globale Registry — eigene Skins lecken nie zwischen Editoren. Unbekannte Token-Schlüssel werden mit einer Dev-Warnung ignoriert.

Live-Demos aller drei Formen findest du auf der [Skins-Beispielseite](/de/examples/skins).

## Token-Katalog {#token-catalog}

Die folgenden Tabellen sind der **v1-Vertrag**: Die Katalogschlüssel (`TiptapifySkinColors` / `TiptapifySkinMetrics`) sind die Namen, die du setzen kannst. Die Classic-Zellen sind die CSS-Fallbacks — der Wert, den die Basisregeln malen, wenn kein Skin das Token überschreibt.

### Symbolleiste / Leiste {#toolbar-bar}

| token | CSS variable | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Elemente / Gruppen / Trenner {#items-groups-dividers}

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

<a id="items-gap-note"></a>¹ Die gemessene Classic-Zelle ist `normal` — der native Flex-Wert von Vuetify, den der CSS-Fallback trägt. Der Katalog-Basiswert `0px` ist die äquivalente explizite Länge für Skin-Überschreibungen.

<a id="shadow-cells"></a>² Zellen mit „Vuetify elevation *n*“ sind beschreibend: Der exakte Dreifach-Schatten-String ist der gemessene Wert in der committeten Baseline-Fixture (`src/skins/__fixtures__/skin-baseline.json`) und zugleich der CSS-Fallback. Für `groupShadow` ist das **elevation 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — unter `groups: 'box'` ist der Bereich eine VBtnGroup (`elevation="4"`), und die Token-Regel bemalt die Box mit diesem Tripel über der eigenen Erhebung der Gruppe: Die Box besitzt die Erhebung, die verbundenen Kind-Schaltflächen tragen keine.

### Schaltflächen {#buttons}

Diese Tokens werden **nur unter `buttons: 'quiet'`** verwendet — siehe [Reichweite](#reachability).

| token | CSS variable | quiet value (classic: native Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Bubble-Menüs (Markierung, leere Zeile, Bild) {#bubble-menus-selection-empty-line-image}

| token | CSS variable | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | gleich |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | gleich |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | gleich |

### Dropdown-Menüs {#dropdown-menus}

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

<a id="menu-classic-note"></a>³ Die **Listen**-Box (Radius, Schatten, Listen-Padding) des klassischen Menüs ist heute eine Skin-Regel — der Token-Wrapper `SkinScope` sitzt zwischen der eigenen Kind-Regel von Vuetify und der Liste, daher stellt die Bibliothek diese Pixel als Skin-Regeln wieder her, die die obigen Tokens lesen. Die **Item**-Pixel bleiben natives Vuetify (die Fixture misst dort die Vuetify-Standardwerte): Die vier Item-Tokens sind wirkungslos, solange `menu: 'vuetify'` gilt.

### Dialoge {#dialogs}

| token | CSS variable | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard elevation [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | Feld-Standard (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Rahmen (Border-Wrapper des Editors) {#frame-editor-border-wrapper}

| token | CSS variable | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, keine obere Kante | voller Rahmen |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Unter der flachen Symbolleisten-Form malt der Rahmen außerdem ein Delta pro Seite (eine obere Kante und die untere Kante mit 1,6-facher Border-Deckkraft). Dieses Delta gehört zur Form, nicht zu einem Token: Es ist über Tokens nicht erreichbar.

### Bilder und Resize-Handles {#images-and-resize-handles}

| token | CSS variable | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (ausgewählt) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (Hover) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Die Bild-Werkzeugleiste folgt dem Flag `buttons`: Unter der ruhigen Form erhält sie die ruhige Oberfläche — ihre Abstände von 2px/4px lesen `--tf-bubble-gap` / `--tf-bubble-padding` mit den Fallbacks des Bildmenüs; es gibt kein eigenes Token für die Bild-Werkzeugleiste.

### Nicht im Katalog (Notlösungs-Gebiet) {#not-in-the-catalog-escape-hatch-territory}

Einige in der Design-Übersicht genannte Maße haben in v1 kein Katalog-Token: **Höhe der Symbolleiste, Rahmenbreite, Rahmenradius, Schaltflächenbreite, Schaltflächen-Padding, Dialogbreite**. Die Katalogtabellen oben sind der Vertrag; für diese Pixel öffne die [Notlösung](#escape-hatch-the-root-class) und gestalte die stabilen Klassen direkt.

## Reichweite {#reachability}

Der Vertrag, einmal formuliert und von jeder Gruppe oben eingehalten:

> Ein Token bemalt eine Oberfläche nur, wenn die Form diese Oberfläche aktiviert; native Vuetify-Optik wird über Vuetify-Themenfarben gestaltet.

Pro Gruppe:

- **Symbolleiste, Rahmen, Bild-/Handle-Chrome** — in jeder Form aktiv; die Tokens bemalen sie, die Classic-Zellen sind das native Erscheinungsbild, auf das die Tokens zurückfallen.
- **Gruppen-Box** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — unter `groups: 'box'` ist der Bereich eine VBtnGroup (Struktur von 0.3.2: die Schaltflächen sind verbunden, die Box trägt die Erhebung); die Box-Regeln bemalen sie mit den Gruppen-Tokens, und `--tf-group-height` hält den Vertrag von 32px mit einem `!important` (die Dichte-Regel von Vuetify kämpft dagegen, wie in 0.3.2). Unter `groups: 'flat'` sind die Bereiche einfache div-Reihen (transparent, ohne Schatten, Radius 0 ist die Basis der Form).
- **Trennlinien-Haarlinien** (`dividerWidth/Height/Color`) — die sichtbare Haarlinie ist ein Angebot von `groups: 'flat'`; in der Box-Form ist der Trenner ein Abstandshalter der Größe null (`margin: 0 4px` aus der Basisregel).
- **Item-Padding/Abstände** — der kompakte Lauf `6px 8px` ist an die flache Leiste gebunden (`toolbar: 'flat'`), die Gruppenabstände an die flachen Bereiche (`groups: 'flat'`); die erhabene Leiste behält die klassischen Maße.
- **Schaltflächen** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — wirkungslos unter `buttons: 'vuetify'`: Die nativen Vuetify-Schaltflächen malen ihre Zustände selbst. Gestalte sie mit Vuetify-Themenfarben (`primary`, `surface`, …) — die klassischen Formen erben sie bewusst.
- **Menü-Item-Maße** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — wirkungslos unter `menu: 'vuetify'`; Vuetify besitzt diese Item-Pixel. Die Menü-**Listen**-Box (Radius/Schatten/Padding) wird in beiden Formen vom Skin gemalt (siehe die [Menü-Notiz](#menu-classic-note)).
- **Weiches Dialog-Chrome** (`dialogActionBtn*`, `dialogFieldRadius`, die weichen Paddings, die fehlende Trennlinie) — gemalt unter `dialog: 'soft'`; unter `dialog: 'classic'` ist der Dialog eine VCard mit den klassischen Paddings.
- **Bubble-Chrome** — die Menüs für Markierung, leere Zeile und Bild sind in beiden Formen eine Reihe von Icon-Schaltflächen, gemalt von den Bubble-Tokens; `bubble` ändert ihr Markup nicht mehr.

Eine Überschreibung, die dem Katalog-Basiswert entspricht, wird **nicht ausgegeben** — unter einer nicht klassischen Form malt die eigene Basis der Form über den CSS-Fallback, sodass das „Wiederherstellen“ eines klassischen Wertes (z. B. `buttonActiveBg` unter `buttons: 'quiet'` zurück auf `rgb(var(--v-theme-primary))`) stillschweigend nichts bewirkt. Um unter einer nicht klassischen Form einen klassisch aussehenden Wert zu erzwingen, setze eine Überschreibung, die sich vom Katalog-Basiswert unterscheidet — ein äquivalentes Literal wie `rgba(var(--v-theme-primary), 1)` malt identisch und übersteht das Überspringen.

Tokens sind bewusst nicht in native Pfade eingebunden — das hält `default` pixelgleich mit dem klassischen Erscheinungsbild, während alles über den Katalog läuft.

## Rezepte {#recipes}

### pastel erweitern {#extend-pastel}

Erbe die ruhige Form und male ein paar Oberflächen neu. Registrierte Namen funktionieren in jedem Editor:

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

Die Form (flat/quiet/soft) kommt von pastel; unberührte Tokens behalten die Werte von pastel — die ruhige Schaltflächentönung bleibt neutral, nur was du überschreibst, bewegt sich. Das ist der Skin, der live auf der [Beispielseite](/de/examples/skins#custom-mint) gerendert wird.

### default erweitern {#extend-default}

Behalte die klassische Struktur und passe die Farben an:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` ist die implizite Wurzel, der Schlüssel kann also entfallen: `{ toolbar: 'flat', … }` startet ebenfalls von classic.

### Vollständig eigen {#full-custom}

Kein `extends`, keine Registrierung: Übergib das Objekt an die Prop `skin` und setze Form-Flags und Tokens frei. Ein `name` setzt dein eigenes Label auf die Root-Klasse (siehe unten); ohne ihn ist es `tiptapify-skin-inline`.

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

`defineSkin` ist der Identitäts-Helper für typisierte const-Definitionen (er gelangt in keine Registry). Form-Flags dürfen einzeln gesetzt werden — jedes Flag, das du weglässt, bleibt classic.

## Notlösung: die Root-Klasse {#escape-hatch-the-root-class}

Jeder Editor-Root trägt `tiptapify-skin-{name}` (`tiptapify-skin-inline` für ein namenloses Inline-Objekt). Die Bibliothek **verknüpft nie eine Regel mit einem Skin-Namen** — die Klasse gehört dir:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Die stabilen Hooks, gegen die du schreiben kannst:

| class | where |
|---|---|
| `tiptapify-skin-{name}` | Editor-Root |
| `tiptapify-shape-{flag}-{value}` ×6 | Editor-Root — die aufgelöste Form |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | die Symbolleiste und ihre Bereiche |
| `tiptapify-quiet-buttons` | Symbolleisten- und Bubble-Roots unter `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | die Reihe jedes Bubble-Menüs und die Haarlinie zwischen seinen Gruppen |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | die Reihen der Menüs für Markierung, leere Zeile und Bild |
| `tiptapify-btn--active` | eine gedrückte Schaltfläche eines Bubble-Menüs (eine aktive Auszeichnung, der Bild-Float) |
| `tiptapify-menu` · `tiptapify-menu--soft` | Inhalt des Dropdown-Overlays, der Träger der weichen Menü-Regeln |
| `tiptapify-skin-scope` | das Token-Scope-div innerhalb teleportierter Menüs |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | die Dialogkarte und ihr weicher Träger |
| `tiptapify-frame` | der Border-Wrapper des Editors |

**Abwehr gegen Consumer-Themes.** Die Skin-Schicht ist so gebaut, dass sie Admin-Themes übersteht, die Vuetify-Interna mit Padding versehen und neu bemalen: Regeln sind an Form-/Träger-Klassen gebunden, nutzen verdoppelte Klassen (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) für die Spezifität und behalten `!important` nur dort, wo der Admin-Theme-Fall des Basis-Commits es als nötig erwiesen hat (die Abwehrmenge in menu.css). Konventionen, mit denen deine eigenen Überschreibungen auf demselben Schlachtfeld funktionieren:

- begrenze dein CSS auf `.tiptapify-skin-{name}` (oder eine Form-Klasse) — nie auf nackte Vuetify-Interna;
- bevorzuge Tokens (`--tf-*`) für die Katalogmaße, Klassen für den Rest;
- verdopple beim Überschreiben von Vuetify-Komponenten ebenso (ein einzelnes `.v-list-item` verliert gegen die Skin-Regeln).

## Visueller Vertrag (Hinweis für Contributor) {#visual-contract-contributor-note}

Die berechneten Stile der eingebauten Skins sind durch die Baseline-Fixture `src/skins/__fixtures__/skin-baseline.json` festgelegt (13 Abschnitte × hell/dunkel): Die CSS-Schicht ist fertig, wenn die gemessene Matrix mit ihr übereinstimmt. Lesehinweise zur Fixture:

- Hover-/Aktiv-Maße lassen sich von der Seite aus nicht erzwingen, daher liest die Aufzeichnung für jeden Hover-Selektor den **Deklarationstext der ersten getroffenen CSSOM-Regel** und löst ihn über ein Probe-Element im Skin-Root auf (das Feld `resolved`) — es ist der Vertrag der gewinnenden Regel, kein Live-Schnappschuss von `:hover`.
- `_meta.selectors.menu` hält den Selektortext vor `SkinScope` fest. Die Fixture ist eingefroren (normative Werte), das Feld ist also absichtlich veraltet; das Aufzeichnungs-Bundle legt den aktuellen Selektor fest.
- Die Fixture trägt ihre genehmigten Änderungen in `_meta.notes`: Die Wiederherstellung des VBtnGroup-Markups unter `groups: 'box'` vom 18.10.2026 hat die Classic-Felder `groupBtn`/`buttonsActive` der Kind-Schaltflächen neu vermessen (verbundene Ecken, die Box besitzt die Erhebung). Pastel-Felder sind unberührt — eine bewusste visuelle Änderung aktualisiert nur die betroffenen Classic-Zellen, vermerkt eine Notiz und liefert eine CHANGELOG-Zeile mit.

## Siehe auch {#see-also}

- [Skins-Beispiele](/de/examples/skins) — classic, pastel und der eigene mint-Skin, live.
- [`skin`-Prop](/de/api/props#skin) · [Skin-Typen](/de/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/de/api/types#tiptapifyskininput).
