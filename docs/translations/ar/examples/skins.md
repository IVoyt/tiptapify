# السمات {#skins}

<script setup>
import { registerSkin } from '@tiptapify'

registerSkin('mint', {
  extends: 'pastel',
  colors: {
    toolbarBg: 'rgba(0, 128, 0, 0.05)',
    handleBg: 'rgb(0, 100, 0)',
    handleBgHover: 'rgb(0, 128, 0)',
    imageOutline: '2px solid rgb(0, 100, 0)',
    imageOutlineHover: 'rgba(0, 100, 0, 0.35)',
  },
})
</script>

تحدد الخاصية `skin` مظهر واجهة المحرر: شريط الأدوات وقوائم الفقاعة والقوائم المنسدلة والنوافذ الحوارية.
تعمل الميزات بالطريقة نفسها في كل سمة. تجد المفاهيم وجدول الرموز (tokens) والوصفات في
[دليل السمات](/ar/guide/skins).

## Classic (الافتراضية) {#classic-default}

شريط أدوات بارز، ومجموعات أزرار على هيئة صناديق بارزة، وقوائم فقاعة بنمط البطاقات:

<InteractiveEditor :bubble-menu="true" placeholder="سمة Classic..." />

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>The classic look: a raised toolbar with raised button groups.</p>')
</script>

<template>
  <Tiptapify
    v-model="content"
    placeholder="Classic skin..."
  />
</template>
```

## Pastel {#pastel}

شريط أدوات مسطّح بلون خفيف أسفل خط رفيع، وأزرار شبحية بحالة ضغط محايدة، وقوائم منسدلة خفيفة:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="سمة Pastel..." />

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>The pastel look: a flat tinted toolbar with ghost buttons.</p>')
</script>

<template>
  <Tiptapify
    v-model="content"
    skin="pastel"
    placeholder="Pastel skin..."
  />
</template>
```

## سمة مخصصة: mint {#custom-mint}

تضيف `registerSkin` اسمًا إلى السجل. ترث هذه السمة من `pastel` وتعدّل عددًا قليلًا من الرموز: لونًا نعناعيًا لخلفية شريط الأدوات، وأخضر داكنًا لإطار الصورة ومقابض تغيير الحجم. يبقى الشكل الهادئ موروثًا من pastel، وكل ما لم يُعدَّل (حالات الأزرار والقوائم والنوافذ الحوارية) يحتفظ بقيم pastel:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="سمة Mint..." />

```ts
// main.ts — call once, before any editor mounts
import { registerSkin } from 'tiptapify'

registerSkin('mint', {
  extends: 'pastel',
  colors: {
    toolbarBg: 'rgba(0, 128, 0, 0.05)',
    handleBg: 'rgb(0, 100, 0)',
    handleBgHover: 'rgb(0, 128, 0)',
    imageOutline: '2px solid rgb(0, 100, 0)',
    imageOutlineHover: 'rgba(0, 100, 0, 0.35)',
  },
})
```

```vue
<template>
  <Tiptapify
    v-model="content"
    skin="mint"
    placeholder="Mint skin..."
  />
</template>
```

يحمل جذر المحرر الفئة `tiptapify-skin-mint` — وهي المخرج الاحتياطي للأبعاد التي لا يغطيها كتالوج الرموز (راجع [المخرج الاحتياطي](/ar/guide/skins#escape-hatch-the-root-class)).

## سمة مضمّنة {#inline-skin}

تقبل الخاصية `skin` أيضًا كائنًا: تعديلات على الرموز وأعلامًا للشكل، مع الوراثة من سمة مسجّلة عبر `extends`. تمر عبر سلسلة التحليل نفسها، ولا تدخل السجل أبدًا، وتُعرض بالفئة `tiptapify-skin-inline` (أو `tiptapify-skin-{name}` إذا حمل الكائن `name`)؛ وتظهر رموزها كمتغيرات CSS من نوع `--tf-*` على جذر المحرر.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>A pastel editor with a green-tinted toolbar.</p>')

const mintSkin = {
  extends: 'pastel',
  colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' },
}
</script>

<template>
  <Tiptapify
    v-model="content"
    :skin="mintSkin"
    placeholder="Inline skin..."
  />
</template>
```
