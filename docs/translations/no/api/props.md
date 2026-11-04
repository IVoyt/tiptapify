# Props {#props}

## `<Tiptapify>`-props {#tiptapify-props}

### `content` {#content}

- **Type:** `String | Object`
- **Default:** `''`

Innledende innhold i editoren. Tar imot en HTML-streng eller et Tiptap JSON-objekt.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` er bare det **innledende** innholdet. For toveis binding bruker du `v-model` (se `modelValue`).

### `modelValue` {#modelvalue}

- **Type:** `String | Object`
- **Default:** `''`

Verdien for toveis binding med `v-model`. Bruk `v-model` for å holde en reaktiv verdi synkronisert med editoren. Ved hver endring sender komponenten `update:modelValue` med den nyeste HTML-en, som `v-model` skriver tilbake til din ref. Når bare `v-model` brukes (uten `:content`), er den bundne verdien editorens innledende innhold.

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

- **Type:** `String`
- **Default:** `''`

Plassholdertekst som vises når editoren er tom.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Type:** `Number`
- **Default:** `null`

Minimumshøyde på innholdsområdet i editoren, i piksler.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Type:** `Boolean`
- **Default:** `true`

Vis eller skjul verktøylinjen.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Type:** `Array<String> | Object`
- **Default:** `[]`

Verktøylinjeelementene som skal vises. Send en liste med elementnavn eller et objekt med navngitte seksjoner. Se [Toolbar Items](/no/api/toolbar-items).
I en liste deler `'|'` elementene inn i grupper (i den rekkefølgen, uansett hvilke seksjoner knappene kommer fra), og `'~'` flytter elementene etter seg til slutten av verktøylinjen. Med grupper beholder et navn som ikke er et innebygd element plassen til den egendefinerte knappen med det navnet fra `customExtensions`. Finnes det ingen slik knapp, fjernes plassen.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Type:** `Boolean`
- **Default:** `false`

Når `true`, angir `items`-prop-en elementene som skal **utelates** i stedet for å tas med.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Type:** `Boolean`
- **Default:** `true`

Vis boblemenyen når tekst er markert: én rad med ikonknapper i grupper — fet, kursiv, understreking, gjennomstreking | hevet skrift, senket skrift | utheving, innebygd kode | lenke | fjern formatering. Hver knapp har et verktøytips med snarveien sin og vises som aktiv når merket ligger på utvalget. Menyen skjules for en markert blokk (bilde, widget), inne i kode og når hele dokumentet er markert.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Type:** `Boolean`
- **Default:** `true`

Vis den flytende menyen på tomme linjer: overskrift 1, overskrift 2 og en punktliste, i samme rad med ikonknapper som boblemenyen.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Type:** `Boolean`
- **Default:** `true`

Aktiver menyen for skråstrekkommandoer (skriv `/` for å åpne den).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Type:** `Boolean`
- **Default:** `true`

Vis ordantall i bunnteksten til editoren.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Type:** `Boolean`
- **Default:** `true`

Vis tegnantall i bunnteksten til editoren.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Type:** `Number | null`
- **Default:** `null`

Maksimalt antall tegn som Tiptap-utvidelsen `CharacterCount` tillater. Sett `null` eller utelat prop-en for å la redigeringen være ubegrenset. Når verdien er større enn `0`, viser bunnteksten en sirkulær SVG-fremdriftsindikator med fargekodede terskler.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Type:** `String`
- **Default:** `'purple'`

Standardfargen på den sirkulære fremdriftsindikatoren i bunnteksten når `limit` er satt.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Type:** `String`
- **Default:** `'orange'`

Fargen på fremdriftsindikatoren når bruken overstiger 75 % av grensen.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Type:** `String`
- **Default:** `'red'`

Fargen på fremdriftsindikatoren når tegngrensen er nådd.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Type:** `TiptapifyFooterAlignment`
- **Default:** `'end'`

Justering av statuselementene i bunnteksten. Tar imot `'start'`, `'center'` eller `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Type:** `Boolean | TiptapifyAiOptions`
- **Default:** `false`

Aktiverer verktøylinjeelementet `ai`. Editoren bygger en OpenAI-kompatibel `/v1/chat/completions`-forespørsel og sender den til `aiProvider`. Bruk provider-callbacken til å kalle backend, BFF, et OAuth-beskyttet endepunkt, LM Studio eller en SDK-wrapper.

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

Eksempel med lokal LLM i LM Studio:

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

Strømming støttes ved å sette `stream: true` og sende tokens via `stream`-argumentet til `aiProvider`. Resultatfeltet i AI-dialogen oppdateres fortløpende mens delene kommer inn, og en **Stopp**-knapp avbryter forespørselen som pågår:

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

Send `stream.signal` til `fetch` (eller SDK-kallet ditt), slik at forespørselen avbrytes når brukeren klikker **Stopp** eller lukker dialogen. Delvis strømmet innhold blir stående i resultatfeltet og kan brukes eller forkastes. Providere som ikke strømmer, kan ignorere `stream`-argumentet helt — det er valgfritt og bakoverkompatibelt.

Resonnerende modeller (Qwen thinking, DeepSeek, o-serien) strømmer «tankene» sine i en egen `reasoning_content`-delta. Videresend disse delene via `stream.onReasoning()` — med `showReasoning: true` viser dialogen dem i et sammenleggbart **Tenker**-panel over resultatfeltet (panelet er skjult som standard). Resonnementet vises bare og settes aldri inn i editoren.

For å la brukeren slå modellens tenkemodus av og på per forespørsel setter du `thinking: true` i AI-alternativene. Dialogen viser da en **Tenker**-bryter (på som standard, tilbakestilles ved hver åpning). Pluginen skriver verdien til bryteren inn i forespørselen som `enable_thinking: true | false`, så du trenger ikke lenger (og bør ikke) sette `enable_thinking` selv i `chatCompletionOptions`:

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

Når `thinking` er `false` eller utelatt, vises ikke bryteren, og pluginen sender `enable_thinking: false`, slik at modeller som tenker som standard (Qwen3, DeepSeek, …) ikke tenker.

For å la brukeren velge resonnementsinnsats per forespørsel setter du `reasoningEffort` i AI-alternativene. Dialogen viser da en nedtrekksliste for **Resonnementsevne** fylt fra `options` — egendefinerte innsatsnivåer (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Utvidelsen legger alltid selv til et `default`-element i listen (grunnlinjen for tenkemodus), så du lister aldri `default` i konfigurasjonen din. Feltet `default` i alternativet forhåndsvelger ett av dine egendefinerte nivåer når dialogen åpnes (ellers er `default` forhåndsvalgt), og verdien tilbakestilles ved hver åpning.
Den valgte verdien avgjør hva pluginen skriver inn i forespørselen: `default` beholder tenkemodusen — **Tenker**-bryteren er aktiv og styrer `enable_thinking`. Enhver annen verdi sendes som `reasoning_effort` i stedet, og Tenker-bryteren er deaktivert mens den verdien er valgt (providere avviser `enable_thinking` og `reasoning_effort` i samme forespørsel).
Nedtrekkslisten vises bare når `thinking` er aktivert og Tenker-bryteren er på — slås tenkingen av, skjules den, og `reasoning_effort` sendes ikke (forespørselen faller tilbake til `enable_thinking: false`). Når `options` mangler eller er tom, vises ikke nedtrekkslisten i det hele tatt:

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

**Tenker**-panelet er skjult som standard (`showReasoning` er `false` som standard). Sett `showReasoning: true` for å vise et sammenleggbart panel som strømmer modellens resonnement (`reasoning_content`-delta) mens tenkingen holdes på — modellen resonnerer fortsatt og resultatet brukes på samme måte, bare resonnementet trinn for trinn vises i tillegg:

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

Egendefinerte prompteksempler erstatter de lokaliserte standardene:

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

`tokenProvider` og `storage` er valgfrie kroker som eies av forbrukeren, for direkte integrasjoner i nettleseren. API-nøkler eller provider-tokens i nettleserkode eller nettleserlagring er synlige for brukerne og må ikke behandles som hemmeligheter. Foretrekk backend-adaptermønsteret ovenfor for produksjonshemmeligheter.

Bruk `mode: 'insert' | 'replace' | 'append'` for å forhåndsvelge innsettingsmodus på handlingsknappen i dialogen (**Sett inn** / **Erstatt** / **Legg til i slutten**). Uten `mode` er knappen som standard **Erstatt** når tekst er markert idet dialogen åpnes, og ellers **Sett inn**. Handlingsknappen er en delt knapp: hoveddelen bruker resultatet i den forhåndsvalgte modusen, og en liten «mer»-del (⋮) til høyre åpner en meny med de andre modusene — et klikk på en av dem bruker resultatet i den modusen med en gang.

Når editoren har en `limit` (tegngrense), vises en tegnteller `generated / limit` under resultatfeltet så snart et resultat er generert (den oppdateres fortløpende under strømming og blir myk rød når grensen ville bli overskredet).
Dialogen viser også advarselen `ai.limit_exceeded` rett etter genereringen hvis AI-resultatet ville overskride grensen.
I den tilstanden er **Sett inn**-knappen og menyen med alternative moduser deaktivert — utvidelsen `CharacterCount` avviser enhver innsetting som ville gjøre dokumentet lengre enn grensen, så resultatet brukes helt eller ikke i det hele tatt: det settes inn fullt ut når det får plass, og ellers ikke i det hele tatt.
Kort ned resultatet for å aktivere handlingen igjen:

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

Bruk `systemPrompt`, `temperature`, `chatCompletionOptions` eller `createMessages(context)` for å tilpasse den OpenAI-kompatible chat-completions-forespørselen. `context` inneholder `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` er teksten i avsnittet rundt utvalget (opptil 500 tegn hver, tom uten utvalg) — send dem sammen med utvalget, ellers tar modellen fragmentet for hele teksten og fullfører det.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Type:** `String`
- **Default:** `undefined`

Et alternativ til en egendefinert `aiProvider`: pek AI-funksjonen mot et LLM-endepunkt i backend, så bygger og sender tiptapify forespørselen selv. Backend mottar en minimal JSON-nyttelast:

- **Alltid:** `prompt` (forespørselen skrevet i dialogen) og `instruction` (din `systemPrompt`, systemmeldingen fra en egendefinert `createMessages`, eller den innebygde standarden).
- **Valgfritt, sendes bare når satt:** `stream` (bare `true`), `thinking` (**Tenker**-bryteren i dialogen, bare `true`), `reasoning_effort` (det valgte innsatsnivået) og `model`.

Svaret godtas liberalt: en ren streng, et `{ content }`-objekt eller en OpenAI-kompatibel `choices`-nyttelast. Når forespørselen har `stream: true`, leses svarkroppen som en SSE-strøm (`data:`-linjer, avsluttet med `data: [DONE]`): OpenAI-lignende deltaer (`choices[0].delta.content` / `.reasoning_content`), en enkel `{ type: 'content' | 'reasoning', data }`-del, en flat `{ content, reasoning_content }`-del og rene tekst-`data`-linjer godtas alle. Hvis backend ignorerer `stream` og svarer med en vanlig kropp, brukes den kroppen i stedet. Et svar som ikke er OK, viser backendens feilmelding (JSON `{ error }` / `{ message }` eller den rå kroppen) i dialogen. En **Stopp**-knapp og lukking av dialogen avbryter forespørselen som pågår. Delvis strømmet innhold blir stående i resultatfeltet.

Hvis både `aiProvider` og `aiEndpoint` er satt, vinner `aiProvider`.

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

- **Type:** `Record<string, string>`
- **Default:** `undefined`

Ekstra headere som sendes med `aiEndpoint`-forespørselen, flettet over `Content-Type: application/json`. En `Authorization`-header satt her beholdes som den er. Ellers sendes et token fra `tokenProvider` (når satt) som `Authorization: Bearer <token>`.

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

- **Type:** `String`
- **Default:** `'Inter'`

Standard skriftfamilie for innholdet i editoren.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Type:** `String`
- **Default:** `'px'`

Måleenhet for skriftstørrelser.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Type:** `String`
- **Default:** `'0'`

Hjørneradius for editorcontaineren. Tar imot Vuetify-radiusverdier (`sm`, `md`, `lg`, `xl`, `pill` osv.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Type:** `variantBtnTypes`
- **Default:** `'tonal'`

Vuetify-knappvariant for verktøylinjeknappene. Verdien deles med alle verktøylinjekomponenter via editorkonfigurasjonen — egendefinerte komponenter kan lese den med [`useTiptapifyConfig`](/no/api/types#usetiptapifyconfig). Se [`variantBtnTypes`](/no/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Type:** `variantFieldTypes`
- **Default:** `'outlined'`

Vuetify-variant for nedtrekksfeltene i verktøylinjen. Verdien deles med alle verktøylinjekomponenter via editorkonfigurasjonen — egendefinerte komponenter kan lese den med [`useTiptapifyConfig`](/no/api/types#usetiptapifyconfig). Se [`variantFieldTypes`](/no/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Type:** `Array<toolbarSections>`
- **Default:** `[]`

Angi egendefinerte verktøylinjeseksjoner for å utvide eller legge til verktøylinjeelementer. Komponentene i hver seksjon kan lese den delte editorkonfigurasjonen med [`useTiptapifyConfig`](/no/api/types#usetiptapifyconfig). Se [Custom Toolbar](/no/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Type:** `Boolean`
- **Default:** `true`

Aktiver interaktiv bruk av stiler.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Type:** `Boolean`
- **Default:** `false`

Vis en ubestemt fremdriftslinje mens editoren lastes.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Type:** `String`
- **Default:** `'default'`

Fargen på lasteindikatoren. Tar imot Vuetify-temafarger.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Type:** `String`
- **Default:** `'1px'`

Høyden på lasteindikatoren.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Type:** `Number`
- **Default:** `0`

Fra så mange bilder på rad (uten noe mellom dem) legger editoren dem ut som et nummerert rutenett med tre kolonner, for nettsteder som viser slike bilder som en slider. `0` slår det av.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Type:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/no/api/types#tiptapifyskininput))
- **Default:** `'default'`

Utseendet til editorens ramme: verktøylinje, boblemenyer, nedtrekkslister, dialoger, bunntekst.

- `default` — det klassiske utseendet: en hevet verktøylinje, knappegrupper som hevede bokser, Vuetify-knapper med en primær nedtrykt tilstand.
- `pastel` — det rolige utseendet: en flat, tonet verktøylinje under en hårfin strek, gjennomsiktige knapper med en nøytral nedtrykt tilstand, lette nedtrekksmenyer, myke dialoger.

Funksjonene (bildetekster, slidere, justeringslisten, listestiler) fungerer likt i begge skinn.

```vue
<Tiptapify skin="pastel" />
```

Du kan også sende et inline skin-objekt: token-overstyringer (`colors` / `metrics`) og formflagg, eventuelt med `extends` av et registrert skin. Det løses over `default` (eller basisen sin), gjengis under klassen `tiptapify-skin-inline` (`tiptapify-skin-{name}` når objektet har en `name`), og tokenene havner som `--tf-*` CSS-variabler på editorroten. Egendefinerte navn kommer fra `registerSkin('mint', { … })` — se [Skins guide](/no/guide/skins) for tokentabellen og oppskriftene.

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Type:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/no/api/types#tiptapifyuploadoptions))
- **Default:** `null`

Endepunktet for [opplastinger](/no/guide/uploads): filer valgt i bilde- og videodialogene (og et plakatbilde for video, bildet til et lenkekort) sendes dit med `POST {endpoint}` (multipart `file` og `kind`), og dokumentet beholder URL-en det svarer med (`{ "url": … }`).

Uten den tar bildedialogen likevel imot en fil: et valgt bilde (og et plakatbilde for video) bygges inn i dokumentet som en base64-data-URL, og base64-bilder beholdes når dokumentet lastes. Videodialogen tilbyr **Last opp** bare med denne prop-en. Når `upload` er satt, fjernes base64-bilder når dokumentet lastes.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Type:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/no/api/types#tiptapifycontentstyles))
- **Standard:** `'inline'`

Hvordan den lagrede HTML-en bærer utseendet til lenkekort, bilder med bildetekster, videoer, innebygde elementer og oppgavelister (se [Innholdsstiler](/no/guide/content-styles)): `inline` skriver det i elementenes `style`-attributter, slik at et nettsted viser HTML-en som den er; `classes` beholder bare klasser, for et nettsted som laster `tiptapify/content.css`. Editoren ignorerer disse stilene når HTML lastes inn, så begge typene HTML lastes inn igjen likt.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Type:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/no/api/types#tiptapifylinkpreviewoptions))
- **Default:** `null`

Backend-endepunktet for [lenkekort](/no/guide/link-cards): det leser OpenGraph-dataene til sider, noe en nettleser ikke kan (CORS). Editoren sjekker det med et håndtrykk når den starter (`GET {endpoint}` må svare `200 { "tiptapifyLinkPreview": 1 }`). Frem til det svarer, tilbyr ingenting et kort.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Hendelser {#events}

### `editor-ready` {#editor-ready}

Utløses når editorinstansen er klar.

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

Utløses når innholdet i editoren endres.

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

Støtter `v-model`-binding.

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

Editorinstansen og funksjonen `t` er tilgjengelige via Vues provide/inject:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
