# Gyors kezdés {#quick-start}

## Minimális példa {#minimal-example}

A Tiptapify legegyszerűbb használata:

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

## Kezdeti tartalommal {#with-initial-content}

A tartalmat HTML-szövegként vagy Tiptap JSON objektumként add át:

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

## Teljes funkcionalitású példa {#full-featured-example}

Ez a példa az összes elérhető konfigurációs lehetőséget bemutatja:

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

## Kétirányú kötés v-modellel {#two-way-binding-with-v-model}

A v-model támogatásához használd az `update:modelValue` eseményt:

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

## A tartalom kiadása {#outputting-content}

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

## Az eszköztár konfigurálása {#toolbar-configuration}

Alapértelmezetten az összes eszköztárelem megjelenik. Az `items` propot használva csak bizonyos elemeket jeleníthetsz meg:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
    placeholder="Minimal toolbar..."
  />
</template>
```

Az elérhető elemek teljes listáját az [Eszköztárelemek](/hu/api/toolbar-items) referencia tartalmazza, a haladó konfigurációhoz pedig lásd az [Egyéni eszköztár](/hu/examples/custom-toolbar) példát.

## Következő lépések {#next-steps}

- Ismerd meg az [eszköztár konfigurálását](/hu/examples/custom-toolbar)
- Állítsd be a [nemzetköziesítést](/hu/guide/i18n) (a `vue-i18n` szükséges hozzá)
- Fedezd fel a [médiabeágyazást](/hu/examples/media)
- Tekintsd meg a teljes [API-referenciát](/hu/api/props)
