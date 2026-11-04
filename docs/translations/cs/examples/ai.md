# AI {#ai}

Toto demo použijte s libovolným poskytovatelem kompatibilním s OpenAI, který nabízí `/v1/chat/completions`. Pole endpoint, model a token se používají pouze v rámci této relace stránky a neukládají se.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Napište nebo vložte text a pak použijte tlačítko AI na panelu nástrojů..."
/>

## Režim endpointu backendu {#backend-endpoint-mode}

Přepnutím pole **Režim** na **Endpoint backendu** necháte tiptapify komunikovat přímo s vaším backendem, bez vlastního `aiProvider`. Na endpoint odešle minimální payload (`prompt`, `instruction` a volitelná pole `stream`, `thinking`, `reasoning_effort`, `model`) a přijme odpověď v podobě prostého JSON, `{ content }` nebo SSE streamu — úplný kontrakt najdete v [průvodci AI](/cs/guide/ai#backend-generation-aiendpoint).

## Lokální LM Studio {#local-lm-studio}

Pro LM Studio použijte endpoint podobný tomuto:

```txt
http://localhost:1234/v1/chat/completions
```

Pokud LM Studio běží na jiném počítači, použijte místo toho jeho hostitele, například:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

U dem běžících v prohlížeči použijte vývojový proxy server, pokud váš poskytovatel nepovoluje CORS.
