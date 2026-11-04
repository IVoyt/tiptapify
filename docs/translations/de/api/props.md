# Props {#props}

## `<Tiptapify>` Props {#tiptapify-props}

### `content` {#content}

- **Type:** `String | Object`
- **Default:** `''`

Anfänglicher Inhalt des Editors. Akzeptiert einen HTML-String oder ein Tiptap-JSON-Objekt.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` ist nur der **anfängliche** Inhalt; für Zwei-Wege-Bindung verwende `v-model` (siehe `modelValue`).

### `modelValue` {#modelvalue}

- **Type:** `String | Object`
- **Default:** `''`

Wert für die Zwei-Wege-Bindung mit `v-model`. Mit `v-model` bleibt ein reaktiver Wert mit dem Editor synchron. Bei jeder Änderung sendet die Komponente `update:modelValue` mit dem aktuellen HTML, das `v-model` in dein Ref zurückschreibt. Wird nur `v-model` verwendet (ohne `:content`), ist der gebundene Wert der anfängliche Inhalt des Editors.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>Hello, world!</p>')
</script>

<template>
  <Tiptapify v-model="content" placeholder="Write something..." />
</template>
```



### `placeholder` {#placeholder}

- **Type:** `String`
- **Default:** `''`

Platzhaltertext, der angezeigt wird, solange der Editor leer ist.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Type:** `Number`
- **Default:** `null`

Mindesthöhe des Inhaltsbereichs des Editors in Pixeln.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Type:** `Boolean`
- **Default:** `true`

Blendet die Symbolleiste ein oder aus.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Type:** `Array<String> | Object`
- **Default:** `[]`

Anzuzeigende Symbolleisten-Elemente. Übergib ein Array mit Elementnamen oder ein Objekt mit benannten Bereichen. Siehe [Toolbar Items](/de/api/toolbar-items).
In einem Array teilt `'|'` die Elemente in Gruppen (in dieser Reihenfolge, unabhängig davon, aus welchen Bereichen die Schaltflächen stammen), und `'~'` schiebt die Elemente dahinter ans Ende der Symbolleiste. Bei Gruppen behält ein Name, der kein eingebautes Element ist, einen Platz für die benutzerdefinierte Schaltfläche dieses Namens aus `customExtensions`; gibt es keine solche Schaltfläche, entfällt der Platz.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Type:** `Boolean`
- **Default:** `false`

Bei `true` legt die Prop `items` fest, welche Elemente **ausgeschlossen** statt eingeschlossen werden.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Type:** `Boolean`
- **Default:** `true`

Zeigt das Bubble-Menü, wenn Text markiert ist: eine Reihe von Icon-Schaltflächen in Gruppen — Fett, Kursiv, Unterstrichen, Durchgestrichen | Hochgestellt, Tiefgestellt | Hervorheben, Inline-Code | Link | Formatierung entfernen. Jede Schaltfläche hat einen Tooltip mit ihrem Tastenkürzel und zeigt an, ob ihre Auszeichnung auf die Markierung angewendet ist. Das Menü wird bei einem markierten Block (Bild, Widget), innerhalb von Code und bei markiertem gesamtem Dokument ausgeblendet.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Type:** `Boolean`
- **Default:** `true`

Zeigt das Floating-Menü in leeren Zeilen: Überschrift 1, Überschrift 2 und eine Aufzählungsliste, in derselben Reihe von Icon-Schaltflächen wie das Bubble-Menü.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Type:** `Boolean`
- **Default:** `true`

Aktiviert das Slash-Befehlsmenü (mit `/` aufrufen).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Type:** `Boolean`
- **Default:** `true`

Zeigt die Wortanzahl in der Fußzeile des Editors.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Type:** `Boolean`
- **Default:** `true`

Zeigt die Zeichenanzahl in der Fußzeile des Editors.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Type:** `Number | null`
- **Default:** `null`

Maximale Zeichenanzahl, die die Tiptap-Erweiterung `CharacterCount` erlaubt. Mit `null` oder ohne die Prop bleibt die Eingabe unbegrenzt. Bei einem Wert größer als `0` zeigt die Fußzeile einen kreisförmigen SVG-Fortschrittsindikator mit farbcodierten Schwellenwerten.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Type:** `String`
- **Default:** `'purple'`

Standardfarbe des kreisförmigen Fortschrittsindikators in der Fußzeile, wenn `limit` gesetzt ist.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Type:** `String`
- **Default:** `'orange'`

Farbe des Fortschrittsindikators, wenn mehr als 75 % des Limits verbraucht sind.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Type:** `String`
- **Default:** `'red'`

Farbe des Fortschrittsindikators, wenn das Zeichenlimit erreicht ist.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Type:** `TiptapifyFooterAlignment`
- **Default:** `'end'`

Ausrichtung der Statuselemente in der Fußzeile. Akzeptiert `'start'`, `'center'` oder `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Type:** `Boolean | TiptapifyAiOptions`
- **Default:** `false`

Aktiviert das Symbolleisten-Element `ai`. Der Editor erstellt eine OpenAI-kompatible `/v1/chat/completions`-Anfrage und übergibt sie an `aiProvider`. Über den Provider-Callback rufst du dein Backend, ein BFF, einen OAuth-geschützten Endpunkt, LM Studio oder einen SDK-Wrapper auf.

```vue
<script setup lang="ts">
const ai = {
  async aiProvider(request) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error('AI request failed')
    }

    return response.json()
  },
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

Beispiel mit dem lokalen LLM LM Studio:

```ts
const ai = {
  model: 'google/gemma-4-12b-qat',
  async aiProvider(request) {
    const response = await fetch('http://127.0.0.1:1234/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    return response.json()
  },
}
```

Streaming-Ausgabe wird unterstützt, indem du `stream: true` setzt und Tokens über das Argument `stream` von `aiProvider` weiterreichst. Das Ergebnisfeld im KI-Dialog wird live aktualisiert, während Chunks eintreffen, und eine Schaltfläche **Stoppen** bricht die laufende Anfrage ab:

```ts
const ai = {
  stream: true,
  async aiProvider(request, context, stream) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal: stream?.signal,
    })

    if (!response.ok || !response.body) {
      throw new Error('AI request failed')
    }

    let content = ''
    let buffer = ''
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        if (!line.startsWith('data: ') || line === 'data: [DONE]') {
          continue
        }

        const { choices } = JSON.parse(line.slice(6))
        const delta = choices?.[0]?.delta ?? {}

        if (delta.reasoning_content) {
          stream?.onReasoning(delta.reasoning_content)
        }

        const chunk = delta.content ?? ''

        if (chunk) {
          content += chunk
          stream?.onChunk(chunk)
        }
      }
    }

    return { content }
  },
}
```

Übergib `stream.signal` an `fetch` (oder deinen SDK-Aufruf), damit die Anfrage abgebrochen wird, wenn der Nutzer auf **Stoppen** klickt oder den Dialog schließt. Teilweise gestreamte Inhalte bleiben im Ergebnisfeld und können übernommen oder verworfen werden. Provider ohne Streaming können das Argument `stream` komplett ignorieren — es ist optional und abwärtskompatibel.

Reasoning-Modelle (Qwen Thinking, DeepSeek, o-Serie) streamen ihre „Gedanken“ in einem separaten `reasoning_content`-Delta. Leite diese Chunks über `stream.onReasoning()` weiter — bei `showReasoning: true` zeigt der Dialog sie in einem einklappbaren Bereich **Nachdenken** über dem Ergebnisfeld an (der Bereich ist standardmäßig ausgeblendet). Die Reasoning-Ausgabe dient nur der Anzeige und wird nie in den Editor eingefügt.

Damit der Nutzer den Denkmodus des Modells pro Anfrage umschalten kann, setze `thinking: true` in den KI-Optionen. Der Dialog zeigt dann einen Schalter **Nachdenken** (standardmäßig an, wird bei jedem Öffnen zurückgesetzt); das Plugin schreibt den Schalterwert als `enable_thinking: true | false` in die Anfrage, sodass du `enable_thinking` nicht mehr selbst in `chatCompletionOptions` setzen musst (und auch nicht solltest):

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
  }"
/>
```

Ist `thinking` `false` oder fehlt es, wird der Schalter nicht angezeigt und das Plugin sendet `enable_thinking: false`, sodass Modelle, die standardmäßig nachdenken (Qwen3, DeepSeek, …), nicht nachdenken.

Damit der Nutzer den Denkaufwand pro Anfrage wählen kann, setze `reasoningEffort` in den KI-Optionen. Der Dialog zeigt dann ein Dropdown **Denkaufwand**, das aus `options` befüllt wird — benutzerdefinierte Aufwandsstufen (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Die Erweiterung fügt dem Dropdown selbst immer einen Eintrag `default` hinzu (die Basis des Denkmodus), daher führst du `default` nie in deiner Konfiguration auf; das Feld `default` der Option wählt beim Öffnen des Dialogs eine deiner benutzerdefinierten Stufen vor (sonst ist `default` vorgewählt), und der Wert wird bei jedem Öffnen zurückgesetzt.
Der gewählte Wert bestimmt, was das Plugin in die Anfrage schreibt: `default` behält den Denkmodus bei — der Schalter **Nachdenken** bleibt aktiv und steuert `enable_thinking`; jeder andere Wert wird stattdessen als `reasoning_effort` gesendet, und der Schalter Nachdenken ist deaktiviert, solange dieser Wert gewählt ist (Provider lehnen `enable_thinking` und `reasoning_effort` in einer einzigen Anfrage ab).
Das Dropdown wird nur angezeigt, wenn `thinking` aktiviert und der Schalter Nachdenken an ist — wird das Nachdenken ausgeschaltet, verschwindet es und `reasoning_effort` wird nicht gesendet (die Anfrage fällt auf `enable_thinking: false` zurück). Fehlt `options` oder ist es leer, wird das Dropdown gar nicht gerendert:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    reasoningEffort: {
      options: ['low', 'medium', 'high', 'xhigh', 'max'],
    },
  }"
/>
```

Der Bereich **Nachdenken** ist standardmäßig ausgeblendet (`showReasoning` ist standardmäßig `false`). Setze `showReasoning: true`, um einen einklappbaren Bereich anzuzeigen, der den Denkprozess des Modells (`reasoning_content`-Delta) streamt, während das Nachdenken aktiv bleibt — das Modell denkt weiterhin nach und das Ergebnis wird auf dieselbe Weise übernommen, nur der schrittweise Denkprozess wird zusätzlich angezeigt:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    showReasoning: true,
  }"
/>
```

Beispiele für eigene Prompts ersetzen die lokalisierten Standardwerte:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    promptExamples: [
      { title: 'Rewrite', prompt: 'Rewrite this in a direct tone.' },
      { title: 'Shorten', prompt: 'Make this shorter.' },
      { title: 'Explain', prompt: 'Explain this for a beginner.' },
    ],
  }"
/>
```

`tokenProvider` und `storage` sind optionale, vom Nutzer bereitgestellte Hooks für direkte Browser-Integrationen. API-Schlüssel oder Provider-Tokens, die in Browser-Code oder im Browser-Speicher liegen, sind für Nutzer sichtbar und dürfen nicht als Geheimnisse behandelt werden. Für produktive Geheimnisse bevorzuge das oben gezeigte Backend-Adapter-Muster.

Mit `mode: 'insert' | 'replace' | 'append'` wählst du den Einfügemodus der Aktionsschaltfläche des Dialogs vor (**Einfügen** / **Ersetzen** / **Anfügen**). Ohne `mode` ist die Schaltfläche standardmäßig **Ersetzen**, wenn beim Öffnen des Dialogs Text markiert ist, sonst **Einfügen**. Die Aktionsschaltfläche ist eine geteilte Schaltfläche: Der Hauptteil übernimmt das Ergebnis im vorgewählten Modus, und ein kleiner „Mehr“-Bereich (⋮) rechts davon öffnet ein Menü mit den anderen Modi — ein Klick darauf übernimmt das Ergebnis sofort in diesem Modus.

Hat der Editor ein `limit` (Zeichenlimit), erscheint unter dem Ergebnisfeld ein Zeichenzähler `generated / limit`, sobald ein Ergebnis erzeugt wurde (er aktualisiert sich live beim Streaming und färbt sich blassrot, wenn das Limit überschritten würde).
Der Dialog zeigt nach der Generierung außerdem die Warnung `ai.limit_exceeded`, falls die KI-Ausgabe das Limit überschreiten würde.
In diesem Zustand sind die Schaltfläche **Einfügen** und ihr Menü für alternative Modi deaktiviert — die Erweiterung `CharacterCount` lehnt jedes Einfügen ab, das das Dokument über das Limit hinaus wachsen ließe, daher wird das Ergebnis ganz oder gar nicht übernommen: Es wird vollständig eingefügt, wenn es passt, und gar nicht, wenn es das Limit überschreitet.
Kürze das Ergebnis, um die Aktion wieder zu aktivieren:

```vue
<Tiptapify
  :content="content"
  :limit="300"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
  }"
/>
```

Mit `systemPrompt`, `temperature`, `chatCompletionOptions` oder `createMessages(context)` passt du die OpenAI-kompatible Chat-Completions-Anfrage an. `context` enthält `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` sind der Text des Absatzes der Markierung davor und danach (jeweils bis zu 500 Zeichen, ohne Markierung leer) — sende sie zusammen mit der Markierung, sonst hält ein Modell das Fragment für den ganzen Text und vervollständigt es.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Type:** `String`
- **Default:** `undefined`

Alternative zu einem eigenen `aiProvider`: Richte die KI-Funktion auf einen LLM-Endpunkt deines Backends, und Tiptapify erstellt und sendet die Anfrage selbst. Das Backend erhält eine minimale JSON-Nutzlast:

- **Always:** `prompt` (die im Dialog eingegebene Anfrage) und `instruction` (dein `systemPrompt`, die System-Nachricht eines eigenen `createMessages` oder der eingebaute Standard).
- **Optional, sent only when set:** `stream` (nur `true`), `thinking` (der Schalter **Nachdenken** des Dialogs, nur `true`), `reasoning_effort` (die gewählte Aufwandsstufe) und `model`.

Die Antwort wird großzügig akzeptiert: ein einfacher String, ein `{ content }`-Objekt oder eine OpenAI-kompatible `choices`-Nutzlast. Bei einer Anfrage mit `stream: true` wird der Antwort-Body als SSE-Stream gelesen (`data:`-Zeilen, abgeschlossen mit `data: [DONE]`): OpenAI-artige Deltas (`choices[0].delta.content` / `.reasoning_content`), ein einfacher Chunk `{ type: 'content' | 'reasoning', data }`, ein flacher Chunk `{ content, reasoning_content }` und `data`-Zeilen mit reinem Text werden alle akzeptiert. Ignoriert das Backend `stream` und antwortet mit einem einfachen Body, wird stattdessen dieser verwendet. Eine Antwort ohne Erfolgsstatus zeigt die Fehlermeldung des Backends (JSON `{ error }` / `{ message }` oder den rohen Body) im Dialog an. Eine Schaltfläche **Stoppen** und das Schließen des Dialogs brechen die laufende Anfrage ab; teilweise gestreamte Inhalte bleiben im Ergebnisfeld erhalten.

Sind sowohl `aiProvider` als auch `aiEndpoint` gesetzt, hat `aiProvider` Vorrang.

```vue
<script setup lang="ts">
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
  thinking: true,
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

### `ai.aiHeaders` {#ai-aiheaders}

- **Type:** `Record<string, string>`
- **Default:** `undefined`

Zusätzliche Header, die mit der `aiEndpoint`-Anfrage gesendet und über `Content-Type: application/json` gemergt werden. Ein hier gesetzter `Authorization`-Header bleibt unverändert; andernfalls wird ein Token aus `tokenProvider` (falls gesetzt) als `Authorization: Bearer <token>` gesendet.

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiEndpoint: '/api/ai/generate',
    aiHeaders: { 'X-Api-Key': '…' },
  }"
  :items="['ai']"
/>
```

### `defaultFontFamily` {#defaultfontfamily}

- **Type:** `String`
- **Default:** `'Inter'`

Standard-Schriftfamilie für den Editorinhalt.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Type:** `String`
- **Default:** `'px'`

Maßeinheit für Schriftgrößenwerte.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Type:** `String`
- **Default:** `'0'`

Eckenradius des Editor-Containers. Akzeptiert Vuetify-Radiuswerte (`sm`, `md`, `lg`, `xl`, `pill` usw.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Type:** `variantBtnTypes`
- **Default:** `'tonal'`

Vuetify-Button-Variante für Symbolleisten-Schaltflächen. Der Wert wird über die Editor-Konfiguration mit jeder Symbolleisten-Komponente geteilt — eigene Komponenten können ihn mit [`useTiptapifyConfig`](/de/api/types#usetiptapifyconfig) lesen. Siehe [`variantBtnTypes`](/de/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Type:** `variantFieldTypes`
- **Default:** `'outlined'`

Vuetify-Variante für Dropdown-Felder der Symbolleiste. Der Wert wird über die Editor-Konfiguration mit jeder Symbolleisten-Komponente geteilt — eigene Komponenten können ihn mit [`useTiptapifyConfig`](/de/api/types#usetiptapifyconfig) lesen. Siehe [`variantFieldTypes`](/de/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Type:** `Array<toolbarSections>`
- **Default:** `[]`

Eigene Symbolleisten-Bereiche, um Symbolleisten-Elemente zu erweitern oder hinzuzufügen. Die Komponenten jedes Bereichs können die geteilte Editor-Konfiguration mit [`useTiptapifyConfig`](/de/api/types#usetiptapifyconfig) lesen. Siehe [Custom Toolbar](/de/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Type:** `Boolean`
- **Default:** `true`

Aktiviert die interaktive Anwendung von Stilen.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Type:** `Boolean`
- **Default:** `false`

Zeigt einen unbestimmten Fortschrittsbalken, solange der Editor lädt.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Type:** `String`
- **Default:** `'default'`

Farbe des Lade-Fortschrittsbalkens. Akzeptiert Vuetify-Themenfarbwerte.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Type:** `String`
- **Default:** `'1px'`

Höhe des Lade-Fortschrittsbalkens.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Type:** `Number`
- **Default:** `0`

Ab dieser Anzahl von Bildern in einer Reihe (ohne etwas dazwischen) ordnet der Editor sie als nummeriertes dreispaltiges Raster an, für Websites, die solche Bilder als Slider darstellen. `0` schaltet das aus.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Type:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/de/api/types#tiptapifyskininput))
- **Default:** `'default'`

Das Erscheinungsbild des Editor-Chromes: Symbolleiste, Bubble-Menüs, Dropdowns, Dialoge, Fußzeile.

- `default` — der klassische Look: eine erhabene Toolbar, Button-Gruppen als erhabene Boxen, Vuetify-Buttons mit einem Primärfarben-Zustand für gedrückt.
- `pastel` — der ruhige Look: eine flache, getönte Toolbar unter einer Haarlinie, Ghost-Buttons mit neutralem gedrückten Zustand, helle Dropdowns, weiche Dialoge.

Funktionen (Bildunterschriften, Slider, das Ausrichtungs-Dropdown, Listenstile) funktionieren in beiden Skins gleich.

```vue
<Tiptapify skin="pastel" />
```

Du kannst auch ein Inline-Skin-Objekt übergeben: Token-Überschreibungen (`colors` / `metrics`) und Form-Flags, optional mit `extends` auf einen registrierten Skin. Es wird über `default` (oder seine Basis) aufgelöst, unter der Klasse `tiptapify-skin-inline` gerendert (`tiptapify-skin-{name}`, wenn das Objekt einen `name` trägt), und seine Tokens landen als CSS-Variablen `--tf-*` am Editor-Root. Eigene Namen kommen von `registerSkin('mint', { … })` — siehe die [Skins-Anleitung](/de/guide/skins) für die Token-Tabelle und die Rezepte.

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Type:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/de/api/types#tiptapifyuploadoptions))
- **Default:** `null`

Der Endpunkt für [Uploads](/de/guide/uploads): In den Bild- und Video-Dialogen gewählte Dateien (sowie ein Video-Poster und das Bild einer Link-Karte) werden mit `POST {endpoint}` (Multipart `file` und `kind`) dorthin gesendet, und das Dokument behält die URL, die er zurückgibt (`{ "url": … }`).

Ohne ihn akzeptiert der Bild-Dialog trotzdem eine Datei: Ein gewähltes Bild (und ein Video-Poster) wird als base64-Data-URL ins Dokument eingebettet, und base64-Bilder bleiben beim Laden des Dokuments erhalten. Der Video-Dialog bietet **Hochladen** nur mit dieser Prop an. Ist `upload` gesetzt, werden base64-Bilder beim Laden des Dokuments verworfen.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Typ:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/de/api/types#tiptapifycontentstyles))
- **Standard:** `'inline'`

Wie das gespeicherte HTML das Aussehen von Link-Karten, Bildern mit Bildunterschrift, Videos, Einbettungen und Aufgabenlisten trägt (siehe [Inhaltsstile](/de/guide/content-styles)): `inline` schreibt es in deren `style`-Attribute, sodass eine Website das HTML unverändert anzeigt; `classes` behält nur Klassen, für eine Website, die `tiptapify/content.css` lädt. Der Editor ignoriert diese Stile beim Laden von HTML, daher lassen sich beide Arten von HTML gleich laden.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Type:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/de/api/types#tiptapifylinkpreviewoptions))
- **Default:** `null`

Der Backend-Endpunkt für [Link-Karten](/de/guide/link-cards): Er liest die OpenGraph-Daten von Seiten, was ein Browser nicht kann (CORS). Der Editor prüft ihn beim Start per Handshake (`GET {endpoint}` muss mit `200 { "tiptapifyLinkPreview": 1 }` antworten); solange er nicht antwortet, bietet nichts eine Karte an.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Events {#events}

### `editor-ready` {#editor-ready}

Wird ausgelöst, wenn die Editor-Instanz bereit ist.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string  // Get current HTML content
  getJSON: () => object  // Get current JSON content
}
```

```vue
<script setup lang="ts">
const onEditorReady = (payload) => {
  console.log(payload.editor)
  console.log(payload.getHTML())
  console.log(payload.getJSON())
}
</script>

<template>
  <Tiptapify @editor-ready="onEditorReady" />
</template>
```

### `content-changed` {#content-changed}

Wird ausgelöst, wenn sich der Editorinhalt ändert.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

```vue
<script setup lang="ts">
const onContentChanged = ({ html, json }) => {
  console.log('HTML:', html)
  console.log('JSON:', json)
}
</script>

<template>
  <Tiptapify @content-changed="onContentChanged" />
</template>
```

### `update:modelValue` {#update-modelvalue}

Unterstützt die `v-model`-Bindung.

```vue
<script setup lang="ts">
import { ref } from 'vue'
const content = ref('<p>Hello</p>')
</script>

<template>
  <Tiptapify v-model="content" />
</template>
```

## Provide / Inject {#provide-inject}

Die Editor-Instanz und die Funktion `t` sind über Vues Provide/Inject verfügbar:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
