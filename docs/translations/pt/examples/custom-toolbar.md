# Barra de ferramentas personalizada {#custom-toolbar}

## Mostrar itens específicos {#showing-specific-items}

Utilize a prop `items` para apresentar apenas os botões da barra de ferramentas de que precisa. Passe um array com os nomes dos itens:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Utilize `|` como separador entre grupos de botões.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Barra de ferramentas personalizada..." />

## Menu pendente de estilos de lista {#list-styles-dropdown}

O sufixo `:styles` troca um botão de lista pelo respetivo menu pendente de estilos de marcadores/numeração: o botão de lista abre uma grelha de opções `list-style-type`, guardadas como estilo em linha. A grelha é apresentada dentro da superfície de menu da skin, pelo que acompanha a skin ativa ([guia de skins](/pt/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Abra os menus pendentes de estilos de lista..." />

## Excluir itens {#excluding-items}

Utilize `items-exclude` juntamente com `items` para mostrar a maioria dos itens da barra de ferramentas, excluindo alguns específicos:

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
placeholder="Excluir os itens indesejados..." />

## Secções personalizadas {#custom-sections}

Agrupe os itens em secções com nome próprio através de um objeto:

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
placeholder="Barra de ferramentas com secções personalizadas..." />

## Referência das secções da barra de ferramentas {#toolbar-sections-reference}

Os itens da barra de ferramentas estão organizados em secções. Eis todas as secções disponíveis:

| Secção         | Itens                                                                                   |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Ocultar a barra de ferramentas {#hiding-the-toolbar}

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

Adicione os seus próprios botões com a prop `customExtensions`. Cada entrada é uma [secção da barra de ferramentas](/pt/api/types#section) — utilize o nome de uma secção integrada (`misc`, `media`, …) para integrar os seus botões num grupo existente, ou um novo nome para um grupo separado, apresentado depois das secções integradas:

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

Os componentes personalizados são renderizados dentro de `<Tiptapify>`, por isso têm acesso aos mesmos valores partilhados que os botões integrados utilizam — o editor, as traduções e a configuração ao nível do editor:

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

- `useTiptapifyConfig()` devolve a configuração ao nível do editor (`variantBtn`, `variantField`), pelo que os componentes personalizados acompanham automaticamente o estilo da barra de ferramentas integrada.
- A prop `variantBtn` continua a ser passada a todos os componentes da barra de ferramentas por retrocompatibilidade — os componentes escritos antes da configuração partilhada continuam a funcionar sem alterações.
- `inject('tiptapifyI18n')` fornece a mesma função de tradução que os botões integrados utilizam.
