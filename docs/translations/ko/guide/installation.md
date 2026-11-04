# 설치 {#installation}

## 요구 사항 {#requirements}

- **Vue 3.5+**
- **vue-i18n 11+**
- **Vuetify 3.8+ 또는 Vuetify 4.x**
- **@mdi/js** (Material Design Icons)

## 패키지 설치 {#install-the-package}

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

## 피어 의존성 {#peer-dependencies}

Tiptapify에는 다음 피어 의존성이 필요합니다. 프로젝트에 설치되어 있는지 확인하세요.

```bash
npm i @mdi/js vue vue-i18n vuetify
```

## Vuetify 설정 {#vuetify-setup}

`main.ts` / `main.js`에서 Vuetify를 MDI 아이콘과 함께 등록합니다.

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

## Tiptapify 플러그인 등록 {#register-the-tiptapify-plugin}

앱 진입 파일에서 Tiptapify 플러그인을 가져와 등록합니다.

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

## 전체 예제 {#full-example}

다음은 완전한 `main.ts` 설정입니다.

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

## Vue 3 + Composition API 설정 {#vue-3-composition-api-setup}

`<script setup>` 문법을 사용한다면 에디터를 바로 사용할 수 있습니다.

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

## CDN 사용 {#cdn-usage}

빠른 프로토타이핑에는 CDN으로 Tiptapify를 불러올 수 있습니다.

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

::: warning CDN 사용 시 제한 사항
프로덕션 환경에서는 CDN 사용을 권장하지 않습니다. 프로덕션 배포에는 항상 모듈 번들러(Vite, Webpack)를 사용하세요.
:::
