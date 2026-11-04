# カスタムツールバー {#custom-toolbar}

## 特定の項目だけを表示する {#showing-specific-items}

`items` prop を使うと、必要なツールバーボタンだけを表示できます。項目名の配列を渡します。

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

ボタングループの区切りには `|` を使います。

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="カスタムツールバー..." />

## リストスタイルのドロップダウン {#list-styles-dropdown}

`:styles` サフィックスを付けると、リストボタンが記号/番号スタイルのドロップダウンに置き換わります。リストボタンを押すと `list-style-type` の選択肢がグリッドで開き、選んだ値はインラインスタイルとして保存されます。グリッドはスキンのメニュー面の内側に描画されるため、現在のスキンに従います（[スキンガイド](/ja/guide/skins)）。

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="リストスタイルのドロップダウンを開いてみましょう..." />

## 項目を除外する {#excluding-items}

`items` と一緒に `items-exclude` を使うと、ほとんどのツールバー項目を表示しつつ、特定の項目だけを除外できます。

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', 'strike']"
    :items-exclude="true"
    placeholder="Excluding unwanted items..."
  />
</template>
```
<InteractiveEditor :items="['bold', 'italic', 'underline', 'strike']"
:items-exclude="true"
placeholder="不要な項目を除外..." />

## カスタムセクション {#custom-sections}

オブジェクトを使って、項目を独自の名前付きセクションにまとめられます。

```vue
<script setup lang="ts">
const customItems = {
  formatting: ['bold', 'italic', 'underline', 'strike'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList', 'taskList'],
  media: ['link', 'image', 'video'],
}
</script>

<template>
  <Tiptapify
    :items="customItems"
    placeholder="Custom sections toolbar..."
  />
</template>
```
<InteractiveEditor :items="{
formatting: ['bold', 'italic', 'underline', 'strike'],
headings: ['heading'],
lists: ['bulletList', 'orderedList', 'taskList'],
media: ['link', 'image', 'video'],
}"
placeholder="カスタムセクションのツールバー..." />

## ツールバーセクションのリファレンス {#toolbar-sections-reference}

ツールバー項目はセクションに分類されています。利用できるセクションは次のとおりです。

| セクション | 項目 |
|---|---|
| `actions` | `undo`, `redo` |
| `format` | `bold`, `italic`, `underline`, `strike` |
| `formatExtra` | `sup`, `sub`, `code`, `codeBlock`, `blockquote` |
| `style` | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor` |
| `alignment` | `left`, `center`, `right`, `justify` |
| `list` | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent` |
| `media` | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table` |
| `misc` | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar` |

## ツールバーを非表示にする {#hiding-the-toolbar}

```vue
<template>
  <Tiptapify
    :toolbar="false"
    placeholder="No toolbar — use the bubble menu instead..."
  />
</template>
```
<InteractiveEditor :toolbar="false"
:bubble-menu="false"
placeholder="ツールバーなし..." />

## カスタムツールバーコンポーネント {#custom-toolbar-components}

`customExtensions` prop で独自のボタンを追加できます。各エントリーは[ツールバーセクション](/ja/api/types#section)です。組み込みのセクション名（`misc`、`media` など）を指定すると既存のグループにボタンが統合され、新しい名前を指定すると、組み込みセクションの後ろに別のグループとして描画されます。

```vue
<script setup lang="ts">
import BlockquoteButton from './BlockquoteButton.vue'

const customExtensions = [{
  section: 'custom',
  group: true,
  components: [{ name: 'blockquoteBtn', component: BlockquoteButton }],
}]
</script>

<template>
  <Tiptapify :custom-extensions="customExtensions" />
</template>
```

カスタムコンポーネントは `<Tiptapify>` の内側に描画されるため、組み込みボタンと同じ共有値（エディター、翻訳、エディターレベルの設定）を利用できます。

```vue
<!-- BlockquoteButton.vue -->
<script setup lang="ts">
import { inject, type Ref } from 'vue'
import { TipTapEditor, useTiptapifyConfig } from 'tiptapify'

const editor = inject('tiptapifyEditor') as Ref<TipTapEditor>
const { variantBtn } = useTiptapifyConfig()
</script>

<template>
  <VBtn
    :color="editor.isActive('blockquote') ? 'primary' : ''"
    :variant="variantBtn"
    size="32"
    @click="editor.commands.toggleBlockquote()"
  >
    Quote
  </VBtn>
</template>
```

- `useTiptapifyConfig()` はエディターレベルの設定（`variantBtn`、`variantField`）を返すため、カスタムコンポーネントも組み込みツールバーのスタイルに自動的に揃います。
- 後方互換性のため、`variantBtn` prop は引き続きすべてのツールバーコンポーネントに渡されます。共有設定が導入される前に書かれたコンポーネントも、そのまま動作します。
- `inject('tiptapifyI18n')` を使うと、組み込みボタンと同じ翻訳関数を取得できます。
