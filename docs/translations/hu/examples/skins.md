# Skinek {#skins}

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

A `skin` prop a szerkesztő keretének megjelenését választja ki: eszköztár, buborékmenük, legördülő menük, párbeszédablakok.
A funkciók minden skinben ugyanúgy működnek. A fogalmak, a tokentáblázat és a receptek a
[Skin útmutatóban](/hu/guide/skins) találhatók.

## Classic (alapértelmezett) {#classic-default}

Kiemelt eszköztár, kiemelt dobozként megjelenő gombcsoportok, kártyaszerű buborékmenük:

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

Lapos, színezett eszköztár vékony vonal alatt, semleges lenyomott állapotú áttetsző gombok, könnyű legördülő menük:

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

## Egyéni: mint {#custom-mint}

A `registerSkin` egy nevet ad a regisztrációs jegyzékhez. Ez a skin a `pastel`-t bővíti, és néhány tokent felülír: mentazöld árnyalatot az eszköztár hátterén, valamint mélyzöldet a kép körvonalához és az átméretező fogantyúkhoz. A visszafogott forma a pastelből öröklődik; minden, amit nem írtál felül (gombállapotok, menük, párbeszédablakok), megtartja a pastel értékeit:

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

A szerkesztő gyökéreleme a `tiptapify-skin-mint` osztályt viseli — ez a menekülőút azokhoz a dimenziókhoz, amelyeket a tokenkatalógus nem fed le (lásd [Menekülőút](/hu/guide/skins#escape-hatch-the-root-class)).

## Beágyazott skin {#inline-skin}

A `skin` prop objektumot is elfogad: tokenfelülírásokat és alakzat-jelzőket, amelyek az `extends` révén egy regisztrált skintől öröklődnek. Ugyanazon a láncon oldódik fel, soha nem kerül a jegyzékbe, és a `tiptapify-skin-inline` osztály alatt jelenik meg (vagy `tiptapify-skin-{name}` alatt, ha az objektum `name` mezőt tartalmaz); tokenjei `--tf-*` CSS-változókként kerülnek a szerkesztő gyökerére.

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
