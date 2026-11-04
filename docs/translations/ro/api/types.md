# Tipuri {#types}

## TiptapifyEditor {#tiptapifyeditor}

Clasa Tiptap Editor extinsă, cu proprietăți suplimentare.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Definește valorile valide pentru proprietatea `variantBtn` din `<Tiptapify>`. Valoarea este aplicată fiecărui buton al barei de instrumente prin configurația partajată a editorului (vezi [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Definește valorile valide pentru proprietatea `variantField` din `<Tiptapify>`. Valoarea este aplicată câmpurilor derulante ale barei de instrumente prin configurația partajată a editorului (vezi [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Definește valorile valide pentru proprietatea `footerAlignment` a componentei `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Definește numele încorporate pentru proprietatea `skin` a componentei `<Tiptapify>`: aspectul elementelor editorului.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — aspectul clasic: o bară de instrumente ridicată, grupuri de butoane ca niște casete ridicate, butoane Vuetify cu starea apăsată primară.
- `pastel` — aspectul calm: o bară de instrumente plată, tonată, butoane transparente, liste derulante ușoare, dialoguri line.

Temele personalizate adaugă nume: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` este funcția-identitate pentru definiții const tipizate. Ambele sunt exportate din `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Variantele structurale pe care un token nu le poate exprima (markup-ul componentelor, legările de proprietăți Vuetify). Forma stabilește ce seturi de reguli ale temei se aplică; tokenii le colorează.

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

Orice temă se rezolvă peste forma clasică. Forma rezolvată este expusă ca `shape: ComputedRef<ResolvedShape>` în [`TiptapifyConfig`](#tiptapifyconfig), astfel încât componentele personalizate ale barei de instrumente o pot urma.

## TiptapifySkinColors {#tiptapifyskincolors}

Catalogul tokenilor de culoare ai temelor: bara de instrumente, grupuri, butoane, meniuri bubble, liste derulante, dialoguri, cadru, imagini și mânerul de redimensionare. Fiecare cheie camelCase corespunde unei variabile CSS `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). Tabelul complet se găsește în [ghidul Teme de aspect](/ro/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Catalogul tokenilor de metrici ai temelor: spațieri, dimensiuni și raze pentru aceleași zone, cu aceeași corespondență cheie → `--tf-*`. Tabelul complet se găsește în [ghidul Teme de aspect](/ro/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Tipul complet al proprietății `skin`: un nume de temă înregistrată (șir) sau un obiect de temă inline.

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

Un obiect inline se rezolvă prin același lanț ca o temă înregistrată (classic → `extends` → propriu), nu intră niciodată în registrul global și este afișat sub clasa `tiptapify-skin-inline`, cu excepția cazului în care are un `name`. Tokenii săi sunt emiși ca variabile CSS `--tf-*` pe rădăcina editorului.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Tipul prop-ului `contentStyles` (vezi [Stiluri de conținut](/ro/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Tipul proprietății `upload`: endpointul [încărcărilor](/ro/guide/uploads).

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

Tipul proprietății `linkPreview` și al datelor cu care răspunde endpointul său (vezi [Carduri de link](/ro/guide/link-cards)).

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

Configurația UI la nivel de editor, partajată cu fiecare componentă din `<Tiptapify>` prin `provide`/`inject` din Vue. Citește-o în propriile componente ale barei de instrumente cu [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Valorile sunt reactive: modificarea proprietății `variantBtn` / `variantField` / `skin` din `<Tiptapify>` actualizează fiecare componentă a barei de instrumente, fără a re-randa proprietățile.

## useTiptapifyConfig {#usetiptapifyconfig}

Returnează configurația partajată a instanței `<Tiptapify>` din care face parte componenta apelantă. Destinată componentelor personalizate ale barei de instrumente (vezi [Bară de instrumente personalizată](/ro/examples/custom-toolbar#custom-toolbar-components)).

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

În afara unei instanțe `<Tiptapify>`, composable-ul revine la valorile implicite ale pachetului: `variantBtn` `flat`, `variantField` `solo` și tema `default` (forma clasică, fără tokeni emiși).

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

## Tipuri AI {#ai-types}

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

Definește valorile valide pentru proprietatea `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Format listă** — listă simplă de nume de elemente:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Format obiect** — secțiuni cu nume:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Emis prin evenimentul `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Emis prin evenimentul `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Opțiuni transmise la instalarea pluginului.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Reexporturi {#re-exports}

Următoarele utilitare sunt reexportate din `@tiptap/core` pentru comoditate la crearea extensiilor personalizate:

| Export            | Tip      | Sursă           |
|-------------------|----------|-----------------|
| `Node`            | Clasă    | `@tiptap/core`  |
| `Mark`            | Clasă    | `@tiptap/core`  |
| `mergeAttributes` | Funcție  | `@tiptap/core`  |
| `markInputRule`   | Funcție  | `@tiptap/core`  |
| `markPasteRule`   | Funcție  | `@tiptap/core`  |
| `CommandProps`    | Tip      | `@tiptap/core`  |
| `InputRuleMatch`  | Tip      | `@tiptap/core`  |
| `PasteRuleMatch`  | Tip      | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Pictogramele Material Design din `@mdi/js` sunt reexportate pentru personalizarea pictogramelor barei de instrumente.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable pentru citirea configurației UI la nivel de editor (`variantBtn`, `variantField`) din componentele personalizate ale barei de instrumente. Vezi [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Clasa Editor de bază din `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Componentele editorului și ale dialogului sunt disponibile ca exporturi cu nume, pentru utilizare directă.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
