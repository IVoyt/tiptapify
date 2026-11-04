<script setup>
</script>

# Tiptapify {#tiptapify}

**Edytor tekstu sformatowanego Tiptap 3 dla Vue 3 z paskiem narzędzi opartym na Vuetify 3**

::: info Status Beta
Projekt jest obecnie w wersji **Beta**. Ma już pełny zestaw funkcji, ale mogą w nim jeszcze występować błędy do poprawienia.
:::

## Funkcje {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Komponenty Vuetify 3</h3>
    <p>Elegancki pasek narzędzi w stylu Material Design, zbudowany wyłącznie z komponentów Vuetify 3</p>
  </div>
  <div class="feature">
    <h3>Ponad 30 rozszerzeń</h3>
    <p>Formatowanie tekstu, osadzanie multimediów, tabele, bloki kodu z podświetlaniem składni</p>
  </div>
  <div class="feature">
    <h3>Polecenia ukośnikowe</h3>
    <p>Wpisz <code>/</code>, aby otworzyć menu szybkiego wstawiania nagłówków, list, multimediów i innych elementów</p>
  </div>
  <div class="feature">
    <h3>Internacjonalizacja</h3>
    <p>Ponad 20 języków dzięki vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Ciemny motyw</h3>
    <p>Automatyczna obsługa trybu ciemnego i jasnego, zgodna z motywem Vuetify</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Pełna obsługa TypeScript z eksportowanymi typami wszystkich elementów paska narzędzi i właściwości</p>
  </div>
</div>

## Szybki start {#quick-start}

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

::: tip Zależności peer
Tiptapify wymaga jako zależności peer: **Vue 3.x**, **Vuetify 3.x lub 4.x**, **vue-i18n 11+** oraz **@mdi/js**. Pełną konfigurację znajdziesz w [przewodniku instalacji](/pl/guide/installation).
:::

## Licencja {#license}

MIT — [Repozytorium GitHub](https://github.com/IVoyt/tiptapify)

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
