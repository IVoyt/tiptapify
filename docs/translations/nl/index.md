<script setup>
</script>

# Tiptapify {#tiptapify}

**Tiptap 3 rich text editor voor Vue 3 met een toolbar op basis van Vuetify 3**

::: info Bètastatus
Dit project bevindt zich momenteel in **bèta**. Alle functies zijn aanwezig, maar er kunnen nog enkele bugs zitten.
:::

## Functies {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Vuetify 3-componenten</h3>
    <p>Een fraaie Material Design-toolbar, volledig opgebouwd met Vuetify 3-componenten</p>
  </div>
  <div class="feature">
    <h3>30+ extensies</h3>
    <p>Tekstopmaak, ingesloten media, tabellen en codeblokken met syntaxiskleuring</p>
  </div>
  <div class="feature">
    <h3>Slash-commando's</h3>
    <p>Typ <code>/</code> om het snelmenu te openen voor koppen, lijsten, media en meer</p>
  </div>
  <div class="feature">
    <h3>Internationalisatie</h3>
    <p>Meer dan 20 talen via vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Donker thema</h3>
    <p>Automatische ondersteuning voor donkere en lichte modus, afgestemd op je Vuetify-thema</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Volledige TypeScript-ondersteuning met geëxporteerde types voor alle toolbaritems en props</p>
  </div>
</div>

## Snel aan de slag {#quick-start}

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

::: tip Peer dependencies
Tiptapify vereist **Vue 3.x**, **Vuetify 3.x of 4.x**, **vue-i18n 11+** en **@mdi/js** als peer dependencies. Zie de [installatiehandleiding](/nl/guide/installation) voor de volledige setup.
:::

## Licentie {#license}

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
