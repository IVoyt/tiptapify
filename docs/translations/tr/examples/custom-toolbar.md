# Özel Araç Çubuğu {#custom-toolbar}

## Belirli Öğeleri Gösterme {#showing-specific-items}

Yalnızca ihtiyacınız olan araç çubuğu düğmelerini göstermek için `items` prop'unu kullanın. Öğe adlarından oluşan bir dizi verin:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Düğme grupları arasında ayırıcı olarak `|` kullanın.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Özel araç çubuğu..." />

## Liste Stilleri Açılır Menüsü {#list-styles-dropdown}

`:styles` soneki, bir liste düğmesini işaret/numaralandırma stilleri açılır menüsüyle değiştirir: liste düğmesi, satır içi stil olarak kaydedilen `list-style-type` seçeneklerinden oluşan bir ızgara açar. Izgara, temanın menü yüzeyi içinde işlenir, bu yüzden etkin temayı izler ([Temalar kılavuzu](/tr/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Liste stilleri açılır menülerini açın..." />

## Öğeleri Hariç Tutma {#excluding-items}

Araç çubuğu öğelerinin çoğunu gösterip yalnızca belirli olanları hariç tutmak için `items-exclude` prop'unu `items` ile birlikte kullanın:

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
placeholder="İstenmeyen öğeler hariç tutuluyor..." />

## Özel Bölümler {#custom-sections}

Bir nesne kullanarak öğeleri kendi adlandırdığınız bölümlerde gruplayın:

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
placeholder="Özel bölümlü araç çubuğu..." />

## Araç Çubuğu Bölümleri Referansı {#toolbar-sections-reference}

Araç çubuğu öğeleri bölümler halinde düzenlenir. Kullanılabilir tüm bölümler şunlardır:

| Bölüm         | Öğeler                                                                                  |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Araç Çubuğunu Gizleme {#hiding-the-toolbar}

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
placeholder="Araç çubuğu yok..." />

## Özel Araç Çubuğu Bileşenleri {#custom-toolbar-components}

`customExtensions` prop'uyla kendi düğmelerinizi ekleyin. Her girdi bir [araç çubuğu bölümüdür](/tr/api/types#section) — düğmelerinizi mevcut bir grupla birleştirmek için yerleşik bir bölüm adı (`misc`, `media`, …), yerleşik bölümlerden sonra işlenen ayrı bir grup için ise yeni bir ad kullanın:

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

Özel bileşenler `<Tiptapify>` içinde işlenir; bu yüzden yerleşik düğmelerin kullandığı aynı paylaşılan değerlere erişebilirler — düzenleyici, çeviriler ve düzenleyici düzeyindeki yapılandırma:

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

- `useTiptapifyConfig()` düzenleyici düzeyindeki yapılandırmayı (`variantBtn`, `variantField`) döndürür; böylece özel bileşenler yerleşik araç çubuğunun stiliyle otomatik olarak eşleşir.
- `variantBtn` prop'u geriye dönük uyumluluk için hâlâ her araç çubuğu bileşenine iletilir — paylaşılan yapılandırmadan önce yazılmış bileşenler değişmeden çalışmaya devam eder.
- `inject('tiptapifyI18n')`, yerleşik düğmelerin kullandığı aynı çeviri işlevini verir.
