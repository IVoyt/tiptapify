# פקודות לוכסן {#slash-commands}

פקודות לוכסן מספקות תפריט הוספה מהירה שמופיע כשמקלידים `/` בתחילת שורה.

## הפעלת פקודות לוכסן {#enabling-slash-commands}

פקודות לוכסן מופעלות כברירת מחדל. כדי לשלוט בהן במפורש:

```vue
<template>
  <Tiptapify
    :slash-commands="true"
    placeholder="Type / to see available commands..."
  />
</template>
```

<InteractiveEditor
placeholder="הדגמת פקודות לוכסן..."
:slash-commands="true"
/>

## פקודות זמינות {#available-commands}

הקלידו `/` בעורך כדי לראות את לוח הפקודות. הפקודות הזמינות כוללות:

| פקודה           | תיאור                              |
|-----------------|------------------------------------|
| `/h1` - `/h6`   | הוספת כותרת (רמות 1-6)             |
| `/bulletList`   | הוספת רשימת תבליטים                |
| `/numberedList` | הוספת רשימה ממוספרת                |
| `/taskList`     | הוספת רשימת משימות                 |
| `/code`         | הוספת קוד בתוך השורה               |
| `/codeBlock`    | הוספת בלוק קוד                     |
| `/quote`        | הוספת ציטוט                        |
| `/image`        | הוספת תמונה (פותח דיאלוג URL)      |
| `/video`        | הטמעת סרטון YouTube                |
| `/table`        | הוספת טבלה                         |
| `/link`         | הוספת היפר-קישור                   |
| `/divider`      | הוספת קו אופקי                     |
| `/emoji`        | פתיחת בורר אימוג'י                 |
| `/specialChars` | פתיחת תווים מיוחדים                |

## איך זה עובד {#how-it-works}

1. מקמו את הסמן בתחילת שורה או אחרי רווח
2. הקלידו `/` — לוח הפקודות מופיע
3. המשיכו להקליד כדי לסנן פקודות
4. לחצו `Enter` או לחצו על הפקודה כדי להוסיף את הפקודה שנבחרה

## השבתת פקודות לוכסן {#disabling-slash-commands}

```vue
<template>
  <Tiptapify
    :slash-commands="false"
    placeholder="Slash commands disabled..."
  />
</template>
```

## פקודות לוכסן עם תפריט צף {#slash-commands-with-floating-menu}

שלבו פקודות לוכסן עם התפריט הצף לחוויית עריכה מיטבית:

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

- **פקודות לוכסן** (`/`) — מופעלות בהקלדת `/` בתחילת שורה
- **תפריט צף** — מופיע כשמניחים את הסמן על שורה ריקה (מציע פעולות ברמת בלוק)
- **תפריט בועה** — מופיע כשבוחרים טקסט (מציע עיצוב בתוך השורה)

## סינון הפקודות הזמינות {#filtering-available-commands}

אפשר לציין אילו פקודות לכלול על ידי העברת מערך של מזהי פקודות:

```vue
<template>
  <Tiptapify
    :slash-commands="['h1', 'h2', 'h3', 'bulletList', 'numberedList', 'quote']"
    placeholder="Filtered commands..."
  />
</template>
```

### מזהי פקודות זמינים {#available-command-ids}

| מזהה           | תיאור                |
|----------------|----------------------|
| `h1` - `h6`    | רמות כותרת 1-6       |
| `bulletList`   | רשימת תבליטים        |
| `numberedList` | רשימה ממוספרת        |
| `taskList`     | רשימת משימות         |
| `code`         | קוד בתוך השורה       |
| `codeBlock`    | בלוק קוד             |
| `quote`        | ציטוט                |
| `image`        | תמונה                |
| `video`        | סרטון YouTube        |
| `table`        | טבלה                 |
| `link`         | קישור                |
| `divider`      | קו אופקי             |
| `emoji`        | אימוג'י              |
| `specialChars` | תווים מיוחדים        |
