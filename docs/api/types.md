# Types

## ToolbarSectionsEnum

```typescript
enum ToolbarSectionsEnum {
  actions = 'actions',
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
  editor: Editor        // Tiptap Editor instance
  getHTML: () => string  // Returns current HTML
  getJSON: () => object  // Returns current JSON
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
