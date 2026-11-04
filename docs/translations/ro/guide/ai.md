# Extensia AI {#ai-extension}

Extensia AI adaugă un buton în bara de instrumente care deschide un dialog de prompt, trimite cererea către un furnizor la alegerea ta, afișează rezultatul transmis în flux și îl inserează în editor prin butonul de acțiune specific modului (**Inserează** / **Înlocuiește** / **Adaugă la final**).

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

Proprietatea `ai` acceptă `true` (opțiuni cu valori implicite) sau un obiect de opțiuni (`TiptapifyAiOptions`). Elementul `ai` din bara de instrumente este întotdeauna înregistrat, dar butonul este **dezactivat** dacă nu este setat `aiProvider`.

Vezi [exemplul AI](/ro/examples/ai) pentru o demonstrație rulabilă și [Proprietăți](/ro/api/props#ai) pentru referința completă a opțiunilor.

## Arhitectură {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normalizează proprietatea `ai`: `ai: true` devine un obiect de opțiuni gol, `promptExamples` revine la valorile implicite localizate, iar rezultatul este expus descendenților prin `inject('tiptapifyAi')` (`TiptapifyAiResolvedOptions` sau `false`).
- Elementul din bara de instrumente (`src/components/Toolbar/ai.ts`) randează `Button.vue`. Butonul verifică disponibilitatea `aiProvider` și deschide `Dialog.vue`.
- `Dialog.vue` deține întregul ciclu de viață al cererii: construirea cererii, apelarea furnizorului, transmisia în flux și inserarea rezultatului.

## Contractul furnizorului {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

Furnizorul este o funcție asincronă simplă, pe care o implementezi tu. tiptapify nu apelează niciun API pe cont propriu — funcționează orice poate consuma un obiect `request` compatibil OpenAI (fetch, un SDK, un adaptor de backend). Excepția este modul backend `aiEndpoint` (vezi [Generare prin backend](#backend-generation-aiendpoint)), în care tiptapify trimite cererea către endpointul tău.

**Cererea** (`TiptapifyAiRequest`) este construită din `chatCompletionOptions`, apoi completată de plugin:

| Câmp | Sursă |
| --- | --- |
| `messages` | `createMessages(context)`, dacă este furnizat, altfel perechea implicită: un mesaj de sistem (`systemPrompt` al tău sau o valoare implicită încorporată) și un mesaj de utilizator care include promptul, textul selectat din editor cu textul din jurul lui și regula de a răspunde doar pentru selecție (sau pentru întregul text, când nu este selectat nimic) |
| `model` | opțiunea `model`, când este setată |
| `temperature` | opțiunea `temperature`, când este setată |
| `stream` | opțiunea `stream` sau `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | comutatorul Thinking / lista derulantă pentru efort — vezi mai jos |

**Contextul** (`TiptapifyAiEditorContext`) oferă furnizorului starea completă a editorului: `prompt`, `selectedText`, `textBefore` / `textAfter` (textul paragrafului selecției din jurul acesteia, până la 500 de caractere fiecare), `text`, `html`, `json` și `mode` (`insert` / `replace` / `append`).

O selecție care începe sau se termină în mijlocul unui cuvânt preia cuvântul întreg, iar mesajele implicite trimit textul din jurul selecției împreună cu regula de a răspunde doar pentru selecție: primind doar un fragment, un model îl ia drept întregul text și îl completează, iar înlocuirea ar repeta ce urmează după selecție.

**Răspunsul**: furnizorul poate returna conținutul ca un simplu `string`, ca `{ content }` (`TiptapifyAiResponse`) sau ca un payload `choices` compatibil OpenAI (`TiptapifyAiOpenAiResponse`). Dialogul extrage conținutul în această ordine și elimină spațiile de la început. La respingere, mesajul de eroare este afișat în dialog (sau `ai.error`, când eroarea nu este o instanță `Error`), iar dialogul rămâne deschis.

## Generare prin backend (`aiEndpoint`) {#backend-generation-aiendpoint}

În loc să implementezi un `aiProvider`, îndreaptă funcționalitatea AI către un endpoint LLM din backend:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

tiptapify construiește atunci cererea și o trimite el însuși către endpoint. Un `aiProvider` explicit are întotdeauna prioritate când ambele sunt setate.

**Cererea** — un payload JSON minimal (`TiptapifyAiBackendRequest`):

| Câmp | Trimis |
| --- | --- |
| `prompt` | întotdeauna — cererea tastată în dialog |
| `instruction` | întotdeauna — `systemPrompt` al tău, mesajul de sistem al unui `createMessages` personalizat sau valoarea implicită încorporată |
| `stream` | doar când `stream: true` |
| `thinking` | doar când comutatorul **Gândire** din dialog este activat |
| `reasoning_effort` | doar când utilizatorul a ales un nivel (nu `default`) |
| `model` | doar când opțiunea `model` este setată |

**Răspunsul** — acceptat flexibil: un șir simplu, un obiect `{ content }` sau un payload `choices` compatibil OpenAI.

**Transmisia în flux** — când cererea are `stream: true`, corpul răspunsului este citit ca flux SSE (linii `data:`, încheiate cu `data: [DONE]`). Formate de fragmente acceptate:

- Stil OpenAI — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Simplu — `data: {"type":"content"|"reasoning","data":"…"}`
- Plat — `data: {"content":"…","reasoning_content":"…"}`
- Text simplu — `data: some text` (o linie `data` care nu este JSON este un fragment de conținut)

Fragmentele `content` actualizează câmpul de rezultat prin `onChunk`, iar fragmentele `reasoning_content` alimentează panoul **Gândire** prin `onReasoning`. Dacă backendul ignoră `stream` și răspunde cu un corp simplu, se folosește acel corp. Un clic pe **Oprește** sau închiderea dialogului întrerupe cererea; conținutul transmis parțial rămâne în câmpul de rezultat.

**Antete** — `aiHeaders` (un `Record<string, string>`) sunt îmbinate peste `Content-Type: application/json`. Un antet `Authorization` din `aiHeaders` este păstrat ca atare; altfel, un token de la `tokenProvider` este trimis ca `Authorization: Bearer <token>`.

**Erori** — un răspuns care nu este OK afișează în dialog mesajul de eroare al backendului (JSON `{ error }` / `{ message }` sau corpul brut).

## Transmisia în flux {#streaming}

Când `stream: true` (sau `chatCompletionOptions.stream` este `true`), dialogul transmite un obiect `TiptapifyAiStream` ca al treilea argument:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — transmite-l către `fetch` (sau apelul SDK-ului tău). Întrerupe cererea când utilizatorul dă clic pe **Oprește** sau închide dialogul, astfel încât cererile în curs să nu continue.
- **`onChunk`** — adaugă fiecare fragment de conținut în câmpul de rezultat. În timpul generării, câmpul de rezultat este doar pentru citire, iar conținutul transmis parțial este păstrat (poți opri, apoi insera sau renunța la el).
- **`onReasoning`** — redirecționează ieșirea de raționament/gândire a modelului (de ex. delta `reasoning_content` de la Qwen/DeepSeek/seria o) către un panou pliabil **Gândire**, deasupra rezultatului. Panoul se extinde și derulează automat în timpul transmisiei. Ieșirea de raționament este doar pentru afișare și nu este niciodată inserată în editor.

Furnizorii care nu transmit în flux ignoră argumentul `stream` — este opțional.

## Gândire și efort de raționament {#thinking-and-reasoning-effort}

Două controale ale utilizatorului din dialog corespund unor câmpuri ale cererii. Ambele se activează prin opțiuni și sunt gestionate de plugin — nu setezi (și nu ar trebui să setezi) aceste câmpuri tu însuți în `chatCompletionOptions`.

- **`thinking: true`** afișează comutatorul **Gândire** (activat implicit, resetat la fiecare deschidere a dialogului). Pluginul scrie valoarea comutatorului în cerere ca `enable_thinking: true | false`.
- **`thinking` lipsă sau `thinking: false`** ascunde comutatorul, iar pluginul trimite `enable_thinking: false`, astfel încât modelele care gândesc implicit să nu gândească.
- **`reasoningEffort: { options, default? }`** afișează lista derulantă **Efort de raționament**. `options` enumeră nivelurile de efort personalizate pe care vrei să le oferi (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); extensia adaugă ea însăși întotdeauna un element `default` (nivelul de bază al modului de gândire), deci nu enumeri niciodată `default` în configurația ta. Câmpul `default` preselectează unul dintre nivelurile tale personalizate la deschiderea dialogului — când lipsește, este preselectat `default`. Valoarea se resetează la fiecare deschidere. Lista derulantă este randată doar când `options` este o listă nevidă, `thinking` este activat și comutatorul Gândire este pornit.
- **`showReasoning`** (implicit `false`) controlează panoul pliabil **Gândire**, care transmite în flux procesul de raționament al modelului (delta `reasoning_content`). Setează `showReasoning: true` pentru a afișa acel panou păstrând gândirea activată — modelul raționează în continuare, rezultatul este aplicat la fel, doar raționamentul pas cu pas este afișat suplimentar.

Deoarece furnizorii (în special vLLM/LM Studio) resping `enable_thinking` și `reasoning_effort` într-o singură cerere, pluginul trimite exact unul dintre cele două:

| Stare | Câmp al cererii |
| --- | --- |
| Gândire activată, efort = `default` (sau niciun efort configurat) | `enable_thinking` (din comutator) |
| Gândire activată, efort = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (din lista derulantă); comutatorul este dezactivat |
| Gândire dezactivată (comutator oprit sau `thinking` neactivat în configurație) | `enable_thinking: false`; `reasoning_effort` nu este trimis |

## Erori {#errors}

Dialogul explică o cerere eșuată în loc să afișeze eroarea brută și adaugă după explicație mesajul propriu al serviciului:

| Ce s-a întâmplat | Explicație |
| --- | --- |
| Browserul nu a primit niciun răspuns (`Failed to fetch`, `NetworkError…`, `Load failed`) | Serviciul este oprit, inaccesibil sau CORS a blocat răspunsul; consola browserului arată care este cauza |
| `401` / `403` | Verifică cheia API sau drepturile de acces |
| `404` | Verifică calea endpointului |
| `408` / `504` / un timeout | Serviciul nu a răspuns la timp |
| `429` | Prea multe cereri |
| `5xx` | Serviciul nu este disponibil (încarcă un model, este ocupat) |

Cu `aiEndpoint`, statusul provine din răspuns. Un `aiProvider` personalizat primește aceleași explicații dacă aruncă o eroare cu un `status`:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Orice altă eroare este afișată cu propriul mesaj.

## Inserarea rezultatului {#inserting-the-result}

La butonul de acțiune — **Inserează**, **Înlocuiește** sau **Adaugă la final**, în funcție de mod — dialogul plasează `result` în editor:

- **Mod** — butonul de acțiune al dialogului este un buton împărțit. Partea principală aplică rezultatul în modul preselectat (**Inserează** / **Înlocuiește** / **Adaugă la final**): opțiunea `mode` îl preselectează sau, altfel, **Înlocuiește** când textul era selectat la deschiderea dialogului și **Inserează** în rest. O mică secțiune „mai multe” (⋮) din dreapta butonului deschide un meniu cu celelalte moduri — un clic pe unul aplică imediat rezultatul în acel mod. **Inserează** plasează rezultatul la cursor, **Înlocuiește** înlocuiește textul selectat (capturat când s-a dat clic pe **Generează**), iar **Adaugă la final** îl adaugă la sfârșitul documentului.
- **Limita de caractere** — când editorul este configurat cu `limit` (extensia `CharacterCount` respinge orice tranzacție care nu este lipire și ar depăși limita), sub câmpul de rezultat este afișat un contor de caractere `generated / limit` (actualizat în timpul transmisiei, în roșu estompat când limita ar fi depășită), iar dialogul afișează avertismentul `ai.limit_exceeded` imediat după generare, dacă rezultatul ar depăși limita. Butonul **Inserează** și meniul său de moduri alternative sunt atunci dezactivate: rezultatul se aplică integral sau deloc, deci trebuie scurtat înainte de aplicare.