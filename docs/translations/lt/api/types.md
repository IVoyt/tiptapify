# Tipai {#types}

## TiptapifyEditor {#tiptapifyeditor}

Išplėsta Tiptap Editor klasė su papildomomis savybėmis.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Apibrėžia galimas savybės `variantBtn` reikšmes `<Tiptapify>` komponente. Reikšmė taikoma kiekvienam įrankių juostos mygtukui per bendrą redaktoriaus konfigūraciją (žr. [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Apibrėžia galimas savybės `variantField` reikšmes `<Tiptapify>` komponente. Reikšmė taikoma įrankių juostos išskleidžiamiesiems laukams per bendrą redaktoriaus konfigūraciją (žr. [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Apibrėžia galimas savybės `footerAlignment` reikšmes `<Tiptapify>` komponente.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Apibrėžia įtaisytuosius savybės `skin` pavadinimus `<Tiptapify>` komponente: redaktoriaus apvalkalo išvaizdą.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — klasikinė išvaizda: pakelta įrankių juosta, mygtukų grupės kaip pakeltos dėžutės, Vuetify mygtukai su pirmine paspaudimo būsena.
- `pastel` — rami išvaizda: plokščia atspalvio įrankių juosta, permatomi mygtukai, lengvi išskleidžiamieji meniu, švelnūs dialogo langai.

Pasirinktiniai apvalkalai prideda pavadinimų: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` yra tapatumo pagalbinė funkcija tipizuotiems const apibrėžimams. Abi eksportuojamos iš `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Struktūriniai variantai, kurių žetonas išreikšti negali (komponentų žymėjimas, Vuetify savybių susiejimai). Forma nulemia, kurios apvalkalo taisyklių aibės taikomos; žetonai jas nudažo.

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

Kiekvienas apvalkalas išsprendžiamas virš klasikinės formos. Išspręsta forma pateikiama kaip `shape: ComputedRef<ResolvedShape>` [`TiptapifyConfig`](#tiptapifyconfig) objekte, todėl pasirinktiniai įrankių juostos komponentai gali jai paklusti.

## TiptapifySkinColors {#tiptapifyskincolors}

Apvalkalo spalvų žetonų katalogas: įrankių juosta, grupės, mygtukai, burbulo meniu, išskleidžiamieji sąrašai, dialogai, rėmas, paveikslai ir dydžio keitimo rankenėlė. Kiekvienas camelCase raktas susiejamas su `--tf-*` CSS kintamuoju (`toolbarBg` → `--tf-toolbar-bg`). Visa lentelė pateikta [apvalkalų vadove](/lt/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Apvalkalo metrikos žetonų katalogas: tarpai, dydžiai ir kampų spinduliai tose pačiose srityse, su tuo pačiu rakto → `--tf-*` susiejimu. Visa lentelė pateikta [apvalkalų vadove](/lt/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Pilnas savybės `skin` tipas: užregistruoto apvalkalo pavadinimas (eilutė) arba įterptinis apvalkalo objektas.

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

Įterptinis objektas išsprendžiamas ta pačia grandine kaip ir užregistruotas apvalkalas (klasikinis → `extends` → savas), niekada nepatenka į visuotinį registrą ir atvaizduojamas su klase `tiptapify-skin-inline`, nebent turi `name`. Jo žetonai išspinduliuojami kaip `--tf-*` CSS kintamieji redaktoriaus šaknyje.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Savybės `contentStyles` tipas (žr. [Turinio stiliai](/lt/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Savybės `upload` tipas: [įkėlimų](/lt/guide/uploads) galinis taškas.

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

Savybės `linkPreview` ir jos galinio taško atsakomų duomenų tipas (žr. [Nuorodų kortelės](/lt/guide/link-cards)).

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

Redaktoriaus lygio UI konfigūracija, bendrinama su kiekvienu komponentu `<Tiptapify>` viduje per Vue `provide`/`inject`. Savo įrankių juostos komponentuose ją skaitykite su [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Reikšmės yra reaktyvios: pakeitus savybę `variantBtn` / `variantField` / `skin` komponente `<Tiptapify>`, atnaujinamas kiekvienas įrankių juostos komponentas, iš naujo neatvaizduojant savybių.

## useTiptapifyConfig {#usetiptapifyconfig}

Grąžina bendrą `<Tiptapify>` egzemplioriaus, kuriam priklauso kviečiantis komponentas, konfigūraciją. Skirta pasirinktiniams įrankių juostos komponentams (žr. [Pasirinktinė įrankių juosta](/lt/examples/custom-toolbar#custom-toolbar-components)).

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

Už `<Tiptapify>` egzemplioriaus ribų kompozicinė funkcija grįžta prie paketo numatytųjų reikšmių: `variantBtn` `flat`, `variantField` `solo` ir apvalkalas `default` (klasikinė forma, be išspinduliuotų žetonų).

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

## DI tipai {#ai-types}

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

Apibrėžia galimas savybės `items` reikšmes.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Masyvo formatas** – plokščias elementų pavadinimų sąrašas:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Objekto formatas** – pavadinti skyriai:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Išspinduliuojamas per įvykį `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Išspinduliuojamas per įvykį `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Parinktys, perduodamos diegiant įskiepį.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Pakartotiniai eksportai {#re-exports}

Šios pagalbinės priemonės patogumo dėlei pakartotinai eksportuojamos iš `@tiptap/core`, kuriant pasirinktinius plėtinius:

| Eksportas         | Rūšis    | Šaltinis        |
|-------------------|----------|-----------------|
| `Node`            | Klasė    | `@tiptap/core`  |
| `Mark`            | Klasė    | `@tiptap/core`  |
| `mergeAttributes` | Funkcija | `@tiptap/core`  |
| `markInputRule`   | Funkcija | `@tiptap/core`  |
| `markPasteRule`   | Funkcija | `@tiptap/core`  |
| `CommandProps`    | Tipas    | `@tiptap/core`  |
| `InputRuleMatch`  | Tipas    | `@tiptap/core`  |
| `PasteRuleMatch`  | Tipas    | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Material Design Icons iš `@mdi/js` pakartotinai eksportuojamos įrankių juostos piktogramoms pritaikyti.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Kompozicinė funkcija redaktoriaus lygio UI konfigūracijai (`variantBtn`, `variantField`) skaityti iš pasirinktinių įrankių juostos komponentų. Žr. [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Pagrindinė `@tiptap/vue-3` Editor klasė.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Redaktoriaus ir dialogo komponentai prieinami kaip įvardyti eksportai tiesioginiam naudojimui.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
