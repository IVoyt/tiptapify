# Estensione AI {#ai-extension}

L'estensione AI aggiunge un pulsante alla barra degli strumenti che apre una finestra di prompt, invia la richiesta a un provider a tua scelta, mostra il risultato in streaming e lo inserisce nell'editor tramite il pulsante d'azione specifico della modalità (**Inserisci** / **Sostituisci** / **Aggiungi alla fine**).

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

La prop `ai` accetta `true` (opzioni con valori predefiniti) oppure un oggetto di opzioni (`TiptapifyAiOptions`). L'elemento `ai` della barra degli strumenti è sempre registrato, ma il pulsante è **disabilitato** a meno che `aiProvider` non sia impostato.

Consulta l'[esempio AI](/it/examples/ai) per una demo eseguibile e [Props](/it/api/props#ai) per il riferimento completo delle opzioni.

## Architettura {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normalizza la prop `ai`: `ai: true` diventa un oggetto di opzioni vuoto, `promptExamples` ripiega sui valori predefiniti localizzati e il risultato viene esposto ai discendenti tramite `inject('tiptapifyAi')` (`TiptapifyAiResolvedOptions` oppure `false`).
- L'elemento della barra degli strumenti (`src/components/Toolbar/ai.ts`) rende `Button.vue`. Il pulsante controlla la disponibilità di `aiProvider` e apre `Dialog.vue`.
- `Dialog.vue` gestisce l'intero ciclo di vita della richiesta: costruzione della richiesta, chiamata al provider, streaming e inserimento del risultato.

## Il contratto del provider {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

Il provider è una semplice funzione async che implementi tu. tiptapify non chiama alcuna API in prima persona: funziona qualsiasi cosa sia in grado di consumare un oggetto `request` compatibile con OpenAI (fetch, un SDK, un adapter backend). L'eccezione è la modalità backend `aiEndpoint` (vedi [Generazione backend](#backend-generation-aiendpoint)), in cui tiptapify invia la richiesta al tuo endpoint.

La **richiesta** (`TiptapifyAiRequest`) viene espansa a partire dalle tue `chatCompletionOptions` e poi arricchita dal plugin:

| Campo | Origine |
| --- | --- |
| `messages` | `createMessages(context)` se fornita, altrimenti la coppia predefinita: un messaggio di sistema (il tuo `systemPrompt` o un valore predefinito integrato) e un messaggio utente che incorpora il prompt più il testo selezionato nell'editor con il testo circostante e la regola di rispondere solo per la selezione (o per l'intero testo quando nulla è selezionato) |
| `model` | opzione `model`, se impostata |
| `temperature` | opzione `temperature`, se impostata |
| `stream` | opzione `stream`, oppure `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | l'interruttore thinking / il menu a discesa dello sforzo: vedi sotto |

Il **contesto** (`TiptapifyAiEditorContext`) fornisce al provider lo stato completo dell'editor: `prompt`, `selectedText`, `textBefore` / `textAfter` (il testo del paragrafo della selezione attorno ad essa, fino a 500 caratteri ciascuno), `text`, `html`, `json` e `mode` (`insert` / `replace` / `append`).

Una selezione che inizia o finisce all'interno di una parola include l'intera parola, e i messaggi predefiniti inviano il testo attorno alla selezione con la regola di rispondere solo per la selezione: se riceve solo un frammento, un modello lo scambia per l'intero testo e lo completa, e la sostituzione ripeterebbe ciò che segue la selezione.

**Risposta**: il provider può restituire il contenuto come semplice `string`, come `{ content }` (`TiptapifyAiResponse`) oppure come payload `choices` compatibile con OpenAI (`TiptapifyAiOpenAiResponse`). La finestra estrae il contenuto in quest'ordine e rimuove gli spazi iniziali. In caso di rifiuto, il messaggio di errore viene mostrato nella finestra (oppure `ai.error` quando l'errore non è un'istanza di `Error`) e la finestra resta aperta.

## Generazione backend (`aiEndpoint`) {#backend-generation-aiendpoint}

Invece di implementare un `aiProvider`, puoi puntare la funzione AI a un endpoint LLM sul tuo backend:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

tiptapify costruisce quindi la richiesta e la invia lui stesso all'endpoint. Un `aiProvider` esplicito ha sempre la precedenza quando entrambi sono impostati.

**Richiesta**: un payload JSON minimo (`TiptapifyAiBackendRequest`):

| Campo | Inviato |
| --- | --- |
| `prompt` | sempre: la richiesta digitata nella finestra |
| `instruction` | sempre: il tuo `systemPrompt`, il messaggio di sistema di un `createMessages` personalizzato oppure il valore predefinito integrato |
| `stream` | solo con `stream: true` |
| `thinking` | solo quando l'interruttore **Riflessione** della finestra è attivo |
| `reasoning_effort` | solo quando l'utente ha scelto un livello (diverso da `default`) |
| `model` | solo quando l'opzione `model` è impostata |

**Risposta**: accettata in modo permissivo: una stringa semplice, un oggetto `{ content }` oppure un payload `choices` compatibile con OpenAI.

**Streaming**: quando la richiesta ha `stream: true`, il corpo della risposta viene letto come stream SSE (righe `data:`, terminato da `data: [DONE]`). Formati di chunk accettati:

- Stile OpenAI — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Semplice — `data: {"type":"content"|"reasoning","data":"…"}`
- Piatto — `data: {"content":"…","reasoning_content":"…"}`
- Testo semplice — `data: some text` (una riga `data` non JSON è un chunk di contenuto)

I chunk `content` aggiornano il campo del risultato tramite `onChunk`, i chunk `reasoning_content` alimentano il pannello **Riflessione** tramite `onReasoning`. Se il backend ignora `stream` e risponde con un corpo semplice, viene usato quel corpo. Un clic su **Ferma** o la chiusura della finestra interrompe la richiesta; il contenuto già ricevuto in streaming resta nel campo del risultato.

**Header**: gli `aiHeaders` (un `Record<string, string>`) vengono uniti sopra `Content-Type: application/json`. Un header `Authorization` in `aiHeaders` viene mantenuto così com'è; altrimenti un token da `tokenProvider` viene inviato come `Authorization: Bearer <token>`.

**Errori**: una risposta non OK mostra nella finestra il messaggio di errore del backend (JSON `{ error }` / `{ message }` oppure il corpo grezzo).

## Streaming {#streaming}

Quando `stream: true` (o `chatCompletionOptions.stream` è `true`), la finestra passa un oggetto `TiptapifyAiStream` come terzo argomento:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`**: passalo a `fetch` (o alla chiamata del tuo SDK). Viene interrotto quando l'utente fa clic su **Ferma** o chiude la finestra, così le richieste in corso non continuano a girare.
- **`onChunk`**: aggiungi ogni chunk di contenuto al campo del risultato. Durante la generazione il campo del risultato è di sola lettura e il contenuto già ricevuto viene conservato (puoi fermare, poi inserirlo o scartarlo).
- **`onReasoning`**: inoltra l'output di ragionamento/riflessione del modello (ad esempio il delta `reasoning_content` di Qwen/DeepSeek/serie o) a un pannello comprimibile **Riflessione** sopra il risultato. Il pannello si espande e scorre automaticamente durante lo streaming. L'output del ragionamento è solo da visualizzare e non viene mai inserito nell'editor.

I provider che non fanno streaming ignorano l'argomento `stream`, che è facoltativo.

## Riflessione e livello di ragionamento {#thinking-and-reasoning-effort}

Due controlli utente nella finestra corrispondono a campi della richiesta. Entrambi sono opzionali tramite le opzioni e sono gestiti dal plugin: non devi (e non dovresti) impostare tu questi campi in `chatCompletionOptions`.

- **`thinking: true`** mostra l'interruttore **Riflessione** (attivo per impostazione predefinita, reimpostato a ogni apertura della finestra). Il plugin scrive il valore dell'interruttore nella richiesta come `enable_thinking: true | false`.
- **`thinking` assente o `thinking: false`** nasconde l'interruttore e il plugin invia `enable_thinking: false`, così i modelli che per impostazione predefinita riflettono non lo fanno.
- **`reasoningEffort: { options, default? }`** mostra il menu a discesa **Livello di ragionamento**. `options` elenca i livelli personalizzati che vuoi offrire (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); l'estensione aggiunge sempre da sé una voce `default` (la base della modalità thinking), quindi non devi mai elencare `default` nella tua configurazione. Il campo `default` preseleziona uno dei tuoi livelli personalizzati all'apertura della finestra; se omesso, viene preselezionato `default`. Il valore viene reimpostato a ogni apertura. Il menu a discesa viene reso solo quando `options` è un elenco non vuoto, `thinking` è abilitato e l'interruttore Riflessione è attivo.
- **`showReasoning`** (predefinito `false`) controlla il pannello comprimibile **Riflessione** che mostra in streaming il processo di ragionamento del modello (il delta `reasoning_content`). Imposta `showReasoning: true` per mostrare quel pannello mantenendo attiva la riflessione: il modello ragiona comunque, il risultato viene applicato nello stesso modo, e in più viene mostrato il ragionamento passo dopo passo.

Poiché i provider (in particolare vLLM/LM Studio) rifiutano `enable_thinking` e `reasoning_effort` in una stessa richiesta, il plugin ne invia esattamente uno dei due:

| Stato | Campo della richiesta |
| --- | --- |
| Riflessione attiva, livello = `default` (o nessun livello configurato) | `enable_thinking` (dall'interruttore) |
| Riflessione attiva, livello = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (dal menu a discesa); l'interruttore è disabilitato |
| Riflessione disattivata (interruttore spento, o `thinking` non abilitato nella configurazione) | `enable_thinking: false`; `reasoning_effort` non viene inviato |

## Errori {#errors}

La finestra spiega una richiesta fallita invece di mostrare l'errore grezzo, e vi aggiunge di seguito il messaggio del servizio stesso:

| Cosa è successo | Spiegazione |
| --- | --- |
| Il browser non ha ricevuto risposta (`Failed to fetch`, `NetworkError…`, `Load failed`) | Il servizio è inattivo, irraggiungibile, oppure CORS ha bloccato la risposta; la console del browser indica quale |
| `401` / `403` | Controlla la chiave API o i diritti di accesso |
| `404` | Controlla il percorso dell'endpoint |
| `408` / `504` / un timeout | Il servizio non ha risposto in tempo |
| `429` | Troppe richieste |
| `5xx` | Il servizio non è disponibile (caricamento di un modello, occupato) |

Con `aiEndpoint` lo stato proviene dalla risposta. Un `aiProvider` personalizzato ottiene le stesse spiegazioni lanciando un errore con uno `status`:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Qualsiasi altro errore viene mostrato con il proprio messaggio.

## Inserimento del risultato {#inserting-the-result}

Con il pulsante d'azione (**Inserisci**, **Sostituisci** o **Aggiungi alla fine**, a seconda della modalità) la finestra inserisce `result` nell'editor:

- **Modalità**: il pulsante d'azione della finestra è un pulsante diviso. La parte principale applica il risultato nella modalità preselezionata (**Inserisci** / **Sostituisci** / **Aggiungi alla fine**): l'opzione `mode` la preseleziona, oppure **Sostituisci** quando all'apertura della finestra era selezionato del testo e **Inserisci** negli altri casi. Una piccola sezione "altro" (⋮) sulla destra del pulsante apre un menu con le modalità restanti: facendo clic su una, il risultato viene applicato subito in quella modalità. **Inserisci** colloca il risultato al cursore, **Sostituisci** sostituisce il testo selezionato (acquisito quando è stato fatto clic su **Genera**) e **Aggiungi alla fine** lo aggiunge in fondo al documento.
- **Limite di caratteri**: quando l'editor è configurato con `limit` (l'estensione `CharacterCount` rifiuta qualsiasi transazione non di incolla che farebbe superare al documento il limite), sotto il campo del risultato viene mostrato un contatore di caratteri `generated / limit` (in tempo reale durante lo streaming, rosso tenue quando il limite verrebbe superato) e, subito dopo la generazione, la finestra mostra l'avviso `ai.limit_exceeded` se il risultato supererebbe il limite. Il pulsante **Inserisci** e il suo menu delle modalità alternative vengono quindi disabilitati: il risultato viene applicato per intero o per niente, quindi devi accorciarlo prima di applicarlo.