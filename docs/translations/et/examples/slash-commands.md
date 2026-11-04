# Kaldkriipsukäsud {#slash-commands}

Kaldkriipsukäsud pakuvad kiirlisamise menüüd, mis ilmub, kui sisestad rea alguses `/`.

## Kaldkriipsukäskude lubamine {#enabling-slash-commands}

Kaldkriipsukäsud on vaikimisi lubatud. Nende selgesõnaliseks juhtimiseks:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Kaldkriipsukäskude demo..."
:slash-commands="true"
/>

## Saadaolevad käsud {#available-commands}

Käsupaleti nägemiseks sisesta redaktoris `/`. Saadaolevate käskude hulgas on:

| Käsk            | Kirjeldus                          |
|-----------------|------------------------------------|
| `/h1` - `/h6`   | Lisa pealkiri (tasemed 1-6)        |
| `/bulletList`   | Lisa täpploend                     |
| `/numberedList` | Lisa nummerdatud loend             |
| `/taskList`     | Lisa ülesandeloend                 |
| `/code`         | Lisa reasisene kood                |
| `/codeBlock`    | Lisa koodiplokk                    |
| `/quote`        | Lisa tsitaat                       |
| `/image`        | Lisa pilt (avab URL-i dialoogi)    |
| `/video`        | Manusta YouTube'i video            |
| `/table`        | Lisa tabel                         |
| `/link`         | Lisa hüperlink                     |
| `/divider`      | Lisa horisontaaljoon               |
| `/emoji`        | Ava emotikonide valija             |
| `/specialChars` | Ava erimärgid                      |

## Kuidas see töötab {#how-it-works}

1. Aseta kursor rea algusesse või tühiku järele
2. Sisesta `/` — käsupalett ilmub
3. Jätka kirjutamist, et käske filtreerida
4. Vajuta `Enter` või klõpsa, et valitud käsk lisada

## Kaldkriipsukäskude keelamine {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Kaldkriipsukäsud koos ujuva menüüga {#slash-commands-with-floating-menu}

Parima redigeerimiskogemuse saamiseks kombineeri kaldkriipsukäsud ujuva menüüga:

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

- **Kaldkriipsukäsud** (`/`) — käivituvad, kui sisestad rea alguses `/`
- **Ujuv menüü** — ilmub, kui asetad kursori tühjale reale (pakub plokitaseme toiminguid)
- **Hõljumenüü** — ilmub, kui valid teksti (pakub reasisest vormindust)

## Saadaolevate käskude filtreerimine {#filtering-available-commands}

Saad määrata, millised käsud kaasata, andes ette käsu ID-de massiivi:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Saadaolevad käsu ID-d {#available-command-ids}

| ID             | Kirjeldus            |
|----------------|----------------------|
| `h1` - `h6`    | Pealkirjatasemed 1-6 |
| `bulletList`   | Täpploend            |
| `numberedList` | Nummerdatud loend    |
| `taskList`     | Ülesandeloend        |
| `code`         | Reasisene kood       |
| `codeBlock`    | Koodiplokk           |
| `quote`        | Tsitaat              |
| `image`        | Pilt                 |
| `video`        | YouTube'i video      |
| `table`        | Tabel                |
| `link`         | Link                 |
| `divider`      | Horisontaaljoon      |
| `emoji`        | Emotikon             |
| `specialChars` | Erimärgid            |
