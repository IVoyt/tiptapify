# Εγκατάσταση {#installation}

## Απαιτήσεις {#requirements}

- **Vue 3.5+**
- **vue-i18n 11+**
- **Vuetify 3.8+ ή Vuetify 4.x**
- **@mdi/js** (Material Design Icons)

## Εγκατάσταση του πακέτου {#install-the-package}

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

## Εξαρτήσεις peer {#peer-dependencies}

Το Tiptapify απαιτεί τις παρακάτω peer dependencies. Βεβαιωθείτε ότι είναι εγκατεστημένες στο έργο σας:

```bash
npm i @mdi/js vue vue-i18n vuetify
```

## Ρύθμιση του Vuetify {#vuetify-setup}

Καταχωρίστε το Vuetify με εικονίδια MDI στο `main.ts` / `main.js`:

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

## Καταχώριση του πρόσθετου Tiptapify {#register-the-tiptapify-plugin}

Στο αρχείο εισόδου της εφαρμογής, εισαγάγετε και καταχωρίστε το πρόσθετο Tiptapify:

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

## Πλήρες παράδειγμα {#full-example}

Ακολουθεί μια πλήρης ρύθμιση του `main.ts`:

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

## Ρύθμιση για Vue 3 + Composition API {#vue-3-composition-api-setup}

Αν χρησιμοποιείτε τη σύνταξη `<script setup>`, ο επεξεργαστής μπορεί να χρησιμοποιηθεί αμέσως:

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

## Χρήση μέσω CDN {#cdn-usage}

Για γρήγορη δοκιμή πρωτοτύπων, μπορείτε να φορτώσετε το Tiptapify μέσω CDN:

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

::: warning Περιορισμοί του CDN
Η χρήση μέσω CDN δεν συνιστάται για παραγωγή. Στις παραγωγικές εγκαταστάσεις χρησιμοποιείτε πάντα bundler (Vite, Webpack).
:::
