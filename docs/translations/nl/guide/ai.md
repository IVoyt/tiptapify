# AI-extensie {#ai-extension}

De AI-extensie voegt een toolbarknop toe die een promptdialoog opent, het verzoek naar een provider van je keuze stuurt, het gestreamde resultaat toont en het in de editor invoegt via de modusspecifieke actieknop (**Invoegen** / **Vervangen** / **Aan het einde toevoegen**).

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

De prop `ai` accepteert `true` (opties met standaardwaarden) of een optieobject (`TiptapifyAiOptions`). Het toolbaritem `ai` is altijd geregistreerd, maar de knop is **uitgeschakeld** tenzij `aiProvider` is ingesteld.

Zie het [AI-voorbeeld](/nl/examples/ai) voor een werkende demo en [Props](/nl/api/props#ai) voor de volledige optiereferentie.

## Architectuur {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normaliseert de prop `ai`: `ai: true` wordt een leeg optieobject, `promptExamples` valt terug op de gelokaliseerde standaardwaarden en het resultaat wordt via `inject('tiptapifyAi')` aan onderliggende componenten beschikbaar gesteld (`TiptapifyAiResolvedOptions` of `false`).
- Het toolbaritem (`src/components/Toolbar/ai.ts`) rendert `Button.vue`. De knop controleert of `aiProvider` beschikbaar is en opent `Dialog.vue`.
- `Dialog.vue` beheert de hele levenscyclus van het verzoek: het verzoek opbouwen, de provider aanroepen, streamen en het resultaat invoegen.

## Het providercontract {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

De provider is een gewone async-functie die je zelf implementeert. tiptapify roept zelf geen API aan — alles wat een OpenAI-compatibel `request`-object kan verwerken werkt (fetch, een SDK, een backend-adapter). De uitzondering is de backendmodus `aiEndpoint` (zie [Backend-generatie](#backend-generation-aiendpoint)), waarbij tiptapify het verzoek naar je endpoint stuurt.

Het **verzoek** (`TiptapifyAiRequest`) wordt gespreid uit je `chatCompletionOptions` en daarna door de plugin aangevuld:

| Veld | Bron |
| --- | --- |
| `messages` | `createMessages(context)` indien opgegeven, anders het standaardpaar: een systeembericht (je `systemPrompt` of een ingebouwde standaardwaarde) en een gebruikersbericht dat de prompt bevat plus de geselecteerde editortekst met de tekst eromheen en de regel om alleen voor de selectie te antwoorden (of voor de hele tekst als niets is geselecteerd) |
| `model` | optie `model`, indien ingesteld |
| `temperature` | optie `temperature`, indien ingesteld |
| `stream` | optie `stream`, of `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | de schakelaar voor nadenken / de dropdown voor inspanning — zie hieronder |

De **context** (`TiptapifyAiEditorContext`) geeft de provider de volledige editorstatus: `prompt`, `selectedText`, `textBefore` / `textAfter` (de tekst van de alinea van de selectie eromheen, elk maximaal 500 tekens), `text`, `html`, `json` en `mode` (`insert` / `replace` / `append`).

Een selectie die in een woord begint of eindigt, neemt het hele woord mee, en de standaardberichten sturen de tekst rond de selectie mee met de regel om alleen voor de selectie te antwoorden: krijgt een model alleen een fragment, dan houdt het dat voor de hele tekst en maakt het af, en zou de vervanging herhalen wat na de selectie volgt.

**Antwoord**: de provider mag de inhoud teruggeven als gewone `string`, als `{ content }` (`TiptapifyAiResponse`) of als OpenAI-compatibele `choices`-payload (`TiptapifyAiOpenAiResponse`). De dialoog haalt de inhoud in die volgorde op en verwijdert voorloopwitruimte. Bij een afwijzing wordt de foutmelding in de dialoog getoond (of `ai.error` als de fout geen `Error`-instantie is) en blijft de dialoog open.

## Backend-generatie (`aiEndpoint`) {#backend-generation-aiendpoint}

Richt de AI-functie, in plaats van een `aiProvider` te implementeren, op een backend-LLM-endpoint:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

tiptapify bouwt dan zelf het verzoek op en post het naar het endpoint. Een expliciete `aiProvider` wint altijd als beide zijn ingesteld.

**Verzoek** — een minimale JSON-payload (`TiptapifyAiBackendRequest`):

| Veld | Verzonden |
| --- | --- |
| `prompt` | altijd — het in de dialoog getypte verzoek |
| `instruction` | altijd — je `systemPrompt`, het systeembericht van een eigen `createMessages`, of de ingebouwde standaardwaarde |
| `stream` | alleen bij `stream: true` |
| `thinking` | alleen als de schakelaar **Nadenken** van de dialoog aan staat |
| `reasoning_effort` | alleen als de gebruiker een niveau koos (niet `default`) |
| `model` | alleen als de optie `model` is ingesteld |

**Antwoord** — soepel geaccepteerd: een gewone string, een `{ content }`-object of een OpenAI-compatibele `choices`-payload.

**Streaming** — bij `stream: true` wordt de responsebody gelezen als SSE-stream (`data:`-regels, afgesloten met `data: [DONE]`). Geaccepteerde chunkformaten:

- OpenAI-stijl — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Eenvoudig — `data: {"type":"content"|"reasoning","data":"…"}`
- Plat — `data: {"content":"…","reasoning_content":"…"}`
- Gewone tekst — `data: some text` (een `data`-regel zonder JSON is een contentchunk)

`content`-chunks werken het resultaatveld bij via `onChunk`, `reasoning_content`-chunks voeden het paneel **Nadenken** via `onReasoning`. Negeert de backend `stream` en antwoordt hij met een gewone body, dan wordt die body gebruikt. Een klik op **Stoppen** of het sluiten van de dialoog breekt het verzoek af; gedeeltelijk gestreamde inhoud blijft in het resultaatveld staan.

**Headers** — `aiHeaders` (een `Record<string, string>`) worden over `Content-Type: application/json` heen samengevoegd. Een `Authorization`-header in `aiHeaders` blijft ongewijzigd; anders wordt een token van `tokenProvider` verstuurd als `Authorization: Bearer <token>`.

**Fouten** — een niet-OK-antwoord toont de foutmelding van de backend (JSON `{ error }` / `{ message }` of de ruwe body) in de dialoog.

## Streaming {#streaming}

Bij `stream: true` (of `chatCompletionOptions.stream` is `true`) geeft de dialoog een `TiptapifyAiStream`-object door als derde argument:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — geef het door aan `fetch` (of je SDK-aanroep). Het breekt af wanneer de gebruiker op **Stoppen** klikt of de dialoog sluit, zodat lopende verzoeken niet doorlopen.
- **`onChunk`** — voeg elke contentchunk toe aan het resultaatveld. Tijdens het genereren is het resultaatveld alleen-lezen en blijft gedeeltelijk gestreamde inhoud behouden (je kunt stoppen en het daarna invoegen of weggooien).
- **`onReasoning`** — stuur de redeneer-/denkoutput van het model (bijv. de delta `reasoning_content` van Qwen/DeepSeek/o-series) door naar een inklapbaar paneel **Nadenken** boven het resultaat. Het paneel klapt automatisch uit en scrolt automatisch mee tijdens het streamen. Redeneeroutput is alleen om te tonen en wordt nooit in de editor ingevoegd.

Providers die niet streamen negeren het argument `stream` — het is optioneel.

## Nadenken en denk-inspanning {#thinking-and-reasoning-effort}

Twee bedieningselementen in de dialoog komen overeen met verzoekvelden. Beide zijn opt-in via opties en worden door de plugin beheerd — je stelt deze velden niet zelf in `chatCompletionOptions` in (en zou dat ook niet moeten doen).

- **`thinking: true`** toont de schakelaar **Nadenken** (standaard aan, bij elke keer openen van de dialoog gereset). De plugin schrijft de waarde van de schakelaar in het verzoek als `enable_thinking: true | false`.
- **`thinking` ontbreekt of `thinking: false`** verbergt de schakelaar en de plugin stuurt `enable_thinking: false`, zodat modellen die standaard nadenken dat niet doen.
- **`reasoningEffort: { options, default? }`** toont de dropdown **Denk-inspanning**. `options` geeft de eigen inspanningsniveaus die je wilt aanbieden (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); de extensie voegt zelf altijd een item `default` toe (de basislijn van de denkmodus), dus je neemt `default` nooit op in je configuratie. Het veld `default` selecteert vooraf een van je eigen niveaus wanneer de dialoog opent — als het ontbreekt, is `default` vooraf geselecteerd. De waarde wordt bij elke keer openen gereset. De dropdown wordt alleen gerenderd als `options` een niet-lege lijst is, `thinking` is ingeschakeld en de schakelaar Nadenken aan staat.
- **`showReasoning`** (standaard `false`) bepaalt het inklapbare paneel **Nadenken** dat het redeneerproces van het model streamt (de delta `reasoning_content`). Zet `showReasoning: true` om dat paneel te tonen terwijl nadenken aan blijft — het model redeneert nog steeds, het resultaat wordt op dezelfde manier toegepast, alleen het stapsgewijze redeneren wordt er extra bij getoond.

Omdat providers (met name vLLM/LM Studio) `enable_thinking` en `reasoning_effort` in één verzoek weigeren, stuurt de plugin precies één van de twee:

| Status | Verzoekveld |
| --- | --- |
| Nadenken aan, inspanning = `default` (of geen inspanning geconfigureerd) | `enable_thinking` (van de schakelaar) |
| Nadenken aan, inspanning = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (van de dropdown); de schakelaar is uitgeschakeld |
| Nadenken uit (schakelaar uit, of `thinking` niet ingeschakeld in de configuratie) | `enable_thinking: false`; `reasoning_effort` wordt niet verstuurd |

## Fouten {#errors}

De dialoog legt een mislukt verzoek uit in plaats van de ruwe fout te tonen, en voegt daarna het eigen bericht van de dienst toe:

| Wat er gebeurde | Uitleg |
| --- | --- |
| De browser kreeg geen antwoord (`Failed to fetch`, `NetworkError…`, `Load failed`) | De dienst ligt eruit, is onbereikbaar of CORS blokkeerde het antwoord; de browserconsole toont welke |
| `401` / `403` | Controleer de API-sleutel of de toegangsrechten |
| `404` | Controleer het pad van het endpoint |
| `408` / `504` / een time-out | De dienst antwoordde niet op tijd |
| `429` | Te veel verzoeken |
| `5xx` | De dienst is niet beschikbaar (laadt een model, bezet) |

Bij `aiEndpoint` komt de status uit de response. Een eigen `aiProvider` krijgt dezelfde uitleg door een fout met een `status` te gooien:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Elke andere fout wordt met zijn eigen bericht getoond.

## Het resultaat invoegen {#inserting-the-result}

Op de actieknop — **Invoegen**, **Vervangen** of **Aan het einde toevoegen**, afhankelijk van de modus — plaatst de dialoog `result` in de editor:

- **Modus** — de actieknop van de dialoog is een gesplitste knop. Het hoofdgedeelte past het resultaat toe in de vooraf geselecteerde modus (**Invoegen** / **Vervangen** / **Aan het einde toevoegen**): de optie `mode` selecteert die vooraf, of **Vervangen** als er tekst was geselecteerd toen de dialoog werd geopend en anders **Invoegen**. Een klein "meer"-gedeelte (⋮) rechts van de knop opent een menu met de overige modi — een klik erop past het resultaat direct in die modus toe. **Invoegen** plaatst het resultaat bij de cursor, **Vervangen** vervangt de geselecteerde tekst (vastgelegd op het moment van klikken op **Genereren**) en **Aan het einde toevoegen** voegt het aan het einde van het document toe.
- **Tekenlimiet** — wanneer de editor is geconfigureerd met `limit` (de extensie `CharacterCount` weigert elke niet-plak-transactie die het document voorbij de limiet zou laten groeien), wordt onder het resultaatveld een teller `generated / limit` getoond (live tijdens het streamen, zacht rood wanneer de limiet zou worden overschreden) en toont de dialoog direct na het genereren de waarschuwing `ai.limit_exceeded` wanneer het resultaat de limiet zou overschrijden. De knop **Invoegen** en het menu met alternatieve modi zijn dan uitgeschakeld: het resultaat wordt helemaal of niet toegepast, dus je moet het inkorten voordat je het toepast.