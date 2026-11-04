# Extensão de IA {#ai-extension}

A extensão de IA adiciona um botão à barra de ferramentas que abre um diálogo de prompt, envia a requisição a um provedor de sua escolha, exibe o resultado em streaming e o insere no editor pelo botão de ação específico do modo (**Inserir** / **Substituir** / **Adicionar ao final**).

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

A prop `ai` aceita `true` (opções com valores padrão) ou um objeto de opções (`TiptapifyAiOptions`). O item `ai` da barra de ferramentas é sempre registrado, mas o botão fica **desabilitado** a menos que `aiProvider` esteja definido.

Veja o [exemplo de IA](/pt-br/examples/ai) para uma demo executável e [Props](/pt-br/api/props#ai) para a referência completa das opções.

## Arquitetura {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normaliza a prop `ai`: `ai: true` vira um objeto de opções vazio, `promptExamples` recorre aos padrões localizados e o resultado é exposto aos descendentes via `inject('tiptapifyAi')` (`TiptapifyAiResolvedOptions` ou `false`).
- O item da barra de ferramentas (`src/components/Toolbar/ai.ts`) renderiza `Button.vue`. O botão verifica a disponibilidade de `aiProvider` e abre `Dialog.vue`.
- `Dialog.vue` é dono de todo o ciclo de vida da requisição: montar a requisição, chamar o provedor, fazer o streaming e inserir o resultado.

## O contrato do provedor {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

O provedor é uma função assíncrona simples que você implementa. O tiptapify não chama nenhuma API por conta própria — qualquer coisa que consiga consumir um objeto `request` compatível com a OpenAI funciona (fetch, um SDK, um adaptador de backend). A exceção é o modo de backend `aiEndpoint` (veja [Geração no backend](#backend-generation-aiendpoint)), em que o tiptapify envia a requisição ao seu endpoint.

A **requisição** (`TiptapifyAiRequest`) é espalhada a partir do seu `chatCompletionOptions` e depois complementada pelo plugin:

| Campo | Origem |
| --- | --- |
| `messages` | `createMessages(context)`, se fornecido; caso contrário, o par padrão: uma mensagem de sistema (seu `systemPrompt` ou um padrão embutido) e uma mensagem de usuário que incorpora o prompt, o texto selecionado do editor com o texto ao redor e a regra de responder apenas para a seleção (ou para o texto inteiro quando nada está selecionado) |
| `model` | opção `model`, quando definida |
| `temperature` | opção `temperature`, quando definida |
| `stream` | opção `stream`, ou `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | o interruptor de raciocínio / a lista de esforço — veja abaixo |

O **contexto** (`TiptapifyAiEditorContext`) dá ao provedor o estado completo do editor: `prompt`, `selectedText`, `textBefore` / `textAfter` (o texto do parágrafo da seleção ao redor dela, até 500 caracteres cada), `text`, `html`, `json` e `mode` (`insert` / `replace` / `append`).

Uma seleção que começa ou termina no meio de uma palavra inclui a palavra inteira, e as mensagens padrão enviam o texto ao redor da seleção com a regra de responder apenas para a seleção: se receber só um fragmento, o modelo o toma pelo texto inteiro e o completa, e a substituição repetiria o que vem depois da seleção.

**Resposta**: o provedor pode retornar o conteúdo como uma `string` simples, como `{ content }` (`TiptapifyAiResponse`) ou como um payload `choices` compatível com a OpenAI (`TiptapifyAiOpenAiResponse`). O diálogo extrai o conteúdo nessa ordem e remove os espaços iniciais. Em caso de rejeição, a mensagem de erro é exibida no diálogo (ou `ai.error` quando o erro não é uma instância de `Error`) e o diálogo permanece aberto.

## Geração no backend (`aiEndpoint`) {#backend-generation-aiendpoint}

Em vez de implementar um `aiProvider`, aponte o recurso de IA para um endpoint de LLM no backend:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

O tiptapify então monta a requisição e a envia ao endpoint por conta própria. Um `aiProvider` explícito sempre prevalece quando ambos estão definidos.

**Requisição** — um payload JSON mínimo (`TiptapifyAiBackendRequest`):

| Campo | Enviado |
| --- | --- |
| `prompt` | sempre — o pedido digitado no diálogo |
| `instruction` | sempre — seu `systemPrompt`, a mensagem de sistema de um `createMessages` personalizado ou o padrão embutido |
| `stream` | somente com `stream: true` |
| `thinking` | somente quando o interruptor **Pensando** do diálogo está ligado |
| `reasoning_effort` | somente quando o usuário escolheu um nível (diferente de `default`) |
| `model` | somente quando a opção `model` está definida |

**Resposta** — aceita de forma flexível: uma string simples, um objeto `{ content }` ou um payload `choices` compatível com a OpenAI.

**Streaming** — quando a requisição tem `stream: true`, o corpo da resposta é lido como um fluxo SSE (linhas `data:`, terminado por `data: [DONE]`). Formatos de chunk aceitos:

- Estilo OpenAI — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Simples — `data: {"type":"content"|"reasoning","data":"…"}`
- Plano — `data: {"content":"…","reasoning_content":"…"}`
- Texto puro — `data: some text` (uma linha `data` que não é JSON é um chunk de conteúdo)

Os chunks `content` atualizam o campo de resultado por meio de `onChunk`; os chunks `reasoning_content` alimentam o painel **Pensando** por meio de `onReasoning`. Se o backend ignorar `stream` e responder com um corpo simples, esse corpo é usado. Um clique em **Parar** ou o fechamento do diálogo aborta a requisição; o conteúdo parcialmente recebido é mantido no campo de resultado.

**Cabeçalhos** — `aiHeaders` (um `Record<string, string>`) são mesclados sobre `Content-Type: application/json`. Um cabeçalho `Authorization` em `aiHeaders` é mantido como está; caso contrário, um token de `tokenProvider` é enviado como `Authorization: Bearer <token>`.

**Erros** — uma resposta não OK exibe no diálogo a mensagem de erro do backend (JSON `{ error }` / `{ message }` ou o corpo bruto).

## Streaming {#streaming}

Quando `stream: true` (ou `chatCompletionOptions.stream` é `true`), o diálogo passa um objeto `TiptapifyAiStream` como terceiro argumento:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — passe-o para o `fetch` (ou para a chamada do seu SDK). Ele aborta quando o usuário clica em **Parar** ou fecha o diálogo, para que requisições em andamento não continuem rodando.
- **`onChunk`** — acrescente cada chunk de conteúdo ao campo de resultado. Durante a geração, o campo de resultado é somente leitura e o conteúdo parcialmente recebido é mantido (você pode parar e depois inseri-lo ou descartá-lo).
- **`onReasoning`** — encaminhe a saída de raciocínio/pensamento do modelo (por exemplo, o delta `reasoning_content` de Qwen/DeepSeek/série o) para um painel recolhível **Pensando** acima do resultado. O painel se expande e rola automaticamente durante o streaming. A saída de raciocínio serve apenas para exibição e nunca é inserida no editor.

Provedores que não fazem streaming ignoram o argumento `stream` — ele é opcional.

## Pensamento e esforço de raciocínio {#thinking-and-reasoning-effort}

Dois controles do usuário no diálogo correspondem a campos da requisição. Ambos são opcionais, ativados pelas opções, e pertencem ao plugin — você não define (e não deve definir) esses campos por conta própria em `chatCompletionOptions`.

- **`thinking: true`** exibe o interruptor **Pensando** (ativado por padrão, redefinido a cada abertura do diálogo). O plugin grava o valor do interruptor na requisição como `enable_thinking: true | false`.
- **`thinking` ausente ou `thinking: false`** oculta o interruptor e o plugin envia `enable_thinking: false`, de modo que modelos que pensam por padrão não pensem.
- **`reasoningEffort: { options, default? }`** exibe a lista suspensa **Esforço de raciocínio**. `options` lista os níveis de esforço personalizados que você quer oferecer (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); a extensão sempre adiciona um item `default` por conta própria (a base do modo de raciocínio), então você nunca lista `default` na sua configuração. O campo `default` pré-seleciona um dos seus níveis personalizados quando o diálogo abre — quando omitido, `default` é pré-selecionado. O valor é redefinido a cada abertura. A lista só é renderizada quando `options` é uma lista não vazia, `thinking` está ativado e o interruptor Pensando está ligado.
- **`showReasoning`** (padrão `false`) controla o painel recolhível **Pensando** que transmite o processo de raciocínio do modelo (o delta `reasoning_content`). Defina `showReasoning: true` para exibir esse painel mantendo o raciocínio ativado — o modelo continua raciocinando, o resultado é aplicado da mesma forma; apenas o raciocínio passo a passo é exibido adicionalmente.

Como os provedores (vLLM/LM Studio em particular) rejeitam `enable_thinking` e `reasoning_effort` na mesma requisição, o plugin envia exatamente um dos dois:

| Estado | Campo da requisição |
| --- | --- |
| Raciocínio ligado, esforço = `default` (ou nenhum esforço configurado) | `enable_thinking` (do interruptor) |
| Raciocínio ligado, esforço = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (da lista suspensa); o interruptor fica desabilitado |
| Raciocínio desligado (interruptor desligado, ou `thinking` não ativado na configuração) | `enable_thinking: false`; `reasoning_effort` não é enviado |

## Erros {#errors}

O diálogo explica uma requisição que falhou em vez de exibir o erro bruto, e acrescenta em seguida a mensagem do próprio serviço:

| O que aconteceu | Explicação |
| --- | --- |
| O navegador não recebeu resposta (`Failed to fetch`, `NetworkError…`, `Load failed`) | O serviço está fora do ar, inacessível, ou o CORS bloqueou a resposta; o console do navegador indica qual |
| `401` / `403` | Verifique a chave de API ou os direitos de acesso |
| `404` | Verifique o caminho do endpoint |
| `408` / `504` / um timeout | O serviço não respondeu a tempo |
| `429` | Requisições demais |
| `5xx` | O serviço está indisponível (carregando um modelo, ocupado) |

Com `aiEndpoint`, o status vem da resposta. Um `aiProvider` personalizado recebe as mesmas explicações lançando um erro com um `status`:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Qualquer outro erro é exibido com a sua própria mensagem.

## Inserindo o resultado {#inserting-the-result}

No botão de ação — **Inserir**, **Substituir** ou **Adicionar ao final**, conforme o modo — o diálogo coloca `result` no editor:

- **Modo** — o botão de ação do diálogo é um botão dividido. A parte principal aplica o resultado no modo pré-selecionado (**Inserir** / **Substituir** / **Adicionar ao final**): a opção `mode` o pré-seleciona; sem ela, é **Substituir** quando havia texto selecionado ao abrir o diálogo e **Inserir** caso contrário. Uma pequena seção "mais" (⋮) à direita do botão abre um menu com os demais modos — clicar em um deles aplica o resultado nesse modo imediatamente. **Inserir** coloca o resultado no cursor, **Substituir** substitui o texto selecionado (capturado quando **Gerar** foi clicado) e **Adicionar ao final** o acrescenta ao fim do documento.
- **Limite de caracteres** — quando o editor está configurado com `limit` (a extensão `CharacterCount` rejeita qualquer transação que não seja uma colagem e faria o documento ultrapassar o limite), um contador de caracteres `generated / limit` é exibido abaixo do campo de resultado (ao vivo durante o streaming, em vermelho suave quando o limite seria excedido) e o diálogo exibe o aviso `ai.limit_exceeded` logo após a geração quando o resultado excederia o limite. O botão **Inserir** e o seu menu de modos alternativos ficam então desabilitados: o resultado é aplicado por completo ou não é aplicado, então você precisa encurtá-lo antes de aplicá-lo.