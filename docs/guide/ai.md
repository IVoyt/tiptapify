# AI Extension

The AI extension adds a toolbar button that opens a prompt dialog, sends the request to a provider of your choice, shows the streamed result, and inserts it into the editor via the mode-specific action button (**Insert** / **Replace** / **Append**).

```vue
<Tiptapify
  :content="content"
  :items="['ai', '|', 'bold', 'italic']"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    stream: true,
  }"
/>
```

The `ai` prop accepts `true` (options with defaults) or an options object (`TiptapifyAiOptions`). The toolbar `ai` item is always registered, but the button is **disabled** unless `aiProvider` is set.

See [AI example](/examples/ai) for a runnable demo and [Props](/api/props#ai) for the full option reference.

## Architecture

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normalizes the `ai` prop: `ai: true` becomes an empty options object, `promptExamples` falls back to the localized defaults, and the result is exposed to descendants via `inject('tiptapifyAi')` (`TiptapifyAiResolvedOptions` or `false`).
- The toolbar item (`src/components/Toolbar/ai.ts`) renders `Button.vue`. The button checks `aiProvider` availability and opens `Dialog.vue`.
- `Dialog.vue` owns the whole request lifecycle: building the request, calling the provider, streaming, and inserting the result.

## The provider contract

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

The provider is a plain async function you implement. tiptapify does not call any API itself — anything that can consume an OpenAI-compatible `request` object works (fetch, an SDK, a backend adapter).

**Request** (`TiptapifyAiRequest`) is spread from your `chatCompletionOptions`, then augmented by the plugin:

| Field | Source |
| --- | --- |
| `messages` | `createMessages(context)` if provided, otherwise the default pair: a system message (your `systemPrompt` or a built-in default) and a user message that embeds the prompt plus the selected editor text (or the whole text when nothing is selected) |
| `model` | `model` option, when set |
| `temperature` | `temperature` option, when set |
| `stream` | `stream` option, or `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | the thinking toggle / effort dropdown — see below |

**Context** (`TiptapifyAiEditorContext`) gives the provider full editor state: `prompt`, `selectedText`, `text`, `html`, `json`, and `mode` (`insert` / `replace` / `append`).

**Response**: the provider may return the content as a plain `string`, as `{ content }` (`TiptapifyAiResponse`), or as an OpenAI-compatible `choices` payload (`TiptapifyAiOpenAiResponse`). The dialog extracts the content in that order and trims leading whitespace. On rejection the error message is shown in the dialog (or `ai.error` when the error is not an `Error` instance) and the dialog stays open.

## Streaming

When `stream: true` (or `chatCompletionOptions.stream` is `true`), the dialog passes a `TiptapifyAiStream` object as the third argument:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — pass it to `fetch` (or your SDK call). It aborts when the user clicks **Stop** or closes the dialog, so in-flight requests do not keep running.
- **`onChunk`** — append each content chunk to the result field. While generating, the result field is read-only and partially streamed content is kept (you can Stop, then insert or discard it).
- **`onReasoning`** — forward the model's reasoning/thinking output (e.g. the `reasoning_content` delta of Qwen/DeepSeek/o-series) to a collapsible **Thinking** panel above the result. The panel auto-expands and auto-scrolls while streaming. Reasoning output is display-only and is never inserted into the editor.

Providers that do not stream ignore the `stream` argument — it is optional.

## Thinking and reasoning effort

Two user controls in the dialog map to request fields. Both are opt-in via options and are owned by the plugin — you do not (and should not) set these fields yourself in `chatCompletionOptions`.

- **`thinking: true`** shows the **Thinking** toggle (on by default, reset on each dialog open). The plugin writes the toggle value into the request as `enable_thinking: true | false`.
- **`thinking` missing or `thinking: false`** hides the toggle and the plugin sends `enable_thinking: false`, so models that think by default do not think.
- **`reasoningEffort: { options, default? }`** shows the **Reasoning effort** dropdown. `options` lists the custom effort levels you want to offer (`'low' | 'medium' | 'high'`); the extension always adds a `default` item itself (the thinking-mode baseline), so you never list `default` in your config. The `default` field preselects one of your custom levels when the dialog opens — when omitted, `default` is preselected. The value resets on each open. The dropdown is rendered only when `options` is a non-empty list, `thinking` is enabled, and the Thinking toggle is on.
- **`showReasoning`** (default `false`) controls the collapsible **Thinking** panel that streams the model's reasoning process (the `reasoning_content` delta). Set `showReasoning: true` to show that panel while keeping thinking on — the model still reasons, the result is applied the same way, only the step-by-step reasoning is additionally displayed.

Because providers (vLLM/LM Studio in particular) reject `enable_thinking` and `reasoning_effort` in a single request, the plugin sends exactly one of the two:

| State | Request field |
| --- | --- |
| Thinking on, effort = `default` (or no effort configured) | `enable_thinking` (from the toggle) |
| Thinking on, effort = `low` / `medium` / `high` | `reasoning_effort` (from the dropdown); the toggle is disabled |
| Thinking off (toggle off, or `thinking` not enabled in the config) | `enable_thinking: false`; `reasoning_effort` is not sent |

## Inserting the result

On the action button — **Insert**, **Replace** or **Append**, depending on the mode — the dialog places `result` into the editor:

- **Mode** — the dialog's action button is a split button. The main part applies the result in the preselected mode (**Insert** / **Replace** / **Append**): the `mode` option preselects it, or **Replace** when text was selected when the dialog was opened and **Insert** otherwise. A small "more" (⋮) section on the right of the button opens a menu with the remaining modes — clicking one applies the result in that mode immediately. **Insert** places the result at the cursor, **Replace** replaces the selected text (captured when **Generate** was clicked), and **Append** adds it at the end of the document.
- **Character limit** — when the editor is configured with `limit` (the `CharacterCount` extension rejects any non-paste transaction that would grow the document past the limit), a `generated / limit` character counter is shown below the result field (live while streaming, soft red when the limit would be exceeded) and the dialog shows the `ai.limit_exceeded` warning right after generation when the result would exceed the limit. The **Insert** button and its alternative-mode menu are then disabled: the result is applied all-or-nothing, so you must shorten it before applying it.