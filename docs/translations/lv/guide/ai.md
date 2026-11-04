# AI paplašinājums {#ai-extension}

AI paplašinājums pievieno rīkjoslas pogu, kas atver pieprasījuma dialoglodziņu, nosūta pieprasījumu jūsu izvēlētam piegādātājam, parāda straumēto rezultātu un ievieto to redaktorā ar režīmam atbilstošo darbības pogu (**Ievietot** / **Aizstāt** / **Pievienot beigās**).

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

Rekvizīts `ai` pieņem `true` (opcijas ar noklusējumiem) vai opciju objektu (`TiptapifyAiOptions`). Rīkjoslas elements `ai` ir reģistrēts vienmēr, taču poga ir **atspējota**, ja nav iestatīts `aiProvider`.

Darbināmu demonstrāciju skatiet [AI piemērā](/lv/examples/ai), bet pilnu opciju atsauci — sadaļā [Rekvizīti](/lv/api/props#ai).

## Arhitektūra {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normalizē rekvizītu `ai`: `ai: true` kļūst par tukšu opciju objektu, `promptExamples` atgriežas pie lokalizētajiem noklusējumiem, un rezultāts tiek nodots pēcnācējiem ar `inject('tiptapifyAi')` (`TiptapifyAiResolvedOptions` vai `false`).
- Rīkjoslas elements (`src/components/Toolbar/ai.ts`) renderē `Button.vue`. Poga pārbauda `aiProvider` pieejamību un atver `Dialog.vue`.
- `Dialog.vue` pārvalda visu pieprasījuma dzīves ciklu: pieprasījuma veidošanu, piegādātāja izsaukšanu, straumēšanu un rezultāta ievietošanu.

## Piegādātāja līgums {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

Piegādātājs ir vienkārša asinhrona funkcija, ko jūs ieviešat. tiptapify pats neizsauc nevienu API — darbojas viss, kas spēj apstrādāt ar OpenAI saderīgu `request` objektu (fetch, SDK, backend adapteris). Izņēmums ir `aiEndpoint` backend režīms (skatiet [Backend ģenerēšana](#backend-generation-aiendpoint)), kurā tiptapify pieprasījumu nosūta uz jūsu galapunktu.

**Pieprasījums** (`TiptapifyAiRequest`) tiek izvērsts no jūsu `chatCompletionOptions`, pēc tam spraudnis to papildina:

| Lauks | Avots |
| --- | --- |
| `messages` | `createMessages(context)`, ja norādīts, citādi noklusējuma pāris: sistēmas ziņojums (jūsu `systemPrompt` vai iebūvētais noklusējums) un lietotāja ziņojums, kas satur pieprasījumu, atlasīto redaktora tekstu ar tekstu ap to un noteikumu atbildēt tikai par atlasīto (vai par visu tekstu, ja nekas nav atlasīts) |
| `model` | opcija `model`, ja iestatīta |
| `temperature` | opcija `temperature`, ja iestatīta |
| `stream` | opcija `stream` vai `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | domāšanas slēdzis / līmeņa nolaižamā izvēlne — skatiet zemāk |

**Konteksts** (`TiptapifyAiEditorContext`) dod piegādātājam pilnu redaktora stāvokli: `prompt`, `selectedText`, `textBefore` / `textAfter` (atlases rindkopas teksts ap to, līdz 500 rakstzīmēm katrā pusē), `text`, `html`, `json` un `mode` (`insert` / `replace` / `append`).

Atlase, kas sākas vai beidzas vārda iekšienē, ņem visu vārdu, un noklusējuma ziņojumi sūta tekstu ap atlasi kopā ar noteikumu atbildēt tikai par atlasīto: ja dots tikai fragments, modelis to uztver kā visu tekstu un pabeidz, un aizstājums atkārtotu to, kas seko atlasei.

**Atbilde**: piegādātājs var atgriezt saturu kā vienkāršu `string`, kā `{ content }` (`TiptapifyAiResponse`) vai kā ar OpenAI saderīgu `choices` datu paketi (`TiptapifyAiOpenAiResponse`). Dialoglodziņš izvelk saturu šādā secībā un apgriež sākuma atstarpes. Noraidīšanas gadījumā kļūdas ziņojums tiek parādīts dialoglodziņā (vai `ai.error`, ja kļūda nav `Error` eksemplārs), un dialoglodziņš paliek atvērts.

## Backend ģenerēšana (`aiEndpoint`) {#backend-generation-aiendpoint}

Tā vietā, lai ieviestu `aiProvider`, norādiet AI funkcijai backend LLM galapunktu:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

Tad tiptapify pats izveido pieprasījumu un nosūta to uz galapunktu. Ja iestatīti abi, skaidri norādīts `aiProvider` vienmēr ir svarīgāks.

**Pieprasījums** — minimāla JSON datu paka (`TiptapifyAiBackendRequest`):

| Lauks | Kad tiek sūtīts |
| --- | --- |
| `prompt` | vienmēr — dialoglodziņā ievadītais pieprasījums |
| `instruction` | vienmēr — jūsu `systemPrompt`, pielāgota `createMessages` sistēmas ziņojums vai iebūvētais noklusējums |
| `stream` | tikai ja `stream: true` |
| `thinking` | tikai ja dialoglodziņa slēdzis **Domāšana** ir ieslēgts |
| `reasoning_effort` | tikai ja lietotājs izvēlējies līmeni (nevis `default`) |
| `model` | tikai ja iestatīta opcija `model` |

**Atbilde** — tiek pieņemta atlaidīgi: vienkārša virkne, objekts `{ content }` vai ar OpenAI saderīga `choices` datu paka.

**Straumēšana** — ja pieprasījumam ir `stream: true`, atbildes pamatteksts tiek lasīts kā SSE straume (`data:` rindas, ko noslēdz `data: [DONE]`). Pieņemtie fragmentu formāti:

- OpenAI stils — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Vienkāršs — `data: {"type":"content"|"reasoning","data":"…"}`
- Plakans — `data: {"content":"…","reasoning_content":"…"}`
- Vienkāršs teksts — `data: some text` (ne-JSON `data` rinda ir satura fragments)

`content` fragmenti ar `onChunk` atjaunina rezultāta lauku, `reasoning_content` fragmenti ar `onReasoning` baro paneli **Domāšana**. Ja backend ignorē `stream` un atbild ar vienkāršu pamattekstu, tiek izmantots šis pamatteksts. Klikšķis uz **Apturēt** vai dialoglodziņa aizvēršana pārtrauc pieprasījumu; daļēji straumētais saturs paliek rezultāta laukā.

**Galvenes** — `aiHeaders` (`Record<string, string>`) tiek sapludinātas virs `Content-Type: application/json`. Galvene `Authorization` objektā `aiHeaders` tiek saglabāta tāda, kāda tā ir; citādi `tokenProvider` tokens tiek sūtīts kā `Authorization: Bearer <token>`.

**Kļūdas** — atbilde, kas nav OK, dialoglodziņā parāda backend kļūdas ziņojumu (JSON `{ error }` / `{ message }` vai neapstrādātu pamattekstu).

## Straumēšana {#streaming}

Ja `stream: true` (vai `chatCompletionOptions.stream` ir `true`), dialoglodziņš kā trešo argumentu nodod objektu `TiptapifyAiStream`:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — nododiet to `fetch` (vai savam SDK izsaukumam). Tas pārtrauc darbību, kad lietotājs noklikšķina uz **Apturēt** vai aizver dialoglodziņu, tāpēc notiekošie pieprasījumi nepaliek darbojamies.
- **`onChunk`** — pievienojiet katru satura fragmentu rezultāta laukam. Ģenerēšanas laikā rezultāta lauks ir tikai lasāms, un daļēji straumētais saturs tiek saglabāts (varat nospiest Apturēt, pēc tam to ievietot vai atmest).
- **`onReasoning`** — pārsūtiet modeļa spriešanas/domāšanas izvadi (piemēram, Qwen/DeepSeek/o sērijas `reasoning_content` delta) uz sakļaujamu paneli **Domāšana** virs rezultāta. Panelis straumēšanas laikā automātiski izvēršas un automātiski ritinās. Spriešanas izvade ir tikai attēlošanai un nekad netiek ievietota redaktorā.

Piegādātāji, kas nestraumē, ignorē argumentu `stream` — tas nav obligāts.

## Domāšana un domāšanas līmenis {#thinking-and-reasoning-effort}

Divas lietotāja vadīklas dialoglodziņā atbilst pieprasījuma laukiem. Abas tiek ieslēgtas ar opcijām, un tās pieder spraudnim — šos laukus jūs pats `chatCompletionOptions` neiestatāt (un nedrīkstat iestatīt).

- **`thinking: true`** parāda slēdzi **Domāšana** (pēc noklusējuma ieslēgts, atiestatās katrā dialoglodziņa atvēršanā). Spraudnis ieraksta slēdža vērtību pieprasījumā kā `enable_thinking: true | false`.
- **`thinking` nav norādīts vai `thinking: false`** paslēpj slēdzi, un spraudnis sūta `enable_thinking: false`, tāpēc modeļi, kas pēc noklusējuma domā, nedomā.
- **`reasoningEffort: { options, default? }`** parāda nolaižamo izvēlni **Domāšanas līmenis**. `options` uzskaita pielāgotos līmeņus, ko vēlaties piedāvāt (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); paplašinājums pats vienmēr pievieno elementu `default` (domāšanas režīma pamatlīmenis), tāpēc `default` savā konfigurācijā nekad neuzskaitiet. Lauks `default` iepriekš atlasa vienu no jūsu pielāgotajiem līmeņiem, kad atveras dialoglodziņš — ja nav norādīts, iepriekš tiek atlasīts `default`. Vērtība atiestatās katrā atvēršanā. Nolaižamā izvēlne tiek renderēta tikai tad, ja `options` ir netukšs saraksts, `thinking` ir iespējots un slēdzis Domāšana ir ieslēgts.
- **`showReasoning`** (noklusējums `false`) kontrolē sakļaujamo paneli **Domāšana**, kas straumē modeļa spriešanas procesu (`reasoning_content` delta). Iestatiet `showReasoning: true`, lai rādītu šo paneli, saglabājot domāšanu ieslēgtu — modelis joprojām spriež, rezultāts tiek piemērots tāpat, tikai papildus tiek rādīta soli pa solim spriešana.

Tā kā piegādātāji (īpaši vLLM/LM Studio) vienā pieprasījumā noraida gan `enable_thinking`, gan `reasoning_effort`, spraudnis sūta tieši vienu no abiem:

| Stāvoklis | Pieprasījuma lauks |
| --- | --- |
| Domāšana ieslēgta, līmenis = `default` (vai līmenis nav konfigurēts) | `enable_thinking` (no slēdža) |
| Domāšana ieslēgta, līmenis = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (no nolaižamās izvēlnes); slēdzis ir atspējots |
| Domāšana izslēgta (slēdzis izslēgts vai `thinking` konfigurācijā nav iespējots) | `enable_thinking: false`; `reasoning_effort` netiek sūtīts |

## Kļūdas {#errors}

Dialoglodziņš paskaidro neizdevušos pieprasījumu, nevis rāda neapstrādātu kļūdu, un pēc tam pievieno paša pakalpojuma ziņojumu:

| Kas notika | Paskaidrojums |
| --- | --- |
| Pārlūks nesaņēma atbildi (`Failed to fetch`, `NetworkError…`, `Load failed`) | Pakalpojums nedarbojas, nav sasniedzams vai CORS bloķēja atbildi; pārlūka konsole norāda, kurš no gadījumiem |
| `401` / `403` | Pārbaudiet API atslēgu vai piekļuves tiesības |
| `404` | Pārbaudiet galapunkta ceļu |
| `408` / `504` / noilgums | Pakalpojums neatbildēja laikā |
| `429` | Pārāk daudz pieprasījumu |
| `5xx` | Pakalpojums nav pieejams (ielādē modeli, aizņemts) |

Ar `aiEndpoint` statuss nāk no atbildes. Pielāgots `aiProvider` iegūst tos pašus paskaidrojumus, izmetot kļūdu ar `status`:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Jebkura cita kļūda tiek rādīta ar savu ziņojumu.

## Rezultāta ievietošana {#inserting-the-result}

Ar darbības pogu — **Ievietot**, **Aizstāt** vai **Pievienot beigās**, atkarībā no režīma — dialoglodziņš ievieto `result` redaktorā:

- **Režīms** — dialoglodziņa darbības poga ir sadalīta poga. Galvenā daļa piemēro rezultātu iepriekš atlasītajā režīmā (**Ievietot** / **Aizstāt** / **Pievienot beigās**): to iepriekš atlasa opcija `mode`, vai **Aizstāt**, ja dialoglodziņa atvēršanas brīdī bija atlasīts teksts, un citādi **Ievietot**. Maza sadaļa “vairāk” (⋮) pogas labajā pusē atver izvēlni ar atlikušajiem režīmiem — klikšķis uz kāda no tiem uzreiz piemēro rezultātu šajā režīmā. **Ievietot** ievieto rezultātu kursora vietā, **Aizstāt** aizstāj atlasīto tekstu (fiksēts, kad tika noklikšķināts uz **Ģenerēt**), un **Pievienot beigās** pievieno to dokumenta beigās.
- **Rakstzīmju limits** — kad redaktors ir konfigurēts ar `limit` (paplašinājums `CharacterCount` noraida jebkuru transakciju, kas nav ielīmēšana un kas dokumentu palielinātu virs limita), zem rezultāta lauka tiek rādīts rakstzīmju skaitītājs `generated / limit` (straumēšanas laikā dzīvs, maigi sarkans, ja limits tiktu pārsniegts), un dialoglodziņš uzreiz pēc ģenerēšanas rāda brīdinājumu `ai.limit_exceeded`, ja rezultāts pārsniegtu limitu. Pogu **Ievietot** un tās alternatīvo režīmu izvēlne tad ir atspējotas: rezultāts tiek piemērots pilnībā vai nepiemērots vispār, tāpēc pirms piemērošanas tas jāsaīsina.