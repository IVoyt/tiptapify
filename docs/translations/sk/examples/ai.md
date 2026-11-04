# AI {#ai}

Toto demo použite s ľubovoľným poskytovateľom kompatibilným s OpenAI s rozhraním `/v1/chat/completions`. Polia endpoint, model a token sa používajú iba počas relácie na tejto stránke a neukladajú sa.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Napíšte alebo vložte text a potom použite tlačidlo AI na lište nástrojov..."
/>

## Režim backendového endpointu {#backend-endpoint-mode}

Prepnite pole **Režim** na **Backendový endpoint** a tiptapify bude komunikovať priamo s vaším backendom, bez vlastného `aiProvider`. Odošle minimálny payload (`prompt`, `instruction` a voliteľné polia `stream`, `thinking`, `reasoning_effort`, `model`) na endpoint a prijme obyčajný JSON, `{ content }` alebo streamovanú odpoveď SSE — úplný kontrakt nájdete v [príručke AI](/sk/guide/ai#backend-generation-aiendpoint).

## Lokálne LM Studio {#local-lm-studio}

Pre LM Studio použite endpoint v tomto tvare:

```txt
http://localhost:1234/v1/chat/completions
```

Ak LM Studio beží na inom počítači, použite namiesto toho jeho hostiteľa, napríklad:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Pre demá v prehliadači použite vývojový proxy, ak váš poskytovateľ nepovoľuje CORS.
