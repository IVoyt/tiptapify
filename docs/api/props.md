# Props

## `<Tiptapify>` Props

### `content`

- **Type:** `String | Object`
- **Default:** `''`

Initial editor content. Accepts HTML string or Tiptap JSON object.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```



### `placeholder`

- **Type:** `String`
- **Default:** `''`

Placeholder text shown when the editor is empty.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height`

- **Type:** `Number`
- **Default:** `null`

Editor content area minimum height in pixels.

```vue
<Tiptapify :height="500" />
```

### `toolbar`

- **Type:** `Boolean`
- **Default:** `true`

Show or hide the toolbar.

```vue
<Tiptapify :toolbar="false" />
```

### `items`

- **Type:** `Array<String> | Object`
- **Default:** `[]`

Toolbar items to display. Pass an array of item names or an object with named sections. See [Toolbar Items](/api/toolbar-items).

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '|', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude`

- **Type:** `Boolean`
- **Default:** `false`

When `true`, the `items` prop specifies items to **exclude** rather than include.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu`

- **Type:** `Boolean`
- **Default:** `true`

Show the bubble menu when text is selected.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu`

- **Type:** `Boolean`
- **Default:** `true`

Show the floating menu on empty lines.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands`

- **Type:** `Boolean`
- **Default:** `true`

Enable slash command menu (type `/` to trigger).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount`

- **Type:** `Boolean`
- **Default:** `true`

Show word count in the editor footer.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount`

- **Type:** `Boolean`
- **Default:** `true`

Show character count in the editor footer.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit`

- **Type:** `Number | null`
- **Default:** `null`

Maximum number of characters allowed by the Tiptap `CharacterCount` extension. Set `null` or omit the prop to keep unlimited editing. When set to a value greater than `0`, the footer shows an SVG circular progress indicator with color-coded thresholds.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor`

- **Type:** `String`
- **Default:** `'purple'`

Default color of the circular progress indicator shown in the footer when `limit` is set.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor`

- **Type:** `String`
- **Default:** `'orange'`

Color of the progress indicator when usage exceeds 75% of the limit.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor`

- **Type:** `String`
- **Default:** `'red'`

Color of the progress indicator when the character limit has been reached.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment`

- **Type:** `TiptapifyFooterAlignment`
- **Default:** `'end'`

Alignment of the footer status items. Accepts `'start'`, `'center'`, or `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai`

- **Type:** `Boolean | TiptapifyAiOptions`
- **Default:** `false`

Enables the `ai` toolbar item. The editor builds an OpenAI-compatible `/v1/chat/completions` request and passes it to `aiProvider`. Use the provider callback to call your backend, BFF, OAuth-protected endpoint, LM Studio, or SDK wrapper.

```vue
<script setup lang="ts">
const ai = {
  async aiProvider(request) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error('AI request failed')
    }

    return response.json()
  },
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

Local LLM LM Studio example:

```ts
const ai = {
  model: 'google/gemma-4-12b-qat',
  async aiProvider(request) {
    const response = await fetch('http://127.0.0.1:1234/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    return response.json()
  },
}
```

Custom prompt examples replace the localized defaults:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    promptExamples: [
      { title: 'Rewrite', prompt: 'Rewrite this in a direct tone.' },
      { title: 'Shorten', prompt: 'Make this shorter.' },
      { title: 'Explain', prompt: 'Explain this for a beginner.' },
    ],
  }"
/>
```

`tokenProvider` and `storage` are optional consumer-owned hooks for direct browser integrations. API keys or provider tokens placed in browser code or browser storage are visible to users and must not be treated as secrets. Prefer the backend adapter pattern above for production secrets.

Use `mode: 'insert' | 'replace' | 'append'` to override the default apply behavior. By default, AI output replaces the captured selection when text was selected and inserts at the cursor otherwise.

Use `systemPrompt`, `temperature`, `chatCompletionOptions`, or `createMessages(context)` to customize the OpenAI-compatible chat-completions request. `context` contains `{ prompt, selectedText, text, html, json, mode }`.

### `defaultFontFamily`

- **Type:** `String`
- **Default:** `'Inter'`

Default font family for editor content.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure`

- **Type:** `String`
- **Default:** `'px'`

Measurement unit for font size values.

```vue
<Tiptapify font-measure="px" />
```

### `rounded`

- **Type:** `String`
- **Default:** `'0'`

Border radius for the editor container. Accepts Vuetify radius values (`sm`, `md`, `lg`, `xl`, `pill`, etc.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn`

- **Type:** `variantBtnTypes`
- **Default:** `'tonal'`

Vuetify button variant for toolbar buttons. See [`variantBtnTypes`](/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField`

- **Type:** `variantFieldTypes`
- **Default:** `'outlined'`

Vuetify variant for toolbar dropdown fields. See [`variantFieldTypes`](/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions`

- **Type:** `Array<toolbarSections>`
- **Default:** `[]`

Provide custom Tiptap extensions to register with the editor. See [Custom Extensions](/examples/custom-toolbar).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles`

- **Type:** `Boolean`
- **Default:** `true`

Enable interactive style application.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading`

- **Type:** `Boolean`
- **Default:** `false`

Show an indeterminate progress bar while the editor is loading.

```vue
<Tiptapify loading />
```

### `loadingColor`

- **Type:** `String`
- **Default:** `'default'`

Color of the loading progress bar. Accepts Vuetify theme color values.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight`

- **Type:** `String`
- **Default:** `'1px'`

Height of the loading progress bar.

```vue
<Tiptapify :loading-height="'4px'" />
```

## Events

### `editor-ready`

Fired when the editor instance is ready.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string  // Get current HTML content
  getJSON: () => object  // Get current JSON content
}
```

```vue
<script setup lang="ts">
const onEditorReady = (payload) => {
  console.log(payload.editor)
  console.log(payload.getHTML())
  console.log(payload.getJSON())
}
</script>

<template>
  <Tiptapify @editor-ready="onEditorReady" />
</template>
```

### `content-changed`

Fired when the editor content changes.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

```vue
<script setup lang="ts">
const onContentChanged = ({ html, json }) => {
  console.log('HTML:', html)
  console.log('JSON:', json)
}
</script>

<template>
  <Tiptapify @content-changed="onContentChanged" />
</template>
```

### `update:modelValue`

Supports `v-model` binding.

```vue
<script setup lang="ts">
import { ref } from 'vue'
const content = ref('<p>Hello</p>')
</script>

<template>
  <Tiptapify v-model="content" />
</template>
```

## Provide / Inject

The editor instance and `t` function are available via Vue's provide/inject:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
