# Teemat {#skins}

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

`skin`-propsi valitsee editorin kehyksen ulkoasun: työkalurivin, kuplavalikot, pudotusvalikot ja dialogit.
Toiminnot toimivat samoin jokaisessa teemassa. Käsitteet, tokenien taulukko ja ohjeet ovat
[Skins-oppaassa](/fi/guide/skins).

## Classic (oletus) {#classic-default}

Korotettu työkalurivi, painikeryhmät korotettuina laatikoina ja korttimaiset kuplavalikot:

<InteractiveEditor :bubble-menu="true" placeholder="Classic-teema..." />

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

Litteä sävytetty työkalupalkki hiusviivan alla, läpikuultavat painikkeet neutraalilla painetulla tilalla, kevyet pudotusvalikot:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Pastel-teema..." />

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

## Oma: mint {#custom-mint}

`registerSkin` lisää nimen rekisteriin. Tämä teema laajentaa `pastel`-teemaa ja ohittaa muutaman tokenin: minttu-sävy työkalurivin taustalle sekä syvä vihreä kuvan ääriviivalle ja koonmuutoskahvoille. Hillitty muoto periytyy pastelista; kaikki ohittamatta jäävä (painikkeiden tilat, valikot, dialogit) säilyttää pastelin arvot:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Mint-teema..." />

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

Editorin juurella on `tiptapify-skin-mint`-luokka — varaportti mitoille, joita tokenikatalogi ei kata (katso [Escape hatch](/fi/guide/skins#escape-hatch-the-root-class)).

## Inline-teema {#inline-skin}

`skin`-propsi hyväksyy myös objektin: token-ohitukset ja muotolippuja, jotka periytyvät rekisteröidystä teemasta `extends`-avaimen kautta. Se ratkaistaan saman ketjun kautta, ei koskaan päädy rekisteriin ja piirtyy luokan `tiptapify-skin-inline` alle (tai `tiptapify-skin-{name}`, kun objektissa on `name`); sen tokenit päätyvät `--tf-*`-CSS-muuttujina editorin juureen.

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
