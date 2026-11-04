<script setup>
</script>

# Tiptapify {#tiptapify}

**Tiptap 3 rik tekstredigerer for Vue 3 med verktøylinje bygget på Vuetify 3**

::: info Betastatus
Dette prosjektet er for øyeblikket i **beta**. Det er funksjonskomplett, men kan fortsatt ha noen feil som må rettes.
:::

## Funksjoner {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Vuetify 3-komponenter</h3>
    <p>Vakker Material Design-verktøylinje bygget helt med Vuetify 3-komponenter</p>
  </div>
  <div class="feature">
    <h3>30+ utvidelser</h3>
    <p>Rik tekstformatering, medieinnbygging, tabeller, kodeblokker med syntaksutheving</p>
  </div>
  <div class="feature">
    <h3>Skråstrekkommandoer</h3>
    <p>Skriv <code>/</code> for å åpne hurtiginnsettingsmenyen for overskrifter, lister, medier og mer</p>
  </div>
  <div class="feature">
    <h3>Internasjonalisering</h3>
    <p>20+ språk støttes via vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Mørkt tema</h3>
    <p>Automatisk støtte for mørk/lys modus som integreres med Vuetify-temaet ditt</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Full TypeScript-støtte med eksporterte typer for alle verktøylinjeelementer og props</p>
  </div>
</div>

## Hurtigstart {#quick-start}

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

::: tip Peer-avhengigheter
Tiptapify krever **Vue 3.x**, **Vuetify 3.x eller 4.x**, **vue-i18n 11+** og **@mdi/js** som peer-avhengigheter. Se [installasjonsguiden](/no/guide/installation) for hele oppsettet.
:::

## Lisens {#license}

MIT — [GitHub-repositorium](https://github.com/IVoyt/tiptapify)

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
