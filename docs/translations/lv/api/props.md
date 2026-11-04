# Rekvizīti {#props}

## `<Tiptapify>` rekvizīti {#tiptapify-props}

### `content` {#content}

- **Tips:** `String | Object`
- **Noklusējums:** `''`

Redaktora sākotnējais saturs. Pieņem HTML virkni vai Tiptap JSON objektu.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` ir tikai **sākotnējais** saturs; divvirzienu piesaistei izmantojiet `v-model` (skatiet `modelValue`).

### `modelValue` {#modelvalue}

- **Tips:** `String | Object`
- **Noklusējums:** `''`

Divvirzienu piesaistes vērtība `v-model`. Izmantojiet `v-model`, lai reaktīvā vērtība paliktu sinhronizēta ar redaktoru. Pēc katras izmaiņas komponents izsūta `update:modelValue` ar jaunāko HTML, ko `v-model` ieraksta atpakaļ jūsu ref. Ja izmanto tikai `v-model` (bez `:content`), piesaistītā vērtība ir redaktora sākotnējais saturs.

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

- **Tips:** `String`
- **Noklusējums:** `''`

Vietturis, kas tiek rādīts, kad redaktors ir tukšs.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Tips:** `Number`
- **Noklusējums:** `null`

Redaktora satura apgabala minimālais augstums pikseļos.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Tips:** `Boolean`
- **Noklusējums:** `true`

Parādīt vai paslēpt rīkjoslu.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Tips:** `Array<String> | Object`
- **Noklusējums:** `[]`

Rādāmie rīkjoslas elementi. Nododiet elementu nosaukumu masīvu vai objektu ar nosauktām sadaļām. Skatiet [Rīkjoslas elementi](/lv/api/toolbar-items).
Masīvā `'|'` sadala elementus grupās (norādītajā secībā, neatkarīgi no tā, no kādām sadaļām pogas nāk), bet `'~'` pārbīda aiz tā esošos elementus uz rīkjoslas beigām. Ja ir grupas, nosaukums, kas nav iebūvēts elements, rezervē vietu pielāgotajai pogai ar šādu nosaukumu no `customExtensions`; ja tādas pogas nav, vieta tiek izmesta.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Tips:** `Boolean`
- **Noklusējums:** `false`

Ja `true`, rekvizīts `items` norāda elementus, ko **izslēgt**, nevis iekļaut.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Tips:** `Boolean`
- **Noklusējums:** `true`

Rādīt burbuļa izvēlni, kad ir atlasīts teksts: viena ikonu pogu rinda grupās — treknraksts, slīpraksts, pasvītrojums, nosvītrojums | augšraksts, apakšraksts | iezīmējums, iekļautais kods | saite | formatējuma notīrīšana. Katrai pogai ir rīka padoms ar tās īsinājumtaustiņu, un tā ir iezīmēta, kad atlasei ir piemērota attiecīgā iezīme. Tā tiek paslēpta, ja atlasīts bloks (attēls, logrīks), koda iekšienē un kad atlasīts viss dokuments.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Tips:** `Boolean`
- **Noklusējums:** `true`

Rādīt peldošo izvēlni tukšās rindās: 1. līmeņa virsraksts, 2. līmeņa virsraksts un nenumurēts saraksts tajā pašā ikonu pogu rindā kā burbuļa izvēlnē.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Tips:** `Boolean`
- **Noklusējums:** `true`

Iespējot slīpsvītras komandu izvēlni (ievadiet `/`, lai to aktivizētu).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Tips:** `Boolean`
- **Noklusējums:** `true`

Rādīt vārdu skaitu redaktora kājenē.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Tips:** `Boolean`
- **Noklusējums:** `true`

Rādīt rakstzīmju skaitu redaktora kājenē.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Tips:** `Number | null`
- **Noklusējums:** `null`

Maksimālais rakstzīmju skaits, ko pieļauj Tiptap paplašinājums `CharacterCount`. Iestatiet `null` vai izlaidiet rekvizītu, lai rediģēšana būtu neierobežota. Ja iestatīta vērtība, kas lielāka par `0`, kājenē tiek rādīts SVG apļveida progresa indikators ar krāsu kodētiem sliekšņiem.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Tips:** `String`
- **Noklusējums:** `'purple'`

Kājenē rādītā apļveida progresa indikatora noklusējuma krāsa, kad ir iestatīts `limit`.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Tips:** `String`
- **Noklusējums:** `'orange'`

Progresa indikatora krāsa, kad izmantots vairāk nekā 75% no limita.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Tips:** `String`
- **Noklusējums:** `'red'`

Progresa indikatora krāsa, kad rakstzīmju limits ir sasniegts.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Tips:** `TiptapifyFooterAlignment`
- **Noklusējums:** `'end'`

Kājenes statusa elementu līdzināšana. Pieņem `'start'`, `'center'` vai `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Tips:** `Boolean | TiptapifyAiOptions`
- **Noklusējums:** `false`

Iespējo rīkjoslas elementu `ai`. Redaktors izveido ar OpenAI saderīgu `/v1/chat/completions` pieprasījumu un nodod to `aiProvider`. Izmantojiet piegādātāja atzvanu, lai izsauktu savu backend, BFF, ar OAuth aizsargātu galapunktu, LM Studio vai SDK ietinumu.

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

Lokālā LLM LM Studio piemērs:

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

Izvades straumēšana tiek atbalstīta, iestatot `stream: true` un nododot tokenus ar `aiProvider` argumentu `stream`. Rezultāta lauks AI dialoglodziņā tiek atjaunināts dzīvi, kamēr nāk fragmenti, un poga **Apturēt** atceļ notiekošo pieprasījumu:

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

Nododiet `stream.signal` uz `fetch` (vai savam SDK izsaukumam), lai pieprasījums tiktu atcelts, kad lietotājs noklikšķina uz **Apturēt** vai aizver dialoglodziņu. Daļēji straumētais saturs paliek rezultāta laukā, un to var piemērot vai atmest. Piegādātāji, kas nestraumē, var argumentu `stream` pilnībā ignorēt — tas nav obligāts un ir atpakaļsaderīgs.

Spriešanas modeļi (Qwen thinking, DeepSeek, o sērija) savas “domas” straumē atsevišķā `reasoning_content` deltā. Pārsūtiet šos fragmentus ar `stream.onReasoning()` — kad `showReasoning: true`, dialoglodziņš tos renderē sakļaujamā panelī **Domāšana** virs rezultāta lauka (panelis pēc noklusējuma ir paslēpts). Spriešanas izvade ir tikai attēlošanai un nekad netiek ievietota redaktorā.

Lai lietotājs katram pieprasījumam varētu pārslēgt modeļa domāšanas režīmu, AI opcijās iestatiet `thinking: true`. Tad dialoglodziņš rāda slēdzi **Domāšana** (pēc noklusējuma ieslēgts, atiestatās katrā atvēršanā); spraudnis slēdža vērtību ieraksta pieprasījumā kā `enable_thinking: true | false`, tāpēc `enable_thinking` pats `chatCompletionOptions` vairs nav jāiestata (un nedrīkst iestatīt):

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

Ja `thinking` ir `false` vai izlaists, slēdzis netiek rādīts un spraudnis sūta `enable_thinking: false`, tāpēc modeļi, kas pēc noklusējuma domā (Qwen3, DeepSeek, …), nedomā.

Lai lietotājs katram pieprasījumam varētu izvēlēties domāšanas līmeni, AI opcijās iestatiet `reasoningEffort`. Tad dialoglodziņš rāda nolaižamo izvēlni **Domāšanas līmenis**, kas aizpildīta no `options` — pielāgotiem līmeņiem (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Paplašinājums pats vienmēr pievieno nolaižamajai izvēlnei elementu `default` (domāšanas režīma pamatlīmenis), tāpēc `default` savā konfigurācijā nekad neuzskaitiet; opcijas lauks `default` iepriekš atlasa vienu no jūsu pielāgotajiem līmeņiem, kad atveras dialoglodziņš (citādi tiek iepriekš atlasīts `default`), un vērtība atiestatās katrā atvēršanā.
Atlasītā vērtība nosaka, ko spraudnis ieraksta pieprasījumā: `default` saglabā domāšanas režīmu — slēdzis **Domāšana** paliek aktīvs un kontrolē `enable_thinking`; jebkura cita vērtība tā vietā tiek sūtīta kā `reasoning_effort`, un slēdzis Domāšana ir atspējots, kamēr ir atlasīta šī vērtība (piegādātāji vienā pieprasījumā noraida gan `enable_thinking`, gan `reasoning_effort`).
Nolaižamā izvēlne tiek rādīta tikai tad, ja `thinking` ir iespējots un slēdzis Domāšana ir ieslēgts — izslēdzot domāšanu, tā tiek paslēpta un `reasoning_effort` netiek sūtīts (pieprasījums atgriežas pie `enable_thinking: false`). Ja `options` trūkst vai ir tukšs, nolaižamā izvēlne netiek renderēta vispār:

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

Panelis **Domāšana** pēc noklusējuma ir paslēpts (`showReasoning` noklusējums ir `false`). Iestatiet `showReasoning: true`, lai parādītu sakļaujamu paneli, kas straumē modeļa spriešanas procesu (`reasoning_content` delta), saglabājot domāšanu ieslēgtu — modelis joprojām spriež un rezultāts tiek piemērots tāpat, tikai papildus tiek rādīta soli pa solim spriešana:

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

Pielāgoti pieprasījumu piemēri aizstāj lokalizētos noklusējumus:

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

`tokenProvider` un `storage` ir neobligāti patērētāja pārvaldīti āķi tiešām pārlūka integrācijām. API atslēgas vai piegādātāja tokeni, kas ievietoti pārlūka kodā vai pārlūka krātuvē, ir redzami lietotājiem, un tos nedrīkst uzskatīt par noslēpumiem. Produkcijas noslēpumiem dodiet priekšroku iepriekš aprakstītajam backend adaptera modelim.

Izmantojiet `mode: 'insert' | 'replace' | 'append'`, lai iepriekš atlasītu ievietošanas režīmu dialoglodziņa darbības pogai (**Ievietot** / **Aizstāt** / **Pievienot beigās**). Bez `mode` poga pēc noklusējuma ir **Aizstāt**, ja dialoglodziņa atvēršanas brīdī ir atlasīts teksts, un citādi **Ievietot**. Darbības poga ir sadalīta poga: galvenā daļa piemēro rezultātu iepriekš atlasītajā režīmā, un maza sadaļa “vairāk” (⋮) tās labajā pusē atver izvēlni ar pārējiem režīmiem — klikšķis uz kāda no tiem uzreiz piemēro rezultātu šajā režīmā.

Ja redaktoram ir `limit` (rakstzīmju skaita limits), zem rezultāta lauka, tiklīdz rezultāts ir ģenerēts, tiek rādīts rakstzīmju skaitītājs `generated / limit` (straumēšanas laikā tas atjaunojas dzīvi un kļūst maigi sarkans, ja limits tiktu pārsniegts).
Dialoglodziņš uzreiz pēc ģenerēšanas rāda arī brīdinājumu `ai.limit_exceeded`, ja AI izvade pārsniegtu limitu.
Šajā stāvoklī poga **Ievietot** un tās alternatīvo režīmu izvēlne ir atspējotas — paplašinājums `CharacterCount` noraida jebkuru ievietošanu, kas dokumentu palielinātu virs limita, tāpēc rezultāts tiek piemērots pilnībā vai nepiemērots vispār: tas tiek ievietots pilnībā, ja ietilpst, vai netiek ievietots vispār, ja pārsniedz limitu.
Saīsiniet rezultātu, lai darbība atkal būtu pieejama:

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

Izmantojiet `systemPrompt`, `temperature`, `chatCompletionOptions` vai `createMessages(context)`, lai pielāgotu ar OpenAI saderīgo chat-completions pieprasījumu. `context` satur `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` ir atlases rindkopas teksts ap to (līdz 500 rakstzīmēm katrā pusē, bez atlases tukšs) — sūtiet tos kopā ar atlasi, citādi modelis fragmentu uztver kā visu tekstu un pabeidz to.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Tips:** `String`
- **Noklusējums:** `undefined`

Alternatīva pielāgotam `aiProvider`: norādiet AI funkcijai backend LLM galapunktu, un tiptapify pats izveido un nosūta pieprasījumu. Backend saņem minimālu JSON datu paku:

- **Vienmēr:** `prompt` (dialoglodziņā ievadītais pieprasījums) un `instruction` (jūsu `systemPrompt`, pielāgota `createMessages` sistēmas ziņojums vai iebūvētais noklusējums).
- **Neobligāti, tiek sūtīti tikai tad, ja iestatīti:** `stream` (tikai `true`), `thinking` (dialoglodziņa slēdzis **Domāšana**, tikai `true`), `reasoning_effort` (atlasītais līmenis) un `model`.

Atbilde tiek pieņemta atlaidīgi: vienkārša virkne, objekts `{ content }` vai ar OpenAI saderīga `choices` datu paka. Ja pieprasījumam ir `stream: true`, atbildes pamatteksts tiek lasīts kā SSE straume (`data:` rindas, ko noslēdz `data: [DONE]`): tiek pieņemtas OpenAI stila deltas (`choices[0].delta.content` / `.reasoning_content`), vienkāršs fragments `{ type: 'content' | 'reasoning', data }`, plakans fragments `{ content, reasoning_content }` un vienkārša teksta `data` rindas. Ja backend ignorē `stream` un atbild ar vienkāršu pamattekstu, tiek izmantots šis pamatteksts. Atbilde, kas nav OK, dialoglodziņā parāda backend kļūdas ziņojumu (JSON `{ error }` / `{ message }` vai neapstrādātu pamattekstu). Poga **Apturēt** un dialoglodziņa aizvēršana pārtrauc notiekošo pieprasījumu; daļēji straumētais saturs paliek rezultāta laukā.

Ja iestatīti gan `aiProvider`, gan `aiEndpoint`, uzvar `aiProvider`.

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

- **Tips:** `Record<string, string>`
- **Noklusējums:** `undefined`

Papildu galvenes, kas tiek sūtītas ar `aiEndpoint` pieprasījumu un sapludinātas virs `Content-Type: application/json`. Šeit iestatīta galvene `Authorization` tiek saglabāta tāda, kāda tā ir; citādi `tokenProvider` tokens (ja iestatīts) tiek sūtīts kā `Authorization: Bearer <token>`.

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

- **Tips:** `String`
- **Noklusējums:** `'Inter'`

Redaktora satura noklusējuma fontu saime.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Tips:** `String`
- **Noklusējums:** `'px'`

Fonta izmēra vērtību mērvienība.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Tips:** `String`
- **Noklusējums:** `'0'`

Redaktora konteinera apmales rādiuss. Pieņem Vuetify rādiusa vērtības (`sm`, `md`, `lg`, `xl`, `pill` utt.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Tips:** `variantBtnTypes`
- **Noklusējums:** `'tonal'`

Vuetify pogas variants rīkjoslas pogām. Vērtība tiek koplietota ar katru rīkjoslas komponentu, izmantojot redaktora konfigurāciju — pielāgoti komponenti to var nolasīt ar [`useTiptapifyConfig`](/lv/api/types#usetiptapifyconfig). Skatiet [`variantBtnTypes`](/lv/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Tips:** `variantFieldTypes`
- **Noklusējums:** `'outlined'`

Vuetify variants rīkjoslas nolaižamajiem laukiem. Vērtība tiek koplietota ar katru rīkjoslas komponentu, izmantojot redaktora konfigurāciju — pielāgoti komponenti to var nolasīt ar [`useTiptapifyConfig`](/lv/api/types#usetiptapifyconfig). Skatiet [`variantFieldTypes`](/lv/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Tips:** `Array<toolbarSections>`
- **Noklusējums:** `[]`

Nodrošiniet pielāgotas rīkjoslas sadaļas, lai paplašinātu vai pievienotu rīkjoslas elementus. Katras sadaļas komponenti var nolasīt koplietoto redaktora konfigurāciju ar [`useTiptapifyConfig`](/lv/api/types#usetiptapifyconfig). Skatiet [Pielāgota rīkjosla](/lv/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Tips:** `Boolean`
- **Noklusējums:** `true`

Iespējot interaktīvo stilu piemērošanu.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Tips:** `Boolean`
- **Noklusējums:** `false`

Rādīt nenoteiktu progresa joslu, kamēr redaktors tiek ielādēts.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Tips:** `String`
- **Noklusējums:** `'default'`

Ielādes progresa joslas krāsa. Pieņem Vuetify tēmas krāsu vērtības.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Tips:** `String`
- **Noklusējums:** `'1px'`

Ielādes progresa joslas augstums.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Tips:** `Number`
- **Noklusējums:** `0`

Sākot ar tik daudziem attēliem pēc kārtas (bez nekā starp tiem) redaktors tos izkārto kā numurētu trīskolonnu režģi vietnēm, kas šādus attēlus rāda kā slaidrādi. `0` to izslēdz.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Tips:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/lv/api/types#tiptapifyskininput))
- **Noklusējums:** `'default'`

Redaktora apvalka izskats: rīkjosla, burbuļa izvēlnes, nolaižamās izvēlnes, dialoglodziņi, kājene.

- `default` — klasiskais izskats: paaugstināta rīkjosla, pogu grupas kā paaugstinātas kastes, Vuetify pogas ar primāru nospiestu stāvokli.
- `pastel` — mierīgais izskats: plakana tonēta rīkjosla zem matiņa līnijas, caurspīdīgas pogas ar neitrālu nospiestu stāvokli, vieglas nolaižamās izvēlnes, mīksti dialogi.

Funkcijas (attēlu paraksti, slaidrādes, līdzināšanas nolaižamā izvēlne, saraksta stili) darbojas vienādi abos apvalkos.

```vue
<Tiptapify skin="pastel" />
```

Varat nodot arī iekļautu apvalka objektu: tokenu pārrakstījumus (`colors` / `metrics`) un formas karogus, pēc izvēles ar `extends` no reģistrēta apvalka. Tas tiek atrisināts virs `default` (vai tā bāzes), tiek renderēts ar klasi `tiptapify-skin-inline` (`tiptapify-skin-{name}`, ja objektam ir `name`), un tā tokeni kā CSS mainīgie `--tf-*` nonāk redaktora saknē. Pielāgoti nosaukumi nāk no `registerSkin('mint', { … })` — tokenu tabulu un receptes skatiet [apvalku ceļvedī](/lv/guide/skins).

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Tips:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/lv/api/types#tiptapifyuploadoptions))
- **Noklusējums:** `null`

[Augšupielāžu](/lv/guide/uploads) galapunkts: attēla un video dialoglodziņos izvēlētie faili (un video vāka attēls, saites kartītes attēls) tiek nosūtīti uz to ar `POST {endpoint}` (multipart `file` un `kind`), un dokuments saglabā URL, ar ko tas atbild (`{ "url": … }`).

Bez tā attēla dialoglodziņš joprojām pieņem failu: izvēlēts attēls (un video vāka attēls) tiek iegults dokumentā kā base64 datu URL, un base64 attēli tiek saglabāti, kad dokuments tiek ielādēts. Video dialoglodziņš piedāvā **Augšupielādēt** tikai ar šo rekvizītu. Ja `upload` ir iestatīts, base64 attēli tiek izmesti, kad dokuments tiek ielādēts.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Tips:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/lv/api/types#tiptapifycontentstyles))
- **Noklusējums:** `'inline'`

Kā saglabātais HTML nes saišu karšu, attēlu ar parakstiem, video, iegulto elementu un uzdevumu sarakstu izskatu (skat. [Satura stili](/lv/guide/content-styles)): `inline` ieraksta to šo elementu `style` atribūtos, tāpēc vietne rāda HTML tādu, kāds tas ir; `classes` saglabā tikai klases vietnei, kas ielādē `tiptapify/content.css`. Redaktors šos stilus ignorē, kad HTML tiek ielādēts, tāpēc abu veidu HTML ielādējas atpakaļ vienādi.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Tips:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/lv/api/types#tiptapifylinkpreviewoptions))
- **Noklusējums:** `null`

[Saites kartīšu](/lv/guide/link-cards) backend galapunkts: tas nolasa lapu OpenGraph datus, ko pārlūks nevar (CORS). Redaktors to pārbauda ar rokspiedienu, startējot (`GET {endpoint}` jāatbild ar `200 { "tiptapifyLinkPreview": 1 }`); kamēr tas neatbild, kartīti nepiedāvā nekas.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Notikumi {#events}

### `editor-ready` {#editor-ready}

Tiek izsūtīts, kad redaktora eksemplārs ir gatavs.

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

Tiek izsūtīts, kad mainās redaktora saturs.

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

Atbalsta `v-model` piesaisti.

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

Redaktora eksemplārs un funkcija `t` ir pieejami ar Vue provide/inject:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
