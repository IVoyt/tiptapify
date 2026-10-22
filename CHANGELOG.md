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
