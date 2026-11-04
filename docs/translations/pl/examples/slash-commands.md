# Polecenia ukośnikowe {#slash-commands}

Polecenia ukośnikowe to menu szybkiego wstawiania, które pojawia się po wpisaniu `/` na początku wiersza.

## Włączanie poleceń ukośnikowych {#enabling-slash-commands}

Polecenia ukośnikowe są domyślnie włączone. Aby je jawnie kontrolować:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Demo poleceń ukośnikowych..."
:slash-commands="true"
/>

## Dostępne polecenia {#available-commands}

Wpisz `/` w edytorze, aby zobaczyć paletę poleceń. Dostępne polecenia to między innymi:

| Polecenie       | Opis                                    |
|-----------------|-----------------------------------------|
| `/h1` - `/h6`   | Wstawia nagłówek (poziomy 1-6)          |
| `/bulletList`   | Wstawia listę punktowaną                |
| `/numberedList` | Wstawia listę numerowaną                |
| `/taskList`     | Wstawia listę zadań                     |
| `/code`         | Wstawia kod w wierszu                   |
| `/codeBlock`    | Wstawia blok kodu                       |
| `/quote`        | Wstawia cytat blokowy                   |
| `/image`        | Wstawia obraz (otwiera okno adresu URL) |
| `/video`        | Osadza film z YouTube                   |
| `/table`        | Wstawia tabelę                          |
| `/link`         | Wstawia hiperłącze                      |
| `/divider`      | Wstawia linię poziomą                   |
| `/emoji`        | Otwiera wybór emoji                     |
| `/specialChars` | Otwiera znaki specjalne                 |

## Jak to działa {#how-it-works}

1. Ustaw kursor na początku wiersza lub po spacji
2. Wpisz `/` — pojawi się paleta poleceń
3. Pisz dalej, aby filtrować polecenia
4. Naciśnij `Enter` lub kliknij, aby wstawić wybrane polecenie

## Wyłączanie poleceń ukośnikowych {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Polecenia ukośnikowe z menu pływającym {#slash-commands-with-floating-menu}

Połącz polecenia ukośnikowe z menu pływającym, aby edycja była jak najwygodniejsza:

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

- **Polecenia ukośnikowe** (`/`) — uruchamiane wpisaniem `/` na początku wiersza
- **Menu pływające** — pojawia się, gdy ustawisz kursor w pustym wierszu (oferuje działania na poziomie bloków)
- **Menu dymka** — pojawia się po zaznaczeniu tekstu (oferuje formatowanie w wierszu)

## Filtrowanie dostępnych poleceń {#filtering-available-commands}

Możesz określić, które polecenia mają być uwzględnione, przekazując tablicę identyfikatorów poleceń:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Dostępne identyfikatory poleceń {#available-command-ids}

| ID             | Opis                  |
|----------------|-----------------------|
| `h1` - `h6`    | Nagłówki poziomów 1-6 |
| `bulletList`   | Lista punktowana      |
| `numberedList` | Lista numerowana      |
| `taskList`     | Lista zadań           |
| `code`         | Kod w wierszu         |
| `codeBlock`    | Blok kodu             |
| `quote`        | Cytat blokowy         |
| `image`        | Obraz                 |
| `video`        | Film z YouTube        |
| `table`        | Tabela                |
| `link`         | Link                  |
| `divider`      | Linia pozioma         |
| `emoji`        | Emoji                 |
| `specialChars` | Znaki specjalne       |
