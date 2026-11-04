# Itens da barra de ferramentas {#toolbar-items}

Todos os itens disponíveis da barra de ferramentas, organizados por seção.

## Ações {#actions}

| Item     | Descrição                          |
|----------|------------------------------------|
| `undo`   | Desfaz a última alteração          |
| `redo`   | Refaz a última alteração desfeita  |

## IA {#ai}

| Item | Descrição                                           |
|------|-----------------------------------------------------|
| `ai` | Abre o diálogo de prompt de IA, se configurado      |

## Formatação {#format}

| Item        | Descrição                  |
|-------------|----------------------------|
| `bold`      | Alterna o negrito          |
| `italic`    | Alterna o itálico          |
| `underline` | Alterna o sublinhado       |
| `strike`    | Alterna o tachado          |

## Formatação extra {#format-extra}

| Item         | Descrição                                          |
|--------------|----------------------------------------------------|
| `sup`        | Alterna o sobrescrito                              |
| `sub`        | Alterna o subscrito                                |
| `code`       | Alterna o código inline                            |
| `codeBlock`  | Insere um bloco de código com destaque de sintaxe  |
| `blockquote` | Insere uma citação em bloco                        |

## Estilo {#style}

| Item             | Descrição                                           |
|------------------|-----------------------------------------------------|
| `heading`        | Lista suspensa para escolher o nível de título (H1-H6) |
| `fontFamily`     | Lista suspensa para escolher a família da fonte     |
| `fontSize`       | Lista suspensa para escolher o tamanho da fonte     |
| `lineHeight`     | Define a altura da linha                            |
| `textColor`      | Cor do texto: paleta, cores recentes, HEX, conta-gotas, seletor personalizado |
| `highlightColor` | Cor de destaque: o mesmo seletor, com "Sem destaque" primeiro |

O item `heading` aceita opções após dois-pontos: níveis de título, `p` para adicionar um item de parágrafo e `inline` para exibi-los como botões separados em vez de uma lista suspensa:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Alinhamento {#alignment}

| Item      | Descrição                  |
|-----------|----------------------------|
| `left`    | Alinha o texto à esquerda  |
| `center`  | Centraliza o texto         |
| `right`   | Alinha o texto à direita   |
| `justify` | Justifica o texto          |
| `align`   | Lista suspensa de alinhamento; `align:left,center,right` limita suas opções |

## Lista {#list}

| Item           | Descrição                                |
|----------------|------------------------------------------|
| `bulletList`   | Alterna a lista com marcadores           |
| `orderedList`  | Alterna a lista numerada                 |
| `taskList`     | Alterna a lista de tarefas (checkboxes)  |
| `indent`       | Aumenta o recuo do bloco atual           |
| `outdent`      | Diminui o recuo do bloco atual           |

## Mídia {#media}

| Item      | Descrição                                |
|-----------|------------------------------------------|
| `link`    | Insere/edita um link, ou um [link card](/pt-br/guide/link-cards) com `linkPreview` |
| `image`   | Insere/edita uma imagem: por URL ou upload, texto alternativo, legenda, tamanho, posição |
| `video`   | Insere/edita um vídeo do YouTube, do Vimeo ou um arquivo de vídeo (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Incorpora uma página pelo endereço ou pelo código do iframe |
| `emoji`   | Abre o seletor de emojis (10 categorias) |
| `charmap` | Abre o seletor de caracteres especiais   |
| `table`   | Insere uma tabela                        |

## Diversos {#misc}

| Item            | Descrição                                          |
|-----------------|----------------------------------------------------|
| `line`          | Insere uma linha horizontal                        |
| `pagebreak`     | Insere uma quebra de página                        |
| `source`        | Alterna a visualização do código-fonte HTML        |
| `preview`       | Alterna o modo de pré-visualização do HTML         |
| `fullscreen`    | Alterna o modo de edição em tela cheia             |
| `formatClear`   | Remove toda a formatação da seleção                |
| `invisibleChar` | Insere caracteres invisíveis (espaços, etc.)       |

## Separadores {#separators}

Use `|` como separador entre grupos de botões na prop `items` em formato de array:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Exemplo de barra de ferramentas completa {#complete-toolbar-example}

```vue
<template>
  <Tiptapify
    :items="[
      'undo', 'redo',
      '|',
      'heading', 'fontFamily', 'fontSize',
      '|',
      'bold', 'italic', 'underline', 'strike',
      '|',
      'sup', 'sub', 'code', 'codeBlock', 'blockquote',
      '|',
      'left', 'center', 'right', 'justify',
      '|',
      'bulletList', 'orderedList', 'taskList',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'ai',
      '|',
      'line', 'pagebreak', 'formatClear',
      '|',
      'source', 'preview', 'fullscreen'
    ]"
  />
</template>
```
