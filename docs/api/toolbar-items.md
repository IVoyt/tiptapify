# Toolbar Items

All available toolbar items organized by section.

## Actions

| Item     | Description                 |
|----------|-----------------------------|
| `undo`   | Undo the last change        |
| `redo`   | Redo the last undone change |

## AI

| Item | Description                              |
|------|------------------------------------------|
| `ai` | Open the AI prompt dialog if configured  |

## Format

| Item        | Description          |
|-------------|----------------------|
| `bold`      | Toggle bold text     |
| `italic`    | Toggle italic text   |
| `underline` | Toggle underline     |
| `strike`    | Toggle strikethrough |

## Format Extra

| Item         | Description                                  |
|--------------|----------------------------------------------|
| `sup`        | Toggle superscript                           |
| `sub`        | Toggle subscript                             |
| `code`       | Toggle inline code                           |
| `codeBlock`  | Insert a code block with syntax highlighting |
| `blockquote` | Insert a blockquote                          |

## Style

| Item             | Description                                |
|------------------|--------------------------------------------|
| `heading`        | Dropdown to select heading level (H1-H6)   |
| `fontFamily`     | Dropdown to select font family             |
| `fontSize`       | Dropdown to select font size               |
| `lineHeight`     | Set line height                            |
| `textColor`      | Apply text color                           |
| `highlightColor` | Apply highlight/background color           |

## Alignment

| Item      | Description       |
|-----------|-------------------|
| `left`    | Align text left   |
| `center`  | Align text center |
| `right`   | Align text right  |
| `justify` | Justify text      |

## List

| Item           | Description                   |
|----------------|-------------------------------|
| `bulletList`   | Toggle bullet list            |
| `orderedList`  | Toggle numbered list          |
| `taskList`     | Toggle task list (checkboxes) |
| `indent`       | Indent the current block      |
| `outdent`      | Outdent the current block     |

## Media

| Item      | Description                       |
|-----------|-----------------------------------|
| `link`    | Insert/edit a hyperlink           |
| `image`   | Insert an image by URL            |
| `video`   | Embed a YouTube video             |
| `iframe`  | Embed any URL as an iframe        |
| `emoji`   | Open emoji picker (10 categories) |
| `charmap` | Open special characters picker    |
| `table`   | Insert a table                    |

## Misc

| Item            | Description                                |
|-----------------|--------------------------------------------|
| `line`          | Insert a horizontal rule                   |
| `pagebreak`     | Insert a page break                        |
| `source`        | Toggle raw HTML source view                |
| `preview`       | Toggle HTML preview mode                   |
| `fullscreen`    | Toggle fullscreen editing mode             |
| `formatClear`   | Clear all formatting from selection        |
| `invisibleChar` | Insert invisible characters (spaces, etc.) |

## Separators

Use `|` as a separator between button groups in array-style `items` prop:

```vue
<Tiptapify
  :items="['bold', 'italic', '|', 'heading', 'bulletList', '|', 'undo', 'redo']"
/>
```

## Complete Toolbar Example

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
