# Comandi slash {#slash-commands}

I comandi slash offrono un menu di inserimento rapido che compare quando digiti `/` all'inizio di una riga.

## Abilitare i comandi slash {#enabling-slash-commands}

I comandi slash sono abilitati per impostazione predefinita. Per controllarli esplicitamente:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Demo dei comandi slash..."
:slash-commands="true"
/>

## Comandi disponibili {#available-commands}

Digita `/` nell'editor per vedere la palette dei comandi. I comandi disponibili includono:

| Comando         | Descrizione                                  |
|-----------------|----------------------------------------------|
| `/h1` - `/h6`   | Inserisce un titolo (livelli 1-6)            |
| `/bulletList`   | Inserisce un elenco puntato                  |
| `/numberedList` | Inserisce un elenco numerato                 |
| `/taskList`     | Inserisce un elenco di attività              |
| `/code`         | Inserisce codice inline                      |
| `/codeBlock`    | Inserisce un blocco di codice                |
| `/quote`        | Inserisce una citazione                      |
| `/image`        | Inserisce un'immagine (apre la finestra URL) |
| `/video`        | Incorpora un video di YouTube                |
| `/table`        | Inserisce una tabella                        |
| `/link`         | Inserisce un collegamento ipertestuale       |
| `/divider`      | Inserisce una linea orizzontale              |
| `/emoji`        | Apre il selettore di emoji                   |
| `/specialChars` | Apre i caratteri speciali                    |

## Come funziona {#how-it-works}

1. Posiziona il cursore all'inizio di una riga o dopo uno spazio
2. Digita `/`: compare la palette dei comandi
3. Continua a digitare per filtrare i comandi
4. Premi `Enter` o fai clic per inserire il comando selezionato

## Disabilitare i comandi slash {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Comandi slash con il floating menu {#slash-commands-with-floating-menu}

Combina i comandi slash con il floating menu per un'esperienza di modifica ottimale:

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

- **Comandi slash** (`/`): si attivano digitando `/` all'inizio di una riga
- **Floating menu**: compare quando posizioni il cursore su una riga vuota (offre azioni a livello di blocco)
- **Bubble menu**: compare quando selezioni del testo (offre la formattazione inline)

## Filtrare i comandi disponibili {#filtering-available-commands}

Puoi specificare quali comandi includere passando un array di ID di comando:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### ID dei comandi disponibili {#available-command-ids}

| ID             | Descrizione                |
|----------------|----------------------------|
| `h1` - `h6`    | Titoli di livello 1-6      |
| `bulletList`   | Elenco puntato             |
| `numberedList` | Elenco numerato            |
| `taskList`     | Elenco di attività         |
| `code`         | Codice inline              |
| `codeBlock`    | Blocco di codice           |
| `quote`        | Citazione                  |
| `image`        | Immagine                   |
| `video`        | Video di YouTube           |
| `table`        | Tabella                    |
| `link`         | Collegamento               |
| `divider`      | Linea orizzontale          |
| `emoji`        | Emoji                      |
| `specialChars` | Caratteri speciali         |
