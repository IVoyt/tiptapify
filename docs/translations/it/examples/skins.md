# Skin {#skins}

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

La prop `skin` seleziona l'aspetto dell'interfaccia dell'editor: barra degli strumenti, bubble menu, menu a discesa, finestre di dialogo.
Le funzionalità sono identiche in ogni skin. I concetti, la tabella dei token e le ricette si trovano nella
[guida alle skin](/it/guide/skins).

## Classic (predefinita) {#classic-default}

Una barra degli strumenti in rilievo, gruppi di pulsanti come riquadri in rilievo, bubble menu a forma di card:

<InteractiveEditor :bubble-menu="true" placeholder="Skin Classic..." />

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

Una barra degli strumenti piatta e tinta sotto una linea sottile, pulsanti ghost con uno stato premuto neutro, menu a discesa chiari:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Skin Pastel..." />

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

## Personalizzata: mint {#custom-mint}

`registerSkin` aggiunge un nome al registro. Questa skin estende `pastel` e sovrascrive alcuni token: una tinta menta sullo sfondo della barra degli strumenti e un verde intenso per il contorno dell'immagine e le maniglie di ridimensionamento. La forma sobria deriva da pastel; tutto ciò che non viene sovrascritto (stati dei pulsanti, menu, finestre di dialogo) mantiene i valori di pastel:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Skin Mint..." />

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

La radice dell'editor porta la classe `tiptapify-skin-mint`, la via di fuga per le dimensioni che il catalogo dei token non copre (vedi [Via di fuga](/it/guide/skins#escape-hatch-the-root-class)).

## Skin inline {#inline-skin}

La prop `skin` accetta anche un oggetto: override dei token e flag di forma, che eredita da una skin registrata tramite `extends`. Viene risolta attraverso la stessa catena, non entra mai nel registro e viene resa con la classe `tiptapify-skin-inline` (o `tiptapify-skin-{name}` quando l'oggetto ha un `name`); i suoi token diventano variabili CSS `--tf-*` sulla radice dell'editor.

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
