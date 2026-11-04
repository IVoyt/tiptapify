# Типи {#types}

## TiptapifyEditor {#tiptapifyeditor}

Розширений клас Tiptap Editor з додатковими властивостями.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Визначає допустимі значення пропа `variantBtn` для `<Tiptapify>`. Значення застосовується до кожної кнопки панелі інструментів через спільну конфігурацію редактора (див. [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Визначає допустимі значення пропа `variantField` для `<Tiptapify>`. Значення застосовується до випадних полів панелі інструментів через спільну конфігурацію редактора (див. [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Визначає допустимі значення пропа `footerAlignment` компонента `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Визначає вбудовані назви для пропа `skin` компонента `<Tiptapify>`: вигляд оболонки редактора.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — класичний вигляд: піднятий тулбар, групи кнопок як підняті блоки, кнопки Vuetify з основним кольором для натиснутого стану.
- `pastel` — тихий вигляд: плаский тонований тулбар, «примарні» кнопки, легкі випадні списки, м'які діалоги.

Власні скіни додають назви: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` — допоміжна функція-тотожність для типізованих const-визначень. Обидві експортуються з `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Структурні варіанти, які токен виразити не може (розмітка компонентів, прив'язки пропів Vuetify). Форма визначає, які набори правил скіну застосовуються; токени їх малюють.

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

Кожен скін розв'язується поверх класичної форми. Розв'язана форма доступна як `shape: ComputedRef<ResolvedShape>` у [`TiptapifyConfig`](#tiptapifyconfig), тож власні компоненти панелі інструментів можуть їй слідувати.

## TiptapifySkinColors {#tiptapifyskincolors}

Каталог кольорових токенів скіну: панель інструментів, групи, кнопки, bubble-меню, випадні списки, діалоги, рамка, зображення та маркер зміни розміру. Кожен ключ у camelCase відповідає CSS-змінній `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). Повна таблиця є в [посібнику зі скінів](/uk/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Каталог метричних токенів скіну: відступи, розміри та радіуси для тих самих областей, з тим самим відображенням ключ → `--tf-*`. Повна таблиця є в [посібнику зі скінів](/uk/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Повний тип пропа `skin`: назва зареєстрованого скіну (рядок) або inline-об'єкт скіну.

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

Inline-об'єкт розв'язується тим самим ланцюжком, що й зареєстрований скін (classic → `extends` → власний), ніколи не потрапляє до глобального реєстру та рендериться з класом `tiptapify-skin-inline`, якщо не має `name`. Його токени виводяться як CSS-змінні `--tf-*` на корені редактора.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Тип пропа `contentStyles` (див. [Стилі вмісту](/uk/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Тип пропа `upload`: endpoint [завантаження файлів](/uk/guide/uploads).

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

Тип пропа `linkPreview` і даних, якими відповідає його endpoint (див. [Картки посилань](/uk/guide/link-cards)).

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

Конфігурація UI рівня редактора, яку спільно використовує кожен компонент усередині `<Tiptapify>` через Vue `provide`/`inject`. Читайте її у власних компонентах панелі інструментів за допомогою [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Значення реактивні: зміна пропа `variantBtn` / `variantField` / `skin` у `<Tiptapify>` оновлює кожен компонент панелі інструментів без повторного рендерингу пропів.

## useTiptapifyConfig {#usetiptapifyconfig}

Повертає спільну конфігурацію екземпляра `<Tiptapify>`, до якого належить компонент-виклик. Призначено для власних компонентів панелі інструментів (див. [Власна панель інструментів](/uk/examples/custom-toolbar#custom-toolbar-components)).

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

Поза екземпляром `<Tiptapify>` композабл повертається до значень пакета за замовчуванням: `variantBtn` `flat`, `variantField` `solo` і скін `default` (класична форма, без виведених токенів).

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

## Типи AI {#ai-types}

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

Визначає допустимі значення пропа `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Формат масиву** — плаский список назв елементів:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Формат об'єкта** — іменовані секції:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Передається через подію `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Передається через подію `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Параметри, що передаються під час встановлення плагіна.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Реекспорти {#re-exports}

Наведені нижче утиліти реекспортуються з `@tiptap/core` для зручності під час створення власних розширень:

| Експорт           | Вид      | Джерело         |
|-------------------|----------|-----------------|
| `Node`            | Клас     | `@tiptap/core`  |
| `Mark`            | Клас     | `@tiptap/core`  |
| `mergeAttributes` | Функція  | `@tiptap/core`  |
| `markInputRule`   | Функція  | `@tiptap/core`  |
| `markPasteRule`   | Функція  | `@tiptap/core`  |
| `CommandProps`    | Тип      | `@tiptap/core`  |
| `InputRuleMatch`  | Тип      | `@tiptap/core`  |
| `PasteRuleMatch`  | Тип      | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Material Design Icons з `@mdi/js` реекспортуються для налаштування іконок панелі інструментів.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Композабл для читання конфігурації UI рівня редактора (`variantBtn`, `variantField`) із власних компонентів панелі інструментів. Див. [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Базовий клас Editor із `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Компоненти редактора й діалогу доступні як іменовані експорти для безпосереднього використання.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
