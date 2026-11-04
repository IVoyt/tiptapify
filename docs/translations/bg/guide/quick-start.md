# Бърз старт {#quick-start}

## Минимален пример {#minimal-example}

Най-простият начин да използвате Tiptapify:

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

## С начално съдържание {#with-initial-content}

Подайте съдържанието като HTML низ или Tiptap JSON обект:

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

## Пример с всички възможности {#full-featured-example}

Този пример показва всички налични опции за конфигуриране:

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

## Двупосочна връзка с v-model {#two-way-binding-with-v-model}

Използвайте събитието `update:modelValue` за поддръжка на v-model:

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

## Извеждане на съдържанието {#outputting-content}

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

## Конфигуриране на лентата с инструменти {#toolbar-configuration}

По подразбиране се показват всички елементи на лентата. Използвайте пропъртито `items`, за да покажете само определени елементи:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
    placeholder="Minimal toolbar..."
  />
</template>
```

Всички налични елементи са описани в справочника [Елементи на лентата](/bg/api/toolbar-items), а разширената конфигурация е в примера [Собствена лента с инструменти](/bg/examples/custom-toolbar).

## Следващи стъпки {#next-steps}

- Научете повече за [конфигурирането на лентата](/bg/examples/custom-toolbar)
- Настройте [интернационализацията](/bg/guide/i18n) (изисква `vue-i18n`)
- Разгледайте [вграждането на медия](/bg/examples/media)
- Вижте пълния [API справочник](/bg/api/props)
