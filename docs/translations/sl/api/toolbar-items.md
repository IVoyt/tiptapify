# Elementi orodne vrstice {#toolbar-items}

Vsi razpoložljivi elementi orodne vrstice, razvrščeni po odsekih.

## Dejanja {#actions}

| Element  | Opis                        |
|----------|-----------------------------|
| `undo`   | Razveljavi zadnjo spremembo |
| `redo`   | Ponovi zadnjo razveljavljeno spremembo |
| `resetChanges` | Zavrže vse spremembe od odprtja urejevalnika in počisti zgodovino (najprej vpraša) |

## AI {#ai}

| Element | Opis                                    |
|------|------------------------------------------|
| `ai` | Odpre pogovorno okno z navodilom AI, če je nastavljeno  |

## Oblika {#format}

| Element     | Opis                 |
|-------------|----------------------|
| `bold`      | Preklopi krepko besedilo |
| `italic`    | Preklopi ležeče besedilo |
| `underline` | Preklopi podčrtano besedilo |
| `strike`    | Preklopi prečrtano besedilo |

## Dodatna oblika {#format-extra}

| Element      | Opis                                         |
|--------------|----------------------------------------------|
| `sup`        | Preklopi nadpisano besedilo                  |
| `sub`        | Preklopi podpisano besedilo                  |
| `code`       | Preklopi vrstično kodo                       |
| `codeBlock`  | Vstavi blok kode z barvanjem sintakse        |
| `blockquote` | Vstavi citat                                 |

## Slog {#style}

| Element          | Opis                                       |
|------------------|--------------------------------------------|
| `heading`        | Spustni meni za izbiro ravni naslova (H1-H6) |
| `fontFamily`     | Spustni meni za izbiro družine pisave      |
| `fontSize`       | Spustni meni za izbiro velikosti pisave    |
| `lineHeight`     | Nastavi višino vrstice                     |
| `textColor`      | Barva besedila: paleta, nedavne barve, HEX, kapalka, izbirnik po meri |
| `highlightColor` | Barva poudarjanja: isti izbirnik, najprej „Brez poudarjanja“ |

Element `heading` sprejme možnosti za dvopičjem: ravni naslovov, `p` za dodajanje elementa odstavka in `inline` za prikaz kot ločenih gumbov namesto spustnega menija:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Poravnava {#alignment}

| Element   | Opis              |
|-----------|-------------------|
| `left`    | Poravna besedilo levo |
| `center`  | Poravna besedilo v sredino |
| `right`   | Poravna besedilo desno |
| `justify` | Poravna besedilo v bloku |
| `align`   | Spustni meni poravnave; `align:left,center,right` omeji njegove možnosti |

## Seznam {#list}

| Element        | Opis                          |
|----------------|-------------------------------|
| `bulletList`   | Preklopi neoštevilčen seznam  |
| `orderedList`  | Preklopi oštevilčen seznam    |
| `taskList`     | Preklopi seznam opravil (potrditvena polja) |
| `indent`       | Zamakne trenutni blok         |
| `outdent`      | Odmakne trenutni blok         |

## Mediji {#media}

| Element   | Opis                              |
|-----------|-----------------------------------|
| `link`    | Vstavi/uredi povezavo ali [kartico povezave](/sl/guide/link-cards) z `linkPreview` |
| `image`   | Vstavi/uredi sliko: prek URL-ja ali nalaganja, nadomestno besedilo, napis, velikost, položaj |
| `video`   | Vstavi/uredi video YouTube, Vimeo ali video datoteko (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Vdelaj stran prek njenega naslova ali kode iframe |
| `emoji`   | Odpre izbirnik emojijev (10 kategorij) |
| `charmap` | Odpre izbirnik posebnih znakov    |
| `table`   | Vstavi tabelo                     |

## Razno {#misc}

| Element         | Opis                                       |
|-----------------|--------------------------------------------|
| `line`          | Vstavi vodoravno črto                      |
| `pagebreak`     | Vstavi prelom strani                       |
| `source`        | Preklopi pogled na izvorni HTML            |
| `preview`       | Preklopi način predogleda HTML             |
| `fullscreen`    | Preklopi celozaslonski način urejanja      |
| `formatClear`   | Počisti vse oblikovanje izbora             |
| `invisibleChar` | Vstavi nevidne znake (presledke itd.)      |

## Ločila {#separators}

Za ločilo med skupinami gumbov v lastnosti `items` v obliki polja uporabite `|`:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Popoln primer orodne vrstice {#complete-toolbar-example}

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
