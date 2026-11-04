# AI {#ai}

Ovu demonstraciju koristite sa bilo kojim provajderom kompatibilnim sa OpenAI-jem koji podržava `/v1/chat/completions`. Polja za endpoint, model i token koriste se samo tokom ove sesije stranice i ne čuvaju se.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Napišite ili nalepite tekst, pa upotrebite AI dugme na traci sa alatima..."
/>

## Režim backend endpointa {#backend-endpoint-mode}

Prebacite polje **Režim** na **Backend endpoint** da bi tiptapify komunicirao direktno sa vašim backendom, bez prilagođenog `aiProvider`. Šalje minimalan payload (`prompt`, `instruction` i opciona polja `stream`, `thinking`, `reasoning_effort`, `model`) na endpoint i prihvata običan JSON, `{ content }` ili SSE strimovani odgovor — kompletan ugovor pogledajte u [AI vodiču](/sr/guide/ai#backend-generation-aiendpoint).

## Lokalni LM Studio {#local-lm-studio}

Za LM Studio koristite endpoint poput:

```txt
http://localhost:1234/v1/chat/completions
```

Ako LM Studio radi na drugoj mašini, koristite taj host, na primer:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Za demonstracije u pregledaču koristite dev proxy ako vaš provajder ne dozvoljava CORS.
