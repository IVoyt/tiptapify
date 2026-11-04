# त्वरित शुरुआत {#quick-start}

## न्यूनतम उदाहरण {#minimal-example}

Tiptapify उपयोग करने का सबसे सरल तरीका:

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

## शुरुआती कंटेंट के साथ {#with-initial-content}

कंटेंट को HTML स्ट्रिंग या Tiptap JSON ऑब्जेक्ट के रूप में दें:

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

## सभी सुविधाओं वाला उदाहरण {#full-featured-example}

यह उदाहरण सभी उपलब्ध कॉन्फ़िगरेशन विकल्प दिखाता है:

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

## v-model के साथ दोतरफ़ा बाइंडिंग {#two-way-binding-with-v-model}

v-model समर्थन के लिए `update:modelValue` इवेंट उपयोग करें:

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

## कंटेंट आउटपुट करना {#outputting-content}

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

## टूलबार कॉन्फ़िगरेशन {#toolbar-configuration}

डिफ़ॉल्ट रूप से सभी टूलबार आइटम दिखते हैं। केवल चुनिंदा आइटम दिखाने के लिए `items` prop उपयोग करें:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
    placeholder="Minimal toolbar..."
  />
</template>
```

सभी उपलब्ध आइटम के लिए [टूलबार आइटम](/hi/api/toolbar-items) संदर्भ देखें, और उन्नत कॉन्फ़िगरेशन के लिए [कस्टम टूलबार](/hi/examples/custom-toolbar) उदाहरण देखें।

## अगले कदम {#next-steps}

- [टूलबार कॉन्फ़िगरेशन](/hi/examples/custom-toolbar) के बारे में जानें
- [अंतर्राष्ट्रीयकरण](/hi/guide/i18n) सेट करें (`vue-i18n` आवश्यक है)
- [मीडिया एम्बेडिंग](/hi/examples/media) देखें
- पूरा [API संदर्भ](/hi/api/props) देखें
