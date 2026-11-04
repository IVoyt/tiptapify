# Props {#props}

## Props di `<Tiptapify>` {#tiptapify-props}

### `content` {#content}

- **Tipo:** `String | Object`
- **Predefinito:** `''`

Contenuto iniziale dell'editor. Accetta una stringa HTML o un oggetto JSON di Tiptap.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` è solo il contenuto **iniziale**; per il binding bidirezionale usa `v-model` (vedi `modelValue`).

### `modelValue` {#modelvalue}

- **Tipo:** `String | Object`
- **Predefinito:** `''`

Valore per il binding bidirezionale di `v-model`. Usa `v-model` per mantenere un valore reattivo sincronizzato con l'editor. A ogni modifica il componente emette `update:modelValue` con l'ultimo HTML, che `v-model` riscrive nel tuo ref. Quando si usa solo `v-model` (senza `:content`), il valore associato è il contenuto iniziale dell'editor.

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

- **Tipo:** `String`
- **Predefinito:** `''`

Testo segnaposto mostrato quando l'editor è vuoto.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Tipo:** `Number`
- **Predefinito:** `null`

Altezza minima dell'area del contenuto dell'editor, in pixel.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Tipo:** `Boolean`
- **Predefinito:** `true`

Mostra o nasconde la barra degli strumenti.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Tipo:** `Array<String> | Object`
- **Predefinito:** `[]`

Elementi della barra degli strumenti da mostrare. Passa un array di nomi di elementi o un oggetto con sezioni con nome. Vedi [Elementi della barra degli strumenti](/it/api/toolbar-items).
In un array, `'|'` divide gli elementi in gruppi (in quell'ordine, qualunque sia la sezione di provenienza dei pulsanti) e `'~'` sposta in fondo alla barra gli elementi che lo seguono. Con i gruppi, un nome che non è un elemento integrato riserva un posto al pulsante personalizzato con quel nome proveniente da `customExtensions`; senza un tale pulsante il posto viene scartato.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Tipo:** `Boolean`
- **Predefinito:** `false`

Quando è `true`, la prop `items` specifica gli elementi da **escludere** anziché da includere.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Tipo:** `Boolean`
- **Predefinito:** `true`

Mostra il bubble menu quando del testo è selezionato: una riga di pulsanti con icona raggruppati — grassetto, corsivo, sottolineato, barrato | apice, pedice | evidenziazione, codice inline | link | rimuovi formattazione. Ogni pulsante ha un tooltip con la sua scorciatoia e risulta attivo quando il suo mark è presente nella selezione. Si nasconde per un blocco selezionato (immagine, widget), all'interno del codice e quando l'intero documento è selezionato.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Tipo:** `Boolean`
- **Predefinito:** `true`

Mostra il floating menu sulle righe vuote: titolo 1, titolo 2 ed elenco puntato, nella stessa riga di pulsanti con icona del bubble menu.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Tipo:** `Boolean`
- **Predefinito:** `true`

Abilita il menu dei comandi slash (digita `/` per attivarlo).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Tipo:** `Boolean`
- **Predefinito:** `true`

Mostra il conteggio delle parole nel piè di pagina dell'editor.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Tipo:** `Boolean`
- **Predefinito:** `true`

Mostra il conteggio dei caratteri nel piè di pagina dell'editor.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Tipo:** `Number | null`
- **Predefinito:** `null`

Numero massimo di caratteri consentito dall'estensione `CharacterCount` di Tiptap. Imposta `null` oppure ometti la prop per non avere limiti di modifica. Se impostata a un valore maggiore di `0`, il piè di pagina mostra un indicatore di avanzamento circolare SVG con soglie codificate a colori.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Tipo:** `String`
- **Predefinito:** `'purple'`

Colore predefinito dell'indicatore di avanzamento circolare mostrato nel piè di pagina quando `limit` è impostato.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Tipo:** `String`
- **Predefinito:** `'orange'`

Colore dell'indicatore di avanzamento quando l'utilizzo supera il 75% del limite.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Tipo:** `String`
- **Predefinito:** `'red'`

Colore dell'indicatore di avanzamento quando il limite di caratteri è stato raggiunto.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Tipo:** `TiptapifyFooterAlignment`
- **Predefinito:** `'end'`

Allineamento degli elementi di stato del piè di pagina. Accetta `'start'`, `'center'` o `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Tipo:** `Boolean | TiptapifyAiOptions`
- **Predefinito:** `false`

Abilita l'elemento `ai` della barra degli strumenti. L'editor costruisce una richiesta `/v1/chat/completions` compatibile con OpenAI e la passa ad `aiProvider`. Usa la callback del provider per chiamare il tuo backend, BFF, endpoint protetto da OAuth, LM Studio o un wrapper di SDK.

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

Esempio con LLM locale LM Studio:

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

Lo streaming dell'output è supportato impostando `stream: true` e inviando i token tramite l'argomento `stream` di `aiProvider`. Il campo del risultato nella finestra AI si aggiorna in tempo reale all'arrivo dei chunk, e un pulsante **Ferma** annulla la richiesta in corso:

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

Passa `stream.signal` a `fetch` (o alla chiamata del tuo SDK) in modo che la richiesta venga annullata quando l'utente fa clic su **Ferma** o chiude la finestra. Il contenuto già ricevuto in streaming resta nel campo del risultato e può essere applicato o scartato. I provider che non fanno streaming possono ignorare del tutto l'argomento `stream`: è facoltativo e retrocompatibile.

I modelli di ragionamento (Qwen thinking, DeepSeek, serie o) trasmettono i propri "pensieri" in un delta `reasoning_content` separato. Inoltra quei chunk tramite `stream.onReasoning()`: con `showReasoning: true`, la finestra li mostra in un pannello comprimibile **Riflessione** sopra il campo del risultato (il pannello è nascosto per impostazione predefinita). L'output del ragionamento è solo da visualizzare e non viene mai inserito nell'editor.

Per permettere all'utente di cambiare la modalità di riflessione del modello a ogni richiesta, imposta `thinking: true` nelle opzioni AI. La finestra mostra allora un interruttore **Riflessione** (attivo per impostazione predefinita, reimpostato a ogni apertura); il plugin scrive il valore dell'interruttore nella richiesta come `enable_thinking: true | false`, quindi non devi più (né dovresti) impostare tu `enable_thinking` in `chatCompletionOptions`:

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

Quando `thinking` è `false` oppure omesso, l'interruttore non viene mostrato e il plugin invia `enable_thinking: false`, così i modelli che riflettono per impostazione predefinita (Qwen3, DeepSeek, …) non lo fanno.

Per permettere all'utente di scegliere il livello di ragionamento a ogni richiesta, imposta `reasoningEffort` nelle opzioni AI. La finestra mostra allora un menu a discesa **Livello di ragionamento** popolato da `options`: livelli di sforzo personalizzati (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
L'estensione aggiunge sempre da sé una voce `default` al menu (la base della modalità thinking), quindi non devi mai elencare `default` nella tua configurazione; il campo `default` dell'opzione preseleziona uno dei tuoi livelli personalizzati all'apertura della finestra (altrimenti viene preselezionato `default`) e il valore viene reimpostato a ogni apertura.
Il valore selezionato decide cosa il plugin scrive nella richiesta: `default` mantiene la modalità thinking, l'interruttore **Riflessione** resta attivo e controlla `enable_thinking`; qualsiasi altro valore viene invece inviato come `reasoning_effort`, e l'interruttore Riflessione è disabilitato finché è selezionato quel valore (i provider rifiutano `enable_thinking` e `reasoning_effort` in una stessa richiesta).
Il menu a discesa viene mostrato solo quando `thinking` è abilitato e l'interruttore Riflessione è attivo: disattivando la riflessione si nasconde e `reasoning_effort` non viene inviato (la richiesta ripiega su `enable_thinking: false`). Quando `options` è assente o vuoto, il menu non viene reso affatto:

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

Il pannello **Riflessione** è nascosto per impostazione predefinita (`showReasoning` vale `false`). Imposta `showReasoning: true` per mostrare un pannello comprimibile che trasmette in streaming il processo di ragionamento del modello (il delta `reasoning_content`) mantenendo attiva la riflessione: il modello ragiona comunque e il risultato viene applicato nello stesso modo, in più viene mostrato il ragionamento passo dopo passo:

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

Gli esempi di prompt personalizzati sostituiscono quelli predefiniti localizzati:

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

`tokenProvider` e `storage` sono hook facoltativi gestiti dal consumatore per le integrazioni dirette dal browser. Le chiavi API o i token del provider inseriti nel codice del browser o nello storage del browser sono visibili agli utenti e non vanno trattati come segreti. Per i segreti in produzione preferisci il pattern con adapter backend illustrato sopra.

Usa `mode: 'insert' | 'replace' | 'append'` per preselezionare la modalità di inserimento sul pulsante d'azione della finestra (**Inserisci** / **Sostituisci** / **Aggiungi alla fine**). Senza `mode`, il pulsante usa **Sostituisci** quando all'apertura della finestra è selezionato del testo e **Inserisci** negli altri casi. Il pulsante d'azione è un pulsante diviso: la parte principale applica il risultato nella modalità preselezionata, e una piccola sezione "altro" (⋮) sulla destra apre un menu con le altre modalità: facendo clic su una, il risultato viene applicato subito in quella modalità.

Quando l'editor ha un `limit` (limite di caratteri), sotto il campo del risultato compare un contatore di caratteri `generated / limit` non appena viene generato un risultato (si aggiorna in tempo reale durante lo streaming e diventa rosso tenue quando il limite verrebbe superato).
Subito dopo la generazione la finestra mostra anche l'avviso `ai.limit_exceeded` se l'output dell'AI supererebbe il limite.
In quello stato il pulsante **Inserisci** e il suo menu delle modalità alternative sono disabilitati: l'estensione `CharacterCount` rifiuta qualsiasi inserimento che farebbe superare al documento il limite, quindi il risultato viene applicato per intero o per niente: viene inserito completamente se ci sta, oppure non viene inserito affatto se supera il limite.
Accorcia il risultato per riabilitare l'azione:

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

Usa `systemPrompt`, `temperature`, `chatCompletionOptions` o `createMessages(context)` per personalizzare la richiesta di chat-completions compatibile con OpenAI. `context` contiene `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` sono il testo del paragrafo della selezione attorno ad essa (fino a 500 caratteri ciascuno, vuoti senza selezione): inviali insieme alla selezione, altrimenti un modello scambia il frammento per l'intero testo e lo completa.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Tipo:** `String`
- **Predefinito:** `undefined`

Alternativa a un `aiProvider` personalizzato: punta la funzione AI a un endpoint LLM sul backend e tiptapify costruisce e invia la richiesta da sé. Il backend riceve un payload JSON minimo:

- **Sempre:** `prompt` (la richiesta digitata nella finestra) e `instruction` (il tuo `systemPrompt`, il messaggio di sistema di un `createMessages` personalizzato oppure il valore predefinito integrato).
- **Facoltativi, inviati solo se impostati:** `stream` (solo `true`), `thinking` (l'interruttore **Riflessione** della finestra, solo `true`), `reasoning_effort` (il livello di sforzo selezionato) e `model`.

La risposta è accettata in modo permissivo: una stringa semplice, un oggetto `{ content }` oppure un payload `choices` compatibile con OpenAI. Quando la richiesta ha `stream: true`, il corpo della risposta viene letto come stream SSE (righe `data:`, terminato da `data: [DONE]`): vengono accettati i delta in stile OpenAI (`choices[0].delta.content` / `.reasoning_content`), un semplice chunk `{ type: 'content' | 'reasoning', data }`, un chunk piatto `{ content, reasoning_content }` e righe `data` di testo semplice. Se il backend ignora `stream` e risponde con un corpo semplice, viene usato quel corpo. Una risposta non OK mostra nella finestra il messaggio di errore del backend (JSON `{ error }` / `{ message }` oppure il corpo grezzo). Un pulsante **Ferma** e la chiusura della finestra interrompono la richiesta in corso; il contenuto già ricevuto in streaming resta nel campo del risultato.

Se sono impostati sia `aiProvider` sia `aiEndpoint`, vince `aiProvider`.

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

- **Tipo:** `Record<string, string>`
- **Predefinito:** `undefined`

Header aggiuntivi inviati con la richiesta `aiEndpoint`, uniti sopra `Content-Type: application/json`. Un header `Authorization` impostato qui viene mantenuto così com'è; altrimenti un token da `tokenProvider` (se impostato) viene inviato come `Authorization: Bearer <token>`.

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

- **Tipo:** `String`
- **Predefinito:** `'Inter'`

Famiglia di caratteri predefinita per il contenuto dell'editor.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Tipo:** `String`
- **Predefinito:** `'px'`

Unità di misura per i valori della dimensione del carattere.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Tipo:** `String`
- **Predefinito:** `'0'`

Raggio del bordo del contenitore dell'editor. Accetta i valori di raggio di Vuetify (`sm`, `md`, `lg`, `xl`, `pill`, ecc.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Tipo:** `variantBtnTypes`
- **Predefinito:** `'tonal'`

Variante dei pulsanti Vuetify per i pulsanti della barra degli strumenti. Il valore è condiviso con ogni componente della barra degli strumenti tramite la configurazione dell'editor: i componenti personalizzati possono leggerlo con [`useTiptapifyConfig`](/it/api/types#usetiptapifyconfig). Vedi [`variantBtnTypes`](/it/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Tipo:** `variantFieldTypes`
- **Predefinito:** `'outlined'`

Variante Vuetify per i campi a discesa della barra degli strumenti. Il valore è condiviso con ogni componente della barra degli strumenti tramite la configurazione dell'editor: i componenti personalizzati possono leggerlo con [`useTiptapifyConfig`](/it/api/types#usetiptapifyconfig). Vedi [`variantFieldTypes`](/it/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Tipo:** `Array<toolbarSections>`
- **Predefinito:** `[]`

Fornisce sezioni personalizzate della barra degli strumenti per estendere o aggiungere elementi. I componenti di ogni sezione possono leggere la configurazione condivisa dell'editor con [`useTiptapifyConfig`](/it/api/types#usetiptapifyconfig). Vedi [Barra degli strumenti personalizzata](/it/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Tipo:** `Boolean`
- **Predefinito:** `true`

Abilita l'applicazione interattiva degli stili.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Tipo:** `Boolean`
- **Predefinito:** `false`

Mostra una barra di avanzamento indeterminata mentre l'editor si sta caricando.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Tipo:** `String`
- **Predefinito:** `'default'`

Colore della barra di avanzamento del caricamento. Accetta i valori di colore del tema Vuetify.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Tipo:** `String`
- **Predefinito:** `'1px'`

Altezza della barra di avanzamento del caricamento.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Tipo:** `Number`
- **Predefinito:** `0`

A partire da questo numero di immagini consecutive (senza nulla in mezzo) l'editor le dispone in una griglia numerata a tre colonne, per i siti che mostrano tali immagini come slider. `0` lo disattiva.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Tipo:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/it/api/types#tiptapifyskininput))
- **Predefinito:** `'default'`

L'aspetto dell'interfaccia dell'editor: barra degli strumenti, bubble menu, menu a discesa, finestre di dialogo, piè di pagina.

- `default` — l'aspetto classico: una barra degli strumenti in rilievo, gruppi di pulsanti come riquadri in rilievo, pulsanti Vuetify con uno stato premuto nel colore primario.
- `pastel` — l'aspetto discreto: una barra degli strumenti piatta e tinta sotto una linea sottile, pulsanti ghost con uno stato premuto neutro, menu a discesa chiari, finestre di dialogo morbide.

Le funzionalità (didascalie delle immagini, slider, menu a discesa dell'allineamento, stili degli elenchi) funzionano allo stesso modo in entrambe le skin.

```vue
<Tiptapify skin="pastel" />
```

Puoi anche passare un oggetto skin inline: override dei token (`colors` / `metrics`) e flag di forma, con `extends` facoltativo verso una skin registrata. Viene risolto sopra `default` (o la sua base), viene reso con la classe `tiptapify-skin-inline` (`tiptapify-skin-{name}` quando l'oggetto ha un `name`) e i suoi token diventano variabili CSS `--tf-*` sulla radice dell'editor. I nomi personalizzati provengono da `registerSkin('mint', { … })`: per la tabella dei token e le ricette vedi la [guida alle skin](/it/guide/skins).

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Tipo:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/it/api/types#tiptapifyuploadoptions))
- **Predefinito:** `null`

L'endpoint dei [caricamenti](/it/guide/uploads): i file scelti nelle finestre di immagini e video (e il poster di un video, l'immagine di una scheda link) vengono inviati con `POST {endpoint}` (`file` e `kind` in multipart), e il documento conserva l'URL con cui risponde (`{ "url": … }`).

Senza questa prop la finestra delle immagini accetta comunque un file: un'immagine scelta (e il poster di un video) viene incorporata nel documento come data URL base64, e le immagini base64 vengono mantenute al caricamento del documento. La finestra video offre **Carica** solo con questa prop. Con `upload` impostato, le immagini base64 vengono rimosse al caricamento del documento.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Tipo:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/it/api/types#tiptapifycontentstyles))
- **Predefinito:** `'inline'`

Come l'HTML salvato porta con sé l'aspetto di link card, immagini con didascalia, video, embed ed elenchi di attività (vedi [Stili del contenuto](/it/guide/content-styles)): `inline` lo scrive negli attributi `style` di questi elementi, così un sito mostra l'HTML così com'è; `classes` mantiene solo le classi, per un sito che carica `tiptapify/content.css`. L'editor ignora questi stili quando carica l'HTML, quindi entrambi i tipi di HTML si ricaricano allo stesso modo.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Tipo:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/it/api/types#tiptapifylinkpreviewoptions))
- **Predefinito:** `null`

L'endpoint backend delle [schede dei link](/it/guide/link-cards): legge i dati OpenGraph delle pagine, cosa che un browser non può fare (CORS). L'editor lo verifica con un handshake all'avvio (`GET {endpoint}` deve rispondere `200 { "tiptapifyLinkPreview": 1 }`); finché non risponde, nulla offre una scheda.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Eventi {#events}

### `editor-ready` {#editor-ready}

Emesso quando l'istanza dell'editor è pronta.

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

Emesso quando il contenuto dell'editor cambia.

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

Supporta il binding `v-model`.

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

L'istanza dell'editor e la funzione `t` sono disponibili tramite provide/inject di Vue:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
