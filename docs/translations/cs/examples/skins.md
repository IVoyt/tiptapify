# Skiny {#skins}

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

Prop `skin` určuje vzhled okolí editoru: panelu nástrojů, bublinových nabídek, rozbalovacích nabídek a dialogů.
Funkce fungují v každém skinu stejně. Koncepty, tabulku tokenů a návody najdete v
[průvodci skiny](/cs/guide/skins).

## Classic (výchozí) {#classic-default}

Vyvýšený panel nástrojů, skupiny tlačítek jako vyvýšené boxy a bublinové nabídky ve stylu karet:

<InteractiveEditor :bubble-menu="true" placeholder="Skin Classic..." />

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

Plochý tónovaný panel nástrojů pod tenkou linkou, průhledná tlačítka s neutrálním stavem stisknutí, lehké rozbalovací nabídky:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Skin Pastel..." />

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

## Vlastní: mint {#custom-mint}

`registerSkin` přidá název do registru. Tento skin rozšiřuje `pastel` a přepisuje několik tokenů: mátový nádech podkladu panelu nástrojů a tmavě zelenou pro obrys obrázku a úchyty pro změnu velikosti. Klidný tvar se přebírá z pastelu; vše, co není přepsáno (stavy tlačítek, nabídky, dialogy), zůstává s hodnotami pastelu:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Skin Mint..." />

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

Kořenový prvek editoru nese třídu `tiptapify-skin-mint` — nouzové řešení pro rozměry, které katalog tokenů nepokrývá (viz [Nouzové řešení](/cs/guide/skins#escape-hatch-the-root-class)).

## Inline skin {#inline-skin}

Prop `skin` přijímá také objekt: přepsání tokenů a příznaky tvaru, s dědičností z registrovaného skinu přes `extends`. Vyhodnocuje se stejným řetězcem, nikdy se nedostane do registru a vykresluje se pod třídou `tiptapify-skin-inline` (nebo `tiptapify-skin-{name}`, pokud objekt obsahuje `name`); jeho tokeny se zapisují jako CSS proměnné `--tf-*` na kořenový prvek editoru.

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
