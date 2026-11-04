# AI {#ai}

Använd den här demon med valfri OpenAI-kompatibel `/v1/chat/completions`-leverantör. Fälten för endpoint, modell och token används bara under den här sidans session och sparas inte.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Skriv eller klistra in text och använd sedan AI-knappen i verktygsfältet..."
/>

## Läget Backend-endpoint {#backend-endpoint-mode}

Växla fältet **Läge** till **Backend-endpoint** så att tiptapify pratar direkt med din backend, utan en egen `aiProvider`. Det skickar en minimal payload (`prompt`, `instruction` och de valfria fälten `stream`, `thinking`, `reasoning_effort`, `model`) till endpointen och accepterar ett vanligt JSON-svar, `{ content }` eller SSE-strömning — se [AI-guiden](/sv/guide/ai#backend-generation-aiendpoint) för hela kontraktet.

## Lokal LM Studio {#local-lm-studio}

För LM Studio, använd en endpoint som:

```txt
http://localhost:1234/v1/chat/completions
```

Om LM Studio körs på en annan dator, använd den värden i stället, till exempel:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

För webbläsarbaserade demos, använd en dev-proxy om din leverantör inte tillåter CORS.
