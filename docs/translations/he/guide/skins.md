# Skins {#skins}

**Skin** הוא מראה אחד של מעטפת העורך: סרגל הכלים, הכפתורים והקבוצות שבו, תפריטי הבועה, התפריטים הנפתחים, הדיאלוגים, המסגרת סביב התוכן ומעטפת בחירת התמונה. ה-prop‏ `skin` בוחר אותו:

```vue
<Tiptapify skin="pastel" />
```

סקין (skin) מורכב משני דברים: **טוקנים** (צבעים וגדלים כמשתני CSS) ו**צורה** (וריאנטים מבניים שטוקן אינו יכול לבטא). שני הסקינים המובנים הם `default` — המראה הקלאסי, סרגל כלים מורם עם קבוצות כפתורים מורמות — ו-`pastel`, המראה השקט. סקינים מותאמים אישית הם אזרחים מהשורה הראשונה: `registerSkin()` ואובייקטי סקין מוטבעים נפתרים בדיוק באותו מנגנון, והסקינים המובנים הם סקינים רשומים, לא מקרים מיוחדים.

## טרמינולוגיה: skin לעומת ערכת הנושא של Vuetify {#terminology-skin-vs-vuetify-theme}

- **skin** — המונח הפונה למשתמש למראה אחד של מעטפת העורך: טוקנים + צורה. ה-prop הוא `skin`, הטיפוסים הם `TiptapifySkin*`, הרישום הוא `registerSkin()`, ומחלקת השורש היא `tiptapify-skin-{name}`.
- **theme** — שמור לערכות הנושא הבהירה/כהה של Vuetify. רכיבי Tiptapify ממשיכים להזין את ה-props‏ `theme` שלהם משם ערכת הנושא הנוכחית של Vuetify; מערכת ה-skins לא נוגעת בהם.

הם משתלבים: רוב צבעי הטוקנים המובנים מפנים למשתני ערכת הנושא של Vuetify (`rgb(var(--v-theme-surface))`, …), ולכן ה-skins עוקבים אחר מצב בהיר/כהה אוטומטית. התאים הכהים הקבועים בעמודה הקלאסית — ידית שינוי הגודל (`rgba(0, 0, 0, .5/.8)`), מתאר התמונה הפשוט, צל הבועה וצללי הגובה של התפריטים והדיאלוגים — מכוונים: המראה הקלאסי צובע מעטפת כהה וניטרלית בשתי ערכות הנושא, וקו הבסיס שנמדד מקבע אותם. skin מותאם אישית יכול להפנות למשתני ערכת הנושא בחופשיות — ראו את טבלת הטוקנים.

## מושג {#concept}

### טוקנים {#tokens}

טוקן הוא משתנה CSS בשם `--tf-*`. מפתח הקטלוג הוא ה-camelCase של סיומת ה-CSS: ‏`toolbarBg` → `--tf-toolbar-bg`, ‏`dialogTitleSize` → `--tf-dialog-title-size`. הערכים הם מחרוזות פשוטות — צבעים, קיצורי border מלאים, צללים, ריפודים, רדיוסים.

כל כלל skin בספרייה קיים **פעם אחת**, וקורא את הטוקן שלו עם fallback השווה לערך הקלאסי (הבסיס):

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

skin שנפתר פולט כמשתנים רק את **העקיפות** שלו; ה-fallbacks של ה-CSS נושאים את הבסיס. המשתנים נוחתים על שורש העורך — ומכיוון שתפריטים ודיאלוגים עוברים טלפורטציה החוצה ממנו, גם על עטיפת `SkinScope` של כל תפריט ועל כרטיס הדיאלוג עצמו, כך שהטוקנים עוקבים אחר כל משטח.

### צורה (Shape) {#shape}

שישה דגלים קובעים אילו קבוצות כללים חלות; הטוקנים צובעים אותן:

| דגל | ערכים | מה הוא מחליף |
|---|---|---|
| `toolbar` | `raised` · `flat` | גובה (elevation) של VToolbar ובלי קו דק פנימי, לעומת סרגל שטוח וצבוע בגוון עדין |
| `groups` | `box` · `flat` | מקטעי סרגל הכלים כקופסאות מורמות של **VBtnGroup** (סימון 0.3.2: כפתורים מחוברים, טוקני הקבוצה צובעים את הקופסה) לעומת רצפים של div ב-flex |
| `buttons` | `vuetify` · `quiet` | כפתורי Vuetify מקוריים לעומת כפתורי רפאים עם מצב לחוץ ניטרלי |
| `bubble` | `card` · `flat` | נשמר לתאימות: תפריטי הבועה הם שורה אחת של כפתורי אייקון הצבועה בטוקנים בשתי הצורות (הכפתורים שלהם עוקבים אחר `buttons`) |
| `dialog` | `classic` · `soft` | קו מפריד מתחת לכותרת וסגירה מורמת, לעומת כרטיס רך וסגירה טקסטואלית |
| `menu` | `vuetify` · `soft` | תפריטים נפתחים: רשימת Vuetify לעומת כרטיס בהיר עם ריפוד |

הצורה שנפתרה מקודדת על שורש העורך כשש מחלקות `.tiptapify-shape-{flag}-{value}`, ונחשפת כ-`shape: ComputedRef<ResolvedShape>` ב-[`useTiptapifyConfig()`](/he/api/types#usetiptapifyconfig) עבור רכיבי סרגל כלים מותאמים אישית.

### Extends {#extends}

skin נפתר מעל הבסיס הקלאסי, אחר כך לפי שרשרת ה-`extends` שלו מהשורש כלפי מטה, ואז לפי החברים שלו:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

חוליות חסרות נפתרות לשרשרת שנצברה (עם אזהרת dev); מעגל נפתר לקלאסי (עם אזהרת dev). skin רשום מופנה לפי שם; אובייקט skin מוטבע יכול לעשות `extends` לשם רשום ואינו נכנס לרישום הגלובלי — skins מותאמים אישית אף פעם לא דולפים בין עורכים. מפתחות טוקן לא מוכרים מתעלמים מהם עם אזהרת dev.

דמואים חיים של שלוש הצורות נמצאים ב[דף דוגמאות ה-Skins](/he/examples/skins).

## קטלוג הטוקנים {#token-catalog}

הטבלאות שלהלן הן **חוזה v1**: מפתחות הקטלוג (`TiptapifySkinColors` / `TiptapifySkinMetrics`) הם השמות שאפשר להגדיר. התאים הקלאסיים הם ה-fallbacks של ה-CSS — הערך שכללי הבסיס צובעים כשאף skin לא עוקף את הטוקן.

### סרגל כלים / סרגל {#toolbar-bar}

| טוקן | משתנה CSS | קלאסי | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### פריטים / קבוצות / מפרידים {#items-groups-dividers}

| טוקן | משתנה CSS | קלאסי | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | elevation 2 של Vuetify [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (מרווח: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ התא הקלאסי שנמדד הוא `normal` — ערך ה-flex המקורי של Vuetify, וזה מה שה-fallback של ה-CSS נושא. ערך הבסיס בקטלוג `0px` הוא האורך המפורש המקביל לעקיפות של skin.

<a id="shadow-cells"></a>² תאים שכתוב בהם “elevation *n* של Vuetify” הם תיאוריים: מחרוזת הצל המשולש המדויקת היא הערך שנמדד ב-fixture של קו הבסיס שנשמר ב-commit‏ (`src/skins/__fixtures__/skin-baseline.json`) והיא ה-fallback של ה-CSS. עבור `groupShadow` זה **elevation 2** ‏(`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — תחת `groups: 'box'` המקטע הוא VBtnGroup (‏`elevation="4"`), וכלל הטוקן צובע את הקופסה בשלישייה הזו מעל ה-elevation של הקבוצה עצמה: הקופסה מחזיקה ב-elevation, והכפתורים המחוברים בתוכה אינם נושאים כזה.

### כפתורים {#buttons}

הטוקנים האלה נצרכים **רק תחת `buttons: 'quiet'`** — ראו [נגישות (Reachability)](#reachability).

| טוקן | משתנה CSS | ערך quiet (classic: Vuetify מקורי) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### תפריטי בועה (בחירה, שורה ריקה, תמונה) {#bubble-menus-selection-empty-line-image}

| טוקן | משתנה CSS | קלאסי | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | זהה |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | זהה |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | זהה |

### תפריטים נפתחים {#dropdown-menus}

| טוקן | משתנה CSS | קלאסי | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | elevation 8 של Vuetify [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ תיבת ה-**רשימה** (רדיוס, צל, ריפוד הרשימה) של התפריט הקלאסי היא כיום כלל skin — עטיפת הטוקנים `SkinScope` יושבת בין כלל הצאצא של Vuetify עצמו לבין הרשימה, ולכן הספרייה משחזרת את הפיקסלים האלה ככללי skin שקוראים את הטוקנים שלעיל. פיקסלי ה-**פריטים** נשארים של Vuetify המקורי (ה-fixture מודד שם את ברירות המחדל של Vuetify): ארבעת טוקני הפריטים אינם פעילים כל עוד `menu: 'vuetify'`.

### דיאלוגים {#dialogs}

| טוקן | משתנה CSS | קלאסי | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | elevation של VCard [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (‏VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | ברירת המחדל של השדה (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### מסגרת (עוטף הגבול של העורך) {#frame-editor-border-wrapper}

| טוקן | משתנה CSS | קלאסי | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, ללא קצה עליון | מסגרת מלאה |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

תחת צורת הסרגל השטוח המסגרת צובעת גם דלתא לכל צד (קצה עליון, והקצה התחתון בשקיפות גבול של 1.6×). הדלתא הזו שייכת לצורה, לא לטוקן: אי אפשר להגיע אליה דרך טוקן.

### תמונות וידיות שינוי גודל {#images-and-resize-handles}

| טוקן | משתנה CSS | קלאסי | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (נבחרת) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (ריחוף) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

סרגל הכלים של התמונה עוקב אחר הדגל `buttons`: תחת הצורה השקטה הוא מקבל את המשטח השקט — הריווח שלו של 2px/4px קורא את `--tf-bubble-gap` / `--tf-bubble-padding` עם ה-fallbacks של תפריט התמונה; אין טוקן ייעודי לסרגל הכלים של התמונה.

### לא בקטלוג (טריטוריית פתח מילוט) {#not-in-the-catalog-escape-hatch-territory}

לכמה מידות שמוזכרות בסקירת העיצוב אין טוקן בקטלוג ב-v1: **גובה סרגל הכלים, רוחב המסגרת, רדיוס המסגרת, רוחב כפתור, ריפוד כפתור, רוחב דיאלוג**. טבלאות הקטלוג שלעיל הן החוזה; עבור הפיקסלים האלה פתחו את [פתח המילוט](#escape-hatch-the-root-class) ועצבו ישירות את המחלקות היציבות.

## נגישות (Reachability) {#reachability}

החוזה, כפי שנאמר פעם אחת ונשמר בכל קבוצה שלעיל:

> טוקן צובע משטח רק כשהצורה מפעילה את המשטח הזה; חזותיות Vuetify מקורית מעוצבת באמצעות צבעי ערכת הנושא של Vuetify.

לפי קבוצה:

- **סרגל כלים, מסגרת, מעטפת תמונה/ידיות** — פעילים בכל צורה; הטוקנים צובעים אותם, והתאים הקלאסיים הם המראה המקורי שהטוקנים חוזרים אליו.
- **קופסת הקבוצות** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — תחת `groups: 'box'` המקטע הוא VBtnGroup (מבנה 0.3.2: הכפתורים מתחברים, הקופסה נושאת את ה-elevation); כללי הקופסה צובעים אותה בטוקני הקבוצה, ו-`--tf-group-height` שומר על חוזה 32px עם `!important` (כלל הצפיפות של Vuetify נאבק בו, כמו ב-0.3.2). תחת `groups: 'flat'` המקטעים הם רצפי div פשוטים (שקופים, בלי צל, רדיוס 0 הוא הבסיס של הצורה).
- **קווים דקים של מפרידים** (`dividerWidth/Height/Color`) — הקו הדק הנראה הוא יכולת של `groups: 'flat'`; בצורת הקופסה המפריד הוא מרווח בגודל אפס (`margin: 0 4px` מכלל הבסיס).
- **ריפוד/מרווחי פריטים** — הרצף הקומפקטי `6px 8px` מותנה בסרגל השטוח (`toolbar: 'flat'`), ומרווחי הקבוצות במקטעים השטוחים (`groups: 'flat'`); הסרגל המורם שומר על המידות הקלאסיות.
- **כפתורים** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — אינם פעילים תחת `buttons: 'vuetify'`: כפתורי Vuetify המקוריים צובעים את המצבים שלהם בעצמם. עצבו אותם בצבעי ערכת הנושא של Vuetify (`primary`, `surface`, …) — הצורות הקלאסיות יורשות אותם בכוונה.
- **מידות פריטי תפריט** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — אינן פעילות תחת `menu: 'vuetify'`; Vuetify מחזיקה בפיקסלי הפריטים האלה. תיבת **הרשימה** של התפריט (רדיוס/צל/ריפוד) נצבעת על ידי ה-skin בשתי הצורות (ראו את [הערת התפריט](#menu-classic-note)).
- **מעטפת רכה של דיאלוג** (`dialogActionBtn*`, `dialogFieldRadius`, הריפודים הרכים, הקו המפריד החסר) — נצבעת תחת `dialog: 'soft'`; תחת `dialog: 'classic'` הדיאלוג הוא VCard עם הריפודים הקלאסיים.
- **מעטפת בועה** — תפריטי הבחירה, השורה הריקה והתמונה הם שורה אחת של כפתורי אייקון בשתי הצורות, הנצבעת על ידי טוקני הבועה; `bubble` כבר אינו משנה את הסימון שלהם.

עקיפה השווה לבסיס הקטלוג **אינה נפלטת** — תחת צורה שאינה קלאסית הבסיס של הצורה עצמה נצבע דרך ה-fallback של ה-CSS, ולכן “שחזור” ערך קלאסי (למשל החזרת `buttonActiveBg` ל-`rgb(var(--v-theme-primary))` תחת `buttons: 'quiet'`) אינו עושה דבר בשקט. כדי לכפות ערך בעל מראה קלאסי תחת צורה שאינה קלאסית, הגדירו עקיפה השונה מבסיס הקטלוג — ליטרל שקול כמו `rgba(var(--v-theme-primary), 1)` צובע באופן זהה ושורד את הדילוג.

הטוקנים לא מחוברים בכוונה למסלולים המקוריים — זה מה ששומר על `default` זהה בפיקסלים למראה הקלאסי בזמן שהכול עובר דרך הקטלוג.

## מתכונים {#recipes}

### הרחבת pastel {#extend-pastel}

ירשו את הצורה השקטה וצבעו מחדש כמה משטחים. שמות רשומים עובדים בכל עורך:

```ts
// main.ts — call once, before any editor mounts
import { registerSkin } from 'tiptapify'

registerSkin('mint', {
  extends: 'pastel',
  colors: {
    toolbarBg: 'rgba(0, 128, 0, 0.05)',   // mint tint over the pastel wash
    handleBg: 'rgb(0, 100, 0)',           // deep green handles
    handleBgHover: 'rgb(0, 128, 0)',
    imageOutline: '2px solid rgb(0, 100, 0)',
    imageOutlineHover: 'rgba(0, 100, 0, 0.35)',
  },
})
```

```vue
<Tiptapify skin="mint" />
```

הצורה (flat/quiet/soft) מגיעה מ-pastel; טוקנים שלא נגעתם בהם שומרים את ערכי pastel — גוון הכפתורים השקט נשאר ניטרלי, רק מה שאתם עוקפים זז. זהו ה-skin כפי שהוא מוצג חי ב[דף הדוגמאות](/he/examples/skins#custom-mint).

### הרחבת default {#extend-default}

שמרו על המבנה הקלאסי, כווננו את הצבע:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` הוא השורש המרומז, ולכן אפשר להשמיט את המפתח: ‏`{ toolbar: 'flat', … }` מתחיל גם הוא מהקלאסי.

### התאמה אישית מלאה {#full-custom}

בלי `extends`, בלי רישום: מעבירים את האובייקט ל-prop‏ `skin` וקובעים דגלי צורה וטוקנים בחופשיות. `name` נותן תווית משלכם למחלקת השורש (ראו להלן); בלעדיו היא `tiptapify-skin-inline`.

```vue
<script setup lang="ts">
import { defineSkin } from 'tiptapify'

const slate = defineSkin({
  name: 'slate',
  toolbar: 'flat',
  groups: 'flat',
  buttons: 'quiet',
  bubble: 'flat',
  dialog: 'soft',
  menu: 'soft',
  colors: { toolbarBg: 'rgb(30, 41, 59)', toolbarFg: 'rgb(226, 232, 240)' },
  metrics: { buttonRadius: '8px' },
})
</script>

<template>
  <Tiptapify :skin="slate" />
</template>
```

`defineSkin` היא פונקציית זהות להגדרות const עם טיפוסים (היא אינה נכנסת לשום רישום). אפשר לקבוע דגלי צורה בנפרד — כל דגל שהושמט נשאר קלאסי.

## פתח מילוט: מחלקת השורש {#escape-hatch-the-root-class}

כל שורש עורך נושא `tiptapify-skin-{name}` (‏`tiptapify-skin-inline` לאובייקט מוטבע ללא שם). הספרייה **אף פעם לא מבססת שום כלל על שם skin** — המחלקה שלכם:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

הקרסים היציבים שאפשר לכתוב מולם:

| מחלקה | היכן |
|---|---|
| `tiptapify-skin-{name}` | שורש העורך |
| `tiptapify-shape-{flag}-{value}` ×6 | שורש העורך — הצורה שנפתרה |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | סרגל הכלים והמקטעים שלו |
| `tiptapify-quiet-buttons` | שורשי סרגל הכלים והבועה תחת `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | השורה של כל תפריט בועה והקו הדק בין הקבוצות שלו |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | שורות תפריטי הבחירה, השורה הריקה והתמונה |
| `tiptapify-btn--active` | כפתור לחוץ בתפריט בועה (סימון פעיל, ציפת התמונה) |
| `tiptapify-menu` · `tiptapify-menu--soft` | תוכן שכבת התפריט הנפתח, נושא כללי התפריט הרך |
| `tiptapify-skin-scope` | div היקף הטוקנים בתוך תפריטים שעברו טלפורטציה |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | כרטיס הדיאלוג והנושא הרך שלו |
| `tiptapify-frame` | עוטף הגבול של העורך |

**הגנה מפני ערכות נושא של הצרכן.** שכבת ה-skin בנויה לשרוד ערכות נושא של admin שמוסיפות ריפוד וצובעות מחדש את פנימיות Vuetify: הכללים מותנים במחלקות צורה/נושא, משתמשים במחלקות כפולות (`.v-list.v-list`, ‏`.v-btn.v-btn.v-btn`) לספציפיות, ושומרים `!important` רק היכן שמקרה ערכת הנושא של ה-admin ב-commit הבסיס הוכיח שהוא נחוץ (קבוצת ההגנה של menu.css). מוסכמות ששומרות על העקיפות שלכם עובדות באותו שדה קרב:

- תחמו את ה-CSS שלכם תחת `.tiptapify-skin-{name}` (או מחלקת צורה) — אף פעם לא על פנימיות Vuetify חשופות;
- העדיפו טוקנים (`--tf-*`) למידות שבקטלוג, ומחלקות לשאר;
- התאימו את הכפילות בעקיפת רכיבי Vuetify (‏`.v-list-item` יחיד מפסיד לכללי ה-skin).

## חוזה חזותי (הערה למתרמים) {#visual-contract-contributor-note}

הסגנונות המחושבים של ה-skins המובנים מקובעים על ידי fixture קו הבסיס `src/skins/__fixtures__/skin-baseline.json` (13 מקטעים × בהיר/כהה): שכבת ה-CSS גמורה כשהמטריצה שנמדדה תואמת אותו. הערות קריאה ל-fixture:

- אי אפשר לכפות ממדי hover/active מהדף, ולכן ההקלטה קוראת את **טקסט ההצהרה של כלל ה-CSSOM הראשון שנתפס** עבור כל סלקטור hover ופותרת אותו דרך אלמנט בדיקה בתוך שורש ה-skin (השדה `resolved`) — זהו החוזה של הכלל המנצח, לא תצלום חי של `:hover`.
- `_meta.selectors.menu` רושם את טקסט הסלקטור שלפני `SkinScope`. ה-fixture קפוא (ערכים נורמטיביים), ולכן השדה מיושן בכוונה; חבילת ההקלטה מקבעת את הסלקטור הנוכחי.
- ה-fixture נושא את השינויים המאושרים שלו ב-`_meta.notes`: שחזור 2026-10-18 של סימון VBtnGroup תחת `groups: 'box'` מדד מחדש את שדות הכפתורים הצאצאים `groupBtn`/`buttonsActive` של הקלאסי (פינות מחוברות, הקופסה מחזיקה ב-elevation). שדות pastel לא נגעו — שינוי חזותי מכוון מעדכן רק את התאים הקלאסיים המושפעים, רושם הערה ושולח שורת CHANGELOG.

## ראו גם {#see-also}

- [דוגמאות Skins](/he/examples/skins) — קלאסי, pastel וה-skin המותאם mint, חיים.
- [ה-prop‏ `skin`](/he/api/props#skin) · [טיפוסי skin](/he/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/he/api/types#tiptapifyskininput).
