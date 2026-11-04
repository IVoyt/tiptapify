# Props {#props}

## Props komponente `<Tiptapify>` {#tiptapify-props}

### `content` {#content}

- **Tip:** `String | Object`
- **Zadano:** `''`

Početni sadržaj uređivača. Prihvaća HTML string ili Tiptap JSON objekt.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` je samo **početni** sadržaj; za dvosmjerno povezivanje koristite `v-model` (vidi `modelValue`).

### `modelValue` {#modelvalue}

- **Tip:** `String | Object`
- **Zadano:** `''`

Vrijednost za dvosmjerno povezivanje putem `v-model`. Koristite `v-model` da reaktivnu vrijednost držite sinkroniziranom s uređivačem. Pri svakoj izmjeni komponenta emitira `update:modelValue` s najnovijim HTML-om, koji `v-model` upisuje natrag u vaš ref. Kad se koristi samo `v-model` (bez `:content`), vezana vrijednost je početni sadržaj uređivača.

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
- **Zadano:** `''`

Tekst rezerviranog mjesta prikazan kad je uređivač prazan.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Tip:** `Number`
- **Zadano:** `null`

Minimalna visina područja sadržaja uređivača u pikselima.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Tip:** `Boolean`
- **Zadano:** `true`

Prikaži ili sakrij alatnu traku.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Tip:** `Array<String> | Object`
- **Zadano:** `[]`

Stavke alatne trake koje se prikazuju. Proslijedite niz naziva stavki ili objekt s imenovanim odjeljcima. Vidi [Stavke alatne trake](/hr/api/toolbar-items).
U nizu `'|'` dijeli stavke u grupe (tim redoslijedom, bez obzira iz kojih odjeljaka gumbi dolaze), a `'~'` gura stavke iza sebe na kraj alatne trake. Uz grupe, naziv koji nije ugrađena stavka čuva mjesto za prilagođeni gumb tog imena iz `customExtensions`; bez takvog gumba mjesto se odbacuje.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Tip:** `Boolean`
- **Zadano:** `false`

Kad je `true`, prop `items` određuje stavke koje se **isključuju**, a ne uključuju.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Tip:** `Boolean`
- **Zadano:** `true`

Prikaži bubble izbornik kad je tekst odabran: jedan red ikonskih gumba u grupama — podebljano, kurziv, podcrtano, precrtano | eksponent, indeks | isticanje, kôd u retku | poveznica | uklanjanje oblikovanja. Svaki gumb ima opis s prečacem i prikazuje se kao aktivan kad je njegova oznaka na odabiru. Skriva se za odabrani blok (slika, widget), unutar koda i kad je odabran cijeli dokument.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Tip:** `Boolean`
- **Zadano:** `true`

Prikaži plutajući izbornik u praznim recima: naslov 1, naslov 2 i popis s oznakama, u istom redu ikonskih gumba kao bubble izbornik.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Tip:** `Boolean`
- **Zadano:** `true`

Omogući izbornik slash naredbi (upišite `/` za pokretanje).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Tip:** `Boolean`
- **Zadano:** `true`

Prikaži broj riječi u podnožju uređivača.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Tip:** `Boolean`
- **Zadano:** `true`

Prikaži broj znakova u podnožju uređivača.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Tip:** `Number | null`
- **Zadano:** `null`

Najveći broj znakova koji dopušta Tiptap ekstenzija `CharacterCount`. Postavite `null` ili izostavite prop za neograničeno uređivanje. Kad je postavljen na vrijednost veću od `0`, podnožje prikazuje SVG kružni indikator napretka s pragovima označenima bojama.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Tip:** `String`
- **Zadano:** `'purple'`

Zadana boja kružnog indikatora napretka u podnožju kad je postavljen `limit`.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Tip:** `String`
- **Zadano:** `'orange'`

Boja indikatora napretka kad potrošnja premaši 75% ograničenja.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Tip:** `String`
- **Zadano:** `'red'`

Boja indikatora napretka kad je ograničenje znakova dosegnuto.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Tip:** `TiptapifyFooterAlignment`
- **Zadano:** `'end'`

Poravnanje stavki statusa u podnožju. Prihvaća `'start'`, `'center'` ili `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Tip:** `Boolean | TiptapifyAiOptions`
- **Zadano:** `false`

Omogućuje stavku `ai` na alatnoj traci. Uređivač izrađuje zahtjev `/v1/chat/completions` kompatibilan s OpenAI-jem i prosljeđuje ga u `aiProvider`. Povratni poziv pružatelja koristite za poziv vašeg backenda, BFF-a, krajnje točke zaštićene OAuth-om, LM Studija ili SDK omotača.

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

Primjer lokalnog LLM-a LM Studio:

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

Izlaz streamingom podržan je postavljanjem `stream: true` i slanjem tokena kroz argument `stream` funkcije `aiProvider`. Polje rezultata u AI dijalogu ažurira se uživo dok chunkovi pristižu, a gumb **Zaustavi** otkazuje zahtjev u tijeku:

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

Proslijedite `stream.signal` u `fetch` (ili poziv SDK-a) da se zahtjev otkaže kad korisnik klikne **Zaustavi** ili zatvori dijalog. Djelomično strujani sadržaj ostaje u polju rezultata i može se primijeniti ili odbaciti. Pružatelji koji ne rade streaming mogu potpuno zanemariti argument `stream` — neobavezan je i povratno kompatibilan.

Modeli zaključivanja (Qwen thinking, DeepSeek, o-series) strujom šalju svoje „misli“ u zasebnoj delti `reasoning_content`. Proslijedite te chunkove kroz `stream.onReasoning()` — kad je `showReasoning: true`, dijalog ih prikazuje u sklopivom panelu **Razmišljanje** iznad polja rezultata (panel je prema zadanim postavkama skriven). Izlaz zaključivanja služi samo za prikaz i nikad se ne umeće u uređivač.

Da korisnik može po zahtjevu prebacivati način razmišljanja modela, postavite `thinking: true` u AI opcijama. Dijalog tada prikazuje prekidač **Razmišljanje** (prema zadanim postavkama uključen, resetira se pri svakom otvaranju); dodatak upisuje vrijednost prekidača u zahtjev kao `enable_thinking: true | false`, pa više ne trebate (niti biste trebali) sami postavljati `enable_thinking` u `chatCompletionOptions`:

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

Kad je `thinking` `false` ili izostavljen, prekidač se ne prikazuje, a dodatak šalje `enable_thinking: false`, pa modeli koji prema zadanim postavkama razmišljaju (Qwen3, DeepSeek, …) ne razmišljaju.

Da korisnik može po zahtjevu birati razinu zaključivanja, postavite `reasoningEffort` u AI opcijama. Dijalog tada prikazuje padajući izbornik **Napori razmišljanja** popunjen iz `options` — prilagođenih razina (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Ekstenzija uvijek sama dodaje stavku `default` u padajući izbornik (osnovica načina razmišljanja), pa `default` nikad ne navodite u konfiguraciji; polje `default` opcije unaprijed odabire jednu od vaših prilagođenih razina pri otvaranju dijaloga (inače je unaprijed odabran `default`), a vrijednost se resetira pri svakom otvaranju.
Odabrana vrijednost određuje što dodatak upisuje u zahtjev: `default` zadržava način razmišljanja — prekidač **Razmišljanje** ostaje aktivan i upravlja `enable_thinking`; svaka druga vrijednost šalje se umjesto toga kao `reasoning_effort`, a prekidač Razmišljanje je onemogućen dok je ta vrijednost odabrana (pružatelji odbijaju `enable_thinking` i `reasoning_effort` u jednom zahtjevu).
Padajući izbornik prikazuje se samo kad je `thinking` omogućen i prekidač Razmišljanje uključen — isključivanje razmišljanja skriva ga, a `reasoning_effort` se ne šalje (zahtjev se vraća na `enable_thinking: false`). Kad `options` nedostaje ili je prazan, padajući izbornik se uopće ne renderira:

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

Panel **Razmišljanje** prema zadanim postavkama je skriven (`showReasoning` je zadano `false`). Postavite `showReasoning: true` da prikažete sklopivi panel koji strujom prikazuje proces zaključivanja modela (delta `reasoning_content`) uz uključeno razmišljanje — model i dalje zaključuje, a rezultat se primjenjuje na isti način, samo se dodatno prikazuje zaključivanje korak po korak:

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

Prilagođeni primjeri upita zamjenjuju lokalizirane zadane vrijednosti:

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

`tokenProvider` i `storage` neobavezne su kuke u vlasništvu korisnika za izravne integracije u pregledniku. API ključevi ili tokeni pružatelja smješteni u kôd preglednika ili pohranu preglednika vidljivi su korisnicima i ne smiju se smatrati tajnama. Za produkcijske tajne radije koristite gornji obrazac backend adaptera.

Koristite `mode: 'insert' | 'replace' | 'append'` za unaprijed odabir načina umetanja na gumbu radnje dijaloga (**Umetni** / **Zamijeni** / **Dodaj na kraj**). Bez `mode` gumb je zadano **Zamijeni** kad je pri otvaranju dijaloga odabran tekst, a inače **Umetni**. Gumb radnje je podijeljeni gumb: glavni dio primjenjuje rezultat u unaprijed odabranom načinu, a mali odjeljak „više“ (⋮) desno od njega otvara izbornik s ostalim načinima — klik na jedan odmah primjenjuje rezultat u tom načinu.

Kad uređivač ima `limit` (ograničenje broja znakova), ispod polja rezultata prikazuje se brojač znakova `generated / limit` čim se rezultat generira (uživo se ažurira tijekom streaminga i postaje blago crven kad bi se ograničenje prekoračilo).
Dijalog odmah nakon generiranja prikazuje i upozorenje `ai.limit_exceeded` ako bi AI izlaz premašio ograničenje.
U tom stanju gumb **Umetni** i njegov izbornik alternativnih načina su onemogućeni — ekstenzija `CharacterCount` odbija svako umetanje koje bi povećalo dokument preko ograničenja, pa se rezultat primjenjuje sve ili ništa: umeće se u cijelosti kad stane ili se uopće ne umeće kad premašuje ograničenje.
Skratite rezultat da ponovno omogućite radnju:

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

Koristite `systemPrompt`, `temperature`, `chatCompletionOptions` ili `createMessages(context)` za prilagodbu zahtjeva chat-completions kompatibilnog s OpenAI-jem. `context` sadrži `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` su tekst odlomka odabira oko njega (do 500 znakova svaki, prazni bez odabira) — pošaljite ih s odabirom, ili model fragment drži za cijeli tekst i dovršava ga.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Tip:** `String`
- **Zadano:** `undefined`

Alternativa prilagođenom `aiProvider`: usmjerite AI značajku na backend LLM krajnju točku, a tiptapify sam izrađuje i šalje zahtjev. Backend prima minimalni JSON payload:

- **Uvijek:** `prompt` (zahtjev upisan u dijalogu) i `instruction` (vaš `systemPrompt`, sistemska poruka prilagođenog `createMessages` ili ugrađena zadana).
- **Neobavezno, šalje se samo kad je postavljeno:** `stream` (samo `true`), `thinking` (prekidač **Razmišljanje** u dijalogu, samo `true`), `reasoning_effort` (odabrana razina) i `model`.

Odgovor se prihvaća tolerantno: običan string, objekt `{ content }` ili payload `choices` kompatibilan s OpenAI-jem. Kad zahtjev ima `stream: true`, tijelo odgovora čita se kao SSE tok (retci `data:`, završeni s `data: [DONE]`): prihvaćaju se delte u stilu OpenAI-ja (`choices[0].delta.content` / `.reasoning_content`), jednostavan chunk `{ type: 'content' | 'reasoning', data }`, ravni chunk `{ content, reasoning_content }` i retci `data` s običnim tekstom. Ako backend zanemari `stream` i odgovori običnim tijelom, koristi se to tijelo. Odgovor koji nije OK prikazuje u dijalogu poruku o pogrešci backenda (JSON `{ error }` / `{ message }` ili sirovo tijelo). Gumb **Zaustavi** i zatvaranje dijaloga prekidaju zahtjev u tijeku; djelomično strujani sadržaj ostaje u polju rezultata.

Ako su postavljeni i `aiProvider` i `aiEndpoint`, pobjeđuje `aiProvider`.

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
- **Zadano:** `undefined`

Dodatna zaglavlja poslana sa zahtjevom `aiEndpoint`, spojena preko `Content-Type: application/json`. Ovdje postavljeno zaglavlje `Authorization` zadržava se kakvo jest; inače se token iz `tokenProvider` (kad je postavljen) šalje kao `Authorization: Bearer <token>`.

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
- **Zadano:** `'Inter'`

Zadana obitelj fonta za sadržaj uređivača.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Tip:** `String`
- **Zadano:** `'px'`

Mjerna jedinica za vrijednosti veličine fonta.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Tip:** `String`
- **Zadano:** `'0'`

Radijus obruba spremnika uređivača. Prihvaća Vuetify vrijednosti radijusa (`sm`, `md`, `lg`, `xl`, `pill` itd.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Tip:** `variantBtnTypes`
- **Zadano:** `'tonal'`

Vuetify varijanta gumba za gumbe alatne trake. Vrijednost se dijeli sa svakom komponentom alatne trake putem konfiguracije uređivača — prilagođene komponente mogu je pročitati pomoću [`useTiptapifyConfig`](/hr/api/types#usetiptapifyconfig). Vidi [`variantBtnTypes`](/hr/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Tip:** `variantFieldTypes`
- **Zadano:** `'outlined'`

Vuetify varijanta za padajuća polja alatne trake. Vrijednost se dijeli sa svakom komponentom alatne trake putem konfiguracije uređivača — prilagođene komponente mogu je pročitati pomoću [`useTiptapifyConfig`](/hr/api/types#usetiptapifyconfig). Vidi [`variantFieldTypes`](/hr/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Tip:** `Array<toolbarSections>`
- **Zadano:** `[]`

Pružite prilagođene odjeljke alatne trake za proširenje ili dodavanje stavki. Komponente svakog odjeljka mogu pročitati zajedničku konfiguraciju uređivača pomoću [`useTiptapifyConfig`](/hr/api/types#usetiptapifyconfig). Vidi [Prilagođena alatna traka](/hr/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Tip:** `Boolean`
- **Zadano:** `true`

Omogući interaktivnu primjenu stilova.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Tip:** `Boolean`
- **Zadano:** `false`

Prikaži neodređenu traku napretka dok se uređivač učitava.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Tip:** `String`
- **Zadano:** `'default'`

Boja trake napretka učitavanja. Prihvaća vrijednosti boja Vuetify teme.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Tip:** `String`
- **Zadano:** `'1px'`

Visina trake napretka učitavanja.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Tip:** `Number`
- **Zadano:** `0`

Od ovoliko slika u nizu (bez ičega između njih) uređivač ih slaže u numeriranu mrežu od tri stupca, za web-mjesta koja takve slike prikazuju kao slider. `0` to isključuje.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Tip:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/hr/api/types#tiptapifyskininput))
- **Zadano:** `'default'`

Izgled okvira uređivača: alatna traka, bubble izbornici, padajući izbornici, dijalozi, podnožje.

- `default` — klasičan izgled: podignuta alatna traka, grupe gumba kao podignuti okviri, Vuetify gumbi s primarnim stanjem pritisnutosti.
- `pastel` — smiren izgled: ravna obojena alatna traka ispod tanke crte, prozirni gumbi s neutralnim stanjem pritisnutosti, lagani padajući izbornici, meki dijalozi.

Značajke (opisi slika, slideri, padajući izbornik poravnanja, stilovi popisa) rade jednako u oba skina.

```vue
<Tiptapify skin="pastel" />
```

Možete proslijediti i inline objekt skina: nadjačavanja tokena (`colors` / `metrics`) i zastavice oblika, uz mogućnost `extends` registriranog skina. Razrješava se nad `default` (ili svojom osnovicom), prikazuje se pod klasom `tiptapify-skin-inline` (`tiptapify-skin-{name}` kad objekt nosi `name`), a njegovi tokeni završavaju kao CSS varijable `--tf-*` na korijenu uređivača. Prilagođena imena dolaze iz `registerSkin('mint', { … })` — tablicu tokena i recepte pogledajte u [vodiču za skinove](/hr/guide/skins).

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Tip:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/hr/api/types#tiptapifyuploadoptions))
- **Zadano:** `null`

Krajnja točka [prijenosa datoteka](/hr/guide/uploads): datoteke odabrane u dijalozima za slike i videozapise (te naslovna slika videa i slika kartice poveznice) šalju se na nju s `POST {endpoint}` (multipart `file` i `kind`), a dokument zadržava URL koji ona vrati (`{ "url": … }`).

Bez nje dijalog za slike i dalje prima datoteku: odabrana slika (i naslovna slika videa) ugrađuje se u dokument kao base64 data URL, a base64 slike zadržavaju se pri učitavanju dokumenta. Dijalog za video nudi **Prijenos** samo uz ovaj prop. Kad je `upload` postavljen, base64 slike se uklanjaju pri učitavanju dokumenta.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Tip:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/hr/api/types#tiptapifycontentstyles))
- **Zadano:** `'inline'`

Kako spremljeni HTML nosi izgled kartica poveznica, slika s opisom, videozapisa, ugrađenih sadržaja i popisa zadataka (vidi [Stilovi sadržaja](/hr/guide/content-styles)): `inline` ga upisuje u njihove atribute `style`, pa web-mjesto prikazuje HTML onakav kakav jest; `classes` zadržava samo klase, za web-mjesto koje učitava `tiptapify/content.css`. Uređivač te stilove pri učitavanju HTML-a zanemaruje, pa se obje vrste HTML-a učitavaju jednako.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Tip:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/hr/api/types#tiptapifylinkpreviewoptions))
- **Zadano:** `null`

Backend krajnja točka [kartica poveznica](/hr/guide/link-cards): čita OpenGraph podatke stranica, što preglednik ne može (CORS). Uređivač je pri pokretanju provjerava handshakeom (`GET {endpoint}` mora odgovoriti `200 { "tiptapifyLinkPreview": 1 }`); dok ne odgovori, ništa ne nudi karticu.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Događaji {#events}

### `editor-ready` {#editor-ready}

Pokreće se kad je instanca uređivača spremna.

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

Pokreće se kad se sadržaj uređivača promijeni.

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

Podržava povezivanje `v-model`.

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

Instanca uređivača i funkcija `t` dostupne su putem Vueova provide/inject:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
