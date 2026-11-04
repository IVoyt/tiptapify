# Kohandatud tööriistariba {#custom-toolbar}

## Kindlate üksuste kuvamine {#showing-specific-items}

Kasuta propi `items`, et kuvada ainult vajalikud tööriistariba nupud. Anna ette üksuste nimede massiiv:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Kasuta nuppude rühmade vahel eraldajana märki `|`.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Kohandatud tööriistariba..." />

## Loendistiilide rippmenüü {#list-styles-dropdown}

Järelliide `:styles` vahetab loendinupu selle märgi-/nummerdusstiilide rippmenüü vastu: loendinupp avab `list-style-type` valikute ruudustiku, mis salvestatakse reasisese stiilina. Ruudustik renderdatakse naha menüüpinna sees, nii et see järgib aktiivset nahka ([nahkade juhend](/et/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Ava loendistiilide rippmenüüd..." />

## Üksuste välistamine {#excluding-items}

Kasuta `items-exclude` koos `items`iga, et näidata enamikku tööriistariba üksustest, kuid välistada kindlad:

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
placeholder="Soovimatute üksuste välistamine..." />

## Kohandatud sektsioonid {#custom-sections}

Rühmita üksused oma nimega sektsioonideks objekti abil:

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
placeholder="Kohandatud sektsioonidega tööriistariba..." />

## Tööriistariba sektsioonide viide {#toolbar-sections-reference}

Tööriistariba üksused on korraldatud sektsioonidesse. Siin on kõik saadaolevad sektsioonid:

| Sektsioon      | Üksused                                                                                 |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Tööriistariba peitmine {#hiding-the-toolbar}

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
placeholder="Tööriistariba pole..." />

## Kohandatud tööriistariba komponendid {#custom-toolbar-components}

Lisa oma nupud propiga `customExtensions`. Iga kirje on [tööriistariba sektsioon](/et/api/types#section) — kasuta sisseehitatud sektsiooni nime (`misc`, `media`, …), et liita oma nupud olemasolevasse rühma, või uut nime eraldi rühma jaoks, mis renderdatakse pärast sisseehitatud sektsioone:

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

Kohandatud komponendid renderdatakse komponendi `<Tiptapify>` sees, nii et neil on ligipääs samadele jagatud väärtustele, mida kasutavad sisseehitatud nupud — redaktor, tõlked ja redaktoritaseme konfiguratsioon:

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

- `useTiptapifyConfig()` tagastab redaktoritaseme konfiguratsiooni (`variantBtn`, `variantField`), nii et kohandatud komponendid sobituvad automaatselt sisseehitatud tööriistariba stiiliga.
- Prop `variantBtn` antakse tagasiühilduvuse huvides endiselt igale tööriistariba komponendile — enne jagatud konfiguratsiooni kirjutatud komponendid töötavad muutumatult edasi.
- `inject('tiptapifyI18n')` annab sama tõlkefunktsiooni, mida kasutavad sisseehitatud nupud.
