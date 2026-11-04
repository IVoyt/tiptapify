# Itens da barra de ferramentas {#toolbar-items}

Todos os itens da barra de ferramentas disponíveis, organizados por secção.

## Ações {#actions}

| Item     | Descrição                         |
|----------|-----------------------------------|
| `undo`   | Anular a última alteração         |
| `redo`   | Refazer a última alteração anulada |
| `resetChanges` | Descartar todas as alterações desde a abertura do editor e limpar o histórico (pede confirmação) |

## IA {#ai}

| Item | Descrição                                              |
|------|--------------------------------------------------------|
| `ai` | Abrir o diálogo de prompt de IA, se estiver configurado |

## Formatação {#format}

| Item        | Descrição                  |
|-------------|----------------------------|
| `bold`      | Alternar negrito           |
| `italic`    | Alternar itálico           |
| `underline` | Alternar sublinhado        |
| `strike`    | Alternar rasurado          |

## Formatação extra {#format-extra}

| Item         | Descrição                                          |
|--------------|----------------------------------------------------|
| `sup`        | Alternar expoente                                  |
| `sub`        | Alternar índice                                    |
| `code`       | Alternar código em linha                           |
| `codeBlock`  | Inserir um bloco de código com realce de sintaxe   |
| `blockquote` | Inserir uma citação em bloco                       |

## Estilo {#style}

| Item             | Descrição                                  |
|------------------|--------------------------------------------|
| `heading`        | Menu pendente para escolher o nível de título (H1-H6) |
| `fontFamily`     | Menu pendente para escolher o tipo de letra |
| `fontSize`       | Menu pendente para escolher o tamanho do tipo de letra |
| `lineHeight`     | Definir a altura da linha                  |
| `textColor`      | Cor do texto: paleta, cores recentes, HEX, conta-gotas, seletor personalizado |
| `highlightColor` | Cor de realce: o mesmo seletor, com "Sem realce" em primeiro lugar |

O item `heading` aceita opções após dois pontos: níveis de título, `p` para adicionar um item de parágrafo e `inline` para os mostrar como botões separados em vez de um menu pendente:

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## Alinhamento {#alignment}

| Item      | Descrição                |
|-----------|--------------------------|
| `left`    | Alinhar o texto à esquerda |
| `center`  | Centrar o texto          |
| `right`   | Alinhar o texto à direita |
| `justify` | Justificar o texto       |
| `align`   | Menu pendente de alinhamento; `align:left,center,right` limita as suas opções |

## Lista {#list}

| Item           | Descrição                            |
|----------------|--------------------------------------|
| `bulletList`   | Alternar lista com marcadores        |
| `orderedList`  | Alternar lista numerada              |
| `taskList`     | Alternar lista de tarefas (caixas de seleção) |
| `indent`       | Aumentar o avanço do bloco atual     |
| `outdent`      | Diminuir o avanço do bloco atual     |

## Multimédia {#media}

| Item      | Descrição                              |
|-----------|----------------------------------------|
| `link`    | Inserir/editar um link, ou um [cartão de link](/pt/guide/link-cards) com `linkPreview` |
| `image`   | Inserir/editar uma imagem: por URL ou carregamento, texto alternativo, legenda, tamanho, posição |
| `video`   | Inserir/editar um vídeo do YouTube, do Vimeo ou um ficheiro de vídeo (`.mp4`, `.webm`, `.ogg`, `.mov`) |
| `iframe`  | Incorporar uma página pelo seu endereço ou pelo seu código iframe |
| `emoji`   | Abrir o seletor de emojis (10 categorias) |
| `charmap` | Abrir o seletor de carateres especiais |
| `table`   | Inserir uma tabela                     |

## Diversos {#misc}

| Item            | Descrição                                       |
|-----------------|-------------------------------------------------|
| `line`          | Inserir uma linha horizontal                    |
| `pagebreak`     | Inserir uma quebra de página                    |
| `source`        | Alternar a vista do código-fonte HTML           |
| `preview`       | Alternar o modo de pré-visualização HTML        |
| `fullscreen`    | Alternar o modo de edição em ecrã inteiro       |
| `formatClear`   | Limpar toda a formatação da seleção             |
| `invisibleChar` | Inserir carateres invisíveis (espaços, etc.)    |

## Separadores {#separators}

Utilize `|` como separador entre grupos de botões na prop `items` em formato de array:

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
