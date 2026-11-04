# أوامر الشرطة المائلة {#slash-commands}

توفّر أوامر الشرطة المائلة قائمة إدراج سريع تظهر عند كتابة `/` في بداية السطر.

## تفعيل أوامر الشرطة المائلة {#enabling-slash-commands}

أوامر الشرطة المائلة مفعّلة افتراضيًا. للتحكم بها صراحةً:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="عرض أوامر الشرطة المائلة..."
:slash-commands="true"
/>

## الأوامر المتاحة {#available-commands}

اكتب `/` في المحرر لعرض لوحة الأوامر. تشمل الأوامر المتاحة:

| الأمر           | الوصف                              |
|-----------------|------------------------------------|
| `/h1` - `/h6`   | إدراج عنوان (المستويات 1-6)        |
| `/bulletList`   | إدراج قائمة نقطية                  |
| `/numberedList` | إدراج قائمة مرقّمة                 |
| `/taskList`     | إدراج قائمة مهام                   |
| `/code`         | إدراج شيفرة مضمّنة في السطر        |
| `/codeBlock`    | إدراج كتلة شيفرة                   |
| `/quote`        | إدراج اقتباس                       |
| `/image`        | إدراج صورة (يفتح نافذة الرابط)     |
| `/video`        | تضمين فيديو YouTube                |
| `/table`        | إدراج جدول                         |
| `/link`         | إدراج رابط تشعبي                   |
| `/divider`      | إدراج خط أفقي                      |
| `/emoji`        | فتح منتقي الرموز التعبيرية         |
| `/specialChars` | فتح الأحرف الخاصة                  |

## كيف تعمل {#how-it-works}

1. ضع المؤشر في بداية السطر أو بعد مسافة
2. اكتب `/` — تظهر لوحة الأوامر
3. تابع الكتابة لتصفية الأوامر
4. اضغط `Enter` أو انقر لإدراج الأمر المحدد

## تعطيل أوامر الشرطة المائلة {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## أوامر الشرطة المائلة مع القائمة العائمة {#slash-commands-with-floating-menu}

اجمع بين أوامر الشرطة المائلة والقائمة العائمة للحصول على أفضل تجربة تحرير:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    :floating-menu="true"
    :bubble-menu="true"
    placeholder="Full command experience..."
  />
</template>
```

- **أوامر الشرطة المائلة** (`/`) — تُفعَّل بكتابة `/` في بداية السطر
- **القائمة العائمة** — تظهر عند وضع المؤشر على سطر فارغ (وتقدّم إجراءات على مستوى الكتل)
- **قائمة الفقاعة** — تظهر عند تحديد نص (وتقدّم تنسيقًا داخل السطر)

## تصفية الأوامر المتاحة {#filtering-available-commands}

يمكنك تحديد الأوامر التي تريد تضمينها بتمرير مصفوفة من معرّفات الأوامر:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### معرّفات الأوامر المتاحة {#available-command-ids}

| المعرّف         | الوصف                |
|----------------|----------------------|
| `h1` - `h6`    | مستويات العناوين 1-6 |
| `bulletList`   | قائمة نقطية          |
| `numberedList` | قائمة مرقّمة         |
| `taskList`     | قائمة مهام           |
| `code`         | شيفرة مضمّنة في السطر |
| `codeBlock`    | كتلة شيفرة           |
| `quote`        | اقتباس               |
| `image`        | صورة                 |
| `video`        | فيديو YouTube        |
| `table`        | جدول                 |
| `link`         | رابط                 |
| `divider`      | خط أفقي              |
| `emoji`        | رمز تعبيري           |
| `specialChars` | أحرف خاصة            |
