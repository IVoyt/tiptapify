<script setup>
</script>

# Tiptapify {#tiptapify}

**Tiptap 3 raiškiojo teksto redaktorius, skirtas Vue 3, su Vuetify 3 įrankių juosta**

::: info Beta būsena
Šis projektas šiuo metu yra **Beta** versijos. Visos funkcijos įgyvendintos, tačiau dar gali būti klaidų, kurias reikia ištaisyti.
:::

## Funkcijos {#features}

<div class="features-grid">
  <div class="feature">
    <h3>Vuetify 3 komponentai</h3>
    <p>Graži Material Design įrankių juosta, sukurta vien iš Vuetify 3 komponentų</p>
  </div>
  <div class="feature">
    <h3>30+ plėtinių</h3>
    <p>Raiškiojo teksto formatavimas, medijos įterpimas, lentelės, kodo blokai su sintaksės paryškinimu</p>
  </div>
  <div class="feature">
    <h3>Pasvirojo brūkšnio komandos</h3>
    <p>Įveskite <code>/</code>, kad atidarytumėte greito įterpimo meniu antraštėms, sąrašams, medijai ir kt.</p>
  </div>
  <div class="feature">
    <h3>Tarptautiškumas</h3>
    <p>20+ kalbų palaikymas per vue-i18n</p>
  </div>
  <div class="feature">
    <h3>Tamsioji tema</h3>
    <p>Automatinis tamsiojo ir šviesiojo režimo palaikymas, derantis su jūsų Vuetify tema</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>Pilnas TypeScript palaikymas su eksportuojamais tipais visiems įrankių juostos elementams ir savybėms</p>
  </div>
</div>

## Greitas startas {#quick-start}

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

::: tip Priklausomybės (peer)
Tiptapify reikalauja **Vue 3.x**, **Vuetify 3.x arba 4.x**, **vue-i18n 11+** ir **@mdi/js** kaip peer priklausomybių. Visą sąranką rasite [diegimo vadove](/lt/guide/installation).
:::

## Licencija {#license}

MIT — [GitHub saugykla](https://github.com/IVoyt/tiptapify)

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
