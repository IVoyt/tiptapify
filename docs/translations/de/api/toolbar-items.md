# Toolbar Items {#toolbar-items}

Alle verfügbaren Symbolleisten-Elemente, nach Bereichen geordnet.

## Aktionen {#actions}

| Item     | Description                 |
|----------|-----------------------------|
| `undo`   | Letzte Änderung rückgängig machen |
| `redo`   | Zuletzt rückgängig gemachte Änderung wiederherstellen |

## AI {#ai}

| Item | Description                              |
|------|------------------------------------------|
| `ai` | Öffnet den KI-Prompt-Dialog, falls konfiguriert |

## Format {#format}

| Item        | Description          |
|-------------|----------------------|
| `bold`      | Fettdruck umschalten |
| `italic`    | Kursivschrift umschalten |
| `underline` | Unterstreichung umschalten |
| `strike`    | Durchstreichung umschalten |

## Format (Extra) {#format-extra}

| Item         | Description                                  |
|--------------|----------------------------------------------|
| `sup`        | Hochgestellt umschalten                      |
| `sub`        | Tiefgestellt umschalten                      |
| `code`       | Inline-Code umschalten                       |
| `codeBlock`  | Codeblock mit Syntaxhervorhebung einfügen    |
| `blockquote` | Zitatblock einfügen                          |

## Stil {#style}

| Item             | Description                                |
|------------------|--------------------------------------------|
| `heading`        | Dropdown zur Auswahl der Überschriftsebene (H1-H6) |
| `fontFamily`     | Dropdown zur Auswahl der Schriftfamilie    |
| `fontSize`       | Dropdown zur Auswahl der Schriftgröße      |
| `lineHeight`     | Zeilenhöhe festlegen                       |
| `textColor`      | Textfarbe: Palette, zuletzt verwendete Farben, HEX, Pipette, eigener Farbwähler |
| `highlightColor` | Hervorhebungsfarbe: derselbe Farbwähler, „Keine Hervorhebung“ zuerst |

Das Element `heading` akzeptiert Optionen nach einem Doppelpunkt: Überschriftsebenen, `p`, um ein Absatz-Element hinzuzufügen, und `inline`, um sie statt als Dropdown als einzelne Schaltflächen anzuzeigen:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Ausrichtung {#alignment}

| Item      | Description       |
|-----------|-------------------|
| `left`    | Text linksbündig ausrichten |
| `center`  | Text zentrieren   |
| `right`   | Text rechtsbündig ausrichten |
| `justify` | Text im Blocksatz ausrichten |
| `align`   | Ausrichtungs-Dropdown; `align:left,center,right` schränkt seine Optionen ein |

## Liste {#list}

| Item           | Description                   |
|----------------|-------------------------------|
| `bulletList`   | Aufzählungsliste umschalten   |
| `orderedList`  | Nummerierte Liste umschalten  |
| `taskList`     | Aufgabenliste (Checkboxen) umschalten |
| `indent`       | Aktuellen Block einrücken     |
| `outdent`      | Einzug des aktuellen Blocks verringern |

## Medien {#media}

| Item      | Description                       |
|-----------|-----------------------------------|
| `link`    | Link einfügen/bearbeiten, oder mit `linkPreview` eine [Link-Karte](/de/guide/link-cards) |
| `image`   | Bild einfügen/bearbeiten: per URL oder Upload, Alt-Text, Bildunterschrift, Größe, Position |
| `video`   | YouTube-, Vimeo- oder Videodatei (`.mp4`, `.webm`, `.ogg`, `.mov`) einfügen/bearbeiten |
| `iframe`  | Eine Seite über ihre Adresse oder ihren iframe-Code einbetten |
| `emoji`   | Emoji-Auswahl öffnen (10 Kategorien) |
| `charmap` | Auswahl für Sonderzeichen öffnen  |
| `table`   | Tabelle einfügen                  |

## Sonstiges {#misc}

| Item            | Description                                |
|-----------------|--------------------------------------------|
| `line`          | Horizontale Linie einfügen                 |
| `pagebreak`     | Seitenumbruch einfügen                     |
| `source`        | Ansicht des HTML-Quelltexts umschalten     |
| `preview`       | HTML-Vorschaumodus umschalten              |
| `fullscreen`    | Vollbild-Bearbeitungsmodus umschalten      |
| `formatClear`   | Gesamte Formatierung der Markierung entfernen |
| `invisibleChar` | Unsichtbare Zeichen (Leerzeichen usw.) einfügen |

## Trennzeichen {#separators}

Verwende `|` als Trennzeichen zwischen Schaltflächengruppen in der Array-Form der Prop `items`:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Vollständiges Symbolleisten-Beispiel {#complete-toolbar-example}

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
