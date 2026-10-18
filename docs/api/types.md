# Types

## TiptapifyEditor

Extended Tiptap Editor class with additional properties.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes

Defines valid values for the `variantBtn` prop on `<Tiptapify>`. The value is applied to every toolbar button through the editor's shared config (see [`useTiptapifyConfig`](#usetiptapifyconfig)).

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes

Defines valid values for the `variantField` prop on `<Tiptapify>`. The value is applied to toolbar dropdown fields through the editor's shared config (see [`useTiptapifyConfig`](#usetiptapifyconfig)).

## TiptapifyFooterAlignment

Defines valid values for the `footerAlignment` prop on the `<Tiptapify>` component.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## TiptapifySkin

Defines the built-in names for the `skin` prop on the `<Tiptapify>` component: the chrome look of the editor.

```typescript
type TiptapifySkin = 'default' | 'pastel'
```

- `default` — the classic look: a raised toolbar, button groups as raised boxes, card-style bubble menus.
- `pastel` — the quiet look introduced in 0.3.3: a flat tinted toolbar, ghost buttons, light dropdowns, soft dialogs.

Custom skins add names: `registerSkin('mint', { extends: 'pastel', colors: { … } })`; `defineSkin` is the identity helper for typed const definitions. Both are exported from `tiptapify`.

```vue
<Tiptapify skin="pastel" />
```

## TiptapifyShape

The structural variants a token cannot express (component markup, Vuetify prop bindings). The shape decides which skin rule sets apply; the tokens paint them.

```typescript
type TiptapifyShape = {
  toolbar?: 'raised' | 'flat'   // elevated bar vs flat tinted bar
  groups?: 'box' | 'flat'       // toolbar sections as raised boxes vs plain runs
  buttons?: 'vuetify' | 'quiet' // native Vuetify buttons vs ghost buttons
  bubble?: 'card' | 'flat'      // bubble menu: VCard vs flat row
  dialog?: 'classic' | 'soft'   // classic dialog chrome vs soft card
  menu?: 'vuetify' | 'soft'     // dropdown menus: Vuetify list vs padded card
}

// The shape after resolution: every key set (missing keys fall back to classic)
type ResolvedShape = Required<TiptapifyShape>
```

Every skin resolves over the classic shape. The resolved shape is exposed as `shape: ComputedRef<ResolvedShape>` on [`TiptapifyConfig`](#tiptapifyconfig), so custom toolbar components can follow it.

## TiptapifySkinColors

The catalog of skin color tokens: toolbar, groups, buttons, bubble menus, dropdowns, dialogs, frame, images, and the resize handle. Each camelCase key maps to a `--tf-*` CSS variable (`toolbarBg` → `--tf-toolbar-bg`). The full table ships in the [Skins guide](/guide/skins).

## TiptapifySkinMetrics

The catalog of skin metric tokens: spacing, sizes, and radii for the same areas, with the same key → `--tf-*` mapping. The full table ships in the [Skins guide](/guide/skins).

## TiptapifySkinInput

The full type of the `skin` prop: a registered skin name (string) or an inline skin object.

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

An inline object resolves through the same chain as a registered skin (classic → `extends` → own), never enters the global registry, and renders under the class `tiptapify-skin-inline` unless it carries a `name`. Its tokens are emitted as `--tf-*` CSS variables on the editor root.

## TiptapifyConfig

Editor-level UI configuration shared with every component inside `<Tiptapify>` via Vue `provide`/`inject`. Read it in your own toolbar components with [`useTiptapifyConfig`](#usetiptapifyconfig).

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

Values are reactive: changing the `variantBtn` / `variantField` / `skin` prop on `<Tiptapify>` updates every toolbar component without re-rendering props.

## useTiptapifyConfig

Returns the shared config of the `<Tiptapify>` instance that the calling component belongs to. Intended for custom toolbar components (see [Custom Toolbar](/examples/custom-toolbar#custom-toolbar-components)).

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

Outside of a `<Tiptapify>` instance the composable falls back to the package defaults: `variantBtn` `flat`, `variantField` `solo`, and the `default` skin (classic shape, no emitted tokens).

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

## AI Types

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
  selectedText: string
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

## sectionComponent

```typescript
interface sectionComponent {
  name: string
  component: any
  props?: { [key: string]: any }
}
```

## section

```typescript
interface section {
  section: string
  group: boolean
  components: sectionComponent[]
  extensions?: Array<any>
}
```

## toolbarSections

```typescript
type toolbarSections = Array<section>
```

## itemsPropType

Defines valid values for the `items` prop.

```typescript
type itemsPropType = { [key: string]: Array<string> } | Array<string>
```

**Array format** — flat list of item names:

```typescript
const items: itemsPropType = [
  'bold', 'italic', 'underline', '|', 'heading', 'bulletList'
]
```

**Object format** — named sections:

```typescript
const items: itemsPropType = {
  formatting: ['bold', 'italic', 'underline'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList'],
}
```

## EditorReadyPayload

Emitted via the `editor-ready` event.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string     // Returns current HTML
  getJSON: () => object     // Returns current JSON
}
```

## ContentChangedPayload

Emitted via the `content-changed` event.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

## TiptapifyOptions

Options passed when installing the plugin.

```typescript
interface TiptapifyOptions {
  i18n: I18n  // vue-i18n instance
}
```

## Re-exports

The following utilities are re-exported from `@tiptap/core` for convenience when building custom extensions:

| Export            | Kind     | Source          |
|-------------------|----------|-----------------|
| `Node`            | Class    | `@tiptap/core`  |
| `Mark`            | Class    | `@tiptap/core`  |
| `mergeAttributes` | Function | `@tiptap/core`  |
| `markInputRule`   | Function | `@tiptap/core`  |
| `markPasteRule`   | Function | `@tiptap/core`  |
| `CommandProps`    | Type     | `@tiptap/core`  |
| `InputRuleMatch`  | Type     | `@tiptap/core`  |
| `PasteRuleMatch`  | Type     | `@tiptap/core`  |

```typescript
import { Node, Mark, mergeAttributes, markInputRule, markPasteRule } from 'tiptapify'
import type { CommandProps, InputRuleMatch, PasteRuleMatch } from 'tiptapify'
```

### `mdi`

Material Design Icons from `@mdi/js` are re-exported for toolbar icon customization.

```typescript
import { mdi } from 'tiptapify'
```

### `useTiptapifyConfig`

Composable for reading the editor-level UI config (`variantBtn`, `variantField`) from custom toolbar components. See [useTiptapifyConfig](#usetiptapifyconfig).

```typescript
import { useTiptapifyConfig } from 'tiptapify'
```

### `TipTapEditor`

The underlying `@tiptap/vue-3` Editor class.

```typescript
import { TipTapEditor } from 'tiptapify'
```

### `Tiptapify` / `TiptapifyDialog`

The editor and dialog components are available as named exports for direct use.

```typescript
import { Tiptapify, TiptapifyDialog } from 'tiptapify'
```
