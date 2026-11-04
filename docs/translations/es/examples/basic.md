# Uso básico {#basic-usage}

## Enlace del contenido {#content-binding}

Usa `v-model` para mantener el contenido sincronizado:

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

## Escuchar los cambios {#listening-to-changes}

Usa el evento `content-changed` para reaccionar a los cambios del editor:

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

## Callback de editor listo {#editor-ready-callback}

Accede a la instancia original del editor de Tiptap:

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

## Editor con altura fija {#fixed-height-editor}

Define una altura mínima para el área del editor:

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

## Sin barra de herramientas {#without-toolbar}

Oculta por completo la barra de herramientas y usa solo el menú de burbuja:

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

## Modo de solo lectura {#read-only-mode}

Controla la editabilidad mediante la instancia del editor:

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
