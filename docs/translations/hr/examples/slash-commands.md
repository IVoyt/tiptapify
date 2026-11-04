# Slash naredbe {#slash-commands}

Slash naredbe pružaju izbornik brzog umetanja koji se pojavljuje kad upišete `/` na početku retka.

## Omogućavanje slash naredbi {#enabling-slash-commands}

Slash naredbe su prema zadanim postavkama omogućene. Za izričitu kontrolu:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Demo slash naredbi..."
:slash-commands="true"
/>

## Dostupne naredbe {#available-commands}

Upišite `/` u uređivač da vidite paletu naredbi. Dostupne naredbe uključuju:

| Naredba         | Opis                                    |
|-----------------|-----------------------------------------|
| `/h1` - `/h6`   | Umetni naslov (razine 1-6)              |
| `/bulletList`   | Umetni popis s oznakama                 |
| `/numberedList` | Umetni numerirani popis                 |
| `/taskList`     | Umetni popis zadataka                   |
| `/code`         | Umetni kôd u retku                      |
| `/codeBlock`    | Umetni blok koda                        |
| `/quote`        | Umetni citat                            |
| `/image`        | Umetni sliku (otvara dijalog za URL)    |
| `/video`        | Ugradi YouTube videozapis               |
| `/table`        | Umetni tablicu                          |
| `/link`         | Umetni hiperpoveznicu                   |
| `/divider`      | Umetni vodoravnu crtu                   |
| `/emoji`        | Otvori birač emojija                    |
| `/specialChars` | Otvori posebne znakove                  |

## Kako radi {#how-it-works}

1. Postavite pokazivač na početak retka ili iza razmaka
2. Upišite `/` — pojavljuje se paleta naredbi
3. Nastavite tipkati za filtriranje naredbi
4. Pritisnite `Enter` ili kliknite za umetanje odabrane naredbe

## Onemogućavanje slash naredbi {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Slash naredbe s plutajućim izbornikom {#slash-commands-with-floating-menu}

Kombinirajte slash naredbe s plutajućim izbornikom za najbolje iskustvo uređivanja:

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

- **Slash naredbe** (`/`) — pokreću se upisivanjem `/` na početku retka
- **Plutajući izbornik** — pojavljuje se kad pokazivač postavite na prazan redak (nudi radnje na razini bloka)
- **Bubble izbornik** — pojavljuje se kad odaberete tekst (nudi oblikovanje u retku)

## Filtriranje dostupnih naredbi {#filtering-available-commands}

Možete odrediti koje naredbe uključiti prosljeđivanjem niza ID-jeva naredbi:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Dostupni ID-jevi naredbi {#available-command-ids}

| ID             | Opis                   |
|----------------|------------------------|
| `h1` - `h6`    | Razine naslova 1-6     |
| `bulletList`   | Popis s oznakama       |
| `numberedList` | Numerirani popis       |
| `taskList`     | Popis zadataka         |
| `code`         | Kôd u retku            |
| `codeBlock`    | Blok koda              |
| `quote`        | Citat                  |
| `image`        | Slika                  |
| `video`        | YouTube videozapis     |
| `table`        | Tablica                |
| `link`         | Poveznica              |
| `divider`      | Vodoravna crta         |
| `emoji`        | Emoji                  |
| `specialChars` | Posebni znakovi        |
