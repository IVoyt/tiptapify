# Hızlı Başlangıç {#quick-start}

## Minimal Örnek {#minimal-example}

Tiptapify'ı kullanmanın en basit yolu:

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

## Başlangıç İçeriğiyle {#with-initial-content}

İçeriği HTML dizesi veya Tiptap JSON nesnesi olarak verin:

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

## Tüm Özellikleriyle Örnek {#full-featured-example}

Bu örnek, kullanılabilir tüm yapılandırma seçeneklerini gösterir:

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

## v-model ile Çift Yönlü Bağlama {#two-way-binding-with-v-model}

v-model desteği için `update:modelValue` olayını kullanın:

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

## İçeriği Dışa Aktarma {#outputting-content}

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

## Araç Çubuğu Yapılandırması {#toolbar-configuration}

Varsayılan olarak tüm araç çubuğu öğeleri gösterilir. Yalnızca belirli öğeleri göstermek için `items` prop'unu kullanın:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
    placeholder="Minimal toolbar..."
  />
</template>
```

Kullanılabilir tüm öğeler için [Araç Çubuğu Öğeleri](/tr/api/toolbar-items) referansına, ileri düzey yapılandırma için ise [Özel Araç Çubuğu](/tr/examples/custom-toolbar) örneğine bakın.

## Sonraki Adımlar {#next-steps}

- [Araç Çubuğu Yapılandırması](/tr/examples/custom-toolbar) hakkında bilgi edinin
- [Çok Dillilik](/tr/guide/i18n) kurulumunu yapın (`vue-i18n` gerekir)
- [Medya Gömme](/tr/examples/media) örneklerini inceleyin
- Tam [API Referansına](/tr/api/props) göz atın
