# Props {#props}

## Props του `<Tiptapify>` {#tiptapify-props}

### `content` {#content}

- **Τύπος:** `String | Object`
- **Προεπιλογή:** `''`

Αρχικό περιεχόμενο του επεξεργαστή. Δέχεται συμβολοσειρά HTML ή αντικείμενο JSON του Tiptap.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

Το `content` είναι μόνο το **αρχικό** περιεχόμενο· για αμφίδρομη σύνδεση χρησιμοποιήστε το `v-model` (δείτε το `modelValue`).

### `modelValue` {#modelvalue}

- **Τύπος:** `String | Object`
- **Προεπιλογή:** `''`

Τιμή αμφίδρομης σύνδεσης για το `v-model`. Χρησιμοποιήστε το `v-model` για να κρατάτε μια αντιδραστική τιμή συγχρονισμένη με τον επεξεργαστή. Σε κάθε επεξεργασία το στοιχείο εκπέμπει `update:modelValue` με το τελευταίο HTML, το οποίο το `v-model` γράφει πίσω στο ref σας. Όταν χρησιμοποιείται μόνο το `v-model` (χωρίς `:content`), η συνδεδεμένη τιμή είναι το αρχικό περιεχόμενο του επεξεργαστή.

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

- **Τύπος:** `String`
- **Προεπιλογή:** `''`

Κείμενο υποκαταστάτη που εμφανίζεται όταν ο επεξεργαστής είναι κενός.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **Τύπος:** `Number`
- **Προεπιλογή:** `null`

Ελάχιστο ύψος της περιοχής περιεχομένου του επεξεργαστή σε pixel.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **Τύπος:** `Boolean`
- **Προεπιλογή:** `true`

Εμφάνιση ή απόκρυψη της γραμμής εργαλείων.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **Τύπος:** `Array<String> | Object`
- **Προεπιλογή:** `[]`

Στοιχεία γραμμής εργαλείων προς εμφάνιση. Περάστε έναν πίνακα με ονόματα στοιχείων ή ένα αντικείμενο με ονομασμένες ενότητες. Δείτε [Στοιχεία γραμμής εργαλείων](/el/api/toolbar-items).
Σε έναν πίνακα, το `'|'` χωρίζει τα στοιχεία σε ομάδες (με αυτή τη σειρά, ανεξάρτητα από τις ενότητες από τις οποίες προέρχονται τα κουμπιά) και το `'~'` σπρώχνει τα στοιχεία που το ακολουθούν στο τέλος της γραμμής εργαλείων. Με ομάδες, ένα όνομα που δεν είναι ενσωματωμένο στοιχείο κρατά θέση για το προσαρμοσμένο κουμπί με αυτό το όνομα από το `customExtensions`· χωρίς τέτοιο κουμπί η θέση παραλείπεται.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **Τύπος:** `Boolean`
- **Προεπιλογή:** `false`

Όταν είναι `true`, το prop `items` ορίζει τα στοιχεία που θα **εξαιρεθούν** αντί να συμπεριληφθούν.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **Τύπος:** `Boolean`
- **Προεπιλογή:** `true`

Εμφάνιση του bubble menu όταν επιλέγεται κείμενο: μία σειρά κουμπιών εικονιδίων σε ομάδες — έντονο, πλάγιο, υπογράμμιση, διαγράμμιση | εκθέτης, δείκτης | επισήμανση, ενσωματωμένος κώδικας | σύνδεσμος | εκκαθάριση μορφοποίησης. Κάθε κουμπί έχει tooltip με τη συντόμευσή του και φαίνεται ενεργό όταν το αντίστοιχο mark υπάρχει στην επιλογή. Κρύβεται για επιλεγμένο μπλοκ (εικόνα, widget), μέσα σε κώδικα και όταν είναι επιλεγμένο ολόκληρο το έγγραφο.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **Τύπος:** `Boolean`
- **Προεπιλογή:** `true`

Εμφάνιση του πλωτού μενού σε κενές γραμμές: επικεφαλίδα 1, επικεφαλίδα 2 και λίστα με κουκκίδες, στην ίδια σειρά κουμπιών εικονιδίων με το bubble menu.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **Τύπος:** `Boolean`
- **Προεπιλογή:** `true`

Ενεργοποίηση του μενού εντολών με κάθετο (πληκτρολογήστε `/` για να ανοίξει).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **Τύπος:** `Boolean`
- **Προεπιλογή:** `true`

Εμφάνιση του πλήθους λέξεων στο υποσέλιδο του επεξεργαστή.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **Τύπος:** `Boolean`
- **Προεπιλογή:** `true`

Εμφάνιση του πλήθους χαρακτήρων στο υποσέλιδο του επεξεργαστή.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **Τύπος:** `Number | null`
- **Προεπιλογή:** `null`

Μέγιστος αριθμός χαρακτήρων που επιτρέπει η επέκταση `CharacterCount` του Tiptap. Ορίστε `null` ή παραλείψτε το prop για απεριόριστη επεξεργασία. Όταν οριστεί σε τιμή μεγαλύτερη από `0`, το υποσέλιδο δείχνει έναν κυκλικό δείκτη προόδου SVG με χρωματικά κατώφλια.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **Τύπος:** `String`
- **Προεπιλογή:** `'purple'`

Προεπιλεγμένο χρώμα του κυκλικού δείκτη προόδου που εμφανίζεται στο υποσέλιδο όταν έχει οριστεί το `limit`.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **Τύπος:** `String`
- **Προεπιλογή:** `'orange'`

Χρώμα του δείκτη προόδου όταν η χρήση ξεπερνά το 75% του ορίου.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **Τύπος:** `String`
- **Προεπιλογή:** `'red'`

Χρώμα του δείκτη προόδου όταν έχει συμπληρωθεί το όριο χαρακτήρων.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **Τύπος:** `TiptapifyFooterAlignment`
- **Προεπιλογή:** `'end'`

Στοίχιση των στοιχείων κατάστασης του υποσέλιδου. Δέχεται `'start'`, `'center'` ή `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **Τύπος:** `Boolean | TiptapifyAiOptions`
- **Προεπιλογή:** `false`

Ενεργοποιεί το στοιχείο `ai` της γραμμής εργαλείων. Ο επεξεργαστής δημιουργεί ένα αίτημα `/v1/chat/completions` συμβατό με OpenAI και το περνά στο `aiProvider`. Χρησιμοποιήστε το callback του παρόχου για να καλέσετε το backend σας, ένα BFF, ένα endpoint με προστασία OAuth, το LM Studio ή ένα περιτύλιγμα SDK.

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

Παράδειγμα με τοπικό LLM LM Studio:

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

Η έξοδος σε ροή υποστηρίζεται ορίζοντας `stream: true` και στέλνοντας tokens μέσω του ορίσματος `stream` του `aiProvider`. Το πεδίο αποτελέσματος στον διάλογο AI ενημερώνεται ζωντανά καθώς φτάνουν τα chunks, και ένα κουμπί **Διακοπή** ακυρώνει το αίτημα που βρίσκεται σε εξέλιξη:

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

Περάστε το `stream.signal` στο `fetch` (ή στην κλήση του SDK σας) ώστε το αίτημα να ακυρώνεται όταν ο χρήστης κάνει κλικ στο **Διακοπή** ή κλείνει τον διάλογο. Το περιεχόμενο που έχει ήδη φτάσει μένει στο πεδίο αποτελέσματος και μπορεί να εφαρμοστεί ή να απορριφθεί. Οι πάροχοι που δεν κάνουν ροή μπορούν να αγνοήσουν εντελώς το όρισμα `stream` — είναι προαιρετικό και συμβατό προς τα πίσω.

Τα μοντέλα συλλογισμού (Qwen thinking, DeepSeek, o-series) στέλνουν σε ροή τις «σκέψεις» τους σε ξεχωριστό delta `reasoning_content`. Προωθήστε αυτά τα chunks μέσω του `stream.onReasoning()` — όταν `showReasoning: true`, ο διάλογος τα αποδίδει σε ένα αναδιπλούμενο πάνελ **Σκέψη** πάνω από το πεδίο αποτελέσματος (το πάνελ είναι κρυμμένο από προεπιλογή). Η έξοδος συλλογισμού προορίζεται μόνο για εμφάνιση και δεν εισάγεται ποτέ στον επεξεργαστή.

Για να μπορεί ο χρήστης να αλλάζει τη λειτουργία σκέψης του μοντέλου ανά αίτημα, ορίστε `thinking: true` στις επιλογές AI. Ο διάλογος τότε δείχνει έναν διακόπτη **Σκέψη** (ενεργός από προεπιλογή, επαναφέρεται σε κάθε άνοιγμα)· το πρόσθετο γράφει την τιμή του διακόπτη στο αίτημα ως `enable_thinking: true | false`, οπότε δεν χρειάζεται πλέον (και δεν πρέπει) να ορίζετε εσείς το `enable_thinking` στα `chatCompletionOptions`:

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

Όταν το `thinking` είναι `false` ή παραλείπεται, ο διακόπτης δεν εμφανίζεται και το πρόσθετο στέλνει `enable_thinking: false`, ώστε τα μοντέλα που σκέφτονται από προεπιλογή (Qwen3, DeepSeek, …) να μη σκέφτονται.

Για να μπορεί ο χρήστης να επιλέγει την προσπάθεια συλλογισμού ανά αίτημα, ορίστε το `reasoningEffort` στις επιλογές AI. Ο διάλογος τότε δείχνει ένα αναπτυσσόμενο μενού **Προσπάθεια συλλογισμού** που γεμίζει από το `options` — προσαρμοσμένα επίπεδα προσπάθειας (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
Η επέκταση προσθέτει πάντα η ίδια ένα στοιχείο `default` στο μενού (τη βάση της λειτουργίας σκέψης), οπότε δεν απαριθμείτε ποτέ το `default` στη ρύθμισή σας· το πεδίο `default` της επιλογής προεπιλέγει ένα από τα προσαρμοσμένα επίπεδά σας όταν ανοίγει ο διάλογος (αλλιώς προεπιλέγεται το `default`), και η τιμή επαναφέρεται σε κάθε άνοιγμα.
Η επιλεγμένη τιμή αποφασίζει τι γράφει το πρόσθετο στο αίτημα: το `default` διατηρεί τη λειτουργία σκέψης — ο διακόπτης **Σκέψη** μένει ενεργός και ελέγχει το `enable_thinking`· κάθε άλλη τιμή στέλνεται αντί γι' αυτό ως `reasoning_effort`, και ο διακόπτης Σκέψη απενεργοποιείται όσο είναι επιλεγμένη αυτή η τιμή (οι πάροχοι απορρίπτουν τα `enable_thinking` και `reasoning_effort` στο ίδιο αίτημα).
Το αναπτυσσόμενο μενού εμφανίζεται μόνο όταν το `thinking` είναι ενεργό και ο διακόπτης Σκέψη είναι ενεργός — η απενεργοποίηση της σκέψης το κρύβει και το `reasoning_effort` δεν στέλνεται (το αίτημα επιστρέφει σε `enable_thinking: false`). Όταν το `options` λείπει ή είναι κενό, το αναπτυσσόμενο μενού δεν αποδίδεται καθόλου:

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

Το πάνελ **Σκέψη** είναι κρυμμένο από προεπιλογή (το `showReasoning` έχει προεπιλογή `false`). Ορίστε `showReasoning: true` για να εμφανιστεί ένα αναδιπλούμενο πάνελ που δείχνει σε ροή τη διαδικασία συλλογισμού του μοντέλου (delta `reasoning_content`) ενώ η σκέψη μένει ενεργή — το μοντέλο συνεχίζει να συλλογίζεται και το αποτέλεσμα εφαρμόζεται με τον ίδιο τρόπο, απλώς εμφανίζεται επιπλέον ο συλλογισμός βήμα προς βήμα:

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

Τα προσαρμοσμένα παραδείγματα prompt αντικαθιστούν τις τοπικοποιημένες προεπιλογές:

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

Τα `tokenProvider` και `storage` είναι προαιρετικά hooks υπό την ευθύνη του καταναλωτή για απευθείας ενσωματώσεις στον browser. Τα κλειδιά API ή τα tokens παρόχου που τοποθετούνται σε κώδικα ή αποθήκευση του browser είναι ορατά στους χρήστες και δεν πρέπει να θεωρούνται μυστικά. Προτιμήστε το πρότυπο προσαρμογέα backend παραπάνω για μυστικά παραγωγής.

Χρησιμοποιήστε `mode: 'insert' | 'replace' | 'append'` για να προεπιλέξετε τη λειτουργία εισαγωγής στο κουμπί ενέργειας του διαλόγου (**Εισαγωγή** / **Αντικατάσταση** / **Προσθήκη στο τέλος**). Χωρίς `mode`, το κουμπί έχει προεπιλογή **Αντικατάσταση** όταν υπάρχει επιλεγμένο κείμενο κατά το άνοιγμα του διαλόγου και **Εισαγωγή** σε αντίθετη περίπτωση. Το κουμπί ενέργειας είναι split button: το κύριο μέρος εφαρμόζει το αποτέλεσμα στην προεπιλεγμένη λειτουργία, και ένα μικρό τμήμα «περισσότερα» (⋮) στα δεξιά του ανοίγει μενού με τις υπόλοιπες λειτουργίες — το κλικ σε μία εφαρμόζει αμέσως το αποτέλεσμα με αυτή τη λειτουργία.

Όταν ο επεξεργαστής έχει `limit` (όριο χαρακτήρων), κάτω από το πεδίο αποτελέσματος εμφανίζεται μετρητής χαρακτήρων `generated / limit` μόλις δημιουργηθεί ένα αποτέλεσμα (ενημερώνεται ζωντανά κατά τη ροή και γίνεται απαλό κόκκινο όταν το όριο θα ξεπεραστεί).
Ο διάλογος δείχνει επίσης την προειδοποίηση `ai.limit_exceeded` αμέσως μετά τη δημιουργία αν η έξοδος του AI θα ξεπερνούσε το όριο.
Σε αυτή την κατάσταση το κουμπί **Εισαγωγή** και το μενού των εναλλακτικών λειτουργιών του απενεργοποιούνται — η επέκταση `CharacterCount` απορρίπτει κάθε εισαγωγή που θα αύξανε το έγγραφο πέρα από το όριο, οπότε το αποτέλεσμα εφαρμόζεται ολόκληρο ή καθόλου: εισάγεται πλήρως όταν χωρά, ή δεν εισάγεται καθόλου όταν ξεπερνά το όριο.
Συντομεύστε το αποτέλεσμα για να ενεργοποιηθεί ξανά η ενέργεια:

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

Χρησιμοποιήστε τα `systemPrompt`, `temperature`, `chatCompletionOptions` ή `createMessages(context)` για να προσαρμόσετε το αίτημα chat-completions συμβατό με OpenAI. Το `context` περιέχει `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: τα `textBefore` / `textAfter` είναι το κείμενο της παραγράφου της επιλογής γύρω από αυτήν (έως 500 χαρακτήρες το καθένα, κενά χωρίς επιλογή) — στείλτε τα μαζί με την επιλογή, αλλιώς το μοντέλο θεωρεί το τμήμα ολόκληρο το κείμενο και το συμπληρώνει.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **Τύπος:** `String`
- **Προεπιλογή:** `undefined`

Εναλλακτική στον προσαρμοσμένο `aiProvider`: κατευθύνετε τη λειτουργία AI σε ένα endpoint LLM του backend και το tiptapify δημιουργεί και στέλνει το ίδιο το αίτημα. Το backend λαμβάνει ένα ελάχιστο payload JSON:

- **Πάντα:** `prompt` (το αίτημα που πληκτρολογήθηκε στον διάλογο) και `instruction` (το `systemPrompt` σας, το μήνυμα συστήματος ενός προσαρμοσμένου `createMessages` ή η ενσωματωμένη προεπιλογή).
- **Προαιρετικά, στέλνονται μόνο όταν οριστούν:** `stream` (μόνο `true`), `thinking` (ο διακόπτης **Σκέψη** του διαλόγου, μόνο `true`), `reasoning_effort` (το επιλεγμένο επίπεδο προσπάθειας) και `model`.

Η απάντηση γίνεται δεκτή με ελαστικότητα: απλή συμβολοσειρά, αντικείμενο `{ content }` ή payload `choices` συμβατό με OpenAI. Όταν το αίτημα έχει `stream: true`, το σώμα της απάντησης διαβάζεται ως ροή SSE (γραμμές `data:`, που τερματίζονται με `data: [DONE]`): γίνονται δεκτά deltas τύπου OpenAI (`choices[0].delta.content` / `.reasoning_content`), ένα απλό chunk `{ type: 'content' | 'reasoning', data }`, ένα επίπεδο chunk `{ content, reasoning_content }` και γραμμές `data` απλού κειμένου. Αν το backend αγνοήσει το `stream` και απαντήσει με απλό σώμα, χρησιμοποιείται εκείνο το σώμα. Μια απάντηση που δεν είναι OK προβάλλει στον διάλογο το μήνυμα σφάλματος του backend (JSON `{ error }` / `{ message }` ή το ωμό σώμα). Ένα κουμπί **Διακοπή** και το κλείσιμο του διαλόγου ακυρώνουν το αίτημα σε εξέλιξη· το περιεχόμενο που έχει ήδη φτάσει διατηρείται στο πεδίο αποτελέσματος.

Αν έχουν οριστεί και τα δύο, `aiProvider` και `aiEndpoint`, υπερισχύει το `aiProvider`.

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

- **Τύπος:** `Record<string, string>`
- **Προεπιλογή:** `undefined`

Πρόσθετες κεφαλίδες που στέλνονται με το αίτημα `aiEndpoint`, συγχωνευμένες πάνω από το `Content-Type: application/json`. Μια κεφαλίδα `Authorization` που ορίζεται εδώ διατηρείται ως έχει· διαφορετικά ένα token από το `tokenProvider` (όταν έχει οριστεί) στέλνεται ως `Authorization: Bearer <token>`.

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

- **Τύπος:** `String`
- **Προεπιλογή:** `'Inter'`

Προεπιλεγμένη οικογένεια γραμματοσειράς για το περιεχόμενο του επεξεργαστή.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **Τύπος:** `String`
- **Προεπιλογή:** `'px'`

Μονάδα μέτρησης για τις τιμές μεγέθους γραμματοσειράς.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **Τύπος:** `String`
- **Προεπιλογή:** `'0'`

Ακτίνα περιγράμματος για το κοντέινερ του επεξεργαστή. Δέχεται τιμές ακτίνας του Vuetify (`sm`, `md`, `lg`, `xl`, `pill` κ.λπ.).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **Τύπος:** `variantBtnTypes`
- **Προεπιλογή:** `'tonal'`

Παραλλαγή κουμπιού Vuetify για τα κουμπιά της γραμμής εργαλείων. Η τιμή μοιράζεται με κάθε στοιχείο της γραμμής εργαλείων μέσω των ρυθμίσεων του επεξεργαστή — τα προσαρμοσμένα στοιχεία μπορούν να την διαβάσουν με το [`useTiptapifyConfig`](/el/api/types#usetiptapifyconfig). Δείτε το [`variantBtnTypes`](/el/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **Τύπος:** `variantFieldTypes`
- **Προεπιλογή:** `'outlined'`

Παραλλαγή Vuetify για τα αναπτυσσόμενα πεδία της γραμμής εργαλείων. Η τιμή μοιράζεται με κάθε στοιχείο της γραμμής εργαλείων μέσω των ρυθμίσεων του επεξεργαστή — τα προσαρμοσμένα στοιχεία μπορούν να την διαβάσουν με το [`useTiptapifyConfig`](/el/api/types#usetiptapifyconfig). Δείτε το [`variantFieldTypes`](/el/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **Τύπος:** `Array<toolbarSections>`
- **Προεπιλογή:** `[]`

Παρέχει προσαρμοσμένες ενότητες γραμμής εργαλείων για επέκταση ή προσθήκη στοιχείων. Τα στοιχεία κάθε ενότητας μπορούν να διαβάσουν τις κοινές ρυθμίσεις του επεξεργαστή με το [`useTiptapifyConfig`](/el/api/types#usetiptapifyconfig). Δείτε [Προσαρμοσμένη γραμμή εργαλείων](/el/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **Τύπος:** `Boolean`
- **Προεπιλογή:** `true`

Ενεργοποίηση διαδραστικής εφαρμογής στυλ.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **Τύπος:** `Boolean`
- **Προεπιλογή:** `false`

Εμφάνιση αόριστης γραμμής προόδου όσο φορτώνει ο επεξεργαστής.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **Τύπος:** `String`
- **Προεπιλογή:** `'default'`

Χρώμα της γραμμής προόδου φόρτωσης. Δέχεται τιμές χρωμάτων θέματος του Vuetify.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **Τύπος:** `String`
- **Προεπιλογή:** `'1px'`

Ύψος της γραμμής προόδου φόρτωσης.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **Τύπος:** `Number`
- **Προεπιλογή:** `0`

Από τόσες εικόνες στη σειρά (χωρίς τίποτα ανάμεσά τους) και πάνω, ο επεξεργαστής τις διατάσσει σε αριθμημένο πλέγμα τριών στηλών, για ιστότοπους που εμφανίζουν τέτοιες εικόνες ως slider. Το `0` το απενεργοποιεί.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **Τύπος:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/el/api/types#tiptapifyskininput))
- **Προεπιλογή:** `'default'`

Η εμφάνιση του περιβλήματος του επεξεργαστή: γραμμή εργαλείων, bubble menus, αναπτυσσόμενα μενού, διάλογοι, υποσέλιδο.

- `default` — η κλασική εμφάνιση: μια ανασηκωμένη γραμμή εργαλείων, ομάδες κουμπιών ως ανασηκωμένα πλαίσια, κουμπιά Vuetify με κύρια κατάσταση πατήματος.
- `pastel` — η ήρεμη εμφάνιση: μια επίπεδη χρωματισμένη γραμμή εργαλείων κάτω από μια λεπτή γραμμή, διάφανα κουμπιά με ουδέτερη κατάσταση πατήματος, ελαφριά αναπτυσσόμενα μενού, απαλά παράθυρα διαλόγου.

Οι λειτουργίες (λεζάντες εικόνων, sliders, το αναπτυσσόμενο μενού στοίχισης, στυλ λιστών) λειτουργούν με τον ίδιο τρόπο και στα δύο skins.

```vue
<Tiptapify skin="pastel" />
```

Μπορείτε επίσης να περάσετε ένα ενσωματωμένο αντικείμενο skin: παρακάμψεις tokens (`colors` / `metrics`) και σημαίες shape, προαιρετικά με `extends` ένα καταχωρισμένο skin. Επιλύεται πάνω από το `default` (ή τη βάση του), αποδίδεται με την κλάση `tiptapify-skin-inline` (`tiptapify-skin-{name}` όταν το αντικείμενο φέρει `name`) και τα tokens του καταλήγουν ως μεταβλητές CSS `--tf-*` στη ρίζα του επεξεργαστή. Τα προσαρμοσμένα ονόματα προέρχονται από το `registerSkin('mint', { … })` — δείτε τον [οδηγό Skins](/el/guide/skins) για τον πίνακα tokens και τις συνταγές.

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **Τύπος:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/el/api/types#tiptapifyuploadoptions))
- **Προεπιλογή:** `null`

Το endpoint των [μεταφορτώσεων](/el/guide/uploads): τα αρχεία που επιλέγονται στους διαλόγους εικόνας και βίντεο (καθώς και το εξώφυλλο βίντεο και η εικόνα μιας κάρτας συνδέσμου) στέλνονται σε αυτό με `POST {endpoint}` (multipart `file` και `kind`), και το έγγραφο κρατά το URL που απαντά (`{ "url": … }`).

Χωρίς αυτό, ο διάλογος εικόνας δέχεται πάλι αρχείο: μια εικόνα που επιλέγεται (και ένα εξώφυλλο βίντεο) ενσωματώνεται στο έγγραφο ως base64 data URL, και οι εικόνες base64 διατηρούνται όταν φορτώνεται το έγγραφο. Ο διάλογος βίντεο προσφέρει **Μεταφόρτωση** μόνο με αυτό το prop. Όταν έχει οριστεί το `upload`, οι εικόνες base64 αφαιρούνται όταν φορτώνεται το έγγραφο.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **Τύπος:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/el/api/types#tiptapifycontentstyles))
- **Προεπιλογή:** `'inline'`

Πώς το αποθηκευμένο HTML μεταφέρει την εμφάνιση των καρτών συνδέσμου, των εικόνων με λεζάντα, των βίντεο, των ενσωματώσεων και των λιστών εργασιών (δείτε [Στυλ περιεχομένου](/el/guide/content-styles)): το `inline` την γράφει στα χαρακτηριστικά `style` τους, ώστε ένας ιστότοπος να εμφανίζει το HTML όπως είναι· το `classes` κρατά μόνο κλάσεις, για ιστότοπο που φορτώνει το `tiptapify/content.css`. Ο επεξεργαστής αγνοεί αυτά τα στυλ όταν φορτώνεται HTML, οπότε και τα δύο είδη HTML φορτώνονται με τον ίδιο τρόπο.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **Τύπος:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/el/api/types#tiptapifylinkpreviewoptions))
- **Προεπιλογή:** `null`

Το endpoint backend των [καρτών συνδέσμων](/el/guide/link-cards): διαβάζει τα δεδομένα OpenGraph των σελίδων, κάτι που ο browser δεν μπορεί (CORS). Ο επεξεργαστής το ελέγχει με handshake κατά την εκκίνηση (το `GET {endpoint}` πρέπει να απαντά `200 { "tiptapifyLinkPreview": 1 }`)· μέχρι να απαντήσει, τίποτα δεν προσφέρει κάρτα.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## Συμβάντα {#events}

### `editor-ready` {#editor-ready}

Εκπέμπεται όταν η παρουσία του επεξεργαστή είναι έτοιμη.

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

Εκπέμπεται όταν αλλάζει το περιεχόμενο του επεξεργαστή.

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

Υποστηρίζει σύνδεση `v-model`.

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

Η παρουσία του επεξεργαστή και η συνάρτηση `t` είναι διαθέσιμες μέσω των provide/inject του Vue:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
