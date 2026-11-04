# התחלה מהירה {#quick-start}

## דוגמה מינימלית {#minimal-example}

הדרך הפשוטה ביותר להשתמש ב-Tiptapify:

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

## עם תוכן התחלתי {#with-initial-content}

מעבירים תוכן כמחרוזת HTML או כאובייקט JSON של Tiptap:

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

## דוגמה עם כל התכונות {#full-featured-example}

הדוגמה הזו מציגה את כל אפשרויות התצורה הזמינות:

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

## קישור דו-כיווני עם v-model {#two-way-binding-with-v-model}

השתמשו באירוע `update:modelValue` לתמיכה ב-v-model:

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

## הוצאת התוכן {#outputting-content}

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

## הגדרת סרגל הכלים {#toolbar-configuration}

כברירת מחדל מוצגים כל פריטי סרגל הכלים. השתמשו ב-prop‏ `items` כדי להציג רק פריטים מסוימים:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
    placeholder="Minimal toolbar..."
  />
</template>
```

ראו את ההפניה ל[פריטי סרגל הכלים](/he/api/toolbar-items) לכל הפריטים הזמינים, ואת הדוגמה [סרגל כלים מותאם אישית](/he/examples/custom-toolbar) להגדרות מתקדמות.

## השלבים הבאים {#next-steps}

- למדו על [הגדרת סרגל הכלים](/he/examples/custom-toolbar)
- הגדירו [בינאום](/he/guide/i18n) (דורש `vue-i18n`)
- גלו את [הטמעת מדיה](/he/examples/media)
- עיינו ב[הפניית ה-API](/he/api/props) המלאה
