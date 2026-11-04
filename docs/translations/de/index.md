<script setup>
</script>

# Tiptapify {#tiptapify}

**Tiptap-3-Rich-Text-Editor für Vue 3 mit Vuetify-3-Symbolleiste**

::: info Beta-Status
Dieses Projekt befindet sich derzeit in der **Beta**-Phase. Es ist funktional vollständig, kann aber noch einige Fehler enthalten.
:::

## Funktionen {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Vuetify-3-Komponenten</h3>
    <p>Schöne Material-Design-Symbolleiste, komplett aus Vuetify-3-Komponenten gebaut</p>
  </div>
  <div class="feature">
    <h3>30+ Erweiterungen</h3>
    <p>Rich-Text-Formatierung, eingebettete Medien, Tabellen, Codeblöcke mit Syntaxhervorhebung</p>
  </div>
  <div class="feature">
    <h3>Slash-Befehle</h3>
    <p>Gib <code>/</code> ein, um das Schnelleinfüge-Menü für Überschriften, Listen, Medien und mehr zu öffnen</p>
  </div>
  <div class="feature">
    <h3>Internationalisierung</h3>
    <p>20+ Sprachen über vue-i18n unterstützt</p>
  </div>
  <div class="feature">
    <h3>Dunkles Theme</h3>
    <p>Automatische Unterstützung für Dunkel-/Hellmodus, die sich in dein Vuetify-Theme einfügt</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Volle TypeScript-Unterstützung mit exportierten Typen für alle Symbolleisten-Elemente und Props</p>
  </div>
</div>

## Schnellstart {#quick-start}

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

::: tip Peer-Abhängigkeiten
Tiptapify benötigt **Vue 3.x**, **Vuetify 3.x oder 4.x**, **vue-i18n 11+** und **@mdi/js** als Peer-Abhängigkeiten. Die vollständige Einrichtung findest du in der [Installationsanleitung](/de/guide/installation).
:::

## Lizenz {#license}

MIT — [GitHub-Repository](https://github.com/IVoyt/tiptapify)

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
