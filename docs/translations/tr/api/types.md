# Tipler {#types}

## TiptapifyEditor {#tiptapifyeditor}

Ek özellikleri olan genişletilmiş Tiptap Editor sınıfı.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

`<Tiptapify>` üzerindeki `variantBtn` prop'u için geçerli değerleri tanımlar. Değer, düzenleyicinin paylaşılan yapılandırması aracılığıyla her araç çubuğu düğmesine uygulanır ([`useTiptapifyConfig`](#usetiptapifyconfig) bölümüne bakın).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

`<Tiptapify>` üzerindeki `variantField` prop'u için geçerli değerleri tanımlar. Değer, düzenleyicinin paylaşılan yapılandırması aracılığıyla araç çubuğu açılır alanlarına uygulanır ([`useTiptapifyConfig`](#usetiptapifyconfig) bölümüne bakın).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

`<Tiptapify>` bileşenindeki `footerAlignment` prop'u için geçerli değerleri tanımlar.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

`<Tiptapify>` bileşenindeki `skin` prop'unun yerleşik adlarını tanımlar: düzenleyici arayüzünün görünümü.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — klasik görünüm: yükseltilmiş bir araç çubuğu, yükseltilmiş kutular olarak düğme grupları, birincil renkli basılı durumu olan Vuetify düğmeleri.
- `pastel` — sakin görünüm: düz renk tonlu araç çubuğu, hayalet düğmeler, hafif açılır menüler, yumuşak diyaloglar.

Özel temalar ad ekler: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin`, tiplenmiş sabit tanımlar için bir özdeşlik yardımcısıdır. İkisi de `tiptapify` paketinden dışa aktarılır.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Bir token'ın ifade edemediği yapısal varyantlar (bileşen işaretlemesi, Vuetify prop bağlamaları). Biçim hangi tema kural kümelerinin uygulanacağını belirler; token'lar onları boyar.

```typescript
type TiptapifyShape = {
  toolbar?: 'raised' | 'flat'   // elevated bar vs flat tinted bar
  groups?: 'box' | 'flat'       // toolbar sections as raised boxes vs plain runs
  buttons?: 'vuetify' | 'quiet' // native Vuetify buttons vs ghost buttons
  bubble?: 'card' | 'flat'      // kept for compatibility: the bubble menus are one row in both
  dialog?: 'classic' | 'soft'   // classic dialog chrome vs soft card
  menu?: 'vuetify' | 'soft'     // dropdown menus: Vuetify list vs padded card
}

// The shape after resolution: every key set (missing keys fall back to classic)
type ResolvedShape = Required<TiptapifyShape>
```

Her tema klasik biçim üzerinden çözümlenir. Çözümlenen biçim, [`TiptapifyConfig`](#tiptapifyconfig) üzerinde `shape: ComputedRef<ResolvedShape>` olarak sunulur; böylece özel araç çubuğu bileşenleri onu izleyebilir.

## TiptapifySkinColors {#tiptapifyskincolors}

Tema renk token'larının kataloğu: araç çubuğu, gruplar, düğmeler, balon menüler, açılır menüler, diyaloglar, çerçeve, görseller ve yeniden boyutlandırma tutamacı. Her camelCase anahtar bir `--tf-*` CSS değişkenine karşılık gelir (`toolbarBg` → `--tf-toolbar-bg`). Tablonun tamamı [Temalar kılavuzunda](/tr/guide/skins) yer alır.

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Tema ölçü token'larının kataloğu: aynı alanlar için boşluklar, boyutlar ve yarıçaplar; aynı anahtar → `--tf-*` eşlemesiyle. Tablonun tamamı [Temalar kılavuzunda](/tr/guide/skins) yer alır.

## TiptapifySkinInput {#tiptapifyskininput}

`skin` prop'unun tam tipi: kayıtlı bir tema adı (dize) veya satır içi bir tema nesnesi.

```typescript
type TiptapifySkinInput = string | TiptapifySkinConfig

type TiptapifySkinConfig = TiptapifyShape & {
  name?: string
  // registered skin name to inherit from; implicit 'default'
  extends?: string
  colors?: Partial<TiptapifySkinColors>
  metrics?: Partial<TiptapifySkinMetrics>
}
```

Satır içi bir nesne, kayıtlı bir tema gibi aynı zincirden çözümlenir (klasik → `extends` → kendisi), genel kayıt defterine hiç girmez ve bir `name` taşımadıkça `tiptapify-skin-inline` sınıfı altında işlenir. Token'ları düzenleyici kökünde `--tf-*` CSS değişkenleri olarak yayımlanır.

## TiptapifyContentStyles {#tiptapifycontentstyles}

`contentStyles` prop'unun türü ([İçerik stilleri](/tr/guide/content-styles) bölümüne bakın).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

`upload` prop'unun tipi: [yüklemelerin](/tr/guide/uploads) uç noktası.

```typescript
type TiptapifyUploadOptions = {
  // POST {endpoint}: multipart `file` and `kind`, answered by { url } (or an error status with { error })
  endpoint: string
  // extra request headers, e.g. authorization
  headers?: Record<string, string>
}

// The `kind` field of an upload
type TiptapifyUploadKind = 'image' | 'video'
```

## TiptapifyLinkPreviewOptions {#tiptapifylinkpreviewoptions}

`linkPreview` prop'unun ve uç noktasının yanıtladığı verilerin tipi ([Bağlantı kartları](/tr/guide/link-cards) bölümüne bakın).

```typescript
type TiptapifyLinkPreviewOptions = {
  // GET {endpoint} answers the handshake, GET {endpoint}?url=<page> the data of the page
  endpoint: string
  headers?: Record<string, string>
}

type TiptapifyLinkPreviewData = {
  url: string
  title?: string
  description?: string
  image?: string
  siteName?: string
}
```

## TiptapifyConfig {#tiptapifyconfig}

Vue `provide`/`inject` aracılığıyla `<Tiptapify>` içindeki her bileşenle paylaşılan, düzenleyici düzeyinde UI yapılandırması. Kendi araç çubuğu bileşenlerinizde [`useTiptapifyConfig`](#usetiptapifyconfig) ile okuyun.

```typescript
import type { ComputedRef, Ref } from 'vue'

interface TiptapifyConfig {
  variantBtn: Ref<variantBtnTypes>
  variantField: Ref<variantFieldTypes>
  // the raw `skin` prop: a registered name (string) or an inline skin object
  skin: Ref<TiptapifySkinInput>
  // the resolved skin name ('inline' for an inline object without a name)
  skinName: ComputedRef<string>
  // css variable name -> value; only overrides, the css fallbacks carry the base
  tokens: ComputedRef<Record<string, string>>
  // the resolved shape — every key set, see [ResolvedShape](#tiptapifyshape)
  shape: ComputedRef<ResolvedShape>
}
```

Değerler reaktiftir: `<Tiptapify>` üzerindeki `variantBtn` / `variantField` / `skin` prop'unu değiştirmek, prop'ları yeniden işlemeden her araç çubuğu bileşenini günceller.

## useTiptapifyConfig {#usetiptapifyconfig}

Çağıran bileşenin ait olduğu `<Tiptapify>` örneğinin paylaşılan yapılandırmasını döndürür. Özel araç çubuğu bileşenleri için tasarlanmıştır ([Özel Araç Çubuğu](/tr/examples/custom-toolbar#custom-toolbar-components) bölümüne bakın).

```typescript
function useTiptapifyConfig(): TiptapifyConfig
```

```vue
<script setup lang="ts">
import { useTiptapifyConfig } from 'tiptapify'

const { variantBtn, variantField, skin } = useTiptapifyConfig()
</script>

<template>
  <VBtn :variant="variantBtn" size="32" />
</template>
```

Bir `<Tiptapify>` örneğinin dışında composable paket varsayılanlarına döner: `variantBtn` için `flat`, `variantField` için `solo` ve `default` teması (klasik biçim, yayımlanan token yok).

```typescript
enum ToolbarSectionsEnum {
  actions = 'actions',
  ai = 'ai',
  alignment = 'alignment',
  extra = 'extra',
  formatExtra = 'formatExtra',
  format = 'format',
  list = 'list',
  media = 'media',
  misc = 'misc',
  style = 'style',
}
```

## AI Tipleri {#ai-types}

```typescript
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>

interface TiptapifyAiStream {
  signal: AbortSignal
  onChunk: (chunk: string) => void
  onReasoning: (chunk: string) => void
}

type TiptapifyAiChatRole = 'system' | 'user' | 'assistant' | 'developer' | 'tool'

interface TiptapifyAiChatMessage {
  role: TiptapifyAiChatRole
  content: string
}

interface TiptapifyAiRequest {
  model?: string
  messages: TiptapifyAiChatMessage[]
  temperature?: number
  stream?: boolean
  [key: string]: unknown
}

type TiptapifyAiReasoningEffort = 'low' | 'medium' | 'high'

interface TiptapifyAiReasoningEffortOptions {
  options: TiptapifyAiReasoningEffort[]
  default?: TiptapifyAiReasoningEffort
}

interface TiptapifyAiEditorContext {
  prompt: string
  selectedText: string  // whole words: a selection cut inside a word takes the word
  textBefore: string    // the selection's paragraph before it, up to 500 characters ('' without a selection)
  textAfter: string     // the selection's paragraph after it, up to 500 characters
  text: string
  html: string
  json: object
  mode: 'insert' | 'replace' | 'append'
}

interface TiptapifyAiResponse {
  content: string
}

interface TiptapifyAiOpenAiResponse {
  choices?: Array<{
    message?: {
      content?: string
    }
    text?: string
  }>
}

interface TiptapifyAiBackendRequest {
  prompt: string
  instruction: string
  stream?: boolean
  thinking?: boolean
  reasoning_effort?: TiptapifyAiReasoningEffort
  model?: string
}

interface TiptapifyAiBackendProviderOptions {
  endpoint: string
  headers?: Record<string, string>
  tokenProvider?: TiptapifyAiTokenProvider
}

function createAiBackendProvider(options: TiptapifyAiBackendProviderOptions): TiptapifyAiProvider

interface TiptapifyAiPromptExample {
  title: string
  prompt: string
}

interface TiptapifyAiOptions {
  aiProvider?: TiptapifyAiProvider
  aiEndpoint?: string
  aiHeaders?: Record<string, string>
  model?: string
  promptExamples?: TiptapifyAiPromptExample[]
  mode?: 'insert' | 'replace' | 'append'
  defaultPrompt?: string
  systemPrompt?: string
  temperature?: number
  stream?: boolean
  thinking?: boolean
  reasoningEffort?: TiptapifyAiReasoningEffortOptions
  showReasoning?: boolean
  chatCompletionOptions?: Record<string, unknown>
  createMessages?: (context: TiptapifyAiEditorContext) => TiptapifyAiChatMessage[]
  tokenProvider?: () => Promise<string | null> | string | null
  storage?: {
    getItem: (key: string) => string | null | Promise<string | null>
    setItem: (key: string, value: string) => void | Promise<void>
    removeItem: (key: string) => void | Promise<void>
  }
}
```

## sectionComponent {#sectioncomponent}

```typescript
interface sectionComponent {
  name: string
  component: any
  props?: { [key: string]: any }
}
```

## section {#section}

```typescript
interface section {
  section: string
  group: boolean
  components: sectionComponent[]
  extensions?: Array<any>
}
```

## toolbarSections {#toolbarsections}

```typescript
type toolbarSections = Array<section>
```

## itemsPropType {#itemsproptype}

`items` prop'u için geçerli değerleri tanımlar.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Dizi biçimi** — öğe adlarının düz listesi:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Nesne biçimi** — adlandırılmış bölümler:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

`editor-ready` olayıyla yayımlanır.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

`content-changed` olayıyla yayımlanır.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Eklenti kurulurken verilen seçenekler.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Yeniden dışa aktarımlar {#re-exports}

Aşağıdaki yardımcılar, özel eklentiler oluştururken kolaylık olsun diye `@tiptap/core` paketinden yeniden dışa aktarılır:

| Dışa aktarım      | Tür      | Kaynak          |
|-------------------|----------|-----------------|
| `Node`            | Sınıf    | `@tiptap/core`  |
| `Mark`            | Sınıf    | `@tiptap/core`  |
| `mergeAttributes` | Fonksiyon | `@tiptap/core` |
| `markInputRule`   | Fonksiyon | `@tiptap/core` |
| `markPasteRule`   | Fonksiyon | `@tiptap/core` |
| `CommandProps`    | Tip      | `@tiptap/core`  |
| `InputRuleMatch`  | Tip      | `@tiptap/core`  |
| `PasteRuleMatch`  | Tip      | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

`@mdi/js` paketindeki Material Design Icons, araç çubuğu ikonlarını özelleştirmek için yeniden dışa aktarılır.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Özel araç çubuğu bileşenlerinden düzenleyici düzeyindeki UI yapılandırmasını (`variantBtn`, `variantField`) okumak için composable. Bkz. [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Altta yatan `@tiptap/vue-3` Editor sınıfı.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Düzenleyici ve diyalog bileşenleri, doğrudan kullanım için adlandırılmış dışa aktarımlar olarak mevcuttur.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
