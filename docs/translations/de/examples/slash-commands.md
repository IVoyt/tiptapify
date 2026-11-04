# Slash-Befehle {#slash-commands}

Slash-Befehle bieten ein Schnelleinfüge-Menü, das erscheint, wenn du `/` am Zeilenanfang eingibst.

## Slash-Befehle aktivieren {#enabling-slash-commands}

Slash-Befehle sind standardmäßig aktiviert. So steuerst du sie ausdrücklich:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Demo für Slash-Befehle..."
:slash-commands="true"
/>

## Verfügbare Befehle {#available-commands}

Gib `/` im Editor ein, um die Befehlspalette zu sehen. Zu den verfügbaren Befehlen gehören:

| Command         | Description                        |
|-----------------|------------------------------------|
| `/h1` - `/h6`   | Überschrift einfügen (Ebenen 1-6)  |
| `/bulletList`   | Aufzählungsliste einfügen          |
| `/numberedList` | Nummerierte Liste einfügen         |
| `/taskList`     | Aufgabenliste einfügen             |
| `/code`         | Inline-Code einfügen               |
| `/codeBlock`    | Codeblock einfügen                 |
| `/quote`        | Zitatblock einfügen                |
| `/image`        | Bild einfügen (öffnet den URL-Dialog) |
| `/video`        | YouTube-Video einbetten            |
| `/table`        | Tabelle einfügen                   |
| `/link`         | Hyperlink einfügen                 |
| `/divider`      | Horizontale Linie einfügen         |
| `/emoji`        | Emoji-Auswahl öffnen               |
| `/specialChars` | Sonderzeichen öffnen               |

## So funktioniert es {#how-it-works}

1. Setze den Cursor an den Zeilenanfang oder hinter ein Leerzeichen
2. Gib `/` ein — die Befehlspalette erscheint
3. Tippe weiter, um die Befehle zu filtern
4. Drücke `Enter` oder klicke, um den gewählten Befehl einzufügen

## Slash-Befehle deaktivieren {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Slash-Befehle mit Floating-Menü {#slash-commands-with-floating-menu}

Kombiniere Slash-Befehle mit dem Floating-Menü für das beste Bearbeitungserlebnis:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    :floating-menu="true"
    :bubble-menu="true"
    placeholder="Full command experience..."
  />
</template>
```

- **Slash-Befehle** (`/`) — werden durch Eingabe von `/` am Zeilenanfang ausgelöst
- **Floating-Menü** — erscheint, wenn du den Cursor in eine leere Zeile setzt (bietet Aktionen auf Blockebene)
- **Bubble-Menü** — erscheint, wenn du Text markierst (bietet Inline-Formatierung)

## Verfügbare Befehle filtern {#filtering-available-commands}

Du kannst festlegen, welche Befehle enthalten sein sollen, indem du ein Array von Befehls-IDs übergibst:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Verfügbare Befehls-IDs {#available-command-ids}

| ID             | Description          |
|----------------|----------------------|
| `h1` - `h6`    | Überschriftsebenen 1-6 |
| `bulletList`   | Aufzählungsliste     |
| `numberedList` | Nummerierte Liste    |
| `taskList`     | Aufgabenliste        |
| `code`         | Inline-Code          |
| `codeBlock`    | Codeblock            |
| `quote`        | Zitatblock           |
| `image`        | Bild                 |
| `video`        | YouTube-Video        |
| `table`        | Tabelle              |
| `link`         | Link                 |
| `divider`      | Horizontale Linie    |
| `emoji`        | Emoji                |
| `specialChars` | Sonderzeichen        |
