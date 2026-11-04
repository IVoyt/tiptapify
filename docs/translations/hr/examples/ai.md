# AI {#ai}

Ovu demonstraciju koristite s bilo kojim pružateljem kompatibilnim s OpenAI-jem koji podržava `/v1/chat/completions`. Polja za krajnju točku, model i token koriste se samo tijekom ove sesije stranice i ne pohranjuju se.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Napišite ili zalijepite tekst, zatim upotrijebite AI gumb na alatnoj traci..."
/>

## Način rada s backend krajnjom točkom {#backend-endpoint-mode}

Prebacite polje **Način rada** na **Backend krajnja točka** kako bi tiptapify komunicirao izravno s vašim backendom, bez prilagođenog `aiProvider`. Na krajnju točku šalje minimalni payload (`prompt`, `instruction` te neobavezna polja `stream`, `thinking`, `reasoning_effort`, `model`) i prihvaća običan JSON, `{ content }` ili SSE streaming odgovor — cjeloviti ugovor pogledajte u [AI vodiču](/hr/guide/ai#backend-generation-aiendpoint).

## Lokalni LM Studio {#local-lm-studio}

Za LM Studio koristite krajnju točku poput:

```txt
http://localhost:1234/v1/chat/completions
```

Ako LM Studio radi na drugom računalu, koristite taj host, na primjer:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Za demonstracije u pregledniku koristite razvojni proxy ako vaš pružatelj ne dopušta CORS.
