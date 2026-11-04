# Typer {#types}

## TiptapifyEditor {#tiptapifyeditor}

Utökad Tiptap Editor-klass med ytterligare egenskaper.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Definierar giltiga värden för propen `variantBtn` på `<Tiptapify>`. Värdet tillämpas på varje verktygsfältsknapp via redigerarens delade konfiguration (se [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Definierar giltiga värden för propen `variantField` på `<Tiptapify>`. Värdet tillämpas på verktygsfältets rullgardinsfält via redigerarens delade konfiguration (se [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Definierar giltiga värden för propen `footerAlignment` på komponenten `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Definierar de inbyggda namnen för propen `skin` på komponenten `<Tiptapify>`: redigerarens gränssnittsutseende.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — det klassiska utseendet: ett upphöjt verktygsfält, knappgrupper som upphöjda rutor, Vuetify-knappar med ett primärt nedtryckt läge.
- `pastel` — det lugna utseendet: ett platt tonat verktygsfält, genomskinliga knappar, lätta rullgardinsmenyer, mjuka dialogrutor.

Egna skins lägger till namn: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` är en identitetshjälpare för typade const-definitioner. Båda exporteras från `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

De strukturella varianter som en token inte kan uttrycka (komponentmarkup, Vuetify-propbindningar). Formen avgör vilka skinregler som gäller; tokens målar dem.

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

Varje skin löses upp över den klassiska formen. Den upplösta formen exponeras som `shape: ComputedRef<ResolvedShape>` på [`TiptapifyConfig`](#tiptapifyconfig), så att anpassade verktygsfältskomponenter kan följa den.

## TiptapifySkinColors {#tiptapifyskincolors}

Katalogen över skinens färgtokens: verktygsfält, grupper, knappar, bubbelmenyer, rullgardiner, dialoger, ram, bilder och storleksändringshandtaget. Varje camelCase-nyckel mappas till en CSS-variabel `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). Hela tabellen finns i [Skins-guiden](/sv/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Katalogen över skinens måttokens: avstånd, storlekar och radier för samma områden, med samma mappning nyckel → `--tf-*`. Hela tabellen finns i [Skins-guiden](/sv/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Den fullständiga typen för propen `skin`: ett registrerat skinnamn (sträng) eller ett inline-skinobjekt.

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

Ett inline-objekt löses upp genom samma kedja som en registrerad skin (classic → `extends` → eget), hamnar aldrig i det globala registret och renderas under klassen `tiptapify-skin-inline` om det inte har ett `name`. Dess tokens skickas ut som CSS-variabler `--tf-*` på redigerarens rot.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Typen för propen `contentStyles` (se [Innehållsstilar](/sv/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Typen för propen `upload`: endpointen för [uppladdningar](/sv/guide/uploads).

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

Typen för propen `linkPreview` och för de data som dess endpoint svarar med (se [Länkkort](/sv/guide/link-cards)).

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

UI-konfiguration på redigerarnivå som delas med varje komponent inuti `<Tiptapify>` via Vue `provide`/`inject`. Läs den i dina egna verktygsfältskomponenter med [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Värdena är reaktiva: att ändra propen `variantBtn` / `variantField` / `skin` på `<Tiptapify>` uppdaterar varje verktygsfältskomponent utan att props renderas om.

## useTiptapifyConfig {#usetiptapifyconfig}

Returnerar den delade konfigurationen för den `<Tiptapify>`-instans som den anropande komponenten tillhör. Avsedd för anpassade verktygsfältskomponenter (se [Anpassat verktygsfält](/sv/examples/custom-toolbar#custom-toolbar-components)).

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

Utanför en `<Tiptapify>`-instans faller composable tillbaka på paketets standardvärden: `variantBtn` `flat`, `variantField` `solo` och skinen `default` (klassisk form, inga utsända tokens).

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

Definierar giltiga värden för propen `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Arrayformat** — platt lista med objektnamn:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Objektformat** — namngivna sektioner:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Skickas via händelsen `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Skickas via händelsen `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Alternativ som skickas när pluginet installeras.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Återexporter {#re-exports}

Följande verktyg återexporteras från `@tiptap/core` för bekvämlighets skull när du bygger egna tillägg:

| Export            | Slag     | Källa           |
|-------------------|----------|-----------------|
| `Node`            | Klass    | `@tiptap/core`  |
| `Mark`            | Klass    | `@tiptap/core`  |
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

Material Design Icons från `@mdi/js` återexporteras för anpassning av verktygsfältsikoner.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable för att läsa UI-konfigurationen på redigerarnivå (`variantBtn`, `variantField`) från anpassade verktygsfältskomponenter. Se [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Den underliggande Editor-klassen från `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Redigerar- och dialogkomponenterna finns som namngivna exporter för direkt användning.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
