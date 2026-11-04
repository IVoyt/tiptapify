# الأنواع {#types}

## TiptapifyEditor {#tiptapifyeditor}

صنف Tiptap Editor الموسَّع بخصائص إضافية.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

يحدد القيم الصالحة للخاصية `variantBtn` في `<Tiptapify>`. تُطبَّق القيمة على كل زر في شريط الأدوات عبر الإعدادات المشتركة للمحرر (راجع [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

يحدد القيم الصالحة للخاصية `variantField` في `<Tiptapify>`. تُطبَّق القيمة على حقول القوائم المنسدلة في شريط الأدوات عبر الإعدادات المشتركة للمحرر (راجع [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

يحدد القيم الصالحة للخاصية `footerAlignment` في المكوّن `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

يحدد الأسماء المدمجة للخاصية `skin` في المكوّن `<Tiptapify>`: مظهر واجهة المحرر.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — المظهر الكلاسيكي: شريط أدوات بارز، ومجموعات أزرار على شكل صناديق بارزة، وأزرار Vuetify بحالة ضغط بلون أساسي.
- `pastel` — المظهر الهادئ: شريط أدوات مسطّح بلون خفيف، وأزرار شبحية، وقوائم منسدلة خفيفة، وحوارات ناعمة.

تضيف السمات المخصصة أسماء جديدة: `registerSkin('mint', { extends: 'pastel', colors: { … } })`؛ أما `defineSkin` فهي دالة مساعدة تعيد ما تُمرَّر به لتعريف ثوابت مكتوبة الأنواع. وكلتاهما مصدَّرتان من `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

المتغيرات البنيوية التي لا يستطيع الرمز (token) التعبير عنها (بنية المكوّنات وربط خصائص Vuetify). يحدد الشكل مجموعات قواعد السمة التي تُطبَّق، وتتولى الرموز تلوينها.

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

تُحلَّل كل سمة فوق الشكل الكلاسيكي. ويُكشف الشكل المحلَّل في `shape: ComputedRef<ResolvedShape>` ضمن [`TiptapifyConfig`](#tiptapifyconfig)، فيمكن لمكوّنات شريط الأدوات المخصصة اتباعه.

## TiptapifySkinColors {#tiptapifyskincolors}

كتالوج رموز ألوان السمة: شريط الأدوات والمجموعات والأزرار وقوائم الفقاعة والقوائم المنسدلة والنوافذ الحوارية والإطار والصور ومقبض تغيير الحجم. يُقابل كل مفتاح بصيغة camelCase متغير CSS من نوع `--tf-*` (`toolbarBg` ← `--tf-toolbar-bg`). يوجد الجدول الكامل في [دليل السمات](/ar/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

كتالوج رموز قياسات السمة: المسافات والأحجام وأنصاف الأقطار للمناطق نفسها، بالتقابل نفسه بين المفتاح و`--tf-*`. يوجد الجدول الكامل في [دليل السمات](/ar/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

النوع الكامل للخاصية `skin`: اسم سمة مسجّلة (نص) أو كائن سمة مضمّن.

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

يُحلَّل الكائن المضمّن عبر سلسلة التحليل نفسها للسمة المسجّلة (الكلاسيكية ← `extends` ← الخاصة به)، ولا يدخل السجل العام أبدًا، ويُعرض بالفئة `tiptapify-skin-inline` ما لم يحمل `name`. وتُصدَر رموزه كمتغيرات CSS من نوع `--tf-*` على جذر المحرر.

## TiptapifyContentStyles {#tiptapifycontentstyles}

نوع الخاصية `contentStyles` (انظر [أنماط المحتوى](/ar/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

نوع الخاصية `upload`: نقطة نهاية [الرفع](/ar/guide/uploads).

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

نوع الخاصية `linkPreview` وبيانات الردّ من نقطة نهايتها (راجع [بطاقات الروابط](/ar/guide/link-cards)).

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

إعدادات الواجهة على مستوى المحرر، تُشارَك مع كل مكوّن داخل `<Tiptapify>` عبر `provide`/`inject` في Vue. اقرأها في مكوّنات شريط الأدوات الخاصة بك باستخدام [`useTiptapifyConfig`](#usetiptapifyconfig).

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

القيم تفاعلية: فتغيير الخاصية `variantBtn` / `variantField` / `skin` في `<Tiptapify>` يحدّث كل مكوّنات شريط الأدوات دون إعادة تمرير الخصائص.

## useTiptapifyConfig {#usetiptapifyconfig}

تُرجع الإعدادات المشتركة لنسخة `<Tiptapify>` التي ينتمي إليها المكوّن المستدعي. وهي مخصصة لمكوّنات شريط الأدوات المخصصة (راجع [شريط أدوات مخصص](/ar/examples/custom-toolbar#custom-toolbar-components)).

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

خارج نسخة `<Tiptapify>` تعود هذه الدالة المركّبة (composable) إلى القيم الافتراضية للحزمة: `variantBtn` بقيمة `flat`، و`variantField` بقيمة `solo`، والسمة `default` (الشكل الكلاسيكي، دون رموز مُصدَرة).

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

## أنواع الذكاء الاصطناعي {#ai-types}

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

يحدد القيم الصالحة للخاصية `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**صيغة المصفوفة** — قائمة مسطحة بأسماء العناصر:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**صيغة الكائن** — أقسام مسمّاة:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

يُصدَر عبر الحدث `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

يُصدَر عبر الحدث `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

الخيارات التي تُمرَّر عند تثبيت الإضافة.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## إعادة التصدير {#re-exports}

تُعاد تصدير الأدوات التالية من `@tiptap/core` للتسهيل عند بناء امتدادات مخصصة:

| التصدير           | النوع    | المصدر          |
|-------------------|----------|-----------------|
| `Node`            | صنف      | `@tiptap/core`  |
| `Mark`            | صنف      | `@tiptap/core`  |
| `mergeAttributes` | دالة     | `@tiptap/core`  |
| `markInputRule`   | دالة     | `@tiptap/core`  |
| `markPasteRule`   | دالة     | `@tiptap/core`  |
| `CommandProps`    | نوع      | `@tiptap/core`  |
| `InputRuleMatch`  | نوع      | `@tiptap/core`  |
| `PasteRuleMatch`  | نوع      | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

أيقونات Material Design من `@mdi/js` معاد تصديرها لتخصيص أيقونات شريط الأدوات.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

دالة مركّبة (composable) لقراءة إعدادات الواجهة على مستوى المحرر (`variantBtn` و`variantField`) من مكوّنات شريط الأدوات المخصصة. راجع [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

صنف Editor الأساسي من `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

مكوّنا المحرر والنافذة الحوارية متاحان كتصديرات مسمّاة للاستخدام المباشر.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
