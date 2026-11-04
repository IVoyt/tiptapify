# Slash-commando's {#slash-commands}

Slash-commando's bieden een snelmenu dat verschijnt wanneer je `/` typt aan het begin van een regel.

## Slash-commando's inschakelen {#enabling-slash-commands}

Slash-commando's zijn standaard ingeschakeld. Zo stuur je ze expliciet aan:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Demo van slash-commando's..."
:slash-commands="true"
/>

## Beschikbare commando's {#available-commands}

Typ `/` in de editor om het commandopalet te zien. Beschikbare commando's zijn onder andere:

| Commando        | Beschrijving                             |
|-----------------|------------------------------------------|
| `/h1` - `/h6`   | Een kop invoegen (niveau 1-6)            |
| `/bulletList`   | Een lijst met opsommingstekens invoegen  |
| `/numberedList` | Een genummerde lijst invoegen            |
| `/taskList`     | Een takenlijst invoegen                  |
| `/code`         | Inline code invoegen                     |
| `/codeBlock`    | Een codeblok invoegen                    |
| `/quote`        | Een citaat invoegen                      |
| `/image`        | Een afbeelding invoegen (opent URL-dialoog) |
| `/video`        | Een YouTube-video insluiten              |
| `/table`        | Een tabel invoegen                       |
| `/link`         | Een hyperlink invoegen                   |
| `/divider`      | Een horizontale lijn invoegen            |
| `/emoji`        | De emojikiezer openen                    |
| `/specialChars` | Speciale tekens openen                   |

## Hoe het werkt {#how-it-works}

1. Zet je cursor aan het begin van een regel of na een spatie
2. Typ `/` — het commandopalet verschijnt
3. Typ verder om de commando's te filteren
4. Druk op `Enter` of klik om het geselecteerde commando in te voegen

## Slash-commando's uitschakelen {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Slash-commando's met zwevend menu {#slash-commands-with-floating-menu}

Combineer slash-commando's met het zwevende menu voor de beste bewerkervaring:

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

- **Slash-commando's** (`/`) — worden geactiveerd door `/` te typen aan het begin van een regel
- **Zwevend menu** — verschijnt wanneer je de cursor op een lege regel zet (biedt acties op blokniveau)
- **Bubbelmenu** — verschijnt wanneer je tekst selecteert (biedt inline opmaak)

## Beschikbare commando's filteren {#filtering-available-commands}

Je kunt opgeven welke commando's worden opgenomen door een array met commando-ID's door te geven:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Beschikbare commando-ID's {#available-command-ids}

| ID             | Beschrijving                  |
|----------------|-------------------------------|
| `h1` - `h6`    | Koppen niveau 1-6             |
| `bulletList`   | Lijst met opsommingstekens    |
| `numberedList` | Genummerde lijst              |
| `taskList`     | Takenlijst                    |
| `code`         | Inline code                   |
| `codeBlock`    | Codeblok                      |
| `quote`        | Citaat                        |
| `image`        | Afbeelding                    |
| `video`        | YouTube-video                 |
| `table`        | Tabel                         |
| `link`         | Link                          |
| `divider`      | Horizontale lijn              |
| `emoji`        | Emoji                         |
| `specialChars` | Speciale tekens               |
