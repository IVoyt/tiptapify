# Barre d'outils personnalisée {#custom-toolbar}

## Afficher des éléments précis {#showing-specific-items}

Utilisez la prop `items` pour n'afficher que les boutons dont vous avez besoin. Transmettez un tableau de noms d'éléments :

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Utilisez `|` comme séparateur entre les groupes de boutons.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Barre d'outils personnalisée..." />

## Liste déroulante des styles de liste {#list-styles-dropdown}

Le suffixe `:styles` remplace un bouton de liste par sa liste déroulante de styles de puces/numérotation : le bouton de liste ouvre une grille d'options `list-style-type`, enregistrées sous forme de style en ligne. La grille s'affiche dans la surface de menu du thème, et suit donc le thème actif ([guide des thèmes](/fr/guide/skins)) :

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Ouvrez les listes déroulantes de styles de liste..." />

## Exclure des éléments {#excluding-items}

Utilisez `items-exclude` avec `items` pour afficher la plupart des éléments de la barre d'outils en excluant certains d'entre eux :

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
placeholder="Exclusion des éléments indésirables..." />

## Sections personnalisées {#custom-sections}

Regroupez les éléments dans vos propres sections nommées à l'aide d'un objet :

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
placeholder="Barre d'outils à sections personnalisées..." />

## Référence des sections de la barre d'outils {#toolbar-sections-reference}

Les éléments de la barre d'outils sont organisés en sections. Voici toutes les sections disponibles :

| Section        | Éléments                                                                                |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Masquer la barre d'outils {#hiding-the-toolbar}

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
placeholder="Pas de barre d'outils..." />

## Composants de barre d'outils personnalisés {#custom-toolbar-components}

Ajoutez vos propres boutons avec la prop `customExtensions`. Chaque entrée est une [section de la barre d'outils](/fr/api/types#section) — utilisez le nom d'une section intégrée (`misc`, `media`, …) pour fusionner vos boutons dans un groupe existant, ou un nouveau nom pour un groupe distinct affiché après les sections intégrées :

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

Les composants personnalisés sont affichés à l'intérieur de `<Tiptapify>` ; ils ont donc accès aux mêmes valeurs partagées que les boutons intégrés — l'éditeur, les traductions et la configuration au niveau de l'éditeur :

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

- `useTiptapifyConfig()` renvoie la configuration au niveau de l'éditeur (`variantBtn`, `variantField`), de sorte que les composants personnalisés s'accordent automatiquement au style de la barre d'outils intégrée.
- La prop `variantBtn` est toujours transmise à chaque composant de la barre d'outils par souci de rétrocompatibilité — les composants écrits avant la configuration partagée continuent de fonctionner sans changement.
- `inject('tiptapifyI18n')` fournit la même fonction de traduction que celle utilisée par les boutons intégrés.
