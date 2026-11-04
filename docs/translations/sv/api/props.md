# Props {#props}

## `<Tiptapify>`-props {#tiptapify-props}

### `content` {#content}

- **Typ:** `String | Object`
- **Standard:** `''`

Initialt redigerarinnehåll. Accepterar en HTML-sträng eller ett Tiptap JSON-objekt.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` är bara det **initiala** innehållet; för dubbelriktad bindning använd `v-model` (se `modelValue`).

### `modelValue` {#modelvalue}

- **Typ:** `String | Object`
- **Standard:** `''`

Värde för dubbelriktad bindning med `v-model`. Använd `v-model` för att hålla ett reaktivt värde synkroniserat med redigeraren. Vid varje redigering skickar komponenten `update:modelValue` med den senaste HTML:en, som `v-model` skriver tillbaka till din ref. När bara `v-model` används (ingen `:content`) är det bundna värdet redigerarens initiala innehåll.

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

- **Typ:** `String`
- **Standard:** `''`

Platshållartext som visas när redigeraren är tom.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Typ:** `Number`
- **Standard:** `null`

Minimihöjd för redigerarens innehållsyta i pixlar.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Typ:** `Boolean`
- **Standard:** `true`

Visa eller dölj verktygsfältet.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Typ:** `Array<String> | Object`
- **Standard:** `[]`

Verktygsfältsobjekt som ska visas. Skicka en array med objektnamn eller ett objekt med namngivna sektioner. Se [Verktygsfältsobjekt](/sv/api/toolbar-items).
I en array delar `'|'` upp objekten i grupper (i den ordningen, oavsett vilka sektioner knapparna kommer från) och `'~'` skjuter objekten efter den till slutet av verktygsfältet. Med grupper behåller ett namn som inte är ett inbyggt objekt en plats för den egna knappen med det namnet från `customExtensions`; finns ingen sådan knapp tas platsen bort.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Typ:** `Boolean`
- **Standard:** `false`

När `true` anger propen `items` objekt som ska **uteslutas** i stället för inkluderas.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Typ:** `Boolean`
- **Standard:** `true`

Visa bubbelmenyn när text är markerad: en rad med ikonknappar i grupper — fet, kursiv, understruken, genomstruken | upphöjd, nedsänkt | markering, inbäddad kod | länk | rensa formatering. Varje knapp har en tooltip med sin genväg och visar när dess markering är aktiv i urvalet. Den döljs för ett markerat block (bild, widget), inuti kod och när hela dokumentet är markerat.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Typ:** `Boolean`
- **Standard:** `true`

Visa den flytande menyn på tomma rader: rubrik 1, rubrik 2 och en punktlista, i samma rad med ikonknappar som bubbelmenyn.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Typ:** `Boolean`
- **Standard:** `true`

Aktivera snedstreckskommandomenyn (skriv `/` för att öppna den).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Typ:** `Boolean`
- **Standard:** `true`

Visa ordantal i redigerarens sidfot.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Typ:** `Boolean`
- **Standard:** `true`

Visa teckenantal i redigerarens sidfot.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Typ:** `Number | null`
- **Standard:** `null`

Maximalt antal tecken som tillåts av Tiptap-tillägget `CharacterCount`. Ange `null` eller utelämna propen för obegränsad redigering. När den sätts till ett värde större än `0` visar sidfoten en cirkulär SVG-förloppsindikator med färgkodade tröskelvärden.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Typ:** `String`
- **Standard:** `'purple'`

Standardfärg för den cirkulära förloppsindikatorn i sidfoten när `limit` är angiven.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Typ:** `String`
- **Standard:** `'orange'`

Färg på förloppsindikatorn när användningen överstiger 75 % av gränsen.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Typ:** `String`
- **Standard:** `'red'`

Färg på förloppsindikatorn när teckengränsen har nåtts.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Typ:** `TiptapifyFooterAlignment`
- **Standard:** `'end'`

Justering av sidfotens statusobjekt. Accepterar `'start'`, `'center'` eller `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Typ:** `Boolean | TiptapifyAiOptions`
- **Standard:** `false`

Aktiverar verktygsfältsobjektet `ai`. Redigeraren bygger en OpenAI-kompatibel `/v1/chat/completions`-förfrågan och skickar den till `aiProvider`. Använd leverantörens callback för att anropa din backend, BFF, OAuth-skyddade endpoint, LM Studio eller SDK-omslag.

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

Exempel med lokal LLM i LM Studio:

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

Strömmande utdata stöds genom att sätta `stream: true` och skicka tokens via argumentet `stream` till `aiProvider`. Resultatfältet i AI-dialogen uppdateras live medan chunkar anländer, och en knapp **Stoppa** avbryter den pågående förfrågan:

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

Skicka `stream.signal` till `fetch` (eller ditt SDK-anrop) så att förfrågan avbryts när användaren klickar på **Stoppa** eller stänger dialogen. Delvis strömmat innehåll stannar kvar i resultatfältet och kan tillämpas eller förkastas. Leverantörer som inte strömmar kan helt ignorera argumentet `stream` — det är valfritt och bakåtkompatibelt.

Resonemangsmodeller (Qwen thinking, DeepSeek, o-serien) strömmar sina "tankar" i ett separat `reasoning_content`-delta. Vidarebefordra de chunkarna via `stream.onReasoning()` — när `showReasoning: true` renderar dialogen dem i en hopfällbar panel **Resonemang** ovanför resultatfältet (panelen är dold som standard). Resonemangsutdata är bara till för visning och infogas aldrig i redigeraren.

För att låta användaren växla modellens resonemangsläge per förfrågan, sätt `thinking: true` i AI-alternativen. Dialogen visar då en omkopplare **Resonemang** (på som standard, återställs vid varje öppning); pluginet skriver omkopplarens värde i förfrågan som `enable_thinking: true | false`, så du behöver inte (och bör inte) längre sätta `enable_thinking` själv i `chatCompletionOptions`:

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

När `thinking` är `false` eller utelämnas visas inte omkopplaren och pluginet skickar `enable_thinking: false`, så att modeller som resonerar som standard (Qwen3, DeepSeek, …) inte resonerar.

För att låta användaren välja resoneringsnivå per förfrågan, sätt `reasoningEffort` i AI-alternativen. Dialogen visar då en rullgardin **Resoneringsnivå** fylld från `options` — egna nivåer (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Tillägget lägger alltid själv till ett `default`-objekt i rullgardinen (utgångsnivån för resonemangsläget), så du listar aldrig `default` i din konfiguration; fältet `default` i alternativet förväljer en av dina egna nivåer när dialogen öppnas (annars är `default` förvalt), och värdet återställs vid varje öppning.
Det valda värdet avgör vad pluginet skriver i förfrågan: `default` behåller resonemangsläget — omkopplaren **Resonemang** förblir aktiv och styr `enable_thinking`; varje annat värde skickas i stället som `reasoning_effort`, och omkopplaren Resonemang är inaktiverad medan det värdet är valt (leverantörer avvisar `enable_thinking` och `reasoning_effort` i samma förfrågan).
Rullgardinen visas bara när `thinking` är aktiverat och omkopplaren Resonemang är på — att stänga av resonemang döljer den och `reasoning_effort` skickas inte (förfrågan faller tillbaka på `enable_thinking: false`). När `options` saknas eller är tom renderas rullgardinen inte alls:

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

Panelen **Resonemang** är dold som standard (`showReasoning` är `false` som standard). Sätt `showReasoning: true` för att visa en hopfällbar panel som strömmar modellens resoneringsprocess (deltat `reasoning_content`) medan resonemang förblir på — modellen resonerar fortfarande och resultatet tillämpas på samma sätt, bara det stegvisa resonemanget visas dessutom:

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

Egna promptexempel ersätter de lokaliserade standardvärdena:

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

`tokenProvider` och `storage` är valfria hooks som konsumenten äger, för direkta webbläsarintegrationer. API-nycklar eller leverantörstokens som placeras i webbläsarkod eller webbläsarlagring är synliga för användarna och får inte behandlas som hemligheter. Föredra backend-adaptermönstret ovan för produktionshemligheter.

Använd `mode: 'insert' | 'replace' | 'append'` för att förvälja infogningsläget på dialogens åtgärdsknapp (**Infoga** / **Ersätt** / **Lägg till i slutet**). Utan `mode` är knappen som standard **Ersätt** när text är markerad när dialogen öppnas och annars **Infoga**. Åtgärdsknappen är en delad knapp: huvuddelen tillämpar resultatet i det förvalda läget, och en liten "mer"-del (⋮) till höger öppnar en meny med de andra lägena — ett klick på ett av dem tillämpar resultatet i det läget direkt.

När redigeraren har en `limit` (teckengräns) visas en teckenräknare `generated / limit` under resultatfältet så snart ett resultat har genererats (den uppdateras live under strömning och blir mjukt röd när gränsen skulle överskridas).
Dialogen visar också varningen `ai.limit_exceeded` direkt efter genereringen om AI-utdata skulle överskrida gränsen.
I det tillståndet är knappen **Infoga** och dess meny för alternativa lägen inaktiverade — tillägget `CharacterCount` avvisar varje infogning som skulle få dokumentet att växa förbi gränsen, så resultatet tillämpas helt eller inte alls: det infogas helt när det ryms, eller inte alls när det överskrider gränsen.
Korta ned resultatet för att aktivera åtgärden igen:

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

Använd `systemPrompt`, `temperature`, `chatCompletionOptions` eller `createMessages(context)` för att anpassa den OpenAI-kompatibla chat-completions-förfrågan. `context` innehåller `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` är texten i markeringens stycke runt den (upp till 500 tecken vardera, tom utan markering) — skicka dem tillsammans med markeringen, annars tar en modell fragmentet för hela texten och fullbordar det.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Typ:** `String`
- **Standard:** `undefined`

Alternativ till en egen `aiProvider`: peka AI-funktionen mot en LLM-endpoint i backend så bygger och skickar tiptapify förfrågan själv. Backend tar emot en minimal JSON-payload:

- **Alltid:** `prompt` (begäran som skrivits i dialogen) och `instruction` (din `systemPrompt`, systemmeddelandet från en egen `createMessages` eller den inbyggda standarden).
- **Valfritt, skickas bara när det är angivet:** `stream` (bara `true`), `thinking` (dialogens omkopplare **Resonemang**, bara `true`), `reasoning_effort` (den valda nivån) och `model`.

Svaret accepteras tolerant: en vanlig sträng, ett `{ content }`-objekt eller en OpenAI-kompatibel `choices`-payload. När förfrågan har `stream: true` läses svarskroppen som en SSE-ström (`data:`-rader, avslutade med `data: [DONE]`): OpenAI-liknande deltan (`choices[0].delta.content` / `.reasoning_content`), en enkel chunk `{ type: 'content' | 'reasoning', data }`, en platt chunk `{ content, reasoning_content }` och `data`-rader med ren text accepteras alla. Om backend ignorerar `stream` och svarar med en vanlig kropp används den kroppen i stället. Ett svar som inte är OK visar backends felmeddelande (JSON `{ error }` / `{ message }` eller den råa kroppen) i dialogen. En knapp **Stoppa** och att stänga dialogen avbryter den pågående förfrågan; delvis strömmat innehåll behålls i resultatfältet.

Om både `aiProvider` och `aiEndpoint` är angivna vinner `aiProvider`.

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

- **Typ:** `Record<string, string>`
- **Standard:** `undefined`

Extra headers som skickas med `aiEndpoint`-förfrågan, sammanslagna över `Content-Type: application/json`. En `Authorization`-header som anges här behålls som den är; annars skickas en token från `tokenProvider` (när den är angiven) som `Authorization: Bearer <token>`.

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

- **Typ:** `String`
- **Standard:** `'Inter'`

Standardteckensnitt för redigerarens innehåll.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Typ:** `String`
- **Standard:** `'px'`

Måttenhet för teckenstorlekar.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Typ:** `String`
- **Standard:** `'0'`

Kantradie för redigerarens behållare. Accepterar Vuetify-radievärden (`sm`, `md`, `lg`, `xl`, `pill` osv.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Typ:** `variantBtnTypes`
- **Standard:** `'tonal'`

Vuetify-knappvariant för verktygsfältsknappar. Värdet delas med varje verktygsfältskomponent via redigerarens konfiguration — anpassade komponenter kan läsa det med [`useTiptapifyConfig`](/sv/api/types#usetiptapifyconfig). Se [`variantBtnTypes`](/sv/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Typ:** `variantFieldTypes`
- **Standard:** `'outlined'`

Vuetify-variant för verktygsfältets rullgardinsfält. Värdet delas med varje verktygsfältskomponent via redigerarens konfiguration — anpassade komponenter kan läsa det med [`useTiptapifyConfig`](/sv/api/types#usetiptapifyconfig). Se [`variantFieldTypes`](/sv/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Typ:** `Array<toolbarSections>`
- **Standard:** `[]`

Tillhandahåll egna verktygsfältssektioner för att utöka eller lägga till verktygsfältsobjekt. Varje sektions komponenter kan läsa den delade redigerarkonfigurationen med [`useTiptapifyConfig`](/sv/api/types#usetiptapifyconfig). Se [Anpassat verktygsfält](/sv/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Typ:** `Boolean`
- **Standard:** `true`

Aktivera interaktiv stiltillämpning.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Typ:** `Boolean`
- **Standard:** `false`

Visa en obestämd förloppsindikator medan redigeraren läses in.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Typ:** `String`
- **Standard:** `'default'`

Färg på inläsningens förloppsindikator. Accepterar Vuetify-temafärger.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Typ:** `String`
- **Standard:** `'1px'`

Höjd på inläsningens förloppsindikator.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Typ:** `Number`
- **Standard:** `0`

Från så här många bilder i rad (utan något emellan) lägger redigeraren ut dem som ett numrerat rutnät med tre kolumner, för webbplatser som visar sådana bilder som ett bildspel. `0` stänger av det.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Typ:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/sv/api/types#tiptapifyskininput))
- **Standard:** `'default'`

Utseendet på redigerarens gränssnitt: verktygsfält, bubbelmenyer, rullgardiner, dialoger, sidfot.

- `default` — det klassiska utseendet: ett upphöjt verktygsfält, knappgrupper som upphöjda rutor, Vuetify-knappar med ett primärt nedtryckt läge.
- `pastel` — det lugna utseendet: ett platt tonat verktygsfält under en hårfin linje, genomskinliga knappar med ett neutralt nedtryckt läge, lätta rullgardinsmenyer, mjuka dialogrutor.

Funktioner (bildtexter, bildspel, justeringsrullgardinen, liststilar) fungerar likadant i båda skinsen.

```vue
<Tiptapify skin="pastel" />
```

Du kan också skicka ett inline-skinobjekt: tokenåsidosättningar (`colors` / `metrics`) och formflaggor, och eventuellt `extends` en registrerad skin. Den löses upp över `default` (eller dess bas), renderas under klassen `tiptapify-skin-inline` (`tiptapify-skin-{name}` när objektet har ett `name`), och dess tokens hamnar som CSS-variabler `--tf-*` på redigerarens rot. Egna namn kommer från `registerSkin('mint', { … })` — se [Skins-guiden](/sv/guide/skins) för tokentabellen och recepten.

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Typ:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/sv/api/types#tiptapifyuploadoptions))
- **Standard:** `null`

Endpointen för [uppladdningar](/sv/guide/uploads): filer som väljs i bild- och videodialogerna (och en videoaffisch, bilden i ett länkkort) skickas dit med `POST {endpoint}` (multipart `file` och `kind`), och dokumentet behåller den URL som den svarar med (`{ "url": … }`).

Utan den tar bilddialogen ändå emot en fil: en vald bild (och en videoaffisch) bäddas in i dokumentet som en base64-data-URL, och base64-bilder behålls när dokumentet läses in. Videodialogen erbjuder **Ladda upp** bara med den här propen. När `upload` är angiven tas base64-bilder bort när dokumentet läses in.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Typ:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/sv/api/types#tiptapifycontentstyles))
- **Standard:** `'inline'`

Hur den sparade HTML-koden bär utseendet för länkkort, bilder med bildtexter, videor, inbäddningar och uppgiftslistor (se [Innehållsstilar](/sv/guide/content-styles)): `inline` skriver det i elementens `style`-attribut, så att en webbplats visar HTML-koden som den är; `classes` behåller bara klasser, för en webbplats som laddar `tiptapify/content.css`. Redigeraren ignorerar dessa stilar när HTML läses in, så båda sorterna HTML laddas tillbaka likadant.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Typ:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/sv/api/types#tiptapifylinkpreviewoptions))
- **Standard:** `null`

Backend-endpointen för [länkkort](/sv/guide/link-cards): den läser OpenGraph-data från sidor, vilket en webbläsare inte kan (CORS). Redigeraren kontrollerar den med en handskakning när den startar (`GET {endpoint}` måste svara `200 { "tiptapifyLinkPreview": 1 }`); tills den svarar erbjuds inget kort.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Händelser {#events}

### `editor-ready` {#editor-ready}

Utlöses när redigerarinstansen är klar.

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

Utlöses när redigerarens innehåll ändras.

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

Stöder `v-model`-bindning.

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

Redigerarinstansen och funktionen `t` är tillgängliga via Vues provide/inject:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
