# การติดตั้ง {#installation}

## ข้อกำหนด {#requirements}

- **Vue 3.5+**
- **vue-i18n 11+**
- **Vuetify 3.8+ หรือ Vuetify 4.x**
- **@mdi/js** (Material Design Icons)

## ติดตั้งแพ็กเกจ {#install-the-package}

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

## Peer Dependencies {#peer-dependencies}

Tiptapify ต้องการ peer dependencies ต่อไปนี้ ตรวจสอบให้แน่ใจว่าติดตั้งไว้ในโปรเจกต์ของคุณแล้ว:

```bash
npm i @mdi/js vue vue-i18n vuetify
```

## การตั้งค่า Vuetify {#vuetify-setup}

ลงทะเบียน Vuetify พร้อมไอคอน MDI ใน `main.ts` / `main.js`:

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

## ลงทะเบียนปลั๊กอิน Tiptapify {#register-the-tiptapify-plugin}

ในไฟล์เริ่มต้นของแอป ให้ import และลงทะเบียนปลั๊กอิน Tiptapify:

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

## ตัวอย่างฉบับเต็ม {#full-example}

ตัวอย่างการตั้งค่า `main.ts` แบบสมบูรณ์:

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

## การตั้งค่า Vue 3 + Composition API {#vue-3-composition-api-setup}

หากใช้ไวยากรณ์ `<script setup>` ก็ใช้เอดิเตอร์ได้ทันที:

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

## การใช้งานผ่าน CDN {#cdn-usage}

หากต้องการทดลองต้นแบบอย่างรวดเร็ว สามารถโหลด Tiptapify ผ่าน CDN ได้:

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

::: warning ข้อจำกัดของ CDN
ไม่แนะนำให้ใช้ CDN ใน production ควรใช้ module bundler (Vite, Webpack) เสมอสำหรับการ deploy จริง
:::
