# 自定义工具栏 {#custom-toolbar}

## 显示指定项 {#showing-specific-items}

使用 `items` 属性只显示你需要的工具栏按钮。传入一个项名称数组：

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

使用 `|` 作为按钮组之间的分隔符。

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="自定义工具栏..." />

## 列表样式下拉菜单 {#list-styles-dropdown}

`:styles` 后缀会把列表按钮替换为其标记/编号样式下拉菜单：该列表按钮会打开一个 `list-style-type` 选项网格，所选样式以内联样式保存。网格渲染在皮肤的菜单表面内，因此会跟随当前皮肤（参见[皮肤指南](/zh/guide/skins)）：

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="打开列表样式下拉菜单..." />

## 排除项 {#excluding-items}

将 `items-exclude` 与 `items` 搭配使用，可以显示大部分工具栏项，同时排除指定的项：

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
placeholder="排除不需要的项..." />

## 自定义分区 {#custom-sections}

使用对象将项分组到你自己命名的分区中：

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
placeholder="自定义分区工具栏..." />

## 工具栏分区参考 {#toolbar-sections-reference}

工具栏项按分区组织。以下是所有可用的分区：

| 分区           | 项                                                                                      |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## 隐藏工具栏 {#hiding-the-toolbar}

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
placeholder="无工具栏..." />

## 自定义工具栏组件 {#custom-toolbar-components}

通过 `customExtensions` 属性添加你自己的按钮。每个条目是一个[工具栏分区](/zh/api/types#section)——使用内置分区名称（`misc`、`media` 等）可将你的按钮合并到现有分组中，使用新名称则会在内置分区之后渲染为单独的分组：

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

自定义组件渲染在 `<Tiptapify>` 内部，因此它们可以访问与内置按钮相同的共享值——编辑器、翻译和编辑器级配置：

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

- `useTiptapifyConfig()` 返回编辑器级配置（`variantBtn`、`variantField`），因此自定义组件会自动与内置工具栏的样式保持一致。
- 为了向后兼容，`variantBtn` 属性仍会传递给每个工具栏组件——在共享配置出现之前编写的组件无需改动即可继续工作。
- `inject('tiptapifyI18n')` 提供内置按钮所使用的同一个翻译函数。
