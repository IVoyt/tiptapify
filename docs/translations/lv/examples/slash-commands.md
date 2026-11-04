# Slīpsvītras komandas {#slash-commands}

Slīpsvītras komandas nodrošina ātrās ievietošanas izvēlni, kas parādās, kad rindas sākumā ievadāt `/`.

## Slīpsvītras komandu iespējošana {#enabling-slash-commands}

Slīpsvītras komandas pēc noklusējuma ir iespējotas. Lai tās kontrolētu skaidri:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Slīpsvītras komandu demonstrācija..."
:slash-commands="true"
/>

## Pieejamās komandas {#available-commands}

Ievadiet `/` redaktorā, lai redzētu komandu paleti. Pieejamās komandas ir:

| Komanda         | Apraksts                           |
|-----------------|------------------------------------|
| `/h1` - `/h6`   | Ievietot virsrakstu (1.–6. līmenis) |
| `/bulletList`   | Ievietot nenumurētu sarakstu       |
| `/numberedList` | Ievietot numurētu sarakstu         |
| `/taskList`     | Ievietot uzdevumu sarakstu         |
| `/code`         | Ievietot iekļauto kodu             |
| `/codeBlock`    | Ievietot koda bloku                |
| `/quote`        | Ievietot citātu bloku              |
| `/image`        | Ievietot attēlu (atver URL dialoglodziņu) |
| `/video`        | Iegult YouTube video               |
| `/table`        | Ievietot tabulu                    |
| `/link`         | Ievietot hipersaiti                |
| `/divider`      | Ievietot horizontālu līniju        |
| `/emoji`        | Atvērt emocijzīmju izvēli          |
| `/specialChars` | Atvērt īpašās rakstzīmes           |

## Kā tas darbojas {#how-it-works}

1. Novietojiet kursoru rindas sākumā vai pēc atstarpes
2. Ievadiet `/` — parādās komandu palete
3. Turpiniet rakstīt, lai filtrētu komandas
4. Nospiediet `Enter` vai noklikšķiniet, lai ievietotu atlasīto komandu

## Slīpsvītras komandu atspējošana {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Slīpsvītras komandas ar peldošo izvēlni {#slash-commands-with-floating-menu}

Apvienojiet slīpsvītras komandas ar peldošo izvēlni, lai rediģēšana būtu ērtākā:

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

- **Slīpsvītras komandas** (`/`) — tiek aktivizētas, rindas sākumā ievadot `/`
- **Peldošā izvēlne** — parādās, kad novietojat kursoru tukšā rindā (piedāvā bloka līmeņa darbības)
- **Burbuļa izvēlne** — parādās, kad atlasāt tekstu (piedāvā iekļauto formatēšanu)

## Pieejamo komandu filtrēšana {#filtering-available-commands}

Varat norādīt, kuras komandas iekļaut, nododot komandu ID masīvu:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Pieejamie komandu ID {#available-command-ids}

| ID             | Apraksts             |
|----------------|----------------------|
| `h1` - `h6`    | 1.–6. līmeņa virsraksti |
| `bulletList`   | Nenumurēts saraksts  |
| `numberedList` | Numurēts saraksts    |
| `taskList`     | Uzdevumu saraksts    |
| `code`         | Iekļautais kods      |
| `codeBlock`    | Koda bloks           |
| `quote`        | Citātu bloks         |
| `image`        | Attēls               |
| `video`        | YouTube video        |
| `table`        | Tabula               |
| `link`         | Saite                |
| `divider`      | Horizontāla līnija   |
| `emoji`        | Emocijzīme           |
| `specialChars` | Īpašās rakstzīmes    |
