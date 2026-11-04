# Skins {#skins}

Een **skin** is één uiterlijk van de editor-chrome: de toolbar, de knoppen en groepen erin, de bubbelmenu's, de dropdownmenu's, de dialogen, het kader rond de inhoud en de selectiechrome van afbeeldingen. De prop `skin` selecteert hem:

```vue
<Tiptapify skin="pastel" />
```

Een skin bestaat uit twee dingen: **tokens** (kleuren en maten als CSS-variabelen) en **vorm** (structurele varianten die een token niet kan uitdrukken). De twee ingebouwde skins zijn `default` — de klassieke look, een verhoogde werkbalk met verhoogde knopgroepen — en `pastel`, de rustige look. Eigen skins zijn volwaardig: `registerSkin()` en inline skin-objecten worden via exact hetzelfde mechanisme afgehandeld, en de ingebouwde skins zijn geregistreerde skins, geen speciale gevallen.

## Terminologie: skin versus Vuetify-thema {#terminology-skin-vs-vuetify-theme}

- **skin** — de term voor gebruikers voor één uiterlijk van de editor-chrome: tokens + shape. De prop is `skin`, de types zijn `TiptapifySkin*`, het register is `registerSkin()`, de rootklasse is `tiptapify-skin-{name}`.
- **thema** — gereserveerd voor de lichte/donkere thema's van Vuetify. Tiptapify-componenten laten hun `theme`-props voeden vanuit de huidige themanaam van Vuetify; het skinsysteem raakt ze nooit aan.

Ze werken samen: de meeste kleurtokens van de ingebouwde skins verwijzen naar Vuetify-themavariabelen (`rgb(var(--v-theme-surface))`, …), zodat de skins automatisch licht/donker volgen. De vaste donkere cellen in de kolom classic — de formaatgreep (`rgba(0, 0, 0, .5/.8)`), de gewone afbeeldingsrand, de bubbelschaduw en de elevatieschaduwen van menu's/dialogen — zijn bewust: de klassieke look tekent neutrale donkere chrome in beide thema's, en de gemeten basislijn legt ze vast. Een eigen skin mag vrij naar themavariabelen verwijzen — zie de tokentabel.

## Concept {#concept}

### Tokens {#tokens}

Een token is een CSS custom property met de naam `--tf-*`. De catalogussleutel is de camelCase van het CSS-achtervoegsel: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Waarden zijn gewone strings — kleuren, volledige border-shorthands, schaduwen, paddings, radii.

Elke skinregel in de bibliotheek bestaat **één keer** en leest zijn token met een fallback gelijk aan de klassieke (basis)waarde:

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Een opgeloste skin geeft alleen zijn **overschrijvingen** als variabelen uit; de CSS-fallbacks dragen de basis. De variabelen komen op de root van de editor terecht — en, omdat menu's en dialogen eruit teleporteren, op de `SkinScope`-wrapper van elk menu en op de dialoogkaart zelf, zodat de tokens elk oppervlak volgen.

### Shape {#shape}

Zes vlaggen bepalen welke regelsets van toepassing zijn; de tokens kleuren ze:

| vlag | waarden | wat hij schakelt |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbar-elevatie + geen innerlijke haarlijn versus vlakke getinte balk |
| `groups` | `box` · `flat` | toolbarsecties als verhoogde **VBtnGroup**-vlakken (markup van 0.3.2: aaneengesloten knoppen, de groeptokens kleuren het vlak) versus gewone flex-div-reeksen |
| `buttons` | `vuetify` · `quiet` | native Vuetify-knoppen versus ghost-knoppen met een neutrale ingedrukte staat |
| `bubble` | `card` · `flat` | behouden voor compatibiliteit: de bubbelmenu's zijn in beide shapes één door tokens gekleurde rij pictogramknoppen (hun knoppen volgen `buttons`) |
| `dialog` | `classic` · `soft` | scheidingslijn onder de titel, verhoogde sluitknop versus zachte kaart, tekstuele sluitknop |
| `menu` | `vuetify` · `soft` | dropdownmenu's: Vuetify-lijst versus de lichte kaart met padding |

De opgeloste shape wordt op de root van de editor gecodeerd als zes klassen `.tiptapify-shape-{flag}-{value}` en beschikbaar gesteld als `shape: ComputedRef<ResolvedShape>` op [`useTiptapifyConfig()`](/nl/api/types#usetiptapifyconfig) voor aangepaste toolbarcomponenten.

### Extends {#extends}

Een skin wordt opgelost over de klassieke basis, daarna over zijn `extends`-keten van wortel af, en dan over zijn eigen leden:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Ontbrekende schakels worden opgelost naar de opgebouwde keten (met een dev-waarschuwing); een cyclus wordt opgelost naar classic (met een dev-waarschuwing). Een geregistreerde skin wordt op naam aangeroepen; een inline skinobject mag een geregistreerde naam `extends` en komt nooit in het globale register — eigen skins lekken nooit tussen editors. Onbekende tokensleutels worden genegeerd met een dev-waarschuwing.

Live demo's van alle drie de vormen staan op de [pagina met skinvoorbeelden](/nl/examples/skins).

## Tokencatalogus {#token-catalog}

De onderstaande tabellen zijn het **v1-contract**: de catalogussleutels (`TiptapifySkinColors` / `TiptapifySkinMetrics`) zijn de namen die je kunt instellen. De cellen van classic zijn de CSS-fallbacks — de waarde die de basisregels tekenen wanneer geen skin het token overschrijft.

### Toolbar / balk {#toolbar-bar}

| token | CSS-variabele | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Items / groepen / scheidingslijnen {#items-groups-dividers}

| token | CSS-variabele | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify-elevatie 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (spacer: marge `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ De gemeten klassieke cel is `normal` — de native flexwaarde van Vuetify, wat de CSS-fallback draagt. De basiswaarde `0px` uit de catalogus is de gelijkwaardige expliciete lengte voor skinoverschrijvingen.

<a id="shadow-cells"></a>² Cellen met "Vuetify-elevatie *n*" zijn beschrijvend: de exacte drievoudige schaduwstring is de gemeten waarde in de vastgelegde baseline-fixture (`src/skins/__fixtures__/skin-baseline.json`) en is de CSS-fallback. Voor `groupShadow` is dat **elevatie 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — onder `groups: 'box'` is de sectie een VBtnGroup (`elevation="4"`), en de tokenregel kleurt het vlak met dit drietal over de eigen elevatie van de groep: het vlak bezit de elevatie, de aaneengesloten kindknoppen hebben er geen.

### Knoppen {#buttons}

Deze tokens worden **alleen gebruikt onder `buttons: 'quiet'`** — zie [Bereikbaarheid](#reachability).

| token | CSS-variabele | quiet-waarde (classic: native Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Bubbelmenu's (selectie, lege regel, afbeelding) {#bubble-menus-selection-empty-line-image}

| token | CSS-variabele | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | idem |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | idem |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | idem |

### Dropdownmenu's {#dropdown-menus}

| token | CSS-variabele | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify-elevatie 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ De **lijst**box (radius, schaduw, lijstpadding) van het klassieke menu is nu een skinregel — de tokenwrapper `SkinScope` zit tussen de eigen kindregel van Vuetify en de lijst, dus de bibliotheek herstelt die pixels als skinregels die de bovenstaande tokens lezen. De **item**pixels blijven native Vuetify (de fixture meet daar de Vuetify-standaardwaarden): de vier itemtokens doen niets zolang `menu: 'vuetify'`.

### Dialogen {#dialogs}

| token | CSS-variabele | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard-elevatie [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | standaard van het veld (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Frame (randwrapper van de editor) {#frame-editor-border-wrapper}

| token | CSS-variabele | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, geen bovenrand | volledige rand |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Onder de vlakke toolbar-shape tekent het frame ook een delta per zijde (een bovenrand, en de onderrand met 1,6× randdekking). Die delta hoort bij de shape, niet bij een token: hij is niet via tokens bereikbaar.

### Afbeeldingen en formaatgrepen {#images-and-resize-handles}

| token | CSS-variabele | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (geselecteerd) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (hover) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

De afbeeldingstoolbar volgt de vlag `buttons`: onder de quiet-shape krijgt hij het quiet-oppervlak — zijn spatiëring van 2px/4px leest `--tf-bubble-gap` / `--tf-bubble-padding` met de fallbacks van het afbeeldingsmenu; er is geen eigen token voor de afbeeldingstoolbar.

### Niet in de catalogus (nooduitgangsgebied) {#not-in-the-catalog-escape-hatch-territory}

Sommige afmetingen die in het ontwerpoverzicht worden genoemd, hebben in v1 geen catalogustoken: **toolbarhoogte, framebreedte, frameradius, knopbreedte, knoppadding, dialoogbreedte**. De catalogustabellen hierboven zijn het contract; open voor deze pixels de [nooduitgang](#escape-hatch-the-root-class) en stijl de stabiele klassen rechtstreeks.

## Bereikbaarheid {#reachability}

Het contract, eenmaal vastgelegd en nageleefd door elke groep hierboven:

> Een token kleurt een oppervlak alleen wanneer de shape dat oppervlak activeert; native Vuetify-visuals worden gestileerd via Vuetify-themakleuren.

Per groep:

- **Toolbar, frame, afbeeldings-/greepchrome** — actief in elke shape; de tokens kleuren ze, de classic-cellen zijn de native look waarop de tokens terugvallen.
- **Groepsvlak** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — onder `groups: 'box'` is de sectie een VBtnGroup (structuur van 0.3.2: de knoppen sluiten aaneen, het vlak draagt de elevatie); de vlakregels kleuren het met de groeptokens, en `--tf-group-height` houdt het contract van 32px vast met een `!important` (de dichtheidsregel van Vuetify vecht ertegen, zoals in 0.3.2). Onder `groups: 'flat'` zijn de secties gewone div-reeksen (transparant, zonder schaduw, radius 0 is de basis van de shape).
- **Haarlijnen van scheidingslijnen** (`dividerWidth/Height/Color`) — de zichtbare haarlijn is een voorziening van `groups: 'flat'`; in de box-shape is de scheidingslijn een spacer van nul grootte (`margin: 0 4px` uit de basisregel).
- **Itempadding/-tussenruimtes** — de compacte reeks `6px 8px` hangt aan de vlakke balk (`toolbar: 'flat'`), de groepstussenruimtes aan de vlakke secties (`groups: 'flat'`); de verhoogde balk behoudt de klassieke maten.
- **Knoppen** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — werkingloos onder `buttons: 'vuetify'`: de native Vuetify-knoppen tekenen hun eigen staten. Stijl ze met Vuetify-themakleuren (`primary`, `surface`, …) — de klassieke shapes erven die bewust.
- **Menu-itemmaten** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — werkingloos onder `menu: 'vuetify'`; Vuetify bezit die itempixels. Het menu-**lijst**vlak (radius/schaduw/padding) wordt in beide shapes door de skin getekend (zie de [menunotitie](#menu-classic-note)).
- **Zachte dialoogchrome** (`dialogActionBtn*`, `dialogFieldRadius`, de zachte paddings, de ontbrekende scheidingslijn) — getekend onder `dialog: 'soft'`; onder `dialog: 'classic'` is de dialoog een VCard met de klassieke paddings.
- **Bubbelchrome** — de selectie-, lege-regel- en afbeeldingsmenu's zijn in beide shapes één rij pictogramknoppen, getekend door de bubbeltokens; `bubble` verandert hun markup niet meer.

Een overschrijving gelijk aan de catalogusbasis wordt **niet uitgegeven** — onder een niet-klassieke shape tekent de eigen basis van de shape via de CSS-fallback, dus een klassieke waarde "herstellen" (bijv. `buttonActiveBg` terugzetten naar `rgb(var(--v-theme-primary))` onder `buttons: 'quiet'`) doet stilzwijgend niets. Om een klassiek ogende waarde onder een niet-klassieke shape af te dwingen, stel je een overschrijving in die van de catalogusbasis verschilt — een gelijkwaardige letterlijke waarde zoals `rgba(var(--v-theme-primary), 1)` tekent identiek en overleeft de overslag.

Tokens worden bewust niet in native paden gekoppeld — dat houdt `default` pixel-identiek aan de klassieke look terwijl alles via de catalogus loopt.

## Recepten {#recipes}

### Pastel uitbreiden {#extend-pastel}

Erf de quiet-shape en kleur een paar oppervlakken opnieuw. Geregistreerde namen werken op elke editor:

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

De shape (flat/quiet/soft) komt van pastel; onaangeroerde tokens behouden de waarden van pastel — de quiet-knopwassing blijft neutraal, alleen wat je overschrijft verandert. Dit is de skin die live wordt getoond op de [voorbeeldpagina](/nl/examples/skins#custom-mint).

### Default uitbreiden {#extend-default}

Behoud de klassieke structuur, stem de kleuren af:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` is de impliciete wortel, dus de sleutel kan worden weggelaten: `{ toolbar: 'flat', … }` start ook vanuit classic.

### Volledig eigen {#full-custom}

Geen `extends`, geen registratie: geef het object door aan de prop `skin` en stel shape-vlaggen en tokens vrij in. Een `name` zet je eigen label op de rootklasse (zie hieronder); zonder is het `tiptapify-skin-inline`.

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

`defineSkin` is de identiteitshelper voor getypeerde const-definities (hij komt in geen enkel register). Shape-vlaggen mogen afzonderlijk worden ingesteld — elke vlag die je weglaat blijft classic.

## Nooduitgang: de rootklasse {#escape-hatch-the-root-class}

Elke editorroot draagt `tiptapify-skin-{name}` (`tiptapify-skin-inline` voor een naamloos inline object). De bibliotheek **baseert nooit een regel op een skinnaam** — de klasse is van jou:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

De stabiele haken om tegen te schrijven:

| klasse | waar |
|---|---|
| `tiptapify-skin-{name}` | editor-root |
| `tiptapify-shape-{flag}-{value}` ×6 | editor-root — de opgeloste shape |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | de toolbar en zijn secties |
| `tiptapify-quiet-buttons` | toolbar- en bubbelroots onder `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | de rij van elk bubbelmenu en de haarlijn tussen zijn groepen |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | de rijen van het selectie-, lege-regel- en afbeeldingsmenu |
| `tiptapify-btn--active` | een ingedrukte knop van een bubbelmenu (een actieve mark, de afbeeldingsfloat) |
| `tiptapify-menu` · `tiptapify-menu--soft` | inhoud van de dropdownoverlay, de drager van de zachte menuregels |
| `tiptapify-skin-scope` | de tokenscope-div in geteleporteerde menu's |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | de dialoogkaart en zijn zachte drager |
| `tiptapify-frame` | de randwrapper van de editor |

**Verdediging tegen consumententhema's.** De skinlaag is gebouwd om beheerthema's te overleven die Vuetify-interne onderdelen padden en opnieuw kleuren: regels worden bewaakt door shape-/dragerklassen, gebruiken verdubbelde klassen (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) voor specificiteit en houden `!important` alleen waar het beheerthema-geval van de basiscommit het nodig bleek (de verdedigingsset van menu.css). Conventies waarmee je eigen overschrijvingen op hetzelfde slagveld blijven werken:

- scope je CSS onder `.tiptapify-skin-{name}` (of een shape-klasse) — nooit op kale Vuetify-interne onderdelen;
- geef de voorkeur aan tokens (`--tf-*`) voor de catalogusafmetingen, klassen voor de rest;
- kopieer de verdubbeling bij het overschrijven van Vuetify-componenten (een enkele `.v-list-item` verliest van de skinregels).

## Visueel contract (notitie voor bijdragers) {#visual-contract-contributor-note}

De berekende stijlen van de ingebouwde skins liggen vast in de baseline-fixture `src/skins/__fixtures__/skin-baseline.json` (13 secties × licht/donker): de CSS-laag is af wanneer de gemeten matrix ermee overeenkomt. Leesnotities bij de fixture:

- Hover-/actieve afmetingen kunnen niet vanaf de pagina worden afgedwongen, dus de opname leest de **declaratietekst van de eerste CSSOM-regel die past** voor elke hover-selector en lost die op via een probe-element binnen de skinroot (het veld `resolved`) — het is het contract van de winnende regel, geen live `:hover`-momentopname.
- `_meta.selectors.menu` legt de selectortekst van vóór `SkinScope` vast. De fixture is bevroren (normatieve waarden), dus het veld is met opzet verouderd; de opnamebundel legt de huidige selector vast.
- De fixture draagt zijn goedgekeurde wijzigingen in `_meta.notes`: het herstel van 2026-10-18 van de VBtnGroup-markup onder `groups: 'box'` heeft de klassieke velden `groupBtn`/`buttonsActive` van de kindknoppen opnieuw gemeten (aaneengesloten hoeken, het vlak bezit de elevatie). De pastelvelden zijn onaangeroerd — een bewuste visuele wijziging werkt alleen de betrokken classic-cellen bij, legt een notitie vast en levert een CHANGELOG-regel mee.

## Zie ook {#see-also}

- [Skinvoorbeelden](/nl/examples/skins) — classic, pastel en de eigen mint-skin, live.
- [Prop `skin`](/nl/api/props#skin) · [skintypes](/nl/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/nl/api/types#tiptapifyskininput).
