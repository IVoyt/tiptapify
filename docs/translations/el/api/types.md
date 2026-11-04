# Τύποι {#types}

## TiptapifyEditor {#tiptapifyeditor}

Επεκταμένη κλάση Tiptap Editor με πρόσθετες ιδιότητες.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Ορίζει τις έγκυρες τιμές του prop `variantBtn` στο `<Tiptapify>`. Η τιμή εφαρμόζεται σε κάθε κουμπί της γραμμής εργαλείων μέσω των κοινών ρυθμίσεων του επεξεργαστή (δείτε το [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Ορίζει τις έγκυρες τιμές του prop `variantField` στο `<Tiptapify>`. Η τιμή εφαρμόζεται στα αναπτυσσόμενα πεδία της γραμμής εργαλείων μέσω των κοινών ρυθμίσεων του επεξεργαστή (δείτε το [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Ορίζει τις έγκυρες τιμές του prop `footerAlignment` στο στοιχείο `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Ορίζει τα ενσωματωμένα ονόματα για το prop `skin` στο στοιχείο `<Tiptapify>`: την εμφάνιση του περιβλήματος του επεξεργαστή.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — η κλασική εμφάνιση: μια ανασηκωμένη γραμμή εργαλείων, ομάδες κουμπιών ως ανασηκωμένα πλαίσια, κουμπιά Vuetify με κύρια κατάσταση πατήματος.
- `pastel` — η ήρεμη εμφάνιση: μια επίπεδη χρωματισμένη γραμμή εργαλείων, διάφανα κουμπιά, ελαφριά αναπτυσσόμενα μενού, απαλά παράθυρα διαλόγου.

Τα προσαρμοσμένα skins προσθέτουν ονόματα: `registerSkin('mint', { extends: 'pastel', colors: { … } })`· το `defineSkin` είναι βοηθητική συνάρτηση ταυτότητας για τυποποιημένους ορισμούς const. Και τα δύο εξάγονται από το `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Οι δομικές παραλλαγές που ένα token δεν μπορεί να εκφράσει (markup στοιχείων, δεσμεύσεις props του Vuetify). Το σχήμα καθορίζει ποια σύνολα κανόνων skin εφαρμόζονται· τα tokens τα χρωματίζουν.

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

Κάθε skin επιλύεται πάνω στο κλασικό σχήμα. Το επιλυμένο σχήμα εκτίθεται ως `shape: ComputedRef<ResolvedShape>` στο [`TiptapifyConfig`](#tiptapifyconfig), ώστε τα προσαρμοσμένα στοιχεία της γραμμής εργαλείων να μπορούν να το ακολουθούν.

## TiptapifySkinColors {#tiptapifyskincolors}

Ο κατάλογος των tokens χρωμάτων του skin: γραμμή εργαλείων, ομάδες, κουμπιά, bubble menus, αναπτυσσόμενα μενού, διάλογοι, πλαίσιο, εικόνες και λαβή αλλαγής μεγέθους. Κάθε κλειδί camelCase αντιστοιχεί σε μια μεταβλητή CSS `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). Ο πλήρης πίνακας υπάρχει στον [οδηγό Skins](/el/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Ο κατάλογος των tokens μετρικών του skin: αποστάσεις, μεγέθη και ακτίνες για τις ίδιες περιοχές, με την ίδια αντιστοίχιση κλειδί → `--tf-*`. Ο πλήρης πίνακας υπάρχει στον [οδηγό Skins](/el/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Ο πλήρης τύπος του prop `skin`: ένα καταχωρισμένο όνομα skin (συμβολοσειρά) ή ένα ενσωματωμένο αντικείμενο skin.

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

Ένα ενσωματωμένο αντικείμενο επιλύεται μέσω της ίδιας αλυσίδας με ένα καταχωρισμένο skin (classic → `extends` → δικό του), δεν μπαίνει ποτέ στο καθολικό μητρώο και αποδίδεται με την κλάση `tiptapify-skin-inline`, εκτός αν φέρει `name`. Τα tokens του εκπέμπονται ως μεταβλητές CSS `--tf-*` στη ρίζα του επεξεργαστή.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Ο τύπος της ιδιότητας `contentStyles` (δείτε [Στυλ περιεχομένου](/el/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Ο τύπος του prop `upload`: το endpoint των [μεταφορτώσεων](/el/guide/uploads).

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

Ο τύπος του prop `linkPreview` και των δεδομένων που απαντά το endpoint του (δείτε [Κάρτες συνδέσμων](/el/guide/link-cards)).

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

Ρυθμίσεις UI σε επίπεδο επεξεργαστή, κοινές για κάθε στοιχείο μέσα στο `<Tiptapify>` μέσω των Vue `provide`/`inject`. Διαβάστε τις στα δικά σας στοιχεία γραμμής εργαλείων με το [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Οι τιμές είναι αντιδραστικές: η αλλαγή του prop `variantBtn` / `variantField` / `skin` στο `<Tiptapify>` ενημερώνει κάθε στοιχείο της γραμμής εργαλείων χωρίς επανάληψη απόδοσης των props.

## useTiptapifyConfig {#usetiptapifyconfig}

Επιστρέφει τις κοινές ρυθμίσεις της παρουσίας `<Tiptapify>` στην οποία ανήκει το στοιχείο που το καλεί. Προορίζεται για προσαρμοσμένα στοιχεία γραμμής εργαλείων (δείτε [Προσαρμοσμένη γραμμή εργαλείων](/el/examples/custom-toolbar#custom-toolbar-components)).

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

Εκτός παρουσίας `<Tiptapify>`, το composable επιστρέφει στις προεπιλογές του πακέτου: `variantBtn` `flat`, `variantField` `solo` και το skin `default` (κλασικό σχήμα, χωρίς εκπεμπόμενα tokens).

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

## Τύποι AI {#ai-types}

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

Ορίζει τις έγκυρες τιμές του prop `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Μορφή πίνακα** — επίπεδη λίστα ονομάτων στοιχείων:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Μορφή αντικειμένου** — ονομασμένες ενότητες:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Εκπέμπεται μέσω του συμβάντος `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Εκπέμπεται μέσω του συμβάντος `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Επιλογές που περνούν κατά την εγκατάσταση του πρόσθετου.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Επανεξαγωγές {#re-exports}

Τα παρακάτω βοηθητικά εξάγονται ξανά από το `@tiptap/core` για ευκολία κατά τη δημιουργία προσαρμοσμένων επεκτάσεων:

| Εξαγωγή           | Είδος      | Πηγή            |
|-------------------|------------|-----------------|
| `Node`            | Κλάση      | `@tiptap/core`  |
| `Mark`            | Κλάση      | `@tiptap/core`  |
| `mergeAttributes` | Συνάρτηση  | `@tiptap/core`  |
| `markInputRule`   | Συνάρτηση  | `@tiptap/core`  |
| `markPasteRule`   | Συνάρτηση  | `@tiptap/core`  |
| `CommandProps`    | Τύπος      | `@tiptap/core`  |
| `InputRuleMatch`  | Τύπος      | `@tiptap/core`  |
| `PasteRuleMatch`  | Τύπος      | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Τα Material Design Icons από το `@mdi/js` εξάγονται ξανά για προσαρμογή των εικονιδίων της γραμμής εργαλείων.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable για ανάγνωση των ρυθμίσεων UI σε επίπεδο επεξεργαστή (`variantBtn`, `variantField`) από προσαρμοσμένα στοιχεία γραμμής εργαλείων. Δείτε [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Η υποκείμενη κλάση Editor του `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Τα στοιχεία επεξεργαστή και διαλόγου είναι διαθέσιμα ως ονομασμένες εξαγωγές για άμεση χρήση.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
