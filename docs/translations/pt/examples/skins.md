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

A prop `skin` seleciona o aspeto do cromado do editor: barra de ferramentas, menus flutuantes, menus pendentes e diálogos.
As funcionalidades comportam-se da mesma forma em todas as skins. Os conceitos, a tabela de tokens e as receitas encontram-se
no [guia de skins](/pt/guide/skins).

## Clássica (predefinida) {#classic-default}

Uma barra de ferramentas elevada, grupos de botões como caixas elevadas e menus flutuantes em estilo de cartão:

<InteractiveEditor :bubble-menu="true" placeholder="Skin clássica..." />

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

Uma barra de ferramentas plana e tingida sob uma linha fina, botões fantasma com um estado premido neutro, menus pendentes claros:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="Skin pastel..." />

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

## Personalizada: mint {#custom-mint}

`registerSkin` adiciona um nome ao registo. Esta skin estende `pastel` e substitui alguns tokens: um tom de menta no fundo da barra de ferramentas e verde-escuro para o contorno da imagem e as alças de redimensionamento. A forma discreta vem da skin pastel; tudo o que não é substituído (estados dos botões, menus, diálogos) mantém os valores da pastel:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="Skin mint..." />

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

A raiz do editor tem a classe `tiptapify-skin-mint` — a válvula de escape para dimensões que o catálogo de tokens não cobre (consulte [Válvula de escape](/pt/guide/skins#escape-hatch-the-root-class)).

## Skin inline {#inline-skin}

A prop `skin` também aceita um objeto: substituições de tokens e flags de forma, herdando de uma skin registada através de `extends`. É resolvida pela mesma cadeia, nunca entra no registo e é renderizada sob a classe `tiptapify-skin-inline` (ou `tiptapify-skin-{name}` quando o objeto tem um `name`); os seus tokens são aplicados como variáveis CSS `--tf-*` na raiz do editor.

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
