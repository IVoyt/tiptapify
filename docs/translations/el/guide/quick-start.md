# Γρήγορη εκκίνηση {#quick-start}

## Ελάχιστο παράδειγμα {#minimal-example}

Ο απλούστερος τρόπος χρήσης του Tiptapify:

```vue
<script setup lang="ts">
const handleEditorReady = (options) => {
  console.log('Editor ready!')
  console.log('HTML:', options.getHTML())
  console.log('JSON:', options.getJSON())
}
</script>

<template>
  <Tiptapify
    placeholder="Start writing your content..."
    @editor-ready="handleEditorReady"
  />
</template>
```

## Με αρχικό περιεχόμενο {#with-initial-content}

Περάστε το περιεχόμενο ως συμβολοσειρά HTML ή ως αντικείμενο JSON του Tiptap:

```vue
<script setup lang="ts">
const initialContent = '<h1>Hello World</h1><p>This is a paragraph with <strong>bold</strong> text.</p>'

const handleEditorReady = (options) => {
  // options.editor is the raw Tiptap Editor instance
  // options.getHTML() returns the HTML content
  // options.getJSON() returns the Tiptap JSON representation
}
</script>

<template>
  <Tiptapify
    :content="initialContent"
    placeholder="Start writing..."
    @editor-ready="handleEditorReady"
  />
</template>
```

## Πλήρες παράδειγμα {#full-featured-example}

Αυτό το παράδειγμα δείχνει όλες τις διαθέσιμες επιλογές διαμόρφωσης:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const editorHTML = ref('')
const editorJSON = ref(null)

const handleEditorReady = (options) => {
  editorHTML.value = options.getHTML()
  editorJSON.value = options.getJSON()
}

const handleContentChanged = ({ html, json }) => {
  editorHTML.value = html
  editorJSON.value = json
}
</script>

<template>
  <v-container>
    <Tiptapify
      :content="'<p>Start typing...</p>'"
      :height="400"
      :toolbar="true"
      :items="['bold', 'italic', 'underline', 'strike', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
      :bubble-menu="true"
      :floating-menu="true"
      :slash-commands="true"
      placeholder="Write something amazing..."
      :show-words-count="true"
      :show-characters-count="true"
      default-font-family="Inter"
      font-measure="px"
      rounded="lg"
      :interactive-styles="true"
      variant-btn="tonal"
      variant-field="outlined"
      @editor-ready="handleEditorReady"
      @content-changed="handleContentChanged"
    />
  </v-container>
</template>
```

## Αμφίδρομη σύνδεση με v-model {#two-way-binding-with-v-model}

Χρησιμοποιήστε το συμβάν `update:modelValue` για υποστήριξη του v-model:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>Initial content</p>')
</script>

<template>
  <Tiptapify
    v-model="content"
    placeholder="Type here..."
  />
</template>
```

## Έξοδος περιεχομένου {#outputting-content}

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>Hello <strong>world</strong>!</p>')

const saveContent = () => {
  // content.value now contains the current HTML
  console.log(content.value)
}
</script>

<template>
  <div>
    <Tiptapify
      v-model="content"
      placeholder="Write something..."
    />

    <v-btn @click="saveContent">
      Save
    </v-btn>

    <!-- Preview the HTML -->
    <pre>{{ content }}</pre>
  </div>
</template>
```

## Διαμόρφωση της γραμμής εργαλείων {#toolbar-configuration}

Από προεπιλογή εμφανίζονται όλα τα στοιχεία της γραμμής εργαλείων. Χρησιμοποιήστε το prop `items` για να εμφανίσετε μόνο συγκεκριμένα:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
    placeholder="Minimal toolbar..."
  />
</template>
```

Δείτε την αναφορά [Στοιχεία γραμμής εργαλείων](/el/api/toolbar-items) για όλα τα διαθέσιμα στοιχεία και το παράδειγμα [Προσαρμοσμένη γραμμή εργαλείων](/el/examples/custom-toolbar) για προχωρημένη διαμόρφωση.

## Επόμενα βήματα {#next-steps}

- Μάθετε για τη [διαμόρφωση της γραμμής εργαλείων](/el/examples/custom-toolbar)
- Ρυθμίστε τη [διεθνοποίηση](/el/guide/i18n) (απαιτεί `vue-i18n`)
- Εξερευνήστε την [ενσωμάτωση πολυμέσων](/el/examples/media)
- Δείτε ολόκληρη την [αναφορά API](/el/api/props)
