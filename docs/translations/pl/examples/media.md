# Multimedia {#media}

## Obrazy {#images}

Wstawianie obrazów z adresu URL:

```vue
<script setup lang="ts">
const onEditorReady = (options) => {
  // Insert an image programmatically
  options.editor.commands.setImage({ src: 'https://picsum.photos/600/300' })
}
</script>

<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']"
    @editor-ready="onEditorReady"
  />
</template>
```

Przycisk obrazu otwiera okno obrazu:

- **Z adresu URL** lub **Prześlij**. Bez [endpointu przesyłania](/pl/guide/uploads) wybrany plik jest osadzany jako base64 data URL; z endpointem plik trafia na Twój serwer.
- **Tekst alternatywny** (okno przypomina o nim, gdy jest pusty) oraz **podpis** pod obrazem.
- **Rozmiar**: oryginalny, szerokość tekstu albo własna szerokość × wysokość z blokadą proporcji.
- **Położenie**: na środku w osobnym wierszu albo opływany tekstem z lewej lub prawej strony.

Zaznaczony obraz ma uchwyty zmiany rozmiaru (każda zmiana rozmiaru to jeden krok cofania) oraz pasek narzędzi nad sobą: opływanie z lewej lub prawej, pobranie, edycja, usunięcie. Dwukrotne kliknięcie otwiera okno.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Wideo {#videos}

Osadzaj filmy z YouTube i Vimeo albo plik wideo:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Przycisk wideo otwiera okno wideo:

- **Link do YouTube lub Vimeo** zamienia się w ich odtwarzacz; okno pokazuje rozpoznanego dostawcę i podgląd oraz pole **Zacznij od** (wypełnione z `?t=`), tam gdzie odtwarzacz je obsługuje.
- **Link do pliku wideo** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) zamienia się w `<video>` z okładką, elementami sterującymi, autoodtwarzaniem (bez dźwięku) i zapętleniem. Link musi mieć protokół (`https://`, `http://`), `//host` albo `/path`: okno nigdy go nie zgaduje.
- **Prześlij** wysyła plik wideo na Twój serwer; pojawia się tylko przy [endpoincie przesyłania](/pl/guide/uploads).
- **Rozmiar**: responsywny 16:9 albo własna szerokość × wysokość z blokadą proporcji.

Adres URL YouTube wklejony w tekst również zostanie osadzony. Kliknięcie odtwarzacza zaznacza go zamiast uruchamiać odtwarzanie, dzięki czemu pokazuje go przycisk na pasku narzędzi; dwukrotne kliknięcie otwiera okno.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Wklej adres URL YouTube, aby osadzić film..." />

## Elementy iframe {#iframes}

Osadź stronę przez jej adres lub kod iframe z menu Udostępnij albo Osadź:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Okno iframe odczytuje wklejony kod (adres, rozmiar, tytuł, uprawnienia, sandbox, leniwe ładowanie, pełny ekran) i informuje, co z niego przejęło; kod ze skryptami lub innymi znacznikami jest odrzucany. Pokazuje podgląd i ma pole **tytuł dla czytników ekranu**, rozmiar (responsywny w proporcjach kodu albo własny z blokadą proporcji), a w sekcji **Zaawansowane** nazwę, `allow`, `sandbox`, leniwe ładowanie i obramowanie. Adres musi zaczynać się od `https://` lub `http://`. Dwukrotne kliknięcie osadzenia otwiera okno.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Wpisz adres URL do osadzenia jako iframe..." />

## Tabele {#tables}

Wstawianie i edycja tabel:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Po wstawieniu tabeli możesz:
- Dodawać i usuwać wiersze oraz kolumny
- Zaznaczać komórki
- Usunąć całą tabelę

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Użyj przycisku tabeli, aby wstawić tabelę..." />

## Linki {#links}

Wstawianie hiperłączy:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Okno linku przyjmuje adres dokładnie tak, jak został wpisany: `https://…`, dowolny inny schemat (`ftp://`, `ssh://`, wewnętrzny), `mailto:`, `tel:`, `#anchor` lub `/page`. Nigdy samo nie dodaje protokołu: adres bez niego (`example.com`, `internal.host:8080`) dostaje chipy do dodania `https://`, `http://` lub `ftp://` i pozostaje bez zmian, jeśli żadnego nie dodasz. Adresy `javascript:`, `vbscript:` i `data:` są odrzucane.

Okno ma też pole tekstu linku, opcję **Otwórz w nowej karcie** (która dodaje `noopener noreferrer`), a w sekcji **Zaawansowane** wartości `rel` jako chipy (dowolna wartość: dodaje ją Enter, spacja lub przecinek) oraz klasę CSS.

Dzięki właściwości [`linkPreview`](/pl/api/props#linkpreview) to samo okno pokazuje link jako kartę z obrazem, tytułem i opisem strony, a adres URL wklejony w pustym wierszu oferuje **Link / Karta** — zobacz [Karty linków](/pl/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Zaznacz tekst i kliknij link, aby dodać hiperłącze..." />

## Emoji {#emoji}

Wstawiaj emoji z wbudowanego selektora z 10 kategoriami:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Selektor emoji zawiera pole wyszukiwania/filtrowania, które pozwala szybko znaleźć konkretne emoji.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Kliknij przycisk emoji, aby wstawić emoji..." />

## Znaki specjalne (Charmap) {#special-characters-charmap}

Wstawiaj znaki specjalne, strzałki, litery greckie, symbole matematyczne i inne:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Kategorie obejmują:
- Strzałki
- Waluty
- Litery greckie
- Symbole matematyczne
- Różne

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Kliknij charmap, aby wstawić znaki specjalne..." />

## Łączenie narzędzi multimedialnych {#combining-media-tools}

Pełny pasek narzędzi multimedialnych:

```vue
<template>
  <Tiptapify
    :items="[
      'bold', 'italic', 'underline',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'undo', 'redo'
    ]"
    placeholder="Full media toolbar..."
  />
</template>
```

<InteractiveEditor :items="[
'bold', 'italic', 'underline',
'|',
'link', 'image', 'video', 'iframe',
'|',
'emoji', 'charmap', 'table',
'|',
'undo', 'redo'
]"
placeholder="Pełny pasek multimediów..." />
