<script setup>
</script>

# Tiptapify {#tiptapify}

**Tiptap 3 -rikastekstieditori Vue 3:lle Vuetify 3 -työkalurivillä**

::: info Beta-tila
Projekti on tällä hetkellä **beta-vaiheessa**. Se on toiminnoiltaan valmis, mutta siinä voi vielä olla korjattavia virheitä.
:::

## Ominaisuudet {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Vuetify 3 -komponentit</h3>
    <p>Kaunis Material Design -työkalurivi, joka on rakennettu kokonaan Vuetify 3 -komponenteilla</p>
  </div>
  <div class="feature">
    <h3>Yli 30 laajennusta</h3>
    <p>Rikastekstin muotoilu, mediasisällön upotus, taulukot ja koodilohkot syntaksikorostuksella</p>
  </div>
  <div class="feature">
    <h3>Vinoviivakomennot</h3>
    <p>Kirjoita <code>/</code> avataksesi pikalisäysvalikon otsikoille, luetteloille, medialle ja muulle</p>
  </div>
  <div class="feature">
    <h3>Kansainvälistäminen</h3>
    <p>Yli 20 kieltä tuettuna vue-i18n:n kautta</p>
  </div>
  <div class="feature">
    <h3>Tumma teema</h3>
    <p>Automaattinen tumman ja vaalean tilan tuki, joka sopeutuu Vuetify-teemaasi</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Täysi TypeScript-tuki ja viedyt tyypit kaikille työkalurivin kohteille ja propseille</p>
  </div>
</div>

## Pikaopas {#quick-start}

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

::: tip Peer-riippuvuudet
Tiptapify edellyttää peer-riippuvuuksina **Vue 3.x:n**, **Vuetify 3.x:n tai 4.x:n**, **vue-i18n 11+:n** ja **@mdi/js:n**. Katso täydellinen asennus [asennusoppaasta](/fi/guide/installation).
:::

## Lisenssi {#license}

MIT — [GitHub-repositorio](https://github.com/IVoyt/tiptapify)

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
