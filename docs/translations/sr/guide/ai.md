# AI ekstenzija {#ai-extension}

AI ekstenzija dodaje dugme na traci sa alatima koje otvara dijalog za unos upita, šalje zahtev provajderu po vašem izboru, prikazuje strimovani rezultat i umeće ga u uređivač preko dugmeta radnje zavisnog od režima (**Umetni** / **Zameni** / **Dodaj na kraj**).

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

Prop `ai` prihvata `true` (opcije sa podrazumevanim vrednostima) ili objekat opcija (`TiptapifyAiOptions`). Stavka `ai` na traci sa alatima je uvek registrovana, ali je dugme **onemogućeno** osim ako je podešen `aiProvider`.

Pokretljivu demonstraciju potražite u [AI primeru](/sr/examples/ai), a kompletnu referencu opcija u [Props](/sr/api/props#ai).

## Arhitektura {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normalizuje prop `ai`: `ai: true` postaje prazan objekat opcija, `promptExamples` se vraća na lokalizovane podrazumevane vrednosti, a rezultat se izlaže potomcima preko `inject('tiptapifyAi')` (`TiptapifyAiResolvedOptions` ili `false`).
- Stavka trake sa alatima (`src/components/Toolbar/ai.ts`) renderuje `Button.vue`. Dugme proverava dostupnost `aiProvider` i otvara `Dialog.vue`.
- `Dialog.vue` upravlja celim životnim ciklusom zahteva: pravljenjem zahteva, pozivom provajdera, strimovanjem i umetanjem rezultata.

## Ugovor provajdera {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

Provajder je obična async funkcija koju sami implementirate. tiptapify sam ne poziva nijedan API — radi sve što može da primi OpenAI-kompatibilan objekat `request` (fetch, SDK, backend adapter). Izuzetak je backend režim `aiEndpoint` (pogledajte [Backend generisanje](#backend-generation-aiendpoint)), gde tiptapify šalje zahtev na vaš endpoint.

**Zahtev** (`TiptapifyAiRequest`) se razvija iz vaših `chatCompletionOptions`, a zatim ga plugin dopunjuje:

| Polje | Izvor |
| --- | --- |
| `messages` | `createMessages(context)` ako je zadat, inače podrazumevani par: sistemska poruka (vaš `systemPrompt` ili ugrađena podrazumevana) i korisnička poruka koja uključuje upit plus izabrani tekst uređivača sa tekstom oko njega i pravilom da se odgovori samo za izbor (ili za ceo tekst kada ništa nije izabrano) |
| `model` | opcija `model`, kada je zadata |
| `temperature` | opcija `temperature`, kada je zadata |
| `stream` | opcija `stream` ili `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | prekidač razmišljanja / padajući meni nivoa — pogledajte ispod |

**Kontekst** (`TiptapifyAiEditorContext`) daje provajderu celo stanje uređivača: `prompt`, `selectedText`, `textBefore` / `textAfter` (tekst pasusa izbora oko njega, do 500 znakova sa svake strane), `text`, `html`, `json` i `mode` (`insert` / `replace` / `append`).

Izbor koji počinje ili se završava unutar reči obuhvata celu reč, a podrazumevane poruke šalju tekst oko izbora sa pravilom da se odgovori samo za izbor: kada dobije samo fragment, model ga smatra celim tekstom i dopunjava ga, pa bi zamena ponovila ono što sledi iza izbora.

**Odgovor**: provajder može vratiti sadržaj kao običan `string`, kao `{ content }` (`TiptapifyAiResponse`) ili kao OpenAI-kompatibilan payload `choices` (`TiptapifyAiOpenAiResponse`). Dijalog izdvaja sadržaj tim redosledom i uklanja vodeće razmake. Pri odbijanju poruka o grešci se prikazuje u dijalogu (ili `ai.error` kada greška nije instanca `Error`), a dijalog ostaje otvoren.

## Backend generisanje (`aiEndpoint`) {#backend-generation-aiendpoint}

Umesto implementacije `aiProvider`, usmerite AI funkciju na backend LLM endpoint:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

tiptapify tada sam pravi zahtev i šalje ga na endpoint. Eksplicitan `aiProvider` uvek ima prednost kada su oba zadata.

**Zahtev** — minimalan JSON payload (`TiptapifyAiBackendRequest`):

| Polje | Šalje se |
| --- | --- |
| `prompt` | uvek — zahtev ukucan u dijalogu |
| `instruction` | uvek — vaš `systemPrompt`, sistemska poruka prilagođenog `createMessages` ili ugrađena podrazumevana |
| `stream` | samo kada je `stream: true` |
| `thinking` | samo kada je prekidač **Razmišljanje** u dijalogu uključen |
| `reasoning_effort` | samo kada je korisnik izabrao nivo (ne `default`) |
| `model` | samo kada je zadata opcija `model` |

**Odgovor** — prihvata se tolerantno: običan string, objekat `{ content }` ili OpenAI-kompatibilan payload `choices`.

**Strimovanje** — kada zahtev ima `stream: true`, telo odgovora se čita kao SSE tok (redovi `data:`, završeni sa `data: [DONE]`). Prihvaćeni formati delova:

- U OpenAI stilu — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Jednostavan — `data: {"type":"content"|"reasoning","data":"…"}`
- Ravan — `data: {"content":"…","reasoning_content":"…"}`
- Običan tekst — `data: some text` (red `data` koji nije JSON je deo sadržaja)

Delovi `content` ažuriraju polje rezultata preko `onChunk`, a delovi `reasoning_content` hrane panel **Razmišljanje** preko `onReasoning`. Ako backend ignoriše `stream` i odgovori običnim telom, koristi se to telo. Klik na **Zaustavi** ili zatvaranje dijaloga prekida zahtev; delimično strimovani sadržaj ostaje u polju rezultata.

**Zaglavlja** — `aiHeaders` (`Record<string, string>`) se spajaju preko `Content-Type: application/json`. Zaglavlje `Authorization` u `aiHeaders` ostaje kakvo jeste; u suprotnom se token iz `tokenProvider` šalje kao `Authorization: Bearer <token>`.

**Greške** — odgovor koji nije OK prikazuje u dijalogu poruku o grešci backenda (JSON `{ error }` / `{ message }` ili sirovo telo).

## Strimovanje {#streaming}

Kada je `stream: true` (ili je `chatCompletionOptions.stream` `true`), dijalog prosleđuje objekat `TiptapifyAiStream` kao treći argument:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — prosledite ga u `fetch` (ili poziv vašeg SDK-a). Prekida se kada korisnik klikne **Zaustavi** ili zatvori dijalog, pa zahtevi u toku ne nastavljaju da rade.
- **`onChunk`** — dodajte svaki deo sadržaja u polje rezultata. Tokom generisanja polje rezultata je samo za čitanje, a delimično strimovani sadržaj se zadržava (možete zaustaviti, pa umetnuti ili odbaciti).
- **`onReasoning`** — prosledite izlaz modela o rezonovanju/razmišljanju (npr. delta `reasoning_content` kod Qwen/DeepSeek/o-serije) u sklopivi panel **Razmišljanje** iznad rezultata. Panel se automatski širi i skroluje tokom strimovanja. Izlaz rezonovanja služi samo za prikaz i nikada se ne umeće u uređivač.

Provajderi koji ne strimuju ignorišu argument `stream` — on je opcion.

## Razmišljanje i nivo rezonovanja {#thinking-and-reasoning-effort}

Dve korisničke kontrole u dijalogu mapiraju se na polja zahteva. Obe se uključuju opcijama i pripadaju plugin-u — ova polja ne postavljate (i ne treba da ih postavljate) sami u `chatCompletionOptions`.

- **`thinking: true`** prikazuje prekidač **Razmišljanje** (podrazumevano uključen, resetuje se pri svakom otvaranju dijaloga). Plugin upisuje vrednost prekidača u zahtev kao `enable_thinking: true | false`.
- **`thinking` koji nedostaje ili `thinking: false`** sakriva prekidač, a plugin šalje `enable_thinking: false`, pa modeli koji podrazumevano razmišljaju ne razmišljaju.
- **`reasoningEffort: { options, default? }`** prikazuje padajući meni **Napori razmišljanja**. `options` navodi prilagođene nivoe koje želite da ponudite (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); ekstenzija sama uvek dodaje stavku `default` (osnovu režima razmišljanja), pa `default` nikada ne navodite u konfiguraciji. Polje `default` unapred bira jedan od vaših prilagođenih nivoa pri otvaranju dijaloga — kada je izostavljeno, unapred je izabran `default`. Vrednost se resetuje pri svakom otvaranju. Padajući meni se renderuje samo kada je `options` neprazna lista, `thinking` je omogućen i prekidač Razmišljanje je uključen.
- **`showReasoning`** (podrazumevano `false`) kontroliše sklopivi panel **Razmišljanje** koji strimuje proces rezonovanja modela (delta `reasoning_content`). Postavite `showReasoning: true` da prikažete taj panel uz uključeno razmišljanje — model i dalje rezonuje, rezultat se primenjuje na isti način, samo se dodatno prikazuje rezonovanje korak po korak.

Pošto provajderi (naročito vLLM/LM Studio) odbijaju `enable_thinking` i `reasoning_effort` u jednom zahtevu, plugin šalje tačno jedno od ta dva:

| Stanje | Polje zahteva |
| --- | --- |
| Razmišljanje uključeno, nivo = `default` (ili nivo nije podešen) | `enable_thinking` (iz prekidača) |
| Razmišljanje uključeno, nivo = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (iz padajućeg menija); prekidač je onemogućen |
| Razmišljanje isključeno (prekidač isključen ili `thinking` nije omogućen u konfiguraciji) | `enable_thinking: false`; `reasoning_effort` se ne šalje |

## Greške {#errors}

Dijalog objašnjava neuspeli zahtev umesto da prikaže sirovu grešku, a iza objašnjenja dodaje sopstvenu poruku servisa:

| Šta se desilo | Objašnjenje |
| --- | --- |
| Pregledač nije dobio odgovor (`Failed to fetch`, `NetworkError…`, `Load failed`) | Servis je van mreže, nedostupan, ili je CORS blokirao odgovor; konzola pregledača kaže šta je u pitanju |
| `401` / `403` | Proverite API ključ ili prava pristupa |
| `404` | Proverite putanju endpointa |
| `408` / `504` / timeout | Servis nije odgovorio na vreme |
| `429` | Previše zahteva |
| `5xx` | Servis nije dostupan (učitava model, zauzet je) |

Sa `aiEndpoint` status dolazi iz odgovora. Prilagođeni `aiProvider` dobija ista objašnjenja bacanjem greške sa `status`:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Svaka druga greška prikazuje se sa sopstvenom porukom.

## Umetanje rezultata {#inserting-the-result}

Na dugmetu radnje — **Umetni**, **Zameni** ili **Dodaj na kraj**, zavisno od režima — dijalog smešta `result` u uređivač:

- **Režim** — dugme radnje u dijalogu je podeljeno dugme. Glavni deo primenjuje rezultat u unapred izabranom režimu (**Umetni** / **Zameni** / **Dodaj na kraj**): opcija `mode` ga unapred bira, ili **Zameni** kada je tekst bio izabran pri otvaranju dijaloga, a inače **Umetni**. Mali odeljak „više“ (⋮) desno od dugmeta otvara meni sa preostalim režimima — klik na jedan odmah primenjuje rezultat u tom režimu. **Umetni** smešta rezultat na kursor, **Zameni** menja izabrani tekst (zabeležen kada je kliknuto **Generiši**), a **Dodaj na kraj** ga dodaje na kraj dokumenta.
- **Ograničenje broja znakova** — kada je uređivač podešen sa `limit` (ekstenzija `CharacterCount` odbija svaku transakciju koja nije lepljenje a prekoračila bi ograničenje), ispod polja rezultata prikazuje se brojač znakova `generated / limit` (uživo tokom strimovanja, blago crven kada bi ograničenje bilo prekoračeno), a dijalog odmah nakon generisanja prikazuje upozorenje `ai.limit_exceeded` kada bi rezultat prekoračio ograničenje. Dugme **Umetni** i njegov meni alternativnih režima tada su onemogućeni: rezultat se primenjuje u celosti ili nikako, pa ga morate skratiti pre primene.