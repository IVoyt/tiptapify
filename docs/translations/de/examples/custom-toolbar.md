# Custom Toolbar {#custom-toolbar}

## Bestimmte Elemente anzeigen {#showing-specific-items}

Mit der Prop `items` zeigst du nur die Symbolleisten-Schaltflächen an, die du brauchst. Übergib ein Array mit Elementnamen:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Verwende `|` als Trennzeichen zwischen Schaltflächengruppen.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Eigene Symbolleiste..." />

## Dropdown für Listenstile {#list-styles-dropdown}

Das Suffix `:styles` ersetzt eine Listen-Schaltfläche durch ihr Dropdown mit Aufzählungszeichen-/Nummerierungsstilen: Die Listen-Schaltfläche öffnet ein Raster mit `list-style-type`-Optionen, gespeichert als Inline-Stil. Das Raster wird innerhalb der Menüfläche des Skins gerendert und folgt daher dem aktiven Skin ([Skins-Anleitung](/de/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Öffne die Dropdowns für Listenstile..." />

## Elemente ausschließen {#excluding-items}

Verwende `items-exclude` zusammen mit `items`, um die meisten Symbolleisten-Elemente anzuzeigen, bestimmte aber auszuschließen:

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
placeholder="Unerwünschte Elemente ausschließen..." />

## Eigene Bereiche {#custom-sections}

Gruppiere Elemente mithilfe eines Objekts in eigene benannte Bereiche:

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
placeholder="Symbolleiste mit eigenen Bereichen..." />

## Referenz der Symbolleisten-Bereiche {#toolbar-sections-reference}

Symbolleisten-Elemente sind in Bereiche gegliedert. Hier sind alle verfügbaren Bereiche:

| Section        | Items                                                                                   |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Symbolleiste ausblenden {#hiding-the-toolbar}

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
placeholder="Keine Symbolleiste..." />

## Eigene Symbolleisten-Komponenten {#custom-toolbar-components}

Füge mit der Prop `customExtensions` eigene Schaltflächen hinzu. Jeder Eintrag ist ein [Symbolleisten-Bereich](/de/api/types#section) — verwende einen eingebauten Bereichsnamen (`misc`, `media`, …), um deine Schaltflächen in eine bestehende Gruppe einzufügen, oder einen neuen Namen für eine separate Gruppe, die nach den eingebauten Bereichen gerendert wird:

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

Eigene Komponenten werden innerhalb von `<Tiptapify>` gerendert und haben daher Zugriff auf dieselben geteilten Werte wie die eingebauten Schaltflächen — Editor, Übersetzungen und die Konfiguration auf Editor-Ebene:

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

- `useTiptapifyConfig()` gibt die Konfiguration auf Editor-Ebene zurück (`variantBtn`, `variantField`), sodass eigene Komponenten automatisch zum Stil der eingebauten Symbolleiste passen.
- Die Prop `variantBtn` wird aus Gründen der Abwärtskompatibilität weiterhin an jede Symbolleisten-Komponente übergeben — Komponenten, die vor der geteilten Konfiguration geschrieben wurden, funktionieren unverändert weiter.
- `inject('tiptapifyI18n')` liefert dieselbe Übersetzungsfunktion, die auch die eingebauten Schaltflächen verwenden.
