# Skórki {#skins}

**Skórka** to jeden wygląd elementów interfejsu edytora: paska narzędzi, znajdujących się w nim przycisków i grup, menu dymków, menu rozwijanych, okien dialogowych, ramki wokół treści oraz oprawy zaznaczenia obrazu. Wybiera ją właściwość `skin`:

```vue
<Tiptapify skin="pastel" />
```

Skórka składa się z dwóch rzeczy: **tokenów** (kolory i rozmiary jako zmienne CSS) i **kształtu** (wariantów strukturalnych, których token nie wyrazi). Dwie wbudowane skórki to `default` — klasyczny wygląd, wypukły pasek narzędzi z wypukłymi grupami przycisków — oraz `pastel`, stonowany wygląd. Własne skórki są pełnoprawne: `registerSkin()` i obiekty skórek podane inline są rozwiązywane dokładnie tym samym mechanizmem, a wbudowane skórki to zarejestrowane skórki, a nie szczególne przypadki.

## Terminologia: skórka a motyw Vuetify {#terminology-skin-vs-vuetify-theme}

- **skin** (skórka) — termin dla użytkownika oznaczający jeden wygląd elementów interfejsu edytora: tokeny + kształt. Właściwość to `skin`, typy to `TiptapifySkin*`, rejestr to `registerSkin()`, klasa korzenia to `tiptapify-skin-{name}`.
- **theme** (motyw) — zarezerwowany dla jasnych/ciemnych motywów Vuetify. Komponenty Tiptapify utrzymują swoje właściwości `theme` zasilane nazwą bieżącego motywu Vuetify; system skórek nigdy ich nie dotyka.

Współpracują ze sobą: większość kolorów tokenów wbudowanych skórek odwołuje się do zmiennych motywu Vuetify (`rgb(var(--v-theme-surface))`, …), więc skórki automatycznie podążają za trybem jasnym/ciemnym. Stałe ciemne komórki w kolumnie classic — uchwyt zmiany rozmiaru (`rgba(0, 0, 0, .5/.8)`), zwykły obrys obrazu, cień dymka oraz cienie wyniesienia menu i okien dialogowych — są zamierzone: klasyczny wygląd maluje neutralne, ciemne elementy w obu motywach, a zmierzona wartość bazowa je utrwala. Własna skórka może swobodnie odwoływać się do zmiennych motywu — zobacz tabelę tokenów.

## Koncepcja {#concept}

### Tokeny {#tokens}

Token to właściwość niestandardowa CSS o nazwie `--tf-*`. Klucz katalogu to camelCase sufiksu CSS: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Wartości to zwykłe ciągi znaków — kolory, pełne skrócone zapisy obramowań, cienie, odstępy, promienie.

Każda reguła skórki w bibliotece istnieje **raz** i odczytuje swój token z wartością zapasową równą klasycznej (bazowej):

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Rozwiązana skórka emituje jako zmienne tylko swoje **nadpisania**; wartości zapasowe CSS niosą bazę. Zmienne trafiają do korzenia edytora — a ponieważ menu i okna dialogowe są teleportowane poza niego, także do opakowania `SkinScope` każdego menu i samej karty okna dialogowego, więc tokeny podążają za każdą powierzchnią.

### Kształt {#shape}

Sześć flag decyduje, które zestawy reguł mają zastosowanie; tokeny je malują:

| flaga | wartości | co przełącza |
|---|---|---|
| `toolbar` | `raised` · `flat` | wyniesienie VToolbar bez wewnętrznej cienkiej linii vs płaski zabarwiony pasek |
| `groups` | `box` · `flat` | sekcje paska narzędzi jako wyniesione pola **VBtnGroup** (znaczniki z 0.3.2: połączone przyciski, tokeny grup malują pole) vs zwykłe ciągi div we flexie |
| `buttons` | `vuetify` · `quiet` | natywne przyciski Vuetify vs przyciski typu ghost z neutralnym stanem wciśnięcia |
| `bubble` | `card` · `flat` | zachowana dla zgodności: menu dymków to jeden malowany tokenami rząd przycisków z ikonami w obu kształtach (ich przyciski podążają za `buttons`) |
| `dialog` | `classic` · `soft` | linia pod tytułem i wyniesiony przycisk zamknięcia vs łagodna karta i tekstowy przycisk zamknięcia |
| `menu` | `vuetify` · `soft` | menu rozwijane: lista Vuetify vs jasna karta z wypełnieniem |

Rozwiązany kształt jest zakodowany w korzeniu edytora jako sześć klas `.tiptapify-shape-{flag}-{value}` i udostępniany jako `shape: ComputedRef<ResolvedShape>` w [`useTiptapifyConfig()`](/pl/api/types#usetiptapifyconfig) dla własnych komponentów paska narzędzi.

### Extends {#extends}

Skórka jest rozwiązywana na bazie klasycznej, potem jej łańcuch `extends` od korzenia, a na końcu własne elementy:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Brakujące ogniwa są rozwiązywane do dotychczas zgromadzonego łańcucha (z ostrzeżeniem deweloperskim); cykl jest rozwiązywany do classic (z ostrzeżeniem deweloperskim). Zarejestrowana skórka jest wskazywana po nazwie; obiekt skórki inline może rozszerzać (`extends`) zarejestrowaną nazwę i nigdy nie trafia do globalnego rejestru — własne skórki nigdy nie przeciekają między edytorami. Nieznane klucze tokenów są ignorowane z ostrzeżeniem deweloperskim.

Działające demo wszystkich trzech form znajdziesz na [stronie przykładów skórek](/pl/examples/skins).

## Katalog tokenów {#token-catalog}

Poniższe tabele to **kontrakt v1**: klucze katalogu (`TiptapifySkinColors` / `TiptapifySkinMetrics`) to nazwy, które możesz ustawiać. Komórki classic to wartości zapasowe CSS — wartość, którą malują reguły bazowe, gdy żadna skórka nie nadpisuje tokenu.

### Pasek narzędzi / pasek {#toolbar-bar}

| token | zmienna CSS | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Elementy / grupy / separatory {#items-groups-dividers}

| token | zmienna CSS | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | wyniesienie Vuetify 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (przekładka: margines `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Zmierzona komórka classic to `normal` — natywna wartość flex Vuetify, którą niesie wartość zapasowa CSS. Bazowa wartość katalogu `0px` to równoważna jawna długość dla nadpisań skórek.

<a id="shadow-cells"></a>² Komórki o treści „wyniesienie Vuetify *n*” mają charakter opisowy: dokładny ciąg potrójnego cienia to zmierzona wartość w zatwierdzonym pliku wzorcowym (`src/skins/__fixtures__/skin-baseline.json`) i jest wartością zapasową CSS. Dla `groupShadow` jest to **wyniesienie 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — przy `groups: 'box'` sekcja jest VBtnGroup (`elevation="4"`), a reguła tokenu maluje pole tym potrójnym cieniem na własnym wyniesieniu grupy: pole posiada wyniesienie, połączone przyciski podrzędne nie mają żadnego.

### Przyciski {#buttons}

Te tokeny są używane **tylko przy `buttons: 'quiet'`** — zobacz [Osiągalność](#reachability).

| token | zmienna CSS | wartość quiet (classic: natywny Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Menu dymków (zaznaczenie, pusty wiersz, obraz) {#bubble-menus-selection-empty-line-image}

| token | zmienna CSS | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | tak samo |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | tak samo |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | tak samo |

### Menu rozwijane {#dropdown-menus}

| token | zmienna CSS | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | wyniesienie Vuetify 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Pole **listy** (promień, cień, wypełnienie listy) menu classic jest dziś regułą skórki — opakowanie tokenów `SkinScope` znajduje się między własną regułą potomną Vuetify a listą, więc biblioteka przywraca te piksele jako reguły skórki odczytujące powyższe tokeny. Piksele **elementów** pozostają natywne dla Vuetify (plik wzorcowy mierzy tam domyślne wartości Vuetify): cztery tokeny elementów są nieaktywne przy `menu: 'vuetify'`.

### Okna dialogowe {#dialogs}

| token | zmienna CSS | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | wyniesienie VCard [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | domyślna wartość pola (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Ramka (opakowanie obramowania edytora) {#frame-editor-border-wrapper}

| token | zmienna CSS | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, bez górnej krawędzi | pełne obramowanie |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

Przy płaskim kształcie paska narzędzi ramka maluje też różnicę dla poszczególnych boków (górną krawędź oraz dolną krawędź przy 1,6× krycia obramowania). Ta różnica należy do kształtu, a nie do tokenu: nie jest osiągalna przez token.

### Obrazy i uchwyty zmiany rozmiaru {#images-and-resize-handles}

| token | zmienna CSS | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (zaznaczony) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (po najechaniu) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Pasek narzędzi obrazu podąża za flagą `buttons`: przy cichym kształcie dostaje cichą powierzchnię — jego odstępy 2px/4px odczytują `--tf-bubble-gap` / `--tf-bubble-padding` z wartościami zapasowymi menu obrazu; nie ma dedykowanego tokenu paska narzędzi obrazu.

### Poza katalogiem (obszar furtki awaryjnej) {#not-in-the-catalog-escape-hatch-territory}

Niektóre wymiary wymienione w przeglądzie projektu nie mają w v1 tokenu w katalogu: **wysokość paska narzędzi, szerokość ramki, promień ramki, szerokość przycisku, wypełnienie przycisku, szerokość okna dialogowego**. Kontraktem są powyższe tabele katalogu; dla tych pikseli otwórz [furtkę awaryjną](#escape-hatch-the-root-class) i stylizuj stabilne klasy bezpośrednio.

## Osiągalność {#reachability}

Kontrakt, sformułowany raz i przestrzegany przez każdą powyższą grupę:

> Token maluje powierzchnię tylko wtedy, gdy kształt aktywuje tę powierzchnię; natywne wizualia Vuetify są stylizowane kolorami motywu Vuetify.

Według grup:

- **Pasek narzędzi, ramka, oprawa obrazu/uchwytów** — aktywne w każdym kształcie; tokeny je malują, a komórki classic to natywny wygląd, do którego tokeny wracają.
- **Pole grup** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — przy `groups: 'box'` sekcja jest VBtnGroup (struktura z 0.3.2: przyciski się łączą, pole niesie wyniesienie); reguły pola malują je tokenami grup, a `--tf-group-height` utrzymuje kontrakt 32px dzięki `!important` (reguła gęstości Vuetify z nim walczy, jak w 0.3.2). Przy `groups: 'flat'` sekcje to zwykłe ciągi div (przezroczyste, bez cienia, promień 0 to baza kształtu).
- **Cienkie linie separatorów** (`dividerWidth/Height/Color`) — widoczna cienka linia to cecha `groups: 'flat'`; w kształcie box separator jest przekładką o zerowym rozmiarze (`margin: 0 4px` z reguły bazowej).
- **Wypełnienie/odstępy elementów** — zwarty ciąg `6px 8px` jest ograniczony do płaskiego paska (`toolbar: 'flat'`), a odstępy grup do płaskich sekcji (`groups: 'flat'`); wyniesiony pasek zachowuje klasyczne metryki.
- **Przyciski** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — nieaktywne przy `buttons: 'vuetify'`: natywne przyciski Vuetify malują własne stany. Stylizuj je kolorami motywu Vuetify (`primary`, `surface`, …) — kształty classic celowo je dziedziczą.
- **Metryki elementów menu** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — nieaktywne przy `menu: 'vuetify'`; piksele tych elementów należą do Vuetify. Pole **listy** menu (promień/cień/wypełnienie) jest malowane przez skórkę w obu kształtach (zobacz [uwagę o menu](#menu-classic-note)).
- **Łagodna oprawa okna dialogowego** (`dialogActionBtn*`, `dialogFieldRadius`, łagodne wypełnienia, brakująca linia podziału) — malowana przy `dialog: 'soft'`; przy `dialog: 'classic'` okno dialogowe jest VCard z klasycznymi wypełnieniami.
- **Oprawa dymków** — menu zaznaczenia, pustego wiersza i obrazu to jeden rząd przycisków z ikonami w obu kształtach, malowany tokenami dymków; `bubble` nie zmienia już ich znaczników.

Nadpisanie równe bazie katalogu **nie jest emitowane** — przy kształcie innym niż classic własna baza kształtu jest malowana przez wartość zapasową CSS, więc „przywrócenie” wartości classic (np. ustawienie `buttonActiveBg` z powrotem na `rgb(var(--v-theme-primary))` przy `buttons: 'quiet'`) po cichu nic nie robi. Aby wymusić wartość wyglądającą klasycznie przy kształcie innym niż classic, ustaw nadpisanie różniące się od bazy katalogu — równoważny literał, taki jak `rgba(var(--v-theme-primary), 1)`, maluje identycznie i omija pomijanie.

Tokeny celowo nie są wpięte w ścieżki natywne — dzięki temu `default` pozostaje identyczny co do piksela z klasycznym wyglądem, a wszystko przechodzi przez katalog.

## Receptury {#recipes}

### Rozszerzenie pastel {#extend-pastel}

Odziedzicz cichy kształt i przemaluj kilka powierzchni. Zarejestrowane nazwy działają w każdym edytorze:

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

Kształt (flat/quiet/soft) pochodzi z pastel; nietknięte tokeny zachowują wartości pastel — ciche tło przycisku pozostaje neutralne, zmienia się tylko to, co nadpiszesz. To ta skórka renderowana na żywo na [stronie przykładów](/pl/examples/skins#custom-mint).

### Rozszerzenie default {#extend-default}

Zachowaj klasyczną strukturę, dostrój kolory:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` jest niejawnym korzeniem, więc klucz można pominąć: `{ toolbar: 'flat', … }` również startuje od classic.

### Pełna własna skórka {#full-custom}

Bez `extends`, bez rejestracji: przekaż obiekt do właściwości `skin` i ustaw swobodnie flagi kształtu i tokeny. `name` nadaje klasie korzenia Twoją własną etykietę (zobacz niżej); bez niej jest to `tiptapify-skin-inline`.

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

`defineSkin` to pomocnik tożsamościowy do typowanych definicji const (nie trafia do żadnego rejestru). Flagi kształtu można ustawiać pojedynczo — każda pominięta flaga pozostaje classic.

## Furtka awaryjna: klasa korzenia {#escape-hatch-the-root-class}

Każdy korzeń edytora ma klasę `tiptapify-skin-{name}` (`tiptapify-skin-inline` dla bezimiennego obiektu inline). Biblioteka **nigdy nie opiera żadnej reguły na nazwie skórki** — klasa należy do Ciebie:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Stabilne punkty zaczepienia, pod które możesz pisać style:

| klasa | gdzie |
|---|---|
| `tiptapify-skin-{name}` | korzeń edytora |
| `tiptapify-shape-{flag}-{value}` ×6 | korzeń edytora — rozwiązany kształt |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | pasek narzędzi i jego sekcje |
| `tiptapify-quiet-buttons` | korzenie paska narzędzi i dymków przy `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | rząd każdego menu dymka i cienka linia między jego grupami |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | rzędy menu zaznaczenia, pustego wiersza i obrazu |
| `tiptapify-btn--active` | wciśnięty przycisk menu dymka (aktywny znacznik, opływanie obrazu) |
| `tiptapify-menu` · `tiptapify-menu--soft` | zawartość nakładki menu rozwijanego, nośnik reguł łagodnego menu |
| `tiptapify-skin-scope` | div zakresu tokenów wewnątrz teleportowanych menu |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | karta okna dialogowego i jej łagodny nośnik |
| `tiptapify-frame` | opakowanie obramowania edytora |

**Obrona przed motywem konsumenta.** Warstwa skórek jest zbudowana tak, by przetrwać motywy paneli administracyjnych, które dodają wypełnienia i przemalowują wnętrze Vuetify: reguły są ograniczone klasami kształtu/nośnika, używają podwojonych klas (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) dla specyficzności i zachowują `!important` tylko tam, gdzie przypadek motywu administracyjnego z commita bazowego udowodnił, że jest to konieczne (zestaw obronny menu.css). Konwencje, dzięki którym Twoje własne nadpisania działają na tym samym polu bitwy:

- ogranicz swój CSS do `.tiptapify-skin-{name}` (lub klasy kształtu) — nigdy do gołych elementów wewnętrznych Vuetify;
- dla wymiarów z katalogu preferuj tokeny (`--tf-*`), a dla reszty klasy;
- dopasuj podwojenie przy nadpisywaniu komponentów Vuetify (pojedyncze `.v-list-item` przegrywa z regułami skórki).

## Kontrakt wizualny (uwaga dla współtwórców) {#visual-contract-contributor-note}

Obliczone style wbudowanych skórek są utrwalone w pliku wzorcowym `src/skins/__fixtures__/skin-baseline.json` (13 sekcji × jasny/ciemny): warstwa CSS jest gotowa, gdy zmierzona macierz się z nim zgadza. Uwagi do odczytu pliku wzorcowego:

- Wymiarów hover/active nie da się wymusić ze strony, więc nagranie odczytuje **tekst deklaracji pierwszej trafionej reguły CSSOM** dla każdego selektora hover i rozwiązuje go przez element sondujący wewnątrz korzenia skórki (pole `resolved`) — to kontrakt zwycięskiej reguły, a nie żywa migawka `:hover`.
- `_meta.selectors.menu` zapisuje tekst selektora sprzed `SkinScope`. Plik wzorcowy jest zamrożony (wartości normatywne), więc pole jest celowo nieaktualne; pakiet nagrywający utrwala bieżący selektor.
- Plik wzorcowy niesie zatwierdzone zmiany w `_meta.notes`: przywrócenie znaczników VBtnGroup przy `groups: 'box'` z 18.10.2026 ponownie zmierzyło pola przycisków podrzędnych classic `groupBtn`/`buttonsActive` (połączone narożniki, pole posiada wyniesienie). Pola pastel pozostały nietknięte — celowa zmiana wizualna aktualizuje tylko dotknięte komórki classic, zapisuje notatkę i dostarcza wiersz w CHANGELOG.

## Zobacz także {#see-also}

- [Przykłady skórek](/pl/examples/skins) — classic, pastel i własna skórka mint, na żywo.
- [Właściwość `skin`](/pl/api/props#skin) · [typy skórek](/pl/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/pl/api/types#tiptapifyskininput).
