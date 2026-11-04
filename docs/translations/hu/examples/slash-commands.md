# Perjeles parancsok {#slash-commands}

A perjeles parancsok gyorsbeszúrási menüt adnak, amely akkor jelenik meg, ha egy sor elején `/` jelet írsz.

## Perjeles parancsok engedélyezése {#enabling-slash-commands}

A perjeles parancsok alapértelmezetten engedélyezettek. Kifejezett szabályozásukhoz:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Perjeles parancsok demó..."
:slash-commands="true"
/>

## Elérhető parancsok {#available-commands}

A parancspaletta megtekintéséhez írj `/` jelet a szerkesztőben. Az elérhető parancsok többek között:

| Parancs         | Leírás                             |
|-----------------|------------------------------------|
| `/h1` - `/h6`   | Címsor beszúrása (1-6. szint)      |
| `/bulletList`   | Felsorolás beszúrása               |
| `/numberedList` | Számozott lista beszúrása          |
| `/taskList`     | Feladatlista beszúrása             |
| `/code`         | Beágyazott kód beszúrása           |
| `/codeBlock`    | Kódblokk beszúrása                 |
| `/quote`        | Idézetblokk beszúrása              |
| `/image`        | Kép beszúrása (URL-párbeszédablak) |
| `/video`        | YouTube-videó beágyazása           |
| `/table`        | Táblázat beszúrása                 |
| `/link`         | Hivatkozás beszúrása               |
| `/divider`      | Vízszintes vonal beszúrása         |
| `/emoji`        | Emojiválasztó megnyitása           |
| `/specialChars` | Speciális karakterek megnyitása    |

## Hogyan működik {#how-it-works}

1. Helyezd a kurzort egy sor elejére vagy egy szóköz után
2. Írj `/` jelet — megjelenik a parancspaletta
3. Folytasd a gépelést a parancsok szűréséhez
4. Nyomd meg az `Enter` billentyűt, vagy kattints a kiválasztott parancs beszúrásához

## Perjeles parancsok letiltása {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Perjeles parancsok lebegő menüvel {#slash-commands-with-floating-menu}

A legjobb szerkesztési élményért kombináld a perjeles parancsokat a lebegő menüvel:

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

- **Perjeles parancsok** (`/`) — a sor elején beírt `/` jel váltja ki őket
- **Lebegő menü** — akkor jelenik meg, ha a kurzort üres sorra helyezed (blokkszintű műveleteket kínál)
- **Buborékmenü** — szöveg kijelölésekor jelenik meg (beágyazott formázást kínál)

## Az elérhető parancsok szűrése {#filtering-available-commands}

Megadhatod, mely parancsok szerepeljenek, ha parancsazonosítók tömbjét adod át:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Elérhető parancsazonosítók {#available-command-ids}

| Azonosító      | Leírás                  |
|----------------|-------------------------|
| `h1` - `h6`    | 1-6. szintű címsorok    |
| `bulletList`   | Felsorolás              |
| `numberedList` | Számozott lista         |
| `taskList`     | Feladatlista            |
| `code`         | Beágyazott kód          |
| `codeBlock`    | Kódblokk                |
| `quote`        | Idézetblokk             |
| `image`        | Kép                     |
| `video`        | YouTube-videó           |
| `table`        | Táblázat                |
| `link`         | Hivatkozás              |
| `divider`      | Vízszintes vonal        |
| `emoji`        | Emoji                   |
| `specialChars` | Speciális karakterek    |
