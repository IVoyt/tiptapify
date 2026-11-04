# Barra de ferramentas personalizada {#custom-toolbar}

## Exibindo itens específicos {#showing-specific-items}

Use a prop `items` para exibir apenas os botões da barra de ferramentas de que você precisa. Passe um array com os nomes dos itens:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Use `|` como separador entre grupos de botões.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Barra de ferramentas personalizada..." />

## Lista suspensa de estilos de lista {#list-styles-dropdown}

O sufixo `:styles` troca um botão de lista pela lista suspensa de estilos de marcador/numeração: o botão de lista abre uma grade de opções de `list-style-type`, salvas como estilo inline. A grade é renderizada dentro da superfície de menu da skin, portanto segue a skin ativa ([guia de Skins](/pt-br/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Abra as listas suspensas de estilos de lista..." />

## Excluindo itens {#excluding-items}

Use `items-exclude` junto com `items` para mostrar quase todos os itens da barra de ferramentas, excluindo apenas alguns específicos:

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
placeholder="Excluindo itens indesejados..." />

## Seções personalizadas {#custom-sections}

Agrupe os itens em suas próprias seções nomeadas usando um objeto:

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
placeholder="Barra de ferramentas com seções personalizadas..." />

## Referência das seções da barra de ferramentas {#toolbar-sections-reference}

Os itens da barra de ferramentas são organizados em seções. Estas são todas as seções disponíveis:

| Seção          | Itens                                                                                   |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Ocultando a barra de ferramentas {#hiding-the-toolbar}

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
placeholder="Sem barra de ferramentas..." />

## Componentes personalizados da barra de ferramentas {#custom-toolbar-components}

Adicione seus próprios botões com a prop `customExtensions`. Cada entrada é uma [seção da barra de ferramentas](/pt-br/api/types#section) — use o nome de uma seção nativa (`misc`, `media`, …) para mesclar seus botões em um grupo existente, ou um novo nome para um grupo separado, renderizado após as seções nativas:

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

Os componentes personalizados são renderizados dentro de `<Tiptapify>`, então têm acesso aos mesmos valores compartilhados que os botões nativos usam — editor, traduções e a configuração em nível de editor:

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

- `useTiptapifyConfig()` retorna a configuração em nível de editor (`variantBtn`, `variantField`), de modo que os componentes personalizados acompanham automaticamente o estilo da barra de ferramentas nativa.
- A prop `variantBtn` ainda é passada a todos os componentes da barra de ferramentas por retrocompatibilidade — componentes escritos antes da configuração compartilhada continuam funcionando sem alterações.
- `inject('tiptapifyI18n')` fornece a mesma função de tradução que os botões nativos usam.
