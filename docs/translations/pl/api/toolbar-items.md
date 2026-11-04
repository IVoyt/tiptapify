# Elementy paska narzędzi {#toolbar-items}

Wszystkie dostępne elementy paska narzędzi, pogrupowane według sekcji.

## Akcje {#actions}

| Element  | Opis                             |
|----------|----------------------------------|
| `undo`   | Cofa ostatnią zmianę             |
| `redo`   | Ponawia ostatnio cofniętą zmianę |
| `resetChanges` | Odrzuca wszystkie zmiany od otwarcia edytora i czyści historię (najpierw pyta) |

## AI {#ai}

| Element | Opis                                          |
|---------|-----------------------------------------------|
| `ai`    | Otwiera okno zapytania AI, jeśli jest skonfigurowane |

## Formatowanie {#format}

| Element     | Opis                       |
|-------------|----------------------------|
| `bold`      | Włącza/wyłącza pogrubienie |
| `italic`    | Włącza/wyłącza kursywę     |
| `underline` | Włącza/wyłącza podkreślenie |
| `strike`    | Włącza/wyłącza przekreślenie |

## Formatowanie dodatkowe {#format-extra}

| Element      | Opis                                              |
|--------------|---------------------------------------------------|
| `sup`        | Włącza/wyłącza indeks górny                       |
| `sub`        | Włącza/wyłącza indeks dolny                       |
| `code`       | Włącza/wyłącza kod w wierszu                      |
| `codeBlock`  | Wstawia blok kodu z podświetlaniem składni        |
| `blockquote` | Wstawia cytat blokowy                             |

## Styl {#style}

| Element          | Opis                                       |
|------------------|--------------------------------------------|
| `heading`        | Lista rozwijana wyboru poziomu nagłówka (H1-H6) |
| `fontFamily`     | Lista rozwijana wyboru kroju czcionki      |
| `fontSize`       | Lista rozwijana wyboru rozmiaru czcionki   |
| `lineHeight`     | Ustawia wysokość wiersza                   |
| `textColor`      | Kolor tekstu: paleta, ostatnie kolory, HEX, zakraplacz, własny selektor |
| `highlightColor` | Kolor wyróżnienia: ten sam selektor, na początku „Bez wyróżnienia” |

Element `heading` przyjmuje opcje po dwukropku: poziomy nagłówków, `p` do dodania elementu akapitu oraz `inline` do pokazania ich jako osobnych przycisków zamiast listy rozwijanej:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Wyrównanie {#alignment}

| Element   | Opis                          |
|-----------|-------------------------------|
| `left`    | Wyrównuje tekst do lewej      |
| `center`  | Wyrównuje tekst do środka     |
| `right`   | Wyrównuje tekst do prawej     |
| `justify` | Justuje tekst                 |
| `align`   | Lista rozwijana wyrównania; `align:left,center,right` ogranicza jej opcje |

## Lista {#list}

| Element        | Opis                                  |
|----------------|---------------------------------------|
| `bulletList`   | Włącza/wyłącza listę punktowaną       |
| `orderedList`  | Włącza/wyłącza listę numerowaną       |
| `taskList`     | Włącza/wyłącza listę zadań (pola wyboru) |
| `indent`       | Zwiększa wcięcie bieżącego bloku      |
| `outdent`      | Zmniejsza wcięcie bieżącego bloku     |

## Multimedia {#media}

| Element   | Opis                              |
|-----------|-----------------------------------|
| `link`    | Wstawia/edytuje link lub [kartę linku](/pl/guide/link-cards) z `linkPreview` |
| `image`   | Wstawia/edytuje obraz: z URL lub przesłany, tekst alternatywny, podpis, rozmiar, położenie |
| `video`   | Wstawia/edytuje film z YouTube, Vimeo lub plik wideo (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Osadza stronę przez jej adres lub kod iframe |
| `emoji`   | Otwiera selektor emoji (10 kategorii) |
| `charmap` | Otwiera selektor znaków specjalnych |
| `table`   | Wstawia tabelę                    |

## Różne {#misc}

| Element         | Opis                                              |
|-----------------|---------------------------------------------------|
| `line`          | Wstawia linię poziomą                             |
| `pagebreak`     | Wstawia podział strony                            |
| `source`        | Włącza/wyłącza widok surowego kodu HTML           |
| `preview`       | Włącza/wyłącza tryb podglądu HTML                 |
| `fullscreen`    | Włącza/wyłącza tryb edycji na pełnym ekranie      |
| `formatClear`   | Usuwa całe formatowanie z zaznaczenia             |
| `invisibleChar` | Wstawia znaki niewidoczne (spacje itp.)           |

## Separatory {#separators}

Użyj `|` jako separatora między grupami przycisków we właściwości `items` w postaci tablicy:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Pełny przykład paska narzędzi {#complete-toolbar-example}

```vue
<template>
  <Tiptapify
    :items="[
      'undo', 'redo',
      '|',
      'heading', 'fontFamily', 'fontSize',
      '|',
      'bold', 'italic', 'underline', 'strike',
      '|',
      'sup', 'sub', 'code', 'codeBlock', 'blockquote',
      '|',
      'left', 'center', 'right', 'justify',
      '|',
      'bulletList', 'orderedList', 'taskList',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'ai',
      '|',
      'line', 'pagebreak', 'formatClear',
      '|',
      'source', 'preview', 'fullscreen'
    ]"
  />
</template>
```
