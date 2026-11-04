# AI-tillägg {#ai-extension}

AI-tillägget lägger till en verktygsfältsknapp som öppnar en dialog för begäran, skickar förfrågan till en leverantör du väljer, visar det strömmade resultatet och infogar det i redigeraren via lägesspecifik åtgärdsknapp (**Infoga** / **Ersätt** / **Lägg till i slutet**).

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

Propen `ai` accepterar `true` (alternativ med standardvärden) eller ett alternativobjekt (`TiptapifyAiOptions`). Verktygsfältsobjektet `ai` registreras alltid, men knappen är **inaktiverad** om inte `aiProvider` är angiven.

Se [AI-exemplet](/sv/examples/ai) för en körbar demo och [Props](/sv/api/props#ai) för den fullständiga alternativreferensen.

## Arkitektur {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normaliserar propen `ai`: `ai: true` blir ett tomt alternativobjekt, `promptExamples` faller tillbaka på de lokaliserade standardvärdena och resultatet exponeras för underordnade komponenter via `inject('tiptapifyAi')` (`TiptapifyAiResolvedOptions` eller `false`).
- Verktygsfältsobjektet (`src/components/Toolbar/ai.ts`) renderar `Button.vue`. Knappen kontrollerar om `aiProvider` är tillgänglig och öppnar `Dialog.vue`.
- `Dialog.vue` äger hela förfrågans livscykel: att bygga förfrågan, anropa leverantören, strömma och infoga resultatet.

## Leverantörskontraktet {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

Leverantören är en vanlig asynkron funktion som du implementerar. tiptapify anropar inget API själv — allt som kan ta emot ett OpenAI-kompatibelt `request`-objekt fungerar (fetch, ett SDK, en backend-adapter). Undantaget är backend-läget `aiEndpoint` (se [Backend-generering](#backend-generation-aiendpoint)), där tiptapify skickar förfrågan till din endpoint.

**Förfrågan** (`TiptapifyAiRequest`) byggs av dina `chatCompletionOptions` och utökas sedan av pluginet:

| Fält | Källa |
| --- | --- |
| `messages` | `createMessages(context)` om angiven, annars standardparet: ett systemmeddelande (din `systemPrompt` eller en inbyggd standard) och ett användarmeddelande som innehåller begäran plus den markerade redigerartexten med texten runt omkring och regeln att svara enbart för markeringen (eller hela texten när ingenting är markerat) |
| `model` | alternativet `model`, när det är angivet |
| `temperature` | alternativet `temperature`, när det är angivet |
| `stream` | alternativet `stream` eller `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | resonemangsomkopplaren / nivårullgardinen — se nedan |

**Kontext** (`TiptapifyAiEditorContext`) ger leverantören hela redigerarens tillstånd: `prompt`, `selectedText`, `textBefore` / `textAfter` (texten i markeringens stycke runt den, upp till 500 tecken vardera), `text`, `html`, `json` och `mode` (`insert` / `replace` / `append`).

En markering som börjar eller slutar inuti ett ord tar med hela ordet, och standardmeddelandena skickar texten runt markeringen med regeln att svara enbart för markeringen: får en modell bara ett fragment tar den det för hela texten och fullbordar det, och ersättningen skulle upprepa det som följer efter markeringen.

**Svar**: leverantören får returnera innehållet som en vanlig `string`, som `{ content }` (`TiptapifyAiResponse`) eller som en OpenAI-kompatibel `choices`-payload (`TiptapifyAiOpenAiResponse`). Dialogen hämtar innehållet i den ordningen och tar bort inledande blanksteg. Vid avslag visas felmeddelandet i dialogen (eller `ai.error` när felet inte är en `Error`-instans) och dialogen förblir öppen.

## Backend-generering (`aiEndpoint`) {#backend-generation-aiendpoint}

I stället för att implementera en `aiProvider` kan du peka AI-funktionen mot en LLM-endpoint i backend:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

tiptapify bygger då förfrågan och skickar den till endpointen själv. En uttrycklig `aiProvider` har alltid företräde när båda är angivna.

**Förfrågan** — en minimal JSON-payload (`TiptapifyAiBackendRequest`):

| Fält | Skickas |
| --- | --- |
| `prompt` | alltid — begäran som skrivits i dialogen |
| `instruction` | alltid — din `systemPrompt`, systemmeddelandet från en egen `createMessages` eller den inbyggda standarden |
| `stream` | bara när `stream: true` |
| `thinking` | bara när dialogens omkopplare **Resonemang** är på |
| `reasoning_effort` | bara när användaren har valt en nivå (inte `default`) |
| `model` | bara när alternativet `model` är angivet |

**Svar** — accepteras tolerant: en vanlig sträng, ett `{ content }`-objekt eller en OpenAI-kompatibel `choices`-payload.

**Strömning** — när förfrågan har `stream: true` läses svarskroppen som en SSE-ström (`data:`-rader, avslutade med `data: [DONE]`). Accepterade chunkformat:

- OpenAI-stil — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Enkel — `data: {"type":"content"|"reasoning","data":"…"}`
- Platt — `data: {"content":"…","reasoning_content":"…"}`
- Ren text — `data: some text` (en `data`-rad som inte är JSON är en innehållschunk)

`content`-chunkar uppdaterar resultatfältet via `onChunk`, `reasoning_content`-chunkar matar panelen **Resonemang** via `onReasoning`. Om backend ignorerar `stream` och svarar med en vanlig kropp används den kroppen i stället. Ett klick på **Stoppa** eller att stänga dialogen avbryter förfrågan; delvis strömmat innehåll behålls i resultatfältet.

**Headers** — `aiHeaders` (en `Record<string, string>`) slås ihop över `Content-Type: application/json`. En `Authorization`-header i `aiHeaders` behålls som den är; annars skickas en token från `tokenProvider` som `Authorization: Bearer <token>`.

**Fel** — ett svar som inte är OK visar backends felmeddelande (JSON `{ error }` / `{ message }` eller den råa kroppen) i dialogen.

## Strömning {#streaming}

När `stream: true` (eller `chatCompletionOptions.stream` är `true`) skickar dialogen ett `TiptapifyAiStream`-objekt som tredje argument:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — skicka den till `fetch` (eller ditt SDK-anrop). Den avbryts när användaren klickar på **Stoppa** eller stänger dialogen, så att pågående förfrågningar inte fortsätter köra.
- **`onChunk`** — lägg till varje innehållschunk i resultatfältet. Under generering är resultatfältet skrivskyddat och delvis strömmat innehåll behålls (du kan stoppa och sedan infoga eller förkasta det).
- **`onReasoning`** — vidarebefordra modellens resonemangsutdata (t.ex. deltat `reasoning_content` från Qwen/DeepSeek/o-serien) till en hopfällbar panel **Resonemang** ovanför resultatet. Panelen fälls ut och rullas automatiskt under strömningen. Resonemangsutdata är bara till för visning och infogas aldrig i redigeraren.

Leverantörer som inte strömmar ignorerar argumentet `stream` — det är valfritt.

## Resonemang och resoneringsnivå {#thinking-and-reasoning-effort}

Två användarkontroller i dialogen motsvarar förfrågningsfält. Båda är valfria via alternativ och ägs av pluginet — du ska inte (och bör inte) sätta dessa fält själv i `chatCompletionOptions`.

- **`thinking: true`** visar omkopplaren **Resonemang** (på som standard, återställs vid varje öppning av dialogen). Pluginet skriver omkopplarens värde i förfrågan som `enable_thinking: true | false`.
- **`thinking` saknas eller `thinking: false`** döljer omkopplaren och pluginet skickar `enable_thinking: false`, så att modeller som resonerar som standard inte resonerar.
- **`reasoningEffort: { options, default? }`** visar rullgardinen **Resoneringsnivå**. `options` listar de egna nivåer du vill erbjuda (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); tillägget lägger alltid själv till ett `default`-objekt (utgångsnivån för resonemangsläget), så du listar aldrig `default` i din konfiguration. Fältet `default` förväljer en av dina egna nivåer när dialogen öppnas — när det utelämnas är `default` förvalt. Värdet återställs vid varje öppning. Rullgardinen renderas bara när `options` är en icke-tom lista, `thinking` är aktiverat och omkopplaren Resonemang är på.
- **`showReasoning`** (standard `false`) styr den hopfällbara panelen **Resonemang** som strömmar modellens resoneringsprocess (deltat `reasoning_content`). Ange `showReasoning: true` för att visa panelen medan resonemang förblir på — modellen resonerar fortfarande, resultatet tillämpas på samma sätt, bara det stegvisa resonemanget visas dessutom.

Eftersom leverantörer (särskilt vLLM/LM Studio) avvisar `enable_thinking` och `reasoning_effort` i samma förfrågan skickar pluginet exakt ett av de två:

| Tillstånd | Förfrågningsfält |
| --- | --- |
| Resonemang på, nivå = `default` (eller ingen nivå konfigurerad) | `enable_thinking` (från omkopplaren) |
| Resonemang på, nivå = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (från rullgardinen); omkopplaren är inaktiverad |
| Resonemang av (omkopplaren av, eller `thinking` inte aktiverat i konfigurationen) | `enable_thinking: false`; `reasoning_effort` skickas inte |

## Fel {#errors}

Dialogen förklarar en misslyckad förfrågan i stället för att visa det råa felet, och lägger till tjänstens eget meddelande efter förklaringen:

| Vad som hände | Förklaring |
| --- | --- |
| Webbläsaren fick inget svar (`Failed to fetch`, `NetworkError…`, `Load failed`) | Tjänsten ligger nere, kan inte nås eller CORS blockerade svaret; webbläsarens konsol visar vilket |
| `401` / `403` | Kontrollera API-nyckeln eller behörigheterna |
| `404` | Kontrollera endpointens sökväg |
| `408` / `504` / en timeout | Tjänsten svarade inte i tid |
| `429` | För många förfrågningar |
| `5xx` | Tjänsten är inte tillgänglig (läser in en modell, upptagen) |

Med `aiEndpoint` kommer statusen från svaret. En egen `aiProvider` får samma förklaringar genom att kasta ett fel med en `status`:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Alla andra fel visas med sitt eget meddelande.

## Infoga resultatet {#inserting-the-result}

På åtgärdsknappen — **Infoga**, **Ersätt** eller **Lägg till i slutet**, beroende på läget — placerar dialogen `result` i redigeraren:

- **Läge** — dialogens åtgärdsknapp är en delad knapp. Huvuddelen tillämpar resultatet i det förvalda läget (**Infoga** / **Ersätt** / **Lägg till i slutet**): alternativet `mode` förväljer det, eller **Ersätt** när text var markerad när dialogen öppnades och annars **Infoga**. En liten "mer"-del (⋮) till höger om knappen öppnar en meny med de återstående lägena — ett klick på ett av dem tillämpar resultatet i det läget direkt. **Infoga** placerar resultatet vid markören, **Ersätt** ersätter den markerade texten (som fångades när **Generera** klickades) och **Lägg till i slutet** lägger till det i slutet av dokumentet.
- **Teckengräns** — när redigeraren är konfigurerad med `limit` (tillägget `CharacterCount` avvisar varje transaktion som inte är en inklistring och som skulle få dokumentet att växa förbi gränsen) visas en teckenräknare `generated / limit` under resultatfältet (live under strömning, mjukt röd när gränsen skulle överskridas) och dialogen visar varningen `ai.limit_exceeded` direkt efter genereringen när resultatet skulle överskrida gränsen. Knappen **Infoga** och dess meny för alternativa lägen är då inaktiverade: resultatet tillämpas helt eller inte alls, så du måste korta ned det innan du tillämpar det.