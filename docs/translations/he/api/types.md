# טיפוסים {#types}

## TiptapifyEditor {#tiptapifyeditor}

מחלקת העורך של Tiptap, מורחבת עם מאפיינים נוספים.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

מגדיר את הערכים התקפים ל-prop‏ `variantBtn` של `<Tiptapify>`. הערך מוחל על כל כפתור בסרגל הכלים דרך התצורה המשותפת של העורך (ראו [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

מגדיר את הערכים התקפים ל-prop‏ `variantField` של `<Tiptapify>`. הערך מוחל על שדות הרשימה הנפתחת בסרגל הכלים דרך התצורה המשותפת של העורך (ראו [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

מגדיר את הערכים התקפים ל-prop‏ `footerAlignment` ברכיב `<Tiptapify>`.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

מגדיר את השמות המובנים ל-prop‏ `skin` ברכיב `<Tiptapify>`: המראה של מעטפת העורך.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — המראה הקלאסי: סרגל כלים מורם, קבוצות כפתורים כקופסאות מורמות, כפתורי Vuetify עם מצב לחוץ בצבע ראשי.
- `pastel` — המראה השקט: סרגל כלים שטוח בגוון עדין, כפתורי רפאים, תפריטים נפתחים קלים, דיאלוגים רכים.

skins מותאמים אישית מוסיפים שמות: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; ‏`defineSkin` הוא פונקציית זהות להגדרות const עם טיפוסים. שתיהן מיוצאות מ-`tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

הווריאנטים המבניים שטוקן אינו יכול לבטא (סימון הרכיב, קישורי props של Vuetify). הצורה (shape) קובעת אילו כללי skin חלים; הטוקנים צובעים אותם.

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

כל skin נפתר מעל הצורה הקלאסית. הצורה שנפתרה נחשפת כ-`shape: ComputedRef<ResolvedShape>` ב-[`TiptapifyConfig`](#tiptapifyconfig), כך שרכיבי סרגל כלים מותאמים אישית יכולים לעקוב אחריה.

## TiptapifySkinColors {#tiptapifyskincolors}

קטלוג טוקני הצבע של ה-skin: סרגל הכלים, קבוצות, כפתורים, תפריטי בועה, רשימות נפתחות, דיאלוגים, מסגרת, תמונות וידית שינוי הגודל. כל מפתח ב-camelCase ממופה למשתנה CSS מסוג `--tf-*` ‏(`toolbarBg` → `--tf-toolbar-bg`). הטבלה המלאה מופיעה ב[מדריך ה-Skins](/he/guide/skins).

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

קטלוג טוקני המידות של ה-skin: ריווחים, גדלים ורדיוסים לאותם אזורים, עם אותה מיפוי של מפתח → `--tf-*`. הטבלה המלאה מופיעה ב[מדריך ה-Skins](/he/guide/skins).

## TiptapifySkinInput {#tiptapifyskininput}

הטיפוס המלא של ה-prop‏ `skin`: שם של skin רשום (מחרוזת) או אובייקט skin מוטבע.

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

אובייקט מוטבע נפתר באותה שרשרת כמו skin רשום (קלאסי → `extends` → משלו), אינו נכנס לרישום הגלובלי, ומוצג תחת המחלקה `tiptapify-skin-inline` אלא אם יש לו `name`. הטוקנים שלו נפלטים כמשתני CSS מסוג `--tf-*` על שורש העורך.

## TiptapifyContentStyles {#tiptapifycontentstyles}

הטיפוס של ה-prop‏ `contentStyles` (ראו [סגנונות תוכן](/he/guide/content-styles)).

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

הטיפוס של ה-prop‏ `upload`: נקודת הקצה של [העלאות](/he/guide/uploads).

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

הטיפוס של ה-prop‏ `linkPreview` ושל הנתונים שנקודת הקצה שלו מחזירה (ראו [כרטיסי קישור](/he/guide/link-cards)).

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

תצורת ממשק ברמת העורך, המשותפת לכל רכיב בתוך `<Tiptapify>` דרך `provide`/`inject` של Vue. קראו אותה ברכיבי סרגל הכלים שלכם באמצעות [`useTiptapifyConfig`](#usetiptapifyconfig).

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

הערכים ריאקטיביים: שינוי ה-prop‏ `variantBtn` / `variantField` / `skin` ב-`<Tiptapify>` מעדכן כל רכיב בסרגל הכלים בלי רינדור מחדש של ה-props.

## useTiptapifyConfig {#usetiptapifyconfig}

מחזיר את התצורה המשותפת של מופע `<Tiptapify>` שאליו שייך הרכיב הקורא. מיועד לרכיבי סרגל כלים מותאמים אישית (ראו [סרגל כלים מותאם אישית](/he/examples/custom-toolbar#custom-toolbar-components)).

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

מחוץ למופע `<Tiptapify>` ה-composable חוזר לברירות המחדל של החבילה: `variantBtn` ‏`flat`, ‏`variantField` ‏`solo`, ו-skin‏ `default` (צורה קלאסית, בלי טוקנים נפלטים).

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

## טיפוסי AI {#ai-types}

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

מגדיר את הערכים התקפים ל-prop‏ `items`.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**פורמט מערך** — רשימה שטוחה של שמות פריטים:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**פורמט אובייקט** — מקטעים בעלי שמות:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

נפלט דרך האירוע `editor-ready`.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

נפלט דרך האירוע `content-changed`.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

אפשרויות שמועברות בעת התקנת התוסף.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## ייצוא מחדש {#re-exports}

הכלים הבאים מיוצאים מחדש מ-`@tiptap/core` לנוחות בבניית תוספים מותאמים אישית:

| ייצוא             | סוג      | מקור            |
|-------------------|----------|-----------------|
| `Node`            | מחלקה    | `@tiptap/core`  |
| `Mark`            | מחלקה    | `@tiptap/core`  |
| `mergeAttributes` | פונקציה  | `@tiptap/core`  |
| `markInputRule`   | פונקציה  | `@tiptap/core`  |
| `markPasteRule`   | פונקציה  | `@tiptap/core`  |
| `CommandProps`    | טיפוס    | `@tiptap/core`  |
| `InputRuleMatch`  | טיפוס    | `@tiptap/core`  |
| `PasteRuleMatch`  | טיפוס    | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

Material Design Icons מ-`@mdi/js` מיוצאים מחדש להתאמה אישית של אייקוני סרגל הכלים.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

Composable לקריאת תצורת הממשק ברמת העורך (`variantBtn`, `variantField`) מרכיבי סרגל כלים מותאמים אישית. ראו [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

מחלקת העורך הבסיסית של `@tiptap/vue-3`.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

רכיבי העורך והדיאלוג זמינים כייצואים בעלי שם לשימוש ישיר.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
