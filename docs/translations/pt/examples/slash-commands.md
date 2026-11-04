# Comandos de barra {#slash-commands}

Os comandos de barra disponibilizam um menu de inserção rápida que aparece ao escrever `/` no início de uma linha.

## Ativar os comandos de barra {#enabling-slash-commands}

Os comandos de barra estão ativados por predefinição. Para os controlar explicitamente:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Demonstração de comandos de barra..."
:slash-commands="true"
/>

## Comandos disponíveis {#available-commands}

Escreva `/` no editor para ver a paleta de comandos. Os comandos disponíveis incluem:

| Comando         | Descrição                                |
|-----------------|------------------------------------------|
| `/h1` - `/h6`   | Inserir um título (níveis 1-6)           |
| `/bulletList`   | Inserir uma lista com marcadores         |
| `/numberedList` | Inserir uma lista numerada               |
| `/taskList`     | Inserir uma lista de tarefas             |
| `/code`         | Inserir código em linha                  |
| `/codeBlock`    | Inserir um bloco de código               |
| `/quote`        | Inserir uma citação em bloco             |
| `/image`        | Inserir uma imagem (abre o diálogo de URL) |
| `/video`        | Incorporar um vídeo do YouTube           |
| `/table`        | Inserir uma tabela                       |
| `/link`         | Inserir uma hiperligação                 |
| `/divider`      | Inserir uma linha horizontal             |
| `/emoji`        | Abrir o seletor de emojis                |
| `/specialChars` | Abrir os carateres especiais             |

## Como funciona {#how-it-works}

1. Coloque o cursor no início de uma linha ou depois de um espaço
2. Escreva `/` — a paleta de comandos aparece
3. Continue a escrever para filtrar os comandos
4. Prima `Enter` ou clique para inserir o comando selecionado

## Desativar os comandos de barra {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Comandos de barra com menu flutuante {#slash-commands-with-floating-menu}

Combine os comandos de barra com o menu flutuante para uma melhor experiência de edição:

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

- **Comandos de barra** (`/`) — acionados ao escrever `/` no início de uma linha
- **Menu flutuante** — aparece quando coloca o cursor numa linha vazia (oferece ações ao nível do bloco)
- **Menu de seleção** — aparece quando seleciona texto (oferece formatação em linha)

## Filtrar os comandos disponíveis {#filtering-available-commands}

Pode especificar os comandos a incluir passando um array de IDs de comandos:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### IDs de comandos disponíveis {#available-command-ids}

| ID             | Descrição                  |
|----------------|----------------------------|
| `h1` - `h6`    | Títulos de nível 1-6       |
| `bulletList`   | Lista com marcadores       |
| `numberedList` | Lista numerada             |
| `taskList`     | Lista de tarefas           |
| `code`         | Código em linha            |
| `codeBlock`    | Bloco de código            |
| `quote`        | Citação em bloco           |
| `image`        | Imagem                     |
| `video`        | Vídeo do YouTube           |
| `table`        | Tabela                     |
| `link`         | Link                       |
| `divider`      | Linha horizontal           |
| `emoji`        | Emoji                      |
| `specialChars` | Carateres especiais        |
