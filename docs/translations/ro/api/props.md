# Proprietăți {#props}

## Proprietățile `<Tiptapify>` {#tiptapify-props}

### `content` {#content}

- **Tip:** `String | Object`
- **Implicit:** `''`

Conținutul inițial al editorului. Acceptă un șir HTML sau un obiect JSON Tiptap.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` este doar conținutul **inițial**; pentru legare bidirecțională folosește `v-model` (vezi `modelValue`).

### `modelValue` {#modelvalue}

- **Tip:** `String | Object`
- **Implicit:** `''`

Valoarea pentru legarea bidirecțională `v-model`. Folosește `v-model` pentru a menține o valoare reactivă sincronizată cu editorul. La fiecare editare, componenta emite `update:modelValue` cu cel mai recent HTML, pe care `v-model` îl scrie înapoi în ref-ul tău. Când se folosește doar `v-model` (fără `:content`), valoarea legată este conținutul inițial al editorului.

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
- **Implicit:** `''`

Textul substituent afișat când editorul este gol.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Tip:** `Number`
- **Implicit:** `null`

Înălțimea minimă a zonei de conținut a editorului, în pixeli.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Tip:** `Boolean`
- **Implicit:** `true`

Afișează sau ascunde bara de instrumente.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Tip:** `Array<String> | Object`
- **Implicit:** `[]`

Elementele barei de instrumente de afișat. Transmite o listă de nume de elemente sau un obiect cu secțiuni denumite. Vezi [Elementele barei de instrumente](/ro/api/toolbar-items).
Într-o listă, `'|'` împarte elementele în grupuri (în această ordine, indiferent de secțiunile din care provin butoanele), iar `'~'` mută elementele de după el la sfârșitul barei de instrumente. Cu grupuri, un nume care nu este un element încorporat rezervă un loc pentru butonul personalizat cu acel nume din `customExtensions`; fără un asemenea buton, locul este eliminat.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Tip:** `Boolean`
- **Implicit:** `false`

Când este `true`, proprietatea `items` specifică elementele de **exclus**, nu de inclus.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Tip:** `Boolean`
- **Implicit:** `true`

Afișează meniul bubble când este selectat text: un rând de butoane-pictogramă, în grupuri — îngroșat, cursiv, subliniat, tăiat | exponent, indice | evidențiere, cod inline | link | ștergerea formatării. Fiecare buton are un tooltip cu scurtătura sa și se afișează activ când marcajul său este pe selecție. Se ascunde pentru un bloc selectat (imagine, widget), în interiorul codului și când este selectat întregul document.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Tip:** `Boolean`
- **Implicit:** `true`

Afișează meniul flotant pe liniile goale: titlu 1, titlu 2 și o listă cu buline, în același rând de butoane-pictogramă ca meniul bubble.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Tip:** `Boolean`
- **Implicit:** `true`

Activează meniul de comenzi slash (tastează `/` pentru a-l declanșa).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Tip:** `Boolean`
- **Implicit:** `true`

Afișează numărul de cuvinte în subsolul editorului.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Tip:** `Boolean`
- **Implicit:** `true`

Afișează numărul de caractere în subsolul editorului.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Tip:** `Number | null`
- **Implicit:** `null`

Numărul maxim de caractere permis de extensia Tiptap `CharacterCount`. Setează `null` sau omite proprietatea pentru editare nelimitată. Când este setată la o valoare mai mare decât `0`, subsolul afișează un indicator circular de progres SVG, cu praguri codificate prin culori.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Tip:** `String`
- **Implicit:** `'purple'`

Culoarea implicită a indicatorului circular de progres afișat în subsol când `limit` este setat.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Tip:** `String`
- **Implicit:** `'orange'`

Culoarea indicatorului de progres când utilizarea depășește 75% din limită.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Tip:** `String`
- **Implicit:** `'red'`

Culoarea indicatorului de progres când limita de caractere a fost atinsă.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Tip:** `TiptapifyFooterAlignment`
- **Implicit:** `'end'`

Alinierea elementelor de stare din subsol. Acceptă `'start'`, `'center'` sau `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Tip:** `Boolean | TiptapifyAiOptions`
- **Implicit:** `false`

Activează elementul `ai` din bara de instrumente. Editorul construiește o cerere `/v1/chat/completions` compatibilă OpenAI și o transmite către `aiProvider`. Folosește callbackul furnizorului pentru a apela backendul tău, un BFF, un endpoint protejat prin OAuth, LM Studio sau un wrapper SDK.

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

Exemplu cu LLM local LM Studio:

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

Ieșirea în flux este acceptată setând `stream: true` și trimițând token-urile prin argumentul `stream` al `aiProvider`. Câmpul de rezultat din dialogul AI se actualizează live pe măsură ce sosesc fragmentele, iar un buton **Oprește** anulează cererea în curs:

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

Transmite `stream.signal` către `fetch` (sau apelul SDK-ului tău), astfel încât cererea să fie anulată când utilizatorul dă clic pe **Oprește** sau închide dialogul. Conținutul transmis parțial rămâne în câmpul de rezultat și poate fi aplicat sau eliminat. Furnizorii care nu transmit în flux pot ignora complet argumentul `stream` — este opțional și compatibil retroactiv.

Modelele de raționament (Qwen thinking, DeepSeek, seria o) transmit „gândurile” lor într-un delta separat `reasoning_content`. Redirecționează acele fragmente prin `stream.onReasoning()` — când `showReasoning: true`, dialogul le afișează într-un panou pliabil **Gândire** deasupra câmpului de rezultat (panoul este ascuns implicit). Ieșirea de raționament este doar pentru afișare și nu este niciodată inserată în editor.

Pentru a lăsa utilizatorul să comute modul de gândire al modelului la fiecare cerere, setează `thinking: true` în opțiunile AI. Dialogul afișează atunci un comutator **Gândire** (activat implicit, resetat la fiecare deschidere); pluginul scrie valoarea comutatorului în cerere ca `enable_thinking: true | false`, deci nu mai trebuie (și nu ar trebui) să setezi tu însuți `enable_thinking` în `chatCompletionOptions`:

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

Când `thinking` este `false` sau omis, comutatorul nu este afișat, iar pluginul trimite `enable_thinking: false`, astfel încât modelele care gândesc implicit (Qwen3, DeepSeek, …) să nu gândească.

Pentru a lăsa utilizatorul să aleagă efortul de raționament la fiecare cerere, setează `reasoningEffort` în opțiunile AI. Dialogul afișează atunci o listă derulantă **Efort de raționament**, populată din `options` — niveluri de efort personalizate (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Extensia adaugă ea însăși întotdeauna un element `default` în lista derulantă (nivelul de bază al modului de gândire), deci nu enumeri niciodată `default` în configurația ta; câmpul `default` al opțiunii preselectează unul dintre nivelurile tale personalizate la deschiderea dialogului (altfel este preselectat `default`), iar valoarea se resetează la fiecare deschidere.
Valoarea selectată stabilește ce scrie pluginul în cerere: `default` păstrează modul de gândire — comutatorul **Gândire** rămâne activ și controlează `enable_thinking`; orice altă valoare este trimisă în schimb ca `reasoning_effort`, iar comutatorul Gândire este dezactivat cât timp acea valoare este selectată (furnizorii resping `enable_thinking` și `reasoning_effort` într-o singură cerere).
Lista derulantă este afișată doar când `thinking` este activat și comutatorul Gândire este pornit — dezactivarea gândirii o ascunde, iar `reasoning_effort` nu este trimis (cererea revine la `enable_thinking: false`). Când `options` lipsește sau este gol, lista derulantă nu este randată deloc:

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

Panoul **Gândire** este ascuns implicit (`showReasoning` are valoarea implicită `false`). Setează `showReasoning: true` pentru a afișa un panou pliabil care transmite în flux procesul de raționament al modelului (delta `reasoning_content`), păstrând gândirea activată — modelul raționează în continuare, iar rezultatul este aplicat la fel, doar raționamentul pas cu pas este afișat suplimentar:

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

Exemplele de prompt personalizate înlocuiesc valorile implicite localizate:

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

`tokenProvider` și `storage` sunt hook-uri opționale, deținute de consumator, pentru integrări directe în browser. Cheile API sau token-urile furnizorului plasate în codul din browser sau în stocarea browserului sunt vizibile utilizatorilor și nu trebuie tratate ca secrete. Pentru secrete de producție, preferă modelul cu adaptor de backend de mai sus.

Folosește `mode: 'insert' | 'replace' | 'append'` pentru a preselecta modul de inserare al butonului de acțiune al dialogului (**Inserează** / **Înlocuiește** / **Adaugă la final**). Fără `mode`, butonul este implicit **Înlocuiește** când există text selectat la deschiderea dialogului și **Inserează** în rest. Butonul de acțiune este un buton împărțit: partea principală aplică rezultatul în modul preselectat, iar o mică secțiune „mai multe” (⋮) din dreapta sa deschide un meniu cu celelalte moduri — un clic pe unul aplică imediat rezultatul în acel mod.

Când editorul are un `limit` (limita numărului de caractere), un contor de caractere `generated / limit` este afișat sub câmpul de rezultat imediat ce este generat un rezultat (se actualizează live în timpul transmisiei și devine roșu estompat când limita ar fi depășită).
Dialogul afișează și avertismentul `ai.limit_exceeded` imediat după generare, dacă ieșirea AI ar depăși limita.
În această stare, butonul **Inserează** și meniul său de moduri alternative sunt dezactivate — extensia `CharacterCount` respinge orice inserare care ar depăși limita documentului, deci rezultatul se aplică integral sau deloc: este inserat complet când încape sau nu este inserat deloc când depășește limita.
Scurtează rezultatul pentru a reactiva acțiunea:

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

Folosește `systemPrompt`, `temperature`, `chatCompletionOptions` sau `createMessages(context)` pentru a personaliza cererea chat-completions compatibilă OpenAI. `context` conține `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` sunt textul paragrafului selecției din jurul acesteia (până la 500 de caractere fiecare, gol fără selecție) — trimite-le împreună cu selecția, altfel un model ia fragmentul drept întregul text și îl completează.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Tip:** `String`
- **Implicit:** `undefined`

Alternativă la un `aiProvider` personalizat: îndreaptă funcționalitatea AI către un endpoint LLM din backend, iar tiptapify construiește și trimite singur cererea. Backendul primește un payload JSON minimal:

- **Întotdeauna:** `prompt` (cererea tastată în dialog) și `instruction` (`systemPrompt` al tău, mesajul de sistem al unui `createMessages` personalizat sau valoarea implicită încorporată).
- **Opțional, trimis doar când este setat:** `stream` (doar `true`), `thinking` (comutatorul **Gândire** al dialogului, doar `true`), `reasoning_effort` (nivelul de efort selectat) și `model`.

Răspunsul este acceptat flexibil: un șir simplu, un obiect `{ content }` sau un payload `choices` compatibil OpenAI. Când cererea are `stream: true`, corpul răspunsului este citit ca flux SSE (linii `data:`, încheiate cu `data: [DONE]`): sunt acceptate delta-uri în stil OpenAI (`choices[0].delta.content` / `.reasoning_content`), un fragment simplu `{ type: 'content' | 'reasoning', data }`, un fragment plat `{ content, reasoning_content }` și linii `data` de text simplu. Dacă backendul ignoră `stream` și răspunde cu un corp simplu, se folosește acel corp. Un răspuns care nu este OK afișează în dialog mesajul de eroare al backendului (JSON `{ error }` / `{ message }` sau corpul brut). Un buton **Oprește** și închiderea dialogului întrerup cererea în curs; conținutul transmis parțial rămâne în câmpul de rezultat.

Dacă sunt setate atât `aiProvider`, cât și `aiEndpoint`, `aiProvider` are prioritate.

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
- **Implicit:** `undefined`

Antete suplimentare trimise cu cererea `aiEndpoint`, îmbinate peste `Content-Type: application/json`. Un antet `Authorization` setat aici este păstrat ca atare; altfel, un token de la `tokenProvider` (când este setat) este trimis ca `Authorization: Bearer <token>`.

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
- **Implicit:** `'Inter'`

Familia de fonturi implicită pentru conținutul editorului.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Tip:** `String`
- **Implicit:** `'px'`

Unitatea de măsură pentru valorile dimensiunii fontului.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Tip:** `String`
- **Implicit:** `'0'`

Raza chenarului pentru containerul editorului. Acceptă valorile de rază Vuetify (`sm`, `md`, `lg`, `xl`, `pill` etc.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Tip:** `variantBtnTypes`
- **Implicit:** `'tonal'`

Varianta de buton Vuetify pentru butoanele barei de instrumente. Valoarea este partajată cu fiecare componentă a barei de instrumente prin configurația editorului — componentele personalizate o pot citi cu [`useTiptapifyConfig`](/ro/api/types#usetiptapifyconfig). Vezi [`variantBtnTypes`](/ro/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Tip:** `variantFieldTypes`
- **Implicit:** `'outlined'`

Varianta Vuetify pentru câmpurile derulante ale barei de instrumente. Valoarea este partajată cu fiecare componentă a barei de instrumente prin configurația editorului — componentele personalizate o pot citi cu [`useTiptapifyConfig`](/ro/api/types#usetiptapifyconfig). Vezi [`variantFieldTypes`](/ro/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Tip:** `Array<toolbarSections>`
- **Implicit:** `[]`

Furnizează secțiuni personalizate ale barei de instrumente pentru a extinde sau adăuga elemente. Componentele fiecărei secțiuni pot citi configurația partajată a editorului cu [`useTiptapifyConfig`](/ro/api/types#usetiptapifyconfig). Vezi [Bară de instrumente personalizată](/ro/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Tip:** `Boolean`
- **Implicit:** `true`

Activează aplicarea interactivă a stilurilor.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Tip:** `Boolean`
- **Implicit:** `false`

Afișează o bară de progres nedeterminată cât timp editorul se încarcă.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Tip:** `String`
- **Implicit:** `'default'`

Culoarea barei de progres de încărcare. Acceptă valorile de culoare ale temei Vuetify.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Tip:** `String`
- **Implicit:** `'1px'`

Înălțimea barei de progres de încărcare.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Tip:** `Number`
- **Implicit:** `0`

De la acest număr de imagini consecutive (fără nimic între ele), editorul le aranjează într-o grilă numerotată pe trei coloane, pentru site-urile care afișează astfel de imagini ca slider. `0` o dezactivează.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Tip:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/ro/api/types#tiptapifyskininput))
- **Implicit:** `'default'`

Aspectul elementelor editorului: bara de instrumente, meniurile bubble, listele derulante, dialogurile, subsolul.

- `default` — aspectul clasic: o bară de instrumente ridicată, grupuri de butoane ca niște casete ridicate, butoane Vuetify cu starea apăsată primară.
- `pastel` — aspectul calm: o bară de instrumente plată, tonată, sub o linie fină, butoane transparente cu starea apăsată neutră, liste derulante ușoare, dialoguri line.

Funcționalitățile (legendele imaginilor, slidere, lista derulantă de aliniere, stilurile de listă) funcționează la fel în ambele teme.

```vue
<Tiptapify skin="pastel" />
```

Poți transmite și un obiect de skin inline: suprascrieri de tokeni (`colors` / `metrics`) și indicatori de formă, opțional cu `extends` către un skin înregistrat. Se rezolvă peste `default` (sau baza sa), este afișat sub clasa `tiptapify-skin-inline` (`tiptapify-skin-{name}` când obiectul are un `name`), iar tokenii săi ajung ca variabile CSS `--tf-*` pe rădăcina editorului. Numele personalizate provin din `registerSkin('mint', { … })` — vezi [ghidul Teme de aspect](/ro/guide/skins) pentru tabelul de tokeni și rețete.

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Tip:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/ro/api/types#tiptapifyuploadoptions))
- **Implicit:** `null`

Endpointul [încărcărilor](/ro/guide/uploads): fișierele alese în dialogurile pentru imagine și video (precum și coperta unui videoclip și imaginea unui card de link) sunt trimise către el cu `POST {endpoint}` (`file` și `kind`, multipart), iar documentul păstrează URL-ul cu care răspunde (`{ "url": … }`).

Fără el, dialogul pentru imagine acceptă totuși un fișier: o imagine aleasă (și coperta unui videoclip) este încorporată în document ca URL de date base64, iar imaginile base64 sunt păstrate la încărcarea documentului. Dialogul video oferă **Încarcă** doar cu această proprietate. Cu `upload` setat, imaginile base64 sunt eliminate la încărcarea documentului.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Tip:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/ro/api/types#tiptapifycontentstyles))
- **Implicit:** `'inline'`

Cum poartă HTML-ul salvat aspectul cardurilor de link, al imaginilor cu legendă, al videoclipurilor, al încorporărilor și al listelor de sarcini (vezi [Stiluri de conținut](/ro/guide/content-styles)): `inline` îl scrie în atributele lor `style`, astfel încât un site afișează HTML-ul așa cum este; `classes` păstrează doar clase, pentru un site care încarcă `tiptapify/content.css`. Editorul ignoră aceste stiluri la încărcarea HTML-ului, așa că ambele feluri de HTML se încarcă la fel.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Tip:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/ro/api/types#tiptapifylinkpreviewoptions))
- **Implicit:** `null`

Endpointul de backend pentru [cardurile de link](/ro/guide/link-cards): citește datele OpenGraph ale paginilor, lucru pe care un browser nu îl poate face (CORS). Editorul îl verifică printr-un handshake la pornire (`GET {endpoint}` trebuie să răspundă `200 { "tiptapifyLinkPreview": 1 }`); până când răspunde, nimic nu oferă un card.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Evenimente {#events}

### `editor-ready` {#editor-ready}

Emis când instanța editorului este gata.

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

Emis când conținutul editorului se modifică.

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

Acceptă legarea `v-model`.

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

Instanța editorului și funcția `t` sunt disponibile prin provide/inject din Vue:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
