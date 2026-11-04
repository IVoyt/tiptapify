# 属性 {#props}

## `<Tiptapify>` 属性 {#tiptapify-props}

### `content` {#content}

- **类型：** `String | Object`
- **默认值：** `''`

编辑器的初始内容。接受 HTML 字符串或 Tiptap JSON 对象。

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` 仅是**初始**内容；如需双向绑定，请使用 `v-model`（参见 `modelValue`）。

### `modelValue` {#modelvalue}

- **类型：** `String | Object`
- **默认值：** `''`

用于 `v-model` 的双向绑定值。使用 `v-model` 可使响应式值与编辑器保持同步。每次编辑时，组件都会触发 `update:modelValue` 事件并携带最新的 HTML，`v-model` 会将其写回你的 ref。如果只使用 `v-model`（没有 `:content`），则绑定的值就是编辑器的初始内容。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>Hello, world!</p>')
</script>

<template>
  <Tiptapify v-model="content" placeholder="Write something..." />
</template>
```



### `placeholder` {#placeholder}

- **类型：** `String`
- **默认值：** `''`

编辑器为空时显示的占位文本。

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **类型：** `Number`
- **默认值：** `null`

编辑器内容区域的最小高度，单位为像素。

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **类型：** `Boolean`
- **默认值：** `true`

显示或隐藏工具栏。

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **类型：** `Array<String> | Object`
- **默认值：** `[]`

要显示的工具栏项。传入项名称数组，或带有命名分区的对象。参见[工具栏项](/zh/api/toolbar-items)。
在数组中，`'|'` 会将各项分成组（按该顺序，无论按钮来自哪个分区），`'~'` 会把其后的各项推到工具栏末尾。有分组时，不属于内置项的名称会为 `customExtensions` 中同名的自定义按钮保留位置；如果没有这样的按钮，该位置会被丢弃。

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **类型：** `Boolean`
- **默认值：** `false`

为 `true` 时，`items` 属性指定的是要**排除**而不是包含的项。

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **类型：** `Boolean`
- **默认值：** `true`

选中文本时显示气泡菜单：一行图标按钮，分为几组——粗体、斜体、下划线、删除线 | 上标、下标 | 高亮、行内代码 | 链接 | 清除格式。每个按钮都有带快捷键的提示，并在所选内容带有对应标记时显示为激活状态。选中块（图片、小组件）、位于代码内，以及选中整个文档时，它会隐藏。

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **类型：** `Boolean`
- **默认值：** `true`

在空行上显示浮动菜单：标题 1、标题 2 和无序列表，与气泡菜单位于同样的一行图标按钮中。

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **类型：** `Boolean`
- **默认值：** `true`

启用斜杠命令菜单（输入 `/` 触发）。

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **类型：** `Boolean`
- **默认值：** `true`

在编辑器页脚显示字数。

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **类型：** `Boolean`
- **默认值：** `true`

在编辑器页脚显示字符数。

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **类型：** `Number | null`
- **默认值：** `null`

Tiptap `CharacterCount` 扩展允许的最大字符数。设为 `null` 或省略该属性则不限制编辑。当设置为大于 `0` 的值时，页脚会显示一个带颜色阈值的 SVG 圆形进度指示器。

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **类型：** `String`
- **默认值：** `'purple'`

设置了 `limit` 时，页脚中圆形进度指示器的默认颜色。

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **类型：** `String`
- **默认值：** `'orange'`

用量超过限制的 75% 时进度指示器的颜色。

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **类型：** `String`
- **默认值：** `'red'`

达到字符限制时进度指示器的颜色。

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **类型：** `TiptapifyFooterAlignment`
- **默认值：** `'end'`

页脚状态项的对齐方式。接受 `'start'`、`'center'` 或 `'end'`。

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **类型：** `Boolean | TiptapifyAiOptions`
- **默认值：** `false`

启用 `ai` 工具栏项。编辑器会构建一个兼容 OpenAI 的 `/v1/chat/completions` 请求并将其传给 `aiProvider`。可使用提供商回调来调用你的后端、BFF、受 OAuth 保护的端点、LM Studio 或 SDK 封装。

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

本地 LLM LM Studio 示例：

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

通过设置 `stream: true` 并经由 `aiProvider` 的 `stream` 参数推送令牌即可支持流式输出。AI 对话框中的结果字段会在数据块到达时实时更新，**停止**按钮可取消进行中的请求：

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

请将 `stream.signal` 传给 `fetch`（或你的 SDK 调用），以便在用户点击**停止**或关闭对话框时取消请求。已流式接收的部分内容会保留在结果字段中，可以应用或丢弃。不支持流式传输的提供商可以完全忽略 `stream` 参数——它是可选的，并且向后兼容。

推理模型（Qwen thinking、DeepSeek、o 系列）会在单独的 `reasoning_content` 增量中流式输出它们的“思考”。请通过 `stream.onReasoning()` 转发这些数据块——当 `showReasoning: true` 时，对话框会把它们渲染在结果字段上方可折叠的**思考**面板中（该面板默认隐藏）。推理输出仅用于显示，绝不会被插入编辑器。

若要让用户按请求切换模型的思考模式，请在 AI 选项中设置 `thinking: true`。对话框随后会显示一个**思考**开关（默认开启，每次打开时重置）；插件会把开关的值写入请求，形式为 `enable_thinking: true | false`，因此你不再需要（也不应该）自己在 `chatCompletionOptions` 中设置 `enable_thinking`：

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

当 `thinking` 为 `false` 或被省略时，不会显示该开关，插件会发送 `enable_thinking: false`，因此默认会思考的模型（Qwen3、DeepSeek 等）将不再思考。

若要让用户按请求选择推理强度，请在 AI 选项中设置 `reasoningEffort`。对话框随后会显示一个**推理强度**下拉菜单，其内容来自 `options`——自定义强度级别（`'low' | 'medium' | 'high' | 'xhigh' | 'max'`）。
扩展总会自行向下拉菜单添加一个 `default` 项（思考模式的基线），因此你不必在配置中列出 `default`；该选项的 `default` 字段会在对话框打开时预选你的某个自定义级别（否则预选 `default`），并且该值在每次打开时重置。
所选的值决定插件写入请求的内容：`default` 保持思考模式——**思考**开关保持可用并控制 `enable_thinking`；任何其他值则改为作为 `reasoning_effort` 发送，并且选中该值时思考开关会被禁用（提供商会拒绝在单个请求中同时包含 `enable_thinking` 和 `reasoning_effort`）。
只有在启用了 `thinking` 且思考开关处于打开状态时才会显示该下拉菜单——关闭思考会隐藏它，并且不会发送 `reasoning_effort`（请求回退为 `enable_thinking: false`）。当 `options` 缺失或为空时，根本不会渲染该下拉菜单：

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

**思考**面板默认隐藏（`showReasoning` 默认为 `false`）。设置 `showReasoning: true` 可显示一个可折叠面板，在保持思考开启的同时流式显示模型的推理过程（`reasoning_content` 增量）——模型仍会推理，结果的应用方式也相同，只是额外显示逐步的推理过程：

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

自定义提示词示例会替换本地化的默认值：

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

`tokenProvider` 和 `storage` 是由使用者自行管理的可选钩子，用于浏览器直连的集成。放在浏览器代码或浏览器存储中的 API 密钥或提供商令牌对用户可见，不得被视为机密。生产环境中的机密信息请优先使用上文的后端适配器模式。

使用 `mode: 'insert' | 'replace' | 'append'` 来预选对话框操作按钮上的插入模式（**插入** / **替换所选内容** / **追加**）。如果没有 `mode`，则打开对话框时选中了文本，按钮默认为**替换所选内容**，否则默认为**插入**。该操作按钮是一个拆分按钮：主体部分以预选模式应用结果，其右侧的小“更多”（⋮）部分会打开一个列出其他模式的菜单——点击其中一个会立即以该模式应用结果。

当编辑器设置了 `limit`（字符数限制）时，结果一生成，结果字段下方就会显示 `generated / limit` 字符计数器（流式传输时实时更新，超出限制时变为柔和的红色）。
如果 AI 输出会超出限制，对话框还会在生成完成后立即显示 `ai.limit_exceeded` 警告。
此时**插入**按钮及其备选模式菜单会被禁用——`CharacterCount` 扩展会拒绝任何会使文档超出限制的插入，因此结果是全部应用或全部不应用：能容纳时完整插入，超出限制时则完全不插入。
缩短结果即可重新启用该操作：

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

使用 `systemPrompt`、`temperature`、`chatCompletionOptions` 或 `createMessages(context)` 来自定义兼容 OpenAI 的 chat-completions 请求。`context` 包含 `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`：`textBefore` / `textAfter` 是所选内容所在段落中位于其前后的文本（各最多 500 个字符，没有选区时为空）——请将它们与所选内容一起发送，否则模型会把片段当成全文并将其补全。

### `ai.aiEndpoint` {#ai-aiendpoint}

- **类型：** `String`
- **默认值：** `undefined`

可替代自定义 `aiProvider` 的方式：让 AI 功能指向后端的 LLM 端点，由 tiptapify 自行构建并发送请求。后端会收到一个最小化的 JSON 负载：

- **始终发送：**`prompt`（在对话框中输入的请求）和 `instruction`（你的 `systemPrompt`、自定义 `createMessages` 的系统消息，或内置默认值）。
- **可选，仅在设置时发送：**`stream`（仅为 `true`）、`thinking`（对话框的**思考**开关，仅为 `true`）、`reasoning_effort`（所选的强度级别）以及 `model`。

响应宽松接受：纯字符串、`{ content }` 对象，或兼容 OpenAI 的 `choices` 负载。当请求带有 `stream: true` 时，响应体会按 SSE 流读取（`data:` 行，以 `data: [DONE]` 结束）：OpenAI 风格的增量（`choices[0].delta.content` / `.reasoning_content`）、简单的 `{ type: 'content' | 'reasoning', data }` 数据块、扁平的 `{ content, reasoning_content }` 数据块以及纯文本 `data` 行都会被接受。如果后端忽略 `stream` 并返回普通响应体，则改用该响应体。非 OK 的响应会在对话框中显示后端的错误消息（JSON `{ error }` / `{ message }` 或原始响应体）。**停止**按钮和关闭对话框都会中止进行中的请求；已流式接收的部分内容会保留在结果字段中。

如果同时设置了 `aiProvider` 和 `aiEndpoint`，则 `aiProvider` 优先。

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

### `ai.aiHeaders` {#ai-aiheaders}

- **类型：** `Record<string, string>`
- **默认值：** `undefined`

随 `aiEndpoint` 请求一同发送的额外请求头，合并到 `Content-Type: application/json` 之上。此处设置的 `Authorization` 请求头会原样保留；否则会把来自 `tokenProvider` 的令牌（设置时）作为 `Authorization: Bearer <token>` 发送。

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

### `defaultFontFamily` {#defaultfontfamily}

- **类型：** `String`
- **默认值：** `'Inter'`

编辑器内容的默认字体。

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **类型：** `String`
- **默认值：** `'px'`

字号数值的度量单位。

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **类型：** `String`
- **默认值：** `'0'`

编辑器容器的圆角。接受 Vuetify 的圆角值（`sm`、`md`、`lg`、`xl`、`pill` 等）。

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **类型：** `variantBtnTypes`
- **默认值：** `'tonal'`

工具栏按钮的 Vuetify 按钮变体。该值通过编辑器配置与每个工具栏组件共享——自定义组件可以使用 [`useTiptapifyConfig`](/zh/api/types#usetiptapifyconfig) 读取它。参见 [`variantBtnTypes`](/zh/api/types#variantbtntypes)。

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **类型：** `variantFieldTypes`
- **默认值：** `'outlined'`

工具栏下拉字段的 Vuetify 变体。该值通过编辑器配置与每个工具栏组件共享——自定义组件可以使用 [`useTiptapifyConfig`](/zh/api/types#usetiptapifyconfig) 读取它。参见 [`variantFieldTypes`](/zh/api/types#variantfieldtypes)。

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **类型：** `Array<toolbarSections>`
- **默认值：** `[]`

提供自定义工具栏分区，以扩展或添加工具栏项。每个分区的组件都可以使用 [`useTiptapifyConfig`](/zh/api/types#usetiptapifyconfig) 读取共享的编辑器配置。参见[自定义工具栏](/zh/examples/custom-toolbar#custom-toolbar-components)。

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **类型：** `Boolean`
- **默认值：** `true`

启用交互式样式应用。

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **类型：** `Boolean`
- **默认值：** `false`

编辑器加载时显示不确定进度条。

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **类型：** `String`
- **默认值：** `'default'`

加载进度条的颜色。接受 Vuetify 主题颜色值。

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **类型：** `String`
- **默认值：** `'1px'`

加载进度条的高度。

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **类型：** `Number`
- **默认值：** `0`

当连续出现这么多张图片（它们之间没有其他内容）时，编辑器会把它们排成带编号的三列网格，供将此类图片显示为幻灯片的站点使用。`0` 表示关闭。

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **类型：** `string | TiptapifySkinConfig`（[`TiptapifySkinInput`](/zh/api/types#tiptapifyskininput)）
- **默认值：** `'default'`

编辑器外观的样式：工具栏、气泡菜单、下拉菜单、对话框、页脚。

- `default` — 经典外观：凸起的工具栏，按钮组呈凸起的方块，Vuetify 按钮的按下状态使用主色。
- `pastel` — 沉静外观：位于细线下方的扁平着色工具栏，按下状态为中性色的幽灵按钮，轻盈的下拉菜单，柔和的对话框。

功能（图片说明、滑块、对齐下拉菜单、列表样式）在两种皮肤下表现一致。

```vue
<Tiptapify skin="pastel" />
```

你也可以传入内联皮肤对象：令牌覆盖项（`colors` / `metrics`）和造型标志，还可以选择性地 `extends` 某个已注册的皮肤。它基于 `default`（或其基础皮肤）解析，以类 `tiptapify-skin-inline` 渲染（若对象带有 `name`，则为 `tiptapify-skin-{name}`），其令牌会作为 `--tf-*` CSS 变量应用到编辑器根元素上。自定义名称来自 `registerSkin('mint', { … })`——令牌表和用法示例请参阅[皮肤指南](/zh/guide/skins)。

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **类型：** `{ endpoint: string, headers?: Record<string, string> }`（[`TiptapifyUploadOptions`](/zh/api/types#tiptapifyuploadoptions)）
- **默认值：** `null`

[上传](/zh/guide/uploads)的端点：在图片和视频对话框中选取的文件（以及视频封面、链接卡片的图片）会通过 `POST {endpoint}`（multipart 的 `file` 和 `kind`）发送给它，文档保留其响应的 URL（`{ "url": … }`）。

没有它时，图片对话框仍可接收文件：选取的图片（以及视频封面）会以 base64 data URL 的形式嵌入文档，文档加载时会保留 base64 图片。只有设置了此属性，视频对话框才会提供**上传**。设置 `upload` 后，文档加载时会丢弃 base64 图片。

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **类型:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/zh/api/types#tiptapifycontentstyles))
- **默认值:** `'inline'`

保存的 HTML 如何携带链接卡片、带说明文字的图片、视频、嵌入内容和任务列表的外观(参见[内容样式](/zh/guide/content-styles)):`inline` 会把外观写入它们的 `style` 属性,网站直接按原样显示 HTML;`classes` 只保留 class,适用于加载 `tiptapify/content.css` 的网站。加载 HTML 时编辑器会忽略这些样式,因此两种 HTML 加载回来的结果相同。

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **类型：** `{ endpoint: string, headers?: Record<string, string> }`（[`TiptapifyLinkPreviewOptions`](/zh/api/types#tiptapifylinkpreviewoptions)）
- **默认值：** `null`

[链接卡片](/zh/guide/link-cards)的后端端点：它读取页面的 OpenGraph 数据，而浏览器无法做到这一点（CORS）。编辑器在启动时通过握手检查它（`GET {endpoint}` 必须响应 `200 { "tiptapifyLinkPreview": 1 }`）；在它响应之前，不会提供卡片选项。

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## 事件 {#events}

### `editor-ready` {#editor-ready}

编辑器实例就绪时触发。

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

### `content-changed` {#content-changed}

编辑器内容发生变化时触发。

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

### `update:modelValue` {#update-modelvalue}

支持 `v-model` 绑定。

```vue
<script setup lang="ts">
import { ref } from 'vue'
const content = ref('<p>Hello</p>')
</script>

<template>
  <Tiptapify v-model="content" />
</template>
```

## Provide / Inject {#provide-inject}

编辑器实例和 `t` 函数可通过 Vue 的 provide/inject 获取：

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
