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

La prop `skin` selecciona el aspecto del cromado del editor: barra de herramientas, menús de burbuja, desplegables y diálogos.
Las funciones se comportan igual en todos los skins. Los conceptos, la tabla de tokens y las recetas están en la
[guía de Skins](/es/guide/skins).

## Classic (predeterminado) {#classic-default}

Una barra de herramientas elevada, grupos de botones como cajas elevadas y menús de burbuja con estilo de tarjeta:

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

Una barra de herramientas plana y teñida bajo una línea fina, botones fantasma con un estado pulsado neutro, menús desplegables claros:

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

## Personalizado: mint {#custom-mint}

`registerSkin` añade un nombre al registro. Este skin extiende `pastel` y sobrescribe unos pocos tokens: un tinte menta en el fondo de la barra de herramientas y un verde intenso para el contorno de la imagen y los tiradores de redimensionado. La forma discreta (quiet) se hereda de pastel; todo lo que no se sobrescribe (estados de los botones, menús, diálogos) conserva los valores de pastel:

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

La raíz del editor lleva la clase `tiptapify-skin-mint`, la vía de escape para las dimensiones que el catálogo de tokens no cubre (consulta [Vía de escape](/es/guide/skins#escape-hatch-the-root-class)).

## Skin en línea {#inline-skin}

La prop `skin` también acepta un objeto: sobrescrituras de tokens e indicadores de forma, que hereda de un skin registrado mediante `extends`. Se resuelve por la misma cadena, nunca entra en el registro y se renderiza con la clase `tiptapify-skin-inline` (o `tiptapify-skin-{name}` cuando el objeto incluye un `name`); sus tokens se aplican como variables CSS `--tf-*` en la raíz del editor.

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
