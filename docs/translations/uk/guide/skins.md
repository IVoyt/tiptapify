# Скіни {#skins}

**Скін** — це один вигляд оболонки редактора: панелі інструментів, кнопок і груп у ній, bubble-меню, випадних меню, діалогів, рамки навколо вмісту та оболонки виділення зображення. Його вибирає проп `skin`:

```vue
<Tiptapify skin="pastel" />
```

Скін складається з двох частин: **токенів** (кольори та розміри як CSS-змінні) і **форми** (структурні варіанти, які токени не можуть виразити). Два вбудовані скіни: `default` — класичний вигляд, піднятий тулбар із піднятими групами кнопок, і `pastel` — тихий вигляд. Власні скіни повноправні: `registerSkin()` та інлайнові об'єкти скінів обробляються тим самим механізмом, а вбудовані скіни — це звичайні зареєстровані скіни, а не особливі випадки.

## Термінологія: скін і тема Vuetify {#terminology-skin-vs-vuetify-theme}

- **скін (skin)** — термін для користувача, що означає один вигляд оболонки редактора: токени + форма. Проп називається `skin`, типи — `TiptapifySkin*`, реєстр — `registerSkin()`, кореневий клас — `tiptapify-skin-{name}`.
- **тема (theme)** — зарезервовано за світлою/темною темами Vuetify. Компоненти Tiptapify отримують свої пропи `theme` з поточної назви теми Vuetify; система скінів їх ніколи не чіпає.

Вони поєднуються: більшість кольорових токенів вбудованих скінів посилаються на змінні теми Vuetify (`rgb(var(--v-theme-surface))`, …), тож скіни автоматично слідують світлій/темній темі. Фіксовано-темні клітинки в колонці classic — маркер зміни розміру (`rgba(0, 0, 0, .5/.8)`), звичайний контур зображення, тінь bubble-меню та тіні підвищення меню/діалогів — задумані навмисно: класичний вигляд малює нейтрально-темну оболонку в обох темах, а виміряна базова лінія їх закріплює. Власний скін може вільно посилатися на змінні теми — див. таблицю токенів.

## Концепція {#concept}

### Токени {#tokens}

Токен — це CSS custom property з назвою `--tf-*`. Ключ каталогу — це camelCase від CSS-суфікса: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Значення — прості рядки: кольори, повні скорочення рамок, тіні, відступи, радіуси.

Кожне правило скіну в бібліотеці існує **один раз** і читає свій токен із запасним значенням, що дорівнює класичному (базовому):

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Розв'язаний скін виводить як змінні лише свої **перевизначення**; базу несуть CSS-запасні значення. Змінні потрапляють на корінь редактора — а оскільки меню й діалоги телепортуються з нього, то й на обгортку `SkinScope` кожного меню та на саму картку діалогу, тож токени супроводжують кожну поверхню.

### Форма {#shape}

Шість прапорців визначають, які набори правил застосовуються; токени їх малюють:

| прапорець | значення | що перемикає |
|---|---|---|
| `toolbar` | `raised` · `flat` | підвищення VToolbar без внутрішньої тонкої лінії проти пласкої тонованої панелі |
| `groups` | `box` · `flat` | секції панелі інструментів як підвищені блоки **VBtnGroup** (розмітка 0.3.2: з'єднані кнопки, токени груп малюють блок) проти звичайних flex-div |
| `buttons` | `vuetify` · `quiet` | рідні кнопки Vuetify проти «примарних» кнопок із нейтральним станом натискання |
| `bubble` | `card` · `flat` | збережено для сумісності: bubble-меню в обох формах — це один рядок іконок-кнопок, пофарбований токенами (їхні кнопки слідують за `buttons`) |
| `dialog` | `classic` · `soft` | роздільник під заголовком, підвищене закриття проти м'якої картки, текстового закриття |
| `menu` | `vuetify` · `soft` | випадні меню: список Vuetify проти світлої картки з відступами |

Розв'язана форма кодується на корені редактора шістьма класами `.tiptapify-shape-{flag}-{value}` і доступна як `shape: ComputedRef<ResolvedShape>` у [`useTiptapifyConfig()`](/uk/api/types#usetiptapifyconfig) для власних компонентів панелі інструментів.

### Extends {#extends}

Скін розв'язується поверх класичної бази, потім його ланцюжок `extends` від кореня, потім власні члени:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Відсутні ланки розв'язуються до накопиченого ланцюжка (з dev-попередженням); цикл розв'язується до classic (з dev-попередженням). Зареєстрований скін указується за назвою; inline-об'єкт скіну може мати `extends` на зареєстровану назву й ніколи не потрапляє до глобального реєстру — власні скіни ніколи не «протікають» між редакторами. Невідомі ключі токенів ігноруються з dev-попередженням.

Живі демо всіх трьох форм є на [сторінці прикладів скінів](/uk/examples/skins).

## Каталог токенів {#token-catalog}

Таблиці нижче — це **контракт v1**: ключі каталогу (`TiptapifySkinColors` / `TiptapifySkinMetrics`) — це назви, які можна задати. Клітинки classic — це CSS-запасні значення: те, що малюють базові правила, коли жоден скін не перевизначає токен.

### Панель інструментів / смуга {#toolbar-bar}

| токен | CSS-змінна | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Елементи / групи / роздільники {#items-groups-dividers}

| токен | CSS-змінна | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify elevation 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (спейсер: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Виміряна класична клітинка — `normal`, рідне flex-значення Vuetify, яке й несе CSS-запасне значення. Базове значення каталогу `0px` — це еквівалентна явна довжина для перевизначень скіну.

<a id="shadow-cells"></a>² Клітинки з текстом «Vuetify elevation *n*» є описовими: точний рядок потрійної тіні — це виміряне значення в закоміченому базовому фікстурі (`src/skins/__fixtures__/skin-baseline.json`), і воно є CSS-запасним значенням. Для `groupShadow` це **elevation 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — за `groups: 'box'` секція є VBtnGroup (`elevation="4"`), а правило токена малює блок цією трійкою поверх власного підвищення групи: блок володіє підвищенням, з'єднані дочірні кнопки його не мають.

### Кнопки {#buttons}

Ці токени використовуються **лише за `buttons: 'quiet'`** — див. [Досяжність](#reachability).

| токен | CSS-змінна | значення quiet (classic: рідне Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Bubble-меню (виділення, порожній рядок, зображення) {#bubble-menus-selection-empty-line-image}

| токен | CSS-змінна | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | те саме |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | те саме |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | те саме |

### Випадні меню {#dropdown-menus}

| токен | CSS-змінна | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify elevation 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Блок **списку** (радіус, тінь, відступ списку) класичного меню сьогодні є правилом скіну — обгортка токенів `SkinScope` стоїть між власним дочірнім правилом Vuetify та списком, тож бібліотека відновлює ці пікселі як правила скіну, що читають наведені вище токени. Пікселі **елементів** лишаються рідними для Vuetify (фікстура вимірює там значення Vuetify за замовчуванням): чотири токени елементів неактивні, поки `menu: 'vuetify'`.

### Діалоги {#dialogs}

| токен | CSS-змінна | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard elevation [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | типове поле (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Рамка (обгортка рамки редактора) {#frame-editor-border-wrapper}

| токен | CSS-змінна | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, без верхньої межі | повна рамка |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

За пласкої форми панелі інструментів рамка також малює дельту для кожної сторони (верхню межу та нижню межу з 1.6× непрозорості рамки). Ця дельта належить формі, а не токену: вона недосяжна через токен.

### Зображення та маркери зміни розміру {#images-and-resize-handles}

| токен | CSS-змінна | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (вибране) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (hover) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Панель зображення слідує за прапорцем `buttons`: за тихої форми вона отримує тиху поверхню — її відступи 2px/4px читають `--tf-bubble-gap` / `--tf-bubble-padding` із запасними значеннями меню зображення; окремого токена панелі зображення немає.

### Немає в каталозі (територія запасного виходу) {#not-in-the-catalog-escape-hatch-territory}

Деякі розміри, названі в огляді дизайну, не мають токена в каталозі v1: **висота панелі інструментів, ширина рамки, радіус рамки, ширина кнопки, відступ кнопки, ширина діалогу**. Таблиці каталогу вище — це контракт; для цих пікселів відкрийте [запасний вихід](#escape-hatch-the-root-class) і стилізуйте стабільні класи напряму.

## Досяжність {#reachability}

Контракт, сформульований один раз і дотримуваний у кожній групі вище:

> Токен малює поверхню лише тоді, коли форма активує цю поверхню; рідні візуальні елементи Vuetify стилізуються кольорами теми Vuetify.

По групах:

- **Панель інструментів, рамка, оболонка зображення/маркерів** — активні в кожній формі; токени їх малюють, класичні клітинки — це рідний вигляд, до якого токени повертаються.
- **Блок груп** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — за `groups: 'box'` секція є VBtnGroup (структура 0.3.2: кнопки з'єднуються, блок несе підвищення); правила блоку малюють його токенами груп, а `--tf-group-height` тримає контракт 32px через `!important` (правило щільності Vuetify з ним конфліктує, як і в 0.3.2). За `groups: 'flat'` секції — це звичайні div-блоки (прозорі, без тіні, радіус 0 — база цієї форми).
- **Тонкі лінії роздільників** (`dividerWidth/Height/Color`) — видима тонка лінія є можливістю `groups: 'flat'`; у формі box роздільник — це спейсер нульового розміру (`margin: 0 4px` з базового правила).
- **Відступи/проміжки елементів** — компактний блок `6px 8px` залежить від пласкої смуги (`toolbar: 'flat'`), проміжки груп — від пласких секцій (`groups: 'flat'`); підвищена смуга зберігає класичні метрики.
- **Кнопки** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — неактивні за `buttons: 'vuetify'`: рідні кнопки Vuetify малюють свої стани самі. Стилізуйте їх кольорами теми Vuetify (`primary`, `surface`, …) — класичні форми навмисно їх успадковують.
- **Метрики елементів меню** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — неактивні за `menu: 'vuetify'`; ці пікселі елементів належать Vuetify. Блок **списку** меню (радіус/тінь/відступ) малюється скіном в обох формах (див. [примітку про меню](#menu-classic-note)).
- **М'яка оболонка діалогу** (`dialogActionBtn*`, `dialogFieldRadius`, м'які відступи, відсутній роздільник) — малюється за `dialog: 'soft'`; за `dialog: 'classic'` діалог є VCard із класичними відступами.
- **Оболонка bubble-меню** — меню виділення, порожнього рядка й зображення в обох формах є одним рядком іконок-кнопок, пофарбованим токенами bubble; `bubble` більше не змінює їхню розмітку.

Перевизначення, що дорівнює базі каталогу, **не виводиться** — за нетипової форми власну базу форми малює CSS-запасне значення, тож «відновлення» класичного значення (наприклад, повернення `buttonActiveBg` до `rgb(var(--v-theme-primary))` за `buttons: 'quiet'`) мовчки нічого не робить. Щоб примусити класично-подібне значення за нетипової форми, задайте перевизначення, що відрізняється від бази каталогу — еквівалентний літерал на кшталт `rgba(var(--v-theme-primary), 1)` малюється ідентично й переживає пропуск.

Токени навмисно не підключені до рідних шляхів — саме це тримає `default` піксель-в-піксель ідентичним класичному вигляду, поки все проходить через каталог.

## Рецепти {#recipes}

### Розширення pastel {#extend-pastel}

Успадкуйте тиху форму та перефарбуйте кілька поверхонь. Зареєстровані назви працюють на будь-якому редакторі:

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

Форма (flat/quiet/soft) надходить від pastel; незачеплені токени зберігають значення pastel — тихий відтінок кнопок лишається нейтральним, зсувається лише те, що ви перевизначили. Це скін, відрендерений наживо на [сторінці прикладів](/uk/examples/skins#custom-mint).

### Розширення default {#extend-default}

Збережіть класичну структуру, налаштуйте фарбу:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` є неявним коренем, тож ключ можна опустити: `{ toolbar: 'flat', … }` також стартує від classic.

### Повністю власний {#full-custom}

Без `extends` і без реєстрації: передайте об'єкт у проп `skin` і вільно задавайте прапорці форми та токени. `name` ставить вашу власну мітку на кореневий клас (див. нижче); без нього це `tiptapify-skin-inline`.

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

`defineSkin` — допоміжна функція-тотожність для типізованих const-визначень (до жодного реєстру вона не потрапляє). Прапорці форми можна задавати окремо — кожен пропущений прапорець лишається класичним.

## Запасний вихід: кореневий клас {#escape-hatch-the-root-class}

Кожен корінь редактора має `tiptapify-skin-{name}` (`tiptapify-skin-inline` для inline-об'єкта без імені). Бібліотека **ніколи не прив'язує жодного правила до назви скіну** — клас належить вам:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Стабільні хуки, на які можна спиратися:

| клас | де |
|---|---|
| `tiptapify-skin-{name}` | корінь редактора |
| `tiptapify-shape-{flag}-{value}` ×6 | корінь редактора — розв'язана форма |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | панель інструментів та її секції |
| `tiptapify-quiet-buttons` | корені панелі інструментів і bubble-меню за `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | рядок кожного bubble-меню і тонка лінія між його групами |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | рядки меню виділення, порожнього рядка й зображення |
| `tiptapify-btn--active` | натиснута кнопка bubble-меню (активна позначка, обтікання зображення) |
| `tiptapify-menu` · `tiptapify-menu--soft` | вміст випадного оверлея, носій правил м'якого меню |
| `tiptapify-skin-scope` | div області токенів усередині телепортованих меню |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | картка діалогу та її м'який носій |
| `tiptapify-frame` | обгортка рамки редактора |

**Захист від споживацької теми.** Шар скінів збудовано так, щоб він переживав адмін-теми, які додають відступи й перефарбовують внутрішні частини Vuetify: правила залежать від класів форми/носія, використовують подвоєні класи (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) для специфічності й лишають `!important` лише там, де це довів необхідним випадок адмін-теми базового коміту (набір захисту menu.css). Домовленості, що зберігають працездатність ваших власних перевизначень на тому самому полі бою:

- обмежуйте свій CSS під `.tiptapify-skin-{name}` (або класом форми) — ніколи не на голих внутрішніх частинах Vuetify;
- віддавайте перевагу токенам (`--tf-*`) для розмірів каталогу, класам — для решти;
- повторюйте подвоєння, перевизначаючи компоненти Vuetify (одинарний `.v-list-item` програє правилам скіну).

## Візуальний контракт (примітка для контриб'юторів) {#visual-contract-contributor-note}

Обчислені стилі вбудованих скінів закріплені базовою фікстурою `src/skins/__fixtures__/skin-baseline.json` (13 секцій × світла/темна): CSS-шар готовий, коли виміряна матриця збігається з нею. Примітки до читання фікстури:

- Розміри hover/active не можна примусити зі сторінки, тому запис читає **текст оголошення першого знайденого правила CSSOM** для кожного селектора hover і розв'язує його через пробний елемент усередині кореня скіну (поле `resolved`) — це контракт виграшного правила, а не живий знімок `:hover`.
- `_meta.selectors.menu` записує текст селектора до `SkinScope`. Фікстура заморожена (нормативні значення), тож поле навмисно застаріле; пакет запису закріплює поточний селектор.
- Фікстура несе свої санкціоновані зміни в `_meta.notes`: відновлення 2026-10-18 розмітки VBtnGroup за `groups: 'box'` перевимірило поля дочірніх кнопок classic `groupBtn`/`buttonsActive` (з'єднані кути, блок володіє підвищенням). Поля pastel не зачеплені — навмисна візуальна зміна оновлює лише задіяні класичні клітинки, записує примітку й постачається з рядком у CHANGELOG.

## Дивіться також {#see-also}

- [Приклади скінів](/uk/examples/skins) — classic, pastel і власний скін mint, наживо.
- [проп `skin`](/uk/api/props#skin) · [типи скінів](/uk/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/uk/api/types#tiptapifyskininput).
