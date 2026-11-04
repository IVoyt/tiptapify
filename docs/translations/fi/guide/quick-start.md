# Pikaopas {#quick-start}

## Minimaalinen esimerkki {#minimal-example}

Yksinkertaisin tapa käyttää Tiptapifyta:

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

## Alkusisällön kanssa {#with-initial-content}

Anna sisältö HTML-merkkijonona tai Tiptap JSON -objektina:

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

## Täysi esimerkki {#full-featured-example}

Tämä esimerkki näyttää kaikki käytettävissä olevat asetukset:

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

## Kaksisuuntainen sidonta v-modelilla {#two-way-binding-with-v-model}

Käytä `update:modelValue`-tapahtumaa v-model-tuen toteuttamiseen:

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

## Sisällön tulostus {#outputting-content}

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

## Työkalurivin määrittely {#toolbar-configuration}

Oletuksena kaikki työkalurivin kohteet näytetään. Käytä `items`-propsia näyttääksesi vain valitut kohteet:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
    placeholder="Minimal toolbar..."
  />
</template>
```

Kaikki käytettävissä olevat kohteet löytyvät [työkalurivin kohteiden](/fi/api/toolbar-items) viitteestä ja edistyneempi määrittely [Oma työkalurivi](/fi/examples/custom-toolbar) -esimerkistä.

## Seuraavat askeleet {#next-steps}

- Tutustu [työkalurivin määrittelyyn](/fi/examples/custom-toolbar)
- Ota käyttöön [kansainvälistäminen](/fi/guide/i18n) (vaatii `vue-i18n`:n)
- Tutustu [median upotukseen](/fi/examples/media)
- Katso täydellinen [API-viite](/fi/api/props)
