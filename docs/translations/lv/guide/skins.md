# Apvalki {#skins}

**Apvalks** (skin) ir viens redaktora čaulas izskats: rīkjosla, tajā esošās pogas un grupas, burbuļa izvēlnes, nolaižamās izvēlnes, dialoglodziņi, ietvars ap saturu un attēla atlases čaula. To izvēlas rekvizīts `skin`:

```vue
<Tiptapify skin="pastel" />
```

Skins sastāv no divām lietām: **tokeniem** (krāsas un izmēri kā CSS mainīgie) un **formas** (strukturāli varianti, ko tokens nespēj izteikt). Divi iebūvētie skini ir `default` — klasiskais izskats, paaugstināta rīkjosla ar paaugstinātām pogu grupām — un `pastel`, mierīgais izskats. Pielāgotie skini ir pilnvērtīgi: `registerSkin()` un iekļautie skinu objekti tiek atrisināti ar tieši to pašu mehānismu, un iebūvētie skini ir reģistrēti skini, nevis īpaši gadījumi.

## Terminoloģija: apvalks (skin) pret Vuetify tēmu {#terminology-skin-vs-vuetify-theme}

- **skin** (apvalks) — lietotājam redzamais termins vienam redaktora čaulas izskatam: tokeni + forma. Rekvizīts ir `skin`, tipi ir `TiptapifySkin*`, reģistrs ir `registerSkin()`, saknes klase ir `tiptapify-skin-{name}`.
- **theme** (tēma) — rezervēts Vuetify gaišajām/tumšajām tēmām. Tiptapify komponentu rekvizīti `theme` tiek barotas no Vuetify pašreizējās tēmas nosaukuma; apvalku sistēma tiem nekad nepieskaras.

Tie darbojas kopā: lielākā daļa iebūvēto tokenu krāsu atsaucas uz Vuetify tēmas mainīgajiem (`rgb(var(--v-theme-surface))`, …), tāpēc apvalki automātiski seko gaišajam/tumšajam režīmam. Fiksēti tumšās šūnas klasiskajā kolonnā — izmēra maiņas turis (`rgba(0, 0, 0, .5/.8)`), vienkāršā attēla kontūra, burbuļa ēna un izvēlņu/dialoglodziņu paaugstinājuma ēnas — ir tīši: klasiskais izskats abās tēmās krāso neitrālu tumšu čaulu, un izmērītais pamatlīmenis tās fiksē. Pielāgots apvalks var brīvi atsaukties uz tēmas mainīgajiem — skatiet tokenu tabulu.

## Koncepcija {#concept}

### Tokeni {#tokens}

Tokens ir CSS pielāgota īpašība ar nosaukumu `--tf-*`. Kataloga atslēga ir CSS sufiksa camelCase forma: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Vērtības ir vienkāršas virknes — krāsas, pilni apmales saīsinājumi, ēnas, atkāpes, rādiusi.

Katrs apvalka noteikums bibliotēkā pastāv **vienreiz** un nolasa savu tokenu ar rezerves vērtību, kas vienāda ar klasisko (bāzes) vērtību:

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Atrisināts apvalks kā mainīgos izvada tikai savus **pārrakstījumus**; CSS rezerves vērtības nes bāzi. Mainīgie nonāk redaktora saknē — un, tā kā izvēlnes un dialoglodziņi tiek teleportēti ārpus tās, arī katras izvēlnes `SkinScope` ietinumā un pašā dialoglodziņa kartē, tāpēc tokeni seko katrai virsmai.

### Forma {#shape}

Seši karogi nosaka, kuri noteikumu kopumi tiek piemēroti; tokeni tos krāso:

| karogs | vērtības | ko tas pārslēdz |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbar paaugstinājums + bez iekšējās matiņlīnijas pret plakanu tonētu joslu |
| `groups` | `box` · `flat` | rīkjoslas sadaļas kā paaugstinātas **VBtnGroup** kastes (0.3.2 iezīmējums: savienotas pogas, grupas tokeni krāso kasti) pret vienkāršām flex div rindām |
| `buttons` | `vuetify` · `quiet` | dabiskas Vuetify pogas pret spoku pogām ar neitrālu nospiesto stāvokli |
| `bubble` | `card` · `flat` | paturēts saderībai: burbuļa izvēlnes abās formās ir viena tokeniem krāsota ikonu pogu rinda (to pogas seko `buttons`) |
| `dialog` | `classic` · `soft` | šķirtne zem virsraksta, paaugstināta aizvēršanas poga pret maigu karti, teksta aizvēršanas poga |
| `menu` | `vuetify` · `soft` | nolaižamās izvēlnes: Vuetify saraksts pret gaišu atkāpēm bagātu karti |

Atrisinātā forma ir kodēta redaktora saknē kā seši `.tiptapify-shape-{flag}-{value}` klases un pieejama kā `shape: ComputedRef<ResolvedShape>` objektā [`useTiptapifyConfig()`](/lv/api/types#usetiptapifyconfig) pielāgotiem rīkjoslas komponentiem.

### Extends {#extends}

Apvalks tiek atrisināts virs klasiskās bāzes, tad tā `extends` ķēde no saknes, tad paša locekļi:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Trūkstošas saites tiek atrisinātas uz uzkrāto ķēdi (ar izstrādes brīdinājumu); cikls tiek atrisināts uz classic (ar izstrādes brīdinājumu). Uz reģistrētu apvalku atsaucas pēc nosaukuma; iekļauts apvalka objekts var `extends` reģistrētu nosaukumu un nekad nenonāk globālajā reģistrā — pielāgoti apvalki nekad nenoplūst starp redaktoriem. Nezināmas tokenu atslēgas tiek ignorētas ar izstrādes brīdinājumu.

Visu triju formu dzīvās demonstrācijas ir [apvalku piemēru lapā](/lv/examples/skins).

## Tokenu katalogs {#token-catalog}

Tabulas zemāk ir **v1 līgums**: kataloga atslēgas (`TiptapifySkinColors` / `TiptapifySkinMetrics`) ir nosaukumi, ko varat iestatīt. Klasiskās šūnas ir CSS rezerves vērtības — vērtība, ko bāzes noteikumi krāso, kad neviens apvalks tokenu nepārraksta.

### Rīkjosla / josla {#toolbar-bar}

| tokens | CSS mainīgais | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Elementi / grupas / atdalītāji {#items-groups-dividers}

| tokens | CSS mainīgais | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify elevation 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (atstarpe: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Izmērītā klasiskā šūna ir `normal` — Vuetify dabiskā flex vērtība, ko nes CSS rezerves vērtība. Kataloga bāzes vērtība `0px` ir līdzvērtīgs skaidrs garums apvalka pārrakstījumiem.

<a id="shadow-cells"></a>² Šūnas, kurās rakstīts “Vuetify elevation *n*”, ir aprakstošas: precīzā trīskāršās ēnas virkne ir izmērītā vērtība iekomitētajā pamatlīmeņa fiksētajā datu failā (`src/skins/__fixtures__/skin-baseline.json`) un ir CSS rezerves vērtība. Priekš `groupShadow` tā ir **elevation 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — ar `groups: 'box'` sadaļa ir VBtnGroup (`elevation="4"`), un tokena noteikums krāso kasti ar šo trijotni virs grupas paša paaugstinājuma: kaste pieder paaugstinājumam, savienotajām bērnu pogām tā nav.

### Pogas {#buttons}

Šie tokeni tiek izmantoti **tikai ar `buttons: 'quiet'`** — skatiet [Sasniedzamība](#reachability).

| tokens | CSS mainīgais | quiet vērtība (classic: dabiskais Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Burbuļa izvēlnes (atlase, tukša rinda, attēls) {#bubble-menus-selection-empty-line-image}

| tokens | CSS mainīgais | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | tāpat |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | tāpat |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | tāpat |

### Nolaižamās izvēlnes {#dropdown-menus}

| tokens | CSS mainīgais | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify elevation 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Klasiskās izvēlnes **saraksta** kaste (rādiuss, ēna, saraksta atkāpe) šobrīd ir apvalka noteikums — `SkinScope` tokenu ietinums atrodas starp paša Vuetify bērna noteikumu un sarakstu, tāpēc bibliotēka šos pikseļus atjauno kā apvalka noteikumus, kas nolasa iepriekš minētos tokenus. **Elementu** pikseļi paliek dabiskie Vuetify (fiksētais datu fails mēra Vuetify noklusējumus): četri elementu tokeni ir neaktīvi, kamēr `menu: 'vuetify'`.

### Dialoglodziņi {#dialogs}

| tokens | CSS mainīgais | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard elevation [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | lauka noklusējums (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Ietvars (redaktora apmales ietinums) {#frame-editor-border-wrapper}

| tokens | CSS mainīgais | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, bez augšējās malas | pilna apmale |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Ar plakano rīkjoslas formu ietvars krāso arī katras puses starpību (augšējo malu un apakšējo malu ar 1,6× apmales necaurredzamību). Šī starpība pieder formai, nevis tokenam: tā nav sasniedzama ar tokenu.

### Attēli un izmēra maiņas turi {#images-and-resize-handles}

| tokens | CSS mainīgais | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (atlasīts) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (hover) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Attēla rīkjosla seko karogam `buttons`: ar quiet formu tā iegūst quiet virsmu — tās 2px/4px atstarpes nolasa `--tf-bubble-gap` / `--tf-bubble-padding` ar attēla izvēlnes rezerves vērtībām; īpaša attēla rīkjoslas tokena nav.

### Nav katalogā (izejas teritorija) {#not-in-the-catalog-escape-hatch-territory}

Dažiem dizaina pārskatā minētajiem izmēriem v1 katalogā nav tokena: **rīkjoslas augstums, ietvara platums, ietvara rādiuss, pogas platums, pogas atkāpe, dialoglodziņa platums**. Kataloga tabulas iepriekš ir līgums; šiem pikseļiem atveriet [izeju](#escape-hatch-the-root-class) un stilizējiet stabilās klases tieši.

## Sasniedzamība {#reachability}

Līgums, ko nosaka vienreiz un ievēro katra iepriekš minētā grupa:

> Tokens krāso virsmu tikai tad, ja forma šo virsmu aktivizē; dabiskie Vuetify vizuālie elementi tiek stilizēti ar Vuetify tēmas krāsām.

Pa grupām:

- **Rīkjosla, ietvars, attēla/turu čaula** — aktīvi katrā formā; tokeni tos krāso, klasiskās šūnas ir dabiskais izskats, uz ko tokeni atkāpjas.
- **Grupu kaste** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — ar `groups: 'box'` sadaļa ir VBtnGroup (0.3.2 struktūra: pogas savienojas, kaste nes paaugstinājumu); kastes noteikumi to krāso ar grupu tokeniem, un `--tf-group-height` saglabā 32px līgumu ar `!important` (Vuetify blīvuma noteikums tam pretojas, kā 0.3.2). Ar `groups: 'flat'` sadaļas ir vienkāršas div rindas (caurspīdīgas, bez ēnas, rādiuss 0 ir formas bāze).
- **Atdalītāju matiņlīnijas** (`dividerWidth/Height/Color`) — redzamā matiņlīnija ir `groups: 'flat'` iespēja; kastes formā atdalītājs ir nulles izmēra atstarpe (`margin: 0 4px` no bāzes noteikuma).
- **Elementu atkāpes/atstarpes** — kompaktā `6px 8px` rinda ir saistīta ar plakano joslu (`toolbar: 'flat'`), grupu atstarpes — ar plakanajām sadaļām (`groups: 'flat'`); paaugstinātā josla saglabā klasiskās metrikas.
- **Pogas** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — neaktīvas ar `buttons: 'vuetify'`: dabiskās Vuetify pogas krāso savus stāvokļus pašas. Stilizējiet tās ar Vuetify tēmas krāsām (`primary`, `surface`, …) — klasiskās formas tās tīši mantojas.
- **Izvēlņu elementu metrikas** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — neaktīvas ar `menu: 'vuetify'`; Vuetify pieder šie elementu pikseļi. Izvēlnes **saraksta** kaste (rādiuss/ēna/atkāpe) abās formās ir apvalka krāsota (skatiet [izvēlnes piezīmi](#menu-classic-note)).
- **Dialoglodziņa maigā čaula** (`dialogActionBtn*`, `dialogFieldRadius`, maigās atkāpes, trūkstošā šķirtne) — krāsota ar `dialog: 'soft'`; ar `dialog: 'classic'` dialoglodziņš ir VCard ar klasiskajām atkāpēm.
- **Burbuļa čaula** — atlases, tukšās rindas un attēla izvēlnes abās formās ir viena ikonu pogu rinda, ko krāso burbuļa tokeni; `bubble` vairs nemaina to iezīmējumu.

Pārrakstījums, kas vienāds ar kataloga bāzi, **netiek izvadīts** — ar nenoklasisku formu pašas formas bāze krāso ar CSS rezerves vērtību, tāpēc klasiskas vērtības “atjaunošana” (piemēram, `buttonActiveBg` atiestatīšana uz `rgb(var(--v-theme-primary))` ar `buttons: 'quiet'`) klusi neko nedara. Lai nenoklasiskā formā piespiestu klasiski izskatīgu vērtību, iestatiet pārrakstījumu, kas atšķiras no kataloga bāzes — līdzvērtīgs burtisks apzīmējums, piemēram, `rgba(var(--v-theme-primary), 1)`, krāso identiski un iztur izlaišanu.

Tokeni tīši nav pieslēgti dabiskajiem ceļiem — tieši tas saglabā `default` pikseļu ziņā identisku klasiskajam izskatam, kamēr viss iet caur katalogu.

## Receptes {#recipes}

### Paplašināt pastel {#extend-pastel}

Pārmantojiet quiet formu un pārkrāsojiet dažas virsmas. Reģistrēti nosaukumi darbojas jebkuram redaktoram:

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

Forma (flat/quiet/soft) nāk no pastel; neskarti tokeni saglabā pastel vērtības — quiet pogu fons paliek neitrāls, mainās tikai tas, ko pārrakstāt. Šis ir apvalks, kas dzīvi renderēts [piemēru lapā](/lv/examples/skins#custom-mint).

### Paplašināt default {#extend-default}

Saglabājiet klasisko struktūru, pielāgojiet krāsojumu:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` ir netiešā sakne, tāpēc atslēgu var izlaist: `{ toolbar: 'flat', … }` arī sākas no classic.

### Pilnīgi pielāgots {#full-custom}

Bez `extends`, bez reģistrācijas: nododiet objektu rekvizītam `skin` un brīvi iestatiet formas karogus un tokenus. Ar `name` uz saknes klases uzliekat savu etiķeti (skatiet zemāk); bez tā tā ir `tiptapify-skin-inline`.

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

`defineSkin` ir identitātes palīgfunkcija tipizētām konstantu definīcijām (tā nenonāk nevienā reģistrā). Formas karogus var iestatīt atsevišķi — katrs izlaistais karogs paliek klasisks.

## Izeja: saknes klase {#escape-hatch-the-root-class}

Katra redaktora sakne nes `tiptapify-skin-{name}` (`tiptapify-skin-inline` beznosaukuma iekļautam objektam). Bibliotēka **nekad neveido nevienu noteikumu pēc apvalka nosaukuma** — klase ir jūsu:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Stabilie āķi, pret kuriem rakstīt:

| klase | kur |
|---|---|
| `tiptapify-skin-{name}` | redaktora sakne |
| `tiptapify-shape-{flag}-{value}` ×6 | redaktora sakne — atrisinātā forma |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | rīkjosla un tās sadaļas |
| `tiptapify-quiet-buttons` | rīkjoslas un burbuļa saknes ar `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | katras burbuļa izvēlnes rinda un matiņlīnija starp tās grupām |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | atlases, tukšās rindas un attēla izvēlņu rindas |
| `tiptapify-btn--active` | burbuļa izvēlnes nospiesta poga (aktīva iezīme, attēla peldēšana) |
| `tiptapify-menu` · `tiptapify-menu--soft` | nolaižamās izvēlnes pārklājuma saturs, maigo izvēlnes noteikumu nesējs |
| `tiptapify-skin-scope` | tokenu tvēruma div teleportētajās izvēlnēs |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | dialoglodziņa karte un tās maigais nesējs |
| `tiptapify-frame` | redaktora apmales ietinums |

**Aizsardzība pret patērētāja tēmu.** Apvalku slānis ir veidots tā, lai pārdzīvotu administratora tēmas, kas Vuetify iekšienē pievieno atkāpes un pārkrāso: noteikumi tiek saistīti ar formas/nesēja klasēm, specifiskumam izmanto dubultotas klases (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) un `!important` patur tikai tur, kur bāzes komita administratora tēmas gadījums pierādīja, ka tas ir nepieciešams (menu.css aizsardzības kopa). Konvencijas, kas jūsu pašu pārrakstījumus uztur darbībā uz tā paša kaujas lauka:

- ierobežojiet savu CSS zem `.tiptapify-skin-{name}` (vai formas klases) — nekad uz kailiem Vuetify iekšējiem elementiem;
- kataloga izmēriem dodiet priekšroku tokeniem (`--tf-*`), pārējam — klasēm;
- pārrakstot Vuetify komponentus, atbilstiet dubultošanai (viens `.v-list-item` zaudē apvalka noteikumiem).

## Vizuālais līgums (piezīme līdzdalībniekiem) {#visual-contract-contributor-note}

Iebūvēto apvalku aprēķinātos stilus fiksē pamatlīmeņa datu fails `src/skins/__fixtures__/skin-baseline.json` (13 sadaļas × gaišs/tumšs): CSS slānis ir pabeigts, kad izmērītā matrica tam atbilst. Piezīmes par datu faila lasīšanu:

- Hover/active izmērus nevar piespiest no lapas, tāpēc ieraksts nolasa **pirmā trāpījuma CSSOM noteikuma deklarācijas tekstu** katram hover selektoram un atrisina to caur zondes elementu apvalka saknē (lauks `resolved`) — tas ir uzvarējušā noteikuma līgums, nevis dzīvs `:hover` momentuzņēmums.
- `_meta.selectors.menu` ieraksta selektora tekstu pirms `SkinScope`. Datu fails ir iesaldēts (normatīvas vērtības), tāpēc lauks ir novecojis ar nodomu; ierakstu kopa fiksē pašreizējo selektoru.
- Datu fails savas sankcionētās izmaiņas nes `_meta.notes`: 2026-10-18 VBtnGroup iezīmējuma atjaunošana ar `groups: 'box'` atkārtoti izmērīja klasiskos `groupBtn`/`buttonsActive` bērnu pogu laukus (savienoti stūri, kaste pieder paaugstinājumam). Pastel lauki nav skarti — apzināta vizuāla izmaiņa atjaunina tikai skartās klasiskās šūnas, ieraksta piezīmi un nāk ar CHANGELOG rindu.

## Skatiet arī {#see-also}

- [Apvalku piemēri](/lv/examples/skins) — classic, pastel un pielāgotais mint apvalks, dzīvi.
- [rekvizīts `skin`](/lv/api/props#skin) · [apvalku tipi](/lv/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/lv/api/types#tiptapifyskininput).
