# Nahad {#skins}

**Nahk** on redaktori ümbrise üks välimus: tööriistariba, selles olevad nupud ja rühmad, hõljumenüüd, rippmenüüd, dialoogid, sisu ümber olev raam ja pildivaliku ümbris. Selle valib prop `skin`:

```vue
<Tiptapify skin="pastel" />
```

Skin koosneb kahest asjast: **tokenitest** (värvid ja suurused CSS-muutujatena) ja **kujust** (struktuursed variandid, mida token ei suuda väljendada). Kaks sisseehitatud skini on `default` — klassikaline ilme, kõrgendatud tööriistariba kõrgendatud nuppude rühmadega — ja `pastel`, rahulik ilme. Kohandatud skinid on täisväärtuslikud: `registerSkin()` ja sisemised skiniobjektid lahendatakse täpselt sama mehhanismi kaudu ning sisseehitatud skinid on registreeritud skinid, mitte erijuhud.

## Terminoloogia: nahk vs Vuetify teema {#terminology-skin-vs-vuetify-theme}

- **nahk** (skin) — kasutajapoolne termin redaktori ümbrise ühe välimuse kohta: tokenid + kuju. Prop on `skin`, tüübid on `TiptapifySkin*`, register on `registerSkin()`, juurklass on `tiptapify-skin-{name}`.
- **teema** (theme) — reserveeritud Vuetify heledatele/tumedatele teemadele. Tiptapify komponendid hoiavad oma `theme` propid Vuetify praeguse teema nimega sünkroonis; nahasüsteem ei puutu neid kunagi.

Need koos töötavad: enamik sisseehitatud tokenivärve viitab Vuetify teemamuutujatele (`rgb(var(--v-theme-surface))`, …), nii et nahad järgivad heledat/tumedat automaatselt. Klassikalise veeru fikseeritud tumedad lahtrid — suuruse muutmise käepide (`rgba(0, 0, 0, .5/.8)`), tavaline pildi kontuur, hõljumenüü vari ning menüü/dialoogi kõrgenduse varjud — on tahtlikud: klassikaline välimus värvib mõlemas teemas neutraalset tumedat ümbrist ja mõõdetud baastase fikseerib need. Kohandatud nahk võib teemamuutujatele vabalt viidata — vaata tokenitabelit.

## Kontseptsioon {#concept}

### Tokenid {#tokens}

Token on CSS-i kohandatud omadus nimega `--tf-*`. Kataloogivõti on CSS-järelliite camelCase: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Väärtused on tavalised stringid — värvid, täielikud äärise lühivormid, varjud, polsterdused, raadiused.

Iga raamatukogu nahareegel eksisteerib **ühe korra** ja loeb oma tokenit varuväärtusega, mis on võrdne klassikalise (baas)väärtusega:

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Lahendatud nahk väljastab muutujatena ainult oma **ülekirjutused**; CSS-i varuväärtused kannavad baasi. Muutujad satuvad redaktori juurelemendile — ja kuna menüüd ja dialoogid teleporditakse sealt välja, ka iga menüü `SkinScope` ümbrisele ja dialoogikaardile endale, nii et tokenid järgivad iga pinda.

### Kuju {#shape}

Kuus lippu otsustavad, millised reeglikomplektid rakenduvad; tokenid värvivad need:

| lipp | väärtused | mida see lülitab |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbar kõrgendus + sisemise peenjooneta vs lame toonitud riba |
| `groups` | `box` · `flat` | tööriistariba sektsioonid kõrgendatud **VBtnGroup** kastidena (0.3.2 markeering: ühendatud nupud, rühma tokenid värvivad kasti) vs tavalised flex-div-jooksud |
| `buttons` | `vuetify` · `quiet` | natiivsed Vuetify nupud vs kummitusnupud neutraalse vajutatud olekuga |
| `bubble` | `card` · `flat` | säilitatud ühilduvuse jaoks: hõljumenüüd on mõlemas kujus üks tokenitega värvitud ikoonnuppude rida (nende nupud järgivad `buttons`) |
| `dialog` | `classic` · `soft` | jaotusjoon pealkirja all, kõrgendatud sulgemine vs pehme kaart, tekstiga sulgemine |
| `menu` | `vuetify` · `soft` | rippmenüüd: Vuetify loend vs hele polsterdatud kaart |

Lahendatud kuju kodeeritakse redaktori juurelemendil kuue klassina `.tiptapify-shape-{flag}-{value}` ja tehakse kohandatud tööriistariba komponentide jaoks kättesaadavaks kui `shape: ComputedRef<ResolvedShape>` funktsioonil [`useTiptapifyConfig()`](/et/api/types#usetiptapifyconfig).

### Extends {#extends}

Nahk lahendatakse klassikalise baasi peal, seejärel selle `extends` ahel juurest alates, siis selle enda liikmed:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Puuduvad lülid lahendatakse kogunenud ahelaks (arendushoiatusega); tsükkel lahendatakse klassikaliseks (arendushoiatusega). Registreeritud nahale viidatakse nime järgi; sisemine nahaobjekt võib teha `extends` registreeritud nimele ega satu kunagi globaalsesse registrisse — kohandatud nahad ei leki kunagi redaktorite vahel. Tundmatud tokenivõtmed jäetakse arendushoiatusega tähelepanuta.

Kõigi kolme vormi otsedemod on [nahkade näidete lehel](/et/examples/skins).

## Tokenikataloog {#token-catalog}

Allolevad tabelid on **v1 leping**: kataloogivõtmed (`TiptapifySkinColors` / `TiptapifySkinMetrics`) on nimed, mida saad seada. Klassikalised lahtrid on CSS-i varuväärtused — väärtus, mida baasreeglid värvivad, kui ükski nahk tokenit üle ei kirjuta.

### Tööriistariba / riba {#toolbar-bar}

| token | CSS-muutuja | klassikaline | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Üksused / rühmad / eraldajad {#items-groups-dividers}

| token | CSS-muutuja | klassikaline | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify kõrgendus 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (vahe: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Mõõdetud klassikaline lahter on `normal` — Vuetify natiivne flex-väärtus, mida CSS-i varuväärtus kannab. Kataloogi baasväärtus `0px` on samaväärne selgesõnaline pikkus nahaülekirjutuste jaoks.

<a id="shadow-cells"></a>² Lahtrid, mis loevad „Vuetify kõrgendus *n*“, on kirjeldavad: täpne kolmikvarju string on mõõdetud väärtus kinnitatud baastasemefikstuuris (`src/skins/__fixtures__/skin-baseline.json`) ja on CSS-i varuväärtus. Lipu `groupShadow` puhul on selleks **kõrgendus 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — lipu `groups: 'box'` korral on sektsioon VBtnGroup (`elevation="4"`) ja tokenireegel värvib kasti selle kolmikuga rühma enda kõrgenduse peale: kast omab kõrgendust, ühendatud lapsnupud ei kanna ühtegi.

### Nupud {#buttons}

Neid tokeneid tarbitakse **ainult lipu `buttons: 'quiet'` korral** — vaata [kättesaadavust](#reachability).

| token | CSS-muutuja | vaikse nupu väärtus (klassikaline: natiivne Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Hõljumenüüd (valik, tühi rida, pilt) {#bubble-menus-selection-empty-line-image}

| token | CSS-muutuja | klassikaline | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | sama |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | sama |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | sama |

### Rippmenüüd {#dropdown-menus}

| token | CSS-muutuja | klassikaline | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify kõrgendus 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Klassikalise menüü **loendi** kast (raadius, vari, loendi polsterdus) on tänapäeval nahareegel — `SkinScope` tokeniümbris asub Vuetify enda lapsreegli ja loendi vahel, nii et raamatukogu taastab need pikslid ülaltoodud tokeneid lugevate nahareeglitena. **Üksuse** pikslid jäävad natiivseks Vuetifyks (fikstuur mõõdab seal Vuetify vaikeväärtusi): neli üksusetokenit on tegevusetud, kui `menu: 'vuetify'`.

### Dialoogid {#dialogs}

| token | CSS-muutuja | klassikaline | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCardi kõrgendus [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | välja vaikeväärtus (`4px`) | `8px` (piirjoonega) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Raam (redaktori äärise ümbris) {#frame-editor-border-wrapper}

| token | CSS-muutuja | klassikaline | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, ilma ülemise servata | täielik ääris |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Lameda tööriistariba kuju korral värvib raam ka külgede kaupa deltat (ülemine serv ja alumine serv 1,6× äärise läbipaistmatusega). See delta kuulub kujule, mitte tokenile: see ei ole tokenitega kättesaadav.

### Pildid ja suuruse muutmise käepidemed {#images-and-resize-handles}

| token | CSS-muutuja | klassikaline | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (valitud) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (hõljumisel) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Pildi tööriistariba järgib lippu `buttons`: vaikse kuju korral saab see vaikse pinna — selle 2px/4px vahed loevad `--tf-bubble-gap` / `--tf-bubble-padding` pildimenüü varuväärtustega; pildi tööriistaribale pole eraldi tokenit.

### Pole kataloogis (pääsutee territoorium) {#not-in-the-catalog-escape-hatch-territory}

Mõnedel disainiülevaates nimetatud mõõtmetel pole v1-s kataloogitokenit: **tööriistariba kõrgus, raami laius, raami raadius, nupu laius, nupu polsterdus, dialoogi laius**. Ülaltoodud kataloogitabelid on leping; nende pikslite jaoks ava [pääsutee](#escape-hatch-the-root-class) ja kujunda stabiilseid klasse otse.

## Kättesaadavus {#reachability}

Leping, mis on öeldud ühe korra ja mida täidab iga ülaltoodud rühm:

> Token värvib pinda ainult siis, kui kuju selle pinna aktiveerib; natiivseid Vuetify visuaale kujundatakse Vuetify teemavärvidega.

Rühmade kaupa:

- **Tööriistariba, raam, pildi/käepideme ümbris** — aktiivne igas kujus; tokenid värvivad need, klassikalised lahtrid on natiivne välimus, millele tokenid tagasi langevad.
- **Rühmade kast** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — lipu `groups: 'box'` korral on sektsioon VBtnGroup (0.3.2 struktuur: nupud ühenduvad, kast kannab kõrgendust); kasti reeglid värvivad seda rühma tokenitega ja `--tf-group-height` hoiab 32px lepingut märkega `!important` (Vuetify tihedusreegel võitleb sellega, nagu 0.3.2-s). Lipu `groups: 'flat'` korral on sektsioonid tavalised div-jooksud (läbipaistvad, varjuta, raadius 0 on kuju baas).
- **Eraldaja peenjooned** (`dividerWidth/Height/Color`) — nähtav peenjoon on lipu `groups: 'flat'` võimalus; kastikujus on eraldaja nullsuurusega vahe (`margin: 0 4px` baasreeglist).
- **Üksuste polsterdus/vahed** — kompaktne `6px 8px` jooks on piiratud lamedale ribale (`toolbar: 'flat'`), rühmavahed lamedatele sektsioonidele (`groups: 'flat'`); kõrgendatud riba säilitab klassikalised mõõdud.
- **Nupud** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — tegevusetud lipu `buttons: 'vuetify'` korral: natiivsed Vuetify nupud värvivad oma olekud ise. Kujunda neid Vuetify teemavärvidega (`primary`, `surface`, …) — klassikalised kujud pärivad need tahtlikult.
- **Menüüüksuse mõõdud** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — tegevusetud lipu `menu: 'vuetify'` korral; Vuetify omab neid üksuse piksleid. Menüü **loendi** kast (raadius/vari/polsterdus) on mõlemas kujus nahaga värvitud (vaata [menüümärkust](#menu-classic-note)).
- **Dialoogi pehme ümbris** (`dialogActionBtn*`, `dialogFieldRadius`, pehmed polsterdused, puuduv jaotusjoon) — värvitakse lipu `dialog: 'soft'` korral; lipu `dialog: 'classic'` korral on dialoog VCard klassikaliste polsterdustega.
- **Hõljumenüü ümbris** — valiku-, tühja rea ja pildimenüü on mõlemas kujus üks ikoonnuppude rida, mida värvivad hõljumenüü tokenid; `bubble` ei muuda enam nende markeeringut.

Ülekirjutust, mis on võrdne kataloogi baasiga, **ei väljastata** — mitteklassikalise kuju korral värvib kuju enda baas CSS-i varuväärtuse kaudu, nii et klassikalise väärtuse „taastamine“ (nt `buttonActiveBg` seadmine tagasi väärtusele `rgb(var(--v-theme-primary))` lipu `buttons: 'quiet'` korral) ei tee vaikselt midagi. Klassikalise väljanägemisega väärtuse sundimiseks mitteklassikalise kuju korral sea ülekirjutus, mis erineb kataloogi baasist — samaväärne literaal, näiteks `rgba(var(--v-theme-primary), 1)`, värvib identselt ja jääb vahelejätmisest puutumata.

Tokeneid ei ole tahtlikult natiivsetesse radadesse ühendatud — just see hoiab `default`i piksliidentsena klassikalise välimusega, samal ajal kui kõik läheb kataloogi kaudu.

## Retseptid {#recipes}

### Pasteli laiendamine {#extend-pastel}

Päri vaikne kuju ja värvi mõned pinnad ümber. Registreeritud nimed töötavad igal redaktoril:

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

Kuju (flat/quiet/soft) tuleb pastelilt; puutumata tokenid säilitavad pasteli väärtused — vaikse nupu toon jääb neutraalseks, liigub ainult see, mida sa üle kirjutad. See on nahk, mis renderdatakse otse [näidete lehel](/et/examples/skins#custom-mint).

### Vaikenaha (default) laiendamine {#extend-default}

Säilita klassikaline struktuur, häälesta värvid:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` on kaudne juur, nii et võtme võib ära jätta: `{ toolbar: 'flat', … }` algab samuti klassikalisest.

### Täiesti kohandatud {#full-custom}

Ilma `extends`ita, ilma registreerimiseta: anna objekt propile `skin` ja sea kujulipud ning tokenid vabalt. `name` paneb juurklassile sinu enda sildi (vaata allpool); ilma selleta on see `tiptapify-skin-inline`.

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

`defineSkin` on identsusabifunktsioon tüübitud konstantdefinitsioonide jaoks (see ei sisene ühtegi registrisse). Kujulippe võib seada eraldi — iga lipp, mille jätad ära, jääb klassikaliseks.

## Pääsutee: juurklass {#escape-hatch-the-root-class}

Iga redaktori juurelement kannab klassi `tiptapify-skin-{name}` (`tiptapify-skin-inline` nimeta sisemise objekti puhul). Raamatukogu **ei seo kunagi ühtegi reeglit nahanimega** — klass on sinu:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Stabiilsed haakepunktid, mille vastu kirjutada:

| klass | kus |
|---|---|
| `tiptapify-skin-{name}` | redaktori juurelement |
| `tiptapify-shape-{flag}-{value}` ×6 | redaktori juurelement — lahendatud kuju |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | tööriistariba ja selle sektsioonid |
| `tiptapify-quiet-buttons` | tööriistariba ja hõljumenüü juurelemendid lipu `buttons: 'quiet'` korral |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | iga hõljumenüü rida ja peenjoon selle rühmade vahel |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | valiku-, tühja rea ja pildimenüü read |
| `tiptapify-btn--active` | hõljumenüü vajutatud nupp (aktiivne märgend, pildi ujutus) |
| `tiptapify-menu` · `tiptapify-menu--soft` | rippmenüü ülekatte sisu, pehmete menüüreeglite kandja |
| `tiptapify-skin-scope` | tokeniskoobi div teleporditud menüüde sees |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | dialoogikaart ja selle pehme kandja |
| `tiptapify-frame` | redaktori äärise ümbris |

**Tarbijateema kaitse.** Nahakiht on ehitatud üle elama admin-teemasid, mis polsterdavad ja värvivad ümber Vuetify sisemisi osi: reeglid piiravad end kuju-/kandjaklassidega, kasutavad spetsiifilisuse jaoks kahekordistatud klasse (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) ja hoiavad `!important` ainult seal, kus baaskommit tõestas selle vajalikkust admin-teema juhul (menu.css kaitsekomplekt). Konventsioonid, mis hoiavad sinu enda ülekirjutused samal lahinguväljal töötamas:

- kitsenda oma CSS alla `.tiptapify-skin-{name}` (või kujuklassi) — mitte kunagi paljastele Vuetify sisemistele osadele;
- eelista kataloogimõõtmete jaoks tokeneid (`--tf-*`), ülejäänu jaoks klasse;
- sobita kahekordistamine Vuetify komponentide ülekirjutamisel (üksik `.v-list-item` kaotab nahareeglitele).

## Visuaalne leping (panustaja märkus) {#visual-contract-contributor-note}

Sisseehitatud nahkade arvutatud stiilid on fikseeritud baastasemefikstuuriga `src/skins/__fixtures__/skin-baseline.json` (13 sektsiooni × hele/tume): CSS-kiht on valmis, kui mõõdetud maatriks sellega ühtib. Lugemismärkused fikstuuri kohta:

- Hõljumise/aktiivsuse mõõtmeid ei saa lehelt sundida, seega loeb salvestus iga hõljumisvalija jaoks **esimese tabanud CSSOM-reegli deklaratsiooniteksti** ja lahendab selle nahajuure sees oleva sondielemendi kaudu (väli `resolved`) — see on võitva reegli leping, mitte elav `:hover` hetktõmmis.
- `_meta.selectors.menu` salvestab `SkinScope`i-eelse valijateksti. Fikstuur on külmutatud (normatiivsed väärtused), seega on väli tahtlikult aegunud; salvestuskomplekt fikseerib praeguse valija.
- Fikstuur kannab oma lubatud muudatusi väljal `_meta.notes`: 2026-10-18 VBtnGroup markeeringu taastamine lipu `groups: 'box'` korral mõõtis uuesti klassikalised `groupBtn`/`buttonsActive` lapsnupuväljad (ühendatud nurgad, kast omab kõrgendust). Pasteli väljad on puutumata — tahtlik visuaalne muudatus uuendab ainult mõjutatud klassikalisi lahtreid, salvestab märkuse ja toob kaasa CHANGELOG-i rea.

## Vaata ka {#see-also}

- [Nahkade näited](/et/examples/skins) — classic, pastel ja kohandatud mint-nahk, otse.
- [`skin` prop](/et/api/props#skin) · [nahatüübid](/et/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/et/api/types#tiptapifyskininput).
