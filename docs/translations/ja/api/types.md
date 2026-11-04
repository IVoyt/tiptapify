# 型 {#types}

## TiptapifyEditor {#tiptapifyeditor}

追加のプロパティを備えた、拡張版の Tiptap Editor クラスです。

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

`<Tiptapify>` の `variantBtn` prop に指定できる値を定義します。この値は、エディターの共有設定を通じてすべてのツールバーボタンに適用されます（[`useTiptapifyConfig`](#usetiptapifyconfig) を参照）。

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

`<Tiptapify>` の `variantField` prop に指定できる値を定義します。この値は、エディターの共有設定を通じてツールバーのドロップダウンフィールドに適用されます（[`useTiptapifyConfig`](#usetiptapifyconfig) を参照）。

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

`<Tiptapify>` コンポーネントの `footerAlignment` prop に指定できる値を定義します。

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

`<Tiptapify>` コンポーネントの `skin` prop（エディターの外観）に指定できる組み込みの名前を定義します。

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — クラシックな外観: 浮き上がったツールバー、浮き上がったボックスとしてのボタングループ、押下状態にプライマリカラーを使う Vuetify ボタン。
- `pastel` — 落ち着いた外観: フラットな色付きツールバー、ゴーストボタン、軽やかなドロップダウン、やわらかいダイアログ。

カスタムスキンでは名前を追加できます: `registerSkin('mint', { extends: 'pastel', colors: { … } })`。`defineSkin` は、型付きの const 定義のための恒等ヘルパーです。どちらも `tiptapify` からエクスポートされています。

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

トークンでは表現できない構造上のバリエーション（コンポーネントのマークアップ、Vuetify の prop バインディング）です。shape がどのスキンルールセットを適用するかを決め、トークンがそれを描画します。

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

すべてのスキンは、クラシックな shape をベースに解決されます。解決された shape は [`TiptapifyConfig`](#tiptapifyconfig) の `shape: ComputedRef<ResolvedShape>` として公開されるため、カスタムツールバーコンポーネントもそれに従えます。

## TiptapifySkinColors {#tiptapifyskincolors}

スキンのカラートークンのカタログです。ツールバー、グループ、ボタン、バブルメニュー、ドロップダウン、ダイアログ、フレーム、画像、リサイズハンドルが対象です。キャメルケースの各キーは `--tf-*` CSS 変数に対応します（`toolbarBg` → `--tf-toolbar-bg`）。完全な表は[スキンガイド](/ja/guide/skins)にあります。

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

スキンのメトリクストークンのカタログです。同じ領域の余白、サイズ、角丸を扱い、キーと `--tf-*` の対応も同じです。完全な表は[スキンガイド](/ja/guide/skins)にあります。

## TiptapifySkinInput {#tiptapifyskininput}

`skin` prop の完全な型です。登録済みのスキン名（文字列）、またはインラインのスキンオブジェクトを指定します。

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

インラインオブジェクトは、登録済みスキンと同じチェーン（クラシック → `extends` → 自身）で解決され、グローバルレジストリには登録されず、`name` を持たない限りクラス `tiptapify-skin-inline` の下で描画されます。そのトークンは、エディターのルートに `--tf-*` CSS 変数として出力されます。

## TiptapifyContentStyles {#tiptapifycontentstyles}

`contentStyles` プロパティの型です([コンテンツスタイル](/ja/guide/content-styles)を参照)。

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

`upload` prop の型です。[アップロード](/ja/guide/uploads)のエンドポイントを指定します。

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

`linkPreview` prop の型と、そのエンドポイントが返すデータの型です（[リンクカード](/ja/guide/link-cards)を参照）。

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

`<Tiptapify>` 内のすべてのコンポーネントに、Vue の `provide`/`inject` で共有されるエディターレベルの UI 設定です。独自のツールバーコンポーネントでは [`useTiptapifyConfig`](#usetiptapifyconfig) で読み取れます。

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

値はリアクティブです。`<Tiptapify>` の `variantBtn` / `variantField` / `skin` prop を変更すると、props を再描画することなく、すべてのツールバーコンポーネントが更新されます。

## useTiptapifyConfig {#usetiptapifyconfig}

呼び出したコンポーネントが属する `<Tiptapify>` インスタンスの共有設定を返します。カスタムツールバーコンポーネント向けです（[カスタムツールバー](/ja/examples/custom-toolbar#custom-toolbar-components)を参照）。

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

`<Tiptapify>` インスタンスの外では、このコンポーザブルはパッケージのデフォルトにフォールバックします。`variantBtn` は `flat`、`variantField` は `solo`、スキンは `default`（クラシックな shape、トークンの出力なし）です。

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

## AI の型 {#ai-types}

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

`items` prop に指定できる値を定義します。

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**配列形式** — 項目名のフラットなリスト:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**オブジェクト形式** — 名前付きセクション:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

`editor-ready` イベントで発行されます。

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

`content-changed` イベントで発行されます。

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

プラグインのインストール時に渡すオプションです。

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## 再エクスポート {#re-exports}

カスタム拡張機能を作る際の利便性のため、次のユーティリティを `@tiptap/core` から再エクスポートしています。

| エクスポート | 種類 | 提供元 |
|---|---|---|
| `Node` | クラス | `@tiptap/core` |
| `Mark` | クラス | `@tiptap/core` |
| `mergeAttributes` | 関数 | `@tiptap/core` |
| `markInputRule` | 関数 | `@tiptap/core` |
| `markPasteRule` | 関数 | `@tiptap/core` |
| `CommandProps` | 型 | `@tiptap/core` |
| `InputRuleMatch` | 型 | `@tiptap/core` |
| `PasteRuleMatch` | 型 | `@tiptap/core` |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

`@mdi/js` の Material Design Icons は、ツールバーアイコンをカスタマイズするために再エクスポートされています。

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

カスタムツールバーコンポーネントから、エディターレベルの UI 設定（`variantBtn`、`variantField`）を読み取るためのコンポーザブルです。[useTiptapifyConfig](#usetiptapifyconfig) を参照してください。

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

基になる `@tiptap/vue-3` の Editor クラスです。

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

エディターとダイアログのコンポーネントは、直接利用できるよう名前付きエクスポートとして提供されています。

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
