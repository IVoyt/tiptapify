<script setup>
</script>

# Tiptapify {#tiptapify}

**Tiptap 3 bagātā teksta redaktors Vue 3 ar Vuetify 3 rīkjoslu**

::: info Beta statuss
Projekts pašlaik ir **beta** versijā. Funkcionalitāte ir pabeigta, taču vēl var būt kļūdas, kas jālabo.
:::

## Iespējas {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Vuetify 3 komponenti</h3>
    <p>Skaista Material Design rīkjosla, kas pilnībā veidota no Vuetify 3 komponentiem</p>
  </div>
  <div class="feature">
    <h3>30+ paplašinājumu</h3>
    <p>Bagātā teksta formatēšana, multivides iegulšana, tabulas, koda bloki ar sintakses izcelšanu</p>
  </div>
  <div class="feature">
    <h3>Slīpsvītras komandas</h3>
    <p>Ievadiet <code>/</code>, lai atvērtu ātrās ievietošanas izvēlni virsrakstiem, sarakstiem, multivides saturam un citam</p>
  </div>
  <div class="feature">
    <h3>Internacionalizācija</h3>
    <p>20+ valodu atbalsts, izmantojot vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Tumšā tēma</h3>
    <p>Automātisks tumšā/gaišā režīma atbalsts, kas darbojas kopā ar jūsu Vuetify tēmu</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Pilns TypeScript atbalsts ar eksportētiem tipiem visiem rīkjoslas elementiem un rekvizītiem</p>
  </div>
</div>

## Ātrā sākšana {#quick-start}

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

::: tip Peer atkarības
Tiptapify kā peer atkarības nepieciešami **Vue 3.x**, **Vuetify 3.x vai 4.x**, **vue-i18n 11+** un **@mdi/js**. Pilnu iestatīšanu skatiet [instalēšanas ceļvedī](/lv/guide/installation).
:::

## Licence {#license}

MIT — [GitHub repozitorijs](https://github.com/IVoyt/tiptapify)

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
