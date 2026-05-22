# Basic Usage

## Content Binding

Use `v-model` to keep content in sync:

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

## Listening to Changes

Use the `content-changed` event to react to editor changes:

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

## Editor Ready Callback

Access the raw Tiptap Editor instance:

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

## Fixed Height Editor

Set a minimum height for the editor area:

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

## Without Toolbar

Hide the toolbar completely and use only the bubble menu:

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

## Read-Only Mode

Control editability via the editor instance:

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
