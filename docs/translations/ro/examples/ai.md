# AI {#ai}

Folosește această demonstrație cu orice furnizor compatibil OpenAI `/v1/chat/completions`. Câmpurile endpoint, model și token sunt folosite doar în sesiunea acestei pagini și nu sunt salvate.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Scrie sau lipește un text, apoi folosește butonul AI din bara de instrumente..."
/>

## Modul endpoint backend {#backend-endpoint-mode}

Comută câmpul **Mod** pe **Endpoint backend** pentru ca tiptapify să comunice direct cu backendul tău, fără un `aiProvider` personalizat. Trimite către endpoint un payload minimal (`prompt`, `instruction` și câmpurile opționale `stream`, `thinking`, `reasoning_effort`, `model`) și acceptă un răspuns JSON simplu, `{ content }` sau un răspuns în flux SSE — consultă [ghidul AI](/ro/guide/ai#backend-generation-aiendpoint) pentru contractul complet.

## LM Studio local {#local-lm-studio}

Pentru LM Studio, folosește un endpoint de tipul:

```txt
http://localhost:1234/v1/chat/completions
```

Dacă LM Studio rulează pe altă mașină, folosește acea gazdă, de exemplu:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Pentru demonstrațiile din browser, folosește un proxy de dezvoltare dacă furnizorul tău nu permite CORS.
