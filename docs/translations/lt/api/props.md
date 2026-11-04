# Savybės {#props}

## `<Tiptapify>` savybės {#tiptapify-props}

### `content` {#content}

- **Tipas:** `String | Object`
- **Numatytoji reikšmė:** `''`

Pradinis redaktoriaus turinys. Priima HTML eilutę arba Tiptap JSON objektą.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` yra tik **pradinis** turinys; dvipusiam susiejimui naudokite `v-model` (žr. `modelValue`).

### `modelValue` {#modelvalue}

- **Tipas:** `String | Object`
- **Numatytoji reikšmė:** `''`

Dvipusio susiejimo reikšmė `v-model`. Naudokite `v-model`, kad reaktyvi reikšmė liktų sinchronizuota su redaktoriumi. Po kiekvieno redagavimo komponentas išspinduliuoja `update:modelValue` su naujausiu HTML, kurį `v-model` įrašo atgal į jūsų ref. Kai naudojamas tik `v-model` (be `:content`), susieta reikšmė yra pradinis redaktoriaus turinys.

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

- **Tipas:** `String`
- **Numatytoji reikšmė:** `''`

Vietos žymeklio tekstas, rodomas, kai redaktorius tuščias.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Tipas:** `Number`
- **Numatytoji reikšmė:** `null`

Minimalus redaktoriaus turinio srities aukštis pikseliais.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Tipas:** `Boolean`
- **Numatytoji reikšmė:** `true`

Rodyti arba slėpti įrankių juostą.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Tipas:** `Array<String> | Object`
- **Numatytoji reikšmė:** `[]`

Rodytini įrankių juostos elementai. Perduokite elementų pavadinimų masyvą arba objektą su pavadintais skyriais. Žr. [Įrankių juostos elementai](/lt/api/toolbar-items).
Masyve `'|'` suskaido elementus į grupes (šia tvarka, nesvarbu, iš kokių skyrių mygtukai paimti), o `'~'` perkelia po jo einančius elementus į įrankių juostos pabaigą. Naudojant grupes, pavadinimas, kuris nėra įtaisytasis elementas, išlaiko vietą to paties pavadinimo pasirinktiniam mygtukui iš `customExtensions`; jei tokio mygtuko nėra, vieta pašalinama.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Tipas:** `Boolean`
- **Numatytoji reikšmė:** `false`

Kai `true`, savybė `items` nurodo elementus, kuriuos reikia **neįtraukti**, o ne įtraukti.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Tipas:** `Boolean`
- **Numatytoji reikšmė:** `true`

Rodyti burbulo meniu pažymėjus tekstą: viena piktogramų mygtukų eilutė grupėmis – paryškinimas, kursyvas, pabraukimas, perbraukimas | viršutinis indeksas, apatinis indeksas | paryškinimas spalva, kodas eilutėje | nuoroda | formatavimo išvalymas. Kiekvienas mygtukas turi paaiškinimą su sparčiuoju klavišu ir rodo, kai pažymėtam tekstui taikoma jo žymė. Jis paslepiamas pažymėtam blokui (paveikslui, valdikliui), kode ir pažymėjus visą dokumentą.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Tipas:** `Boolean`
- **Numatytoji reikšmė:** `true`

Rodyti slankųjį meniu tuščiose eilutėse: 1 lygio antraštė, 2 lygio antraštė ir ženklelių sąrašas, toje pačioje piktogramų mygtukų eilutėje kaip ir burbulo meniu.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Tipas:** `Boolean`
- **Numatytoji reikšmė:** `true`

Įjungti pasvirojo brūkšnio komandų meniu (iškviečiamas įvedus `/`).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Tipas:** `Boolean`
- **Numatytoji reikšmė:** `true`

Rodyti žodžių skaičių redaktoriaus poraštėje.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Tipas:** `Boolean`
- **Numatytoji reikšmė:** `true`

Rodyti simbolių skaičių redaktoriaus poraštėje.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Tipas:** `Number | null`
- **Numatytoji reikšmė:** `null`

Didžiausias simbolių skaičius, leidžiamas Tiptap plėtinio `CharacterCount`. Nustatykite `null` arba praleiskite savybę, kad redagavimas būtų neribotas. Kai nustatyta didesnė nei `0` reikšmė, poraštėje rodomas SVG apskritas eigos indikatorius su spalvomis pažymėtomis ribomis.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Tipas:** `String`
- **Numatytoji reikšmė:** `'purple'`

Numatytoji apskritojo eigos indikatoriaus spalva poraštėje, kai nustatytas `limit`.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Tipas:** `String`
- **Numatytoji reikšmė:** `'orange'`

Eigos indikatoriaus spalva, kai naudojama daugiau nei 75 % limito.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Tipas:** `String`
- **Numatytoji reikšmė:** `'red'`

Eigos indikatoriaus spalva, kai pasiektas simbolių limitas.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Tipas:** `TiptapifyFooterAlignment`
- **Numatytoji reikšmė:** `'end'`

Poraštės būsenos elementų lygiavimas. Priima `'start'`, `'center'` arba `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Tipas:** `Boolean | TiptapifyAiOptions`
- **Numatytoji reikšmė:** `false`

Įjungia įrankių juostos elementą `ai`. Redaktorius sudaro su OpenAI suderinamą `/v1/chat/completions` užklausą ir perduoda ją `aiProvider`. Tiekėjo atgalinį iškvietimą naudokite savo serveriui, BFF, OAuth apsaugotam galiniam taškui, LM Studio arba SDK apvalkalui iškviesti.

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

Vietinio LLM LM Studio pavyzdys:

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

Srautinis išvedimas palaikomas nustatant `stream: true` ir siunčiant žetonus per `aiProvider` argumentą `stream`. DI dialogo rezultato laukas atnaujinamas gyvai, gaunant dalis, o mygtukas **Sustabdyti** nutraukia vykdomą užklausą:

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

Perduokite `stream.signal` į `fetch` (arba savo SDK iškvietimą), kad užklausa būtų nutraukta, kai naudotojas paspaudžia **Sustabdyti** arba uždaro dialogą. Iš dalies gautas turinys lieka rezultato lauke ir gali būti pritaikytas arba atmestas. Tiekėjai, kurie nesrautuoja, gali visiškai ignoruoti argumentą `stream` – jis neprivalomas ir atgaliniu būdu suderinamas.

Samprotavimo modeliai (Qwen thinking, DeepSeek, o serija) savo „mintis“ srautu perduoda atskiroje `reasoning_content` delta. Persiųskite tas dalis per `stream.onReasoning()` – kai `showReasoning: true`, dialogas jas atvaizduoja sutraukiamame skydelyje **Mąstymas** virš rezultato lauko (pagal numatytuosius nustatymus skydelis paslėptas). Samprotavimo išvestis skirta tik rodymui ir niekada neįterpiama į redaktorių.

Kad naudotojas galėtų kiekvienai užklausai perjungti modelio mąstymo režimą, DI parinktyse nustatykite `thinking: true`. Tada dialoge rodomas jungiklis **Mąstymas** (pagal numatytuosius nustatymus įjungtas, kiekvieną kartą atidarius atstatomas); įskiepis jungiklio reikšmę įrašo į užklausą kaip `enable_thinking: true | false`, todėl `enable_thinking` savo `chatCompletionOptions` nebereikia (ir nedera) nustatyti:

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

Kai `thinking` yra `false` arba praleistas, jungiklis nerodomas, o įskiepis siunčia `enable_thinking: false`, todėl modeliai, kurie pagal numatytuosius nustatymus mąsto (Qwen3, DeepSeek, …), nemąsto.

Kad naudotojas galėtų kiekvienai užklausai pasirinkti mąstymo lygį, DI parinktyse nustatykite `reasoningEffort`. Tada dialoge rodomas išskleidžiamasis sąrašas **Mąstymo lygis**, užpildytas iš `options` – pasirinktinių lygių (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Plėtinys pats visada prideda į sąrašą elementą `default` (mąstymo režimo bazinį lygį), todėl `default` savo konfigūracijoje niekada neišvardijate; parinkties laukas `default` atidarius dialogą iš anksto pasirenka vieną iš jūsų pasirinktinių lygių (kitu atveju iš anksto pasirenkamas `default`), o reikšmė atstatoma kiekvieną kartą atidarius.
Pasirinkta reikšmė lemia, ką įskiepis įrašo į užklausą: `default` palieka mąstymo režimą – jungiklis **Mąstymas** lieka aktyvus ir valdo `enable_thinking`; bet kuri kita reikšmė siunčiama kaip `reasoning_effort`, o jungiklis Mąstymas, kol ta reikšmė pasirinkta, išjungiamas (tiekėjai vienoje užklausoje atmeta ir `enable_thinking`, ir `reasoning_effort`).
Išskleidžiamasis sąrašas rodomas tik tada, kai `thinking` įjungtas ir jungiklis Mąstymas yra įjungtas – išjungus mąstymą jis paslepiamas ir `reasoning_effort` nesiunčiamas (užklausa grįžta prie `enable_thinking: false`). Kai `options` nėra arba yra tuščias, sąrašas visai neatvaizduojamas:

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

Skydelis **Mąstymas** pagal numatytuosius nustatymus paslėptas (`showReasoning` numatytoji reikšmė `false`). Nustatykite `showReasoning: true`, kad būtų rodomas sutraukiamas skydelis, kuriame srautu rodomas modelio samprotavimo procesas (`reasoning_content` delta), o mąstymas liktų įjungtas – modelis vis tiek samprotauja ir rezultatas taikomas taip pat, tik papildomai rodomas žingsnis po žingsnio samprotavimas:

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

Pasirinktiniai užklausų pavyzdžiai pakeičia lokalizuotas numatytąsias reikšmes:

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

`tokenProvider` ir `storage` yra neprivalomi naudotojo valdomi kabliukai tiesioginėms naršyklės integracijoms. API raktai ar tiekėjo prieigos raktai, patalpinti naršyklės kode ar naršyklės saugykloje, matomi naudotojams ir negali būti laikomi paslaptimis. Produkcinėms paslaptims geriau naudokite aukščiau aprašytą serverio adapterio šabloną.

Naudokite `mode: 'insert' | 'replace' | 'append'`, kad iš anksto pasirinktumėte įterpimo režimą dialogo veiksmo mygtukui (**Įterpimas** / **Pakeisti** / **Pridėti pabaigoje**). Be `mode`, mygtuko numatytoji reikšmė yra **Pakeisti**, kai atidarant dialogą pažymėtas tekstas, o kitu atveju **Įterpimas**. Veiksmo mygtukas yra skaidomasis mygtukas: pagrindinė dalis pritaiko rezultatą iš anksto pasirinktu režimu, o maža „daugiau“ (⋮) dalis dešinėje atidaro kitų režimų meniu – spustelėjus vieną, rezultatas iškart pritaikomas tuo režimu.

Kai redaktorius turi `limit` (simbolių limitą), vos sugeneravus rezultatą po rezultato lauku rodomas simbolių skaitiklis `generated / limit` (generuojant atnaujinamas gyvai ir tampa švelniai raudonas, kai limitas būtų viršytas).
Dialogas taip pat iškart po generavimo parodo įspėjimą `ai.limit_exceeded`, jei DI išvestis viršytų limitą.
Tokioje būsenoje mygtukas **Įterpimas** ir jo alternatyvių režimų meniu išjungiami – plėtinys `CharacterCount` atmeta bet kokį įterpimą, dėl kurio dokumentas viršytų limitą, todėl rezultatas pritaikomas viskas arba nieko: jis įterpiamas visas, jei telpa, arba neįterpiamas visai, jei viršija limitą.
Sutrumpinkite rezultatą, kad veiksmas vėl taptų prieinamas:

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

Naudokite `systemPrompt`, `temperature`, `chatCompletionOptions` arba `createMessages(context)`, kad pritaikytumėte su OpenAI suderinamą chat-completions užklausą. `context` turi `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` yra pažymėtos dalies pastraipos tekstas aplink ją (iki 500 simbolių kiekvienoje pusėje, be pažymėjimo tuščias) – siųskite juos kartu su pažymėta dalimi, nes kitaip modelis fragmentą palaikys visu tekstu ir jį užbaigs.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Tipas:** `String`
- **Numatytoji reikšmė:** `undefined`

Alternatyva pasirinktiniam `aiProvider`: nukreipkite DI funkciją į serverio LLM galinį tašką, o tiptapify pats sudarys ir išsiųs užklausą. Serveris gauna minimalią JSON apkrovą:

- **Visada:** `prompt` (dialoge įvesta užklausa) ir `instruction` (jūsų `systemPrompt`, pasirinktinio `createMessages` sisteminis pranešimas arba įtaisytasis numatytasis).
- **Neprivaloma, siunčiama tik kai nustatyta:** `stream` (tik `true`), `thinking` (dialogo jungiklis **Mąstymas**, tik `true`), `reasoning_effort` (pasirinktas lygis) ir `model`.

Atsakymas priimamas lanksčiai: paprasta eilutė, objektas `{ content }` arba su OpenAI suderinama `choices` apkrova. Kai užklausa turi `stream: true`, atsakymo turinys skaitomas kaip SSE srautas (`data:` eilutės, užbaigiamos `data: [DONE]`): priimamos OpenAI stiliaus delta (`choices[0].delta.content` / `.reasoning_content`), paprasta dalis `{ type: 'content' | 'reasoning', data }`, plokščia dalis `{ content, reasoning_content }` ir paprasto teksto `data` eilutės. Jei serveris ignoruoja `stream` ir atsako paprastu turiniu, naudojamas tas turinys. Ne OK atsakymas dialoge parodo serverio klaidos pranešimą (JSON `{ error }` / `{ message }` arba neapdorotą turinį). Mygtukas **Sustabdyti** ir dialogo uždarymas nutraukia vykdomą užklausą; iš dalies gautas turinys paliekamas rezultato lauke.

Jei nustatyti ir `aiProvider`, ir `aiEndpoint`, pirmenybę turi `aiProvider`.

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

- **Tipas:** `Record<string, string>`
- **Numatytoji reikšmė:** `undefined`

Papildomos antraštės, siunčiamos su `aiEndpoint` užklausa, suliejamos virš `Content-Type: application/json`. Čia nustatyta `Authorization` antraštė paliekama tokia, kokia yra; kitu atveju prieigos raktas iš `tokenProvider` (kai nustatytas) siunčiamas kaip `Authorization: Bearer <token>`.

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

- **Tipas:** `String`
- **Numatytoji reikšmė:** `'Inter'`

Numatytasis redaktoriaus turinio šriftas.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Tipas:** `String`
- **Numatytoji reikšmė:** `'px'`

Šrifto dydžio reikšmių matavimo vienetas.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Tipas:** `String`
- **Numatytoji reikšmė:** `'0'`

Redaktoriaus konteinerio kampų apvalinimas. Priima Vuetify spindulio reikšmes (`sm`, `md`, `lg`, `xl`, `pill` ir kt.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Tipas:** `variantBtnTypes`
- **Numatytoji reikšmė:** `'tonal'`

Vuetify mygtukų variantas įrankių juostos mygtukams. Reikšmė bendrinama su kiekvienu įrankių juostos komponentu per redaktoriaus konfigūraciją – pasirinktiniai komponentai gali ją perskaityti su [`useTiptapifyConfig`](/lt/api/types#usetiptapifyconfig). Žr. [`variantBtnTypes`](/lt/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Tipas:** `variantFieldTypes`
- **Numatytoji reikšmė:** `'outlined'`

Vuetify variantas įrankių juostos išskleidžiamiesiems laukams. Reikšmė bendrinama su kiekvienu įrankių juostos komponentu per redaktoriaus konfigūraciją – pasirinktiniai komponentai gali ją perskaityti su [`useTiptapifyConfig`](/lt/api/types#usetiptapifyconfig). Žr. [`variantFieldTypes`](/lt/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Tipas:** `Array<toolbarSections>`
- **Numatytoji reikšmė:** `[]`

Pateikite pasirinktinius įrankių juostos skyrius, kad išplėstumėte arba pridėtumėte įrankių juostos elementų. Kiekvieno skyriaus komponentai gali skaityti bendrą redaktoriaus konfigūraciją su [`useTiptapifyConfig`](/lt/api/types#usetiptapifyconfig). Žr. [Pasirinktinė įrankių juosta](/lt/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Tipas:** `Boolean`
- **Numatytoji reikšmė:** `true`

Įjungti interaktyvų stilių taikymą.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Tipas:** `Boolean`
- **Numatytoji reikšmė:** `false`

Rodyti neapibrėžtos eigos juostą, kol redaktorius įkeliamas.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Tipas:** `String`
- **Numatytoji reikšmė:** `'default'`

Įkėlimo eigos juostos spalva. Priima Vuetify temos spalvų reikšmes.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Tipas:** `String`
- **Numatytoji reikšmė:** `'1px'`

Įkėlimo eigos juostos aukštis.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Tipas:** `Number`
- **Numatytoji reikšmė:** `0`

Kai eilėje (be nieko tarp jų) yra tiek paveikslų ar daugiau, redaktorius juos išdėsto kaip sunumeruotą trijų stulpelių tinklelį – svetainėms, kurios tokius paveikslus rodo kaip skaidrių juostą (slider). `0` tai išjungia.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Tipas:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/lt/api/types#tiptapifyskininput))
- **Numatytoji reikšmė:** `'default'`

Redaktoriaus apvalkalo išvaizda: įrankių juosta, burbulo meniu, išskleidžiamieji sąrašai, dialogai, poraštė.

- `default` — klasikinė išvaizda: pakelta įrankių juosta, mygtukų grupės kaip pakeltos dėžutės, Vuetify mygtukai su pirmine paspaudimo būsena.
- `pastel` — rami išvaizda: plokščia atspalvio įrankių juosta po plona linija, permatomi mygtukai su neutralia paspaudimo būsena, lengvi išskleidžiamieji meniu, švelnūs dialogo langai.

Funkcijos (paveikslų aprašai, slankiklių juostos, lygiavimo išskleidžiamasis sąrašas, sąrašo stiliai) abiejuose apvalkaluose veikia vienodai.

```vue
<Tiptapify skin="pastel" />
```

Galite perduoti ir įterptinį apvalkalo objektą: žetonų perrašymus (`colors` / `metrics`) ir formos vėliavėles, pasirinktinai `extends` užregistruotą apvalkalą. Jis išsprendžiamas virš `default` (arba savo bazės), atvaizduojamas su klase `tiptapify-skin-inline` (`tiptapify-skin-{name}`, kai objektas turi `name`), o jo žetonai tampa `--tf-*` CSS kintamaisiais redaktoriaus šaknyje. Pasirinktiniai pavadinimai kuriami per `registerSkin('mint', { … })` – žetonų lentelę ir receptus rasite [apvalkalų vadove](/lt/guide/skins).

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Tipas:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/lt/api/types#tiptapifyuploadoptions))
- **Numatytoji reikšmė:** `null`

[Įkėlimų](/lt/guide/uploads) galinis taškas: failai, pasirinkti paveikslo ir vaizdo įrašo dialoguose (taip pat vaizdo įrašo viršelis ir nuorodos kortelės paveikslas), siunčiami į jį su `POST {endpoint}` (multipart `file` ir `kind`), o dokumente lieka URL, kurį jis atsako (`{ "url": … }`).

Be jo paveikslo dialogas vis tiek priima failą: pasirinktas paveikslas (ir vaizdo įrašo viršelis) įterpiamas į dokumentą kaip base64 duomenų URL, o base64 paveikslai įkeliant dokumentą paliekami. Vaizdo įrašo dialogas siūlo **Įkelti** tik su šia savybe. Kai nustatytas `upload`, base64 paveikslai įkeliant dokumentą pašalinami.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Tipas:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/lt/api/types#tiptapifycontentstyles))
- **Numatytoji reikšmė:** `'inline'`

Kaip išsaugotas HTML perduoda nuorodų kortelių, paveikslėlių su parašais, vaizdo įrašų, įterpiamų elementų ir užduočių sąrašų išvaizdą (žr. [Turinio stiliai](/lt/guide/content-styles)): `inline` įrašo ją į jų `style` atributus, todėl svetainė rodo HTML tokį, koks jis yra; `classes` palieka tik klases svetainei, kuri įkelia `tiptapify/content.css`. Redaktorius šių stilių nepaiso, kai įkeliamas HTML, todėl abiejų rūšių HTML įkeliamas atgal vienodai.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Tipas:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/lt/api/types#tiptapifylinkpreviewoptions))
- **Numatytoji reikšmė:** `null`

[Nuorodų kortelių](/lt/guide/link-cards) serverio galinis taškas: jis nuskaito puslapių OpenGraph duomenis, ko naršyklė negali (CORS). Redaktorius paleisdamas tikrina jį pasisveikinimu (`GET {endpoint}` turi atsakyti `200 { "tiptapifyLinkPreview": 1 }`); kol jis neatsako, kortelė nesiūloma.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Įvykiai {#events}

### `editor-ready` {#editor-ready}

Iškviečiamas, kai redaktoriaus egzempliorius paruoštas.

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

Iškviečiamas, kai pasikeičia redaktoriaus turinys.

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

Palaiko `v-model` susiejimą.

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

Redaktoriaus egzempliorius ir funkcija `t` pasiekiami per Vue provide/inject:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
