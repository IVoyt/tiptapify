# AI {#ai}

Usa questa demo con qualsiasi provider compatibile con OpenAI che esponga `/v1/chat/completions`. I campi endpoint, modello e token vengono usati solo durante la sessione di questa pagina e non vengono salvati.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Scrivi o incolla del testo, poi usa il pulsante AI della barra degli strumenti..."
/>

## Modalità endpoint backend {#backend-endpoint-mode}

Imposta il campo **Modalità** su **Endpoint backend** per far dialogare tiptapify direttamente con il tuo backend, senza un `aiProvider` personalizzato. Invia all'endpoint un payload minimo (`prompt`, `instruction` e i campi facoltativi `stream`, `thinking`, `reasoning_effort`, `model`) e accetta come risposta un JSON semplice, `{ content }` oppure uno streaming SSE; per il contratto completo consulta la [guida AI](/it/guide/ai#backend-generation-aiendpoint).

## LM Studio in locale {#local-lm-studio}

Per LM Studio, usa un endpoint come:

```txt
http://localhost:1234/v1/chat/completions
```

Se LM Studio gira su un'altra macchina, usa quell'host, ad esempio:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Per le demo nel browser, usa un proxy di sviluppo se il tuo provider non consente CORS.
