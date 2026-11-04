<script setup>
</script>

# Tiptapify {#tiptapify}

**Tiptap 3 rich text szerkesztő Vue 3-hoz, Vuetify 3 eszköztár-implementációval**

::: info Béta állapot
A projekt jelenleg **béta** állapotban van. Funkcionálisan teljes, de még előfordulhatnak javítandó hibák.
:::

## Funkciók {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Vuetify 3 komponensek</h3>
    <p>Gyönyörű Material Design eszköztár, amely teljes egészében Vuetify 3 komponensekből épül fel</p>
  </div>
  <div class="feature">
    <h3>30+ bővítmény</h3>
    <p>Szövegformázás, médiabeágyazás, táblázatok, szintaxiskiemeléses kódblokkok</p>
  </div>
  <div class="feature">
    <h3>Perjeles parancsok</h3>
    <p>Írj be egy <code>/</code> jelet a gyorsbeszúrási menü megnyitásához: címsorok, listák, média és még sok más</p>
  </div>
  <div class="feature">
    <h3>Nemzetköziesítés</h3>
    <p>20+ nyelv támogatása a vue-i18n segítségével</p>
  </div>
  <div class="feature">
    <h3>Sötét téma</h3>
    <p>Automatikus sötét/világos mód támogatás, amely a Vuetify témáddal együttműködik</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Teljes TypeScript-támogatás, minden eszköztárelemhez és propshoz exportált típusokkal</p>
  </div>
</div>

## Gyors kezdés {#quick-start}

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

::: tip Peer függőségek
A Tiptapify peer függőségként **Vue 3.x**, **Vuetify 3.x vagy 4.x**, **vue-i18n 11+** és **@mdi/js** csomagokat igényel. A teljes beállításhoz lásd a [telepítési útmutatót](/hu/guide/installation).
:::

## Licenc {#license}

MIT — [GitHub-tároló](https://github.com/IVoyt/tiptapify)

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
