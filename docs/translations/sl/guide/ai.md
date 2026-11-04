# Razširitev AI {#ai-extension}

Razširitev AI doda gumb v orodni vrstici, ki odpre pogovorno okno z navodilom, pošlje zahtevo izbranemu ponudniku, prikaže pretočni rezultat in ga prek gumba dejanja za posamezen način vstavi v urejevalnik (**Vstavi** / **Zamenjaj** / **Dodaj na konec**).

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

Lastnost `ai` sprejme `true` (možnosti s privzetimi vrednostmi) ali objekt z možnostmi (`TiptapifyAiOptions`). Element orodne vrstice `ai` je vedno registriran, vendar je gumb **onemogočen**, razen če je nastavljen `aiProvider`.

Delujočo predstavitev si oglejte v [primeru AI](/sl/examples/ai), celotno referenco možnosti pa v [Lastnostih](/sl/api/props#ai).

## Arhitektura {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normalizira lastnost `ai`: `ai: true` postane prazen objekt z možnostmi, `promptExamples` preide na lokalizirane privzete vrednosti, rezultat pa je prek `inject('tiptapifyAi')` izpostavljen potomcem (`TiptapifyAiResolvedOptions` ali `false`).
- Element orodne vrstice (`src/components/Toolbar/ai.ts`) izriše `Button.vue`. Gumb preveri razpoložljivost `aiProvider` in odpre `Dialog.vue`.
- `Dialog.vue` upravlja celoten življenjski cikel zahteve: sestavo zahteve, klic ponudnika, pretakanje in vstavljanje rezultata.

## Pogodba ponudnika {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

Ponudnik je navadna asinhrona funkcija, ki jo implementirate sami. Tiptapify sam ne kliče nobenega API-ja — deluje vse, kar zna obdelati objekt `request`, združljiv z OpenAI (fetch, SDK, zaledni adapter). Izjema je zaledni način `aiEndpoint` (glejte [Zaledno generiranje](#backend-generation-aiendpoint)), kjer Tiptapify pošlje zahtevo na vašo končno točko.

**Zahteva** (`TiptapifyAiRequest`) se razprši iz vaših `chatCompletionOptions`, nato jo vtičnik dopolni:

| Polje | Vir |
| --- | --- |
| `messages` | `createMessages(context)`, če je podan, sicer privzeti par: sistemsko sporočilo (vaš `systemPrompt` ali vgrajena privzeta vrednost) in uporabniško sporočilo, ki vsebuje navodilo ter izbrano besedilo urejevalnika z besedilom okoli njega in pravilom, naj model odgovori samo za izbor (ali za celotno besedilo, če ni izbrano nič) |
| `model` | možnost `model`, če je nastavljena |
| `temperature` | možnost `temperature`, če je nastavljena |
| `stream` | možnost `stream` ali `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | stikalo za razmišljanje / spustni meni ravni truda — glejte spodaj |

**Kontekst** (`TiptapifyAiEditorContext`) ponudniku da celotno stanje urejevalnika: `prompt`, `selectedText`, `textBefore` / `textAfter` (besedilo odstavka izbora okoli njega, do 500 znakov na vsaki strani), `text`, `html`, `json` in `mode` (`insert` / `replace` / `append`).

Izbor, ki se začne ali konča sredi besede, zajame celotno besedo, privzeta sporočila pa pošljejo besedilo okoli izbora skupaj s pravilom, naj model odgovori samo za izbor: če model dobi le odlomek, ga šteje za celotno besedilo in ga dopolni, zamenjava pa bi ponovila, kar sledi izboru.

**Odgovor**: ponudnik lahko vsebino vrne kot navaden `string`, kot `{ content }` (`TiptapifyAiResponse`) ali kot vsebino `choices`, združljivo z OpenAI (`TiptapifyAiOpenAiResponse`). Pogovorno okno izlušči vsebino v tem vrstnem redu in odreže uvodne presledke. Ob zavrnitvi se sporočilo o napaki prikaže v pogovornem oknu (ali `ai.error`, če napaka ni primerek `Error`) in okno ostane odprto.

## Zaledno generiranje (`aiEndpoint`) {#backend-generation-aiendpoint}

Namesto implementacije `aiProvider` lahko funkcijo AI usmerite na zaledno končno točko LLM:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

Tiptapify nato sam sestavi zahtevo in jo pošlje na končno točko. Izrecni `aiProvider` vedno prevlada, kadar sta nastavljena oba.

**Zahteva** — minimalna vsebina JSON (`TiptapifyAiBackendRequest`):

| Polje | Poslano |
| --- | --- |
| `prompt` | vedno — zahteva, vnesena v pogovorno okno |
| `instruction` | vedno — vaš `systemPrompt`, sistemsko sporočilo lastnega `createMessages` ali vgrajena privzeta vrednost |
| `stream` | samo pri `stream: true` |
| `thinking` | samo kadar je stikalo **Razmišljanje** v pogovornem oknu vklopljeno |
| `reasoning_effort` | samo kadar je uporabnik izbral raven (ne `default`) |
| `model` | samo kadar je nastavljena možnost `model` |

**Odgovor** — sprejet prizanesljivo: navaden niz, objekt `{ content }` ali vsebina `choices`, združljiva z OpenAI.

**Pretakanje** — kadar ima zahteva `stream: true`, se telo odgovora bere kot tok SSE (vrstice `data:`, zaključene z `data: [DONE]`). Sprejeti formati kosov:

- v slogu OpenAI — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- preprost — `data: {"type":"content"|"reasoning","data":"…"}`
- ploski — `data: {"content":"…","reasoning_content":"…"}`
- navadno besedilo — `data: some text` (vrstica `data`, ki ni JSON, je kos vsebine)

Kosi `content` posodabljajo polje rezultata prek `onChunk`, kosi `reasoning_content` pa napajajo ploščo **Razmišljanje** prek `onReasoning`. Če zaledje prezre `stream` in odgovori z navadnim telesom, se uporabi to telo. Klik na **Ustavi** ali zaprtje pogovornega okna prekine zahtevo; delno preneseta vsebina ostane v polju rezultata.

**Glave** — `aiHeaders` (`Record<string, string>`) se združijo čez `Content-Type: application/json`. Glava `Authorization` v `aiHeaders` se ohrani nespremenjena; sicer se žeton iz `tokenProvider` pošlje kot `Authorization: Bearer <token>`.

**Napake** — odgovor, ki ni OK, v pogovornem oknu prikaže sporočilo o napaki zaledja (JSON `{ error }` / `{ message }` ali surovo telo).

## Pretakanje {#streaming}

Kadar je `stream: true` (ali je `chatCompletionOptions.stream` enak `true`), pogovorno okno kot tretji argument poda objekt `TiptapifyAiStream`:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — podajte ga v `fetch` (ali klic SDK). Prekine se, ko uporabnik klikne **Ustavi** ali zapre pogovorno okno, zato zahteve v teku ne tečejo naprej.
- **`onChunk`** — vsak kos vsebine dodajte v polje rezultata. Med generiranjem je polje rezultata samo za branje, delno preneseta vsebina pa ostane (lahko ustavite, nato vstavite ali zavržete).
- **`onReasoning`** — izhod razmišljanja modela (npr. delta `reasoning_content` pri Qwen/DeepSeek/serijah o) posredujte v zložljivo ploščo **Razmišljanje** nad rezultatom. Plošča se med pretakanjem samodejno razširi in drsi. Izhod razmišljanja je samo za prikaz in se nikoli ne vstavi v urejevalnik.

Ponudniki, ki ne pretakajo, argument `stream` prezrejo — ni obvezen.

## Razmišljanje in trud razmišljanja {#thinking-and-reasoning-effort}

Dva uporabniška nadzora v pogovornem oknu se preslikata v polja zahteve. Oba se vklopita prek možnosti in ju upravlja vtičnik — teh polj sami ne nastavljajte (in ne bi smeli) v `chatCompletionOptions`.

- **`thinking: true`** prikaže stikalo **Razmišljanje** (privzeto vklopljeno, ob vsakem odprtju pogovornega okna ponastavljeno). Vtičnik vrednost stikala zapiše v zahtevo kot `enable_thinking: true | false`.
- **`thinking` manjka ali `thinking: false`** skrije stikalo, vtičnik pa pošlje `enable_thinking: false`, tako da modeli, ki privzeto razmišljajo, ne razmišljajo.
- **`reasoningEffort: { options, default? }`** prikaže spustni meni **Trud razmišljanja**. `options` našteje ravni truda po meri, ki jih želite ponuditi (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); razširitev vedno sama doda element `default` (izhodišče načina razmišljanja), zato `default` v konfiguraciji nikoli ne naštevajte. Polje `default` ob odprtju pogovornega okna vnaprej izbere eno od vaših ravni po meri — če ni podano, je vnaprej izbran `default`. Vrednost se ob vsakem odprtju ponastavi. Spustni meni se izriše samo, kadar je `options` neprazen seznam, je `thinking` omogočen in je stikalo Razmišljanje vklopljeno.
- **`showReasoning`** (privzeto `false`) nadzira zložljivo ploščo **Razmišljanje**, ki pretaka proces razmišljanja modela (delta `reasoning_content`). Z `showReasoning: true` plošči omogočite prikaz, medtem ko razmišljanje ostane vklopljeno — model še vedno razmišlja, rezultat se uporabi enako, dodatno se prikaže le postopno razmišljanje.

Ker ponudniki (zlasti vLLM/LM Studio) v eni zahtevi zavrnejo hkratna `enable_thinking` in `reasoning_effort`, vtičnik pošlje natanko eno od obeh:

| Stanje | Polje zahteve |
| --- | --- |
| Razmišljanje vklopljeno, trud = `default` (ali trud ni nastavljen) | `enable_thinking` (iz stikala) |
| Razmišljanje vklopljeno, trud = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (iz spustnega menija); stikalo je onemogočeno |
| Razmišljanje izklopljeno (stikalo izklopljeno ali `thinking` ni omogočen v konfiguraciji) | `enable_thinking: false`; `reasoning_effort` se ne pošlje |

## Napake {#errors}

Pogovorno okno neuspelo zahtevo razloži, namesto da bi prikazalo surovo napako, in za razlago doda lastno sporočilo storitve:

| Kaj se je zgodilo | Razlaga |
| --- | --- |
| Brskalnik ni dobil odgovora (`Failed to fetch`, `NetworkError…`, `Load failed`) | Storitev ne deluje, je nedosegljiva ali pa je odgovor blokiral CORS; v konzoli brskalnika je razvidno, kaj od tega |
| `401` / `403` | Preverite ključ API ali pravice dostopa |
| `404` | Preverite pot končne točke |
| `408` / `504` / časovna omejitev | Storitev ni odgovorila pravočasno |
| `429` | Preveč zahtev |
| `5xx` | Storitev ni na voljo (nalaga model, je zasedena) |

Pri `aiEndpoint` status prihaja iz odgovora. Lasten `aiProvider` dobi enake razlage, če vrže napako s `status`:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Vsaka druga napaka se prikaže z lastnim sporočilom.

## Vstavljanje rezultata {#inserting-the-result}

Ob gumbu dejanja — **Vstavi**, **Zamenjaj** ali **Dodaj na konec**, odvisno od načina — pogovorno okno `result` namesti v urejevalnik:

- **Način** — gumb dejanja v pogovornem oknu je razdeljen gumb. Glavni del uporabi rezultat v vnaprej izbranem načinu (**Vstavi** / **Zamenjaj** / **Dodaj na konec**): možnost `mode` ga vnaprej izbere, sicer je to **Zamenjaj**, če je bilo ob odprtju pogovornega okna izbrano besedilo, in **Vstavi** v nasprotnem primeru. Majhen del »več« (⋮) desno od gumba odpre meni s preostalimi načini — klik na enega takoj uporabi rezultat v tem načinu. **Vstavi** rezultat postavi na kazalec, **Zamenjaj** zamenja izbrano besedilo (zajeto ob kliku na **Generiraj**), **Dodaj na konec** pa ga doda na konec dokumenta.
- **Omejitev znakov** — kadar je urejevalnik nastavljen z `limit` (razširitev `CharacterCount` zavrne vsako transakcijo, ki ni lepljenje in bi dokument povečala čez omejitev), se pod poljem rezultata prikaže števec znakov `generated / limit` (sproti med pretakanjem, mehko rdeč, ko bi bila omejitev presežena), pogovorno okno pa takoj po generiranju prikaže opozorilo `ai.limit_exceeded`, če bi rezultat presegel omejitev. Gumb **Vstavi** in njegov meni drugih načinov sta nato onemogočena: rezultat se uporabi v celoti ali sploh ne, zato ga morate pred uporabo skrajšati.