# Skinn {#skins}

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

`skin`-prop-en velger utseendet til editorens ramme: verktøylinje, boblemenyer, nedtrekkslister, dialoger.
Funksjonene fungerer likt i alle skinn. Konseptene, tokentabellen og oppskriftene finnes i
[Skins guide](/no/guide/skins).

## Klassisk (standard) {#classic-default}

En hevet verktøylinje, knappegrupper som hevede bokser og boblemenyer i kortstil:

<InteractiveEditor :bubble-menu="true" placeholder="Klassisk skin..." />

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

En flat, tonet verktøylinje under en hårfin strek, gjennomsiktige knapper med en nøytral nedtrykt tilstand, lette nedtrekksmenyer:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Pastell-skin..." />

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

## Egendefinert: mint {#custom-mint}

`registerSkin` legger til et navn i registeret. Dette skinnet utvider `pastel` og overstyrer en håndfull tokens: en mintfarget tone på verktøylinjens bakgrunn og dyp grønn for bildeomrisset og håndtakene for størrelsesendring. Den rolige formen arves fra pastel, og alt som ikke overstyres (knappetilstander, menyer, dialoger) beholder pastellverdiene:

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

Editorroten har klassen `tiptapify-skin-mint` — nødutgangen for dimensjoner tokenkatalogen ikke dekker (se [Escape hatch](/no/guide/skins#escape-hatch-the-root-class)).

## Inline skin {#inline-skin}

`skin`-prop-en tar også et objekt: token-overstyringer og formflagg, som arver fra et registrert skin via `extends`. Det løses gjennom samme kjede, havner aldri i registeret og gjengis under klassen `tiptapify-skin-inline` (eller `tiptapify-skin-{name}` når objektet har en `name`). Tokenene havner som `--tf-*` CSS-variabler på editorroten.

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
