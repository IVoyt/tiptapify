# Preobleke {#skins}

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

Lastnost `skin` izbere videz okvirja urejevalnika: orodne vrstice, menijev z mehurčkom, spustnih menijev, pogovornih oken.
Funkcije delujejo enako v vsaki preobleki. Koncepti, tabela žetonov in recepti so v
[vodniku za preobleke](/sl/guide/skins).

## Classic (privzeta) {#classic-default}

Dvignjena orodna vrstica, skupine gumbov kot dvignjena polja, meniji z mehurčkom v slogu kartic:

<InteractiveEditor :bubble-menu="true" placeholder="Preobleka Classic..." />

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

Ravna obarvana orodna vrstica pod tanko črto, prosojni gumbi z nevtralnim stanjem pritisnjenosti, lahki spustni meniji:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Preobleka Pastel..." />

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

## Po meri: mint {#custom-mint}

`registerSkin` doda ime v register. Ta preobleka razširja `pastel` in prepiše peščico žetonov: meta odtenek za podlago orodne vrstice ter globoko zeleno za obrobo slike in ročice za spreminjanje velikosti. Tiha oblika se podeduje od preobleke pastel; vse neprepisano (stanja gumbov, meniji, pogovorna okna) ohrani vrednosti iz preobleke pastel:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Preobleka Mint..." />

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

Koren urejevalnika nosi razred `tiptapify-skin-mint` — zasilni izhod za mere, ki jih katalog žetonov ne pokriva (glejte [Zasilni izhod](/sl/guide/skins#escape-hatch-the-root-class)).

## Vgrajena preobleka {#inline-skin}

Lastnost `skin` sprejme tudi objekt: prepise žetonov in zastavice oblike, ki prek `extends` podeduje od registrirane preobleke. Razreši se po isti verigi, nikoli ne vstopi v register in se izriše pod razredom `tiptapify-skin-inline` (ali `tiptapify-skin-{name}`, kadar objekt vsebuje `name`); njegovi žetoni pristanejo kot spremenljivke CSS `--tf-*` na korenu urejevalnika.

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
