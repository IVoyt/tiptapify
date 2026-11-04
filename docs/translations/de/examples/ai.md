# AI {#ai}

Verwende diese Demo mit jedem OpenAI-kompatiblen `/v1/chat/completions`-Provider. Die Felder für Endpunkt, Modell und Token werden nur in dieser Seitensitzung verwendet und nicht gespeichert.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Schreibe oder füge Text ein und nutze dann die KI-Schaltfläche der Symbolleiste..."
/>

## Backend-Endpunkt-Modus {#backend-endpoint-mode}

Stelle das Feld **Modus** auf **Backend-Endpunkt** um, damit Tiptapify direkt mit deinem Backend spricht, ohne eigenen `aiProvider`. Es sendet eine minimale Nutzlast (`prompt`, `instruction` sowie die optionalen Felder `stream`, `thinking`, `reasoning_effort`, `model`) an den Endpunkt und akzeptiert eine einfache JSON-Antwort, `{ content }` oder eine SSE-Streaming-Antwort — den vollständigen Vertrag findest du im [KI-Leitfaden](/de/guide/ai#backend-generation-aiendpoint).

## Lokales LM Studio {#local-lm-studio}

Für LM Studio verwendest du einen Endpunkt wie:

```txt
http://localhost:1234/v1/chat/completions
```

Läuft LM Studio auf einem anderen Rechner, nimm stattdessen dessen Host, zum Beispiel:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

Für browserbasierte Demos verwende einen Dev-Proxy, falls dein Provider kein CORS erlaubt.
