# Typy {#types}

## TiptapifyEditor {#tiptapifyeditor}

Rozšířená třída Tiptap Editor s dalšími vlastnostmi.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Definuje platné hodnoty prop `variantBtn` na `<Tiptapify>`. Hodnota se použije na každé tlačítko panelu nástrojů prostřednictvím sdílené konfigurace editoru (viz [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Definuje platné hodnoty prop `variantField` na `<Tiptapify>`. Hodnota se použije na pole rozbalovacích nabídek panelu nástrojů prostřednictvím sdílené konfigurace editoru (viz [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Definuje platné hodnoty prop `footerAlignment` komponenty `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Definuje vestavěné názvy pro prop `skin` komponenty `<Tiptapify>`: vzhled okolí editoru.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — klasický vzhled: zvýšený panel nástrojů, skupiny tlačítek jako zvýšené boxy, tlačítka Vuetify s primárním stavem stisknutí.
- `pastel` — klidný vzhled: plochý tónovaný panel nástrojů, průhledná tlačítka, lehké rozbalovací nabídky, měkké dialogy.

Vlastní skiny přidávají názvy: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` je pomocná identitní funkce pro typované konstantní definice. Obě se exportují z `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Strukturální varianty, které token nevyjádří (markup komponent, vazby props Vuetify). Tvar určuje, které sady pravidel skinu se použijí; tokeny je vybarvují.

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

Každý skin se vyhodnocuje nad klasickým tvarem. Výsledný tvar je zpřístupněn jako `shape: ComputedRef<ResolvedShape>` v [`TiptapifyConfig`](#tiptapifyconfig), takže ho mohou následovat i vlastní komponenty panelu nástrojů.

## TiptapifySkinColors {#tiptapifyskincolors}

Katalog barevných tokenů skinu: panel nástrojů, skupiny, tlačítka, bublinové nabídky, rozbalovací nabídky, dialogy, rámeček, obrázky a úchyt pro změnu velikosti. Každý klíč v camelCase odpovídá CSS proměnné `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). Úplná tabulka je v [průvodci skiny](/cs/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Katalog metrických tokenů skinu: mezery, velikosti a poloměry pro stejné oblasti, se stejným mapováním klíč → `--tf-*`. Úplná tabulka je v [průvodci skiny](/cs/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Úplný typ prop `skin`: název registrovaného skinu (řetězec) nebo inline objekt skinu.

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

Inline objekt se vyhodnocuje stejným řetězcem jako registrovaný skin (classic → `extends` → vlastní), nikdy se nedostane do globálního registru a vykresluje se pod třídou `tiptapify-skin-inline`, pokud nenese `name`. Jeho tokeny se vypisují jako CSS proměnné `--tf-*` na kořenovém prvku editoru.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Typ vlastnosti `contentStyles` (viz [Styly obsahu](/cs/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Typ prop `upload`: endpoint [nahrávání](/cs/guide/uploads).

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

Typ prop `linkPreview` a dat, kterými odpovídá jeho endpoint (viz [Karty odkazů](/cs/guide/link-cards)).

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

Konfigurace UI na úrovni editoru sdílená se všemi komponentami uvnitř `<Tiptapify>` přes Vue `provide`/`inject`. Ve vlastních komponentách panelu nástrojů ji čtěte pomocí [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Hodnoty jsou reaktivní: změna prop `variantBtn` / `variantField` / `skin` na `<Tiptapify>` aktualizuje každou komponentu panelu nástrojů bez nového vykreslování props.

## useTiptapifyConfig {#usetiptapifyconfig}

Vrací sdílenou konfiguraci instance `<Tiptapify>`, do které volající komponenta patří. Určeno pro vlastní komponenty panelu nástrojů (viz [Vlastní panel nástrojů](/cs/examples/custom-toolbar#custom-toolbar-components)).

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

Mimo instanci `<Tiptapify>` se composable vrací k výchozím hodnotám balíčku: `variantBtn` `flat`, `variantField` `solo` a skin `default` (klasický tvar, žádné vypisované tokeny).

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

## Typy AI {#ai-types}

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

Definuje platné hodnoty prop `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Formát pole** — plochý seznam názvů položek:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Formát objektu** — pojmenované sekce:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Vysílá se událostí `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Vysílá se událostí `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Možnosti předávané při instalaci pluginu.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Re-exporty {#re-exports}

Následující utility se pro pohodlí při tvorbě vlastních rozšíření re-exportují z `@tiptap/core`:

| Export            | Druh     | Zdroj           |
|-------------------|----------|-----------------|
| `Node`            | Třída    | `@tiptap/core`  |
| `Mark`            | Třída    | `@tiptap/core`  |
| `mergeAttributes` | Funkce   | `@tiptap/core`  |
| `markInputRule`   | Funkce   | `@tiptap/core`  |
| `markPasteRule`   | Funkce   | `@tiptap/core`  |
| `CommandProps`    | Typ      | `@tiptap/core`  |
| `InputRuleMatch`  | Typ      | `@tiptap/core`  |
| `PasteRuleMatch`  | Typ      | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Ikony Material Design Icons z `@mdi/js` se re-exportují pro přizpůsobení ikon panelu nástrojů.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable pro čtení konfigurace UI na úrovni editoru (`variantBtn`, `variantField`) z vlastních komponent panelu nástrojů. Viz [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Základní třída Editor z `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Komponenty editoru a dialogu jsou k dispozici jako pojmenované exporty pro přímé použití.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
