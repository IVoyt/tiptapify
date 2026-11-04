<script setup>
</script>

# Tiptapify {#tiptapify}

**Tiptap 3 rikastekstiredaktor Vue 3 jaoks Vuetify 3 tööriistaribaga**

::: info Beetastaatus
Projekt on praegu **beetaversioonis**. Funktsionaalsus on valmis, kuid mõni viga võib veel parandamist vajada.
:::

## Funktsioonid {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Vuetify 3 komponendid</h3>
    <p>Kaunis Material Design'i tööriistariba, mis on ehitatud täielikult Vuetify 3 komponentidest</p>
  </div>
  <div class="feature">
    <h3>Üle 30 laienduse</h3>
    <p>Rikastekstivormindus, meedia manustamine, tabelid, süntaksi esiletõstuga koodiplokid</p>
  </div>
  <div class="feature">
    <h3>Kaldkriipsukäsud</h3>
    <p>Sisesta <code>/</code>, et avada kiirlisamise menüü pealkirjade, loendite, meedia ja muu jaoks</p>
  </div>
  <div class="feature">
    <h3>Rahvusvahelistamine</h3>
    <p>Üle 20 keele toe vue-i18n kaudu</p>
  </div>
  <div class="feature">
    <h3>Tume teema</h3>
    <p>Automaatne tumeda/heleda režiimi tugi, mis sobitub sinu Vuetify teemaga</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Täielik TypeScripti tugi koos eksporditud tüüpidega kõigi tööriistariba üksuste ja propide jaoks</p>
  </div>
</div>

## Kiirstart {#quick-start}

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

::: tip Peer-sõltuvused
Tiptapify nõuab peer-sõltuvustena **Vue 3.x**, **Vuetify 3.x või 4.x**, **vue-i18n 11+** ja **@mdi/js**. Täieliku seadistuse leiad [paigaldusjuhendist](/et/guide/installation).
:::

## Litsents {#license}

MIT — [GitHubi repositoorium](https://github.com/IVoyt/tiptapify)

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
