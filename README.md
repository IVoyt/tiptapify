# Tiptapify

---

[Tiptap](https://tiptap.dev) 3 (beta) editor for Vue3 with [Vuetify](https://vuetifyjs.com) menu implementation

## Requirements
- Vue 3.x
- Vuetify.js 3.x

## Features
- Vuetify components
- Markdown support
- TypeScript support
- I18n support(`en`, `ru`, `ua`, more later)
- Vuetify 3.x and Vue 3.x support
- Bubble Menu
- Floating Menu
- Slash Command

## Installation
Install package
```bash
# npm
npm i tiptify

# or pnpm
pnpm i tiptify
```

Register plugin in your main.js (main.ts)
```typescript
import TiptapifyPlugin from 'tiptapify';
app.use(TiptapifyPlugin, { locale: 'en' });
```
Should be something like this

```typescript
import { createApp } from "vue";
import App from "./App.vue";

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
  icons: { defaultSet: 'mdi', aliases, sets: { mdi } },
})

app.use(vuetify);

// add these lines
import TiptapifyPlugin from 'tiptapify';
app.use(TiptapifyPlugin, { locale: 'en' });

// Mount vue app
app.mount('#app')
```


### TODO

- [ ] menu items list customizable
- [ ] menu extensions for media (image, video), tables
- [ ] option to use custom component for link & media extension
- [ ] option to provide custom extension
- [ ] demo
- [ ] documentation
- [ ] dark theme

## Licence
[MIT](./LICENSE)