# 类型 {#types}

## TiptapifyEditor {#tiptapifyeditor}

带有附加属性的扩展 Tiptap Editor 类。

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

定义 `<Tiptapify>` 上 `variantBtn` 属性的有效值。该值会通过编辑器的共享配置应用到每个工具栏按钮（参见 [`useTiptapifyConfig`](#usetiptapifyconfig)）。

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

定义 `<Tiptapify>` 上 `variantField` 属性的有效值。该值会通过编辑器的共享配置应用到工具栏下拉字段（参见 [`useTiptapifyConfig`](#usetiptapifyconfig)）。

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

定义 `<Tiptapify>` 组件上 `footerAlignment` 属性的有效值。

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

定义 `<Tiptapify>` 组件上 `skin` 属性的内置名称：即编辑器外观的样式。

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — 经典外观：凸起的工具栏，按钮组呈凸起的方块，Vuetify 按钮的按下状态使用主色。
- `pastel` — 沉静外观：扁平着色的工具栏，幽灵按钮，轻盈的下拉菜单，柔和的对话框。

自定义皮肤可以添加名称：`registerSkin('mint', { extends: 'pastel', colors: { … } })`；`defineSkin` 是用于类型化 const 定义的恒等辅助函数。两者均从 `tiptapify` 导出。

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

令牌无法表达的结构性变体（组件标记、Vuetify 属性绑定）。造型决定应用哪些皮肤规则集；令牌则负责为它们上色。

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

每个皮肤都基于经典造型解析。解析后的造型以 `shape: ComputedRef<ResolvedShape>` 的形式暴露在 [`TiptapifyConfig`](#tiptapifyconfig) 上，因此自定义工具栏组件可以跟随它。

## TiptapifySkinColors {#tiptapifyskincolors}

皮肤颜色令牌目录：工具栏、分组、按钮、气泡菜单、下拉菜单、对话框、边框、图片以及调整手柄。每个驼峰命名的键都对应一个 `--tf-*` CSS 变量（`toolbarBg` → `--tf-toolbar-bg`）。完整的表格见[皮肤指南](/zh/guide/skins)。

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

皮肤度量令牌目录：相同区域的间距、尺寸和圆角，键到 `--tf-*` 的映射方式相同。完整的表格见[皮肤指南](/zh/guide/skins)。

## TiptapifySkinInput {#tiptapifyskininput}

`skin` 属性的完整类型：已注册的皮肤名称（字符串）或内联皮肤对象。

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

内联对象沿与已注册皮肤相同的链解析（经典 → `extends` → 自身），不会进入全局注册表，并且除非带有 `name`，否则会以类 `tiptapify-skin-inline` 渲染。其令牌会作为 `--tf-*` CSS 变量输出到编辑器根元素上。

## TiptapifyContentStyles {#tiptapifycontentstyles}

`contentStyles` 属性的类型(参见[内容样式](/zh/guide/content-styles))。

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

`upload` 属性的类型：即[上传](/zh/guide/uploads)的端点。

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

`linkPreview` 属性的类型，以及其端点所返回数据的类型（参见[链接卡片](/zh/guide/link-cards)）。

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

通过 Vue 的 `provide`/`inject` 与 `<Tiptapify>` 内的每个组件共享的编辑器级 UI 配置。在你自己的工具栏组件中可使用 [`useTiptapifyConfig`](#usetiptapifyconfig) 读取它。

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

这些值是响应式的：更改 `<Tiptapify>` 上的 `variantBtn` / `variantField` / `skin` 属性，会更新每个工具栏组件，而无需重新渲染属性。

## useTiptapifyConfig {#usetiptapifyconfig}

返回调用组件所属的 `<Tiptapify>` 实例的共享配置。适用于自定义工具栏组件（参见[自定义工具栏](/zh/examples/custom-toolbar#custom-toolbar-components)）。

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

在 `<Tiptapify>` 实例之外，该组合式函数会回退到包的默认值：`variantBtn` 为 `flat`，`variantField` 为 `solo`，以及 `default` 皮肤（经典造型，不输出令牌）。

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

## AI 类型 {#ai-types}

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

定义 `items` 属性的有效值。

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**数组格式**——项名称的扁平列表：

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**对象格式**——命名的分区：

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

通过 `editor-ready` 事件触发。

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

通过 `content-changed` 事件触发。

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

安装插件时传入的选项。

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## 重新导出 {#re-exports}

为方便构建自定义扩展，以下工具从 `@tiptap/core` 重新导出：

| 导出项            | 类别     | 来源            |
|-------------------|----------|-----------------|
| `Node`            | 类       | `@tiptap/core`  |
| `Mark`            | 类       | `@tiptap/core`  |
| `mergeAttributes` | 函数     | `@tiptap/core`  |
| `markInputRule`   | 函数     | `@tiptap/core`  |
| `markPasteRule`   | 函数     | `@tiptap/core`  |
| `CommandProps`    | 类型     | `@tiptap/core`  |
| `InputRuleMatch`  | 类型     | `@tiptap/core`  |
| `PasteRuleMatch`  | 类型     | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

来自 `@mdi/js` 的 Material Design Icons 被重新导出，用于自定义工具栏图标。

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

用于在自定义工具栏组件中读取编辑器级 UI 配置（`variantBtn`、`variantField`）的组合式函数。参见 [useTiptapifyConfig](#usetiptapifyconfig)。

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

底层的 `@tiptap/vue-3` Editor 类。

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

编辑器和对话框组件可作为具名导出直接使用。

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
