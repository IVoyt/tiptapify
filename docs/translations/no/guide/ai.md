# AI-utvidelse {#ai-extension}

AI-utvidelsen legger til en verktøylinjeknapp som åpner en prompt-dialog, sender forespørselen til en provider du velger, viser det strømmede resultatet og setter det inn i editoren via handlingsknappen for den valgte modusen (**Sett inn** / **Erstatt** / **Legg til i slutten**).

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

`ai`-prop-en tar imot `true` (alternativer med standardverdier) eller et alternativobjekt (`TiptapifyAiOptions`). Verktøylinjeelementet `ai` er alltid registrert, men knappen er **deaktivert** med mindre `aiProvider` er satt.

Se [AI-eksempelet](/no/examples/ai) for en kjørbar demo og [Props](/no/api/props#ai) for den fullstendige alternativreferansen.

## Arkitektur {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normaliserer `ai`-prop-en: `ai: true` blir et tomt alternativobjekt, `promptExamples` faller tilbake til de lokaliserte standardene, og resultatet eksponeres til etterkommere via `inject('tiptapifyAi')` (`TiptapifyAiResolvedOptions` eller `false`).
- Verktøylinjeelementet (`src/components/Toolbar/ai.ts`) gjengir `Button.vue`. Knappen sjekker om `aiProvider` er tilgjengelig og åpner `Dialog.vue`.
- `Dialog.vue` eier hele forespørselens livssyklus: bygge forespørselen, kalle provideren, strømming og innsetting av resultatet.

## Provider-kontrakten {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

Provideren er en vanlig async-funksjon du implementerer. tiptapify kaller ikke noe API selv — alt som kan ta imot et OpenAI-kompatibelt `request`-objekt fungerer (fetch, en SDK, en backend-adapter). Unntaket er backend-modusen `aiEndpoint` (se [Backend-generering](#backend-generation-aiendpoint)), der tiptapify sender forespørselen til endepunktet ditt.

**Forespørselen** (`TiptapifyAiRequest`) spres fra din `chatCompletionOptions` og utvides deretter av pluginen:

| Felt | Kilde |
| --- | --- |
| `messages` | `createMessages(context)` hvis angitt, ellers standardparet: en systemmelding (din `systemPrompt` eller en innebygd standard) og en brukermelding som inneholder prompten pluss den markerte teksten i editoren med teksten rundt og regelen om å svare kun for utvalget (eller hele teksten når ingenting er markert) |
| `model` | `model`-alternativet, når det er satt |
| `temperature` | `temperature`-alternativet, når det er satt |
| `stream` | `stream`-alternativet, eller `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | tenkebryteren / innsatsnedtrekkslisten — se nedenfor |

**Konteksten** (`TiptapifyAiEditorContext`) gir provideren hele editortilstanden: `prompt`, `selectedText`, `textBefore` / `textAfter` (teksten i avsnittet rundt utvalget, opptil 500 tegn hver), `text`, `html`, `json` og `mode` (`insert` / `replace` / `append`).

Et utvalg som starter eller slutter midt i et ord, tar med hele ordet, og standardmeldingene sender teksten rundt utvalget sammen med regelen om å svare kun for utvalget: får modellen bare et fragment, tar den det for hele teksten og fullfører det, og erstatningen ville gjentatt det som følger etter utvalget.

**Svaret**: provideren kan returnere innholdet som en vanlig `string`, som `{ content }` (`TiptapifyAiResponse`) eller som en OpenAI-kompatibel `choices`-nyttelast (`TiptapifyAiOpenAiResponse`). Dialogen henter ut innholdet i den rekkefølgen og fjerner innledende mellomrom. Ved avvisning vises feilmeldingen i dialogen (eller `ai.error` når feilen ikke er en `Error`-instans), og dialogen blir åpen.

## Backend-generering (`aiEndpoint`) {#backend-generation-aiendpoint}

I stedet for å implementere en `aiProvider` kan du peke AI-funksjonen mot et LLM-endepunkt i backend:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

tiptapify bygger da forespørselen og sender den til endepunktet selv. En eksplisitt `aiProvider` vinner alltid når begge er satt.

**Forespørsel** — en minimal JSON-nyttelast (`TiptapifyAiBackendRequest`):

| Felt | Sendes |
| --- | --- |
| `prompt` | alltid — forespørselen skrevet i dialogen |
| `instruction` | alltid — din `systemPrompt`, systemmeldingen fra en egendefinert `createMessages`, eller den innebygde standarden |
| `stream` | bare når `stream: true` |
| `thinking` | bare når **Tenker**-bryteren i dialogen er på |
| `reasoning_effort` | bare når brukeren har valgt et nivå (ikke `default`) |
| `model` | bare når `model`-alternativet er satt |

**Svar** — godtas liberalt: en ren streng, et `{ content }`-objekt eller en OpenAI-kompatibel `choices`-nyttelast.

**Strømming** — når forespørselen har `stream: true`, leses svarkroppen som en SSE-strøm (`data:`-linjer, avsluttet med `data: [DONE]`). Godtatte delformater:

- OpenAI-stil — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Enkel — `data: {"type":"content"|"reasoning","data":"…"}`
- Flat — `data: {"content":"…","reasoning_content":"…"}`
- Ren tekst — `data: some text` (en `data`-linje som ikke er JSON, er en innholdsdel)

`content`-deler oppdaterer resultatfeltet via `onChunk`, og `reasoning_content`-deler mater **Tenker**-panelet via `onReasoning`. Hvis backend ignorerer `stream` og svarer med en vanlig kropp, brukes den kroppen i stedet. Et klikk på **Stopp** eller lukking av dialogen avbryter forespørselen. Delvis strømmet innhold blir stående i resultatfeltet.

**Headere** — `aiHeaders` (en `Record<string, string>`) flettes over `Content-Type: application/json`. En `Authorization`-header i `aiHeaders` beholdes som den er. Ellers sendes et token fra `tokenProvider` som `Authorization: Bearer <token>`.

**Feil** — et svar som ikke er OK, viser backendens feilmelding (JSON `{ error }` / `{ message }` eller den rå kroppen) i dialogen.

## Strømming {#streaming}

Når `stream: true` (eller `chatCompletionOptions.stream` er `true`), sender dialogen et `TiptapifyAiStream`-objekt som tredje argument:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — send det til `fetch` (eller SDK-kallet ditt). Det avbrytes når brukeren klikker **Stopp** eller lukker dialogen, slik at forespørsler som pågår, ikke fortsetter å kjøre.
- **`onChunk`** — legg hver innholdsdel til i resultatfeltet. Under genereringen er resultatfeltet skrivebeskyttet, og delvis strømmet innhold beholdes (du kan stoppe og deretter sette det inn eller forkaste det).
- **`onReasoning`** — videresend modellens resonnement/tenking (f.eks. `reasoning_content`-deltaen til Qwen/DeepSeek/o-serien) til et sammenleggbart **Tenker**-panel over resultatet. Panelet utvides og ruller automatisk under strømmingen. Resonnementet vises bare og settes aldri inn i editoren.

Providere som ikke strømmer, ignorerer `stream`-argumentet — det er valgfritt.

## Tenking og resonnementsinnsats {#thinking-and-reasoning-effort}

To brukerkontroller i dialogen tilsvarer forespørselsfelt. Begge er valgfrie via alternativer og eies av pluginen — du setter (og bør ikke sette) disse feltene selv i `chatCompletionOptions`.

- **`thinking: true`** viser **Tenker**-bryteren (på som standard, tilbakestilles ved hver åpning av dialogen). Pluginen skriver verdien til bryteren inn i forespørselen som `enable_thinking: true | false`.
- **`thinking` mangler eller `thinking: false`** skjuler bryteren, og pluginen sender `enable_thinking: false`, slik at modeller som tenker som standard, ikke tenker.
- **`reasoningEffort: { options, default? }`** viser nedtrekkslisten for **Resonnementsevne**. `options` lister de egendefinerte innsatsnivåene du vil tilby (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`). Utvidelsen legger alltid selv til et `default`-element (grunnlinjen for tenkemodus), så du lister aldri `default` i konfigurasjonen din. Feltet `default` forhåndsvelger ett av dine egendefinerte nivåer når dialogen åpnes — utelatt er `default` forhåndsvalgt. Verdien tilbakestilles ved hver åpning. Nedtrekkslisten gjengis bare når `options` er en ikke-tom liste, `thinking` er aktivert og Tenker-bryteren er på.
- **`showReasoning`** (standard `false`) styrer det sammenleggbare **Tenker**-panelet som strømmer modellens resonnement (`reasoning_content`-deltaen). Sett `showReasoning: true` for å vise panelet mens tenkingen holdes på — modellen resonnerer fortsatt, resultatet brukes på samme måte, bare resonnementet trinn for trinn vises i tillegg.

Fordi providere (særlig vLLM/LM Studio) avviser `enable_thinking` og `reasoning_effort` i samme forespørsel, sender pluginen nøyaktig ett av de to:

| Tilstand | Forespørselsfelt |
| --- | --- |
| Tenking på, innsats = `default` (eller ingen innsats konfigurert) | `enable_thinking` (fra bryteren) |
| Tenking på, innsats = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (fra nedtrekkslisten); bryteren er deaktivert |
| Tenking av (bryteren av, eller `thinking` ikke aktivert i konfigurasjonen) | `enable_thinking: false`; `reasoning_effort` sendes ikke |

## Feil {#errors}

Dialogen forklarer en mislykket forespørsel i stedet for å vise den rå feilen, og legger tjenestens egen melding til etterpå:

| Hva som skjedde | Forklaring |
| --- | --- |
| Nettleseren fikk ikke noe svar (`Failed to fetch`, `NetworkError…`, `Load failed`) | Tjenesten er nede, utilgjengelig, eller CORS blokkerte svaret. Nettleserkonsollen viser hvilket |
| `401` / `403` | Sjekk API-nøkkelen eller tilgangsrettighetene |
| `404` | Sjekk banen til endepunktet |
| `408` / `504` / et tidsavbrudd | Tjenesten svarte ikke i tide |
| `429` | For mange forespørsler |
| `5xx` | Tjenesten er utilgjengelig (laster en modell, opptatt) |

Med `aiEndpoint` kommer statusen fra svaret. En egendefinert `aiProvider` får de samme forklaringene ved å kaste en feil med en `status`:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Enhver annen feil vises med sin egen melding.

## Sette inn resultatet {#inserting-the-result}

På handlingsknappen — **Sett inn**, **Erstatt** eller **Legg til i slutten**, avhengig av modus — plasserer dialogen `result` i editoren:

- **Modus** — handlingsknappen i dialogen er en delt knapp. Hoveddelen bruker resultatet i den forhåndsvalgte modusen (**Sett inn** / **Erstatt** / **Legg til i slutten**): `mode`-alternativet forhåndsvelger den, ellers **Erstatt** når tekst var markert idet dialogen ble åpnet og **Sett inn** ellers. En liten «mer»-del (⋮) til høyre på knappen åpner en meny med de gjenværende modusene — et klikk på en av dem bruker resultatet i den modusen med en gang. **Sett inn** plasserer resultatet ved markøren, **Erstatt** erstatter den markerte teksten (fanget da **Generer** ble klikket), og **Legg til i slutten** legger det til på slutten av dokumentet.
- **Tegngrense** — når editoren er konfigurert med `limit` (utvidelsen `CharacterCount` avviser enhver transaksjon som ikke er innliming og som ville gjøre dokumentet lengre enn grensen), vises en tegnteller `generated / limit` under resultatfeltet (fortløpende under strømming, myk rød når grensen ville bli overskredet), og dialogen viser advarselen `ai.limit_exceeded` rett etter genereringen når resultatet ville overskride grensen. **Sett inn**-knappen og menyen med alternative moduser er da deaktivert: resultatet brukes helt eller ikke i det hele tatt, så du må korte det ned før du bruker det.