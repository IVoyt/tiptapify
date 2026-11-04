# Rīkjoslas elementi {#toolbar-items}

Visi pieejamie rīkjoslas elementi, sakārtoti pa sadaļām.

## Darbības {#actions}

| Elements | Apraksts                            |
|----------|-------------------------------------|
| `undo`   | Atsaukt pēdējo izmaiņu              |
| `redo`   | Atcelt pēdējās atsauktās izmaiņas atsaukšanu |

## AI {#ai}

| Elements | Apraksts                                          |
|------|---------------------------------------------------|
| `ai` | Atvērt AI pieprasījuma dialoglodziņu, ja tas ir konfigurēts |

## Formatēšana {#format}

| Elements    | Apraksts                    |
|-------------|-----------------------------|
| `bold`      | Pārslēgt treknrakstu        |
| `italic`    | Pārslēgt slīprakstu         |
| `underline` | Pārslēgt pasvītrojumu       |
| `strike`    | Pārslēgt nosvītrojumu       |

## Papildu formatēšana {#format-extra}

| Elements     | Apraksts                                     |
|--------------|----------------------------------------------|
| `sup`        | Pārslēgt augšrakstu                          |
| `sub`        | Pārslēgt apakšrakstu                         |
| `code`       | Pārslēgt iekļauto kodu                       |
| `codeBlock`  | Ievietot koda bloku ar sintakses izcelšanu   |
| `blockquote` | Ievietot citātu bloku                        |

## Stils {#style}

| Elements         | Apraksts                                   |
|------------------|--------------------------------------------|
| `heading`        | Nolaižamā izvēlne virsraksta līmeņa izvēlei (H1-H6) |
| `fontFamily`     | Nolaižamā izvēlne fontu saimes izvēlei     |
| `fontSize`       | Nolaižamā izvēlne fonta izmēra izvēlei     |
| `lineHeight`     | Iestatīt rindas augstumu                   |
| `textColor`      | Teksta krāsa: palete, nesen lietotās krāsas, HEX, pipete, pielāgota izvēle |
| `highlightColor` | Iezīmējuma krāsa: tā pati izvēle, vispirms “Bez iezīmējuma” |

Elements `heading` pieņem opcijas aiz kola: virsraksta līmeņus, `p`, lai pievienotu rindkopas elementu, un `inline`, lai tos rādītu kā atsevišķas pogas nolaižamās izvēlnes vietā:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Līdzināšana {#alignment}

| Elements  | Apraksts                  |
|-----------|---------------------------|
| `left`    | Līdzināt tekstu pa kreisi |
| `center`  | Līdzināt tekstu centrā    |
| `right`   | Līdzināt tekstu pa labi   |
| `justify` | Izlīdzināt tekstu         |
| `align`   | Līdzināšanas nolaižamā izvēlne; `align:left,center,right` ierobežo tās opcijas |

## Saraksts {#list}

| Elements       | Apraksts                            |
|----------------|-------------------------------------|
| `bulletList`   | Pārslēgt nenumurētu sarakstu        |
| `orderedList`  | Pārslēgt numurētu sarakstu          |
| `taskList`     | Pārslēgt uzdevumu sarakstu (izvēles rūtiņas) |
| `indent`       | Palielināt pašreizējā bloka atkāpi  |
| `outdent`      | Samazināt pašreizējā bloka atkāpi   |

## Multivide {#media}

| Elements  | Apraksts                          |
|-----------|-----------------------------------|
| `link`    | Ievietot/rediģēt saiti vai [saites kartīti](/lv/guide/link-cards) ar `linkPreview` |
| `image`   | Ievietot/rediģēt attēlu: pēc URL vai augšupielādējot, alt teksts, paraksts, izmērs, novietojums |
| `video`   | Ievietot/rediģēt YouTube, Vimeo vai video failu (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Iegult lapu pēc tās adreses vai iframe koda |
| `emoji`   | Atvērt emocijzīmju izvēli (10 kategorijas) |
| `charmap` | Atvērt īpašo rakstzīmju izvēli    |
| `table`   | Ievietot tabulu                   |

## Dažādi {#misc}

| Elements        | Apraksts                                   |
|-----------------|--------------------------------------------|
| `line`          | Ievietot horizontālu līniju                |
| `pagebreak`     | Ievietot lapas pārtraukumu                 |
| `source`        | Pārslēgt neapstrādāta HTML avota skatu     |
| `preview`       | Pārslēgt HTML priekšskatījuma režīmu       |
| `fullscreen`    | Pārslēgt pilnekrāna rediģēšanas režīmu     |
| `formatClear`   | Notīrīt visu atlases formatējumu           |
| `invisibleChar` | Ievietot neredzamās rakstzīmes (atstarpes u.c.) |

## Atdalītāji {#separators}

Izmantojiet `|` kā atdalītāju starp pogu grupām masīva stila rekvizītā `items`:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Pilns rīkjoslas piemērs {#complete-toolbar-example}

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
