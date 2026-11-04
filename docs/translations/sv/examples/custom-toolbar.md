# Anpassat verktygsfält {#custom-toolbar}

## Visa specifika objekt {#showing-specific-items}

Använd propen `items` för att bara visa de verktygsfältsknappar du behöver. Skicka en array med objektnamn:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Använd `|` som avgränsare mellan knappgrupper.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Anpassat verktygsfält..." />

## Rullgardin för liststilar {#list-styles-dropdown}

Suffixet `:styles` byter ut en listknapp mot en rullgardin med dess punkt-/numreringsstilar: listknappen öppnar ett rutnät med `list-style-type`-alternativ, som sparas som en inline-stil. Rutnätet renderas inuti skinens menyyta, så det följer den aktiva skinen ([Skins-guiden](/sv/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Öppna rullgardinerna för liststilar..." />

## Utesluta objekt {#excluding-items}

Använd `items-exclude` tillsammans med `items` för att visa de flesta verktygsfältsobjekt men utesluta vissa:

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
placeholder="Utesluter oönskade objekt..." />

## Egna sektioner {#custom-sections}

Gruppera objekt i egna namngivna sektioner med ett objekt:

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
placeholder="Verktygsfält med egna sektioner..." />

## Referens för verktygsfältssektioner {#toolbar-sections-reference}

Verktygsfältsobjekten är organiserade i sektioner. Här är alla tillgängliga sektioner:

| Sektion        | Objekt                                                                                  |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Dölja verktygsfältet {#hiding-the-toolbar}

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
placeholder="Inget verktygsfält..." />

## Anpassade verktygsfältskomponenter {#custom-toolbar-components}

Lägg till egna knappar med propen `customExtensions`. Varje post är en [verktygsfältssektion](/sv/api/types#section) — använd ett inbyggt sektionsnamn (`misc`, `media`, …) för att slå ihop dina knappar med en befintlig grupp, eller ett nytt namn för en separat grupp som renderas efter de inbyggda sektionerna:

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

Anpassade komponenter renderas inuti `<Tiptapify>`, så de har tillgång till samma delade värden som de inbyggda knapparna använder — redigeraren, översättningar och konfigurationen på redigerarnivå:

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

- `useTiptapifyConfig()` returnerar konfigurationen på redigerarnivå (`variantBtn`, `variantField`), så att anpassade komponenter automatiskt matchar det inbyggda verktygsfältets utseende.
- Propen `variantBtn` skickas fortfarande till varje verktygsfältskomponent av bakåtkompatibilitetsskäl — komponenter skrivna före den delade konfigurationen fortsätter fungera oförändrade.
- `inject('tiptapifyI18n')` ger samma översättningsfunktion som de inbyggda knapparna använder.
