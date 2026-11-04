# Skiny {#skins}

**Skin** je jeden vzhľad rámca editora: lišty nástrojov, tlačidiel a skupín v nej, bublinových ponúk, rozbaľovacích ponúk, dialógov, rámca okolo obsahu a rámca výberu obrázka. Vyberá sa propom `skin`:

```vue
<Tiptapify skin="pastel" />
```

Skin tvoria dve veci: **tokeny** (farby a rozmery ako premenné CSS) a **tvar** (štrukturálne varianty, ktoré token nevyjadrí). Dva vstavané skiny sú `default` — klasický vzhľad, zvýšený panel nástrojov so zvýšenými skupinami tlačidiel — a `pastel`, pokojný vzhľad. Vlastné skiny sú plnohodnotné: `registerSkin()` a inline objekty skinov sa spracúvajú úplne rovnakým mechanizmom a vstavané skiny sú registrované skiny, nie osobitné prípady.

## Terminológia: skin vs téma Vuetify {#terminology-skin-vs-vuetify-theme}

- **skin** — používateľský pojem pre jeden vzhľad rámca editora: tokeny + tvar. Prop sa volá `skin`, typy `TiptapifySkin*`, register `registerSkin()` a koreňová trieda `tiptapify-skin-{name}`.
- **theme** (téma) — vyhradené pre svetlé a tmavé témy Vuetify. Komponenty Tiptapify majú svoje props `theme` napájané z názvu aktuálnej témy Vuetify; systém skinov sa ich nikdy nedotýka.

Dopĺňajú sa: väčšina farieb vstavaných tokenov odkazuje na premenné témy Vuetify (`rgb(var(--v-theme-surface))`, …), takže skiny automaticky sledujú svetlý a tmavý režim. Bunky s pevnou tmavou farbou v stĺpci classic — úchyt zmeny veľkosti (`rgba(0, 0, 0, .5/.8)`), obyčajný obrys obrázka, tieň bubliny a tiene vyvýšenia ponúk a dialógov — sú zámerné: klasický vzhľad kreslí neutrálny tmavý rámec v oboch témach a nameraný základ ich pripína. Vlastný skin môže na premenné témy odkazovať voľne — pozri tabuľku tokenov.

## Koncept {#concept}

### Tokeny {#tokens}

Token je vlastnosť CSS s názvom `--tf-*`. Kľúč v katalógu je camelCase prípony CSS: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Hodnoty sú obyčajné reťazce — farby, úplné skrátené zápisy okrajov, tiene, odsadenia, polomery.

Každé pravidlo skinu v knižnici existuje **raz** a číta svoj token s rezervou rovnou klasickej (základnej) hodnote:

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Vyriešený skin vypíše ako premenné iba svoje **prepísania**; základ nesú rezervné hodnoty CSS. Premenné sa dostanú na koreň editora — a keďže sa ponuky a dialógy z neho teleportujú, aj na obaľovač `SkinScope` každej ponuky a na samotnú kartu dialógu, takže tokeny sledujú každú plochu.

### Tvar {#shape}

Šesť príznakov určuje, ktoré sady pravidiel sa použijú; tokeny ich vykreslia:

| príznak | hodnoty | čo prepína |
|---|---|---|
| `toolbar` | `raised` · `flat` | vyvýšenie VToolbar + bez vnútornej tenkej čiary vs plochý tónovaný panel |
| `groups` | `box` · `flat` | sekcie lišty nástrojov ako vyvýšené boxy **VBtnGroup** (značkovanie z 0.3.2: spojené tlačidlá, tokeny skupiny kreslia box) vs obyčajné rady div s flexom |
| `buttons` | `vuetify` · `quiet` | natívne tlačidlá Vuetify vs priehľadné tlačidlá s neutrálnym stavom stlačenia |
| `bubble` | `card` · `flat` | ponechané pre kompatibilitu: bublinové ponuky sú v oboch tvaroch jeden riadok tlačidiel s ikonami vykreslený tokenmi (ich tlačidlá sledujú `buttons`) |
| `dialog` | `classic` · `soft` | oddeľovač pod titulkom, vyvýšené zatvorenie vs jemná karta, textové zatvorenie |
| `menu` | `vuetify` · `soft` | rozbaľovacie ponuky: zoznam Vuetify vs svetlá karta s odsadením |

Vyriešený tvar je zakódovaný na koreni editora ako šesť tried `.tiptapify-shape-{flag}-{value}` a pre vlastné komponenty lišty nástrojov je dostupný ako `shape: ComputedRef<ResolvedShape>` v [`useTiptapifyConfig()`](/sk/api/types#usetiptapifyconfig).

### Extends {#extends}

Skin sa rieši nad klasickým základom, potom jeho reťazcom `extends` od koreňa a nakoniec jeho vlastnými členmi:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Chýbajúce články sa vyriešia na nazbieraný reťazec (s upozornením pre vývojára); cyklus sa vyrieši na classic (s upozornením pre vývojára). Registrovaný skin sa odkazuje názvom; inline objekt skinu môže použiť `extends` s registrovaným názvom a nikdy nevstúpi do globálneho registra — vlastné skiny sa nikdy nepresúvajú medzi editormi. Neznáme kľúče tokenov sa ignorujú s upozornením pre vývojára.

Živé ukážky všetkých troch foriem sú na [stránke príkladov Skinov](/sk/examples/skins).

## Katalóg tokenov {#token-catalog}

Tabuľky nižšie sú **kontrakt v1**: kľúče katalógu (`TiptapifySkinColors` / `TiptapifySkinMetrics`) sú názvy, ktoré môžete nastaviť. Bunky classic sú rezervné hodnoty CSS — hodnota, ktorú základné pravidlá kreslia, keď token neprepíše žiadny skin.

### Lišta nástrojov / panel {#toolbar-bar}

| token | premenná CSS | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Položky / skupiny / oddeľovače {#items-groups-dividers}

| token | premenná CSS | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | vyvýšenie Vuetify 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (rozpórka: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Nameraná bunka classic je `normal` — natívna hodnota flexu Vuetify, ktorú nesie rezervná hodnota CSS. Základná hodnota katalógu `0px` je ekvivalentná explicitná dĺžka pre prepísania skinu.

<a id="shadow-cells"></a>² Bunky s textom „vyvýšenie Vuetify *n*“ sú popisné: presný reťazec trojitého tieňa je nameraná hodnota v odovzdanom základnom súbore fixture (`src/skins/__fixtures__/skin-baseline.json`) a je to rezervná hodnota CSS. Pre `groupShadow` je to **vyvýšenie 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — pri `groups: 'box'` je sekcia VBtnGroup (`elevation="4"`) a pravidlo tokenu kreslí box touto trojicou nad vlastným vyvýšením skupiny: box vlastní vyvýšenie, spojené podriadené tlačidlá žiadne nenesú.

### Tlačidlá {#buttons}

Tieto tokeny sa používajú **iba pri `buttons: 'quiet'`** — pozri [Dosiahnuteľnosť](#reachability).

| token | premenná CSS | hodnota quiet (classic: natívny Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Bublinové ponuky (výber, prázdny riadok, obrázok) {#bubble-menus-selection-empty-line-image}

| token | premenná CSS | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | rovnaké |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | rovnaké |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | rovnaké |

### Rozbaľovacie ponuky {#dropdown-menus}

| token | premenná CSS | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | vyvýšenie Vuetify 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Box **zoznamu** (polomer, tieň, odsadenie zoznamu) klasickej ponuky je dnes pravidlo skinu — obaľovač tokenov `SkinScope` sa nachádza medzi vlastným pravidlom potomka Vuetify a zoznamom, takže knižnica tieto pixely obnovuje ako pravidlá skinu čítajúce vyššie uvedené tokeny. Pixely **položiek** zostávajú natívne Vuetify (fixture tam meria predvolené hodnoty Vuetify): štyri tokeny položiek sú pri `menu: 'vuetify'` nečinné.

### Dialógy {#dialogs}

| token | premenná CSS | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | vyvýšenie VCard [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | predvolená hodnota poľa (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Rámec (obal okraja editora) {#frame-editor-border-wrapper}

| token | premenná CSS | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, bez horného okraja | úplný okraj |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Pri plochom tvare lišty nástrojov rámec kreslí aj deltu pre jednotlivé strany (horný okraj a spodný okraj s 1,6× krytím okraja). Táto delta patrí tvaru, nie tokenu: token ju nedosiahne.

### Obrázky a úchyty zmeny veľkosti {#images-and-resize-handles}

| token | premenná CSS | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (vybraný) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (hover) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Lišta obrázka sleduje príznak `buttons`: pri tichom tvare dostane tichú plochu — jej odsadenie 2px/4px číta `--tf-bubble-gap` / `--tf-bubble-padding` s rezervami ponuky obrázka; špeciálny token lišty obrázka neexistuje.

### Nie je v katalógu (oblasť únikového východu) {#not-in-the-catalog-escape-hatch-territory}

Niektoré rozmery spomenuté v prehľade dizajnu nemajú vo v1 token v katalógu: **výška lišty nástrojov, šírka rámca, polomer rámca, šírka tlačidla, odsadenie tlačidla, šírka dialógu**. Tabuľky katalógu vyššie sú kontrakt; pre tieto pixely použite [únikový východ](#escape-hatch-the-root-class) a štýlujte stabilné triedy priamo.

## Dosiahnuteľnosť {#reachability}

Kontrakt, ktorý stačí uviesť raz a dodržiava ho každá skupina vyššie:

> Token kreslí plochu iba vtedy, keď túto plochu tvar aktivuje; natívne vizuály Vuetify sa štýlujú farbami témy Vuetify.

Podľa skupín:

- **Lišta nástrojov, rámec, rámec obrázka a úchytov** — aktívne v každom tvare; tokeny ich kreslia, bunky classic sú natívny vzhľad, na ktorý sa tokeny vracajú.
- **Box skupín** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — pri `groups: 'box'` je sekcia VBtnGroup (štruktúra z 0.3.2: tlačidlá sa spoja, box nesie vyvýšenie); pravidlá boxu ho kreslia tokenmi skupiny a `--tf-group-height` drží kontrakt 32px s `!important` (pravidlo hustoty Vuetify s ním zápasí, ako v 0.3.2). Pri `groups: 'flat'` sú sekcie obyčajné rady div (priehľadné, bez tieňa, polomer 0 je základ tvaru).
- **Tenké čiary oddeľovačov** (`dividerWidth/Height/Color`) — viditeľná tenká čiara je vlastnosť `groups: 'flat'`; v tvare box je oddeľovač rozpórka nulovej veľkosti (`margin: 0 4px` zo základného pravidla).
- **Odsadenie a medzery položiek** — kompaktný rad `6px 8px` je viazaný na plochý panel (`toolbar: 'flat'`), medzery skupín na ploché sekcie (`groups: 'flat'`); vyvýšený panel si ponecháva klasické metriky.
- **Tlačidlá** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — pri `buttons: 'vuetify'` nečinné: natívne tlačidlá Vuetify kreslia svoje stavy samy. Štýlujte ich farbami témy Vuetify (`primary`, `surface`, …) — klasické tvary ich zámerne preberajú.
- **Metriky položiek ponuky** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — pri `menu: 'vuetify'` nečinné; tieto pixely položiek vlastní Vuetify. Box **zoznamu** ponuky (polomer/tieň/odsadenie) kreslí skin v oboch tvaroch (pozri [poznámku k ponuke](#menu-classic-note)).
- **Jemný rámec dialógu** (`dialogActionBtn*`, `dialogFieldRadius`, jemné odsadenia, chýbajúci oddeľovač) — kreslí sa pri `dialog: 'soft'`; pri `dialog: 'classic'` je dialóg VCard s klasickým odsadením.
- **Rámec bubliny** — ponuky výberu, prázdneho riadka a obrázka sú v oboch tvaroch jeden riadok tlačidiel s ikonami kreslený tokenmi bubliny; `bubble` už nemení ich značkovanie.

Prepísanie rovné základu katalógu sa **nevypíše** — pri nie klasickom tvare kreslí základ tvaru rezervná hodnota CSS, takže „obnovenie“ klasickej hodnoty (napr. nastavenie `buttonActiveBg` späť na `rgb(var(--v-theme-primary))` pri `buttons: 'quiet'`) potichu nič nespraví. Ak chcete pri neklasickom tvare vynútiť klasicky vyzerajúcu hodnotu, nastavte prepísanie, ktoré sa od základu katalógu líši — ekvivalentný literál, napríklad `rgba(var(--v-theme-primary), 1)`, kreslí rovnako a vynechaniu unikne.

Tokeny zámerne nie sú zapojené do natívnych ciest — vďaka tomu zostáva `default` pixel-identický s klasickým vzhľadom, zatiaľ čo všetko prechádza katalógom.

## Recepty {#recipes}

### Rozšírenie pastelu {#extend-pastel}

Zdedíte tichý tvar a prefarbíte niekoľko plôch. Registrované názvy fungujú na každom editore:

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

Tvar (flat/quiet/soft) pochádza z pastelu; nedotknuté tokeny si ponechávajú hodnoty pastelu — tichý odtieň tlačidiel zostáva neutrálny, mení sa iba to, čo prepíšete. Tento skin je živo vykreslený na [stránke príkladov](/sk/examples/skins#custom-mint).

### Rozšírenie default {#extend-default}

Ponechajte klasickú štruktúru a doladte farby:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` je implicitný koreň, takže kľúč možno vynechať: `{ toolbar: 'flat', … }` tiež začína z classic.

### Úplne vlastný {#full-custom}

Bez `extends`, bez registrácie: odovzdajte objekt propu `skin` a príznaky tvaru a tokeny nastavujte voľne. `name` dá koreňovej triede vašu vlastnú značku (pozri nižšie); bez neho je to `tiptapify-skin-inline`.

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

`defineSkin` je pomocná identitná funkcia pre typované konštantné definície (do registra nevstupuje). Príznaky tvaru možno nastaviť jednotlivo — každý vynechaný príznak zostáva classic.

## Únikový východ: koreňová trieda {#escape-hatch-the-root-class}

Koreň každého editora nesie `tiptapify-skin-{name}` (`tiptapify-skin-inline` pre inline objekt bez názvu). Knižnica **nikdy nekľúčuje žiadne pravidlo na názov skinu** — trieda je vaša:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Stabilné háčiky, na ktoré môžete písať štýly:

| trieda | kde |
|---|---|
| `tiptapify-skin-{name}` | koreň editora |
| `tiptapify-shape-{flag}-{value}` ×6 | koreň editora — vyriešený tvar |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | lišta nástrojov a jej sekcie |
| `tiptapify-quiet-buttons` | korene lišty nástrojov a bubliny pri `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | riadok každej bublinovej ponuky a tenká čiara medzi jej skupinami |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | riadky ponúk výberu, prázdneho riadka a obrázka |
| `tiptapify-btn--active` | stlačené tlačidlo bublinovej ponuky (aktívna značka, obtekanie obrázka) |
| `tiptapify-menu` · `tiptapify-menu--soft` | obsah prekrytia rozbaľovacej ponuky, nositeľ pravidiel jemnej ponuky |
| `tiptapify-skin-scope` | div s rozsahom tokenov vo vnútri teleportovaných ponúk |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | karta dialógu a jej jemný nositeľ |
| `tiptapify-frame` | obal okraja editora |

**Obrana pred témou konzumenta.** Vrstva skinov je postavená tak, aby prežila administrátorské témy, ktoré odsadzujú a prefarbujú vnútro Vuetify: pravidlá sa viažu na triedy tvaru/nositeľa, na špecifickosť používajú zdvojené triedy (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) a `!important` ponechávajú len tam, kde sa to v prípade administrátorskej témy základného commitu ukázalo ako nevyhnutné (obranná sada menu.css). Konvencie, vďaka ktorým vaše vlastné prepísania fungujú na rovnakom bojisku:

- svoje CSS ohraničte pod `.tiptapify-skin-{name}` (alebo triedu tvaru) — nikdy nie na holé vnútro Vuetify;
- pre rozmery katalógu uprednostnite tokeny (`--tf-*`), pre zvyšok triedy;
- pri prepisovaní komponentov Vuetify zopakujte zdvojenie (samotné `.v-list-item` prehrá s pravidlami skinu).

## Vizuálny kontrakt (poznámka pre prispievateľov) {#visual-contract-contributor-note}

Vypočítané štýly vstavaných skinov pripína základný súbor fixture `src/skins/__fixtures__/skin-baseline.json` (13 sekcií × svetlá/tmavá): vrstva CSS je hotová, keď sa nameraná matica s ním zhoduje. Poznámky k čítaniu fixture:

- Rozmery pre hover/active sa zo stránky nedajú vynútiť, preto záznam číta **text deklarácie prvého zásahu pravidla CSSOM** pre každý selektor hover a vyrieši ho cez sondu vo vnútri koreňa skinu (pole `resolved`) — je to kontrakt víťazného pravidla, nie živý snímok `:hover`.
- `_meta.selectors.menu` zaznamenáva text selektora pred `SkinScope`. Fixture je zmrazený (normatívne hodnoty), takže pole je zámerne zastarané; záznamový balík pripína aktuálny selektor.
- Fixture nesie svoje schválené zmeny v `_meta.notes`: obnovenie značkovania VBtnGroup pri `groups: 'box'` zo 2026-10-18 znovu zmeralo polia podriadených tlačidiel `groupBtn`/`buttonsActive` v classic (spojené rohy, box vlastní vyvýšenie). Polia pastelu zostávajú nedotknuté — zámerná vizuálna zmena aktualizuje iba dotknuté bunky classic, zaznamená poznámku a dodá riadok CHANGELOG.

## Pozri tiež {#see-also}

- [Príklady skinov](/sk/examples/skins) — classic, pastel a vlastný skin mint, naživo.
- [prop `skin`](/sk/api/props#skin) · [typy skinov](/sk/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/sk/api/types#tiptapifyskininput).
