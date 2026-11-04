# Démarrage rapide {#quick-start}

## Exemple minimal {#minimal-example}

La façon la plus simple d'utiliser Tiptapify :

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

## Avec un contenu initial {#with-initial-content}

Transmettez le contenu sous forme de chaîne HTML ou d'objet JSON Tiptap :

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

## Exemple complet {#full-featured-example}

Cet exemple présente toutes les options de configuration disponibles :

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

## Liaison bidirectionnelle avec v-model {#two-way-binding-with-v-model}

Utilisez l'événement `update:modelValue` pour prendre en charge v-model :

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

## Récupérer le contenu {#outputting-content}

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

## Configuration de la barre d'outils {#toolbar-configuration}

Par défaut, tous les éléments de la barre d'outils sont affichés. Utilisez la prop `items` pour n'afficher que certains éléments :

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
    placeholder="Minimal toolbar..."
  />
</template>
```

Consultez la référence des [éléments de la barre d'outils](/fr/api/toolbar-items) pour tous les éléments disponibles, et l'exemple de [barre d'outils personnalisée](/fr/examples/custom-toolbar) pour une configuration avancée.

## Étapes suivantes {#next-steps}

- Découvrez la [configuration de la barre d'outils](/fr/examples/custom-toolbar)
- Configurez l'[internationalisation](/fr/guide/i18n) (requiert `vue-i18n`)
- Explorez l'[intégration de médias](/fr/examples/media)
- Consultez la [référence de l'API](/fr/api/props) complète
