# AI {#ai}

Ez a demó bármely OpenAI-kompatibilis `/v1/chat/completions` szolgáltatóval használható. A végpont-, modell- és token-mezők csak az oldal munkamenetében élnek, és nincsenek eltárolva.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Írj vagy illessz be szöveget, majd használd az AI eszköztárgombot..."
/>

## Backend végpont mód {#backend-endpoint-mode}

Állítsd a **Mód** mezőt **Backend végpont** értékre, hogy a tiptapify egyéni `aiProvider` nélkül, közvetlenül a backendeddel kommunikáljon. Minimális adatcsomagot (`prompt`, `instruction`, valamint az opcionális `stream`, `thinking`, `reasoning_effort`, `model` mezők) küld a végpontnak, és elfogad sima JSON, `{ content }` vagy SSE streaming választ — a teljes szerződést lásd az [AI útmutatóban](/hu/guide/ai#backend-generation-aiendpoint).

## Helyi LM Studio {#local-lm-studio}

LM Studio esetén használj ehhez hasonló végpontot:

```txt
http://localhost:1234/v1/chat/completions
```

Ha az LM Studio egy másik gépen fut, használd annak a gépnek a címét, például:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Böngészős demókhoz használj fejlesztői proxyt, ha a szolgáltatód nem engedélyezi a CORS-t.
