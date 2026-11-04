# Položky panelu nástrojů {#toolbar-items}

Všechny dostupné položky panelu nástrojů seřazené podle sekcí.

## Akce {#actions}

| Položka  | Popis                       |
|----------|-----------------------------|
| `undo`   | Vrátit poslední změnu       |
| `redo`   | Znovu provést vrácenou změnu |
| `resetChanges` | Zahodí všechny změny od otevření editoru a vymaže historii (nejprve se zeptá) |

## AI {#ai}

| Položka | Popis                                              |
|---------|----------------------------------------------------|
| `ai`    | Otevřít dialog s příkazem pro AI, pokud je nakonfigurována |

## Formát {#format}

| Položka     | Popis                |
|-------------|----------------------|
| `bold`      | Přepnout tučný text  |
| `italic`    | Přepnout kurzívu     |
| `underline` | Přepnout podtržení   |
| `strike`    | Přepnout přeškrtnutí |

## Další formátování {#format-extra}

| Položka      | Popis                                        |
|--------------|----------------------------------------------|
| `sup`        | Přepnout horní index                         |
| `sub`        | Přepnout dolní index                         |
| `code`       | Přepnout inline kód                          |
| `codeBlock`  | Vložit blok kódu se zvýrazněním syntaxe      |
| `blockquote` | Vložit citaci                                |

## Styl {#style}

| Položka          | Popis                                      |
|------------------|--------------------------------------------|
| `heading`        | Rozbalovací nabídka pro výběr úrovně nadpisu (H1-H6) |
| `fontFamily`     | Rozbalovací nabídka pro výběr písma        |
| `fontSize`       | Rozbalovací nabídka pro výběr velikosti písma |
| `lineHeight`     | Nastavit řádkování                         |
| `textColor`      | Barva textu: paleta, nedávné barvy, HEX, pipeta, vlastní výběr |
| `highlightColor` | Barva zvýraznění: stejný výběr, na prvním místě „Bez zvýraznění“ |

Položka `heading` přijímá za dvojtečkou volby: úrovně nadpisů, `p` pro přidání položky odstavce a `inline` pro zobrazení jako samostatná tlačítka místo rozbalovací nabídky:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Zarovnání {#alignment}

| Položka   | Popis             |
|-----------|-------------------|
| `left`    | Zarovnat text vlevo |
| `center`  | Zarovnat text na střed |
| `right`   | Zarovnat text vpravo |
| `justify` | Zarovnat text do bloku |
| `align`   | Rozbalovací nabídka zarovnání; `align:left,center,right` omezí její volby |

## Seznam {#list}

| Položka        | Popis                         |
|----------------|-------------------------------|
| `bulletList`   | Přepnout odrážkový seznam     |
| `orderedList`  | Přepnout číslovaný seznam     |
| `taskList`     | Přepnout seznam úkolů (zaškrtávací políčka) |
| `indent`       | Zvětšit odsazení aktuálního bloku |
| `outdent`      | Zmenšit odsazení aktuálního bloku |

## Média {#media}

| Položka   | Popis                             |
|-----------|-----------------------------------|
| `link`    | Vložit/upravit odkaz, nebo [kartu odkazu](/cs/guide/link-cards) s `linkPreview` |
| `image`   | Vložit/upravit obrázek: z URL nebo nahráním, alt, popisek, velikost, umístění |
| `video`   | Vložit/upravit video z YouTube, Vimeo nebo videosoubor (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Vložit stránku podle její adresy nebo kódu iframe |
| `emoji`   | Otevřít výběr emoji (10 kategorií) |
| `charmap` | Otevřít výběr speciálních znaků   |
| `table`   | Vložit tabulku                    |

## Různé {#misc}

| Položka         | Popis                                      |
|-----------------|--------------------------------------------|
| `line`          | Vložit vodorovnou čáru                     |
| `pagebreak`     | Vložit zalomení stránky                    |
| `source`        | Přepnout zobrazení zdrojového HTML         |
| `preview`       | Přepnout režim náhledu HTML                |
| `fullscreen`    | Přepnout režim úprav na celou obrazovku    |
| `formatClear`   | Vymazat veškeré formátování výběru         |
| `invisibleChar` | Vložit neviditelné znaky (mezery apod.)    |

## Oddělovače {#separators}

Znak `|` slouží jako oddělovač mezi skupinami tlačítek v prop `items` zadaném jako pole:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Kompletní příklad panelu nástrojů {#complete-toolbar-example}

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
