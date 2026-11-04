# Media

## Images

Insert images from a URL:

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

The image button opens the image dialog:

- **By URL** or **Upload**. Without an [upload endpoint](/guide/uploads) a picked file is embedded as a base64 data URL; with one the file goes to your server.
- **Alt text** (the dialog reminds you when it is empty) and a **caption** under the image.
- **Size**: original, text width, or custom width × height with the ratio lock.
- **Position**: centered on its own line, or floating left or right of the text.

A selected image has resize handles (each resize is one undo step) and a toolbar over it: float left or right, download, edit, delete. A double click opens the dialog.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Videos

Embed YouTube and Vimeo videos, or a video file:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

The video button opens the video dialog:

- **A YouTube or Vimeo link** becomes their player; the dialog shows the recognized provider and a preview, and **Start at** (prefilled from `?t=`) where the player supports it.
- **A link to a video file** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) becomes a `<video>` with a poster, controls, autoplay (muted) and loop. The link needs its protocol (`https://`, `http://`), `//host` or a `/path`: the dialog never guesses one.
- **Upload** sends a video file to your server; it shows only with an [upload endpoint](/guide/uploads).
- **Size**: responsive 16:9, or custom width × height with the ratio lock.

A YouTube URL pasted into the text is embedded as well. A click on a player selects it instead of playing it, so the toolbar button shows it; a double click opens the dialog.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Paste a YouTube URL to embed a video..." />

## Iframes

Embed a page by its address or by the iframe code from its Share or Embed menu:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

The iframe dialog reads a pasted code (address, size, title, permissions, sandbox, lazy loading, fullscreen) and says what it took from it; a code with scripts or other tags is refused. It shows a preview and has a **title for screen readers**, the size (responsive in the code's proportions, or custom with the ratio lock), and under **Advanced** the name, `allow`, `sandbox`, lazy loading and a border. The address needs `https://` or `http://`. A double click on an embed opens the dialog.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Enter a URL to embed as iframe..." />

## Tables

Insert and edit tables:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

After inserting a table, you can:
- Add/remove rows and columns
- Select cells
- Delete the entire table

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Use the table button to insert a table..." />

## Links

Insert hyperlinks:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

The link dialog takes the address as it is typed: `https://…`, any other scheme (`ftp://`, `ssh://`, an internal one), `mailto:`, `tel:`, `#anchor` or `/page`. It never adds a protocol on its own: an address without one (`example.com`, `internal.host:8080`) gets chips to add `https://`, `http://` or `ftp://`, and stays as typed if you add none. `javascript:`, `vbscript:` and `data:` addresses are refused.

The dialog also has the link text, **Open in a new tab** (which adds `noopener noreferrer`), and under **Advanced** the `rel` values as chips (any value: Enter, space or comma adds it) and a CSS class.

With the [`linkPreview`](/api/props#linkpreview) prop the same dialog shows a link as a card with the page's image, title and description, and a URL pasted into an empty line offers **Link / Card** — see [Link cards](/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Select text and click link to add a hyperlink..." />

## Emoji

Insert emoji from the built-in picker with 10 categories:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

The emoji picker includes a search/filter input to find specific emoji quickly.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Click the emoji button to insert an emoji..." />

## Special Characters (Charmap)

Insert special characters, arrows, Greek letters, math symbols, and more:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Categories include:
- Arrows
- Currency
- Greek Letters
- Math Symbols
- Miscellaneous

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Click charmap to insert special characters..." />

## Combining Media Tools

A full-featured media toolbar:

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
placeholder="Full media toolbar..." />
