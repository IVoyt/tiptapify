# Toolbaritems {#toolbar-items}

Alle beschikbare toolbaritems, per sectie gegroepeerd.

## Acties {#actions}

| Item     | Beschrijving                           |
|----------|----------------------------------------|
| `undo`   | De laatste wijziging ongedaan maken    |
| `redo`   | De laatst ongedaan gemaakte wijziging opnieuw uitvoeren |

## AI {#ai}

| Item | Beschrijving                                        |
|------|-----------------------------------------------------|
| `ai` | Opent de AI-promptdialoog, indien geconfigureerd    |

## Opmaak {#format}

| Item        | Beschrijving                  |
|-------------|-------------------------------|
| `bold`      | Vet in- of uitschakelen       |
| `italic`    | Cursief in- of uitschakelen   |
| `underline` | Onderstrepen in- of uitschakelen |
| `strike`    | Doorhalen in- of uitschakelen |

## Extra opmaak {#format-extra}

| Item         | Beschrijving                                     |
|--------------|--------------------------------------------------|
| `sup`        | Superscript in- of uitschakelen                  |
| `sub`        | Subscript in- of uitschakelen                    |
| `code`       | Inline code in- of uitschakelen                  |
| `codeBlock`  | Een codeblok met syntaxiskleuring invoegen       |
| `blockquote` | Een citaat invoegen                              |

## Stijl {#style}

| Item             | Beschrijving                               |
|------------------|--------------------------------------------|
| `heading`        | Dropdown om het kopniveau te kiezen (H1-H6) |
| `fontFamily`     | Dropdown om het lettertype te kiezen       |
| `fontSize`       | Dropdown om de lettergrootte te kiezen     |
| `lineHeight`     | De regelhoogte instellen                   |
| `textColor`      | Tekstkleur: palet, recente kleuren, HEX, pipet, eigen kiezer |
| `highlightColor` | Markeerkleur: dezelfde kiezer, met "Geen markering" eerst |

Het item `heading` accepteert opties na een dubbele punt: kopniveaus, `p` om een alinea-item toe te voegen en `inline` om ze als aparte knoppen in plaats van als dropdown te tonen:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Uitlijning {#alignment}

| Item      | Beschrijving                  |
|-----------|-------------------------------|
| `left`    | Tekst links uitlijnen         |
| `center`  | Tekst centreren               |
| `right`   | Tekst rechts uitlijnen        |
| `justify` | Tekst uitvullen               |
| `align`   | Uitlijnings-dropdown; `align:left,center,right` beperkt de opties |

## Lijst {#list}

| Item           | Beschrijving                       |
|----------------|------------------------------------|
| `bulletList`   | Lijst met opsommingstekens in- of uitschakelen |
| `orderedList`  | Genummerde lijst in- of uitschakelen |
| `taskList`     | Takenlijst (selectievakjes) in- of uitschakelen |
| `indent`       | Het huidige blok laten inspringen  |
| `outdent`      | Het huidige blok minder laten inspringen |

## Media {#media}

| Item      | Beschrijving                      |
|-----------|-----------------------------------|
| `link`    | Een link invoegen/bewerken, of een [linkkaart](/nl/guide/link-cards) met `linkPreview` |
| `image`   | Een afbeelding invoegen/bewerken: via URL of upload, alt-tekst, bijschrift, grootte, positie |
| `video`   | Een YouTube-, Vimeo- of videobestand (`.mp4`, `.webm`, `.ogg`, `.mov`) invoegen/bewerken |
| `iframe`  | Een pagina insluiten via het adres of de iframe-code |
| `emoji`   | De emojikiezer openen (10 categorieën) |
| `charmap` | De kiezer voor speciale tekens openen |
| `table`   | Een tabel invoegen                |

## Diversen {#misc}

| Item            | Beschrijving                                    |
|-----------------|-------------------------------------------------|
| `line`          | Een horizontale lijn invoegen                   |
| `pagebreak`     | Een pagina-einde invoegen                       |
| `source`        | De ruwe HTML-bronweergave in- of uitschakelen   |
| `preview`       | De HTML-voorbeeldmodus in- of uitschakelen      |
| `fullscreen`    | De bewerkmodus op volledig scherm in- of uitschakelen |
| `formatClear`   | Alle opmaak van de selectie wissen              |
| `invisibleChar` | Onzichtbare tekens invoegen (spaties enz.)      |

## Scheidingstekens {#separators}

Gebruik `|` als scheiding tussen knopgroepen in de prop `items` in arraystijl:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Compleet toolbarvoorbeeld {#complete-toolbar-example}

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
