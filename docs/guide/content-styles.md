# Content styles

Some of what the editor saves needs a look of its own on the page that shows it: link cards, images with their caption and float, videos and embeds that fit the text width, task lists with a checkbox beside each item. Without it a link card is a bare link with its image and texts run together.

The `contentStyles` prop says how the saved HTML carries that look:

| `contentStyles` | the saved HTML | on the site |
|---|---|---|
| `inline` (default) | the look is written into the `style` attributes of these elements | nothing to load: the HTML shows as it is |
| `classes` | classes and `data-` attributes only | load `tiptapify/content.css` and put the HTML in an element with the `tiptapify-content` class |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Both carry the same rules, the ones the editor itself shows the content with, so a page looks like the editor in either case. Only these elements get them: headings, paragraphs, lists, tables and the rest of the text keep the site's own styles.

## Inline styles

The default. A compact link card is saved as:

```html
<a class="tiptapify-link-card" data-link-card="compact" href="https://example.com/blog/getting-started" target="_blank" rel="noopener noreferrer" style="display: flex; flex-wrap: wrap; overflow: hidden; margin: 1rem 0; border: 1px solid rgba(128, 128, 128, 0.35); border-radius: 10px; color: inherit; text-decoration: none;">
  <img class="tiptapify-link-card__image" src="https://example.com/images/getting-started.png" alt="" style="flex: 1 1 180px; min-width: 0; max-width: 100%; min-height: 100px; margin: 0; object-fit: cover;">
  <span class="tiptapify-link-card__body" style="display: flex; flex: 999 1 260px; flex-direction: column; gap: 4px; min-width: 0; padding: 12px 16px;">
    <span class="tiptapify-link-card__site" style="font-size: 0.8125em; opacity: 0.7;">Example</span>
    <span class="tiptapify-link-card__title" style="font-weight: 600; line-height: 1.35;">Getting started</span>
    <span class="tiptapify-link-card__description" style="display: -webkit-box; overflow: hidden; font-size: 0.875em; line-height: 1.45; opacity: 0.7; -webkit-box-orient: vertical; -webkit-line-clamp: 3;">Install the package and create your first page.</span>
  </span>
</a>
```

- **Colors stay the site's.** Text inherits its color; muted text and borders use opacity and a half-transparent gray, so they work on a light and on a dark page alike. Set the text color for a theme on the site as usual.
- **No media queries are needed.** A compact card puts its image above the texts by itself in a narrow column; videos and embeds never get wider than the text.
- **A site may still restyle them**, the classes stay. An inline style wins over a class rule, so such a rule needs `!important`.
- **A sanitizer must keep the `style` attribute** on these elements, or they lose their look.

## Classes and content.css

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` is small and has no Vue or Vuetify inside. Its rules are wrapped in `:where(.tiptapify-content)`, so they weigh nothing: any rule of the site wins over them without `!important`. Use this when the site wants the look in one place, or styles its content itself.

`contentCss(scope)` gives the same stylesheet as a string, for another class than `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Loading HTML back

The editor reads these elements by their attributes and classes only: a link card by `data-link-card`, an image by its `src`, size and float, a task by `data-checked`. Their inline styles are ignored when HTML loads, and written again when it is saved. So the same HTML goes back and forth unchanged, a document saved with `inline` loads cleanly with `classes` and the other way round, and a later version of the editor updates the look of a document the next time it is saved.

Text formatting is not touched: the color or size of a text and the alignment of a paragraph are content, and the editor keeps reading them from their styles.

To turn class HTML into inline-styled HTML outside the editor (an older document, an email), use `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

It needs a DOM (a browser, or jsdom on a server) and returns the HTML as it is without one.

## Image sliders

The editor marks images in a row as a slider while you write (see the `imageSlider` prop); the saved HTML keeps them as figures one after another. Showing them as a slider is up to the site's own script.
