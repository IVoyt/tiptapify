# AI ekstenzija {#ai-extension}

AI ekstenzija dodaje gumb na alatnu traku koji otvara dijalog za upit, šalje zahtjev pružatelju po vašem izboru, prikazuje rezultat koji pristiže streamingom i umeće ga u uređivač putem gumba radnje specifičnog za način rada (**Umetni** / **Zamijeni** / **Dodaj na kraj**).

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

Prop `ai` prima `true` (opcije sa zadanim vrijednostima) ili objekt opcija (`TiptapifyAiOptions`). Stavka `ai` na alatnoj traci uvijek je registrirana, ali je gumb **onemogućen** osim ako je postavljen `aiProvider`.

Pokretljivu demonstraciju pogledajte u [AI primjeru](/hr/examples/ai), a cjelovitu referencu opcija u [Props](/hr/api/props#ai).

## Arhitektura {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normalizira prop `ai`: `ai: true` postaje prazan objekt opcija, `promptExamples` vraća se na lokalizirane zadane vrijednosti, a rezultat se izlaže potomcima putem `inject('tiptapifyAi')` (`TiptapifyAiResolvedOptions` ili `false`).
- Stavka alatne trake (`src/components/Toolbar/ai.ts`) renderira `Button.vue`. Gumb provjerava dostupnost `aiProvider` i otvara `Dialog.vue`.
- `Dialog.vue` posjeduje cijeli životni ciklus zahtjeva: izradu zahtjeva, poziv pružatelja, streaming i umetanje rezultata.

## Ugovor pružatelja {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

Pružatelj je obična asinkrona funkcija koju sami implementirate. tiptapify sam ne poziva nijedan API — radi sve što može obraditi objekt `request` kompatibilan s OpenAI-jem (fetch, SDK, backend adapter). Iznimka je backend način `aiEndpoint` (vidi [Backend generiranje](#backend-generation-aiendpoint)), gdje tiptapify šalje zahtjev na vašu krajnju točku.

**Zahtjev** (`TiptapifyAiRequest`) se širi iz vaših `chatCompletionOptions`, a zatim ga dodatno obogaćuje dodatak:

| Polje | Izvor |
| --- | --- |
| `messages` | `createMessages(context)` ako je zadan, inače zadani par: sistemska poruka (vaš `systemPrompt` ili ugrađena zadana) i korisnička poruka koja sadrži upit plus odabrani tekst uređivača s tekstom oko njega i pravilom da se odgovara samo za odabir (ili za cijeli tekst kad ništa nije odabrano) |
| `model` | opcija `model`, kad je postavljena |
| `temperature` | opcija `temperature`, kad je postavljena |
| `stream` | opcija `stream` ili `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | prekidač razmišljanja / padajući izbornik razine — vidi dolje |

**Kontekst** (`TiptapifyAiEditorContext`) pružatelju daje cijelo stanje uređivača: `prompt`, `selectedText`, `textBefore` / `textAfter` (tekst odlomka odabira oko njega, do 500 znakova svaki), `text`, `html`, `json` i `mode` (`insert` / `replace` / `append`).

Odabir koji počinje ili završava usred riječi obuhvaća cijelu riječ, a zadane poruke šalju tekst oko odabira uz pravilo da se odgovara samo za odabir: kad dobije samo fragment, model ga drži za cijeli tekst i dovršava ga, pa bi zamjena ponovila ono što slijedi iza odabira.

**Odgovor**: pružatelj može vratiti sadržaj kao običan `string`, kao `{ content }` (`TiptapifyAiResponse`) ili kao payload `choices` kompatibilan s OpenAI-jem (`TiptapifyAiOpenAiResponse`). Dijalog izdvaja sadržaj tim redoslijedom i uklanja početni razmak. Pri odbijanju poruka o pogrešci prikazuje se u dijalogu (ili `ai.error` kad pogreška nije instanca `Error`) i dijalog ostaje otvoren.

## Backend generiranje (`aiEndpoint`) {#backend-generation-aiendpoint}

Umjesto implementacije `aiProvider`, usmjerite AI značajku na backend LLM krajnju točku:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

tiptapify tada sam izrađuje zahtjev i šalje ga na krajnju točku. Izričiti `aiProvider` uvijek pobjeđuje kad su postavljena oba.

**Zahtjev** — minimalni JSON payload (`TiptapifyAiBackendRequest`):

| Polje | Šalje se |
| --- | --- |
| `prompt` | uvijek — zahtjev upisan u dijalogu |
| `instruction` | uvijek — vaš `systemPrompt`, sistemska poruka prilagođenog `createMessages` ili ugrađena zadana |
| `stream` | samo kad je `stream: true` |
| `thinking` | samo kad je prekidač **Razmišljanje** u dijalogu uključen |
| `reasoning_effort` | samo kad je korisnik odabrao razinu (ne `default`) |
| `model` | samo kad je postavljena opcija `model` |

**Odgovor** — prihvaća se tolerantno: običan string, objekt `{ content }` ili payload `choices` kompatibilan s OpenAI-jem.

**Streaming** — kad zahtjev ima `stream: true`, tijelo odgovora čita se kao SSE tok (retci `data:`, završeni s `data: [DONE]`). Prihvaćeni formati chunkova:

- Stil OpenAI — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Jednostavno — `data: {"type":"content"|"reasoning","data":"…"}`
- Ravno — `data: {"content":"…","reasoning_content":"…"}`
- Običan tekst — `data: some text` (redak `data` koji nije JSON je chunk sadržaja)

Chunkovi `content` ažuriraju polje rezultata putem `onChunk`, a chunkovi `reasoning_content` hrane panel **Razmišljanje** putem `onReasoning`. Ako backend zanemari `stream` i odgovori običnim tijelom, koristi se to tijelo. Klik na **Zaustavi** ili zatvaranje dijaloga prekida zahtjev; djelomično strujani sadržaj ostaje u polju rezultata.

**Zaglavlja** — `aiHeaders` (`Record<string, string>`) spajaju se preko `Content-Type: application/json`. Zaglavlje `Authorization` u `aiHeaders` zadržava se kakvo jest; inače se token iz `tokenProvider` šalje kao `Authorization: Bearer <token>`.

**Pogreške** — odgovor koji nije OK prikazuje u dijalogu poruku o pogrešci backenda (JSON `{ error }` / `{ message }` ili sirovo tijelo).

## Streaming {#streaming}

Kad je `stream: true` (ili je `chatCompletionOptions.stream` `true`), dijalog kao treći argument prosljeđuje objekt `TiptapifyAiStream`:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — proslijedite ga u `fetch` (ili poziv SDK-a). Prekida se kad korisnik klikne **Zaustavi** ili zatvori dijalog, pa zahtjevi u tijeku ne nastavljaju raditi.
- **`onChunk`** — dodajte svaki chunk sadržaja u polje rezultata. Tijekom generiranja polje rezultata je samo za čitanje, a djelomično strujani sadržaj se zadržava (možete Zaustaviti, zatim ga umetnuti ili odbaciti).
- **`onReasoning`** — proslijedite izlaz razmišljanja/zaključivanja modela (npr. delta `reasoning_content` iz Qwen/DeepSeek/o-series) u sklopivi panel **Razmišljanje** iznad rezultata. Panel se automatski proširuje i automatski pomiče tijekom streaminga. Izlaz zaključivanja služi samo za prikaz i nikad se ne umeće u uređivač.

Pružatelji koji ne rade streaming zanemaruju argument `stream` — on je neobavezan.

## Razmišljanje i razina zaključivanja {#thinking-and-reasoning-effort}

Dvije korisničke kontrole u dijalogu preslikavaju se u polja zahtjeva. Obje se uključuju opcijama i pripadaju dodatku — ta polja ne postavljate (i ne biste trebali) sami u `chatCompletionOptions`.

- **`thinking: true`** prikazuje prekidač **Razmišljanje** (prema zadanim postavkama uključen, resetira se pri svakom otvaranju dijaloga). Dodatak upisuje vrijednost prekidača u zahtjev kao `enable_thinking: true | false`.
- **`thinking` izostavljen ili `thinking: false`** skriva prekidač, a dodatak šalje `enable_thinking: false`, pa modeli koji prema zadanim postavkama razmišljaju ne razmišljaju.
- **`reasoningEffort: { options, default? }`** prikazuje padajući izbornik **Napori razmišljanja**. `options` navodi prilagođene razine koje želite ponuditi (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); ekstenzija uvijek sama dodaje stavku `default` (osnovica načina razmišljanja), pa `default` nikad ne navodite u konfiguraciji. Polje `default` unaprijed odabire jednu od vaših prilagođenih razina pri otvaranju dijaloga — kad je izostavljeno, unaprijed je odabran `default`. Vrijednost se resetira pri svakom otvaranju. Padajući izbornik prikazuje se samo kad je `options` neprazan popis, `thinking` je omogućen i prekidač Razmišljanje je uključen.
- **`showReasoning`** (zadano `false`) upravlja sklopivim panelom **Razmišljanje** koji strujom prikazuje proces zaključivanja modela (delta `reasoning_content`). Postavite `showReasoning: true` da prikažete taj panel uz uključeno razmišljanje — model i dalje zaključuje, rezultat se primjenjuje na isti način, samo se dodatno prikazuje zaključivanje korak po korak.

Budući da pružatelji (osobito vLLM/LM Studio) odbijaju `enable_thinking` i `reasoning_effort` u jednom zahtjevu, dodatak šalje točno jedno od ta dva:

| Stanje | Polje zahtjeva |
| --- | --- |
| Razmišljanje uključeno, razina = `default` (ili razina nije konfigurirana) | `enable_thinking` (iz prekidača) |
| Razmišljanje uključeno, razina = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (iz padajućeg izbornika); prekidač je onemogućen |
| Razmišljanje isključeno (prekidač isključen ili `thinking` nije omogućen u konfiguraciji) | `enable_thinking: false`; `reasoning_effort` se ne šalje |

## Pogreške {#errors}

Dijalog objašnjava neuspjeli zahtjev umjesto da prikazuje sirovu pogrešku, a iza objašnjenja dodaje i vlastitu poruku usluge:

| Što se dogodilo | Objašnjenje |
| --- | --- |
| Preglednik nije dobio odgovor (`Failed to fetch`, `NetworkError…`, `Load failed`) | Usluga ne radi, nije dostupna ili je CORS blokirao odgovor; konzola preglednika pokazuje što od toga |
| `401` / `403` | Provjerite API ključ ili prava pristupa |
| `404` | Provjerite putanju krajnje točke |
| `408` / `504` / istek vremena | Usluga nije odgovorila na vrijeme |
| `429` | Previše zahtjeva |
| `5xx` | Usluga nije dostupna (učitava model, zauzeta je) |

Uz `aiEndpoint` status dolazi iz odgovora. Prilagođeni `aiProvider` dobiva ista objašnjenja bacanjem pogreške sa `status`:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Svaka druga pogreška prikazuje se s vlastitom porukom.

## Umetanje rezultata {#inserting-the-result}

Na gumbu radnje — **Umetni**, **Zamijeni** ili **Dodaj na kraj**, ovisno o načinu rada — dijalog smješta `result` u uređivač:

- **Način rada** — gumb radnje u dijalogu je podijeljeni gumb. Glavni dio primjenjuje rezultat u unaprijed odabranom načinu (**Umetni** / **Zamijeni** / **Dodaj na kraj**): opcija `mode` unaprijed ga odabire, ili **Zamijeni** kad je pri otvaranju dijaloga bio odabran tekst, a inače **Umetni**. Mali odjeljak „više“ (⋮) desno od gumba otvara izbornik s preostalim načinima — klik na jedan odmah primjenjuje rezultat u tom načinu. **Umetni** postavlja rezultat na pokazivač, **Zamijeni** zamjenjuje odabrani tekst (zabilježen pri kliku na **Generiraj**), a **Dodaj na kraj** dodaje ga na kraj dokumenta.
- **Ograničenje znakova** — kad je uređivač konfiguriran s `limit` (ekstenzija `CharacterCount` odbija svaku transakciju koja nije lijepljenje, a povećala bi dokument preko ograničenja), ispod polja rezultata prikazuje se brojač znakova `generated / limit` (uživo tijekom streaminga, blago crven kad bi se ograničenje prekoračilo), a dijalog odmah nakon generiranja prikazuje upozorenje `ai.limit_exceeded` kad bi rezultat premašio ograničenje. Gumb **Umetni** i njegov izbornik alternativnih načina tada su onemogućeni: rezultat se primjenjuje sve ili ništa, pa ga morate skratiti prije primjene.