# AI laiendus {#ai-extension}

AI laiendus lisab tööriistaribale nupu, mis avab viiba dialoogi, saadab päringu sinu valitud pakkujale, näitab voogedastatud tulemust ja lisab selle redaktorisse režiimipõhise toiminguenupuga (**Sisestamine** / **Asenda valik** / **Lõpule lisamine**).

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

Prop `ai` aktsepteerib väärtust `true` (vaikeväärtustega valikud) või valikute objekti (`TiptapifyAiOptions`). Tööriistariba üksus `ai` on alati registreeritud, kuid nupp on **keelatud**, kui `aiProvider` pole määratud.

Töötavat demot vaata [AI näitest](/et/examples/ai) ja täielikku valikuviidet [propide](/et/api/props#ai) lehelt.

## Arhitektuur {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normaliseerib propi `ai`: `ai: true` muutub tühjaks valikute objektiks, `promptExamples` langeb tagasi lokaliseeritud vaikeväärtustele ja tulemus tehakse järglastele kättesaadavaks `inject('tiptapifyAi')` kaudu (`TiptapifyAiResolvedOptions` või `false`).
- Tööriistariba üksus (`src/components/Toolbar/ai.ts`) renderdab `Button.vue`. Nupp kontrollib `aiProvider` olemasolu ja avab `Dialog.vue`.
- `Dialog.vue` haldab kogu päringu elutsüklit: päringu koostamist, pakkuja kutsumist, voogedastust ja tulemuse lisamist.

## Pakkuja leping {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

Pakkuja on tavaline asünkroonne funktsioon, mille sa ise implementeerid. Tiptapify ei kutsu ise ühtegi API-t — töötab kõik, mis suudab tarbida OpenAI-ühilduvat `request` objekti (fetch, SDK, backend-adapter). Erandiks on backend-režiim `aiEndpoint` (vaata [backend-genereerimist](#backend-generation-aiendpoint)), kus Tiptapify saadab päringu sinu lõpp-punkti.

**Päring** (`TiptapifyAiRequest`) laotatakse sinu `chatCompletionOptions` põhjal ja täiendatakse seejärel pluginaga:

| Väli | Allikas |
| --- | --- |
| `messages` | `createMessages(context)`, kui see on antud, muidu vaikepaar: süsteemisõnum (sinu `systemPrompt` või sisseehitatud vaikeväärtus) ja kasutajasõnum, mis sisaldab viiba pluss valitud redaktoriteksti koos seda ümbritseva tekstiga ja reeglit vastata ainult valiku kohta (või kogu teksti kohta, kui midagi pole valitud) |
| `model` | valik `model`, kui see on määratud |
| `temperature` | valik `temperature`, kui see on määratud |
| `stream` | valik `stream` või `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | mõtlemislüliti / nõudmise rippmenüü — vaata allpool |

**Kontekst** (`TiptapifyAiEditorContext`) annab pakkujale redaktori täieliku oleku: `prompt`, `selectedText`, `textBefore` / `textAfter` (valiku lõigu tekst selle ümber, kumbki kuni 500 märki), `text`, `html`, `json` ja `mode` (`insert` / `replace` / `append`).

Valik, mis algab või lõpeb sõna sees, haarab kogu sõna, ja vaikesõnumid saadavad valikut ümbritseva teksti koos reegliga vastata ainult valiku kohta: kui mudelile antakse ainult fragment, peab ta seda kogu tekstiks ja täiendab seda ning asendus kordaks seda, mis valikule järgneb.

**Vastus**: pakkuja võib tagastada sisu tavalise `string`ina, kujul `{ content }` (`TiptapifyAiResponse`) või OpenAI-ühilduva `choices` sisuna (`TiptapifyAiOpenAiResponse`). Dialoog eraldab sisu selles järjekorras ja eemaldab algusest tühimärgid. Tagasilükkamise korral kuvatakse veateade dialoogis (või `ai.error`, kui viga pole `Error` instants) ja dialoog jääb avatuks.

## Backend-genereerimine (`aiEndpoint`) {#backend-generation-aiendpoint}

`aiProvider`i implementeerimise asemel suuna AI funktsioon backend-LLM-i lõpp-punktile:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

Tiptapify koostab seejärel päringu ja postitab selle ise lõpp-punkti. Selgesõnaline `aiProvider` võidab alati, kui mõlemad on määratud.

**Päring** — minimaalne JSON-sisu (`TiptapifyAiBackendRequest`):

| Väli | Saadetakse |
| --- | --- |
| `prompt` | alati — dialoogis sisestatud päring |
| `instruction` | alati — sinu `systemPrompt`, kohandatud `createMessages` süsteemisõnum või sisseehitatud vaikeväärtus |
| `stream` | ainult siis, kui `stream: true` |
| `thinking` | ainult siis, kui dialoogi lüliti **Mõtlemine** on sees |
| `reasoning_effort` | ainult siis, kui kasutaja valis taseme (mitte `default`) |
| `model` | ainult siis, kui valik `model` on määratud |

**Vastus** — aktsepteeritakse leebelt: tavaline string, objekt `{ content }` või OpenAI-ühilduv `choices` sisu.

**Voogedastus** — kui päringus on `stream: true`, loetakse vastuse keha SSE-voona (`data:` read, lõpetatud `data: [DONE]`-ga). Aktsepteeritavad tükivormingud:

- OpenAI-stiil — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Lihtne — `data: {"type":"content"|"reasoning","data":"…"}`
- Lame — `data: {"content":"…","reasoning_content":"…"}`
- Lihttekst — `data: some text` (mitte-JSON `data` rida on sisutükk)

`content` tükid uuendavad tulemuse välja `onChunk` kaudu, `reasoning_content` tükid toidavad paneeli **Mõtlemine** `onReasoning` kaudu. Kui backend ignoreerib `stream`i ja vastab tavalise kehaga, kasutatakse seda keha. Klõps nupul **Peata** või dialoogi sulgemine katkestab päringu; osaliselt voogedastatud sisu jääb tulemuse väljale.

**Päised** — `aiHeaders` (`Record<string, string>`) liidetakse `Content-Type: application/json` peale. Päis `Authorization` väärtuses `aiHeaders` jäetakse nii, nagu see on; muidu saadetakse `tokenProvider` token kujul `Authorization: Bearer <token>`.

**Vead** — mitte-OK vastus toob dialoogis esile backendi veateate (JSON `{ error }` / `{ message }` või toores keha).

## Voogedastus {#streaming}

Kui `stream: true` (või `chatCompletionOptions.stream` on `true`), annab dialoog kolmanda argumendina edasi `TiptapifyAiStream` objekti:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — anna see edasi `fetch`ile (või oma SDK kutsele). See katkestab, kui kasutaja klõpsab nupul **Peata** või sulgeb dialoogi, nii et pooleliolevad päringud ei jätka töötamist.
- **`onChunk`** — lisa iga sisutükk tulemuse väljale. Genereerimise ajal on tulemuse väli kirjutuskaitstud ja osaliselt voogedastatud sisu säilib (võid peatada, siis lisada või kõrvale jätta).
- **`onReasoning`** — edasta mudeli arutlus-/mõtlemisväljund (nt Qwen/DeepSeek/o-seeria `reasoning_content` delta) kokkuvolditavale paneelile **Mõtlemine** tulemuse kohal. Paneel laieneb ja kerib voogedastuse ajal automaatselt. Arutlusväljund on ainult kuvamiseks ja seda ei lisata kunagi redaktorisse.

Pakkujad, mis ei voogedasta, ignoreerivad argumenti `stream` — see on valikuline.

## Mõtlemine ja mõtlemisnõue {#thinking-and-reasoning-effort}

Kaks kasutajakontrolli dialoogis vastavad päringuväljadele. Mõlemad on valikutes vabatahtlikud ja kuuluvad pluginale — sa ei sea (ega peaks seadma) neid välju ise `chatCompletionOptions` sees.

- **`thinking: true`** näitab lülitit **Mõtlemine** (vaikimisi sees, lähtestatakse iga dialoogi avamisel). Plugin kirjutab lüliti väärtuse päringusse kujul `enable_thinking: true | false`.
- **`thinking` puudub või `thinking: false`** peidab lüliti ja plugin saadab `enable_thinking: false`, nii et vaikimisi mõtlevad mudelid ei mõtle.
- **`reasoningEffort: { options, default? }`** näitab rippmenüüd **Mõtlemisnõue**. `options` loetleb kohandatud nõudmistasemed, mida soovid pakkuda (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); laiendus lisab alati ise üksuse `default` (mõtlemisrežiimi baastase), nii et sa ei loetle `default`i oma konfiguratsioonis kunagi. Väli `default` valib dialoogi avamisel ette ühe sinu kohandatud tasemetest — kui see puudub, valitakse ette `default`. Väärtus lähtestatakse iga avamisel. Rippmenüü renderdatakse ainult siis, kui `options` on mittetühi loend, `thinking` on lubatud ja lüliti Mõtlemine on sees.
- **`showReasoning`** (vaikimisi `false`) juhib kokkuvolditavat paneeli **Mõtlemine**, mis voogedastab mudeli arutlusprotsessi (`reasoning_content` delta). Sea `showReasoning: true`, et näidata seda paneeli, hoides mõtlemise sees — mudel arutleb endiselt, tulemust rakendatakse samamoodi, lisaks kuvatakse vaid samm-sammuline arutlus.

Kuna pakkujad (eelkõige vLLM/LM Studio) lükkavad tagasi `enable_thinking` ja `reasoning_effort` ühes päringus, saadab plugin täpselt ühe kahest:

| Olek | Päringuväli |
| --- | --- |
| Mõtlemine sees, nõudmine = `default` (või nõudmist pole seadistatud) | `enable_thinking` (lülitist) |
| Mõtlemine sees, nõudmine = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (rippmenüüst); lüliti on keelatud |
| Mõtlemine väljas (lüliti väljas või `thinking` pole konfiguratsioonis lubatud) | `enable_thinking: false`; `reasoning_effort` ei saadeta |

## Vead {#errors}

Dialoog selgitab ebaõnnestunud päringut toore vea näitamise asemel ja lisab pärast seda teenuse enda teate:

| Mis juhtus | Selgitus |
| --- | --- |
| Brauser ei saanud vastust (`Failed to fetch`, `NetworkError…`, `Load failed`) | Teenus on maas, kättesaamatu või CORS blokeeris vastuse; brauseri konsool ütleb, kumb |
| `401` / `403` | Kontrolli API-võtit või juurdepääsuõigusi |
| `404` | Kontrolli lõpp-punkti teed |
| `408` / `504` / ajalõpp | Teenus ei vastanud õigeaegselt |
| `429` | Liiga palju päringuid |
| `5xx` | Teenus ei ole saadaval (laeb mudelit, hõivatud) |

Koos `aiEndpoint`iga tuleb olek vastusest. Kohandatud `aiProvider` saab samad selgitused, visates vea koos `status`ega:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Mis tahes muu viga kuvatakse selle enda teatega.

## Tulemuse lisamine {#inserting-the-result}

Toiminguenupuga — **Sisestamine**, **Asenda valik** või **Lõpule lisamine**, olenevalt režiimist — paigutab dialoog `result`i redaktorisse:

- **Režiim** — dialoogi toiminguenupp on jagatud nupp. Põhiosa rakendab tulemuse ette valitud režiimis (**Sisestamine** / **Asenda valik** / **Lõpule lisamine**): selle valib ette valik `mode` või **Asenda valik**, kui dialoogi avamisel oli tekst valitud, ja muidu **Sisestamine**. Väike „veel“ (⋮) osa nupu paremal avab menüü ülejäänud režiimidega — klõps ühel rakendab tulemuse kohe selles režiimis. **Sisestamine** paigutab tulemuse kursori kohale, **Asenda valik** asendab valitud teksti (jäädvustatud hetkel, kui klõpsati nupul **Genereeri**) ja **Lõpule lisamine** lisab selle dokumendi lõppu.
- **Märgipiirang** — kui redaktor on seadistatud valikuga `limit` (laiendus `CharacterCount` lükkab tagasi iga mitte-kleepimise tehingu, mis kasvataks dokumendi üle piiri), kuvatakse tulemuse välja all märgiloendur `generated / limit` (voogedastuse ajal reaalajas, pehmelt punane, kui piir ületatakse) ja dialoog näitab kohe pärast genereerimist hoiatust `ai.limit_exceeded`, kui tulemus ületaks piiri. Nupp **Sisestamine** ja selle alternatiivrežiimide menüü on siis keelatud: tulemus rakendatakse kõik-või-mitte-midagi põhimõttel, seega pead selle enne rakendamist lühendama.