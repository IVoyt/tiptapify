# Propok {#props}

## `<Tiptapify>` propok {#tiptapify-props}

### `content` {#content}

- **Típus:** `String | Object`
- **Alapérték:** `''`

A szerkesztő kezdeti tartalma. HTML-szöveget vagy Tiptap JSON objektumot fogad.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

A `content` csak a **kezdeti** tartalom; a kétirányú kötéshez használd a `v-model`-t (lásd `modelValue`).

### `modelValue` {#modelvalue}

- **Típus:** `String | Object`
- **Alapérték:** `''`

A `v-model` kétirányú kötési értéke. A `v-model` segítségével egy reaktív értéket tarthatsz szinkronban a szerkesztővel. Minden szerkesztéskor a komponens `update:modelValue` eseményt bocsát ki a legfrissebb HTML-lel, amelyet a `v-model` visszaír a ref-edbe. Ha csak `v-model` van használatban (`:content` nélkül), a kötött érték a szerkesztő kezdeti tartalma.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>Hello, world!</p>')
</script>

<template>
  <Tiptapify v-model="content" placeholder="Write something..." />
</template>
```



### `placeholder` {#placeholder}

- **Típus:** `String`
- **Alapérték:** `''`

Helyőrző szöveg, amely üres szerkesztőnél jelenik meg.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Típus:** `Number`
- **Alapérték:** `null`

A szerkesztő tartalomterületének minimális magassága pixelben.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Típus:** `Boolean`
- **Alapérték:** `true`

Az eszköztár megjelenítése vagy elrejtése.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Típus:** `Array<String> | Object`
- **Alapérték:** `[]`

A megjelenítendő eszköztárelemek. Adj át elemneveket tartalmazó tömböt vagy elnevezett szakaszokat tartalmazó objektumot. Lásd [Eszköztárelemek](/hu/api/toolbar-items).
Tömbben a `'|'` csoportokra bontja az elemeket (ebben a sorrendben, akármelyik szakaszból is jönnek a gombok), a `'~'` pedig a utána következő elemeket az eszköztár végére tolja. Csoportok esetén a nem beépített elemnév helyet tart fenn a `customExtensions` azonos nevű egyéni gombjának; ha nincs ilyen gomb, a hely elhagyásra kerül.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Típus:** `Boolean`
- **Alapérték:** `false`

`true` esetén az `items` prop a **kizárandó** elemeket adja meg a belefoglalandók helyett.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Típus:** `Boolean`
- **Alapérték:** `true`

A buborékmenü megjelenítése szöveg kijelölésekor: egy sor ikongomb csoportokban — félkövér, dőlt, aláhúzott, áthúzott | felső index, alsó index | kiemelés, beágyazott kód | hivatkozás | formázás törlése. Minden gombnak van súgója a billentyűparancsával, és jelzi, ha a jelölése be van kapcsolva a kijelölésen. Elrejtőzik kijelölt blokknál (kép, widget), kódon belül, és ha a teljes dokumentum ki van jelölve.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Típus:** `Boolean`
- **Alapérték:** `true`

A lebegő menü megjelenítése üres sorokon: 1. címsor, 2. címsor és felsorolás, ugyanabban az ikongomb-sorban, mint a buborékmenü.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Típus:** `Boolean`
- **Alapérték:** `true`

A perjeles parancsok menüjének engedélyezése (a megnyitáshoz írj `/` jelet).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Típus:** `Boolean`
- **Alapérték:** `true`

Szószám megjelenítése a szerkesztő láblécében.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Típus:** `Boolean`
- **Alapérték:** `true`

Karakterszám megjelenítése a szerkesztő láblécében.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Típus:** `Number | null`
- **Alapérték:** `null`

A Tiptap `CharacterCount` bővítménye által megengedett karakterek maximális száma. Állítsd `null`-ra, vagy hagyd el a propot a korlátlan szerkesztéshez. Ha `0`-nál nagyobb értékre van állítva, a lábléc SVG körös folyamatjelzőt mutat színkódolt küszöbökkel.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Típus:** `String`
- **Alapérték:** `'purple'`

A láblécben megjelenő körös folyamatjelző alapértelmezett színe, ha a `limit` be van állítva.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Típus:** `String`
- **Alapérték:** `'orange'`

A folyamatjelző színe, ha a használat meghaladja a korlát 75%-át.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Típus:** `String`
- **Alapérték:** `'red'`

A folyamatjelző színe, ha a karakterkorlátot elérték.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Típus:** `TiptapifyFooterAlignment`
- **Alapérték:** `'end'`

A lábléc állapotelemeinek igazítása. Elfogadott értékek: `'start'`, `'center'` vagy `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Típus:** `Boolean | TiptapifyAiOptions`
- **Alapérték:** `false`

Engedélyezi az `ai` eszköztárelemet. A szerkesztő OpenAI-kompatibilis `/v1/chat/completions` kérést épít, és átadja az `aiProvider`-nek. A szolgáltatói visszahívással hívhatod meg a backendedet, BFF-edet, OAuth-védett végpontodat, az LM Studiót vagy egy SDK-burkolót.

```vue
<script setup lang="ts">
const ai = {
  async aiProvider(request) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error('AI request failed')
    }

    return response.json()
  },
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

Helyi LLM LM Studio példa:

```ts
const ai = {
  model: 'google/gemma-4-12b-qat',
  async aiProvider(request) {
    const response = await fetch('http://127.0.0.1:1234/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    return response.json()
  },
}
```

A streamelt kimenet támogatott a `stream: true` beállításával és a tokenek az `aiProvider` `stream` argumentumán keresztüli betolásával. Az AI-párbeszédablak eredménymezője élőben frissül a chunkok érkezésekor, a **Leállítás** gomb pedig megszakítja a folyamatban lévő kérést:

```ts
const ai = {
  stream: true,
  async aiProvider(request, context, stream) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal: stream?.signal,
    })

    if (!response.ok || !response.body) {
      throw new Error('AI request failed')
    }

    let content = ''
    let buffer = ''
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        if (!line.startsWith('data: ') || line === 'data: [DONE]') {
          continue
        }

        const { choices } = JSON.parse(line.slice(6))
        const delta = choices?.[0]?.delta ?? {}

        if (delta.reasoning_content) {
          stream?.onReasoning(delta.reasoning_content)
        }

        const chunk = delta.content ?? ''

        if (chunk) {
          content += chunk
          stream?.onChunk(chunk)
        }
      }
    }

    return { content }
  },
}
```

Add át a `stream.signal` értéket a `fetch`-nek (vagy az SDK-hívásnak), hogy a kérés megszakadjon, amikor a felhasználó a **Leállítás** gombra kattint vagy bezárja a párbeszédablakot. A részben streamelt tartalom az eredménymezőben marad, és alkalmazható vagy elvethető. A nem streamelő szolgáltatók teljesen figyelmen kívül hagyhatják a `stream` argumentumot — az opcionális és visszafelé kompatibilis.

A gondolkodó modellek (Qwen thinking, DeepSeek, o-sorozat) a „gondolataikat” külön `reasoning_content` deltában streamelik. Továbbítsd ezeket a chunkokat a `stream.onReasoning()`-en keresztül — `showReasoning: true` esetén a párbeszédablak az eredménymező fölötti összecsukható **Gondolkodás** panelben jeleníti meg őket (a panel alapból rejtett). A gondolkodási kimenet csak megjelenítésre szolgál, és soha nem kerül be a szerkesztőbe.

Ha a felhasználó kéréseként szeretnéd átváltani a modell gondolkodó módját, állítsd be a `thinking: true` értéket az AI opciókban. A párbeszédablak ekkor **Gondolkodás** kapcsolót mutat (alapból bekapcsolva, minden megnyitáskor visszaáll); a plugin a kapcsoló értékét `enable_thinking: true | false` formában írja a kérésbe, így többé nem kell (és nem is szabad) magadnak beállítanod az `enable_thinking` értéket a `chatCompletionOptions`-ben:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
  }"
/>
```

Ha a `thinking` értéke `false` vagy hiányzik, a kapcsoló nem jelenik meg, és a plugin `enable_thinking: false` értéket küld, így az alapból gondolkodó modellek (Qwen3, DeepSeek, …) nem gondolkodnak.

Ha a felhasználó kérésenként választhatja a gondolkodási mértéket, állítsd be a `reasoningEffort` értéket az AI opciókban. A párbeszédablak ekkor **Gondolkodási mérték** legördülő menüt mutat, amelyet az `options` tölt fel — egyéni mértékszintek (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
A bővítmény maga mindig hozzáad egy `default` elemet a legördülő menühöz (a gondolkodó mód alapszintje), ezért a konfigurációdban soha nem kell felsorolnod a `default` értéket; az opció `default` mezője a párbeszédablak megnyitásakor előre kijelöli az egyik egyéni szintedet (egyébként a `default` van előre kijelölve), és az érték minden megnyitáskor visszaáll.
A kiválasztott érték dönti el, mit ír a plugin a kérésbe: a `default` megtartja a gondolkodó módot — a **Gondolkodás** kapcsoló aktív marad, és az `enable_thinking`-et vezérli; bármely más érték helyette `reasoning_effort` formában kerül elküldésre, és a Gondolkodás kapcsoló le van tiltva, amíg ez az érték van kiválasztva (a szolgáltatók elutasítják az `enable_thinking` és a `reasoning_effort` együttes küldését egyetlen kérésben).
A legördülő menü csak akkor jelenik meg, ha a `thinking` engedélyezett, és a Gondolkodás kapcsoló be van kapcsolva — a gondolkodás kikapcsolása elrejti, és a `reasoning_effort` nem kerül elküldésre (a kérés `enable_thinking: false` értékre esik vissza). Ha az `options` hiányzik vagy üres, a legördülő menü egyáltalán nem renderelődik:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    reasoningEffort: {
      options: ['low', 'medium', 'high', 'xhigh', 'max'],
    },
  }"
/>
```

A **Gondolkodás** panel alapból rejtett (a `showReasoning` alapértéke `false`). Állítsd a `showReasoning: true` értékre, hogy megjelenjen egy összecsukható panel, amely a modell gondolkodási folyamatát (`reasoning_content` delta) streameli, miközben a gondolkodás bekapcsolva marad — a modell továbbra is gondolkodik, az eredmény ugyanúgy érvényesül, csak a lépésenkénti gondolkodás is megjelenik:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    showReasoning: true,
  }"
/>
```

Az egyéni prompt-példák felülírják a lokalizált alapértékeket:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    promptExamples: [
      { title: 'Rewrite', prompt: 'Rewrite this in a direct tone.' },
      { title: 'Shorten', prompt: 'Make this shorter.' },
      { title: 'Explain', prompt: 'Explain this for a beginner.' },
    ],
  }"
/>
```

A `tokenProvider` és a `storage` opcionális, a fogyasztó által birtokolt hookok közvetlen böngészős integrációkhoz. A böngészőkódban vagy böngészőtárhelyen lévő API-kulcsok vagy szolgáltatói tokenek láthatók a felhasználók számára, és nem kezelhetők titokként. Éles titkokhoz részesítsd előnyben a fenti backend adapter mintát.

A `mode: 'insert' | 'replace' | 'append'` használatával előre kijelölheted a beszúrási módot a párbeszédablak műveletgombján (**Beillesztés** / **Csere** / **Hozzáadás a végéhez**). `mode` nélkül a gomb alapértelmezése a **Csere**, ha a párbeszédablak megnyitásakor ki volt jelölve szöveg, egyébként a **Beillesztés**. A műveletgomb osztott gomb: a fő rész az eredményt az előre kijelölt módban alkalmazza, a jobb oldalán lévő kis „több” (⋮) rész pedig megnyit egy menüt a többi móddal — egyre kattintva az eredmény azonnal abban a módban érvényesül.

Ha a szerkesztőnek van `limit` értéke (karakterszám-korlát), az eredménymező alatt `generated / limit` karakterszámláló jelenik meg, amint eredmény keletkezik (streamelés közben élőben frissül, és halvány pirosra vált, ha a korlát túllépődne).
A párbeszédablak a generálás után rögtön megjeleníti az `ai.limit_exceeded` figyelmeztetést is, ha az AI kimenete túllépné a korlátot.
Ebben az állapotban a **Beillesztés** gomb és az alternatív módok menüje le van tiltva — a `CharacterCount` bővítmény elutasít minden beszúrást, amely a dokumentumot a korlát fölé növelné, ezért az eredmény csak egészben alkalmazható: teljesen beszúródik, ha belefér, vagy egyáltalán nem szúródik be, ha túllépi a korlátot.
Rövidítsd az eredményt a művelet újbóli engedélyezéséhez:

```vue
<Tiptapify
  :content="content"
  :limit="300"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
  }"
/>
```

A `systemPrompt`, `temperature`, `chatCompletionOptions` vagy `createMessages(context)` használatával szabhatod testre az OpenAI-kompatibilis chat-completions kérést. A `context` tartalma: `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: a `textBefore` / `textAfter` a kijelölés bekezdésének szövege körülötte (mindkét irányban legfeljebb 500 karakter, kijelölés nélkül üres) — küldd el őket a kijelöléssel együtt, különben a modell a töredéket a teljes szövegnek veszi, és kiegészíti.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Típus:** `String`
- **Alapérték:** `undefined`

Az egyéni `aiProvider` alternatívája: irányítsd az AI funkciót egy backend LLM végpontra, és a tiptapify maga építi fel és küldi el a kérést. A backend minimális JSON adatcsomagot kap:

- **Mindig:** `prompt` (a párbeszédablakban begépelt kérés) és `instruction` (a te `systemPrompt` értéked, egy egyéni `createMessages` rendszerüzenete vagy a beépített alapérték).
- **Opcionális, csak beállítás esetén küldve:** `stream` (csak `true`), `thinking` (a párbeszédablak **Gondolkodás** kapcsolója, csak `true`), `reasoning_effort` (a kiválasztott mértékszint) és `model`.

A válasz megengedően fogadott: sima szöveg, `{ content }` objektum vagy OpenAI-kompatibilis `choices` adatcsomag. Ha a kérésben `stream: true` szerepel, a válasz törzsét SSE streamként olvassa (`data:` sorok, `data: [DONE]` zárással): az OpenAI-stílusú deltákat (`choices[0].delta.content` / `.reasoning_content`), az egyszerű `{ type: 'content' | 'reasoning', data }` chunkot, a lapos `{ content, reasoning_content }` chunkot és a sima szöveges `data` sorokat egyaránt elfogadja. Ha a backend figyelmen kívül hagyja a `stream` értéket, és sima törzzsel válaszol, ez a törzs kerül felhasználásra. A nem OK válasz esetén a backend hibaüzenete (JSON `{ error }` / `{ message }` vagy a nyers törzs) megjelenik a párbeszédablakban. A **Leállítás** gomb és a párbeszédablak bezárása megszakítja a folyamatban lévő kérést; a részben streamelt tartalom megmarad az eredménymezőben.

Ha az `aiProvider` és az `aiEndpoint` is be van állítva, az `aiProvider` győz.

```vue
<script setup lang="ts">
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
  thinking: true,
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

### `ai.aiHeaders` {#ai-aiheaders}

- **Típus:** `Record<string, string>`
- **Alapérték:** `undefined`

Az `aiEndpoint` kéréssel elküldött extra fejlécek, a `Content-Type: application/json` fölé olvasztva. Az itt beállított `Authorization` fejléc változatlanul megmarad; ellenkező esetben a `tokenProvider` tokenje (ha be van állítva) `Authorization: Bearer <token>` formában kerül elküldésre.

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiEndpoint: '/api/ai/generate',
    aiHeaders: { 'X-Api-Key': '…' },
  }"
  :items="['ai']"
/>
```

### `defaultFontFamily` {#defaultfontfamily}

- **Típus:** `String`
- **Alapérték:** `'Inter'`

A szerkesztőtartalom alapértelmezett betűcsaládja.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Típus:** `String`
- **Alapérték:** `'px'`

A betűméret-értékek mértékegysége.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Típus:** `String`
- **Alapérték:** `'0'`

A szerkesztőtároló szegélylekerekítése. Vuetify lekerekítési értékeket fogad (`sm`, `md`, `lg`, `xl`, `pill` stb.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Típus:** `variantBtnTypes`
- **Alapérték:** `'tonal'`

Vuetify gombváltozat az eszköztárgombokhoz. Az érték a szerkesztő konfigurációján keresztül megosztott minden eszköztár-komponenssel — az egyéni komponensek a [`useTiptapifyConfig`](/hu/api/types#usetiptapifyconfig) segítségével olvashatják. Lásd [`variantBtnTypes`](/hu/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Típus:** `variantFieldTypes`
- **Alapérték:** `'outlined'`

Vuetify változat az eszköztár legördülő mezőihez. Az érték a szerkesztő konfigurációján keresztül megosztott minden eszköztár-komponenssel — az egyéni komponensek a [`useTiptapifyConfig`](/hu/api/types#usetiptapifyconfig) segítségével olvashatják. Lásd [`variantFieldTypes`](/hu/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Típus:** `Array<toolbarSections>`
- **Alapérték:** `[]`

Egyéni eszköztár-szakaszok megadása eszköztárelemek bővítéséhez vagy hozzáadásához. Az egyes szakaszok komponensei a [`useTiptapifyConfig`](/hu/api/types#usetiptapifyconfig) segítségével olvashatják a megosztott szerkesztőkonfigurációt. Lásd [Egyéni eszköztár](/hu/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Típus:** `Boolean`
- **Alapérték:** `true`

Az interaktív stílusalkalmazás engedélyezése.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Típus:** `Boolean`
- **Alapérték:** `false`

Határozatlan folyamatjelző megjelenítése, amíg a szerkesztő betöltődik.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Típus:** `String`
- **Alapérték:** `'default'`

A betöltési folyamatjelző színe. Vuetify témaszín-értékeket fogad.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Típus:** `String`
- **Alapérték:** `'1px'`

A betöltési folyamatjelző magassága.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Típus:** `Number`
- **Alapérték:** `0`

Ennyi egymás utáni kép esetén (köztük semmivel) a szerkesztő számozott, háromoszlopos rácsban rendezi el őket, olyan webhelyeknek, amelyek az ilyen képeket diavetítésként mutatják. A `0` kikapcsolja.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Típus:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/hu/api/types#tiptapifyskininput))
- **Alapérték:** `'default'`

A szerkesztő keretének megjelenése: eszköztár, buborékmenük, legördülő menük, párbeszédablakok, lábléc.

- `default` — a klasszikus megjelenés: kiemelt eszköztár, kiemelt dobozként megjelenő gombcsoportok, elsődleges színű lenyomott állapotú Vuetify-gombok.
- `pastel` — a nyugodt megjelenés: lapos, színezett eszköztár vékony vonal alatt, semleges lenyomott állapotú áttetsző gombok, könnyű legördülő menük, lágy párbeszédablakok.

A funkciók (képaláírások, diavetítők, az igazítás legördülő menü, listastílusok) mindkét skinben ugyanúgy működnek.

```vue
<Tiptapify skin="pastel" />
```

Beágyazott skin-objektumot is átadhatsz: tokenfelülírásokat (`colors` / `metrics`) és alakzatjelzőket, opcionálisan egy regisztrált skin `extends` értékével. A `default` (vagy az alapja) fölött oldódik fel, a `tiptapify-skin-inline` osztály alatt renderelődik (`tiptapify-skin-{name}`, ha az objektum `name` mezőt tartalmaz), tokenjei pedig `--tf-*` CSS-változókként kerülnek a szerkesztő gyökerére. Az egyéni nevek a `registerSkin('mint', { … })` hívásból származnak — a tokentáblázatot és a recepteket lásd a [Skin útmutatóban](/hu/guide/skins).

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Típus:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/hu/api/types#tiptapifyuploadoptions))
- **Alapérték:** `null`

A [feltöltések](/hu/guide/uploads) végpontja: a kép- és videópárbeszédablakban kiválasztott fájlok (valamint a videó borítóképe, a hivatkozáskártya képe) a `POST {endpoint}` kéréssel (multipart `file` és `kind`) kerülnek elküldésre, a dokumentum pedig a válaszul kapott URL-t őrzi meg (`{ "url": … }`).

Nélküle a képpárbeszédablak továbbra is fogad fájlt: a kiválasztott kép (és a videó borítóképe) base64 data URL-ként ágyazódik be a dokumentumba, és a base64 képek megmaradnak a dokumentum betöltésekor. A videópárbeszédablak csak ezzel a proppal kínálja a **Feltöltés** lehetőséget. Beállított `upload` esetén a base64 képek eltűnnek a dokumentum betöltésekor.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Típus:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/hu/api/types#tiptapifycontentstyles))
- **Alapértelmezett:** `'inline'`

Hogyan hordozza a mentett HTML a linkkártyák, a feliratos képek, a videók, a beágyazások és a feladatlisták megjelenését (lásd [Tartalomstílusok](/hu/guide/content-styles)): az `inline` a `style` attribútumaikba írja, így az oldal úgy jeleníti meg a HTML-t, ahogy van; a `classes` csak osztályokat hagy, a `tiptapify/content.css` fájlt betöltő oldalhoz. A szerkesztő figyelmen kívül hagyja ezeket a stílusokat a HTML betöltésekor, így mindkét fajta HTML ugyanúgy töltődik vissza.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Típus:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/hu/api/types#tiptapifylinkpreviewoptions))
- **Alapérték:** `null`

A [hivatkozáskártyák](/hu/guide/link-cards) backend végpontja: beolvassa az oldalak OpenGraph adatait, amit a böngésző nem tud (CORS). A szerkesztő induláskor kézfogással ellenőrzi (a `GET {endpoint}` kérésre `200 { "tiptapifyLinkPreview": 1 }` választ kell adnia); amíg nem válaszol, semmi nem kínál kártyát.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Események {#events}

### `editor-ready` {#editor-ready}

Akkor aktiválódik, amikor a szerkesztő példány kész.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string  // Get current HTML content
  getJSON: () => object  // Get current JSON content
}
```

```vue
<script setup lang="ts">
const onEditorReady = (payload) => {
  console.log(payload.editor)
  console.log(payload.getHTML())
  console.log(payload.getJSON())
}
</script>

<template>
  <Tiptapify @editor-ready="onEditorReady" />
</template>
```

### `content-changed` {#content-changed}

Akkor aktiválódik, amikor a szerkesztő tartalma megváltozik.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

```vue
<script setup lang="ts">
const onContentChanged = ({ html, json }) => {
  console.log('HTML:', html)
  console.log('JSON:', json)
}
</script>

<template>
  <Tiptapify @content-changed="onContentChanged" />
</template>
```

### `update:modelValue` {#update-modelvalue}

Támogatja a `v-model` kötést.

```vue
<script setup lang="ts">
import { ref } from 'vue'
const content = ref('<p>Hello</p>')
</script>

<template>
  <Tiptapify v-model="content" />
</template>
```

## Provide / Inject {#provide-inject}

A szerkesztő példány és a `t` függvény a Vue provide/inject mechanizmusán keresztül érhető el:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
