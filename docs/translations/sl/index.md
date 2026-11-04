<script setup>
</script>

# Tiptapify {#tiptapify}

**Urejevalnik obogatenega besedila Tiptap 3 za Vue 3 z orodno vrstico, zgrajeno z Vuetify 3**

::: info Stanje beta
Projekt je trenutno v različici **beta**. Funkcionalno je dokončan, vendar lahko vsebuje še kakšno napako.
:::

## Funkcije {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Komponente Vuetify 3</h3>
    <p>Čudovita orodna vrstica v slogu Material Design, zgrajena izključno s komponentami Vuetify 3</p>
  </div>
  <div class="feature">
    <h3>Več kot 30 razširitev</h3>
    <p>Oblikovanje obogatenega besedila, vdelava medijev, tabele, bloki kode z barvanjem sintakse</p>
  </div>
  <div class="feature">
    <h3>Ukazi s poševnico</h3>
    <p>Vnesite <code>/</code> za meni hitrega vstavljanja naslovov, seznamov, medijev in drugega</p>
  </div>
  <div class="feature">
    <h3>Internacionalizacija</h3>
    <p>Več kot 20 podprtih jezikov prek vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Temna tema</h3>
    <p>Samodejna podpora temnemu in svetlemu načinu, ki se povezuje s temo Vuetify</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Polna podpora za TypeScript z izvoženimi tipi za vse elemente orodne vrstice in lastnosti</p>
  </div>
</div>

## Hitri začetek {#quick-start}

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

::: tip Peer odvisnosti
Tiptapify kot peer odvisnosti zahteva **Vue 3.x**, **Vuetify 3.x ali 4.x**, **vue-i18n 11+** in **@mdi/js**. Celotno nastavitev najdete v [vodniku za namestitev](/sl/guide/installation).
:::

## Licenca {#license}

MIT — [Repozitorij GitHub](https://github.com/IVoyt/tiptapify)

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
