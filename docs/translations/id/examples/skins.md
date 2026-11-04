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

Prop `skin` memilih tampilan chrome editor: toolbar, bubble menu, dropdown, dialog.
Fitur bekerja sama di setiap skin. Konsep, tabel token, dan resepnya ada di
[panduan Skin](/id/guide/skins).

## Classic (default) {#classic-default}

Toolbar yang menonjol, grup tombol berupa kotak menonjol, bubble menu bergaya kartu:

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

Toolbar datar berwarna lembut di bawah garis tipis, tombol ghost dengan status ditekan netral, dropdown ringan:

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

## Kustom: mint {#custom-mint}

`registerSkin` menambahkan nama ke registry. Skin ini memperluas `pastel` dan menimpa beberapa token: rona mint pada lapisan toolbar, serta hijau tua untuk garis tepi gambar dan handle pengubah ukuran. Bentuknya yang tenang diwarisi dari pastel; semua yang tidak ditimpa (status tombol, menu, dialog) tetap memakai nilai pastel:

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

Root editor memiliki class `tiptapify-skin-mint` — jalan keluar untuk dimensi yang tidak tercakup katalog token (lihat [Jalan keluar](/id/guide/skins#escape-hatch-the-root-class)).

## Skin inline {#inline-skin}

Prop `skin` juga menerima objek: penimpaan token dan flag bentuk, yang mewarisi dari skin terdaftar melalui `extends`. Objek ini diselesaikan melalui rantai yang sama, tidak pernah masuk ke registry, dan dirender dengan class `tiptapify-skin-inline` (atau `tiptapify-skin-{name}` jika objek memiliki `name`); token-nya muncul sebagai variabel CSS `--tf-*` pada root editor.

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
