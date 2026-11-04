# Slash komande {#slash-commands}

Slash komande pružaju meni za brzo umetanje koji se pojavljuje kada ukucate `/` na početku reda.

## Omogućavanje slash komandi {#enabling-slash-commands}

Slash komande su podrazumevano omogućene. Za eksplicitnu kontrolu:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Demonstracija slash komandi..."
:slash-commands="true"
/>

## Dostupne komande {#available-commands}

Ukucajte `/` u uređivaču da vidite paletu komandi. Dostupne komande uključuju:

| Komanda         | Opis                                 |
|-----------------|--------------------------------------|
| `/h1` - `/h6`   | Umetni naslov (nivoi 1-6)            |
| `/bulletList`   | Umetni listu sa tačkama              |
| `/numberedList` | Umetni numerisanu listu              |
| `/taskList`     | Umetni listu zadataka                |
| `/code`         | Umetni kod u liniji                  |
| `/codeBlock`    | Umetni blok koda                     |
| `/quote`        | Umetni citat                         |
| `/image`        | Umetni sliku (otvara dijalog za URL) |
| `/video`        | Ugradi YouTube video                 |
| `/table`        | Umetni tabelu                        |
| `/link`         | Umetni hipervezu                     |
| `/divider`      | Umetni horizontalnu liniju           |
| `/emoji`        | Otvori izbor emodžija                |
| `/specialChars` | Otvori posebne znakove               |

## Kako funkcioniše {#how-it-works}

1. Postavite kursor na početak reda ili iza razmaka
2. Ukucajte `/` — pojavljuje se paleta komandi
3. Nastavite da kucate da biste filtrirali komande
4. Pritisnite `Enter` ili kliknite da umetnete izabranu komandu

## Onemogućavanje slash komandi {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Slash komande sa plutajućim menijem {#slash-commands-with-floating-menu}

Kombinujte slash komande sa plutajućim menijem za najbolje iskustvo uređivanja:

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

- **Slash komande** (`/`) — aktiviraju se kucanjem `/` na početku reda
- **Plutajući meni** — pojavljuje se kada postavite kursor u prazan red (nudi radnje na nivou bloka)
- **Bubble meni** — pojavljuje se kada izaberete tekst (nudi formatiranje u liniji)

## Filtriranje dostupnih komandi {#filtering-available-commands}

Možete navesti koje komande će biti uključene prosleđivanjem niza ID-jeva komandi:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Dostupni ID-jevi komandi {#available-command-ids}

| ID             | Opis                    |
|----------------|-------------------------|
| `h1` - `h6`    | Naslovi nivoa 1-6       |
| `bulletList`   | Lista sa tačkama        |
| `numberedList` | Numerisana lista        |
| `taskList`     | Lista zadataka          |
| `code`         | Kod u liniji            |
| `codeBlock`    | Blok koda               |
| `quote`        | Citat                   |
| `image`        | Slika                   |
| `video`        | YouTube video           |
| `table`        | Tabela                  |
| `link`         | Veza                    |
| `divider`      | Horizontalna linija     |
| `emoji`        | Emodži                  |
| `specialChars` | Posebni znakovi         |
