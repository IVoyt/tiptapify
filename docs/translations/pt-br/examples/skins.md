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

A prop `skin` seleciona a aparência do chrome do editor: barra de ferramentas, bubble menus, menus suspensos, diálogos.
Os recursos funcionam da mesma forma em todas as skins. Os conceitos, a tabela de tokens e as receitas estão no
[guia de Skins](/pt-br/guide/skins).

## Clássica (padrão) {#classic-default}

Uma barra de ferramentas elevada, grupos de botões como caixas elevadas, bubble menus em estilo de cartão:

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

Uma barra de ferramentas plana e tingida sob uma linha fina, botões fantasma com estado pressionado neutro, menus suspensos claros:

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

`registerSkin` adiciona um nome ao registro. Esta skin estende `pastel` e sobrescreve alguns tokens: um tom de menta no fundo da barra de ferramentas e verde escuro no contorno da imagem e nas alças de redimensionamento. A forma discreta vem da pastel; tudo o que não é sobrescrito (estados dos botões, menus, diálogos) mantém os valores da pastel:

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

A raiz do editor carrega a classe `tiptapify-skin-mint` — a saída de emergência para dimensões que o catálogo de tokens não cobre (veja [Saída de emergência](/pt-br/guide/skins#escape-hatch-the-root-class)).

## Skin inline {#inline-skin}

A prop `skin` também aceita um objeto: sobrescritas de tokens e flags de forma, herdando de uma skin registrada por meio de `extends`. Ele é resolvido pela mesma cadeia, nunca entra no registro e é renderizado sob a classe `tiptapify-skin-inline` (ou `tiptapify-skin-{name}` quando o objeto traz um `name`); seus tokens chegam como variáveis CSS `--tf-*` na raiz do editor.

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
