# Props {#props}

## `<Tiptapify>` Props {#tiptapify-props}

### `content` {#content}

- **Tür:** `String | Object`
- **Varsayılan:** `''`

Düzenleyicinin başlangıç içeriği. HTML dizesi veya Tiptap JSON nesnesi kabul eder.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` yalnızca **başlangıç** içeriğidir; çift yönlü bağlama için `v-model` kullanın (bkz. `modelValue`).

### `modelValue` {#modelvalue}

- **Tür:** `String | Object`
- **Varsayılan:** `''`

`v-model` için çift yönlü bağlama değeri. Reaktif bir değeri düzenleyiciyle senkron tutmak için `v-model` kullanın. Her düzenlemede bileşen, en son HTML ile `update:modelValue` olayını yayımlar; `v-model` bunu ref'inize geri yazar. Yalnızca `v-model` kullanıldığında (`:content` yoksa) bağlı değer düzenleyicinin başlangıç içeriğidir.

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

- **Tür:** `String`
- **Varsayılan:** `''`

Düzenleyici boş olduğunda gösterilen yer tutucu metin.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Tür:** `Number`
- **Varsayılan:** `null`

Düzenleyici içerik alanının piksel cinsinden minimum yüksekliği.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Tür:** `Boolean`
- **Varsayılan:** `true`

Araç çubuğunu gösterir veya gizler.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Tür:** `Array<String> | Object`
- **Varsayılan:** `[]`

Gösterilecek araç çubuğu öğeleri. Öğe adlarından oluşan bir dizi veya adlandırılmış bölümlerden oluşan bir nesne verin. Bkz. [Araç Çubuğu Öğeleri](/tr/api/toolbar-items).
Bir dizide `'|'` öğeleri gruplara böler (düğmelerin hangi bölümlerden geldiğine bakılmaksızın, bu sırayla) ve `'~'` kendisinden sonraki öğeleri araç çubuğunun sonuna iter. Gruplarla, yerleşik bir öğe olmayan bir ad, `customExtensions` içindeki aynı adlı özel düğme için yer ayırır; böyle bir düğme yoksa o yer bırakılır.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Tür:** `Boolean`
- **Varsayılan:** `false`

`true` olduğunda `items` prop'u, dahil edilecek öğeleri değil **hariç tutulacak** öğeleri belirtir.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Tür:** `Boolean`
- **Varsayılan:** `true`

Metin seçildiğinde balon menüyü gösterir: gruplar halinde tek sıra ikon düğmesi — kalın, italik, altı çizili, üstü çizili | üst simge, alt simge | vurgu, satır içi kod | bağlantı | biçimlendirmeyi temizle. Her düğmenin kısayolunu gösteren bir ipucu vardır ve işareti seçimde açıkken belirgin görünür. Seçili bir blok (görsel, widget) için, kodun içinde ve tüm belge seçiliyken gizlenir.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Tür:** `Boolean`
- **Varsayılan:** `true`

Boş satırlarda kayan menüyü gösterir: balon menüyle aynı ikon düğme sırasında başlık 1, başlık 2 ve madde işaretli liste.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Tür:** `Boolean`
- **Varsayılan:** `true`

Slash komut menüsünü etkinleştirir (tetiklemek için `/` yazın).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Tür:** `Boolean`
- **Varsayılan:** `true`

Düzenleyici alt bilgisinde kelime sayısını gösterir.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Tür:** `Boolean`
- **Varsayılan:** `true`

Düzenleyici alt bilgisinde karakter sayısını gösterir.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Tür:** `Number | null`
- **Varsayılan:** `null`

Tiptap `CharacterCount` eklentisinin izin verdiği en fazla karakter sayısı. Sınırsız düzenlemeyi korumak için `null` ayarlayın veya prop'u atlayın. `0`'dan büyük bir değere ayarlandığında alt bilgi, renk kodlu eşiklere sahip dairesel bir SVG ilerleme göstergesi gösterir.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Tür:** `String`
- **Varsayılan:** `'purple'`

`limit` ayarlandığında alt bilgide gösterilen dairesel ilerleme göstergesinin varsayılan rengi.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Tür:** `String`
- **Varsayılan:** `'orange'`

Kullanım sınırın %75'ini aştığında ilerleme göstergesinin rengi.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Tür:** `String`
- **Varsayılan:** `'red'`

Karakter sınırına ulaşıldığında ilerleme göstergesinin rengi.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Tür:** `TiptapifyFooterAlignment`
- **Varsayılan:** `'end'`

Alt bilgi durum öğelerinin hizalaması. `'start'`, `'center'` veya `'end'` kabul eder.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Tür:** `Boolean | TiptapifyAiOptions`
- **Varsayılan:** `false`

`ai` araç çubuğu öğesini etkinleştirir. Düzenleyici OpenAI uyumlu bir `/v1/chat/completions` isteği oluşturur ve onu `aiProvider` fonksiyonuna iletir. Backend'inizi, BFF'nizi, OAuth korumalı uç noktanızı, LM Studio'yu veya bir SDK sarmalayıcısını çağırmak için sağlayıcı geri çağrısını kullanın.

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

Yerel LLM LM Studio örneği:

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

`stream: true` ayarlayıp token'ları `aiProvider` fonksiyonunun `stream` argümanı üzerinden iterek akış çıktısı desteklenir. AI diyalogundaki sonuç alanı parçalar geldikçe canlı güncellenir ve bir **Durdur** düğmesi süren isteği iptal eder:

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

`stream.signal` değerini `fetch` çağrısına (veya SDK çağrınıza) verin; böylece kullanıcı **Durdur**'a tıkladığında veya diyaloğu kapattığında istek iptal edilir. Kısmen akıtılan içerik sonuç alanında kalır ve uygulanabilir ya da silinebilir. Akış yapmayan sağlayıcılar `stream` argümanını tamamen yok sayabilir — isteğe bağlıdır ve geriye dönük uyumludur.

Akıl yürütme modelleri (Qwen thinking, DeepSeek, o serisi) "düşüncelerini" ayrı bir `reasoning_content` delta'sında akıtır. Bu parçaları `stream.onReasoning()` ile iletin — `showReasoning: true` olduğunda diyalog bunları sonuç alanının üstündeki katlanabilir bir **Düşünme** panelinde işler (panel varsayılan olarak gizlidir). Akıl yürütme çıktısı yalnızca görüntülenir ve hiçbir zaman düzenleyiciye eklenmez.

Kullanıcının modelin düşünme modunu istek başına değiştirebilmesi için AI seçeneklerinde `thinking: true` ayarlayın. Diyalog bu durumda bir **Düşünme** anahtarı gösterir (varsayılan olarak açık, her açılışta sıfırlanır); eklenti anahtar değerini isteğe `enable_thinking: true | false` olarak yazar, bu yüzden `enable_thinking` değerini `chatCompletionOptions` içinde artık kendiniz ayarlamanız gerekmez (ve ayarlamamalısınız):

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

`thinking` değeri `false` olduğunda veya belirtilmediğinde anahtar gösterilmez ve eklenti `enable_thinking: false` gönderir; böylece varsayılan olarak düşünen modeller (Qwen3, DeepSeek, …) düşünmez.

Kullanıcının düşünme düzeyini istek başına seçebilmesi için AI seçeneklerinde `reasoningEffort` ayarlayın. Diyalog bu durumda `options` ile doldurulan bir **Düşünme düzeyi** açılır menüsü gösterir — özel düzeyler (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Eklenti açılır menüye her zaman kendisi bir `default` öğesi ekler (düşünme modunun temel değeri), bu yüzden yapılandırmanızda `default` yazmazsınız; seçeneğin `default` alanı diyalog açıldığında özel düzeylerinizden birini önceden seçer (aksi hâlde `default` önceden seçilir) ve değer her açılışta sıfırlanır.
Seçilen değer, eklentinin isteğe ne yazacağını belirler: `default` düşünme modunu korur — **Düşünme** anahtarı etkin kalır ve `enable_thinking` değerini denetler; diğer her değer bunun yerine `reasoning_effort` olarak gönderilir ve o değer seçiliyken Düşünme anahtarı devre dışı kalır (sağlayıcılar `enable_thinking` ve `reasoning_effort` değerlerini tek bir istekte reddeder).
Açılır menü yalnızca `thinking` etkin ve Düşünme anahtarı açıkken gösterilir — düşünmeyi kapatmak onu gizler ve `reasoning_effort` gönderilmez (istek `enable_thinking: false` değerine döner). `options` eksik veya boşsa açılır menü hiç işlenmez:

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

**Düşünme** paneli varsayılan olarak gizlidir (`showReasoning` varsayılan olarak `false`). Düşünmeyi açık tutarken modelin akıl yürütme sürecini (`reasoning_content` delta'sı) akıtan katlanabilir bir paneli göstermek için `showReasoning: true` ayarlayın — model yine akıl yürütür ve sonuç aynı şekilde uygulanır; yalnızca adım adım akıl yürütme ek olarak gösterilir:

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

Özel istek örnekleri yerelleştirilmiş varsayılanların yerini alır:

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

`tokenProvider` ve `storage`, doğrudan tarayıcı entegrasyonları için tüketiciye ait isteğe bağlı kancalardır. Tarayıcı kodunda veya tarayıcı depolamasında bulunan API anahtarları veya sağlayıcı token'ları kullanıcılar tarafından görülebilir ve gizli bilgi sayılmamalıdır. Üretim sırları için yukarıdaki backend adaptör desenini tercih edin.

Diyalogun eylem düğmesinde ekleme modunu (**Ekle** / **Değiştir** / **Sona ekle**) önceden seçmek için `mode: 'insert' | 'replace' | 'append'` kullanın. `mode` olmadan düğme, diyalog açıldığında metin seçiliyse **Değiştir**'e, değilse **Ekle**'ye ayarlanır. Eylem düğmesi bölünmüş bir düğmedir: ana kısım sonucu önceden seçili modda uygular ve sağındaki küçük bir "daha fazla" (⋮) bölümü diğer modları listeleyen bir menü açar — birine tıklamak sonucu hemen o modda uygular.

Düzenleyicinin bir `limit` değeri (karakter sayısı sınırı) olduğunda, sonuç üretilir üretilmez sonuç alanının altında bir `generated / limit` karakter sayacı gösterilir (akış sırasında canlı güncellenir ve sınır aşılacaksa yumuşak kırmızıya döner).
AI çıktısı sınırı aşacaksa diyalog üretimin hemen ardından `ai.limit_exceeded` uyarısını da gösterir.
Bu durumda **Ekle** düğmesi ve alternatif mod menüsü devre dışı kalır — `CharacterCount` eklentisi belgeyi sınırın ötesine büyütecek her eklemeyi reddeder, bu yüzden sonuç ya tamamen uygulanır ya hiç uygulanmaz: sığıyorsa tamamen eklenir, sınırı aşıyorsa hiç eklenmez.
Eylemi yeniden etkinleştirmek için sonucu kısaltın:

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

OpenAI uyumlu chat-completions isteğini özelleştirmek için `systemPrompt`, `temperature`, `chatCompletionOptions` veya `createMessages(context)` kullanın. `context` şunları içerir: `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter`, seçimin paragrafının çevresindeki metindir (her biri en fazla 500 karakter, seçim yoksa boş) — bunları seçimle birlikte gönderin, aksi hâlde model parçayı metnin tamamı sanıp tamamlar.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Tür:** `String`
- **Varsayılan:** `undefined`

Özel bir `aiProvider` yerine: AI özelliğini bir backend LLM uç noktasına yönlendirin; tiptapify isteği kendisi oluşturur ve gönderir. Backend asgari bir JSON yükü alır:

- **Her zaman:** `prompt` (diyalogda yazılan istek) ve `instruction` (`systemPrompt` değeriniz, özel bir `createMessages` fonksiyonunun sistem mesajı veya yerleşik varsayılan).
- **İsteğe bağlı, yalnızca ayarlıysa gönderilir:** `stream` (yalnızca `true`), `thinking` (diyalogdaki **Düşünme** anahtarı, yalnızca `true`), `reasoning_effort` (seçilen düzey) ve `model`.

Yanıt esnek biçimde kabul edilir: düz bir dize, bir `{ content }` nesnesi veya OpenAI uyumlu bir `choices` yükü. İstek `stream: true` içerdiğinde yanıt gövdesi bir SSE akışı olarak okunur (`data:` satırları, `data: [DONE]` ile sonlanır): OpenAI tarzı delta'lar (`choices[0].delta.content` / `.reasoning_content`), basit bir `{ type: 'content' | 'reasoning', data }` parçası, düz bir `{ content, reasoning_content }` parçası ve düz metin `data` satırlarının hepsi kabul edilir. Backend `stream` değerini yok sayıp düz bir gövdeyle yanıt verirse bunun yerine o gövde kullanılır. OK olmayan bir yanıt, backend'in hata mesajını (JSON `{ error }` / `{ message }` veya ham gövde) diyalogda gösterir. Bir **Durdur** düğmesi ve diyaloğu kapatmak süren isteği iptal eder; kısmen akıtılan içerik sonuç alanında kalır.

Hem `aiProvider` hem `aiEndpoint` ayarlıysa `aiProvider` önceliklidir.

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

- **Tür:** `Record<string, string>`
- **Varsayılan:** `undefined`

`aiEndpoint` isteğiyle gönderilen ek başlıklar, `Content-Type: application/json` üzerine birleştirilir. Burada ayarlanan bir `Authorization` başlığı olduğu gibi korunur; aksi hâlde `tokenProvider` içindeki bir token (ayarlıysa) `Authorization: Bearer <token>` olarak gönderilir.

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

- **Tür:** `String`
- **Varsayılan:** `'Inter'`

Düzenleyici içeriği için varsayılan yazı tipi ailesi.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Tür:** `String`
- **Varsayılan:** `'px'`

Yazı tipi boyutu değerleri için ölçü birimi.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Tür:** `String`
- **Varsayılan:** `'0'`

Düzenleyici kapsayıcısının kenar yarıçapı. Vuetify yarıçap değerlerini kabul eder (`sm`, `md`, `lg`, `xl`, `pill` vb.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Tür:** `variantBtnTypes`
- **Varsayılan:** `'tonal'`

Araç çubuğu düğmeleri için Vuetify düğme varyantı. Değer, düzenleyici yapılandırması aracılığıyla her araç çubuğu bileşeniyle paylaşılır — özel bileşenler onu [`useTiptapifyConfig`](/tr/api/types#usetiptapifyconfig) ile okuyabilir. Bkz. [`variantBtnTypes`](/tr/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Tür:** `variantFieldTypes`
- **Varsayılan:** `'outlined'`

Araç çubuğu açılır alanları için Vuetify varyantı. Değer, düzenleyici yapılandırması aracılığıyla her araç çubuğu bileşeniyle paylaşılır — özel bileşenler onu [`useTiptapifyConfig`](/tr/api/types#usetiptapifyconfig) ile okuyabilir. Bkz. [`variantFieldTypes`](/tr/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Tür:** `Array<toolbarSections>`
- **Varsayılan:** `[]`

Araç çubuğu öğelerini genişletmek veya eklemek için özel araç çubuğu bölümleri sağlayın. Her bölümün bileşenleri paylaşılan düzenleyici yapılandırmasını [`useTiptapifyConfig`](/tr/api/types#usetiptapifyconfig) ile okuyabilir. Bkz. [Özel Araç Çubuğu](/tr/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Tür:** `Boolean`
- **Varsayılan:** `true`

Etkileşimli stil uygulamasını etkinleştirir.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Tür:** `Boolean`
- **Varsayılan:** `false`

Düzenleyici yüklenirken belirsiz bir ilerleme çubuğu gösterir.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Tür:** `String`
- **Varsayılan:** `'default'`

Yükleme ilerleme çubuğunun rengi. Vuetify tema rengi değerlerini kabul eder.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Tür:** `String`
- **Varsayılan:** `'1px'`

Yükleme ilerleme çubuğunun yüksekliği.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Tür:** `Number`
- **Varsayılan:** `0`

Arka arkaya (aralarında hiçbir şey olmadan) bu kadar görselden itibaren düzenleyici onları numaralı üç sütunlu bir ızgara olarak yerleştirir; bu tür görselleri slayt olarak gösteren siteler içindir. `0` bunu kapatır.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Tür:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/tr/api/types#tiptapifyskininput))
- **Varsayılan:** `'default'`

Düzenleyici arayüzünün görünümü: araç çubuğu, balon menüler, açılır menüler, diyaloglar, alt bilgi.

- `default` — klasik görünüm: yükseltilmiş bir araç çubuğu, yükseltilmiş kutular olarak düğme grupları, birincil renkli basılı durumu olan Vuetify düğmeleri.
- `pastel` — sakin görünüm: ince bir çizginin altında düz renk tonlu araç çubuğu, nötr basılı durumu olan hayalet düğmeler, hafif açılır menüler, yumuşak diyaloglar.

Özellikler (görsel açıklamaları, slayt gösterileri, hizalama açılır menüsü, liste stilleri) her iki temada da aynı çalışır.

```vue
<Tiptapify skin="pastel" />
```

Satır içi bir tema nesnesi de verebilirsiniz: token geçersiz kılmaları (`colors` / `metrics`) ve biçim bayrakları; isteğe bağlı olarak kayıtlı bir temayı `extends` eder. `default` (veya tabanı) üzerinden çözümlenir, `tiptapify-skin-inline` sınıfı altında (nesne bir `name` taşıyorsa `tiptapify-skin-{name}`) işlenir ve token'ları düzenleyici kökünde `--tf-*` CSS değişkenleri olarak yer alır. Özel adlar `registerSkin('mint', { … })` ile gelir — token tablosu ve tarifler için [Temalar kılavuzuna](/tr/guide/skins) bakın.

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Tür:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/tr/api/types#tiptapifyuploadoptions))
- **Varsayılan:** `null`

[Yüklemelerin](/tr/guide/uploads) uç noktası: görsel ve video diyaloglarında seçilen dosyalar (ve bir video kapağı, bir bağlantı kartının görseli) `POST {endpoint}` ile (multipart `file` ve `kind`) ona gönderilir ve belge, yanıt olarak aldığı URL'yi (`{ "url": … }`) tutar.

Bu olmadan da görsel diyaloğu dosya alır: seçilen bir görsel (ve bir video kapağı) belgeye base64 veri URL'si olarak gömülür ve belge yüklenirken base64 görseller korunur. Video diyaloğu **Yükle** seçeneğini yalnızca bu prop ile sunar. `upload` ayarlandığında belge yüklenirken base64 görseller kaldırılır.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Tür:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/tr/api/types#tiptapifycontentstyles))
- **Varsayılan:** `'inline'`

Kaydedilen HTML'in bağlantı kartlarının, açıklamalı görsellerin, videoların, gömülü içeriklerin ve görev listelerinin görünümünü nasıl taşıdığını belirler ([İçerik stilleri](/tr/guide/content-styles) bölümüne bakın): `inline` bunu öğelerin `style` özniteliklerine yazar, böylece site HTML'i olduğu gibi gösterir; `classes` yalnızca sınıfları bırakır ve `tiptapify/content.css` dosyasını yükleyen siteler içindir. Editör HTML yüklenirken bu stilleri yok sayar, bu yüzden iki tür HTML de aynı şekilde yüklenir.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Tür:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/tr/api/types#tiptapifylinkpreviewoptions))
- **Varsayılan:** `null`

[Bağlantı kartlarının](/tr/guide/link-cards) backend uç noktası: tarayıcının okuyamadığı (CORS) sayfaların OpenGraph verilerini okur. Düzenleyici başlarken onu bir el sıkışmayla denetler (`GET {endpoint}` `200 { "tiptapifyLinkPreview": 1 }` döndürmelidir); yanıt verene kadar hiçbir şey kart sunmaz.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Olaylar {#events}

### `editor-ready` {#editor-ready}

Düzenleyici örneği hazır olduğunda tetiklenir.

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

Düzenleyici içeriği değiştiğinde tetiklenir.

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

`v-model` bağlamayı destekler.

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

Düzenleyici örneği ve `t` fonksiyonu Vue'nun provide/inject mekanizmasıyla kullanılabilir:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
