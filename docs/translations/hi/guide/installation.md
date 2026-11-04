# इंस्टॉलेशन {#installation}

## आवश्यकताएँ {#requirements}

- **Vue 3.5+**
- **vue-i18n 11+**
- **Vuetify 3.8+ या Vuetify 4.x**
- **@mdi/js** (Material Design Icons)

## पैकेज इंस्टॉल करें {#install-the-package}

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

## पीयर डिपेंडेंसी {#peer-dependencies}

Tiptapify को नीचे दी गई पीयर डिपेंडेंसी चाहिए। सुनिश्चित करें कि वे आपके प्रोजेक्ट में इंस्टॉल हैं:

```bash
npm i @mdi/js vue vue-i18n vuetify
```

## Vuetify सेटअप {#vuetify-setup}

अपनी `main.ts` / `main.js` में Vuetify को MDI आइकन के साथ रजिस्टर करें:

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

## Tiptapify प्लगइन रजिस्टर करें {#register-the-tiptapify-plugin}

अपनी ऐप की एंट्री फ़ाइल में Tiptapify प्लगइन इम्पोर्ट और रजिस्टर करें:

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

## पूरा उदाहरण {#full-example}

यह `main.ts` का पूरा सेटअप है:

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

## Vue 3 + Composition API सेटअप {#vue-3-composition-api-setup}

अगर आप `<script setup>` सिंटैक्स उपयोग कर रहे हैं, तो एडिटर तुरंत उपयोग किया जा सकता है:

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

## CDN उपयोग {#cdn-usage}

त्वरित प्रोटोटाइपिंग के लिए आप Tiptapify को CDN से लोड कर सकते हैं:

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

::: warning CDN की सीमाएँ
प्रोडक्शन के लिए CDN उपयोग करने की सलाह नहीं दी जाती। प्रोडक्शन डिप्लॉयमेंट के लिए हमेशा मॉड्यूल बंडलर (Vite, Webpack) उपयोग करें।
:::
