# AI {#ai}

Käytä tätä demoa minkä tahansa OpenAI-yhteensopivan `/v1/chat/completions`-palveluntarjoajan kanssa. Päätepiste-, malli- ja token-kenttiä käytetään vain tämän sivun istunnossa, eikä niitä tallenneta.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Kirjoita tai liitä teksti ja käytä sitten työkalurivin AI-painiketta..."
/>

## Backend-päätepistetila {#backend-endpoint-mode}

Vaihda **Tila**-kentän arvoksi **Backend-päätepiste**, jotta tiptapify keskustelee suoraan backendisi kanssa ilman omaa `aiProvider`-toteutusta. Se lähettää päätepisteeseen minimaalisen payloadin (`prompt`, `instruction` sekä valinnaiset kentät `stream`, `thinking`, `reasoning_effort` ja `model`) ja hyväksyy vastaukseksi pelkän JSONin, `{ content }`-muodon tai SSE-suoratoiston — katso koko sopimus [AI-oppaasta](/fi/guide/ai#backend-generation-aiendpoint).

## Paikallinen LM Studio {#local-lm-studio}

LM Studiolle käytä esimerkiksi tällaista päätepistettä:

```txt
http://localhost:1234/v1/chat/completions
```

Jos LM Studio toimii toisella koneella, käytä sen osoitetta, esimerkiksi:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Selainpohjaisissa demoissa käytä kehityksen proxya, jos palveluntarjoajasi ei salli CORSia.
