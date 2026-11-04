# Mídia {#media}

## Imagens {#images}

Insira imagens a partir de uma URL:

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

- **Por URL** ou **Enviar**. Sem um [endpoint de upload](/pt-br/guide/uploads), um arquivo escolhido é incorporado como data URL base64; com um endpoint, o arquivo vai para o seu servidor.
- **Texto alternativo** (o diálogo avisa quando está vazio) e uma **legenda** sob a imagem.
- **Tamanho**: original, largura do texto ou largura × altura personalizadas com o bloqueio de proporção.
- **Posição**: centralizada em sua própria linha, ou flutuando à esquerda ou à direita do texto.

Uma imagem selecionada tem alças de redimensionamento (cada redimensionamento é um passo de desfazer) e uma barra de ferramentas sobre ela: flutuar à esquerda ou à direita, baixar, editar, excluir. Um clique duplo abre o diálogo.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Vídeos {#videos}

Incorpore vídeos do YouTube e do Vimeo, ou um arquivo de vídeo:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

O botão de vídeo abre o diálogo de vídeo:

- **Um link do YouTube ou do Vimeo** vira o player deles; o diálogo mostra o provedor reconhecido e uma prévia, e **Começar em** (preenchido a partir de `?t=`) quando o player oferece suporte.
- **Um link para um arquivo de vídeo** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) vira um `<video>` com capa, controles, reprodução automática (sem som) e repetição. O link precisa do protocolo (`https://`, `http://`), de `//host` ou de um `/path`: o diálogo nunca adivinha um.
- **Enviar** envia um arquivo de vídeo para o seu servidor; só aparece com um [endpoint de upload](/pt-br/guide/uploads).
- **Tamanho**: responsivo 16:9, ou largura × altura personalizadas com o bloqueio de proporção.

Uma URL do YouTube colada no texto também é incorporada. Um clique em um player o seleciona em vez de reproduzi-lo, para que o botão da barra de ferramentas o exiba; um clique duplo abre o diálogo.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Cole uma URL do YouTube para incorporar um vídeo..." />

## Iframes {#iframes}

Incorpore uma página pelo endereço ou pelo código do iframe do menu Compartilhar ou Incorporar:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

O diálogo de iframe lê um código colado (endereço, tamanho, título, permissões, sandbox, carregamento lento, tela cheia) e informa o que extraiu dele; um código com scripts ou outras tags é recusado. Ele mostra uma prévia e tem um **título para leitores de tela**, o tamanho (responsivo nas proporções do código, ou personalizado com o bloqueio de proporção) e, em **Avançado**, o nome, `allow`, `sandbox`, carregamento lento e uma borda. O endereço precisa de `https://` ou `http://`. Um clique duplo em uma incorporação abre o diálogo.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Informe uma URL para incorporar como iframe..." />

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

Depois de inserir uma tabela, você pode:
- Adicionar/remover linhas e colunas
- Selecionar células
- Excluir a tabela inteira

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Use o botão de tabela para inserir uma tabela..." />

## Links {#links}

Insira hiperlinks:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

O diálogo de link aceita o endereço como digitado: `https://…`, qualquer outro esquema (`ftp://`, `ssh://`, um interno), `mailto:`, `tel:`, `#anchor` ou `/page`. Ele nunca adiciona um protocolo por conta própria: um endereço sem protocolo (`example.com`, `internal.host:8080`) recebe chips para adicionar `https://`, `http://` ou `ftp://`, e permanece como foi digitado se você não adicionar nenhum. Endereços `javascript:`, `vbscript:` e `data:` são recusados.

O diálogo também tem o texto do link, **Abrir em uma nova aba** (que adiciona `noopener noreferrer`) e, em **Avançado**, os valores de `rel` como chips (qualquer valor: Enter, espaço ou vírgula o adiciona) e uma classe CSS.

Com a prop [`linkPreview`](/pt-br/api/props#linkpreview), o mesmo diálogo mostra um link como um cartão com a imagem, o título e a descrição da página, e uma URL colada em uma linha vazia oferece **Link / Cartão** — veja [Link cards](/pt-br/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Selecione um texto e clique em link para adicionar um hiperlink..." />

## Emoji {#emoji}

Insira emojis a partir do seletor nativo com 10 categorias:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

O seletor de emojis inclui um campo de busca/filtro para encontrar emojis específicos rapidamente.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Clique no botão de emoji para inserir um emoji..." />

## Caracteres especiais (Charmap) {#special-characters-charmap}

Insira caracteres especiais, setas, letras gregas, símbolos matemáticos e mais:

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
- Moeda
- Letras gregas
- Símbolos matemáticos
- Diversos

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Clique em charmap para inserir caracteres especiais..." />

## Combinando ferramentas de mídia {#combining-media-tools}

Uma barra de ferramentas de mídia completa:

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
placeholder="Barra de ferramentas de mídia completa..." />
