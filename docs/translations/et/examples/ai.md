# AI {#ai}

Kasuta seda demot mis tahes OpenAI-ühilduva `/v1/chat/completions` pakkujaga. Lõpp-punkti, mudeli ja tokeni väljad kehtivad ainult selle lehe seansi jooksul ja neid ei salvestata.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Kirjuta või kleebi tekst ja kasuta siis tööriistariba AI nuppu..."
/>

## Backend-lõpp-punkti režiim {#backend-endpoint-mode}

Lülita väli **Mode** režiimile **Backend endpoint**, et Tiptapify suhtleks otse sinu backendiga, ilma kohandatud `aiProvider`ita. See saadab lõpp-punkti minimaalse sisu (`prompt`, `instruction` ning valikulised väljad `stream`, `thinking`, `reasoning_effort`, `model`) ja aktsepteerib vastusena tavalist JSON-i, `{ content }` või SSE-voogu — täieliku lepingu leiad [AI juhendist](/et/guide/ai#backend-generation-aiendpoint).

## Kohalik LM Studio {#local-lm-studio}

LM Studio puhul kasuta sellist lõpp-punkti:

```txt
http://localhost:1234/v1/chat/completions
```

Kui LM Studio töötab teises masinas, kasuta selle hosti, näiteks:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Brauseripõhiste demode jaoks kasuta arendusproksit, kui sinu pakkuja ei luba CORS-i.
