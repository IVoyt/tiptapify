# Tipi {#types}

## TiptapifyEditor {#tiptapifyeditor}

Paplašināta Tiptap Editor klase ar papildu īpašībām.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Definē derīgās vērtības rekvizītam `variantBtn` komponentē `<Tiptapify>`. Vērtība tiek piemērota katrai rīkjoslas pogai, izmantojot redaktora koplietoto konfigurāciju (skatiet [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Definē derīgās vērtības rekvizītam `variantField` komponentē `<Tiptapify>`. Vērtība tiek piemērota rīkjoslas nolaižamajiem laukiem, izmantojot redaktora koplietoto konfigurāciju (skatiet [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Definē derīgās vērtības rekvizītam `footerAlignment` komponentē `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Definē iebūvētos nosaukumus rekvizītam `skin` komponentē `<Tiptapify>`: redaktora apvalka izskatu.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — klasiskais izskats: paaugstināta rīkjosla, pogu grupas kā paaugstinātas kastes, Vuetify pogas ar primāru nospiestu stāvokli.
- `pastel` — mierīgais izskats: plakana tonēta rīkjosla, caurspīdīgas pogas, vieglas nolaižamās izvēlnes, mīksti dialogi.

Pielāgoti apvalki pievieno nosaukumus: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` ir identitātes palīgfunkcija tipizētām konstantu definīcijām. Abas tiek eksportētas no `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Strukturālie varianti, ko tokens nevar izteikt (komponentu iezīmējums, Vuetify rekvizītu saistījumi). Forma nosaka, kuri apvalka noteikumu kopumi tiek piemēroti; tokeni tos krāso.

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

Katrs apvalks tiek atrisināts virs klasiskās formas. Atrisinātā forma ir pieejama kā `shape: ComputedRef<ResolvedShape>` objektā [`TiptapifyConfig`](#tiptapifyconfig), tāpēc pielāgoti rīkjoslas komponenti tai var sekot.

## TiptapifySkinColors {#tiptapifyskincolors}

Apvalka krāsu tokenu katalogs: rīkjosla, grupas, pogas, burbuļa izvēlnes, nolaižamās izvēlnes, dialoglodziņi, ietvars, attēli un izmēra maiņas turis. Katra camelCase atslēga atbilst CSS mainīgajam `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). Pilnā tabula ir [apvalku ceļvedī](/lv/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Apvalka metrikas tokenu katalogs: atstarpes, izmēri un rādiusi tām pašām jomām ar to pašu atslēgu → `--tf-*` atbilstību. Pilnā tabula ir [apvalku ceļvedī](/lv/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Pilns rekvizīta `skin` tips: reģistrēta apvalka nosaukums (virkne) vai iekļauts apvalka objekts.

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

Iekļauts objekts tiek atrisināts pa to pašu ķēdi kā reģistrēts apvalks (classic → `extends` → savs), nekad nenonāk globālajā reģistrā un tiek renderēts ar klasi `tiptapify-skin-inline`, ja vien tam nav `name`. Tā tokeni tiek izvadīti kā CSS mainīgie `--tf-*` redaktora saknē.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Rekvizīta `contentStyles` tips (skat. [Satura stili](/lv/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Rekvizīta `upload` tips: [augšupielādes](/lv/guide/uploads) galapunkts.

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

Rekvizīta `linkPreview` tips un datu, ar ko atbild tā galapunkts, tips (skatiet [Saites kartītes](/lv/guide/link-cards)).

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

Redaktora līmeņa UI konfigurācija, kas ar Vue `provide`/`inject` tiek koplietota ar katru komponenti `<Tiptapify>` iekšpusē. Nolasiet to savos rīkjoslas komponentos ar [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Vērtības ir reaktīvas: mainot rekvizītu `variantBtn` / `variantField` / `skin` komponentē `<Tiptapify>`, tiek atjaunināts katrs rīkjoslas komponents bez rekvizītu pārrenderēšanas.

## useTiptapifyConfig {#usetiptapifyconfig}

Atgriež tā `<Tiptapify>` eksemplāra koplietoto konfigurāciju, kuram pieder izsaucošais komponents. Paredzēts pielāgotiem rīkjoslas komponentiem (skatiet [Pielāgota rīkjosla](/lv/examples/custom-toolbar#custom-toolbar-components)).

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

Ārpus `<Tiptapify>` eksemplāra komponējamā funkcija atgriežas pie pakotnes noklusējumiem: `variantBtn` `flat`, `variantField` `solo` un apvalks `default` (klasiskā forma, bez izvadītiem tokeniem).

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

## AI tipi {#ai-types}

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

Definē derīgās vērtības rekvizītam `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Masīva formāts** — plakans elementu nosaukumu saraksts:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Objekta formāts** — nosauktas sadaļas:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Tiek izsūtīts ar notikumu `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Tiek izsūtīts ar notikumu `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Opcijas, kas tiek nodotas, instalējot spraudni.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Atkārtotie eksporti {#re-exports}

Šīs utilītas ērtības labad tiek atkārtoti eksportētas no `@tiptap/core`, veidojot pielāgotus paplašinājumus:

| Eksports          | Veids    | Avots           |
|-------------------|----------|-----------------|
| `Node`            | Klase    | `@tiptap/core`  |
| `Mark`            | Klase    | `@tiptap/core`  |
| `mergeAttributes` | Funkcija | `@tiptap/core`  |
| `markInputRule`   | Funkcija | `@tiptap/core`  |
| `markPasteRule`   | Funkcija | `@tiptap/core`  |
| `CommandProps`    | Tips     | `@tiptap/core`  |
| `InputRuleMatch`  | Tips     | `@tiptap/core`  |
| `PasteRuleMatch`  | Tips     | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Material Design Icons no `@mdi/js` tiek atkārtoti eksportētas rīkjoslas ikonu pielāgošanai.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Komponējamā funkcija redaktora līmeņa UI konfigurācijas (`variantBtn`, `variantField`) nolasīšanai no pielāgotiem rīkjoslas komponentiem. Skatiet [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Pamatā esošā `@tiptap/vue-3` Editor klase.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Redaktora un dialoglodziņa komponenti ir pieejami kā nosaukti eksporti tiešai lietošanai.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
