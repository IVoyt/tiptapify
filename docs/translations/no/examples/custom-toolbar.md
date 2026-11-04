# Egendefinert verktøylinje {#custom-toolbar}

## Vise bestemte elementer {#showing-specific-items}

Bruk `items`-prop-en for å vise bare verktøylinjeknappene du trenger. Send en liste med elementnavn:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Bruk `|` som skilletegn mellom knappegrupper.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Egendefinert verktøylinje..." />

## Nedtrekksliste med listestiler {#list-styles-dropdown}

Suffikset `:styles` bytter en listeknapp mot en nedtrekksliste med merke-/nummereringsstiler: listeknappen åpner et rutenett med `list-style-type`-alternativer, lagret som en inline-stil. Rutenettet gjengis inne i skinnets menyflate, så det følger det aktive skinnet ([Skins guide](/no/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Åpne nedtrekkslistene med listestiler..." />

## Utelate elementer {#excluding-items}

Bruk `items-exclude` sammen med `items` for å vise de fleste verktøylinjeelementene, men utelate bestemte:

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
placeholder="Utelater uønskede elementer..." />

## Egendefinerte seksjoner {#custom-sections}

Grupper elementer i dine egne navngitte seksjoner med et objekt:

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
placeholder="Verktøylinje med egendefinerte seksjoner..." />

## Oversikt over verktøylinjeseksjoner {#toolbar-sections-reference}

Verktøylinjeelementene er ordnet i seksjoner. Her er alle tilgjengelige seksjoner:

| Seksjon        | Elementer                                                                               |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Skjule verktøylinjen {#hiding-the-toolbar}

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
placeholder="Ingen verktøylinje..." />

## Egendefinerte verktøylinjekomponenter {#custom-toolbar-components}

Legg til dine egne knapper med `customExtensions`-prop-en. Hver oppføring er en [verktøylinjeseksjon](/no/api/types#section) — bruk et innebygd seksjonsnavn (`misc`, `media`, …) for å slå knappene dine sammen med en eksisterende gruppe, eller et nytt navn for en egen gruppe som vises etter de innebygde seksjonene:

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

Egendefinerte komponenter gjengis inne i `<Tiptapify>`, så de har tilgang til de samme delte verdiene som de innebygde knappene bruker — editor, oversettelser og konfigurasjonen på editornivå:

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

- `useTiptapifyConfig()` returnerer konfigurasjonen på editornivå (`variantBtn`, `variantField`), slik at egendefinerte komponenter automatisk matcher stilen til den innebygde verktøylinjen.
- `variantBtn`-prop-en sendes fortsatt til hver verktøylinjekomponent for bakoverkompatibilitet — komponenter skrevet før den delte konfigurasjonen fortsetter å fungere uendret.
- `inject('tiptapifyI18n')` gir den samme oversettelsesfunksjonen som de innebygde knappene bruker.
