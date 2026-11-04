# Types {#types}

## TiptapifyEditor {#tiptapifyeditor}

Kibővített Tiptap Editor osztály további tulajdonságokkal.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

A `<Tiptapify>` `variantBtn` propjának érvényes értékeit határozza meg. Az érték a szerkesztő megosztott konfigurációján keresztül minden eszköztárgombra érvényesül (lásd [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

A `<Tiptapify>` `variantField` propjának érvényes értékeit határozza meg. Az érték a szerkesztő megosztott konfigurációján keresztül az eszköztár legördülő mezőire érvényesül (lásd [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

A `<Tiptapify>` komponens `footerAlignment` propjának érvényes értékeit határozza meg.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

A `<Tiptapify>` komponens `skin` propjának beépített neveit határozza meg: a szerkesztő keretének megjelenését.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — a klasszikus megjelenés: kiemelt eszköztár, kiemelt dobozként megjelenő gombcsoportok, elsődleges színű lenyomott állapotú Vuetify-gombok.
- `pastel` — a nyugodt megjelenés: lapos, színezett eszköztár, áttetsző gombok, könnyű legördülő menük, lágy párbeszédablakok.

Az egyéni skinek neveket adnak hozzá: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; a `defineSkin` az azonosító segédfüggvény a típusos const definíciókhoz. Mindkettő a `tiptapify` csomagból exportált.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Azok a szerkezeti változatok, amelyeket egy token nem fejezhet ki (komponens-markup, Vuetify prop-kötések). Az alakzat dönti el, mely skin-szabályhalmazok érvényesek; a tokenek festik meg őket.

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

Minden skin a klasszikus alakzat fölött oldódik fel. A feloldott alakzat `shape: ComputedRef<ResolvedShape>` néven érhető el a [`TiptapifyConfig`](#tiptapifyconfig)-on, így az egyéni eszköztár-komponensek követhetik.

## TiptapifySkinColors {#tiptapifyskincolors}

A skin színtokenek katalógusa: eszköztár, csoportok, gombok, buborékmenük, legördülő menük, párbeszédablakok, keret, képek és az átméretező fogantyú. Minden camelCase kulcs egy `--tf-*` CSS-változóra képeződik le (`toolbarBg` → `--tf-toolbar-bg`). A teljes táblázat a [Skin útmutatóban](/hu/guide/skins) található.

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

A skin metrika-tokenek katalógusa: térközök, méretek és lekerekítések ugyanezekre a területekre, ugyanazzal a kulcs → `--tf-*` leképezéssel. A teljes táblázat a [Skin útmutatóban](/hu/guide/skins) található.

## TiptapifySkinInput {#tiptapifyskininput}

A `skin` prop teljes típusa: egy regisztrált skin neve (szöveg) vagy egy beágyazott skin-objektum.

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

A beágyazott objektum ugyanazon a láncon oldódik fel, mint a regisztrált skin (classic → `extends` → saját), soha nem kerül a globális jegyzékbe, és a `tiptapify-skin-inline` osztály alatt jelenik meg, hacsak nincs `name` mezője. A tokenjei `--tf-*` CSS-változókként kerülnek a szerkesztő gyökerére.

## TiptapifyContentStyles {#tiptapifycontentstyles}

A `contentStyles` prop típusa (lásd [Tartalomstílusok](/hu/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Az `upload` prop típusa: a [feltöltések](/hu/guide/uploads) végpontja.

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

A `linkPreview` prop és a végpontja által visszaadott adatok típusa (lásd [Hivatkozáskártyák](/hu/guide/link-cards)).

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

Szerkesztőszintű UI-konfiguráció, amelyet a `<Tiptapify>` minden komponense megoszt a Vue `provide`/`inject` révén. Saját eszköztár-komponenseidben a [`useTiptapifyConfig`](#usetiptapifyconfig) segítségével olvashatod.

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

Az értékek reaktívak: a `<Tiptapify>` `variantBtn` / `variantField` / `skin` propjának módosítása minden eszköztár-komponenst frissít a propok újrarenderelése nélkül.

## useTiptapifyConfig {#usetiptapifyconfig}

Annak a `<Tiptapify>` példánynak a megosztott konfigurációját adja vissza, amelyhez a hívó komponens tartozik. Egyéni eszköztár-komponensekhez készült (lásd [Egyéni eszköztár](/hu/examples/custom-toolbar#custom-toolbar-components)).

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

`<Tiptapify>` példányon kívül a composable a csomag alapértékeire esik vissza: `variantBtn` `flat`, `variantField` `solo`, és a `default` skin (klasszikus alakzat, kibocsátott tokenek nélkül).

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

## AI típusok {#ai-types}

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

Az `items` prop érvényes értékeit határozza meg.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Tömb formátum** — az elemnevek lapos listája:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Objektum formátum** — elnevezett szakaszok:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Az `editor-ready` eseményen keresztül kerül kibocsátásra.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

A `content-changed` eseményen keresztül kerül kibocsátásra.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

A plugin telepítésekor átadott opciók.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Újraexportálások {#re-exports}

Az alábbi segédfüggvények kényelmi okokból újra exportálva vannak a `@tiptap/core` csomagból, egyéni bővítmények építéséhez:

| Export            | Fajta    | Forrás          |
|-------------------|----------|-----------------|
| `Node`            | Osztály  | `@tiptap/core`  |
| `Mark`            | Osztály  | `@tiptap/core`  |
| `mergeAttributes` | Függvény | `@tiptap/core`  |
| `markInputRule`   | Függvény | `@tiptap/core`  |
| `markPasteRule`   | Függvény | `@tiptap/core`  |
| `CommandProps`    | Típus    | `@tiptap/core`  |
| `InputRuleMatch`  | Típus    | `@tiptap/core`  |
| `PasteRuleMatch`  | Típus    | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Az `@mdi/js` Material Design Icons ikonjai újra exportálva vannak az eszköztárikonok testreszabásához.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable a szerkesztőszintű UI-konfiguráció (`variantBtn`, `variantField`) olvasásához egyéni eszköztár-komponensekből. Lásd [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

A mögöttes `@tiptap/vue-3` Editor osztály.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

A szerkesztő- és párbeszédablak-komponensek nevesített exportként közvetlen használatra elérhetők.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
