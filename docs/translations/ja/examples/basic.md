# 基本的な使い方 {#basic-usage}

## コンテンツのバインド {#content-binding}

`v-model` を使ってコンテンツを同期します。

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

## 変更の監視 {#listening-to-changes}

`content-changed` イベントでエディターの変更に反応できます。

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

## エディター準備完了コールバック {#editor-ready-callback}

Tiptap のエディターインスタンスを直接取得します。

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

## 高さを固定したエディター {#fixed-height-editor}

エディター領域の最小の高さを設定します。

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

## ツールバーなし {#without-toolbar}

ツールバーを完全に非表示にし、バブルメニューだけを使います。

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

## 読み取り専用モード {#read-only-mode}

エディターインスタンスを通じて編集可否を制御します。

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
