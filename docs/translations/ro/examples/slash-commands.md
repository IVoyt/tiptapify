# Comenzi slash {#slash-commands}

Comenzile slash oferă un meniu de inserare rapidă, care apare când tastezi `/` la începutul unei linii.

## Activarea comenzilor slash {#enabling-slash-commands}

Comenzile slash sunt activate implicit. Pentru a le controla explicit:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Demonstrație comenzi slash..."
:slash-commands="true"
/>

## Comenzi disponibile {#available-commands}

Tastează `/` în editor pentru a vedea paleta de comenzi. Comenzile disponibile includ:

| Comandă         | Descriere                              |
|-----------------|----------------------------------------|
| `/h1` - `/h6`   | Inserează un titlu (nivelurile 1-6)    |
| `/bulletList`   | Inserează o listă cu buline            |
| `/numberedList` | Inserează o listă numerotată           |
| `/taskList`     | Inserează o listă de sarcini           |
| `/code`         | Inserează cod inline                   |
| `/codeBlock`    | Inserează un bloc de cod               |
| `/quote`        | Inserează un citat                     |
| `/image`        | Inserează o imagine (deschide dialogul de URL) |
| `/video`        | Încorporează un videoclip YouTube      |
| `/table`        | Inserează un tabel                     |
| `/link`         | Inserează un hyperlink                 |
| `/divider`      | Inserează o linie orizontală           |
| `/emoji`        | Deschide selectorul de emoji           |
| `/specialChars` | Deschide caracterele speciale          |

## Cum funcționează {#how-it-works}

1. Plasează cursorul la începutul unei linii sau după un spațiu
2. Tastează `/` — apare paleta de comenzi
3. Continuă să tastezi pentru a filtra comenzile
4. Apasă `Enter` sau dă clic pentru a insera comanda selectată

## Dezactivarea comenzilor slash {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Comenzi slash cu meniul flotant {#slash-commands-with-floating-menu}

Combină comenzile slash cu meniul flotant pentru cea mai bună experiență de editare:

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

- **Comenzi slash** (`/`) — se declanșează tastând `/` la începutul unei linii
- **Meniul flotant** — apare când plasezi cursorul pe o linie goală (oferă acțiuni la nivel de bloc)
- **Meniul bubble** — apare când selectezi text (oferă formatare inline)

## Filtrarea comenzilor disponibile {#filtering-available-commands}

Poți specifica ce comenzi să fie incluse transmițând o listă de ID-uri de comenzi:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### ID-uri de comenzi disponibile {#available-command-ids}

| ID             | Descriere                |
|----------------|--------------------------|
| `h1` - `h6`    | Titluri de nivel 1-6     |
| `bulletList`   | Listă cu buline          |
| `numberedList` | Listă numerotată         |
| `taskList`     | Listă de sarcini         |
| `code`         | Cod inline               |
| `codeBlock`    | Bloc de cod              |
| `quote`        | Citat                    |
| `image`        | Imagine                  |
| `video`        | Videoclip YouTube        |
| `table`        | Tabel                    |
| `link`         | Link                     |
| `divider`      | Linie orizontală         |
| `emoji`        | Emoji                    |
| `specialChars` | Caractere speciale       |
