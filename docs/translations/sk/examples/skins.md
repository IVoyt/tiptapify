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

Prop `skin` určuje vzhľad rámca editora: lišty nástrojov, bublinových ponúk, rozbaľovacích ponúk a dialógov.
Funkcie fungujú v každom skine rovnako. Koncepty, tabuľku tokenov a recepty nájdete
v [príručke Skiny](/sk/guide/skins).

## Classic (predvolený) {#classic-default}

Vyvýšená lišta nástrojov, skupiny tlačidiel ako vyvýšené boxy, bublinové ponuky v štýle kariet:

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

Plochý tónovaný panel nástrojov pod tenkou čiarou, priehľadné tlačidlá s neutrálnym stavom stlačenia, ľahké rozbaľovacie ponuky:

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

## Vlastný: mint {#custom-mint}

`registerSkin` pridá názov do registra. Tento skin rozširuje `pastel` a prepisuje niekoľko tokenov: mätový odtieň pozadia lišty nástrojov a tmavozelenú pre obrys obrázka a úchyty zmeny veľkosti. Tichý tvar sa preberá z pastelu; všetko, čo nie je prepísané (stavy tlačidiel, ponuky, dialógy), si zachová hodnoty z pastelu:

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

Koreň editora má triedu `tiptapify-skin-mint` — únikový východ pre rozmery, ktoré katalóg tokenov nepokrýva (pozri [Únikový východ](/sk/guide/skins#escape-hatch-the-root-class)).

## Inline skin {#inline-skin}

Prop `skin` prijíma aj objekt: prepísania tokenov a príznaky tvaru, ktoré dedia z registrovaného skinu cez `extends`. Prechádza rovnakým reťazcom riešenia, nikdy nevstúpi do registra a vykresľuje sa s triedou `tiptapify-skin-inline` (alebo `tiptapify-skin-{name}`, ak objekt obsahuje `name`); jeho tokeny sa na koreň editora dostanú ako CSS premenné `--tf-*`.

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
