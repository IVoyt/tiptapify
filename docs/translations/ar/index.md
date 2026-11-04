<script setup>
</script>

# Tiptapify {#tiptapify}

**محرر نصوص منسقة Tiptap 3 لتطبيقات Vue 3 مع شريط أدوات مبني على Vuetify 3**

::: info حالة النسخة التجريبية
المشروع حاليًا في مرحلة **Beta**. ميزاته مكتملة، لكن قد تبقى فيه بعض الأخطاء التي تحتاج إلى إصلاح.
:::

## المميزات {#features}

<div class="features-grid">
  <div class="feature">
    <h3>مكونات Vuetify 3</h3>
    <p>شريط أدوات أنيق بتصميم Material Design مبني بالكامل من مكونات Vuetify 3</p>
  </div>
  <div class="feature">
    <h3>أكثر من 30 امتدادًا</h3>
    <p>تنسيق النصوص، وتضمين الوسائط، والجداول، وكتل الشيفرة مع تلوين الصيغة</p>
  </div>
  <div class="feature">
    <h3>أوامر الشرطة المائلة</h3>
    <p>اكتب <code>/</code> لفتح قائمة الإدراج السريع للعناوين والقوائم والوسائط وغيرها</p>
  </div>
  <div class="feature">
    <h3>التدويل</h3>
    <p>دعم أكثر من 20 لغة عبر vue-i18n</p>
  </div>
  <div class="feature">
    <h3>السمة الداكنة</h3>
    <p>دعم تلقائي للوضعين الداكن والفاتح يتكامل مع سمة Vuetify في مشروعك</p>
  </div>
  <div class="feature">
    <h3>TypeScript</h3>
    <p>دعم كامل لـ TypeScript مع أنواع مصدّرة لجميع عناصر شريط الأدوات والخصائص</p>
  </div>
</div>

## البدء السريع {#quick-start}

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

::: tip الاعتماديات المطلوبة
يتطلب Tiptapify وجود **Vue 3.x** و**Vuetify 3.x أو 4.x** و**vue-i18n 11+** و**@mdi/js** كاعتماديات نظيرة (peer dependencies). راجع [دليل التثبيت](/ar/guide/installation) للاطلاع على الإعداد الكامل.
:::

## الترخيص {#license}

MIT — [مستودع GitHub](https://github.com/IVoyt/tiptapify)

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
