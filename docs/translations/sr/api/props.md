# Props {#props}

## `<Tiptapify>` Props {#tiptapify-props}

### `content` {#content}

- **Tip:** `String | Object`
- **Podrazumevano:** `''`

Početni sadržaj uređivača. Prihvata HTML string ili Tiptap JSON objekat.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` je samo **početni** sadržaj; za dvosmerno povezivanje koristite `v-model` (pogledajte `modelValue`).

### `modelValue` {#modelvalue}

- **Tip:** `String | Object`
- **Podrazumevano:** `''`

Vrednost za dvosmerno povezivanje preko `v-model`. Koristite `v-model` da reaktivna vrednost ostane sinhronizovana sa uređivačem. Pri svakoj izmeni komponenta emituje `update:modelValue` sa najnovijim HTML-om, koji `v-model` upisuje nazad u vaš ref. Kada se koristi samo `v-model` (bez `:content`), vezana vrednost je početni sadržaj uređivača.

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

- **Tip:** `String`
- **Podrazumevano:** `''`

Tekst rezervisanog mesta koji se prikazuje kada je uređivač prazan.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Tip:** `Number`
- **Podrazumevano:** `null`

Minimalna visina oblasti sadržaja uređivača u pikselima.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Tip:** `Boolean`
- **Podrazumevano:** `true`

Prikažite ili sakrijte traku sa alatima.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Tip:** `Array<String> | Object`
- **Podrazumevano:** `[]`

Stavke trake sa alatima za prikaz. Prosledite niz naziva stavki ili objekat sa imenovanim odeljcima. Pogledajte [Stavke trake sa alatima](/sr/api/toolbar-items).
U nizu `'|'` deli stavke u grupe (tim redosledom, bez obzira iz kojih odeljaka dugmad potiče), a `'~'` gura stavke posle sebe na kraj trake sa alatima. Uz grupe, naziv koji nije ugrađena stavka zadržava mesto za prilagođeno dugme tog imena iz `customExtensions`; bez takvog dugmeta mesto se izbacuje.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Tip:** `Boolean`
- **Podrazumevano:** `false`

Kada je `true`, prop `items` navodi stavke koje treba **isključiti**, a ne uključiti.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Tip:** `Boolean`
- **Podrazumevano:** `true`

Prikažite bubble meni kada je tekst izabran: jedan red dugmadi sa ikonama u grupama — podebljano, kurziv, podvlačenje, precrtavanje | eksponent, indeks | isticanje, kod u liniji | veza | uklanjanje formatiranja. Svako dugme ima opis (tooltip) sa prečicom i svetli kada je njegova oznaka na izboru. Sakriva se za izabrani blok (sliku, vidžet), unutar koda i kada je izabran ceo dokument.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Tip:** `Boolean`
- **Podrazumevano:** `true`

Prikažite plutajući meni u praznim redovima: naslov 1, naslov 2 i lista sa tačkama, u istom redu dugmadi sa ikonama kao bubble meni.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Tip:** `Boolean`
- **Podrazumevano:** `true`

Omogućite meni slash komandi (ukucajte `/` da ga otvorite).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Tip:** `Boolean`
- **Podrazumevano:** `true`

Prikažite broj reči u podnožju uređivača.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Tip:** `Boolean`
- **Podrazumevano:** `true`

Prikažite broj znakova u podnožju uređivača.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Tip:** `Number | null`
- **Podrazumevano:** `null`

Maksimalan broj znakova koji dozvoljava Tiptap ekstenzija `CharacterCount`. Postavite `null` ili izostavite prop da uređivanje ostane neograničeno. Kada je vrednost veća od `0`, podnožje prikazuje SVG kružni indikator napretka sa bojama koje zavise od pragova.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Tip:** `String`
- **Podrazumevano:** `'purple'`

Podrazumevana boja kružnog indikatora napretka u podnožju kada je postavljen `limit`.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Tip:** `String`
- **Podrazumevano:** `'orange'`

Boja indikatora napretka kada korišćenje pređe 75% ograničenja.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Tip:** `String`
- **Podrazumevano:** `'red'`

Boja indikatora napretka kada je ograničenje broja znakova dostignuto.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Tip:** `TiptapifyFooterAlignment`
- **Podrazumevano:** `'end'`

Poravnanje stavki statusa u podnožju. Prihvata `'start'`, `'center'` ili `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Tip:** `Boolean | TiptapifyAiOptions`
- **Podrazumevano:** `false`

Omogućava stavku `ai` na traci sa alatima. Uređivač pravi OpenAI-kompatibilan zahtev `/v1/chat/completions` i prosleđuje ga u `aiProvider`. Upotrebite provider callback da pozovete vaš backend, BFF, endpoint zaštićen OAuth-om, LM Studio ili SDK omotač.

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

Primer sa lokalnim LLM-om LM Studio:

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

Strimovani izlaz je podržan postavljanjem `stream: true` i prosleđivanjem tokena kroz argument `stream` u `aiProvider`. Polje rezultata u AI dijalogu se ažurira uživo dok stižu delovi, a dugme **Zaustavi** otkazuje zahtev u toku:

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

Prosledite `stream.signal` u `fetch` (ili poziv vašeg SDK-a) da se zahtev otkaže kada korisnik klikne **Zaustavi** ili zatvori dijalog. Delimično strimovani sadržaj ostaje u polju rezultata i može se primeniti ili odbaciti. Provajderi koji ne strimuju mogu potpuno ignorisati argument `stream` — on je opcion i unazad kompatibilan.

Modeli sa rezonovanjem (Qwen thinking, DeepSeek, o-serija) strimuju svoje „misli“ u zasebnoj delti `reasoning_content`. Prosledite te delove preko `stream.onReasoning()` — kada je `showReasoning: true`, dijalog ih prikazuje u sklopivom panelu **Razmišljanje** iznad polja rezultata (panel je podrazumevano sakriven). Izlaz rezonovanja služi samo za prikaz i nikada se ne umeće u uređivač.

Da korisnik može da menja režim razmišljanja modela po zahtevu, postavite `thinking: true` u AI opcijama. Dijalog tada prikazuje prekidač **Razmišljanje** (podrazumevano uključen, resetuje se pri svakom otvaranju); plugin upisuje vrednost prekidača u zahtev kao `enable_thinking: true | false`, pa više ne treba (niti smete) sami da postavljate `enable_thinking` u `chatCompletionOptions`:

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

Kada je `thinking` `false` ili izostavljen, prekidač se ne prikazuje, a plugin šalje `enable_thinking: false`, pa modeli koji podrazumevano razmišljaju (Qwen3, DeepSeek, …) ne razmišljaju.

Da korisnik može da bira nivo rezonovanja po zahtevu, postavite `reasoningEffort` u AI opcijama. Dijalog tada prikazuje padajući meni **Napori razmišljanja** popunjen iz `options` — prilagođenih nivoa (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Ekstenzija sama uvek dodaje stavku `default` u padajući meni (osnovu režima razmišljanja), pa `default` nikada ne navodite u konfiguraciji; polje `default` opcije unapred bira jedan od vaših prilagođenih nivoa pri otvaranju dijaloga (inače je unapred izabran `default`), a vrednost se resetuje pri svakom otvaranju.
Izabrana vrednost odlučuje šta plugin upisuje u zahtev: `default` zadržava režim razmišljanja — prekidač **Razmišljanje** ostaje aktivan i kontroliše `enable_thinking`; svaka druga vrednost šalje se umesto toga kao `reasoning_effort`, a prekidač Razmišljanje je onemogućen dok je ta vrednost izabrana (provajderi odbijaju `enable_thinking` i `reasoning_effort` u jednom zahtevu).
Padajući meni se prikazuje samo kada je `thinking` omogućen i prekidač Razmišljanje uključen — isključivanje razmišljanja ga sakriva i `reasoning_effort` se ne šalje (zahtev se vraća na `enable_thinking: false`). Kada `options` nedostaje ili je prazno, padajući meni se uopšte ne renderuje:

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

Panel **Razmišljanje** je podrazumevano sakriven (`showReasoning` je podrazumevano `false`). Postavite `showReasoning: true` da prikažete sklopivi panel koji strimuje proces rezonovanja modela (delta `reasoning_content`) uz uključeno razmišljanje — model i dalje rezonuje i rezultat se primenjuje na isti način, samo se dodatno prikazuje rezonovanje korak po korak:

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

Prilagođeni primeri upita zamenjuju lokalizovane podrazumevane:

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

`tokenProvider` i `storage` su opcioni hukovi u vlasništvu potrošača za direktne integracije u pregledaču. API ključevi ili tokeni provajdera smešteni u kod pregledača ili skladište pregledača vidljivi su korisnicima i ne smeju se tretirati kao tajne. Za produkcijske tajne prednost dajte gore opisanom obrascu backend adaptera.

Koristite `mode: 'insert' | 'replace' | 'append'` da unapred izaberete režim umetanja na dugmetu radnje u dijalogu (**Umetni** / **Zameni** / **Dodaj na kraj**). Bez `mode`, dugme podrazumevano koristi **Zameni** kada je tekst izabran pri otvaranju dijaloga, a **Umetni** u suprotnom. Dugme radnje je podeljeno dugme: glavni deo primenjuje rezultat u unapred izabranom režimu, a mali odeljak „više“ (⋮) desno od njega otvara meni sa ostalim režimima — klik na jedan odmah primenjuje rezultat u tom režimu.

Kada uređivač ima `limit` (ograničenje broja znakova), brojač znakova `generated / limit` prikazuje se ispod polja rezultata čim se rezultat generiše (ažurira se uživo tokom strimovanja i postaje blago crven kada bi ograničenje bilo prekoračeno).
Dijalog odmah nakon generisanja prikazuje i upozorenje `ai.limit_exceeded` ako bi AI izlaz prekoračio ograničenje.
U tom stanju dugme **Umetni** i njegov meni alternativnih režima su onemogućeni — ekstenzija `CharacterCount` odbija svako umetanje koje bi dokument povećalo preko ograničenja, pa se rezultat primenjuje u celosti ili nikako: umeće se potpuno kada stane, ili se uopšte ne umeće kada prekoračuje ograničenje.
Skratite rezultat da ponovo omogućite radnju:

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

Koristite `systemPrompt`, `temperature`, `chatCompletionOptions` ili `createMessages(context)` da prilagodite OpenAI-kompatibilan zahtev chat-completions. `context` sadrži `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` su tekst pasusa izbora oko njega (do 500 znakova sa svake strane, prazno bez izbora) — pošaljite ih zajedno sa izborom, inače model smatra fragment celim tekstom i dopunjava ga.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Tip:** `String`
- **Podrazumevano:** `undefined`

Alternativa prilagođenom `aiProvider`: usmerite AI funkciju na backend LLM endpoint, a tiptapify sam pravi i šalje zahtev. Backend prima minimalan JSON payload:

- **Uvek:** `prompt` (zahtev ukucan u dijalogu) i `instruction` (vaš `systemPrompt`, sistemska poruka prilagođenog `createMessages` ili ugrađena podrazumevana).
- **Opciono, šalje se samo kada je zadato:** `stream` (samo `true`), `thinking` (prekidač **Razmišljanje** u dijalogu, samo `true`), `reasoning_effort` (izabrani nivo) i `model`.

Odgovor se prihvata tolerantno: običan string, objekat `{ content }` ili OpenAI-kompatibilan payload `choices`. Kada zahtev ima `stream: true`, telo odgovora se čita kao SSE tok (redovi `data:`, završeni sa `data: [DONE]`): prihvataju se OpenAI delte (`choices[0].delta.content` / `.reasoning_content`), jednostavan deo `{ type: 'content' | 'reasoning', data }`, ravan deo `{ content, reasoning_content }` i redovi `data` sa običnim tekstom. Ako backend ignoriše `stream` i odgovori običnim telom, koristi se to telo. Odgovor koji nije OK prikazuje u dijalogu poruku o grešci backenda (JSON `{ error }` / `{ message }` ili sirovo telo). Dugme **Zaustavi** i zatvaranje dijaloga prekidaju zahtev u toku; delimično strimovani sadržaj ostaje u polju rezultata.

Ako su zadati i `aiProvider` i `aiEndpoint`, prednost ima `aiProvider`.

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

- **Tip:** `Record<string, string>`
- **Podrazumevano:** `undefined`

Dodatna zaglavlja koja se šalju sa zahtevom `aiEndpoint`, spojena preko `Content-Type: application/json`. Zaglavlje `Authorization` zadato ovde ostaje kakvo jeste; u suprotnom se token iz `tokenProvider` (kada je zadat) šalje kao `Authorization: Bearer <token>`.

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

- **Tip:** `String`
- **Podrazumevano:** `'Inter'`

Podrazumevana porodica fonta za sadržaj uređivača.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Tip:** `String`
- **Podrazumevano:** `'px'`

Merna jedinica za vrednosti veličine fonta.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Tip:** `String`
- **Podrazumevano:** `'0'`

Zaobljenost ivica kontejnera uređivača. Prihvata Vuetify vrednosti radijusa (`sm`, `md`, `lg`, `xl`, `pill` itd.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Tip:** `variantBtnTypes`
- **Podrazumevano:** `'tonal'`

Vuetify varijanta dugmadi trake sa alatima. Vrednost se deli sa svakom komponentom trake sa alatima preko konfiguracije uređivača — prilagođene komponente je mogu čitati pomoću [`useTiptapifyConfig`](/sr/api/types#usetiptapifyconfig). Pogledajte [`variantBtnTypes`](/sr/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Tip:** `variantFieldTypes`
- **Podrazumevano:** `'outlined'`

Vuetify varijanta padajućih polja trake sa alatima. Vrednost se deli sa svakom komponentom trake sa alatima preko konfiguracije uređivača — prilagođene komponente je mogu čitati pomoću [`useTiptapifyConfig`](/sr/api/types#usetiptapifyconfig). Pogledajte [`variantFieldTypes`](/sr/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Tip:** `Array<toolbarSections>`
- **Podrazumevano:** `[]`

Obezbedite prilagođene odeljke trake sa alatima da proširite ili dodate stavke. Komponente svakog odeljka mogu čitati deljenu konfiguraciju uređivača pomoću [`useTiptapifyConfig`](/sr/api/types#usetiptapifyconfig). Pogledajte [Prilagođena traka sa alatima](/sr/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Tip:** `Boolean`
- **Podrazumevano:** `true`

Omogućite interaktivnu primenu stilova.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Tip:** `Boolean`
- **Podrazumevano:** `false`

Prikažite neodređenu traku napretka dok se uređivač učitava.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Tip:** `String`
- **Podrazumevano:** `'default'`

Boja trake napretka učitavanja. Prihvata vrednosti boja Vuetify teme.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Tip:** `String`
- **Podrazumevano:** `'1px'`

Visina trake napretka učitavanja.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Tip:** `Number`
- **Podrazumevano:** `0`

Od ovolikog broja slika u nizu (bez ičega između njih) uređivač ih raspoređuje u numerisanu mrežu od tri kolone, za sajtove koji takve slike prikazuju kao slajder. `0` to isključuje.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Tip:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/sr/api/types#tiptapifyskininput))
- **Podrazumevano:** `'default'`

Izgled okvira uređivača: trake sa alatima, bubble menija, padajućih menija, dijaloga, podnožja.

- `default` — klasičan izgled: podignuta alatna traka, grupe dugmadi kao podignuti okviri, Vuetify dugmad sa primarnim stanjem pritisnutosti.
- `pastel` — miran izgled: ravna obojena alatna traka ispod tanke linije, providna dugmad sa neutralnim stanjem pritisnutosti, lagani padajući meniji, meki dijalozi.

Funkcije (opisi slika, slajderi, padajući meni za poravnanje, stilovi lista) rade isto u oba skina.

```vue
<Tiptapify skin="pastel" />
```

Možete proslediti i inline objekat skina: izmene tokena (`colors` / `metrics`) i oznake oblika, uz opcioni `extends` registrovanog skina. Razrešava se nad `default` (ili svojom osnovom), renderuje se pod klasom `tiptapify-skin-inline` (`tiptapify-skin-{name}` kada objekat sadrži `name`), a njegovi tokeni se u korenu uređivača pojavljuju kao CSS promenljive `--tf-*`. Prilagođeni nazivi dolaze iz `registerSkin('mint', { … })` — tabelu tokena i recepte potražite u [vodiču za skinove](/sr/guide/skins).

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Tip:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/sr/api/types#tiptapifyuploadoptions))
- **Podrazumevano:** `null`

Endpoint za [otpremanje](/sr/guide/uploads): fajlovi izabrani u dijalozima za slike i video (kao i poster videa i slika kartice veze) šalju se na njega sa `POST {endpoint}` (multipart `file` i `kind`), a dokument zadržava URL koji vrati (`{ "url": … }`).

Bez njega dijalog za slike i dalje prima fajl: izabrana slika (i poster videa) ugrađuje se u dokument kao base64 data URL, a base64 slike se zadržavaju pri učitavanju dokumenta. Dijalog za video nudi **Otpremi** samo uz ovaj prop. Kada je `upload` postavljen, base64 slike se odbacuju pri učitavanju dokumenta.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Tip:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/sr/api/types#tiptapifycontentstyles))
- **Podrazumevano:** `'inline'`

Kako sačuvani HTML nosi izgled kartica veza, slika sa opisom, video-snimaka, ugrađenih sadržaja i lista zadataka (pogledajte [Stilovi sadržaja](/sr/guide/content-styles)): `inline` ga upisuje u njihove atribute `style`, pa sajt prikazuje HTML onakav kakav jeste; `classes` zadržava samo klase, za sajt koji učitava `tiptapify/content.css`. Uređivač ove stilove ignoriše pri učitavanju HTML-a, pa se obe vrste HTML-a učitavaju isto.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Tip:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/sr/api/types#tiptapifylinkpreviewoptions))
- **Podrazumevano:** `null`

Backend endpoint za [kartice veza](/sr/guide/link-cards): čita OpenGraph podatke stranica, što pregledač ne može (CORS). Uređivač ga proverava handshake-om pri pokretanju (`GET {endpoint}` mora odgovoriti sa `200 { "tiptapifyLinkPreview": 1 }`); dok ne odgovori, ništa ne nudi karticu.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Događaji {#events}

### `editor-ready` {#editor-ready}

Aktivira se kada je instanca uređivača spremna.

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

Aktivira se kada se sadržaj uređivača promeni.

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

Podržava povezivanje preko `v-model`.

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

Instanca uređivača i funkcija `t` dostupne su preko Vue provide/inject:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
