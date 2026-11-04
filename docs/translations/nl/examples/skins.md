# Skins {#skins}

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

De prop `skin` bepaalt het uiterlijk van de editor-chrome: toolbar, bubbelmenu's, dropdowns en dialogen.
De functies werken in elke skin hetzelfde. De concepten, de tokentabel en de recepten staan in de
[Skins-handleiding](/nl/guide/skins).

## Classic (standaard) {#classic-default}

Een verhoogde toolbar, knopgroepen als verhoogde vlakken en bubbelmenu's in kaartstijl:

<InteractiveEditor :bubble-menu="true" placeholder="Classic-skin..." />

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

Een vlakke, getinte werkbalk onder een haarlijn, ghost-knoppen met een neutrale ingedrukte status, lichte dropdowns:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Pastel-skin..." />

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

## Eigen skin: mint {#custom-mint}

`registerSkin` voegt een naam toe aan het register. Deze skin breidt `pastel` uit en overschrijft een handvol tokens: een muntkleurige tint voor de toolbarachtergrond en diepgroen voor de afbeeldingsrand en de formaatgrepen. De rustige vorm komt mee van pastel; alles wat niet is overschreven (knopstaten, menu's, dialogen) behoudt de pastelwaarden:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Mint-skin..." />

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

De root van de editor draagt de klasse `tiptapify-skin-mint` — de nooduitgang voor afmetingen die de tokencatalogus niet dekt (zie [Nooduitgang](/nl/guide/skins#escape-hatch-the-root-class)).

## Inline skin {#inline-skin}

De prop `skin` accepteert ook een object: tokenoverschrijvingen en vormvlaggen, die via `extends` van een geregistreerde skin erven. Het wordt via dezelfde keten opgelost, komt nooit in het register terecht en wordt gerenderd onder de klasse `tiptapify-skin-inline` (of `tiptapify-skin-{name}` wanneer het object een `name` bevat); de tokens komen als CSS-variabelen `--tf-*` op de root van de editor terecht.

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
