# Types {#types}

## TiptapifyEditor {#tiptapifyeditor}

Lớp Tiptap Editor mở rộng với các thuộc tính bổ sung.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Xác định các giá trị hợp lệ cho prop `variantBtn` trên `<Tiptapify>`. Giá trị được áp dụng cho mọi nút thanh công cụ thông qua cấu hình dùng chung của trình soạn thảo (xem [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Xác định các giá trị hợp lệ cho prop `variantField` trên `<Tiptapify>`. Giá trị được áp dụng cho các trường dropdown của thanh công cụ thông qua cấu hình dùng chung của trình soạn thảo (xem [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Xác định các giá trị hợp lệ cho prop `footerAlignment` trên thành phần `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Xác định các tên có sẵn cho prop `skin` trên thành phần `<Tiptapify>`: diện mạo phần khung của trình soạn thảo.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — diện mạo cổ điển: thanh công cụ nổi, các nhóm nút dạng hộp nổi, nút Vuetify có trạng thái nhấn dùng màu chính.
- `pastel` — diện mạo nhẹ nhàng: thanh công cụ phẳng phủ sắc nhạt, nút ghost, danh sách thả xuống nhẹ, hộp thoại mềm mại.

Các skin tùy chỉnh thêm tên mới: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` là hàm trợ giúp identity cho các định nghĩa const có kiểu. Cả hai đều được xuất từ `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Các biến thể cấu trúc mà token không thể diễn đạt (markup của thành phần, các binding prop của Vuetify). Shape quyết định bộ quy tắc skin nào được áp dụng; các token tô màu cho chúng.

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

Mọi skin đều được phân giải trên shape classic. Shape đã phân giải được hiển thị dưới dạng `shape: ComputedRef<ResolvedShape>` trên [`TiptapifyConfig`](#tiptapifyconfig), để các thành phần thanh công cụ tùy chỉnh có thể theo nó.

## TiptapifySkinColors {#tiptapifyskincolors}

Danh mục các token màu của skin: thanh công cụ, nhóm, nút, bubble menu, dropdown, hộp thoại, khung, hình ảnh và tay nắm thay đổi kích thước. Mỗi khóa camelCase ánh xạ tới một biến CSS `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). Bảng đầy đủ nằm trong [hướng dẫn Skin](/vi/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Danh mục các token số đo của skin: khoảng cách, kích thước và bán kính bo góc cho cùng các vùng, với cùng cách ánh xạ khóa → `--tf-*`. Bảng đầy đủ nằm trong [hướng dẫn Skin](/vi/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Kiểu đầy đủ của prop `skin`: tên skin đã đăng ký (chuỗi) hoặc một đối tượng skin nội tuyến.

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

Đối tượng nội tuyến được phân giải qua cùng một chuỗi như skin đã đăng ký (classic → `extends` → của chính nó), không bao giờ vào registry toàn cục, và được render với class `tiptapify-skin-inline` trừ khi nó có `name`. Các token của nó được phát ra dưới dạng biến CSS `--tf-*` trên phần tử gốc của trình soạn thảo.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Kiểu của prop `contentStyles` (xem [Kiểu nội dung](/vi/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Kiểu của prop `upload`: endpoint của [tải lên](/vi/guide/uploads).

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

Kiểu của prop `linkPreview` và của dữ liệu mà endpoint của nó trả lời (xem [Thẻ liên kết](/vi/guide/link-cards)).

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

Cấu hình giao diện cấp trình soạn thảo, được chia sẻ với mọi thành phần bên trong `<Tiptapify>` qua `provide`/`inject` của Vue. Đọc nó trong các thành phần thanh công cụ của riêng bạn bằng [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Các giá trị có tính phản ứng: thay đổi prop `variantBtn` / `variantField` / `skin` trên `<Tiptapify>` sẽ cập nhật mọi thành phần thanh công cụ mà không cần render lại props.

## useTiptapifyConfig {#usetiptapifyconfig}

Trả về cấu hình dùng chung của instance `<Tiptapify>` mà thành phần gọi nó thuộc về. Dành cho các thành phần thanh công cụ tùy chỉnh (xem [Thanh công cụ tùy chỉnh](/vi/examples/custom-toolbar#custom-toolbar-components)).

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

Bên ngoài một instance `<Tiptapify>`, composable quay về giá trị mặc định của gói: `variantBtn` là `flat`, `variantField` là `solo`, và skin `default` (shape classic, không phát token).

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

## Các kiểu AI {#ai-types}

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

Xác định các giá trị hợp lệ cho prop `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Định dạng mảng** — danh sách phẳng các tên mục:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Định dạng đối tượng** — các nhóm có tên:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Được phát qua sự kiện `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Được phát qua sự kiện `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Các tùy chọn được truyền khi cài đặt plugin.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Xuất lại (Re-exports) {#re-exports}

Các tiện ích sau được xuất lại từ `@tiptap/core` để thuận tiện khi xây dựng các extension tùy chỉnh:

| Export            | Loại     | Nguồn           |
|-------------------|----------|-----------------|
| `Node`            | Class    | `@tiptap/core`  |
| `Mark`            | Class    | `@tiptap/core`  |
| `mergeAttributes` | Hàm      | `@tiptap/core`  |
| `markInputRule`   | Hàm      | `@tiptap/core`  |
| `markPasteRule`   | Hàm      | `@tiptap/core`  |
| `CommandProps`    | Kiểu     | `@tiptap/core`  |
| `InputRuleMatch`  | Kiểu     | `@tiptap/core`  |
| `PasteRuleMatch`  | Kiểu     | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Material Design Icons từ `@mdi/js` được xuất lại để tùy biến biểu tượng thanh công cụ.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable để đọc cấu hình giao diện cấp trình soạn thảo (`variantBtn`, `variantField`) từ các thành phần thanh công cụ tùy chỉnh. Xem [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Class Editor nền tảng của `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Thành phần trình soạn thảo và hộp thoại có sẵn dưới dạng named export để dùng trực tiếp.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
