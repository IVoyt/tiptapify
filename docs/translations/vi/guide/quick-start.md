# Bắt đầu nhanh {#quick-start}

## Ví dụ tối giản {#minimal-example}

Cách đơn giản nhất để dùng Tiptapify:

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

## Với nội dung ban đầu {#with-initial-content}

Truyền nội dung dưới dạng chuỗi HTML hoặc đối tượng JSON của Tiptap:

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

## Ví dụ đầy đủ tính năng {#full-featured-example}

Ví dụ này minh họa tất cả các tùy chọn cấu hình có sẵn:

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

## Liên kết hai chiều với v-model {#two-way-binding-with-v-model}

Dùng sự kiện `update:modelValue` để hỗ trợ v-model:

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

## Xuất nội dung {#outputting-content}

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

## Cấu hình thanh công cụ {#toolbar-configuration}

Theo mặc định, tất cả các mục trên thanh công cụ đều được hiển thị. Dùng prop `items` để chỉ hiển thị một số mục cụ thể:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
    placeholder="Minimal toolbar..."
  />
</template>
```

Xem tài liệu tham khảo [Mục thanh công cụ](/vi/api/toolbar-items) để biết tất cả các mục có sẵn, và ví dụ [Thanh công cụ tùy chỉnh](/vi/examples/custom-toolbar) cho cấu hình nâng cao.

## Bước tiếp theo {#next-steps}

- Tìm hiểu về [Cấu hình thanh công cụ](/vi/examples/custom-toolbar)
- Thiết lập [Đa ngôn ngữ](/vi/guide/i18n) (yêu cầu `vue-i18n`)
- Khám phá [Nhúng phương tiện](/vi/examples/media)
- Xem toàn bộ [Tài liệu tham khảo API](/vi/api/props)
