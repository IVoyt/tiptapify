# टाइप {#types}

## TiptapifyEditor {#tiptapifyeditor}

अतिरिक्त प्रॉपर्टी वाली विस्तारित Tiptap Editor क्लास।

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes {#variantbtntypes}

`<Tiptapify>` पर `variantBtn` prop के मान्य मान तय करता है। यह मान एडिटर के साझा कॉन्फ़िग ([`useTiptapifyConfig`](#usetiptapifyconfig) देखें) के ज़रिए हर टूलबार बटन पर लागू होता है।

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes {#variantfieldtypes}

`<Tiptapify>` पर `variantField` prop के मान्य मान तय करता है। यह मान एडिटर के साझा कॉन्फ़िग ([`useTiptapifyConfig`](#usetiptapifyconfig) देखें) के ज़रिए टूलबार के ड्रॉपडाउन फ़ील्ड पर लागू होता है।

## TiptapifyFooterAlignment {#tiptapifyfooteralignment}

`<Tiptapify>` कंपोनेंट के `footerAlignment` prop के मान्य मान तय करता है।

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin {#tiptapifyskin}

`<Tiptapify>` कंपोनेंट के `skin` prop के बिल्ट-इन नाम तय करता है: एडिटर का बाहरी स्वरूप।

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — क्लासिक रूप: उभरा हुआ टूलबार, उभरे हुए बॉक्स जैसे बटन समूह, और दबी हुई अवस्था में प्राइमरी रंग वाले Vuetify बटन।
- `pastel` — शांत रूप: सपाट रंगीन टूलबार, घोस्ट बटन, हल्के ड्रॉपडाउन, कोमल डायलॉग।

कस्टम स्किन नाम जोड़ती हैं: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` टाइप वाली const परिभाषाओं के लिए पहचान सहायक है। दोनों `tiptapify` से एक्सपोर्ट होते हैं।

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape {#tiptapifyshape}

वे संरचनात्मक रूपांतर जिन्हें टोकन व्यक्त नहीं कर सकता (कंपोनेंट मार्कअप, Vuetify prop बाइंडिंग)। आकार तय करता है कि स्किन के कौन से नियम-समूह लागू हों; टोकन उन्हें रंगते हैं।

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

हर स्किन क्लासिक आकार के ऊपर रिज़ॉल्व होती है। रिज़ॉल्व किया गया आकार [`TiptapifyConfig`](#tiptapifyconfig) पर `shape: ComputedRef<ResolvedShape>` के रूप में उपलब्ध है, ताकि कस्टम टूलबार कंपोनेंट उसका अनुसरण कर सकें।

## TiptapifySkinColors {#tiptapifyskincolors}

स्किन रंग टोकन का कैटलॉग: टूलबार, समूह, बटन, बबल मेन्यू, ड्रॉपडाउन, डायलॉग, फ़्रेम, चित्र और रीसाइज़ हैंडल। हर camelCase कुंजी एक `--tf-*` CSS वेरिएबल से जुड़ती है (`toolbarBg` → `--tf-toolbar-bg`)। पूरी तालिका [स्किन गाइड](/hi/guide/skins) में है।

## TiptapifySkinMetrics {#tiptapifyskinmetrics}

स्किन मीट्रिक टोकन का कैटलॉग: उन्हीं क्षेत्रों के लिए स्पेसिंग, आकार और त्रिज्याएँ, उसी कुंजी → `--tf-*` मैपिंग के साथ। पूरी तालिका [स्किन गाइड](/hi/guide/skins) में है।

## TiptapifySkinInput {#tiptapifyskininput}

`skin` prop का पूरा टाइप: पंजीकृत स्किन नाम (स्ट्रिंग) या इनलाइन स्किन ऑब्जेक्ट।

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

इनलाइन ऑब्जेक्ट पंजीकृत स्किन की ही श्रृंखला (क्लासिक → `extends` → अपना) से रिज़ॉल्व होता है, ग्लोबल रजिस्ट्री में कभी नहीं जाता, और `name` न हो तो `tiptapify-skin-inline` क्लास के तहत रेंडर होता है। इसके टोकन एडिटर रूट पर `--tf-*` CSS वेरिएबल के रूप में जारी होते हैं।

## TiptapifyContentStyles {#tiptapifycontentstyles}

`contentStyles` प्रॉप का टाइप (देखें [कंटेंट स्टाइल](/hi/guide/content-styles))।

```typescript
type TiptapifyContentStyles = 'inline' | 'classes'

// The content HTML with the content styles written into its style attributes (unchanged without a DOM)
function inlineContentStyles(html: string): string

// The content styles as a stylesheet for the content inside `scope`, weightless (:where) by default
function contentCss(scope?: string, options?: { weightless?: boolean }): string
```

## TiptapifyUploadOptions {#tiptapifyuploadoptions}

`upload` prop का टाइप: [अपलोड](/hi/guide/uploads) का एंडपॉइंट।

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

`linkPreview` prop का टाइप और उसके एंडपॉइंट द्वारा लौटाए गए डेटा का टाइप ([लिंक कार्ड](/hi/guide/link-cards) देखें)।

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

एडिटर-स्तर का UI कॉन्फ़िगरेशन, जो Vue `provide`/`inject` के ज़रिए `<Tiptapify>` के भीतर हर कंपोनेंट के साथ साझा होता है। इसे अपने टूलबार कंपोनेंट में [`useTiptapifyConfig`](#usetiptapifyconfig) से पढ़ें।

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

मान रिएक्टिव हैं: `<Tiptapify>` पर `variantBtn` / `variantField` / `skin` prop बदलने से हर टूलबार कंपोनेंट बिना props दोबारा रेंडर किए अपडेट हो जाता है।

## useTiptapifyConfig {#usetiptapifyconfig}

उस `<Tiptapify>` इंस्टेंस का साझा कॉन्फ़िग लौटाता है जिससे कॉल करने वाला कंपोनेंट जुड़ा है। यह कस्टम टूलबार कंपोनेंट के लिए है ([कस्टम टूलबार](/hi/examples/custom-toolbar#custom-toolbar-components) देखें)।

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

`<Tiptapify>` इंस्टेंस के बाहर यह कंपोज़ेबल पैकेज के डिफ़ॉल्ट पर लौट आता है: `variantBtn` `flat`, `variantField` `solo`, और `default` स्किन (क्लासिक आकार, कोई टोकन जारी नहीं)।

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

## AI टाइप {#ai-types}

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

`items` prop के मान्य मान तय करता है।

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**ऐरे प्रारूप** — आइटम नामों की सपाट सूची:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**ऑब्जेक्ट प्रारूप** — नामित सेक्शन:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload {#editorreadypayload}

`editor-ready` इवेंट के ज़रिए भेजा जाता है।

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload {#contentchangedpayload}

`content-changed` इवेंट के ज़रिए भेजा जाता है।

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions {#tiptapifyoptions}

प्लगइन इंस्टॉल करते समय दिए जाने वाले विकल्प।

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## री-एक्सपोर्ट {#re-exports}

कस्टम एक्सटेंशन बनाते समय सुविधा के लिए ये यूटिलिटी `@tiptap/core` से री-एक्सपोर्ट की गई हैं:

| एक्सपोर्ट         | प्रकार   | स्रोत           |
|-------------------|----------|-----------------|
| `Node`            | क्लास    | `@tiptap/core`  |
| `Mark`            | क्लास    | `@tiptap/core`  |
| `mergeAttributes` | फ़ंक्शन  | `@tiptap/core`  |
| `markInputRule`   | फ़ंक्शन  | `@tiptap/core`  |
| `markPasteRule`   | फ़ंक्शन  | `@tiptap/core`  |
| `CommandProps`    | टाइप     | `@tiptap/core`  |
| `InputRuleMatch`  | टाइप     | `@tiptap/core`  |
| `PasteRuleMatch`  | टाइप     | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi` {#mdi}

टूलबार आइकन कस्टमाइज़ करने के लिए `@mdi/js` के Material Design Icons री-एक्सपोर्ट किए गए हैं।

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig` {#usetiptapifyconfig-1}

कस्टम टूलबार कंपोनेंट से एडिटर-स्तर का UI कॉन्फ़िग (`variantBtn`, `variantField`) पढ़ने के लिए कंपोज़ेबल। [useTiptapifyConfig](#usetiptapifyconfig) देखें।

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor` {#tiptapeditor}

आधारभूत `@tiptap/vue-3` Editor क्लास।

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog` {#tiptapify-tiptapifydialog}

एडिटर और डायलॉग कंपोनेंट सीधे उपयोग के लिए नामित एक्सपोर्ट के रूप में उपलब्ध हैं।

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
