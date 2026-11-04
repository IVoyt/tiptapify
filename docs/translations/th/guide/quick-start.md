# เริ่มต้นอย่างรวดเร็ว {#quick-start}

## ตัวอย่างขั้นต่ำ {#minimal-example}

วิธีใช้ Tiptapify ที่ง่ายที่สุด:

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

## พร้อมเนื้อหาเริ่มต้น {#with-initial-content}

ส่งเนื้อหาเป็นสตริง HTML หรือออบเจกต์ JSON ของ Tiptap:

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

## ตัวอย่างแบบครบทุกฟีเจอร์ {#full-featured-example}

ตัวอย่างนี้แสดงตัวเลือกการตั้งค่าทั้งหมดที่มี:

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

## Two-Way Binding ด้วย v-model {#two-way-binding-with-v-model}

ใช้อีเวนต์ `update:modelValue` เพื่อรองรับ v-model:

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

## การส่งออกเนื้อหา {#outputting-content}

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

## การตั้งค่าแถบเครื่องมือ {#toolbar-configuration}

โดยค่าเริ่มต้นจะแสดงรายการบนแถบเครื่องมือทั้งหมด ใช้ prop `items` เพื่อแสดงเฉพาะรายการที่ต้องการ:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
    placeholder="Minimal toolbar..."
  />
</template>
```

ดูรายการทั้งหมดได้ที่เอกสารอ้างอิง[รายการบนแถบเครื่องมือ](/th/api/toolbar-items) และดูการตั้งค่าขั้นสูงได้ที่ตัวอย่าง[แถบเครื่องมือที่กำหนดเอง](/th/examples/custom-toolbar)

## ขั้นตอนถัดไป {#next-steps}

- เรียนรู้เรื่อง[การตั้งค่าแถบเครื่องมือ](/th/examples/custom-toolbar)
- ตั้งค่า[การแปลภาษา](/th/guide/i18n) (ต้องใช้ `vue-i18n`)
- ดู[การฝังสื่อ](/th/examples/media)
- ดู[เอกสารอ้างอิง API](/th/api/props) ฉบับเต็ม
