# Props {#props}

## `<Tiptapify>` Props {#tiptapify-props}

### `content` {#content}

- **Type:** `String | Object`
- **Standaard:** `''`

Initiële inhoud van de editor. Accepteert een HTML-string of een Tiptap JSON-object.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` is alleen de **initiële** inhoud; gebruik voor tweerichtingsbinding `v-model` (zie `modelValue`).

### `modelValue` {#modelvalue}

- **Type:** `String | Object`
- **Standaard:** `''`

Waarde voor tweerichtingsbinding met `v-model`. Gebruik `v-model` om een reactieve waarde gesynchroniseerd te houden met de editor. Bij elke bewerking zendt de component `update:modelValue` uit met de nieuwste HTML, die `v-model` terugschrijft naar je ref. Wordt alleen `v-model` gebruikt (zonder `:content`), dan is de gebonden waarde de initiële inhoud van de editor.

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
- **Standaard:** `''`

Plaatsaanduidingstekst die wordt getoond wanneer de editor leeg is.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Type:** `Number`
- **Standaard:** `null`

Minimale hoogte van het inhoudsgebied van de editor in pixels.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Type:** `Boolean`
- **Standaard:** `true`

De toolbar tonen of verbergen.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Type:** `Array<String> | Object`
- **Standaard:** `[]`

Toolbaritems die worden getoond. Geef een array met itemnamen of een object met benoemde secties door. Zie [Toolbaritems](/nl/api/toolbar-items).
In een array verdeelt `'|'` de items in groepen (in die volgorde, ongeacht uit welke secties de knoppen komen) en duwt `'~'` de items erna naar het einde van de toolbar. Bij groepen houdt een naam die geen ingebouwd item is een plek vrij voor de aangepaste knop met die naam uit `customExtensions`; zonder zo'n knop vervalt de plek.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Type:** `Boolean`
- **Standaard:** `false`

Wanneer `true`, geeft de prop `items` de items op die moeten worden **uitgesloten** in plaats van opgenomen.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Type:** `Boolean`
- **Standaard:** `true`

Toon het bubbelmenu wanneer tekst is geselecteerd: één rij pictogramknoppen in groepen — vet, cursief, onderstrepen, doorhalen | superscript, subscript | markeren, inline code | link | opmaak wissen. Elke knop heeft een tooltip met zijn sneltoets en toont wanneer zijn mark op de selectie staat. Het verbergt zich voor een geselecteerd blok (afbeelding, widget), binnen code en wanneer het hele document is geselecteerd.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Type:** `Boolean`
- **Standaard:** `true`

Toon het zwevende menu op lege regels: kop 1, kop 2 en een lijst met opsommingstekens, in dezelfde rij pictogramknoppen als het bubbelmenu.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Type:** `Boolean`
- **Standaard:** `true`

Schakel het slash-commandomenu in (typ `/` om het te openen).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Type:** `Boolean`
- **Standaard:** `true`

Toon het aantal woorden in de voettekst van de editor.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Type:** `Boolean`
- **Standaard:** `true`

Toon het aantal tekens in de voettekst van de editor.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Type:** `Number | null`
- **Standaard:** `null`

Maximaal aantal tekens dat de Tiptap-extensie `CharacterCount` toestaat. Stel `null` in of laat de prop weg voor onbeperkt bewerken. Bij een waarde groter dan `0` toont de voettekst een cirkelvormige SVG-voortgangsindicator met kleurgecodeerde drempels.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Type:** `String`
- **Standaard:** `'purple'`

Standaardkleur van de cirkelvormige voortgangsindicator in de voettekst wanneer `limit` is ingesteld.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Type:** `String`
- **Standaard:** `'orange'`

Kleur van de voortgangsindicator wanneer het gebruik meer dan 75% van de limiet bedraagt.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Type:** `String`
- **Standaard:** `'red'`

Kleur van de voortgangsindicator wanneer de tekenlimiet is bereikt.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Type:** `TiptapifyFooterAlignment`
- **Standaard:** `'end'`

Uitlijning van de statusitems in de voettekst. Accepteert `'start'`, `'center'` of `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Type:** `Boolean | TiptapifyAiOptions`
- **Standaard:** `false`

Schakelt het toolbaritem `ai` in. De editor bouwt een OpenAI-compatibel `/v1/chat/completions`-verzoek en geeft het door aan `aiProvider`. Gebruik de provider-callback om je backend, BFF, met OAuth beveiligd endpoint, LM Studio of SDK-wrapper aan te roepen.

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

Voorbeeld met lokale LLM LM Studio:

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

Streamingoutput wordt ondersteund door `stream: true` in te stellen en tokens door te geven via het argument `stream` van `aiProvider`. Het resultaatveld in de AI-dialoog wordt live bijgewerkt terwijl chunks binnenkomen, en een knop **Stoppen** annuleert het lopende verzoek:

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

Geef `stream.signal` door aan `fetch` (of je SDK-aanroep) zodat het verzoek wordt geannuleerd wanneer de gebruiker op **Stoppen** klikt of de dialoog sluit. Gedeeltelijk gestreamde inhoud blijft in het resultaatveld staan en kan worden toegepast of weggegooid. Providers die niet streamen kunnen het argument `stream` gewoon negeren — het is optioneel en achterwaarts compatibel.

Redeneermodellen (Qwen thinking, DeepSeek, o-series) streamen hun "gedachten" in een aparte delta `reasoning_content`. Stuur die chunks door via `stream.onReasoning()` — bij `showReasoning: true` toont de dialoog ze in een inklapbaar paneel **Nadenken** boven het resultaatveld (het paneel is standaard verborgen). Redeneeroutput is alleen om te tonen en wordt nooit in de editor ingevoegd.

Om de gebruiker per verzoek de denkmodus van het model te laten wisselen, stel je `thinking: true` in de AI-opties in. De dialoog toont dan een schakelaar **Nadenken** (standaard aan, bij elke keer openen gereset); de plugin schrijft de waarde van de schakelaar in het verzoek als `enable_thinking: true | false`, dus je hoeft `enable_thinking` niet meer zelf in `chatCompletionOptions` in te stellen (en zou dat ook niet moeten doen):

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

Wanneer `thinking` `false` is of ontbreekt, wordt de schakelaar niet getoond en stuurt de plugin `enable_thinking: false`, zodat modellen die standaard nadenken (Qwen3, DeepSeek, …) dat niet doen.

Om de gebruiker per verzoek de denk-inspanning te laten kiezen, stel je `reasoningEffort` in de AI-opties in. De dialoog toont dan een dropdown **Denk-inspanning**, gevuld vanuit `options` — eigen inspanningsniveaus (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
De extensie voegt zelf altijd een item `default` aan de dropdown toe (de basislijn van de denkmodus), dus je neemt `default` nooit op in je configuratie; het veld `default` van de optie selecteert vooraf een van je eigen niveaus wanneer de dialoog opent (anders is `default` vooraf geselecteerd), en de waarde wordt bij elke keer openen gereset.
De geselecteerde waarde bepaalt wat de plugin in het verzoek schrijft: `default` behoudt de denkmodus — de schakelaar **Nadenken** blijft actief en bepaalt `enable_thinking`; elke andere waarde wordt in plaats daarvan als `reasoning_effort` verstuurd, en de schakelaar Nadenken is uitgeschakeld zolang die waarde is geselecteerd (providers weigeren `enable_thinking` en `reasoning_effort` in één verzoek).
De dropdown wordt alleen getoond wanneer `thinking` is ingeschakeld en de schakelaar Nadenken aan staat — nadenken uitzetten verbergt hem en `reasoning_effort` wordt niet verstuurd (het verzoek valt terug op `enable_thinking: false`). Wanneer `options` ontbreekt of leeg is, wordt de dropdown helemaal niet gerenderd:

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

Het paneel **Nadenken** is standaard verborgen (`showReasoning` is standaard `false`). Stel `showReasoning: true` in om een inklapbaar paneel te tonen dat het redeneerproces van het model (delta `reasoning_content`) streamt terwijl nadenken aan blijft — het model redeneert nog steeds en het resultaat wordt op dezelfde manier toegepast, alleen het stapsgewijze redeneren wordt er extra bij getoond:

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

Eigen promptvoorbeelden vervangen de gelokaliseerde standaardwaarden:

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

`tokenProvider` en `storage` zijn optionele, door de consument beheerde hooks voor directe browserintegraties. API-sleutels of providertokens in browsercode of browseropslag zijn zichtbaar voor gebruikers en mogen niet als geheimen worden behandeld. Geef voor productiegeheimen de voorkeur aan het backend-adapterpatroon hierboven.

Gebruik `mode: 'insert' | 'replace' | 'append'` om de invoegmodus op de actieknop van de dialoog vooraf te selecteren (**Invoegen** / **Vervangen** / **Aan het einde toevoegen**). Zonder `mode` staat de knop standaard op **Vervangen** wanneer er bij het openen van de dialoog tekst is geselecteerd en anders op **Invoegen**. De actieknop is een gesplitste knop: het hoofdgedeelte past het resultaat toe in de vooraf geselecteerde modus, en een klein "meer"-gedeelte (⋮) rechts ervan opent een menu met de andere modi — een klik erop past het resultaat direct in die modus toe.

Wanneer de editor een `limit` heeft (tekenlimiet), wordt onder het resultaatveld zodra een resultaat is gegenereerd een teller `generated / limit` getoond (hij wordt live bijgewerkt tijdens het streamen en wordt zacht rood wanneer de limiet zou worden overschreden).
De dialoog toont direct na het genereren ook de waarschuwing `ai.limit_exceeded` als de AI-output de limiet zou overschrijden.
In die staat zijn de knop **Invoegen** en het menu met alternatieve modi uitgeschakeld — de extensie `CharacterCount` weigert elke invoeging die het document voorbij de limiet zou laten groeien, dus het resultaat wordt helemaal of niet toegepast: het wordt volledig ingevoegd als het past, of helemaal niet als het de limiet overschrijdt.
Kort het resultaat in om de actie weer in te schakelen:

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

Gebruik `systemPrompt`, `temperature`, `chatCompletionOptions` of `createMessages(context)` om het OpenAI-compatibele chat-completions-verzoek aan te passen. `context` bevat `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` zijn de tekst van de alinea van de selectie eromheen (elk maximaal 500 tekens, leeg zonder selectie) — stuur ze mee met de selectie, anders houdt een model het fragment voor de hele tekst en maakt het af.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Type:** `String`
- **Standaard:** `undefined`

Alternatief voor een eigen `aiProvider`: richt de AI-functie op een backend-LLM-endpoint en tiptapify bouwt en verstuurt het verzoek zelf. De backend ontvangt een minimale JSON-payload:

- **Altijd:** `prompt` (het in de dialoog getypte verzoek) en `instruction` (je `systemPrompt`, het systeembericht van een eigen `createMessages`, of de ingebouwde standaardwaarde).
- **Optioneel, alleen verzonden indien ingesteld:** `stream` (alleen `true`), `thinking` (de schakelaar **Nadenken** van de dialoog, alleen `true`), `reasoning_effort` (het geselecteerde inspanningsniveau) en `model`.

Het antwoord wordt soepel geaccepteerd: een gewone string, een `{ content }`-object of een OpenAI-compatibele `choices`-payload. Bij `stream: true` wordt de responsebody gelezen als SSE-stream (`data:`-regels, afgesloten met `data: [DONE]`): deltas in OpenAI-stijl (`choices[0].delta.content` / `.reasoning_content`), een eenvoudige chunk `{ type: 'content' | 'reasoning', data }`, een platte chunk `{ content, reasoning_content }` en `data`-regels met gewone tekst worden allemaal geaccepteerd. Negeert de backend `stream` en antwoordt hij met een gewone body, dan wordt die body gebruikt. Een niet-OK-antwoord toont de foutmelding van de backend (JSON `{ error }` / `{ message }` of de ruwe body) in de dialoog. Een knop **Stoppen** en het sluiten van de dialoog breken het lopende verzoek af; gedeeltelijk gestreamde inhoud blijft in het resultaatveld staan.

Als zowel `aiProvider` als `aiEndpoint` zijn ingesteld, wint `aiProvider`.

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
- **Standaard:** `undefined`

Extra headers die met het verzoek aan `aiEndpoint` worden meegestuurd, samengevoegd over `Content-Type: application/json`. Een hier ingestelde `Authorization`-header blijft ongewijzigd; anders wordt een token van `tokenProvider` (indien ingesteld) verstuurd als `Authorization: Bearer <token>`.

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
- **Standaard:** `'Inter'`

Standaardlettertype voor de inhoud van de editor.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Type:** `String`
- **Standaard:** `'px'`

Maateenheid voor lettergroottewaarden.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Type:** `String`
- **Standaard:** `'0'`

Hoekafronding voor de editorcontainer. Accepteert Vuetify-radiuswaarden (`sm`, `md`, `lg`, `xl`, `pill`, enz.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Type:** `variantBtnTypes`
- **Standaard:** `'tonal'`

Vuetify-knopvariant voor toolbarknoppen. De waarde wordt via de editorconfiguratie gedeeld met elke toolbarcomponent — aangepaste componenten kunnen haar lezen met [`useTiptapifyConfig`](/nl/api/types#usetiptapifyconfig). Zie [`variantBtnTypes`](/nl/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Type:** `variantFieldTypes`
- **Standaard:** `'outlined'`

Vuetify-variant voor de dropdownvelden van de toolbar. De waarde wordt via de editorconfiguratie gedeeld met elke toolbarcomponent — aangepaste componenten kunnen haar lezen met [`useTiptapifyConfig`](/nl/api/types#usetiptapifyconfig). Zie [`variantFieldTypes`](/nl/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Type:** `Array<toolbarSections>`
- **Standaard:** `[]`

Geef eigen toolbarsecties op om toolbaritems uit te breiden of toe te voegen. De componenten van elke sectie kunnen de gedeelde editorconfiguratie lezen met [`useTiptapifyConfig`](/nl/api/types#usetiptapifyconfig). Zie [Aangepaste toolbar](/nl/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Type:** `Boolean`
- **Standaard:** `true`

Schakel het interactief toepassen van stijlen in.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Type:** `Boolean`
- **Standaard:** `false`

Toon een onbepaalde voortgangsbalk terwijl de editor laadt.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Type:** `String`
- **Standaard:** `'default'`

Kleur van de laadvoortgangsbalk. Accepteert Vuetify-themakleurwaarden.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Type:** `String`
- **Standaard:** `'1px'`

Hoogte van de laadvoortgangsbalk.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Type:** `Number`
- **Standaard:** `0`

Vanaf dit aantal afbeeldingen op een rij (niets ertussen) rangschikt de editor ze als een genummerd raster van drie kolommen, voor sites die zulke afbeeldingen als slider tonen. `0` schakelt het uit.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Type:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/nl/api/types#tiptapifyskininput))
- **Standaard:** `'default'`

Het uiterlijk van de editor-chrome: toolbar, bubbelmenu's, dropdowns, dialogen, voettekst.

- `default` — de klassieke look: een verhoogde werkbalk, knopgroepen als verhoogde vakken, Vuetify-knoppen met een primaire kleur voor de ingedrukte status.
- `pastel` — de rustige look: een vlakke, getinte werkbalk onder een haarlijn, ghost-knoppen met een neutrale ingedrukte status, lichte dropdowns, zachte dialogen.

Functies (afbeeldingsbijschriften, sliders, de uitlijnings-dropdown, lijststijlen) werken in beide skins hetzelfde.

```vue
<Tiptapify skin="pastel" />
```

Je kunt ook een inline skinobject doorgeven: tokenoverschrijvingen (`colors` / `metrics`) en shape-vlaggen, eventueel `extends` van een geregistreerde skin. Het wordt opgelost over `default` (of zijn basis), wordt gerenderd onder de klasse `tiptapify-skin-inline` (`tiptapify-skin-{name}` wanneer het object een `name` heeft) en zijn tokens komen als CSS-variabelen `--tf-*` op de root van de editor terecht. Eigen namen komen van `registerSkin('mint', { … })` — zie de [Skins-handleiding](/nl/guide/skins) voor de tokentabel en de recepten.

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Type:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/nl/api/types#tiptapifyuploadoptions))
- **Standaard:** `null`

Het endpoint van [uploads](/nl/guide/uploads): bestanden die in de afbeeldings- en videodialogen worden gekozen (en een videoposter, de afbeelding van een linkkaart) worden er met `POST {endpoint}` naartoe gestuurd (multipart `file` en `kind`), en het document bewaart de URL waarmee het antwoordt (`{ "url": … }`).

Zonder dit endpoint accepteert de afbeeldingsdialoog nog steeds een bestand: een gekozen afbeelding (en een videoposter) wordt als base64-data-URL in het document ingesloten, en base64-afbeeldingen blijven behouden wanneer het document wordt geladen. De videodialoog biedt **Uploaden** alleen met deze prop. Als `upload` is ingesteld, worden base64-afbeeldingen weggelaten wanneer het document wordt geladen.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Type:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/nl/api/types#tiptapifycontentstyles))
- **Standaard:** `'inline'`

Hoe de opgeslagen HTML de weergave van linkkaarten, afbeeldingen met bijschrift, video's, embeds en takenlijsten meedraagt (zie [Contentstijlen](/nl/guide/content-styles)): `inline` schrijft die in hun `style`-attributen, zodat een site de HTML toont zoals hij is; `classes` bewaart alleen klassen, voor een site die `tiptapify/content.css` laadt. De editor negeert deze stijlen bij het laden van HTML, dus beide soorten HTML laden op dezelfde manier terug.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Type:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/nl/api/types#tiptapifylinkpreviewoptions))
- **Standaard:** `null`

Het backend-endpoint van [linkkaarten](/nl/guide/link-cards): het leest de OpenGraph-gegevens van pagina's, wat een browser niet kan (CORS). De editor controleert het bij het starten met een handshake (`GET {endpoint}` moet `200 { "tiptapifyLinkPreview": 1 }` beantwoorden); totdat het antwoordt, biedt niets een kaart aan.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Events {#events}

### `editor-ready` {#editor-ready}

Wordt uitgezonden wanneer de editorinstantie gereed is.

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

Wordt uitgezonden wanneer de inhoud van de editor verandert.

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

Ondersteunt `v-model`-binding.

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

De editorinstantie en de functie `t` zijn beschikbaar via provide/inject van Vue:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
