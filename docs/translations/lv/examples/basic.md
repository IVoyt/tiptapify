# Pamatlietošana {#basic-usage}

## Satura piesaiste {#content-binding}

Izmantojiet `v-model`, lai saturs paliktu sinhronizēts:

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

## Izmaiņu klausīšanās {#listening-to-changes}

Izmantojiet notikumu `content-changed`, lai reaģētu uz redaktora izmaiņām:

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

## Redaktora gatavības atzvans {#editor-ready-callback}

Piekļuve pašam Tiptap Editor eksemplāram:

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

## Redaktors ar fiksētu augstumu {#fixed-height-editor}

Iestatiet redaktora apgabala minimālo augstumu:

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

## Bez rīkjoslas {#without-toolbar}

Pilnībā paslēpiet rīkjoslu un izmantojiet tikai burbuļa izvēlni:

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

## Tikai lasīšanas režīms {#read-only-mode}

Rediģējamību kontrolējiet, izmantojot redaktora eksemplāru:

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
