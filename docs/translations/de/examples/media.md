# Medien {#media}

## Bilder {#images}

Bilder von einer URL einfügen:

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

Die Bild-Schaltfläche öffnet den Bild-Dialog:

- **Per URL** oder **Hochladen**. Ohne [Upload-Endpunkt](/de/guide/uploads) wird eine gewählte Datei als base64-Data-URL eingebettet; mit einem Endpunkt geht die Datei an deinen Server.
- **Alternativtext** (der Dialog erinnert dich daran, wenn er leer ist) und eine **Bildunterschrift** unter dem Bild.
- **Größe**: Original, Textbreite oder benutzerdefinierte Breite × Höhe mit Seitenverhältnis-Sperre.
- **Position**: zentriert in einer eigenen Zeile oder links bzw. rechts vom Text umflossen.

Ein ausgewähltes Bild hat Handles zur Größenänderung (jede Größenänderung ist ein Undo-Schritt) und eine Werkzeugleiste darüber: links oder rechts umfließen lassen, herunterladen, bearbeiten, löschen. Ein Doppelklick öffnet den Dialog.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Videos {#videos}

YouTube- und Vimeo-Videos oder eine Videodatei einbetten:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Die Video-Schaltfläche öffnet den Video-Dialog:

- **Ein YouTube- oder Vimeo-Link** wird zu deren Player; der Dialog zeigt den erkannten Anbieter und eine Vorschau sowie **Start bei** (vorbelegt aus `?t=`), wo der Player das unterstützt.
- **Ein Link zu einer Videodatei** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) wird zu einem `<video>` mit Poster, Steuerelementen, Autoplay (stumm) und Schleife. Der Link braucht sein Protokoll (`https://`, `http://`), `//host` oder einen `/path`: Der Dialog errät nie eines.
- **Hochladen** sendet eine Videodatei an deinen Server; es erscheint nur mit einem [Upload-Endpunkt](/de/guide/uploads).
- **Größe**: responsives 16:9 oder benutzerdefinierte Breite × Höhe mit Seitenverhältnis-Sperre.

Auch eine in den Text eingefügte YouTube-URL wird eingebettet. Ein Klick auf einen Player wählt ihn aus, statt ihn abzuspielen, sodass die Symbolleisten-Schaltfläche ihn anzeigt; ein Doppelklick öffnet den Dialog.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Füge eine YouTube-URL ein, um ein Video einzubetten..." />

## Iframes {#iframes}

Eine Seite über ihre Adresse oder über den iframe-Code aus ihrem Menü „Teilen“ bzw. „Einbetten“ einbetten:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Der iframe-Dialog liest einen eingefügten Code (Adresse, Größe, Titel, Berechtigungen, Sandbox, Lazy Loading, Vollbild) und sagt, was er daraus übernommen hat; ein Code mit Skripten oder anderen Tags wird abgelehnt. Er zeigt eine Vorschau und hat einen **Titel für Screenreader**, die Größe (responsiv im Seitenverhältnis des Codes oder benutzerdefiniert mit Seitenverhältnis-Sperre) und unter **Erweitert** den Namen, `allow`, `sandbox`, Lazy Loading und einen Rahmen. Die Adresse braucht `https://` oder `http://`. Ein Doppelklick auf eine Einbettung öffnet den Dialog.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Gib eine URL ein, die als iframe eingebettet werden soll..." />

## Tabellen {#tables}

Tabellen einfügen und bearbeiten:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Nach dem Einfügen einer Tabelle kannst du:
- Zeilen und Spalten hinzufügen/entfernen
- Zellen auswählen
- Die gesamte Tabelle löschen

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Füge mit der Tabellen-Schaltfläche eine Tabelle ein..." />

## Links {#links}

Hyperlinks einfügen:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Der Link-Dialog nimmt die Adresse so, wie sie eingegeben wird: `https://…`, jedes andere Schema (`ftp://`, `ssh://`, ein internes), `mailto:`, `tel:`, `#anchor` oder `/page`. Er ergänzt nie von sich aus ein Protokoll: Eine Adresse ohne Protokoll (`example.com`, `internal.host:8080`) erhält Chips zum Hinzufügen von `https://`, `http://` oder `ftp://` und bleibt wie eingegeben, wenn du keines hinzufügst. Adressen mit `javascript:`, `vbscript:` und `data:` werden abgelehnt.

Der Dialog hat außerdem den Linktext, **In neuem Tab öffnen** (was `noopener noreferrer` hinzufügt) und unter **Erweitert** die `rel`-Werte als Chips (beliebiger Wert: Enter, Leerzeichen oder Komma fügt ihn hinzu) sowie eine CSS-Klasse.

Mit der Prop [`linkPreview`](/de/api/props#linkpreview) zeigt derselbe Dialog einen Link als Karte mit Bild, Titel und Beschreibung der Seite, und eine in eine leere Zeile eingefügte URL bietet **Link / Karte** an — siehe [Link-Karten](/de/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Markiere Text und klicke auf Link, um einen Hyperlink hinzuzufügen..." />

## Emoji {#emoji}

Emoji aus der eingebauten Auswahl mit 10 Kategorien einfügen:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Die Emoji-Auswahl enthält ein Such-/Filterfeld, um bestimmte Emoji schnell zu finden.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Klicke auf die Emoji-Schaltfläche, um ein Emoji einzufügen..." />

## Sonderzeichen (Charmap) {#special-characters-charmap}

Sonderzeichen, Pfeile, griechische Buchstaben, mathematische Symbole und mehr einfügen:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Die Kategorien umfassen:
- Pfeile
- Währungen
- Griechische Buchstaben
- Mathematische Symbole
- Verschiedenes

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Klicke auf Charmap, um Sonderzeichen einzufügen..." />

## Medien-Werkzeuge kombinieren {#combining-media-tools}

Eine voll ausgestattete Medien-Symbolleiste:

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
placeholder="Vollständige Medien-Symbolleiste..." />
