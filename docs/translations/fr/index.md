<script setup>
</script>

# Tiptapify {#tiptapify}

**Éditeur de texte enrichi Tiptap 3 pour Vue 3, avec une barre d'outils réalisée en Vuetify 3**

::: info Statut bêta
Ce projet est actuellement en **bêta**. Il est complet sur le plan fonctionnel, mais certains bogues restent à corriger.
:::

## Fonctionnalités {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Composants Vuetify 3</h3>
    <p>Une barre d'outils Material Design soignée, entièrement construite avec des composants Vuetify 3</p>
  </div>
  <div class="feature">
    <h3>Plus de 30 extensions</h3>
    <p>Mise en forme du texte, médias intégrés, tableaux, blocs de code avec coloration syntaxique</p>
  </div>
  <div class="feature">
    <h3>Commandes slash</h3>
    <p>Tapez <code>/</code> pour ouvrir le menu d'insertion rapide : titres, listes, médias et plus encore</p>
  </div>
  <div class="feature">
    <h3>Internationalisation</h3>
    <p>Plus de 20 langues prises en charge via vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Thème sombre</h3>
    <p>Mode sombre/clair automatique, intégré à votre thème Vuetify</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Prise en charge complète de TypeScript, avec des types exportés pour tous les éléments de la barre d'outils et les props</p>
  </div>
</div>

## Démarrage rapide {#quick-start}

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

::: tip Dépendances peer
Tiptapify requiert **Vue 3.x**, **Vuetify 3.x ou 4.x**, **vue-i18n 11+** et **@mdi/js** comme dépendances peer. Consultez le [guide d'installation](/fr/guide/installation) pour la configuration complète.
:::

## Licence {#license}

MIT — [Dépôt GitHub](https://github.com/IVoyt/tiptapify)

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
