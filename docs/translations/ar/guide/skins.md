# السمات {#skins}

**السمة** (skin) هي مظهر واحد لواجهة المحرر: شريط الأدوات، وما فيه من أزرار ومجموعات، وقوائم الفقاعة، والقوائم المنسدلة، والنوافذ الحوارية، والإطار المحيط بالمحتوى، وواجهة تحديد الصورة. وتحددها الخاصية `skin`:

```vue
<Tiptapify skin="pastel" />
```

يتكوّن السمة (skin) من شيئين: **الرموز** (tokens) أي الألوان والأحجام على شكل متغيرات CSS، و**الشكل** أي المتغيرات البنيوية التي لا يستطيع الرمز التعبير عنها. السمتان المدمجتان هما `default` — المظهر الكلاسيكي، شريط أدوات بارز مع مجموعات أزرار بارزة — و`pastel`، المظهر الهادئ. السمات المخصصة مواطن من الدرجة الأولى: تُعالَج `registerSkin()` وكائنات السمات المضمّنة بالآلية نفسها تمامًا، والسمات المدمجة مجرد سمات مسجَّلة وليست حالات خاصة.

## المصطلحات: السمة (skin) مقابل سمة Vuetify (theme) {#terminology-skin-vs-vuetify-theme}

- **skin** — المصطلح الموجَّه للمستخدم لمظهر واحد من واجهة المحرر: الرموز + الشكل. الخاصية هي `skin`، والأنواع هي `TiptapifySkin*`، والسجل هو `registerSkin()`، وفئة الجذر هي `tiptapify-skin-{name}`.
- **theme** — مخصص لسمات Vuetify الفاتحة/الداكنة. تُبقي مكوّنات Tiptapify خصائص `theme` الخاصة بها مغذّاة باسم سمة Vuetify الحالية؛ ولا يمسّها نظام السمات (skins) إطلاقًا.

وهما يتكاملان: تشير معظم ألوان الرموز المدمجة إلى متغيرات سمة Vuetify (`rgb(var(--v-theme-surface))` وغيرها)، فتتبع السمات الوضعين الفاتح والداكن تلقائيًا. أما الخلايا الداكنة الثابتة في عمود classic — مقبض تغيير الحجم (`rgba(0, 0, 0, .5/.8)`)، وإطار الصورة العادي، وظل الفقاعة، وظلال ارتفاع القوائم والنوافذ الحوارية — فهي مقصودة: يرسم المظهر الكلاسيكي واجهة داكنة محايدة في السمتين، ويثبّتها خط الأساس المقيس. ويمكن للسمة المخصصة أن تشير إلى متغيرات السمة بحرية — راجع جدول الرموز.

## المفهوم {#concept}

### الرموز (Tokens) {#tokens}

الرمز خاصية CSS مخصصة باسم `--tf-*`. ومفتاح الكتالوج هو صيغة camelCase للاحقة CSS: `toolbarBg` ← `--tf-toolbar-bg`، و`dialogTitleSize` ← `--tf-dialog-title-size`. والقيم نصوص عادية — ألوان، واختصارات حدود كاملة، وظلال، وحشوات، وأنصاف أقطار.

كل قاعدة سمة في المكتبة موجودة **مرة واحدة**، وتقرأ رمزها مع قيمة احتياطية تساوي القيمة الكلاسيكية (الأساسية):

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

تُصدر السمة المحلَّلة **تعديلاتها** فقط كمتغيرات؛ وتحمل القيم الاحتياطية في CSS القيمة الأساسية. وتظهر المتغيرات على جذر المحرر — ولأن القوائم والنوافذ الحوارية تنتقل خارجه (teleport)، فتظهر أيضًا على غلاف `SkinScope` لكل قائمة وعلى بطاقة النافذة نفسها، فتتبع الرموز كل سطح.

### الشكل (Shape) {#shape}

ستة أعلام تحدد مجموعات القواعد التي تُطبَّق؛ وتتولى الرموز تلوينها:

| العلم | القيم | ما الذي يبدّله |
|---|---|---|
| `toolbar` | `raised` · `flat` | ارتفاع VToolbar بدون خط رفيع داخلي مقابل شريط مسطح بلون خفيف |
| `groups` | `box` · `flat` | أقسام شريط الأدوات كصناديق **VBtnGroup** بارزة (بنية 0.3.2: أزرار متصلة، وتلوّن رموز المجموعة الصندوق) مقابل صفوف div عادية بنظام flex |
| `buttons` | `vuetify` · `quiet` | أزرار Vuetify الأصلية مقابل أزرار شفافة بحالة ضغط محايدة |
| `bubble` | `card` · `flat` | محتفَظ به للتوافق: قوائم الفقاعة صف واحد من أزرار الأيقونات تلوّنه الرموز في الشكلين (وتتبع أزرارها `buttons`) |
| `dialog` | `classic` · `soft` | فاصل تحت العنوان وزر إغلاق بارز مقابل بطاقة ناعمة وزر إغلاق نصي |
| `menu` | `vuetify` · `soft` | القوائم المنسدلة: قائمة Vuetify مقابل البطاقة الفاتحة ذات الحشوة |

يُرمَّز الشكل المحلَّل على جذر المحرر كست فئات `.tiptapify-shape-{flag}-{value}`، ويُكشف كـ `shape: ComputedRef<ResolvedShape>` في [`useTiptapifyConfig()`](/ar/api/types#usetiptapifyconfig) لمكوّنات شريط الأدوات المخصصة.

### الوراثة (Extends) {#extends}

تُحلَّل السمة فوق القاعدة الكلاسيكية، ثم سلسلة `extends` الخاصة بها بادئةً من الجذر، ثم أعضاؤها هي:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

تُحلَّل الحلقات المفقودة إلى السلسلة المتراكمة (مع تحذير في وضع التطوير)؛ وتُحلَّل الحلقة الدائرية إلى classic (مع تحذير في وضع التطوير). تُشار السمة المسجّلة بالاسم؛ ويمكن لكائن سمة مضمّن أن يرث `extends` من اسم مسجّل ولا يدخل السجل العام أبدًا — فلا تتسرب السمات المخصصة بين المحررات. وتُتجاهل مفاتيح الرموز غير المعروفة مع تحذير في وضع التطوير.

عروض حية للأشكال الثلاثة في [صفحة أمثلة السمات](/ar/examples/skins).

## كتالوج الرموز {#token-catalog}

الجداول أدناه هي **عقد الإصدار v1**: مفاتيح الكتالوج (`TiptapifySkinColors` / `TiptapifySkinMetrics`) هي الأسماء التي يمكنك ضبطها. وخلايا classic هي القيم الاحتياطية في CSS — القيمة التي ترسمها القواعد الأساسية عندما لا تعدّل أي سمة الرمز.

### شريط الأدوات / الشريط {#toolbar-bar}

| الرمز | متغير CSS | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### العناصر / المجموعات / الفواصل {#items-groups-dividers}

| الرمز | متغير CSS | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify elevation 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (spacer: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ الخلية الكلاسيكية المقيسة هي `normal` — قيمة flex الأصلية في Vuetify، وهي ما تحمله القيمة الاحتياطية في CSS. والقيمة الأساسية في الكتالوج `0px` هي الطول الصريح المكافئ لتعديلات السمات.

<a id="shadow-cells"></a>² الخلايا التي تقرأ «Vuetify elevation *n*» وصفية: فسلسلة الظل الثلاثي الدقيقة هي القيمة المقيسة في ملف خط الأساس المثبَّت (`src/skins/__fixtures__/skin-baseline.json`) وهي القيمة الاحتياطية في CSS. وبالنسبة إلى `groupShadow` هي **elevation 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — ففي `groups: 'box'` يكون القسم VBtnGroup (`elevation="4"`)، وتلوّن قاعدة الرمز الصندوق بهذا الظل الثلاثي فوق ارتفاع المجموعة نفسها: فالصندوق يملك الارتفاع، ولا تحمل الأزرار الفرعية المتصلة أيًا منه.

### الأزرار {#buttons}

تُستهلك هذه الرموز **فقط في `buttons: 'quiet'`** — راجع [قابلية الوصول](#reachability).

| الرمز | متغير CSS | قيمة quiet (في classic: Vuetify الأصلية) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### قوائم الفقاعة (التحديد، السطر الفارغ، الصورة) {#bubble-menus-selection-empty-line-image}

| الرمز | متغير CSS | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | نفسه |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | نفسه |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | نفسه |

### القوائم المنسدلة {#dropdown-menus}

| الرمز | متغير CSS | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify elevation 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ صندوق **القائمة** (نصف القطر والظل وحشوة القائمة) في القائمة الكلاسيكية قاعدة سمة اليوم — فغلاف الرموز `SkinScope` يقع بين قاعدة Vuetify الفرعية الخاصة والقائمة، لذا تستعيد المكتبة هذه البكسلات كقواعد سمة تقرأ الرموز أعلاه. أما بكسلات **العنصر** فتبقى أصلية من Vuetify (إذ يقيس ملف خط الأساس القيم الافتراضية لـ Vuetify هناك): فرموز العناصر الأربعة غير فعّالة ما دام `menu: 'vuetify'`.

### النوافذ الحوارية {#dialogs}

| الرمز | متغير CSS | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard elevation [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | field default (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### الإطار (غلاف حدود المحرر) {#frame-editor-border-wrapper}

| الرمز | متغير CSS | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, بدون الحافة العلوية | إطار كامل |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

في شكل شريط الأدوات المسطح يرسم الإطار أيضًا فرقًا لكل جانب (حافة علوية، وحافة سفلية بشفافية حد 1.6×). وذلك الفرق ينتمي إلى الشكل لا إلى رمز: فلا يمكن الوصول إليه عبر الرموز.

### الصور ومقابض تغيير الحجم {#images-and-resize-handles}

| الرمز | متغير CSS | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (محددة) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (عند التمرير) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

يتبع شريط أدوات الصورة العلم `buttons`: ففي الشكل الهادئ يحصل على السطح الهادئ — وتقرأ مسافاته 2px/4px المتغيرين `--tf-bubble-gap` / `--tf-bubble-padding` مع القيم الاحتياطية لقائمة الصورة؛ وليس هناك رمز مخصص لشريط أدوات الصورة.

### غير موجودة في الكتالوج (منطقة المخرج الاحتياطي) {#not-in-the-catalog-escape-hatch-territory}

بعض الأبعاد المذكورة في نظرة التصميم العامة ليس لها رمز في كتالوج v1: **ارتفاع شريط الأدوات، وعرض الإطار، ونصف قطر الإطار، وعرض الزر، وحشوة الزر، وعرض النافذة الحوارية**. وجداول الكتالوج أعلاه هي العقد؛ ولهذه البكسلات افتح [المخرج الاحتياطي](#escape-hatch-the-root-class) ونسّق الفئات الثابتة مباشرة.

## قابلية الوصول {#reachability}

العقد، مذكور مرة واحدة وتلتزم به كل مجموعة أعلاه:

> يلوّن الرمز سطحًا فقط عندما يفعّل الشكل ذلك السطح؛ أما عناصر Vuetify الأصلية فتُنسَّق عبر ألوان سمة Vuetify.

لكل مجموعة:

- **شريط الأدوات والإطار وواجهة الصورة/المقابض** — فعّالة في كل شكل؛ تلوّنها الرموز، وخلايا classic هي المظهر الأصلي الذي تعود إليه الرموز.
- **صندوق المجموعات** (`groupBg` و`groupRadius` و`groupHeight` و`groupShadow`) — في `groups: 'box'` يكون القسم VBtnGroup (بنية 0.3.2: تتصل الأزرار ويحمل الصندوق الارتفاع)؛ وتلوّنه قواعد الصندوق برموز المجموعة، ويحافظ `--tf-group-height` على عقد 32px باستخدام `!important` (فقاعدة الكثافة في Vuetify تنازعه، كما في 0.3.2). وفي `groups: 'flat'` تكون الأقسام صفوف div عادية (شفافة وبلا ظل ونصف القطر 0 هو أساس الشكل).
- **الخطوط الرفيعة للفواصل** (`dividerWidth/Height/Color`) — الخط الرفيع المرئي ميزة خاصة بـ `groups: 'flat'`؛ وفي الشكل الصندوقي يكون الفاصل مباعدًا بحجم صفري (`margin: 0 4px` من القاعدة الأساسية).
- **حشوة العناصر/المسافات** — الصف المدمج `6px 8px` مرتبط بالشريط المسطح (`toolbar: 'flat'`)، ومسافات المجموعات بالأقسام المسطحة (`groups: 'flat'`)؛ ويحتفظ الشريط البارز بالقياسات الكلاسيكية.
- **الأزرار** (`buttonFg` و`buttonHover*` و`buttonActive*` و`buttonRadius`) — غير فعّالة في `buttons: 'vuetify'`: فأزرار Vuetify الأصلية ترسم حالاتها بنفسها. نسّقها بألوان سمة Vuetify (`primary` و`surface` وغيرهما) — فالأشكال الكلاسيكية ترثها عن قصد.
- **قياسات عناصر القائمة** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — غير فعّالة في `menu: 'vuetify'`؛ فـ Vuetify تملك بكسلات تلك العناصر. أما صندوق **قائمة** القائمة (نصف القطر/الظل/الحشوة) فتلوّنه السمة في الشكلين (راجع [ملاحظة القائمة](#menu-classic-note)).
- **واجهة النافذة الحوارية الناعمة** (`dialogActionBtn*` و`dialogFieldRadius` والحشوات الناعمة والفاصل المفقود) — تُرسم في `dialog: 'soft'`؛ وفي `dialog: 'classic'` تكون النافذة VCard بالحشوات الكلاسيكية.
- **واجهة الفقاعة** — قوائم التحديد والسطر الفارغ والصورة صف واحد من أزرار الأيقونات في الشكلين، تلوّنها رموز الفقاعة؛ ولم يعد `bubble` يغيّر بنيتها.

التعديل المساوي لقيمة الكتالوج الأساسية **لا يُصدَر** — ففي شكل غير كلاسيكي يرسم أساس الشكل نفسه عبر القيمة الاحتياطية في CSS، لذا فإن «استعادة» قيمة كلاسيكية (مثل إعادة `buttonActiveBg` إلى `rgb(var(--v-theme-primary))` في `buttons: 'quiet'`) لا تفعل شيئًا بصمت. ولفرض قيمة بمظهر كلاسيكي في شكل غير كلاسيكي، اضبط تعديلًا يختلف عن أساس الكتالوج — فقيمة حرفية مكافئة مثل `rgba(var(--v-theme-primary), 1)` تُرسم بالشكل نفسه وتنجو من التخطي.

لا تُوصَّل الرموز بالمسارات الأصلية عن قصد — وهذا ما يُبقي `default` مطابقًا للمظهر الكلاسيكي بكسلًا ببكسل بينما يمر كل شيء عبر الكتالوج.

## وصفات {#recipes}

### الوراثة من pastel {#extend-pastel}

ورّث الشكل الهادئ وأعد تلوين بعض الأسطح. الأسماء المسجّلة تعمل على أي محرر:

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

يأتي الشكل (flat/quiet/soft) من pastel؛ وتحتفظ الرموز التي لم تمسّها بقيم pastel — فيبقى طلاء الزر الهادئ محايدًا، ولا يتحرك إلا ما تعدّله. هذه هي السمة المعروضة حيًّا في [صفحة الأمثلة](/ar/examples/skins#custom-mint).

### الوراثة من default {#extend-default}

احتفظ بالبنية الكلاسيكية وعدّل الألوان:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` هو الجذر الضمني، لذا يمكن حذف المفتاح: فـ `{ toolbar: 'flat', … }` يبدأ من classic أيضًا.

### تخصيص كامل {#full-custom}

بدون `extends` وبدون تسجيل: مرّر الكائن إلى الخاصية `skin` واضبط أعلام الشكل والرموز بحرية. يضع `name` تسميتك الخاصة على فئة الجذر (انظر أدناه)؛ وبدونه تكون `tiptapify-skin-inline`.

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

`defineSkin` دالة مساعدة تعيد ما تُمرَّر به لتعريف ثوابت مكتوبة الأنواع (ولا تدخل أي سجل). ويمكن ضبط أعلام الشكل فرادى — فكل علم تحذفه يبقى كلاسيكيًا.

## المخرج الاحتياطي: فئة الجذر {#escape-hatch-the-root-class}

يحمل كل جذر محرر `tiptapify-skin-{name}` (و`tiptapify-skin-inline` للكائن المضمّن بلا اسم). **لا تربط المكتبة أي قاعدة باسم سمة أبدًا** — فالفئة لك:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

المقابض الثابتة التي يمكنك الكتابة عليها:

| الفئة | أين |
|---|---|
| `tiptapify-skin-{name}` | جذر المحرر |
| `tiptapify-shape-{flag}-{value}` ×6 | جذر المحرر — الشكل المحلَّل |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | شريط الأدوات وأقسامه |
| `tiptapify-quiet-buttons` | جذرا شريط الأدوات والفقاعة في `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | صف كل قائمة فقاعة والخط الرفيع بين مجموعاتها |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | صفوف قوائم التحديد والسطر الفارغ والصورة |
| `tiptapify-btn--active` | زر مضغوط في قائمة فقاعة (تنسيق نشط، أو عوم الصورة) |
| `tiptapify-menu` · `tiptapify-menu--soft` | محتوى تراكب القائمة المنسدلة، حامل قواعد القائمة الناعمة |
| `tiptapify-skin-scope` | عنصر div لنطاق الرموز داخل القوائم المنقولة (teleport) |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | بطاقة النافذة الحوارية وحاملها الناعم |
| `tiptapify-frame` | غلاف حدود المحرر |

**الدفاع عن سمة المستهلك.** بُنيت طبقة السمات لتصمد أمام سمات الإدارة التي تضيف حشوات وتعيد طلاء عناصر Vuetify الداخلية: تُقيَّد القواعد بفئات الشكل/الحامل، وتستخدم فئات مضاعفة (`.v-list.v-list` و`.v-btn.v-btn.v-btn`) لرفع التخصيص، وتُبقي `!important` فقط حيث أثبتت حالة سمة الإدارة في الإيداع الأساسي أنه ضروري (مجموعة الدفاع في menu.css). وفيما يلي أعراف تُبقي تعديلاتك الخاصة تعمل في ساحة المعركة نفسها:

- حصر شيفرة CSS الخاصة بك تحت `.tiptapify-skin-{name}` (أو فئة شكل) — وليس على عناصر Vuetify الداخلية مباشرة؛
- فضّل الرموز (`--tf-*`) لأبعاد الكتالوج، والفئات لغيرها؛
- طابِق المضاعفة عند تجاوز مكوّنات Vuetify (فـ `.v-list-item` المفردة تخسر أمام قواعد السمة).

## العقد البصري (ملاحظة للمساهمين) {#visual-contract-contributor-note}

الأنماط المحسوبة للسمات المدمجة مثبَّتة بملف خط الأساس `src/skins/__fixtures__/skin-baseline.json` (13 قسمًا × فاتح/داكن): تكتمل طبقة CSS عندما تطابقه المصفوفة المقيسة. ملاحظات قراءة للملف:

- لا يمكن فرض أبعاد hover/active من الصفحة، لذا يقرأ التسجيل **نص تصريح أول قاعدة CSSOM مطابقة** لكل محدد hover ويحلّه عبر عنصر فحص داخل جذر السمة (الحقل `resolved`) — فهو عقد القاعدة الفائزة، وليس لقطة حية لـ `:hover`.
- يسجّل `_meta.selectors.menu` نص المحدد السابق لـ `SkinScope`. والملف مجمّد (قيم معيارية)، فالحقل قديم عن قصد؛ وتثبّت حزمة التسجيل المحدد الحالي.
- يحمل الملف تغييراته المعتمدة في `_meta.notes`: فاستعادة بنية VBtnGroup بتاريخ 2026-10-18 في `groups: 'box'` أعادت قياس حقول الأزرار الفرعية الكلاسيكية `groupBtn`/`buttonsActive` (زوايا متصلة، والصندوق يملك الارتفاع). وحقول pastel لم تُمسّ — فالتغيير البصري المتعمد يحدّث فقط الخلايا الكلاسيكية المتأثرة، ويسجّل ملاحظة، ويُشحن مع سطر في CHANGELOG.

## انظر أيضًا {#see-also}

- [أمثلة السمات](/ar/examples/skins) — classic وpastel وسمة mint المخصصة، حيّة.
- [الخاصية `skin`](/ar/api/props#skin) · [أنواع السمات](/ar/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/ar/api/types#tiptapifyskininput).
