# Stavke trake sa alatima {#toolbar-items}

Sve dostupne stavke trake sa alatima, organizovane po odeljcima.

## Radnje {#actions}

| Stavka   | Opis                                 |
|----------|--------------------------------------|
| `undo`   | Poništi poslednju izmenu             |
| `redo`   | Ponovi poslednju poništenu izmenu    |

## AI {#ai}

| Stavka | Opis                                              |
|--------|---------------------------------------------------|
| `ai`   | Otvara AI dijalog za unos upita, ako je podešen   |

## Format {#format}

| Stavka      | Opis                      |
|-------------|---------------------------|
| `bold`      | Uključi/isključi podebljano |
| `italic`    | Uključi/isključi kurziv   |
| `underline` | Uključi/isključi podvlačenje |
| `strike`    | Uključi/isključi precrtavanje |

## Dodatni format {#format-extra}

| Stavka       | Opis                                         |
|--------------|----------------------------------------------|
| `sup`        | Uključi/isključi eksponent                   |
| `sub`        | Uključi/isključi indeks                      |
| `code`       | Uključi/isključi kod u liniji                |
| `codeBlock`  | Umetni blok koda sa isticanjem sintakse      |
| `blockquote` | Umetni citat                                 |

## Stil {#style}

| Stavka           | Opis                                                               |
|------------------|--------------------------------------------------------------------|
| `heading`        | Padajući meni za izbor nivoa naslova (H1-H6)                       |
| `fontFamily`     | Padajući meni za izbor porodice fonta                              |
| `fontSize`       | Padajući meni za izbor veličine fonta                              |
| `lineHeight`     | Podešavanje visine reda                                            |
| `textColor`      | Boja teksta: paleta, nedavne boje, HEX, pipeta, prilagođeni birač  |
| `highlightColor` | Boja isticanja: isti birač, prva opcija je „Bez isticanja“         |

Stavka `heading` prihvata opcije posle dvotačke: nivoe naslova, `p` za dodavanje stavke za pasus i `inline` da se prikažu kao zasebna dugmad umesto padajućeg menija:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Poravnanje {#alignment}

| Stavka    | Opis                                                                  |
|-----------|-----------------------------------------------------------------------|
| `left`    | Poravnaj tekst ulevo                                                  |
| `center`  | Centriraj tekst                                                       |
| `right`   | Poravnaj tekst udesno                                                 |
| `justify` | Obostrano poravnaj tekst                                              |
| `align`   | Padajući meni za poravnanje; `align:left,center,right` ograničava opcije |

## Liste {#list}

| Stavka         | Opis                                   |
|----------------|----------------------------------------|
| `bulletList`   | Uključi/isključi listu sa tačkama      |
| `orderedList`  | Uključi/isključi numerisanu listu      |
| `taskList`     | Uključi/isključi listu zadataka (polja za potvrdu) |
| `indent`       | Uvuci trenutni blok                    |
| `outdent`      | Izvuci trenutni blok                   |

## Mediji {#media}

| Stavka    | Opis                                                                       |
|-----------|----------------------------------------------------------------------------|
| `link`    | Umetni/uredi vezu ili [karticu veze](/sr/guide/link-cards) pomoću `linkPreview` |
| `image`   | Umetni/uredi sliku: preko URL-a ili otpremanjem, alt tekst, opis, veličina, položaj |
| `video`   | Umetni/uredi YouTube, Vimeo ili video fajl (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Ugradi stranicu preko njene adrese ili iframe koda                         |
| `emoji`   | Otvori izbor emodžija (10 kategorija)                                      |
| `charmap` | Otvori izbor posebnih znakova                                              |
| `table`   | Umetni tabelu                                                              |

## Ostalo {#misc}

| Stavka          | Opis                                         |
|-----------------|----------------------------------------------|
| `line`          | Umetni horizontalnu liniju                   |
| `pagebreak`     | Umetni prelom stranice                       |
| `source`        | Uključi/isključi prikaz izvornog HTML-a      |
| `preview`       | Uključi/isključi HTML pregled                |
| `fullscreen`    | Uključi/isključi uređivanje preko celog ekrana |
| `formatClear`   | Ukloni sve formatiranje iz izbora            |
| `invisibleChar` | Umetni nevidljive znakove (razmake itd.)     |

## Separatori {#separators}

Koristite `|` kao separator između grupa dugmadi u propu `items` zadatom kao niz:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Primer kompletne trake sa alatima {#complete-toolbar-example}

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
