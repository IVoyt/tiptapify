# סרגל כלים מותאם אישית {#custom-toolbar}

## הצגת פריטים מסוימים {#showing-specific-items}

השתמשו ב-prop‏ `items` כדי להציג רק את כפתורי סרגל הכלים שאתם צריכים. מעבירים מערך של שמות פריטים:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

השתמשו ב-`|` כמפריד בין קבוצות כפתורים.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="סרגל כלים מותאם אישית..." />

## רשימה נפתחת של סגנונות רשימה {#list-styles-dropdown}

הסיומת `:styles` מחליפה כפתור רשימה ברשימה נפתחת של סגנונות הסימון/המספור שלו: כפתור הרשימה פותח רשת של אפשרויות `list-style-type`, שנשמרות כסגנון מוטבע. הרשת מוצגת בתוך משטח התפריט של ה-skin, ולכן היא עוקבת אחר ה-skin הפעיל ([מדריך ה-Skins](/he/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="פתחו את הרשימות הנפתחות של סגנונות הרשימה..." />

## החרגת פריטים {#excluding-items}

השתמשו ב-`items-exclude` יחד עם `items` כדי להציג את רוב פריטי סרגל הכלים ולהחריג פריטים מסוימים:

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
placeholder="החרגת פריטים לא רצויים..." />

## מקטעים מותאמים אישית {#custom-sections}

קבצו פריטים למקטעים בעלי שמות משלכם באמצעות אובייקט:

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
placeholder="סרגל כלים עם מקטעים מותאמים אישית..." />

## מדריך מקטעי סרגל הכלים {#toolbar-sections-reference}

פריטי סרגל הכלים מסודרים במקטעים. אלה כל המקטעים הזמינים:

| מקטע           | פריטים                                                                                  |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## הסתרת סרגל הכלים {#hiding-the-toolbar}

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
placeholder="בלי סרגל כלים..." />

## רכיבי סרגל כלים מותאמים אישית {#custom-toolbar-components}

הוסיפו כפתורים משלכם באמצעות ה-prop‏ `customExtensions`. כל רשומה היא [מקטע סרגל כלים](/he/api/types#section) — השתמשו בשם מקטע מובנה (`misc`, `media`, …) כדי למזג את הכפתורים שלכם לקבוצה קיימת, או בשם חדש לקבוצה נפרדת שמוצגת אחרי המקטעים המובנים:

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

רכיבים מותאמים אישית מוצגים בתוך `<Tiptapify>`, ולכן יש להם גישה לאותם ערכים משותפים שבהם משתמשים הכפתורים המובנים — העורך, התרגומים ותצורת העורך:

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

- `useTiptapifyConfig()` מחזיר את תצורת העורך (`variantBtn`, `variantField`), כך שרכיבים מותאמים אישית מתאימים אוטומטית לעיצוב של סרגל הכלים המובנה.
- ה-prop‏ `variantBtn` עדיין מועבר לכל רכיב בסרגל הכלים לצורך תאימות לאחור — רכיבים שנכתבו לפני התצורה המשותפת ממשיכים לעבוד ללא שינוי.
- `inject('tiptapifyI18n')` נותן את אותה פונקציית תרגום שבה משתמשים הכפתורים המובנים.
