# インストール {#installation}

## 動作要件 {#requirements}

- **Vue 3.5 以上**
- **vue-i18n 11 以上**
- **Vuetify 3.8 以上、または Vuetify 4.x**
- **@mdi/js**（Material Design Icons）

## パッケージのインストール {#install-the-package}

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

## ピア依存関係 {#peer-dependencies}

Tiptapify には次のピア依存関係が必要です。プロジェクトにインストールされていることを確認してください。

```bash
npm i @mdi/js vue vue-i18n vuetify
```

## Vuetify のセットアップ {#vuetify-setup}

`main.ts` / `main.js` で、MDI アイコンとともに Vuetify を登録します。

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

## Tiptapify プラグインの登録 {#register-the-tiptapify-plugin}

アプリのエントリーファイルで、Tiptapify プラグインをインポートして登録します。

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

## 完全な例 {#full-example}

`main.ts` の完全なセットアップ例です。

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

## Vue 3 + Composition API のセットアップ {#vue-3-composition-api-setup}

`<script setup>` 構文を使っている場合は、すぐにエディターを使えます。

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

## CDN での利用 {#cdn-usage}

手早くプロトタイプを作るには、CDN 経由で Tiptapify を読み込めます。

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

::: warning CDN 利用の制限
本番環境での CDN 利用は推奨しません。本番デプロイでは、必ずモジュールバンドラー（Vite、Webpack）を使用してください。
:::
