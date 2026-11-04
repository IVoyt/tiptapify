# Types {#types}

## TiptapifyEditor {#tiptapifyeditor}

Uitgebreide Tiptap Editor-klasse met extra eigenschappen.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Definieert geldige waarden voor de prop `variantBtn` op `<Tiptapify>`. De waarde wordt via de gedeelde configuratie van de editor op elke toolbarknop toegepast (zie [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Definieert geldige waarden voor de prop `variantField` op `<Tiptapify>`. De waarde wordt via de gedeelde configuratie van de editor op de dropdownvelden van de toolbar toegepast (zie [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Definieert geldige waarden voor de prop `footerAlignment` van de component `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Definieert de ingebouwde namen voor de prop `skin` van de component `<Tiptapify>`: het uiterlijk van de editor-chrome.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — de klassieke look: een verhoogde werkbalk, knopgroepen als verhoogde vakken, Vuetify-knoppen met een primaire kleur voor de ingedrukte status.
- `pastel` — de rustige look: een vlakke, getinte werkbalk, ghost-knoppen, lichte dropdowns, zachte dialogen.

Eigen skins voegen namen toe: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` is de identiteitshelper voor getypeerde const-definities. Beide worden geëxporteerd uit `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

De structurele varianten die een token niet kan uitdrukken (componentmarkup, Vuetify-propbindingen). De vorm bepaalt welke skinregelsets van toepassing zijn; de tokens kleuren ze.

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

Elke skin wordt opgelost over de klassieke vorm. De opgeloste vorm is beschikbaar als `shape: ComputedRef<ResolvedShape>` op [`TiptapifyConfig`](#tiptapifyconfig), zodat aangepaste toolbarcomponenten hem kunnen volgen.

## TiptapifySkinColors {#tiptapifyskincolors}

De catalogus van kleurtokens van de skin: toolbar, groepen, knoppen, bubbelmenu's, dropdowns, dialogen, frame, afbeeldingen en de formaatgreep. Elke camelCase-sleutel komt overeen met een CSS-variabele `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). De volledige tabel staat in de [Skins-handleiding](/nl/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

De catalogus van maattokens van de skin: afstanden, groottes en radii voor dezelfde gebieden, met dezelfde sleutel → `--tf-*`-toewijzing. De volledige tabel staat in de [Skins-handleiding](/nl/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Het volledige type van de prop `skin`: de naam van een geregistreerde skin (string) of een inline skinobject.

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

Een inline object wordt via dezelfde keten opgelost als een geregistreerde skin (klassiek → `extends` → eigen), komt nooit in het globale register terecht en wordt gerenderd onder de klasse `tiptapify-skin-inline`, tenzij het een `name` heeft. De tokens worden als CSS-variabelen `--tf-*` op de root van de editor uitgegeven.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Het type van de prop `contentStyles` (zie [Contentstijlen](/nl/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Het type van de prop `upload`: het endpoint van [uploads](/nl/guide/uploads).

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

Het type van de prop `linkPreview` en van de gegevens waarmee het endpoint antwoordt (zie [Linkkaarten](/nl/guide/link-cards)).

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

UI-configuratie op editorniveau, gedeeld met elke component binnen `<Tiptapify>` via Vue `provide`/`inject`. Lees haar in je eigen toolbarcomponenten met [`useTiptapifyConfig`](#usetiptapifyconfig).

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

De waarden zijn reactief: wijzigen van de prop `variantBtn` / `variantField` / `skin` op `<Tiptapify>` werkt elke toolbarcomponent bij zonder props opnieuw te renderen.

## useTiptapifyConfig {#usetiptapifyconfig}

Geeft de gedeelde configuratie terug van de `<Tiptapify>`-instantie waartoe de aanroepende component behoort. Bedoeld voor aangepaste toolbarcomponenten (zie [Aangepaste toolbar](/nl/examples/custom-toolbar#custom-toolbar-components)).

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

Buiten een `<Tiptapify>`-instantie valt de composable terug op de standaardwaarden van het pakket: `variantBtn` `flat`, `variantField` `solo` en de skin `default` (klassieke vorm, geen uitgegeven tokens).

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

## AI-types {#ai-types}

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

Definieert geldige waarden voor de prop `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Arrayformaat** — platte lijst met itemnamen:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Objectformaat** — benoemde secties:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Uitgezonden via het event `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Uitgezonden via het event `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Opties die worden doorgegeven bij het installeren van de plugin.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Re-exports {#re-exports}

De volgende hulpmiddelen worden voor het gemak opnieuw geëxporteerd uit `@tiptap/core` bij het bouwen van eigen extensies:

| Export            | Soort    | Bron            |
|-------------------|----------|-----------------|
| `Node`            | Klasse   | `@tiptap/core`  |
| `Mark`            | Klasse   | `@tiptap/core`  |
| `mergeAttributes` | Functie  | `@tiptap/core`  |
| `markInputRule`   | Functie  | `@tiptap/core`  |
| `markPasteRule`   | Functie  | `@tiptap/core`  |
| `CommandProps`    | Type     | `@tiptap/core`  |
| `InputRuleMatch`  | Type     | `@tiptap/core`  |
| `PasteRuleMatch`  | Type     | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Material Design Icons uit `@mdi/js` worden opnieuw geëxporteerd voor het aanpassen van toolbarpictogrammen.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable om de UI-configuratie op editorniveau (`variantBtn`, `variantField`) uit aangepaste toolbarcomponenten te lezen. Zie [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

De onderliggende Editor-klasse van `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

De editor- en dialoogcomponenten zijn beschikbaar als named exports voor direct gebruik.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
