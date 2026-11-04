# Типы {#types}

## TiptapifyEditor {#tiptapifyeditor}

Расширенный класс Tiptap Editor с дополнительными свойствами.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Определяет допустимые значения prop `variantBtn` у `<Tiptapify>`. Значение применяется ко всем кнопкам панели инструментов через общую конфигурацию редактора (см. [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Определяет допустимые значения prop `variantField` у `<Tiptapify>`. Значение применяется к выпадающим полям панели инструментов через общую конфигурацию редактора (см. [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Определяет допустимые значения prop `footerAlignment` компонента `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Определяет встроенные имена для prop `skin` компонента `<Tiptapify>`: внешний вид оболочки редактора.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — классический вид: приподнятая панель инструментов, группы кнопок как приподнятые блоки, кнопки Vuetify с основным цветом для нажатого состояния.
- `pastel` — спокойный вид: плоская тонированная панель инструментов, «призрачные» кнопки, лёгкие выпадающие списки, мягкие диалоги.

Собственные скины добавляют имена: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` — вспомогательная identity-функция для типизированных const-определений. Обе экспортируются из `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Структурные варианты, которые токен выразить не может (разметка компонентов, привязки props Vuetify). Форма определяет, какие наборы правил скина применяются; токены их окрашивают.

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

Каждый скин разрешается поверх классической формы. Разрешённая форма доступна как `shape: ComputedRef<ResolvedShape>` в [`TiptapifyConfig`](#tiptapifyconfig), поэтому пользовательские компоненты панели инструментов могут ей следовать.

## TiptapifySkinColors {#tiptapifyskincolors}

Каталог цветовых токенов скина: панель инструментов, группы, кнопки, bubble-меню, выпадающие списки, диалоги, рамка, изображения и маркер изменения размера. Каждый ключ в camelCase соответствует CSS-переменной `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). Полная таблица приведена в [руководстве по скинам](/ru/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Каталог метрических токенов скина: отступы, размеры и радиусы для тех же областей с тем же соответствием ключ → `--tf-*`. Полная таблица приведена в [руководстве по скинам](/ru/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Полный тип prop `skin`: имя зарегистрированного скина (строка) или объект инлайн-скина.

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

Инлайн-объект разрешается по той же цепочке, что и зарегистрированный скин (classic → `extends` → собственный), никогда не попадает в глобальный реестр и отображается с классом `tiptapify-skin-inline`, если у него нет `name`. Его токены выводятся как CSS-переменные `--tf-*` в корневом элементе редактора.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Тип пропа `contentStyles` (см. [Стили содержимого](/ru/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Тип prop `upload`: endpoint для [загрузки файлов](/ru/guide/uploads).

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

Тип prop `linkPreview` и данных, которыми отвечает его endpoint (см. [Карточки ссылок](/ru/guide/link-cards)).

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

Конфигурация UI уровня редактора, общая для всех компонентов внутри `<Tiptapify>` через Vue `provide`/`inject`. Читайте её в собственных компонентах панели инструментов с помощью [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Значения реактивны: изменение prop `variantBtn` / `variantField` / `skin` у `<Tiptapify>` обновляет все компоненты панели инструментов без повторной отрисовки props.

## useTiptapifyConfig {#usetiptapifyconfig}

Возвращает общую конфигурацию экземпляра `<Tiptapify>`, которому принадлежит вызывающий компонент. Предназначена для пользовательских компонентов панели инструментов (см. [Своя панель инструментов](/ru/examples/custom-toolbar#custom-toolbar-components)).

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

Вне экземпляра `<Tiptapify>` composable возвращается к значениям пакета по умолчанию: `variantBtn` — `flat`, `variantField` — `solo` и скин `default` (классическая форма, без выводимых токенов).

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

## Типы AI {#ai-types}

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

Определяет допустимые значения prop `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Формат массива** — плоский список имён элементов:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Формат объекта** — именованные секции:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Передаётся через событие `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Передаётся через событие `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Параметры, передаваемые при установке плагина.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Реэкспорты {#re-exports}

Следующие утилиты реэкспортируются из `@tiptap/core` для удобства при создании собственных расширений:

| Экспорт           | Вид      | Источник        |
|-------------------|----------|-----------------|
| `Node`            | Класс    | `@tiptap/core`  |
| `Mark`            | Класс    | `@tiptap/core`  |
| `mergeAttributes` | Функция  | `@tiptap/core`  |
| `markInputRule`   | Функция  | `@tiptap/core`  |
| `markPasteRule`   | Функция  | `@tiptap/core`  |
| `CommandProps`    | Тип      | `@tiptap/core`  |
| `InputRuleMatch`  | Тип      | `@tiptap/core`  |
| `PasteRuleMatch`  | Тип      | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Иконки Material Design из `@mdi/js` реэкспортируются для настройки иконок панели инструментов.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable для чтения конфигурации UI уровня редактора (`variantBtn`, `variantField`) из пользовательских компонентов панели инструментов. См. [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Базовый класс Editor из `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Компоненты редактора и диалога доступны как именованные экспорты для прямого использования.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
