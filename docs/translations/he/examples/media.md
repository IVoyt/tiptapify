# מדיה {#media}

## תמונות {#images}

הוספת תמונות מ-URL:

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

כפתור התמונה פותח את דיאלוג התמונה:

- **מכתובת URL** או **העלאה**. בלי [נקודת קצה להעלאה](/he/guide/uploads) קובץ שנבחר מוטמע כ-data URL בפורמט base64; עם נקודת קצה הקובץ נשלח לשרת שלכם.
- **טקסט חלופי לקוראי מסך** (הדיאלוג מזכיר כשהוא ריק) ו**כיתוב** מתחת לתמונה.
- **גודל**: מקורי, רוחב הטקסט, או רוחב × גובה מותאמים אישית עם נעילת היחס.
- **מיקום**: במרכז בשורה נפרדת, או צף משמאל או מימין לטקסט.

לתמונה שנבחרה יש ידיות לשינוי גודל (כל שינוי גודל הוא צעד ביטול אחד) וסרגל כלים מעליה: ציפה לשמאל או לימין, הורדה, עריכה, מחיקה. לחיצה כפולה פותחת את הדיאלוג.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## סרטונים {#videos}

הטמעת סרטוני YouTube ו-Vimeo, או קובץ וידאו:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

כפתור הסרטון פותח את דיאלוג הסרטון:

- **קישור ל-YouTube או ל-Vimeo** הופך לנגן שלהם; הדיאלוג מציג את הספק שזוהה ותצוגה מקדימה, ו-**התחלה ב-** (ממולא מראש מתוך `?t=`) כשהנגן תומך בכך.
- **קישור לקובץ וידאו** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) הופך ל-`<video>` עם תמונת שער, פקדים, הפעלה אוטומטית (ללא קול) ולולאה. הקישור צריך את הפרוטוקול שלו (`https://`, `http://`), `//host` או `/path`: הדיאלוג אף פעם לא מנחש אותו.
- **העלאה** שולחת קובץ וידאו לשרת שלכם; היא מוצגת רק עם [נקודת קצה להעלאה](/he/guide/uploads).
- **גודל**: רספונסיבי 16:9, או רוחב × גובה מותאמים אישית עם נעילת היחס.

גם כתובת YouTube שהודבקה בטקסט מוטמעת. לחיצה על נגן בוחרת אותו במקום להפעיל אותו, כך שכפתור סרגל הכלים מציג אותו; לחיצה כפולה פותחת את הדיאלוג.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="הדביקו כתובת YouTube כדי להטמיע סרטון..." />

## Iframes {#iframes}

הטמעת דף לפי כתובתו או לפי קוד ה-iframe מתפריט השיתוף (Share) או ההטמעה (Embed) שלו:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

דיאלוג ה-iframe קורא קוד שהודבק (כתובת, גודל, כותרת, הרשאות, sandbox, טעינה מושהית, מסך מלא) ואומר מה לקח ממנו; קוד עם סקריפטים או תגים אחרים נדחה. הוא מציג תצוגה מקדימה ויש בו **כותרת לקוראי מסך**, את הגודל (רספונסיבי ביחס של הקוד, או מותאם אישית עם נעילת היחס), ותחת **מתקדם** את השם, `allow`, `sandbox`, טעינה מושהית ומסגרת. הכתובת צריכה `https://` או `http://`. לחיצה כפולה על הטמעה פותחת את הדיאלוג.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="הזינו URL להטמעה כ-iframe..." />

## טבלאות {#tables}

הוספה ועריכה של טבלאות:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

לאחר הוספת טבלה אפשר:
- להוסיף/להסיר שורות ועמודות
- לבחור תאים
- למחוק את הטבלה כולה

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="השתמשו בכפתור הטבלה כדי להוסיף טבלה..." />

## קישורים {#links}

הוספת היפר-קישורים:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

דיאלוג הקישור מקבל את הכתובת כפי שהוקלדה: `https://…`, כל סכמה אחרת (`ftp://`, `ssh://`, סכמה פנימית), `mailto:`, `tel:`, `#anchor` או `/page`. הוא אף פעם לא מוסיף פרוטוקול מעצמו: כתובת בלי פרוטוקול (`example.com`, `internal.host:8080`) מקבלת צ'יפים להוספת `https://`, `http://` או `ftp://`, ונשארת כפי שהוקלדה אם לא הוספתם. כתובות `javascript:`, `vbscript:` ו-`data:` נדחות.

בדיאלוג יש גם את טקסט הקישור, **פתיחה בכרטיסייה חדשה** (שמוסיפה `noopener noreferrer`), ותחת **מתקדם** את ערכי ה-`rel` כצ'יפים (כל ערך: Enter, רווח או פסיק מוסיפים אותו) ומחלקת CSS.

עם ה-prop‏ [`linkPreview`](/he/api/props#linkpreview) אותו דיאלוג מציג קישור ככרטיס עם תמונת הדף, כותרתו ותיאורו, וכתובת URL שהודבקה בשורה ריקה מציעה **קישור / כרטיס** — ראו [כרטיסי קישור](/he/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="בחרו טקסט ולחצו על קישור כדי להוסיף היפר-קישור..." />

## אימוג'י {#emoji}

הוספת אימוג'י מהבורר המובנה עם 10 קטגוריות:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

בורר האימוג'י כולל שדה חיפוש/סינון למציאת אימוג'י מסוים במהירות.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="לחצו על כפתור האימוג'י כדי להוסיף אימוג'י..." />

## תווים מיוחדים (Charmap) {#special-characters-charmap}

הוספת תווים מיוחדים, חצים, אותיות יווניות, סמלים מתמטיים ועוד:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

הקטגוריות כוללות:
- חצים
- מטבעות
- אותיות יווניות
- סמלים מתמטיים
- שונות

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="לחצו על charmap כדי להוסיף תווים מיוחדים..." />

## שילוב כלי מדיה {#combining-media-tools}

סרגל כלים מלא לעבודה עם מדיה:

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
placeholder="סרגל כלים מלא למדיה..." />
