# Tipi {#types}

## TiptapifyEditor {#tiptapifyeditor}

Razširjen razred urejevalnika Tiptap z dodatnimi lastnostmi.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Določa veljavne vrednosti lastnosti `variantBtn` na `<Tiptapify>`. Vrednost se prek skupne konfiguracije urejevalnika uporabi za vsak gumb orodne vrstice (glejte [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Določa veljavne vrednosti lastnosti `variantField` na `<Tiptapify>`. Vrednost se prek skupne konfiguracije urejevalnika uporabi za spustna polja orodne vrstice (glejte [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Določa veljavne vrednosti lastnosti `footerAlignment` na komponenti `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Določa vgrajena imena za lastnost `skin` na komponenti `<Tiptapify>`: videz okvirja urejevalnika.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — klasični videz: dvignjena orodna vrstica, skupine gumbov kot dvignjena polja, gumbi Vuetify s primarnim stanjem pritisnjenosti.
- `pastel` — umirjen videz: ravna obarvana orodna vrstica, prosojni gumbi, lahki spustni meniji, mehka pogovorna okna.

Preobleke po meri dodajo imena: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` je pomožna identitetna funkcija za tipizirane konstantne definicije. Obe se izvozita iz `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Strukturne različice, ki jih žeton ne more izraziti (označevanje komponent, vezave lastnosti Vuetify). Oblika določa, katera pravila preobleke veljajo; žetoni jih pobarvajo.

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

Vsaka preobleka se razreši nad klasično obliko. Razrešena oblika je izpostavljena kot `shape: ComputedRef<ResolvedShape>` na [`TiptapifyConfig`](#tiptapifyconfig), da ji lahko sledijo komponente orodne vrstice po meri.

## TiptapifySkinColors {#tiptapifyskincolors}

Katalog barvnih žetonov preobleke: orodna vrstica, skupine, gumbi, meniji z mehurčkom, spustni meniji, pogovorna okna, okvir, slike in ročica za spreminjanje velikosti. Vsak ključ camelCase se preslika v spremenljivko CSS `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). Celotna tabela je v [vodniku za preobleke](/sl/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Katalog metričnih žetonov preobleke: razmiki, velikosti in polmeri za ista področja, z enako preslikavo ključ → `--tf-*`. Celotna tabela je v [vodniku za preobleke](/sl/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Celoten tip lastnosti `skin`: ime registrirane preobleke (niz) ali vrstični objekt preobleke.

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

Vrstični objekt se razreši po isti verigi kot registrirana preobleka (klasična → `extends` → lastna), nikoli ne vstopi v globalni register in se izriše pod razredom `tiptapify-skin-inline`, razen če vsebuje `name`. Njegovi žetoni se oddajo kot spremenljivke CSS `--tf-*` na korenu urejevalnika.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Tip lastnosti `contentStyles` (glej [Slogi vsebine](/sl/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Tip lastnosti `upload`: končna točka [nalaganj](/sl/guide/uploads).

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

Tip lastnosti `linkPreview` in podatkov, s katerimi odgovori njena končna točka (glejte [Kartice povezav](/sl/guide/link-cards)).

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

Konfiguracija uporabniškega vmesnika na ravni urejevalnika, ki si jo z vsemi komponentami znotraj `<Tiptapify>` deli prek Vue `provide`/`inject`. V lastnih komponentah orodne vrstice jo preberete z [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Vrednosti so reaktivne: sprememba lastnosti `variantBtn` / `variantField` / `skin` na `<Tiptapify>` posodobi vsako komponento orodne vrstice brez ponovnega izrisa lastnosti.

## useTiptapifyConfig {#usetiptapifyconfig}

Vrne skupno konfiguracijo primerka `<Tiptapify>`, kateremu klicna komponenta pripada. Namenjeno komponentam orodne vrstice po meri (glejte [Orodna vrstica po meri](/sl/examples/custom-toolbar#custom-toolbar-components)).

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

Zunaj primerka `<Tiptapify>` composable preide na privzete vrednosti paketa: `variantBtn` `flat`, `variantField` `solo` in preobleka `default` (klasična oblika, brez oddanih žetonov).

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

## Tipi AI {#ai-types}

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

Določa veljavne vrednosti lastnosti `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Format polja** — ploski seznam imen elementov:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Format objekta** — poimenovani odseki:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Oddan prek dogodka `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Oddan prek dogodka `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Možnosti, podane ob namestitvi vtičnika.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Ponovni izvozi {#re-exports}

Naslednji pripomočki so zaradi priročnosti ponovno izvoženi iz `@tiptap/core` za gradnjo razširitev po meri:

| Izvoz             | Vrsta    | Vir             |
|-------------------|----------|-----------------|
| `Node`            | Razred   | `@tiptap/core`  |
| `Mark`            | Razred   | `@tiptap/core`  |
| `mergeAttributes` | Funkcija | `@tiptap/core`  |
| `markInputRule`   | Funkcija | `@tiptap/core`  |
| `markPasteRule`   | Funkcija | `@tiptap/core`  |
| `CommandProps`    | Tip      | `@tiptap/core`  |
| `InputRuleMatch`  | Tip      | `@tiptap/core`  |
| `PasteRuleMatch`  | Tip      | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Ikone Material Design iz `@mdi/js` so ponovno izvožene za prilagajanje ikon orodne vrstice.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable za branje konfiguracije uporabniškega vmesnika na ravni urejevalnika (`variantBtn`, `variantField`) iz komponent orodne vrstice po meri. Glejte [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Osnovni razred urejevalnika `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Komponenti urejevalnika in pogovornega okna sta na voljo kot poimenovana izvoza za neposredno uporabo.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
