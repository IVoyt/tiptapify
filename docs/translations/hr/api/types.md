# Tipovi {#types}

## TiptapifyEditor {#tiptapifyeditor}

Prošireni Tiptap Editor class s dodatnim svojstvima.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Definira valjane vrijednosti propa `variantBtn` na `<Tiptapify>`. Vrijednost se primjenjuje na svaki gumb alatne trake putem zajedničke konfiguracije uređivača (vidi [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Definira valjane vrijednosti propa `variantField` na `<Tiptapify>`. Vrijednost se primjenjuje na padajuća polja alatne trake putem zajedničke konfiguracije uređivača (vidi [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Definira valjane vrijednosti propa `footerAlignment` na komponenti `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Definira ugrađena imena za prop `skin` na komponenti `<Tiptapify>`: izgled okvira uređivača.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — klasičan izgled: podignuta alatna traka, grupe gumba kao podignuti okviri, Vuetify gumbi s primarnim stanjem pritisnutosti.
- `pastel` — smiren izgled: ravna obojena alatna traka, prozirni gumbi, lagani padajući izbornici, meki dijalozi.

Prilagođeni skinovi dodaju imena: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` je pomoćna identitetna funkcija za tipizirane const definicije. Oboje se izvozi iz `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Strukturne varijante koje token ne može izraziti (oznake komponenti, vezanja Vuetify propova). Oblik određuje koji se skupovi pravila skina primjenjuju; tokeni ih boje.

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

Svaki skin razrješava se nad klasičnim oblikom. Razriješeni oblik izlaže se kao `shape: ComputedRef<ResolvedShape>` na [`TiptapifyConfig`](#tiptapifyconfig), pa ga prilagođene komponente alatne trake mogu pratiti.

## TiptapifySkinColors {#tiptapifyskincolors}

Katalog tokena boja skina: alatna traka, grupe, gumbi, bubble izbornici, padajući izbornici, dijalozi, okvir, slike i ručka za promjenu veličine. Svaki camelCase ključ preslikava se u CSS varijablu `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). Cjelovita tablica nalazi se u [vodiču za skinove](/hr/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Katalog metričkih tokena skina: razmaci, veličine i radijusi za ista područja, s istim preslikavanjem ključ → `--tf-*`. Cjelovita tablica nalazi se u [vodiču za skinove](/hr/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Puni tip propa `skin`: ime registriranog skina (string) ili inline objekt skina.

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

Inline objekt razrješava se istim lancem kao registrirani skin (classic → `extends` → vlastiti), nikad ne ulazi u globalni registar i prikazuje se pod klasom `tiptapify-skin-inline` osim ako nosi `name`. Njegovi tokeni emitiraju se kao CSS varijable `--tf-*` na korijenu uređivača.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Tip svojstva `contentStyles` (vidi [Stilovi sadržaja](/hr/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Tip propa `upload`: krajnja točka [prijenosa datoteka](/hr/guide/uploads).

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

Tip propa `linkPreview` i podataka na koje odgovara njegova krajnja točka (vidi [Kartice poveznica](/hr/guide/link-cards)).

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

Konfiguracija korisničkog sučelja na razini uređivača, dijeljena sa svakom komponentom unutar `<Tiptapify>` putem Vue `provide`/`inject`. Čitajte je u vlastitim komponentama alatne trake pomoću [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Vrijednosti su reaktivne: promjena propa `variantBtn` / `variantField` / `skin` na `<Tiptapify>` ažurira svaku komponentu alatne trake bez ponovnog renderiranja propova.

## useTiptapifyConfig {#usetiptapifyconfig}

Vraća zajedničku konfiguraciju instance `<Tiptapify>` kojoj pozivajuća komponenta pripada. Namijenjeno prilagođenim komponentama alatne trake (vidi [Prilagođena alatna traka](/hr/examples/custom-toolbar#custom-toolbar-components)).

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

Izvan instance `<Tiptapify>` composable se vraća na zadane vrijednosti paketa: `variantBtn` `flat`, `variantField` `solo` i skin `default` (klasičan oblik, bez emitiranih tokena).

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

Definira valjane vrijednosti propa `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Format niza** — ravni popis naziva stavki:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Format objekta** — imenovani odjeljci:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Emitira se događajem `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Emitira se događajem `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Opcije koje se prosljeđuju pri instalaciji dodatka.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Ponovni izvozi {#re-exports}

Sljedeći alati ponovno se izvoze iz `@tiptap/core` radi praktičnosti pri izradi prilagođenih ekstenzija:

| Izvoz             | Vrsta    | Izvor           |
|-------------------|----------|-----------------|
| `Node`            | Class    | `@tiptap/core`  |
| `Mark`            | Class    | `@tiptap/core`  |
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

Material Design Icons iz `@mdi/js` ponovno se izvoze za prilagodbu ikona alatne trake.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable za čitanje konfiguracije korisničkog sučelja na razini uređivača (`variantBtn`, `variantField`) iz prilagođenih komponenti alatne trake. Vidi [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Temeljni Editor class iz `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Komponente uređivača i dijaloga dostupne su kao imenovani izvozi za izravnu uporabu.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
