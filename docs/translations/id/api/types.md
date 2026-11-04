# Tipe {#types}

## TiptapifyEditor {#tiptapifyeditor}

Class Tiptap Editor yang diperluas dengan properti tambahan.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Menentukan nilai yang valid untuk prop `variantBtn` pada `<Tiptapify>`. Nilainya diterapkan ke setiap tombol toolbar melalui konfigurasi bersama editor (lihat [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Menentukan nilai yang valid untuk prop `variantField` pada `<Tiptapify>`. Nilainya diterapkan ke kolom dropdown toolbar melalui konfigurasi bersama editor (lihat [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Menentukan nilai yang valid untuk prop `footerAlignment` pada komponen `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Menentukan nama bawaan untuk prop `skin` pada komponen `<Tiptapify>`: tampilan chrome editor.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — tampilan klasik: toolbar timbul, grup tombol sebagai kotak timbul, tombol Vuetify dengan status ditekan berwarna primer.
- `pastel` — tampilan tenang: toolbar datar berwarna lembut, tombol ghost, dropdown ringan, dialog lembut.

Skin kustom menambahkan nama: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` adalah helper identitas untuk definisi const bertipe. Keduanya diekspor dari `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Varian struktural yang tidak dapat diungkapkan oleh token (markup komponen, pengikatan prop Vuetify). Shape menentukan kumpulan aturan skin mana yang berlaku; token yang mewarnainya.

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

Setiap skin diselesaikan di atas shape klasik. Shape yang telah diselesaikan diekspos sebagai `shape: ComputedRef<ResolvedShape>` pada [`TiptapifyConfig`](#tiptapifyconfig), sehingga komponen toolbar kustom dapat mengikutinya.

## TiptapifySkinColors {#tiptapifyskincolors}

Katalog token warna skin: toolbar, grup, tombol, bubble menu, dropdown, dialog, bingkai, gambar, dan handle pengubah ukuran. Setiap key camelCase dipetakan ke variabel CSS `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). Tabel lengkapnya ada di [panduan Skin](/id/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Katalog token metrik skin: jarak, ukuran, dan radius untuk area yang sama, dengan pemetaan key → `--tf-*` yang sama. Tabel lengkapnya ada di [panduan Skin](/id/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Tipe lengkap prop `skin`: nama skin terdaftar (string) atau objek skin inline.

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

Objek inline diselesaikan melalui rantai yang sama dengan skin terdaftar (classic → `extends` → milik sendiri), tidak pernah masuk ke registry global, dan dirender dengan class `tiptapify-skin-inline` kecuali memiliki `name`. Token-nya dikeluarkan sebagai variabel CSS `--tf-*` pada root editor.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Tipe prop `contentStyles` (lihat [Gaya konten](/id/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Tipe prop `upload`: endpoint [unggahan](/id/guide/uploads).

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

Tipe prop `linkPreview` dan data yang dijawab endpoint-nya (lihat [Kartu tautan](/id/guide/link-cards)).

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

Konfigurasi UI tingkat editor yang dibagikan ke setiap komponen di dalam `<Tiptapify>` melalui `provide`/`inject` Vue. Baca di komponen toolbar Anda sendiri dengan [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Nilainya reaktif: mengubah prop `variantBtn` / `variantField` / `skin` pada `<Tiptapify>` memperbarui setiap komponen toolbar tanpa merender ulang props.

## useTiptapifyConfig {#usetiptapifyconfig}

Mengembalikan konfigurasi bersama dari instance `<Tiptapify>` tempat komponen pemanggil berada. Ditujukan untuk komponen toolbar kustom (lihat [Toolbar Kustom](/id/examples/custom-toolbar#custom-toolbar-components)).

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

Di luar instance `<Tiptapify>`, composable ini kembali ke default paket: `variantBtn` `flat`, `variantField` `solo`, dan skin `default` (shape classic, tanpa token yang dikeluarkan).

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

## Tipe AI {#ai-types}

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

Menentukan nilai yang valid untuk prop `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Format array** — daftar datar nama item:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Format objek** — seksi bernama:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Dikeluarkan melalui event `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Dikeluarkan melalui event `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Opsi yang diberikan saat memasang plugin.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Ekspor Ulang {#re-exports}

Utilitas berikut diekspor ulang dari `@tiptap/core` untuk kemudahan saat membangun ekstensi kustom:

| Ekspor            | Jenis    | Sumber          |
|-------------------|----------|-----------------|
| `Node`            | Class    | `@tiptap/core`  |
| `Mark`            | Class    | `@tiptap/core`  |
| `mergeAttributes` | Fungsi   | `@tiptap/core`  |
| `markInputRule`   | Fungsi   | `@tiptap/core`  |
| `markPasteRule`   | Fungsi   | `@tiptap/core`  |
| `CommandProps`    | Tipe     | `@tiptap/core`  |
| `InputRuleMatch`  | Tipe     | `@tiptap/core`  |
| `PasteRuleMatch`  | Tipe     | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Material Design Icons dari `@mdi/js` diekspor ulang untuk kustomisasi ikon toolbar.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable untuk membaca konfigurasi UI tingkat editor (`variantBtn`, `variantField`) dari komponen toolbar kustom. Lihat [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Class Editor `@tiptap/vue-3` yang mendasarinya.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Komponen editor dan dialog tersedia sebagai named export untuk digunakan langsung.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
