# Tyypit {#types}

## TiptapifyEditor {#tiptapifyeditor}

Laajennettu Tiptap Editor -luokka lisäominaisuuksilla.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Määrittää kelvolliset arvot `<Tiptapify>`-komponentin `variantBtn`-propsille. Arvo otetaan käyttöön jokaisessa työkalurivin painikkeessa editorin jaetun määrityksen kautta (katso [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Määrittää kelvolliset arvot `<Tiptapify>`-komponentin `variantField`-propsille. Arvo otetaan käyttöön työkalurivin pudotusvalikkokentissä editorin jaetun määrityksen kautta (katso [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Määrittää kelvolliset arvot `<Tiptapify>`-komponentin `footerAlignment`-propsille.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Määrittää sisäänrakennetut nimet `<Tiptapify>`-komponentin `skin`-propsille: editorin kehyksen ulkoasun.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — klassinen ulkoasu: korotettu työkalupalkki, painikeryhmät korotettuina laatikoina, Vuetify-painikkeet ensisijaisella painetulla tilalla.
- `pastel` — rauhallinen ulkoasu: litteä sävytetty työkalupalkki, läpikuultavat painikkeet, kevyet pudotusvalikot, pehmeät dialogit.

Omat teemat lisäävät nimiä: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` on identiteettiapufunktio tyypitettyjen const-määritysten tekemiseen. Molemmat viedään paketista `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Rakenteelliset muunnelmat, joita token ei voi ilmaista (komponenttien markup, Vuetify-propsien sidonnat). Muoto ratkaisee, mitkä teeman sääntöjoukot otetaan käyttöön; tokenit maalaavat ne.

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

Jokainen teema ratkaistaan klassisen muodon päälle. Ratkaistu muoto on saatavilla `shape: ComputedRef<ResolvedShape>` -kenttänä [`TiptapifyConfig`](#tiptapifyconfig)-tyypissä, jotta omat työkalurivin komponentit voivat noudattaa sitä.

## TiptapifySkinColors {#tiptapifyskincolors}

Teeman värit-tokenien katalogi: työkalurivi, ryhmät, painikkeet, kuplavalikot, pudotusvalikot, dialogit, kehys, kuvat ja koonmuutoskahva. Jokainen camelCase-avain vastaa `--tf-*`-CSS-muuttujaa (`toolbarBg` → `--tf-toolbar-bg`). Koko taulukko löytyy [Skins-oppaasta](/fi/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Teeman mittatokenien katalogi: välit, koot ja kulmien pyöristykset samoille alueille, samalla avain → `--tf-*` -vastaavuudella. Koko taulukko löytyy [Skins-oppaasta](/fi/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

`skin`-propsin täysi tyyppi: rekisteröity teeman nimi (merkkijono) tai inline-teemaobjekti.

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

Inline-objekti ratkaistaan saman ketjun kautta kuin rekisteröity teema (classic → `extends` → oma), se ei koskaan päädy globaaliin rekisteriin ja piirtyy luokan `tiptapify-skin-inline` alle, ellei sillä ole `name`-arvoa. Sen tokenit annetaan `--tf-*`-CSS-muuttujina editorin juuressa.

## TiptapifyContentStyles {#tiptapifycontentstyles}

`contentStyles`-propin tyyppi (katso [Sisältötyylit](/fi/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

`upload`-propsin tyyppi: [latausten](/fi/guide/uploads) päätepiste.

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

`linkPreview`-propsin tyyppi sekä sen päätepisteen vastauksen data (katso [Linkkikortit](/fi/guide/link-cards)).

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

Editoritason käyttöliittymämääritys, joka jaetaan jokaiselle `<Tiptapify>`-komponentin sisällä olevalle komponentille Vuen `provide`/`inject`-mekanismilla. Lue se omissa työkalurivin komponenteissasi [`useTiptapifyConfig`](#usetiptapifyconfig)-funktiolla.

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

Arvot ovat reaktiivisia: `<Tiptapify>`-komponentin `variantBtn`- / `variantField`- / `skin`-propsin muuttaminen päivittää jokaisen työkalurivin komponentin ilman propsien uudelleenpiirtoa.

## useTiptapifyConfig {#usetiptapifyconfig}

Palauttaa sen `<Tiptapify>`-instanssin jaetun määrityksen, johon kutsuva komponentti kuuluu. Tarkoitettu omille työkalurivin komponenteille (katso [Oma työkalurivi](/fi/examples/custom-toolbar#custom-toolbar-components)).

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

`<Tiptapify>`-instanssin ulkopuolella composable palaa paketin oletuksiin: `variantBtn` `flat`, `variantField` `solo` ja `default`-teema (klassinen muoto, ei tuotettuja tokeneita).

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

## AI-tyypit {#ai-types}

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

Määrittää kelvolliset arvot `items`-propsille.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Taulukkomuoto** — litteä lista kohteiden nimistä:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Objektimuoto** — nimetyt osiot:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Lähetetään `editor-ready`-tapahtumalla.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Lähetetään `content-changed`-tapahtumalla.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Pluginia asennettaessa annettavat asetukset.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Uudelleenviennit {#re-exports}

Seuraavat apuvälineet viedään uudelleen paketista `@tiptap/core` omien laajennusten rakentamisen helpottamiseksi:

| Vienti            | Laji     | Lähde           |
|-------------------|----------|-----------------|
| `Node`            | Luokka   | `@tiptap/core`  |
| `Mark`            | Luokka   | `@tiptap/core`  |
| `mergeAttributes` | Funktio  | `@tiptap/core`  |
| `markInputRule`   | Funktio  | `@tiptap/core`  |
| `markPasteRule`   | Funktio  | `@tiptap/core`  |
| `CommandProps`    | Tyyppi   | `@tiptap/core`  |
| `InputRuleMatch`  | Tyyppi   | `@tiptap/core`  |
| `PasteRuleMatch`  | Tyyppi   | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Paketin `@mdi/js` Material Design Icons -kuvakkeet viedään uudelleen työkalurivin kuvakkeiden mukauttamista varten.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable editoritason käyttöliittymämäärityksen (`variantBtn`, `variantField`) lukemiseen omista työkalurivin komponenteista. Katso [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Taustalla oleva `@tiptap/vue-3`-paketin Editor-luokka.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Editori- ja dialogikomponentit ovat saatavilla nimettyinä vienteinä suoraa käyttöä varten.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
