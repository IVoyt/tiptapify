# Propsit {#props}

## `<Tiptapify>`-propsit {#tiptapify-props}

### `content` {#content}

- **Tyyppi:** `String | Object`
- **Oletus:** `''`

Editorin alkusisältö. Hyväksyy HTML-merkkijonon tai Tiptap JSON -objektin.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` on vain **alkusisältö**; kaksisuuntaiseen sidontaan käytä `v-model`-sidontaa (katso `modelValue`).

### `modelValue` {#modelvalue}

- **Tyyppi:** `String | Object`
- **Oletus:** `''`

Kaksisuuntainen sidonta-arvo `v-model`-sidonnalle. Käytä `v-model`-sidontaa pitääksesi reaktiivisen arvon synkronoituna editorin kanssa. Jokaisen muokkauksen yhteydessä komponentti lähettää `update:modelValue`-tapahtuman viimeisimmällä HTML:llä, jonka `v-model` kirjoittaa takaisin refiisi. Kun käytössä on vain `v-model` (ei `:content`-propsia), sidottu arvo on editorin alkusisältö.

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

- **Tyyppi:** `String`
- **Oletus:** `''`

Paikkamerkkiteksti, joka näytetään, kun editori on tyhjä.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Tyyppi:** `Number`
- **Oletus:** `null`

Editorin sisältöalueen vähimmäiskorkeus pikseleinä.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Tyyppi:** `Boolean`
- **Oletus:** `true`

Näytä tai piilota työkalurivi.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Tyyppi:** `Array<String> | Object`
- **Oletus:** `[]`

Näytettävät työkalurivin kohteet. Anna taulukko kohteiden nimistä tai objekti, jossa on nimetyt osiot. Katso [Työkalurivin kohteet](/fi/api/toolbar-items).
Taulukossa `'|'` jakaa kohteet ryhmiin (siinä järjestyksessä, mistä osioista painikkeet tulevatkaan) ja `'~'` työntää sen jälkeiset kohteet työkalurivin loppuun. Ryhmien kanssa nimi, joka ei ole sisäänrakennettu kohde, varaa paikan `customExtensions`-propsin saman nimiselle omalle painikkeelle; ilman sellaista painiketta paikka jätetään pois.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Tyyppi:** `Boolean`
- **Oletus:** `false`

Kun arvo on `true`, `items`-propsi määrittää **poissuljettavat** kohteet mukaan otettavien sijaan.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Tyyppi:** `Boolean`
- **Oletus:** `true`

Näytä kuplavalikko, kun tekstiä on valittuna: yksi rivi kuvakepainikkeita ryhmissä — lihavointi, kursivointi, alleviivaus, yliviivaus | yläindeksi, alaindeksi | korostus, koodi tekstin sekaan | linkki | muotoilun poisto. Jokaisella painikkeella on työkaluvihje pikanäppäimineen, ja se näkyy aktiivisena, kun sen merkintä on valinnassa. Se piilotetaan valitulle lohkolle (kuva, widget), koodin sisällä ja kun koko dokumentti on valittuna.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Tyyppi:** `Boolean`
- **Oletus:** `true`

Näytä kelluva valikko tyhjillä riveillä: otsikko 1, otsikko 2 ja luettelo, samalla kuvakepainikkeiden rivillä kuin kuplavalikossa.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Tyyppi:** `Boolean`
- **Oletus:** `true`

Ota vinoviivakomentovalikko käyttöön (käynnistyy kirjoittamalla `/`).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Tyyppi:** `Boolean`
- **Oletus:** `true`

Näytä sanamäärä editorin alatunnisteessa.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Tyyppi:** `Boolean`
- **Oletus:** `true`

Näytä merkkimäärä editorin alatunnisteessa.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Tyyppi:** `Number | null`
- **Oletus:** `null`

Tiptapin `CharacterCount`-laajennuksen sallima enimmäismerkkimäärä. Aseta `null` tai jätä propsi pois pitääksesi muokkauksen rajoittamattomana. Kun arvo on suurempi kuin `0`, alatunnisteessa näkyy SVG-ympyräedistymisilmaisin väreillä koodatuin kynnysarvoin.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Tyyppi:** `String`
- **Oletus:** `'purple'`

Alatunnisteessa näkyvän ympyräedistymisilmaisimen oletusväri, kun `limit` on asetettu.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Tyyppi:** `String`
- **Oletus:** `'orange'`

Edistymisilmaisimen väri, kun käyttö ylittää 75 % rajasta.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Tyyppi:** `String`
- **Oletus:** `'red'`

Edistymisilmaisimen väri, kun merkkiraja on saavutettu.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Tyyppi:** `TiptapifyFooterAlignment`
- **Oletus:** `'end'`

Alatunnisteen tilakohteiden tasaus. Hyväksyy arvot `'start'`, `'center'` tai `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Tyyppi:** `Boolean | TiptapifyAiOptions`
- **Oletus:** `false`

Ottaa käyttöön `ai`-työkalurivin kohteen. Editori rakentaa OpenAI-yhteensopivan `/v1/chat/completions`-pyynnön ja välittää sen `aiProvider`-funktiolle. Käytä palveluntarjoajan takaisinkutsua kutsuaksesi backendiäsi, BFF:ää, OAuth-suojattua päätepistettä, LM Studiota tai SDK-kääreitä.

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

Paikallisen LLM:n LM Studio -esimerkki:

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

Suoratoisto on tuettu asettamalla `stream: true` ja työntämällä tokenit `aiProvider`-funktion `stream`-argumentin kautta. AI-dialogin tulos-kenttä päivittyy reaaliajassa chunkien saapuessa, ja **Pysäytä**-painike peruuttaa käynnissä olevan pyynnön:

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

Anna `stream.signal` `fetch`-kutsulle (tai SDK-kutsullesi), jotta pyyntö peruutetaan, kun käyttäjä napsauttaa **Pysäytä** tai sulkee dialogin. Osittain suoratoistettu sisältö säilyy tulos-kentässä, ja se voidaan ottaa käyttöön tai hylätä. Palveluntarjoajat, jotka eivät suoratoista, voivat ohittaa `stream`-argumentin kokonaan — se on valinnainen ja taaksepäin yhteensopiva.

Päättelymallit (Qwen thinking, DeepSeek, o-sarja) suoratoistavat "ajatuksensa" erillisessä `reasoning_content`-deltassa. Välitä nuo chunkit `stream.onReasoning()`-kutsulla — kun `showReasoning: true`, dialogi piirtää ne laajennettavaan **Pohdinta**-paneeliin tulos-kentän yläpuolelle (paneeli on oletuksena piilossa). Pohdintatuloste on vain näytettävää, eikä sitä koskaan lisätä editoriin.

Jotta käyttäjä voi vaihtaa mallin pohdintatilaa pyyntökohtaisesti, aseta AI-asetuksiin `thinking: true`. Dialogi näyttää silloin **Pohdinta**-kytkimen (oletuksena päällä, nollautuu jokaisella avauksella); plugin kirjoittaa kytkimen arvon pyyntöön muodossa `enable_thinking: true | false`, joten sinun ei enää tarvitse (eikä pidä) asettaa `enable_thinking`-kenttää itse `chatCompletionOptions`-asetuksissa:

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

Kun `thinking` on `false` tai puuttuu, kytkintä ei näytetä ja plugin lähettää `enable_thinking: false`, jolloin oletuksena pohtivat mallit (Qwen3, DeepSeek, …) eivät pohdi.

Jotta käyttäjä voi valita pohdinnan tason pyyntökohtaisesti, aseta AI-asetuksiin `reasoningEffort`. Dialogi näyttää silloin **Pohdinnan taso** -pudotusvalikon, joka täytetään `options`-arvosta — mukautetuista tasoista (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Laajennus lisää pudotusvalikkoon aina itse `default`-kohteen (pohdintatilan perustason), joten et koskaan luettele `default`-arvoa määrityksessäsi; asetuksen `default`-kenttä esivalitsee yhden mukautetuista tasoistasi dialogin avautuessa (muuten `default` on esivalittu), ja arvo nollautuu jokaisella avauksella.
Valittu arvo ratkaisee, mitä plugin kirjoittaa pyyntöön: `default` säilyttää pohdintatilan — **Pohdinta**-kytkin pysyy aktiivisena ja ohjaa `enable_thinking`-kenttää; mikä tahansa muu arvo lähetetään sen sijaan `reasoning_effort`-kenttänä, ja Pohdinta-kytkin on pois käytöstä, kun kyseinen arvo on valittuna (palveluntarjoajat hylkäävät `enable_thinking`- ja `reasoning_effort`-kentät samassa pyynnössä).
Pudotusvalikko näytetään vain, kun `thinking` on käytössä ja Pohdinta-kytkin on päällä — pohdinnan sammuttaminen piilottaa sen, eikä `reasoning_effort` lähde (pyyntö palaa muotoon `enable_thinking: false`). Kun `options` puuttuu tai on tyhjä, pudotusvalikkoa ei piirretä lainkaan:

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

**Pohdinta**-paneeli on oletuksena piilossa (`showReasoning` on oletuksena `false`). Aseta `showReasoning: true` näyttääksesi laajennettavan paneelin, joka suoratoistaa mallin päättelyprosessin (`reasoning_content`-delta) pohdinnan pysyessä päällä — malli päättelee edelleen ja tulos otetaan käyttöön samalla tavalla, vain vaihe vaiheelta etenevä päättely näytetään lisäksi:

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

Omat kehote-esimerkit korvaavat lokalisoidut oletukset:

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

`tokenProvider` ja `storage` ovat valinnaisia käyttäjän omistamia koukkuja suoriin selainintegraatioihin. Selaimen koodiin tai selaimen tallennustilaan sijoitettuja API-avaimia tai palveluntarjoajan tokeneita käyttäjät näkevät, eikä niitä saa pitää salaisuuksina. Suosi tuotannon salaisuuksille yllä olevaa backend-adapterimallia.

Käytä `mode: 'insert' | 'replace' | 'append'` esivalitaksesi dialogin toimintopainikkeen lisäystilan (**Lisää** / **Korvaa valinta** / **Lisää loppuun**). Ilman `mode`-asetusta painikkeen oletus on **Korvaa valinta**, kun tekstiä on valittuna dialogia avattaessa, ja muuten **Lisää**. Toimintopainike on jaettu painike: pääosa ottaa tuloksen käyttöön esivalitussa tilassa, ja sen oikealla puolella oleva pieni "lisää"-osa (⋮) avaa valikon, jossa muut tilat luetellaan — yhden napsautus ottaa tuloksen heti käyttöön siinä tilassa.

Kun editorilla on `limit` (merkkirajoitus), tulos-kentän alla näkyy `generated / limit` -merkkilaskuri heti, kun tulos on generoitu (se päivittyy reaaliajassa suoratoiston aikana ja muuttuu pehmeän punaiseksi, kun raja ylittyisi).
Dialogi näyttää myös `ai.limit_exceeded`-varoituksen heti generoinnin jälkeen, jos AI:n tuloste ylittäisi rajan.
Tässä tilassa **Lisää**-painike ja sen vaihtoehtoisten tilojen valikko ovat pois käytöstä — `CharacterCount`-laajennus hylkää kaikki lisäykset, jotka kasvattaisivat dokumentin rajan yli, joten tulos otetaan käyttöön kokonaan tai ei lainkaan: se lisätään kokonaan, kun se mahtuu, tai ei lainkaan, kun se ylittää rajan.
Lyhennä tulosta ottaaksesi toiminnon uudelleen käyttöön:

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

Käytä `systemPrompt`, `temperature`, `chatCompletionOptions` tai `createMessages(context)` mukauttaaksesi OpenAI-yhteensopivaa chat-completions-pyyntöä. `context` sisältää `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` ovat valinnan kappaleen teksti sen ympärillä (enintään 500 merkkiä kumpikin, tyhjä ilman valintaa) — lähetä ne valinnan mukana, tai malli luulee katkelmaa koko tekstiksi ja täydentää sen.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Tyyppi:** `String`
- **Oletus:** `undefined`

Vaihtoehto omalle `aiProvider`-toteutukselle: osoita AI-toiminto backendin LLM-päätepisteeseen, ja tiptapify rakentaa ja lähettää pyynnön itse. Backend saa minimaalisen JSON-payloadin:

- **Aina:** `prompt` (dialogiin kirjoitettu pyyntö) ja `instruction` (oma `systemPrompt`, oman `createMessages`-funktion järjestelmäviesti tai sisäänrakennettu oletus).
- **Valinnaiset, lähetetään vain kun asetettu:** `stream` (vain `true`), `thinking` (dialogin **Pohdinta**-kytkin, vain `true`), `reasoning_effort` (valittu pohdinnan taso) ja `model`.

Vastaus hyväksytään väljästi: tavallinen merkkijono, `{ content }`-objekti tai OpenAI-yhteensopiva `choices`-payload. Kun pyynnössä on `stream: true`, vastauksen runko luetaan SSE-virtana (`data:`-rivit, päättyen `data: [DONE]`): OpenAI-tyyliset deltat (`choices[0].delta.content` / `.reasoning_content`), yksinkertainen `{ type: 'content' | 'reasoning', data }`-chunk, litteä `{ content, reasoning_content }`-chunk ja pelkkää tekstiä sisältävät `data`-rivit hyväksytään kaikki. Jos backend ohittaa `stream`-asetuksen ja vastaa tavallisella rungolla, sitä runkoa käytetään sen sijaan. Ei-OK-vastaus tuo backendin virheviestin (JSON `{ error }` / `{ message }` tai raaka runko) näkyviin dialogissa. **Pysäytä**-painike ja dialogin sulkeminen keskeyttävät käynnissä olevan pyynnön; osittain suoratoistettu sisältö säilyy tulos-kentässä.

Jos sekä `aiProvider` että `aiEndpoint` on asetettu, `aiProvider` voittaa.

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

- **Tyyppi:** `Record<string, string>`
- **Oletus:** `undefined`

Lisäotsakkeet, jotka lähetetään `aiEndpoint`-pyynnön mukana ja yhdistetään otsakkeen `Content-Type: application/json` päälle. Tässä asetettu `Authorization`-otsake säilytetään sellaisenaan; muuten `tokenProvider`-funktion token (kun asetettu) lähetetään muodossa `Authorization: Bearer <token>`.

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

- **Tyyppi:** `String`
- **Oletus:** `'Inter'`

Editorin sisällön oletusfonttiperhe.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Tyyppi:** `String`
- **Oletus:** `'px'`

Fonttikoon arvojen mittayksikkö.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Tyyppi:** `String`
- **Oletus:** `'0'`

Editorisäiliön reunan pyöristys. Hyväksyy Vuetifyn pyöristysarvot (`sm`, `md`, `lg`, `xl`, `pill` jne.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Tyyppi:** `variantBtnTypes`
- **Oletus:** `'tonal'`

Vuetify-painikevariantti työkalurivin painikkeille. Arvo jaetaan jokaiselle työkalurivin komponentille editorin määrityksen kautta — omat komponentit voivat lukea sen [`useTiptapifyConfig`](/fi/api/types#usetiptapifyconfig)-funktiolla. Katso [`variantBtnTypes`](/fi/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Tyyppi:** `variantFieldTypes`
- **Oletus:** `'outlined'`

Vuetify-variantti työkalurivin pudotusvalikkokentille. Arvo jaetaan jokaiselle työkalurivin komponentille editorin määrityksen kautta — omat komponentit voivat lukea sen [`useTiptapifyConfig`](/fi/api/types#usetiptapifyconfig)-funktiolla. Katso [`variantFieldTypes`](/fi/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Tyyppi:** `Array<toolbarSections>`
- **Oletus:** `[]`

Anna omia työkalurivin osioita laajentaaksesi tai lisätäksesi työkalurivin kohteita. Jokaisen osion komponentit voivat lukea jaetun editorimäärityksen [`useTiptapifyConfig`](/fi/api/types#usetiptapifyconfig)-funktiolla. Katso [Oma työkalurivi](/fi/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Tyyppi:** `Boolean`
- **Oletus:** `true`

Ota interaktiivinen tyylin käyttö käyttöön.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Tyyppi:** `Boolean`
- **Oletus:** `false`

Näytä epämääräinen edistymispalkki, kun editori latautuu.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Tyyppi:** `String`
- **Oletus:** `'default'`

Latauksen edistymispalkin väri. Hyväksyy Vuetifyn teemavärien arvot.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Tyyppi:** `String`
- **Oletus:** `'1px'`

Latauksen edistymispalkin korkeus.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Tyyppi:** `Number`
- **Oletus:** `0`

Tämän kuvamäärän jälkeen peräkkäin (ilman mitään niiden välissä) editori asettelee ne numeroiduksi kolmen sarakkeen ruudukoksi sivustoille, jotka näyttävät tällaiset kuvat liukusäätimenä (slider). `0` poistaa toiminnon käytöstä.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Tyyppi:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/fi/api/types#tiptapifyskininput))
- **Oletus:** `'default'`

Editorin kehyksen ulkoasu: työkalurivi, kuplavalikot, pudotusvalikot, dialogit, alatunniste.

- `default` — klassinen ulkoasu: korotettu työkalupalkki, painikeryhmät korotettuina laatikoina, Vuetify-painikkeet ensisijaisella painetulla tilalla.
- `pastel` — rauhallinen ulkoasu: litteä sävytetty työkalupalkki hiusviivan alla, läpikuultavat painikkeet neutraalilla painetulla tilalla, kevyet pudotusvalikot, pehmeät dialogit.

Ominaisuudet (kuvatekstit, sliderit, tasauksen pudotusvalikko, luettelotyylit) toimivat samoin molemmissa teemoissa.

```vue
<Tiptapify skin="pastel" />
```

Voit antaa myös inline-teemaobjektin: token-ohitukset (`colors` / `metrics`) ja muotolippuja, valinnaisesti `extends` rekisteröidystä teemasta. Se ratkaistaan `default`-teeman (tai sen perustan) päälle, piirtyy luokan `tiptapify-skin-inline` alle (`tiptapify-skin-{name}`, kun objektissa on `name`), ja sen tokenit päätyvät `--tf-*`-CSS-muuttujina editorin juureen. Omat nimet tulevat `registerSkin('mint', { … })`-kutsusta — katso tokentaulukko ja ohjeet [Skins-oppaasta](/fi/guide/skins).

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Tyyppi:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/fi/api/types#tiptapifyuploadoptions))
- **Oletus:** `null`

[Latausten](/fi/guide/uploads) päätepiste: kuva- ja videodialogeissa valitut tiedostot (sekä videon esikatselukuva ja linkkikortin kuva) lähetetään sille kutsulla `POST {endpoint}` (multipart `file` ja `kind`), ja dokumentti säilyttää URL-osoitteen, jolla se vastaa (`{ "url": … }`).

Ilman sitä kuvadialogi ottaa silti vastaan tiedoston: valittu kuva (ja videon esikatselukuva) upotetaan dokumenttiin base64-data-URL-osoitteena, ja base64-kuvat säilytetään dokumentin latautuessa. Videodialogi tarjoaa **Lataa**-vaihtoehdon vain tämän propsin kanssa. Kun `upload` on asetettu, base64-kuvat poistetaan dokumentin latautuessa.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Tyyppi:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/fi/api/types#tiptapifycontentstyles))
- **Oletus:** `'inline'`

Miten tallennettu HTML kantaa linkkikorttien, kuvatekstillisten kuvien, videoiden, upotusten ja tehtävälistojen ulkoasun (katso [Sisältötyylit](/fi/guide/content-styles)): `inline` kirjoittaa sen niiden `style`-attribuutteihin, jolloin sivusto näyttää HTML:n sellaisenaan; `classes` jättää vain luokat sivustolle, joka lataa tiedoston `tiptapify/content.css`. Editori ohittaa nämä tyylit HTML:ää ladattaessa, joten molemmat HTML-tavat latautuvat samalla tavalla.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Tyyppi:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/fi/api/types#tiptapifylinkpreviewoptions))
- **Oletus:** `null`

[Linkkikorttien](/fi/guide/link-cards) backend-päätepiste: se lukee sivujen OpenGraph-datan, mitä selain ei voi (CORS). Editori tarkistaa sen kättelyllä käynnistyessään (`GET {endpoint}` on vastattava `200 { "tiptapifyLinkPreview": 1 }`); kunnes se vastaa, mikään ei tarjoa korttia.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Tapahtumat {#events}

### `editor-ready` {#editor-ready}

Lähetetään, kun editori-instanssi on valmis.

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

Lähetetään, kun editorin sisältö muuttuu.

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

Tukee `v-model`-sidontaa.

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

Editori-instanssi ja `t`-funktio ovat saatavilla Vuen provide/inject-mekanismin kautta:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
