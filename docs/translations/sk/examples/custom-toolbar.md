# Vlastná lišta nástrojov {#custom-toolbar}

## Zobrazenie vybraných položiek {#showing-specific-items}

Pomocou propu `items` zobrazíte iba tlačidlá lišty nástrojov, ktoré potrebujete. Odovzdajte pole názvov položiek:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Ako oddeľovač medzi skupinami tlačidiel použite `|`.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Vlastná lišta nástrojov..." />

## Rozbaľovacia ponuka štýlov zoznamov {#list-styles-dropdown}

Prípona `:styles` nahradí tlačidlo zoznamu rozbaľovacou ponukou štýlov odrážok a číslovania: tlačidlo zoznamu otvorí mriežku možností `list-style-type`, ktoré sa uložia ako inline štýl. Mriežka sa vykresľuje v ploche ponuky skinu, takže sleduje aktívny skin ([príručka Skiny](/sk/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Otvorte rozbaľovacie ponuky štýlov zoznamov..." />

## Vylúčenie položiek {#excluding-items}

Použite `items-exclude` spolu s `items`, ak chcete zobraziť väčšinu položiek lišty nástrojov a vylúčiť len niektoré:

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
placeholder="Vylúčenie nechcených položiek..." />

## Vlastné sekcie {#custom-sections}

Položky zoskupte do vlastných pomenovaných sekcií pomocou objektu:

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
placeholder="Lišta nástrojov s vlastnými sekciami..." />

## Referencia sekcií lišty nástrojov {#toolbar-sections-reference}

Položky lišty nástrojov sú usporiadané do sekcií. Tu sú všetky dostupné sekcie:

| Sekcia         | Položky                                                                                 |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Skrytie lišty nástrojov {#hiding-the-toolbar}

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
placeholder="Bez lišty nástrojov..." />

## Vlastné komponenty lišty nástrojov {#custom-toolbar-components}

Vlastné tlačidlá pridáte cez prop `customExtensions`. Každý záznam je [sekcia lišty nástrojov](/sk/api/types#section) — použite názov vstavanej sekcie (`misc`, `media`, …), aby sa vaše tlačidlá zlúčili do existujúcej skupiny, alebo nový názov pre samostatnú skupinu vykreslenú za vstavanými sekciami:

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

Vlastné komponenty sa vykresľujú vo vnútri `<Tiptapify>`, takže majú prístup k rovnakým zdieľaným hodnotám ako vstavané tlačidlá — editor, preklady a konfigurácia na úrovni editora:

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

- `useTiptapifyConfig()` vracia konfiguráciu na úrovni editora (`variantBtn`, `variantField`), takže vlastné komponenty sa automaticky zhodujú so štýlom vstavanej lišty nástrojov.
- Prop `variantBtn` sa z dôvodu spätnej kompatibility naďalej odovzdáva každému komponentu lišty nástrojov — komponenty napísané pred zdieľanou konfiguráciou fungujú bez zmeny.
- `inject('tiptapifyI18n')` poskytuje tú istú prekladovú funkciu, akú používajú vstavané tlačidlá.
