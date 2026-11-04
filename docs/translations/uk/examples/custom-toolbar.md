# Власна панель інструментів {#custom-toolbar}

## Показ окремих елементів {#showing-specific-items}

Використовуйте проп `items`, щоб показати лише потрібні кнопки панелі інструментів. Передайте масив назв елементів:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

Використовуйте `|` як роздільник між групами кнопок.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="Власна панель інструментів..." />

## Випадний список стилів списків {#list-styles-dropdown}

Суфікс `:styles` замінює кнопку списку випадним списком стилів маркерів/нумерації: кнопка списку відкриває сітку варіантів `list-style-type`, що зберігаються як inline-стиль. Сітка рендериться всередині поверхні меню скіну, тож відповідає активному скіну ([посібник зі скінів](/uk/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="Відкрийте випадні списки стилів списків..." />

## Виключення елементів {#excluding-items}

Використовуйте `items-exclude` разом з `items`, щоб показати більшість елементів панелі інструментів, виключивши окремі:

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
placeholder="Виключення небажаних елементів..." />

## Власні секції {#custom-sections}

Згрупуйте елементи у власні іменовані секції за допомогою об'єкта:

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
placeholder="Панель інструментів з власними секціями..." />

## Довідник секцій панелі інструментів {#toolbar-sections-reference}

Елементи панелі інструментів поділено на секції. Ось усі доступні секції:

| Секція         | Елементи                                                                                |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## Приховування панелі інструментів {#hiding-the-toolbar}

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
placeholder="Без панелі інструментів..." />

## Власні компоненти панелі інструментів {#custom-toolbar-components}

Додавайте власні кнопки через проп `customExtensions`. Кожен запис — це [секція панелі інструментів](/uk/api/types#section): використайте назву вбудованої секції (`misc`, `media`, …), щоб додати свої кнопки до наявної групи, або нову назву для окремої групи, що рендериться після вбудованих секцій:

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

Власні компоненти рендеряться всередині `<Tiptapify>`, тож мають доступ до тих самих спільних значень, що й вбудовані кнопки — редактора, перекладів і конфігурації рівня редактора:

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

- `useTiptapifyConfig()` повертає конфігурацію рівня редактора (`variantBtn`, `variantField`), тож власні компоненти автоматично відповідають стилю вбудованої панелі інструментів.
- Проп `variantBtn` і далі передається кожному компоненту панелі інструментів для зворотної сумісності — компоненти, написані до появи спільної конфігурації, працюють без змін.
- `inject('tiptapifyI18n')` дає ту саму функцію перекладу, яку використовують вбудовані кнопки.
