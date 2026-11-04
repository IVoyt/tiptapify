# Tipi {#types}

## TiptapifyEditor {#tiptapifyeditor}

Classe Editor di Tiptap estesa con proprietà aggiuntive.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Definisce i valori validi per la prop `variantBtn` di `<Tiptapify>`. Il valore viene applicato a ogni pulsante della barra degli strumenti tramite la configurazione condivisa dell'editor (vedi [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Definisce i valori validi per la prop `variantField` di `<Tiptapify>`. Il valore viene applicato ai campi a discesa della barra degli strumenti tramite la configurazione condivisa dell'editor (vedi [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Definisce i valori validi per la prop `footerAlignment` del componente `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Definisce i nomi integrati per la prop `skin` del componente `<Tiptapify>`: l'aspetto dell'interfaccia dell'editor.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — l'aspetto classico: una barra degli strumenti in rilievo, gruppi di pulsanti come riquadri in rilievo, pulsanti Vuetify con uno stato premuto nel colore primario.
- `pastel` — l'aspetto discreto: una barra degli strumenti piatta e tinta, pulsanti ghost, menu a discesa chiari, finestre di dialogo morbide.

Le skin personalizzate aggiungono nomi: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` è l'helper identità per definizioni const tipizzate. Entrambi sono esportati da `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Le varianti strutturali che un token non può esprimere (markup dei componenti, binding delle prop di Vuetify). La forma decide quali insiemi di regole della skin si applicano; i token li colorano.

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

Ogni skin viene risolta a partire dalla forma classica. La forma risolta è esposta come `shape: ComputedRef<ResolvedShape>` in [`TiptapifyConfig`](#tiptapifyconfig), così i componenti personalizzati della barra degli strumenti possono seguirla.

## TiptapifySkinColors {#tiptapifyskincolors}

Il catalogo dei token di colore delle skin: barra degli strumenti, gruppi, pulsanti, bubble menu, menu a discesa, finestre di dialogo, cornice, immagini e maniglia di ridimensionamento. Ogni chiave in camelCase corrisponde a una variabile CSS `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). La tabella completa è nella [guida alle skin](/it/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Il catalogo dei token di misura delle skin: spaziature, dimensioni e raggi per le stesse aree, con la stessa corrispondenza chiave → `--tf-*`. La tabella completa è nella [guida alle skin](/it/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Il tipo completo della prop `skin`: il nome di una skin registrata (stringa) oppure un oggetto skin inline.

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

Un oggetto inline viene risolto attraverso la stessa catena di una skin registrata (classic → `extends` → proprio), non entra mai nel registro globale e viene reso con la classe `tiptapify-skin-inline`, a meno che non abbia un `name`. I suoi token vengono emessi come variabili CSS `--tf-*` sulla radice dell'editor.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Il tipo della prop `contentStyles` (vedi [Stili del contenuto](/it/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Il tipo della prop `upload`: l'endpoint dei [caricamenti](/it/guide/uploads).

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

Il tipo della prop `linkPreview` e dei dati con cui risponde il suo endpoint (vedi [Schede dei link](/it/guide/link-cards)).

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

Configurazione dell'interfaccia a livello di editor, condivisa con ogni componente all'interno di `<Tiptapify>` tramite `provide`/`inject` di Vue. Leggila nei tuoi componenti personalizzati della barra degli strumenti con [`useTiptapifyConfig`](#usetiptapifyconfig).

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

I valori sono reattivi: modificare la prop `variantBtn` / `variantField` / `skin` di `<Tiptapify>` aggiorna ogni componente della barra degli strumenti senza ridisegnare le props.

## useTiptapifyConfig {#usetiptapifyconfig}

Restituisce la configurazione condivisa dell'istanza di `<Tiptapify>` a cui appartiene il componente chiamante. Pensato per i componenti personalizzati della barra degli strumenti (vedi [Barra degli strumenti personalizzata](/it/examples/custom-toolbar#custom-toolbar-components)).

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

Al di fuori di un'istanza di `<Tiptapify>` il composable ripiega sui valori predefiniti del pacchetto: `variantBtn` `flat`, `variantField` `solo` e la skin `default` (forma classica, nessun token emesso).

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

Definisce i valori validi per la prop `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Formato array**: elenco piatto di nomi di elementi:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Formato oggetto**: sezioni con nome:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Emesso tramite l'evento `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Emesso tramite l'evento `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Opzioni passate durante l'installazione del plugin.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Re-export {#re-exports}

Le seguenti utility vengono riesportate da `@tiptap/core` per comodità nella creazione di estensioni personalizzate:

| Export            | Tipo     | Origine         |
|-------------------|----------|-----------------|
| `Node`            | Classe   | `@tiptap/core`  |
| `Mark`            | Classe   | `@tiptap/core`  |
| `mergeAttributes` | Funzione | `@tiptap/core`  |
| `markInputRule`   | Funzione | `@tiptap/core`  |
| `markPasteRule`   | Funzione | `@tiptap/core`  |
| `CommandProps`    | Tipo     | `@tiptap/core`  |
| `InputRuleMatch`  | Tipo     | `@tiptap/core`  |
| `PasteRuleMatch`  | Tipo     | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Le Material Design Icons di `@mdi/js` vengono riesportate per personalizzare le icone della barra degli strumenti.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable per leggere la configurazione dell'interfaccia a livello di editor (`variantBtn`, `variantField`) dai componenti personalizzati della barra degli strumenti. Vedi [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

La classe Editor sottostante di `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

I componenti dell'editor e della finestra di dialogo sono disponibili come export con nome per l'uso diretto.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
