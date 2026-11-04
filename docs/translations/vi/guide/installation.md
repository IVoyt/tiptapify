# Cài đặt {#installation}

## Yêu cầu {#requirements}

- **Vue 3.5+**
- **vue-i18n 11+**
- **Vuetify 3.8+ hoặc Vuetify 4.x**
- **@mdi/js** (Material Design Icons)

## Cài đặt gói {#install-the-package}

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

## Phụ thuộc ngang hàng (Peer Dependencies) {#peer-dependencies}

Tiptapify yêu cầu các peer dependencies sau. Hãy đảm bảo chúng đã được cài đặt trong dự án của bạn:

```bash
npm i @mdi/js vue vue-i18n vuetify
```

## Thiết lập Vuetify {#vuetify-setup}

Đăng ký Vuetify cùng biểu tượng MDI trong `main.ts` / `main.js`:

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

## Đăng ký plugin Tiptapify {#register-the-tiptapify-plugin}

Trong tệp khởi chạy của ứng dụng, import và đăng ký plugin Tiptapify:

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

## Ví dụ đầy đủ {#full-example}

Đây là một thiết lập `main.ts` hoàn chỉnh:

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

## Thiết lập Vue 3 + Composition API {#vue-3-composition-api-setup}

Nếu bạn dùng cú pháp `<script setup>`, có thể sử dụng trình soạn thảo ngay lập tức:

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

## Sử dụng qua CDN {#cdn-usage}

Để tạo nguyên mẫu nhanh, bạn có thể tải Tiptapify qua CDN:

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

::: warning Hạn chế của CDN
Không khuyến nghị dùng CDN cho môi trường production. Hãy luôn dùng module bundler (Vite, Webpack) khi triển khai production.
:::
