# Skinek {#skins}

A **skin** a szerkesztő keretének egy megjelenése: az eszköztár, benne a gombok és csoportok, a buborékmenük, a legördülő menük, a párbeszédablakok, a tartalom körüli keret és a képkijelölés megjelenése. A `skin` prop választja ki:

```vue
<Tiptapify skin="pastel" />
```

A skin két dologból áll: **tokenekből** (színek és méretek CSS-változókként) és **formából** (szerkezeti változatok, amelyeket a token nem tud kifejezni). A két beépített skin a `default` — a klasszikus megjelenés, kiemelt eszköztár kiemelt gombcsoportokkal — és a `pastel`, a nyugodt megjelenés. Az egyéni skinek teljes értékűek: a `registerSkin()` és az inline skinobjektumok pontosan ugyanazon a mechanizmuson keresztül oldódnak fel, a beépített skinek pedig regisztrált skinek, nem különleges esetek.

## Terminológia: skin és Vuetify téma {#terminology-skin-vs-vuetify-theme}

- **skin** — a szerkesztő keretének egy megjelenésére használt, felhasználóknak szóló kifejezés: tokenek + alakzat. A prop neve `skin`, a típusok `TiptapifySkin*`, a jegyzék a `registerSkin()`, a gyökérosztály `tiptapify-skin-{name}`.
- **téma** — a Vuetify világos/sötét témáinak fenntartott kifejezés. A Tiptapify komponensek `theme` propjai a Vuetify aktuális témanevéből kapják az értéküket; a skinrendszer soha nem nyúl hozzájuk.

Együttműködnek: a legtöbb beépített tokenszín Vuetify témaváltozókra hivatkozik (`rgb(var(--v-theme-surface))`, …), így a skinek automatikusan követik a világos/sötét módot. A klasszikus oszlopban a fix sötét cellák — az átméretező fogantyú (`rgba(0, 0, 0, .5/.8)`), a sima képkontúr, a buborék árnyéka, valamint a menü- és párbeszédablak-emelési árnyékok — szándékosak: a klasszikus megjelenés mindkét témában semleges sötét keretet fest, és a mért alapvonal rögzíti őket. Az egyéni skin szabadon hivatkozhat témaváltozókra — lásd a tokentáblázatot.

## Koncepció {#concept}

### Tokenek {#tokens}

A token egy `--tf-*` nevű CSS egyéni tulajdonság. A katalóguskulcs a CSS-utótag camelCase alakja: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Az értékek sima szövegek — színek, teljes border-rövidítések, árnyékok, belső margók, lekerekítések.

A könyvtár minden skinszabálya **egyszer** létezik, a tokenjét a klasszikus (alap) értékkel megegyező tartalék értékkel olvasva:

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

A feloldott skin csak a **felülírásait** bocsátja ki változókként; a CSS tartalék értékek hordozzák az alapot. A változók a szerkesztő gyökerére kerülnek — és mivel a menük és párbeszédablakok kiteleportálódnak belőle, minden menü `SkinScope` burkolójára és magára a párbeszédablak-kártyára is, így a tokenek minden felületet követnek.

### Alakzat {#shape}

Hat jelző dönti el, mely szabályhalmazok érvényesek; a tokenek festik meg őket:

| jelző | értékek | mit kapcsol át |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbar emelés + nincs belső hajszálvonal vs lapos színezett sáv |
| `groups` | `box` · `flat` | az eszköztár-szakaszok kiemelt **VBtnGroup** dobozokként (0.3.2 markup: összekapcsolt gombok, a csoporttokenek festik a dobozt) vs sima flex div-sorok |
| `buttons` | `vuetify` · `quiet` | natív Vuetify gombok vs szellemgombok semleges lenyomott állapottal |
| `bubble` | `card` · `flat` | kompatibilitási okból megtartva: a buborékmenük mindkét alakzatban egy tokenekkel festett ikongomb-sor (gombjaik a `buttons` jelzőt követik) |
| `dialog` | `classic` · `soft` | elválasztó a cím alatt, kiemelt bezárás vs lágy kártya, szöveges bezárás |
| `menu` | `vuetify` · `soft` | legördülő menük: Vuetify lista vs a világos, kitöltött kártya |

A feloldott alakzat hat `.tiptapify-shape-{flag}-{value}` osztályként kódolódik a szerkesztő gyökerén, és `shape: ComputedRef<ResolvedShape>` néven elérhető a [`useTiptapifyConfig()`](/hu/api/types#usetiptapifyconfig)-on az egyéni eszköztár-komponensek számára.

### Extends {#extends}

A skin a klasszikus alap fölött oldódik fel, majd az `extends` láncán gyökértől kezdve, végül a saját tagjain:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

A hiányzó láncszemek a felhalmozott láncra oldódnak fel (fejlesztői figyelmeztetéssel); a ciklus a classicra oldódik fel (fejlesztői figyelmeztetéssel). A regisztrált skinre név szerint hivatkozunk; a beágyazott skin-objektum `extends` értéke lehet regisztrált név, és soha nem kerül a globális jegyzékbe — az egyéni skinek soha nem szivárognak át a szerkesztők között. Az ismeretlen tokenkulcsokat figyelmen kívül hagyja, fejlesztői figyelmeztetéssel.

Mindhárom forma élő demói a [Skin példák oldalon](/hu/examples/skins) találhatók.

## Tokenkatalógus {#token-catalog}

Az alábbi táblázatok a **v1 szerződést** képezik: a katalóguskulcsok (`TiptapifySkinColors` / `TiptapifySkinMetrics`) a beállítható nevek. A klasszikus cellák a CSS tartalék értékek — az az érték, amelyet az alapszabályok festenek, ha egy skin nem írja felül a tokent.

### Eszköztár / sáv {#toolbar-bar}

| token | CSS-változó | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Elemek / csoportok / elválasztók {#items-groups-dividers}

| token | CSS-változó | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify elevation 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (térköz: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ A mért klasszikus cella `normal` — a Vuetify natív flex értéke, amelyet a CSS tartalék érték hordoz. A katalógus `0px` alapértéke a skinfelülírásokhoz használható egyenértékű explicit hossz.

<a id="shadow-cells"></a>² A „Vuetify elevation *n*” feliratú cellák leíró jellegűek: a pontos háromszoros árnyék-szöveg a beküldött alapvonal-fixtúrában (`src/skins/__fixtures__/skin-baseline.json`) mért érték, és ez a CSS tartalék érték. A `groupShadow` esetén ez az **elevation 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — a `groups: 'box'` alatt a szakasz egy VBtnGroup (`elevation="4"`), és a tokenszabály ezzel a hármassal festi a dobozt a csoport saját emelése fölött: a doboz birtokolja az emelést, az összekapcsolt gyermekgombok nem hordoznak ilyet.

### Gombok {#buttons}

Ezeket a tokeneket **csak a `buttons: 'quiet'` alatt** használja a rendszer — lásd az [Elérhetőség](#reachability) részt.

| token | CSS-változó | quiet érték (classic: natív Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Buborékmenük (kijelölés, üres sor, kép) {#bubble-menus-selection-empty-line-image}

| token | CSS-változó | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | ugyanaz |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | ugyanaz |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | ugyanaz |

### Legördülő menük {#dropdown-menus}

| token | CSS-változó | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify elevation 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ A klasszikus menü **lista**-doboza (lekerekítés, árnyék, listakitöltés) ma skinszabály — a `SkinScope` tokenburkoló a Vuetify saját gyermekszabálya és a lista között ül, ezért a könyvtár ezeket a pixeleket a fenti tokeneket olvasó skinszabályokként állítja vissza. Az **elem**-pixelek natív Vuetify-ek maradnak (a fixtúra ott a Vuetify alapértékeit méri): a négy elemtoken inaktív, amíg `menu: 'vuetify'`.

### Párbeszédablakok {#dialogs}

| token | CSS-változó | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard elevation [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | mező alapértéke (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Keret (a szerkesztő szegélyburkolója) {#frame-editor-border-wrapper}

| token | CSS-változó | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, felső él nélkül | teljes szegély |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

A lapos eszköztár-alakzat alatt a keret oldalankénti deltát is fest (felső élt, és az alsó élt 1,6× szegélyátlátszósággal). Ez a delta az alakzathoz tartozik, nem tokenhez: tokennel nem érhető el.

### Képek és átméretező fogantyúk {#images-and-resize-handles}

| token | CSS-változó | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (kijelölve) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (hover) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

A képeszköztár a `buttons` jelzőt követi: a quiet alakzat alatt a quiet felületet kapja — 2px/4px térközei a `--tf-bubble-gap` / `--tf-bubble-padding` értékeket olvassák a képmenü tartalék értékeivel; nincs dedikált képeszköztár-token.

### Nincs a katalógusban (menekülőút-terület) {#not-in-the-catalog-escape-hatch-territory}

A tervezési áttekintésben említett néhány dimenzióhoz nincs katalógustoken a v1-ben: **az eszköztár magassága, a keret szélessége, a keret lekerekítése, a gomb szélessége, a gomb belső margója, a párbeszédablak szélessége**. A fenti katalógustáblázatok jelentik a szerződést; ezekhez a pixelekhez nyisd meg a [menekülőutat](#escape-hatch-the-root-class), és közvetlenül a stabil osztályokat stílusozd.

## Elérhetőség {#reachability}

A szerződés, egyszer kimondva és minden fenti csoport által betartva:

> A token csak akkor fest meg egy felületet, ha az alakzat aktiválja azt a felületet; a natív Vuetify megjelenéseket a Vuetify témaszínek stílusozzák.

Csoportonként:

- **Eszköztár, keret, kép/fogantyú keret** — minden alakzatban aktív; a tokenek festik őket, a klasszikus cellák az a natív megjelenés, amelyre a tokenek visszaesnek.
- **Csoportdoboz** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — a `groups: 'box'` alatt a szakasz egy VBtnGroup (0.3.2 szerkezet: a gombok összekapcsolódnak, a doboz hordozza az emelést); a dobozszabályok a csoporttokenekkel festik, és a `--tf-group-height` `!important`-tal tartja a 32px-es szerződést (a Vuetify sűrűségszabálya küzd ellene, mint a 0.3.2-ben). A `groups: 'flat'` alatt a szakaszok sima div-sorok (átlátszó, árnyék nélküli, a 0 lekerekítés az alakzat alapja).
- **Elválasztó hajszálvonalak** (`dividerWidth/Height/Color`) — a látható hajszálvonal a `groups: 'flat'` sajátossága; a doboz alakzatban az elválasztó nulla méretű térköz (`margin: 0 4px` az alapszabályból).
- **Elemek kitöltése/térközei** — a kompakt `6px 8px` sor a lapos sávhoz (`toolbar: 'flat'`) kötött, a csoporttérközök a lapos szakaszokhoz (`groups: 'flat'`); a kiemelt sáv a klasszikus metrikákat tartja meg.
- **Gombok** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — inaktívak a `buttons: 'vuetify'` alatt: a natív Vuetify gombok saját állapotaikat festik. Stílusozd őket Vuetify témaszínekkel (`primary`, `surface`, …) — a klasszikus alakzatok szándékosan öröklik azokat.
- **Menüelem-metrikák** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — inaktívak a `menu: 'vuetify'` alatt; ezeket az elempixeleket a Vuetify birtokolja. A menü **lista**-doboza (lekerekítés/árnyék/kitöltés) mindkét alakzatban skinnel festett (lásd a [menümegjegyzést](#menu-classic-note)).
- **Párbeszédablak lágy kerete** (`dialogActionBtn*`, `dialogFieldRadius`, a lágy kitöltések, a hiányzó elválasztó) — a `dialog: 'soft'` alatt festett; a `dialog: 'classic'` alatt a párbeszédablak egy VCard a klasszikus kitöltésekkel.
- **Buborékkeret** — a kijelölés-, üres sor- és képmenük mindkét alakzatban egy ikongomb-sor, amelyet a buboréktokenek festenek; a `bubble` már nem változtatja a markupjukat.

A katalógus alapjával megegyező felülírás **nem kerül kibocsátásra** — nem klasszikus alakzat alatt az alakzat saját alapja fest a CSS tartalék értéken keresztül, így egy klasszikus érték „visszaállítása” (pl. a `buttonActiveBg` visszaállítása `rgb(var(--v-theme-primary))`-ra a `buttons: 'quiet'` alatt) csendben semmit sem tesz. Ha nem klasszikus alakzat alatt klasszikus kinézetű értéket akarsz kikényszeríteni, állíts be a katalógus alapjától eltérő felülírást — egy egyenértékű literál, például az `rgba(var(--v-theme-primary), 1)`, ugyanúgy fest, és átvészeli a kihagyást.

A tokenek szándékosan nincsenek bekötve a natív útvonalakba — ez tartja a `default` skint pixelpontosan klasszikus megjelenésűnek, miközben minden a katalóguson keresztül halad.

## Receptek {#recipes}

### A pastel bővítése {#extend-pastel}

Örökld a quiet alakzatot, és fesd át néhány felületet. A regisztrált nevek bármely szerkesztőn működnek:

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

Az alakzat (flat/quiet/soft) a pastelből jön; az érintetlen tokenek megtartják a pastel értékeit — a quiet gombháttér semleges marad, csak az mozdul, amit felülírsz. Ez a skin élőben látható a [példák oldalon](/hu/examples/skins#custom-mint).

### A default bővítése {#extend-default}

Tartsd meg a klasszikus szerkezetet, hangold a festést:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

Az `extends: 'default'` az implicit gyökér, ezért a kulcs elhagyható: a `{ toolbar: 'flat', … }` is a classicból indul.

### Teljesen egyéni {#full-custom}

Nincs `extends`, nincs regisztráció: add át az objektumot a `skin` propnak, és szabadon állíts alakzatjelzőket és tokeneket. A `name` saját címkét ad a gyökérosztálynak (lásd alább); nélküle ez `tiptapify-skin-inline`.

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

A `defineSkin` az azonosító segédfüggvény a típusos const definíciókhoz (nem kerül jegyzékbe). Az alakzatjelzők egyenként is beállíthatók — minden kihagyott jelző klasszikus marad.

## Menekülőút: a gyökérosztály {#escape-hatch-the-root-class}

Minden szerkesztőgyökér `tiptapify-skin-{name}` osztályt visel (`tiptapify-skin-inline` a név nélküli beágyazott objektumnál). A könyvtár **soha nem köt szabályt skinnévhez** — az osztály a tiéd:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

A stabil kapaszkodók, amelyekre írhatsz:

| osztály | hol |
|---|---|
| `tiptapify-skin-{name}` | szerkesztőgyökér |
| `tiptapify-shape-{flag}-{value}` ×6 | szerkesztőgyökér — a feloldott alakzat |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | az eszköztár és szakaszai |
| `tiptapify-quiet-buttons` | az eszköztár- és buborékgyökerek a `buttons: 'quiet'` alatt |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | minden buborékmenü sora és a csoportjai közötti hajszálvonal |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | a kijelölés-, üres sor- és képmenü-sorok |
| `tiptapify-btn--active` | a buborékmenü lenyomott gombja (aktív jelölés, a kép lebegtetése) |
| `tiptapify-menu` · `tiptapify-menu--soft` | a legördülő overlay tartalma, a lágy menüszabályok hordozója |
| `tiptapify-skin-scope` | a tokenhatókör-div a kiteleportált menükben |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | a párbeszédablak-kártya és lágy hordozója |
| `tiptapify-frame` | a szerkesztő szegélyburkolója |

**Védelem a fogyasztói témák ellen.** A skinréteget úgy építették, hogy túlélje azokat az admin témákat, amelyek kitöltik és újrafestik a Vuetify belsőit: a szabályok alakzat-/hordozóosztályokra kapuznak, kettőzött osztályokat (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) használnak a specificitáshoz, és az `!important`-ot csak ott tartják meg, ahol az alapkommit admin téma esete szükségesnek bizonyította (a menu.css védelmi készlet). Konvenciók, amelyekkel a saját felülírásaid is működnek ugyanezen a csatatéren:

- a CSS-edet a `.tiptapify-skin-{name}` (vagy egy alakzatosztály) alá szűkítsd — soha ne csupasz Vuetify belsőkre;
- a katalógusdimenziókhoz előnyben részesítsd a tokeneket (`--tf-*`), a többihez az osztályokat;
- a Vuetify komponensek felülírásakor illeszkedj a kettőzéshez (egy egyszerű `.v-list-item` veszít a skinszabályokkal szemben).

## Vizuális szerződés (közreműködői megjegyzés) {#visual-contract-contributor-note}

A beépített skinek számított stílusait az `src/skins/__fixtures__/skin-baseline.json` alapvonal-fixtúra rögzíti (13 szakasz × világos/sötét): a CSS-réteg akkor kész, ha a mért mátrix megegyezik vele. Olvasási megjegyzések a fixtúrához:

- A hover/active dimenziókat nem lehet az oldalról kikényszeríteni, ezért a rögzítés minden hover-szelektorhoz az **első találati CSSOM-szabály deklarációs szövegét** olvassa, és a skingyökéren belüli próbaelemen keresztül oldja fel (a `resolved` mező) — ez a nyertes szabály szerződése, nem élő `:hover` pillanatkép.
- Az `_meta.selectors.menu` a `SkinScope` előtti szelektorszöveget rögzíti. A fixtúra befagyasztott (normatív értékek), ezért a mező szándékosan elavult; a rögzítőcsomag az aktuális szelektort rögzíti.
- A fixtúra a jóváhagyott változásait az `_meta.notes` mezőben hordozza: a VBtnGroup markup 2026-10-18-i visszaállítása a `groups: 'box'` alatt újramérte a klasszikus `groupBtn`/`buttonsActive` gyermekgomb-mezőket (összekapcsolt sarkok, a doboz birtokolja az emelést). A pastel mezők érintetlenek — a szándékos vizuális változás csak az érintett klasszikus cellákat frissíti, jegyzetet rögzít, és egy CHANGELOG-sorral érkezik.

## Lásd még {#see-also}

- [Skin példák](/hu/examples/skins) — classic, pastel és az egyéni mint skin, élőben.
- [`skin` prop](/hu/api/props#skin) · [skintípusok](/hu/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/hu/api/types#tiptapifyskininput).
