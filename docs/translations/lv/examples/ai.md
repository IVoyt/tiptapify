# AI {#ai}

Izmantojiet šo demonstrāciju ar jebkuru ar OpenAI saderīgu `/v1/chat/completions` piegādātāju. Galapunkta, modeļa un tokena lauki tiek izmantoti tikai šīs lapas sesijā un netiek saglabāti.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Ierakstiet vai ielīmējiet tekstu, pēc tam izmantojiet AI rīkjoslas pogu..."
/>

## Backend galapunkta režīms {#backend-endpoint-mode}

Pārslēdziet lauku **Režīms** uz **Backend galapunkts**, lai tiptapify sazinātos tieši ar jūsu backend bez pielāgota `aiProvider`. Tas galapunktam nosūta minimālu datu paketi (`prompt`, `instruction` un neobligātie lauki `stream`, `thinking`, `reasoning_effort`, `model`) un pieņem vienkāršu JSON, `{ content }` vai SSE straumēšanas atbildi — pilno līgumu skatiet [AI ceļvedī](/lv/guide/ai#backend-generation-aiendpoint).

## Lokālais LM Studio {#local-lm-studio}

Ja izmantojat LM Studio, lietojiet šādu galapunktu:

```txt
http://localhost:1234/v1/chat/completions
```

Ja LM Studio darbojas citā datorā, izmantojiet tā resursdatora adresi, piemēram:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Pārlūkprogrammā darbināmām demonstrācijām izmantojiet izstrādes starpniekserveri, ja jūsu piegādātājs neatļauj CORS.
