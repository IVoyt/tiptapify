# AI

Use this demo with any OpenAI-compatible `/v1/chat/completions` provider. The endpoint, model, and token fields are used only in this page session and are not stored.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Write or paste text, then use the AI toolbar button..."
/>

## Local LM Studio

For LM Studio, use an endpoint like:

```txt
http://localhost:1234/v1/chat/completions
```

If LM Studio runs on another machine, use that host instead, for example:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

For browser-based demos, use a dev proxy if your provider does not allow CORS.
