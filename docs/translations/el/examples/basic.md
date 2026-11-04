# Βασική χρήση {#basic-usage}

## Σύνδεση περιεχομένου {#content-binding}

Χρησιμοποιήστε το `v-model` για να διατηρείτε το περιεχόμενο συγχρονισμένο:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>Hello, <strong>world</strong>!</p>')
</script>

<template>
  <Tiptapify
    v-model="content"
    placeholder="Write something..."
    :bubble-menu="true"
    :floating-menu="false"
    :slash-commands="true"
  />
</template>
```

## Παρακολούθηση αλλαγών {#listening-to-changes}

Χρησιμοποιήστε το συμβάν `content-changed` για να αντιδράτε στις αλλαγές του επεξεργαστή:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const wordCount = ref(0)

const onContentChanged = ({ html, json }) => {
  const text = html.replace(/<[^>]*>/g, ' ')
  wordCount.value = text.trim().split(/\s+/).filter(Boolean).length
}
</script>

<template>
  <div>
    <Tiptapify
      :content="'<p>Start writing...</p>'"
      placeholder="Write something..."
      :bubble-menu="true"
      :floating-menu="false"
      :slash-commands="true"
      @content-changed="onContentChanged"
    />
    <p>Words: {{ wordCount }}</p>
  </div>
</template>
```

## Callback ετοιμότητας του επεξεργαστή {#editor-ready-callback}

Πρόσβαση στην ωμή παρουσία του Tiptap Editor:

```vue
<script setup lang="ts">
const onEditorReady = (options) => {
  const { editor, getHTML, getJSON } = options

  // Focus the editor programmatically
  editor.commands.focus()

  // Set content programmatically
  editor.commands.setContent('<p>New content</p>')

  // Check editor state
  console.log('Is focused:', editor.isFocused)
  console.log('HTML:', getHTML())
  console.log('JSON:', getJSON())
}
</script>

<template>
  <Tiptapify
    placeholder="Editor with ready callback..."
    :bubble-menu="true"
    :floating-menu="false"
    :slash-commands="true"
    @editor-ready="onEditorReady"
  />
</template>
```

## Επεξεργαστής σταθερού ύψους {#fixed-height-editor}

Ορίστε ελάχιστο ύψος για την περιοχή του επεξεργαστή:

```vue
<template>
  <Tiptapify
    :content="'<p>Content area with fixed height...</p>'"
    :height="400"
    placeholder="This editor has a fixed height of 400px..."
    :bubble-menu="true"
    :floating-menu="false"
    :slash-commands="true"
  />
</template>
```

## Χωρίς γραμμή εργαλείων {#without-toolbar}

Αποκρύψτε εντελώς τη γραμμή εργαλείων και χρησιμοποιήστε μόνο το bubble menu:

```vue
<template>
  <Tiptapify
    :toolbar="false"
    :bubble-menu="true"
    placeholder="Toolbar hidden, use bubble menu..."
    :floating-menu="false"
    :slash-commands="true"
  />
</template>
```

## Λειτουργία μόνο ανάγνωσης {#read-only-mode}

Ελέγξτε την επεξεργασιμότητα μέσω της παρουσίας του επεξεργαστή:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const isReadOnly = ref(false)

const onEditorReady = (options) => {
  // Set read-only after editor is ready
  options.editor.setEditable(false)
}
</script>

<template>
  <div>
    <v-btn @click="isReadOnly = !isReadOnly">
      Toggle Read-Only
    </v-btn>
    <Tiptapify
      :content="'<p>Try editing this content...</p>'"
      :toolbar="false"
      :bubble-menu="true"
      :floating-menu="false"
      :slash-commands="true"
      @editor-ready="onEditorReady"
    />
  </div>
</template>
```
