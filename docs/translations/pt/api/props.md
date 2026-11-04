# Props {#props}

## Props de `<Tiptapify>` {#tiptapify-props}

### `content` {#content}

- **Tipo:** `String | Object`
- **Predefinição:** `''`

Conteúdo inicial do editor. Aceita uma string HTML ou um objeto JSON do Tiptap.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` é apenas o conteúdo **inicial**; para ligação bidirecional utilize `v-model` (consulte `modelValue`).

### `modelValue` {#modelvalue}

- **Tipo:** `String | Object`
- **Predefinição:** `''`

Valor da ligação bidirecional do `v-model`. Utilize `v-model` para manter um valor reativo sincronizado com o editor. A cada edição, o componente emite `update:modelValue` com o HTML mais recente, que o `v-model` escreve de volta na sua ref. Quando só se utiliza `v-model` (sem `:content`), o valor ligado é o conteúdo inicial do editor.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>Hello, world!</p>')
</script>

<template>
  <Tiptapify v-model="content" placeholder="Write something..." />
</template>
```



### `placeholder` {#placeholder}

- **Tipo:** `String`
- **Predefinição:** `''`

Texto de marcador de posição mostrado quando o editor está vazio.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Tipo:** `Number`
- **Predefinição:** `null`

Altura mínima da área de conteúdo do editor, em píxeis.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Tipo:** `Boolean`
- **Predefinição:** `true`

Mostra ou oculta a barra de ferramentas.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Tipo:** `Array<String> | Object`
- **Predefinição:** `[]`

Itens da barra de ferramentas a apresentar. Passe um array com nomes de itens ou um objeto com secções nomeadas. Consulte [Itens da barra de ferramentas](/pt/api/toolbar-items).
Num array, `'|'` divide os itens em grupos (por essa ordem, seja qual for a secção de onde vêm os botões) e `'~'` empurra os itens que se seguem para o fim da barra de ferramentas. Com grupos, um nome que não seja um item integrado reserva um lugar para o botão personalizado com esse nome de `customExtensions`; sem esse botão, o lugar é descartado.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Tipo:** `Boolean`
- **Predefinição:** `false`

Quando `true`, a prop `items` especifica os itens a **excluir** em vez de incluir.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Tipo:** `Boolean`
- **Predefinição:** `true`

Mostra o menu flutuante de seleção quando há texto selecionado: uma linha de botões de ícones em grupos — negrito, itálico, sublinhado, rasurado | expoente, índice | realce, código em linha | link | limpar formatação. Cada botão tem uma dica com o respetivo atalho e indica quando a sua marca está ativa na seleção. Fica oculto para um bloco selecionado (imagem, widget), dentro de código e quando o documento inteiro está selecionado.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Tipo:** `Boolean`
- **Predefinição:** `true`

Mostra o menu flutuante nas linhas vazias: título 1, título 2 e uma lista com marcadores, na mesma linha de botões de ícones que o menu de seleção.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Tipo:** `Boolean`
- **Predefinição:** `true`

Ativa o menu de comandos de barra (escreva `/` para o abrir).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Tipo:** `Boolean`
- **Predefinição:** `true`

Mostra a contagem de palavras no rodapé do editor.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Tipo:** `Boolean`
- **Predefinição:** `true`

Mostra a contagem de carateres no rodapé do editor.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Tipo:** `Number | null`
- **Predefinição:** `null`

Número máximo de carateres permitido pela extensão `CharacterCount` do Tiptap. Defina `null` ou omita a prop para manter a edição ilimitada. Quando definida com um valor superior a `0`, o rodapé mostra um indicador de progresso circular em SVG com limiares codificados por cor.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Tipo:** `String`
- **Predefinição:** `'purple'`

Cor predefinida do indicador de progresso circular mostrado no rodapé quando `limit` está definido.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Tipo:** `String`
- **Predefinição:** `'orange'`

Cor do indicador de progresso quando a utilização ultrapassa 75% do limite.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Tipo:** `String`
- **Predefinição:** `'red'`

Cor do indicador de progresso quando o limite de carateres foi atingido.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Tipo:** `TiptapifyFooterAlignment`
- **Predefinição:** `'end'`

Alinhamento dos itens de estado do rodapé. Aceita `'start'`, `'center'` ou `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Tipo:** `Boolean | TiptapifyAiOptions`
- **Predefinição:** `false`

Ativa o item `ai` da barra de ferramentas. O editor constrói um pedido `/v1/chat/completions` compatível com OpenAI e passa-o a `aiProvider`. Utilize o callback do fornecedor para chamar o seu backend, BFF, endpoint protegido por OAuth, LM Studio ou wrapper de SDK.

```vue
<script setup lang="ts">
const ai = {
  async aiProvider(request) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error('AI request failed')
    }

    return response.json()
  },
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

Exemplo com o LLM local LM Studio:

```ts
const ai = {
  model: 'google/gemma-4-12b-qat',
  async aiProvider(request) {
    const response = await fetch('http://127.0.0.1:1234/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    return response.json()
  },
}
```

O resultado em streaming é suportado definindo `stream: true` e enviando os tokens através do argumento `stream` de `aiProvider`. O campo de resultado no diálogo de IA é atualizado em direto à medida que os fragmentos chegam, e um botão **Parar** cancela o pedido em curso:

```ts
const ai = {
  stream: true,
  async aiProvider(request, context, stream) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal: stream?.signal,
    })

    if (!response.ok || !response.body) {
      throw new Error('AI request failed')
    }

    let content = ''
    let buffer = ''
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        if (!line.startsWith('data: ') || line === 'data: [DONE]') {
          continue
        }

        const { choices } = JSON.parse(line.slice(6))
        const delta = choices?.[0]?.delta ?? {}

        if (delta.reasoning_content) {
          stream?.onReasoning(delta.reasoning_content)
        }

        const chunk = delta.content ?? ''

        if (chunk) {
          content += chunk
          stream?.onChunk(chunk)
        }
      }
    }

    return { content }
  },
}
```

Passe `stream.signal` ao `fetch` (ou à chamada do seu SDK) para que o pedido seja cancelado quando o utilizador clica em **Parar** ou fecha o diálogo. O conteúdo já recebido em streaming permanece no campo de resultado e pode ser aplicado ou descartado. Os fornecedores que não fazem streaming podem ignorar por completo o argumento `stream` — é opcional e retrocompatível.

Os modelos de raciocínio (Qwen thinking, DeepSeek, série o) enviam em streaming os seus "pensamentos" num delta `reasoning_content` separado. Encaminhe esses fragmentos através de `stream.onReasoning()` — com `showReasoning: true`, o diálogo apresenta-os num painel recolhível **Raciocínio** acima do campo de resultado (o painel está oculto por predefinição). A saída de raciocínio serve apenas para visualização e nunca é inserida no editor.

Para permitir que o utilizador alterne o modo de raciocínio do modelo em cada pedido, defina `thinking: true` nas opções de IA. O diálogo mostra então um seletor **Raciocínio** (ativado por predefinição, reposto em cada abertura); o plugin escreve o valor do seletor no pedido como `enable_thinking: true | false`, pelo que já não precisa (nem deve) de definir `enable_thinking` nas suas `chatCompletionOptions`:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
  }"
/>
```

Quando `thinking` é `false` ou é omitido, o seletor não é mostrado e o plugin envia `enable_thinking: false`, de modo que os modelos que raciocinam por predefinição (Qwen3, DeepSeek, …) não raciocinem.

Para permitir que o utilizador escolha o nível de raciocínio em cada pedido, defina `reasoningEffort` nas opções de IA. O diálogo mostra então um menu pendente **Nível de raciocínio** preenchido a partir de `options` — níveis de esforço personalizados (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
A extensão acrescenta sempre ela própria um item `default` ao menu pendente (a base do modo de raciocínio), pelo que nunca deve listar `default` na sua configuração; o campo `default` da opção pré-seleciona um dos seus níveis personalizados quando o diálogo abre (caso contrário, `default` fica pré-selecionado) e o valor é reposto em cada abertura.
O valor selecionado decide o que o plugin escreve no pedido: `default` mantém o modo de raciocínio — o seletor **Raciocínio** continua ativo e controla `enable_thinking`; qualquer outro valor é enviado como `reasoning_effort`, e o seletor Raciocínio fica desativado enquanto esse valor estiver selecionado (os fornecedores rejeitam `enable_thinking` e `reasoning_effort` no mesmo pedido).
O menu pendente só é mostrado quando `thinking` está ativado e o seletor Raciocínio está ligado — desativar o raciocínio oculta-o e `reasoning_effort` não é enviado (o pedido recorre a `enable_thinking: false`). Quando `options` está em falta ou vazio, o menu pendente não é renderizado de todo:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    reasoningEffort: {
      options: ['low', 'medium', 'high', 'xhigh', 'max'],
    },
  }"
/>
```

O painel **Raciocínio** está oculto por predefinição (`showReasoning` é `false` por predefinição). Defina `showReasoning: true` para mostrar um painel recolhível que apresenta em streaming o processo de raciocínio do modelo (delta `reasoning_content`) mantendo o raciocínio ativado — o modelo continua a raciocinar e o resultado é aplicado da mesma forma; apenas o raciocínio passo a passo é apresentado adicionalmente:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    showReasoning: true,
  }"
/>
```

Os exemplos de prompt personalizados substituem os valores predefinidos localizados:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    promptExamples: [
      { title: 'Rewrite', prompt: 'Rewrite this in a direct tone.' },
      { title: 'Shorten', prompt: 'Make this shorter.' },
      { title: 'Explain', prompt: 'Explain this for a beginner.' },
    ],
  }"
/>
```

`tokenProvider` e `storage` são hooks opcionais, da responsabilidade de quem integra, para integrações diretas no navegador. As chaves de API ou os tokens de fornecedor colocados em código do navegador ou no armazenamento do navegador são visíveis para os utilizadores e não devem ser tratados como segredos. Prefira o padrão de adaptador de backend acima para segredos de produção.

Utilize `mode: 'insert' | 'replace' | 'append'` para pré-selecionar o modo de inserção no botão de ação do diálogo (**Inserir** / **Substituir** / **Adicionar ao final**). Sem `mode`, o botão assume por predefinição **Substituir** quando há texto selecionado ao abrir o diálogo e **Inserir** caso contrário. O botão de ação é um botão dividido: a parte principal aplica o resultado no modo pré-selecionado e uma pequena secção "mais" (⋮) à direita abre um menu com os outros modos — clicar num deles aplica de imediato o resultado nesse modo.

Quando o editor tem um `limit` (limite de carateres), é mostrado um contador de carateres `generated / limit` abaixo do campo de resultado logo que é gerado um resultado (atualiza-se em direto durante o streaming e fica vermelho suave quando o limite seria excedido).
O diálogo também mostra o aviso `ai.limit_exceeded` logo após a geração se o resultado da IA exceder o limite.
Nesse estado, o botão **Inserir** e o respetivo menu de modos alternativos ficam desativados — a extensão `CharacterCount` rejeita qualquer inserção que faça o documento exceder o limite, pelo que o resultado é aplicado por inteiro ou de todo: é inserido na totalidade quando cabe, ou não é inserido de todo quando excede o limite.
Encurte o resultado para voltar a ativar a ação:

```vue
<Tiptapify
  :content="content"
  :limit="300"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
  }"
/>
```

Utilize `systemPrompt`, `temperature`, `chatCompletionOptions` ou `createMessages(context)` para personalizar o pedido de chat-completions compatível com OpenAI. O `context` contém `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` são o texto do parágrafo da seleção à sua volta (até 500 carateres cada, vazios sem seleção) — envie-os juntamente com a seleção, ou o modelo toma o fragmento pelo texto todo e completa-o.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Tipo:** `String`
- **Predefinição:** `undefined`

Alternativa a um `aiProvider` personalizado: aponte a funcionalidade de IA para um endpoint LLM do backend e o tiptapify constrói e envia o pedido ele próprio. O backend recebe um payload JSON mínimo:

- **Sempre:** `prompt` (o pedido escrito no diálogo) e `instruction` (o seu `systemPrompt`, a mensagem de sistema de um `createMessages` personalizado ou o valor predefinido integrado).
- **Opcionais, enviados apenas quando definidos:** `stream` (apenas `true`), `thinking` (o seletor **Raciocínio** do diálogo, apenas `true`), `reasoning_effort` (o nível de esforço selecionado) e `model`.

A resposta é aceite de forma permissiva: uma string simples, um objeto `{ content }` ou um payload `choices` compatível com OpenAI. Quando o pedido tem `stream: true`, o corpo da resposta é lido como um fluxo SSE (linhas `data:`, terminado por `data: [DONE]`): são aceites deltas ao estilo OpenAI (`choices[0].delta.content` / `.reasoning_content`), um fragmento simples `{ type: 'content' | 'reasoning', data }`, um fragmento plano `{ content, reasoning_content }` e linhas `data` em texto simples. Se o backend ignorar `stream` e responder com um corpo simples, esse corpo é utilizado. Uma resposta que não seja OK apresenta no diálogo a mensagem de erro do backend (JSON `{ error }` / `{ message }` ou o corpo em bruto). Um botão **Parar** e o fecho do diálogo interrompem o pedido em curso; o conteúdo já recebido em streaming é mantido no campo de resultado.

Se `aiProvider` e `aiEndpoint` estiverem ambos definidos, `aiProvider` prevalece.

```vue
<script setup lang="ts">
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
  thinking: true,
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

### `ai.aiHeaders` {#ai-aiheaders}

- **Tipo:** `Record<string, string>`
- **Predefinição:** `undefined`

Cabeçalhos adicionais enviados com o pedido `aiEndpoint`, fundidos sobre `Content-Type: application/json`. Um cabeçalho `Authorization` definido aqui é mantido tal como está; caso contrário, é enviado um token de `tokenProvider` (quando definido) como `Authorization: Bearer <token>`.

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiEndpoint: '/api/ai/generate',
    aiHeaders: { 'X-Api-Key': '…' },
  }"
  :items="['ai']"
/>
```

### `defaultFontFamily` {#defaultfontfamily}

- **Tipo:** `String`
- **Predefinição:** `'Inter'`

Tipo de letra predefinido para o conteúdo do editor.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Tipo:** `String`
- **Predefinição:** `'px'`

Unidade de medida para os valores de tamanho do tipo de letra.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Tipo:** `String`
- **Predefinição:** `'0'`

Raio do contorno do contentor do editor. Aceita valores de raio do Vuetify (`sm`, `md`, `lg`, `xl`, `pill`, etc.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Tipo:** `variantBtnTypes`
- **Predefinição:** `'tonal'`

Variante de botão do Vuetify para os botões da barra de ferramentas. O valor é partilhado com todos os componentes da barra de ferramentas através da configuração do editor — os componentes personalizados podem lê-lo com [`useTiptapifyConfig`](/pt/api/types#usetiptapifyconfig). Consulte [`variantBtnTypes`](/pt/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Tipo:** `variantFieldTypes`
- **Predefinição:** `'outlined'`

Variante do Vuetify para os campos de menu pendente da barra de ferramentas. O valor é partilhado com todos os componentes da barra de ferramentas através da configuração do editor — os componentes personalizados podem lê-lo com [`useTiptapifyConfig`](/pt/api/types#usetiptapifyconfig). Consulte [`variantFieldTypes`](/pt/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Tipo:** `Array<toolbarSections>`
- **Predefinição:** `[]`

Forneça secções personalizadas da barra de ferramentas para alargar ou acrescentar itens. Os componentes de cada secção podem ler a configuração partilhada do editor com [`useTiptapifyConfig`](/pt/api/types#usetiptapifyconfig). Consulte [Barra de ferramentas personalizada](/pt/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Tipo:** `Boolean`
- **Predefinição:** `true`

Ativa a aplicação interativa de estilos.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Tipo:** `Boolean`
- **Predefinição:** `false`

Mostra uma barra de progresso indeterminada enquanto o editor está a carregar.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Tipo:** `String`
- **Predefinição:** `'default'`

Cor da barra de progresso de carregamento. Aceita valores de cor do tema do Vuetify.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Tipo:** `String`
- **Predefinição:** `'1px'`

Altura da barra de progresso de carregamento.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Tipo:** `Number`
- **Predefinição:** `0`

A partir deste número de imagens seguidas (sem nada entre elas), o editor dispõe-as numa grelha numerada de três colunas, para sites que apresentam essas imagens como um slider. `0` desativa-o.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Tipo:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/pt/api/types#tiptapifyskininput))
- **Predefinição:** `'default'`

O aspeto do cromado do editor: barra de ferramentas, menus flutuantes, menus pendentes, diálogos, rodapé.

- `default` — o aspeto clássico: uma barra de ferramentas elevada, grupos de botões como caixas elevadas, botões do Vuetify com um estado premido na cor primária.
- `pastel` — o aspeto discreto: uma barra de ferramentas plana e tingida sob uma linha fina, botões fantasma com um estado premido neutro, menus pendentes claros, diálogos suaves.

As funcionalidades (legendas de imagens, sliders, o menu pendente de alinhamento, estilos de lista) funcionam da mesma forma nas duas skins.

```vue
<Tiptapify skin="pastel" />
```

Também pode passar um objeto de skin em linha: substituições de tokens (`colors` / `metrics`) e flags de forma, com `extends` opcional de uma skin registada. É resolvido sobre `default` (ou a sua base), renderizado sob a classe `tiptapify-skin-inline` (`tiptapify-skin-{name}` quando o objeto tem um `name`), e os seus tokens são aplicados como variáveis CSS `--tf-*` na raiz do editor. Os nomes personalizados vêm de `registerSkin('mint', { … })` — consulte o [guia de skins](/pt/guide/skins) para a tabela de tokens e as receitas.

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Tipo:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/pt/api/types#tiptapifyuploadoptions))
- **Predefinição:** `null`

O endpoint dos [carregamentos](/pt/guide/uploads): os ficheiros escolhidos nos diálogos de imagem e de vídeo (e a capa de um vídeo, a imagem de um cartão de link) são enviados para ele com `POST {endpoint}` (`file` e `kind` multipart), e o documento mantém o URL que ele devolve (`{ "url": … }`).

Sem esta prop, o diálogo de imagem continua a aceitar um ficheiro: uma imagem escolhida (e a capa de um vídeo) é incorporada no documento como URL de dados em base64, e as imagens em base64 são mantidas quando o documento é carregado. O diálogo de vídeo só oferece **Carregar** com esta prop. Com `upload` definido, as imagens em base64 são descartadas quando o documento é carregado.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Tipo:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/pt/api/types#tiptapifycontentstyles))
- **Predefinição:** `'inline'`

Como o HTML guardado transporta o aspeto dos cartões de ligação, das imagens com legenda, dos vídeos, dos embeds e das listas de tarefas (consulte [Estilos de conteúdo](/pt/guide/content-styles)): `inline` escreve-o nos atributos `style` desses elementos, pelo que um site mostra o HTML tal como está; `classes` mantém apenas as classes, para um site que carrega `tiptapify/content.css`. O editor ignora estes estilos ao carregar o HTML, por isso ambos os tipos de HTML são carregados da mesma forma.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Tipo:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/pt/api/types#tiptapifylinkpreviewoptions))
- **Predefinição:** `null`

O endpoint de backend dos [cartões de link](/pt/guide/link-cards): lê os dados OpenGraph das páginas, o que um navegador não consegue (CORS). O editor verifica-o com um handshake ao iniciar (`GET {endpoint}` tem de responder `200 { "tiptapifyLinkPreview": 1 }`); até responder, nada oferece um cartão.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Eventos {#events}

### `editor-ready` {#editor-ready}

Disparado quando a instância do editor está pronta.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string  // Get current HTML content
  getJSON: () => object  // Get current JSON content
}
```

```vue
<script setup lang="ts">
const onEditorReady = (payload) => {
  console.log(payload.editor)
  console.log(payload.getHTML())
  console.log(payload.getJSON())
}
</script>

<template>
  <Tiptapify @editor-ready="onEditorReady" />
</template>
```

### `content-changed` {#content-changed}

Disparado quando o conteúdo do editor muda.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

```vue
<script setup lang="ts">
const onContentChanged = ({ html, json }) => {
  console.log('HTML:', html)
  console.log('JSON:', json)
}
</script>

<template>
  <Tiptapify @content-changed="onContentChanged" />
</template>
```

### `update:modelValue` {#update-modelvalue}

Suporta a ligação `v-model`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
const content = ref('<p>Hello</p>')
</script>

<template>
  <Tiptapify v-model="content" />
</template>
```

## Provide / Inject {#provide-inject}

A instância do editor e a função `t` estão disponíveis através do provide/inject do Vue:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
