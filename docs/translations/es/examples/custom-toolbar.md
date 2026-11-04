# Barra de herramientas personalizada {#custom-toolbar}

## Mostrar elementos concretos {#showing-specific-items}

Usa la prop `items` para mostrar solo los botones de la barra de herramientas que necesitas. Pasa un array con los nombres de los elementos:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Usa `|` como separador entre grupos de botones.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Barra de herramientas personalizada..." />

## Desplegable de estilos de lista {#list-styles-dropdown}

El sufijo `:styles` cambia un botón de lista por su desplegable de estilos de viñeta y numeración: el botón de lista abre una cuadrícula de opciones de `list-style-type`, que se guardan como estilo en línea. La cuadrícula se renderiza dentro de la superficie de menú del skin, así que sigue el skin activo ([guía de Skins](/es/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Abre los desplegables de estilos de lista..." />

## Excluir elementos {#excluding-items}

Usa `items-exclude` junto con `items` para mostrar casi todos los elementos de la barra de herramientas y excluir solo algunos:

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
placeholder="Excluyendo los elementos no deseados..." />

## Secciones personalizadas {#custom-sections}

Agrupa los elementos en tus propias secciones con nombre mediante un objeto:

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
placeholder="Barra de herramientas con secciones personalizadas..." />

## Referencia de secciones de la barra de herramientas {#toolbar-sections-reference}

Los elementos de la barra de herramientas se organizan en secciones. Estas son todas las secciones disponibles:

| Sección        | Elementos                                                                               |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Ocultar la barra de herramientas {#hiding-the-toolbar}

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
placeholder="Sin barra de herramientas..." />

## Componentes de barra de herramientas personalizados {#custom-toolbar-components}

Añade tus propios botones con la prop `customExtensions`. Cada entrada es una [sección de la barra de herramientas](/es/api/types#section): usa el nombre de una sección integrada (`misc`, `media`, …) para fusionar tus botones en un grupo existente, o un nombre nuevo para un grupo independiente que se renderiza después de las secciones integradas:

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

Los componentes personalizados se renderizan dentro de `<Tiptapify>`, por lo que tienen acceso a los mismos valores compartidos que usan los botones integrados: el editor, las traducciones y la configuración a nivel de editor:

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

- `useTiptapifyConfig()` devuelve la configuración a nivel de editor (`variantBtn`, `variantField`), de modo que los componentes personalizados coinciden automáticamente con el estilo de la barra de herramientas integrada.
- La prop `variantBtn` se sigue pasando a todos los componentes de la barra de herramientas por compatibilidad con versiones anteriores: los componentes escritos antes de la configuración compartida siguen funcionando sin cambios.
- `inject('tiptapifyI18n')` proporciona la misma función de traducción que usan los botones integrados.
