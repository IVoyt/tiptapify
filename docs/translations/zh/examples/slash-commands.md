# 斜杠命令 {#slash-commands}

斜杠命令提供一个快速插入菜单，在行首输入 `/` 时出现。

## 启用斜杠命令 {#enabling-slash-commands}

斜杠命令默认启用。如需显式控制：

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="斜杠命令演示..."
:slash-commands="true"
/>

## 可用命令 {#available-commands}

在编辑器中输入 `/` 即可查看命令面板。可用命令包括：

| 命令            | 说明                       |
|-----------------|----------------------------|
| `/h1` - `/h6`   | 插入标题（1-6 级）         |
| `/bulletList`   | 插入无序列表               |
| `/numberedList` | 插入有序列表               |
| `/taskList`     | 插入任务列表               |
| `/code`         | 插入行内代码               |
| `/codeBlock`    | 插入代码块                 |
| `/quote`        | 插入引用块                 |
| `/image`        | 插入图片（打开 URL 对话框）|
| `/video`        | 嵌入 YouTube 视频          |
| `/table`        | 插入表格                   |
| `/link`         | 插入超链接                 |
| `/divider`      | 插入水平分隔线             |
| `/emoji`        | 打开表情选择器             |
| `/specialChars` | 打开特殊字符               |

## 工作原理 {#how-it-works}

1. 将光标置于行首或空格之后
2. 输入 `/`——命令面板随即出现
3. 继续输入以筛选命令
4. 按 `Enter` 或点击以插入所选命令

## 禁用斜杠命令 {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## 斜杠命令与浮动菜单 {#slash-commands-with-floating-menu}

将斜杠命令与浮动菜单结合使用，可获得最佳编辑体验：

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    :floating-menu="true"
    :bubble-menu="true"
    placeholder="Full command experience..."
  />
</template>
```

- **斜杠命令**（`/`）——在行首输入 `/` 时触发
- **浮动菜单**——光标位于空行时出现（提供块级操作）
- **气泡菜单**——选中文本时出现（提供行内格式化）

## 筛选可用命令 {#filtering-available-commands}

可以通过传入命令 ID 数组来指定要包含的命令：

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### 可用命令 ID {#available-command-ids}

| ID             | 说明                 |
|----------------|----------------------|
| `h1` - `h6`    | 1-6 级标题           |
| `bulletList`   | 无序列表             |
| `numberedList` | 有序列表             |
| `taskList`     | 任务列表             |
| `code`         | 行内代码             |
| `codeBlock`    | 代码块               |
| `quote`        | 引用块               |
| `image`        | 图片                 |
| `video`        | YouTube 视频         |
| `table`        | 表格                 |
| `link`         | 链接                 |
| `divider`      | 水平分隔线           |
| `emoji`        | 表情                 |
| `specialChars` | 特殊字符             |
