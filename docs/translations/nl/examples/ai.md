# AI {#ai}

Gebruik deze demo met elke OpenAI-compatibele `/v1/chat/completions`-provider. De velden voor endpoint, model en token worden alleen tijdens deze paginasessie gebruikt en worden niet opgeslagen.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Schrijf of plak tekst en gebruik daarna de AI-knop in de toolbar..."
/>

## Backend-endpointmodus {#backend-endpoint-mode}

Zet het veld **Modus** op **Backend-endpoint** zodat tiptapify rechtstreeks met je backend praat, zonder eigen `aiProvider`. Het stuurt een minimale payload (`prompt`, `instruction` en de optionele velden `stream`, `thinking`, `reasoning_effort` en `model`) naar het endpoint en accepteert een gewoon JSON-, `{ content }`- of SSE-streamingantwoord — zie de [AI-handleiding](/nl/guide/ai#backend-generation-aiendpoint) voor het volledige contract.

## Lokale LM Studio {#local-lm-studio}

Gebruik voor LM Studio een endpoint zoals:

```txt
http://localhost:1234/v1/chat/completions
```

Draait LM Studio op een andere machine, gebruik dan die host, bijvoorbeeld:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Gebruik voor demo's in de browser een dev-proxy als je provider CORS niet toestaat.
