# Barra degli strumenti personalizzata {#custom-toolbar}

## Mostrare elementi specifici {#showing-specific-items}

Usa la prop `items` per mostrare solo i pulsanti che ti servono. Passa un array di nomi di elementi:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Usa `|` come separatore tra i gruppi di pulsanti.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Barra degli strumenti personalizzata..." />

## Menu a discesa degli stili di elenco {#list-styles-dropdown}

Il suffisso `:styles` sostituisce un pulsante di elenco con il relativo menu a discesa degli stili di punto/numerazione: il pulsante apre una griglia di opzioni `list-style-type`, salvate come stile inline. La griglia viene resa all'interno della superficie del menu della skin, quindi segue la skin attiva ([guida alle skin](/it/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Apri i menu a discesa degli stili di elenco..." />

## Escludere elementi {#excluding-items}

Usa `items-exclude` insieme a `items` per mostrare quasi tutti gli elementi della barra degli strumenti escludendone alcuni:

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
placeholder="Esclusione degli elementi indesiderati..." />

## Sezioni personalizzate {#custom-sections}

Raggruppa gli elementi in sezioni con un nome a tua scelta usando un oggetto:

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
placeholder="Barra con sezioni personalizzate..." />

## Riferimento delle sezioni della barra degli strumenti {#toolbar-sections-reference}

Gli elementi della barra degli strumenti sono organizzati in sezioni. Ecco tutte le sezioni disponibili:

| Sezione        | Elementi                                                                                |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Nascondere la barra degli strumenti {#hiding-the-toolbar}

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
placeholder="Nessuna barra degli strumenti..." />

## Componenti personalizzati della barra degli strumenti {#custom-toolbar-components}

Aggiungi i tuoi pulsanti con la prop `customExtensions`. Ogni voce è una [sezione della barra degli strumenti](/it/api/types#section): usa il nome di una sezione integrata (`misc`, `media`, …) per unire i tuoi pulsanti a un gruppo esistente, oppure un nuovo nome per un gruppo separato, reso dopo le sezioni integrate:

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

I componenti personalizzati vengono resi all'interno di `<Tiptapify>`, quindi hanno accesso agli stessi valori condivisi usati dai pulsanti integrati: editor, traduzioni e configurazione a livello di editor:

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

- `useTiptapifyConfig()` restituisce la configurazione a livello di editor (`variantBtn`, `variantField`), così i componenti personalizzati si adattano automaticamente allo stile della barra degli strumenti integrata.
- La prop `variantBtn` viene ancora passata a ogni componente della barra degli strumenti per retrocompatibilità: i componenti scritti prima della configurazione condivisa continuano a funzionare senza modifiche.
- `inject('tiptapifyI18n')` fornisce la stessa funzione di traduzione usata dai pulsanti integrati.
