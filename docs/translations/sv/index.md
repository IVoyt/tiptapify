<script setup>
</script>

# Tiptapify {#tiptapify}

**Tiptap 3 rich text-redigerare för Vue 3 med verktygsfält byggt med Vuetify 3**

::: info Betastatus
Projektet är för närvarande i **Beta**. Det är funktionellt komplett men kan fortfarande ha några buggar som ska rättas till.
:::

## Funktioner {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Vuetify 3-komponenter</h3>
    <p>Ett snyggt verktygsfält i Material Design, byggt helt med Vuetify 3-komponenter</p>
  </div>
  <div class="feature">
    <h3>30+ tillägg</h3>
    <p>Rik textformatering, inbäddning av media, tabeller och kodblock med syntaxmarkering</p>
  </div>
  <div class="feature">
    <h3>Snedstreckskommandon</h3>
    <p>Skriv <code>/</code> för att öppna snabbinfogningsmenyn för rubriker, listor, media och mer</p>
  </div>
  <div class="feature">
    <h3>Internationalisering</h3>
    <p>20+ språk stöds via vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Mörkt tema</h3>
    <p>Automatiskt stöd för mörkt och ljust läge som integreras med ditt Vuetify-tema</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Fullt TypeScript-stöd med exporterade typer för alla verktygsfältsobjekt och props</p>
  </div>
</div>

## Snabbstart {#quick-start}

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

::: tip Peer-beroenden
Tiptapify kräver **Vue 3.x**, **Vuetify 3.x eller 4.x**, **vue-i18n 11+** och **@mdi/js** som peer-beroenden. Se [installationsguiden](/sv/guide/installation) för hela konfigurationen.
:::

## Licens {#license}

MIT — [GitHub-repository](https://github.com/IVoyt/tiptapify)

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
