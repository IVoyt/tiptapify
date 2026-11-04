# Props {#props}

## `<Tiptapify>` Props {#tiptapify-props}

### `content` {#content}

- **Typ:** `String | Object`
- **Výchozí:** `''`

Počáteční obsah editoru. Přijímá řetězec HTML nebo objekt Tiptap JSON.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` je pouze **počáteční** obsah; pro obousměrnou vazbu použijte `v-model` (viz `modelValue`).

### `modelValue` {#modelvalue}

- **Typ:** `String | Object`
- **Výchozí:** `''`

Hodnota obousměrné vazby pro `v-model`. Pomocí `v-model` udržíte reaktivní hodnotu synchronizovanou s editorem. Při každé úpravě komponenta vyšle `update:modelValue` s nejnovějším HTML, které `v-model` zapíše zpět do vašeho ref. Pokud se používá jen `v-model` (bez `:content`), je vázaná hodnota počátečním obsahem editoru.

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
- **Výchozí:** `''`

Zástupný text zobrazený, když je editor prázdný.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Typ:** `Number`
- **Výchozí:** `null`

Minimální výška oblasti obsahu editoru v pixelech.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Typ:** `Boolean`
- **Výchozí:** `true`

Zobrazí nebo skryje panel nástrojů.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Typ:** `Array<String> | Object`
- **Výchozí:** `[]`

Položky panelu nástrojů, které se mají zobrazit. Předejte pole názvů položek nebo objekt s pojmenovanými sekcemi. Viz [Položky panelu nástrojů](/cs/api/toolbar-items).
V poli `'|'` rozdělí položky do skupin (v tomto pořadí, ať tlačítka pocházejí z kterýchkoli sekcí) a `'~'` odsune položky za ním na konec panelu nástrojů. Při použití skupin název, který není vestavěnou položkou, drží místo pro vlastní tlačítko tohoto názvu z `customExtensions`; bez takového tlačítka se místo zahodí.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Typ:** `Boolean`
- **Výchozí:** `false`

Když je `true`, prop `items` určuje položky, které se mají **vyloučit**, nikoli zahrnout.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Typ:** `Boolean`
- **Výchozí:** `true`

Zobrazí bublinovou nabídku při výběru textu: jedna řada ikonových tlačítek ve skupinách — tučné, kurzíva, podtržení, přeškrtnutí | horní index, dolní index | zvýraznění, inline kód | odkaz | vymazat formátování. Každé tlačítko má tooltip s klávesovou zkratkou a zobrazuje, zda je jeho značka ve výběru zapnutá. Skryje se při vybraném bloku (obrázek, widget), uvnitř kódu a když je vybrán celý dokument.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Typ:** `Boolean`
- **Výchozí:** `true`

Zobrazí plovoucí nabídku na prázdných řádcích: nadpis 1, nadpis 2 a odrážkový seznam, ve stejné řadě ikonových tlačítek jako bublinová nabídka.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Typ:** `Boolean`
- **Výchozí:** `true`

Zapne nabídku příkazů s lomítkem (spouští se zadáním `/`).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Typ:** `Boolean`
- **Výchozí:** `true`

Zobrazí počet slov v zápatí editoru.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Typ:** `Boolean`
- **Výchozí:** `true`

Zobrazí počet znaků v zápatí editoru.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Typ:** `Number | null`
- **Výchozí:** `null`

Maximální počet znaků povolený rozšířením Tiptap `CharacterCount`. Nastavením `null` nebo vynecháním prop zůstane úprava neomezená. Při hodnotě větší než `0` zobrazí zápatí kruhový ukazatel průběhu v SVG s barevně odlišenými prahy.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Typ:** `String`
- **Výchozí:** `'purple'`

Výchozí barva kruhového ukazatele průběhu zobrazeného v zápatí, když je nastaven `limit`.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Typ:** `String`
- **Výchozí:** `'orange'`

Barva ukazatele průběhu, když využití překročí 75 % limitu.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Typ:** `String`
- **Výchozí:** `'red'`

Barva ukazatele průběhu, když byl dosažen limit znaků.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Typ:** `TiptapifyFooterAlignment`
- **Výchozí:** `'end'`

Zarovnání stavových položek v zápatí. Přijímá `'start'`, `'center'` nebo `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Typ:** `Boolean | TiptapifyAiOptions`
- **Výchozí:** `false`

Zapne položku panelu nástrojů `ai`. Editor sestaví požadavek `/v1/chat/completions` kompatibilní s OpenAI a předá ho `aiProvider`. Pomocí callbacku poskytovatele zavolejte svůj backend, BFF, endpoint chráněný OAuth, LM Studio nebo obálku SDK.

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

Příklad s lokálním LLM LM Studio:

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

Streamovaný výstup se zapíná nastavením `stream: true` a posíláním tokenů přes argument `stream` funkce `aiProvider`. Pole výsledku v dialogu AI se při příchodu chunků průběžně aktualizuje a tlačítko **Zastavit** rozpracovaný požadavek zruší:

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

Předejte `stream.signal` do `fetch` (nebo volání SDK), aby se požadavek zrušil, když uživatel klikne na **Zastavit** nebo zavře dialog. Částečně streamovaný obsah zůstane v poli výsledku a lze ho použít nebo zahodit. Poskytovatelé, kteří nestreamují, mohou argument `stream` zcela ignorovat — je volitelný a zpětně kompatibilní.

Modely s uvažováním (Qwen thinking, DeepSeek, řada o) streamují své „myšlenky“ v samostatné delta `reasoning_content`. Tyto chunky přeposílejte přes `stream.onReasoning()` — při `showReasoning: true` je dialog vykreslí ve sbalitelném panelu **Přemýšlení** nad polem výsledku (panel je ve výchozím stavu skrytý). Výstup uvažování je určen jen k zobrazení a do editoru se nikdy nevkládá.

Chcete-li uživateli umožnit přepínat režim přemýšlení modelu pro každý požadavek, nastavte v možnostech AI `thinking: true`. Dialog pak zobrazí přepínač **Přemýšlení** (výchozí stav zapnuto, při každém otevření se resetuje); plugin zapíše hodnotu přepínače do požadavku jako `enable_thinking: true | false`, takže už `enable_thinking` nemusíte (a neměli byste) nastavovat sami v `chatCompletionOptions`:

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

Když je `thinking` `false` nebo vynechán, přepínač se nezobrazí a plugin odešle `enable_thinking: false`, takže modely, které ve výchozím stavu přemýšlejí (Qwen3, DeepSeek, …), nepřemýšlejí.

Chcete-li uživateli umožnit zvolit úsilí uvažování pro každý požadavek, nastavte v možnostech AI `reasoningEffort`. Dialog pak zobrazí rozbalovací nabídku **Úsilí přemýšlení** naplněnou z `options` — vlastních úrovní úsilí (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Rozšíření do nabídky vždy samo přidá položku `default` (základ režimu přemýšlení), takže `default` ve své konfiguraci nikdy neuvádíte; pole `default` této možnosti předvybere jednu z vašich vlastních úrovní při otevření dialogu (jinak se předvybere `default`) a hodnota se při každém otevření resetuje.
Vybraná hodnota určuje, co plugin zapíše do požadavku: `default` zachová režim přemýšlení — přepínač **Přemýšlení** zůstane aktivní a řídí `enable_thinking`; jakákoli jiná hodnota se odešle místo toho jako `reasoning_effort` a přepínač Přemýšlení je při vybrané takové hodnotě zakázán (poskytovatelé odmítají `enable_thinking` a `reasoning_effort` v jediném požadavku).
Nabídka se zobrazí, jen když je `thinking` zapnuto a přepínač Přemýšlení je zapnutý — vypnutím přemýšlení se skryje a `reasoning_effort` se neodešle (požadavek se vrátí k `enable_thinking: false`). Když `options` chybí nebo je prázdné, nabídka se nevykreslí vůbec:

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

Panel **Přemýšlení** je ve výchozím stavu skrytý (`showReasoning` má výchozí hodnotu `false`). Nastavením `showReasoning: true` zobrazíte sbalitelný panel, který streamuje proces uvažování modelu (delta `reasoning_content`) při zachování zapnutého přemýšlení — model dál uvažuje a výsledek se použije stejně, jen se navíc zobrazí postupné uvažování:

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

Vlastní příklady příkazů nahradí lokalizované výchozí:

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

`tokenProvider` a `storage` jsou volitelné háčky ve vlastnictví spotřebitele pro přímé integrace v prohlížeči. Klíče API nebo tokeny poskytovatele umístěné v kódu prohlížeče nebo v úložišti prohlížeče jsou viditelné uživatelům a nelze je považovat za tajné. Pro produkční tajné údaje dávejte přednost výše uvedenému vzoru adaptéru na backendu.

Pomocí `mode: 'insert' | 'replace' | 'append'` předvyberete režim vložení na tlačítku akce dialogu (**Vložit** / **Nahradit** / **Přidat na konec**). Bez `mode` je tlačítko ve výchozím stavu **Nahradit**, je-li při otevření dialogu vybrán text, a jinak **Vložit**. Tlačítko akce je rozdělené tlačítko: hlavní část použije výsledek v předvybraném režimu a malá část „více“ (⋮) vpravo otevře nabídku ostatních režimů — kliknutí na jeden z nich použije výsledek v tomto režimu okamžitě.

Když má editor `limit` (limit počtu znaků), zobrazí se pod polem výsledku hned po vygenerování výsledku počítadlo znaků `generated / limit` (živě se aktualizuje při streamování a při překročení limitu jemně zčervená).
Dialog také hned po generování zobrazí upozornění `ai.limit_exceeded`, pokud by výstup AI limit překročil.
V tomto stavu jsou tlačítko **Vložit** a jeho nabídka alternativních režimů zakázány — rozšíření `CharacterCount` odmítne každé vložení, které by dokument zvětšilo nad limit, takže se výsledek aplikuje celý, nebo vůbec: vloží se celý, pokud se vejde, nebo se nevloží vůbec, pokud limit překračuje.
Zkraťte výsledek, aby se akce znovu povolila:

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

Pomocí `systemPrompt`, `temperature`, `chatCompletionOptions` nebo `createMessages(context)` přizpůsobíte požadavek chat-completions kompatibilní s OpenAI. `context` obsahuje `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` jsou text odstavce výběru kolem něj (každý nejvýše 500 znaků, bez výběru prázdné) — posílejte je spolu s výběrem, jinak model považuje úryvek za celý text a dokončí ho.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Typ:** `String`
- **Výchozí:** `undefined`

Alternativa k vlastnímu `aiProvider`: namiřte funkci AI na backendový endpoint LLM a tiptapify požadavek sestaví a odešle samo. Backend dostane minimální payload JSON:

- **Vždy:** `prompt` (požadavek zadaný v dialogu) a `instruction` (váš `systemPrompt`, systémová zpráva vlastního `createMessages` nebo vestavěná výchozí).
- **Volitelně, odesílá se jen při nastavení:** `stream` (jen `true`), `thinking` (přepínač **Přemýšlení** v dialogu, jen `true`), `reasoning_effort` (zvolená úroveň úsilí) a `model`.

Odpověď se přijímá shovívavě: obyčejný řetězec, objekt `{ content }` nebo payload `choices` kompatibilní s OpenAI. Když má požadavek `stream: true`, tělo odpovědi se čte jako stream SSE (řádky `data:` ukončené `data: [DONE]`): přijímají se delty ve stylu OpenAI (`choices[0].delta.content` / `.reasoning_content`), jednoduchý chunk `{ type: 'content' | 'reasoning', data }`, plochý chunk `{ content, reasoning_content }` i řádky `data` s prostým textem. Pokud backend `stream` ignoruje a odpoví obyčejným tělem, použije se toto tělo. Odpověď mimo rozsah OK zobrazí v dialogu chybovou zprávu backendu (JSON `{ error }` / `{ message }` nebo surové tělo). Tlačítko **Zastavit** a zavření dialogu rozpracovaný požadavek přeruší; částečně streamovaný obsah zůstane v poli výsledku.

Jsou-li nastaveny `aiProvider` i `aiEndpoint`, vyhrává `aiProvider`.

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
- **Výchozí:** `undefined`

Další hlavičky odesílané s požadavkem `aiEndpoint`, sloučené přes `Content-Type: application/json`. Hlavička `Authorization` nastavená zde se ponechá beze změny; jinak se token z `tokenProvider` (je-li nastaven) odešle jako `Authorization: Bearer <token>`.

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
- **Výchozí:** `'Inter'`

Výchozí písmo obsahu editoru.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Typ:** `String`
- **Výchozí:** `'px'`

Měrná jednotka pro hodnoty velikosti písma.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Typ:** `String`
- **Výchozí:** `'0'`

Poloměr rohů kontejneru editoru. Přijímá hodnoty poloměru Vuetify (`sm`, `md`, `lg`, `xl`, `pill` atd.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Typ:** `variantBtnTypes`
- **Výchozí:** `'tonal'`

Varianta tlačítek Vuetify pro tlačítka panelu nástrojů. Hodnota se sdílí se všemi komponentami panelu nástrojů přes konfiguraci editoru — vlastní komponenty ji mohou číst pomocí [`useTiptapifyConfig`](/cs/api/types#usetiptapifyconfig). Viz [`variantBtnTypes`](/cs/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Typ:** `variantFieldTypes`
- **Výchozí:** `'outlined'`

Varianta Vuetify pro pole rozbalovacích nabídek panelu nástrojů. Hodnota se sdílí se všemi komponentami panelu nástrojů přes konfiguraci editoru — vlastní komponenty ji mohou číst pomocí [`useTiptapifyConfig`](/cs/api/types#usetiptapifyconfig). Viz [`variantFieldTypes`](/cs/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Typ:** `Array<toolbarSections>`
- **Výchozí:** `[]`

Poskytněte vlastní sekce panelu nástrojů, které rozšíří nebo doplní jeho položky. Komponenty každé sekce mohou číst sdílenou konfiguraci editoru pomocí [`useTiptapifyConfig`](/cs/api/types#usetiptapifyconfig). Viz [Vlastní panel nástrojů](/cs/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Typ:** `Boolean`
- **Výchozí:** `true`

Zapne interaktivní použití stylů.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Typ:** `Boolean`
- **Výchozí:** `false`

Zobrazí neurčitý ukazatel průběhu, dokud se editor načítá.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Typ:** `String`
- **Výchozí:** `'default'`

Barva ukazatele průběhu načítání. Přijímá hodnoty barev motivu Vuetify.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Typ:** `String`
- **Výchozí:** `'1px'`

Výška ukazatele průběhu načítání.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Typ:** `Number`
- **Výchozí:** `0`

Od tohoto počtu obrázků za sebou (bez ničeho mezi nimi) je editor uspořádá do číslované mřížky o třech sloupcích, pro weby, které takové obrázky zobrazují jako slider. `0` to vypne.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Typ:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/cs/api/types#tiptapifyskininput))
- **Výchozí:** `'default'`

Vzhled okolí editoru: panelu nástrojů, bublinových nabídek, rozbalovacích nabídek, dialogů, zápatí.

- `default` — klasický vzhled: zvýšený panel nástrojů, skupiny tlačítek jako zvýšené boxy, tlačítka Vuetify s primárním stavem stisknutí.
- `pastel` — klidný vzhled: plochý tónovaný panel nástrojů pod tenkou linkou, průhledná tlačítka s neutrálním stavem stisknutí, lehké rozbalovací nabídky, měkké dialogy.

Funkce (popisky obrázků, slidery, rozbalovací nabídka zarovnání, styly seznamů) fungují v obou skinech stejně.

```vue
<Tiptapify skin="pastel" />
```

Můžete předat i inline objekt skinu: přepsání tokenů (`colors` / `metrics`) a příznaky tvaru, volitelně `extends` registrovaný skin. Vyhodnocuje se nad `default` (nebo svým základem), vykresluje se pod třídou `tiptapify-skin-inline` (`tiptapify-skin-{name}`, pokud objekt nese `name`) a jeho tokeny se zapisují jako CSS proměnné `--tf-*` na kořenový prvek editoru. Vlastní názvy vznikají pomocí `registerSkin('mint', { … })` — tabulku tokenů a návody najdete v [průvodci skiny](/cs/guide/skins).

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Typ:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/cs/api/types#tiptapifyuploadoptions))
- **Výchozí:** `null`

Endpoint [nahrávání](/cs/guide/uploads): soubory vybrané v dialozích obrázku a videa (a náhledový obrázek videa, obrázek karty odkazu) se na něj odesílají pomocí `POST {endpoint}` (multipart `file` a `kind`) a dokument si ponechá URL, kterou endpoint vrátí (`{ "url": … }`).

Bez něj dialog obrázku soubor přesto přijme: vybraný obrázek (a náhledový obrázek videa) se vloží do dokumentu jako data URL v base64 a obrázky v base64 se při načtení dokumentu zachovají. Dialog videa nabízí **Nahrát** jen s tímto prop. Při nastaveném `upload` se obrázky v base64 při načtení dokumentu odstraní.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Typ:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/cs/api/types#tiptapifycontentstyles))
- **Výchozí:** `'inline'`

Jak uložené HTML nese vzhled karet odkazů, obrázků s popiskem, videí, vložených prvků a seznamů úkolů (viz [Styly obsahu](/cs/guide/content-styles)): `inline` jej zapíše do jejich atributů `style`, takže web zobrazí HTML tak, jak je; `classes` ponechá jen třídy, pro web, který načítá `tiptapify/content.css`. Editor tyto styly při načítání HTML ignoruje, takže obě varianty HTML se načtou stejně.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Typ:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/cs/api/types#tiptapifylinkpreviewoptions))
- **Výchozí:** `null`

Endpoint na backendu pro [karty odkazů](/cs/guide/link-cards): čte data OpenGraph stránek, což prohlížeč nemůže (CORS). Editor ho při startu ověří handshakem (`GET {endpoint}` musí odpovědět `200 { "tiptapifyLinkPreview": 1 }`); dokud neodpoví, kartu nic nenabízí.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Události {#events}

### `editor-ready` {#editor-ready}

Vyvolá se, když je instance editoru připravena.

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

Vyvolá se při změně obsahu editoru.

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

Podporuje vazbu `v-model`.

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

Instance editoru a funkce `t` jsou dostupné přes provide/inject ve Vue:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
