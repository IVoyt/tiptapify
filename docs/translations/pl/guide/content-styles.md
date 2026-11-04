# Style treści {#content-styles}

Część tego, co zapisuje edytor, potrzebuje własnego wyglądu na stronie, która to wyświetla: karty linków, obrazy z podpisem i opływaniem, filmy i osadzenia dopasowane do szerokości tekstu, listy zadań z polem wyboru przy każdej pozycji. Bez niego karta linku to zwykły link, w którym obraz i teksty zlewają się ze sobą.

Właściwość `contentStyles` określa, w jaki sposób zapisany HTML niesie ten wygląd:

| `contentStyles` | zapisany HTML | na stronie |
|---|---|---|
| `inline` (domyślnie) | wygląd jest zapisany w atrybutach `style` tych elementów | nic do ładowania: HTML wyświetla się taki, jaki jest |
| `classes` | tylko klasy i atrybuty `data-` | załaduj `tiptapify/content.css` i umieść HTML w elemencie z klasą `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Oba niosą te same reguły, którymi sam edytor wyświetla treść, więc w obu przypadkach strona wygląda jak w edytorze. Dostają je tylko te elementy: nagłówki, akapity, listy, tabele i reszta tekstu zachowują style strony.

## Style inline {#inline-styles}

Ustawienie domyślne. Kompaktowa karta linku jest zapisywana tak:

```html
<a class="tiptapify-link-card" data-link-card="compact" href="https://example.com/blog/getting-started" target="_blank" rel="noopener noreferrer" style="display: flex; flex-wrap: wrap; overflow: hidden; margin: 1rem 0; border: 1px solid rgba(128, 128, 128, 0.35); border-radius: 10px; color: inherit; text-decoration: none;">
  <img class="tiptapify-link-card__image" src="https://example.com/images/getting-started.png" alt="" style="flex: 1 1 180px; min-width: 0; max-width: 100%; min-height: 100px; margin: 0; object-fit: cover;">
  <span class="tiptapify-link-card__body" style="display: flex; flex: 999 1 260px; flex-direction: column; gap: 4px; min-width: 0; padding: 12px 16px;">
    <span class="tiptapify-link-card__site" style="font-size: 0.8125em; opacity: 0.7;">Example</span>
    <span class="tiptapify-link-card__title" style="font-weight: 600; line-height: 1.35;">Getting started</span>
    <span class="tiptapify-link-card__description" style="display: -webkit-box; overflow: hidden; font-size: 0.875em; line-height: 1.45; opacity: 0.7; -webkit-box-orient: vertical; -webkit-line-clamp: 3;">Install the package and create your first page.</span>
  </span>
</a>
```

- **Kolory pozostają kolorami strony.** Tekst dziedziczy kolor; przygaszony tekst i obramowania używają przezroczystości i półprzezroczystej szarości, więc działają zarówno na jasnej, jak i ciemnej stronie. Kolor tekstu dla motywu ustaw na stronie jak zwykle.
- **Media queries nie są potrzebne.** Kompaktowa karta sama umieszcza obraz nad tekstami w wąskiej kolumnie; filmy i osadzenia nigdy nie są szersze niż tekst.
- **Strona nadal może zmienić ich styl**, klasy zostają. Styl inline wygrywa z regułą klasy, więc taka reguła wymaga `!important`.
- **Sanitizer musi zachować atrybut `style`** na tych elementach, inaczej stracą swój wygląd.

## Klasy i content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` jest niewielki i nie zawiera ani Vue, ani Vuetify. Jego reguły są opakowane w `:where(.tiptapify-content)`, więc nic nie ważą: każda reguła strony wygrywa z nimi bez `!important`. Użyj go, gdy strona chce mieć wygląd w jednym miejscu albo sama stylizuje swoją treść.

`contentCss(scope)` zwraca ten sam arkusz stylów jako ciąg znaków, dla klasy innej niż `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Ponowne wczytywanie HTML {#loading-html-back}

Edytor odczytuje te elementy wyłącznie po ich atrybutach i klasach: kartę linku po `data-link-card`, obraz po `src`, rozmiarze i opływaniu, zadanie po `data-checked`. Ich style inline są ignorowane przy wczytywaniu HTML i zapisywane ponownie przy zapisie. Dzięki temu ten sam HTML przechodzi tam i z powrotem bez zmian, dokument zapisany z `inline` wczytuje się bez problemu z `classes` i odwrotnie, a późniejsza wersja edytora aktualizuje wygląd dokumentu przy jego następnym zapisie.

Formatowanie tekstu pozostaje nietknięte: kolor lub rozmiar tekstu i wyrównanie akapitu są treścią, a edytor nadal odczytuje je z ich stylów.

Aby zamienić HTML z klasami na HTML ze stylami inline poza edytorem (starszy dokument, e-mail), użyj `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Wymaga DOM (przeglądarki lub jsdom na serwerze), a bez niego zwraca HTML w niezmienionej postaci.

## Slidery obrazów {#image-sliders}

Podczas pisania edytor oznacza obrazy w jednym rzędzie jako slider (zobacz właściwość `imageSlider`); zapisany HTML zachowuje je jako figury jedna po drugiej. Pokazanie ich jako slidera zależy od własnego skryptu strony.
