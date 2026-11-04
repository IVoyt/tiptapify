# Snedstreckskommandon {#slash-commands}

Snedstreckskommandon ger en snabbinfogningsmeny som visas när du skriver `/` i början av en rad.

## Aktivera snedstreckskommandon {#enabling-slash-commands}

Snedstreckskommandon är aktiverade som standard. Så här styr du dem uttryckligen:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Demo av snedstreckskommandon..."
:slash-commands="true"
/>

## Tillgängliga kommandon {#available-commands}

Skriv `/` i redigeraren för att se kommandopaletten. Tillgängliga kommandon är bland annat:

| Kommando        | Beskrivning                           |
|-----------------|---------------------------------------|
| `/h1` - `/h6`   | Infoga en rubrik (nivå 1-6)           |
| `/bulletList`   | Infoga en punktlista                  |
| `/numberedList` | Infoga en numrerad lista              |
| `/taskList`     | Infoga en uppgiftslista               |
| `/code`         | Infoga inbäddad kod                   |
| `/codeBlock`    | Infoga ett kodblock                   |
| `/quote`        | Infoga ett blockcitat                 |
| `/image`        | Infoga en bild (öppnar URL-dialogen)  |
| `/video`        | Bädda in en YouTube-video             |
| `/table`        | Infoga en tabell                      |
| `/link`         | Infoga en hyperlänk                   |
| `/divider`      | Infoga en horisontell linje           |
| `/emoji`        | Öppna emojiväljaren                   |
| `/specialChars` | Öppna specialtecken                   |

## Så fungerar det {#how-it-works}

1. Placera markören i början av en rad eller efter ett mellanslag
2. Skriv `/` — kommandopaletten visas
3. Fortsätt skriva för att filtrera kommandon
4. Tryck på `Enter` eller klicka för att infoga det valda kommandot

## Inaktivera snedstreckskommandon {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Snedstreckskommandon med flytande meny {#slash-commands-with-floating-menu}

Kombinera snedstreckskommandon med den flytande menyn för den bästa redigeringsupplevelsen:

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

- **Snedstreckskommandon** (`/`) — utlöses genom att skriva `/` i början av en rad
- **Flytande meny** — visas när du placerar markören på en tom rad (erbjuder åtgärder på blocknivå)
- **Bubbelmeny** — visas när du markerar text (erbjuder inline-formatering)

## Filtrera tillgängliga kommandon {#filtering-available-commands}

Du kan ange vilka kommandon som ska ingå genom att skicka en array med kommando-ID:n:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Tillgängliga kommando-ID:n {#available-command-ids}

| ID             | Beskrivning              |
|----------------|--------------------------|
| `h1` - `h6`    | Rubriknivå 1-6           |
| `bulletList`   | Punktlista               |
| `numberedList` | Numrerad lista           |
| `taskList`     | Uppgiftslista            |
| `code`         | Inbäddad kod             |
| `codeBlock`    | Kodblock                 |
| `quote`        | Blockcitat               |
| `image`        | Bild                     |
| `video`        | YouTube-video            |
| `table`        | Tabell                   |
| `link`         | Länk                     |
| `divider`      | Horisontell linje        |
| `emoji`        | Emoji                    |
| `specialChars` | Specialtecken            |
