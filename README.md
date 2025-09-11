# Tiptapify

---

[Tiptap](https://tiptap.dev) 3 editor for Vue3 with [Vuetify](https://vuetifyjs.com) toolbar implementation

## Status
*Alpha*

*Not production ready (yet) - may contain bugs and internal logic may change*

## Requirements
- Vue 3.x
- Vuetify.js 3.x

## Features
- Vuetify components
- Markdown support
- TypeScript support
- i18n
- Bubble Menu
- Floating Menu
- Slash Command
- Dark theme

## Installation
Install package
```bash
# npm
npm i tiptapify

# or pnpm
pnpm i tiptapify
```

Register plugin in your main.js (main.ts)
```typescript
import TiptapifyPlugin from 'tiptapify';
import 'tiptapify/style.css';
app.use(TiptapifyPlugin, { locale: 'en' });
```
Should be something like this

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import { aliases, mdi as mdiSvg } from 'vuetify/iconsets/mdi-svg'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
  icons: { defaultSet: 'mdi', aliases, sets: { mdiSvg } },
})

app.use(vuetify);

// add these lines
import TiptapifyPlugin from 'tiptapify';
import 'tiptapify/style.css';
app.use(TiptapifyPlugin, { locale: 'en' });

// Mount vue app
app.mount('#app')
```

## Usage

```vue
<script setup lang="ts">
  const handleEditorReady = (options: { editor: any, getHTML: Function, getJSON: Function, echo: Function }) => {
    console.log('The editor is ready', options.editor);
    console.log('editor html', options.getHTML());
    console.log('editor json', options.getJSON());
  };
</script>

<template>
  <Tiptapify
      :content="content"
      :bubble-menu="true"
      :floating-menu="false"
      :slash-commands="true"
      @editor-ready="handleEditorReady"
  />
</template>
```

<br>
You can choose which toolbar items to display by providing array/object to items prop

```vue
<script setup lang="ts">
  // show items in predefined sections
  const items = ['fontFamily', 'fontSize', 'lineHeight', 'textColor', 'highlightColor', 'code', 'codeBlock', 'pagebreak']

  // show items in custom sections
  const items = { section1: ['textColor', 'fontFamily', 'fontSize', 'lineHeight', 'code', 'codeBlock'], section2: ['pagebreak'] }
</script>

<template>
  <Tiptapify
      ...
      :items="items"
  />
</template>
```

<br>
Also you can choose which toolbar items to ignore by providing prop items-exclude alongside items prop.

```vue
<script setup lang="ts">
  const items = ['fontFamily', 'fontSize', 'lineHeight', 'textColor', 'highlightColor', 'code', 'codeBlock', 'pagebreak']
</script>

<template>
  <Tiptapify
      ...
      :items="items"
      :items-exclude="true"
  />
</template>
```

## L10N (Localisation)
Found a wrong translation or want to add a new language? Feel free to [send your translation](mailto:ivoyt90@gmail.com) made from the [template](https://raw.githubusercontent.com/IVoyt/tiptapify/refs/heads/main/src/i18n/locales/en.json).

## Feedback
Found a bug or have ideas on improvement? Feel free to [create a ticket](https://github.com/IVoyt/tiptapify/issues/new).


### TODO

- [x] menu items list customizable
- [x] extend a built-in font list
- [x] raw html mode
- [x] fullscreen mode
- [x] tables extension
- [x] preview extension
- [x] image extension
- [x] text styling (background & font color)
- [x] dark theme
- [x] emoji extension
- [x] video extensions
- [x] filter option in emoji extension
- [x] option to provide custom extension
- [x] iframe extension
- [ ] charmap extension
- [ ] extended video extensions
- [ ] print hotkey in a tooltip
- [ ] demo
- [ ] documentation
- [ ] AI features

## Licence
[MIT](./LICENSE)
