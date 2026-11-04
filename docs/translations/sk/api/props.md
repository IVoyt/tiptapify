# Props {#props}

## `<Tiptapify>` Props {#tiptapify-props}

### `content` {#content}

- **Typ:** `String | Object`
- **Predvolené:** `''`

Počiatočný obsah editora. Prijíma reťazec HTML alebo objekt Tiptap JSON.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` je iba **počiatočný** obsah; na obojsmernú väzbu použite `v-model` (pozri `modelValue`).

### `modelValue` {#modelvalue}

- **Typ:** `String | Object`
- **Predvolené:** `''`

Hodnota obojsmernej väzby pre `v-model`. Pomocou `v-model` udržujete reaktívnu hodnotu synchronizovanú s editorom. Pri každej úprave komponent emituje `update:modelValue` s najnovším HTML, ktoré `v-model` zapíše späť do vášho refu. Ak sa používa iba `v-model` (bez `:content`), viazaná hodnota je počiatočný obsah editora.

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

- **Typ:** `String`
- **Predvolené:** `''`

Zástupný text zobrazený, keď je editor prázdny.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Typ:** `Number`
- **Predvolené:** `null`

Minimálna výška oblasti obsahu editora v pixeloch.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Typ:** `Boolean`
- **Predvolené:** `true`

Zobrazí alebo skryje lištu nástrojov.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Typ:** `Array<String> | Object`
- **Predvolené:** `[]`

Položky lišty nástrojov, ktoré sa majú zobraziť. Odovzdajte pole názvov položiek alebo objekt s pomenovanými sekciami. Pozri [Položky lišty nástrojov](/sk/api/toolbar-items).
V poli `'|'` rozdelí položky do skupín (v tomto poradí, bez ohľadu na sekcie, z ktorých tlačidlá pochádzajú) a `'~'` presunie položky za ním na koniec lišty nástrojov. Pri skupinách názov, ktorý nie je vstavanou položkou, drží miesto pre vlastné tlačidlo s týmto názvom z `customExtensions`; ak takéto tlačidlo neexistuje, miesto sa vynechá.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Typ:** `Boolean`
- **Predvolené:** `false`

Ak je `true`, prop `items` určuje položky, ktoré sa majú **vylúčiť**, a nie zahrnúť.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Typ:** `Boolean`
- **Predvolené:** `true`

Zobrazí bublinovú ponuku pri výbere textu: jeden riadok tlačidiel s ikonami v skupinách — tučné, kurzíva, podčiarknutie, prečiarknutie | horný index, dolný index | zvýraznenie, inline kód | odkaz | zmazanie formátovania. Každé tlačidlo má tooltip so skratkou a zobrazí sa, keď je jeho značka na výbere zapnutá. Skryje sa pri vybranom bloku (obrázok, widget), vo vnútri kódu a pri vybranom celom dokumente.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Typ:** `Boolean`
- **Predvolené:** `true`

Zobrazí plávajúcu ponuku na prázdnych riadkoch: nadpis 1, nadpis 2 a odrážkový zoznam, v rovnakom riadku tlačidiel s ikonami ako bublinová ponuka.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Typ:** `Boolean`
- **Predvolené:** `true`

Zapne ponuku príkazov lomítka (spúšťa sa napísaním `/`).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Typ:** `Boolean`
- **Predvolené:** `true`

Zobrazí počet slov v pätičke editora.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Typ:** `Boolean`
- **Predvolené:** `true`

Zobrazí počet znakov v pätičke editora.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Typ:** `Number | null`
- **Predvolené:** `null`

Maximálny počet znakov povolený rozšírením Tiptap `CharacterCount`. Nastavte `null` alebo prop vynechajte, ak má úprava zostať neobmedzená. Pri hodnote väčšej ako `0` pätička zobrazí kruhový indikátor priebehu SVG s farebne rozlíšenými prahmi.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Typ:** `String`
- **Predvolené:** `'purple'`

Predvolená farba kruhového indikátora priebehu zobrazeného v pätičke, keď je nastavený `limit`.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Typ:** `String`
- **Predvolené:** `'orange'`

Farba indikátora priebehu, keď využitie presiahne 75 % limitu.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Typ:** `String`
- **Predvolené:** `'red'`

Farba indikátora priebehu, keď bol dosiahnutý limit znakov.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Typ:** `TiptapifyFooterAlignment`
- **Predvolené:** `'end'`

Zarovnanie stavových položiek pätičky. Prijíma `'start'`, `'center'` alebo `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Typ:** `Boolean | TiptapifyAiOptions`
- **Predvolené:** `false`

Zapne položku `ai` na lište nástrojov. Editor zostaví požiadavku `/v1/chat/completions` kompatibilnú s OpenAI a odovzdá ju `aiProvider`. Pomocou spätného volania poskytovateľa zavoláte svoj backend, BFF, endpoint chránený cez OAuth, LM Studio alebo wrapper SDK.

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

Príklad s lokálnym LLM LM Studio:

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

Streamovaný výstup je podporovaný nastavením `stream: true` a posielaním tokenov cez argument `stream` funkcie `aiProvider`. Pole výsledku v dialógu AI sa aktualizuje naživo, ako prichádzajú chunky, a tlačidlo **Zastaviť** zruší prebiehajúcu požiadavku:

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

Odovzdajte `stream.signal` do `fetch` (alebo volania SDK), aby sa požiadavka zrušila, keď používateľ klikne na **Zastaviť** alebo zatvorí dialóg. Čiastočne streamovaný obsah zostane v poli výsledku a možno ho použiť alebo zahodiť. Poskytovatelia, ktorí nestreamujú, môžu argument `stream` úplne ignorovať — je voliteľný a spätne kompatibilný.

Modely s uvažovaním (Qwen thinking, DeepSeek, rad o) streamujú svoje „myšlienky“ v samostatnej delte `reasoning_content`. Tieto chunky odovzdajte cez `stream.onReasoning()` — pri `showReasoning: true` ich dialóg vykreslí v zbaliteľnom paneli **Uvažuje** nad poľom výsledku (panel je predvolene skrytý). Výstup uvažovania je len na zobrazenie a do editora sa nikdy nevkladá.

Ak chcete používateľovi umožniť prepínať režim uvažovania modelu pri každej požiadavke, nastavte v možnostiach AI `thinking: true`. Dialóg potom zobrazí prepínač **Uvažuje** (predvolene zapnutý, pri každom otvorení sa obnoví); plugin zapíše hodnotu prepínača do požiadavky ako `enable_thinking: true | false`, takže `enable_thinking` už v `chatCompletionOptions` nemusíte (ani by ste nemali) nastavovať sami:

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

Ak je `thinking` `false` alebo chýba, prepínač sa nezobrazí a plugin odošle `enable_thinking: false`, takže modely, ktoré predvolene uvažujú (Qwen3, DeepSeek, …), neuvažujú.

Ak chcete používateľovi umožniť vybrať úroveň úsilia uvažovania pri každej požiadavke, nastavte v možnostiach AI `reasoningEffort`. Dialóg potom zobrazí rozbaľovaciu ponuku **Úsilie uvažovania** naplnenú z `options` — vlastných úrovní úsilia (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Rozšírenie si do ponuky vždy samo pridá položku `default` (základ režimu uvažovania), takže `default` v konfigurácii nikdy neuvádzajte; pole `default` možnosti predvyberie jednu z vašich vlastných úrovní pri otvorení dialógu (inak je predvolená `default`) a hodnota sa pri každom otvorení obnoví.
Vybraná hodnota určuje, čo plugin zapíše do požiadavky: `default` ponechá režim uvažovania — prepínač **Uvažuje** zostane aktívny a ovláda `enable_thinking`; akákoľvek iná hodnota sa odošle namiesto toho ako `reasoning_effort` a prepínač Uvažuje je pri jej výbere zakázaný (poskytovatelia odmietajú `enable_thinking` a `reasoning_effort` v jednej požiadavke).
Rozbaľovacia ponuka sa zobrazí iba vtedy, keď je `thinking` zapnuté a prepínač Uvažuje je zapnutý — vypnutie uvažovania ju skryje a `reasoning_effort` sa neodošle (požiadavka sa vráti k `enable_thinking: false`). Ak `options` chýba alebo je prázdne, ponuka sa nevykreslí vôbec:

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

Panel **Uvažuje** je predvolene skrytý (`showReasoning` je predvolene `false`). Nastavte `showReasoning: true`, aby sa zobrazil zbaliteľný panel, ktorý streamuje proces uvažovania modelu (delta `reasoning_content`) a uvažovanie zostane zapnuté — model stále uvažuje a výsledok sa použije rovnako, len sa navyše zobrazí postupné uvažovanie:

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

Vlastné príklady promptov nahradia lokalizované predvolené:

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

`tokenProvider` a `storage` sú voliteľné háčiky vo vlastníctve konzumenta pre priame integrácie v prehliadači. Kľúče API alebo tokeny poskytovateľa umiestnené v kóde prehliadača alebo v úložisku prehliadača vidia používatelia a nemožno ich považovať za tajné. Pre produkčné tajomstvá uprednostnite vyššie uvedený vzor backendového adaptéra.

Pomocou `mode: 'insert' | 'replace' | 'append'` vopred vyberiete režim vkladania na tlačidle akcie dialógu (**Vložiť** / **Nahradiť** / **Pridať na koniec**). Bez `mode` je tlačidlo predvolene **Nahradiť**, ak je pri otvorení dialógu vybraný text, a inak **Vložiť**. Tlačidlo akcie je rozdelené tlačidlo: hlavná časť použije výsledok vo vopred vybranom režime a malá časť „viac“ (⋮) vpravo od neho otvorí ponuku so zvyšnými režimami — kliknutie na niektorý z nich použije výsledok v tomto režime okamžite.

Ak má editor `limit` (limit počtu znakov), pod poľom výsledku sa hneď po vygenerovaní výsledku zobrazí počítadlo znakov `generated / limit` (počas streamovania sa aktualizuje naživo a pri prekročení limitu zjemnie sčervená).
Dialóg tiež hneď po generovaní zobrazí upozornenie `ai.limit_exceeded`, ak by výstup AI limit prekročil.
V tomto stave sú tlačidlo **Vložiť** a jeho ponuka alternatívnych režimov zakázané — rozšírenie `CharacterCount` odmietne každé vloženie, ktoré by zväčšilo dokument nad limit, takže výsledok sa použije celý alebo vôbec: vloží sa celý, ak sa zmestí, alebo sa nevloží vôbec, ak limit prekračuje.
Skráťte výsledok, aby sa akcia opäť povolila:

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

Pomocou `systemPrompt`, `temperature`, `chatCompletionOptions` alebo `createMessages(context)` prispôsobíte požiadavku chat-completions kompatibilnú s OpenAI. `context` obsahuje `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` sú text odseku s výberom pred ním a za ním (najviac 500 znakov na každej strane, bez výberu prázdne) — pošlite ich spolu s výberom, inak model považuje úryvok za celý text a dopíše ho.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Typ:** `String`
- **Predvolené:** `undefined`

Alternatíva k vlastnému `aiProvider`: namierte funkciu AI na backendový endpoint LLM a tiptapify zostaví a odošle požiadavku sám. Backend dostane minimálny payload JSON:

- **Vždy:** `prompt` (požiadavka napísaná v dialógu) a `instruction` (váš `systemPrompt`, systémová správa vlastného `createMessages` alebo vstavaná predvolená).
- **Voliteľné, odosielané iba ak sú nastavené:** `stream` (iba `true`), `thinking` (prepínač **Uvažuje** v dialógu, iba `true`), `reasoning_effort` (vybraná úroveň úsilia) a `model`.

Odpoveď sa prijíma tolerantne: obyčajný reťazec, objekt `{ content }` alebo payload `choices` kompatibilný s OpenAI. Ak má požiadavka `stream: true`, telo odpovede sa číta ako stream SSE (riadky `data:` ukončené `data: [DONE]`): akceptujú sa delty v štýle OpenAI (`choices[0].delta.content` / `.reasoning_content`), jednoduchý chunk `{ type: 'content' | 'reasoning', data }`, plochý chunk `{ content, reasoning_content }` aj riadky `data` s čistým textom. Ak backend `stream` ignoruje a odpovie obyčajným telom, použije sa toto telo. Odpoveď, ktorá nie je v poriadku, zobrazí v dialógu chybovú správu backendu (JSON `{ error }` / `{ message }` alebo surové telo). Tlačidlo **Zastaviť** a zatvorenie dialógu prebiehajúcu požiadavku prerušia; čiastočne streamovaný obsah zostane v poli výsledku.

Ak sú nastavené `aiProvider` aj `aiEndpoint`, má prednosť `aiProvider`.

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

- **Typ:** `Record<string, string>`
- **Predvolené:** `undefined`

Dodatočné hlavičky odosielané s požiadavkou `aiEndpoint`, zlúčené nad `Content-Type: application/json`. Tu nastavená hlavička `Authorization` sa ponechá tak, ako je; inak sa token z `tokenProvider` (ak je nastavený) odošle ako `Authorization: Bearer <token>`.

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

- **Typ:** `String`
- **Predvolené:** `'Inter'`

Predvolená rodina písma pre obsah editora.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Typ:** `String`
- **Predvolené:** `'px'`

Merná jednotka pre hodnoty veľkosti písma.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Typ:** `String`
- **Predvolené:** `'0'`

Polomer rohov kontajnera editora. Prijíma hodnoty polomeru Vuetify (`sm`, `md`, `lg`, `xl`, `pill` atď.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Typ:** `variantBtnTypes`
- **Predvolené:** `'tonal'`

Variant tlačidla Vuetify pre tlačidlá lišty nástrojov. Hodnota sa zdieľa so všetkými komponentmi lišty nástrojov cez konfiguráciu editora — vlastné komponenty ju môžu čítať cez [`useTiptapifyConfig`](/sk/api/types#usetiptapifyconfig). Pozri [`variantBtnTypes`](/sk/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Typ:** `variantFieldTypes`
- **Predvolené:** `'outlined'`

Variant Vuetify pre rozbaľovacie polia lišty nástrojov. Hodnota sa zdieľa so všetkými komponentmi lišty nástrojov cez konfiguráciu editora — vlastné komponenty ju môžu čítať cez [`useTiptapifyConfig`](/sk/api/types#usetiptapifyconfig). Pozri [`variantFieldTypes`](/sk/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Typ:** `Array<toolbarSections>`
- **Predvolené:** `[]`

Poskytnite vlastné sekcie lišty nástrojov na rozšírenie alebo pridanie položiek. Komponenty každej sekcie môžu čítať zdieľanú konfiguráciu editora cez [`useTiptapifyConfig`](/sk/api/types#usetiptapifyconfig). Pozri [Vlastná lišta nástrojov](/sk/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Typ:** `Boolean`
- **Predvolené:** `true`

Zapne interaktívne použitie štýlov.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Typ:** `Boolean`
- **Predvolené:** `false`

Zobrazí neurčitý ukazovateľ priebehu, kým sa editor načítava.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Typ:** `String`
- **Predvolené:** `'default'`

Farba ukazovateľa priebehu načítavania. Prijíma hodnoty farieb témy Vuetify.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Typ:** `String`
- **Predvolené:** `'1px'`

Výška ukazovateľa priebehu načítavania.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Typ:** `Number`
- **Predvolené:** `0`

Od tohto počtu obrázkov v rade (bez ničoho medzi nimi) editor rozloží obrázky do očíslovanej mriežky o troch stĺpcoch, pre weby, ktoré takéto obrázky zobrazujú ako slider. `0` to vypne.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Typ:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/sk/api/types#tiptapifyskininput))
- **Predvolené:** `'default'`

Vzhľad rámca editora: lišta nástrojov, bublinové ponuky, rozbaľovacie ponuky, dialógy, pätička.

- `default` — klasický vzhľad: zvýšený panel nástrojov, skupiny tlačidiel ako zvýšené boxy, tlačidlá Vuetify s primárnym stavom stlačenia.
- `pastel` — pokojný vzhľad: plochý tónovaný panel nástrojov pod tenkou čiarou, priehľadné tlačidlá s neutrálnym stavom stlačenia, ľahké rozbaľovacie ponuky, mäkké dialógy.

Funkcie (popisy obrázkov, slidery, rozbaľovacia ponuka zarovnania, štýly zoznamov) fungujú v oboch skinoch rovnako.

```vue
<Tiptapify skin="pastel" />
```

Môžete odovzdať aj inline objekt skinu: prepísania tokenov (`colors` / `metrics`) a príznaky tvaru, voliteľne s `extends` registrovaného skinu. Rieši sa nad `default` (alebo jeho základom), vykresľuje sa s triedou `tiptapify-skin-inline` (`tiptapify-skin-{name}`, ak objekt obsahuje `name`) a jeho tokeny sa na koreň editora dostanú ako CSS premenné `--tf-*`. Vlastné názvy vznikajú cez `registerSkin('mint', { … })` — tabuľku tokenov a recepty nájdete v [príručke Skiny](/sk/guide/skins).

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Typ:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/sk/api/types#tiptapifyuploadoptions))
- **Predvolené:** `null`

Endpoint [nahrávania](/sk/guide/uploads): súbory vybrané v dialógoch obrázka a videa (a náhľadový obrázok videa, obrázok karty odkazu) sa naň odosielajú cez `POST {endpoint}` (multipart `file` a `kind`) a dokument si ponechá URL, ktorou odpovie (`{ "url": … }`).

Bez neho dialóg obrázka súbor stále prijíma: vybraný obrázok (a náhľadový obrázok videa) sa vloží do dokumentu ako base64 data URL a obrázky base64 sa pri načítaní dokumentu ponechajú. Dialóg videa ponúka **Nahrať** iba s týmto propom. Ak je nastavený `upload`, obrázky base64 sa pri načítaní dokumentu odstránia.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Typ:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/sk/api/types#tiptapifycontentstyles))
- **Predvolené:** `'inline'`

Ako uložené HTML nesie vzhľad kariet odkazov, obrázkov s popiskom, videí, vložených prvkov a zoznamov úloh (pozri [Štýly obsahu](/sk/guide/content-styles)): `inline` ho zapíše do ich atribútov `style`, takže web zobrazí HTML tak, ako je; `classes` ponechá iba triedy, pre web, ktorý načítava `tiptapify/content.css`. Editor tieto štýly pri načítaní HTML ignoruje, takže oba druhy HTML sa načítajú rovnako.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Typ:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/sk/api/types#tiptapifylinkpreviewoptions))
- **Predvolené:** `null`

Backendový endpoint [kariet odkazov](/sk/guide/link-cards): číta údaje OpenGraph stránok, čo prehliadač nedokáže (CORS). Editor ho pri štarte overí handshakom (`GET {endpoint}` musí odpovedať `200 { "tiptapifyLinkPreview": 1 }`); kým neodpovie, nič kartu neponúka.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Udalosti {#events}

### `editor-ready` {#editor-ready}

Spustí sa, keď je inštancia editora pripravená.

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

Spustí sa pri zmene obsahu editora.

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

Podporuje väzbu `v-model`.

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

Inštancia editora a funkcia `t` sú dostupné cez provide/inject Vue:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
