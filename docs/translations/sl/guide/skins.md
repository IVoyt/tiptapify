# Preobleke {#skins}

**Preobleka** (skin) je en videz okvirja urejevalnika: orodne vrstice, gumbov in skupin v njej, menijev z mehurčkom, spustnih menijev, pogovornih oken, okvirja okoli vsebine in okvirja izbire slike. Izbere jo lastnost `skin`:

```vue
<Tiptapify skin="pastel" />
```

Skin sestavljata dve stvari: **žetoni** (barve in velikosti kot spremenljivke CSS) in **oblika** (strukturne različice, ki jih žeton ne more izraziti). Vgrajena skina sta `default` — klasični videz, dvignjena orodna vrstica z dvignjenimi skupinami gumbov — in `pastel`, umirjen videz. Skini po meri so enakovredni: `registerSkin()` in vrstični objekti skinov se razrešijo z natanko istim mehanizmom, vgrajeni skini pa so registrirani skini, ne posebni primeri.

## Izrazoslovje: preobleka (skin) in tema Vuetify {#terminology-skin-vs-vuetify-theme}

- **skin** — uporabniški izraz za en videz okvirja urejevalnika: žetoni + oblika. Lastnost je `skin`, tipi so `TiptapifySkin*`, register je `registerSkin()`, korenski razred je `tiptapify-skin-{name}`.
- **theme** — rezerviran za svetle/temne teme Vuetify. Komponente Tiptapify svoje lastnosti `theme` polnijo iz imena trenutne teme Vuetify; sistem preoblek se jih nikoli ne dotakne.

Delujejo skupaj: večina barv vgrajenih žetonov se sklicuje na spremenljivke teme Vuetify (`rgb(var(--v-theme-surface))`, …), zato preobleke samodejno sledijo svetlemu/temnemu načinu. Celice s fiksno temno barvo v stolpcu classic — ročica za spreminjanje velikosti (`rgba(0, 0, 0, .5/.8)`), navadna obroba slike, senca mehurčka ter sence dvigov menijev/pogovornih oken — so namerne: klasični videz v obeh temah riše nevtralen temen okvir, izmerjena osnova pa jih zaklene. Preobleka po meri se lahko prosto sklicuje na spremenljivke teme — glejte tabelo žetonov.

## Koncept {#concept}

### Žetoni {#tokens}

Žeton je lastna lastnost CSS z imenom `--tf-*`. Ključ kataloga je camelCase pripone CSS: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Vrednosti so navadni nizi — barve, polni skrajšani zapisi obrob, sence, odmiki, polmeri.

Vsako pravilo preobleke v knjižnici obstaja **enkrat** in prebere svoj žeton z nadomestno vrednostjo, enako klasični (osnovni) vrednosti:

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Razrešena preobleka odda kot spremenljivke samo svoje **prepise**; nadomestne vrednosti CSS nosijo osnovo. Spremenljivke pristanejo na korenu urejevalnika — in ker se meniji in pogovorna okna teleportirajo iz njega, tudi na ovojnici `SkinScope` vsakega menija in na sami kartici pogovornega okna, tako da žetoni sledijo vsaki površini.

### Oblika {#shape}

Šest zastavic določa, katera pravila veljajo; žetoni jih pobarvajo:

| zastavica | vrednosti | kaj preklaplja |
|---|---|---|
| `toolbar` | `raised` · `flat` | dvig VToolbar + brez notranje tanke črte proti ploski obarvani vrstici |
| `groups` | `box` · `flat` | odseki orodne vrstice kot dvignjena polja **VBtnGroup** (označevanje 0.3.2: združeni gumbi, žetoni skupine pobarvajo polje) proti navadnim vrstam div s flex |
| `buttons` | `vuetify` · `quiet` | izvorni gumbi Vuetify proti prosojnim gumbom z nevtralnim stanjem pritiska |
| `bubble` | `card` · `flat` | ohranjeno zaradi združljivosti: meniji z mehurčkom so v obeh oblikah ena vrstica gumbov z ikonami, pobarvana z žetoni (njihovi gumbi sledijo `buttons`) |
| `dialog` | `classic` · `soft` | ločilna črta pod naslovom, dvignjen gumb za zapiranje proti mehki kartici z besedilnim gumbom za zapiranje |
| `menu` | `vuetify` · `soft` | spustni meniji: seznam Vuetify proti svetli kartici z odmiki |

Razrešena oblika je na korenu urejevalnika kodirana kot šest razredov `.tiptapify-shape-{flag}-{value}` in izpostavljena kot `shape: ComputedRef<ResolvedShape>` na [`useTiptapifyConfig()`](/sl/api/types#usetiptapifyconfig) za komponente orodne vrstice po meri.

### Extends {#extends}

Preobleka se razreši čez klasično osnovo, nato po verigi `extends` od korena naprej, nazadnje pa čez lastne člane:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Manjkajoče povezave se razrešijo v nakopičeno verigo (z razvojnim opozorilom); cikel se razreši v klasično (z razvojnim opozorilom). Registrirana preobleka se navede po imenu; vrstični objekt preobleke lahko z `extends` podeduje registrirano ime in nikoli ne vstopi v globalni register — preobleke po meri se nikoli ne razlijejo med urejevalnike. Neznani ključi žetonov se prezrejo z razvojnim opozorilom.

Žive predstavitve vseh treh oblik so na [strani s primeri preoblek](/sl/examples/skins).

## Katalog žetonov {#token-catalog}

Spodnje tabele so **pogodba v1**: ključi kataloga (`TiptapifySkinColors` / `TiptapifySkinMetrics`) so imena, ki jih lahko nastavite. Celice classic so nadomestne vrednosti CSS — vrednost, ki jo osnovna pravila pobarvajo, kadar nobena preobleka žetona ne prepiše.

### Orodna vrstica / vrstica {#toolbar-bar}

| žeton | spremenljivka CSS | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Elementi / skupine / ločila {#items-groups-dividers}

| žeton | spremenljivka CSS | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | dvig Vuetify 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (distančnik: rob `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Izmerjena celica classic je `normal` — izvorna vrednost flex v Vuetify, ki jo nosi nadomestna vrednost CSS. Osnovna vrednost kataloga `0px` je enakovredna izrecna dolžina za prepise preobleke.

<a id="shadow-cells"></a>² Celice z besedilom »dvig Vuetify *n*« so opisne: natančen niz trojne sence je izmerjena vrednost v potrjeni osnovni datoteki (`src/skins/__fixtures__/skin-baseline.json`) in je nadomestna vrednost CSS. Pri `groupShadow` je to **dvig 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — pri `groups: 'box'` je odsek VBtnGroup (`elevation="4"`), pravilo žetona pa polje pobarva s to trojico čez lasten dvig skupine: polje je lastnik dviga, združeni otroški gumbi ga nimajo.

### Gumbi {#buttons}

Ti žetoni se uporabljajo **samo pri `buttons: 'quiet'`** — glejte [Dosegljivost](#reachability).

| žeton | spremenljivka CSS | tiha vrednost (classic: izvorni Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Meniji z mehurčkom (izbor, prazna vrstica, slika) {#bubble-menus-selection-empty-line-image}

| žeton | spremenljivka CSS | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | enako |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | enako |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | enako |

### Spustni meniji {#dropdown-menus}

| žeton | spremenljivka CSS | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | dvig Vuetify 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Polje **seznama** (polmer, senca, odmik seznama) klasičnega menija je danes pravilo preobleke — ovojnica žetonov `SkinScope` stoji med lastnim otroškim pravilom Vuetify in seznamom, zato knjižnica te slikovne pike obnovi kot pravila preobleke, ki berejo zgornje žetone. Slikovne pike **elementov** ostanejo izvorne za Vuetify (osnovna datoteka tam meri privzete vrednosti Vuetify): štirje žetoni elementov so neaktivni, dokler je `menu: 'vuetify'`.

### Pogovorna okna {#dialogs}

| žeton | spremenljivka CSS | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | dvig VCard [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | privzeto polje (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Okvir (ovojnica obrobe urejevalnika) {#frame-editor-border-wrapper}

| žeton | spremenljivka CSS | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, brez zgornjega roba | polna obroba |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Pri ploski obliki orodne vrstice okvir pobarva tudi razliko po straneh (zgornji rob in spodnji rob pri 1,6-kratni prosojnosti obrobe). Ta razlika pripada obliki, ne žetonu: ni dosegljiva z žetonom.

### Slike in ročice za spreminjanje velikosti {#images-and-resize-handles}

| žeton | spremenljivka CSS | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (izbrano) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (ob lebdenju) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Orodna vrstica slike sledi zastavici `buttons`: pri tihi obliki dobi tiho površino — njena razmika 2px/4px bere `--tf-bubble-gap` / `--tf-bubble-padding` z nadomestnimi vrednostmi menija slike; namenskega žetona orodne vrstice slike ni.

### Ni v katalogu (področje zasilnega izhoda) {#not-in-the-catalog-escape-hatch-territory}

Nekatere mere, omenjene v pregledu zasnove, v v1 nimajo žetona v katalogu: **višina orodne vrstice, širina okvirja, polmer okvirja, širina gumba, odmik gumba, širina pogovornega okna**. Zgornje tabele kataloga so pogodba; za te slikovne pike odprite [zasilni izhod](#escape-hatch-the-root-class) in neposredno oblikujte stabilne razrede.

## Dosegljivost {#reachability}

Pogodba, navedena enkrat in upoštevana v vsaki zgornji skupini:

> Žeton pobarva površino samo, kadar jo oblika aktivira; izvorni vizualni elementi Vuetify se oblikujejo prek barv teme Vuetify.

Po skupinah:

- **Orodna vrstica, okvir, okvir slike/ročice** — aktivni v vsaki obliki; žetoni jih pobarvajo, celice classic so izvorni videz, na katerega se žetoni zanesejo.
- **Polje skupin** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — pri `groups: 'box'` je odsek VBtnGroup (struktura 0.3.2: gumbi se združijo, polje nosi dvig); pravila polja ga pobarvajo z žetoni skupine, `--tf-group-height` pa z `!important` ohranja pogodbo 32px (pravilo gostote Vuetify se bori proti njej, kot v 0.3.2). Pri `groups: 'flat'` so odseki navadne vrste div (prosojni, brez sence, polmer 0 je osnova oblike).
- **Tanke ločilne črte** (`dividerWidth/Height/Color`) — vidna tanka črta je možnost oblike `groups: 'flat'`; v obliki polja je ločilo distančnik ničelne velikosti (`margin: 0 4px` iz osnovnega pravila).
- **Odmiki/razmiki elementov** — kompaktna vrsta `6px 8px` je pogojena z ploščato vrstico (`toolbar: 'flat'`), razmiki skupin z ploščatimi odseki (`groups: 'flat'`); dvignjena vrstica ohrani klasične mere.
- **Gumbi** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — neaktivni pri `buttons: 'vuetify'`: izvorni gumbi Vuetify sami pobarvajo svoja stanja. Oblikujte jih z barvami teme Vuetify (`primary`, `surface`, …) — klasične oblike jih namerno podedujejo.
- **Mere elementov menija** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — neaktivne pri `menu: 'vuetify'`; Vuetify je lastnik teh slikovnih pik elementov. Polje **seznama** menija (polmer/senca/odmik) je v obeh oblikah pobarvano s preobleko (glejte [opombo o meniju](#menu-classic-note)).
- **Mehek okvir pogovornega okna** (`dialogActionBtn*`, `dialogFieldRadius`, mehki odmiki, manjkajoča ločilna črta) — pobarvan pri `dialog: 'soft'`; pri `dialog: 'classic'` je pogovorno okno VCard s klasičnimi odmiki.
- **Okvir mehurčka** — meniji za izbor, prazno vrstico in sliko so v obeh oblikah ena vrstica gumbov z ikonami, pobarvana z žetoni mehurčka; `bubble` ne spreminja več njihovega označevanja.

Prepis, enak osnovi kataloga, se **ne odda** — pri neklasični obliki lastna osnova oblike pobarva prek nadomestne vrednosti CSS, zato »obnovitev« klasične vrednosti (npr. nastavitev `buttonActiveBg` nazaj na `rgb(var(--v-theme-primary))` pri `buttons: 'quiet'`) tiho ne naredi nič. Če želite pri neklasični obliki vsiliti vrednost v klasičnem videzu, nastavite prepis, ki se razlikuje od osnove kataloga — enakovreden dobesedni zapis, kot je `rgba(var(--v-theme-primary), 1)`, pobarva enako in preživi preskok.

Žetoni namerno niso povezani z izvornimi potmi — to ohranja `default` pikslovno enak klasičnemu videzu, medtem ko se vse usmerja prek kataloga.

## Recepti {#recipes}

### Razširitev preobleke pastel {#extend-pastel}

Podedujte tiho obliko in prebarvajte nekaj površin. Registrirana imena delujejo na vsakem urejevalniku:

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

Oblika (ploska/tiha/mehka) prihaja iz preobleke pastel; nedotaknjeni žetoni ohranijo vrednosti preobleke pastel — tiha podlaga gumbov ostane nevtralna, premakne se samo to, kar prepišete. To je preobleka, živo izrisana na [strani s primeri](/sl/examples/skins#custom-mint).

### Razširitev preobleke default {#extend-default}

Ohranite klasično strukturo, prilagodite barve:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` je implicitni koren, zato ključ lahko izpustite: tudi `{ toolbar: 'flat', … }` izhaja iz klasične.

### Povsem po meri {#full-custom}

Brez `extends`, brez registracije: objekt podajte lastnosti `skin` in prosto nastavite zastavice oblike ter žetone. `name` na korenski razred postavi vašo oznako (glejte spodaj); brez njega je to `tiptapify-skin-inline`.

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

`defineSkin` je pomožna identitetna funkcija za tipizirane konstantne definicije (ne vstopi v noben register). Zastavice oblike lahko nastavljate posamično — vsaka zastavica, ki jo izpustite, ostane klasična.

## Zasilni izhod: korenski razred {#escape-hatch-the-root-class}

Vsak koren urejevalnika nosi `tiptapify-skin-{name}` (`tiptapify-skin-inline` za vrstični objekt brez imena). Knjižnica **nikoli ne veže nobenega pravila na ime preobleke** — razred je vaš:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Stabilne kljuke, na katere pišete:

| razred | kje |
|---|---|
| `tiptapify-skin-{name}` | koren urejevalnika |
| `tiptapify-shape-{flag}-{value}` ×6 | koren urejevalnika — razrešena oblika |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | orodna vrstica in njeni odseki |
| `tiptapify-quiet-buttons` | korena orodne vrstice in mehurčka pri `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | vrstica vsakega menija z mehurčkom in tanka črta med njegovimi skupinami |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | vrstice menijev za izbor, prazno vrstico in sliko |
| `tiptapify-btn--active` | pritisnjen gumb menija z mehurčkom (aktivna oznaka, plavanje slike) |
| `tiptapify-menu` · `tiptapify-menu--soft` | vsebina prekrivnega spustnega menija, nosilec mehkih pravil menija |
| `tiptapify-skin-scope` | div z obsegom žetonov znotraj teleportiranih menijev |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | kartica pogovornega okna in njen mehki nosilec |
| `tiptapify-frame` | ovojnica obrobe urejevalnika |

**Obramba pred temami uporabnika.** Plast preobleke je zgrajena tako, da preživi administrativne teme, ki odmikajo in prebarvajo notranjost Vuetify: pravila so pogojena z razredi oblike/nosilca, za specifičnost uporabljajo podvojene razrede (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) in `!important` ohranijo samo tam, kjer se je v osnovni potrditvi primer administrativne teme izkazal za nujnega (obrambni nabor menu.css). Konvencije, ki vaše lastne prepise ohranjajo delujoče na istem bojišču:

- svoj CSS zamejite pod `.tiptapify-skin-{name}` (ali razred oblike) — nikoli na gole notranjosti Vuetify;
- za mere iz kataloga raje uporabite žetone (`--tf-*`), za ostalo razrede;
- pri prepisovanju komponent Vuetify posnemajte podvajanje (en sam `.v-list-item` izgubi proti pravilom preobleke).

## Vizualna pogodba (opomba za sodelavce) {#visual-contract-contributor-note}

Izračunani slogi vgrajenih preoblek so zaklenjeni z osnovno datoteko `src/skins/__fixtures__/skin-baseline.json` (13 odsekov × svetlo/temno): plast CSS je končana, ko se izmerjena matrika z njo ujema. Opombe za branje datoteke:

- Mer za lebdenje/aktivno stanje s strani ni mogoče vsiliti, zato snemanje prebere **besedilo deklaracije prvega zadetka pravila CSSOM** za vsak izbirnik lebdenja in ga razreši prek preizkusnega elementa znotraj korena preobleke (polje `resolved`) — to je pogodba zmagovalnega pravila, ne živi posnetek `:hover`.
- `_meta.selectors.menu` beleži besedilo izbirnika pred `SkinScope`. Datoteka je zamrznjena (normativne vrednosti), zato je polje namenoma zastarelo; snemalni sveženj zaklene trenutni izbirnik.
- Datoteka nosi svoje odobrene spremembe v `_meta.notes`: obnovitev označevanja VBtnGroup pri `groups: 'box'` z dne 2026-10-18 je znova izmerila polja otroških gumbov `groupBtn`/`buttonsActive` pri classic (združeni vogali, polje je lastnik dviga). Polja pastel so nedotaknjena — namerna vizualna sprememba posodobi samo prizadete celice classic, zabeleži opombo in prinese vrstico v CHANGELOG.

## Glejte tudi {#see-also}

- [Primeri preoblek](/sl/examples/skins) — classic, pastel in preobleka mint po meri, v živo.
- [lastnost `skin`](/sl/api/props#skin) · [tipi preoblek](/sl/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/sl/api/types#tiptapifyskininput).
