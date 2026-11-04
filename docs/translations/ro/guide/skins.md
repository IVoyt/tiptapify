# Teme de aspect {#skins}

O **temă de aspect** (skin) este un singur aspect al elementelor editorului: bara de instrumente, butoanele și grupurile din ea, meniurile bubble, meniurile derulante, dialogurile, cadrul din jurul conținutului și elementele de selecție a imaginii. Proprietatea `skin` o selectează:

```vue
<Tiptapify skin="pastel" />
```

Un skin înseamnă două lucruri: **token-uri** (culori și dimensiuni ca variabile CSS) și **formă** (variante structurale pe care un token nu le poate exprima). Cele două skin-uri încorporate sunt `default` — aspectul clasic, o bară de instrumente ridicată cu grupuri de butoane ridicate — și `pastel`, aspectul calm. Skin-urile personalizate sunt de prim rang: `registerSkin()` și obiectele skin inline se rezolvă prin exact același mecanism, iar skin-urile încorporate sunt skin-uri înregistrate, nu cazuri speciale.

## Terminologie: skin vs. tema Vuetify {#terminology-skin-vs-vuetify-theme}

- **skin** — termenul vizibil utilizatorului pentru un aspect al elementelor editorului: tokeni + formă. Proprietatea este `skin`, tipurile sunt `TiptapifySkin*`, registrul este `registerSkin()`, clasa rădăcinii este `tiptapify-skin-{name}`.
- **theme** — rezervat temelor luminoasă/întunecată din Vuetify. Componentele Tiptapify își alimentează proprietățile `theme` din numele temei Vuetify curente; sistemul de skin-uri nu le atinge niciodată.

Cele două se îmbină: majoritatea culorilor-token încorporate fac referire la variabilele temei Vuetify (`rgb(var(--v-theme-surface))`, …), deci skin-urile urmează automat modul luminos/întunecat. Celulele cu valoare fixă întunecată din coloana classic — mânerul de redimensionare (`rgba(0, 0, 0, .5/.8)`), conturul simplu al imaginii, umbra bubble și umbrele de elevație ale meniurilor/dialogurilor — sunt deliberate: aspectul clasic pictează elemente neutre întunecate în ambele teme, iar baza măsurată le fixează. Un skin personalizat poate face liber referire la variabilele temei — vezi tabelul de tokeni.

## Concept {#concept}

### Tokeni {#tokens}

Un token este o proprietate CSS personalizată numită `--tf-*`. Cheia din catalog este forma camelCase a sufixului CSS: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Valorile sunt șiruri simple — culori, prescurtări complete de chenar, umbre, spațieri, raze.

Fiecare regulă de skin din bibliotecă există **o singură dată** și își citește tokenul cu o valoare de rezervă egală cu valoarea clasică (de bază):

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Un skin rezolvat emite ca variabile doar **suprascrierile** sale; valorile de rezervă din CSS poartă baza. Variabilele ajung pe rădăcina editorului — și, deoarece meniurile și dialogurile sunt teleportate în afara ei, pe învelișul `SkinScope` al fiecărui meniu și pe cardul dialogului însuși, astfel încât tokenii urmează fiecare suprafață.

### Formă {#shape}

Șase indicatori stabilesc ce seturi de reguli se aplică; tokenii le colorează:

| indicator | valori | ce comută |
|---|---|---|
| `toolbar` | `raised` · `flat` | elevația VToolbar + fără linie fină interioară vs. bară plată cu nuanță |
| `groups` | `box` · `flat` | secțiunile barei de instrumente ca și casete ridicate **VBtnGroup** (markup 0.3.2: butoane unite, tokenii de grup pictează caseta) vs. simple șiruri flex de div-uri |
| `buttons` | `vuetify` · `quiet` | butoane Vuetify native vs. butoane „ghost” cu stare apăsată neutră |
| `bubble` | `card` · `flat` | păstrat pentru compatibilitate: meniurile bubble sunt un rând de butoane-pictogramă pictat de tokeni, în ambele forme (butoanele lor urmează `buttons`) |
| `dialog` | `classic` · `soft` | linie despărțitoare sub titlu, închidere elevată vs. card moale, închidere text |
| `menu` | `vuetify` · `soft` | meniuri derulante: listă Vuetify vs. cardul deschis cu spațiere |

Forma rezolvată este codificată pe rădăcina editorului ca șase clase `.tiptapify-shape-{flag}-{value}` și expusă ca `shape: ComputedRef<ResolvedShape>` în [`useTiptapifyConfig()`](/ro/api/types#usetiptapifyconfig) pentru componentele personalizate ale barei de instrumente.

### Extends {#extends}

Un skin se rezolvă peste baza clasică, apoi lanțul său `extends` începând de la rădăcină, apoi propriile membri:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Verigile lipsă se rezolvă la lanțul acumulat (cu un avertisment în dev); un ciclu se rezolvă la classic (cu un avertisment în dev). Un skin înregistrat este referit după nume; un obiect de skin inline poate folosi `extends` cu un nume înregistrat și nu intră niciodată în registrul global — skin-urile personalizate nu se scurg între editoare. Cheile de token necunoscute sunt ignorate, cu un avertisment în dev.

Demonstrații live pentru toate cele trei forme se află pe [pagina de exemple Teme de aspect](/ro/examples/skins).

## Catalogul de tokeni {#token-catalog}

Tabelele de mai jos reprezintă **contractul v1**: cheile din catalog (`TiptapifySkinColors` / `TiptapifySkinMetrics`) sunt numele pe care le poți seta. Celulele classic sunt valorile de rezervă din CSS — valoarea pe care o pictează regulile de bază când niciun skin nu suprascrie tokenul.

### Bară de instrumente / bară {#toolbar-bar}

| token | variabilă CSS | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Elemente / grupuri / separatoare {#items-groups-dividers}

| token | variabilă CSS | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | elevația Vuetify 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (spacer: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Celula classic măsurată este `normal` — valoarea flex nativă din Vuetify, pe care o poartă valoarea de rezervă din CSS. Valoarea de bază din catalog, `0px`, este lungimea explicită echivalentă pentru suprascrierile de skin.

<a id="shadow-cells"></a>² Celulele cu textul „elevația Vuetify *n*” sunt descriptive: șirul exact cu triplă umbră este valoarea măsurată din fixture-ul de bază comis (`src/skins/__fixtures__/skin-baseline.json`) și este valoarea de rezervă din CSS. Pentru `groupShadow` aceasta este **elevația 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — sub `groups: 'box'` secțiunea este un VBtnGroup (`elevation="4"`), iar regula tokenului pictează caseta cu această triplă peste elevația proprie a grupului: caseta deține elevația, butoanele copil unite nu au niciuna.

### Butoane {#buttons}

Acești tokeni sunt consumați **doar sub `buttons: 'quiet'`** — vezi [Accesibilitate](#reachability).

| token | variabilă CSS | valoare quiet (classic: Vuetify nativ) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Meniuri bubble (selecție, linie goală, imagine) {#bubble-menus-selection-empty-line-image}

| token | variabilă CSS | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | la fel |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | la fel |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | la fel |

### Meniuri derulante {#dropdown-menus}

| token | variabilă CSS | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | elevația Vuetify 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Caseta **listei** (raza, umbra, spațierea listei) meniului classic este astăzi o regulă de skin — învelișul de tokeni `SkinScope` se află între regula copil proprie a Vuetify și listă, așa că biblioteca restaurează acei pixeli ca reguli de skin care citesc tokenii de mai sus. Pixelii **elementelor** rămân Vuetify nativ (fixture-ul măsoară acolo valorile implicite Vuetify): cei patru tokeni de element sunt inactivi cât timp `menu: 'vuetify'`.

### Dialoguri {#dialogs}

| token | variabilă CSS | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | elevația VCard [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | implicit câmp (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Cadru (învelișul cu chenar al editorului) {#frame-editor-border-wrapper}

| token | variabilă CSS | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, fără margine sus | chenar complet |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Sub forma de bară plată, cadrul pictează și o diferență pe laturi (o margine sus și marginea de jos la 1,6× opacitatea chenarului). Acea diferență ține de formă, nu de un token: nu poate fi atinsă prin tokeni.

### Imagini și mânere de redimensionare {#images-and-resize-handles}

| token | variabilă CSS | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (selectată) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (hover) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Bara de instrumente a imaginii urmează indicatorul `buttons`: sub forma quiet primește suprafața quiet — spațierea sa de 2px/4px citește `--tf-bubble-gap` / `--tf-bubble-padding`, cu valorile de rezervă ale meniului de imagine; nu există un token dedicat barei de instrumente a imaginii.

### Nu sunt în catalog (teritoriul soluției de rezervă) {#not-in-the-catalog-escape-hatch-territory}

Unele dimensiuni menționate în prezentarea de design nu au token în catalogul v1: **înălțimea barei de instrumente, lățimea cadrului, raza cadrului, lățimea butonului, spațierea butonului, lățimea dialogului**. Tabelele din catalog sunt contractul; pentru acești pixeli deschide [soluția de rezervă](#escape-hatch-the-root-class) și stilizează direct clasele stabile.

## Accesibilitate {#reachability}

Contractul, enunțat o singură dată și respectat de fiecare grup de mai sus:

> Un token pictează o suprafață doar când forma activează acea suprafață; elementele vizuale native Vuetify se stilizează prin culorile temei Vuetify.

Pe grupuri:

- **Bară de instrumente, cadru, elemente de imagine/mâner** — active în orice formă; tokenii le pictează, celulele classic sunt aspectul nativ la care revin tokenii.
- **Caseta grupurilor** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — sub `groups: 'box'` secțiunea este un VBtnGroup (structura 0.3.2: butoanele se unesc, caseta poartă elevația); regulile casetei o pictează cu tokenii de grup, iar `--tf-group-height` păstrează contractul de 32px cu `!important` (regula de densitate a Vuetify îl contrazice, ca în 0.3.2). Sub `groups: 'flat'` secțiunile sunt simple șiruri de div-uri (transparente, fără umbră, raza 0 este baza formei).
- **Liniile fine ale separatoarelor** (`dividerWidth/Height/Color`) — linia fină vizibilă este o facilitate `groups: 'flat'`; în forma box, separatorul este un spacer de dimensiune zero (`margin: 0 4px` din regula de bază).
- **Spațierea/golurile elementelor** — șirul compact `6px 8px` este condiționat de bara plată (`toolbar: 'flat'`), golurile grupurilor de secțiunile plate (`groups: 'flat'`); bara ridicată păstrează metricile classic.
- **Butoane** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — inactive sub `buttons: 'vuetify'`: butoanele native Vuetify își pictează singure stările. Stilizează-le cu culorile temei Vuetify (`primary`, `surface`, …) — formele classic le moștenesc deliberat.
- **Metricile elementelor de meniu** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — inactive sub `menu: 'vuetify'`; Vuetify deține acei pixeli ai elementelor. Caseta **listei** meniului (raza/umbra/spațierea) este pictată de skin în ambele forme (vezi [nota despre meniu](#menu-classic-note)).
- **Elementele moi ale dialogului** (`dialogActionBtn*`, `dialogFieldRadius`, spațierile moi, linia despărțitoare absentă) — pictate sub `dialog: 'soft'`; sub `dialog: 'classic'` dialogul este un VCard cu spațierile classic.
- **Elementele bubble** — meniurile de selecție, de linie goală și de imagine sunt un rând de butoane-pictogramă în ambele forme, pictat de tokenii bubble; `bubble` nu le mai schimbă markup-ul.

O suprascriere egală cu baza din catalog **nu este emisă** — sub o formă diferită de classic, baza proprie a formei pictează prin valoarea de rezervă din CSS, deci „restaurarea” unei valori classic (de ex. readucerea `buttonActiveBg` la `rgb(var(--v-theme-primary))` sub `buttons: 'quiet'`) nu face nimic, în tăcere. Pentru a forța o valoare cu aspect classic sub o formă diferită, setează o suprascriere diferită de baza din catalog — un literal echivalent precum `rgba(var(--v-theme-primary), 1)` pictează identic și trece de omitere.

Tokenii nu sunt conectați intenționat la căile native — de aceea `default` rămâne identic pixel cu pixel cu aspectul classic, în timp ce totul trece prin catalog.

## Rețete {#recipes}

### Extinde pastel {#extend-pastel}

Moștenește forma quiet și repictează câteva suprafețe. Numele înregistrate funcționează pe orice editor:

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

Forma (flat/quiet/soft) provine din pastel; tokenii neatinși păstrează valorile pastel — nuanța neutră a butoanelor quiet rămâne, se mută doar ce suprascrii. Aceasta este tema randată live pe [pagina de exemple](/ro/examples/skins#custom-mint).

### Extinde default {#extend-default}

Păstrează structura classic, ajustează culorile:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` este rădăcina implicită, deci cheia poate fi omisă: `{ toolbar: 'flat', … }` pornește tot de la classic.

### Personalizare completă {#full-custom}

Fără `extends`, fără înregistrare: transmite obiectul în proprietatea `skin` și setează liber indicatorii de formă și tokenii. Un `name` pune propria ta etichetă pe clasa rădăcinii (vezi mai jos); fără el, aceasta este `tiptapify-skin-inline`.

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

`defineSkin` este funcția-identitate pentru definiții const tipizate (nu intră în niciun registru). Indicatorii de formă pot fi setați individual — fiecare indicator omis rămâne classic.

## Soluția de rezervă: clasa rădăcinii {#escape-hatch-the-root-class}

Rădăcina fiecărui editor are clasa `tiptapify-skin-{name}` (`tiptapify-skin-inline` pentru un obiect inline fără nume). Biblioteca **nu condiționează niciodată vreo regulă de un nume de skin** — clasa este a ta:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Punctele de acroșare stabile pe care poți scrie reguli:

| clasă | unde |
|---|---|
| `tiptapify-skin-{name}` | rădăcina editorului |
| `tiptapify-shape-{flag}-{value}` ×6 | rădăcina editorului — forma rezolvată |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | bara de instrumente și secțiunile sale |
| `tiptapify-quiet-buttons` | rădăcinile barei de instrumente și bubble sub `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | rândul fiecărui meniu bubble și linia fină dintre grupurile sale |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | rândurile meniurilor de selecție, de linie goală și de imagine |
| `tiptapify-btn--active` | un buton apăsat al unui meniu bubble (un marcaj activ, plutirea imaginii) |
| `tiptapify-menu` · `tiptapify-menu--soft` | conținutul suprapus al meniului derulant, purtătorul regulilor de meniu moale |
| `tiptapify-skin-scope` | div-ul de domeniu al tokenilor din meniurile teleportate |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | cardul dialogului și purtătorul său moale |
| `tiptapify-frame` | învelișul cu chenar al editorului |

**Apărare împotriva temelor consumatorului.** Stratul de skin este construit să reziste temelor de administrare care adaugă spațieri și repictează elemente interne Vuetify: regulile se condiționează de clase de formă/purtător, folosesc clase dublate (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) pentru specificitate și păstrează `!important` doar acolo unde cazul temei de administrare din commit-ul de bază a dovedit că este necesar (setul de apărare menu.css). Convenții care mențin funcționale propriile tale suprascrieri pe același câmp de luptă:

- limitează-ți CSS-ul sub `.tiptapify-skin-{name}` (sau o clasă de formă) — niciodată pe elementele interne Vuetify simple;
- preferă tokenii (`--tf-*`) pentru dimensiunile din catalog, clasele pentru rest;
- potrivește dublarea când suprascrii componente Vuetify (un singur `.v-list-item` pierde în fața regulilor de skin).

## Contractul vizual (notă pentru contribuitori) {#visual-contract-contributor-note}

Stilurile calculate ale skin-urilor încorporate sunt fixate de fixture-ul de bază `src/skins/__fixtures__/skin-baseline.json` (13 secțiuni × luminos/întunecat): stratul CSS este terminat când matricea măsurată se potrivește cu el. Note de lectură pentru fixture:

- Dimensiunile de hover/active nu pot fi forțate din pagină, așa că înregistrarea citește **textul declarației primei reguli CSSOM găsite** pentru fiecare selector de hover și îl rezolvă printr-un element sondă din rădăcina skin-ului (câmpul `resolved`) — este contractul regulii câștigătoare, nu un instantaneu `:hover` live.
- `_meta.selectors.menu` înregistrează textul selectorului dinaintea `SkinScope`. Fixture-ul este înghețat (valori normative), deci câmpul este depășit intenționat; pachetul de înregistrare fixează selectorul curent.
- Fixture-ul își poartă modificările autorizate în `_meta.notes`: restaurarea din 2026-10-18 a markup-ului VBtnGroup sub `groups: 'box'` a remăsurat câmpurile classic `groupBtn`/`buttonsActive` ale butoanelor copil (colțuri unite, caseta deține elevația). Câmpurile pastel nu sunt atinse — o schimbare vizuală deliberată actualizează doar celulele classic afectate, înregistrează o notă și livrează o linie în CHANGELOG.

## Vezi și {#see-also}

- [Exemple Teme de aspect](/ro/examples/skins) — classic, pastel și skin-ul personalizat mint, live.
- [Proprietatea `skin`](/ro/api/props#skin) · [tipurile skin](/ro/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/ro/api/types#tiptapifyskininput).
