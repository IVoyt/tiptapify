# AI {#ai}

Bruk denne demoen med en hvilken som helst OpenAI-kompatibel `/v1/chat/completions`-provider. Feltene for endepunkt, modell og token brukes bare i denne sideøkten og lagres ikke.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Skriv eller lim inn tekst, og bruk deretter AI-knappen i verktøylinjen..."
/>

## Backend-endepunktmodus {#backend-endpoint-mode}

Bytt feltet **Modus** til **Backend-endepunkt** for at tiptapify skal snakke direkte med backend, uten en egendefinert `aiProvider`. Det sender en minimal nyttelast (`prompt`, `instruction` og de valgfrie feltene `stream`, `thinking`, `reasoning_effort`, `model`) til endepunktet og godtar et vanlig JSON-svar, `{ content }` eller et SSE-strømmet svar — se [AI-guiden](/no/guide/ai#backend-generation-aiendpoint) for hele kontrakten.

## Lokal LM Studio {#local-lm-studio}

For LM Studio bruker du et endepunkt som dette:

```txt
http://localhost:1234/v1/chat/completions
```

Hvis LM Studio kjører på en annen maskin, bruker du den verten i stedet, for eksempel:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

For nettleserbaserte demoer bruker du en utviklingsproxy hvis leverandøren din ikke tillater CORS.
