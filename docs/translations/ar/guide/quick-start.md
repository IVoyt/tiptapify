# البدء السريع {#quick-start}

## أبسط مثال {#minimal-example}

أبسط طريقة لاستخدام Tiptapify:

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

## مع محتوى أولي {#with-initial-content}

مرّر المحتوى كنص HTML أو ككائن Tiptap JSON:

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

## مثال بكل الميزات {#full-featured-example}

يعرض هذا المثال جميع خيارات الإعداد المتاحة:

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

## الربط ثنائي الاتجاه باستخدام v-model {#two-way-binding-with-v-model}

استخدم الحدث `update:modelValue` لدعم v-model:

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

## إخراج المحتوى {#outputting-content}

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

## إعداد شريط الأدوات {#toolbar-configuration}

افتراضيًا تظهر جميع عناصر شريط الأدوات. استخدم الخاصية `items` لإظهار عناصر محددة فقط:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
    placeholder="Minimal toolbar..."
  />
</template>
```

راجع مرجع [عناصر شريط الأدوات](/ar/api/toolbar-items) لمعرفة جميع العناصر المتاحة، ومثال [شريط أدوات مخصص](/ar/examples/custom-toolbar) للإعدادات المتقدمة.

## الخطوات التالية {#next-steps}

- تعرّف على [إعداد شريط الأدوات](/ar/examples/custom-toolbar)
- فعّل [التدويل](/ar/guide/i18n) (يتطلب `vue-i18n`)
- استكشف [تضمين الوسائط](/ar/examples/media)
- اطّلع على [مرجع API](/ar/api/props) كاملًا
