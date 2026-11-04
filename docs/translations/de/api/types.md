# Types {#types}

## TiptapifyEditor {#tiptapifyeditor}

Erweiterte Tiptap-Editor-Klasse mit zusätzlichen Eigenschaften.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Definiert die gültigen Werte für die Prop `variantBtn` von `<Tiptapify>`. Der Wert wird über die geteilte Konfiguration des Editors auf jede Symbolleisten-Schaltfläche angewendet (siehe [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Definiert die gültigen Werte für die Prop `variantField` von `<Tiptapify>`. Der Wert wird über die geteilte Konfiguration des Editors auf Dropdown-Felder der Symbolleiste angewendet (siehe [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Definiert die gültigen Werte für die Prop `footerAlignment` der Komponente `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Definiert die eingebauten Namen für die Prop `skin` der Komponente `<Tiptapify>`: das Erscheinungsbild des Editor-Chromes.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — der klassische Look: eine erhabene Toolbar, Button-Gruppen als erhabene Boxen, Vuetify-Buttons mit einem Primärfarben-Zustand für gedrückt.
- `pastel` — der ruhige Look: eine flache, getönte Toolbar, Ghost-Buttons, helle Dropdowns, weiche Dialoge.

Eigene Skins fügen Namen hinzu: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` ist der Identitäts-Helper für typisierte const-Definitionen. Beide werden aus `tiptapify` exportiert.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Die strukturellen Varianten, die ein Token nicht ausdrücken kann (Komponenten-Markup, Vuetify-Prop-Bindungen). Die Form entscheidet, welche Skin-Regelsätze gelten; die Tokens bemalen sie.

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

Jeder Skin wird über der klassischen Form aufgelöst. Die aufgelöste Form steht als `shape: ComputedRef<ResolvedShape>` in [`TiptapifyConfig`](#tiptapifyconfig) bereit, sodass eigene Symbolleisten-Komponenten ihr folgen können.

## TiptapifySkinColors {#tiptapifyskincolors}

Der Katalog der Skin-Farb-Tokens: Symbolleiste, Gruppen, Schaltflächen, Bubble-Menüs, Dropdowns, Dialoge, Rahmen, Bilder und der Resize-Handle. Jeder camelCase-Schlüssel entspricht einer CSS-Variable `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). Die vollständige Tabelle steht in der [Skins-Anleitung](/de/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Der Katalog der Skin-Maß-Tokens: Abstände, Größen und Radien für dieselben Bereiche, mit derselben Zuordnung Schlüssel → `--tf-*`. Die vollständige Tabelle steht in der [Skins-Anleitung](/de/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Der vollständige Typ der Prop `skin`: ein registrierter Skin-Name (String) oder ein Inline-Skin-Objekt.

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

Ein Inline-Objekt wird über dieselbe Kette aufgelöst wie ein registrierter Skin (klassisch → `extends` → eigene Werte), gelangt nie in die globale Registry und wird unter der Klasse `tiptapify-skin-inline` gerendert, sofern es keinen `name` trägt. Seine Tokens werden als CSS-Variablen `--tf-*` am Editor-Root ausgegeben.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Der Typ der Prop `contentStyles` (siehe [Inhaltsstile](/de/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Der Typ der Prop `upload`: der Endpunkt für [Uploads](/de/guide/uploads).

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

Der Typ der Prop `linkPreview` und der Daten, die ihr Endpunkt zurückgibt (siehe [Link-Karten](/de/guide/link-cards)).

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

Die UI-Konfiguration auf Editor-Ebene, die über Vue `provide`/`inject` mit jeder Komponente in `<Tiptapify>` geteilt wird. Lies sie in deinen eigenen Symbolleisten-Komponenten mit [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Die Werte sind reaktiv: Ändert sich die Prop `variantBtn` / `variantField` / `skin` von `<Tiptapify>`, aktualisiert das jede Symbolleisten-Komponente, ohne dass Props neu gerendert werden müssen.

## useTiptapifyConfig {#usetiptapifyconfig}

Gibt die geteilte Konfiguration der `<Tiptapify>`-Instanz zurück, zu der die aufrufende Komponente gehört. Gedacht für eigene Symbolleisten-Komponenten (siehe [Custom Toolbar](/de/examples/custom-toolbar#custom-toolbar-components)).

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

Außerhalb einer `<Tiptapify>`-Instanz greift das Composable auf die Paket-Standardwerte zurück: `variantBtn` `flat`, `variantField` `solo` und den Skin `default` (klassische Form, keine ausgegebenen Tokens).

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

## KI-Typen {#ai-types}

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

Definiert die gültigen Werte für die Prop `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Array-Format** — flache Liste von Elementnamen:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Objekt-Format** — benannte Bereiche:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Wird über das Event `editor-ready` ausgelöst.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Wird über das Event `content-changed` ausgelöst.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Optionen, die beim Installieren des Plugins übergeben werden.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Re-exports {#re-exports}

Die folgenden Hilfsmittel werden aus `@tiptap/core` re-exportiert, damit du sie beim Bau eigener Erweiterungen bequem nutzen kannst:

| Export            | Kind     | Source          |
|-------------------|----------|-----------------|
| `Node`            | Klasse   | `@tiptap/core`  |
| `Mark`            | Klasse   | `@tiptap/core`  |
| `mergeAttributes` | Funktion | `@tiptap/core`  |
| `markInputRule`   | Funktion | `@tiptap/core`  |
| `markPasteRule`   | Funktion | `@tiptap/core`  |
| `CommandProps`    | Typ      | `@tiptap/core`  |
| `InputRuleMatch`  | Typ      | `@tiptap/core`  |
| `PasteRuleMatch`  | Typ      | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Material Design Icons aus `@mdi/js` werden zur Anpassung von Symbolleisten-Icons re-exportiert.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable zum Lesen der UI-Konfiguration auf Editor-Ebene (`variantBtn`, `variantField`) aus eigenen Symbolleisten-Komponenten. Siehe [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Die zugrunde liegende Editor-Klasse von `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Die Editor- und Dialog-Komponenten stehen als benannte Exporte zur direkten Verwendung bereit.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
