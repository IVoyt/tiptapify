# סגנונות תוכן {#content-styles}

חלק ממה שהעורך שומר צריך מראה משלו בדף שמציג אותו: כרטיסי קישור, תמונות עם הכיתוב והציפה שלהן, סרטונים והטמעות שמתאימים לרוחב הטקסט, ורשימות משימות עם תיבת סימון ליד כל פריט. בלעדיו כרטיס קישור הוא קישור חשוף שהתמונה והטקסטים שלו מתערבבים.

ה-prop‏ `contentStyles` קובע כיצד ה-HTML השמור נושא את המראה הזה:

| `contentStyles` | ה-HTML השמור | באתר |
|---|---|---|
| `inline` (ברירת מחדל) | המראה נכתב לתוך מאפייני ה-`style` של האלמנטים האלה | אין מה לטעון: ה-HTML מוצג כפי שהוא |
| `classes` | מחלקות ומאפייני `data-` בלבד | טוענים את `tiptapify/content.css` ומניחים את ה-HTML בתוך אלמנט עם המחלקה `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

שתי האפשרויות נושאות את אותם כללים, אלה שבהם העורך עצמו מציג את התוכן, ולכן הדף נראה כמו העורך בשני המקרים. רק האלמנטים האלה מקבלים אותם: כותרות, פסקאות, רשימות, טבלאות ושאר הטקסט שומרים על הסגנונות של האתר.

## סגנונות inline {#inline-styles}

ברירת המחדל. כרטיס קישור קומפקטי נשמר כך:

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

- **הצבעים נשארים של האתר.** הטקסט יורש את צבעו; טקסט עמום וגבולות משתמשים בשקיפות ובאפור חצי שקוף, ולכן הם עובדים כמו שצריך גם בדף בהיר וגם בכהה. את צבע הטקסט של ערכת נושא קובעים באתר כרגיל.
- **אין צורך ב-media queries.** כרטיס קומפקטי מציב את התמונה מעל הטקסטים מעצמו בעמודה צרה; סרטונים והטמעות אף פעם לא רחבים מהטקסט.
- **אתר עדיין יכול לעצב אותם מחדש**, המחלקות נשארות. סגנון inline גובר על כלל של מחלקה, ולכן כלל כזה צריך `!important`.
- **sanitizer חייב להשאיר את המאפיין `style`** באלמנטים האלה, אחרת הם יאבדו את המראה שלהם.

## מחלקות ו-content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` קטן ואין בו Vue או Vuetify. הכללים שלו עטופים ב-`:where(.tiptapify-content)`, ולכן אין להם משקל: כל כלל של האתר גובר עליהם בלי `!important`. השתמשו בזה כשהאתר רוצה את המראה במקום אחד, או מעצב את התוכן שלו בעצמו.

`contentCss(scope)` מחזיר את אותו גיליון סגנונות כמחרוזת, עבור מחלקה אחרת מ-`tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## טעינת HTML בחזרה {#loading-html-back}

העורך קורא את האלמנטים האלה לפי המאפיינים והמחלקות שלהם בלבד: כרטיס קישור לפי `data-link-card`, תמונה לפי `src`, הגודל והציפה שלה, משימה לפי `data-checked`. סגנונות ה-inline שלהם מתעלמים בטעינת HTML, ונכתבים מחדש בשמירה. כך אותו HTML עובר הלוך ושוב ללא שינוי, מסמך שנשמר עם `inline` נטען נקי עם `classes` ולהפך, וגרסה מאוחרת יותר של העורך מעדכנת את המראה של מסמך בפעם הבאה שהוא נשמר.

עיצוב הטקסט לא נפגע: הצבע או הגודל של טקסט והיישור של פסקה הם תוכן, והעורך ממשיך לקרוא אותם מהסגנונות שלהם.

כדי להפוך HTML עם מחלקות ל-HTML עם סגנונות inline מחוץ לעורך (מסמך ישן יותר, אימייל), השתמשו ב-`inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

היא דורשת DOM (דפדפן, או jsdom בשרת) ובלעדיו מחזירה את ה-HTML כפי שהוא.

## סליידרים של תמונות {#image-sliders}

העורך מסמן תמונות בשורה כסליידר בזמן הכתיבה (ראו את ה-prop‏ `imageSlider`); ה-HTML השמור שומר אותן כ-figure אחד אחרי השני. הצגתן כסליידר נתונה לסקריפט של האתר עצמו.
