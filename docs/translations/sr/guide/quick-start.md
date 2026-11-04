# Brzi početak {#quick-start}

## Minimalni primer {#minimal-example}

Najjednostavniji način da koristite Tiptapify:

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

## Sa početnim sadržajem {#with-initial-content}

Prosledite sadržaj kao HTML string ili Tiptap JSON objekat:

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

## Primer sa svim mogućnostima {#full-featured-example}

Ovaj primer prikazuje sve dostupne opcije konfiguracije:

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

## Dvosmerno povezivanje pomoću v-model {#two-way-binding-with-v-model}

Za podršku za v-model koristite događaj `update:modelValue`:

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

## Izlaz sadržaja {#outputting-content}

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

## Konfiguracija trake sa alatima {#toolbar-configuration}

Podrazumevano su prikazane sve stavke trake sa alatima. Pomoću propa `items` prikažite samo određene stavke:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
    placeholder="Minimal toolbar..."
  />
</template>
```

Sve dostupne stavke potražite u referenci [Stavke trake sa alatima](/sr/api/toolbar-items), a za naprednu konfiguraciju pogledajte primer [Prilagođena traka sa alatima](/sr/examples/custom-toolbar).

## Sledeći koraci {#next-steps}

- Saznajte više o [konfiguraciji trake sa alatima](/sr/examples/custom-toolbar)
- Podesite [internacionalizaciju](/sr/guide/i18n) (zahteva `vue-i18n`)
- Istražite [ugrađivanje medija](/sr/examples/media)
- Pogledajte kompletnu [API referencu](/sr/api/props)
