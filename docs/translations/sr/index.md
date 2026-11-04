<script setup>
</script>

# Tiptapify {#tiptapify}

**Tiptap 3 rich text uređivač za Vue 3 sa Vuetify 3 trakom sa alatima**

::: info Status: beta
Projekat je trenutno u fazi **Beta**. Funkcionalno je kompletan, ali može sadržati greške koje tek treba ispraviti.
:::

## Mogućnosti {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Vuetify 3 komponente</h3>
    <p>Lepa Material Design traka sa alatima izgrađena isključivo od Vuetify 3 komponenti</p>
  </div>
  <div class="feature">
    <h3>30+ ekstenzija</h3>
    <p>Formatiranje teksta, ugrađivanje medija, tabele, blokovi koda sa isticanjem sintakse</p>
  </div>
  <div class="feature">
    <h3>Slash komande</h3>
    <p>Ukucajte <code>/</code> da otvorite meni za brzo umetanje naslova, lista, medija i drugog</p>
  </div>
  <div class="feature">
    <h3>Internacionalizacija</h3>
    <p>Podrška za 20+ jezika preko vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Tamna tema</h3>
    <p>Automatska podrška za tamni i svetli režim, usklađena sa vašom Vuetify temom</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Potpuna TypeScript podrška sa izvezenim tipovima za sve stavke trake sa alatima i props</p>
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

::: tip Zavisnosti peer
Tiptapify zahteva **Vue 3.x**, **Vuetify 3.x ili 4.x**, **vue-i18n 11+** i **@mdi/js** kao peer zavisnosti. Kompletno podešavanje potražite u [vodiču za instalaciju](/sr/guide/installation).
:::

## Licenca {#license}

MIT — [GitHub repozitorijum](https://github.com/IVoyt/tiptapify)

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
