# Greitas startas {#quick-start}

## Minimalus pavyzdys {#minimal-example}

Paprasčiausias Tiptapify naudojimo būdas:

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

## Su pradiniu turiniu {#with-initial-content}

Turinį perduokite kaip HTML eilutę arba Tiptap JSON objektą:

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

## Pavyzdys su visomis funkcijomis {#full-featured-example}

Šiame pavyzdyje parodytos visos galimos konfigūracijos parinktys:

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

## Dvipusis susiejimas su v-model {#two-way-binding-with-v-model}

v-model palaikymui naudokite įvykį `update:modelValue`:

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

## Turinio išvedimas {#outputting-content}

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

## Įrankių juostos konfigūravimas {#toolbar-configuration}

Pagal numatytuosius nustatymus rodomi visi įrankių juostos elementai. Naudokite savybę `items`, kad būtų rodomi tik pasirinkti elementai:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
    placeholder="Minimal toolbar..."
  />
</template>
```

Visus galimus elementus rasite [įrankių juostos elementų](/lt/api/toolbar-items) nuorodoje, o išplėstinę konfigūraciją – pavyzdyje [Pasirinktinė įrankių juosta](/lt/examples/custom-toolbar).

## Tolesni žingsniai {#next-steps}

- Sužinokite apie [įrankių juostos konfigūravimą](/lt/examples/custom-toolbar)
- Nustatykite [tarptautiškumą](/lt/guide/i18n) (reikalingas `vue-i18n`)
- Išnagrinėkite [medijos įterpimą](/lt/examples/media)
- Peržiūrėkite visą [API nuorodą](/lt/api/props)
