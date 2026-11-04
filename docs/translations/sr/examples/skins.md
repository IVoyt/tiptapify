# Skinovi {#skins}

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

Prop `skin` bira izgled okvira uređivača: trake sa alatima, bubble menija, padajućih menija i dijaloga.
Funkcije rade isto u svakom skinu. Koncepti, tabela tokena i recepti nalaze se u
[vodiču za skinove](/sr/guide/skins).

## Classic (podrazumevano) {#classic-default}

Izdignuta traka sa alatima, grupe dugmadi kao izdignuti okviri, bubble meniji u stilu kartice:

<InteractiveEditor :bubble-menu="true" placeholder="Classic skin..." />

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

Ravna obojena alatna traka ispod tanke linije, providna dugmad sa neutralnim stanjem pritisnutosti, lagani padajući meniji:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Pastel skin..." />

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

## Prilagođeni: mint {#custom-mint}

`registerSkin` dodaje ime u registar. Ovaj skin proširuje `pastel` i menja nekoliko tokena: nijansu mente na pozadini trake sa alatima i tamnozelenu za obris slike i ručice za promenu veličine. Mirni oblik se nasleđuje od pastela; sve što nije izmenjeno (stanja dugmadi, meniji, dijalozi) zadržava pastel vrednosti:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Mint skin..." />

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

Koren uređivača nosi klasu `tiptapify-skin-mint` — izlaz u nuždi za dimenzije koje katalog tokena ne pokriva (pogledajte [Izlaz u nuždi](/sr/guide/skins#escape-hatch-the-root-class)).

## Inline skin {#inline-skin}

Prop `skin` prima i objekat: izmene tokena i oznake oblika, uz nasleđivanje registrovanog skina preko `extends`. Rešava se kroz isti lanac, nikada ne ulazi u registar i renderuje se pod klasom `tiptapify-skin-inline` (ili `tiptapify-skin-{name}` kada objekat sadrži `name`); njegovi tokeni se u korenu uređivača pojavljuju kao CSS promenljive `--tf-*`.

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
