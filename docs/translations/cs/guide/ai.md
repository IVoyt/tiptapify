# Rozšíření AI {#ai-extension}

Rozšíření AI přidá na panel nástrojů tlačítko, které otevře dialog s příkazem, odešle požadavek vámi zvolenému poskytovateli, zobrazí streamovaný výsledek a vloží ho do editoru pomocí tlačítka akce podle režimu (**Vložit** / **Nahradit** / **Přidat na konec**).

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

Prop `ai` přijímá `true` (možnosti s výchozími hodnotami) nebo objekt možností (`TiptapifyAiOptions`). Položka panelu nástrojů `ai` je registrována vždy, ale tlačítko je **zakázané**, dokud není nastaven `aiProvider`.

Spustitelné demo najdete v [příkladu AI](/cs/examples/ai), úplnou referenci možností v [Props](/cs/api/props#ai).

## Architektura {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normalizuje prop `ai`: `ai: true` se změní na prázdný objekt možností, `promptExamples` se vrátí k lokalizovaným výchozím hodnotám a výsledek se zpřístupní potomkům přes `inject('tiptapifyAi')` (`TiptapifyAiResolvedOptions` nebo `false`).
- Položka panelu nástrojů (`src/components/Toolbar/ai.ts`) vykresluje `Button.vue`. Tlačítko ověří dostupnost `aiProvider` a otevře `Dialog.vue`.
- `Dialog.vue` vlastní celý životní cyklus požadavku: sestavení požadavku, volání poskytovatele, streamování a vložení výsledku.

## Kontrakt poskytovatele {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

Poskytovatel je obyčejná asynchronní funkce, kterou implementujete. Tiptapify žádné API samo nevolá — funguje cokoli, co umí zpracovat objekt `request` kompatibilní s OpenAI (fetch, SDK, adaptér backendu). Výjimkou je backendový režim `aiEndpoint` (viz [Generování na backendu](#backend-generation-aiendpoint)), kde tiptapify posílá požadavek na váš endpoint.

**Požadavek** (`TiptapifyAiRequest`) se rozloží z vašich `chatCompletionOptions` a plugin ho pak doplní:

| Pole | Zdroj |
| --- | --- |
| `messages` | `createMessages(context)`, pokud je zadáno, jinak výchozí dvojice: systémová zpráva (váš `systemPrompt` nebo vestavěná výchozí) a uživatelská zpráva, která obsahuje příkaz a vybraný text editoru s textem kolem něj a pravidlem odpovídat jen pro výběr (nebo pro celý text, když nic není vybráno) |
| `model` | možnost `model`, je-li nastavena |
| `temperature` | možnost `temperature`, je-li nastavena |
| `stream` | možnost `stream` nebo `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | přepínač přemýšlení / rozbalovací nabídka úsilí — viz níže |

**Kontext** (`TiptapifyAiEditorContext`) poskytuje poskytovateli úplný stav editoru: `prompt`, `selectedText`, `textBefore` / `textAfter` (text odstavce výběru kolem něj, každý nejvýše 500 znaků), `text`, `html`, `json` a `mode` (`insert` / `replace` / `append`).

Výběr, který začíná nebo končí uvnitř slova, zahrne celé slovo a výchozí zprávy posílají text kolem výběru spolu s pravidlem odpovídat jen pro výběr: dostane-li model pouze úryvek, považuje ho za celý text a dokončí ho a náhrada by pak opakovala to, co za výběrem následuje.

**Odpověď**: poskytovatel může vrátit obsah jako obyčejný `string`, jako `{ content }` (`TiptapifyAiResponse`) nebo jako payload `choices` kompatibilní s OpenAI (`TiptapifyAiOpenAiResponse`). Dialog obsah extrahuje v tomto pořadí a odřízne počáteční mezery. Při zamítnutí se chybová zpráva zobrazí v dialogu (nebo `ai.error`, pokud chyba není instancí `Error`) a dialog zůstane otevřený.

## Generování na backendu (`aiEndpoint`) {#backend-generation-aiendpoint}

Místo implementace `aiProvider` můžete funkci AI namířit na backendový endpoint LLM:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

Tiptapify pak požadavek sestaví a odešle na endpoint samo. Explicitní `aiProvider` vždy vyhrává, jsou-li nastaveny oba.

**Požadavek** — minimální payload JSON (`TiptapifyAiBackendRequest`):

| Pole | Odesílá se |
| --- | --- |
| `prompt` | vždy — požadavek zadaný v dialogu |
| `instruction` | vždy — váš `systemPrompt`, systémová zpráva vlastního `createMessages` nebo vestavěná výchozí |
| `stream` | jen při `stream: true` |
| `thinking` | jen když je zapnutý přepínač **Přemýšlení** v dialogu |
| `reasoning_effort` | jen když uživatel zvolil úroveň (ne `default`) |
| `model` | jen když je nastavena možnost `model` |

**Odpověď** — přijímá se shovívavě: obyčejný řetězec, objekt `{ content }` nebo payload `choices` kompatibilní s OpenAI.

**Streamování** — když má požadavek `stream: true`, tělo odpovědi se čte jako stream SSE (řádky `data:` ukončené `data: [DONE]`). Přijímané formáty chunků:

- Ve stylu OpenAI — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Jednoduchý — `data: {"type":"content"|"reasoning","data":"…"}`
- Plochý — `data: {"content":"…","reasoning_content":"…"}`
- Prostý text — `data: some text` (řádek `data` mimo JSON je chunk obsahu)

Chunky `content` aktualizují pole výsledku přes `onChunk`, chunky `reasoning_content` plní panel **Přemýšlení** přes `onReasoning`. Pokud backend `stream` ignoruje a odpoví obyčejným tělem, použije se toto tělo. Kliknutí na **Zastavit** nebo zavření dialogu požadavek přeruší; částečně streamovaný obsah zůstane v poli výsledku.

**Hlavičky** — `aiHeaders` (`Record<string, string>`) se sloučí přes `Content-Type: application/json`. Hlavička `Authorization` v `aiHeaders` se ponechá beze změny; jinak se token z `tokenProvider` odešle jako `Authorization: Bearer <token>`.

**Chyby** — odpověď mimo rozsah OK zobrazí v dialogu chybovou zprávu backendu (JSON `{ error }` / `{ message }` nebo surové tělo).

## Streamování {#streaming}

Když je `stream: true` (nebo `chatCompletionOptions.stream` je `true`), dialog předá jako třetí argument objekt `TiptapifyAiStream`:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — předejte ho do `fetch` (nebo volání SDK). Přeruší se, když uživatel klikne na **Zastavit** nebo zavře dialog, takže rozpracované požadavky nepokračují.
- **`onChunk`** — připojte každý chunk obsahu do pole výsledku. Během generování je pole výsledku jen pro čtení a částečně streamovaný obsah se zachovává (můžete zastavit a pak ho vložit nebo zahodit).
- **`onReasoning`** — přeposílejte výstup uvažování/přemýšlení modelu (např. delta `reasoning_content` u Qwen/DeepSeek/řady o) do sbalitelného panelu **Přemýšlení** nad výsledkem. Panel se při streamování automaticky rozbalí a posouvá. Výstup uvažování je určen jen k zobrazení a do editoru se nikdy nevkládá.

Poskytovatelé, kteří nestreamují, argument `stream` ignorují — je volitelný.

## Přemýšlení a úsilí uvažování {#thinking-and-reasoning-effort}

Dva ovládací prvky v dialogu odpovídají polím požadavku. Oba se zapínají možnostmi a spravuje je plugin — tato pole sami nenastavujte (a neměli byste) v `chatCompletionOptions`.

- **`thinking: true`** zobrazí přepínač **Přemýšlení** (výchozí stav zapnuto, při každém otevření dialogu se resetuje). Plugin zapíše hodnotu přepínače do požadavku jako `enable_thinking: true | false`.
- **`thinking` chybí nebo `thinking: false`** přepínač skryje a plugin odešle `enable_thinking: false`, takže modely, které ve výchozím stavu přemýšlejí, nepřemýšlejí.
- **`reasoningEffort: { options, default? }`** zobrazí rozbalovací nabídku **Úsilí přemýšlení**. `options` uvádí vlastní úrovně úsilí, které chcete nabídnout (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); rozšíření samo vždy přidá položku `default` (základ režimu přemýšlení), takže `default` ve své konfiguraci nikdy neuvádíte. Pole `default` předvybere jednu z vašich vlastních úrovní při otevření dialogu — když chybí, předvybere se `default`. Hodnota se při každém otevření resetuje. Rozbalovací nabídka se vykreslí, jen když je `options` neprázdný seznam, `thinking` je zapnuto a přepínač Přemýšlení je zapnutý.
- **`showReasoning`** (výchozí `false`) řídí sbalitelný panel **Přemýšlení**, který streamuje proces uvažování modelu (delta `reasoning_content`). Nastavením `showReasoning: true` tento panel zobrazíte při zachování zapnutého přemýšlení — model dál uvažuje, výsledek se použije stejně, jen se navíc zobrazí postupné uvažování.

Protože poskytovatelé (zejména vLLM/LM Studio) odmítají `enable_thinking` a `reasoning_effort` v jediném požadavku, plugin odešle vždy právě jedno z nich:

| Stav | Pole požadavku |
| --- | --- |
| Přemýšlení zapnuto, úsilí = `default` (nebo žádné úsilí nenakonfigurováno) | `enable_thinking` (z přepínače) |
| Přemýšlení zapnuto, úsilí = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (z rozbalovací nabídky); přepínač je zakázán |
| Přemýšlení vypnuto (přepínač vypnut, nebo `thinking` není v konfiguraci zapnuto) | `enable_thinking: false`; `reasoning_effort` se neodesílá |

## Chyby {#errors}

Dialog neúspěšný požadavek vysvětlí místo zobrazení surové chyby a za vysvětlení připojí vlastní zprávu služby:

| Co se stalo | Vysvětlení |
| --- | --- |
| Prohlížeč nedostal žádnou odpověď (`Failed to fetch`, `NetworkError…`, `Load failed`) | Služba neběží, je nedostupná, nebo odpověď zablokoval CORS; který případ nastal, ukáže konzole prohlížeče |
| `401` / `403` | Zkontrolujte klíč API nebo přístupová práva |
| `404` | Zkontrolujte cestu endpointu |
| `408` / `504` / timeout | Služba neodpověděla včas |
| `429` | Příliš mnoho požadavků |
| `5xx` | Služba je nedostupná (načítá model, je vytížená) |

U `aiEndpoint` se stav bere z odpovědi. Vlastní `aiProvider` získá stejná vysvětlení vyhozením chyby s `status`:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Jakákoli jiná chyba se zobrazí s vlastní zprávou.

## Vložení výsledku {#inserting-the-result}

Tlačítkem akce — **Vložit**, **Nahradit** nebo **Přidat na konec**, podle režimu — dialog umístí `result` do editoru:

- **Režim** — tlačítko akce v dialogu je rozdělené tlačítko. Hlavní část použije výsledek v předvybraném režimu (**Vložit** / **Nahradit** / **Přidat na konec**): předvybere ho možnost `mode`, nebo **Nahradit**, byl-li při otevření dialogu vybrán text, a jinak **Vložit**. Malá část „více“ (⋮) vpravo od tlačítka otevře nabídku se zbývajícími režimy — kliknutí na jeden z nich použije výsledek v tomto režimu okamžitě. **Vložit** umístí výsledek na kurzor, **Nahradit** nahradí vybraný text (zachycený při kliknutí na **Generovat**) a **Přidat na konec** ho přidá na konec dokumentu.
- **Limit znaků** — když je editor nakonfigurován s `limit` (rozšíření `CharacterCount` odmítne každou transakci mimo vkládání, která by dokument zvětšila nad limit), pod polem výsledku se zobrazí počítadlo znaků `generated / limit` (živě při streamování, jemně červené při překročení limitu) a dialog hned po generování zobrazí upozornění `ai.limit_exceeded`, když by výsledek limit překročil. Tlačítko **Vložit** a jeho nabídka alternativních režimů jsou pak zakázány: výsledek se aplikuje celý, nebo vůbec, takže ho před použitím musíte zkrátit.