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

`content` is the **initial** content only; for two-way binding use `v-model` (see `modelValue`).

### `modelValue`

- **Type:** `String | Object`
- **Default:** `''`

Two-way binding value for `v-model`. Use `v-model` to keep a reactive value in sync with the editor. On every edit the component emits `update:modelValue` with the latest HTML, which `v-model` writes back to your ref. When only `v-model` is used (no `:content`), the bound value is the editor's initial content.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>Hello, world!</p>')
</script>

<template>
  <Tiptapify v-model="content" placeholder="Write something..." />
</template>
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

Streaming output is supported by setting `stream: true` and pushing tokens through the `stream` argument of `aiProvider`. The result field in the AI dialog updates live while chunks arrive, and a **Stop** button cancels the in-flight request:

```ts
const ai = {
  stream: true,
  async aiProvider(request, context, stream) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal: stream?.signal,
    })

    if (!response.ok || !response.body) {
      throw new Error('AI request failed')
    }

    let content = ''
    let buffer = ''
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        if (!line.startsWith('data: ') || line === 'data: [DONE]') {
          continue
        }

        const { choices } = JSON.parse(line.slice(6))
        const delta = choices?.[0]?.delta ?? {}

        if (delta.reasoning_content) {
          stream?.onReasoning(delta.reasoning_content)
        }

        const chunk = delta.content ?? ''

        if (chunk) {
          content += chunk
          stream?.onChunk(chunk)
        }
      }
    }

    return { content }
  },
}
```

Pass `stream.signal` to `fetch` (or your SDK call) so the request is cancelled when the user clicks **Stop** or closes the dialog. Partially streamed content stays in the result field and can be applied or discarded. Providers that do not stream can ignore the `stream` argument entirely — it is optional and backward compatible.

Reasoning models (Qwen thinking, DeepSeek, o-series) stream their "thoughts" in a separate `reasoning_content` delta. Forward those chunks through `stream.onReasoning()` — when `showReasoning: true`, the dialog renders them in a collapsible **Thinking** panel above the result field (the panel is hidden by default). Reasoning output is display-only and is never inserted into the editor.

To let the user switch the model's thinking mode per request, set `thinking: true` in the AI options. The dialog then shows a **Thinking** toggle (on by default, reset on each open); the plugin writes the toggle value into the request as `enable_thinking: true | false`, so you no longer need to (or should) set `enable_thinking` yourself in `chatCompletionOptions`:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
  }"
/>
```

When `thinking` is `false` or omitted, the toggle is not shown and the plugin sends `enable_thinking: false`, so models that think by default (Qwen3, DeepSeek, …) do not think.

To let the user pick the reasoning effort per request, set `reasoningEffort` in the AI options. The dialog then shows a **Reasoning effort** dropdown filled from `options` — custom effort levels (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
The extension always adds a `default` item to the dropdown itself (the thinking-mode baseline), so you never list `default` in your config; the `default` field of the option preselects one of your custom levels when the dialog opens (otherwise `default` is preselected), and the value resets on each open.
The selected value decides what the plugin writes into the request: `default` keeps the thinking mode — the **Thinking** toggle stays active and controls `enable_thinking`; any other value is sent as `reasoning_effort` instead, and the Thinking toggle is disabled while that value is selected (providers reject `enable_thinking` and `reasoning_effort` in a single request).
The dropdown is only shown when `thinking` is enabled and the Thinking toggle is on — turning thinking off hides it and `reasoning_effort` is not sent (the request falls back to `enable_thinking: false`). When `options` is missing or empty the dropdown is not rendered at all:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    reasoningEffort: {
      options: ['low', 'medium', 'high', 'xhigh', 'max'],
    },
  }"
/>
```

The **Thinking** panel is hidden by default (`showReasoning` defaults to `false`). Set `showReasoning: true` to show a collapsible panel that streams the model's reasoning process (`reasoning_content` delta) while keeping thinking on — the model still reasons and the result is applied the same way, only the step-by-step reasoning is additionally displayed:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    showReasoning: true,
  }"
/>
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

Use `mode: 'insert' | 'replace' | 'append'` to preselect the insert mode on the dialog's action button (**Insert** / **Replace** / **Append**). Without `mode`, the button defaults to **Replace** when text is selected when the dialog is opened and to **Insert** otherwise. The action button is a split button: the main part applies the result in the preselected mode, and a small "more" (⋮) section on its right opens a menu listing the other modes — clicking one applies the result in that mode immediately.

When the editor has a `limit` (character count limit), a `generated / limit` character counter is shown below the result field as soon as a result is generated (it updates live while streaming and turns a soft red when the limit would be exceeded).
The dialog also shows the `ai.limit_exceeded` warning right after generation if the AI output would exceed the limit.
In that state the **Insert** button and its alternative-mode menu are disabled — the `CharacterCount` extension rejects any insert that would grow the document past the limit, so the result is applied all-or-nothing: it is inserted fully when it fits, or not inserted at all when it exceeds the limit.
Shorten the result to re-enable the action:

```vue
<Tiptapify
  :content="content"
  :limit="300"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
  }"
/>
```

Use `systemPrompt`, `temperature`, `chatCompletionOptions`, or `createMessages(context)` to customize the OpenAI-compatible chat-completions request. `context` contains `{ prompt, selectedText, text, html, json, mode }`.

### `ai.aiEndpoint`

- **Type:** `String`
- **Default:** `undefined`

Alternative to a custom `aiProvider`: point the AI feature at a backend LLM endpoint and tiptapify builds and sends the request itself. The backend receives a minimal JSON payload:

- **Always:** `prompt` (the request typed in the dialog) and `instruction` (your `systemPrompt`, the system message of a custom `createMessages`, or the built-in default).
- **Optional, sent only when set:** `stream` (`true` only), `thinking` (the dialog's **Thinking** toggle, `true` only), `reasoning_effort` (the selected effort level), and `model`.

The response is accepted leniently: a plain string, a `{ content }` object, or an OpenAI-compatible `choices` payload. When the request has `stream: true`, the response body is read as an SSE stream (`data:` lines, terminated by `data: [DONE]`): OpenAI-style deltas (`choices[0].delta.content` / `.reasoning_content`), a simple `{ type: 'content' | 'reasoning', data }` chunk, a flat `{ content, reasoning_content }` chunk, and plain-text `data` lines are all accepted. If the backend ignores `stream` and answers with a plain body, that body is used instead. A non-OK response surfaces the backend's error message (JSON `{ error }` / `{ message }` or the raw body) in the dialog. A **Stop** button and closing the dialog abort the in-flight request; partially streamed content is kept in the result field.

If both `aiProvider` and `aiEndpoint` are set, `aiProvider` wins.

```vue
<script setup lang="ts">
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
  thinking: true,
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

### `ai.aiHeaders`

- **Type:** `Record<string, string>`
- **Default:** `undefined`

Extra headers sent with the `aiEndpoint` request, merged over `Content-Type: application/json`. An `Authorization` header set here is kept as-is; otherwise a token from `tokenProvider` (when set) is sent as `Authorization: Bearer <token>`.

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiEndpoint: '/api/ai/generate',
    aiHeaders: { 'X-Api-Key': '…' },
  }"
  :items="['ai']"
/>
```

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

Vuetify button variant for toolbar buttons. The value is shared with every toolbar component through the editor config — custom components can read it with [`useTiptapifyConfig`](/api/types#usetiptapifyconfig). See [`variantBtnTypes`](/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField`

- **Type:** `variantFieldTypes`
- **Default:** `'outlined'`

Vuetify variant for toolbar dropdown fields. The value is shared with every toolbar component through the editor config — custom components can read it with [`useTiptapifyConfig`](/api/types#usetiptapifyconfig). See [`variantFieldTypes`](/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions`

- **Type:** `Array<toolbarSections>`
- **Default:** `[]`

Provide custom toolbar sections to extend or add toolbar items. Each section's components can read the shared editor config with [`useTiptapifyConfig`](/api/types#usetiptapifyconfig). See [Custom Toolbar](/examples/custom-toolbar#custom-toolbar-components).

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
