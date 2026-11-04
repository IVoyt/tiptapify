# Typy {#types}

## TiptapifyEditor {#tiptapifyeditor}

Rozšírená trieda Tiptap Editor s dodatočnými vlastnosťami.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Definuje platné hodnoty propu `variantBtn` na `<Tiptapify>`. Hodnota sa použije na každé tlačidlo lišty nástrojov prostredníctvom zdieľanej konfigurácie editora (pozri [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Definuje platné hodnoty propu `variantField` na `<Tiptapify>`. Hodnota sa použije na rozbaľovacie polia lišty nástrojov prostredníctvom zdieľanej konfigurácie editora (pozri [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Definuje platné hodnoty propu `footerAlignment` komponentu `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Definuje vstavané názvy propu `skin` komponentu `<Tiptapify>`: vzhľad rámca editora.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — klasický vzhľad: zvýšený panel nástrojov, skupiny tlačidiel ako zvýšené boxy, tlačidlá Vuetify s primárnym stavom stlačenia.
- `pastel` — pokojný vzhľad: plochý tónovaný panel nástrojov, priehľadné tlačidlá, ľahké rozbaľovacie ponuky, mäkké dialógy.

Vlastné skiny pridávajú názvy: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` je pomocná identitná funkcia pre typované konštantné definície. Obe sa exportujú z `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Štrukturálne varianty, ktoré token nevie vyjadriť (značky komponentov, väzby props Vuetify). Tvar určuje, ktoré sady pravidiel skinu sa použijú; tokeny ich vykreslia.

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

Každý skin sa rieši nad klasickým tvarom. Vyriešený tvar je dostupný ako `shape: ComputedRef<ResolvedShape>` v [`TiptapifyConfig`](#tiptapifyconfig), takže ho môžu sledovať aj vlastné komponenty lišty nástrojov.

## TiptapifySkinColors {#tiptapifyskincolors}

Katalóg farebných tokenov skinu: lišta nástrojov, skupiny, tlačidlá, bublinové ponuky, rozbaľovacie ponuky, dialógy, rámec, obrázky a úchyt zmeny veľkosti. Každý kľúč v camelCase sa mapuje na CSS premennú `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). Úplná tabuľka je v [príručke Skiny](/sk/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Katalóg metrických tokenov skinu: odsadenia, veľkosti a polomery pre tie isté oblasti, s rovnakým mapovaním kľúč → `--tf-*`. Úplná tabuľka je v [príručke Skiny](/sk/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Úplný typ propu `skin`: názov registrovaného skinu (reťazec) alebo inline objekt skinu.

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

Inline objekt sa rieši rovnakým reťazcom ako registrovaný skin (classic → `extends` → vlastný), nikdy nevstúpi do globálneho registra a vykresľuje sa s triedou `tiptapify-skin-inline`, ak neobsahuje `name`. Jeho tokeny sa na koreň editora vypisujú ako CSS premenné `--tf-*`.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Typ vlastnosti `contentStyles` (pozri [Štýly obsahu](/sk/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Typ propu `upload`: endpoint [nahrávania](/sk/guide/uploads).

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

Typ propu `linkPreview` a dát, ktorými odpovedá jeho endpoint (pozri [Karty odkazov](/sk/guide/link-cards)).

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

Konfigurácia používateľského rozhrania na úrovni editora, zdieľaná so všetkými komponentmi vo vnútri `<Tiptapify>` cez Vue `provide`/`inject`. Vo vlastných komponentoch lišty nástrojov ju čítate cez [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Hodnoty sú reaktívne: zmena propu `variantBtn` / `variantField` / `skin` na `<Tiptapify>` aktualizuje každý komponent lišty nástrojov bez opätovného vykreslenia props.

## useTiptapifyConfig {#usetiptapifyconfig}

Vracia zdieľanú konfiguráciu inštancie `<Tiptapify>`, do ktorej volajúci komponent patrí. Je určená pre vlastné komponenty lišty nástrojov (pozri [Vlastná lišta nástrojov](/sk/examples/custom-toolbar#custom-toolbar-components)).

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

Mimo inštancie `<Tiptapify>` composable použije predvolené hodnoty balíka: `variantBtn` `flat`, `variantField` `solo` a skin `default` (klasický tvar, žiadne vypisované tokeny).

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

Definuje platné hodnoty propu `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Formát poľa** — plochý zoznam názvov položiek:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Formát objektu** — pomenované sekcie:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Emituje sa cez udalosť `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Emituje sa cez udalosť `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Možnosti odovzdávané pri inštalácii pluginu.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Re-exporty {#re-exports}

Nasledujúce utility sa pre pohodlie re-exportujú z `@tiptap/core` pri tvorbe vlastných rozšírení:

| Export            | Druh     | Zdroj           |
|-------------------|----------|-----------------|
| `Node`            | Trieda   | `@tiptap/core`  |
| `Mark`            | Trieda   | `@tiptap/core`  |
| `mergeAttributes` | Funkcia  | `@tiptap/core`  |
| `markInputRule`   | Funkcia  | `@tiptap/core`  |
| `markPasteRule`   | Funkcia  | `@tiptap/core`  |
| `CommandProps`    | Typ      | `@tiptap/core`  |
| `InputRuleMatch`  | Typ      | `@tiptap/core`  |
| `PasteRuleMatch`  | Typ      | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Material Design Icons z `@mdi/js` sa re-exportujú na prispôsobenie ikon lišty nástrojov.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable na čítanie konfigurácie používateľského rozhrania na úrovni editora (`variantBtn`, `variantField`) z vlastných komponentov lišty nástrojov. Pozri [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Základná trieda Editor z `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Komponenty editora a dialógu sú dostupné ako pomenované exporty na priame použitie.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
