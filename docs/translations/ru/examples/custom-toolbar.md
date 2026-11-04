# Своя панель инструментов {#custom-toolbar}

## Показ отдельных элементов {#showing-specific-items}

Используйте prop `items`, чтобы показать только нужные кнопки панели инструментов. Передайте массив имён элементов:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Используйте `|` как разделитель между группами кнопок.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Своя панель инструментов..." />

## Выпадающий список стилей списка {#list-styles-dropdown}

Суффикс `:styles` заменяет кнопку списка выпадающим списком стилей маркеров и нумерации: кнопка списка открывает сетку вариантов `list-style-type`, которые сохраняются как инлайновый стиль. Сетка отображается на поверхности меню скина, поэтому следует активному скину ([руководство по скинам](/ru/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Откройте выпадающие списки стилей списков..." />

## Исключение элементов {#excluding-items}

Используйте `items-exclude` вместе с `items`, чтобы показать почти все элементы панели инструментов, исключив только некоторые:

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
placeholder="Исключаем ненужные элементы..." />

## Свои секции {#custom-sections}

Сгруппируйте элементы в собственные именованные секции с помощью объекта:

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
placeholder="Панель инструментов со своими секциями..." />

## Справочник секций панели инструментов {#toolbar-sections-reference}

Элементы панели инструментов организованы в секции. Вот все доступные секции:

| Секция         | Элементы                                                                                |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Скрытие панели инструментов {#hiding-the-toolbar}

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
placeholder="Без панели инструментов..." />

## Свои компоненты панели инструментов {#custom-toolbar-components}

Добавляйте собственные кнопки через prop `customExtensions`. Каждая запись — это [секция панели инструментов](/ru/api/types#section): используйте имя встроенной секции (`misc`, `media`, …), чтобы добавить кнопки в существующую группу, или новое имя для отдельной группы, которая отображается после встроенных секций:

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

Пользовательские компоненты отображаются внутри `<Tiptapify>`, поэтому им доступны те же общие значения, что и встроенным кнопкам: редактор, переводы и конфигурация уровня редактора:

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

- `useTiptapifyConfig()` возвращает конфигурацию уровня редактора (`variantBtn`, `variantField`), поэтому пользовательские компоненты автоматически совпадают по стилю со встроенной панелью инструментов.
- Prop `variantBtn` по-прежнему передаётся каждому компоненту панели инструментов для обратной совместимости — компоненты, написанные до появления общей конфигурации, продолжают работать без изменений.
- `inject('tiptapifyI18n')` даёт ту же функцию перевода, которую используют встроенные кнопки.
