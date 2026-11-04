# Apvalkalai {#skins}

**Apvalkalas** (skin) yra viena redaktoriaus išorės išvaizda: įrankių juosta, joje esantys mygtukai ir grupės, burbulo meniu, išskleidžiamieji meniu, dialogai, rėmas aplink turinį ir paveikslo pažymėjimo elementai. Jį parenka savybė `skin`:

```vue
<Tiptapify skin="pastel" />
```

Skinas sudarytas iš dviejų dalių: **tokenų** (spalvos ir dydžiai kaip CSS kintamieji) ir **formos** (struktūriniai variantai, kurių tokenas išreikšti negali). Du integruoti skinai yra `default` — klasikinė išvaizda, pakelta įrankių juosta su pakeltomis mygtukų grupėmis — ir `pastel`, rami išvaizda. Pasirinktiniai skinai yra visaverčiai: `registerSkin()` ir įterptieji skinų objektai išsprendžiami lygiai tuo pačiu mechanizmu, o integruoti skinai yra užregistruoti skinai, o ne ypatingi atvejai.

## Terminologija: apvalkalas ir Vuetify tema {#terminology-skin-vs-vuetify-theme}

- **skin** (apvalkalas) – naudotojui skirtas terminas vienai redaktoriaus išorės išvaizdai: žetonai + forma. Savybė yra `skin`, tipai – `TiptapifySkin*`, registras – `registerSkin()`, šaknies klasė – `tiptapify-skin-{name}`.
- **theme** (tema) – rezervuota Vuetify šviesiajai / tamsiajai temoms. Tiptapify komponentai savo `theme` savybes maitina iš dabartinio Vuetify temos pavadinimo; apvalkalų sistema jų niekada neliečia.

Jie veikia kartu: dauguma įtaisytųjų žetonų spalvų nurodo Vuetify temos kintamuosius (`rgb(var(--v-theme-surface))`, …), todėl apvalkalai automatiškai seka šviesųjį / tamsųjį režimą. Fiksuotai tamsios ląstelės klasikiniame stulpelyje – dydžio keitimo rankenėlė (`rgba(0, 0, 0, .5/.8)`), paprastas paveikslo kontūras, burbulo šešėlis ir meniu / dialogo iškilimo šešėliai – yra sąmoningos: klasikinė išvaizda abiejose temose piešia neutralią tamsią išorę, o išmatuotas bazinis rodiklis jas fiksuoja. Pasirinktinis apvalkalas gali laisvai nurodyti temos kintamuosius – žr. žetonų lentelę.

## Koncepcija {#concept}

### Žetonai {#tokens}

Žetonas yra CSS pasirinktinė savybė, pavadinta `--tf-*`. Katalogo raktas yra CSS priesagos camelCase: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Reikšmės yra paprastos eilutės – spalvos, pilni rėmelių sutrumpinimai, šešėliai, tarpai, kampų spinduliai.

Kiekviena bibliotekos apvalkalo taisyklė egzistuoja **vieną kartą** ir skaito savo žetoną su atsargine reikšme, lygia klasikinei (bazinei) reikšmei:

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Išspręstas apvalkalas kaip kintamuosius išspinduliuoja tik savo **perrašymus**; CSS atsarginės reikšmės perduoda bazę. Kintamieji patenka į redaktoriaus šaknį – ir, kadangi meniu bei dialogai iš jos išteleportuojami, į kiekvieno meniu `SkinScope` apvalkalą ir pačią dialogo kortelę, todėl žetonai seka kiekvieną paviršių.

### Forma {#shape}

Šešios vėliavėlės nulemia, kurios taisyklių aibės taikomos; žetonai jas nudažo:

| vėliavėlė | reikšmės | ką perjungia |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbar iškilimas + be vidinės plonos linijos, palyginti su plokščia nuspalvinta juosta |
| `groups` | `box` · `flat` | įrankių juostos skyriai kaip iškilusios **VBtnGroup** dėžutės (0.3.2 žymėjimas: sujungti mygtukai, grupės žetonai nudažo dėžutę), palyginti su paprastomis flex div eilutėmis |
| `buttons` | `vuetify` · `quiet` | įprasti Vuetify mygtukai, palyginti su „vaiduokliniais“ mygtukais su neutralia paspaudimo būsena |
| `bubble` | `card` · `flat` | paliekama dėl suderinamumo: burbulo meniu abiejose formose yra viena žetonais nudažyta piktogramų mygtukų eilutė (jų mygtukai seka `buttons`) |
| `dialog` | `classic` · `soft` | skirtukas po antrašte, iškilęs uždarymo mygtukas, palyginti su švelnia kortele ir tekstiniu uždarymo mygtuku |
| `menu` | `vuetify` · `soft` | išskleidžiamieji meniu: Vuetify sąrašas, palyginti su lengva kortele su tarpais |

Išspręsta forma užkoduojama redaktoriaus šaknyje kaip šešios `.tiptapify-shape-{flag}-{value}` klasės ir pateikiama kaip `shape: ComputedRef<ResolvedShape>` objekte [`useTiptapifyConfig()`](/lt/api/types#usetiptapifyconfig) pasirinktiniams įrankių juostos komponentams.

### Extends {#extends}

Apvalkalas išsprendžiamas virš klasikinės bazės, tada jo `extends` grandine nuo šaknies, tada jo paties nariais:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Trūkstamos grandys išsprendžiamos į sukauptą grandinę (su kūrimo režimo įspėjimu); ciklas išsprendžiamas į klasikinį (su kūrimo režimo įspėjimu). Užregistruotas apvalkalas nurodomas pavadinimu; įterptinis apvalkalo objektas gali `extends` užregistruotą pavadinimą ir niekada nepatenka į visuotinį registrą – pasirinktiniai apvalkalai niekada neprasisunkia tarp redaktorių. Nežinomi žetonų raktai ignoruojami su kūrimo režimo įspėjimu.

Visų trijų formų gyvos demonstracijos pateiktos [apvalkalų pavyzdžių puslapyje](/lt/examples/skins).

## Žetonų katalogas {#token-catalog}

Toliau pateiktos lentelės yra **v1 sutartis**: katalogo raktai (`TiptapifySkinColors` / `TiptapifySkinMetrics`) yra pavadinimai, kuriuos galite nustatyti. Klasikinės ląstelės yra CSS atsarginės reikšmės – reikšmė, kurią bazinės taisyklės nudažo, kai joks apvalkalas žetono nepaperašo.

### Įrankių juosta / juosta {#toolbar-bar}

| žetonas | CSS kintamasis | klasikinis | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Elementai / grupės / skirtukai {#items-groups-dividers}

| žetonas | CSS kintamasis | klasikinis | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify elevation 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (tarpiklis: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Išmatuota klasikinė ląstelė yra `normal` – natūrali Vuetify flex reikšmė, kurią ir perduoda CSS atsarginė reikšmė. Katalogo bazinė reikšmė `0px` yra lygiavertis aiškus ilgis apvalkalo perrašymams.

<a id="shadow-cells"></a>² Ląstelės, kuriose rašoma „Vuetify elevation *n*“, yra apibūdinamosios: tikslus trigubo šešėlio simbolių eilutė yra išmatuota reikšmė užfiksuotame bazinio rodiklio fiksavimo faile (`src/skins/__fixtures__/skin-baseline.json`) ir yra CSS atsarginė reikšmė. Savybei `groupShadow` tai yra **elevation 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) – esant `groups: 'box'` skyrius yra VBtnGroup (`elevation="4"`), o žetono taisyklė dėžutę nudažo šiuo trigubu virš paties grupės iškilimo: dėžutė valdo iškilimą, sujungti vaikiniai mygtukai jo neturi.

### Mygtukai {#buttons}

Šie žetonai naudojami **tik esant `buttons: 'quiet'`** – žr. [Pasiekiamumas](#reachability).

| žetonas | CSS kintamasis | ramioji reikšmė (klasikinė: natūralus Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Burbulo meniu (žymėjimas, tuščia eilutė, paveikslas) {#bubble-menus-selection-empty-line-image}

| žetonas | CSS kintamasis | klasikinis | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | tas pats |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | tas pats |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | tas pats |

### Išskleidžiamieji meniu {#dropdown-menus}

| žetonas | CSS kintamasis | klasikinis | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify elevation 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Klasikinio meniu **sąrašo** dėžutė (spindulys, šešėlis, sąrašo tarpai) šiandien yra apvalkalo taisyklė – `SkinScope` žetonų apvalkalas yra tarp paties Vuetify vaikinės taisyklės ir sąrašo, todėl biblioteka tuos pikselius atkuria kaip apvalkalo taisykles, skaitančias aukščiau pateiktus žetonus. **Elementų** pikseliai lieka natūralūs Vuetify (fiksavimo failas matuoja ten Vuetify numatytąsias reikšmes): keturi elemento žetonai neveikia, kai `menu: 'vuetify'`.

### Dialogai {#dialogs}

| žetonas | CSS kintamasis | klasikinis | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard elevation [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | numatytasis laukas (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Rėmas (redaktoriaus rėmelio apvalkalas) {#frame-editor-border-wrapper}

| žetonas | CSS kintamasis | klasikinis | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, be viršutinio krašto | pilnas rėmelis |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Esant plokščiai įrankių juostos formai, rėmas taip pat nudažo kiekvienos pusės skirtumą (viršutinį kraštą ir apatinį kraštą 1,6× rėmelio nepermatomumu). Tas skirtumas priklauso formai, o ne žetonui: jis nėra pasiekiamas žetonu.

### Paveikslai ir dydžio keitimo rankenėlės {#images-and-resize-handles}

| žetonas | CSS kintamasis | klasikinis | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (pažymėtas) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (užvedus) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Paveikslo įrankių juosta seka vėliavėlę `buttons`: esant ramiai formai ji gauna ramų paviršių – jos 2px/4px tarpai skaito `--tf-bubble-gap` / `--tf-bubble-padding` su paveikslo meniu atsarginėmis reikšmėmis; atskiro paveikslo įrankių juostos žetono nėra.

### Ne kataloge (atsarginio išėjimo sritis) {#not-in-the-catalog-escape-hatch-territory}

Kai kurie dizaino apžvalgoje paminėti matmenys v1 neturi katalogo žetono: **įrankių juostos aukštis, rėmo plotis, rėmo spindulys, mygtuko plotis, mygtuko tarpai, dialogo plotis**. Aukščiau pateiktos katalogo lentelės yra sutartis; šiems pikseliams atidarykite [atsarginį išėjimą](#escape-hatch-the-root-class) ir stilizuokite stabilias klases tiesiogiai.

## Pasiekiamumas {#reachability}

Sutartis, pasakyta vieną kartą ir laikomasi kiekvienoje aukščiau esančioje grupėje:

> Žetonas nudažo paviršių tik tada, kai forma tą paviršių aktyvuoja; natūralūs Vuetify vaizdai stilizuojami per Vuetify temos spalvas.

Pagal grupes:

- **Įrankių juosta, rėmas, paveikslo / rankenėlės išorė** – aktyvūs kiekvienoje formoje; žetonai juos nudažo, klasikinės ląstelės yra natūralus vaizdas, į kurį žetonai grįžta.
- **Grupių dėžutė** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) – esant `groups: 'box'` skyrius yra VBtnGroup (0.3.2 struktūra: mygtukai sujungti, dėžutė turi iškilimą); dėžutės taisyklės nudažo ją grupės žetonais, o `--tf-group-height` išlaiko 32px sutartį su `!important` (Vuetify tankio taisyklė su ja kovoja, kaip ir 0.3.2). Esant `groups: 'flat'` skyriai yra paprastos div eilutės (skaidrūs, be šešėlio, spindulys 0 yra formos bazė).
- **Skirtukų plonos linijos** (`dividerWidth/Height/Color`) – matoma plona linija yra `groups: 'flat'` savybė; dėžutės formoje skirtukas yra nulinio dydžio tarpiklis (`margin: 0 4px` iš bazinės taisyklės).
- **Elementų tarpai** – kompaktiškas `6px 8px` išdėstymas priklauso nuo plokščios juostos (`toolbar: 'flat'`), grupių tarpai – nuo plokščių skyrių (`groups: 'flat'`); iškilusi juosta išlaiko klasikines metrikas.
- **Mygtukai** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) – neveikia esant `buttons: 'vuetify'`: natūralūs Vuetify mygtukai nudažo savo būsenas patys. Stilizuokite juos Vuetify temos spalvomis (`primary`, `surface`, …) – klasikinės formos jas sąmoningai paveldi.
- **Meniu elementų metrikos** (`menuItemRadius/Padding/MinHeight/ActiveBg`) – neveikia esant `menu: 'vuetify'`; tuos elementų pikselius valdo Vuetify. Meniu **sąrašo** dėžutė (spindulys / šešėlis / tarpai) nudažoma apvalkalu abiejose formose (žr. [meniu pastabą](#menu-classic-note)).
- **Dialogo švelni išorė** (`dialogActionBtn*`, `dialogFieldRadius`, švelnūs tarpai, trūkstamas skirtukas) – nudažoma esant `dialog: 'soft'`; esant `dialog: 'classic'` dialogas yra VCard su klasikiniais tarpais.
- **Burbulo išorė** – žymėjimo, tuščios eilutės ir paveikslo meniu abiejose formose yra viena piktogramų mygtukų eilutė, nudažyta burbulo žetonais; `bubble` jų žymėjimo nebekeičia.

Perrašymas, lygus katalogo bazei, **neišspinduliuojamas** – esant neklasikinei formai formos pati bazė nudažoma per CSS atsarginę reikšmę, todėl klasikinės reikšmės „atkūrimas“ (pvz., `buttonActiveBg` grąžinimas į `rgb(var(--v-theme-primary))` esant `buttons: 'quiet'`) tyliai nieko nedaro. Norėdami priversti klasikiškai atrodančią reikšmę esant neklasikinei formai, nustatykite perrašymą, kuris skiriasi nuo katalogo bazės – lygiavertė reikšmė, pvz., `rgba(var(--v-theme-primary), 1)`, nudažo identiškai ir praeina praleidimo patikrą.

Žetonai sąmoningai neįrašyti į natūralius kelius – būtent tai išlaiko `default` pikselių lygmeniu identišką klasikinei išvaizdai, o viskas eina per katalogą.

## Receptai {#recipes}

### Pastel išplėtimas {#extend-pastel}

Paveldėkite ramią formą ir perdažykite kelis paviršius. Užregistruoti pavadinimai veikia bet kuriame redaktoriuje:

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

Forma (plokščia / rami / švelni) ateina iš pastel; neliesti žetonai išlaiko pastel reikšmes – ramus mygtukų fonas lieka neutralus, juda tik tai, ką perrašote. Tai apvalkalas, gyvai atvaizduotas [pavyzdžių puslapyje](/lt/examples/skins#custom-mint).

### Default išplėtimas {#extend-default}

Palikite klasikinę struktūrą, pakoreguokite spalvas:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` yra numanoma šaknis, todėl raktą galima praleisti: `{ toolbar: 'flat', … }` taip pat prasideda nuo klasikinio.

### Visiškai pasirinktinis {#full-custom}

Be `extends`, be registracijos: perduokite objektą savybei `skin` ir laisvai nustatykite formos vėliavėles bei žetonus. `name` uždeda jūsų pačių pavadinimą ant šaknies klasės (žr. toliau); be jo ji yra `tiptapify-skin-inline`.

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

`defineSkin` yra tapatumo pagalbinė funkcija tipizuotiems const apibrėžimams (ji nepatenka į jokį registrą). Formos vėliavėles galima nustatyti pavieniui – kiekviena praleista vėliavėlė lieka klasikinė.

## Atsarginis išėjimas: šaknies klasė {#escape-hatch-the-root-class}

Kiekviena redaktoriaus šaknis turi `tiptapify-skin-{name}` (`tiptapify-skin-inline` bevardžiam įterptiniam objektui). Biblioteka **niekada nesieja jokios taisyklės su apvalkalo pavadinimu** – ši klasė yra jūsų:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Stabilūs kabliukai, kuriems galite rašyti taisykles:

| klasė | kur |
|---|---|
| `tiptapify-skin-{name}` | redaktoriaus šaknis |
| `tiptapify-shape-{flag}-{value}` ×6 | redaktoriaus šaknis – išspręsta forma |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | įrankių juosta ir jos skyriai |
| `tiptapify-quiet-buttons` | įrankių juostos ir burbulo šaknys esant `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | kiekvieno burbulo meniu eilutė ir plona linija tarp jo grupių |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | žymėjimo, tuščios eilutės ir paveikslo meniu eilutės |
| `tiptapify-btn--active` | paspaustas burbulo meniu mygtukas (aktyvi žymė, paveikslo lygiavimas) |
| `tiptapify-menu` · `tiptapify-menu--soft` | išskleidžiamojo sluoksnio turinys, švelnių meniu taisyklių nešėjas |
| `tiptapify-skin-scope` | žetonų srities div teleportuotų meniu viduje |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | dialogo kortelė ir jos švelnus nešėjas |
| `tiptapify-frame` | redaktoriaus rėmelio apvalkalas |

**Apsauga nuo naudotojo temos.** Apvalkalo sluoksnis sukurtas išgyventi administravimo temas, kurios keičia tarpus ir perdažo Vuetify vidų: taisyklės priklauso nuo formos / nešėjo klasių, specifiškumui naudoja dvigubintas klases (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) ir `!important` palieka tik ten, kur bazinės revizijos administravimo temos atvejis įrodė, kad būtina (menu.css apsaugos rinkinys). Susitarimai, padedantys jūsų pačių perrašymams veikti tame pačiame mūšio lauke:

- savo CSS apribokite su `.tiptapify-skin-{name}` (arba formos klase) – niekada ne plikiems Vuetify vidams;
- katalogo matmenims teikite pirmenybę žetonams (`--tf-*`), likusiems – klasėms;
- perrašydami Vuetify komponentus pakartokite dvigubinimą (pavienis `.v-list-item` pralaimi apvalkalo taisyklėms).

## Vizualinė sutartis (pastaba bendraautoriams) {#visual-contract-contributor-note}

Įtaisytųjų apvalkalų apskaičiuoti stiliai užfiksuoti bazinio rodiklio failu `src/skins/__fixtures__/skin-baseline.json` (13 skyrių × šviesus / tamsus): CSS sluoksnis baigtas, kai išmatuota matrica jį atitinka. Pastabos apie šį failą:

- Užvedimo / aktyvios būsenos matmenų iš puslapio priversti negalima, todėl įrašymas skaito **pirmą pataikiusios CSSOM taisyklės deklaracijos tekstą** kiekvienam užvedimo selektoriui ir išsprendžia jį per zondo elementą apvalkalo šaknies viduje (laukas `resolved`) – tai laimėjusios taisyklės sutartis, o ne gyvas `:hover` momentinis vaizdas.
- `_meta.selectors.menu` fiksuoja selektoriaus tekstą iki `SkinScope`. Failas užšaldytas (normatyvinės reikšmės), todėl laukas sąmoningai pasenęs; įrašymo paketas fiksuoja dabartinį selektorių.
- Failas savo leistinus pakeitimus nurodo `_meta.notes`: 2026-10-18 VBtnGroup žymėjimo atkūrimas esant `groups: 'box'` iš naujo išmatavo klasikinius `groupBtn`/`buttonsActive` vaikinių mygtukų laukus (sujungti kampai, dėžutė turi iškilimą). Pastel laukai neliesti – sąmoningas vaizdinis pakeitimas atnaujina tik paveiktas klasikines ląsteles, įrašo pastabą ir pateikia CHANGELOG eilutę.

## Taip pat žr. {#see-also}

- [Apvalkalų pavyzdžiai](/lt/examples/skins) – classic, pastel ir pasirinktinis mint apvalkalas, gyvai.
- [`skin` savybė](/lt/api/props#skin) · [apvalkalo tipai](/lt/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/lt/api/types#tiptapifyskininput).
