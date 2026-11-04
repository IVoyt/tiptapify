# הרחבת AI {#ai-extension}

הרחבת ה-AI מוסיפה כפתור בסרגל הכלים שפותח דיאלוג פרומפט, שולחת את הבקשה לספק לבחירתכם, מציגה את התוצאה בסטרימינג ומכניסה אותה לעורך דרך כפתור הפעולה של המצב שנבחר (**הכנסה** / **החלפת הבחירה** / **הוסף לסוף**).

```vue
<Tiptapify
  :content="content"
  :items="['ai', '|', 'bold', 'italic']"
  :ai="{
    aiProvider,
    model: 'gpt-4.1-mini',
    stream: true,
  }"
/>
```

ה-prop‏ `ai` מקבל `true` (אפשרויות עם ברירות מחדל) או אובייקט אפשרויות (`TiptapifyAiOptions`). הפריט `ai` בסרגל הכלים תמיד רשום, אבל הכפתור **מושבת** אלא אם `aiProvider` מוגדר.

ראו את [דוגמת ה-AI](/he/examples/ai) לדמו שאפשר להריץ ואת [Props](/he/api/props#ai) להפניה המלאה של האפשרויות.

## ארכיטקטורה {#architecture}

```
Tiptapify.vue            Toolbar item `ai`           Dialog.vue
  resolves the `ai`     ->  Button.vue               ->  builds the request
  prop into a resolved  ->  (disabled without        ->  calls aiProvider(request, context, stream)
  options object and    ->    aiProvider)           ->  streams chunks into result/reasoning fields
  provides it (inject   ->  opens the dialog        ->  the action button (Insert/Replace/Append) places the result into the editor
  'tiptapifyAi')
```

- `Tiptapify` מנרמל את ה-prop‏ `ai`: ‏`ai: true` הופך לאובייקט אפשרויות ריק, ‏`promptExamples` חוזר לברירות המחדל המתורגמות, והתוצאה נחשפת לצאצאים דרך `inject('tiptapifyAi')` (‏`TiptapifyAiResolvedOptions` או `false`).
- פריט סרגל הכלים (`src/components/Toolbar/ai.ts`) מרנדר את `Button.vue`. הכפתור בודק אם `aiProvider` זמין ופותח את `Dialog.vue`.
- `Dialog.vue` אחראי על כל מחזור החיים של הבקשה: בניית הבקשה, קריאה ל-provider, סטרימינג והכנסת התוצאה.

## חוזה ה-provider {#the-provider-contract}

```ts
type TiptapifyAiProvider = (
  request: TiptapifyAiRequest,
  context: TiptapifyAiEditorContext,
  stream?: TiptapifyAiStream,
) => Promise<TiptapifyAiResponse | TiptapifyAiOpenAiResponse | string>
```

ה-provider הוא פונקציה אסינכרונית פשוטה שאתם מממשים. tiptapify אינו קורא לשום API בעצמו — כל דבר שיכול לצרוך אובייקט `request` תואם OpenAI עובד (fetch, SDK, מתאם backend). היוצא מן הכלל הוא מצב ה-backend‏ `aiEndpoint` (ראו [יצירה ב-backend](#backend-generation-aiendpoint)), שבו tiptapify שולח את הבקשה לנקודת הקצה שלכם.

**בקשה** (`TiptapifyAiRequest`) נפרשת מתוך `chatCompletionOptions` שלכם, ואז התוסף מעשיר אותה:

| שדה | מקור |
| --- | --- |
| `messages` | `createMessages(context)` אם סופק, אחרת הזוג המוגדר כברירת מחדל: הודעת מערכת (ה-`systemPrompt` שלכם או ברירת מחדל מובנית) והודעת משתמש שמשלבת את הפרומפט, את הטקסט הנבחר בעורך עם הטקסט שסביבו, ואת הכלל לענות על הבחירה בלבד (או על כל הטקסט כשאין בחירה) |
| `model` | האפשרות `model`, כשהוגדרה |
| `temperature` | האפשרות `temperature`, כשהוגדרה |
| `stream` | האפשרות `stream`, או `chatCompletionOptions.stream` |
| `enable_thinking` / `reasoning_effort` | מתג החשיבה / הרשימה הנפתחת של המאמץ — ראו להלן |

**הקשר** (`TiptapifyAiEditorContext`) נותן ל-provider את מצב העורך המלא: `prompt`, `selectedText`, ‏`textBefore` / `textAfter` (הטקסט של הפסקה שבה נמצאת הבחירה, מסביב לה, עד 500 תווים כל אחד), `text`, `html`, `json` ו-`mode` (‏`insert` / `replace` / `append`).

בחירה שמתחילה או נגמרת באמצע מילה לוקחת את המילה כולה, וההודעות המוגדרות כברירת מחדל שולחות את הטקסט שסביב הבחירה יחד עם הכלל לענות על הבחירה בלבד: כשמקבל רק קטע, המודל תופס אותו כטקסט השלם ומשלים אותו, וההחלפה הייתה חוזרת על מה שבא אחרי הבחירה.

**תשובה**: ה-provider יכול להחזיר את התוכן כ-`string` פשוט, כ-`{ content }` (‏`TiptapifyAiResponse`), או כ-payload תואם OpenAI עם `choices` (‏`TiptapifyAiOpenAiResponse`). הדיאלוג מחלץ את התוכן בסדר הזה וגוזם רווחים מובילים. בדחייה מוצגת הודעת השגיאה בדיאלוג (או `ai.error` כשהשגיאה אינה מופע של `Error`) והדיאלוג נשאר פתוח.

## יצירה ב-backend (`aiEndpoint`) {#backend-generation-aiendpoint}

במקום לממש `aiProvider`, אפשר לכוון את תכונת ה-AI לנקודת קצה של LLM ב-backend:

```ts
// example
const ai = {
  aiEndpoint: '/api/ai/generate',
  model: 'gpt-4.1-mini',
  stream: true,
}
```

tiptapify בונה אז את הבקשה ושולח אותה לנקודת הקצה בעצמו. `aiProvider` מפורש תמיד גובר כששניהם מוגדרים.

**בקשה** — payload מינימלי בפורמט JSON (`TiptapifyAiBackendRequest`):

| שדה | נשלח |
| --- | --- |
| `prompt` | תמיד — הבקשה שהוקלדה בדיאלוג |
| `instruction` | תמיד — ה-`systemPrompt` שלכם, הודעת המערכת של `createMessages` מותאם אישית, או ברירת המחדל המובנית |
| `stream` | רק כש-`stream: true` |
| `thinking` | רק כשמתג **מחשב** בדיאלוג פעיל |
| `reasoning_effort` | רק כשהמשתמש בחר רמה (לא `default`) |
| `model` | רק כשהאפשרות `model` מוגדרת |

**תשובה** — מתקבלת בגמישות: מחרוזת פשוטה, אובייקט `{ content }` או payload תואם OpenAI עם `choices`.

**סטרימינג** — כשבבקשה `stream: true`, גוף התשובה נקרא כזרם SSE (שורות `data:`, שמסתיימות ב-`data: [DONE]`). פורמטי החלקים המתקבלים:

- בסגנון OpenAI — `data: {"choices":[{"delta":{"content":"…", "reasoning_content":"…"}}]}`
- פשוט — `data: {"type":"content"|"reasoning","data":"…"}`
- שטוח — `data: {"content":"…","reasoning_content":"…"}`
- טקסט רגיל — `data: some text` (שורת `data` שאינה JSON היא חלק תוכן)

חלקי `content` מעדכנים את שדה התוצאה דרך `onChunk`, וחלקי `reasoning_content` מזינים את לוח **מחשב** דרך `onReasoning`. אם ה-backend מתעלם מ-`stream` ועונה בגוף רגיל, נעשה שימוש בגוף הזה. לחיצה על **עצור** או סגירת הדיאלוג מבטלות את הבקשה; תוכן שכבר הגיע בסטרימינג נשמר בשדה התוצאה.

**כותרות** — `aiHeaders` (‏`Record<string, string>`) ממוזגות מעל `Content-Type: application/json`. כותרת `Authorization` ב-`aiHeaders` נשמרת כמות שהיא; אחרת טוקן מ-`tokenProvider` נשלח בתור `Authorization: Bearer <token>`.

**שגיאות** — תשובה שאינה OK מציגה בדיאלוג את הודעת השגיאה של ה-backend (JSON `{ error }` / `{ message }` או הגוף הגולמי).

## סטרימינג {#streaming}

כש-`stream: true` (או ש-`chatCompletionOptions.stream` הוא `true`), הדיאלוג מעביר אובייקט `TiptapifyAiStream` כארגומנט השלישי:

```ts
type TiptapifyAiStream = {
  signal: AbortSignal,
  onChunk: (chunk: string) => void,
  onReasoning: (chunk: string) => void,
}
```

- **`signal`** — העבירו אותו ל-`fetch` (או לקריאת ה-SDK שלכם). הוא מבטל כשהמשתמש לוחץ על **עצור** או סוגר את הדיאלוג, כך שבקשות פעילות לא ממשיכות לרוץ.
- **`onChunk`** — הוסיפו כל חלק תוכן לשדה התוצאה. בזמן היצירה שדה התוצאה הוא לקריאה בלבד, ותוכן שכבר הגיע נשמר (אפשר ללחוץ עצור, ואז להכניס אותו או למחוק).
- **`onReasoning`** — העבירו את פלט החשיבה של המודל (למשל דלתא `reasoning_content` של Qwen/DeepSeek/סדרת o) ללוח **מחשב** מתקפל מעל התוצאה. הלוח נפתח וגולל אוטומטית בזמן הסטרימינג. פלט החשיבה מיועד להצגה בלבד ואינו מוכנס לעולם לעורך.

providers שאינם משתמשים בסטרימינג מתעלמים מהארגומנט `stream` — הוא אופציונלי.

## חשיבה ומאמץ חשיבה {#thinking-and-reasoning-effort}

שני פקדי משתמש בדיאלוג ממופים לשדות בקשה. שניהם מופעלים באופציה דרך האפשרויות ובבעלות התוסף — אין צורך (וגם לא כדאי) להגדיר את השדות האלה בעצמכם ב-`chatCompletionOptions`.

- **`thinking: true`** מציג את מתג **מחשב** (פעיל כברירת מחדל, מתאפס בכל פתיחת דיאלוג). התוסף כותב את ערך המתג לבקשה בתור `enable_thinking: true | false`.
- **`thinking` חסר או `thinking: false`** מסתיר את המתג והתוסף שולח `enable_thinking: false`, כך שמודלים שחושבים כברירת מחדל לא יחשבו.
- **`reasoningEffort: { options, default? }`** מציג את הרשימה הנפתחת **מאמץ חשיבה**. `options` מפרט את רמות המאמץ המותאמות שברצונכם להציע (`'low' | 'medium' | 'high' | 'xhigh' | 'max'`); התוסף תמיד מוסיף בעצמו פריט `default` (בסיס מצב החשיבה), ולכן אין לרשום את `default` בתצורה שלכם. השדה `default` בוחר מראש אחת מהרמות המותאמות שלכם בעת פתיחת הדיאלוג — כשהוא מושמט, נבחר מראש `default`. הערך מתאפס בכל פתיחה. הרשימה מוצגת רק כש-`options` היא רשימה לא ריקה, ‏`thinking` מופעל ומתג החשיבה פעיל.
- **`showReasoning`** (ברירת מחדל `false`) שולט בלוח **מחשב** המתקפל שמזרים את תהליך החשיבה של המודל (דלתא `reasoning_content`). הגדירו `showReasoning: true` כדי להציג את הלוח תוך השארת החשיבה פעילה — המודל עדיין חושב, התוצאה מוחלת באותו אופן, ורק שלבי החשיבה מוצגים בנוסף.

מכיוון ש-providers (בפרט vLLM/LM Studio) דוחים בקשה שיש בה גם `enable_thinking` וגם `reasoning_effort`, התוסף שולח בדיוק אחד משני אלה:

| מצב | שדה בקשה |
| --- | --- |
| חשיבה פעילה, מאמץ = `default` (או שלא הוגדר מאמץ) | `enable_thinking` (מהמתג) |
| חשיבה פעילה, מאמץ = `low` / `medium` / `high` / `xhigh` / `max` | `reasoning_effort` (מהרשימה הנפתחת); המתג מושבת |
| חשיבה כבויה (המתג כבוי, או ש-`thinking` לא הופעל בתצורה) | `enable_thinking: false`; ‏`reasoning_effort` אינו נשלח |

## שגיאות {#errors}

הדיאלוג מסביר בקשה שנכשלה במקום להציג את השגיאה הגולמית, ומוסיף אחריה את ההודעה של השירות עצמו:

| מה קרה | הסבר |
| --- | --- |
| הדפדפן לא קיבל תשובה (`Failed to fetch`, `NetworkError…`, `Load failed`) | השירות לא פעיל, אינו נגיש, או ש-CORS חסם את התשובה; קונסולת הדפדפן אומרת מה מהם |
| `401` / `403` | בדקו את מפתח ה-API או את הרשאות הגישה |
| `404` | בדקו את נתיב נקודת הקצה |
| `408` / `504` / timeout | השירות לא ענה בזמן |
| `429` | יותר מדי בקשות |
| `5xx` | השירות אינו זמין (טוען מודל, עסוק) |

עם `aiEndpoint` הסטטוס נלקח מהתשובה. `aiProvider` מותאם אישית מקבל את אותם הסברים על ידי זריקת שגיאה עם `status`:

```ts
if (!response.ok) {
  const body = await response.json().catch(() => null)
  throw Object.assign(new Error(body?.error?.message ?? ''), { status: response.status })
}
```

כל שגיאה אחרת מוצגת עם ההודעה שלה עצמה.

## הכנסת התוצאה {#inserting-the-result}

בלחיצה על כפתור הפעולה — **הכנסה**, **החלפת הבחירה** או **הוסף לסוף**, בהתאם למצב — הדיאלוג מציב את `result` בעורך:

- **מצב** — כפתור הפעולה של הדיאלוג הוא כפתור מפוצל. החלק הראשי מחיל את התוצאה במצב שנבחר מראש (**הכנסה** / **החלפת הבחירה** / **הוסף לסוף**): האפשרות `mode` בוחרת אותו מראש, או **החלפת הבחירה** כשטקסט נבחר בעת פתיחת הדיאלוג ו-**הכנסה** אחרת. חלק קטן של “עוד” (⋮) מימין לכפתור פותח תפריט עם שאר המצבים — לחיצה על אחד מהם מחילה את התוצאה באותו מצב מיד. **הכנסה** מציבה את התוצאה בסמן, **החלפת הבחירה** מחליפה את הטקסט הנבחר (שנקלט בלחיצה על **ייצור**), ו-**הוסף לסוף** מוסיפה אותה בסוף המסמך.
- **מגבלת תווים** — כשהעורך מוגדר עם `limit` (התוסף `CharacterCount` דוחה כל טרנזקציה שאינה הדבקה שהייתה מגדילה את המסמך מעבר למגבלה), מונה תווים `generated / limit` מוצג מתחת לשדה התוצאה (בזמן אמת בסטרימינג, באדום רך כשהמגבלה עומדת להיחצות) והדיאלוג מציג את האזהרה `ai.limit_exceeded` מיד לאחר היצירה כשהתוצאה תחרוג מהמגבלה. הכפתור **הכנסה** ותפריט מצבי ההוספה האחרים שלו מושבתים אז: התוצאה מוחלת כולה או לא כלל, ולכן יש לקצר אותה לפני ההחלה.