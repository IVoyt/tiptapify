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

Propen `skin` väljer utseendet på redigerarens gränssnitt: verktygsfält, bubbelmenyer, rullgardiner och dialoger.
Funktionerna fungerar likadant i alla skins. Koncepten, tokentabellen och recepten finns i
[Skins-guiden](/sv/guide/skins).

## Classic (standard) {#classic-default}

Ett upphöjt verktygsfält, knappgrupper som upphöjda lådor och bubbelmenyer i kortstil:

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

Ett platt tonat verktygsfält under en hårfin linje, genomskinliga knappar med ett neutralt nedtryckt läge, lätta rullgardinsmenyer:

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

## Eget: mint {#custom-mint}

`registerSkin` lägger till ett namn i registret. Den här skinen utökar `pastel` och åsidosätter en handfull tokens: en mintton på verktygsfältets bakgrund samt djupgrönt för bildens kontur och storleksändringshandtagen. Den lugna formen ärvs från pastel; allt som inte åsidosätts (knapptillstånd, menyer, dialoger) behåller pastelvärdena:

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

Redigerarens rot har klassen `tiptapify-skin-mint` — nödutgången för dimensioner som tokenkatalogen inte täcker (se [Nödutgång](/sv/guide/skins#escape-hatch-the-root-class)).

## Inline-skin {#inline-skin}

Propen `skin` tar också ett objekt: tokenåsidosättningar och formflaggor, som ärver från en registrerad skin via `extends`. Den löses upp genom samma kedja, hamnar aldrig i registret och renderas under klassen `tiptapify-skin-inline` (eller `tiptapify-skin-{name}` när objektet har ett `name`); dess tokens hamnar som CSS-variabler `--tf-*` på redigerarens rot.

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
