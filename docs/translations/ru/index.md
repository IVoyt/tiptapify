<script setup>
</script>

# Tiptapify {#tiptapify}

**Rich text редактор Tiptap 3 для Vue 3 с панелью инструментов на Vuetify 3**

::: info Статус Beta
Проект сейчас находится в статусе **Beta**. Он функционально завершён, но в нём ещё могут встречаться ошибки.
:::

## Возможности {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Компоненты Vuetify 3</h3>
    <p>Красивая панель инструментов в стиле Material Design, целиком построенная на компонентах Vuetify 3</p>
  </div>
  <div class="feature">
    <h3>30+ расширений</h3>
    <p>Форматирование текста, встраивание медиа, таблицы, блоки кода с подсветкой синтаксиса</p>
  </div>
  <div class="feature">
    <h3>Slash-команды</h3>
    <p>Введите <code>/</code>, чтобы открыть меню быстрой вставки заголовков, списков, медиа и многого другого</p>
  </div>
  <div class="feature">
    <h3>Интернационализация</h3>
    <p>Более 20 языков через vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Тёмная тема</h3>
    <p>Автоматическая поддержка тёмного и светлого режимов, согласованная с темой Vuetify</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Полная поддержка TypeScript с экспортируемыми типами для всех элементов панели инструментов и props</p>
  </div>
</div>

## Быстрый старт {#quick-start}

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

::: tip Peer-зависимости
Tiptapify требует в качестве peer-зависимостей **Vue 3.x**, **Vuetify 3.x или 4.x**, **vue-i18n 11+** и **@mdi/js**. Полную настройку см. в [руководстве по установке](/ru/guide/installation).
:::

## Лицензия {#license}

MIT — [репозиторий на GitHub](https://github.com/IVoyt/tiptapify)

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
