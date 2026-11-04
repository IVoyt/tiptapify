# Apvalkalai {#skins}

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

Savybė `skin` parenka redaktoriaus apvalkalo išvaizdą: įrankių juostą, burbulo meniu, išskleidžiamuosius sąrašus, dialogus.
Funkcijos visuose apvalkaluose veikia vienodai. Sąvokos, žetonų lentelė ir receptai pateikti
[apvalkalų vadove](/lt/guide/skins).

## Classic (numatytasis) {#classic-default}

Iškilusi įrankių juosta, mygtukų grupės kaip iškilusios dėžutės, kortelių stiliaus burbulo meniu:

<InteractiveEditor :bubble-menu="true" placeholder="Classic apvalkalas..." />

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

Plokščia atspalvio įrankių juosta po plona linija, permatomi mygtukai su neutralia paspaudimo būsena, lengvi išskleidžiamieji meniu:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Pastel apvalkalas..." />

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

## Pasirinktinis: mint {#custom-mint}

`registerSkin` prideda pavadinimą į registrą. Šis apvalkalas plečia `pastel` ir perrašo keletą žetonų: mėtinį atspalvį įrankių juostos fonui ir sodriai žalią paveikslo kontūrui bei dydžio keitimo rankenėlėms. Rami forma paveldima iš pastel; viskas, kas neperrašyta (mygtukų būsenos, meniu, dialogai), išlaiko pastel reikšmes:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Mint apvalkalas..." />

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

Redaktoriaus šaknis turi klasę `tiptapify-skin-mint` – tai atsarginis išėjimas matmenims, kurių žetonų katalogas neapima (žr. [Atsarginis išėjimas](/lt/guide/skins#escape-hatch-the-root-class)).

## Įterptinis apvalkalas {#inline-skin}

Savybė `skin` taip pat priima objektą: žetonų perrašymus ir formos vėliavėles, paveldint iš užregistruoto apvalkalo per `extends`. Jis išsprendžiamas ta pačia grandine, niekada nepatenka į registrą ir atvaizduojamas su klase `tiptapify-skin-inline` (arba `tiptapify-skin-{name}`, kai objektas turi `name`); jo žetonai tampa `--tf-*` CSS kintamaisiais redaktoriaus šaknyje.

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
