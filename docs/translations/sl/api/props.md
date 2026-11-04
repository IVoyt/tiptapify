# Lastnosti {#props}

## Lastnosti `<Tiptapify>` {#tiptapify-props}

### `content` {#content}

- **Tip:** `String | Object`
- **Privzeto:** `''`

Začetna vsebina urejevalnika. Sprejme niz HTML ali objekt Tiptap JSON.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` je samo **začetna** vsebina; za dvosmerno vezavo uporabite `v-model` (glejte `modelValue`).

### `modelValue` {#modelvalue}

- **Tip:** `String | Object`
- **Privzeto:** `''`

Vrednost za dvosmerno vezavo `v-model`. Z `v-model` ohranjate reaktivno vrednost usklajeno z urejevalnikom. Ob vsakem urejanju komponenta odda `update:modelValue` z zadnjim HTML, ki ga `v-model` zapiše nazaj v vaš ref. Kadar se uporablja samo `v-model` (brez `:content`), je vezana vrednost začetna vsebina urejevalnika.

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
- **Privzeto:** `''`

Besedilo označbe mesta, prikazano, ko je urejevalnik prazen.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Tip:** `Number`
- **Privzeto:** `null`

Najmanjša višina območja vsebine urejevalnika v slikovnih pikah.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Tip:** `Boolean`
- **Privzeto:** `true`

Prikaže ali skrije orodno vrstico.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Tip:** `Array<String> | Object`
- **Privzeto:** `[]`

Elementi orodne vrstice, ki naj se prikažejo. Podajte polje imen elementov ali objekt s poimenovanimi odseki. Glejte [Elementi orodne vrstice](/sl/api/toolbar-items).
V polju `'|'` elemente razdeli v skupine (v tem vrstnem redu, ne glede na odseke, iz katerih gumbi izvirajo), `'~'` pa elemente za njim potisne na konec orodne vrstice. Pri skupinah ime, ki ni vgrajen element, ohrani mesto za gumb po meri s tem imenom iz `customExtensions`; brez takega gumba se mesto opusti.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Tip:** `Boolean`
- **Privzeto:** `false`

Pri `true` lastnost `items` določa elemente, ki jih je treba **izključiti**, ne vključiti.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Tip:** `Boolean`
- **Privzeto:** `true`

Prikaže meni z mehurčkom, ko je besedilo izbrano: ena vrstica gumbov z ikonami v skupinah — krepko, ležeče, podčrtano, prečrtano | nadpisano, podpisano | poudarjanje, vrstična koda | povezava | počisti oblikovanje. Vsak gumb ima opis orodja s svojo bližnjico in se prikaže, ko je njegova oznaka na izboru. Skrit je pri izbranem bloku (slika, gradnik), znotraj kode in ko je izbran celoten dokument.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Tip:** `Boolean`
- **Privzeto:** `true`

Prikaže plavajoči meni na praznih vrsticah: naslov 1, naslov 2 in neoštevilčen seznam, v isti vrstici gumbov z ikonami kot meni z mehurčkom.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Tip:** `Boolean`
- **Privzeto:** `true`

Omogoči meni ukazov s poševnico (za sprožitev vnesite `/`).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Tip:** `Boolean`
- **Privzeto:** `true`

Prikaže število besed v nogi urejevalnika.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Tip:** `Boolean`
- **Privzeto:** `true`

Prikaže število znakov v nogi urejevalnika.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Tip:** `Number | null`
- **Privzeto:** `null`

Največje število znakov, ki ga dovoljuje razširitev Tiptap `CharacterCount`. Nastavite `null` ali izpustite lastnost za neomejeno urejanje. Pri vrednosti, večji od `0`, noga prikaže krožni kazalnik napredka SVG z barvno kodiranimi pragovi.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Tip:** `String`
- **Privzeto:** `'purple'`

Privzeta barva krožnega kazalnika napredka v nogi, kadar je nastavljen `limit`.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Tip:** `String`
- **Privzeto:** `'orange'`

Barva kazalnika napredka, ko poraba preseže 75 % omejitve.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Tip:** `String`
- **Privzeto:** `'red'`

Barva kazalnika napredka, ko je omejitev znakov dosežena.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Tip:** `TiptapifyFooterAlignment`
- **Privzeto:** `'end'`

Poravnava elementov stanja v nogi. Sprejme `'start'`, `'center'` ali `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Tip:** `Boolean | TiptapifyAiOptions`
- **Privzeto:** `false`

Omogoči element orodne vrstice `ai`. Urejevalnik sestavi zahtevo `/v1/chat/completions`, združljivo z OpenAI, in jo preda `aiProvider`. Povratni klic ponudnika uporabite za klic svojega zaledja, BFF, končne točke, zaščitene z OAuth, LM Studia ali ovojnice SDK.

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

Primer z lokalnim LLM LM Studio:

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

Izpis v obliki toka je podprt z nastavitvijo `stream: true` in potiskanjem žetonov prek argumenta `stream` v `aiProvider`. Polje rezultata v pogovornem oknu AI se sproti posodablja, ko prihajajo kosi, gumb **Ustavi** pa prekliče zahtevo v teku:

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

Podajte `stream.signal` v `fetch` (ali klic SDK), da se zahteva prekliče, ko uporabnik klikne **Ustavi** ali zapre pogovorno okno. Delno preneseta vsebina ostane v polju rezultata in jo je mogoče uporabiti ali zavreči. Ponudniki, ki ne pretakajo, lahko argument `stream` povsem prezrejo — je neobvezen in povratno združljiv.

Modeli z razmišljanjem (Qwen thinking, DeepSeek, serije o) svoje »misli« pretakajo v ločeni delti `reasoning_content`. Te kose posredujte prek `stream.onReasoning()` — pri `showReasoning: true` jih pogovorno okno izriše v zložljivi plošči **Razmišljanje** nad poljem rezultata (plošča je privzeto skrita). Izhod razmišljanja je samo za prikaz in se nikoli ne vstavi v urejevalnik.

Da uporabnik lahko za vsako zahtevo preklopi način razmišljanja modela, v možnostih AI nastavite `thinking: true`. Pogovorno okno nato prikaže stikalo **Razmišljanje** (privzeto vklopljeno, ob vsakem odprtju ponastavljeno); vtičnik vrednost stikala zapiše v zahtevo kot `enable_thinking: true | false`, zato `enable_thinking` v `chatCompletionOptions` ni več treba (in ne bi smeli) nastavljati sami:

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

Kadar je `thinking` enak `false` ali izpuščen, stikalo ni prikazano, vtičnik pa pošlje `enable_thinking: false`, tako da modeli, ki privzeto razmišljajo (Qwen3, DeepSeek, …), ne razmišljajo.

Da uporabnik lahko za vsako zahtevo izbere trud razmišljanja, v možnostih AI nastavite `reasoningEffort`. Pogovorno okno nato prikaže spustni meni **Trud razmišljanja**, napolnjen iz `options` — ravni truda po meri (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Razširitev v spustni meni vedno sama doda element `default` (izhodišče načina razmišljanja), zato `default` v konfiguraciji nikoli ne naštevajte; polje `default` te možnosti ob odprtju pogovornega okna vnaprej izbere eno od vaših ravni po meri (sicer je vnaprej izbran `default`), vrednost pa se ob vsakem odprtju ponastavi.
Izbrana vrednost določa, kaj vtičnik zapiše v zahtevo: `default` ohrani način razmišljanja — stikalo **Razmišljanje** ostane aktivno in nadzira `enable_thinking`; vsaka druga vrednost se namesto tega pošlje kot `reasoning_effort`, stikalo Razmišljanje pa je onemogočeno, dokler je ta vrednost izbrana (ponudniki v eni zahtevi zavrnejo hkratna `enable_thinking` in `reasoning_effort`).
Spustni meni je prikazan samo, kadar je `thinking` omogočen in je stikalo Razmišljanje vklopljeno — izklop razmišljanja ga skrije, `reasoning_effort` pa se ne pošlje (zahteva preide na `enable_thinking: false`). Kadar `options` manjka ali je prazen, se spustni meni sploh ne izriše:

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

Plošča **Razmišljanje** je privzeto skrita (`showReasoning` je privzeto `false`). Z `showReasoning: true` prikažete zložljivo ploščo, ki pretaka proces razmišljanja modela (delta `reasoning_content`), medtem ko razmišljanje ostane vklopljeno — model še vedno razmišlja in rezultat se uporabi enako, dodatno se prikaže le postopno razmišljanje:

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

Primeri navodil po meri nadomestijo lokalizirane privzete vrednosti:

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

`tokenProvider` in `storage` sta neobvezna kavlja v lasti uporabnika za neposredne integracije v brskalniku. Ključi API ali žetoni ponudnika, postavljeni v kodo brskalnika ali shrambo brskalnika, so vidni uporabnikom in jih ne smete obravnavati kot skrivnosti. Za produkcijske skrivnosti raje uporabite vzorec zalednega adapterja zgoraj.

Z `mode: 'insert' | 'replace' | 'append'` vnaprej izberete način vstavljanja na gumbu dejanja pogovornega okna (**Vstavi** / **Zamenjaj** / **Dodaj na konec**). Brez `mode` je gumb privzeto **Zamenjaj**, če je bilo ob odprtju pogovornega okna izbrano besedilo, in **Vstavi** v nasprotnem primeru. Gumb dejanja je razdeljen gumb: glavni del uporabi rezultat v vnaprej izbranem načinu, majhen del »več« (⋮) na njegovi desni pa odpre meni s preostalimi načini — klik na enega takoj uporabi rezultat v tem načinu.

Kadar ima urejevalnik `limit` (omejitev števila znakov), se takoj ob ustvarjenem rezultatu pod poljem rezultata prikaže števec znakov `generated / limit` (med pretakanjem se sproti posodablja in postane mehko rdeč, ko bi bila omejitev presežena).
Pogovorno okno takoj po generiranju prikaže tudi opozorilo `ai.limit_exceeded`, če bi izhod AI presegel omejitev.
V tem stanju sta gumb **Vstavi** in njegov meni drugih načinov onemogočena — razširitev `CharacterCount` zavrne vsako vstavljanje, ki bi dokument povečalo čez omejitev, zato se rezultat uporabi v celoti ali sploh ne: vstavi se v celoti, če se prilega, ali pa se sploh ne vstavi, če preseže omejitev.
Rezultat skrajšajte, da dejanje spet omogočite:

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

Z `systemPrompt`, `temperature`, `chatCompletionOptions` ali `createMessages(context)` prilagodite zahtevo chat-completions, združljivo z OpenAI. `context` vsebuje `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` sta besedilo odstavka izbora okoli njega (do 500 znakov na vsaki strani, prazno brez izbora) — pošljite ju z izborom, sicer model odlomek šteje za celotno besedilo in ga dopolni.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Tip:** `String`
- **Privzeto:** `undefined`

Alternativa lastnemu `aiProvider`: funkcijo AI usmerite na zaledno končno točko LLM, Tiptapify pa zahtevo sestavi in pošlje sam. Zaledje prejme minimalno vsebino JSON:

- **Vedno:** `prompt` (zahteva, vnesena v pogovorno okno) in `instruction` (vaš `systemPrompt`, sistemsko sporočilo lastnega `createMessages` ali vgrajena privzeta vrednost).
- **Neobvezno, poslano samo, kadar je nastavljeno:** `stream` (samo `true`), `thinking` (stikalo **Razmišljanje** v pogovornem oknu, samo `true`), `reasoning_effort` (izbrana raven truda) in `model`.

Odgovor je sprejet prizanesljivo: navaden niz, objekt `{ content }` ali vsebina `choices`, združljiva z OpenAI. Kadar ima zahteva `stream: true`, se telo odgovora bere kot tok SSE (vrstice `data:`, zaključene z `data: [DONE]`): sprejete so delte v slogu OpenAI (`choices[0].delta.content` / `.reasoning_content`), preprost kos `{ type: 'content' | 'reasoning', data }`, ploski kos `{ content, reasoning_content }` in vrstice `data` z navadnim besedilom. Če zaledje prezre `stream` in odgovori z navadnim telesom, se uporabi to telo. Odgovor, ki ni OK, v pogovornem oknu prikaže sporočilo o napaki zaledja (JSON `{ error }` / `{ message }` ali surovo telo). Gumb **Ustavi** in zaprtje pogovornega okna prekineta zahtevo v teku; delno preneseta vsebina ostane v polju rezultata.

Če sta nastavljena `aiProvider` in `aiEndpoint`, prevlada `aiProvider`.

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
- **Privzeto:** `undefined`

Dodatne glave, poslane z zahtevo `aiEndpoint`, združene čez `Content-Type: application/json`. Tu nastavljena glava `Authorization` se ohrani nespremenjena; sicer se žeton iz `tokenProvider` (če je nastavljen) pošlje kot `Authorization: Bearer <token>`.

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
- **Privzeto:** `'Inter'`

Privzeta družina pisave za vsebino urejevalnika.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Tip:** `String`
- **Privzeto:** `'px'`

Merska enota za vrednosti velikosti pisave.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Tip:** `String`
- **Privzeto:** `'0'`

Polmer robov vsebnika urejevalnika. Sprejme vrednosti polmera Vuetify (`sm`, `md`, `lg`, `xl`, `pill` itd.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Tip:** `variantBtnTypes`
- **Privzeto:** `'tonal'`

Različica gumbov Vuetify za gumbe orodne vrstice. Vrednost si prek konfiguracije urejevalnika deli z vsemi komponentami orodne vrstice — komponente po meri jo lahko preberejo z [`useTiptapifyConfig`](/sl/api/types#usetiptapifyconfig). Glejte [`variantBtnTypes`](/sl/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Tip:** `variantFieldTypes`
- **Privzeto:** `'outlined'`

Različica Vuetify za spustna polja orodne vrstice. Vrednost si prek konfiguracije urejevalnika deli z vsemi komponentami orodne vrstice — komponente po meri jo lahko preberejo z [`useTiptapifyConfig`](/sl/api/types#usetiptapifyconfig). Glejte [`variantFieldTypes`](/sl/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Tip:** `Array<toolbarSections>`
- **Privzeto:** `[]`

Podajte odseke orodne vrstice po meri za razširitev ali dodajanje elementov. Komponente vsakega odseka lahko skupno konfiguracijo urejevalnika preberejo z [`useTiptapifyConfig`](/sl/api/types#usetiptapifyconfig). Glejte [Orodna vrstica po meri](/sl/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Tip:** `Boolean`
- **Privzeto:** `true`

Omogoči interaktivno uporabo slogov.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Tip:** `Boolean`
- **Privzeto:** `false`

Prikaže nedoločeno vrstico napredka, medtem ko se urejevalnik nalaga.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Tip:** `String`
- **Privzeto:** `'default'`

Barva vrstice napredka nalaganja. Sprejme vrednosti barv teme Vuetify.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Tip:** `String`
- **Privzeto:** `'1px'`

Višina vrstice napredka nalaganja.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Tip:** `Number`
- **Privzeto:** `0`

Od tolikšnega števila zaporednih slik (brez ničesar vmes) urejevalnik slike razporedi v oštevilčeno tristolpčno mrežo, za spletna mesta, ki take slike prikazujejo kot drsnik. `0` to izklopi.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Tip:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/sl/api/types#tiptapifyskininput))
- **Privzeto:** `'default'`

Videz okvirja urejevalnika: orodna vrstica, meniji z mehurčkom, spustni meniji, pogovorna okna, noga.

- `default` — klasični videz: dvignjena orodna vrstica, skupine gumbov kot dvignjena polja, gumbi Vuetify s primarnim stanjem pritisnjenosti.
- `pastel` — umirjen videz: ravna obarvana orodna vrstica pod tanko črto, prosojni gumbi z nevtralnim stanjem pritisnjenosti, lahki spustni meniji, mehka pogovorna okna.

Funkcije (napisi slik, drsniki, spustni meni poravnave, slogi seznamov) delujejo enako v obeh preoblekah.

```vue
<Tiptapify skin="pastel" />
```

Podate lahko tudi vrstični objekt preobleke: prepise žetonov (`colors` / `metrics`) in zastavice oblike, po želji z `extends` registrirane preobleke. Razreši se čez `default` (ali svojo osnovo), izriše se pod razredom `tiptapify-skin-inline` (`tiptapify-skin-{name}`, kadar objekt vsebuje `name`), njegovi žetoni pa pristanejo kot spremenljivke CSS `--tf-*` na korenu urejevalnika. Imena po meri prihajajo iz `registerSkin('mint', { … })` — tabelo žetonov in recepte najdete v [vodniku za preobleke](/sl/guide/skins).

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Tip:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/sl/api/types#tiptapifyuploadoptions))
- **Privzeto:** `null`

Končna točka [nalaganj](/sl/guide/uploads): datoteke, izbrane v pogovornih oknih za slike in videe (ter plakat videa, slika kartice povezave), se nanjo pošljejo s `POST {endpoint}` (multipart `file` in `kind`), dokument pa ohrani URL, s katerim odgovori (`{ "url": … }`).

Brez nje pogovorno okno za slike še vedno sprejme datoteko: izbrana slika (in plakat videa) se vdela v dokument kot podatkovni URL base64, slike base64 pa se ob nalaganju dokumenta ohranijo. Pogovorno okno za video ponuja **Naloži** samo s to lastnostjo. Ko je `upload` nastavljen, se slike base64 ob nalaganju dokumenta odstranijo.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Tip:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/sl/api/types#tiptapifycontentstyles))
- **Privzeto:** `'inline'`

Kako shranjeni HTML nosi videz kartic povezav, slik s podnapisom, videoposnetkov, vdelanih vsebin in seznamov opravil (glej [Slogi vsebine](/sl/guide/content-styles)): `inline` ga zapiše v njihove atribute `style`, tako da spletno mesto prikaže HTML takšen, kot je; `classes` obdrži samo razrede, za spletno mesto, ki nalaga `tiptapify/content.css`. Urejevalnik te sloge pri nalaganju HTML prezre, zato se obe vrsti HTML naložita enako.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Tip:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/sl/api/types#tiptapifylinkpreviewoptions))
- **Privzeto:** `null`

Zaledna končna točka [kartic povezav](/sl/guide/link-cards): bere podatke OpenGraph strani, česar brskalnik ne zmore (CORS). Urejevalnik jo ob zagonu preveri z rokovanjem (`GET {endpoint}` mora odgovoriti `200 { "tiptapifyLinkPreview": 1 }`); dokler ne odgovori, nič ne ponuja kartice.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Dogodki {#events}

### `editor-ready` {#editor-ready}

Sproži se, ko je primerek urejevalnika pripravljen.

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

Sproži se, ko se vsebina urejevalnika spremeni.

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

Podpira vezavo `v-model`.

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

Primerek urejevalnika in funkcija `t` sta na voljo prek Vue provide/inject:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
