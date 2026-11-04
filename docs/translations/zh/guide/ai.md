# AI 扩展 {#ai-extension}

AI 扩展会添加一个工具栏按钮，点击后打开提示词对话框，将请求发送给你选择的提供商，显示流式返回的结果，并通过对应模式的操作按钮（**插入** / **替换所选内容** / **追加**）将其插入编辑器。

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

`ai` 属性接受 `true`（使用默认选项）或选项对象（`TiptapifyAiOptions`）。工具栏的 `ai` 项始终会被注册，但除非设置了 `aiProvider`，否则按钮处于**禁用**状态。

可运行的演示请参阅 [AI 示例](/zh/examples/ai)，完整的选项参考请参阅[属性](/zh/api/props#ai)。

## 架构 {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` 会规范化 `ai` 属性：`ai: true` 会变成空的选项对象，`promptExamples` 回退到本地化的默认值，结果通过 `inject('tiptapifyAi')` 暴露给后代组件（`TiptapifyAiResolvedOptions` 或 `false`）。
- 工具栏项（`src/components/Toolbar/ai.ts`）渲染 `Button.vue`。该按钮会检查 `aiProvider` 是否可用，并打开 `Dialog.vue`。
- `Dialog.vue` 负责整个请求的生命周期：构建请求、调用提供商、流式传输以及插入结果。

## 提供商约定 {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

提供商是一个由你实现的普通异步函数。tiptapify 自身不会调用任何 API——任何能够处理兼容 OpenAI 的 `request` 对象的东西都可以使用（fetch、SDK、后端适配器）。例外是 `aiEndpoint` 后端模式（参见[后端生成](#backend-generation-aiendpoint)），此时 tiptapify 会把请求发送到你的端点。

**请求**（`TiptapifyAiRequest`）由你的 `chatCompletionOptions` 展开，再由插件补充：

| 字段 | 来源 |
| --- | --- |
| `messages` | 如果提供了 `createMessages(context)` 则使用它，否则使用默认的一对消息：一条系统消息（你的 `systemPrompt` 或内置默认值），以及一条用户消息，其中嵌入了提示词、所选的编辑器文本及其前后的文本，并附带仅针对所选内容作答的规则（未选择任何内容时则针对全文） |
| `model` | 设置了 `model` 选项时使用 |
| `temperature` | 设置了 `temperature` 选项时使用 |
| `stream` | `stream` 选项，或 `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | 思考开关 / 强度下拉菜单——见下文 |

**上下文**（`TiptapifyAiEditorContext`）为提供商提供完整的编辑器状态：`prompt`、`selectedText`、`textBefore` / `textAfter`（所选内容所在段落中位于其前后的文本，各最多 500 个字符）、`text`、`html`、`json` 以及 `mode`（`insert` / `replace` / `append`）。

起止位置位于单词内部的选区会扩展为包含整个单词，并且默认消息会连同仅针对所选内容作答的规则一起发送所选内容周围的文本：如果只给出一个片段，模型会把它当成全文并将其补全，而替换内容就会重复选区之后的文字。

**响应**：提供商可以将内容作为纯 `string`、`{ content }`（`TiptapifyAiResponse`）或兼容 OpenAI 的 `choices` 负载（`TiptapifyAiOpenAiResponse`）返回。对话框按此顺序提取内容，并去除开头的空白。被拒绝时，错误消息会显示在对话框中（如果错误不是 `Error` 实例，则显示 `ai.error`），且对话框保持打开。

## 后端生成（`aiEndpoint`） {#backend-generation-aiendpoint}

无需实现 `aiProvider`，也可以让 AI 功能指向后端的 LLM 端点：

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

此时 tiptapify 会自行构建请求并将其发送到该端点。当两者都设置时，显式指定的 `aiProvider` 始终优先。

**请求**——一个最小化的 JSON 负载（`TiptapifyAiBackendRequest`）：

| 字段 | 发送条件 |
| --- | --- |
| `prompt` | 始终发送——在对话框中输入的请求 |
| `instruction` | 始终发送——你的 `systemPrompt`、自定义 `createMessages` 的系统消息，或内置默认值 |
| `stream` | 仅当 `stream: true` 时 |
| `thinking` | 仅当对话框的**思考**开关打开时 |
| `reasoning_effort` | 仅当用户选择了某个级别（非 `default`）时 |
| `model` | 仅当设置了 `model` 选项时 |

**响应**——宽松接受：纯字符串、`{ content }` 对象，或兼容 OpenAI 的 `choices` 负载。

**流式传输**——当请求带有 `stream: true` 时，响应体会按 SSE 流读取（`data:` 行，以 `data: [DONE]` 结束）。接受的数据块格式：

- OpenAI 风格——`data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- 简单格式——`data: {"type":"content"|"reasoning","data":"…"}`
- 扁平格式——`data: {"content":"…","reasoning_content":"…"}`
- 纯文本——`data: some text`（非 JSON 的 `data` 行视为内容数据块）

`content` 数据块通过 `onChunk` 更新结果字段，`reasoning_content` 数据块通过 `onReasoning` 送入**思考**面板。如果后端忽略 `stream` 并返回普通响应体，则改用该响应体。点击**停止**或关闭对话框会中止请求；已流式接收的部分内容会保留在结果字段中。

**请求头**——`aiHeaders`（`Record<string, string>`）会合并到 `Content-Type: application/json` 之上。`aiHeaders` 中的 `Authorization` 请求头会原样保留；否则会把来自 `tokenProvider` 的令牌作为 `Authorization: Bearer <token>` 发送。

**错误**——非 OK 的响应会在对话框中显示后端的错误消息（JSON `{ error }` / `{ message }` 或原始响应体）。

## 流式传输 {#streaming}

当 `stream: true`（或 `chatCompletionOptions.stream` 为 `true`）时，对话框会把一个 `TiptapifyAiStream` 对象作为第三个参数传入：

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`**——将其传给 `fetch`（或你的 SDK 调用）。当用户点击**停止**或关闭对话框时它会中止，从而使进行中的请求不会继续运行。
- **`onChunk`**——把每个内容数据块追加到结果字段。生成期间结果字段为只读，已流式接收的部分内容会被保留（你可以点击停止，然后插入或丢弃它）。
- **`onReasoning`**——将模型的推理/思考输出（例如 Qwen/DeepSeek/o 系列的 `reasoning_content` 增量）转发到结果上方可折叠的**思考**面板。流式传输期间，该面板会自动展开并自动滚动。推理输出仅用于显示，绝不会被插入编辑器。

不支持流式传输的提供商会忽略 `stream` 参数——它是可选的。

## 思考与推理强度 {#thinking-and-reasoning-effort}

对话框中的两个用户控件对应请求字段。两者都通过选项选择启用，并由插件管理——你不需要（也不应该）自己在 `chatCompletionOptions` 中设置这些字段。

- **`thinking: true`** 会显示**思考**开关（默认开启，每次打开对话框时重置）。插件会把开关的值写入请求，形式为 `enable_thinking: true | false`。
- **`thinking` 缺失或 `thinking: false`** 会隐藏该开关，插件发送 `enable_thinking: false`，因此默认会思考的模型将不再思考。
- **`reasoningEffort: { options, default? }`** 会显示**推理强度**下拉菜单。`options` 列出你想提供的自定义强度级别（`'low' | 'medium' | 'high' | 'xhigh' | 'max'`）；扩展总会自行添加一个 `default` 项（思考模式的基线），因此你不必在配置中列出 `default`。`default` 字段会在对话框打开时预选你的某个自定义级别——省略时预选 `default`。该值在每次打开时重置。仅当 `options` 是非空列表、已启用 `thinking` 且思考开关处于打开状态时，才会渲染该下拉菜单。
- **`showReasoning`**（默认为 `false`）控制可折叠的**思考**面板，该面板会流式显示模型的推理过程（`reasoning_content` 增量）。设置 `showReasoning: true` 可在保持思考开启的同时显示该面板——模型仍会推理，结果的应用方式也相同，只是额外显示逐步的推理过程。

由于提供商（尤其是 vLLM/LM Studio）会拒绝在单个请求中同时包含 `enable_thinking` 和 `reasoning_effort`，插件只会发送两者之一：

| 状态 | 请求字段 |
| --- | --- |
| 思考开启，强度 = `default`（或未配置强度） | `enable_thinking`（来自开关） |
| 思考开启，强度 = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort`（来自下拉菜单）；开关被禁用 |
| 思考关闭（开关关闭，或配置中未启用 `thinking`） | `enable_thinking: false`；不发送 `reasoning_effort` |

## 错误 {#errors}

对话框会解释请求失败的原因，而不是显示原始错误，并在其后附上服务自身的消息：

| 发生了什么 | 说明 |
| --- | --- |
| 浏览器没有收到响应（`Failed to fetch`、`NetworkError…`、`Load failed`） | 服务已宕机、无法访问，或 CORS 阻止了响应；浏览器控制台会说明具体是哪种 |
| `401` / `403` | 请检查 API 密钥或访问权限 |
| `404` | 请检查端点路径 |
| `408` / `504` / 超时 | 服务未能及时响应 |
| `429` | 请求过多 |
| `5xx` | 服务不可用（正在加载模型、繁忙） |

使用 `aiEndpoint` 时，状态码来自响应。自定义的 `aiProvider` 可以通过抛出带有 `status` 的错误获得同样的解释：

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

其他任何错误都会连同其自身的消息一起显示。

## 插入结果 {#inserting-the-result}

点击操作按钮——**插入**、**替换所选内容**或**追加**（取决于模式）——对话框会把 `result` 放入编辑器：

- **模式**——对话框的操作按钮是一个拆分按钮。主体部分以预选的模式（**插入** / **替换所选内容** / **追加**）应用结果：`mode` 选项会预选它；否则，打开对话框时选中了文本则为**替换所选内容**，未选中则为**插入**。按钮右侧的小“更多”（⋮）部分会打开一个包含其余模式的菜单——点击其中一个会立即以该模式应用结果。**插入**会把结果放在光标处，**替换所选内容**会替换所选文本（在点击**生成**时捕获），**追加**会把它添加到文档末尾。
- **字符限制**——当编辑器配置了 `limit`（`CharacterCount` 扩展会拒绝任何会使文档超出限制的非粘贴事务）时，结果字段下方会显示 `generated / limit` 字符计数器（流式传输时实时更新，超出限制时显示为柔和的红色），并且当结果将超出限制时，对话框会在生成完成后立即显示 `ai.limit_exceeded` 警告。此时**插入**按钮及其备选模式菜单会被禁用：结果是全部应用或全部不应用，因此必须先将其缩短再应用。