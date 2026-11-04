# Props {#props}

## Props של `<Tiptapify>` {#tiptapify-props}

### `content` {#content}

- **סוג:** `String | Object`
- **ברירת מחדל:** `''`

התוכן ההתחלתי של העורך. מקבל מחרוזת HTML או אובייקט JSON של Tiptap.

```vue
<!-- HTML string -->
<Tiptapify :content="'<p>Hello world</p>'" />

<!-- Tiptap JSON -->
<Tiptapify :content="{ type: 'doc', content: [{ type: 'paragraph' }] }" />
```

`content` הוא התוכן **ההתחלתי** בלבד; לקישור דו-כיווני יש להשתמש ב-`v-model` (ראו `modelValue`).

### `modelValue` {#modelvalue}

- **סוג:** `String | Object`
- **ברירת מחדל:** `''`

הערך לקישור דו-כיווני עבור `v-model`. השתמשו ב-`v-model` כדי לשמור ערך ריאקטיבי מסונכרן עם העורך. בכל עריכה הרכיב משדר `update:modelValue` עם ה-HTML העדכני ביותר, ו-`v-model` כותב אותו בחזרה ל-ref שלכם. כשמשתמשים רק ב-`v-model` (בלי `:content`), הערך המקושר הוא התוכן ההתחלתי של העורך.

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

- **סוג:** `String`
- **ברירת מחדל:** `''`

טקסט מציין מיקום שמוצג כשהעורך ריק.

```vue
<Tiptapify placeholder="Start typing..." />
```

### `height` {#height}

- **סוג:** `Number`
- **ברירת מחדל:** `null`

הגובה המינימלי של אזור התוכן בעורך, בפיקסלים.

```vue
<Tiptapify :height="500" />
```

### `toolbar` {#toolbar}

- **סוג:** `Boolean`
- **ברירת מחדל:** `true`

הצגה או הסתרה של סרגל הכלים.

```vue
<Tiptapify :toolbar="false" />
```

### `items` {#items}

- **סוג:** `Array<String> | Object`
- **ברירת מחדל:** `[]`

הפריטים שיוצגו בסרגל הכלים. מעבירים מערך של שמות פריטים או אובייקט עם מקטעים בעלי שמות. ראו [פריטי סרגל הכלים](/he/api/toolbar-items).
במערך, `'|'` מחלק את הפריטים לקבוצות (בסדר הזה, ללא קשר לאילו מקטעים הכפתורים שייכים) ו-`'~'` דוחף את הפריטים שאחריו לסוף סרגל הכלים. כשיש קבוצות, שם שאינו פריט מובנה שומר מקום לכפתור המותאם אישית בעל אותו שם מתוך `customExtensions`; אם אין כפתור כזה, המקום מושמט.

```vue
<!-- Array -->
<Tiptapify :items="['bold', 'italic', 'underline', '~', 'undo', 'redo']" />

<!-- Object with sections -->
<Tiptapify :items="{ format: ['bold', 'italic'], misc: ['undo', 'redo'] }" />
```

### `itemsExclude` {#itemsexclude}

- **סוג:** `Boolean`
- **ברירת מחדל:** `false`

כאשר הערך הוא `true`, ה-prop‏ `items` מציין פריטים **להחרגה** ולא פריטים להכללה.

```vue
<Tiptapify
  :items="['source', 'preview', 'fullscreen']"
  :items-exclude="true"
/>
```

### `bubbleMenu` {#bubblemenu}

- **סוג:** `Boolean`
- **ברירת מחדל:** `true`

הצגת תפריט הבועה כשטקסט נבחר: שורה אחת של כפתורי אייקון בקבוצות — מודגש, נטוי, קו תחתון, קו חוצה | כתב עילי, כתב תחתי | הדגשה, קוד בתוך השורה | קישור | ניקוי עיצוב. לכל כפתור יש tooltip עם קיצור המקשים שלו, והוא מוצג כפעיל כשהסימון חל על הבחירה. התפריט מוסתר כשנבחר בלוק (תמונה, ווידג'ט), בתוך קוד, וכשכל המסמך נבחר.

```vue
<Tiptapify :bubble-menu="false" />
```

### `floatingMenu` {#floatingmenu}

- **סוג:** `Boolean`
- **ברירת מחדל:** `true`

הצגת התפריט הצף בשורות ריקות: כותרת 1, כותרת 2 ורשימת תבליטים, באותה שורה של כפתורי אייקון כמו בתפריט הבועה.

```vue
<Tiptapify :floating-menu="false" />
```

### `slashCommands` {#slashcommands}

- **סוג:** `Boolean`
- **ברירת מחדל:** `true`

הפעלת תפריט פקודות הלוכסן (מקלידים `/` כדי להפעיל אותו).

```vue
<Tiptapify :slash-commands="false" />
```

### `showWordsCount` {#showwordscount}

- **סוג:** `Boolean`
- **ברירת מחדל:** `true`

הצגת ספירת המילים בתחתית העורך.

```vue
<Tiptapify :show-words-count="false" />
```

### `showCharactersCount` {#showcharacterscount}

- **סוג:** `Boolean`
- **ברירת מחדל:** `true`

הצגת ספירת התווים בתחתית העורך.

```vue
<Tiptapify :show-characters-count="false" />
```

### `limit` {#limit}

- **סוג:** `Number | null`
- **ברירת מחדל:** `null`

מספר התווים המרבי שמותר על ידי התוסף `CharacterCount` של Tiptap. הגדירו `null` או השמיטו את ה-prop כדי להשאיר את העריכה ללא הגבלה. כשהערך גדול מ-`0`, בתחתית העורך מוצג אינדיקטור התקדמות מעגלי ב-SVG עם ספי צבע.

```vue
<Tiptapify :limit="1000" />
```

### `limitDefaultColor` {#limitdefaultcolor}

- **סוג:** `String`
- **ברירת מחדל:** `'purple'`

צבע ברירת המחדל של אינדיקטור ההתקדמות המעגלי שמוצג בתחתית העורך כש-`limit` מוגדר.

```vue
<Tiptapify :limit="1000" limit-default-color="primary" />
```

### `limitAlertColor` {#limitalertcolor}

- **סוג:** `String`
- **ברירת מחדל:** `'orange'`

צבע אינדיקטור ההתקדמות כשהשימוש עולה על 75% מהמגבלה.

```vue
<Tiptapify :limit="1000" limit-alert-color="warning" />
```

### `limitWarningColor` {#limitwarningcolor}

- **סוג:** `String`
- **ברירת מחדל:** `'red'`

צבע אינדיקטור ההתקדמות כשמגבלת התווים הושגה.

```vue
<Tiptapify :limit="1000" limit-warning-color="error" />
```

### `footerAlignment` {#footeralignment}

- **סוג:** `TiptapifyFooterAlignment`
- **ברירת מחדל:** `'end'`

יישור פריטי הסטטוס בתחתית העורך. מקבל `'start'`, `'center'` או `'end'`.

```vue
<Tiptapify footer-alignment="center" />
```

### `ai` {#ai}

- **סוג:** `Boolean | TiptapifyAiOptions`
- **ברירת מחדל:** `false`

מפעיל את פריט סרגל הכלים `ai`. העורך בונה בקשת `/v1/chat/completions` תואמת OpenAI ומעביר אותה ל-`aiProvider`. השתמשו בפונקציית ה-provider כדי לפנות ל-backend שלכם, ל-BFF, לנקודת קצה מוגנת ב-OAuth, ל-LM Studio או לעטיפת SDK.

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

דוגמה עם LLM מקומי ב-LM Studio:

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

תמיכה בפלט בסטרימינג מתאפשרת על ידי הגדרת `stream: true` ודחיפת טוקנים דרך הארגומנט `stream` של `aiProvider`. שדה התוצאה בדיאלוג ה-AI מתעדכן בזמן אמת עם הגעת החלקים, וכפתור **עצור** מבטל את הבקשה הפעילה:

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

העבירו את `stream.signal` ל-`fetch` (או לקריאת ה-SDK שלכם) כדי שהבקשה תבוטל כשהמשתמש לוחץ על **עצור** או סוגר את הדיאלוג. תוכן שכבר הגיע בסטרימינג נשאר בשדה התוצאה וניתן להחיל אותו או למחוק אותו. providers שאינם משתמשים בסטרימינג יכולים להתעלם מהארגומנט `stream` לגמרי — הוא אופציונלי ותואם לאחור.

מודלי חשיבה (Qwen thinking, DeepSeek, סדרת o) משדרים את “המחשבות” שלהם בדלתא נפרדת בשם `reasoning_content`. העבירו את החלקים האלה דרך `stream.onReasoning()` — כש-`showReasoning: true`, הדיאלוג מציג אותם בלוח **מחשב** מתקפל מעל שדה התוצאה (הלוח מוסתר כברירת מחדל). פלט החשיבה מיועד להצגה בלבד ואינו מוכנס לעולם לעורך.

כדי לאפשר למשתמש להחליף את מצב החשיבה של המודל בכל בקשה, הגדירו `thinking: true` באפשרויות ה-AI. הדיאלוג יציג אז מתג **מחשב** (פעיל כברירת מחדל, מתאפס בכל פתיחה); התוסף כותב את ערך המתג לבקשה בתור `enable_thinking: true | false`, ולכן אין עוד צורך (וגם לא כדאי) להגדיר את `enable_thinking` בעצמכם ב-`chatCompletionOptions`:

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

כש-`thinking` הוא `false` או שהוא מושמט, המתג אינו מוצג והתוסף שולח `enable_thinking: false`, כך שמודלים שחושבים כברירת מחדל (Qwen3, DeepSeek, …) לא יחשבו.

כדי לאפשר למשתמש לבחור את מאמץ החשיבה בכל בקשה, הגדירו `reasoningEffort` באפשרויות ה-AI. הדיאלוג יציג אז רשימה נפתחת **מאמץ חשיבה** שמתמלאת מתוך `options` — רמות מאמץ מותאמות אישית (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`).
התוסף תמיד מוסיף בעצמו פריט `default` לרשימה (בסיס מצב החשיבה), ולכן אין לרשום את `default` בתצורה שלכם; השדה `default` באפשרות בוחר מראש אחת מהרמות המותאמות שלכם בעת פתיחת הדיאלוג (אחרת נבחר מראש `default`), והערך מתאפס בכל פתיחה.
הערך הנבחר קובע מה התוסף כותב לבקשה: `default` משאיר את מצב החשיבה — המתג **מחשב** נשאר פעיל ושולט ב-`enable_thinking`; כל ערך אחר נשלח בתור `reasoning_effort` במקומו, והמתג מושבת כל עוד הערך הזה נבחר (providers דוחים בקשה שיש בה גם `enable_thinking` וגם `reasoning_effort`).
הרשימה מוצגת רק כש-`thinking` מופעל והמתג פעיל — כיבוי החשיבה מסתיר אותה, ו-`reasoning_effort` אינו נשלח (הבקשה חוזרת ל-`enable_thinking: false`). כש-`options` חסר או ריק, הרשימה אינה מוצגת כלל:

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

הלוח **מחשב** מוסתר כברירת מחדל (`showReasoning` ברירת המחדל שלו היא `false`). הגדירו `showReasoning: true` כדי להציג לוח מתקפל שמזרים את תהליך החשיבה של המודל (דלתא `reasoning_content`) תוך השארת החשיבה פעילה — המודל עדיין חושב והתוצאה מוחלת באותו אופן, ורק שלבי החשיבה מוצגים בנוסף:

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

דוגמאות לפרומפטים מותאמים אישית מחליפות את ברירות המחדל המתורגמות:

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

`tokenProvider` ו-`storage` הם hooks אופציונליים בבעלות הצרכן לשילובים ישירים בדפדפן. מפתחות API או טוקנים של ספקים שמוצבים בקוד הדפדפן או באחסון הדפדפן גלויים למשתמשים ואין להתייחס אליהם כסודות. בסודות של סביבת ייצור מומלץ להשתמש בתבנית מתאם ה-backend שלעיל.

השתמשו ב-`mode: 'insert' | 'replace' | 'append'` כדי לבחור מראש את מצב ההוספה בכפתור הפעולה של הדיאלוג (**הכנסה** / **החלפת הבחירה** / **הוסף לסוף**). ללא `mode`, ברירת המחדל של הכפתור היא **החלפת הבחירה** כשטקסט נבחר בעת פתיחת הדיאלוג, ו-**הכנסה** אחרת. כפתור הפעולה הוא כפתור מפוצל: החלק הראשי מחיל את התוצאה במצב שנבחר מראש, וחלק קטן של “עוד” (⋮) לצדו פותח תפריט עם המצבים האחרים — לחיצה על אחד מהם מחילה את התוצאה באותו מצב מיד.

כשלעורך יש `limit` (מגבלת תווים), מונה תווים בצורת `generated / limit` מוצג מתחת לשדה התוצאה מיד כשנוצרת תוצאה (הוא מתעדכן בזמן אמת בסטרימינג והופך לאדום רך כשהמגבלה עומדת להיחצות).
הדיאלוג מציג גם את האזהרה `ai.limit_exceeded` מיד לאחר היצירה אם פלט ה-AI יחרוג מהמגבלה.
במצב הזה הכפתור **הכנסה** ותפריט מצבי ההוספה האחרים שלו מושבתים — התוסף `CharacterCount` דוחה כל הוספה שהייתה מגדילה את המסמך מעבר למגבלה, ולכן התוצאה מוחלת כולה או לא כלל: היא מוכנסת במלואה כשהיא נכנסת במגבלה, ולא מוכנסת בכלל כשהיא חורגת ממנה.
קצרו את התוצאה כדי להפעיל מחדש את הפעולה:

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

השתמשו ב-`systemPrompt`, `temperature`, `chatCompletionOptions` או `createMessages(context)` כדי להתאים אישית את בקשת ה-chat-completions התואמת OpenAI. `context` מכיל `{ prompt, selectedText, textBefore, textAfter, text, html, json, mode }`: `textBefore` / `textAfter` הם הטקסט של הפסקה שבה נמצאת הבחירה, מסביב לה (עד 500 תווים כל אחד, ריקים כשאין בחירה) — שלחו אותם יחד עם הבחירה, אחרת המודל יתפוס את הקטע כטקסט השלם וישלים אותו.

### `ai.aiEndpoint` {#ai-aiendpoint}

- **סוג:** `String`
- **ברירת מחדל:** `undefined`

חלופה ל-`aiProvider` מותאם אישית: מכוונים את תכונת ה-AI לנקודת קצה של LLM ב-backend, ו-tiptapify בונה ושולח את הבקשה בעצמו. ה-backend מקבל payload מינימלי בפורמט JSON:

- **תמיד:** `prompt` (הבקשה שהוקלדה בדיאלוג) ו-`instruction` (ה-`systemPrompt` שלכם, הודעת המערכת של `createMessages` מותאם אישית, או ברירת המחדל המובנית).
- **אופציונלי, נשלח רק כשהוגדר:** `stream` (רק `true`), `thinking` (מתג **מחשב** בדיאלוג, רק `true`), `reasoning_effort` (רמת המאמץ שנבחרה) ו-`model`.

התשובה מתקבלת בגמישות: מחרוזת פשוטה, אובייקט `{ content }` או payload תואם OpenAI עם `choices`. כשבבקשה `stream: true`, גוף התשובה נקרא כזרם SSE (שורות `data:`, שמסתיימות ב-`data: [DONE]`): מתקבלים דלתאות בסגנון OpenAI (`choices[0].delta.content` / `.reasoning_content`), חלק פשוט מהצורה `{ type: 'content' | 'reasoning', data }`, חלק שטוח `{ content, reasoning_content }` ושורות `data` של טקסט רגיל. אם ה-backend מתעלם מ-`stream` ועונה בגוף רגיל, נעשה שימוש בגוף הזה. תשובה שאינה OK מציגה בדיאלוג את הודעת השגיאה של ה-backend (JSON `{ error }` / `{ message }` או הגוף הגולמי). כפתור **עצור** וסגירת הדיאלוג מבטלים את הבקשה הפעילה; תוכן שכבר הגיע בסטרימינג נשמר בשדה התוצאה.

אם מוגדרים גם `aiProvider` וגם `aiEndpoint`, `aiProvider` גובר.

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

- **סוג:** `Record<string, string>`
- **ברירת מחדל:** `undefined`

כותרות נוספות שנשלחות עם הבקשה ל-`aiEndpoint`, ממוזגות מעל `Content-Type: application/json`. כותרת `Authorization` שמוגדרת כאן נשמרת כמות שהיא; אחרת, טוקן מ-`tokenProvider` (אם הוגדר) נשלח בתור `Authorization: Bearer <token>`.

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

- **סוג:** `String`
- **ברירת מחדל:** `'Inter'`

משפחת הגופנים המוגדרת כברירת מחדל לתוכן העורך.

```vue
<Tiptapify default-font-family="Georgia" />
```

### `fontMeasure` {#fontmeasure}

- **סוג:** `String`
- **ברירת מחדל:** `'px'`

יחידת המידה של ערכי גודל הגופן.

```vue
<Tiptapify font-measure="px" />
```

### `rounded` {#rounded}

- **סוג:** `String`
- **ברירת מחדל:** `'0'`

רדיוס הפינות של מיכל העורך. מקבל ערכי רדיוס של Vuetify‏ (`sm`, `md`, `lg`, `xl`, `pill` וכו').

```vue
<Tiptapify rounded="lg" />
```

### `variantBtn` {#variantbtn}

- **סוג:** `variantBtnTypes`
- **ברירת מחדל:** `'tonal'`

וריאנט הכפתור של Vuetify לכפתורי סרגל הכלים. הערך משותף לכל רכיבי סרגל הכלים דרך תצורת העורך — רכיבים מותאמים אישית יכולים לקרוא אותו באמצעות [`useTiptapifyConfig`](/he/api/types#usetiptapifyconfig). ראו [`variantBtnTypes`](/he/api/types#variantbtntypes).

```vue
<Tiptapify variant-btn="outlined" />
```

### `variantField` {#variantfield}

- **סוג:** `variantFieldTypes`
- **ברירת מחדל:** `'outlined'`

וריאנט של Vuetify לשדות הרשימה הנפתחת בסרגל הכלים. הערך משותף לכל רכיבי סרגל הכלים דרך תצורת העורך — רכיבים מותאמים אישית יכולים לקרוא אותו באמצעות [`useTiptapifyConfig`](/he/api/types#usetiptapifyconfig). ראו [`variantFieldTypes`](/he/api/types#variantfieldtypes).

```vue
<Tiptapify variant-field="filled" />
```

### `customExtensions` {#customextensions}

- **סוג:** `Array<toolbarSections>`
- **ברירת מחדל:** `[]`

מספקים מקטעי סרגל כלים מותאמים אישית כדי להרחיב או להוסיף פריטים. הרכיבים של כל מקטע יכולים לקרוא את תצורת העורך המשותפת באמצעות [`useTiptapifyConfig`](/he/api/types#usetiptapifyconfig). ראו [סרגל כלים מותאם אישית](/he/examples/custom-toolbar#custom-toolbar-components).

```vue
<Tiptapify :custom-extensions="customExtensions" />
```

### `interactiveStyles` {#interactivestyles}

- **סוג:** `Boolean`
- **ברירת מחדל:** `true`

הפעלת החלת סגנונות אינטראקטיבית.

```vue
<Tiptapify :interactive-styles="false" />
```

### `loading` {#loading}

- **סוג:** `Boolean`
- **ברירת מחדל:** `false`

הצגת סרגל התקדמות לא מוגדר בזמן שהעורך נטען.

```vue
<Tiptapify loading />
```

### `loadingColor` {#loadingcolor}

- **סוג:** `String`
- **ברירת מחדל:** `'default'`

צבע סרגל ההתקדמות של הטעינה. מקבל ערכי צבע של ערכת הנושא של Vuetify.

```vue
<Tiptapify loading-color="primary" />
```

### `loadingHeight` {#loadingheight}

- **סוג:** `String`
- **ברירת מחדל:** `'1px'`

גובה סרגל ההתקדמות של הטעינה.

```vue
<Tiptapify :loading-height="'4px'" />
```

### `imageSlider` {#imageslider}

- **סוג:** `Number`
- **ברירת מחדל:** `0`

החל ממספר התמונות הזה ברצף (בלי דבר ביניהן) העורך מסדר אותן ברשת ממוספרת של שלושה טורים, עבור אתרים שמציגים תמונות כאלה כמצגת (slider). `0` מכבה את התכונה.

```vue
<Tiptapify :image-slider="3" />
```

### `skin` {#skin}

- **סוג:** `string | TiptapifySkinConfig` ([`TiptapifySkinInput`](/he/api/types#tiptapifyskininput))
- **ברירת מחדל:** `'default'`

המראה של מעטפת העורך: סרגל הכלים, תפריטי הבועה, הרשימות הנפתחות, הדיאלוגים והתחתית.

- `default` — המראה הקלאסי: סרגל כלים מורם, קבוצות כפתורים כקופסאות מורמות, כפתורי Vuetify עם מצב לחוץ בצבע ראשי.
- `pastel` — המראה השקט: סרגל כלים שטוח בגוון עדין מתחת לקו דק, כפתורי רפאים עם מצב לחוץ ניטרלי, תפריטים נפתחים קלים, דיאלוגים רכים.

התכונות (כיתובי תמונה, sliders, הרשימה הנפתחת של היישור, סגנונות רשימה) פועלות באותו אופן בשני ה-skins.

```vue
<Tiptapify skin="pastel" />
```

אפשר גם להעביר אובייקט skin מוטבע: עקיפות של טוקנים (`colors` / `metrics`) ודגלי צורה, ובאופציה `extends` של skin רשום. הוא נפתר מעל `default` (או מעל הבסיס שלו), מוצג תחת המחלקה `tiptapify-skin-inline` (`tiptapify-skin-{name}` כשלאובייקט יש `name`), והטוקנים שלו נוחתים כמשתני CSS מסוג `--tf-*` על שורש העורך. שמות מותאמים אישית מגיעים מ-`registerSkin('mint', { … })` — ראו את [מדריך ה-Skins](/he/guide/skins) לטבלת הטוקנים ולמתכונים.

```vue
<Tiptapify :skin="{ extends: 'pastel', colors: { toolbarBg: 'rgba(0, 128, 0, 0.05)' } }" />
```

### `upload` {#upload}

- **סוג:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyUploadOptions`](/he/api/types#tiptapifyuploadoptions))
- **ברירת מחדל:** `null`

נקודת הקצה של [העלאות](/he/guide/uploads): קבצים שנבחרים בדיאלוגי התמונה והסרטון (וגם תמונת שער של סרטון, או התמונה של כרטיס קישור) נשלחים אליה ב-`POST {endpoint}` (‏`file` ו-`kind` ב-multipart), והמסמך שומר את ה-URL שהיא מחזירה (`{ "url": … }`).

בלי ה-prop הזה דיאלוג התמונה עדיין מקבל קובץ: תמונה שנבחרה (ותמונת שער של סרטון) מוטמעת במסמך כ-data URL בפורמט base64, ותמונות base64 נשמרות בעת טעינת המסמך. דיאלוג הסרטון מציע **העלאה** רק עם ה-prop הזה. כש-`upload` מוגדר, תמונות base64 נמחקות בעת טעינת המסמך.

```vue
<Tiptapify :upload="{ endpoint: '/api/uploads', headers: { Authorization: `Bearer ${token}` } }" />
```

### `contentStyles` {#contentstyles}

- **סוג:** `'inline' | 'classes'` ([`TiptapifyContentStyles`](/he/api/types#tiptapifycontentstyles))
- **ברירת מחדל:** `'inline'`

האופן שבו ה-HTML השמור נושא את המראה של כרטיסי קישור, תמונות עם כיתוב, סרטונים, הטמעות ורשימות משימות (ראו [סגנונות תוכן](/he/guide/content-styles)): `inline` כותב אותו לתוך מאפייני ה-`style` שלהם, כך שאתר מציג את ה-HTML כפי שהוא; `classes` משאיר מחלקות בלבד, לאתר שטוען את `tiptapify/content.css`. העורך מתעלם מהסגנונות האלה בטעינת HTML, ולכן שני סוגי ה-HTML נטענים באותו אופן.

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

### `linkPreview` {#linkpreview}

- **סוג:** `{ endpoint: string, headers?: Record<string, string> }` ([`TiptapifyLinkPreviewOptions`](/he/api/types#tiptapifylinkpreviewoptions))
- **ברירת מחדל:** `null`

נקודת הקצה ב-backend של [כרטיסי קישור](/he/guide/link-cards): היא קוראת את נתוני ה-OpenGraph של דפים, דבר שדפדפן אינו יכול לעשות (CORS). העורך בודק אותה בלחיצת יד (handshake) בעת עלייתו (`GET {endpoint}` חייב להשיב `200 { "tiptapifyLinkPreview": 1 }`); עד שהיא משיבה, שום דבר אינו מציע כרטיס.

```vue
<Tiptapify :link-preview="{ endpoint: '/api/link-preview' }" />
```

## אירועים {#events}

### `editor-ready` {#editor-ready}

מופעל כשמופע העורך מוכן.

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

מופעל כשתוכן העורך משתנה.

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

תומך בקישור `v-model`.

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

מופע העורך והפונקציה `t` זמינים דרך provide/inject של Vue:

```typescript
import { inject } from 'vue'

const editor = inject('tiptapifyEditor')
const { t } = inject('tiptapifyI18n')
```
