# Propid {#props}

## `<Tiptapify>` propid {#tiptapify-props}

### `content` {#content}

- **Tüüp:** `String | Object`
- **Vaikeväärtus:** `''`

Redaktori algne sisu. Aktsepteerib HTML-stringi või Tiptap JSON-objekti.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` on ainult **algne** sisu; kahesuunaliseks sidumiseks kasuta `v-model`it (vaata `modelValue`).

### `modelValue` {#modelvalue}

- **Tüüp:** `String | Object`
- **Vaikeväärtus:** `''`

Kahesuunalise sidumise väärtus `v-model` jaoks. Kasuta `v-model`it, et hoida reaktiivne väärtus redaktoriga sünkroonis. Iga muudatuse korral väljastab komponent `update:modelValue` koos viimase HTML-iga, mille `v-model` kirjutab tagasi sinu ref-i. Kui kasutatakse ainult `v-model`it (ilma `:content`ita), on seotud väärtus redaktori algne sisu.

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

- **Tüüp:** `String`
- **Vaikeväärtus:** `''`

Kohatäiteks olev tekst, mida kuvatakse, kui redaktor on tühi.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Tüüp:** `Number`
- **Vaikeväärtus:** `null`

Redaktori sisuala minimaalne kõrgus pikslites.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Tüüp:** `Boolean`
- **Vaikeväärtus:** `true`

Näita või peida tööriistariba.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Tüüp:** `Array<String> | Object`
- **Vaikeväärtus:** `[]`

Kuvatavad tööriistariba üksused. Anna ette üksuste nimede massiiv või objekt nimega sektsioonidega. Vaata [tööriistariba üksusi](/et/api/toolbar-items).
Massiivis jagab `'|'` üksused rühmadeks (selles järjekorras, olenemata sellest, millistest sektsioonidest nupud pärit on) ja `'~'` lükkab sellele järgnevad üksused tööriistariba lõppu. Rühmadega hoiab nimi, mis pole sisseehitatud üksus, koha selle nimega kohandatud nupule väärtusest `customExtensions`; sellise nuputa koht jäetakse ära.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Tüüp:** `Boolean`
- **Vaikeväärtus:** `false`

Kui `true`, määrab prop `items` üksused, mis **välistatakse**, mitte kaasatakse.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Tüüp:** `Boolean`
- **Vaikeväärtus:** `true`

Näita hõljumenüüd, kui tekst on valitud: üks rida ikoonnuppe rühmades — paks, kursiiv, allakriipsutus, läbikriipsutus | ülaindeks, alaindeks | esiletõst, reasisene kood | link | vormingu eemaldamine. Igal nupul on kohtspikker oma kiirklahviga ja see näitab, kui selle märgend on valikul sees. See peidetakse valitud ploki (pilt, vidin) korral, koodi sees ja siis, kui kogu dokument on valitud.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Tüüp:** `Boolean`
- **Vaikeväärtus:** `true`

Näita ujuvat menüüd tühjadel ridadel: pealkiri 1, pealkiri 2 ja täpploend, samas ikoonnuppude reas nagu hõljumenüü.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Tüüp:** `Boolean`
- **Vaikeväärtus:** `true`

Luba kaldkriipsukäskude menüü (käivitamiseks sisesta `/`).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Tüüp:** `Boolean`
- **Vaikeväärtus:** `true`

Näita sõnade arvu redaktori jaluses.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Tüüp:** `Boolean`
- **Vaikeväärtus:** `true`

Näita märkide arvu redaktori jaluses.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Tüüp:** `Number | null`
- **Vaikeväärtus:** `null`

Tiptapi laiendusega `CharacterCount` lubatud märkide maksimaalne arv. Piiramatu redigeerimise säilitamiseks sea `null` või jäta prop ära. Kui väärtus on suurem kui `0`, näitab jalus SVG ringikujulist edenemisnäidikut värvikoodiga lävedega.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Tüüp:** `String`
- **Vaikeväärtus:** `'purple'`

Jaluses kuvatava ringikujulise edenemisnäidiku vaikevärv, kui `limit` on määratud.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Tüüp:** `String`
- **Vaikeväärtus:** `'orange'`

Edenemisnäidiku värv, kui kasutus ületab 75% piirist.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Tüüp:** `String`
- **Vaikeväärtus:** `'red'`

Edenemisnäidiku värv, kui märgipiir on saavutatud.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Tüüp:** `TiptapifyFooterAlignment`
- **Vaikeväärtus:** `'end'`

Jaluse olekuüksuste joondus. Aktsepteerib väärtusi `'start'`, `'center'` või `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Tüüp:** `Boolean | TiptapifyAiOptions`
- **Vaikeväärtus:** `false`

Lubab tööriistariba üksuse `ai`. Redaktor koostab OpenAI-ühilduva `/v1/chat/completions` päringu ja annab selle edasi `aiProvider`ile. Kasuta pakkuja tagasikutset, et kutsuda oma backendi, BFF-i, OAuth-kaitstud lõpp-punkti, LM Studiot või SDK ümbrist.

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

Kohaliku LLM-i LM Studio näide:

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

Voogväljundit toetatakse, kui sead `stream: true` ja lükkad tokeneid läbi `aiProvider`i argumendi `stream`. AI dialoogi tulemuse väli uueneb tükkide saabudes reaalajas ja nupp **Peata** tühistab pooleliolevat päringut:

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

Anna `stream.signal` edasi `fetch`ile (või oma SDK kutsele), et päring tühistataks, kui kasutaja klõpsab nupul **Peata** või sulgeb dialoogi. Osaliselt voogedastatud sisu jääb tulemuse väljale ja selle saab rakendada või kõrvale jätta. Pakkujad, mis ei voogedasta, võivad argumendi `stream` täielikult ignoreerida — see on valikuline ja tagasiühilduv.

Arutlevad mudelid (Qwen thinking, DeepSeek, o-seeria) voogedastavad oma „mõtteid“ eraldi `reasoning_content` deltas. Edasta need tükid kaudu `stream.onReasoning()` — kui `showReasoning: true`, renderdab dialoog need kokkuvolditavas paneelis **Mõtlemine** tulemuse välja kohal (paneel on vaikimisi peidetud). Arutlusväljund on ainult kuvamiseks ja seda ei lisata kunagi redaktorisse.

Et kasutaja saaks mudeli mõtlemisrežiimi päringu kaupa ümber lülitada, sea AI valikutes `thinking: true`. Dialoog näitab siis lülitit **Mõtlemine** (vaikimisi sees, lähtestatakse iga avamisel); plugin kirjutab lüliti väärtuse päringusse kujul `enable_thinking: true | false`, nii et sa ei pea (ega peaks) `enable_thinking`ut ise `chatCompletionOptions` sees seadma:

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

Kui `thinking` on `false` või puudub, lülitit ei näidata ja plugin saadab `enable_thinking: false`, nii et vaikimisi mõtlevad mudelid (Qwen3, DeepSeek, …) ei mõtle.

Et kasutaja saaks mõtlemisnõuet päringu kaupa valida, sea AI valikutes `reasoningEffort`. Dialoog näitab siis rippmenüüd **Mõtlemisnõue**, mis täidetakse `options` põhjal — kohandatud nõudmistasemed (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Laiendus lisab rippmenüüsse alati ise üksuse `default` (mõtlemisrežiimi baastase), nii et sa ei loetle `default`i oma konfiguratsioonis kunagi; valiku väli `default` valib dialoogi avamisel ette ühe sinu kohandatud tasemetest (muidu valitakse ette `default`) ja väärtus lähtestatakse iga avamisel.
Valitud väärtus otsustab, mida plugin päringusse kirjutab: `default` säilitab mõtlemisrežiimi — lüliti **Mõtlemine** jääb aktiivseks ja juhib `enable_thinking`ut; mis tahes muu väärtus saadetakse selle asemel kujul `reasoning_effort` ja lüliti Mõtlemine on keelatud, kuni see väärtus on valitud (pakkujad lükkavad `enable_thinking` ja `reasoning_effort` ühes päringus tagasi).
Rippmenüüd näidatakse ainult siis, kui `thinking` on lubatud ja lüliti Mõtlemine on sees — mõtlemise väljalülitamine peidab selle ja `reasoning_effort` ei saadeta (päring langeb tagasi `enable_thinking: false` peale). Kui `options` puudub või on tühi, ei renderdata rippmenüüd üldse:

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

Paneel **Mõtlemine** on vaikimisi peidetud (`showReasoning` on vaikimisi `false`). Sea `showReasoning: true`, et näidata kokkuvolditavat paneeli, mis voogedastab mudeli arutlusprotsessi (`reasoning_content` delta), hoides mõtlemise sees — mudel arutleb endiselt ja tulemust rakendatakse samamoodi, lisaks kuvatakse vaid samm-sammuline arutlus:

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

Kohandatud viibanäited asendavad lokaliseeritud vaikeväärtused:

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

`tokenProvider` ja `storage` on valikulised tarbija omanduses olevad konksud otseste brauseriintegratsioonide jaoks. Brauserikoodi või brauserisalvestusse pandud API võtmed või pakkuja tokenid on kasutajatele nähtavad ja neid ei tohi pidada saladusteks. Tootmissaladuste jaoks eelista ülaltoodud backend-adapteri mustrit.

Kasuta `mode: 'insert' | 'replace' | 'append'`, et valida dialoogi toiminguenupu lisamisrežiim ette (**Sisestamine** / **Asenda valik** / **Lõpule lisamine**). Ilma `mode`ita on nupu vaikeväärtus **Asenda valik**, kui dialoogi avamisel on tekst valitud, ja muidu **Sisestamine**. Toiminguenupp on jagatud nupp: põhiosa rakendab tulemuse ette valitud režiimis ja selle paremal olev väike „veel“ (⋮) osa avab menüü teiste režiimidega — klõps ühel rakendab tulemuse kohe selles režiimis.

Kui redaktoril on `limit` (märgipiirang), kuvatakse tulemuse välja all märgiloendur `generated / limit` niipea, kui tulemus on genereeritud (see uueneb voogedastuse ajal reaalajas ja muutub pehmelt punaseks, kui piir ületatakse).
Dialoog näitab ka hoiatust `ai.limit_exceeded` kohe pärast genereerimist, kui AI väljund ületaks piiri.
Selles olekus on nupp **Sisestamine** ja selle alternatiivrežiimide menüü keelatud — laiendus `CharacterCount` lükkab tagasi iga lisamise, mis kasvataks dokumendi üle piiri, seega rakendatakse tulemus kõik-või-mitte-midagi põhimõttel: see lisatakse täielikult, kui see mahub, või ei lisata üldse, kui see ületab piiri.
Toimingu uuesti lubamiseks lühenda tulemust:

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

Kasuta `systemPrompt`, `temperature`, `chatCompletionOptions` või `createMessages(context)`, et kohandada OpenAI-ühilduvat chat-completions päringut. `context` sisaldab `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` on valiku lõigu tekst selle ümber (kumbki kuni 500 märki, ilma valikuta tühi) — saada need koos valikuga, muidu peab mudel fragmenti kogu tekstiks ja täiendab seda.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Tüüp:** `String`
- **Vaikeväärtus:** `undefined`

Alternatiiv kohandatud `aiProvider`ile: suuna AI funktsioon backend-LLM-i lõpp-punktile ja Tiptapify koostab ning saadab päringu ise. Backend saab minimaalse JSON-sisu:

- **Alati:** `prompt` (dialoogis sisestatud päring) ja `instruction` (sinu `systemPrompt`, kohandatud `createMessages` süsteemisõnum või sisseehitatud vaikeväärtus).
- **Valikuline, saadetakse ainult määramisel:** `stream` (ainult `true`), `thinking` (dialoogi lüliti **Mõtlemine**, ainult `true`), `reasoning_effort` (valitud nõudmistase) ja `model`.

Vastus aktsepteeritakse leebelt: tavaline string, objekt `{ content }` või OpenAI-ühilduv `choices` sisu. Kui päringus on `stream: true`, loetakse vastuse keha SSE-voona (`data:` read, lõpetatud `data: [DONE]`-ga): aktsepteeritakse OpenAI-stiilis deltasid (`choices[0].delta.content` / `.reasoning_content`), lihtsat tükki `{ type: 'content' | 'reasoning', data }`, lamedat tükki `{ content, reasoning_content }` ja lihttekstilisi `data` ridu. Kui backend ignoreerib `stream`i ja vastab tavalise kehaga, kasutatakse seda keha. Mitte-OK vastus toob dialoogis esile backendi veateate (JSON `{ error }` / `{ message }` või toores keha). Nupp **Peata** ja dialoogi sulgemine katkestavad pooleliolevat päringut; osaliselt voogedastatud sisu jääb tulemuse väljale.

Kui määratud on nii `aiProvider` kui `aiEndpoint`, võidab `aiProvider`.

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

- **Tüüp:** `Record<string, string>`
- **Vaikeväärtus:** `undefined`

Lisapäised, mis saadetakse koos `aiEndpoint` päringuga ja liidetakse `Content-Type: application/json` peale. Siin seatud päis `Authorization` jäetakse nii, nagu see on; muidu saadetakse `tokenProvider` token (kui see on määratud) kujul `Authorization: Bearer <token>`.

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

- **Tüüp:** `String`
- **Vaikeväärtus:** `'Inter'`

Redaktori sisu vaikefondiperekond.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Tüüp:** `String`
- **Vaikeväärtus:** `'px'`

Fondisuuruse väärtuste mõõtühik.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Tüüp:** `String`
- **Vaikeväärtus:** `'0'`

Redaktori konteineri äärise raadius. Aktsepteerib Vuetify raadiuse väärtusi (`sm`, `md`, `lg`, `xl`, `pill` jne).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Tüüp:** `variantBtnTypes`
- **Vaikeväärtus:** `'tonal'`

Vuetify nupuvariant tööriistariba nuppudele. Väärtust jagatakse iga tööriistariba komponendiga redaktori konfiguratsiooni kaudu — kohandatud komponendid saavad seda lugeda funktsiooniga [`useTiptapifyConfig`](/et/api/types#usetiptapifyconfig). Vaata [`variantBtnTypes`](/et/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Tüüp:** `variantFieldTypes`
- **Vaikeväärtus:** `'outlined'`

Vuetify variant tööriistariba rippmenüüväljadele. Väärtust jagatakse iga tööriistariba komponendiga redaktori konfiguratsiooni kaudu — kohandatud komponendid saavad seda lugeda funktsiooniga [`useTiptapifyConfig`](/et/api/types#usetiptapifyconfig). Vaata [`variantFieldTypes`](/et/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Tüüp:** `Array<toolbarSections>`
- **Vaikeväärtus:** `[]`

Anna kohandatud tööriistariba sektsioonid tööriistariba üksuste laiendamiseks või lisamiseks. Iga sektsiooni komponendid saavad lugeda jagatud redaktori konfiguratsiooni funktsiooniga [`useTiptapifyConfig`](/et/api/types#usetiptapifyconfig). Vaata [kohandatud tööriistariba](/et/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Tüüp:** `Boolean`
- **Vaikeväärtus:** `true`

Luba interaktiivne stiilide rakendamine.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Tüüp:** `Boolean`
- **Vaikeväärtus:** `false`

Näita redaktori laadimise ajal määramatut edenemisriba.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Tüüp:** `String`
- **Vaikeväärtus:** `'default'`

Laadimisedenemisriba värv. Aktsepteerib Vuetify teemavärvide väärtusi.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Tüüp:** `String`
- **Vaikeväärtus:** `'1px'`

Laadimisedenemisriba kõrgus.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Tüüp:** `Number`
- **Vaikeväärtus:** `0`

Alates nii paljust järjestikusest pildist (nende vahel pole midagi) paigutab redaktor need nummerdatud kolmeveerulisse ruudustikku saitide jaoks, mis näitavad selliseid pilte slaidiseansina. `0` lülitab selle välja.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Tüüp:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/et/api/types#tiptapifyskininput))
- **Vaikeväärtus:** `'default'`

Redaktori ümbrise välimus: tööriistariba, hõljumenüüd, rippmenüüd, dialoogid, jalus.

- `default` — klassikaline ilme: kõrgendatud tööriistariba, nuppude rühmad kõrgendatud kastidena, Vuetify nupud esmase vajutatud olekuga.
- `pastel` — rahulik ilme: lame toonitud tööriistariba hästi õhukese joone all, läbipaistvad nupud neutraalse vajutatud olekuga, kerged rippmenüüd, pehmed dialoogid.

Funktsioonid (pildiallkirjad, slaidiseansid, joonduse rippmenüü, loendistiilid) töötavad mõlemas nahas ühtmoodi.

```vue
<Tiptapify skin="pastel" />
```

Võid anda ka sisemise nahaobjekti: tokenite ülekirjutused (`colors` / `metrics`) ja kujulipud, soovi korral `extends` registreeritud nahale. See lahendatakse `default`i (või selle baasi) peal, renderdatakse klassi `tiptapify-skin-inline` all (`tiptapify-skin-{name}`, kui objektil on `name`) ning selle tokenid satuvad redaktori juurelemendile CSS-muutujatena `--tf-*`. Kohandatud nimed tulevad funktsioonist `registerSkin('mint', { … })` — tokenitabelit ja retsepte vaata [nahkade juhendist](/et/guide/skins).

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Tüüp:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/et/api/types#tiptapifyuploadoptions))
- **Vaikeväärtus:** `null`

[Üleslaadimiste](/et/guide/uploads) lõpp-punkt: pildi- ja videodialoogides valitud failid (ning video kaanepilt, lingikaardi pilt) saadetakse sinna päringuga `POST {endpoint}` (multipart `file` ja `kind`) ning dokument säilitab URL-i, millega lõpp-punkt vastab (`{ "url": … }`).

Ilma selleta võtab pildidialoog siiski faili vastu: valitud pilt (ja video kaanepilt) manustatakse dokumenti base64 data URL-ina ning base64-pildid säilivad dokumendi laadimisel. Videodialoog pakub valikut **Laadi üles** ainult selle propiga. Kui `upload` on määratud, eemaldatakse base64-pildid dokumendi laadimisel.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Tüüp:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/et/api/types#tiptapifycontentstyles))
- **Vaikeväärtus:** `'inline'`

Kuidas salvestatud HTML kannab linkide kaartide, pealdisega piltide, videote, manusesisu ja ülesandeloendite ilmet (vt [Sisu stiilid](/et/guide/content-styles)): `inline` kirjutab selle nende `style`-atribuutidesse, nii et sait näitab HTML-i sellisena, nagu see on; `classes` jätab alles ainult klassid, saidile, mis laadib `tiptapify/content.css`. Redaktor eirab neid stiile HTML-i laadimisel, seega laaditakse mõlemat liiki HTML tagasi ühtemoodi.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Tüüp:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/et/api/types#tiptapifylinkpreviewoptions))
- **Vaikeväärtus:** `null`

[Lingikaartide](/et/guide/link-cards) backend-lõpp-punkt: see loeb lehtede OpenGraph-andmeid, mida brauser ei saa (CORS). Redaktor kontrollib seda käivitumisel kätlusega (`GET {endpoint}` peab vastama `200 { "tiptapifyLinkPreview": 1 }`); kuni see ei vasta, ei paku miski kaarti.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Sündmused {#events}

### `editor-ready` {#editor-ready}

Väljastatakse, kui redaktori instants on valmis.

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

Väljastatakse, kui redaktori sisu muutub.

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

Toetab `v-model` sidumist.

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

Redaktori instants ja funktsioon `t` on kättesaadavad Vue provide/inject kaudu:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
