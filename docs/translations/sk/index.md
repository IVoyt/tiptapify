<script setup>
</script>

# Tiptapify {#tiptapify}

**Editor formátovaného textu Tiptap 3 pre Vue 3 s lištou nástrojov postavenou na Vuetify 3**

::: info Stav beta
Projekt je momentálne vo fáze **Beta**. Má všetky plánované funkcie, no môže obsahovať ešte niekoľko chýb na opravu.
:::

## Funkcie {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Komponenty Vuetify 3</h3>
    <p>Elegantná lišta nástrojov v štýle Material Design postavená výlučne na komponentoch Vuetify 3</p>
  </div>
  <div class="feature">
    <h3>Viac ako 30 rozšírení</h3>
    <p>Formátovanie textu, vkladanie médií, tabuľky a bloky kódu so zvýrazňovaním syntaxe</p>
  </div>
  <div class="feature">
    <h3>Príkazy lomítka</h3>
    <p>Napísaním <code>/</code> otvoríte ponuku rýchleho vkladania nadpisov, zoznamov, médií a ďalších prvkov</p>
  </div>
  <div class="feature">
    <h3>Internacionalizácia</h3>
    <p>Podpora viac ako 20 jazykov cez vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Tmavý režim</h3>
    <p>Automatická podpora tmavého a svetlého režimu, ktorá sa prispôsobí téme Vuetify</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Plná podpora TypeScriptu s exportovanými typmi pre všetky položky lišty nástrojov a props</p>
  </div>
</div>

## Rýchly štart {#quick-start}

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
Tiptapify vyžaduje ako peer závislosti **Vue 3.x**, **Vuetify 3.x alebo 4.x**, **vue-i18n 11+** a **@mdi/js**. Úplný postup nastavenia nájdete v [príručke inštalácie](/sk/guide/installation).
:::

## Licencia {#license}

MIT — [Repozitár GitHub](https://github.com/IVoyt/tiptapify)

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
