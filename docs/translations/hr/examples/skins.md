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

Prop `skin` odabire izgled okvira uređivača: alatne trake, bubble izbornika, padajućih izbornika i dijaloga.
Značajke rade jednako u svakom skinu. Koncepti, tablica tokena i recepti nalaze se u
[vodiču za skinove](/hr/guide/skins).

## Classic (zadani) {#classic-default}

Podignuta alatna traka, grupe gumba kao podignuti okviri, bubble izbornici u stilu kartice:

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

Ravna obojena alatna traka ispod tanke crte, prozirni gumbi s neutralnim stanjem pritisnutosti, lagani padajući izbornici:

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

`registerSkin` dodaje ime u registar. Ovaj skin proširuje `pastel` i nadjačava nekoliko tokena: mint nijansu pozadine alatne trake te tamnozelenu za obrub slike i ručke za promjenu veličine. Mirni oblik preuzima se iz pastela; sve što nije nadjačano (stanja gumba, izbornici, dijalozi) zadržava vrijednosti pastela:

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

Korijen uređivača nosi klasu `tiptapify-skin-mint` — izlaz za dimenzije koje katalog tokena ne pokriva (vidi [Izlaz za nuždu](/hr/guide/skins#escape-hatch-the-root-class)).

## Inline skin {#inline-skin}

Prop `skin` prima i objekt: nadjačavanja tokena i zastavice oblika, uz nasljeđivanje registriranog skina putem `extends`. Razrješava se istim lancem, nikad ne ulazi u registar i prikazuje se pod klasom `tiptapify-skin-inline` (ili `tiptapify-skin-{name}` kad objekt nosi `name`); njegovi tokeni završavaju kao CSS varijable `--tf-*` na korijenu uređivača.

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
