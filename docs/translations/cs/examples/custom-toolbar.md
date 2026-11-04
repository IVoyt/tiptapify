# Vlastní panel nástrojů {#custom-toolbar}

## Zobrazení vybraných položek {#showing-specific-items}

Pomocí prop `items` zobrazíte pouze tlačítka panelu nástrojů, která potřebujete. Předejte pole názvů položek:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Znak `|` slouží jako oddělovač mezi skupinami tlačítek.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Vlastní panel nástrojů..." />

## Rozbalovací nabídka stylů seznamu {#list-styles-dropdown}

Přípona `:styles` nahradí tlačítko seznamu rozbalovací nabídkou stylů odrážek a číslování: tlačítko seznamu otevře mřížku voleb `list-style-type`, které se uloží jako inline styl. Mřížka se vykresluje uvnitř plochy nabídky skinu, takže se řídí aktivním skinem ([průvodce skiny](/cs/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Otevřete rozbalovací nabídky stylů seznamu..." />

## Vyloučení položek {#excluding-items}

Použijte `items-exclude` spolu s `items`, aby se zobrazila většina položek panelu nástrojů kromě vybraných:

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
placeholder="Vyloučení nechtěných položek..." />

## Vlastní sekce {#custom-sections}

Položky seskupte do vlastních pojmenovaných sekcí pomocí objektu:

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
placeholder="Panel nástrojů s vlastními sekcemi..." />

## Přehled sekcí panelu nástrojů {#toolbar-sections-reference}

Položky panelu nástrojů jsou uspořádány do sekcí. Zde jsou všechny dostupné sekce:

| Sekce          | Položky                                                                                 |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Skrytí panelu nástrojů {#hiding-the-toolbar}

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
placeholder="Bez panelu nástrojů..." />

## Vlastní komponenty panelu nástrojů {#custom-toolbar-components}

Vlastní tlačítka přidáte pomocí prop `customExtensions`. Každá položka je [sekce panelu nástrojů](/cs/api/types#section) — použijte název vestavěné sekce (`misc`, `media`, …), aby se vaše tlačítka sloučila do existující skupiny, nebo nový název pro samostatnou skupinu vykreslenou za vestavěnými sekcemi:

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

Vlastní komponenty se vykreslují uvnitř `<Tiptapify>`, takže mají přístup ke stejným sdíleným hodnotám jako vestavěná tlačítka — editoru, překladům a konfiguraci na úrovni editoru:

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

- `useTiptapifyConfig()` vrací konfiguraci na úrovni editoru (`variantBtn`, `variantField`), takže vlastní komponenty automaticky odpovídají stylu vestavěného panelu nástrojů.
- Prop `variantBtn` se z důvodu zpětné kompatibility stále předává každé komponentě panelu nástrojů — komponenty napsané před zavedením sdílené konfigurace fungují beze změny.
- `inject('tiptapifyI18n')` poskytuje stejnou překladovou funkci, jakou používají vestavěná tlačítka.
