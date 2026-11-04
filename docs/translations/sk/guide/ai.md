# Rozšírenie AI {#ai-extension}

Rozšírenie AI pridá tlačidlo na lištu nástrojov, ktoré otvorí dialóg s promptom, odošle požiadavku vami zvolenému poskytovateľovi, zobrazí streamovaný výsledok a vloží ho do editora cez tlačidlo akcie podľa režimu (**Vložiť** / **Nahradiť** / **Pridať na koniec**).

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

Prop `ai` prijíma `true` (možnosti s predvolenými hodnotami) alebo objekt možností (`TiptapifyAiOptions`). Položka `ai` na lište nástrojov je vždy zaregistrovaná, ale tlačidlo je **zakázané**, kým nie je nastavený `aiProvider`.

Spustiteľné demo nájdete v [príklade AI](/sk/examples/ai) a úplnú referenciu možností v [Props](/sk/api/props#ai).

## Architektúra {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normalizuje prop `ai`: `ai: true` sa zmení na prázdny objekt možností, `promptExamples` sa vráti k lokalizovaným predvoleným hodnotám a výsledok sa sprístupní potomkom cez `inject('tiptapifyAi')` (`TiptapifyAiResolvedOptions` alebo `false`).
- Položka lišty nástrojov (`src/components/Toolbar/ai.ts`) vykresľuje `Button.vue`. Tlačidlo skontroluje dostupnosť `aiProvider` a otvorí `Dialog.vue`.
- `Dialog.vue` vlastní celý životný cyklus požiadavky: zostavenie požiadavky, volanie poskytovateľa, streamovanie a vloženie výsledku.

## Kontrakt poskytovateľa {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

Poskytovateľ je obyčajná asynchrónna funkcia, ktorú implementujete. tiptapify sám nevolá žiadne API — funguje čokoľvek, čo dokáže spracovať objekt `request` kompatibilný s OpenAI (fetch, SDK, backendový adaptér). Výnimkou je backendový režim `aiEndpoint` (pozri [Generovanie na backende](#backend-generation-aiendpoint)), v ktorom tiptapify odosiela požiadavku na váš endpoint.

**Požiadavka** (`TiptapifyAiRequest`) sa rozloží z vašich `chatCompletionOptions` a potom ju plugin doplní:

| Pole | Zdroj |
| --- | --- |
| `messages` | `createMessages(context)`, ak je zadané, inak predvolená dvojica: systémová správa (váš `systemPrompt` alebo vstavaná predvolená) a používateľská správa, ktorá obsahuje prompt, vybraný text editora s textom okolo neho a pravidlo odpovedať iba pre výber (alebo pre celý text, ak nie je nič vybrané) |
| `model` | možnosť `model`, ak je nastavená |
| `temperature` | možnosť `temperature`, ak je nastavená |
| `stream` | možnosť `stream` alebo `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | prepínač uvažovania / rozbaľovacia ponuka úrovne úsilia — pozri nižšie |

**Kontext** (`TiptapifyAiEditorContext`) poskytuje poskytovateľovi úplný stav editora: `prompt`, `selectedText`, `textBefore` / `textAfter` (text odseku s výberom pred ním a za ním, najviac 500 znakov na každej strane), `text`, `html`, `json` a `mode` (`insert` / `replace` / `append`).

Výber, ktorý začína alebo končí vo vnútri slova, zahŕňa celé slovo a predvolené správy posielajú text okolo výberu s pravidlom odpovedať iba pre výber: ak model dostane len úryvok, považuje ho za celý text a dopíše ho, takže by náhrada zopakovala to, čo nasleduje za výberom.

**Odpoveď**: poskytovateľ môže vrátiť obsah ako obyčajný `string`, ako `{ content }` (`TiptapifyAiResponse`) alebo ako payload `choices` kompatibilný s OpenAI (`TiptapifyAiOpenAiResponse`). Dialóg obsah extrahuje v tomto poradí a odstráni úvodné medzery. Pri odmietnutí sa chybová správa zobrazí v dialógu (alebo `ai.error`, ak chyba nie je inštanciou `Error`) a dialóg zostane otvorený.

## Generovanie na backende (`aiEndpoint`) {#backend-generation-aiendpoint}

Namiesto implementácie `aiProvider` namierte funkciu AI na backendový endpoint LLM:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

tiptapify potom zostaví požiadavku a odošle ju na endpoint sám. Explicitný `aiProvider` má vždy prednosť, ak sú nastavené oba.

**Požiadavka** — minimálny payload JSON (`TiptapifyAiBackendRequest`):

| Pole | Odosiela sa |
| --- | --- |
| `prompt` | vždy — požiadavka napísaná v dialógu |
| `instruction` | vždy — váš `systemPrompt`, systémová správa vlastného `createMessages` alebo vstavaná predvolená |
| `stream` | iba pri `stream: true` |
| `thinking` | iba ak je zapnutý prepínač **Uvažuje** v dialógu |
| `reasoning_effort` | iba ak používateľ vybral úroveň (nie `default`) |
| `model` | iba ak je nastavená možnosť `model` |

**Odpoveď** — prijíma sa tolerantne: obyčajný reťazec, objekt `{ content }` alebo payload `choices` kompatibilný s OpenAI.

**Streamovanie** — ak má požiadavka `stream: true`, telo odpovede sa číta ako stream SSE (riadky `data:` ukončené `data: [DONE]`). Prijímané formáty chunkov:

- Štýl OpenAI — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Jednoduchý — `data: {"type":"content"|"reasoning","data":"…"}`
- Plochý — `data: {"content":"…","reasoning_content":"…"}`
- Čistý text — `data: some text` (riadok `data` bez JSON je chunk obsahu)

Chunky `content` aktualizujú pole výsledku cez `onChunk`, chunky `reasoning_content` napájajú panel **Uvažuje** cez `onReasoning`. Ak backend `stream` ignoruje a odpovie obyčajným telom, použije sa toto telo. Kliknutie na **Zastaviť** alebo zatvorenie dialógu požiadavku preruší; čiastočne streamovaný obsah zostane v poli výsledku.

**Hlavičky** — `aiHeaders` (`Record<string, string>`) sa zlúčia nad `Content-Type: application/json`. Hlavička `Authorization` v `aiHeaders` sa ponechá tak, ako je; inak sa token z `tokenProvider` odošle ako `Authorization: Bearer <token>`.

**Chyby** — odpoveď, ktorá nie je v poriadku, zobrazí v dialógu chybovú správu backendu (JSON `{ error }` / `{ message }` alebo surové telo).

## Streamovanie {#streaming}

Ak je `stream: true` (alebo `chatCompletionOptions.stream` je `true`), dialóg odovzdá ako tretí argument objekt `TiptapifyAiStream`:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — odovzdajte ho do `fetch` (alebo volania SDK). Preruší sa, keď používateľ klikne na **Zastaviť** alebo zatvorí dialóg, takže rozbehnuté požiadavky nebežia ďalej.
- **`onChunk`** — pripojte každý chunk obsahu do poľa výsledku. Počas generovania je pole výsledku len na čítanie a čiastočne streamovaný obsah sa zachová (môžete zastaviť a potom ho vložiť alebo zahodiť).
- **`onReasoning`** — odovzdajte výstup uvažovania modelu (napr. delta `reasoning_content` pri Qwen/DeepSeek/rade o) do zbaliteľného panela **Uvažuje** nad výsledkom. Panel sa počas streamovania automaticky rozbalí a posúva. Výstup uvažovania je len na zobrazenie a do editora sa nikdy nevkladá.

Poskytovatelia, ktorí nestreamujú, argument `stream` ignorujú — je voliteľný.

## Uvažovanie a úroveň úsilia {#thinking-and-reasoning-effort}

Dva ovládacie prvky pre používateľa v dialógu zodpovedajú poliam požiadavky. Oba sa zapínajú v možnostiach a spravuje ich plugin — tieto polia si v `chatCompletionOptions` nenastavujte (a ani by ste nemali).

- **`thinking: true`** zobrazí prepínač **Uvažuje** (predvolene zapnutý, pri každom otvorení dialógu sa obnoví). Plugin zapíše hodnotu prepínača do požiadavky ako `enable_thinking: true | false`.
- **`thinking` chýba alebo `thinking: false`** prepínač skryje a plugin odošle `enable_thinking: false`, takže modely, ktoré predvolene uvažujú, neuvažujú.
- **`reasoningEffort: { options, default? }`** zobrazí rozbaľovaciu ponuku **Úsilie uvažovania**. `options` uvádza vlastné úrovne úsilia, ktoré chcete ponúknuť (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); rozšírenie si samo vždy pridá položku `default` (základ režimu uvažovania), takže `default` v konfigurácii nikdy neuvádzajte. Pole `default` predvyberie jednu z vašich vlastných úrovní pri otvorení dialógu — ak chýba, predvolí sa `default`. Hodnota sa pri každom otvorení obnoví. Rozbaľovacia ponuka sa vykreslí iba vtedy, keď `options` je neprázdny zoznam, `thinking` je zapnuté a prepínač Uvažuje je zapnutý.
- **`showReasoning`** (predvolene `false`) ovláda zbaliteľný panel **Uvažuje**, ktorý streamuje proces uvažovania modelu (delta `reasoning_content`). Nastavte `showReasoning: true`, ak chcete panel zobraziť a ponechať uvažovanie zapnuté — model stále uvažuje, výsledok sa použije rovnako, len sa navyše zobrazí postupné uvažovanie.

Keďže poskytovatelia (najmä vLLM/LM Studio) odmietajú `enable_thinking` a `reasoning_effort` v jednej požiadavke, plugin odošle vždy presne jedno z nich:

| Stav | Pole požiadavky |
| --- | --- |
| Uvažovanie zapnuté, úsilie = `default` (alebo úsilie nie je nakonfigurované) | `enable_thinking` (z prepínača) |
| Uvažovanie zapnuté, úsilie = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (z rozbaľovacej ponuky); prepínač je zakázaný |
| Uvažovanie vypnuté (prepínač vypnutý alebo `thinking` nie je v konfigurácii zapnuté) | `enable_thinking: false`; `reasoning_effort` sa neodosiela |

## Chyby {#errors}

Dialóg vysvetlí neúspešnú požiadavku namiesto zobrazenia surovej chyby a za vysvetlenie pridá vlastnú správu služby:

| Čo sa stalo | Vysvetlenie |
| --- | --- |
| Prehliadač nedostal odpoveď (`Failed to fetch`, `NetworkError…`, `Load failed`) | Služba nebeží, je nedostupná alebo odpoveď zablokoval CORS; príčinu ukáže konzola prehliadača |
| `401` / `403` | Skontrolujte kľúč API alebo prístupové práva |
| `404` | Skontrolujte cestu endpointu |
| `408` / `504` / vypršanie času | Služba neodpovedala včas |
| `429` | Príliš veľa požiadaviek |
| `5xx` | Služba nie je dostupná (načítava model, je vyťažená) |

Pri `aiEndpoint` sa stav preberá z odpovede. Vlastný `aiProvider` dostane rovnaké vysvetlenia, ak vyhodí chybu so `status`:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Akákoľvek iná chyba sa zobrazí s vlastnou správou.

## Vloženie výsledku {#inserting-the-result}

Tlačidlom akcie — **Vložiť**, **Nahradiť** alebo **Pridať na koniec**, podľa režimu — dialóg umiestni `result` do editora:

- **Režim** — tlačidlo akcie v dialógu je rozdelené tlačidlo. Hlavná časť použije výsledok vo vopred vybranom režime (**Vložiť** / **Nahradiť** / **Pridať na koniec**): vopred ho vyberie možnosť `mode`, alebo **Nahradiť**, ak bol pri otvorení dialógu vybraný text, a inak **Vložiť**. Malá časť „viac“ (⋮) vpravo od tlačidla otvorí ponuku so zvyšnými režimami — kliknutie na niektorý z nich použije výsledok v tomto režime okamžite. **Vložiť** umiestni výsledok na kurzor, **Nahradiť** nahradí vybraný text (zachytený pri kliknutí na **Vygenerovať**) a **Pridať na koniec** ho pridá na koniec dokumentu.
- **Limit znakov** — keď je editor nakonfigurovaný s `limit` (rozšírenie `CharacterCount` odmietne každú transakciu, ktorá nie je vložením a zväčšila by dokument nad limit), pod poľom výsledku sa zobrazí počítadlo znakov `generated / limit` (živo počas streamovania, jemne červené pri prekročení limitu) a dialóg hneď po generovaní zobrazí upozornenie `ai.limit_exceeded`, ak by výsledok limit prekročil. Tlačidlo **Vložiť** a jeho ponuka alternatívnych režimov sa potom zakážu: výsledok sa použije celý alebo vôbec, takže ho musíte pred použitím skrátiť.