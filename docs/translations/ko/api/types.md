# 타입 {#types}

## TiptapifyEditor {#tiptapifyeditor}

추가 속성을 갖춘 확장된 Tiptap Editor 클래스입니다.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

`<Tiptapify>`의 `variantBtn` prop에 허용되는 값을 정의합니다. 이 값은 에디터의 공유 설정을 통해 모든 툴바 버튼에 적용됩니다([`useTiptapifyConfig`](#usetiptapifyconfig) 참고).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

`<Tiptapify>`의 `variantField` prop에 허용되는 값을 정의합니다. 이 값은 에디터의 공유 설정을 통해 툴바 드롭다운 필드에 적용됩니다([`useTiptapifyConfig`](#usetiptapifyconfig) 참고).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

`<Tiptapify>` 컴포넌트의 `footerAlignment` prop에 허용되는 값을 정의합니다.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

`<Tiptapify>` 컴포넌트의 `skin` prop에 사용하는 내장 이름, 즉 에디터 UI의 외관을 정의합니다.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — 클래식한 모습: 도드라진 툴바, 도드라진 상자 형태의 버튼 그룹, 눌림 상태에 기본 색상을 쓰는 Vuetify 버튼.
- `pastel` — 차분한 모습: 평평하고 색조가 들어간 툴바, 고스트 버튼, 가벼운 드롭다운, 부드러운 대화상자.

커스텀 스킨은 이름을 추가합니다: `registerSkin('mint', { extends: 'pastel', colors: { … } })`. `defineSkin`은 타입이 지정된 const 정의를 위한 항등 헬퍼입니다. 둘 다 `tiptapify`에서 내보냅니다.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

토큰으로는 표현할 수 없는 구조적 변형(컴포넌트 마크업, Vuetify prop 바인딩)입니다. shape는 어떤 스킨 규칙 집합이 적용될지 결정하고, 토큰은 그 규칙에 색과 크기를 입힙니다.

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

모든 스킨은 클래식 shape를 기준으로 해석됩니다. 해석된 shape는 [`TiptapifyConfig`](#tiptapifyconfig)의 `shape: ComputedRef<ResolvedShape>`로 노출되므로 커스텀 툴바 컴포넌트가 이를 따를 수 있습니다.

## TiptapifySkinColors {#tiptapifyskincolors}

스킨 색상 토큰의 카탈로그입니다: 툴바, 그룹, 버튼, 버블 메뉴, 드롭다운, 대화상자, 프레임, 이미지, 크기 조절 핸들. 각 camelCase 키는 `--tf-*` CSS 변수에 대응합니다(`toolbarBg` → `--tf-toolbar-bg`). 전체 표는 [스킨 가이드](/ko/guide/skins)에 있습니다.

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

스킨 크기 토큰의 카탈로그입니다: 같은 영역의 여백, 크기, 모서리 반경이며 키 → `--tf-*` 대응 규칙도 같습니다. 전체 표는 [스킨 가이드](/ko/guide/skins)에 있습니다.

## TiptapifySkinInput {#tiptapifyskininput}

`skin` prop의 전체 타입입니다: 등록된 스킨 이름(문자열) 또는 인라인 스킨 객체.

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

인라인 객체는 등록된 스킨과 같은 체인(클래식 → `extends` → 자체 값)으로 해석되며 전역 레지스트리에는 등록되지 않고, `name`이 없으면 `tiptapify-skin-inline` 클래스로 렌더링됩니다. 토큰은 에디터 루트의 `--tf-*` CSS 변수로 출력됩니다.

## TiptapifyContentStyles {#tiptapifycontentstyles}

`contentStyles` prop의 타입입니다([콘텐츠 스타일](/ko/guide/content-styles) 참고).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

`upload` prop의 타입으로, [업로드](/ko/guide/uploads) 엔드포인트를 나타냅니다.

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

`linkPreview` prop과 해당 엔드포인트가 응답하는 데이터의 타입입니다([링크 카드](/ko/guide/link-cards) 참고).

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

Vue `provide`/`inject`를 통해 `<Tiptapify>` 내부의 모든 컴포넌트와 공유되는 에디터 수준의 UI 설정입니다. 직접 만든 툴바 컴포넌트에서는 [`useTiptapifyConfig`](#usetiptapifyconfig)로 읽을 수 있습니다.

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

값은 반응형입니다. `<Tiptapify>`의 `variantBtn` / `variantField` / `skin` prop을 바꾸면 props를 다시 렌더링하지 않고도 모든 툴바 컴포넌트가 갱신됩니다.

## useTiptapifyConfig {#usetiptapifyconfig}

호출한 컴포넌트가 속한 `<Tiptapify>` 인스턴스의 공유 설정을 반환합니다. 커스텀 툴바 컴포넌트용입니다([커스텀 툴바](/ko/examples/custom-toolbar#custom-toolbar-components) 참고).

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

`<Tiptapify>` 인스턴스 밖에서는 이 컴포저블이 패키지 기본값을 반환합니다: `variantBtn`은 `flat`, `variantField`는 `solo`, 스킨은 `default`(클래식 shape, 출력되는 토큰 없음)입니다.

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

## AI 타입 {#ai-types}

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

`items` prop에 허용되는 값을 정의합니다.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**배열 형식** — 항목 이름의 평면 목록:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**객체 형식** — 이름이 있는 섹션:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

`editor-ready` 이벤트로 발행됩니다.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

`content-changed` 이벤트로 발행됩니다.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

플러그인을 설치할 때 전달하는 옵션입니다.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## 재내보내기(Re-exports) {#re-exports}

커스텀 확장을 만들 때 편리하도록 다음 유틸리티를 `@tiptap/core`에서 다시 내보냅니다.

| 내보내기          | 종류     | 출처            |
|-------------------|----------|-----------------|
| `Node`            | 클래스   | `@tiptap/core`  |
| `Mark`            | 클래스   | `@tiptap/core`  |
| `mergeAttributes` | 함수     | `@tiptap/core`  |
| `markInputRule`   | 함수     | `@tiptap/core`  |
| `markPasteRule`   | 함수     | `@tiptap/core`  |
| `CommandProps`    | 타입     | `@tiptap/core`  |
| `InputRuleMatch`  | 타입     | `@tiptap/core`  |
| `PasteRuleMatch`  | 타입     | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

툴바 아이콘 커스터마이징을 위해 `@mdi/js`의 Material Design Icons를 다시 내보냅니다.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

커스텀 툴바 컴포넌트에서 에디터 수준의 UI 설정(`variantBtn`, `variantField`)을 읽기 위한 컴포저블입니다. [useTiptapifyConfig](#usetiptapifyconfig)를 참고하세요.

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

기반이 되는 `@tiptap/vue-3`의 Editor 클래스입니다.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

에디터와 대화상자 컴포넌트는 이름 있는 export로 직접 사용할 수 있습니다.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
