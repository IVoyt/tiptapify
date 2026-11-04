# Verktygsfältsobjekt {#toolbar-items}

Alla tillgängliga verktygsfältsobjekt ordnade efter sektion.

## Åtgärder {#actions}

| Objekt   | Beskrivning                      |
|----------|----------------------------------|
| `undo`   | Ångra den senaste ändringen      |
| `redo`   | Gör om den senast ångrade ändringen |
| `resetChanges` | Förkasta alla ändringar sedan redigeraren öppnades och rensa historiken (frågar först) |

## AI {#ai}

| Objekt | Beskrivning                                          |
|--------|------------------------------------------------------|
| `ai`   | Öppna AI-dialogen för begäran om den är konfigurerad |

## Format {#format}

| Objekt      | Beskrivning               |
|-------------|---------------------------|
| `bold`      | Växla fet text            |
| `italic`    | Växla kursiv text         |
| `underline` | Växla understruken text   |
| `strike`    | Växla genomstruken text   |

## Extra format {#format-extra}

| Objekt       | Beskrivning                                   |
|--------------|-----------------------------------------------|
| `sup`        | Växla upphöjd text                            |
| `sub`        | Växla nedsänkt text                           |
| `code`       | Växla inbäddad kod                            |
| `codeBlock`  | Infoga ett kodblock med syntaxmarkering       |
| `blockquote` | Infoga ett blockcitat                         |

## Stil {#style}

| Objekt           | Beskrivning                                |
|------------------|--------------------------------------------|
| `heading`        | Rullgardin för att välja rubriknivå (H1-H6) |
| `fontFamily`     | Rullgardin för att välja teckensnitt       |
| `fontSize`       | Rullgardin för att välja teckenstorlek     |
| `lineHeight`     | Ange radhöjd                               |
| `textColor`      | Textfärg: palett, senaste färger, HEX, pipett, egen väljare |
| `highlightColor` | Markeringsfärg: samma väljare, "Ingen markering" först |

Objektet `heading` accepterar alternativ efter ett kolon: rubriknivåer, `p` för att lägga till ett styckeobjekt och `inline` för att visa dem som separata knappar i stället för en rullgardin:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Justering {#alignment}

| Objekt    | Beskrivning                |
|-----------|----------------------------|
| `left`    | Vänsterjustera text        |
| `center`  | Centrera text              |
| `right`   | Högerjustera text          |
| `justify` | Marginaljustera text       |
| `align`   | Rullgardin för justering; `align:left,center,right` begränsar dess alternativ |

## Lista {#list}

| Objekt         | Beskrivning                        |
|----------------|------------------------------------|
| `bulletList`   | Växla punktlista                   |
| `orderedList`  | Växla numrerad lista               |
| `taskList`     | Växla uppgiftslista (kryssrutor)   |
| `indent`       | Indrag för det aktuella blocket    |
| `outdent`      | Minska indrag för det aktuella blocket |

## Media {#media}

| Objekt    | Beskrivning                       |
|-----------|-----------------------------------|
| `link`    | Infoga/redigera en länk, eller ett [länkkort](/sv/guide/link-cards) med `linkPreview` |
| `image`   | Infoga/redigera en bild: via URL eller uppladdning, alternativtext, bildtext, storlek, placering |
| `video`   | Infoga/redigera en YouTube-, Vimeo- eller videofil (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Bädda in en sida via dess adress eller dess iframe-kod |
| `emoji`   | Öppna emojiväljaren (10 kategorier) |
| `charmap` | Öppna väljaren för specialtecken  |
| `table`   | Infoga en tabell                  |

## Övrigt {#misc}

| Objekt          | Beskrivning                                |
|-----------------|--------------------------------------------|
| `line`          | Infoga en horisontell linje                |
| `pagebreak`     | Infoga en sidbrytning                     |
| `source`        | Växla vy för rå HTML-källa                 |
| `preview`       | Växla HTML-förhandsgranskning              |
| `fullscreen`    | Växla helskärmsläge för redigering         |
| `formatClear`   | Ta bort all formatering från markeringen   |
| `invisibleChar` | Infoga osynliga tecken (mellanslag m.m.)   |

## Avgränsare {#separators}

Använd `|` som avgränsare mellan knappgrupper i propen `items` i arrayformat:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Komplett verktygsfältsexempel {#complete-toolbar-example}

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
