# 빠른 시작 {#quick-start}

## 최소 예제 {#minimal-example}

Tiptapify를 사용하는 가장 간단한 방법입니다.

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

## 초기 콘텐츠 지정 {#with-initial-content}

콘텐츠는 HTML 문자열 또는 Tiptap JSON 객체로 전달합니다.

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

## 모든 기능을 사용한 예제 {#full-featured-example}

사용 가능한 모든 설정 옵션을 보여 주는 예제입니다.

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

## v-model을 이용한 양방향 바인딩 {#two-way-binding-with-v-model}

v-model을 지원하려면 `update:modelValue` 이벤트를 사용합니다.

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

## 콘텐츠 출력 {#outputting-content}

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

## 툴바 설정 {#toolbar-configuration}

기본적으로 모든 툴바 항목이 표시됩니다. 특정 항목만 표시하려면 `items` prop을 사용하세요.

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
    placeholder="Minimal toolbar..."
  />
</template>
```

사용 가능한 모든 항목은 [툴바 항목](/ko/api/toolbar-items) 레퍼런스를, 고급 설정은 [커스텀 툴바](/ko/examples/custom-toolbar) 예제를 참고하세요.

## 다음 단계 {#next-steps}

- [툴바 설정](/ko/examples/custom-toolbar) 알아보기
- [다국어 지원](/ko/guide/i18n) 설정하기(`vue-i18n` 필요)
- [미디어 임베드](/ko/examples/media) 살펴보기
- 전체 [API 레퍼런스](/ko/api/props) 보기
