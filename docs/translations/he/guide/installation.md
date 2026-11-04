# התקנה {#installation}

## דרישות {#requirements}

- **Vue 3.5+**
- **vue-i18n 11+**
- **Vuetify 3.8+ או Vuetify 4.x**
- **@mdi/js** (Material Design Icons)

## התקנת החבילה {#install-the-package}

::: code-group

```bash [npm]
npm i tiptapify
```

```bash [pnpm]
pnpm i tiptapify
```

```bash [yarn]
yarn add tiptapify
```

:::

## תלויות Peer {#peer-dependencies}

Tiptapify דורש את תלויות ה-peer הבאות. ודאו שהן מותקנות בפרויקט שלכם:

```bash
npm i @mdi/js vue vue-i18n vuetify
```

## הגדרת Vuetify {#vuetify-setup}

רשמו את Vuetify עם אייקוני MDI ב-`main.ts` / `main.js` שלכם:

```typescript
import { createApp } from 'vue'
import App from './App.vue'

import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
})

const app = createApp(App)
app.use(vuetify)
app.mount('#app')
```

## רישום התוסף Tiptapify {#register-the-tiptapify-plugin}

בקובץ הכניסה של האפליקציה, ייבאו ורשמו את התוסף Tiptapify:

```typescript
import { createI18n } from 'vue-i18n'
import TiptapifyPlugin from 'tiptapify'
import 'tiptapify/style.css'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
})

app.use(i18n)
app.use(TiptapifyPlugin, { i18n })
```

## דוגמה מלאה {#full-example}

הנה הגדרה מלאה של `main.ts`:

```typescript
import { createApp } from 'vue'
import App from './App.vue'

import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

import { createI18n } from 'vue-i18n'
import TiptapifyPlugin from 'tiptapify'
import 'tiptapify/style.css'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
})

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
})

const app = createApp(App)

app.use(vuetify)
app.use(i18n)
app.use(TiptapifyPlugin, { i18n })

app.mount('#app')
```

## הגדרה עם Vue 3 + Composition API {#vue-3-composition-api-setup}

אם אתם משתמשים בתחביר `<script setup>`, אפשר להשתמש בעורך מיד:

```vue
<script setup lang="ts">
const handleEditorReady = (options) => {
  console.log('HTML:', options.getHTML())
  console.log('JSON:', options.getJSON())
}
</script>

<template>
  <Tiptapify
    placeholder="Start writing..."
    @editor-ready="handleEditorReady"
  />
</template>
```

## שימוש ב-CDN {#cdn-usage}

לאבות טיפוס מהירים אפשר לטעון את Tiptapify דרך CDN:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tiptapify@latest/dist/tiptapify.css" />
</head>
<body>
  <div id="app">
    <tiptapify placeholder="Start typing..."></tiptapify>
  </div>
  <script type="module">
    import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
    import TiptapifyPlugin from 'https://cdn.jsdelivr.net/npm/tiptapify@latest/dist/tiptapify.mjs'
    import 'https://cdn.jsdelivr.net/npm/tiptapify@latest/dist/tiptapify.css'
    // Note: CDN usage requires Vue, Vuetify, and @mdi/js to be loaded separately
  </script>
</body>
</html>
```

::: warning מגבלות CDN
שימוש ב-CDN אינו מומלץ לסביבת ייצור. השתמשו תמיד ב-module bundler (‏Vite, Webpack) בפריסות לסביבת ייצור.
:::
