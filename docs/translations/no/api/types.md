# Typer {#types}

## TiptapifyEditor {#tiptapifyeditor}

Utvidet Tiptap-editorklasse med tilleggsegenskaper.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Definerer gyldige verdier for `variantBtn`-prop-en på `<Tiptapify>`. Verdien brukes på hver verktøylinjeknapp via editorens delte konfigurasjon (se [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Definerer gyldige verdier for `variantField`-prop-en på `<Tiptapify>`. Verdien brukes på nedtrekksfeltene i verktøylinjen via editorens delte konfigurasjon (se [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Definerer gyldige verdier for `footerAlignment`-prop-en på `<Tiptapify>`-komponenten.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Definerer de innebygde navnene for `skin`-prop-en på `<Tiptapify>`-komponenten: utseendet til editorens ramme.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — det klassiske utseendet: en hevet verktøylinje, knappegrupper som hevede bokser, Vuetify-knapper med en primær nedtrykt tilstand.
- `pastel` — det rolige utseendet: en flat, tonet verktøylinje, gjennomsiktige knapper, lette nedtrekksmenyer, myke dialoger.

Egendefinerte skinn legger til navn: `registerSkin('mint', { extends: 'pastel', colors: { … } })`. `defineSkin` er en identitetshjelper for typede const-definisjoner. Begge eksporteres fra `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

De strukturelle variantene et token ikke kan uttrykke (komponentmarkup, Vuetify-prop-bindinger). Formen avgjør hvilke skinnregelsett som gjelder, og tokenene maler dem.

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

Hvert skin løses over den klassiske formen. Den løste formen eksponeres som `shape: ComputedRef<ResolvedShape>` på [`TiptapifyConfig`](#tiptapifyconfig), slik at egendefinerte verktøylinjekomponenter kan følge den.

## TiptapifySkinColors {#tiptapifyskincolors}

Katalogen over skinnets fargetokens: verktøylinje, grupper, knapper, boblemenyer, nedtrekkslister, dialoger, ramme, bilder og håndtaket for størrelsesendring. Hver camelCase-nøkkel tilsvarer en `--tf-*` CSS-variabel (`toolbarBg` → `--tf-toolbar-bg`). Hele tabellen finnes i [Skins guide](/no/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Katalogen over skinnets måltokens: avstander, størrelser og radier for de samme områdene, med samme tilordning nøkkel → `--tf-*`. Hele tabellen finnes i [Skins guide](/no/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Den fulle typen til `skin`-prop-en: et registrert skinnnavn (streng) eller et inline skin-objekt.

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

Et inline objekt løses gjennom samme kjede som et registrert skin (klassisk → `extends` → eget), havner aldri i det globale registeret og gjengis under klassen `tiptapify-skin-inline` med mindre det har en `name`. Tokenene sendes ut som `--tf-*` CSS-variabler på editorroten.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Typen til propen `contentStyles` (se [Innholdsstiler](/no/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Typen til `upload`-prop-en: endepunktet for [opplastinger](/no/guide/uploads).

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

Typen til `linkPreview`-prop-en og til dataene endepunktet svarer med (se [Link cards](/no/guide/link-cards)).

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

UI-konfigurasjon på editornivå som deles med alle komponenter inne i `<Tiptapify>` via Vue `provide`/`inject`. Les den i dine egne verktøylinjekomponenter med [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Verdiene er reaktive: når `variantBtn` / `variantField` / `skin`-prop-en på `<Tiptapify>` endres, oppdateres alle verktøylinjekomponenter uten å gjengi props på nytt.

## useTiptapifyConfig {#usetiptapifyconfig}

Returnerer den delte konfigurasjonen til `<Tiptapify>`-instansen som den kallende komponenten tilhører. Beregnet på egendefinerte verktøylinjekomponenter (se [Custom Toolbar](/no/examples/custom-toolbar#custom-toolbar-components)).

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

Utenfor en `<Tiptapify>`-instans faller composablen tilbake til pakkens standardverdier: `variantBtn` `flat`, `variantField` `solo` og skinnet `default` (klassisk form, ingen utsendte tokens).

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

## AI-typer {#ai-types}

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

Definerer gyldige verdier for `items`-prop-en.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Listeformat** — flat liste med elementnavn:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Objektformat** — navngitte seksjoner:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Sendes via `editor-ready`-hendelsen.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Sendes via `content-changed`-hendelsen.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Alternativer som sendes inn når pluginen installeres.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Re-eksporter {#re-exports}

Følgende verktøy re-eksporteres fra `@tiptap/core` for enkelhets skyld når du bygger egendefinerte utvidelser:

| Eksport           | Slag     | Kilde           |
|-------------------|----------|-----------------|
| `Node`            | Klasse   | `@tiptap/core`  |
| `Mark`            | Klasse   | `@tiptap/core`  |
| `mergeAttributes` | Funksjon | `@tiptap/core`  |
| `markInputRule`   | Funksjon | `@tiptap/core`  |
| `markPasteRule`   | Funksjon | `@tiptap/core`  |
| `CommandProps`    | Type     | `@tiptap/core`  |
| `InputRuleMatch`  | Type     | `@tiptap/core`  |
| `PasteRuleMatch`  | Type     | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Material Design Icons fra `@mdi/js` re-eksporteres for tilpasning av verktøylinjeikoner.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable for å lese UI-konfigurasjonen på editornivå (`variantBtn`, `variantField`) fra egendefinerte verktøylinjekomponenter. Se [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Den underliggende Editor-klassen fra `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Editor- og dialogkomponentene er tilgjengelige som navngitte eksporter for direkte bruk.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
