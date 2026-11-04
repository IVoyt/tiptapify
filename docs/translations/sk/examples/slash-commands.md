# Príkazy lomítka {#slash-commands}

Príkazy lomítka poskytujú ponuku rýchleho vkladania, ktorá sa zobrazí po napísaní `/` na začiatku riadka.

## Zapnutie príkazov lomítka {#enabling-slash-commands}

Príkazy lomítka sú predvolene zapnuté. Ak ich chcete ovládať explicitne:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Ukážka príkazov lomítka..."
:slash-commands="true"
/>

## Dostupné príkazy {#available-commands}

Napíšte `/` v editore a zobrazí sa paleta príkazov. Dostupné príkazy zahŕňajú:

| Príkaz          | Popis                              |
|-----------------|------------------------------------|
| `/h1` - `/h6`   | Vloží nadpis (úrovne 1-6)          |
| `/bulletList`   | Vloží odrážkový zoznam             |
| `/numberedList` | Vloží číslovaný zoznam             |
| `/taskList`     | Vloží úlohový zoznam               |
| `/code`         | Vloží inline kód                   |
| `/codeBlock`    | Vloží blok kódu                    |
| `/quote`        | Vloží citáciu                      |
| `/image`        | Vloží obrázok (otvorí dialóg URL)  |
| `/video`        | Vloží video z YouTube              |
| `/table`        | Vloží tabuľku                      |
| `/link`         | Vloží hypertextový odkaz           |
| `/divider`      | Vloží vodorovnú čiaru              |
| `/emoji`        | Otvorí výber emoji                 |
| `/specialChars` | Otvorí špeciálne znaky             |

## Ako to funguje {#how-it-works}

1. Umiestnite kurzor na začiatok riadka alebo za medzeru
2. Napíšte `/` — zobrazí sa paleta príkazov
3. Ďalším písaním príkazy filtrujte
4. Stlačte `Enter` alebo kliknite a vložte vybraný príkaz

## Vypnutie príkazov lomítka {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Príkazy lomítka s plávajúcou ponukou {#slash-commands-with-floating-menu}

Pre čo najlepší zážitok z úprav skombinujte príkazy lomítka s plávajúcou ponukou:

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

- **Príkazy lomítka** (`/`) — spúšťajú sa napísaním `/` na začiatku riadka
- **Plávajúca ponuka** — zobrazí sa, keď umiestnite kurzor na prázdny riadok (ponúka akcie na úrovni blokov)
- **Bublinová ponuka** — zobrazí sa pri výbere textu (ponúka inline formátovanie)

## Filtrovanie dostupných príkazov {#filtering-available-commands}

Príkazy, ktoré sa majú zahrnúť, môžete určiť odovzdaním poľa ID príkazov:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Dostupné ID príkazov {#available-command-ids}

| ID             | Popis                |
|----------------|----------------------|
| `h1` - `h6`    | Úrovne nadpisov 1-6  |
| `bulletList`   | Odrážkový zoznam     |
| `numberedList` | Číslovaný zoznam     |
| `taskList`     | Úlohový zoznam       |
| `code`         | Inline kód           |
| `codeBlock`    | Blok kódu            |
| `quote`        | Citácia              |
| `image`        | Obrázok              |
| `video`        | Video z YouTube      |
| `table`        | Tabuľka              |
| `link`         | Odkaz                |
| `divider`      | Vodorovná čiara      |
| `emoji`        | Emoji                |
| `specialChars` | Špeciálne znaky      |
