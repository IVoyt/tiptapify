# Tüübid {#types}

## TiptapifyEditor {#tiptapifyeditor}

Laiendatud Tiptap Editor klass lisaomadustega.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Määrab kehtivad väärtused propile `variantBtn` komponendil `<Tiptapify>`. Väärtust rakendatakse igale tööriistariba nupule redaktori jagatud konfiguratsiooni kaudu (vaata [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Määrab kehtivad väärtused propile `variantField` komponendil `<Tiptapify>`. Väärtust rakendatakse tööriistariba rippmenüüväljadele redaktori jagatud konfiguratsiooni kaudu (vaata [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Määrab kehtivad väärtused propile `footerAlignment` komponendil `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Määrab sisseehitatud nimed propile `skin` komponendil `<Tiptapify>`: redaktori ümbrise välimus.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — klassikaline ilme: kõrgendatud tööriistariba, nuppude rühmad kõrgendatud kastidena, Vuetify nupud esmase vajutatud olekuga.
- `pastel` — rahulik ilme: lame toonitud tööriistariba, läbipaistvad nupud, kerged rippmenüüd, pehmed dialoogid.

Kohandatud nahad lisavad nimesid: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` on identsusabifunktsioon tüübitud konstantdefinitsioonide jaoks. Mõlemad eksporditakse paketist `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Struktuursed variandid, mida token väljendada ei suuda (komponentide markeerimine, Vuetify propide sidumised). Kuju otsustab, millised naha reeglikomplektid rakenduvad; tokenid värvivad need.

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

Iga nahk lahendatakse klassikalise kuju peal. Lahendatud kuju on kättesaadav kui `shape: ComputedRef<ResolvedShape>` objektil [`TiptapifyConfig`](#tiptapifyconfig), nii et kohandatud tööriistariba komponendid saavad seda järgida.

## TiptapifySkinColors {#tiptapifyskincolors}

Naha värvitokenite kataloog: tööriistariba, rühmad, nupud, hõljumenüüd, rippmenüüd, dialoogid, raam, pildid ja suuruse muutmise käepide. Iga camelCase-võti vastab CSS-muutujale `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). Täielik tabel on [nahkade juhendis](/et/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Naha mõõdutokenite kataloog: vahed, suurused ja raadiused samade alade jaoks, sama vastendusega võti → `--tf-*`. Täielik tabel on [nahkade juhendis](/et/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Propi `skin` täielik tüüp: registreeritud naha nimi (string) või sisemine nahaobjekt.

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

Sisemine objekt lahendatakse sama ahela kaudu nagu registreeritud nahk (klassikaline → `extends` → oma), see ei satu kunagi globaalsesse registrisse ja renderdatakse klassi `tiptapify-skin-inline` all, kui sellel pole `name`. Selle tokenid väljastatakse CSS-muutujatena `--tf-*` redaktori juurelemendil.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Propi `contentStyles` tüüp (vt [Sisu stiilid](/et/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Propi `upload` tüüp: [üleslaadimiste](/et/guide/uploads) lõpp-punkt.

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

Propi `linkPreview` ja selle lõpp-punkti vastatavate andmete tüüp (vaata [lingikaarte](/et/guide/link-cards)).

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

Redaktoritaseme kasutajaliidese konfiguratsioon, mida jagatakse iga komponendiga komponendi `<Tiptapify>` sees Vue `provide`/`inject` kaudu. Loe seda oma tööriistariba komponentides funktsiooniga [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Väärtused on reaktiivsed: propi `variantBtn` / `variantField` / `skin` muutmine komponendil `<Tiptapify>` uuendab iga tööriistariba komponenti ilma propide uuesti renderdamiseta.

## useTiptapifyConfig {#usetiptapifyconfig}

Tagastab selle `<Tiptapify>` instantsi jagatud konfiguratsiooni, kuhu kutsuv komponent kuulub. Mõeldud kohandatud tööriistariba komponentidele (vaata [kohandatud tööriistariba](/et/examples/custom-toolbar#custom-toolbar-components)).

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

Väljaspool `<Tiptapify>` instantsi langeb composable tagasi paketi vaikeväärtustele: `variantBtn` `flat`, `variantField` `solo` ja nahk `default` (klassikaline kuju, tokeneid ei väljastata).

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

## AI tüübid {#ai-types}

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

Määrab kehtivad väärtused propile `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Massiivivorming** — üksuste nimede lame loend:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Objektivorming** — nimega sektsioonid:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Väljastatakse sündmusega `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Väljastatakse sündmusega `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Valikud, mis antakse plugina paigaldamisel.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Taaseksportid {#re-exports}

Järgmised utiliidid eksporditakse mugavuse huvides uuesti paketist `@tiptap/core`, kui ehitad kohandatud laiendusi:

| Eksport           | Liik     | Allikas         |
|-------------------|----------|-----------------|
| `Node`            | Klass    | `@tiptap/core`  |
| `Mark`            | Klass    | `@tiptap/core`  |
| `mergeAttributes` | Funktsioon | `@tiptap/core`  |
| `markInputRule`   | Funktsioon | `@tiptap/core`  |
| `markPasteRule`   | Funktsioon | `@tiptap/core`  |
| `CommandProps`    | Tüüp     | `@tiptap/core`  |
| `InputRuleMatch`  | Tüüp     | `@tiptap/core`  |
| `PasteRuleMatch`  | Tüüp     | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Paketi `@mdi/js` Material Design Icons eksporditakse uuesti tööriistariba ikoonide kohandamiseks.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable redaktoritaseme kasutajaliidese konfiguratsiooni (`variantBtn`, `variantField`) lugemiseks kohandatud tööriistariba komponentides. Vaata [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Aluseks olev `@tiptap/vue-3` Editor klass.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Redaktori- ja dialoogikomponendid on otsekasutuseks saadaval nimeliste eksportidena.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
