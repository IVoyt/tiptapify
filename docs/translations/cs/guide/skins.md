# Skiny {#skins}

**Skin** je jeden vzhled okolí editoru: panelu nástrojů, tlačítek a skupin v něm, bublinových nabídek, rozbalovacích nabídek, dialogů, rámečku kolem obsahu a výběru obrázku. Vybírá se pomocí prop `skin`:

```vue
<Tiptapify skin="pastel" />
```

Skin tvoří dvě věci: **tokeny** (barvy a rozměry jako proměnné CSS) a **tvar** (strukturní varianty, které token nevyjádří). Dva vestavěné skiny jsou `default` — klasický vzhled, zvýšený panel nástrojů se zvýšenými skupinami tlačítek — a `pastel`, klidný vzhled. Vlastní skiny jsou plnohodnotné: `registerSkin()` a inline objekty skinů se zpracovávají naprosto stejným mechanismem a vestavěné skiny jsou registrované skiny, ne zvláštní případy.

## Terminologie: skin vs. motiv Vuetify {#terminology-skin-vs-vuetify-theme}

- **skin** — uživatelský pojem pro jeden vzhled okolí editoru: tokeny + tvar. Prop se jmenuje `skin`, typy `TiptapifySkin*`, registr `registerSkin()`, kořenová třída `tiptapify-skin-{name}`.
- **motiv (theme)** — vyhrazeno pro světlé/tmavé motivy Vuetify. Komponenty Tiptapify mají své props `theme` napájené aktuálním názvem motivu Vuetify; systém skinů se jich nikdy nedotýká.

Vzájemně se doplňují: většina vestavěných barev tokenů odkazuje na proměnné motivu Vuetify (`rgb(var(--v-theme-surface))`, …), takže skiny automaticky následují světlý/tmavý režim. Pevně tmavé buňky ve sloupci classic — úchyt pro změnu velikosti (`rgba(0, 0, 0, .5/.8)`), prostý obrys obrázku, stín bubliny a stíny elevace nabídek/dialogů — jsou záměrné: klasický vzhled kreslí neutrální tmavé okolí v obou motivech a naměřený základ je pevně určuje. Vlastní skin může na proměnné motivu odkazovat libovolně — viz tabulka tokenů.

## Koncept {#concept}

### Tokeny {#tokens}

Token je vlastní CSS vlastnost s názvem `--tf-*`. Klíč v katalogu je camelCase přípony CSS: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Hodnoty jsou obyčejné řetězce — barvy, úplné zkrácené zápisy ohraničení, stíny, odsazení, poloměry.

Každé pravidlo skinu v knihovně existuje **jednou** a čte svůj token s náhradní hodnotou rovnou klasické (základní) hodnotě:

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Vyhodnocený skin vypisuje jako proměnné jen svá **přepsání**; základ nesou náhradní hodnoty CSS. Proměnné se zapisují na kořen editoru — a protože se nabídky a dialogy z něj teleportují, také na obalový prvek `SkinScope` každé nabídky a na samotnou kartu dialogu, takže tokeny následují každou plochu.

### Tvar {#shape}

Šest příznaků určuje, které sady pravidel se použijí; tokeny je vybarvují:

| příznak | hodnoty | co přepíná |
|---|---|---|
| `toolbar` | `raised` · `flat` | elevace VToolbar + bez vnitřní tenké linky vs. plochý tónovaný panel |
| `groups` | `box` · `flat` | sekce panelu nástrojů jako vyvýšené boxy **VBtnGroup** (markup z 0.3.2: spojená tlačítka, tokeny skupiny vybarvují box) vs. obyčejné řady div s flexem |
| `buttons` | `vuetify` · `quiet` | nativní tlačítka Vuetify vs. průhledná tlačítka s neutrálním stavem při stisku |
| `bubble` | `card` · `flat` | ponecháno kvůli kompatibilitě: bublinové nabídky jsou v obou tvarech jedna řada ikonových tlačítek vybarvená tokeny (jejich tlačítka následují `buttons`) |
| `dialog` | `classic` · `soft` | dělicí linka pod titulkem, vyvýšené zavření vs. jemná karta, textové zavření |
| `menu` | `vuetify` · `soft` | rozbalovací nabídky: seznam Vuetify vs. světlá karta s odsazením |

Vyhodnocený tvar je zakódován na kořeni editoru jako šest tříd `.tiptapify-shape-{flag}-{value}` a pro vlastní komponenty panelu nástrojů zpřístupněn jako `shape: ComputedRef<ResolvedShape>` v [`useTiptapifyConfig()`](/cs/api/types#usetiptapifyconfig).

### Extends {#extends}

Skin se vyhodnocuje nad klasickým základem, poté jeho řetězec `extends` od kořene a nakonec jeho vlastní členy:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Chybějící články se vyhodnotí na dosud nashromážděný řetězec (s varováním ve vývoji); cyklus se vyhodnotí na classic (s varováním ve vývoji). Registrovaný skin se odkazuje názvem; inline objekt skinu může `extends` registrovaný název a nikdy nevstoupí do globálního registru — vlastní skiny se mezi editory nikdy nepřelévají. Neznámé klíče tokenů se ignorují s varováním ve vývoji.

Živé ukázky všech tří forem jsou na [stránce příkladů skinů](/cs/examples/skins).

## Katalog tokenů {#token-catalog}

Tabulky níže jsou **kontrakt v1**: klíče katalogu (`TiptapifySkinColors` / `TiptapifySkinMetrics`) jsou názvy, které můžete nastavit. Buňky classic jsou náhradní hodnoty CSS — hodnota, kterou základní pravidla vykreslí, když token žádný skin nepřepíše.

### Panel nástrojů / lišta {#toolbar-bar}

| token | proměnná CSS | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Položky / skupiny / dělicí čáry {#items-groups-dividers}

| token | proměnná CSS | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | elevace Vuetify 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (rozpěrka: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Naměřená buňka classic je `normal` — nativní hodnota flexu ve Vuetify, kterou nese náhradní hodnota CSS. Základní hodnota katalogu `0px` je ekvivalentní explicitní délka pro přepsání skinů.

<a id="shadow-cells"></a>² Buňky s textem „elevace Vuetify *n*“ jsou popisné: přesný řetězec trojitého stínu je naměřená hodnota v odevzdané základní fixture (`src/skins/__fixtures__/skin-baseline.json`) a je náhradní hodnotou CSS. Pro `groupShadow` je to **elevace 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — při `groups: 'box'` je sekce VBtnGroup (`elevation="4"`) a pravidlo tokenu vybarvuje box touto trojicí nad vlastní elevací skupiny: box vlastní elevaci, spojená podřízená tlačítka žádnou nenesou.

### Tlačítka {#buttons}

Tyto tokeny se používají **pouze při `buttons: 'quiet'`** — viz [Dosažitelnost](#reachability).

| token | proměnná CSS | hodnota quiet (classic: nativní Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Bublinové nabídky (výběr, prázdný řádek, obrázek) {#bubble-menus-selection-empty-line-image}

| token | proměnná CSS | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | stejné |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | stejné |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | stejné |

### Rozbalovací nabídky {#dropdown-menus}

| token | proměnná CSS | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | elevace Vuetify 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Box **seznamu** (poloměr, stín, odsazení seznamu) klasické nabídky je dnes pravidlem skinu — obalový prvek tokenů `SkinScope` stojí mezi vlastním pravidlem potomka ve Vuetify a seznamem, takže knihovna tyto pixely obnovuje jako pravidla skinu čtoucí výše uvedené tokeny. Pixely **položek** zůstávají nativní Vuetify (fixture na nich měří výchozí hodnoty Vuetify): čtyři tokeny položek jsou při `menu: 'vuetify'` neúčinné.

### Dialogy {#dialogs}

| token | proměnná CSS | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | elevace VCard [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | výchozí pole (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Rámeček (obal s ohraničením editoru) {#frame-editor-border-wrapper}

| token | proměnná CSS | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, bez horní hrany | plné ohraničení |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

U plochého tvaru panelu nástrojů rámeček kreslí také rozdíl pro jednotlivé strany (horní hranu a spodní hranu s 1,6× průhledností ohraničení). Tento rozdíl patří k tvaru, ne k tokenu: pomocí tokenu ho nelze ovlivnit.

### Obrázky a úchyty pro změnu velikosti {#images-and-resize-handles}

| token | proměnná CSS | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (vybraný) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (při najetí) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Panel nástrojů obrázku následuje příznak `buttons`: při tvaru quiet dostane quiet plochu — jeho odsazení 2px/4px čte `--tf-bubble-gap` / `--tf-bubble-padding` s náhradními hodnotami nabídky obrázku; žádný vyhrazený token panelu nástrojů obrázku neexistuje.

### Není v katalogu (území nouzového řešení) {#not-in-the-catalog-escape-hatch-territory}

Některé rozměry zmíněné v přehledu návrhu nemají ve v1 token v katalogu: **výška panelu nástrojů, šířka rámečku, poloměr rámečku, šířka tlačítka, odsazení tlačítka, šířka dialogu**. Závazné jsou výše uvedené tabulky katalogu; pro tyto pixely použijte [nouzové řešení](#escape-hatch-the-root-class) a stylujte stabilní třídy přímo.

## Dosažitelnost {#reachability}

Kontrakt, uvedený jednou a dodržovaný každou skupinou výše:

> Token vybarví plochu jen tehdy, když ji tvar aktivuje; nativní vizuály Vuetify se stylují barvami motivu Vuetify.

Podle skupin:

- **Panel nástrojů, rámeček, okolí obrázku/úchytů** — aktivní v každém tvaru; tokeny je vybarvují, buňky classic jsou nativní vzhled, na který se tokeny vracejí.
- **Box skupin** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — při `groups: 'box'` je sekce VBtnGroup (struktura z 0.3.2: tlačítka se spojí, box nese elevaci); pravidla boxu ho vybarvují tokeny skupiny a `--tf-group-height` drží kontrakt 32px s `!important` (pravidlo hustoty Vuetify s ním bojuje, stejně jako v 0.3.2). Při `groups: 'flat'` jsou sekce obyčejné řady div (průhledné, bez stínu, poloměr 0 je základ tvaru).
- **Tenké dělicí linky** (`dividerWidth/Height/Color`) — viditelná tenká linka je vlastnost `groups: 'flat'`; v tvaru box je dělič rozpěrka nulové velikosti (`margin: 0 4px` ze základního pravidla).
- **Odsazení a mezery položek** — kompaktní řada `6px 8px` je vázána na plochou lištu (`toolbar: 'flat'`), mezery skupin na ploché sekce (`groups: 'flat'`); vyvýšená lišta si ponechává klasické metriky.
- **Tlačítka** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — neúčinná při `buttons: 'vuetify'`: nativní tlačítka Vuetify kreslí své stavy sama. Stylujte je barvami motivu Vuetify (`primary`, `surface`, …) — klasické tvary je záměrně dědí.
- **Metriky položek nabídky** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — neúčinné při `menu: 'vuetify'`; tyto pixely položek vlastní Vuetify. Box **seznamu** nabídky (poloměr/stín/odsazení) kreslí skin v obou tvarech (viz [poznámka k nabídce](#menu-classic-note)).
- **Měkké okolí dialogu** (`dialogActionBtn*`, `dialogFieldRadius`, měkká odsazení, chybějící dělicí linka) — vykresluje se při `dialog: 'soft'`; při `dialog: 'classic'` je dialog VCard s klasickým odsazením.
- **Okolí bublin** — nabídky výběru, prázdného řádku a obrázku jsou v obou tvarech jedna řada ikonových tlačítek vybarvená tokeny bubliny; `bubble` už jejich markup nemění.

Přepsání rovné základu katalogu se **nevypisuje** — u jiného tvaru než classic kreslí základ vlastního tvaru náhradní hodnota CSS, takže „obnovení“ klasické hodnoty (např. nastavení `buttonActiveBg` zpět na `rgb(var(--v-theme-primary))` při `buttons: 'quiet'`) tiše nic neudělá. Chcete-li při jiném tvaru než classic vynutit klasicky vypadající hodnotu, nastavte přepsání, které se od základu katalogu liší — ekvivalentní literál jako `rgba(var(--v-theme-primary), 1)` se vykreslí stejně a přeskočení přežije.

Tokeny záměrně nejsou zapojeny do nativních cest — právě to udržuje `default` pixelově shodný s klasickým vzhledem, zatímco vše prochází katalogem.

## Návody {#recipes}

### Rozšíření pastelu {#extend-pastel}

Zdědíte klidný tvar a přebarvíte několik ploch. Registrované názvy fungují v kterémkoli editoru:

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

Tvar (flat/quiet/soft) pochází z pastelu; nedotčené tokeny si zachovávají hodnoty pastelu — klidný nádech tlačítek zůstává neutrální, hýbe se jen to, co přepíšete. Tento skin je živě vykreslen na [stránce příkladů](/cs/examples/skins#custom-mint).

### Rozšíření default {#extend-default}

Ponechte klasickou strukturu a upravte barvy:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` je implicitní kořen, takže klíč lze vynechat: `{ toolbar: 'flat', … }` také začíná z classic.

### Zcela vlastní {#full-custom}

Bez `extends`, bez registrace: předejte objekt do prop `skin` a libovolně nastavte příznaky tvaru a tokeny. Díky `name` dáte kořenové třídě vlastní označení (viz níže); bez něj je to `tiptapify-skin-inline`.

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

`defineSkin` je pomocná identitní funkce pro typované konstantní definice (do žádného registru nevstupuje). Příznaky tvaru lze nastavit jednotlivě — každý vynechaný příznak zůstává classic.

## Nouzové řešení: kořenová třída {#escape-hatch-the-root-class}

Každý kořen editoru nese `tiptapify-skin-{name}` (`tiptapify-skin-inline` pro inline objekt bez názvu). Knihovna **nikdy neváže žádné pravidlo na název skinu** — třída je vaše:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Stabilní háčky, na které můžete psát pravidla:

| třída | kde |
|---|---|
| `tiptapify-skin-{name}` | kořen editoru |
| `tiptapify-shape-{flag}-{value}` ×6 | kořen editoru — vyhodnocený tvar |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | panel nástrojů a jeho sekce |
| `tiptapify-quiet-buttons` | kořeny panelu nástrojů a bublin při `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | řada každé bublinové nabídky a tenká linka mezi jejími skupinami |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | řady nabídek výběru, prázdného řádku a obrázku |
| `tiptapify-btn--active` | stisknuté tlačítko bublinové nabídky (aktivní značka, obtékání obrázku) |
| `tiptapify-menu` · `tiptapify-menu--soft` | obsah překryvu rozbalovací nabídky, nositel pravidel měkké nabídky |
| `tiptapify-skin-scope` | div s rozsahem tokenů uvnitř teleportovaných nabídek |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | karta dialogu a její nositel měkkého vzhledu |
| `tiptapify-frame` | obal s ohraničením editoru |

**Ochrana před motivy spotřebitele.** Vrstva skinů je postavena tak, aby přežila administrátorské motivy, které přidávají odsazení a přebarvují vnitřky Vuetify: pravidla se vážou na třídy tvaru/nositele, pro specificitu používají zdvojené třídy (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) a `!important` ponechávají jen tam, kde se to v případě administrátorského motivu základního commitu ukázalo jako nutné (sada ochran v menu.css). Zásady, které udrží vaše vlastní přepsání funkční na stejném bojišti:

- své CSS vymezte pod `.tiptapify-skin-{name}` (nebo třídu tvaru) — nikdy na holé vnitřky Vuetify;
- pro rozměry z katalogu dávejte přednost tokenům (`--tf-*`), pro zbytek třídám;
- při přepisování komponent Vuetify zachovejte zdvojení (samotné `.v-list-item` prohraje s pravidly skinu).

## Vizuální kontrakt (poznámka pro přispěvatele) {#visual-contract-contributor-note}

Vypočtené styly vestavěných skinů pevně určuje základní fixture `src/skins/__fixtures__/skin-baseline.json` (13 sekcí × světlý/tmavý): vrstva CSS je hotová, když s ní naměřená matice souhlasí. Poznámky ke čtení fixture:

- Rozměry při najetí/aktivaci nelze ze stránky vynutit, proto záznam čte **text deklarace pravidla CSSOM, které vyhovělo jako první**, pro každý selektor najetí a vyhodnotí ho přes sondovací prvek uvnitř kořene skinu (pole `resolved`) — je to kontrakt vítězného pravidla, ne živý snímek `:hover`.
- `_meta.selectors.menu` zaznamenává text selektoru před zavedením `SkinScope`. Fixture je zmrazená (normativní hodnoty), takže je pole záměrně zastaralé; záznamový balíček pevně určuje aktuální selektor.
- Fixture nese své schválené změny v `_meta.notes`: obnovení markupu VBtnGroup při `groups: 'box'` ze dne 2026-10-18 znovu změřilo pole podřízených tlačítek classic `groupBtn`/`buttonsActive` (spojené rohy, elevaci vlastní box). Pole pastelu jsou nedotčena — záměrná vizuální změna aktualizuje jen dotčené buňky classic, zaznamená poznámku a přidá řádek do CHANGELOGu.

## Viz také {#see-also}

- [Příklady skinů](/cs/examples/skins) — classic, pastel a vlastní skin mint, živě.
- [Prop `skin`](/cs/api/props#skin) · [typy skinů](/cs/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/cs/api/types#tiptapifyskininput).
