# Nahad {#skins}

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

Prop `skin` valib redaktori ümbrise välimuse: tööriistariba, hõljumenüüd, rippmenüüd, dialoogid.
Funktsioonid töötavad igas nahas ühtmoodi. Mõisted, tokenite tabel ja retseptid on
[nahkade juhendis](/et/guide/skins).

## Classic (vaikimisi) {#classic-default}

Kõrgendatud tööriistariba, nuppude rühmad kõrgendatud kastidena, kaardistiilis hõljumenüüd:

<InteractiveEditor :bubble-menu="true" placeholder="Classic-nahk..." />

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

Lame toonitud tööriistariba hästi õhukese joone all, läbipaistvad nupud neutraalse vajutatud olekuga, kerged rippmenüüd:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Pastel-nahk..." />

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

## Kohandatud: mint {#custom-mint}

`registerSkin` lisab registrisse nime. See nahk laiendab nahka `pastel` ja kirjutab üle käputäie tokeneid: piparmündirohelise tooni tööriistariba taustale ning sügava rohelise pildi kontuurile ja suuruse muutmise käepidemetele. Vaikne kuju päritakse pastelilt; kõik, mida üle ei kirjutata (nuppude olekud, menüüd, dialoogid), säilitab pasteli väärtused:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Mint-nahk..." />

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

Redaktori juurelement kannab klassi `tiptapify-skin-mint` — see on pääsutee mõõtmete jaoks, mida tokenikataloog ei kata (vaata [pääsuteed](/et/guide/skins#escape-hatch-the-root-class)).

## Sisemine nahk {#inline-skin}

Prop `skin` võtab vastu ka objekti: tokenite ülekirjutused ja kujulipud, mis pärivad `extends` kaudu registreeritud nahalt. See lahendatakse sama ahela kaudu, ei satu kunagi registrisse ja renderdatakse klassi `tiptapify-skin-inline` all (või `tiptapify-skin-{name}`, kui objektil on `name`); selle tokenid satuvad redaktori juurelemendile CSS-muutujatena `--tf-*`.

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
