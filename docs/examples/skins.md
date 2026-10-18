# Skins

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

The `skin` prop selects the look of the editor chrome: toolbar, bubble menus, dropdowns, dialogs.
Features work the same in every skin. The concepts, the token table, and the recipes are in the
[Skins guide](/guide/skins).

## Classic (default)

A raised toolbar, button groups as raised boxes, card-style bubble menus:

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

## Pastel

A flat tinted toolbar under a hairline, ghost buttons with a neutral pressed state, light dropdowns — the look introduced in 0.3.3:

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

## Custom: mint

`registerSkin` adds a name to the registry. This skin extends `pastel` and overrides a handful of tokens: a mint tint on the toolbar wash, and deep green for the image outline and the resize handles. The quiet shape rides along from pastel; everything not overridden (button states, menus, dialogs) keeps the pastel values:

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

The editor root carries the `tiptapify-skin-mint` class — the escape hatch for dimensions the token catalog does not cover (see [Escape hatch](/guide/skins#escape-hatch-the-root-class)).

## Inline skin

The `skin` prop also takes an object: token overrides and shape flags, inheriting from a registered skin through `extends`. It resolves through the same chain, never enters the registry, and renders under the class `tiptapify-skin-inline` (or `tiptapify-skin-{name}` when the object carries a `name`); its tokens land as `--tf-*` CSS variables on the editor root.

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
