<script setup>
</script>

# Tiptapify {#tiptapify}

**Tiptap 3 rich text редактор за Vue 3 с лента с инструменти на Vuetify 3**

::: info Бета статус
Проектът в момента е в **бета** версия. Функционално е завършен, но може да има още грешки за отстраняване.
:::

## Възможности {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Компоненти на Vuetify 3</h3>
    <p>Красива лента с инструменти в стил Material Design, изградена изцяло с компоненти на Vuetify 3</p>
  </div>
  <div class="feature">
    <h3>30+ разширения</h3>
    <p>Богато форматиране на текст, вграждане на медия, таблици, блокове с код с подчертаване на синтаксиса</p>
  </div>
  <div class="feature">
    <h3>Slash команди</h3>
    <p>Въведете <code>/</code>, за да отворите менюто за бързо вмъкване на заглавия, списъци, медия и други</p>
  </div>
  <div class="feature">
    <h3>Интернационализация</h3>
    <p>Над 20 езика чрез vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Тъмна тема</h3>
    <p>Автоматична поддръжка на тъмен и светъл режим, която се интегрира с темата на Vuetify</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Пълна поддръжка на TypeScript с експортирани типове за всички елементи на лентата и пропъртита</p>
  </div>
</div>

## Бърз старт {#quick-start}

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

::: tip Peer зависимости
Tiptapify изисква **Vue 3.x**, **Vuetify 3.x или 4.x**, **vue-i18n 11+** и **@mdi/js** като peer зависимости. Пълната настройка е описана в [ръководството за инсталация](/bg/guide/installation).
:::

## Лиценз {#license}

MIT — [GitHub хранилище](https://github.com/IVoyt/tiptapify)

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
