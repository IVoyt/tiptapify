# Slash Commands

Slash commands provide a quick-insert menu that appears when you type `/` at the start of a line.

## Enabling Slash Commands

Slash commands are enabled by default. To explicitly control them:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="Slash commands demo..."
:slash-commands="true"
/>

## Available Commands

Type `/` in the editor to see the command palette. Available commands include:

| Command         | Description                        |
|-----------------|------------------------------------|
| `/h1` - `/h6`   | Insert a heading (levels 1-6)      |
| `/bulletList`   | Insert a bullet list               |
| `/numberedList` | Insert a numbered list             |
| `/taskList`     | Insert a task list                 |
| `/code`         | Insert inline code                 |
| `/codeBlock`    | Insert a code block                |
| `/quote`        | Insert a blockquote                |
| `/image`        | Insert an image (opens URL dialog) |
| `/video`        | Embed a YouTube video              |
| `/table`        | Insert a table                     |
| `/link`         | Insert a hyperlink                 |
| `/divider`      | Insert a horizontal rule           |
| `/emoji`        | Open emoji picker                  |
| `/specialChars` | Open special characters            |

## How It Works

1. Place your cursor at the beginning of a line or after a space
2. Type `/` — the command palette appears
3. Continue typing to filter commands
4. Press `Enter` or click to insert the selected command

## Disabling Slash Commands

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## Slash Commands with Floating Menu

Combine slash commands with the floating menu for the best editing experience:

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

- **Slash commands** (`/`) — triggered by typing `/` at the start of a line
- **Floating menu** — appears when you place your cursor on an empty line (offers block-level actions)
- **Bubble menu** — appears when you select text (offers inline formatting)

## Filtering Available Commands

You can specify which commands to include by passing an array of command IDs:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### Available Command IDs

| ID             | Description          |
|----------------|----------------------|
| `h1` - `h6`    | Heading levels 1-6   |
| `bulletList`   | Bullet list          |
| `numberedList` | Numbered list        |
| `taskList`     | Task list            |
| `code`         | Inline code          |
| `codeBlock`    | Code block           |
| `quote`        | Blockquote           |
| `image`        | Image                |
| `video`        | YouTube video        |
| `table`        | Table                |
| `link`         | Link                 |
| `divider`      | Horizontal rule      |
| `emoji`        | Emoji                |
| `specialChars` | Special characters   |
