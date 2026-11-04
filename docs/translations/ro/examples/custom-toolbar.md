# Bară de instrumente personalizată {#custom-toolbar}

## Afișarea unor elemente anume {#showing-specific-items}

Folosește proprietatea `items` pentru a afișa doar butoanele de care ai nevoie. Transmite o listă cu numele elementelor:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Folosește `|` ca separator între grupurile de butoane.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Bară de instrumente personalizată..." />

## Lista derulantă cu stiluri de listă {#list-styles-dropdown}

Sufixul `:styles` înlocuiește un buton de listă cu lista derulantă a stilurilor sale de marcatori/numerotare: butonul de listă deschide o grilă de opțiuni `list-style-type`, salvate ca stil inline. Grila este afișată în suprafața de meniu a temei, deci urmează tema activă ([ghidul Teme de aspect](/ro/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Deschide listele derulante cu stiluri de listă..." />

## Excluderea elementelor {#excluding-items}

Folosește `items-exclude` împreună cu `items` pentru a afișa majoritatea elementelor barei de instrumente, excluzându-le pe cele specificate:

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
placeholder="Excluderea elementelor nedorite..." />

## Secțiuni personalizate {#custom-sections}

Grupează elementele în propriile secțiuni cu nume, folosind un obiect:

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
placeholder="Bară de instrumente cu secțiuni personalizate..." />

## Referință a secțiunilor barei de instrumente {#toolbar-sections-reference}

Elementele barei de instrumente sunt organizate în secțiuni. Iată toate secțiunile disponibile:

| Secțiune       | Elemente                                                                                |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Ascunderea barei de instrumente {#hiding-the-toolbar}

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
placeholder="Fără bară de instrumente..." />

## Componente personalizate pentru bara de instrumente {#custom-toolbar-components}

Adaugă-ți propriile butoane cu proprietatea `customExtensions`. Fiecare intrare este o [secțiune a barei de instrumente](/ro/api/types#section) — folosește numele unei secțiuni încorporate (`misc`, `media`, …) pentru a îmbina butoanele tale într-un grup existent sau un nume nou pentru un grup separat, afișat după secțiunile încorporate:

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

Componentele personalizate sunt randate în interiorul `<Tiptapify>`, deci au acces la aceleași valori partajate pe care le folosesc butoanele încorporate — editorul, traducerile și configurația la nivel de editor:

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

- `useTiptapifyConfig()` returnează configurația la nivel de editor (`variantBtn`, `variantField`), astfel încât componentele personalizate se potrivesc automat cu stilul barei de instrumente încorporate.
- Proprietatea `variantBtn` este în continuare transmisă fiecărei componente a barei de instrumente, pentru compatibilitate retroactivă — componentele scrise înainte de configurația partajată funcționează neschimbat.
- `inject('tiptapifyI18n')` oferă aceeași funcție de traducere pe care o folosesc butoanele încorporate.
