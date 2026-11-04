# Skins {#skins}

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

ה-prop‏ `skin` בוחר את המראה של מעטפת העורך: סרגל הכלים, תפריטי הבועה, הרשימות הנפתחות והדיאלוגים.
התכונות פועלות באותו אופן בכל skin. המושגים, טבלת הטוקנים והמתכונים נמצאים ב[מדריך ה-Skins](/he/guide/skins).

## קלאסי (ברירת מחדל) {#classic-default}

סרגל כלים מורם, קבוצות כפתורים כקופסאות מורמות, תפריטי בועה בסגנון כרטיס:

<InteractiveEditor :bubble-menu="true" placeholder="skin קלאסי..." />

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

סרגל כלים שטוח בגוון עדין מתחת לקו דק, כפתורי רפאים עם מצב לחוץ ניטרלי, תפריטים נפתחים קלים:

<InteractiveEditor editor-skin="pastel" :bubble-menu="true" placeholder="skin פסטל..." />

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

## מותאם אישית: mint {#custom-mint}

`registerSkin` מוסיף שם לרישום. ה-skin הזה מרחיב את `pastel` ועוקף קומץ טוקנים: גוון מנטה על רקע סרגל הכלים, וירוק עמוק למתאר התמונה ולידיות שינוי הגודל. הצורה השקטה עוברת בירושה מ-pastel; כל מה שלא נעקף (מצבי כפתורים, תפריטים, דיאלוגים) שומר את ערכי pastel:

<InteractiveEditor editor-skin="mint" :bubble-menu="true" placeholder="skin מנטה..." />

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

לשורש העורך יש את המחלקה `tiptapify-skin-mint` — פתח מילוט למידות שקטלוג הטוקנים אינו מכסה (ראו [פתח מילוט](/he/guide/skins#escape-hatch-the-root-class)).

## Skin מוטבע {#inline-skin}

ה-prop‏ `skin` מקבל גם אובייקט: עקיפות טוקנים ודגלי צורה, עם ירושה מ-skin רשום דרך `extends`. הוא נפתר באותה שרשרת, אינו נכנס לרישום, ומוצג תחת המחלקה `tiptapify-skin-inline` (או `tiptapify-skin-{name}` כשלאובייקט יש `name`); הטוקנים שלו נוחתים כמשתני CSS מסוג `--tf-*` על שורש העורך.

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
