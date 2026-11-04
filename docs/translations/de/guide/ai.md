# KI-Erweiterung {#ai-extension}

Die KI-Erweiterung fügt eine Symbolleisten-Schaltfläche hinzu, die einen Prompt-Dialog öffnet, die Anfrage an einen Provider deiner Wahl sendet, das gestreamte Ergebnis anzeigt und es über die modusspezifische Aktionsschaltfläche (**Einfügen** / **Ersetzen** / **Anfügen**) in den Editor einfügt.

```vue
<Tiptapify
  :content="content"
  :items="['ai', '|', 'bold', 'italic']"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    stream: true,
  }"
/>
```

Die Prop `ai` akzeptiert `true` (Optionen mit Standardwerten) oder ein Optionsobjekt (`TiptapifyAiOptions`). Das Symbolleisten-Element `ai` ist immer registriert, aber die Schaltfläche ist **deaktiviert**, solange `aiProvider` nicht gesetzt ist.

Eine lauffähige Demo findest du im [KI-Beispiel](/de/examples/ai), die vollständige Optionsreferenz unter [Props](/de/api/props#ai).

## Architektur {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` normalisiert die Prop `ai`: `ai: true` wird zu einem leeren Optionsobjekt, `promptExamples` fällt auf die lokalisierten Standardwerte zurück, und das Ergebnis wird über `inject('tiptapifyAi')` an Nachfahren bereitgestellt (`TiptapifyAiResolvedOptions` oder `false`).
- Das Symbolleisten-Element (`src/components/Toolbar/ai.ts`) rendert `Button.vue`. Die Schaltfläche prüft die Verfügbarkeit von `aiProvider` und öffnet `Dialog.vue`.
- `Dialog.vue` besitzt den gesamten Anfragelebenszyklus: die Anfrage erstellen, den Provider aufrufen, streamen und das Ergebnis einfügen.

## Der Provider-Vertrag {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

Der Provider ist eine einfache async-Funktion, die du selbst implementierst. Tiptapify ruft keine API selbst auf — alles, was ein OpenAI-kompatibles `request`-Objekt verarbeiten kann, funktioniert (fetch, ein SDK, ein Backend-Adapter). Die Ausnahme ist der Backend-Modus `aiEndpoint` (siehe [Backend-Generierung](#backend-generation-aiendpoint)), bei dem Tiptapify die Anfrage an deinen Endpunkt sendet.

**Request** (`TiptapifyAiRequest`) wird aus deinen `chatCompletionOptions` aufgefächert und dann vom Plugin ergänzt:

| Field | Source |
| --- | --- |
| `messages` | `createMessages(context)`, falls angegeben, sonst das Standardpaar: eine System-Nachricht (dein `systemPrompt` oder ein eingebauter Standard) und eine Nutzer-Nachricht, die den Prompt, den markierten Editortext samt umgebendem Text und die Regel enthält, nur für die Markierung zu antworten (oder für den ganzen Text, wenn nichts markiert ist) |
| `model` | Option `model`, falls gesetzt |
| `temperature` | Option `temperature`, falls gesetzt |
| `stream` | Option `stream` oder `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | der Nachdenken-Schalter / das Aufwand-Dropdown — siehe unten |

**Context** (`TiptapifyAiEditorContext`) gibt dem Provider den vollständigen Editorzustand: `prompt`, `selectedText`, `textBefore` / `textAfter` (der Text des Absatzes der Markierung davor und danach, jeweils bis zu 500 Zeichen), `text`, `html`, `json` und `mode` (`insert` / `replace` / `append`).

Eine Markierung, die innerhalb eines Wortes beginnt oder endet, übernimmt das ganze Wort, und die Standardnachrichten senden den Text um die Markierung herum mit der Regel, nur für die Markierung zu antworten: Bekommt ein Modell nur ein Fragment, hält es es für den ganzen Text und vervollständigt es, und der Ersatz würde wiederholen, was auf die Markierung folgt.

**Response**: Der Provider darf den Inhalt als einfachen `string`, als `{ content }` (`TiptapifyAiResponse`) oder als OpenAI-kompatible `choices`-Nutzlast (`TiptapifyAiOpenAiResponse`) zurückgeben. Der Dialog extrahiert den Inhalt in dieser Reihenfolge und entfernt führende Leerzeichen. Bei einer Ablehnung wird die Fehlermeldung im Dialog angezeigt (oder `ai.error`, wenn der Fehler keine `Error`-Instanz ist), und der Dialog bleibt offen.

## Backend-Generierung (`aiEndpoint`) {#backend-generation-aiendpoint}

Statt einen `aiProvider` zu implementieren, richte die KI-Funktion auf einen LLM-Endpunkt deines Backends:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

Tiptapify erstellt dann die Anfrage und sendet sie selbst an den Endpunkt. Ein ausdrücklicher `aiProvider` hat immer Vorrang, wenn beide gesetzt sind.

**Request** — eine minimale JSON-Nutzlast (`TiptapifyAiBackendRequest`):

| Field | Sent |
| --- | --- |
| `prompt` | immer — die im Dialog eingegebene Anfrage |
| `instruction` | immer — dein `systemPrompt`, die System-Nachricht eines eigenen `createMessages` oder der eingebaute Standard |
| `stream` | nur bei `stream: true` |
| `thinking` | nur, wenn der Schalter **Nachdenken** des Dialogs an ist |
| `reasoning_effort` | nur, wenn der Nutzer eine Stufe gewählt hat (nicht `default`) |
| `model` | nur, wenn die Option `model` gesetzt ist |

**Response** — wird großzügig akzeptiert: ein einfacher String, ein `{ content }`-Objekt oder eine OpenAI-kompatible `choices`-Nutzlast.

**Streaming** — bei einer Anfrage mit `stream: true` wird der Antwort-Body als SSE-Stream gelesen (`data:`-Zeilen, abgeschlossen mit `data: [DONE]`). Akzeptierte Chunk-Formate:

- OpenAI-Stil — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- Einfach — `data: {"type":"content"|"reasoning","data":"…"}`
- Flach — `data: {"content":"…","reasoning_content":"…"}`
- Reiner Text — `data: some text` (eine `data`-Zeile ohne JSON ist ein Inhalts-Chunk)

`content`-Chunks aktualisieren das Ergebnisfeld über `onChunk`, `reasoning_content`-Chunks speisen den Bereich **Nachdenken** über `onReasoning`. Ignoriert das Backend `stream` und antwortet mit einem einfachen Body, wird stattdessen dieser verwendet. Ein Klick auf **Stoppen** oder das Schließen des Dialogs bricht die Anfrage ab; teilweise gestreamte Inhalte bleiben im Ergebnisfeld erhalten.

**Headers** — `aiHeaders` (ein `Record<string, string>`) werden über `Content-Type: application/json` gemergt. Ein `Authorization`-Header in `aiHeaders` bleibt unverändert; andernfalls wird ein Token aus `tokenProvider` als `Authorization: Bearer <token>` gesendet.

**Errors** — eine Antwort ohne Erfolgsstatus zeigt die Fehlermeldung des Backends (JSON `{ error }` / `{ message }` oder den rohen Body) im Dialog an.

## Streaming {#streaming}

Bei `stream: true` (oder wenn `chatCompletionOptions.stream` `true` ist) übergibt der Dialog ein `TiptapifyAiStream`-Objekt als drittes Argument:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — übergib es an `fetch` (oder deinen SDK-Aufruf). Es bricht ab, wenn der Nutzer auf **Stoppen** klickt oder den Dialog schließt, sodass laufende Anfragen nicht weiterlaufen.
- **`onChunk`** — hänge jeden Inhalts-Chunk an das Ergebnisfeld an. Während der Generierung ist das Ergebnisfeld schreibgeschützt, und teilweise gestreamte Inhalte bleiben erhalten (du kannst stoppen und sie dann einfügen oder verwerfen).
- **`onReasoning`** — leite die Reasoning-/Denkausgabe des Modells (z. B. das `reasoning_content`-Delta von Qwen/DeepSeek/o-Serie) an einen einklappbaren Bereich **Nachdenken** über dem Ergebnis weiter. Der Bereich klappt beim Streamen automatisch auf und scrollt automatisch mit. Die Reasoning-Ausgabe dient nur der Anzeige und wird nie in den Editor eingefügt.

Provider ohne Streaming ignorieren das Argument `stream` — es ist optional.

## Denkmodus und Denkaufwand {#thinking-and-reasoning-effort}

Zwei Bedienelemente des Dialogs entsprechen Anfragefeldern. Beide sind per Optionen zuschaltbar und gehören dem Plugin — du setzt diese Felder nicht (und solltest es auch nicht) selbst in `chatCompletionOptions`.

- **`thinking: true`** zeigt den Schalter **Nachdenken** (standardmäßig an, wird bei jedem Öffnen des Dialogs zurückgesetzt). Das Plugin schreibt den Schalterwert als `enable_thinking: true | false` in die Anfrage.
- **`thinking` fehlt oder `thinking: false`** blendet den Schalter aus, und das Plugin sendet `enable_thinking: false`, sodass Modelle, die standardmäßig nachdenken, nicht nachdenken.
- **`reasoningEffort: { options, default? }`** zeigt das Dropdown **Denkaufwand**. `options` listet die benutzerdefinierten Aufwandsstufen auf, die du anbieten willst (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); die Erweiterung fügt selbst immer einen Eintrag `default` hinzu (die Basis des Denkmodus), daher führst du `default` nie in deiner Konfiguration auf. Das Feld `default` wählt beim Öffnen des Dialogs eine deiner benutzerdefinierten Stufen vor — fehlt es, ist `default` vorgewählt. Der Wert wird bei jedem Öffnen zurückgesetzt. Das Dropdown wird nur gerendert, wenn `options` eine nicht leere Liste ist, `thinking` aktiviert ist und der Schalter Nachdenken an ist.
- **`showReasoning`** (Standard `false`) steuert den einklappbaren Bereich **Nachdenken**, der den Denkprozess des Modells streamt (das `reasoning_content`-Delta). Setze `showReasoning: true`, um diesen Bereich anzuzeigen, während das Nachdenken aktiv bleibt — das Modell denkt weiterhin nach, das Ergebnis wird auf dieselbe Weise übernommen, nur der schrittweise Denkprozess wird zusätzlich angezeigt.

Weil Provider (insbesondere vLLM/LM Studio) `enable_thinking` und `reasoning_effort` in einer einzigen Anfrage ablehnen, sendet das Plugin genau eines von beiden:

| State | Request field |
| --- | --- |
| Nachdenken an, Aufwand = `default` (oder kein Aufwand konfiguriert) | `enable_thinking` (vom Schalter) |
| Nachdenken an, Aufwand = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (vom Dropdown); der Schalter ist deaktiviert |
| Nachdenken aus (Schalter aus oder `thinking` nicht in der Konfiguration aktiviert) | `enable_thinking: false`; `reasoning_effort` wird nicht gesendet |

## Fehler {#errors}

Der Dialog erklärt eine fehlgeschlagene Anfrage, statt den rohen Fehler anzuzeigen, und hängt danach die eigene Meldung des Dienstes an:

| What happened | Explanation |
| --- | --- |
| Der Browser hat keine Antwort erhalten (`Failed to fetch`, `NetworkError…`, `Load failed`) | Der Dienst ist ausgefallen, nicht erreichbar oder CORS hat die Antwort blockiert; die Browser-Konsole verrät, was zutrifft |
| `401` / `403` | Prüfe den API-Schlüssel oder die Zugriffsrechte |
| `404` | Prüfe den Endpunktpfad |
| `408` / `504` / ein Timeout | Der Dienst hat nicht rechtzeitig geantwortet |
| `429` | Zu viele Anfragen |
| `5xx` | Der Dienst ist nicht verfügbar (lädt ein Modell, ausgelastet) |

Bei `aiEndpoint` stammt der Status aus der Antwort. Ein eigener `aiProvider` erhält dieselben Erklärungen, indem er einen Fehler mit einem `status` wirft:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

Jeder andere Fehler wird mit seiner eigenen Meldung angezeigt.

## Das Ergebnis einfügen {#inserting-the-result}

Über die Aktionsschaltfläche — **Einfügen**, **Ersetzen** oder **Anfügen**, je nach Modus — platziert der Dialog `result` im Editor:

- **Modus** — die Aktionsschaltfläche des Dialogs ist eine geteilte Schaltfläche. Der Hauptteil übernimmt das Ergebnis im vorgewählten Modus (**Einfügen** / **Ersetzen** / **Anfügen**): Die Option `mode` wählt ihn vor, sonst **Ersetzen**, wenn beim Öffnen des Dialogs Text markiert war, und andernfalls **Einfügen**. Ein kleiner „Mehr“-Bereich (⋮) rechts von der Schaltfläche öffnet ein Menü mit den übrigen Modi — ein Klick darauf übernimmt das Ergebnis sofort in diesem Modus. **Einfügen** setzt das Ergebnis an den Cursor, **Ersetzen** ersetzt den markierten Text (erfasst, als auf **Generieren** geklickt wurde), und **Anfügen** hängt es ans Dokumentende an.
- **Zeichenlimit** — ist der Editor mit `limit` konfiguriert (die Erweiterung `CharacterCount` lehnt jede Nicht-Paste-Transaktion ab, die das Dokument über das Limit hinaus wachsen ließe), erscheint unter dem Ergebnisfeld ein Zeichenzähler `generated / limit` (live beim Streaming, blassrot bei Überschreitung des Limits), und der Dialog zeigt direkt nach der Generierung die Warnung `ai.limit_exceeded`, wenn das Ergebnis das Limit überschreiten würde. Die Schaltfläche **Einfügen** und ihr Menü für alternative Modi sind dann deaktiviert: Das Ergebnis wird ganz oder gar nicht übernommen, du musst es also kürzen, bevor du es anwendest.