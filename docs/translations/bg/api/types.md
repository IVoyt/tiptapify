# Типове {#types}

## TiptapifyEditor {#tiptapifyeditor}

Разширен клас на Tiptap Editor с допълнителни свойства.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

Определя валидните стойности на пропъртито `variantBtn` на `<Tiptapify>`. Стойността се прилага към всеки бутон на лентата чрез споделената конфигурация на редактора (вижте [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

Определя валидните стойности на пропъртито `variantField` на `<Tiptapify>`. Стойността се прилага към падащите полета на лентата чрез споделената конфигурация на редактора (вижте [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

Определя валидните стойности на пропъртито `footerAlignment` на компонента `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

Определя имената на вградените скинове за пропъртито `skin` на компонента `<Tiptapify>`: външния вид на рамката на редактора.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — класическият вид: издигната лента с инструменти, групи бутони като издигнати кутии, бутони на Vuetify с основно състояние при натискане.
- `pastel` — спокойният вид: плоска оцветена лента с инструменти, прозрачни бутони, леки падащи менюта, меки диалози.

Собствените скинове добавят имена: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` е помощна функция за идентичност за типизирани const дефиниции. И двете се експортират от `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

Структурните варианти, които токен не може да изрази (маркиране на компоненти, свързвания на пропъртита на Vuetify). Формата определя кои набори правила на скина се прилагат; токените ги боядисват.

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

Всеки скин се разрешава върху класическата форма. Разрешената форма е достъпна като `shape: ComputedRef<ResolvedShape>` в [`TiptapifyConfig`](#tiptapifyconfig), така че собствените компоненти на лентата могат да я следват.

## TiptapifySkinColors {#tiptapifyskincolors}

Каталогът с цветови токени на скина: лента, групи, бутони, bubble менюта, падащи менюта, диалози, рамка, изображения и дръжка за преоразмеряване. Всеки camelCase ключ съответства на CSS променлива `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`). Пълната таблица е в [ръководството за скиновете](/bg/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

Каталогът с метрични токени на скина: разстояния, размери и радиуси за същите области, със същото съответствие ключ → `--tf-*`. Пълната таблица е в [ръководството за скиновете](/bg/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

Пълният тип на пропъртито `skin`: име на регистриран скин (низ) или вграден обект на скин.

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

Вграденият обект се разрешава по същата верига като регистриран скин (classic → `extends` → собствени), никога не влиза в глобалния регистър и се рендира с класа `tiptapify-skin-inline`, освен ако не носи `name`. Токените му се излъчват като CSS променливи `--tf-*` в корена на редактора.

## TiptapifyContentStyles {#tiptapifycontentstyles}

Типът на пропса `contentStyles` (вижте [Стилове на съдържанието](/bg/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

Типът на пропъртито `upload`: крайната точка на [качването на файлове](/bg/guide/uploads).

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

Типът на пропъртито `linkPreview` и на данните, с които отговаря неговата крайна точка (вижте [Карти на линкове](/bg/guide/link-cards)).

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

Конфигурация на интерфейса на ниво редактор, споделена с всеки компонент вътре в `<Tiptapify>` чрез `provide`/`inject` на Vue. Четете я в собствените си компоненти на лентата с [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Стойностите са реактивни: промяната на пропъртито `variantBtn` / `variantField` / `skin` на `<Tiptapify>` обновява всеки компонент на лентата без повторно рендиране на пропъртитата.

## useTiptapifyConfig {#usetiptapifyconfig}

Връща споделената конфигурация на екземпляра на `<Tiptapify>`, към който принадлежи извикващият компонент. Предназначена е за собствени компоненти на лентата (вижте [Собствена лента с инструменти](/bg/examples/custom-toolbar#custom-toolbar-components)).

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

Извън екземпляр на `<Tiptapify>` composable-ът се връща към стойностите по подразбиране на пакета: `variantBtn` `flat`, `variantField` `solo` и скина `default` (класическа форма, без излъчвани токени).

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

## AI типове {#ai-types}

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

Определя валидните стойности на пропъртито `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Формат масив** — плосък списък с имена на елементи:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Формат обект** — именувани секции:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

Излъчва се чрез събитието `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

Излъчва се чрез събитието `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

Опции, подавани при инсталиране на плъгина.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Реекспорти {#re-exports}

Следните помощни средства се реекспортират от `@tiptap/core` за удобство при изграждане на собствени разширения:

| Експорт           | Вид      | Източник        |
|-------------------|----------|-----------------|
| `Node`            | Клас     | `@tiptap/core`  |
| `Mark`            | Клас     | `@tiptap/core`  |
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

Material Design Icons от `@mdi/js` се реекспортират за персонализиране на иконите в лентата.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable за четене на конфигурацията на интерфейса на ниво редактор (`variantBtn`, `variantField`) от собствени компоненти на лентата. Вижте [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

Основният клас Editor от `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

Компонентите на редактора и диалога са налични като именувани експорти за директна употреба.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
