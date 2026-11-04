# Skinn {#skins}

Et **skin** er ett utseende på editorens ramme: verktøylinjen, knappene og gruppene i den, boblemenyene, nedtrekksmenyene, dialogene, rammen rundt innholdet og markeringsrammen rundt bilder. `skin`-prop-en velger det:

```vue
<Tiptapify skin="pastel" />
```

Et skin består av to ting: **tokens** (farger og størrelser som CSS-variabler) og **form** (strukturelle varianter som en token ikke kan uttrykke). De to innebygde skinnene er `default` — det klassiske utseendet, en hevet verktøylinje med hevede knappegrupper — og `pastel`, det rolige utseendet. Egendefinerte skin er likeverdige: `registerSkin()` og inline-skinobjekter løses opp gjennom nøyaktig samme mekanisme, og de innebygde skinnene er registrerte skin, ikke spesialtilfeller.

## Terminologi: skin vs Vuetify-tema {#terminology-skin-vs-vuetify-theme}

- **skin** — brukerbegrepet for ett utseende på editorens ramme: tokens + form. Prop-en er `skin`, typene er `TiptapifySkin*`, registeret er `registerSkin()`, rotklassen er `tiptapify-skin-{name}`.
- **tema** — forbeholdt Vuetifys lyse/mørke temaer. Tiptapify-komponentene holder `theme`-prop-ene sine matet fra Vuetifys gjeldende temanavn. Skinn-systemet rører dem aldri.

De samspiller: de fleste innebygde tokenfarger refererer til Vuetify-temavariabler (`rgb(var(--v-theme-surface))`, …), så skinnene følger lys/mørk automatisk. De fast mørke cellene i den klassiske kolonnen — håndtaket for størrelsesendring (`rgba(0, 0, 0, .5/.8)`), den vanlige bildekonturen, boblens skygge og elevasjonsskyggene til menyer/dialoger — er bevisste: det klassiske utseendet maler nøytral mørk ramme i begge temaene, og den målte grunnlinjen fester dem. Et egendefinert skin kan fritt referere til temavariabler — se tokentabellen.

## Konsept {#concept}

### Tokens {#tokens}

Et token er en CSS custom property med navn `--tf-*`. Katalognøkkelen er camelCase av CSS-suffikset: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Verdiene er rene strenger — farger, fulle border-shorthands, skygger, padding, radier.

Hver skinnregel i biblioteket finnes **én gang** og leser tokenet sitt med en fallback lik den klassiske (basis-)verdien:

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Et løst skin sender bare ut **overstyringene** sine som variabler. CSS-fallbackene bærer basisen. Variablene havner på editorroten — og, fordi menyer og dialoger teleporteres ut av den, på hver menys `SkinScope`-wrapper og på selve dialogkortet, slik at tokenene følger hver flate.

### Form {#shape}

Seks flagg avgjør hvilke regelsett som gjelder, og tokenene maler dem:

| flagg | verdier | hva det bytter |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbar-elevasjon + ingen indre hårstrek vs flat tonet linje |
| `groups` | `box` · `flat` | verktøylinjeseksjoner som hevede **VBtnGroup**-bokser (0.3.2-markup: sammenføyde knapper, gruppetokenene maler boksen) vs vanlige flex-div-rekker |
| `buttons` | `vuetify` · `quiet` | native Vuetify-knapper vs spøkelsesknapper med nøytral trykket tilstand |
| `bubble` | `card` · `flat` | beholdt for kompatibilitet: boblemenyene er én token-malt rad med ikonknapper i begge former (knappene deres følger `buttons`) |
| `dialog` | `classic` · `soft` | skillelinje under tittelen, hevet lukkeknapp vs mykt kort, tekstlukking |
| `menu` | `vuetify` · `soft` | nedtrekksmenyer: Vuetify-liste vs det lette kortet med padding |

Den løste formen er kodet på editorroten som seks `.tiptapify-shape-{flag}-{value}`-klasser, og eksponert som `shape: ComputedRef<ResolvedShape>` på [`useTiptapifyConfig()`](/no/api/types#usetiptapifyconfig) for egendefinerte verktøylinjekomponenter.

### Extends {#extends}

Et skin løses over den klassiske basisen, deretter `extends`-kjeden sin med roten først, deretter sine egne medlemmer:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Manglende ledd løses til den akkumulerte kjeden (med en utviklingsadvarsel). En syklus løses til klassisk (med en utviklingsadvarsel). Et registrert skin refereres til med navn. Et inline skin-objekt kan `extends` et registrert navn og havner aldri i det globale registeret — egendefinerte skinn lekker aldri mellom editorer. Ukjente tokennøkler ignoreres med en utviklingsadvarsel.

Live-demoer av alle tre formene finnes på [eksempelsiden for skinn](/no/examples/skins).

## Tokenkatalog {#token-catalog}

Tabellene nedenfor er **v1-kontrakten**: katalognøklene (`TiptapifySkinColors` / `TiptapifySkinMetrics`) er navnene du kan sette. De klassiske cellene er CSS-fallbackene — verdien basisreglene maler når ingen skin overstyrer tokenet.

### Verktøylinje / linje {#toolbar-bar}

| token | CSS-variabel | klassisk | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Elementer / grupper / skillelinjer {#items-groups-dividers}

| token | CSS-variabel | klassisk | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify-elevasjon 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (avstandsstykke: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Den målte klassiske cellen er `normal` — Vuetifys native flex-verdi, som er det CSS-fallbacken bærer. Katalogens basisverdi `0px` er den tilsvarende eksplisitte lengden for skinnoverstyringer.

<a id="shadow-cells"></a>² Celler som leser «Vuetify elevation *n*» er beskrivende: den eksakte trippelskygge-strengen er den målte verdien i den innsjekkede grunnlinjefiksturen (`src/skins/__fixtures__/skin-baseline.json`) og er CSS-fallbacken. For `groupShadow` er det **elevasjon 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — under `groups: 'box'` er seksjonen en VBtnGroup (`elevation="4"`), og tokenregelen maler boksen med denne trippelen over gruppens egen elevasjon: boksen eier elevasjonen, de sammenføyde knappene har ingen.

### Knapper {#buttons}

Disse tokenene brukes **bare under `buttons: 'quiet'`** — se [Reachability](#reachability).

| token | CSS-variabel | rolig verdi (klassisk: native Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Boblemenyer (utvalg, tom linje, bilde) {#bubble-menus-selection-empty-line-image}

| token | CSS-variabel | klassisk | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | samme |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | samme |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | samme |

### Nedtrekksmenyer {#dropdown-menus}

| token | CSS-variabel | klassisk | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify-elevasjon 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ **Liste**-boksen (radius, skygge, listepadding) i den klassiske menyen er en skinnregel i dag — `SkinScope`-token-wrapperen sitter mellom Vuetifys egen barneregel og listen, så biblioteket gjenoppretter disse pikslene som skinnregler som leser tokenene ovenfor. **Element**-pikslene forblir native Vuetify (fiksturen måler Vuetify-standardene der): de fire elementtokenene er inerte mens `menu: 'vuetify'`.

### Dialoger {#dialogs}

| token | CSS-variabel | klassisk | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard-elevasjon [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | feltstandard (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Ramme (rammen rundt editoren) {#frame-editor-border-wrapper}

| token | CSS-variabel | klassisk | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, ingen toppkant | full kant |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Under den flate verktøylinjeformen maler rammen også et delta per side (en toppkant, og bunnkanten ved 1,6× kantopasitet). Det deltaet tilhører formen, ikke et token: det kan ikke nås via tokens.

### Bilder og håndtak for størrelsesendring {#images-and-resize-handles}

| token | CSS-variabel | klassisk | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (valgt) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (hover) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Bildeverktøylinjen følger `buttons`-flagget: under den rolige formen får den den rolige flaten — avstandene på 2px/4px leser `--tf-bubble-gap` / `--tf-bubble-padding` med bildemenyens fallbacker. Det finnes ikke noe dedikert token for bildeverktøylinjen.

### Ikke i katalogen (nødutgangsterritorium) {#not-in-the-catalog-escape-hatch-territory}

Noen dimensjoner nevnt i designoversikten har ikke noe katalogtoken i v1: **verktøylinjehøyde, rammebredde, rammeradius, knappebredde, knappepadding, dialogbredde**. Katalogtabellene ovenfor er kontrakten. For disse pikslene åpner du [nødutgangen](#escape-hatch-the-root-class) og styler de stabile klassene direkte.

## Reachability {#reachability}

Kontrakten, sagt én gang og overholdt av hver gruppe ovenfor:

> Et token maler en flate bare når formen aktiverer den flaten. Native Vuetify-visuals styles via Vuetifys temafarger.

Per gruppe:

- **Verktøylinje, ramme, bilde-/håndtakskrom** — aktive i enhver form. Tokenene maler dem, og de klassiske cellene er det native utseendet tokenene faller tilbake til.
- **Gruppeboks** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — under `groups: 'box'` er seksjonen en VBtnGroup (0.3.2-struktur: knappene sammenføyes, boksen bærer elevasjonen). Boksreglene maler den med gruppetokenene, og `--tf-group-height` holder 32px-kontrakten med en `!important` (Vuetifys tetthetsregel kjemper mot den, som i 0.3.2). Under `groups: 'flat'` er seksjonene vanlige div-rekker (gjennomsiktige, uten skygge, radius 0 er formens basis).
- **Skillelinjer** (`dividerWidth/Height/Color`) — den synlige hårstreken er en `groups: 'flat'`-egenskap. I boksformen er skillelinjen et avstandsstykke i null størrelse (`margin: 0 4px` fra basisregelen).
- **Elementpadding/mellomrom** — den kompakte `6px 8px`-rekken er knyttet til den flate linjen (`toolbar: 'flat'`), gruppemellomrommene til de flate seksjonene (`groups: 'flat'`). Den hevede linjen beholder de klassiske målene.
- **Knapper** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — inerte under `buttons: 'vuetify'`: de native Vuetify-knappene maler sine egne tilstander. Style dem med Vuetify-temafarger (`primary`, `surface`, …) — de klassiske formene arver dem bevisst.
- **Menyelementmål** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — inerte under `menu: 'vuetify'`. Vuetify eier disse elementpikslene. **Liste**-boksen i menyen (radius/skygge/padding) males av skinnet i begge former (se [menynotatet](#menu-classic-note)).
- **Dialogens myke krom** (`dialogActionBtn*`, `dialogFieldRadius`, de myke paddingene, den manglende skillelinjen) — males under `dialog: 'soft'`. Under `dialog: 'classic'` er dialogen et VCard med de klassiske paddingene.
- **Boblekrom** — menyene for utvalg, tom linje og bilde er én rad med ikonknapper i begge former, malt av boble-tokenene. `bubble` endrer ikke lenger markupen deres.

En overstyring lik katalogbasisen **sendes ikke ut** — under en ikke-klassisk form maler formens egen basis via CSS-fallbacken, så å «gjenopprette» en klassisk verdi (f.eks. sette `buttonActiveBg` tilbake til `rgb(var(--v-theme-primary))` under `buttons: 'quiet'`) gjør i det stille ingenting. For å tvinge en klassisk utseende verdi under en ikke-klassisk form setter du en overstyring som skiller seg fra katalogbasisen — en tilsvarende literal som `rgba(var(--v-theme-primary), 1)` maler identisk og overlever hoppet over.

Tokens er bevisst ikke koblet inn i native stier — det er det som holder `default` pikselidentisk med det klassiske utseendet mens alt rutes gjennom katalogen.

## Oppskrifter {#recipes}

### Utvid pastel {#extend-pastel}

Arv den rolige formen og mal noen få flater på nytt. Registrerte navn fungerer på enhver editor:

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

Formen (flat/rolig/myk) kommer fra pastel. Urørte tokens beholder pastels verdier — den rolige knappevasken forblir nøytral, bare det du overstyrer, flytter seg. Dette er skinnet som vises live på [eksempelsiden](/no/examples/skins#custom-mint).

### Utvid default {#extend-default}

Behold den klassiske strukturen og juster malingen:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` er den implisitte roten, så nøkkelen kan utelates: `{ toolbar: 'flat', … }` starter også fra klassisk.

### Helt egendefinert {#full-custom}

Ingen `extends`, ingen registrering: send objektet til `skin`-prop-en og sett formflagg og tokens fritt. Et `name` setter din egen etikett på rotklassen (se nedenfor). Uten det er den `tiptapify-skin-inline`.

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

`defineSkin` er en identitetshjelper for typede const-definisjoner (den havner ikke i noe register). Formflagg kan settes enkeltvis — hvert flagg du utelater, forblir klassisk.

## Nødutgang: rotklassen {#escape-hatch-the-root-class}

Hver editorrot har `tiptapify-skin-{name}` (`tiptapify-skin-inline` for et navnløst inline-objekt). Biblioteket **knytter aldri noen regel til et skinnavn** — klassen er din:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

De stabile krokene å skrive mot:

| klasse | hvor |
|---|---|
| `tiptapify-skin-{name}` | editorrot |
| `tiptapify-shape-{flag}-{value}` ×6 | editorrot — den løste formen |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | verktøylinjen og seksjonene |
| `tiptapify-quiet-buttons` | verktøylinje- og boblerøtter under `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | raden i hver boblemeny og hårstreken mellom gruppene |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | radene for utvalgs-, tomlinje- og bildemenyen |
| `tiptapify-btn--active` | en trykket knapp i en boblemeny (en aktiv mark, bildeflyt) |
| `tiptapify-menu` · `tiptapify-menu--soft` | innhold i nedtrekksoverlegget, bæreren av de myke menyreglene |
| `tiptapify-skin-scope` | token-scope-diven inne i teleporterte menyer |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | dialogkortet og dets myke bærer |
| `tiptapify-frame` | editorens kantwrapper |

**Forsvar mot forbrukertemaer.** Skinnlaget er bygget for å overleve admin-temaer som padder og maler Vuetify-internals på nytt: regler knyttes til form-/bærerklasser, bruker doblede klasser (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) for spesifisitet, og beholder `!important` bare der basis-committens admin-temategning viste at det var nødvendig (menu.css-forsvarssettet). Konvensjoner som holder dine egne overstyringer i live på samme slagmark:

- avgrens CSS-en din under `.tiptapify-skin-{name}` (eller en formklasse) — aldri på bare Vuetify-internals;
- foretrekk tokens (`--tf-*`) for katalogdimensjonene, klasser for resten;
- match doblingen når du overstyrer Vuetify-komponenter (en enkelt `.v-list-item` taper mot skinnreglene).

## Visuell kontrakt (notat for bidragsytere) {#visual-contract-contributor-note}

De beregnede stilene til de innebygde skinnene er festet av grunnlinjefiksturen `src/skins/__fixtures__/skin-baseline.json` (13 seksjoner × lys/mørk): CSS-laget er ferdig når den målte matrisen stemmer med den. Leseveiledning for fiksturen:

- Hover-/aktiv-dimensjoner kan ikke tvinges fra siden, så opptaket leser **deklarasjonsteksten til den første CSSOM-regelen som treffer** for hver hover-selektor og løser den gjennom et probe-element inne i skinnroten (feltet `resolved`) — det er den vinnende regelens kontrakt, ikke et levende `:hover`-øyeblikksbilde.
- `_meta.selectors.menu` registrerer selektorteksten fra før `SkinScope`. Fiksturen er frosset (normative verdier), så feltet er bevisst utdatert. Opptaksbunten fester den gjeldende selektoren.
- Fiksturen bærer sine godkjente endringer i `_meta.notes`: gjenopprettingen 2026-10-18 av VBtnGroup-markupen under `groups: 'box'` målte de klassiske barneknappfeltene `groupBtn`/`buttonsActive` på nytt (sammenføyde hjørner, boksen eier elevasjonen). Pastel-feltene er urørt — en bevisst visuell endring oppdaterer bare de berørte klassiske cellene, registrerer et notat og leveres med en CHANGELOG-linje.

## Se også {#see-also}

- [Skinn-eksempler](/no/examples/skins) — klassisk, pastel og det egendefinerte mint-skinnet, live.
- [`skin`-prop](/no/api/props#skin) · [skinntyper](/no/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/no/api/types#tiptapifyskininput).
