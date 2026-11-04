# Installation {#installation}

## Anforderungen {#requirements}

- **Vue 3.5+**
- **vue-i18n 11+**
- **Vuetify 3.8+ oder Vuetify 4.x**
- **@mdi/js** (Material Design Icons)

## Das Paket installieren {#install-the-package}

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

## Peer-Abhängigkeiten {#peer-dependencies}

Tiptapify benötigt die folgenden Peer-Abhängigkeiten. Stelle sicher, dass sie in deinem Projekt installiert sind:

```bash
npm i @mdi/js vue vue-i18n vuetify
```

## Vuetify einrichten {#vuetify-setup}

Registriere Vuetify mit MDI-Icons in deiner `main.ts` / `main.js`:

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

## Das Tiptapify-Plugin registrieren {#register-the-tiptapify-plugin}

Importiere und registriere das Tiptapify-Plugin in der Einstiegsdatei deiner App:

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

## Vollständiges Beispiel {#full-example}

Hier ist ein vollständiges `main.ts`-Setup:

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

## Einrichtung mit Vue 3 + Composition API {#vue-3-composition-api-setup}

Wenn du die Syntax `<script setup>` verwendest, kannst du den Editor sofort nutzen:

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

## CDN-Nutzung {#cdn-usage}

Für schnelles Prototyping kannst du Tiptapify per CDN laden:

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

::: warning Einschränkungen bei CDN
Die Nutzung per CDN wird für die Produktion nicht empfohlen. Verwende für Produktiv-Deployments immer einen Modul-Bundler (Vite, Webpack).
:::
