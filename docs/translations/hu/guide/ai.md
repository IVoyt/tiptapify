# AI bővítmény {#ai-extension}

Az AI bővítmény egy eszköztárgombot ad hozzá, amely megnyit egy prompt-párbeszédablakot, elküldi a kérést a választott szolgáltatónak, megjeleníti a streamelt eredményt, és a módspecifikus műveletgombbal (**Beillesztés** / **Csere** / **Hozzáadás a végéhez**) beszúrja a szerkesztőbe.

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

Az `ai` prop `true` értéket (alapértelmezett opciók) vagy opcióobjektumot (`TiptapifyAiOptions`) fogad. Az `ai` eszköztárelem mindig regisztrálva van, de a gomb **le van tiltva**, ha az `aiProvider` nincs beállítva.

A futtatható demóhoz lásd az [AI példát](/hu/examples/ai), a teljes opciókészlethez pedig a [Propok](/hu/api/props#ai) oldalt.

## Felépítés {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- A `Tiptapify` normalizálja az `ai` propot: az `ai: true` üres opcióobjektummá válik, a `promptExamples` a lokalizált alapértékekre esik vissza, az eredmény pedig az `inject('tiptapifyAi')` révén elérhető a leszármazottak számára (`TiptapifyAiResolvedOptions` vagy `false`).
- Az eszköztárelem (`src/components/Toolbar/ai.ts`) a `Button.vue`-t rendereli. A gomb ellenőrzi az `aiProvider` elérhetőségét, és megnyitja a `Dialog.vue`-t.
- A `Dialog.vue` birtokolja a teljes kérés életciklusát: a kérés összeállítását, a szolgáltató hívását, a streamelést és az eredmény beszúrását.

## A szolgáltatói szerződés {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

A szolgáltató egy egyszerű aszinkron függvény, amelyet te valósítasz meg. A tiptapify maga nem hív meg semmilyen API-t — bármi működik, ami képes OpenAI-kompatibilis `request` objektumot fogadni (fetch, SDK, backend adapter). A kivétel az `aiEndpoint` backend mód (lásd [Backend generálás](#backend-generation-aiendpoint)), ahol a tiptapify a kérést a te végpontodnak küldi.

A **kérés** (`TiptapifyAiRequest`) a `chatCompletionOptions` értékeidből áll össze, majd a plugin kiegészíti:

| Mező | Forrás |
| --- | --- |
| `messages` | `createMessages(context)`, ha meg van adva, különben az alapértelmezett pár: egy rendszerüzenet (a te `systemPrompt` értéked vagy egy beépített alapérték) és egy felhasználói üzenet, amely a promptot, a kijelölt szerkesztőszöveget a körülötte lévő szöveggel, valamint azt a szabályt tartalmazza, hogy csak a kijelölésre válaszoljon (vagy a teljes szövegre, ha nincs kijelölés) |
| `model` | a `model` opció, ha be van állítva |
| `temperature` | a `temperature` opció, ha be van állítva |
| `stream` | a `stream` opció vagy a `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | a gondolkodás kapcsoló / a mérték legördülő menü — lásd alább |

A **kontextus** (`TiptapifyAiEditorContext`) a szolgáltatónak a szerkesztő teljes állapotát adja: `prompt`, `selectedText`, `textBefore` / `textAfter` (a kijelölés bekezdésének szövege körülötte, mindkét irányban legfeljebb 500 karakter), `text`, `html`, `json` és `mode` (`insert` / `replace` / `append`).

Az a kijelölés, amely szón belül kezdődik vagy végződik, a teljes szót átveszi, és az alapértelmezett üzenetek a kijelölés körüli szöveget is elküldik azzal a szabállyal, hogy csak a kijelölésre válaszoljon: ha csak egy töredéket kap, a modell azt a teljes szövegnek veszi, és kiegészíti, a csere pedig megismételné azt, ami a kijelölés után következik.

A **válasz**: a szolgáltató a tartalmat visszaadhatja sima `string`-ként, `{ content }` alakban (`TiptapifyAiResponse`), vagy OpenAI-kompatibilis `choices` adatcsomagként (`TiptapifyAiOpenAiResponse`). A párbeszédablak ebben a sorrendben nyeri ki a tartalmat, és levágja a kezdő szóközöket. Elutasítás esetén a hibaüzenet megjelenik a párbeszédablakban (vagy az `ai.error`, ha a hiba nem `Error` példány), és a párbeszédablak nyitva marad.

## Backend generálás (`aiEndpoint`) {#backend-generation-aiendpoint}

`aiProvider` megvalósítása helyett az AI funkciót egy backend LLM végpontra is irányíthatod:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

A tiptapify ekkor maga építi fel a kérést, és elküldi a végpontnak. Ha mindkettő be van állítva, az explicit `aiProvider` mindig elsőbbséget élvez.

**Kérés** — minimális JSON adatcsomag (`TiptapifyAiBackendRequest`):

| Mező | Mikor kerül elküldésre |
| --- | --- |
| `prompt` | mindig — a párbeszédablakban begépelt kérés |
| `instruction` | mindig — a te `systemPrompt` értéked, egy egyéni `createMessages` rendszerüzenete vagy a beépített alapérték |
| `stream` | csak `stream: true` esetén |
| `thinking` | csak ha a párbeszédablak **Gondolkodás** kapcsolója be van kapcsolva |
| `reasoning_effort` | csak ha a felhasználó szintet választott (nem `default`) |
| `model` | csak ha a `model` opció be van állítva |

**Válasz** — megengedően fogadott: sima szöveg, `{ content }` objektum vagy OpenAI-kompatibilis `choices` adatcsomag.

**Streamelés** — ha a kérésben `stream: true` szerepel, a válasz törzsét SSE streamként olvassa (`data:` sorok, `data: [DONE]` zárással). Az elfogadott chunk-formátumok:

- OpenAI-stílus — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Egyszerű — `data: {"type":"content"|"reasoning","data":"…"}`
- Lapos — `data: {"content":"…","reasoning_content":"…"}`
- Sima szöveg — `data: some text` (a nem JSON `data` sor tartalom-chunk)

A `content` chunkok az `onChunk` révén frissítik az eredménymezőt, a `reasoning_content` chunkok az `onReasoning` révén a **Gondolkodás** panelt táplálják. Ha a backend figyelmen kívül hagyja a `stream` értéket, és sima törzzsel válaszol, ez a törzs kerül felhasználásra. A **Leállítás** kattintás vagy a párbeszédablak bezárása megszakítja a kérést; a részben streamelt tartalom megmarad az eredménymezőben.

**Fejlécek** — az `aiHeaders` (`Record<string, string>`) a `Content-Type: application/json` fölé olvad. Az `aiHeaders` értékében szereplő `Authorization` fejléc változatlanul megmarad; ellenkező esetben a `tokenProvider` tokenje `Authorization: Bearer <token>` formában kerül elküldésre.

**Hibák** — a nem OK válasz esetén a backend hibaüzenete (JSON `{ error }` / `{ message }` vagy a nyers törzs) megjelenik a párbeszédablakban.

## Streamelés {#streaming}

Ha `stream: true` (vagy a `chatCompletionOptions.stream` értéke `true`), a párbeszédablak egy `TiptapifyAiStream` objektumot ad át harmadik argumentumként:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — add át a `fetch`-nek (vagy az SDK-hívásnak). Megszakad, ha a felhasználó a **Leállítás** gombra kattint vagy bezárja a párbeszédablakot, így a folyamatban lévő kérések nem futnak tovább.
- **`onChunk`** — fűzd hozzá az egyes tartalom-chunkokat az eredménymezőhöz. Generálás közben az eredménymező csak olvasható, és a részben streamelt tartalom megmarad (leállíthatod, majd beillesztheted vagy elvetheted).
- **`onReasoning`** — továbbítsd a modell gondolkodási kimenetét (pl. a Qwen/DeepSeek/o-sorozat `reasoning_content` deltáját) az eredmény fölötti összecsukható **Gondolkodás** panelnek. A panel streamelés közben automatikusan kinyílik és görget. A gondolkodási kimenet csak megjelenítésre szolgál, és soha nem kerül be a szerkesztőbe.

A nem streamelő szolgáltatók figyelmen kívül hagyják a `stream` argumentumot — az opcionális.

## Gondolkodás és gondolkodási mérték {#thinking-and-reasoning-effort}

A párbeszédablak két felhasználói vezérlője kérésmezőkre képeződik le. Mindkettő opcióval kapcsolható be, és a plugin birtokolja őket — ezeket a mezőket nem te állítod (és nem is szabad) a `chatCompletionOptions`-ben.

- **`thinking: true`** megjeleníti a **Gondolkodás** kapcsolót (alapból bekapcsolva, minden párbeszédablak-megnyitáskor visszaáll). A plugin a kapcsoló értékét `enable_thinking: true | false` formában írja a kérésbe.
- **A hiányzó `thinking` vagy a `thinking: false`** elrejti a kapcsolót, és a plugin `enable_thinking: false` értéket küld, így az alapból gondolkodó modellek nem gondolkodnak.
- **`reasoningEffort: { options, default? }`** megjeleníti a **Gondolkodási mérték** legördülő menüt. Az `options` a felkínálni kívánt egyéni szinteket sorolja fel (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); a bővítmény maga mindig hozzáad egy `default` elemet (a gondolkodó mód alapszintje), ezért a konfigurációdban soha nem kell felsorolnod a `default` értéket. A `default` mező a párbeszédablak megnyitásakor előre kijelöli az egyik egyéni szintedet — ha hiányzik, a `default` van előre kijelölve. Az érték minden megnyitáskor visszaáll. A legördülő menü csak akkor jelenik meg, ha az `options` nem üres lista, a `thinking` engedélyezett, és a Gondolkodás kapcsoló be van kapcsolva.
- **`showReasoning`** (alapértelmezés: `false`) az összecsukható **Gondolkodás** panelt vezérli, amely a modell gondolkodási folyamatát streameli (a `reasoning_content` delta). Állítsd `showReasoning: true` értékre, hogy a panel látható legyen, miközben a gondolkodás bekapcsolva marad — a modell továbbra is gondolkodik, az eredmény ugyanúgy érvényesül, csak a lépésenkénti gondolkodás is megjelenik.

Mivel a szolgáltatók (különösen a vLLM/LM Studio) elutasítják az `enable_thinking` és a `reasoning_effort` együttes küldését egyetlen kérésben, a plugin a kettő közül pontosan egyet küld:

| Állapot | Kérésmező |
| --- | --- |
| Gondolkodás be, mérték = `default` (vagy nincs mérték beállítva) | `enable_thinking` (a kapcsolóból) |
| Gondolkodás be, mérték = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (a legördülő menüből); a kapcsoló le van tiltva |
| Gondolkodás ki (a kapcsoló ki van kapcsolva, vagy a `thinking` nincs engedélyezve a konfigurációban) | `enable_thinking: false`; a `reasoning_effort` nem kerül elküldésre |

## Hibák {#errors}

A párbeszédablak a nyers hiba helyett elmagyarázza a sikertelen kérést, és utána hozzáadja a szolgáltatás saját üzenetét:

| Mi történt | Magyarázat |
| --- | --- |
| A böngésző nem kapott választ (`Failed to fetch`, `NetworkError…`, `Load failed`) | A szolgáltatás nem működik, nem érhető el, vagy a CORS blokkolta a választ; a böngészőkonzol megmondja, melyik |
| `401` / `403` | Ellenőrizd az API-kulcsot vagy a hozzáférési jogokat |
| `404` | Ellenőrizd a végpont útvonalát |
| `408` / `504` / időtúllépés | A szolgáltatás nem válaszolt időben |
| `429` | Túl sok kérés |
| `5xx` | A szolgáltatás nem elérhető (modellt tölt, foglalt) |

Az `aiEndpoint` esetén a státusz a válaszból származik. Az egyéni `aiProvider` ugyanezeket a magyarázatokat kapja, ha `status` mezős hibát dob:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Bármely más hiba a saját üzenetével jelenik meg.

## Az eredmény beszúrása {#inserting-the-result}

A műveletgombra — **Beillesztés**, **Csere** vagy **Hozzáadás a végéhez**, a módtól függően — kattintva a párbeszédablak a `result` értéket a szerkesztőbe helyezi:

- **Mód** — a párbeszédablak műveletgombja osztott gomb. A fő rész az eredményt az előre kijelölt módban alkalmazza (**Beillesztés** / **Csere** / **Hozzáadás a végéhez**): a `mode` opció jelöli ki előre, vagy a **Csere**, ha a párbeszédablak megnyitásakor ki volt jelölve szöveg, egyébként a **Beillesztés**. A gomb jobb oldalán egy kis „több” (⋮) rész megnyit egy menüt a többi móddal — egyre kattintva az eredmény azonnal abban a módban érvényesül. A **Beillesztés** az eredményt a kurzorhoz helyezi, a **Csere** a kijelölt szöveget cseréli (a **Generálás** kattintásakor rögzítve), a **Hozzáadás a végéhez** pedig a dokumentum végére fűzi.
- **Karakterkorlát** — ha a szerkesztő `limit` értékkel van konfigurálva (a `CharacterCount` bővítmény elutasít minden olyan nem beillesztési tranzakciót, amely a dokumentumot a korlát fölé növelné), az eredménymező alatt `generated / limit` karakterszámláló jelenik meg (streamelés közben élőben, a korlát túllépésekor halvány pirosan), és a párbeszédablak a generálás után rögtön megjeleníti az `ai.limit_exceeded` figyelmeztetést, ha az eredmény túllépné a korlátot. A **Beillesztés** gomb és az alternatív módok menüje ilyenkor le van tiltva: az eredmény csak egészben alkalmazható, ezért alkalmazás előtt rövidítened kell.