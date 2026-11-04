# Elementele barei de instrumente {#toolbar-items}

Toate elementele disponibile ale barei de instrumente, organizate pe secțiuni.

## Acțiuni {#actions}

| Element  | Descriere                          |
|----------|------------------------------------|
| `undo`   | Anulează ultima modificare         |
| `redo`   | Reface ultima modificare anulată   |
| `resetChanges` | Elimină toate modificările de la deschiderea editorului și golește istoricul (cere confirmare) |

## AI {#ai}

| Element | Descriere                                          |
|---------|----------------------------------------------------|
| `ai`    | Deschide dialogul de prompt AI, dacă este configurat |

## Formatare {#format}

| Element     | Descriere                    |
|-------------|------------------------------|
| `bold`      | Comută textul îngroșat       |
| `italic`    | Comută textul cursiv         |
| `underline` | Comută sublinierea           |
| `strike`    | Comută textul tăiat          |

## Formatare suplimentară {#format-extra}

| Element      | Descriere                                      |
|--------------|------------------------------------------------|
| `sup`        | Comută exponentul                              |
| `sub`        | Comută indicele                                |
| `code`       | Comută codul inline                            |
| `codeBlock`  | Inserează un bloc de cod cu evidențierea sintaxei |
| `blockquote` | Inserează un citat                             |

## Stil {#style}

| Element          | Descriere                                  |
|------------------|--------------------------------------------|
| `heading`        | Listă derulantă pentru alegerea nivelului de titlu (H1-H6) |
| `fontFamily`     | Listă derulantă pentru alegerea familiei fontului |
| `fontSize`       | Listă derulantă pentru alegerea dimensiunii fontului |
| `lineHeight`     | Setează înălțimea liniei                   |
| `textColor`      | Culoarea textului: paletă, culori recente, HEX, pipetă, selector personalizat |
| `highlightColor` | Culoarea de evidențiere: același selector, cu „Fără evidențiere” primul |

Elementul `heading` acceptă opțiuni după două puncte: nivelurile de titlu, `p` pentru a adăuga un element de paragraf și `inline` pentru a le afișa ca butoane separate în loc de listă derulantă:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Aliniere {#alignment}

| Element   | Descriere                  |
|-----------|----------------------------|
| `left`    | Aliniază textul la stânga  |
| `center`  | Aliniază textul pe centru  |
| `right`   | Aliniază textul la dreapta |
| `justify` | Justifică textul           |
| `align`   | Listă derulantă de aliniere; `align:left,center,right` îi limitează opțiunile |

## Listă {#list}

| Element        | Descriere                              |
|----------------|----------------------------------------|
| `bulletList`   | Comută lista cu buline                 |
| `orderedList`  | Comută lista numerotată                |
| `taskList`     | Comută lista de sarcini (casete de bifare) |
| `indent`       | Indentează blocul curent               |
| `outdent`      | Scoate din indentare blocul curent     |

## Media {#media}

| Element   | Descriere                         |
|-----------|-----------------------------------|
| `link`    | Inserează/editează un link sau un [card de link](/ro/guide/link-cards) cu `linkPreview` |
| `image`   | Inserează/editează o imagine: prin URL sau încărcare, text alternativ, legendă, dimensiune, poziție |
| `video`   | Inserează/editează un videoclip YouTube, Vimeo sau un fișier video (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Încorporează o pagină după adresa sa sau după codul iframe |
| `emoji`   | Deschide selectorul de emoji (10 categorii) |
| `charmap` | Deschide selectorul de caractere speciale |
| `table`   | Inserează un tabel                |

## Diverse {#misc}

| Element         | Descriere                                  |
|-----------------|--------------------------------------------|
| `line`          | Inserează o linie orizontală               |
| `pagebreak`     | Inserează o întrerupere de pagină          |
| `source`        | Comută vizualizarea codului HTML sursă     |
| `preview`       | Comută modul de previzualizare HTML        |
| `fullscreen`    | Comută modul de editare pe ecran complet   |
| `formatClear`   | Șterge toată formatarea din selecție       |
| `invisibleChar` | Inserează caractere invizibile (spații etc.) |

## Separatori {#separators}

Folosește `|` ca separator între grupurile de butoane în proprietatea `items` de tip listă:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Exemplu complet de bară de instrumente {#complete-toolbar-example}

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
