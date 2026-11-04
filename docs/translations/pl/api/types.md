# Typy {#types}

## TiptapifyEditor {#tiptapifyeditor}

Rozszerzona klasa edytora Tiptap z dodatkowymi właściwościami.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Definiuje prawidłowe wartości właściwości `variantBtn` w `<Tiptapify>`. Wartość jest stosowana do każdego przycisku paska narzędzi przez wspólną konfigurację edytora (zobacz [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Definiuje prawidłowe wartości właściwości `variantField` w `<Tiptapify>`. Wartość jest stosowana do pól rozwijanych paska narzędzi przez wspólną konfigurację edytora (zobacz [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Definiuje prawidłowe wartości właściwości `footerAlignment` komponentu `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Definiuje wbudowane nazwy właściwości `skin` komponentu `<Tiptapify>`: wygląd elementów interfejsu edytora.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — klasyczny wygląd: wypukły pasek narzędzi, grupy przycisków jako wypukłe pola, przyciski Vuetify z głównym kolorem w stanie wciśniętym.
- `pastel` — stonowany wygląd: płaski, zabarwiony pasek narzędzi, przyciski typu ghost, jasne listy rozwijane, miękkie okna dialogowe.

Własne skórki dodają nazwy: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` to pomocnik tożsamościowy do typowanych definicji const. Oba są eksportowane z `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Warianty strukturalne, których token nie potrafi wyrazić (znaczniki komponentów, powiązania właściwości Vuetify). Kształt decyduje, które zestawy reguł skórki mają zastosowanie; tokeny je malują.

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

Każda skórka jest rozwiązywana na bazie klasycznego kształtu. Rozwiązany kształt jest udostępniany jako `shape: ComputedRef<ResolvedShape>` w [`TiptapifyConfig`](#tiptapifyconfig), więc własne komponenty paska narzędzi mogą go śledzić.

## TiptapifySkinColors {#tiptapifyskincolors}

Katalog tokenów kolorów skórki: pasek narzędzi, grupy, przyciski, menu dymków, listy rozwijane, okna dialogowe, ramka, obrazy i uchwyt zmiany rozmiaru. Każdy klucz camelCase odpowiada zmiennej CSS `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). Pełna tabela znajduje się w [przewodniku po skórkach](/pl/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Katalog tokenów metryk skórki: odstępy, rozmiary i promienie dla tych samych obszarów, z takim samym odwzorowaniem klucz → `--tf-*`. Pełna tabela znajduje się w [przewodniku po skórkach](/pl/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Pełny typ właściwości `skin`: nazwa zarejestrowanej skórki (string) lub obiekt skórki inline.

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

Obiekt inline jest rozwiązywany tym samym łańcuchem co zarejestrowana skórka (classic → `extends` → własne), nigdy nie trafia do globalnego rejestru i jest renderowany z klasą `tiptapify-skin-inline`, chyba że ma `name`. Jego tokeny są emitowane jako zmienne CSS `--tf-*` w korzeniu edytora.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Typ właściwości `contentStyles` (zobacz [Style treści](/pl/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Typ właściwości `upload`: endpoint [przesyłania plików](/pl/guide/uploads).

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

Typ właściwości `linkPreview` oraz danych, którymi odpowiada jej endpoint (zobacz [Karty linków](/pl/guide/link-cards)).

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

Konfiguracja interfejsu na poziomie edytora, współdzielona z każdym komponentem wewnątrz `<Tiptapify>` przez Vue `provide`/`inject`. Odczytasz ją we własnych komponentach paska narzędzi za pomocą [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Wartości są reaktywne: zmiana właściwości `variantBtn` / `variantField` / `skin` w `<Tiptapify>` aktualizuje każdy komponent paska narzędzi bez ponownego renderowania właściwości.

## useTiptapifyConfig {#usetiptapifyconfig}

Zwraca wspólną konfigurację instancji `<Tiptapify>`, do której należy wywołujący komponent. Przeznaczone dla własnych komponentów paska narzędzi (zobacz [Własny pasek narzędzi](/pl/examples/custom-toolbar#custom-toolbar-components)).

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

Poza instancją `<Tiptapify>` composable wraca do domyślnych wartości pakietu: `variantBtn` `flat`, `variantField` `solo` oraz skórka `default` (klasyczny kształt, bez emitowanych tokenów).

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

Definiuje prawidłowe wartości właściwości `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Format tablicy** — płaska lista nazw elementów:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Format obiektu** — nazwane sekcje:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Emitowany przez zdarzenie `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Emitowany przez zdarzenie `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Opcje przekazywane podczas instalacji wtyczki.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Reeksporty {#re-exports}

Poniższe narzędzia są dla wygody reeksportowane z `@tiptap/core` na potrzeby tworzenia własnych rozszerzeń:

| Eksport           | Rodzaj   | Źródło          |
|-------------------|----------|-----------------|
| `Node`            | Klasa    | `@tiptap/core`  |
| `Mark`            | Klasa    | `@tiptap/core`  |
| `mergeAttributes` | Funkcja  | `@tiptap/core`  |
| `markInputRule`   | Funkcja  | `@tiptap/core`  |
| `markPasteRule`   | Funkcja  | `@tiptap/core`  |
| `CommandProps`    | Typ      | `@tiptap/core`  |
| `InputRuleMatch`  | Typ      | `@tiptap/core`  |
| `PasteRuleMatch`  | Typ      | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Ikony Material Design Icons z `@mdi/js` są reeksportowane na potrzeby dostosowywania ikon paska narzędzi.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable do odczytu konfiguracji interfejsu na poziomie edytora (`variantBtn`, `variantField`) we własnych komponentach paska narzędzi. Zobacz [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Bazowa klasa Editor z `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Komponenty edytora i okna dialogowego są dostępne jako nazwane eksporty do bezpośredniego użycia.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
