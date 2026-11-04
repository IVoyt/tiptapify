# Teme de aspect {#skins}

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

Proprietatea `skin` alege aspectul elementelor editorului: bara de instrumente, meniurile bubble, listele derulante, dialogurile.
Funcționalitățile se comportă la fel în orice temă. Conceptele, tabelul de tokeni și rețetele se află în
[ghidul Teme de aspect](/ro/guide/skins).

## Classic (implicită) {#classic-default}

O bară de instrumente ridicată, grupuri de butoane ca niște casete ridicate, meniuri bubble în stil card:

<InteractiveEditor :bubble-menu="true" placeholder="Tema Classic..." />

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

O bară de instrumente plată, tonată, sub o linie fină, butoane transparente cu starea apăsată neutră, liste derulante ușoare:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Tema Pastel..." />

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

## Personalizată: mint {#custom-mint}

`registerSkin` adaugă un nume în registru. Această temă extinde `pastel` și suprascrie câțiva tokeni: o nuanță de mentă pentru fundalul barei de instrumente și un verde închis pentru conturul imaginii și mânerele de redimensionare. Forma discretă este moștenită de la pastel; tot ce nu este suprascris (stările butoanelor, meniurile, dialogurile) păstrează valorile din pastel:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Tema Mint..." />

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

Rădăcina editorului are clasa `tiptapify-skin-mint` — soluția de rezervă pentru dimensiunile pe care catalogul de tokeni nu le acoperă (vezi [Soluția de rezervă](/ro/guide/skins#escape-hatch-the-root-class)).

## Temă inline {#inline-skin}

Proprietatea `skin` acceptă și un obiect: suprascrieri de tokeni și indicatori de formă, care moștenesc dintr-o temă înregistrată prin `extends`. Se rezolvă prin același lanț, nu intră niciodată în registru și este afișată sub clasa `tiptapify-skin-inline` (sau `tiptapify-skin-{name}` când obiectul are un `name`); tokenii ei ajung ca variabile CSS `--tf-*` pe rădăcina editorului.

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
