# Aangepaste toolbar {#custom-toolbar}

## Specifieke items tonen {#showing-specific-items}

Gebruik de prop `items` om alleen de toolbarknoppen te tonen die je nodig hebt. Geef een array met itemnamen door:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Gebruik `|` als scheiding tussen knopgroepen.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Aangepaste toolbar..." />

## Dropdown met lijststijlen {#list-styles-dropdown}

Het achtervoegsel `:styles` vervangt een lijstknop door een dropdown met opsommingstekens/nummeringsstijlen: de lijstknop opent een raster met `list-style-type`-opties, opgeslagen als inline stijl. Het raster wordt getekend in het menuvlak van de skin en volgt dus de actieve skin ([Skins-handleiding](/nl/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Open de dropdowns met lijststijlen..." />

## Items uitsluiten {#excluding-items}

Gebruik `items-exclude` samen met `items` om bijna alle toolbaritems te tonen en alleen specifieke items uit te sluiten:

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
placeholder="Ongewenste items uitsluiten..." />

## Eigen secties {#custom-sections}

Groepeer items in je eigen benoemde secties met een object:

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
placeholder="Toolbar met eigen secties..." />

## Overzicht van toolbarsecties {#toolbar-sections-reference}

Toolbaritems zijn ingedeeld in secties. Dit zijn alle beschikbare secties:

| Sectie         | Items                                                                                   |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## De toolbar verbergen {#hiding-the-toolbar}

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
placeholder="Geen toolbar..." />

## Aangepaste toolbarcomponenten {#custom-toolbar-components}

Voeg met de prop `customExtensions` je eigen knoppen toe. Elk item is een [toolbarsectie](/nl/api/types#section) — gebruik de naam van een ingebouwde sectie (`misc`, `media`, …) om je knoppen samen te voegen met een bestaande groep, of een nieuwe naam voor een aparte groep die na de ingebouwde secties wordt getoond:

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

Aangepaste componenten worden binnen `<Tiptapify>` gerenderd, dus ze hebben toegang tot dezelfde gedeelde waarden als de ingebouwde knoppen — de editor, vertalingen en de configuratie op editorniveau:

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

- `useTiptapifyConfig()` geeft de configuratie op editorniveau terug (`variantBtn`, `variantField`), zodat aangepaste componenten automatisch aansluiten bij de stijl van de ingebouwde toolbar.
- De prop `variantBtn` wordt nog steeds aan elk toolbarcomponent doorgegeven voor achterwaartse compatibiliteit — componenten die vóór de gedeelde configuratie zijn geschreven, blijven ongewijzigd werken.
- `inject('tiptapifyI18n')` geeft dezelfde vertaalfunctie als de ingebouwde knoppen.
