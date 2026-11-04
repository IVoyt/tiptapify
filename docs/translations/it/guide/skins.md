# Skin {#skins}

Una **skin** è un aspetto dell'interfaccia dell'editor: la barra degli strumenti, i pulsanti e i gruppi al suo interno, i bubble menu, i menu a discesa, le finestre di dialogo, la cornice attorno al contenuto e gli elementi di selezione delle immagini. La prop `skin` la seleziona:

```vue
<Tiptapify skin="pastel" />
```

Una skin è fatta di due cose: i **token** (colori e dimensioni come variabili CSS) e la **forma** (varianti strutturali che un token non può esprimere). Le due skin integrate sono `default` — l'aspetto classico, una barra degli strumenti in rilievo con gruppi di pulsanti in rilievo — e `pastel`, l'aspetto discreto. Le skin personalizzate sono di prima classe: `registerSkin()` e gli oggetti skin inline passano esattamente per lo stesso meccanismo, e le skin integrate sono skin registrate, non casi speciali.

## Terminologia: skin e tema Vuetify {#terminology-skin-vs-vuetify-theme}

- **skin**: il termine rivolto all'utente per un aspetto dell'interfaccia dell'editor: token + forma. La prop è `skin`, i tipi sono `TiptapifySkin*`, il registro è `registerSkin()`, la classe radice è `tiptapify-skin-{name}`.
- **theme** (tema): riservato ai temi chiaro/scuro di Vuetify. I componenti di Tiptapify mantengono le proprie prop `theme` alimentate dal nome del tema corrente di Vuetify; il sistema delle skin non le tocca mai.

Le due cose si compongono: la maggior parte dei colori dei token integrati fa riferimento a variabili del tema Vuetify (`rgb(var(--v-theme-surface))`, …), quindi le skin seguono automaticamente il tema chiaro/scuro. Le celle a scuro fisso nella colonna classic (la maniglia di ridimensionamento (`rgba(0, 0, 0, .5/.8)`), il contorno semplice dell'immagine, l'ombra del bubble e le ombre di elevazione di menu e finestre) sono volute: l'aspetto classico usa un'interfaccia scura neutra in entrambi i temi, e la baseline misurata le fissa. Una skin personalizzata può fare riferimento liberamente alle variabili del tema: vedi la tabella dei token.

## Concetto {#concept}

### Token {#tokens}

Un token è una proprietà personalizzata CSS chiamata `--tf-*`. La chiave del catalogo è il camelCase del suffisso CSS: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. I valori sono semplici stringhe: colori, shorthand completi dei bordi, ombre, padding, raggi.

Ogni regola di skin della libreria esiste **una sola volta** e legge il proprio token con un fallback pari al valore classic (di base):

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Una skin risolta emette come variabili solo i propri **override**; i fallback CSS portano il valore di base. Le variabili finiscono sulla radice dell'editor e, poiché menu e finestre vengono teletrasportati fuori da essa, anche sul wrapper `SkinScope` di ogni menu e sulla card stessa della finestra, così i token seguono ogni superficie.

### Forma {#shape}

Sei flag decidono quali insiemi di regole si applicano; i token li colorano:

| flag | valori | cosa commuta |
|---|---|---|
| `toolbar` | `raised` · `flat` | elevazione di VToolbar e nessun filo interno vs barra piatta colorata |
| `groups` | `box` · `flat` | sezioni della barra come riquadri **VBtnGroup** in rilievo (markup 0.3.2: pulsanti uniti, i token del gruppo colorano il riquadro) vs semplici sequenze di div flex |
| `buttons` | `vuetify` · `quiet` | pulsanti Vuetify nativi vs pulsanti ghost con stato premuto neutro |
| `bubble` | `card` · `flat` | mantenuto per compatibilità: i bubble menu sono una riga di pulsanti con icona colorata dai token in entrambe le forme (i loro pulsanti seguono `buttons`) |
| `dialog` | `classic` · `soft` | divisore sotto il titolo, chiusura in rilievo vs card morbida, chiusura testuale |
| `menu` | `vuetify` · `soft` | menu a discesa: lista Vuetify vs card leggera con padding |

La forma risolta è codificata sulla radice dell'editor come sei classi `.tiptapify-shape-{flag}-{value}` ed è esposta come `shape: ComputedRef<ResolvedShape>` da [`useTiptapifyConfig()`](/it/api/types#usetiptapifyconfig) per i componenti personalizzati della barra degli strumenti.

### Extends {#extends}

Una skin viene risolta sopra la base classic, poi la sua catena `extends` a partire dalla radice, poi i suoi membri:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Gli anelli mancanti vengono risolti con la catena accumulata (con un avviso in sviluppo); un ciclo viene risolto in classic (con un avviso in sviluppo). Una skin registrata viene referenziata per nome; un oggetto skin inline può usare `extends` con un nome registrato e non entra mai nel registro globale: le skin personalizzate non si propagano mai tra gli editor. Le chiavi di token sconosciute vengono ignorate con un avviso in sviluppo.

Le demo dal vivo di tutte e tre le forme si trovano nella [pagina di esempi delle skin](/it/examples/skins).

## Catalogo dei token {#token-catalog}

Le tabelle seguenti sono il **contratto v1**: le chiavi del catalogo (`TiptapifySkinColors` / `TiptapifySkinMetrics`) sono i nomi che puoi impostare. Le celle classic sono i fallback CSS: il valore che le regole di base applicano quando nessuna skin sovrascrive il token.

### Barra degli strumenti / barra {#toolbar-bar}

| token | variabile CSS | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Elementi / gruppi / divisori {#items-groups-dividers}

| token | variabile CSS | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | elevazione Vuetify 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (spaziatore: margine `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ La cella classic misurata è `normal`, il valore flex nativo di Vuetify, che è quello portato dal fallback CSS. Il valore di base del catalogo `0px` è la lunghezza esplicita equivalente per gli override delle skin.

<a id="shadow-cells"></a>² Le celle che riportano "elevazione Vuetify *n*" sono descrittive: la stringa esatta dell'ombra tripla è il valore misurato nel fixture di baseline committato (`src/skins/__fixtures__/skin-baseline.json`) ed è il fallback CSS. Per `groupShadow` è l'**elevazione 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`): con `groups: 'box'` la sezione è un VBtnGroup (`elevation="4"`), e la regola del token colora il riquadro con questa tripla sopra l'elevazione propria del gruppo: il riquadro possiede l'elevazione, i pulsanti figli uniti non ne hanno.

### Pulsanti {#buttons}

Questi token vengono usati **solo con `buttons: 'quiet'`**: vedi [Raggiungibilità](#reachability).

| token | variabile CSS | valore quiet (classic: Vuetify nativo) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Bubble menu (selezione, riga vuota, immagine) {#bubble-menus-selection-empty-line-image}

| token | variabile CSS | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | uguale |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | uguale |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | uguale |

### Menu a discesa {#dropdown-menus}

| token | variabile CSS | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | elevazione Vuetify 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Il riquadro della **lista** (raggio, ombra, padding della lista) del menu classic è oggi una regola della skin: il wrapper dei token `SkinScope` si trova tra la regola figlia di Vuetify e la lista, quindi la libreria ripristina quei pixel come regole di skin che leggono i token qui sopra. I pixel delle **voci** restano Vuetify nativo (il fixture misura lì i valori predefiniti di Vuetify): i quattro token delle voci sono inerti finché `menu: 'vuetify'`.

### Finestre di dialogo {#dialogs}

| token | variabile CSS | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | elevazione VCard [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | predefinito del campo (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Cornice (wrapper del bordo dell'editor) {#frame-editor-border-wrapper}

| token | variabile CSS | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, senza bordo superiore | bordo completo |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Con la forma piatta della barra degli strumenti la cornice applica anche un delta per lato (un bordo superiore e il bordo inferiore con opacità 1.6× del bordo). Quel delta appartiene alla forma, non a un token: non è raggiungibile tramite token.

### Immagini e maniglie di ridimensionamento {#images-and-resize-handles}

| token | variabile CSS | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (selezionata) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (hover) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

La barra degli strumenti dell'immagine segue il flag `buttons`: con la forma quiet ottiene la superficie quiet: le sue spaziature di 2px/4px leggono `--tf-bubble-gap` / `--tf-bubble-padding` con i fallback del menu dell'immagine; non esiste un token dedicato alla barra dell'immagine.

### Non presenti nel catalogo (territorio della via di fuga) {#not-in-the-catalog-escape-hatch-territory}

Alcune dimensioni citate nella panoramica del design non hanno un token di catalogo nella v1: **altezza della barra degli strumenti, larghezza della cornice, raggio della cornice, larghezza del pulsante, padding del pulsante, larghezza della finestra**. Le tabelle del catalogo qui sopra sono il contratto; per questi pixel apri la [via di fuga](#escape-hatch-the-root-class) e personalizza direttamente le classi stabili.

## Raggiungibilità {#reachability}

Il contratto, enunciato una volta sola e rispettato da ogni gruppo qui sopra:

> Un token colora una superficie solo quando la forma attiva quella superficie; gli elementi visivi nativi di Vuetify si personalizzano tramite i colori del tema Vuetify.

Gruppo per gruppo:

- **Barra degli strumenti, cornice, elementi di immagini/maniglie**: attivi in ogni forma; i token li colorano, le celle classic sono l'aspetto nativo a cui i token ripiegano.
- **Riquadro dei gruppi** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`): con `groups: 'box'` la sezione è un VBtnGroup (struttura 0.3.2: i pulsanti si uniscono, il riquadro porta l'elevazione); le regole del riquadro lo colorano con i token del gruppo, e `--tf-group-height` mantiene il contratto dei 32px con un `!important` (la regola di densità di Vuetify lo contrasta, come nella 0.3.2). Con `groups: 'flat'` le sezioni sono semplici sequenze di div (trasparenti, senza ombra, con raggio 0 come base della forma).
- **Fili dei divisori** (`dividerWidth/Height/Color`): il filo visibile è una prerogativa di `groups: 'flat'`; nella forma box il divisore è uno spaziatore di dimensione zero (`margin: 0 4px` dalla regola di base).
- **Padding/spaziature degli elementi**: la sequenza compatta `6px 8px` dipende dalla barra piatta (`toolbar: 'flat'`), le spaziature dei gruppi dalle sezioni piatte (`groups: 'flat'`); la barra in rilievo mantiene le misure classiche.
- **Pulsanti** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`): inerti con `buttons: 'vuetify'`; i pulsanti Vuetify nativi applicano i propri stati. Personalizzali con i colori del tema Vuetify (`primary`, `surface`, …): le forme classic li ereditano di proposito.
- **Misure delle voci di menu** (`menuItemRadius/Padding/MinHeight/ActiveBg`): inerti con `menu: 'vuetify'`; i pixel di quelle voci appartengono a Vuetify. Il riquadro della **lista** del menu (raggio/ombra/padding) è colorato dalla skin in entrambe le forme (vedi la [nota sul menu](#menu-classic-note)).
- **Aspetto morbido delle finestre** (`dialogActionBtn*`, `dialogFieldRadius`, i padding morbidi, il divisore assente): applicato con `dialog: 'soft'`; con `dialog: 'classic'` la finestra è una VCard con i padding classic.
- **Interfaccia dei bubble**: i menu di selezione, riga vuota e immagine sono una riga di pulsanti con icona in entrambe le forme, colorata dai token bubble; `bubble` non ne cambia più il markup.

Un override uguale al valore di base del catalogo **non viene emesso**: con una forma non classic, la base della forma stessa si applica tramite il fallback CSS, quindi "ripristinare" un valore classic (ad esempio riportare `buttonActiveBg` a `rgb(var(--v-theme-primary))` con `buttons: 'quiet'`) non fa silenziosamente nulla. Per forzare un valore dall'aspetto classic con una forma non classic, imposta un override diverso dalla base del catalogo: un letterale equivalente come `rgba(var(--v-theme-primary), 1)` si presenta in modo identico e supera il salto.

I token non sono collegati di proposito ai percorsi nativi: è ciò che mantiene `default` identico al pixel all'aspetto classico mentre tutto passa dal catalogo.

## Ricette {#recipes}

### Estendere pastel {#extend-pastel}

Eredita la forma quiet e ridipingi alcune superfici. I nomi registrati funzionano su qualsiasi editor:

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

La forma (flat/quiet/soft) deriva da pastel; i token non toccati mantengono i valori di pastel: lo sfondo neutro dei pulsanti quiet resta tale, si muove solo ciò che sovrascrivi. È la skin resa dal vivo nella [pagina degli esempi](/it/examples/skins#custom-mint).

### Estendere default {#extend-default}

Mantieni la struttura classica e regola i colori:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` è la radice implicita, quindi la chiave si può omettere: anche `{ toolbar: 'flat', … }` parte da classic.

### Completamente personalizzata {#full-custom}

Niente `extends`, niente registrazione: passa l'oggetto alla prop `skin` e imposta liberamente flag di forma e token. Un `name` mette la tua etichetta sulla classe radice (vedi sotto); senza, è `tiptapify-skin-inline`.

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

`defineSkin` è l'helper identità per definizioni const tipizzate (non entra in alcun registro). I flag di forma si possono impostare singolarmente: ogni flag omesso resta classic.

## Via di fuga: la classe radice {#escape-hatch-the-root-class}

Ogni radice dell'editor porta `tiptapify-skin-{name}` (`tiptapify-skin-inline` per un oggetto inline senza nome). La libreria **non basa mai alcuna regola sul nome di una skin**: la classe è tua:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Gli hook stabili su cui scrivere il tuo CSS:

| classe | dove |
|---|---|
| `tiptapify-skin-{name}` | radice dell'editor |
| `tiptapify-shape-{flag}-{value}` ×6 | radice dell'editor: la forma risolta |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | la barra degli strumenti e le sue sezioni |
| `tiptapify-quiet-buttons` | radici della barra e dei bubble con `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | la riga di ogni bubble menu e il filo tra i suoi gruppi |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | le righe dei menu di selezione, riga vuota e immagine |
| `tiptapify-btn--active` | un pulsante premuto di un bubble menu (un mark attivo, l'allineamento flottante dell'immagine) |
| `tiptapify-menu` · `tiptapify-menu--soft` | contenuto dell'overlay dei menu a discesa, portatore delle regole del menu morbido |
| `tiptapify-skin-scope` | il div dello scope dei token nei menu teletrasportati |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | la card della finestra e il suo portatore morbido |
| `tiptapify-frame` | il wrapper del bordo dell'editor |

**Difesa dai temi del consumatore.** Il livello delle skin è costruito per sopravvivere ai temi admin che aggiungono padding e ridipingono gli interni di Vuetify: le regole dipendono da classi di forma/portatore, usano classi raddoppiate (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) per la specificità e mantengono `!important` solo dove il caso del tema admin del commit di base ne ha dimostrato la necessità (l'insieme di difesa di menu.css). Convenzioni che permettono ai tuoi override di funzionare sullo stesso campo di battaglia:

- limita il tuo CSS a `.tiptapify-skin-{name}` (o a una classe di forma): mai sugli interni nudi di Vuetify;
- preferisci i token (`--tf-*`) per le dimensioni del catalogo, le classi per il resto;
- replica il raddoppio quando sovrascrivi i componenti Vuetify (un singolo `.v-list-item` perde contro le regole della skin).

## Contratto visivo (nota per i contributori) {#visual-contract-contributor-note}

Gli stili calcolati delle skin integrate sono fissati dal fixture di baseline `src/skins/__fixtures__/skin-baseline.json` (13 sezioni × chiaro/scuro): il livello CSS è completo quando la matrice misurata coincide con esso. Note di lettura per il fixture:

- Le dimensioni di hover/active non si possono forzare dalla pagina, quindi la registrazione legge il **testo della dichiarazione della prima regola CSSOM trovata** per ogni selettore di hover e lo risolve tramite un elemento sonda all'interno della radice della skin (il campo `resolved`): è il contratto della regola vincente, non un'istantanea di `:hover` dal vivo.
- `_meta.selectors.menu` registra il testo del selettore precedente a `SkinScope`. Il fixture è congelato (valori normativi), quindi il campo è obsoleto di proposito; il bundle di registrazione fissa il selettore attuale.
- Il fixture porta le sue modifiche autorizzate in `_meta.notes`: il ripristino del 2026-10-18 del markup VBtnGroup con `groups: 'box'` ha rimisurato i campi dei pulsanti figli classic `groupBtn`/`buttonsActive` (angoli uniti, il riquadro possiede l'elevazione). I campi pastel non sono toccati: una modifica visiva deliberata aggiorna solo le celle classic interessate, registra una nota e include una riga nel CHANGELOG.

## Vedi anche {#see-also}

- [Esempi di skin](/it/examples/skins): classic, pastel e la skin personalizzata mint, dal vivo.
- [Prop `skin`](/it/api/props#skin) · [tipi delle skin](/it/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/it/api/types#tiptapifyskininput).
