# Ātrā sākšana {#quick-start}

## Minimālais piemērs {#minimal-example}

Vienkāršākais Tiptapify lietošanas veids:

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

## Ar sākotnējo saturu {#with-initial-content}

Nododiet saturu kā HTML virkni vai Tiptap JSON objektu:

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

## Piemērs ar visām iespējām {#full-featured-example}

Šajā piemērā parādītas visas pieejamās konfigurācijas opcijas:

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

## Divvirzienu piesaiste ar v-model {#two-way-binding-with-v-model}

Lai atbalstītu v-model, izmantojiet notikumu `update:modelValue`:

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

## Satura izvade {#outputting-content}

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

## Rīkjoslas konfigurēšana {#toolbar-configuration}

Pēc noklusējuma tiek rādīti visi rīkjoslas elementi. Lai rādītu tikai konkrētus elementus, izmantojiet rekvizītu `items`:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
    placeholder="Minimal toolbar..."
  />
</template>
```

Visus pieejamos elementus skatiet [rīkjoslas elementu](/lv/api/toolbar-items) atsaucē, bet papildu konfigurēšanu — piemērā [Pielāgota rīkjosla](/lv/examples/custom-toolbar).

## Nākamie soļi {#next-steps}

- Uzziniet par [rīkjoslas konfigurēšanu](/lv/examples/custom-toolbar)
- Iestatiet [internacionalizāciju](/lv/guide/i18n) (nepieciešams `vue-i18n`)
- Iepazīstiet [multivides iegulšanu](/lv/examples/media)
- Skatiet pilno [API atsauci](/lv/api/props)
