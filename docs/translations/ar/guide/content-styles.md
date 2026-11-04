# أنماط المحتوى {#content-styles}

بعض ما يحفظه المحرر يحتاج إلى مظهر خاص به في الصفحة التي تعرضه: بطاقات الروابط، والصور مع تعليقها وطفوها، والفيديوهات والمحتوى المضمّن الذي يلائم عرض النص، وقوائم المهام التي بجانب كل عنصر فيها خانة اختيار. وبدونه تصبح بطاقة الرابط رابطًا عاديًا تتداخل فيه الصورة مع النصوص.

تحدد الخاصية `contentStyles` كيف يحمل HTML المحفوظ هذا المظهر:

| `contentStyles` | HTML المحفوظ | في الموقع |
|---|---|---|
| `inline` (الافتراضي) | يُكتب المظهر داخل سمات `style` لهذه العناصر | لا شيء لتحميله: يظهر HTML كما هو |
| `classes` | فئات وسمات `data-` فقط | حمّل `tiptapify/content.css` وضع HTML داخل عنصر له الفئة `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

كلاهما يحمل القواعد نفسها، وهي التي يعرض بها المحرر المحتوى، فتبدو الصفحة مثل المحرر في الحالتين. هذه القواعد تُطبَّق على هذه العناصر فقط: العناوين والفقرات والقوائم والجداول وبقية النص تحتفظ بأنماط الموقع نفسه.

## الأنماط المضمّنة {#inline-styles}

هو الخيار الافتراضي. تُحفظ بطاقة الرابط المدمجة هكذا:

```html
<a class="tiptapify-link-card" data-link-card="compact" href="https://example.com/blog/getting-started" target="_blank" rel="noopener noreferrer" style="display: flex; flex-wrap: wrap; overflow: hidden; margin: 1rem 0; border: 1px solid rgba(128, 128, 128, 0.35); border-radius: 10px; color: inherit; text-decoration: none;">
  <img class="tiptapify-link-card__image" src="https://example.com/images/getting-started.png" alt="" style="flex: 1 1 180px; min-width: 0; max-width: 100%; min-height: 100px; margin: 0; object-fit: cover;">
  <span class="tiptapify-link-card__body" style="display: flex; flex: 999 1 260px; flex-direction: column; gap: 4px; min-width: 0; padding: 12px 16px;">
    <span class="tiptapify-link-card__site" style="font-size: 0.8125em; opacity: 0.7;">Example</span>
    <span class="tiptapify-link-card__title" style="font-weight: 600; line-height: 1.35;">Getting started</span>
    <span class="tiptapify-link-card__description" style="display: -webkit-box; overflow: hidden; font-size: 0.875em; line-height: 1.45; opacity: 0.7; -webkit-box-orient: vertical; -webkit-line-clamp: 3;">Install the package and create your first page.</span>
  </span>
</a>
```

- **الألوان تبقى للموقع.** يرث النص لونه؛ والنص الخافت والحدود يستخدمان الشفافية ورماديًا نصف شفاف، فتعمل على الصفحة الفاتحة والداكنة معًا. اضبط لون النص للسمة في الموقع كالمعتاد.
- **لا حاجة إلى media queries.** تضع البطاقة المدمجة صورتها فوق النصوص تلقائيًا في العمود الضيق؛ ولا يزيد عرض الفيديوهات والمحتوى المضمّن عن عرض النص.
- **يمكن للموقع إعادة تنسيقها**، فالفئات باقية. النمط المضمّن يتغلب على قاعدة الفئة، لذلك تحتاج مثل هذه القاعدة إلى `!important`.
- **يجب أن تُبقي أداة التعقيم (sanitizer) سمة `style`** على هذه العناصر، وإلا فقدت مظهرها.

## الفئات و content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

ملف `content.css` صغير ولا يحتوي على Vue ولا Vuetify. قواعده ملفوفة في `:where(.tiptapify-content)`، فلا وزن لها: أي قاعدة في الموقع تتغلب عليها دون `!important`. استخدمه عندما يريد الموقع المظهر في مكان واحد، أو ينسّق محتواه بنفسه.

تعطي `contentCss(scope)` ورقة الأنماط نفسها كنص، لفئة غير `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## تحميل HTML مرة أخرى {#loading-html-back}

يقرأ المحرر هذه العناصر من سماتها وفئاتها فقط: بطاقة الرابط من `data-link-card`، والصورة من `src` وحجمها وطفوها، والمهمة من `data-checked`. أما أنماطها المضمّنة فتُتجاهل عند تحميل HTML، وتُكتب من جديد عند الحفظ. لذلك يذهب HTML نفسه ويعود دون تغيير: المستند المحفوظ بـ `inline` يُحمَّل بسلاسة مع `classes` والعكس، وتُحدّث نسخة لاحقة من المحرر مظهر المستند عند حفظه في المرة التالية.

تنسيق النص لا يُمَس: لون النص أو حجمه ومحاذاة الفقرة هي محتوى، ويواصل المحرر قراءتها من أنماطها.

لتحويل HTML القائم على الفئات إلى HTML بأنماط مضمّنة خارج المحرر (مستند قديم، بريد إلكتروني) استخدم `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

تحتاج إلى DOM (متصفح، أو jsdom على الخادم) وبدونه تعيد HTML كما هو.

## عارضات الصور {#image-sliders}

يعلّم المحرر الصور المتتالية في صف على أنها عارضة صور أثناء الكتابة (انظر الخاصية `imageSlider`)؛ ويحفظها HTML المحفوظ كأشكال (figures) واحدًا بعد الآخر. أما عرضها كعارضة فمتروك لسكربت الموقع نفسه.
