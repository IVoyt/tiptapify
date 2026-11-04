<script setup>
</script>

# Tiptapify {#tiptapify}

**Tiptap 3 uređivač obogaćenog teksta za Vue 3 s alatnom trakom izrađenom u Vuetify 3**

::: info Beta status
Ovaj je projekt trenutno u **beta** fazi. Funkcionalno je dovršen, ali još može sadržavati greške koje treba ispraviti.
:::

## Značajke {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Vuetify 3 komponente</h3>
    <p>Lijepa Material Design alatna traka izrađena isključivo od Vuetify 3 komponenti</p>
  </div>
  <div class="feature">
    <h3>30+ ekstenzija</h3>
    <p>Oblikovanje obogaćenog teksta, ugradnja medija, tablice, blokovi koda s isticanjem sintakse</p>
  </div>
  <div class="feature">
    <h3>Slash naredbe</h3>
    <p>Upišite <code>/</code> za izbornik brzog umetanja naslova, popisa, medija i drugog</p>
  </div>
  <div class="feature">
    <h3>Internacionalizacija</h3>
    <p>Podrška za 20+ jezika putem vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Tamna tema</h3>
    <p>Automatska podrška za tamni i svijetli način rada, usklađena s vašom Vuetify temom</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Potpuna podrška za TypeScript s izvezenim tipovima za sve stavke alatne trake i props</p>
  </div>
</div>

## Brzi početak {#quick-start}

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

::: tip Peer ovisnosti
Tiptapify zahtijeva **Vue 3.x**, **Vuetify 3.x ili 4.x**, **vue-i18n 11+** i **@mdi/js** kao peer ovisnosti. Cjelovitu postavku pogledajte u [vodiču za instalaciju](/hr/guide/installation).
:::

## Licenca {#license}

MIT — [GitHub repozitorij](https://github.com/IVoyt/tiptapify)

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
