# Skråstrekkommandoer {#slash-commands}

Skråstrekkommandoer gir en hurtiginnsettingsmeny som vises når du skriver `/` i begynnelsen av en linje.

## Aktivere skråstrekkommandoer {#enabling-slash-commands}

Skråstrekkommandoer er aktivert som standard. Slik styrer du dem eksplisitt:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Demo av skråstrekkommandoer..."
:slash-commands="true"
/>

## Tilgjengelige kommandoer {#available-commands}

Skriv `/` i editoren for å se kommandopaletten. Tilgjengelige kommandoer omfatter:

| Kommando        | Beskrivelse                                  |
|-----------------|----------------------------------------------|
| `/h1` - `/h6`   | Sett inn en overskrift (nivå 1-6)            |
| `/bulletList`   | Sett inn en punktliste                       |
| `/numberedList` | Sett inn en nummerert liste                  |
| `/taskList`     | Sett inn en oppgaveliste                     |
| `/code`         | Sett inn innebygd kode                       |
| `/codeBlock`    | Sett inn en kodeblokk                        |
| `/quote`        | Sett inn et sitat                            |
| `/image`        | Sett inn et bilde (åpner URL-dialogen)       |
| `/video`        | Bygg inn en YouTube-video                    |
| `/table`        | Sett inn en tabell                           |
| `/link`         | Sett inn en hyperlenke                       |
| `/divider`      | Sett inn en horisontal linje                 |
| `/emoji`        | Åpne emoji-velgeren                          |
| `/specialChars` | Åpne spesialtegn                             |

## Slik fungerer det {#how-it-works}

1. Plasser markøren i begynnelsen av en linje eller etter et mellomrom
2. Skriv `/` — kommandopaletten vises
3. Fortsett å skrive for å filtrere kommandoene
4. Trykk `Enter` eller klikk for å sette inn den valgte kommandoen

## Deaktivere skråstrekkommandoer {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Skråstrekkommandoer med flytende meny {#slash-commands-with-floating-menu}

Kombiner skråstrekkommandoer med den flytende menyen for best redigeringsopplevelse:

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

- **Skråstrekkommandoer** (`/`) — utløses ved å skrive `/` i begynnelsen av en linje
- **Flytende meny** — vises når du plasserer markøren på en tom linje (tilbyr handlinger på blokknivå)
- **Boblemeny** — vises når du markerer tekst (tilbyr inline-formatering)

## Filtrere tilgjengelige kommandoer {#filtering-available-commands}

Du kan angi hvilke kommandoer som skal tas med ved å sende en liste med kommando-ID-er:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Tilgjengelige kommando-ID-er {#available-command-ids}

| ID             | Beskrivelse               |
|----------------|---------------------------|
| `h1` - `h6`    | Overskriftsnivå 1-6       |
| `bulletList`   | Punktliste                |
| `numberedList` | Nummerert liste           |
| `taskList`     | Oppgaveliste              |
| `code`         | Innebygd kode             |
| `codeBlock`    | Kodeblokk                 |
| `quote`        | Sitat                     |
| `image`        | Bilde                     |
| `video`        | YouTube-video             |
| `table`        | Tabell                    |
| `link`         | Lenke                     |
| `divider`      | Horisontal linje          |
| `emoji`        | Emoji                     |
| `specialChars` | Spesialtegn               |
