# Multimédia {#media}

## Imagens {#images}

Insira imagens a partir de um URL:

```vue
<script setup lang="ts">
const onEditorReady = (options) => {
  // Insert an image programmatically
  options.editor.commands.setImage({ src: 'https://picsum.photos/600/300' })
}
</script>

<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']"
    @editor-ready="onEditorReady"
  />
</template>
```

O botão de imagem abre o diálogo de imagem:

- **Por URL** ou **Carregar**. Sem um [endpoint de carregamento](/pt/guide/uploads), um ficheiro escolhido é incorporado como URL de dados em base64; com um, o ficheiro é enviado para o seu servidor.
- **Texto alternativo** (o diálogo avisa quando está vazio) e uma **legenda** por baixo da imagem.
- **Tamanho**: original, largura do texto ou largura × altura personalizadas com o bloqueio de proporção.
- **Posição**: centrada na sua própria linha ou flutuante à esquerda ou à direita do texto.

Uma imagem selecionada tem alças de redimensionamento (cada redimensionamento é um passo de anulação) e uma barra de ferramentas sobre ela: flutuar à esquerda ou à direita, transferir, editar, eliminar. Um duplo clique abre o diálogo.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Vídeos {#videos}

Incorpore vídeos do YouTube e do Vimeo, ou um ficheiro de vídeo:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

O botão de vídeo abre o diálogo de vídeo:

- **Uma ligação do YouTube ou do Vimeo** passa a ser o respetivo leitor; o diálogo mostra o fornecedor reconhecido e uma pré-visualização, e **Começar em** (preenchido a partir de `?t=`) quando o leitor o suporta.
- **Uma ligação para um ficheiro de vídeo** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) passa a ser um `<video>` com capa, controlos, reprodução automática (sem som) e repetição. A ligação precisa do protocolo (`https://`, `http://`), de `//host` ou de um `/path`: o diálogo nunca adivinha um.
- **Carregar** envia um ficheiro de vídeo para o seu servidor; só aparece com um [endpoint de carregamento](/pt/guide/uploads).
- **Tamanho**: 16:9 adaptável ou largura × altura personalizadas com o bloqueio de proporção.

Um URL do YouTube colado no texto também é incorporado. Um clique num leitor seleciona-o em vez de o reproduzir, para que o botão da barra de ferramentas o mostre; um duplo clique abre o diálogo.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Cole um URL do YouTube para incorporar um vídeo..." />

## Iframes {#iframes}

Incorpore uma página pelo seu endereço ou pelo código iframe do respetivo menu Partilhar ou Incorporar:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

O diálogo de iframe lê um código colado (endereço, tamanho, título, permissões, sandbox, carregamento diferido, ecrã inteiro) e indica o que retirou dele; um código com scripts ou outras etiquetas é recusado. Mostra uma pré-visualização e tem um **título para leitores de ecrã**, o tamanho (adaptável nas proporções do código ou personalizado com o bloqueio de proporção) e, em **Avançado**, o nome, `allow`, `sandbox`, o carregamento diferido e um contorno. O endereço precisa de `https://` ou `http://`. Um duplo clique numa incorporação abre o diálogo.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Introduza um URL para incorporar como iframe..." />

## Tabelas {#tables}

Insira e edite tabelas:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Depois de inserir uma tabela, pode:
- Adicionar/remover linhas e colunas
- Selecionar células
- Eliminar a tabela inteira

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Utilize o botão de tabela para inserir uma tabela..." />

## Links {#links}

Insira hiperligações:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

O diálogo de link aceita o endereço tal como é escrito: `https://…`, qualquer outro esquema (`ftp://`, `ssh://`, um interno), `mailto:`, `tel:`, `#anchor` ou `/page`. Nunca acrescenta um protocolo por si: um endereço sem protocolo (`example.com`, `internal.host:8080`) recebe chips para adicionar `https://`, `http://` ou `ftp://`, e fica como foi escrito se não adicionar nenhum. Os endereços `javascript:`, `vbscript:` e `data:` são recusados.

O diálogo também tem o texto do link, **Abrir num novo separador** (que acrescenta `noopener noreferrer`) e, em **Avançado**, os valores `rel` como chips (qualquer valor: Enter, espaço ou vírgula adiciona-o) e uma classe CSS.

Com a prop [`linkPreview`](/pt/api/props#linkpreview), o mesmo diálogo mostra um link como um cartão com a imagem, o título e a descrição da página, e um URL colado numa linha vazia oferece **Link / Cartão** — consulte [Cartões de link](/pt/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Selecione texto e clique em link para adicionar uma hiperligação..." />

## Emoji {#emoji}

Insira emojis a partir do seletor integrado, com 10 categorias:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

O seletor de emojis inclui um campo de pesquisa/filtro para encontrar rapidamente um emoji específico.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Clique no botão de emoji para inserir um emoji..." />

## Carateres especiais (Charmap) {#special-characters-charmap}

Insira carateres especiais, setas, letras gregas, símbolos matemáticos e muito mais:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

As categorias incluem:
- Setas
- Moedas
- Letras gregas
- Símbolos matemáticos
- Diversos

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Clique em charmap para inserir carateres especiais..." />

## Combinar ferramentas de multimédia {#combining-media-tools}

Uma barra de ferramentas de multimédia completa:

```vue
<template>
  <Tiptapify
    :items="[
      'bold', 'italic', 'underline',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'undo', 'redo'
    ]"
    placeholder="Full media toolbar..."
  />
</template>
```

<InteractiveEditor :items="[
'bold', 'italic', 'underline',
'|',
'link', 'image', 'video', 'iframe',
'|',
'emoji', 'charmap', 'table',
'|',
'undo', 'redo'
]"
placeholder="Barra de ferramentas de multimédia completa..." />
