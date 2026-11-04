# Teemat {#skins}

**Skin** (teema) on yksi editorin kehyksen ulkoasu: työkalurivi, sen painikkeet ja ryhmät, kuplavalikot, pudotusvalikot, dialogit, sisällön ympärillä oleva kehys ja kuvan valinnan kehys. `skin`-propsi valitsee sen:

```vue
<Tiptapify skin="pastel" />
```

Skin koostuu kahdesta asiasta: **tokeneista** (värit ja koot CSS-muuttujina) ja **muodosta** (rakenteelliset variantit, joita token ei voi ilmaista). Kaksi sisäänrakennettua skiniä ovat `default` — klassinen ulkoasu, korotettu työkalupalkki korotetuin painikeryhmin — ja `pastel`, rauhallinen ulkoasu. Mukautetut skinit ovat täysivaltaisia: `registerSkin()` ja inline-skin-objektit ratkaistaan täsmälleen samalla mekanismilla, ja sisäänrakennetut skinit ovat rekisteröityjä skinejä, eivät erikoistapauksia.

## Terminologia: skin vs Vuetify-teema {#terminology-skin-vs-vuetify-theme}

- **skin** — käyttäjälle näkyvä termi yhdelle editorin kehyksen ulkoasulle: tokenit + muoto. Propsi on `skin`, tyypit ovat `TiptapifySkin*`, rekisteri on `registerSkin()` ja juuriluokka on `tiptapify-skin-{name}`.
- **theme** (teema) — varattu Vuetifyn vaalealle/tummalle teemalle. Tiptapify-komponenttien `theme`-propsit saavat arvonsa Vuetifyn nykyisen teeman nimestä; skin-järjestelmä ei koske niihin.

Ne toimivat yhdessä: useimmat sisäänrakennetut token-värit viittaavat Vuetifyn teemamuuttujiin (`rgb(var(--v-theme-surface))`, …), joten teemat seuraavat vaaleaa/tummaa automaattisesti. Klassisen sarakkeen kiinteän tummat solut — koonmuutoskahva (`rgba(0, 0, 0, .5/.8)`), tavallinen kuvan ääriviiva, kuplan varjo sekä valikon/dialogin korotusvarjot — ovat tarkoituksellisia: klassinen ulkoasu maalaa neutraalin tumman kehyksen molemmissa teemoissa, ja mitattu perustaso lukitsee ne. Oma teema voi viitata teemamuuttujiin vapaasti — katso tokentaulukko.

## Käsite {#concept}

### Tokenit {#tokens}

Token on `--tf-*`-niminen CSS-mukautettu ominaisuus. Katalogin avain on CSS-päätteen camelCase-muoto: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Arvot ovat tavallisia merkkijonoja — värejä, täysiä border-lyhennesyntaksia, varjoja, täytteitä, pyöristyksiä.

Jokainen kirjaston teemasääntö on olemassa **kerran**, ja se lukee tokeninsa varaarvolla, joka vastaa klassista (perus)arvoa:

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Ratkaistu teema tuottaa muuttujina vain **ohituksensa**; CSS-varaarvot kantavat perusarvon. Muuttujat päätyvät editorin juureen — ja koska valikot ja dialogit teleportataan sen ulkopuolelle, myös kunkin valikon `SkinScope`-käärteeseen ja itse dialogikorttiin, joten tokenit seuraavat jokaista pintaa.

### Muoto (Shape) {#shape}

Kuusi lippua ratkaisee, mitkä sääntöjoukot otetaan käyttöön; tokenit maalaavat ne:

| lippu | arvot | mitä se vaihtaa |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbarin korotus + ei sisäistä hiusviivaa vs litteä sävytetty palkki |
| `groups` | `box` · `flat` | työkalurivin osiot korotettuina **VBtnGroup**-laatikoina (0.3.2-markup: yhdistetyt painikkeet, ryhmätokenit maalaavat laatikon) vs tavalliset flex-div-jonot |
| `buttons` | `vuetify` · `quiet` | natiivit Vuetify-painikkeet vs haamupainikkeet neutraalilla painetun tilan ilmeellä |
| `bubble` | `card` · `flat` | säilytetty yhteensopivuuden vuoksi: kuplavalikot ovat molemmissa muodoissa yksi tokenien maalaama kuvakepainikkeiden rivi (niiden painikkeet seuraavat `buttons`-lippua) |
| `dialog` | `classic` · `soft` | jakaja otsikon alla, korotettu sulkupainike vs pehmeä kortti, tekstisulkupainike |
| `menu` | `vuetify` · `soft` | pudotusvalikot: Vuetify-lista vs kevyt täytetty kortti |

Ratkaistu muoto koodataan editorin juureen kuutena `.tiptapify-shape-{flag}-{value}`-luokkana ja annetaan `shape: ComputedRef<ResolvedShape>` -kenttänä [`useTiptapifyConfig()`](/fi/api/types#usetiptapifyconfig)-funktiossa omille työkalurivin komponenteille.

### Extends {#extends}

Teema ratkaistaan klassisen perustan päälle, sitten sen `extends`-ketju juuresta alkaen ja sitten sen omat jäsenet:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Puuttuvat linkit ratkaistaan kertyneeseen ketjuun (kehitysvaroituksella); sykli ratkaistaan klassiseen (kehitysvaroituksella). Rekisteröityyn teemaan viitataan nimellä; inline-teemaobjekti voi `extends` rekisteröidystä nimestä eikä koskaan päädy globaaliin rekisteriin — omat teemat eivät koskaan vuoda editoreiden välillä. Tuntemattomat token-avaimet ohitetaan kehitysvaroituksella.

Kaikkien kolmen muodon live-demot ovat [Skins-esimerkkisivulla](/fi/examples/skins).

## Tokenikatalogi {#token-catalog}

Alla olevat taulukot ovat **v1-sopimus**: katalogin avaimet (`TiptapifySkinColors` / `TiptapifySkinMetrics`) ovat nimet, jotka voit asettaa. Classic-solut ovat CSS-varaarvoja — arvo, jonka perussäännöt maalaavat, kun mikään teema ei ohita tokenia.

### Työkalurivi / palkki {#toolbar-bar}

| token | CSS-muuttuja | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Kohteet / ryhmät / erottimet {#items-groups-dividers}

| token | CSS-muuttuja | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetifyn elevation 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (välike: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Mitattu classic-solu on `normal` — Vuetifyn natiivi flex-arvo, jonka CSS-varaarvo kantaa. Katalogin perusarvo `0px` on vastaava eksplisiittinen pituus teemaohituksille.

<a id="shadow-cells"></a>² Solut, joissa lukee "Vuetify elevation *n*", ovat kuvailevia: tarkka kolmoisvarjomerkkijono on mitattu arvo tallennetussa baseline-fixturessa (`src/skins/__fixtures__/skin-baseline.json`) ja se on CSS-varaarvo. `groupShadow`-tokenille se on **elevation 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — kun `groups: 'box'`, osio on VBtnGroup (`elevation="4"`), ja tokenisääntö maalaa laatikon tällä kolmoisella ryhmän oman korotuksen päälle: laatikko omistaa korotuksen, yhdistetyillä lapsipainikkeilla sitä ei ole.

### Painikkeet {#buttons}

Näitä tokeneita käytetään **vain `buttons: 'quiet'` -tilassa** — katso [Tavoitettavuus](#reachability).

| token | CSS-muuttuja | quiet-arvo (classic: natiivi Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Kuplavalikot (valinta, tyhjä rivi, kuva) {#bubble-menus-selection-empty-line-image}

| token | CSS-muuttuja | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | sama |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | sama |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | sama |

### Pudotusvalikot {#dropdown-menus}

| token | CSS-muuttuja | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetifyn elevation 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Klassisen valikon **lista**-laatikko (pyöristys, varjo, listan täyte) on nykyisin teemasääntö — `SkinScope`-tokenikääre sijaitsee Vuetifyn oman lapsisäännön ja listan välissä, joten kirjasto palauttaa nuo pikselit teemasääntöinä, jotka lukevat yllä olevia tokeneita. **Kohteen** pikselit pysyvät natiivina Vuetifynä (fixture mittaa siellä Vuetifyn oletukset): neljä kohdetokenia ovat toimimattomia, kun `menu: 'vuetify'`.

### Dialogit {#dialogs}

| token | CSS-muuttuja | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCardin elevation [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | kentän oletus (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Kehys (editorin reunan kääre) {#frame-editor-border-wrapper}

| token | CSS-muuttuja | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, ei yläreunaa | täysi reunus |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Litteän työkalurivin muodossa kehys maalaa myös sivukohtaisen deltan (yläreuna ja alareuna 1,6-kertaisella reunan peittävyydellä). Tuo delta kuuluu muotoon, ei tokeniin: se ei ole tokenilla tavoitettavissa.

### Kuvat ja koonmuutoskahvat {#images-and-resize-handles}

| token | CSS-muuttuja | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (valittu) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (hover) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Kuvan työkalurivi seuraa `buttons`-lippua: quiet-muodossa se saa quiet-pinnan — sen 2px/4px-välit lukevat `--tf-bubble-gap` / `--tf-bubble-padding` kuvavalikon varaarvoilla; omaa kuvan työkalurivin tokenia ei ole.

### Ei katalogissa (varaportin alue) {#not-in-the-catalog-escape-hatch-territory}

Joillakin suunnittelukatsauksessa mainituilla mitoilla ei ole katalogitokenia v1:ssä: **työkalurivin korkeus, kehyksen leveys, kehyksen pyöristys, painikkeen leveys, painikkeen täyte, dialogin leveys**. Yllä olevat katalogitaulukot ovat sopimus; näille pikseleille avaa [varaportti](#escape-hatch-the-root-class) ja tyylittele vakaat luokat suoraan.

## Tavoitettavuus {#reachability}

Sopimus, ilmaistuna kerran ja kunnioitettuna jokaisessa yllä olevassa ryhmässä:

> Token maalaa pinnan vain, kun muoto aktivoi sen pinnan; natiivit Vuetify-visuaalit tyylitellään Vuetifyn teemaväreillä.

Ryhmittäin:

- **Työkalurivi, kehys, kuva-/kahvakehys** — aktiivisia jokaisessa muodossa; tokenit maalaavat ne, classic-solut ovat natiivi ulkoasu, johon tokenit palaavat.
- **Ryhmälaatikko** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — kun `groups: 'box'`, osio on VBtnGroup (0.3.2-rakenne: painikkeet yhdistyvät, laatikko kantaa korotuksen); laatikkosäännöt maalaavat sen ryhmätokeneilla, ja `--tf-group-height` pitää 32 px:n sopimuksen `!important`-merkinnällä (Vuetifyn tiheyssääntö taistelee sitä vastaan, kuten 0.3.2:ssa). Kun `groups: 'flat'`, osiot ovat tavallisia div-jonoja (läpinäkyvä, varjoton, pyöristys 0 on muodon perusarvo).
- **Erottimien hiusviivat** (`dividerWidth/Height/Color`) — näkyvä hiusviiva on `groups: 'flat'` -ominaisuus; laatikkomuodossa erotin on nollakokoinen välike (`margin: 0 4px` perussäännöstä).
- **Kohteiden täyte/välit** — kompakti `6px 8px` -jono on sidottu litteään palkkiin (`toolbar: 'flat'`), ryhmävälit litteisiin osioihin (`groups: 'flat'`); korotettu palkki säilyttää klassiset mitat.
- **Painikkeet** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — toimimattomia, kun `buttons: 'vuetify'`: natiivit Vuetify-painikkeet maalaavat omat tilansa. Tyylittele ne Vuetifyn teemaväreillä (`primary`, `surface`, …) — klassiset muodot perivät ne tarkoituksella.
- **Valikon kohteiden mitat** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — toimimattomia, kun `menu: 'vuetify'`; Vuetify omistaa nuo kohteen pikselit. Valikon **lista**-laatikko (pyöristys/varjo/täyte) on teeman maalaama molemmissa muodoissa (katso [valikkohuomautus](#menu-classic-note)).
- **Dialogin pehmeä kehys** (`dialogActionBtn*`, `dialogFieldRadius`, pehmeät täytteet, puuttuva jakaja) — maalataan, kun `dialog: 'soft'`; kun `dialog: 'classic'`, dialogi on VCard klassisilla täytteillä.
- **Kuplakehys** — valinta-, tyhjän rivin ja kuvavalikot ovat yksi kuvakepainikkeiden rivi molemmissa muodoissa, kuplatokenien maalaamana; `bubble` ei enää muuta niiden markupia.

Ohitusta, joka on yhtä suuri kuin katalogin perusarvo, **ei tuoteta** — ei-klassisessa muodossa muodon oma perusarvo maalaa CSS-varaarvon kautta, joten klassisen arvon "palauttaminen" (esim. `buttonActiveBg` takaisin arvoon `rgb(var(--v-theme-primary))` kun `buttons: 'quiet'`) ei tee hiljaisesti mitään. Pakottaaksesi klassisen näköisen arvon ei-klassisessa muodossa aseta ohitus, joka eroaa katalogin perusarvosta — vastaava literaali, kuten `rgba(var(--v-theme-primary), 1)`, maalaa identtisesti ja selviää ohituksesta.

Tokeneita ei tarkoituksella kytketä natiiveihin polkuihin — se pitää `default`-teeman pikselintarkasti klassisen ulkoasun mukaisena, vaikka kaikki kulkee katalogin kautta.

## Ohjeet {#recipes}

### Pastelin laajentaminen {#extend-pastel}

Peri hillitty muoto ja maalaa muutama pinta uudelleen. Rekisteröidyt nimet toimivat missä tahansa editorissa:

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

Muoto (flat/quiet/soft) tulee pastelista; koskemattomat tokenit säilyttävät pastelin arvot — hillitty painikkeen sävy pysyy neutraalina, vain se, minkä ohitat, liikkuu. Tämä on teema, joka piirretään livenä [esimerkkisivulla](/fi/examples/skins#custom-mint).

### Defaultin laajentaminen {#extend-default}

Säilytä klassinen rakenne ja hienosäädä väritystä:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` on implisiittinen juuri, joten avaimen voi jättää pois: `{ toolbar: 'flat', … }` alkaa myös klassisesta.

### Täysin oma {#full-custom}

Ei `extends`-määrettä eikä rekisteröintiä: anna objekti `skin`-propsille ja aseta muotolippuja ja tokeneita vapaasti. `name` antaa juuriluokalle oman nimesi (katso alla); ilman sitä se on `tiptapify-skin-inline`.

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

`defineSkin` on identiteettiapufunktio tyypitettyjen const-määritysten tekemiseen (se ei päädy mihinkään rekisteriin). Muotolippuja voi asettaa yksitellen — jokainen pois jättämäsi lippu pysyy klassisena.

## Varaportti: juuriluokka {#escape-hatch-the-root-class}

Jokaisella editorin juurella on `tiptapify-skin-{name}` (`tiptapify-skin-inline` nimettömälle inline-objektille). Kirjasto **ei koskaan sido yhtään sääntöä teeman nimeen** — luokka on sinun:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Vakaat koukut, joita vasten kirjoittaa:

| luokka | missä |
|---|---|
| `tiptapify-skin-{name}` | editorin juuri |
| `tiptapify-shape-{flag}-{value}` ×6 | editorin juuri — ratkaistu muoto |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | työkalurivi ja sen osiot |
| `tiptapify-quiet-buttons` | työkalurivin ja kuplan juuret, kun `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | jokaisen kuplavalikon rivi ja hiusviiva sen ryhmien välissä |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | valinta-, tyhjän rivin ja kuvavalikon rivit |
| `tiptapify-btn--active` | kuplavalikon painettu painike (aktiivinen merkintä, kuvan float) |
| `tiptapify-menu` · `tiptapify-menu--soft` | pudotusvalikon peittokerroksen sisältö, pehmeiden valikkosääntöjen kantaja |
| `tiptapify-skin-scope` | tokenien scope-div teleportattujen valikoiden sisällä |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | dialogikortti ja sen pehmeä kantaja |
| `tiptapify-frame` | editorin reunan kääre |

**Kuluttajan teeman puolustus.** Teemakerros on rakennettu selviämään ylläpitoteemoista, jotka täyttävät ja maalaavat uudelleen Vuetifyn sisäosia: säännöt rajataan muoto-/kantajaluokilla, käyttävät kaksinkertaisia luokkia (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) tarkkuuden vuoksi ja pitävät `!important`-merkinnän vain siellä, missä perus-commitin ylläpitoteematapaus osoitti sen tarpeelliseksi (menu.css-puolustusjoukko). Käytännöt, jotka pitävät omat ohituksesi toimivina samalla taistelukentällä:

- rajaa CSS:si `.tiptapify-skin-{name}`-luokan (tai muotoluokan) alle — älä koskaan paljaisiin Vuetifyn sisäosiin;
- suosi tokeneita (`--tf-*`) katalogin mitoille ja luokkia muulle;
- vastaa kaksinkertaistusta, kun ohitat Vuetify-komponentteja (yksittäinen `.v-list-item` häviää teemasäännöille).

## Visuaalinen sopimus (kehittäjän huomautus) {#visual-contract-contributor-note}

Sisäänrakennettujen teemojen lasketut tyylit on lukittu baseline-fixturella `src/skins/__fixtures__/skin-baseline.json` (13 osiota × vaalea/tumma): CSS-kerros on valmis, kun mitattu matriisi vastaa sitä. Lukuhuomautukset fixturelle:

- Hover-/active-mittoja ei voi pakottaa sivulta, joten tallennus lukee kunkin hover-valitsimen **ensimmäisen osuneen CSSOM-säännön deklaraatioteksti** ja ratkaisee sen teeman juuren sisällä olevan koe-elementin kautta (`resolved`-kenttä) — se on voittavan säännön sopimus, ei live-`:hover`-tilannekuva.
- `_meta.selectors.menu` tallentaa `SkinScope`-käärettä edeltävän valitsintekstin. Fixture on jäädytetty (normatiiviset arvot), joten kenttä on tarkoituksella vanhentunut; tallennuspaketti lukitsee nykyisen valitsimen.
- Fixture kantaa hyväksytyt muutoksensa kentässä `_meta.notes`: VBtnGroup-markupin palautus 2026-10-18 kun `groups: 'box'` mittasi uudelleen klassiset `groupBtn`/`buttonsActive`-lapsipainikekentät (yhdistetyt kulmat, laatikko omistaa korotuksen). Pastel-kentät ovat koskemattomia — tarkoituksellinen visuaalinen muutos päivittää vain vaikuttuneet classic-solut, kirjaa huomautuksen ja toimittaa CHANGELOG-rivin.

## Katso myös {#see-also}

- [Skins-esimerkit](/fi/examples/skins) — classic, pastel ja oma mint-teema livenä.
- [`skin`-propsi](/fi/api/props#skin) · [skin-tyypit](/fi/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/fi/api/types#tiptapifyskininput).
