# Props {#props}

## Props de `<Tiptapify>` {#tiptapify-props}

### `content` {#content}

- **Tipo:** `String | Object`
- **Padrão:** `''`

Conteúdo inicial do editor. Aceita uma string HTML ou um objeto JSON do Tiptap.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` é apenas o conteúdo **inicial**; para binding bidirecional use `v-model` (veja `modelValue`).

### `modelValue` {#modelvalue}

- **Tipo:** `String | Object`
- **Padrão:** `''`

Valor do binding bidirecional para `v-model`. Use `v-model` para manter um valor reativo sincronizado com o editor. A cada edição, o componente emite `update:modelValue` com o HTML mais recente, que o `v-model` grava de volta no seu ref. Quando apenas `v-model` é usado (sem `:content`), o valor vinculado é o conteúdo inicial do editor.

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
- **Padrão:** `''`

Texto de placeholder exibido quando o editor está vazio.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Tipo:** `Number`
- **Padrão:** `null`

Altura mínima da área de conteúdo do editor, em pixels.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Tipo:** `Boolean`
- **Padrão:** `true`

Mostra ou oculta a barra de ferramentas.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Tipo:** `Array<String> | Object`
- **Padrão:** `[]`

Itens da barra de ferramentas a exibir. Passe um array com nomes de itens ou um objeto com seções nomeadas. Veja [Itens da barra de ferramentas](/pt-br/api/toolbar-items).
Em um array, `'|'` divide os itens em grupos (nessa ordem, independentemente da seção de origem dos botões) e `'~'` empurra os itens seguintes para o final da barra de ferramentas. Com grupos, um nome que não é um item nativo reserva um lugar para o botão personalizado com esse nome em `customExtensions`; sem esse botão, o lugar é descartado.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Tipo:** `Boolean`
- **Padrão:** `false`

Quando `true`, a prop `items` especifica os itens a **excluir**, em vez dos itens a incluir.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Tipo:** `Boolean`
- **Padrão:** `true`

Mostra o bubble menu quando há texto selecionado: uma linha de botões de ícone em grupos — negrito, itálico, sublinhado, tachado | sobrescrito, subscrito | destaque, código inline | link | limpar formatação. Cada botão tem uma dica com seu atalho e fica ativo quando a marca está na seleção. O menu é ocultado para um bloco selecionado (imagem, widget), dentro de código e quando o documento inteiro está selecionado.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Tipo:** `Boolean`
- **Padrão:** `true`

Mostra o floating menu em linhas vazias: título 1, título 2 e uma lista com marcadores, na mesma linha de botões de ícone do bubble menu.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Tipo:** `Boolean`
- **Padrão:** `true`

Ativa o menu de slash commands (digite `/` para abri-lo).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Tipo:** `Boolean`
- **Padrão:** `true`

Mostra a contagem de palavras no rodapé do editor.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Tipo:** `Boolean`
- **Padrão:** `true`

Mostra a contagem de caracteres no rodapé do editor.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Tipo:** `Number | null`
- **Padrão:** `null`

Número máximo de caracteres permitido pela extensão `CharacterCount` do Tiptap. Defina `null` ou omita a prop para manter a edição ilimitada. Quando definida com um valor maior que `0`, o rodapé exibe um indicador de progresso circular em SVG com limites codificados por cor.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Tipo:** `String`
- **Padrão:** `'purple'`

Cor padrão do indicador de progresso circular exibido no rodapé quando `limit` está definido.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Tipo:** `String`
- **Padrão:** `'orange'`

Cor do indicador de progresso quando o uso ultrapassa 75% do limite.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Tipo:** `String`
- **Padrão:** `'red'`

Cor do indicador de progresso quando o limite de caracteres foi atingido.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Tipo:** `TiptapifyFooterAlignment`
- **Padrão:** `'end'`

Alinhamento dos itens de status do rodapé. Aceita `'start'`, `'center'` ou `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Tipo:** `Boolean | TiptapifyAiOptions`
- **Padrão:** `false`

Ativa o item `ai` da barra de ferramentas. O editor monta uma requisição `/v1/chat/completions` compatível com a OpenAI e a passa para `aiProvider`. Use o callback do provedor para chamar seu backend, BFF, endpoint protegido por OAuth, LM Studio ou um wrapper de SDK.

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

A saída em streaming é suportada definindo `stream: true` e enviando os tokens pelo argumento `stream` de `aiProvider`. O campo de resultado no diálogo de IA é atualizado ao vivo enquanto os chunks chegam, e um botão **Parar** cancela a requisição em andamento:

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

Passe `stream.signal` para o `fetch` (ou para a chamada do seu SDK) para que a requisição seja cancelada quando o usuário clicar em **Parar** ou fechar o diálogo. O conteúdo parcialmente recebido permanece no campo de resultado e pode ser aplicado ou descartado. Provedores que não fazem streaming podem simplesmente ignorar o argumento `stream` — ele é opcional e retrocompatível.

Modelos de raciocínio (Qwen thinking, DeepSeek, série o) transmitem seus "pensamentos" em um delta `reasoning_content` separado. Encaminhe esses chunks por `stream.onReasoning()` — com `showReasoning: true`, o diálogo os exibe em um painel recolhível **Pensando** acima do campo de resultado (o painel fica oculto por padrão). A saída de raciocínio serve apenas para exibição e nunca é inserida no editor.

Para permitir que o usuário alterne o modo de raciocínio do modelo a cada requisição, defina `thinking: true` nas opções de IA. O diálogo então exibe um interruptor **Pensando** (ativado por padrão, redefinido a cada abertura); o plugin grava o valor do interruptor na requisição como `enable_thinking: true | false`, então você não precisa mais (nem deve) definir `enable_thinking` por conta própria em `chatCompletionOptions`:

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

Quando `thinking` é `false` ou é omitido, o interruptor não é exibido e o plugin envia `enable_thinking: false`, de modo que modelos que pensam por padrão (Qwen3, DeepSeek, …) não pensem.

Para permitir que o usuário escolha o esforço de raciocínio a cada requisição, defina `reasoningEffort` nas opções de IA. O diálogo então exibe uma lista suspensa **Esforço de raciocínio** preenchida a partir de `options` — níveis de esforço personalizados (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
A extensão sempre adiciona um item `default` à lista (a base do modo de raciocínio), então você nunca lista `default` na sua configuração; o campo `default` da opção pré-seleciona um dos seus níveis personalizados quando o diálogo abre (caso contrário, `default` é pré-selecionado), e o valor é redefinido a cada abertura.
O valor selecionado decide o que o plugin grava na requisição: `default` mantém o modo de raciocínio — o interruptor **Pensando** continua ativo e controla `enable_thinking`; qualquer outro valor é enviado como `reasoning_effort`, e o interruptor Pensando fica desabilitado enquanto esse valor estiver selecionado (os provedores rejeitam `enable_thinking` e `reasoning_effort` na mesma requisição).
A lista só é exibida quando `thinking` está ativado e o interruptor Pensando está ligado — desligar o raciocínio a oculta e `reasoning_effort` não é enviado (a requisição volta a `enable_thinking: false`). Quando `options` está ausente ou vazio, a lista não é renderizada:

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

O painel **Pensando** fica oculto por padrão (`showReasoning` é `false` por padrão). Defina `showReasoning: true` para exibir um painel recolhível que transmite o processo de raciocínio do modelo (delta `reasoning_content`) mantendo o raciocínio ativado — o modelo continua raciocinando e o resultado é aplicado da mesma forma; apenas o raciocínio passo a passo é exibido adicionalmente:

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

Exemplos de prompt personalizados substituem os padrões localizados:

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

`tokenProvider` e `storage` são hooks opcionais, de responsabilidade do consumidor, para integrações diretas no navegador. Chaves de API ou tokens de provedor colocados no código do navegador ou no armazenamento do navegador ficam visíveis aos usuários e não devem ser tratados como segredos. Prefira o padrão de adaptador de backend acima para segredos em produção.

Use `mode: 'insert' | 'replace' | 'append'` para pré-selecionar o modo de inserção no botão de ação do diálogo (**Inserir** / **Substituir** / **Adicionar ao final**). Sem `mode`, o botão assume **Substituir** quando há texto selecionado ao abrir o diálogo e **Inserir** caso contrário. O botão de ação é um botão dividido: a parte principal aplica o resultado no modo pré-selecionado, e uma pequena seção "mais" (⋮) à direita abre um menu com os outros modos — clicar em um deles aplica o resultado nesse modo imediatamente.

Quando o editor tem um `limit` (limite de caracteres), um contador de caracteres `generated / limit` é exibido abaixo do campo de resultado assim que um resultado é gerado (é atualizado ao vivo durante o streaming e fica em vermelho suave quando o limite seria excedido).
O diálogo também exibe o aviso `ai.limit_exceeded` logo após a geração, se a saída da IA exceder o limite.
Nesse estado, o botão **Inserir** e o menu de modos alternativos ficam desabilitados — a extensão `CharacterCount` rejeita qualquer inserção que faça o documento ultrapassar o limite, então o resultado é aplicado por completo ou não é aplicado: é inserido integralmente quando cabe, ou não é inserido quando excede o limite.
Encurte o resultado para reabilitar a ação:

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

Use `systemPrompt`, `temperature`, `chatCompletionOptions` ou `createMessages(context)` para personalizar a requisição de chat completions compatível com a OpenAI. `context` contém `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` são o texto do parágrafo da seleção ao redor dela (até 500 caracteres cada, vazios sem seleção) — envie-os junto com a seleção, ou o modelo toma o fragmento pelo texto inteiro e o completa.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Tipo:** `String`
- **Padrão:** `undefined`

Alternativa a um `aiProvider` personalizado: aponte o recurso de IA para um endpoint de LLM no backend e o tiptapify monta e envia a requisição por conta própria. O backend recebe um payload JSON mínimo:

- **Sempre:** `prompt` (o pedido digitado no diálogo) e `instruction` (seu `systemPrompt`, a mensagem de sistema de um `createMessages` personalizado ou o padrão embutido).
- **Opcionais, enviados somente quando definidos:** `stream` (somente `true`), `thinking` (o interruptor **Pensando** do diálogo, somente `true`), `reasoning_effort` (o nível de esforço selecionado) e `model`.

A resposta é aceita de forma flexível: uma string simples, um objeto `{ content }` ou um payload `choices` compatível com a OpenAI. Quando a requisição tem `stream: true`, o corpo da resposta é lido como um fluxo SSE (linhas `data:`, terminado por `data: [DONE]`): deltas no estilo OpenAI (`choices[0].delta.content` / `.reasoning_content`), um chunk simples `{ type: 'content' | 'reasoning', data }`, um chunk plano `{ content, reasoning_content }` e linhas `data` de texto puro são todos aceitos. Se o backend ignorar `stream` e responder com um corpo simples, esse corpo é usado. Uma resposta não OK exibe no diálogo a mensagem de erro do backend (JSON `{ error }` / `{ message }` ou o corpo bruto). Um botão **Parar** e o fechamento do diálogo abortam a requisição em andamento; o conteúdo parcialmente recebido é mantido no campo de resultado.

Se `aiProvider` e `aiEndpoint` estiverem definidos, `aiProvider` prevalece.

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
- **Padrão:** `undefined`

Cabeçalhos extras enviados com a requisição de `aiEndpoint`, mesclados sobre `Content-Type: application/json`. Um cabeçalho `Authorization` definido aqui é mantido como está; caso contrário, um token de `tokenProvider` (quando definido) é enviado como `Authorization: Bearer <token>`.

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
- **Padrão:** `'Inter'`

Família de fonte padrão do conteúdo do editor.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Tipo:** `String`
- **Padrão:** `'px'`

Unidade de medida dos valores de tamanho de fonte.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Tipo:** `String`
- **Padrão:** `'0'`

Raio da borda do contêiner do editor. Aceita valores de raio do Vuetify (`sm`, `md`, `lg`, `xl`, `pill`, etc.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Tipo:** `variantBtnTypes`
- **Padrão:** `'tonal'`

Variante de botão do Vuetify para os botões da barra de ferramentas. O valor é compartilhado com todos os componentes da barra de ferramentas pela configuração do editor — componentes personalizados podem lê-lo com [`useTiptapifyConfig`](/pt-br/api/types#usetiptapifyconfig). Veja [`variantBtnTypes`](/pt-br/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Tipo:** `variantFieldTypes`
- **Padrão:** `'outlined'`

Variante do Vuetify para os campos suspensos da barra de ferramentas. O valor é compartilhado com todos os componentes da barra de ferramentas pela configuração do editor — componentes personalizados podem lê-lo com [`useTiptapifyConfig`](/pt-br/api/types#usetiptapifyconfig). Veja [`variantFieldTypes`](/pt-br/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Tipo:** `Array<toolbarSections>`
- **Padrão:** `[]`

Forneça seções personalizadas da barra de ferramentas para estender ou adicionar itens. Os componentes de cada seção podem ler a configuração compartilhada do editor com [`useTiptapifyConfig`](/pt-br/api/types#usetiptapifyconfig). Veja [Barra de ferramentas personalizada](/pt-br/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Tipo:** `Boolean`
- **Padrão:** `true`

Ativa a aplicação interativa de estilos.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Tipo:** `Boolean`
- **Padrão:** `false`

Mostra uma barra de progresso indeterminada enquanto o editor carrega.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Tipo:** `String`
- **Padrão:** `'default'`

Cor da barra de progresso de carregamento. Aceita valores de cor do tema do Vuetify.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Tipo:** `String`
- **Padrão:** `'1px'`

Altura da barra de progresso de carregamento.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Tipo:** `Number`
- **Padrão:** `0`

A partir desta quantidade de imagens em sequência (sem nada entre elas), o editor as organiza em uma grade numerada de três colunas, para sites que exibem essas imagens como um slider. `0` desativa o recurso.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Tipo:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/pt-br/api/types#tiptapifyskininput))
- **Padrão:** `'default'`

A aparência do chrome do editor: barra de ferramentas, bubble menus, menus suspensos, diálogos e rodapé.

- `default` — o visual clássico: uma barra de ferramentas elevada, grupos de botões como caixas elevadas, botões do Vuetify com estado pressionado na cor primária.
- `pastel` — o visual discreto: uma barra de ferramentas plana e tingida sob uma linha fina, botões fantasma com estado pressionado neutro, menus suspensos claros, diálogos suaves.

Os recursos (legendas de imagem, sliders, o menu suspenso de alinhamento, estilos de lista) funcionam da mesma forma nas duas skins.

```vue
<Tiptapify skin="pastel" />
```

Você também pode passar um objeto de skin inline: sobrescritas de tokens (`colors` / `metrics`) e flags de forma, opcionalmente com `extends` de uma skin registrada. Ele é resolvido sobre `default` (ou sobre a sua base), é renderizado sob a classe `tiptapify-skin-inline` (`tiptapify-skin-{name}` quando o objeto traz um `name`) e seus tokens chegam como variáveis CSS `--tf-*` na raiz do editor. Nomes personalizados vêm de `registerSkin('mint', { … })` — veja o [guia de Skins](/pt-br/guide/skins) para a tabela de tokens e as receitas.

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Tipo:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/pt-br/api/types#tiptapifyuploadoptions))
- **Padrão:** `null`

O endpoint de [uploads](/pt-br/guide/uploads): os arquivos escolhidos nos diálogos de imagem e vídeo (e o pôster de um vídeo, a imagem de um link card) são enviados a ele com `POST {endpoint}` (`file` e `kind` em multipart), e o documento guarda a URL que ele responde (`{ "url": … }`).

Sem ele, o diálogo de imagem ainda aceita um arquivo: uma imagem escolhida (e o pôster de um vídeo) é incorporada ao documento como uma data URL base64, e imagens base64 são mantidas quando o documento é carregado. O diálogo de vídeo oferece **Enviar** somente com esta prop. Com `upload` definido, as imagens base64 são descartadas quando o documento é carregado.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Tipo:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/pt-br/api/types#tiptapifycontentstyles))
- **Padrão:** `'inline'`

Como o HTML salvo carrega a aparência de cartões de link, imagens com legenda, vídeos, embeds e listas de tarefas (veja [Estilos de conteúdo](/pt-br/guide/content-styles)): `inline` a grava nos atributos `style` desses elementos, de modo que um site exibe o HTML como ele é; `classes` mantém apenas as classes, para um site que carrega `tiptapify/content.css`. O editor ignora esses estilos ao carregar o HTML, então os dois tipos de HTML são carregados da mesma forma.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Tipo:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/pt-br/api/types#tiptapifylinkpreviewoptions))
- **Padrão:** `null`

O endpoint de backend dos [link cards](/pt-br/guide/link-cards): ele lê os dados OpenGraph das páginas, algo que o navegador não consegue (CORS). O editor o verifica com um handshake ao iniciar (`GET {endpoint}` deve responder `200 { "tiptapifyLinkPreview": 1 }`); até que ele responda, nada oferece um cartão.

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

Suporta o binding com `v-model`.

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

A instância do editor e a função `t` estão disponíveis via provide/inject do Vue:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
