<script setup>
</script>

# Tiptapify

**Tiptap 3 rich text editor for Vue 3 with Vuetify 3 toolbar implementation**

::: info Beta Status
This project is currently in **Beta**. It is feature-complete but may still have some bugs to fix.
:::

## Features

<div class="features-grid">
  <div class="feature">
    <h3>Vuetify 3 Components</h3>
    <p>Beautiful Material Design toolbar built entirely with Vuetify 3 components</p>
  </div>
  <div class="feature">
    <h3>30+ Extensions</h3>
    <p>Rich text formatting, media embedding, tables, code blocks with syntax highlighting</p>
  </div>
  <div class="feature">
    <h3>Slash Commands</h3>
    <p>Type <code>/</code> to trigger quick-insert menu for headings, lists, media, and more</p>
  </div>
  <div class="feature">
    <h3>Internationalization</h3>
    <p>20+ languages supported via vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Dark Theme</h3>
    <p>Automatic dark/light mode support that integrates with your Vuetify theme</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Full TypeScript support with exported types for all toolbar items and props</p>
  </div>
</div>

## Quick Start

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

::: tip Peer Dependencies
Tiptapify requires **Vue 3.x**, **Vuetify 3.x or 4.x**, **vue-i18n 11+**, and **@mdi/js** as peer dependencies. See the [Installation guide](/guide/installation) for the full setup.
:::

## License

MIT — [GitHub Repository](https://github.com/IVoyt/tiptapify)

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
