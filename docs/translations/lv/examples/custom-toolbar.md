# Pielāgota rīkjosla {#custom-toolbar}

## Konkrētu elementu rādīšana {#showing-specific-items}

Izmantojiet rekvizītu `items`, lai rādītu tikai nepieciešamās rīkjoslas pogas. Nododiet elementu nosaukumu masīvu:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Izmantojiet `|` kā atdalītāju starp pogu grupām.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Pielāgota rīkjosla..." />

## Saraksta stilu nolaižamā izvēlne {#list-styles-dropdown}

Sufikss `:styles` aizstāj saraksta pogu ar tās marķieru/numerācijas stilu nolaižamo izvēlni: saraksta poga atver `list-style-type` opciju režģi, kas tiek saglabāts kā iekļautais stils. Režģis tiek renderēts apvalka izvēlnes virsmā, tāpēc seko aktīvajam apvalkam ([apvalku ceļvedis](/lv/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Atveriet saraksta stilu nolaižamās izvēlnes..." />

## Elementu izslēgšana {#excluding-items}

Izmantojiet `items-exclude` kopā ar `items`, lai rādītu lielāko daļu rīkjoslas elementu, bet konkrētus izslēgtu:

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
placeholder="Nevēlamo elementu izslēgšana..." />

## Pielāgotas sadaļas {#custom-sections}

Grupējiet elementus savās nosauktās sadaļās, izmantojot objektu:

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
placeholder="Pielāgotu sadaļu rīkjosla..." />

## Rīkjoslas sadaļu atsauce {#toolbar-sections-reference}

Rīkjoslas elementi ir sakārtoti sadaļās. Šeit ir visas pieejamās sadaļas:

| Sadaļa         | Elementi                                                                                |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Rīkjoslas paslēpšana {#hiding-the-toolbar}

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
placeholder="Bez rīkjoslas..." />

## Pielāgoti rīkjoslas komponenti {#custom-toolbar-components}

Pievienojiet savas pogas ar rekvizītu `customExtensions`. Katrs ieraksts ir [rīkjoslas sadaļa](/lv/api/types#section) — izmantojiet iebūvētas sadaļas nosaukumu (`misc`, `media`, …), lai apvienotu savas pogas ar esošu grupu, vai jaunu nosaukumu atsevišķai grupai, kas tiek renderēta pēc iebūvētajām sadaļām:

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

Pielāgotie komponenti tiek renderēti `<Tiptapify>` iekšpusē, tāpēc tiem ir piekļuve tām pašām koplietotajām vērtībām, ko izmanto iebūvētās pogas — redaktoram, tulkojumiem un redaktora līmeņa konfigurācijai:

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

- `useTiptapifyConfig()` atgriež redaktora līmeņa konfigurāciju (`variantBtn`, `variantField`), tāpēc pielāgotie komponenti automātiski atbilst iebūvētās rīkjoslas stilam.
- Rekvizīts `variantBtn` atpakaļsaderībai joprojām tiek nodots katram rīkjoslas komponentam — pirms koplietotās konfigurācijas uzrakstītie komponenti turpina darboties bez izmaiņām.
- `inject('tiptapifyI18n')` dod to pašu tulkošanas funkciju, ko izmanto iebūvētās pogas.
