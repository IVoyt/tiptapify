# 工具栏项 {#toolbar-items}

按分区组织的所有可用工具栏项。

## 操作 {#actions}

| 项       | 说明                        |
|----------|-----------------------------|
| `undo`   | 撤销上一次更改              |
| `redo`   | 重做上一次撤销的更改        |
| `resetChanges` | 放弃自打开编辑器以来的所有更改并清除历史记录（会先确认） |

## AI {#ai}

| 项   | 说明                                     |
|------|------------------------------------------|
| `ai` | 如已配置，则打开 AI 提示词对话框         |

## 格式 {#format}

| 项          | 说明                 |
|-------------|----------------------|
| `bold`      | 切换粗体文本         |
| `italic`    | 切换斜体文本         |
| `underline` | 切换下划线           |
| `strike`    | 切换删除线           |

## 更多格式 {#format-extra}

| 项           | 说明                                         |
|--------------|----------------------------------------------|
| `sup`        | 切换上标                                     |
| `sub`        | 切换下标                                     |
| `code`       | 切换行内代码                                 |
| `codeBlock`  | 插入带语法高亮的代码块                       |
| `blockquote` | 插入引用块                                   |

## 样式 {#style}

| 项               | 说明                                       |
|------------------|--------------------------------------------|
| `heading`        | 用于选择标题级别（H1-H6）的下拉菜单        |
| `fontFamily`     | 用于选择字体的下拉菜单                     |
| `fontSize`       | 用于选择字号的下拉菜单                     |
| `lineHeight`     | 设置行高                                   |
| `textColor`      | 文字颜色：调色板、最近使用的颜色、HEX、取色器、自定义选择器 |
| `highlightColor` | 高亮颜色：同一个选择器，“无高亮”排在首位 |

`heading` 项可在冒号之后接受选项：标题级别、用于添加段落项的 `p`，以及用于将它们显示为单独按钮而非下拉菜单的 `inline`：

```vue
<Tiptapify :items="['heading:p,2,3,inline', 'bold', 'italic']" />
```

## 对齐 {#alignment}

| 项        | 说明              |
|-----------|-------------------|
| `left`    | 文本左对齐        |
| `center`  | 文本居中对齐      |
| `right`   | 文本右对齐        |
| `justify` | 文本两端对齐      |
| `align`   | 对齐下拉菜单；`align:left,center,right` 可限制其选项 |

## 列表 {#list}

| 项             | 说明                          |
|----------------|-------------------------------|
| `bulletList`   | 切换无序列表                  |
| `orderedList`  | 切换有序列表                  |
| `taskList`     | 切换任务列表（复选框）        |
| `indent`       | 增加当前块的缩进              |
| `outdent`      | 减少当前块的缩进              |

## 媒体 {#media}

| 项        | 说明                              |
|-----------|-----------------------------------|
| `link`    | 插入/编辑链接，配合 `linkPreview` 时可插入[链接卡片](/zh/guide/link-cards) |
| `image`   | 插入/编辑图片：通过 URL 或上传、替代文本、图片说明、尺寸、位置 |
| `video`   | 插入/编辑 YouTube、Vimeo 或视频文件（`.mp4`、`.webm`、`.ogg`、`.mov`） |
| `iframe`  | 通过页面地址或 iframe 代码嵌入页面 |
| `emoji`   | 打开表情选择器（10 个分类）       |
| `charmap` | 打开特殊字符选择器                |
| `table`   | 插入表格                          |

## 其他 {#misc}

| 项              | 说明                                       |
|-----------------|--------------------------------------------|
| `line`          | 插入水平分隔线                             |
| `pagebreak`     | 插入分页符                                 |
| `source`        | 切换原始 HTML 源码视图                     |
| `preview`       | 切换 HTML 预览模式                         |
| `fullscreen`    | 切换全屏编辑模式                           |
| `formatClear`   | 清除所选内容的所有格式                     |
| `invisibleChar` | 插入不可见字符（空格等）                   |

## 分隔符 {#separators}

在数组形式的 `items` 属性中，使用 `|` 作为按钮组之间的分隔符：

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## 完整工具栏示例 {#complete-toolbar-example}

```vue
<template>
  <Tiptapify
    :items="[
      'undo', 'redo',
      '|',
      'heading', 'fontFamily', 'fontSize',
      '|',
      'bold', 'italic', 'underline', 'strike',
      '|',
      'sup', 'sub', 'code', 'codeBlock', 'blockquote',
      '|',
      'left', 'center', 'right', 'justify',
      '|',
      'bulletList', 'orderedList', 'taskList',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'ai',
      '|',
      'line', 'pagebreak', 'formatClear',
      '|',
      'source', 'preview', 'fullscreen'
    ]"
  />
</template>
```
