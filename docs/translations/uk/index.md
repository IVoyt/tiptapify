<script setup>
</script>

# Tiptapify {#tiptapify}

**Rich text редактор Tiptap 3 для Vue 3 з панеллю інструментів на Vuetify 3**

::: info Статус Beta
Проєкт зараз перебуває у статусі **Beta**. Він функціонально завершений, але в ньому ще можуть бути помилки.
:::

## Можливості {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Компоненти Vuetify 3</h3>
    <p>Гарна панель інструментів у стилі Material Design, повністю побудована на компонентах Vuetify 3</p>
  </div>
  <div class="feature">
    <h3>30+ розширень</h3>
    <p>Форматування тексту, вбудовування медіа, таблиці, блоки коду з підсвічуванням синтаксису</p>
  </div>
  <div class="feature">
    <h3>Slash-команди</h3>
    <p>Введіть <code>/</code>, щоб відкрити меню швидкої вставки заголовків, списків, медіа та іншого</p>
  </div>
  <div class="feature">
    <h3>Інтернаціоналізація</h3>
    <p>Понад 20 мов через vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Темна тема</h3>
    <p>Автоматична підтримка темного й світлого режимів, інтегрована з темою Vuetify</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Повна підтримка TypeScript з експортованими типами для всіх елементів панелі інструментів і пропсів</p>
  </div>
</div>

## Швидкий старт {#quick-start}

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

::: tip Peer-залежності
Для роботи Tiptapify потрібні **Vue 3.x**, **Vuetify 3.x або 4.x**, **vue-i18n 11+** та **@mdi/js** як peer-залежності. Повне налаштування дивіться в [посібнику зі встановлення](/uk/guide/installation).
:::

## Ліцензія {#license}

MIT — [GitHub-репозиторій](https://github.com/IVoyt/tiptapify)

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
