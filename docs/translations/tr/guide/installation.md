# Kurulum {#installation}

## Gereksinimler {#requirements}

- **Vue 3.5+**
- **vue-i18n 11+**
- **Vuetify 3.8+ veya Vuetify 4.x**
- **@mdi/js** (Material Design Icons)

## Paketi yükleyin {#install-the-package}

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

## Eş Bağımlılıklar {#peer-dependencies}

Tiptapify aşağıdaki eş bağımlılıkları gerektirir. Bunların projenizde kurulu olduğundan emin olun:

```bash
npm i @mdi/js vue vue-i18n vuetify
```

## Vuetify Kurulumu {#vuetify-setup}

Vuetify'ı MDI ikonlarıyla birlikte `main.ts` / `main.js` dosyanızda kaydedin:

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

## Tiptapify Eklentisini Kaydetme {#register-the-tiptapify-plugin}

Uygulamanızın giriş dosyasında Tiptapify eklentisini içe aktarın ve kaydedin:

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

## Tam Örnek {#full-example}

İşte eksiksiz bir `main.ts` kurulumu:

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

## Vue 3 + Composition API Kurulumu {#vue-3-composition-api-setup}

`<script setup>` sözdizimini kullanıyorsanız düzenleyiciyi hemen kullanabilirsiniz:

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

## CDN Kullanımı {#cdn-usage}

Hızlı prototipleme için Tiptapify'ı CDN üzerinden yükleyebilirsiniz:

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

::: warning CDN Sınırlamaları
CDN kullanımı üretim ortamı için önerilmez. Üretim dağıtımlarında her zaman bir modül paketleyici (Vite, Webpack) kullanın.
:::
