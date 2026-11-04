# ไทป์ {#types}

## TiptapifyEditor {#tiptapifyeditor}

คลาส Tiptap Editor ที่ขยายเพิ่มคุณสมบัติ

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

กำหนดค่าที่ใช้ได้สำหรับ prop `variantBtn` บน `<Tiptapify>` ค่านี้จะถูกนำไปใช้กับทุกปุ่มบนแถบเครื่องมือผ่านคอนฟิกที่เอดิเตอร์ใช้ร่วมกัน (ดู [`useTiptapifyConfig`](#usetiptapifyconfig))

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

กำหนดค่าที่ใช้ได้สำหรับ prop `variantField` บน `<Tiptapify>` ค่านี้จะถูกนำไปใช้กับช่องดรอปดาวน์บนแถบเครื่องมือผ่านคอนฟิกที่เอดิเตอร์ใช้ร่วมกัน (ดู [`useTiptapifyConfig`](#usetiptapifyconfig))

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

กำหนดค่าที่ใช้ได้สำหรับ prop `footerAlignment` บนคอมโพเนนต์ `<Tiptapify>`

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

กำหนดชื่อสกินที่มีในตัวสำหรับ prop `skin` บนคอมโพเนนต์ `<Tiptapify>` ซึ่งเป็นรูปลักษณ์ของส่วนประกอบรอบเอดิเตอร์

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — หน้าตาแบบคลาสสิก: แถบเครื่องมือแบบนูน กลุ่มปุ่มเป็นกล่องนูน ปุ่มของ Vuetify ที่ใช้สีหลักในสถานะกด
- `pastel` — หน้าตาแบบสงบ: แถบเครื่องมือแบนที่ลงสีอ่อน ปุ่มแบบ ghost ดรอปดาวน์แบบเบา กล่องโต้ตอบแบบนุ่มนวล

สกินแบบกำหนดเองเพิ่มชื่อได้: `registerSkin('mint', { extends: 'pastel', colors: { … } })` ส่วน `defineSkin` เป็นฟังก์ชันช่วยแบบ identity สำหรับนิยามค่าคงที่ที่มีไทป์ ทั้งสองถูก export จาก `tiptapify`

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

รูปแบบเชิงโครงสร้างที่โทเค็นไม่สามารถแสดงได้ (มาร์กอัปของคอมโพเนนต์ การผูก prop ของ Vuetify) รูปทรงเป็นตัวกำหนดว่าชุดกฎของสกินใดถูกใช้ ส่วนโทเค็นเป็นตัวลงสี

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

ทุกสกินคำนวณทับรูปทรงแบบคลาสสิก รูปทรงที่คำนวณแล้วถูกเปิดเผยเป็น `shape: ComputedRef<ResolvedShape>` บน [`TiptapifyConfig`](#tiptapifyconfig) คอมโพเนนต์แถบเครื่องมือแบบกำหนดเองจึงทำตามได้

## TiptapifySkinColors {#tiptapifyskincolors}

แคตตาล็อกโทเค็นสีของสกิน: แถบเครื่องมือ กลุ่ม ปุ่ม bubble menu ดรอปดาวน์ กล่องโต้ตอบ เฟรม รูปภาพ และจุดปรับขนาด คีย์แบบ camelCase แต่ละตัวแมปกับตัวแปร CSS `--tf-*` (`toolbarBg` → `--tf-toolbar-bg`) ตารางฉบับเต็มอยู่ใน[คู่มือสกิน](/th/guide/skins)

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

แคตตาล็อกโทเค็นเมตริกของสกิน: ระยะห่าง ขนาด และรัศมีมุมของส่วนเดียวกัน โดยแมปคีย์ → `--tf-*` แบบเดียวกัน ตารางฉบับเต็มอยู่ใน[คู่มือสกิน](/th/guide/skins)

## TiptapifySkinInput {#tiptapifyskininput}

ไทป์เต็มของ prop `skin`: ชื่อสกินที่ลงทะเบียนไว้ (สตริง) หรือออบเจกต์สกินแบบอินไลน์

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

ออบเจกต์แบบอินไลน์ถูกประมวลผลผ่านลำดับเดียวกับสกินที่ลงทะเบียน (classic → `extends` → ของตัวเอง) ไม่เข้าสู่รีจิสทรีส่วนกลาง และแสดงผลด้วยคลาส `tiptapify-skin-inline` เว้นแต่จะมี `name` โทเค็นของสกินถูกปล่อยออกมาเป็นตัวแปร CSS `--tf-*` บนรูทของเอดิเตอร์

## TiptapifyContentStyles {#tiptapifycontentstyles}

ชนิดของ prop `contentStyles` (ดู [สไตล์เนื้อหา](/th/guide/content-styles))

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

ไทป์ของ prop `upload`: endpoint ของ[การอัปโหลด](/th/guide/uploads)

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

ไทป์ของ prop `linkPreview` และของข้อมูลที่ endpoint ตอบกลับ (ดู[การ์ดลิงก์](/th/guide/link-cards))

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

คอนฟิก UI ระดับเอดิเตอร์ที่ใช้ร่วมกับทุกคอมโพเนนต์ภายใน `<Tiptapify>` ผ่าน Vue `provide`/`inject` อ่านค่าได้ในคอมโพเนนต์แถบเครื่องมือของคุณด้วย [`useTiptapifyConfig`](#usetiptapifyconfig)

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

ค่าเหล่านี้เป็นแบบ reactive: การเปลี่ยน prop `variantBtn` / `variantField` / `skin` บน `<Tiptapify>` จะอัปเดตทุกคอมโพเนนต์บนแถบเครื่องมือโดยไม่ต้องเรนเดอร์ props ใหม่

## useTiptapifyConfig {#usetiptapifyconfig}

ส่งคืนคอนฟิกที่ใช้ร่วมกันของอินสแตนซ์ `<Tiptapify>` ที่คอมโพเนนต์ผู้เรียกอยู่ภายใน ออกแบบสำหรับคอมโพเนนต์แถบเครื่องมือแบบกำหนดเอง (ดู[แถบเครื่องมือที่กำหนดเอง](/th/examples/custom-toolbar#custom-toolbar-components))

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

นอกอินสแตนซ์ `<Tiptapify>` คอมโพสเซเบิลจะถอยกลับไปใช้ค่าเริ่มต้นของแพ็กเกจ: `variantBtn` เป็น `flat` `variantField` เป็น `solo` และสกิน `default` (รูปทรงคลาสสิก ไม่ปล่อยโทเค็น)

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

## ไทป์ของ AI {#ai-types}

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

กำหนดค่าที่ใช้ได้สำหรับ prop `items`

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**รูปแบบอาร์เรย์** — รายชื่อรายการแบบเรียบ:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**รูปแบบออบเจกต์** — เซกชันที่มีชื่อ:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

ส่งผ่านอีเวนต์ `editor-ready`

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

ส่งผ่านอีเวนต์ `content-changed`

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

ตัวเลือกที่ส่งเมื่อติดตั้งปลั๊กอิน

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## การ re-export {#re-exports}

ยูทิลิตีต่อไปนี้ถูก re-export จาก `@tiptap/core` เพื่อความสะดวกเมื่อสร้างเอ็กซ์เทนชันแบบกำหนดเอง:

| Export            | ประเภท   | แหล่งที่มา      |
|-------------------|----------|-----------------|
| `Node`            | คลาส     | `@tiptap/core`  |
| `Mark`            | คลาส     | `@tiptap/core`  |
| `mergeAttributes` | ฟังก์ชัน | `@tiptap/core`  |
| `markInputRule`   | ฟังก์ชัน | `@tiptap/core`  |
| `markPasteRule`   | ฟังก์ชัน | `@tiptap/core`  |
| `CommandProps`    | ไทป์     | `@tiptap/core`  |
| `InputRuleMatch`  | ไทป์     | `@tiptap/core`  |
| `PasteRuleMatch`  | ไทป์     | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

ไอคอน Material Design จาก `@mdi/js` ถูก re-export เพื่อใช้ปรับแต่งไอคอนบนแถบเครื่องมือ

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

คอมโพสเซเบิลสำหรับอ่านคอนฟิก UI ระดับเอดิเตอร์ (`variantBtn`, `variantField`) จากคอมโพเนนต์แถบเครื่องมือแบบกำหนดเอง ดู [useTiptapifyConfig](#usetiptapifyconfig)

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

คลาส Editor ของ `@tiptap/vue-3` ที่อยู่เบื้องหลัง

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

คอมโพเนนต์เอดิเตอร์และกล่องโต้ตอบมีให้ใช้เป็น named export สำหรับการใช้งานโดยตรง

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
