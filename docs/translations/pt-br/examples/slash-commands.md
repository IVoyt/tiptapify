# Slash commands {#slash-commands}

Os slash commands oferecem um menu de inserção rápida que aparece quando você digita `/` no início de uma linha.

## Ativando os slash commands {#enabling-slash-commands}

Os slash commands vêm ativados por padrão. Para controlá-los explicitamente:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Demo de slash commands..."
:slash-commands="true"
/>

## Comandos disponíveis {#available-commands}

Digite `/` no editor para ver a paleta de comandos. Os comandos disponíveis incluem:

| Comando         | Descrição                                |
|-----------------|------------------------------------------|
| `/h1` - `/h6`   | Insere um título (níveis 1-6)            |
| `/bulletList`   | Insere uma lista com marcadores          |
| `/numberedList` | Insere uma lista numerada                |
| `/taskList`     | Insere uma lista de tarefas              |
| `/code`         | Insere código inline                     |
| `/codeBlock`    | Insere um bloco de código                |
| `/quote`        | Insere uma citação em bloco              |
| `/image`        | Insere uma imagem (abre o diálogo de URL) |
| `/video`        | Incorpora um vídeo do YouTube            |
| `/table`        | Insere uma tabela                        |
| `/link`         | Insere um hiperlink                      |
| `/divider`      | Insere uma linha horizontal              |
| `/emoji`        | Abre o seletor de emojis                 |
| `/specialChars` | Abre os caracteres especiais             |

## Como funciona {#how-it-works}

1. Posicione o cursor no início de uma linha ou depois de um espaço
2. Digite `/` — a paleta de comandos aparece
3. Continue digitando para filtrar os comandos
4. Pressione `Enter` ou clique para inserir o comando selecionado

## Desativando os slash commands {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Slash commands com floating menu {#slash-commands-with-floating-menu}

Combine os slash commands com o floating menu para a melhor experiência de edição:

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

- **Slash commands** (`/`) — acionados ao digitar `/` no início de uma linha
- **Floating menu** — aparece quando você posiciona o cursor em uma linha vazia (oferece ações em nível de bloco)
- **Bubble menu** — aparece quando você seleciona texto (oferece formatação inline)

## Filtrando os comandos disponíveis {#filtering-available-commands}

Você pode especificar quais comandos incluir passando um array de IDs de comando:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### IDs de comando disponíveis {#available-command-ids}

| ID             | Descrição                |
|----------------|--------------------------|
| `h1` - `h6`    | Títulos de nível 1-6     |
| `bulletList`   | Lista com marcadores     |
| `numberedList` | Lista numerada           |
| `taskList`     | Lista de tarefas         |
| `code`         | Código inline            |
| `codeBlock`    | Bloco de código          |
| `quote`        | Citação em bloco         |
| `image`        | Imagem                   |
| `video`        | Vídeo do YouTube         |
| `table`        | Tabela                   |
| `link`         | Link                     |
| `divider`      | Linha horizontal         |
| `emoji`        | Emoji                    |
| `specialChars` | Caracteres especiais     |
