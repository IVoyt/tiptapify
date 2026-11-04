# AI {#ai}

Użyj tego demo z dowolnym dostawcą zgodnym z OpenAI i endpointem `/v1/chat/completions`. Pola endpointu, modelu i tokenu są używane tylko w trakcie bieżącej sesji strony i nie są zapisywane.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="Napisz lub wklej tekst, a następnie użyj przycisku AI na pasku narzędzi..."
/>

## Tryb endpointu backendu {#backend-endpoint-mode}

Przełącz pole **Tryb** na **Endpoint backendu**, aby tiptapify komunikował się bezpośrednio z Twoim backendem, bez własnego `aiProvider`. Wysyła on do endpointu minimalny ładunek (`prompt`, `instruction` oraz opcjonalne pola `stream`, `thinking`, `reasoning_effort`, `model`) i akceptuje odpowiedź w postaci zwykłego JSON, `{ content }` lub strumienia SSE — pełny kontrakt opisuje [przewodnik po AI](/pl/guide/ai#backend-generation-aiendpoint).

## Lokalny LM Studio {#local-lm-studio}

W przypadku LM Studio użyj endpointu takiego jak:

```txt
http://localhost:1234/v1/chat/completions
```

Jeśli LM Studio działa na innej maszynie, użyj jej hosta, na przykład:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

W demonstracjach działających w przeglądarce użyj proxy deweloperskiego, jeśli dostawca nie zezwala na CORS.
