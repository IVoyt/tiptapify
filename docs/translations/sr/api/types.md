# Tipovi {#types}

## TiptapifyEditor {#tiptapifyeditor}

Prošireni Tiptap Editor klasa sa dodatnim svojstvima.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Definiše važeće vrednosti za prop `variantBtn` na `<Tiptapify>`. Vrednost se primenjuje na svako dugme trake sa alatima preko deljene konfiguracije uređivača (pogledajte [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Definiše važeće vrednosti za prop `variantField` na `<Tiptapify>`. Vrednost se primenjuje na padajuća polja trake sa alatima preko deljene konfiguracije uređivača (pogledajte [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Definiše važeće vrednosti za prop `footerAlignment` na komponenti `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Definiše ugrađene nazive za prop `skin` na komponenti `<Tiptapify>`: izgled okvira uređivača.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — klasičan izgled: podignuta alatna traka, grupe dugmadi kao podignuti okviri, Vuetify dugmad sa primarnim stanjem pritisnutosti.
- `pastel` — miran izgled: ravna obojena alatna traka, providna dugmad, lagani padajući meniji, meki dijalozi.

Prilagođeni skinovi dodaju nazive: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` je pomoćna identitetska funkcija za tipizirane konstantne definicije. Oba se izvoze iz `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Strukturne varijante koje token ne može da izrazi (markup komponenti, Vuetify prop vezivanja). Oblik određuje koji se skupovi pravila skina primenjuju; tokeni ih boje.

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

Svaki skin se razrešava nad klasičnim oblikom. Razrešeni oblik je izložen kao `shape: ComputedRef<ResolvedShape>` na [`TiptapifyConfig`](#tiptapifyconfig), pa ga prilagođene komponente trake sa alatima mogu pratiti.

## TiptapifySkinColors {#tiptapifyskincolors}

Katalog tokena boja skina: traka sa alatima, grupe, dugmad, bubble meniji, padajući meniji, dijalozi, okvir, slike i ručica za promenu veličine. Svaki camelCase ključ mapira se na CSS promenljivu `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). Kompletna tabela nalazi se u [vodiču za skinove](/sr/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Katalog tokena metrika skina: razmaci, veličine i radijusi za iste oblasti, sa istim mapiranjem ključ → `--tf-*`. Kompletna tabela nalazi se u [vodiču za skinove](/sr/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Kompletan tip propa `skin`: naziv registrovanog skina (string) ili inline objekat skina.

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

Inline objekat se razrešava kroz isti lanac kao registrovani skin (classic → `extends` → sopstveno), nikada ne ulazi u globalni registar i renderuje se pod klasom `tiptapify-skin-inline`, osim ako sadrži `name`. Njegovi tokeni se emituju kao CSS promenljive `--tf-*` u korenu uređivača.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Tip svojstva `contentStyles` (pogledajte [Stilovi sadržaja](/sr/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Tip propa `upload`: endpoint za [otpremanje](/sr/guide/uploads).

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

Tip propa `linkPreview` i podataka koje vraća njegov endpoint (pogledajte [Kartice veza](/sr/guide/link-cards)).

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

Konfiguracija korisničkog interfejsa na nivou uređivača koja se deli sa svakom komponentom unutar `<Tiptapify>` preko Vue `provide`/`inject`. Čitajte je u sopstvenim komponentama trake sa alatima pomoću [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Vrednosti su reaktivne: promena propa `variantBtn` / `variantField` / `skin` na `<Tiptapify>` ažurira svaku komponentu trake sa alatima bez ponovnog renderovanja propova.

## useTiptapifyConfig {#usetiptapifyconfig}

Vraća deljenu konfiguraciju instance `<Tiptapify>` kojoj pozivajuća komponenta pripada. Namenjeno prilagođenim komponentama trake sa alatima (pogledajte [Prilagođena traka sa alatima](/sr/examples/custom-toolbar#custom-toolbar-components)).

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

Izvan instance `<Tiptapify>` composable se vraća na podrazumevane vrednosti paketa: `variantBtn` `flat`, `variantField` `solo` i skin `default` (klasičan oblik, bez emitovanih tokena).

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

## AI tipovi {#ai-types}

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

Definiše važeće vrednosti za prop `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Format niza** — ravna lista naziva stavki:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Format objekta** — imenovani odeljci:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Emituje se preko događaja `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Emituje se preko događaja `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Opcije koje se prosleđuju prilikom instalacije plugina.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Ponovni izvozi {#re-exports}

Sledeći alati se ponovo izvoze iz `@tiptap/core` radi pogodnosti pri pravljenju prilagođenih ekstenzija:

| Izvoz             | Vrsta    | Izvor           |
|-------------------|----------|-----------------|
| `Node`            | Klasa    | `@tiptap/core`  |
| `Mark`            | Klasa    | `@tiptap/core`  |
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

Material Design Icons iz `@mdi/js` ponovo se izvoze radi prilagođavanja ikona trake sa alatima.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable za čitanje konfiguracije korisničkog interfejsa na nivou uređivača (`variantBtn`, `variantField`) iz prilagođenih komponenti trake sa alatima. Pogledajte [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Osnovna klasa Editor iz `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Komponente uređivača i dijaloga dostupne su kao imenovani izvozi za direktnu upotrebu.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
