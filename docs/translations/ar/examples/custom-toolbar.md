# شريط أدوات مخصص {#custom-toolbar}

## إظهار عناصر محددة {#showing-specific-items}

استخدم الخاصية `items` لعرض أزرار شريط الأدوات التي تحتاجها فقط. مرّر مصفوفة بأسماء العناصر:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']"
    placeholder="Custom toolbar..."
  />
</template>
```

استخدم `|` كفاصل بين مجموعات الأزرار.

<InteractiveEditor :items="['bold', 'italic', 'underline', '|', 'heading', 'bulletList', 'orderedList', '|', 'link', 'image', '|', 'undo', 'redo']" placeholder="شريط أدوات مخصص..." />

## قائمة أنماط القوائم المنسدلة {#list-styles-dropdown}

تستبدل اللاحقة `:styles` زر القائمة بقائمة منسدلة لأنماط العلامات/الترقيم: يفتح زر القائمة شبكة من خيارات `list-style-type` تُحفظ كنمط مضمّن في السطر. تُعرض الشبكة داخل سطح قائمة السمة، لذا تتبع السمة النشطة ([دليل السمات](/ar/guide/skins)):

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']"
    placeholder="Open the list styles dropdowns..."
  />
</template>
```

<InteractiveEditor :items="['bold', 'italic', '|', 'bulletList:styles', 'orderedList:styles', '|', 'undo', 'redo']" placeholder="افتح قوائم أنماط القوائم المنسدلة..." />

## استبعاد عناصر {#excluding-items}

استخدم `items-exclude` مع `items` لإظهار معظم عناصر شريط الأدوات واستبعاد عناصر محددة:

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
placeholder="استبعاد العناصر غير المرغوبة..." />

## أقسام مخصصة {#custom-sections}

جمّع العناصر في أقسام باسمك الخاص باستخدام كائن:

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
placeholder="شريط أدوات بأقسام مخصصة..." />

## مرجع أقسام شريط الأدوات {#toolbar-sections-reference}

تُنظَّم عناصر شريط الأدوات في أقسام. فيما يلي جميع الأقسام المتاحة:

| القسم          | العناصر                                                                                 |
|----------------|-----------------------------------------------------------------------------------------|
| `actions`      | `undo`, `redo`                                                                          |
| `format`       | `bold`, `italic`, `underline`, `strike`                                                 |
| `formatExtra`  | `sup`, `sub`, `code`, `codeBlock`, `blockquote`                                         |
| `style`        | `heading`, `fontFamily`, `fontSize`, `lineHeight`, `textColor`, `highlightColor`        |
| `alignment`    | `left`, `center`, `right`, `justify`                                                    |
| `list`         | `bulletList`, `orderedList`, `taskList`, `indent`, `outdent`                            |
| `media`        | `link`, `image`, `video`, `iframe`, `emoji`, `charmap`, `table`                         |
| `misc`         | `line`, `pagebreak`, `source`, `preview`, `fullscreen`, `formatClear`, `invisibleChar`  |

## إخفاء شريط الأدوات {#hiding-the-toolbar}

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
placeholder="بدون شريط أدوات..." />

## مكونات شريط أدوات مخصصة {#custom-toolbar-components}

أضف أزرارك الخاصة عبر الخاصية `customExtensions`. كل عنصر فيها هو [قسم من أقسام شريط الأدوات](/ar/api/types#section) — استخدم اسم قسم مدمج (`misc` أو `media` أو …) لدمج أزرارك في مجموعة موجودة، أو اسمًا جديدًا لمجموعة منفصلة تُعرض بعد الأقسام المدمجة:

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

تُعرض المكونات المخصصة داخل `<Tiptapify>`، لذا يمكنها الوصول إلى القيم المشتركة نفسها التي تستخدمها الأزرار المدمجة — المحرر والترجمات وإعدادات مستوى المحرر:

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

- تُرجع `useTiptapifyConfig()` إعدادات مستوى المحرر (`variantBtn` و`variantField`)، فتتطابق المكونات المخصصة تلقائيًا مع نمط شريط الأدوات المدمج.
- لا تزال الخاصية `variantBtn` تُمرَّر إلى كل مكون في شريط الأدوات للتوافق مع الإصدارات السابقة — فالمكونات المكتوبة قبل الإعدادات المشتركة تستمر في العمل دون تغيير.
- تعطيك `inject('tiptapifyI18n')` دالة الترجمة نفسها التي تستخدمها الأزرار المدمجة.
