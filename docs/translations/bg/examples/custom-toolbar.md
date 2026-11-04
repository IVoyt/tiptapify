# Собствена лента с инструменти {#custom-toolbar}

## Показване на избрани елементи {#showing-specific-items}

Използвайте пропъртито `items`, за да покажете само нужните бутони. Подайте масив с имена на елементи:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Използвайте `|` като разделител между групите бутони.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Собствена лента..." />

## Падащо меню със стилове на списъци {#list-styles-dropdown}

Суфиксът `:styles` заменя бутона на списъка с падащо меню със стиловете на маркерите/номерацията: бутонът отваря мрежа от опции `list-style-type`, запазвани като вграден стил. Мрежата се рендира в повърхността на менюто на скина, затова следва активния скин ([ръководство за скиновете](/bg/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Отворете падащите менюта със стилове на списъци..." />

## Изключване на елементи {#excluding-items}

Използвайте `items-exclude` заедно с `items`, за да покажете повечето елементи на лентата, но да изключите определени:

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
placeholder="Изключване на ненужните елементи..." />

## Собствени секции {#custom-sections}

Групирайте елементите в собствени именувани секции чрез обект:

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
placeholder="Лента със собствени секции..." />

## Справочник на секциите на лентата {#toolbar-sections-reference}

Елементите на лентата са организирани в секции. Ето всички налични секции:

| Секция         | Елементи                                                                                |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Скриване на лентата {#hiding-the-toolbar}

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
placeholder="Без лента..." />

## Собствени компоненти на лентата {#custom-toolbar-components}

Добавяйте собствени бутони чрез пропъртито `customExtensions`. Всеки запис е [секция на лентата](/bg/api/types#section) — използвайте име на вградена секция (`misc`, `media`, …), за да влеете бутоните си в съществуваща група, или ново име за отделна група, рендирана след вградените секции:

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

Собствените компоненти се рендират вътре в `<Tiptapify>`, затова имат достъп до същите споделени стойности като вградените бутони — редактор, преводи и конфигурация на ниво редактор:

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

- `useTiptapifyConfig()` връща конфигурацията на ниво редактор (`variantBtn`, `variantField`), така че собствените компоненти автоматично съответстват на стила на вградената лента.
- Пропъртито `variantBtn` все още се подава на всеки компонент на лентата за обратна съвместимост — компонентите, писани преди споделената конфигурация, продължават да работят без промяна.
- `inject('tiptapifyI18n')` дава същата функция за превод, която ползват вградените бутони.
