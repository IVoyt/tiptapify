# الخصائص {#props}

## خصائص `<Tiptapify>` {#tiptapify-props}

### `content` {#content}

- **النوع:** `String | Object`
- **الافتراضي:** `''`

المحتوى الأولي للمحرر. يقبل نص HTML أو كائن Tiptap JSON.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` هو المحتوى **الأولي** فقط؛ للربط ثنائي الاتجاه استخدم `v-model` (راجع `modelValue`).

### `modelValue` {#modelvalue}

- **النوع:** `String | Object`
- **الافتراضي:** `''`

قيمة الربط ثنائي الاتجاه لـ `v-model`. استخدم `v-model` لإبقاء قيمة تفاعلية متزامنة مع المحرر. مع كل تعديل يُصدر المكوّن الحدث `update:modelValue` بأحدث HTML، ويكتبه `v-model` في الـ ref الخاص بك. وعند استخدام `v-model` وحده (بدون `:content`) تكون القيمة المرتبطة هي المحتوى الأولي للمحرر.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>Hello, world!</p>')
</script>

<template>
  <Tiptapify v-model="content" placeholder="Write something..." />
</template>
```



### `placeholder` {#placeholder}

- **النوع:** `String`
- **الافتراضي:** `''`

النص الإرشادي الذي يظهر عندما يكون المحرر فارغًا.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **النوع:** `Number`
- **الافتراضي:** `null`

الحد الأدنى لارتفاع منطقة محتوى المحرر بالبكسل.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **النوع:** `Boolean`
- **الافتراضي:** `true`

إظهار شريط الأدوات أو إخفاؤه.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **النوع:** `Array<String> | Object`
- **الافتراضي:** `[]`

عناصر شريط الأدوات المراد عرضها. مرّر مصفوفة بأسماء العناصر أو كائنًا بأقسام مسمّاة. راجع [عناصر شريط الأدوات](/ar/api/toolbar-items).
في المصفوفة، يقسّم `'|'` العناصر إلى مجموعات (بهذا الترتيب، مهما كانت الأقسام التي تأتي منها الأزرار) ويدفع `'~'` العناصر التي بعده إلى نهاية شريط الأدوات. ومع المجموعات، يحجز الاسم الذي ليس عنصرًا مدمجًا مكانًا للزر المخصص بذلك الاسم من `customExtensions`؛ وبدون زر كهذا يُحذف المكان.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **النوع:** `Boolean`
- **الافتراضي:** `false`

عندما تكون `true`، تحدد الخاصية `items` العناصر التي سيتم **استبعادها** بدلًا من تضمينها.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **النوع:** `Boolean`
- **الافتراضي:** `true`

إظهار قائمة الفقاعة عند تحديد نص: صف واحد من أزرار الأيقونات في مجموعات — عريض، مائل، تسطير، شطب | رمز علوي، رمز سفلي | تمييز، شيفرة مضمّنة في السطر | رابط | مسح التنسيق. لكل زر تلميح يعرض اختصاره ويظهر مفعّلًا عندما يكون تنسيقه مطبقًا على التحديد. وتختفي القائمة عند تحديد كتلة (صورة، عنصر واجهة)، وداخل الشيفرة، وعند تحديد المستند كله.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **النوع:** `Boolean`
- **الافتراضي:** `true`

إظهار القائمة العائمة في الأسطر الفارغة: العنوان 1 والعنوان 2 وقائمة نقطية، في صف أزرار الأيقونات نفسه الخاص بقائمة الفقاعة.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **النوع:** `Boolean`
- **الافتراضي:** `true`

تفعيل قائمة أوامر الشرطة المائلة (اكتب `/` لفتحها).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **النوع:** `Boolean`
- **الافتراضي:** `true`

إظهار عدد الكلمات في تذييل المحرر.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **النوع:** `Boolean`
- **الافتراضي:** `true`

إظهار عدد الأحرف في تذييل المحرر.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **النوع:** `Number | null`
- **الافتراضي:** `null`

الحد الأقصى لعدد الأحرف المسموح به عبر امتداد Tiptap `CharacterCount`. اضبطها على `null` أو احذف الخاصية للإبقاء على التحرير دون حد. وعند ضبطها على قيمة أكبر من `0`، يعرض التذييل مؤشر تقدم دائريًا بصيغة SVG بعتبات مرمّزة بالألوان.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **النوع:** `String`
- **الافتراضي:** `'purple'`

اللون الافتراضي لمؤشر التقدم الدائري الذي يظهر في التذييل عند ضبط `limit`.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **النوع:** `String`
- **الافتراضي:** `'orange'`

لون مؤشر التقدم عندما يتجاوز الاستخدام 75% من الحد.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **النوع:** `String`
- **الافتراضي:** `'red'`

لون مؤشر التقدم عند بلوغ حد الأحرف.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **النوع:** `TiptapifyFooterAlignment`
- **الافتراضي:** `'end'`

محاذاة عناصر حالة التذييل. تقبل `'start'` أو `'center'` أو `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **النوع:** `Boolean | TiptapifyAiOptions`
- **الافتراضي:** `false`

يفعّل عنصر `ai` في شريط الأدوات. يبني المحرر طلب `/v1/chat/completions` متوافقًا مع OpenAI ويمرّره إلى `aiProvider`. استخدم دالة المزوّد لاستدعاء خادمك الخلفي أو BFF أو نقطة نهاية محمية بـ OAuth أو LM Studio أو غلاف SDK.

```vue
<script setup lang="ts">
const ai = {
  async aiProvider(request) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error('AI request failed')
    }

    return response.json()
  },
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

مثال على LLM محلي مع LM Studio:

```ts
const ai = {
  model: 'google/gemma-4-12b-qat',
  async aiProvider(request) {
    const response = await fetch('http://127.0.0.1:1234/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    return response.json()
  },
}
```

يُدعم الإخراج المتدفق بضبط `stream: true` ودفع الرموز عبر وسيط `stream` في `aiProvider`. يتحدث حقل النتيجة في مربع حوار الذكاء الاصطناعي مباشرةً أثناء وصول الأجزاء، ويلغي زر **إيقاف** الطلب الجاري:

```ts
const ai = {
  stream: true,
  async aiProvider(request, context, stream) {
    const response = await fetch('/api/chat/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal: stream?.signal,
    })

    if (!response.ok || !response.body) {
      throw new Error('AI request failed')
    }

    let content = ''
    let buffer = ''
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        if (!line.startsWith('data: ') || line === 'data: [DONE]') {
          continue
        }

        const { choices } = JSON.parse(line.slice(6))
        const delta = choices?.[0]?.delta ?? {}

        if (delta.reasoning_content) {
          stream?.onReasoning(delta.reasoning_content)
        }

        const chunk = delta.content ?? ''

        if (chunk) {
          content += chunk
          stream?.onChunk(chunk)
        }
      }
    }

    return { content }
  },
}
```

مرّر `stream.signal` إلى `fetch` (أو إلى استدعاء SDK) ليُلغى الطلب عندما ينقر المستخدم على **إيقاف** أو يغلق مربع الحوار. يبقى المحتوى المبثوث جزئيًا في حقل النتيجة ويمكن تطبيقه أو تجاهله. ويمكن للمزوّدين الذين لا يدعمون البث تجاهل وسيط `stream` تمامًا — فهو اختياري ومتوافق مع الإصدارات السابقة.

تبثّ نماذج الاستدلال (Qwen thinking وDeepSeek وسلسلة o) «أفكارها» في دلتا `reasoning_content` منفصلة. مرّر تلك الأجزاء عبر `stream.onReasoning()` — وعند `showReasoning: true` يعرضها مربع الحوار في لوحة **التفكير** القابلة للطي فوق حقل النتيجة (اللوحة مخفية افتراضيًا). ناتج الاستدلال للعرض فقط ولا يُدرج في المحرر أبدًا.

لتتيح للمستخدم تبديل وضع تفكير النموذج لكل طلب، اضبط `thinking: true` في خيارات الذكاء الاصطناعي. عندها يعرض مربع الحوار مفتاح **التفكير** (مفعّلًا افتراضيًا، ويُعاد ضبطه عند كل فتح)؛ وتكتب الإضافة قيمة المفتاح في الطلب كـ `enable_thinking: true | false`، فلم تعد بحاجة (ولا ينبغي لك) إلى ضبط `enable_thinking` بنفسك في `chatCompletionOptions`:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
  }"
/>
```

عندما تكون `thinking` تساوي `false` أو محذوفة، لا يظهر المفتاح وترسل الإضافة `enable_thinking: false`، فلا تفكر النماذج التي تفكر افتراضيًا (Qwen3 وDeepSeek وغيرها).

لتتيح للمستخدم اختيار مستوى الاستدلال لكل طلب، اضبط `reasoningEffort` في خيارات الذكاء الاصطناعي. عندها يعرض مربع الحوار قائمة **مستوى التفكير** المنسدلة المملوءة من `options` — مستويات جهد مخصصة (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
يضيف الامتداد دائمًا عنصر `default` إلى القائمة بنفسه (خط الأساس لوضع التفكير)، فلا تكتب `default` في إعداداتك أبدًا؛ ويحدد الحقل `default` في الخيار مسبقًا أحد مستوياتك المخصصة عند فتح مربع الحوار (وإلا فـ `default` هو المحدد مسبقًا)، وتُعاد القيمة إلى وضعها عند كل فتح.
وتحدد القيمة المختارة ما تكتبه الإضافة في الطلب: تُبقي `default` وضع التفكير — فيبقى مفتاح **التفكير** نشطًا ويتحكم في `enable_thinking`؛ وأي قيمة أخرى تُرسل كـ `reasoning_effort` بدلًا من ذلك، ويُعطَّل مفتاح التفكير ما دامت تلك القيمة محددة (فالمزوّدون يرفضون `enable_thinking` و`reasoning_effort` معًا في طلب واحد).
لا تظهر القائمة المنسدلة إلا عندما يكون `thinking` مفعّلًا ومفتاح التفكير في وضع التشغيل — فإطفاء التفكير يخفيها ولا يُرسل `reasoning_effort` (ويعود الطلب إلى `enable_thinking: false`). وعندما تكون `options` مفقودة أو فارغة لا تُعرض القائمة إطلاقًا:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    reasoningEffort: {
      options: ['low', 'medium', 'high', 'xhigh', 'max'],
    },
  }"
/>
```

لوحة **التفكير** مخفية افتراضيًا (القيمة الافتراضية لـ `showReasoning` هي `false`). اضبط `showReasoning: true` لإظهار لوحة قابلة للطي تبثّ عملية استدلال النموذج (دلتا `reasoning_content`) مع إبقاء التفكير مفعّلًا — يستمر النموذج في الاستدلال وتُطبَّق النتيجة بالطريقة نفسها، ويُعرض فقط استدلاله خطوة بخطوة إضافةً إلى ذلك:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'qwen3.8-27b',
    stream: true,
    thinking: true,
    showReasoning: true,
  }"
/>
```

أمثلة الطلبات المخصصة تحل محل القيم الافتراضية المترجمة:

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    promptExamples: [
      { title: 'Rewrite', prompt: 'Rewrite this in a direct tone.' },
      { title: 'Shorten', prompt: 'Make this shorter.' },
      { title: 'Explain', prompt: 'Explain this for a beginner.' },
    ],
  }"
/>
```

`tokenProvider` و`storage` خطّافان اختياريان يملكهما المستهلك للتكاملات المباشرة من المتصفح. مفاتيح API أو رموز المزوّد الموضوعة في شيفرة المتصفح أو تخزينه ظاهرة للمستخدمين ولا يجوز اعتبارها أسرارًا. ويُفضَّل نمط المهيّئ الخلفي المذكور أعلاه للأسرار في بيئة الإنتاج.

استخدم `mode: 'insert' | 'replace' | 'append'` لتحديد وضع الإدراج مسبقًا على زر الإجراء في مربع الحوار (**إدراج** / **استبدال المحدد** / **أضف في النهاية**). وبدون `mode` يكون الزر افتراضيًا **استبدال المحدد** إذا كان هناك نص محدد عند فتح مربع الحوار، و**إدراج** خلاف ذلك. زر الإجراء زر منقسم: يطبّق جزؤه الرئيسي النتيجة في الوضع المحدد مسبقًا، ويفتح قسم صغير «المزيد» (⋮) على يمينه قائمة بالأوضاع الأخرى — والنقر على أحدها يطبّق النتيجة بذلك الوضع فورًا.

عندما يكون للمحرر `limit` (حد عدد الأحرف)، يظهر عدّاد أحرف `generated / limit` أسفل حقل النتيجة بمجرد توليد نتيجة (يتحدث مباشرًا أثناء البث ويتحول إلى أحمر هادئ عند تجاوز الحد).
ويعرض مربع الحوار أيضًا تحذير `ai.limit_exceeded` فور التوليد إذا كان ناتج الذكاء الاصطناعي سيتجاوز الحد.
في هذه الحالة يُعطَّل زر **إدراج** وقائمة أوضاعه البديلة — إذ يرفض امتداد `CharacterCount` أي إدراج من شأنه أن يتجاوز بالمستند الحد، فتُطبَّق النتيجة كلها أو لا شيء: تُدرج كاملةً إن اتسع لها المجال، أو لا تُدرج إطلاقًا إن تجاوزت الحد.
قصّر النتيجة لإعادة تفعيل الإجراء:

```vue
<Tiptapify
  :content="content"
  :limit="300"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
  }"
/>
```

استخدم `systemPrompt` أو `temperature` أو `chatCompletionOptions` أو `createMessages(context)` لتخصيص طلب chat-completions المتوافق مع OpenAI. يحتوي `context` على `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` هما نص فقرة التحديد المحيط به (حتى 500 حرف لكل منهما، وفارغان بدون تحديد) — أرسلهما مع التحديد، وإلا ظنّ النموذج الجزء هو النص كله وأكمله.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **النوع:** `String`
- **الافتراضي:** `undefined`

بديل عن `aiProvider` مخصص: وجّه ميزة الذكاء الاصطناعي إلى نقطة نهاية LLM في الخادم الخلفي، فيبني tiptapify الطلب ويرسله بنفسه. يتلقى الخادم الخلفي حمولة JSON بسيطة:

- **دائمًا:** `prompt` (الطلب المكتوب في مربع الحوار) و`instruction` (`systemPrompt` الخاصة بك، أو رسالة النظام في `createMessages` مخصصة، أو النص الافتراضي المدمج).
- **اختيارية، تُرسل عند ضبطها فقط:** `stream` (`true` فقط) و`thinking` (مفتاح **التفكير** في مربع الحوار، `true` فقط) و`reasoning_effort` (مستوى الجهد المختار) و`model`.

يُقبل الردّ بمرونة: نص عادي، أو كائن `{ content }`، أو حمولة `choices` متوافقة مع OpenAI. وعندما يحتوي الطلب على `stream: true`، يُقرأ جسم الردّ كتدفق SSE (أسطر `data:` تنتهي بـ `data: [DONE]`): وتُقبل دلتا بنمط OpenAI (`choices[0].delta.content` / `.reasoning_content`)، وجزء بسيط `{ type: 'content' | 'reasoning', data }`، وجزء مسطح `{ content, reasoning_content }`، وأسطر `data` النصية العادية. وإذا تجاهل الخادم الخلفي `stream` وردّ بجسم عادي، فيُستخدم ذلك الجسم بدلًا منه. ويُظهر الردّ غير الناجح رسالة الخطأ من الخادم الخلفي (JSON بصيغة `{ error }` / `{ message }` أو الجسم الخام) في مربع الحوار. ويلغي زر **إيقاف** وإغلاق مربع الحوار الطلب الجاري؛ ويبقى المحتوى المبثوث جزئيًا في حقل النتيجة.

إذا ضُبط كل من `aiProvider` و`aiEndpoint`، فتتقدم `aiProvider`.

```vue
<script setup lang="ts">
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
  thinking: true,
}
</script>

<template>
  <Tiptapify :content="content" :ai="ai" :items="['ai']" />
</template>
```

### `ai.aiHeaders` {#ai-aiheaders}

- **النوع:** `Record<string, string>`
- **الافتراضي:** `undefined`

رؤوس إضافية تُرسل مع طلب `aiEndpoint`، وتُدمج فوق `Content-Type: application/json`. يُترك الرأس `Authorization` المضبوط هنا كما هو؛ وإلا يُرسل الرمز المميز من `tokenProvider` (عند ضبطه) كـ `Authorization: Bearer <token>`.

```vue
<Tiptapify
  :content="content"
  :ai="{
    aiEndpoint: '/api/ai/generate',
    aiHeaders: { 'X-Api-Key': '…' },
  }"
  :items="['ai']"
/>
```

### `defaultFontFamily` {#defaultfontfamily}

- **النوع:** `String`
- **الافتراضي:** `'Inter'`

نوع الخط الافتراضي لمحتوى المحرر.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **النوع:** `String`
- **الافتراضي:** `'px'`

وحدة القياس لقيم حجم الخط.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **النوع:** `String`
- **الافتراضي:** `'0'`

نصف قطر حدود حاوية المحرر. يقبل قيم نصف القطر في Vuetify (`sm` و`md` و`lg` و`xl` و`pill` وغيرها).

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **النوع:** `variantBtnTypes`
- **الافتراضي:** `'tonal'`

متغير زر Vuetify لأزرار شريط الأدوات. تُشارَك القيمة مع كل مكوّن في شريط الأدوات عبر إعدادات المحرر — ويمكن للمكوّنات المخصصة قراءتها باستخدام [`useTiptapifyConfig`](/ar/api/types#usetiptapifyconfig). راجع [`variantBtnTypes`](/ar/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **النوع:** `variantFieldTypes`
- **الافتراضي:** `'outlined'`

متغير Vuetify لحقول القوائم المنسدلة في شريط الأدوات. تُشارَك القيمة مع كل مكوّن في شريط الأدوات عبر إعدادات المحرر — ويمكن للمكوّنات المخصصة قراءتها باستخدام [`useTiptapifyConfig`](/ar/api/types#usetiptapifyconfig). راجع [`variantFieldTypes`](/ar/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **النوع:** `Array<toolbarSections>`
- **الافتراضي:** `[]`

وفّر أقسامًا مخصصة لشريط الأدوات لتوسيعه أو إضافة عناصر إليه. يمكن لمكوّنات كل قسم قراءة إعدادات المحرر المشتركة باستخدام [`useTiptapifyConfig`](/ar/api/types#usetiptapifyconfig). راجع [شريط أدوات مخصص](/ar/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **النوع:** `Boolean`
- **الافتراضي:** `true`

تفعيل تطبيق الأنماط التفاعلي.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **النوع:** `Boolean`
- **الافتراضي:** `false`

إظهار شريط تقدم غير محدد أثناء تحميل المحرر.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **النوع:** `String`
- **الافتراضي:** `'default'`

لون شريط تقدم التحميل. يقبل قيم ألوان سمة Vuetify.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **النوع:** `String`
- **الافتراضي:** `'1px'`

ارتفاع شريط تقدم التحميل.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **النوع:** `Number`
- **الافتراضي:** `0`

ابتداءً من هذا العدد من الصور المتتالية (دون أي شيء بينها) يرتبها المحرر في شبكة مرقّمة من ثلاثة أعمدة، للمواقع التي تعرض هذه الصور كشريط منزلق. وتعطّل القيمة `0` هذه الميزة.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **النوع:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/ar/api/types#tiptapifyskininput))
- **الافتراضي:** `'default'`

مظهر واجهة المحرر: شريط الأدوات وقوائم الفقاعة والقوائم المنسدلة والنوافذ الحوارية والتذييل.

- `default` — المظهر الكلاسيكي: شريط أدوات بارز، ومجموعات أزرار على شكل صناديق بارزة، وأزرار Vuetify بحالة ضغط بلون أساسي.
- `pastel` — المظهر الهادئ: شريط أدوات مسطّح بلون خفيف أسفل خط رفيع، وأزرار شبحية بحالة ضغط محايدة، وقوائم منسدلة خفيفة، وحوارات ناعمة.

تعمل الميزات (تعليقات الصور، والشرائح المنزلقة، وقائمة المحاذاة المنسدلة، وأنماط القوائم) بالطريقة نفسها في السمتين.

```vue
<Tiptapify skin="pastel" />
```

يمكنك أيضًا تمرير كائن سمة مضمّن: تعديلات على الرموز (`colors` / `metrics`) وأعلام الشكل، مع إمكانية الوراثة `extends` من سمة مسجّلة. يُحلَّل فوق `default` (أو قاعدته)، ويُعرض بالفئة `tiptapify-skin-inline` (`tiptapify-skin-{name}` إذا حمل الكائن `name`)، وتظهر رموزه كمتغيرات CSS من نوع `--tf-*` على جذر المحرر. تأتي الأسماء المخصصة من `registerSkin('mint', { … })` — راجع [دليل السمات](/ar/guide/skins) لجدول الرموز والوصفات.

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **النوع:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/ar/api/types#tiptapifyuploadoptions))
- **الافتراضي:** `null`

نقطة نهاية [الرفع](/ar/guide/uploads): الملفات المختارة في مربعي حوار الصورة والفيديو (وصورة غلاف الفيديو، وصورة بطاقة الرابط) تُرسل إليها بـ `POST {endpoint}` (الحقلان `file` و`kind` بصيغة multipart)، ويحتفظ المستند بالرابط الذي تردّ به (`{ "url": … }`).

بدونها يبقى مربع حوار الصورة يقبل ملفًا: تُضمَّن الصورة المختارة (وصورة غلاف الفيديو) في المستند كرابط بيانات base64، وتُحفظ صور base64 عند تحميل المستند. ولا يقدّم مربع حوار الفيديو خيار **رفع** إلا مع هذه الخاصية. ومع ضبط `upload` تُحذف صور base64 عند تحميل المستند.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **النوع:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/ar/api/types#tiptapifycontentstyles))
- **القيمة الافتراضية:** `'inline'`

كيف يحمل HTML المحفوظ مظهر بطاقات الروابط والصور ذات التعليقات والفيديوهات والمحتوى المضمّن وقوائم المهام (انظر [أنماط المحتوى](/ar/guide/content-styles)): تكتبه `inline` داخل سمات `style` الخاصة بها، فيعرض الموقع الـ HTML كما هو؛ أما `classes` فتُبقي الفئات (classes) فقط، لموقع يحمّل `tiptapify/content.css`. يتجاهل المحرر هذه الأنماط عند تحميل HTML، لذلك يُحمَّل أي نوع من HTML بالنتيجة نفسها.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **النوع:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/ar/api/types#tiptapifylinkpreviewoptions))
- **الافتراضي:** `null`

نقطة النهاية الخلفية لـ[بطاقات الروابط](/ar/guide/link-cards): تقرأ بيانات OpenGraph للصفحات، وهو ما لا يستطيعه المتصفح (بسبب CORS). يفحصها المحرر بمصافحة عند بدء التشغيل (يجب أن يردّ `GET {endpoint}` بـ `200 { "tiptapifyLinkPreview": 1 }`)؛ وإلى أن تردّ لا يعرض شيء خيار البطاقة.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## الأحداث {#events}

### `editor-ready` {#editor-ready}

يُطلق عندما تصبح نسخة المحرر جاهزة.

```typescript
interface EditorReadyPayload {
  editor: TiptapifyEditor  // Tiptapify Editor instance
  getHTML: () => string  // Get current HTML content
  getJSON: () => object  // Get current JSON content
}
```

```vue
<script setup lang="ts">
const onEditorReady = (payload) => {
  console.log(payload.editor)
  console.log(payload.getHTML())
  console.log(payload.getJSON())
}
</script>

<template>
  <Tiptapify @editor-ready="onEditorReady" />
</template>
```

### `content-changed` {#content-changed}

يُطلق عندما يتغير محتوى المحرر.

```typescript
interface ContentChangedPayload {
  html: string   // Current HTML content
  json: object   // Current JSON content
}
```

```vue
<script setup lang="ts">
const onContentChanged = ({ html, json }) => {
  console.log('HTML:', html)
  console.log('JSON:', json)
}
</script>

<template>
  <Tiptapify @content-changed="onContentChanged" />
</template>
```

### `update:modelValue` {#update-modelvalue}

يدعم الربط بـ `v-model`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
const content = ref('<p>Hello</p>')
</script>

<template>
  <Tiptapify v-model="content" />
</template>
```

## Provide / Inject {#provide-inject}

نسخة المحرر ودالة `t` متاحتان عبر provide/inject في Vue:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
