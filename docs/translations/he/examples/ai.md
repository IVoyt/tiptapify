# AI {#ai}

השתמשו בדמו הזה עם כל ספק תואם OpenAI של `/v1/chat/completions`. שדות ה-endpoint, המודל והטוקן משמשים רק בסשן של הדף הזה ואינם נשמרים.

<InteractiveEditor
  ai-demo
  :items="['ai', '|', 'bold', 'italic', 'underline', '|', 'undo', 'redo']"
  placeholder="כתבו או הדביקו טקסט, ואז השתמשו בכפתור ה-AI בסרגל הכלים..."
/>

## מצב נקודת קצה ב-backend {#backend-endpoint-mode}

עברו בשדה **מצב** ל-**נקודת קצה ב-backend** כדי ש-tiptapify ידבר ישירות עם ה-backend שלכם, בלי `aiProvider` מותאם אישית. הוא שולח payload מינימלי (השדות `prompt`, `instruction` והשדות האופציונליים `stream`, `thinking`, `reasoning_effort`, `model`) לנקודת הקצה ומקבל JSON פשוט, `{ content }` או תשובת סטרימינג ב-SSE — ראו את [מדריך ה-AI](/he/guide/ai#backend-generation-aiendpoint) לחוזה המלא.

## LM Studio מקומי {#local-lm-studio}

עבור LM Studio, השתמשו בנקודת קצה כמו:

```txt
http://localhost:1234/v1/chat/completions
```

אם LM Studio רץ על מכונה אחרת, השתמשו במארח שלה במקום זאת, למשל:

```txt
http://192.168.0.107:1234/v1/chat/completions
```

בדמואים מבוססי דפדפן, השתמשו ב-proxy לפיתוח אם הספק שלכם אינו מאפשר CORS.
