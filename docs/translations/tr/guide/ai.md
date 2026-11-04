# AI Eklentisi {#ai-extension}

AI eklentisi, bir istek diyaloğu açan bir araç çubuğu düğmesi ekler; isteği seçtiğiniz bir sağlayıcıya gönderir, akıtılan sonucu gösterir ve moda özgü eylem düğmesiyle (**Ekle** / **Değiştir** / **Sona ekle**) düzenleyiciye ekler.

```vue
<Tiptapify
  :content="content"
  :items="['ai', '|', 'bold', 'italic']"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    stream: true,
  }"
/>
```

`ai` prop'u `true` (varsayılan değerli seçenekler) veya bir seçenek nesnesi (`TiptapifyAiOptions`) kabul eder. Araç çubuğundaki `ai` öğesi her zaman kaydedilir, ancak `aiProvider` ayarlanmadıkça düğme **devre dışıdır**.

Çalıştırılabilir bir demo için [AI örneğine](/tr/examples/ai), tam seçenek referansı için [Props](/tr/api/props#ai) sayfasına bakın.

## Mimari {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` `ai` prop'unu normalleştirir: `ai: true` boş bir seçenek nesnesine dönüşür, `promptExamples` yerelleştirilmiş varsayılanlara döner ve sonuç alt bileşenlere `inject('tiptapifyAi')` ile sunulur (`TiptapifyAiResolvedOptions` veya `false`).
- Araç çubuğu öğesi (`src/components/Toolbar/ai.ts`) `Button.vue` bileşenini işler. Düğme `aiProvider` kullanılabilirliğini denetler ve `Dialog.vue` bileşenini açar.
- `Dialog.vue` istek yaşam döngüsünün tamamına sahiptir: isteği oluşturma, sağlayıcıyı çağırma, akıtma ve sonucu ekleme.

## Sağlayıcı sözleşmesi {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

Sağlayıcı, sizin yazdığınız düz bir async fonksiyondur. tiptapify hiçbir API'yi kendisi çağırmaz — OpenAI uyumlu bir `request` nesnesini tüketebilen her şey çalışır (fetch, bir SDK, bir backend adaptörü). İstisna, tiptapify'ın isteği uç noktanıza gönderdiği `aiEndpoint` backend modudur ([Backend üretimi](#backend-generation-aiendpoint) bölümüne bakın).

**İstek** (`TiptapifyAiRequest`) `chatCompletionOptions` değerlerinizden yayılır, ardından eklenti tarafından zenginleştirilir:

| Alan | Kaynak |
| --- | --- |
| `messages` | sağlanmışsa `createMessages(context)`, aksi hâlde varsayılan çift: bir sistem mesajı (`systemPrompt` değeriniz veya yerleşik bir varsayılan) ve isteği, seçili düzenleyici metnini, çevresindeki metinle birlikte ve yalnızca seçime yanıt verme kuralını (hiçbir şey seçili değilse tüm metin için) içeren bir kullanıcı mesajı |
| `model` | ayarlıysa `model` seçeneği |
| `temperature` | ayarlıysa `temperature` seçeneği |
| `stream` | `stream` seçeneği veya `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | düşünme anahtarı / düzey açılır menüsü — aşağıya bakın |

**Bağlam** (`TiptapifyAiEditorContext`) sağlayıcıya düzenleyicinin tüm durumunu verir: `prompt`, `selectedText`, `textBefore` / `textAfter` (seçimin paragrafının çevresindeki metin, her biri en fazla 500 karakter), `text`, `html`, `json` ve `mode` (`insert` / `replace` / `append`).

Bir kelimenin içinde başlayan veya biten bir seçim kelimenin tamamını alır ve varsayılan mesajlar, seçimin çevresindeki metni yalnızca seçime yanıt verme kuralıyla birlikte gönderir: yalnızca bir parça verilirse model onu metnin tamamı sanıp tamamlar ve değiştirme, seçimi izleyen metni tekrar eder.

**Yanıt**: sağlayıcı içeriği düz bir `string` olarak, `{ content }` (`TiptapifyAiResponse`) olarak veya OpenAI uyumlu bir `choices` yükü (`TiptapifyAiOpenAiResponse`) olarak döndürebilir. Diyalog içeriği bu sırayla çıkarır ve baştaki boşlukları kırpar. Reddedilmede hata mesajı diyalogda gösterilir (hata bir `Error` örneği değilse `ai.error`) ve diyalog açık kalır.

## Backend üretimi (`aiEndpoint`) {#backend-generation-aiendpoint}

Bir `aiProvider` yazmak yerine AI özelliğini bir backend LLM uç noktasına yönlendirin:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

tiptapify bu durumda isteği kendisi oluşturur ve uç noktaya gönderir. İkisi de ayarlıysa açık bir `aiProvider` her zaman önceliklidir.

**İstek** — asgari bir JSON yükü (`TiptapifyAiBackendRequest`):

| Alan | Gönderilme |
| --- | --- |
| `prompt` | her zaman — diyalogda yazılan istek |
| `instruction` | her zaman — `systemPrompt` değeriniz, özel bir `createMessages` fonksiyonunun sistem mesajı veya yerleşik varsayılan |
| `stream` | yalnızca `stream: true` olduğunda |
| `thinking` | yalnızca diyalogdaki **Düşünme** anahtarı açıkken |
| `reasoning_effort` | yalnızca kullanıcı bir düzey seçtiğinde (`default` değil) |
| `model` | yalnızca `model` seçeneği ayarlıyken |

**Yanıt** — esnek biçimde kabul edilir: düz bir dize, bir `{ content }` nesnesi veya OpenAI uyumlu bir `choices` yükü.

**Akış** — istek `stream: true` içerdiğinde yanıt gövdesi bir SSE akışı olarak okunur (`data:` satırları, `data: [DONE]` ile sonlanır). Kabul edilen parça biçimleri:

- OpenAI tarzı — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Basit — `data: {"type":"content"|"reasoning","data":"…"}`
- Düz — `data: {"content":"…","reasoning_content":"…"}`
- Düz metin — `data: some text` (JSON olmayan bir `data` satırı bir içerik parçasıdır)

`content` parçaları `onChunk` aracılığıyla sonuç alanını günceller, `reasoning_content` parçaları ise `onReasoning` aracılığıyla **Düşünme** panelini besler. Backend `stream` değerini yok sayıp düz bir gövdeyle yanıt verirse bunun yerine o gövde kullanılır. **Durdur** tıklaması veya diyaloğu kapatmak isteği iptal eder; kısmen akıtılan içerik sonuç alanında kalır.

**Başlıklar** — `aiHeaders` (bir `Record<string, string>`), `Content-Type: application/json` üzerine birleştirilir. `aiHeaders` içindeki bir `Authorization` başlığı olduğu gibi korunur; aksi hâlde `tokenProvider` içindeki bir token `Authorization: Bearer <token>` olarak gönderilir.

**Hatalar** — OK olmayan bir yanıt, backend'in hata mesajını (JSON `{ error }` / `{ message }` veya ham gövde) diyalogda gösterir.

## Akış {#streaming}

`stream: true` olduğunda (veya `chatCompletionOptions.stream` değeri `true` ise) diyalog üçüncü argüman olarak bir `TiptapifyAiStream` nesnesi geçirir:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — `fetch` çağrısına (veya SDK çağrınıza) verin. Kullanıcı **Durdur**'a tıkladığında veya diyaloğu kapattığında iptal olur; böylece süren istekler çalışmaya devam etmez.
- **`onChunk`** — her içerik parçasını sonuç alanına ekleyin. Üretim sürerken sonuç alanı salt okunurdur ve kısmen akıtılan içerik korunur (Durdur'a basıp ardından ekleyebilir veya silebilirsiniz).
- **`onReasoning`** — modelin akıl yürütme/düşünme çıktısını (örneğin Qwen/DeepSeek/o serisinin `reasoning_content` delta'sı) sonucun üstündeki katlanabilir bir **Düşünme** paneline iletin. Panel akış sırasında otomatik açılır ve otomatik kayar. Akıl yürütme çıktısı yalnızca görüntülenir ve hiçbir zaman düzenleyiciye eklenmez.

Akış yapmayan sağlayıcılar `stream` argümanını yok sayar — isteğe bağlıdır.

## Düşünme ve düşünme düzeyi {#thinking-and-reasoning-effort}

Diyalogdaki iki kullanıcı denetimi istek alanlarına karşılık gelir. İkisi de seçeneklerle isteğe bağlı olarak açılır ve eklentiye aittir — bu alanları `chatCompletionOptions` içinde kendiniz ayarlamazsınız (ve ayarlamamalısınız).

- **`thinking: true`**, **Düşünme** anahtarını gösterir (varsayılan olarak açık, her diyalog açılışında sıfırlanır). Eklenti anahtar değerini isteğe `enable_thinking: true | false` olarak yazar.
- **`thinking` eksikse veya `thinking: false` ise** anahtar gizlenir ve eklenti `enable_thinking: false` gönderir; böylece varsayılan olarak düşünen modeller düşünmez.
- **`reasoningEffort: { options, default? }`**, **Düşünme düzeyi** açılır menüsünü gösterir. `options`, sunmak istediğiniz özel düzeyleri listeler (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); eklenti her zaman kendisi bir `default` öğesi ekler (düşünme modunun temel değeri), bu yüzden yapılandırmanızda `default` yazmazsınız. `default` alanı, diyalog açıldığında özel düzeylerinizden birini önceden seçer — belirtilmezse `default` önceden seçilir. Değer her açılışta sıfırlanır. Açılır menü yalnızca `options` boş olmayan bir liste olduğunda, `thinking` etkin olduğunda ve Düşünme anahtarı açık olduğunda işlenir.
- **`showReasoning`** (varsayılan `false`), modelin akıl yürütme sürecini (`reasoning_content` delta'sı) akıtan katlanabilir **Düşünme** panelini denetler. Düşünmeyi açık tutarken o paneli göstermek için `showReasoning: true` ayarlayın — model yine akıl yürütür, sonuç aynı şekilde uygulanır; yalnızca adım adım akıl yürütme ek olarak gösterilir.

Sağlayıcılar (özellikle vLLM/LM Studio) tek bir istekte `enable_thinking` ve `reasoning_effort` değerlerini birlikte reddettiği için eklenti bu ikisinden tam olarak birini gönderir:

| Durum | İstek alanı |
| --- | --- |
| Düşünme açık, düzey = `default` (veya yapılandırılmış düzey yok) | `enable_thinking` (anahtardan) |
| Düşünme açık, düzey = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (açılır menüden); anahtar devre dışıdır |
| Düşünme kapalı (anahtar kapalı veya yapılandırmada `thinking` etkin değil) | `enable_thinking: false`; `reasoning_effort` gönderilmez |

## Hatalar {#errors}

Diyalog, başarısız bir isteği ham hatayı göstermek yerine açıklar ve ardından hizmetin kendi mesajını ekler:

| Ne oldu | Açıklama |
| --- | --- |
| Tarayıcı yanıt alamadı (`Failed to fetch`, `NetworkError…`, `Load failed`) | Hizmet kapalı, erişilemiyor veya CORS yanıtı engelledi; hangisi olduğunu tarayıcı konsolu söyler |
| `401` / `403` | API anahtarını veya erişim haklarını kontrol edin |
| `404` | Uç nokta yolunu kontrol edin |
| `408` / `504` / bir zaman aşımı | Hizmet zamanında yanıt vermedi |
| `429` | Çok fazla istek |
| `5xx` | Hizmet kullanılamıyor (model yüklüyor, meşgul) |

`aiEndpoint` ile durum yanıttan gelir. Özel bir `aiProvider`, bir `status` içeren hata fırlatarak aynı açıklamaları alır:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Diğer tüm hatalar kendi mesajlarıyla gösterilir.

## Sonucu ekleme {#inserting-the-result}

Eylem düğmesinde — moda bağlı olarak **Ekle**, **Değiştir** veya **Sona ekle** — diyalog `result` değerini düzenleyiciye yerleştirir:

- **Mod** — diyalogun eylem düğmesi bölünmüş bir düğmedir. Ana kısım sonucu önceden seçili modda uygular (**Ekle** / **Değiştir** / **Sona ekle**): `mode` seçeneği onu önceden seçer; diyalog açıldığında metin seçiliyse **Değiştir**, değilse **Ekle** seçilir. Düğmenin sağındaki küçük bir "daha fazla" (⋮) bölümü kalan modlarla bir menü açar — birine tıklamak sonucu hemen o modda uygular. **Ekle** sonucu imlecin olduğu yere yerleştirir, **Değiştir** seçili metni (**Oluştur**'a tıklandığında yakalanan) değiştirir, **Sona ekle** ise belgenin sonuna ekler.
- **Karakter sınırı** — düzenleyici `limit` ile yapılandırıldığında (`CharacterCount` eklentisi, belgeyi sınırın ötesine büyütecek yapıştırma dışı her işlemi reddeder), sonuç alanının altında bir `generated / limit` karakter sayacı gösterilir (akış sırasında canlı, sınır aşılacaksa yumuşak kırmızı) ve sonuç sınırı aşacaksa diyalog üretimin hemen ardından `ai.limit_exceeded` uyarısını gösterir. **Ekle** düğmesi ve alternatif mod menüsü bu durumda devre dışı kalır: sonuç ya tamamen uygulanır ya hiç uygulanmaz, bu yüzden uygulamadan önce kısaltmanız gerekir.