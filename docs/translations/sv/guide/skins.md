# Skins {#skins}

En **skin** är ett utseende för redigerarens gränssnitt: verktygsfältet, knapparna och grupperna i det, bubbelmenyerna, rullgardinsmenyerna, dialogerna, ramen runt innehållet och bildmarkeringens gränssnitt. Propen `skin` väljer den:

```vue
<Tiptapify skin="pastel" />
```

Ett skin består av två delar: **tokens** (färger och storlekar som CSS-variabler) och **form** (strukturella varianter som en token inte kan uttrycka). De två inbyggda skinnen är `default` — det klassiska utseendet, ett upphöjt verktygsfält med upphöjda knappgrupper — och `pastel`, det lugna utseendet. Egna skin är likvärdiga: `registerSkin()` och inline-skinobjekt löses upp genom exakt samma mekanism, och de inbyggda skinnen är registrerade skin, inte specialfall.

## Terminologi: skin kontra Vuetify-tema {#terminology-skin-vs-vuetify-theme}

- **skin** — den användarvända termen för ett utseende på redigerarens gränssnitt: tokens + form. Propen är `skin`, typerna är `TiptapifySkin*`, registret är `registerSkin()`, rotklassen är `tiptapify-skin-{name}`.
- **tema** — reserverat för Vuetifys ljusa/mörka teman. Tiptapify-komponenter låter sina `theme`-props matas från Vuetifys aktuella temanamn; skinsystemet rör dem aldrig.

De samverkar: de flesta inbyggda tokenfärger refererar till Vuetify-temavariabler (`rgb(var(--v-theme-surface))`, …), så skinsen följer ljust/mörkt automatiskt. De fast mörka cellerna i den klassiska kolumnen — storleksändringshandtaget (`rgba(0, 0, 0, .5/.8)`), den enkla bildkonturen, bubbelskuggan och menyernas/dialogernas elevationsskuggor — är medvetna: det klassiska utseendet målar neutralt mörkt gränssnitt i båda teman, och den uppmätta baslinjen fastlåser dem. En egen skin kan fritt referera till temavariabler — se tokentabellen.

## Koncept {#concept}

### Tokens {#tokens}

En token är en CSS custom property med namnet `--tf-*`. Katalognyckeln är camelCase-formen av CSS-suffixet: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Värdena är vanliga strängar — färger, fullständiga border-förkortningar, skuggor, utfyllnader, radier.

Varje skinregel i biblioteket finns **en gång** och läser sin token med en reserv som är lika med det klassiska (bas)värdet:

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

En upplöst skin skickar bara ut sina **åsidosättningar** som variabler; CSS-reserverna bär basen. Variablerna hamnar på redigerarens rot — och, eftersom menyer och dialoger teleporteras ut från den, på varje menys `SkinScope`-omslag och på själva dialogkortet, så att tokens följer varje yta.

### Form {#shape}

Sex flaggor avgör vilka regeluppsättningar som gäller; tokens målar dem:

| flagga | värden | vad den växlar |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbar-elevation + ingen inre hårlinje kontra ett platt, tonat fält |
| `groups` | `box` · `flat` | verktygsfältssektioner som upphöjda **VBtnGroup**-lådor (markup från 0.3.2: sammanfogade knappar, grupptokens målar lådan) kontra vanliga flex-div-rader |
| `buttons` | `vuetify` · `quiet` | inbyggda Vuetify-knappar kontra spökknappar med ett neutralt nedtryckt läge |
| `bubble` | `card` · `flat` | kvar av kompatibilitetsskäl: bubbelmenyerna är en tokenmålad rad med ikonknappar i båda formerna (deras knappar följer `buttons`) |
| `dialog` | `classic` · `soft` | avdelare under titeln, upphöjd stängning kontra mjukt kort, textstängning |
| `menu` | `vuetify` · `soft` | rullgardinsmenyer: Vuetify-lista kontra det ljusa kortet med utfyllnad |

Den upplösta formen kodas på redigerarens rot som sex klasser `.tiptapify-shape-{flag}-{value}`, och exponeras som `shape: ComputedRef<ResolvedShape>` på [`useTiptapifyConfig()`](/sv/api/types#usetiptapifyconfig) för anpassade verktygsfältskomponenter.

### Extends {#extends}

En skin löses upp över den klassiska basen, därefter dess `extends`-kedja med roten först, och sist dess egna medlemmar:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Saknade länkar löses upp till den ackumulerade kedjan (med en dev-varning); en cykel löses upp till classic (med en dev-varning). En registrerad skin refereras med namn; ett inline-skinobjekt kan `extends` ett registrerat namn och hamnar aldrig i det globala registret — egna skins läcker aldrig mellan redigerare. Okända tokennycklar ignoreras med en dev-varning.

Liveexempel på alla tre formerna finns på [sidan med Skins-exempel](/sv/examples/skins).

## Tokenkatalog {#token-catalog}

Tabellerna nedan är **v1-kontraktet**: katalognycklarna (`TiptapifySkinColors` / `TiptapifySkinMetrics`) är de namn du kan sätta. Klassiska celler är CSS-reserverna — värdet som basreglerna målar när ingen skin åsidosätter token.

### Verktygsfält / fält {#toolbar-bar}

| token | CSS-variabel | klassisk | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Objekt / grupper / avdelare {#items-groups-dividers}

| token | CSS-variabel | klassisk | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify-elevation 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (avståndshållare: marginal `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Den uppmätta klassiska cellen är `normal` — Vuetifys inbyggda flex-värde, vilket är det CSS-reserven bär. Katalogens basvärde `0px` är den motsvarande uttryckliga längden för skinåsidosättningar.

<a id="shadow-cells"></a>² Celler som lyder "Vuetify-elevation *n*" är beskrivande: den exakta trippelskuggsträngen är det uppmätta värdet i den incheckade baslinjefixturen (`src/skins/__fixtures__/skin-baseline.json`) och är CSS-reserven. För `groupShadow` är det **elevation 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — under `groups: 'box'` är sektionen en VBtnGroup (`elevation="4"`), och tokenregeln målar lådan med den här trippeln över gruppens egen elevation: lådan äger elevationen, de sammanfogade barnknapparna har ingen.

### Knappar {#buttons}

Dessa tokens används **bara under `buttons: 'quiet'`** — se [Nåbarhet](#reachability).

| token | CSS-variabel | quiet-värde (classic: inbyggd Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Bubbelmenyer (markering, tom rad, bild) {#bubble-menus-selection-empty-line-image}

| token | CSS-variabel | klassisk | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | samma |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | samma |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | samma |

### Rullgardinsmenyer {#dropdown-menus}

| token | CSS-variabel | klassisk | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify-elevation 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Den klassiska menyns **list**-ruta (radie, skugga, listutfyllnad) är en skinregel idag — `SkinScope`-tokenomslaget sitter mellan Vuetifys egen barnregel och listan, så biblioteket återställer de pixlarna som skinregler som läser tokens ovan. **Objekt**-pixlarna förblir inbyggda Vuetify (fixturen mäter Vuetifys standardvärden där): de fyra objekttokens är overksamma medan `menu: 'vuetify'`.

### Dialoger {#dialogs}

| token | CSS-variabel | klassisk | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard-elevation [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | standardfält (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Ram (redigerarens kantomslag) {#frame-editor-border-wrapper}

| token | CSS-variabel | klassisk | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, ingen överkant | full ram |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Under den platta verktygsfältsformen målar ramen också ett delta per sida (en överkant och nederkanten med 1,6× kantopacitet). Det deltat hör till formen, inte till en token: det är inte nåbart via token.

### Bilder och storleksändringshandtag {#images-and-resize-handles}

| token | CSS-variabel | klassisk | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (markerad) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (hovring) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Bildverktygsfältet följer flaggan `buttons`: under den lugna formen får det den lugna ytan — dess 2px/4px-avstånd läser `--tf-bubble-gap` / `--tf-bubble-padding` med bildmenyns reserver; det finns ingen dedikerad token för bildverktygsfältet.

### Inte i katalogen (nödutgångsterritorium) {#not-in-the-catalog-escape-hatch-territory}

Vissa dimensioner som nämns i designöversikten har ingen katalogtoken i v1: **verktygsfältets höjd, ramens bredd, ramens radie, knappens bredd, knappens utfyllnad, dialogens bredd**. Katalogtabellerna ovan är kontraktet; för dessa pixlar öppna [nödutgången](#escape-hatch-the-root-class) och stilsätt de stabila klasserna direkt.

## Nåbarhet {#reachability}

Kontraktet, angivet en gång och efterlevt av varje grupp ovan:

> En token målar en yta bara när formen aktiverar den ytan; inbyggda Vuetify-visuella element stilsätts via Vuetifys temafärger.

Per grupp:

- **Verktygsfält, ram, bild-/handtagsgränssnitt** — aktiva i varje form; tokens målar dem, de klassiska cellerna är det inbyggda utseende som tokens faller tillbaka på.
- **Grupplåda** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — under `groups: 'box'` är sektionen en VBtnGroup (struktur från 0.3.2: knapparna sammanfogas, lådan bär elevationen); lådreglerna målar den med grupptokens, och `--tf-group-height` håller 32px-kontraktet med en `!important` (Vuetifys densitetsregel kämpar emot, som i 0.3.2). Under `groups: 'flat'` är sektionerna vanliga div-rader (transparenta, utan skugga, radie 0 är formens bas).
- **Avdelarnas hårlinjer** (`dividerWidth/Height/Color`) — den synliga hårlinjen är en finess för `groups: 'flat'`; i lådformen är avdelaren en avståndshållare utan storlek (`margin: 0 4px` från basregeln).
- **Objektens utfyllnad/avstånd** — den kompakta raden `6px 8px` är kopplad till det platta fältet (`toolbar: 'flat'`), gruppavstånden till de platta sektionerna (`groups: 'flat'`); det upphöjda fältet behåller de klassiska måtten.
- **Knappar** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — overksamma under `buttons: 'vuetify'`: de inbyggda Vuetify-knapparna målar sina egna tillstånd. Stilsätt dem med Vuetifys temafärger (`primary`, `surface`, …) — de klassiska formerna ärver dem medvetet.
- **Menyobjektens mått** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — overksamma under `menu: 'vuetify'`; Vuetify äger de objektpixlarna. Menyns **list**-ruta (radie/skugga/utfyllnad) är skinmålad i båda formerna (se [menyanteckningen](#menu-classic-note)).
- **Dialogens mjuka gränssnitt** (`dialogActionBtn*`, `dialogFieldRadius`, de mjuka utfyllnaderna, den saknade avdelaren) — målas under `dialog: 'soft'`; under `dialog: 'classic'` är dialogen ett VCard med de klassiska utfyllnaderna.
- **Bubbelgränssnitt** — markeringens, tomradens och bildens menyer är en rad med ikonknappar i båda formerna, målade av bubbeltokens; `bubble` ändrar inte längre deras markup.

En åsidosättning som är lika med katalogbasen **skickas inte ut** — under en icke-klassisk form målar formens egen bas via CSS-reserven, så att "återställa" ett klassiskt värde (t.ex. sätta `buttonActiveBg` tillbaka till `rgb(var(--v-theme-primary))` under `buttons: 'quiet'`) tyst inte gör något. För att tvinga fram ett klassiskt utseende under en icke-klassisk form, sätt en åsidosättning som skiljer sig från katalogbasen — en likvärdig literal som `rgba(var(--v-theme-primary), 1)` målar identiskt och överlever hoppet.

Tokens kopplas medvetet inte in i inbyggda vägar — det är vad som håller `default` pixelidentisk med det klassiska utseendet medan allt går via katalogen.

## Recept {#recipes}

### Utöka pastel {#extend-pastel}

Ärv den lugna formen och måla om några ytor. Registrerade namn fungerar på vilken redigerare som helst:

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

Formen (flat/quiet/soft) kommer från pastel; orörda tokens behåller pastels värden — den lugna knapptonen förblir neutral, bara det du åsidosätter flyttas. Det här är skinen som renderas live på [exempelsidan](/sv/examples/skins#custom-mint).

### Utöka default {#extend-default}

Behåll den klassiska strukturen, justera färgerna:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` är den implicita roten, så nyckeln kan utelämnas: `{ toolbar: 'flat', … }` utgår också från classic.

### Helt egen {#full-custom}

Ingen `extends`, ingen registrering: skicka objektet till propen `skin` och sätt formflaggor och tokens fritt. Ett `name` sätter din egen etikett på rotklassen (se nedan); utan ett är den `tiptapify-skin-inline`.

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

`defineSkin` är en identitetshjälpare för typade const-definitioner (den hamnar inte i något register). Formflaggor kan sättas individuellt — varje flagga du utelämnar förblir classic.

## Nödutgång: rotklassen {#escape-hatch-the-root-class}

Varje redigerarrot har `tiptapify-skin-{name}` (`tiptapify-skin-inline` för ett namnlöst inline-objekt). Biblioteket **kopplar aldrig någon regel till ett skinnamn** — klassen är din:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

De stabila krokarna att skriva mot:

| klass | var |
|---|---|
| `tiptapify-skin-{name}` | redigerarens rot |
| `tiptapify-shape-{flag}-{value}` ×6 | redigerarens rot — den upplösta formen |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | verktygsfältet och dess sektioner |
| `tiptapify-quiet-buttons` | verktygsfälts- och bubbelrötter under `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | raden i varje bubbelmeny och hårlinjen mellan dess grupper |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | raderna för markeringens, tomradens och bildens meny |
| `tiptapify-btn--active` | en nedtryckt knapp i en bubbelmeny (en aktiv markering, bildens flytläge) |
| `tiptapify-menu` · `tiptapify-menu--soft` | innehållet i rullgardinens överlägg, bäraren av de mjuka menyreglerna |
| `tiptapify-skin-scope` | token-scope-diven inuti teleporterade menyer |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | dialogkortet och dess mjuka bärare |
| `tiptapify-frame` | redigerarens kantomslag |

**Försvar mot konsumentteman.** Skinlagret är byggt för att överleva admin-teman som lägger utfyllnad på och målar om Vuetifys interna delar: reglerna kopplas till form-/bärarklasser, använder dubblerade klasser (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) för specificitet och behåller `!important` bara där basincheckningens admin-temafall visade att det var nödvändigt (menu.css-försvarsuppsättningen). Konventioner som får dina egna åsidosättningar att fungera på samma slagfält:

- begränsa din CSS under `.tiptapify-skin-{name}` (eller en formklass) — aldrig på bara Vuetify-interna delar;
- föredra tokens (`--tf-*`) för katalogdimensionerna, klasser för resten;
- matcha dubbleringen när du åsidosätter Vuetify-komponenter (en enda `.v-list-item` förlorar mot skinreglerna).

## Visuellt kontrakt (anteckning för bidragsgivare) {#visual-contract-contributor-note}

De beräknade stilarna för de inbyggda skinsen fastlåses av baslinjefixturen `src/skins/__fixtures__/skin-baseline.json` (13 sektioner × ljust/mörkt): CSS-lagret är klart när den uppmätta matrisen stämmer med den. Läsanteckningar för fixturen:

- Hover-/aktiva dimensioner kan inte tvingas fram från sidan, så inspelningen läser **deklarationstexten i den första träffande CSSOM-regeln** för varje hover-selektor och löser upp den via ett probe-element inuti skinroten (fältet `resolved`) — det är den vinnande regelns kontrakt, inte en live-ögonblicksbild av `:hover`.
- `_meta.selectors.menu` registrerar selektortexten från före `SkinScope`. Fixturen är fryst (normativa värden), så fältet är medvetet föråldrat; inspelningspaketet fastlåser den aktuella selektorn.
- Fixturen bär sina godkända ändringar i `_meta.notes`: återställningen 2026-10-18 av VBtnGroup-markupen under `groups: 'box'` mätte om de klassiska barnknappsfälten `groupBtn`/`buttonsActive` (sammanfogade hörn, lådan äger elevationen). Pastelfälten är orörda — en medveten visuell ändring uppdaterar bara de berörda klassiska cellerna, registrerar en anteckning och levererar en rad i CHANGELOG.

## Se även {#see-also}

- [Skins-exempel](/sv/examples/skins) — classic, pastel och den egna mint-skinen, live.
- [`skin`-propen](/sv/api/props#skin) · [skintyper](/sv/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/sv/api/types#tiptapifyskininput).
