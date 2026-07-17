# Types

## TiptapifyEditor

Extended Tiptap Editor class with additional properties.

```typescript
declare class TiptapifyEditor extends Editor {
  interactiveStyles: boolean | undefined
}
```

## variantBtnTypes

Defines valid values for the `variantBtn` prop across all toolbar button components.

```typescript
type variantBtnTypes = 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal' | undefined
```

## variantFieldTypes

Defines valid values for the `variantField` prop across toolbar dropdown fields.

```typescript
type variantFieldTypes = 'outlined' | 'plain' | 'filled' | 'solo' | 'solo-filled' | 'solo-inverted' | 'underlined' | undefined
```

## TiptapifyFooterAlignment

Defines valid values for the `footerAlignment` prop on the `<Tiptapify>` component.

```typescript
type TiptapifyFooterAlignment = 'start' | 'center' | 'end'
```

```vue
<Tiptapify footer-alignment="center" />
```

## ToolbarSectionsEnum

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
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>

type TiptapifyAiChatRole = 'system' | 'user' | 'assistant' | 'developer' | 'tool'

interface TiptapifyAiChatMessage {
  role: TiptapifyAiChatRole
  content: string
}

interface TiptapifyAiRequest {
  model?: string
  messages: TiptapifyAiChatMessage[]
  temperature?: number
  stream?: false
  [key: string]: unknown
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

interface TiptapifyAiPromptExample {
  title: string
  prompt: string
}

interface TiptapifyAiOptions {
  aiProvider?: TiptapifyAiProvider
  model?: string
  promptExamples?: TiptapifyAiPromptExample[]
  mode?: 'insert' | 'replace' | 'append'
  defaultPrompt?: string
  systemPrompt?: string
  temperature?: number
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
