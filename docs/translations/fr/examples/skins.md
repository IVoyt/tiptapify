# Thèmes visuels {#skins}

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

La prop `skin` choisit l'apparence de l'interface de l'éditeur : barre d'outils, menus flottants, listes déroulantes, boîtes de dialogue.
Les fonctionnalités sont identiques quel que soit le thème. Les concepts, le tableau des tokens et les recettes se trouvent dans le
[guide des thèmes](/fr/guide/skins).

## Classic (par défaut) {#classic-default}

Une barre d'outils en relief, des groupes de boutons sous forme de boîtes en relief, des menus flottants façon cartes :

<InteractiveEditor :bubble-menu="true" placeholder="Thème Classic..." />

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

Une barre d'outils plate teintée sous un filet fin, des boutons fantômes avec un état enfoncé neutre, des menus déroulants clairs :

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Thème Pastel..." />

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

## Personnalisé : mint {#custom-mint}

`registerSkin` ajoute un nom au registre. Ce thème étend `pastel` et surcharge quelques tokens : une teinte menthe pour le fond de la barre d'outils, et un vert profond pour le contour de l'image et les poignées de redimensionnement. La forme discrète est héritée de pastel ; tout ce qui n'est pas surchargé (états des boutons, menus, dialogues) conserve les valeurs de pastel :

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Thème Mint..." />

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

La racine de l'éditeur porte la classe `tiptapify-skin-mint` — la porte de sortie pour les dimensions que le catalogue de tokens ne couvre pas (voir [Porte de sortie](/fr/guide/skins#escape-hatch-the-root-class)).

## Thème en ligne {#inline-skin}

La prop `skin` accepte aussi un objet : surcharges de tokens et indicateurs de forme, héritant d'un thème enregistré via `extends`. Il est résolu par la même chaîne, n'entre jamais dans le registre et s'affiche sous la classe `tiptapify-skin-inline` (ou `tiptapify-skin-{name}` lorsque l'objet porte un `name`) ; ses tokens atterrissent sous forme de variables CSS `--tf-*` sur la racine de l'éditeur.

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
