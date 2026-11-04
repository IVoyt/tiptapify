# Ukazi s poševnico {#slash-commands}

Ukazi s poševnico ponujajo meni hitrega vstavljanja, ki se prikaže, ko na začetku vrstice vnesete `/`.

## Omogočanje ukazov s poševnico {#enabling-slash-commands}

Ukazi s poševnico so privzeto omogočeni. Če jih želite izrecno nadzorovati:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Predstavitev ukazov s poševnico..."
:slash-commands="true"
/>

## Razpoložljivi ukazi {#available-commands}

V urejevalniku vnesite `/`, da vidite paleto ukazov. Razpoložljivi ukazi vključujejo:

| Ukaz            | Opis                               |
|-----------------|------------------------------------|
| `/h1` - `/h6`   | Vstavi naslov (ravni 1-6)          |
| `/bulletList`   | Vstavi neoštevilčen seznam         |
| `/numberedList` | Vstavi oštevilčen seznam           |
| `/taskList`     | Vstavi seznam opravil              |
| `/code`         | Vstavi vrstično kodo               |
| `/codeBlock`    | Vstavi blok kode                   |
| `/quote`        | Vstavi citat                       |
| `/image`        | Vstavi sliko (odpre okno za URL)   |
| `/video`        | Vdelaj video YouTube               |
| `/table`        | Vstavi tabelo                      |
| `/link`         | Vstavi hiperpovezavo               |
| `/divider`      | Vstavi vodoravno črto              |
| `/emoji`        | Odpri izbirnik emojijev            |
| `/specialChars` | Odpri posebne znake                |

## Kako deluje {#how-it-works}

1. Kazalec postavite na začetek vrstice ali za presledek
2. Vnesite `/` — prikaže se paleta ukazov
3. Z nadaljnjim tipkanjem filtrirate ukaze
4. Pritisnite `Enter` ali kliknite, da vstavite izbrani ukaz

## Onemogočanje ukazov s poševnico {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Ukazi s poševnico s plavajočim menijem {#slash-commands-with-floating-menu}

Ukaze s poševnico združite s plavajočim menijem za najboljšo izkušnjo urejanja:

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

- **Ukazi s poševnico** (`/`) — sprožijo se z vnosom `/` na začetku vrstice
- **Plavajoči meni** — prikaže se, ko kazalec postavite na prazno vrstico (ponuja dejanja na ravni blokov)
- **Meni z mehurčkom** — prikaže se, ko izberete besedilo (ponuja vrstično oblikovanje)

## Filtriranje razpoložljivih ukazov {#filtering-available-commands}

Določite lahko, katere ukaze vključiti, tako da podate polje ID-jev ukazov:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Razpoložljivi ID-ji ukazov {#available-command-ids}

| ID             | Opis                 |
|----------------|----------------------|
| `h1` - `h6`    | Ravni naslovov 1-6   |
| `bulletList`   | Neoštevilčen seznam  |
| `numberedList` | Oštevilčen seznam    |
| `taskList`     | Seznam opravil       |
| `code`         | Vrstična koda        |
| `codeBlock`    | Blok kode            |
| `quote`        | Citat                |
| `image`        | Slika                |
| `video`        | Video YouTube        |
| `table`        | Tabela               |
| `link`         | Povezava             |
| `divider`      | Vodoravna črta       |
| `emoji`        | Emoji                |
| `specialChars` | Posebni znaki        |
