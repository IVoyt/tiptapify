# AI {#ai}

此演示可搭配任何兼容 OpenAI 的 `/v1/chat/completions` 提供商使用。端点、模型和令牌字段仅在当前页面会话中使用，不会被保存。

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="输入或粘贴文本，然后使用 AI 工具栏按钮..."
/>

## 后端端点模式 {#backend-endpoint-mode}

将**模式**字段切换为**后端端点**，即可让 tiptapify 直接与你的后端通信，无需自定义 `aiProvider`。它会向端点发送一个最小化的负载（`prompt`、`instruction`，以及可选的 `stream`、`thinking`、`reasoning_effort`、`model` 字段），并接受纯 JSON、`{ content }` 或 SSE 流式响应——完整约定请参阅 [AI 指南](/zh/guide/ai#backend-generation-aiendpoint)。

## 本地 LM Studio {#local-lm-studio}

对于 LM Studio，请使用如下端点：

```txt
http://localhost:1234/v1/chat/completions
```

如果 LM Studio 运行在另一台机器上，请改用该主机，例如：

```txt
http://192.168.0.107:1234/v1/chat/completions
```

对于基于浏览器的演示，如果你的提供商不允许 CORS，请使用开发代理。
