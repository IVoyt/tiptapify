<script setup>
</script>

# Tiptapify {#tiptapify}

**Editor rich text Tiptap 3 pentru Vue 3, cu bară de instrumente implementată în Vuetify 3**

::: info Stadiu Beta
Proiectul se află în prezent în stadiul **Beta**. Are toate funcționalitățile planificate, dar pot exista încă erori de corectat.
:::

## Funcționalități {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Componente Vuetify 3</h3>
    <p>O bară de instrumente Material Design elegantă, construită integral din componente Vuetify 3</p>
  </div>
  <div class="feature">
    <h3>Peste 30 de extensii</h3>
    <p>Formatare rich text, încorporare de media, tabele, blocuri de cod cu evidențierea sintaxei</p>
  </div>
  <div class="feature">
    <h3>Comenzi slash</h3>
    <p>Tastează <code>/</code> pentru a deschide meniul de inserare rapidă pentru titluri, liste, media și altele</p>
  </div>
  <div class="feature">
    <h3>Internaționalizare</h3>
    <p>Peste 20 de limbi acceptate prin vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Temă întunecată</h3>
    <p>Suport automat pentru modul întunecat/luminos, integrat cu tema ta Vuetify</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Suport complet TypeScript, cu tipuri exportate pentru toate elementele barei de instrumente și pentru proprietăți</p>
  </div>
</div>

## Start rapid {#quick-start}

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

::: tip Dependențe peer
Tiptapify necesită ca dependențe peer **Vue 3.x**, **Vuetify 3.x sau 4.x**, **vue-i18n 11+** și **@mdi/js**. Consultă [ghidul de instalare](/ro/guide/installation) pentru configurarea completă.
:::

## Licență {#license}

MIT — [Depozitul GitHub](https://github.com/IVoyt/tiptapify)

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
