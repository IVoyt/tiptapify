# Toolbar Kustom {#custom-toolbar}

## Menampilkan Item Tertentu {#showing-specific-items}

Gunakan prop `items` untuk menampilkan hanya tombol toolbar yang Anda butuhkan. Berikan array nama item:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Gunakan `|` sebagai pemisah antar grup tombol.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Toolbar kustom..." />

## Dropdown Gaya Daftar {#list-styles-dropdown}

Akhiran `:styles` mengganti tombol daftar dengan dropdown gaya penanda/penomorannya: tombol daftar membuka kisi opsi `list-style-type`, yang disimpan sebagai gaya inline. Kisi ini dirender di dalam permukaan menu skin, sehingga mengikuti skin yang aktif ([panduan Skin](/id/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Buka dropdown gaya daftar..." />

## Mengecualikan Item {#excluding-items}

Gunakan `items-exclude` bersama `items` untuk menampilkan sebagian besar item toolbar tetapi mengecualikan item tertentu:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', 'strike']"
    :items-exclude="true"
    placeholder="Excluding unwanted items..."
  />
</template>
```
<InteractiveEditor :items="['bold', 'italic', 'underline', 'strike']"
:items-exclude="true"
placeholder="Mengecualikan item yang tidak diinginkan..." />

## Seksi Kustom {#custom-sections}

Kelompokkan item ke dalam seksi bernama Anda sendiri menggunakan objek:

```vue
<script setup lang="ts">
const customItems = {
  formatting: ['bold', 'italic', 'underline', 'strike'],
  headings: ['heading'],
  lists: ['bulletList', 'orderedList', 'taskList'],
  media: ['link', 'image', 'video'],
}
</script>

<template>
  <Tiptapify
    :items="customItems"
    placeholder="Custom sections toolbar..."
  />
</template>
```
<InteractiveEditor :items="{
formatting: ['bold', 'italic', 'underline', 'strike'],
headings: ['heading'],
lists: ['bulletList', 'orderedList', 'taskList'],
media: ['link', 'image', 'video'],
}"
placeholder="Toolbar dengan seksi kustom..." />

## Referensi Seksi Toolbar {#toolbar-sections-reference}

Item toolbar disusun ke dalam seksi. Berikut semua seksi yang tersedia:

| Seksi          | Item                                                                                    |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Menyembunyikan Toolbar {#hiding-the-toolbar}

```vue
<template>
  <Tiptapify
    :toolbar="false"
    placeholder="No toolbar — use the bubble menu instead..."
  />
</template>
```
<InteractiveEditor :toolbar="false"
:bubble-menu="false"
placeholder="Tanpa toolbar..." />

## Komponen Toolbar Kustom {#custom-toolbar-components}

Tambahkan tombol Anda sendiri dengan prop `customExtensions`. Setiap entri adalah [seksi toolbar](/id/api/types#section) — gunakan nama seksi bawaan (`misc`, `media`, …) untuk menggabungkan tombol Anda ke grup yang sudah ada, atau nama baru untuk grup terpisah yang dirender setelah seksi bawaan:

```vue
<script setup lang="ts">
import BlockquoteButton from './BlockquoteButton.vue'

const customExtensions = [{
  section: 'custom',
  group: true,
  components: [{ name: 'blockquoteBtn', component: BlockquoteButton }],
}]
</script>

<template>
  <Tiptapify :custom-extensions="customExtensions" />
</template>
```

Komponen kustom dirender di dalam `<Tiptapify>`, sehingga mereka dapat mengakses nilai bersama yang sama dengan tombol bawaan — editor, terjemahan, dan konfigurasi tingkat editor:

```vue
<!-- BlockquoteButton.vue -->
<script setup lang="ts">
import { inject, type Ref } from 'vue'
import { TipTapEditor, useTiptapifyConfig } from 'tiptapify'

const editor = inject('tiptapifyEditor') as Ref<TipTapEditor>
const { variantBtn } = useTiptapifyConfig()
</script>

<template>
  <VBtn
    :color="editor.isActive('blockquote') ? 'primary' : ''"
    :variant="variantBtn"
    size="32"
    @click="editor.commands.toggleBlockquote()"
  >
    Quote
  </VBtn>
</template>
```

- `useTiptapifyConfig()` mengembalikan konfigurasi tingkat editor (`variantBtn`, `variantField`), sehingga komponen kustom otomatis menyesuaikan gaya toolbar bawaan.
- Prop `variantBtn` tetap diteruskan ke setiap komponen toolbar demi kompatibilitas mundur — komponen yang ditulis sebelum ada konfigurasi bersama tetap berfungsi tanpa perubahan.
- `inject('tiptapifyI18n')` memberikan fungsi terjemahan yang sama dengan yang dipakai tombol bawaan.
