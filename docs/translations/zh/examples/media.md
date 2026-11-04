# 媒体 {#media}

## 图片 {#images}

通过 URL 插入图片：

```vue
<script setup lang="ts">
const onEditorReady = (options) => {
  // Insert an image programmatically
  options.editor.commands.setImage({ src: 'https://picsum.photos/600/300' })
}
</script>

<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']"
    @editor-ready="onEditorReady"
  />
</template>
```

图片按钮会打开图片对话框：

- **通过 URL** 或 **上传**。没有[上传端点](/zh/guide/uploads)时，选取的文件会作为 base64 data URL 嵌入；有上传端点时，文件会发送到你的服务器。
- **替代文本**（为空时对话框会提醒你）以及图片下方的**图片说明**。
- **尺寸**：原始大小、文本宽度，或带比例锁定的自定义宽 × 高。
- **位置**：单独一行居中，或在文本左侧或右侧浮动。

选中的图片带有调整大小的手柄（每次调整都是一个撤销步骤），其上方还有一个工具栏：左浮动或右浮动、下载、编辑、删除。双击会打开对话框。

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## 视频 {#videos}

嵌入 YouTube 和 Vimeo 视频，或视频文件：

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

视频按钮会打开视频对话框：

- **YouTube 或 Vimeo 链接**会变成它们的播放器；对话框会显示识别出的提供商和预览，在播放器支持的情况下还有**开始于**（根据 `?t=` 预填）。
- **视频文件链接**（`.mp4`、`.m4v`、`.webm`、`.ogv`、`.ogg`、`.mov`）会变成带有封面、控件、自动播放（静音）和循环的 `<video>`。链接需要带有协议（`https://`、`http://`）、`//host` 或 `/path`：对话框从不猜测协议。
- **上传**会把视频文件发送到你的服务器；它仅在配置了[上传端点](/zh/guide/uploads)时显示。
- **尺寸**：自适应 16:9，或带比例锁定的自定义宽 × 高。

粘贴到文本中的 YouTube URL 同样会被嵌入。点击播放器会选中它而不是播放，因此工具栏按钮会显示它；双击会打开对话框。

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="粘贴 YouTube URL 以嵌入视频..." />

## Iframe {#iframes}

通过页面地址，或其“分享”或“嵌入”菜单中的 iframe 代码来嵌入页面：

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

iframe 对话框会读取粘贴的代码（地址、尺寸、标题、权限、sandbox、延迟加载、全屏），并告知从中读取了什么；包含脚本或其他标签的代码会被拒绝。它会显示预览，并提供**供屏幕阅读器使用的标题**、尺寸（按代码中的比例自适应，或带比例锁定的自定义），以及在**高级**下的名称、`allow`、`sandbox`、延迟加载和边框。地址需要以 `https://` 或 `http://` 开头。双击嵌入内容会打开对话框。

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="输入要作为 iframe 嵌入的 URL..." />

## 表格 {#tables}

插入和编辑表格：

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

插入表格后，你可以：
- 添加/删除行和列
- 选择单元格
- 删除整个表格

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="使用表格按钮插入表格..." />

## 链接 {#links}

插入超链接：

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

链接对话框会按输入的原样接收地址：`https://…`、任何其他协议（`ftp://`、`ssh://`、内部协议）、`mailto:`、`tel:`、`#anchor` 或 `/page`。它从不自行添加协议：没有协议的地址（`example.com`、`internal.host:8080`）会出现用于添加 `https://`、`http://` 或 `ftp://` 的标签，如果你不添加，则保持输入原样。`javascript:`、`vbscript:` 和 `data:` 地址会被拒绝。

对话框还提供链接文本、**在新标签页中打开**（会添加 `noopener noreferrer`），以及在**高级**下以标签形式输入的 `rel` 值（任意值：按 Enter、空格或逗号即可添加）和 CSS 类。

配合 [`linkPreview`](/zh/api/props#linkpreview) 属性，同一个对话框可以把链接显示为带有页面图片、标题和描述的卡片，粘贴到空行中的 URL 会提供 **链接 / 卡片** 选项——参见[链接卡片](/zh/guide/link-cards)。

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="选中文本并点击链接以添加超链接..." />

## 表情 {#emoji}

通过内置的表情选择器插入表情，共有 10 个分类：

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

表情选择器包含搜索/筛选输入框，可快速找到特定表情。

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="点击表情按钮插入表情..." />

## 特殊字符（Charmap） {#special-characters-charmap}

插入特殊字符、箭头、希腊字母、数学符号等：

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

分类包括：
- 箭头
- 货币
- 希腊字母
- 数学符号
- 其他

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="点击 charmap 插入特殊字符..." />

## 组合使用媒体工具 {#combining-media-tools}

功能齐全的媒体工具栏：

```vue
<template>
  <Tiptapify
    :items="[
      'bold', 'italic', 'underline',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'undo', 'redo'
    ]"
    placeholder="Full media toolbar..."
  />
</template>
```

<InteractiveEditor :items="[
'bold', 'italic', 'underline',
'|',
'link', 'image', 'video', 'iframe',
'|',
'emoji', 'charmap', 'table',
'|',
'undo', 'redo'
]"
placeholder="完整的媒体工具栏..." />
