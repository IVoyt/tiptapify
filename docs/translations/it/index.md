<script setup>
</script>

# Tiptapify {#tiptapify}

**Editor di testo ricco Tiptap 3 per Vue 3 con barra degli strumenti basata su Vuetify 3**

::: info Stato Beta
Questo progetto è attualmente in **Beta**. Ha tutte le funzionalità previste, ma potrebbe contenere ancora qualche bug da correggere.
:::

## Funzionalità {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Componenti Vuetify 3</h3>
    <p>Una elegante barra degli strumenti in Material Design, costruita interamente con componenti Vuetify 3</p>
  </div>
  <div class="feature">
    <h3>Oltre 30 estensioni</h3>
    <p>Formattazione del testo, incorporamento di media, tabelle, blocchi di codice con evidenziazione della sintassi</p>
  </div>
  <div class="feature">
    <h3>Comandi slash</h3>
    <p>Digita <code>/</code> per aprire il menu di inserimento rapido di titoli, elenchi, media e altro</p>
  </div>
  <div class="feature">
    <h3>Internazionalizzazione</h3>
    <p>Oltre 20 lingue supportate tramite vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Tema scuro</h3>
    <p>Supporto automatico alla modalità chiara/scura, integrato con il tema Vuetify</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Supporto completo a TypeScript, con tipi esportati per tutti gli elementi della barra degli strumenti e per le props</p>
  </div>
</div>

## Guida rapida {#quick-start}

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

::: tip Dipendenze peer
Tiptapify richiede come dipendenze peer **Vue 3.x**, **Vuetify 3.x o 4.x**, **vue-i18n 11+** e **@mdi/js**. Consulta la [guida all'installazione](/it/guide/installation) per la configurazione completa.
:::

## Licenza {#license}

MIT — [Repository GitHub](https://github.com/IVoyt/tiptapify)

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
