<script setup>
</script>

# Tiptapify {#tiptapify}

**עורך טקסט עשיר Tiptap 3 עבור Vue 3, עם סרגל כלים ב-Vuetify 3**

::: info סטטוס בטא
הפרויקט נמצא כעת בשלב **בטא**. הוא שלם מבחינת התכונות, אך עדיין ייתכנו בו באגים שיש לתקן.
:::

## תכונות {#features}

<div class="features-grid">
  <div class="feature">
    <h3>רכיבי Vuetify 3</h3>
    <p>סרגל כלים יפה בסגנון Material Design, שנבנה כולו מרכיבי Vuetify 3</p>
  </div>
  <div class="feature">
    <h3>יותר מ-30 תוספים</h3>
    <p>עיצוב טקסט עשיר, הטמעת מדיה, טבלאות, בלוקי קוד עם הדגשת תחביר</p>
  </div>
  <div class="feature">
    <h3>פקודות לוכסן</h3>
    <p>הקלידו <code>/</code> כדי להפעיל תפריט הוספה מהירה של כותרות, רשימות, מדיה ועוד</p>
  </div>
  <div class="feature">
    <h3>בינאום</h3>
    <p>יותר מ-20 שפות נתמכות דרך vue-i18n</p>
  </div>
  <div class="feature">
    <h3>ערכת נושא כהה</h3>
    <p>תמיכה אוטומטית במצב כהה/בהיר, המשתלבת עם ערכת הנושא של Vuetify</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>תמיכה מלאה ב-TypeScript, עם טיפוסים מיוצאים לכל פריטי סרגל הכלים וה-props</p>
  </div>
</div>

## התחלה מהירה {#quick-start}

```bash
npm i tiptapify
# or
pnpm i tiptapify
```

```vue
<script setup lang="ts">
const handleEditorReady = (options) => {
  console.log('HTML:', options.getHTML())
  console.log('JSON:', options.getJSON())
}
</script>

<template>
  <Tiptapify
    placeholder="Start writing..."
    @editor-ready="handleEditorReady"
  />
</template>
```

::: tip תלויות Peer
Tiptapify דורש **Vue 3.x**, **Vuetify 3.x או 4.x**, **vue-i18n 11+** ו-**@mdi/js** כתלויות peer. ראו את [מדריך ההתקנה](/he/guide/installation) להגדרה המלאה.
:::

## רישיון {#license}

MIT — [מאגר GitHub](https://github.com/IVoyt/tiptapify)

<style scoped>
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature {
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

html.dark .feature h3 {
  color: #9dacff;
}

:root.dark .feature h3,
.VPTheme.dark .feature h3 {
  color: var(--vp-c-brand-2, #9dacff);
}

.feature p {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}
</style>
