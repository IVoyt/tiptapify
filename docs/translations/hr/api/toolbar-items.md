# Stavke alatne trake {#toolbar-items}

Sve dostupne stavke alatne trake, organizirane po odjeljcima.

## Radnje {#actions}

| Stavka   | Opis                                |
|----------|-------------------------------------|
| `undo`   | Poništi zadnju promjenu             |
| `redo`   | Ponovi zadnju poništenu promjenu    |

## AI {#ai}

| Stavka | Opis                                            |
|--------|-------------------------------------------------|
| `ai`   | Otvori AI dijalog za upit, ako je konfiguriran  |

## Oblikovanje {#format}

| Stavka      | Opis                      |
|-------------|---------------------------|
| `bold`      | Uključi/isključi podebljano   |
| `italic`    | Uključi/isključi kurziv       |
| `underline` | Uključi/isključi podcrtano    |
| `strike`    | Uključi/isključi precrtano    |

## Dodatno oblikovanje {#format-extra}

| Stavka       | Opis                                         |
|--------------|----------------------------------------------|
| `sup`        | Uključi/isključi eksponent                   |
| `sub`        | Uključi/isključi indeks                      |
| `code`       | Uključi/isključi kôd u retku                 |
| `codeBlock`  | Umetni blok koda s isticanjem sintakse       |
| `blockquote` | Umetni citat                                 |

## Stil {#style}

| Stavka           | Opis                                                               |
|------------------|--------------------------------------------------------------------|
| `heading`        | Padajući izbornik za odabir razine naslova (H1-H6)                 |
| `fontFamily`     | Padajući izbornik za odabir obitelji fonta                         |
| `fontSize`       | Padajući izbornik za odabir veličine fonta                         |
| `lineHeight`     | Postavi visinu retka                                               |
| `textColor`      | Boja teksta: paleta, nedavne boje, HEX, pipeta, prilagođeni birač  |
| `highlightColor` | Boja isticanja: isti birač, prvo „Bez isticanja“                   |

Stavka `heading` prihvaća opcije nakon dvotočke: razine naslova, `p` za dodavanje stavke odlomka i `inline` za prikaz kao zasebnih gumba umjesto padajućeg izbornika:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Poravnanje {#alignment}

| Stavka    | Opis                                                                  |
|-----------|-----------------------------------------------------------------------|
| `left`    | Poravnaj tekst lijevo                                                 |
| `center`  | Centriraj tekst                                                       |
| `right`   | Poravnaj tekst desno                                                  |
| `justify` | Obostrano poravnaj tekst                                              |
| `align`   | Padajući izbornik poravnanja; `align:left,center,right` ograničava njegove opcije |

## Popis {#list}

| Stavka         | Opis                                    |
|----------------|-----------------------------------------|
| `bulletList`   | Uključi/isključi popis s oznakama       |
| `orderedList`  | Uključi/isključi numerirani popis       |
| `taskList`     | Uključi/isključi popis zadataka (potvrdni okviri) |
| `indent`       | Uvuci trenutni blok                     |
| `outdent`      | Smanji uvlaku trenutnog bloka           |

## Mediji {#media}

| Stavka    | Opis                                                                       |
|-----------|----------------------------------------------------------------------------|
| `link`    | Umetni/uredi poveznicu ili [karticu poveznice](/hr/guide/link-cards) uz `linkPreview` |
| `image`   | Umetni/uredi sliku: putem URL-a ili prijenosa, alt, opis, veličina, položaj |
| `video`   | Umetni/uredi YouTube, Vimeo ili videodatoteku (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Ugradi stranicu putem njezine adrese ili iframe koda                       |
| `emoji`   | Otvori birač emojija (10 kategorija)                                       |
| `charmap` | Otvori birač posebnih znakova                                              |
| `table`   | Umetni tablicu                                                             |

## Razno {#misc}

| Stavka          | Opis                                            |
|-----------------|-------------------------------------------------|
| `line`          | Umetni vodoravnu crtu                           |
| `pagebreak`     | Umetni prijelom stranice                        |
| `source`        | Uključi/isključi prikaz izvornog HTML-a         |
| `preview`       | Uključi/isključi način pregleda HTML-a          |
| `fullscreen`    | Uključi/isključi uređivanje na cijelom zaslonu  |
| `formatClear`   | Ukloni sve oblikovanje iz odabira               |
| `invisibleChar` | Umetni nevidljive znakove (razmake itd.)        |

## Separatori {#separators}

Koristite `|` kao separator između grupa gumba u propu `items` u obliku niza:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Cjelovit primjer alatne trake {#complete-toolbar-example}

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
