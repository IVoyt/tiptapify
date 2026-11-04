# Příkazy s lomítkem {#slash-commands}

Příkazy s lomítkem nabízejí nabídku rychlého vložení, která se zobrazí po zadání `/` na začátku řádku.

## Zapnutí příkazů s lomítkem {#enabling-slash-commands}

Příkazy s lomítkem jsou ve výchozím stavu zapnuté. Chcete-li je řídit explicitně:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Demo příkazů s lomítkem..."
:slash-commands="true"
/>

## Dostupné příkazy {#available-commands}

Zadáním `/` v editoru zobrazíte paletu příkazů. K dispozici jsou například tyto příkazy:

| Příkaz          | Popis                              |
|-----------------|------------------------------------|
| `/h1` - `/h6`   | Vložit nadpis (úrovně 1–6)         |
| `/bulletList`   | Vložit odrážkový seznam            |
| `/numberedList` | Vložit číslovaný seznam            |
| `/taskList`     | Vložit seznam úkolů                |
| `/code`         | Vložit inline kód                  |
| `/codeBlock`    | Vložit blok kódu                   |
| `/quote`        | Vložit citaci                      |
| `/image`        | Vložit obrázek (otevře dialog URL) |
| `/video`        | Vložit video z YouTube             |
| `/table`        | Vložit tabulku                     |
| `/link`         | Vložit odkaz                       |
| `/divider`      | Vložit vodorovnou čáru             |
| `/emoji`        | Otevřít výběr emoji                |
| `/specialChars` | Otevřít speciální znaky            |

## Jak to funguje {#how-it-works}

1. Umístěte kurzor na začátek řádku nebo za mezeru
2. Zadejte `/` — zobrazí se paleta příkazů
3. Dalším psaním příkazy filtrujte
4. Stisknutím `Enter` nebo kliknutím vložíte vybraný příkaz

## Vypnutí příkazů s lomítkem {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Příkazy s lomítkem a plovoucí nabídka {#slash-commands-with-floating-menu}

Pro nejlepší zážitek z úprav zkombinujte příkazy s lomítkem s plovoucí nabídkou:

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

- **Příkazy s lomítkem** (`/`) — spouštějí se zadáním `/` na začátku řádku
- **Plovoucí nabídka** — zobrazí se, když umístíte kurzor na prázdný řádek (nabízí akce na úrovni bloků)
- **Bublinová nabídka** — zobrazí se po výběru textu (nabízí inline formátování)

## Filtrování dostupných příkazů {#filtering-available-commands}

Příkazy, které se mají zahrnout, určíte předáním pole ID příkazů:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Dostupná ID příkazů {#available-command-ids}

| ID             | Popis                |
|----------------|----------------------|
| `h1` - `h6`    | Nadpisy úrovní 1–6   |
| `bulletList`   | Odrážkový seznam     |
| `numberedList` | Číslovaný seznam     |
| `taskList`     | Seznam úkolů         |
| `code`         | Inline kód           |
| `codeBlock`    | Blok kódu            |
| `quote`        | Citace               |
| `image`        | Obrázek              |
| `video`        | Video z YouTube      |
| `table`        | Tabulka              |
| `link`         | Odkaz                |
| `divider`      | Vodorovná čára       |
| `emoji`        | Emoji                |
| `specialChars` | Speciální znaky      |
