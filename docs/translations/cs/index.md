<script setup>
</script>

# Tiptapify {#tiptapify}

**Editor formátovaného textu Tiptap 3 pro Vue 3 s panelem nástrojů postaveným na Vuetify 3**

::: info Stav Beta
Projekt je aktuálně ve stavu **Beta**. Funkčně je kompletní, ale mohou v něm být ještě chyby k opravě.
:::

## Funkce {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Komponenty Vuetify 3</h3>
    <p>Přehledný panel nástrojů v duchu Material Design, postavený výhradně z komponent Vuetify 3</p>
  </div>
  <div class="feature">
    <h3>30+ rozšíření</h3>
    <p>Formátování textu, vkládání médií, tabulky a bloky kódu se zvýrazněním syntaxe</p>
  </div>
  <div class="feature">
    <h3>Příkazy s lomítkem</h3>
    <p>Zadáním <code>/</code> otevřete nabídku rychlého vložení nadpisů, seznamů, médií a dalšího</p>
  </div>
  <div class="feature">
    <h3>Internacionalizace</h3>
    <p>Více než 20 jazyků díky vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Tmavý motiv</h3>
    <p>Automatická podpora tmavého a světlého režimu, který se napojí na motiv Vuetify</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Plná podpora TypeScriptu s exportovanými typy pro všechny položky panelu nástrojů i props</p>
  </div>
</div>

## Rychlý start {#quick-start}

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

::: tip Peer závislosti
Tiptapify vyžaduje jako peer závislosti **Vue 3.x**, **Vuetify 3.x nebo 4.x**, **vue-i18n 11+** a **@mdi/js**. Kompletní postup najdete v [průvodci instalací](/cs/guide/installation).
:::

## Licence {#license}

MIT — [repozitář na GitHubu](https://github.com/IVoyt/tiptapify)

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
