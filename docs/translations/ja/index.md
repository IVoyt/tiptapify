<script setup>
</script>

# Tiptapify {#tiptapify}

**Vuetify 3 ツールバーを備えた、Vue 3 向け Tiptap 3 リッチテキストエディター**

::: info ベータ版について
このプロジェクトは現在**ベータ版**です。機能は一通り揃っていますが、まだ不具合が残っている可能性があります。
:::

## 特長 {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Vuetify 3 コンポーネント</h3>
    <p>Vuetify 3 コンポーネントだけで構築した、美しいマテリアルデザインのツールバー</p>
  </div>
  <div class="feature">
    <h3>30 以上の拡張機能</h3>
    <p>リッチテキストの書式設定、メディアの埋め込み、表、シンタックスハイライト付きコードブロック</p>
  </div>
  <div class="feature">
    <h3>スラッシュコマンド</h3>
    <p><code>/</code> を入力すると、見出し、リスト、メディアなどをすばやく挿入できるメニューが開きます</p>
  </div>
  <div class="feature">
    <h3>国際化</h3>
    <p>vue-i18n により 20 以上の言語に対応</p>
  </div>
  <div class="feature">
    <h3>ダークテーマ</h3>
    <p>Vuetify のテーマと連動して、ダーク/ライトモードに自動で対応</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>すべてのツールバー項目と props の型をエクスポートし、TypeScript を完全にサポート</p>
  </div>
</div>

## クイックスタート {#quick-start}

```bash
npm i tiptapify
# or
pnpm i tiptapify
```

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

::: tip ピア依存関係
Tiptapify を使うには、ピア依存関係として **Vue 3.x**、**Vuetify 3.x または 4.x**、**vue-i18n 11 以上**、**@mdi/js** が必要です。セットアップの詳細は[インストールガイド](/ja/guide/installation)をご覧ください。
:::

## ライセンス {#license}

MIT — [GitHub リポジトリ](https://github.com/IVoyt/tiptapify)

<style scoped>
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature {
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

html.dark .feature h3 {
  color: #9dacff;
}

:root.dark .feature h3,
.VPTheme.dark .feature h3 {
  color: var(--vp-c-brand-2, #9dacff);
}

.feature p {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}
</style>
