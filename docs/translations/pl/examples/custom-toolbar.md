# Własny pasek narzędzi {#custom-toolbar}

## Wyświetlanie wybranych elementów {#showing-specific-items}

Użyj właściwości `items`, aby wyświetlić tylko potrzebne przyciski paska narzędzi. Przekaż tablicę nazw elementów:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Użyj `|` jako separatora między grupami przycisków.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Własny pasek narzędzi..." />

## Lista rozwijana stylów list {#list-styles-dropdown}

Przyrostek `:styles` zamienia przycisk listy na listę rozwijaną stylów znaczników i numeracji: przycisk listy otwiera siatkę opcji `list-style-type`, zapisywanych jako styl w wierszu. Siatka jest renderowana na powierzchni menu skórki, więc podąża za aktywną skórką ([przewodnik po skórkach](/pl/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Otwórz listy rozwijane stylów list..." />

## Wykluczanie elementów {#excluding-items}

Użyj `items-exclude` razem z `items`, aby pokazać większość elementów paska narzędzi, wykluczając wybrane:

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
placeholder="Wykluczanie niechcianych elementów..." />

## Własne sekcje {#custom-sections}

Pogrupuj elementy we własne nazwane sekcje za pomocą obiektu:

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
placeholder="Pasek narzędzi z własnymi sekcjami..." />

## Opis sekcji paska narzędzi {#toolbar-sections-reference}

Elementy paska narzędzi są podzielone na sekcje. Oto wszystkie dostępne sekcje:

| Sekcja         | Elementy                                                                                |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Ukrywanie paska narzędzi {#hiding-the-toolbar}

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
placeholder="Bez paska narzędzi..." />

## Własne komponenty paska narzędzi {#custom-toolbar-components}

Dodaj własne przyciski za pomocą właściwości `customExtensions`. Każdy wpis to [sekcja paska narzędzi](/pl/api/types#section) — użyj nazwy wbudowanej sekcji (`misc`, `media`, …), aby włączyć swoje przyciski do istniejącej grupy, albo nowej nazwy dla osobnej grupy renderowanej po sekcjach wbudowanych:

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

Własne komponenty są renderowane wewnątrz `<Tiptapify>`, więc mają dostęp do tych samych wspólnych wartości, których używają wbudowane przyciski — edytora, tłumaczeń i konfiguracji na poziomie edytora:

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

- `useTiptapifyConfig()` zwraca konfigurację na poziomie edytora (`variantBtn`, `variantField`), dzięki czemu własne komponenty automatycznie pasują stylem do wbudowanego paska narzędzi.
- Właściwość `variantBtn` jest nadal przekazywana do każdego komponentu paska narzędzi ze względu na wsteczną zgodność — komponenty napisane przed wprowadzeniem wspólnej konfiguracji działają bez zmian.
- `inject('tiptapifyI18n')` daje tę samą funkcję tłumaczeń, której używają wbudowane przyciski.
