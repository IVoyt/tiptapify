# الوسائط {#media}

## الصور {#images}

أدرج صورًا من رابط URL:

```vue
<script setup lang="ts">
const onEditorReady = (options) => {
  // Insert an image programmatically
  options.editor.commands.setImage({ src: 'https://picsum.photos/600/300' })
}
</script>

<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']"
    @editor-ready="onEditorReady"
  />
</template>
```

يفتح زر الصورة مربع حوار الصورة:

- **عبر URL** أو **رفع**. بدون [نقطة نهاية للرفع](/ar/guide/uploads) يُضمَّن الملف المختار كرابط بيانات base64؛ ومعها يُرسل الملف إلى خادمك.
- **نص بديل** (ينبّهك مربع الحوار عندما يكون فارغًا) و**تعليق** أسفل الصورة.
- **الحجم**: الأصلي، أو بعرض النص، أو عرض × ارتفاع مخصص مع قفل النسبة.
- **الموضع**: في المنتصف على سطر مستقل، أو عائمة يسار النص أو يمينه.

تحتوي الصورة المحددة على مقابض لتغيير الحجم (كل تغيير حجم يُعدّ خطوة تراجع واحدة) وشريط أدوات فوقها: عائمة لليسار أو لليمين، وتنزيل، وتعديل، وحذف. ويفتح النقر المزدوج مربع الحوار.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## الفيديو {#videos}

ضمّن فيديوهات YouTube وVimeo، أو ملف فيديو:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

يفتح زر الفيديو مربع حوار الفيديو:

- **رابط YouTube أو Vimeo** يتحول إلى مشغّلهما؛ ويعرض مربع الحوار المزوّد الذي تم التعرف عليه ومعاينة، و**البدء عند** (يُملأ مسبقًا من `?t=`) حيثما يدعمه المشغّل.
- **رابط ملف فيديو** (`.mp4` و`.m4v` و`.webm` و`.ogv` و`.ogg` و`.mov`) يتحول إلى `<video>` مع صورة غلاف وعناصر تحكم وتشغيل تلقائي (مكتوم الصوت) وتكرار. يحتاج الرابط إلى بروتوكوله (`https://` أو `http://`) أو `//host` أو `/path`: فمربع الحوار لا يخمّن أيًّا منها.
- **رفع** يرسل ملف فيديو إلى خادمك؛ ولا يظهر إلا مع [نقطة نهاية للرفع](/ar/guide/uploads).
- **الحجم**: متجاوب بنسبة 16:9، أو عرض × ارتفاع مخصص مع قفل النسبة.

كما يُضمَّن رابط YouTube الملصق في النص. ويؤدي النقر على المشغّل إلى تحديده بدل تشغيله، ليظهر زر شريط الأدوات الخاص به؛ ويفتح النقر المزدوج مربع الحوار.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="الصق رابط YouTube لتضمين فيديو..." />

## إطارات iframe {#iframes}

ضمّن صفحة عبر عنوانها أو عبر كود iframe من قائمة المشاركة أو التضمين فيها:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

يقرأ مربع حوار iframe الكود الملصق (العنوان والحجم والعنوان النصي والأذونات وsandbox والتحميل المؤجل وملء الشاشة) ويخبرك بما أخذه منه؛ ويُرفض الكود الذي يحتوي على سكربتات أو وسوم أخرى. يعرض معاينة، ويتضمن **عنوانًا لقارئات الشاشة**، والحجم (متجاوب بنسب الكود، أو مخصص مع قفل النسبة)، وتحت **متقدم** الاسم و`allow` و`sandbox` والتحميل المؤجل والإطار. يحتاج العنوان إلى `https://` أو `http://`. ويفتح النقر المزدوج على المحتوى المضمّن مربع الحوار.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="أدخل رابطًا لتضمينه كإطار iframe..." />

## الجداول {#tables}

أدرج الجداول وعدّلها:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

بعد إدراج جدول، يمكنك:
- إضافة صفوف وأعمدة أو إزالتها
- تحديد الخلايا
- حذف الجدول بالكامل

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="استخدم زر الجدول لإدراج جدول..." />

## الروابط {#links}

أدرج روابط تشعبية:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

يقبل مربع حوار الرابط العنوان كما يُكتب: `https://…` أو أي مخطط آخر (`ftp://` أو `ssh://` أو مخطط داخلي) أو `mailto:` أو `tel:` أو `#anchor` أو `/page`. ولا يضيف بروتوكولًا من تلقاء نفسه: فالعنوان بدون بروتوكول (`example.com` أو `internal.host:8080`) تظهر معه رقاقات لإضافة `https://` أو `http://` أو `ftp://`، ويبقى كما كُتب إن لم تضف شيئًا. وتُرفض العناوين التي تبدأ بـ `javascript:` أو `vbscript:` أو `data:`.

ويحتوي مربع الحوار أيضًا على نص الرابط، و**فتح في علامة تبويب جديدة** (الذي يضيف `noopener noreferrer`)، وتحت **متقدم** قيم `rel` على شكل رقاقات (أي قيمة: يضيفها Enter أو المسافة أو الفاصلة) وفئة CSS.

مع الخاصية [`linkPreview`](/ar/api/props#linkpreview) يعرض مربع الحوار نفسه الرابط كبطاقة بصورة الصفحة وعنوانها ووصفها، ويقترح الرابط الملصق في سطر فارغ الخيار **رابط / بطاقة** — راجع [بطاقات الروابط](/ar/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="حدّد نصًا وانقر على الرابط لإضافة رابط تشعبي..." />

## الرموز التعبيرية {#emoji}

أدرج رموزًا تعبيرية من المنتقي المدمج بعشر فئات:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

يتضمن منتقي الرموز التعبيرية حقل بحث/تصفية للعثور على رمز محدد بسرعة.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="انقر على زر الرموز التعبيرية لإدراج رمز..." />

## الأحرف الخاصة (Charmap) {#special-characters-charmap}

أدرج أحرفًا خاصة وأسهمًا وحروفًا يونانية ورموزًا رياضية وغيرها:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

تشمل الفئات:
- الأسهم
- العملات
- الحروف اليونانية
- الرموز الرياضية
- متنوعة

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="انقر على charmap لإدراج أحرف خاصة..." />

## الجمع بين أدوات الوسائط {#combining-media-tools}

شريط أدوات وسائط كامل الميزات:

```vue
<template>
  <Tiptapify
    :items="[
      'bold', 'italic', 'underline',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'undo', 'redo'
    ]"
    placeholder="Full media toolbar..."
  />
</template>
```

<InteractiveEditor :items="[
'bold', 'italic', 'underline',
'|',
'link', 'image', 'video', 'iframe',
'|',
'emoji', 'charmap', 'table',
'|',
'undo', 'redo'
]"
placeholder="شريط أدوات وسائط كامل..." />
