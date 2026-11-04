### 0.4.2
- added "Reset changes" toolbar button with "Don’t ask again" option (kept in `localStorage`)

### 0.4.1
- the image dialog logic is exported as `imageDialog` (`applyImage`, `removeImage`, `selectedImageAttrs`, the size helpers and their types), for a host that replaces the image dialog with its own: imported from `tiptapify/src/…` it ran another copy of prosemirror-state than the editor of the build, so a selected image was not found — "Remove" did nothing and "Save" replaced the image instead of updating it; the selected image is now found by its node, not by `instanceof NodeSelection`

### 0.4.0
- Vuetify and `@mdi/js` are no longer bundled: the build kept its own copy of the Vuetify components (the auto-import brings them from `vuetify/components/*`, which `external: ['vuetify']` did not cover) and of every MDI icon, so the editor ran Vuetify 3 components inside a Vuetify 4 app; it now uses the app's Vuetify and icons, the peer dependencies, as declared (`tiptapify.mjs` 6.9 → 3.7 MB); the UMD build reads them from the `Vuetify` and `mdi` globals, and `@mdi/js` has no UMD build of its own, so a page that loads the editor with `<script>` sets `window.mdi`
- `contentStyles` prop: the saved HTML carries the look of link cards, images with captions and floats, videos, embeds and task lists as inline styles (`inline`, the default: a site shows it as it is), or keeps classes only for a site that loads the new `tiptapify/content.css` (`classes`); both from one set of rules the editor shows its content with; `inlineContentStyles(html)` and `contentCss(scope)` are exported; the styles are ignored when HTML loads back
- a YouTube video with the responsive size keeps it when the document loads again (it loaded at 640 × 480)
- fullscreen keeps the skin: the editor moved into the fullscreen dialog lost the skin and shape classes and the tokens of its root, so `pastel` showed the classic toolbar and the default skin lost its 32px button groups
- the documentation in all 36 languages of the editor: English at the root, every other language under its own path (`/uk/`, `/de/`, `/zh/`…, right to left for Arabic and Hebrew); the site's own strings (menus, sidebar, search, the demos) live in `docs/.vitepress/locales/*.json`, apart from the editor's translations; the live editors of a page speak its language; the language menu keeps one order, the current language highlighted in its place
- embed (iframe) dialog redesigned: one field for an address or a pasted `<iframe>` code (parsed: address, size, fullscreen, allow, sandbox…), a preview, a title for screen readers, size responsive / 16:9 / 4:3 / 1:1 / custom with the ratio lock, name / allow / sandbox / lazy loading / border under "Advanced", edit mode; a click selects an embed, a double click edits it; the deprecated `frameborder` is read as the border
- text color and highlight pickers redesigned: calm palettes with "Default" / "No highlight" as the first cell, recent colors, a HEX field, the eyedropper where the browser has one, a custom color inside the popover, keyboard navigation; picking a color after a hover preview is one undo step again
- AI assistant dialog redesigned: what the request applies to (selection, whole text, cursor), quick actions, a chat-like prompt (Enter sends) with one thinking / effort control, a collapsed reasoning line, the result rendered as it will be inserted, changes against the selection, another version, copy, and "Replace selection" / "Insert below" or "Insert" / "Append"; closing the dialog stops a running request
- selection, empty-line and image menus redesigned as one compact row: 32px icon buttons in groups with hairline dividers (bold, italic, underline, strike | superscript, subscript | highlight, code | link | clear formatting), tooltips with shortcuts, a primary-tinted pressed state, a soft shadow instead of the heavy offset one; the classic card (VCard + VToolbar + divided VBtnGroup) is gone, so the `bubble` shape flag no longer changes markup; the classic bubble tokens follow (`bubbleShadow`, `bubblePadding` 4px, `bubbleGap` 2px) and the skin baseline's bubble section needs re-recording
- superscript and subscript toolbar buttons show the active state (they asked for the marks `sup`/`sub`, which do not exist)
- AI "Replace selection" no longer leaves a broken tail: a selection cut inside a word takes the whole word, and the request sends the text of the paragraph around the selection (`textBefore` / `textAfter` in the context) with the rule to answer for the selection alone, so a model does not complete the fragment into the text that follows it
- AI errors explained: a failed fetch (service down or CORS), 401/403 (API key), 404 (endpoint path), 408/504/timeout, 429, 5xx, plus the service's own message; a custom `aiProvider` gets the same by throwing an error with `status`
- `TiptapifyDialog` takes a `title` slot (an icon in the title)
- a pasted URL is one link again, not a link inside a link (`<a><a>`): `tiptapify_link`, the second link mark, no longer makes links; it stays only for saved JSON, whose `tiptapify_link` marks load as `link`
- link cards: a link shown with the page's OpenGraph image, site, title and description, as a block of its own (`linkCard`, saved as one `<a data-link-card>`); made by pasting a URL (Link / Card choice) or by the Display as switch of the link dialog, which also edits a selected card (compact / large / without image, texts, image) and turns it back into a link; no separate toolbar button: a selected card highlights the Link button
- `linkPreview` prop `{ endpoint, headers }`: the backend endpoint that reads OpenGraph data (`GET {endpoint}?url=…`); checked by a handshake as the editor starts (`GET {endpoint}` → `{ "tiptapifyLinkPreview": 1 }`), once per endpoint for the page; without it nothing offers a card
- image, link and video dialogs redesigned: insert and edit modes ("Insert image" / "Edit image", Insert / Save, Remove only when editing), Enter applies, Esc and a click outside close and reset the form, errors stay inline and keep the dialog open
- image dialog Upload source: a picked file is embedded as a base64 data URL, no server needed; `upload` prop `{ endpoint, headers }`: picked files (images, video posters, video files, link card images) are sent to the endpoint instead (`POST`, multipart `file` and `kind`, answered by `{ url }`), with progress and cancel; the video dialog offers Upload only with it; the Uploads guide has the contract and example endpoints (PHP, Laravel, Node.js, Python)
- base64 images are kept when the document loads, unless the host passes `upload`
- image dialog: preview with the original size, size presets (original / text width / custom with the ratio lock), position (center / left / right), a hint for a missing alt; editing updates the image instead of re-inserting it, so `align` and host attributes are kept
- link dialog: link text (a link can be inserted without a selection), "open in a new tab" adds `noopener noreferrer`, the address is saved as typed: the dialog never adds a protocol itself; an address of a host without one (`example.com`, `internal.com:21`) shows "No protocol. Add:" with `https://`, `http://` and `ftp://` to pick from and can't be inserted until it has one, rel takes any value (chips; Enter, space or comma), rel and CSS class under "Advanced"; links are set on the `link` mark the editor parses and edits
- valid link addresses: any protocol with a host (`ftp://`, `sftp://`, `smb://`…), internal hosts without a dot (`http://intranet/…`, `http://localhost:8080`), other protocols (`sms:`, `skype:`, `magnet:`…), `#anchor` and relative links (`/path`, `./`, `../`, `?query`); `javascript:`, `vbscript:` and `data:` are rejected
- video dialog: YouTube and Vimeo links with a recognized-provider badge and a preview; a link straight to a video file (`.mp4`, `.webm`, `.ogg`, `.mov`; `http(s)://`, `//host` or a `/path`, the protocol is never guessed) is inserted as the `video` node with its poster, controls, autoplay and loop options; "start at" for players that support it (prefilled from `?t=`), responsive 16:9 or custom size with the ratio lock (the ratio of the size being edited, of the uploaded file, else 16:9); an unsupported link shows an error instead of closing the dialog
- `video` node for uploaded video files: poster, controls, autoplay (muted), loop, start (`#t=` fragment), responsive or custom size; it does not autoplay inside the editor
- active toolbar buttons are highlighted with Vuetify 4 too: its `.bg-primary` utility sits in a cascade layer under the button variant background, so an active button (bold in bold text, video on a selected video…) stayed white
- while editing, a click on a video player (uploaded, linked file, YouTube, Vimeo, other embeds) selects and outlines its block instead of playing it, and a double click opens the video dialog for it; a read-only editor plays them as usual
- an image with a set width (image dialog or resizing) is shown at that width up to the text width: the 400px max height in the editor caps only images without one, so resizing can make an image larger
- undo and redo of an image resize (and a size set in the image dialog) resize the image in the editor too

### 0.3.5
- link dialog accepts URLs the old href regex rejected: dots and underscores in the path and query (`/user.name/posts/…`, `permalink.php`, `?set=a.789`, `/file.pdf`), hyphenated and non-latin domains
- http(s) links are validated with the URL parser: explicit `http(s)://` prefix, no whitespace, hostname with non-empty dotted labels; `mailto:` and `tel:` checks are unchanged

### 0.3.4
- `skin` prop: `default` is the classic look, `pastel` is the quiet 0.3.3 one; the editor is classic by default again
- custom skins: `registerSkin('name', { extends, colors, metrics, shape })` or an inline object on the `skin` prop
- skin tokens as CSS variables (`--tf-*`): toolbar, buttons, groups, bubble menus, dropdowns, dialogs, frame, images
- shape flags: toolbar raised/flat, groups box/flat, buttons vuetify/quiet, bubble card/flat, dialog classic/soft, menu vuetify/soft
- classic toolbar sections render as VBtnGroup again (0.3.2 structure restored)
- typings: `TiptapifySkinConfig`, `TiptapifyShape`; docs: Skins guide with the token table

### 0.3.3
- quiet toolbar: flat groups divided by separators, ghost buttons with a neutral pressed state, light dropdowns
- `align` toolbar item: alignment as one dropdown (`align:left,center,right` limits the options)
- `bulletList:styles` / `orderedList:styles`: marker and numbering styles dropdown, saved as inline `list-style-type` like TinyMCE
- toolbar on a selected image: float left / right toggles (centered without them), download, edit, remove; resize handles on every side
- `'|'` in `items` groups the buttons explicitly; custom buttons can be placed by name
- text bubble menu restyled like the toolbar and hidden for a selected block (image, widget)
- character limit ring shows its percentage and explains itself in a tooltip
- `'~'` toolbar item pushes the items after it to the end of the toolbar
- heading dropdown shows the current style and labels its items; the button no longer runs redo on click
- images are saved as `<figure><img><figcaption>`; the caption is typed right under the image (a legacy `<img title>` loads its title as the caption)
- double click on an image opens the image dialog
- images in the editor never exceed the text width or 400px in height
- `imageSlider` prop: from this many images in a row the editor shows them as a numbered slider grid; a selected slide moves back and forth among the slides (`moveImage` command)
- image dialog labels the title field as caption
- a click on a link selects it instead of opening it
- custom toolbar buttons can join an existing section; custom sections no longer leak between editors
- typings: `TipTapEditor`, the editor class the package exports
- dialogs restyled: rounded card with a soft shadow, bold title, plain close button, roomy padding, outlined rounded fields by default, buttons without uppercase

### 0.3.2
- `heading:inline` option renders paragraph/heading levels as separate toolbar buttons
- tooltips for paragraph and heading level items

### 0.3.1
- do not pass undeclared attributes to toolbar buttons
- export TiptapifyConfig

- ### 0.3.0
- render hotkey in extension tooltip
- shared editor config

### 0.2.6
- AI plugin backend endpoint support
- fix vitepress themes

### 0.2.5
- fix link extension href validation
- refine the AI plugin UI
- activate the editor by clicking on the editable area
- fix styles
- update docs

### 0.2.4
- fix the character-count warning threshold
- export TiptapifyFooterAlignment
- update docs

### 0.2.3
- Add SVG circular progress indicator with color-coded thresholds
- Introduce limit, limitDefaultColor, limitAlertColor, limitWarningColor, and footerAlignment props
- Add TiptapifyFooterAlignment type and footer.limit i18n key

### 0.2.2
- re-export nodeViewProps, NodeViewWrapper, VueNodeViewRenderer

### 0.2.1
- fix highlight and font color extensions
- exclude styles from build

### 0.2.0
- add CharacterCount `limit` property
- add `GapCursor` extension
- add a basic AI prompt dialog with `ai` toolbar section

### 0.1.6
- add missing Link extension
- add some tests

### 0.1.5
- reexport TipTap modules
- refactor

### 0.1.4
- add loading, loadingColor and loadingHeight properties

### 0.1.3
- move vue-i18n to peerDependencies
- refactor

### 0.1.2
- Pass `props.locale` directly to `useLocale()` instead of `immediate` watcher
- Move `editor-ready` logic to `getTiptapEditor` `onCreate` callback
- Remove computed refs for props items/exclude/interactiveStyles
- Add `onCreate` callback param to `getTiptapEditor`
- Update tiptap deps to ^3.23.5
- Update TypeScript deps to ^6.0.3
- Add ESLint flat config with plugins
- Add stylelint devDependencies

### v0.1.0
- first Beta
- add documentation and examples
- add an image resize option
- update image extension appearance
- update emoji and charmap appearance
- provide `setLocale` plugin option

### v0.0.36
- add charmap extension
- add missing translations to the emoji extension 

### v0.0.35
- fix an active state for some toolbar items

### v0.0.34
- update build files

### v0.0.33
- add "keep ratio" in the image plugin
- add translations (ar, fi, hu, ja, ko, th, tr, vi)
- fix custom extensions – replace built-in plugin with custom extension instead of adding apart

### v0.0.32
- add missing dependency "extension-text-style"

### v0.0.31
- add support Vuetify 4

### v0.0.30
- iframe extension
- prevent movable dialog getting out of bound of the window

### v0.0.29
- fix broken bulletList
- do not disable list buttons when the selection is another list type

### v0.0.26
- Fullscreen mode
- bullet list options
- make toolbar icons size a bit larger

### v0.0.25
- fix a broken toolbar

### v0.0.24
- Emoji performance improvement
- fix broken custom toolbar items
- option to enable preview style change (font/color/size/highlight)

### v0.0.23
- add contentChanged event

### v0.0.21
- register custom extensions apart from custom components

### v0.0.20
- fix register custom extensions

### v0.0.19
- fix overriding default extensions list when custom extensions are passed

### v0.0.18
- fixes after refactor

### v0.0.17
- refactor

### v0.0.16
- update Emoji extension appearance
- Emoji filter option
- fix build:emojis command

### v0.0.15
- fix invisibleCharacters icon color
- remove unused component Toggle
- remove VContainer -> VRow -> VCol from main component

### v0.0.14
- add youtube extension
- resizable editor
- add editor height property
- init i18n on component level rather than plugin level

### v0.0.13
- add emoji extension

### v0.0.12
- add hidden characters extension
- support svg for button icons
- fix source code close modal
- fix modal positioning
- fix extension icons
- fix extensions' modals — open a modal only for that editor instance which triggered opening
- refactor

### v0.0.11
- fix regex in link extension
- fix prettifier in source code extension
- make font family extension interactive
- make font size extension interactive
- make line height extension interactive
- refactor
- update dependencies

### v0.0.10
- update dialogs UI
- disable style & format buttons when code/codeblock is selected
- make highlight/font color interactive
- extend a color list in highlight/font color extension
- make dialogs movable
- update link extension UI
- add href validation in link extension
- extend i18n

### v0.0.9
- added prop toolbarScrollable to allow overflow-x or wrap the toolbar items
- added characters count to the Footer
- dark theme support
- text color extension
- highlight color extension

### v0.0.8
- extend link extension
- added image extension
- added properties to set field/button variant

### v0.0.7
- added preview extension
- added tables extension
- refactor

### v0.0.6
- refactor toolbar items
- refactor Bubble/Floating menu
- added style for task-list extension
- updated editor appearance

### v0.0.5
- added view source extension
- added l10n
- added paragraph extension to headings menu
- refactor

### v0.0.4
- updated version

### v0.0.3
- added the "format clear" button
- extended font list

### v0.0.2
- refactor BubbleMenu

### v0.0.1
- initial
