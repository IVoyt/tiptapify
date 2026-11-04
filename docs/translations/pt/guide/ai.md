# Extensão de IA {#ai-extension}

A extensão de IA acrescenta à barra de ferramentas um botão que abre um diálogo de prompt, envia o pedido para um fornecedor à sua escolha, mostra o resultado em streaming e insere-o no editor através do botão de ação específico do modo (**Inserir** / **Substituir** / **Adicionar ao final**).

```vue
<Tiptapify
  :content="content"
  :items="['ai', '|', 'bold', 'italic']"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    stream: true,
  }"
/>
```

A prop `ai` aceita `true` (opções com valores predefinidos) ou um objeto de opções (`TiptapifyAiOptions`). O item `ai` da barra de ferramentas está sempre registado, mas o botão fica **desativado** a menos que `aiProvider` esteja definido.

Consulte o [exemplo de IA](/pt/examples/ai) para uma demonstração executável e as [Props](/pt/api/props#ai) para a referência completa das opções.

## Arquitetura {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- O `Tiptapify` normaliza a prop `ai`: `ai: true` passa a ser um objeto de opções vazio, `promptExamples` recorre aos valores predefinidos localizados e o resultado é exposto aos descendentes através de `inject('tiptapifyAi')` (`TiptapifyAiResolvedOptions` ou `false`).
- O item da barra de ferramentas (`src/components/Toolbar/ai.ts`) renderiza `Button.vue`. O botão verifica a disponibilidade de `aiProvider` e abre `Dialog.vue`.
- O `Dialog.vue` é responsável por todo o ciclo de vida do pedido: construir o pedido, chamar o fornecedor, fazer streaming e inserir o resultado.

## O contrato do fornecedor {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

O fornecedor é uma simples função assíncrona que implementa. O tiptapify não chama nenhuma API por si — funciona tudo o que consiga consumir um objeto `request` compatível com OpenAI (fetch, um SDK, um adaptador de backend). A exceção é o modo de backend `aiEndpoint` (consulte [Geração no backend](#backend-generation-aiendpoint)), em que o tiptapify envia o pedido para o seu endpoint.

O **pedido** (`TiptapifyAiRequest`) é espalhado a partir das suas `chatCompletionOptions` e depois enriquecido pelo plugin:

| Campo | Origem |
| --- | --- |
| `messages` | `createMessages(context)`, se fornecido; caso contrário, o par predefinido: uma mensagem de sistema (o seu `systemPrompt` ou um valor predefinido integrado) e uma mensagem de utilizador que inclui o prompt e o texto selecionado do editor, com o texto à volta e a regra de responder apenas para a seleção (ou para o texto todo quando nada está selecionado) |
| `model` | opção `model`, quando definida |
| `temperature` | opção `temperature`, quando definida |
| `stream` | opção `stream` ou `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | o seletor de raciocínio / o menu pendente de esforço — ver abaixo |

O **contexto** (`TiptapifyAiEditorContext`) dá ao fornecedor o estado completo do editor: `prompt`, `selectedText`, `textBefore` / `textAfter` (o texto do parágrafo da seleção à sua volta, até 500 carateres cada), `text`, `html`, `json` e `mode` (`insert` / `replace` / `append`).

Uma seleção que começa ou termina dentro de uma palavra abrange a palavra inteira, e as mensagens predefinidas enviam o texto à volta da seleção com a regra de responder apenas para a seleção: se receber só um fragmento, o modelo toma-o pelo texto todo e completa-o, e a substituição repetiria o que vem a seguir à seleção.

**Resposta**: o fornecedor pode devolver o conteúdo como uma `string` simples, como `{ content }` (`TiptapifyAiResponse`) ou como um payload `choices` compatível com OpenAI (`TiptapifyAiOpenAiResponse`). O diálogo extrai o conteúdo por essa ordem e remove os espaços em branco iniciais. Em caso de rejeição, a mensagem de erro é mostrada no diálogo (ou `ai.error` quando o erro não é uma instância de `Error`) e o diálogo permanece aberto.

## Geração no backend (`aiEndpoint`) {#backend-generation-aiendpoint}

Em vez de implementar um `aiProvider`, aponte a funcionalidade de IA para um endpoint LLM do backend:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

O tiptapify constrói então o pedido e envia-o ele próprio para o endpoint. Um `aiProvider` explícito prevalece sempre quando ambos estão definidos.

**Pedido** — um payload JSON mínimo (`TiptapifyAiBackendRequest`):

| Campo | Enviado |
| --- | --- |
| `prompt` | sempre — o pedido escrito no diálogo |
| `instruction` | sempre — o seu `systemPrompt`, a mensagem de sistema de um `createMessages` personalizado ou o valor predefinido integrado |
| `stream` | apenas com `stream: true` |
| `thinking` | apenas quando o seletor **Raciocínio** do diálogo está ativado |
| `reasoning_effort` | apenas quando o utilizador escolheu um nível (diferente de `default`) |
| `model` | apenas quando a opção `model` está definida |

**Resposta** — aceite de forma permissiva: uma string simples, um objeto `{ content }` ou um payload `choices` compatível com OpenAI.

**Streaming** — quando o pedido tem `stream: true`, o corpo da resposta é lido como um fluxo SSE (linhas `data:`, terminado por `data: [DONE]`). Formatos de fragmento aceites:

- Estilo OpenAI — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Simples — `data: {"type":"content"|"reasoning","data":"…"}`
- Plano — `data: {"content":"…","reasoning_content":"…"}`
- Texto simples — `data: some text` (uma linha `data` que não seja JSON é um fragmento de conteúdo)

Os fragmentos `content` atualizam o campo de resultado através de `onChunk`, e os fragmentos `reasoning_content` alimentam o painel **Raciocínio** através de `onReasoning`. Se o backend ignorar `stream` e responder com um corpo simples, esse corpo é utilizado. Um clique em **Parar** ou fechar o diálogo interrompe o pedido; o conteúdo já recebido em streaming é mantido no campo de resultado.

**Cabeçalhos** — os `aiHeaders` (um `Record<string, string>`) são fundidos sobre `Content-Type: application/json`. Um cabeçalho `Authorization` em `aiHeaders` é mantido tal como está; caso contrário, é enviado um token de `tokenProvider` como `Authorization: Bearer <token>`.

**Erros** — uma resposta que não seja OK apresenta no diálogo a mensagem de erro do backend (JSON `{ error }` / `{ message }` ou o corpo em bruto).

## Streaming {#streaming}

Quando `stream: true` (ou `chatCompletionOptions.stream` é `true`), o diálogo passa um objeto `TiptapifyAiStream` como terceiro argumento:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — passe-o ao `fetch` (ou à chamada do seu SDK). É interrompido quando o utilizador clica em **Parar** ou fecha o diálogo, para que os pedidos em curso não continuem a ser executados.
- **`onChunk`** — acrescente cada fragmento de conteúdo ao campo de resultado. Durante a geração, o campo de resultado é só de leitura e o conteúdo já recebido em streaming é mantido (pode parar e depois inseri-lo ou descartá-lo).
- **`onReasoning`** — encaminhe a saída de raciocínio do modelo (por exemplo, o delta `reasoning_content` dos modelos Qwen/DeepSeek/série o) para um painel recolhível **Raciocínio** acima do resultado. O painel expande-se e desloca-se automaticamente durante o streaming. A saída de raciocínio serve apenas para visualização e nunca é inserida no editor.

Os fornecedores que não fazem streaming ignoram o argumento `stream` — é opcional.

## Raciocínio e nível de raciocínio {#thinking-and-reasoning-effort}

Dois controlos do utilizador no diálogo correspondem a campos do pedido. Ambos são opcionais através das opções e pertencem ao plugin — não deve (nem deveria) definir estes campos nas suas `chatCompletionOptions`.

- **`thinking: true`** mostra o seletor **Raciocínio** (ativado por predefinição, reposto em cada abertura do diálogo). O plugin escreve o valor do seletor no pedido como `enable_thinking: true | false`.
- **`thinking` em falta ou `thinking: false`** oculta o seletor e o plugin envia `enable_thinking: false`, de modo que os modelos que raciocinam por predefinição não raciocinem.
- **`reasoningEffort: { options, default? }`** mostra o menu pendente **Nível de raciocínio**. `options` lista os níveis de esforço personalizados que pretende oferecer (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); a extensão acrescenta sempre ela própria um item `default` (a base do modo de raciocínio), pelo que nunca deve listar `default` na sua configuração. O campo `default` pré-seleciona um dos seus níveis personalizados quando o diálogo abre — quando omitido, `default` fica pré-selecionado. O valor é reposto em cada abertura. O menu pendente só é renderizado quando `options` é uma lista não vazia, `thinking` está ativado e o seletor Raciocínio está ligado.
- **`showReasoning`** (predefinição `false`) controla o painel recolhível **Raciocínio** que mostra em streaming o processo de raciocínio do modelo (o delta `reasoning_content`). Defina `showReasoning: true` para mostrar esse painel mantendo o raciocínio ativado — o modelo continua a raciocinar e o resultado é aplicado da mesma forma; apenas o raciocínio passo a passo é apresentado adicionalmente.

Como os fornecedores (em particular vLLM/LM Studio) rejeitam `enable_thinking` e `reasoning_effort` no mesmo pedido, o plugin envia exatamente um dos dois:

| Estado | Campo do pedido |
| --- | --- |
| Raciocínio ativado, esforço = `default` (ou nenhum esforço configurado) | `enable_thinking` (a partir do seletor) |
| Raciocínio ativado, esforço = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (a partir do menu pendente); o seletor fica desativado |
| Raciocínio desativado (seletor desligado, ou `thinking` não ativado na configuração) | `enable_thinking: false`; `reasoning_effort` não é enviado |

## Erros {#errors}

O diálogo explica um pedido falhado em vez de mostrar o erro em bruto e acrescenta a seguir a mensagem do próprio serviço:

| O que aconteceu | Explicação |
| --- | --- |
| O navegador não obteve resposta (`Failed to fetch`, `NetworkError…`, `Load failed`) | O serviço está em baixo, inacessível, ou o CORS bloqueou a resposta; a consola do navegador indica qual |
| `401` / `403` | Verifique a chave de API ou os direitos de acesso |
| `404` | Verifique o caminho do endpoint |
| `408` / `504` / um tempo limite | O serviço não respondeu a tempo |
| `429` | Demasiados pedidos |
| `5xx` | O serviço está indisponível (a carregar um modelo, ocupado) |

Com `aiEndpoint`, o estado vem da resposta. Um `aiProvider` personalizado obtém as mesmas explicações ao lançar um erro com um `status`:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Qualquer outro erro é mostrado com a sua própria mensagem.

## Inserir o resultado {#inserting-the-result}

No botão de ação — **Inserir**, **Substituir** ou **Adicionar ao final**, consoante o modo — o diálogo coloca o `result` no editor:

- **Modo** — o botão de ação do diálogo é um botão dividido. A parte principal aplica o resultado no modo pré-selecionado (**Inserir** / **Substituir** / **Adicionar ao final**): a opção `mode` pré-seleciona-o, ou **Substituir** quando havia texto selecionado ao abrir o diálogo e **Inserir** caso contrário. Uma pequena secção "mais" (⋮) à direita do botão abre um menu com os restantes modos — clicar num deles aplica de imediato o resultado nesse modo. **Inserir** coloca o resultado no cursor, **Substituir** substitui o texto selecionado (capturado quando se clicou em **Gerar**) e **Adicionar ao final** acrescenta-o no fim do documento.
- **Limite de carateres** — quando o editor está configurado com `limit` (a extensão `CharacterCount` rejeita qualquer transação que não seja uma colagem e faça o documento exceder o limite), é mostrado um contador de carateres `generated / limit` abaixo do campo de resultado (em tempo real durante o streaming, a vermelho suave quando o limite seria excedido) e o diálogo mostra o aviso `ai.limit_exceeded` logo após a geração quando o resultado excederia o limite. O botão **Inserir** e o respetivo menu de modos alternativos ficam então desativados: o resultado é aplicado por inteiro ou de todo, pelo que tem de o encurtar antes de o aplicar.