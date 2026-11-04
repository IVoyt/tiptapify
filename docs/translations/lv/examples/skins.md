# Apvalki {#skins}

<script setup>
import { registerSkin } from '@tiptapify'

registerSkin('mint', {
  extends: 'pastel',
  colors: {
    toolbarBg: 'rgba(0, 128, 0, 0.05)',
    handleBg: 'rgb(0, 100, 0)',
    handleBgHover: 'rgb(0, 128, 0)',
    imageOutline: '2px solid rgb(0, 100, 0)',
    imageOutlineHover: 'rgba(0, 100, 0, 0.35)',
  },
})
</script>

Rekvizīts `skin` nosaka redaktora apvalka izskatu: rīkjoslu, burbuļa izvēlnes, nolaižamās izvēlnes, dialoglodziņus.
Funkcijas darbojas vienādi katrā apvalkā. Jēdzieni, tokenu tabula un receptes ir
[apvalku ceļvedī](/lv/guide/skins).

## Classic (noklusējuma) {#classic-default}

Paaugstināta rīkjosla, pogu grupas kā paaugstinātas kastes, kartīšu stila burbuļa izvēlnes:

<InteractiveEditor :bubble-menu="true" placeholder="Classic apvalks..." />

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>The classic look: a raised toolbar with raised button groups.</p>')
</script>

<template>
  <Tiptapify
    v-model="content"
    placeholder="Classic skin..."
  />
</template>
```

## Pastel {#pastel}

Plakana tonēta rīkjosla zem matiņa līnijas, caurspīdīgas pogas ar neitrālu nospiestu stāvokli, vieglas nolaižamās izvēlnes:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Pastel apvalks..." />

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>The pastel look: a flat tinted toolbar with ghost buttons.</p>')
</script>

<template>
  <Tiptapify
    v-model="content"
    skin="pastel"
    placeholder="Pastel skin..."
  />
</template>
```

## Pielāgots: mint {#custom-mint}

`registerSkin` reģistrā pievieno nosaukumu. Šis apvalks paplašina `pastel` un pārraksta dažus tokenus: mētras toni rīkjoslas fonam un tumši zaļu attēla kontūrai un izmēra maiņas turiem. Mierīgā forma tiek pārmantota no pastel; viss, kas nav pārrakstīts (pogu stāvokļi, izvēlnes, dialoglodziņi), saglabā pastel vērtības:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Mint apvalks..." />

```ts
// main.ts — call once, before any editor mounts
import { registerSkin } from 'tiptapify'

registerSkin('mint', {
  extends: 'pastel',
  colors: {
    toolbarBg: 'rgba(0, 128, 0, 0.05)',
    handleBg: 'rgb(0, 100, 0)',
    handleBgHover: 'rgb(0, 128, 0)',
    imageOutline: '2px solid rgb(0, 100, 0)',
    imageOutlineHover: 'rgba(0, 100, 0, 0.35)',
  },
})
```

```vue
<template>
  <Tiptapify
    v-model="content"
    skin="mint"
    placeholder="Mint skin..."
  />
</template>
```

Redaktora sakne nes klasi `tiptapify-skin-mint` — izeju tiem izmēriem, ko tokenu katalogs neaptver (skatiet [Izeja](/lv/guide/skins#escape-hatch-the-root-class)).

## Iekļautais apvalks {#inline-skin}

Rekvizīts `skin` pieņem arī objektu: tokenu pārrakstījumus un formas karogus, kas ar `extends` mantojas no reģistrēta apvalka. Tas tiek atrisināts pa to pašu ķēdi, nekad nenonāk reģistrā un tiek renderēts ar klasi `tiptapify-skin-inline` (vai `tiptapify-skin-{name}`, ja objektam ir `name`); tā tokeni kā CSS mainīgie `--tf-*` nonāk redaktora saknē.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>A pastel editor with a green-tinted toolbar.</p>')

const mintSkin = {
  extends: 'pastel',
  colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' },
}
</script>

<template>
  <Tiptapify
    v-model="content"
    :skin="mintSkin"
    placeholder="Inline skin..."
  />
</template>
```
