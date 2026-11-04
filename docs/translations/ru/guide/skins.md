# Скины {#skins}

**Скин** — это один внешний вид оболочки редактора: панель инструментов, кнопки и группы в ней, bubble-меню, выпадающие меню, диалоги, рамка вокруг содержимого и оформление выделения изображения. Выбирает его prop `skin`:

```vue
<Tiptapify skin="pastel" />
```

Скин состоит из двух частей: **токенов** (цвета и размеры в виде CSS-переменных) и **формы** (структурные варианты, которые токены выразить не могут). Два встроенных скина: `default` — классический вид, приподнятая панель инструментов с приподнятыми группами кнопок, и `pastel` — спокойный вид. Собственные скины полноправны: `registerSkin()` и встроенные в код объекты скинов обрабатываются тем же механизмом, а встроенные скины — это обычные зарегистрированные скины, а не особые случаи.

## Терминология: скин и тема Vuetify {#terminology-skin-vs-vuetify-theme}

- **skin (скин)** — пользовательский термин для одного внешнего вида оболочки редактора: токены + форма. Prop называется `skin`, типы — `TiptapifySkin*`, реестр — `registerSkin()`, корневой класс — `tiptapify-skin-{name}`.
- **theme (тема)** — зарезервировано за светлой/тёмной темами Vuetify. Компоненты Tiptapify получают свои props `theme` из имени текущей темы Vuetify; система скинов их не трогает.

Они сочетаются: большинство цветов встроенных токенов ссылаются на переменные темы Vuetify (`rgb(var(--v-theme-surface))`, …), поэтому скины автоматически следуют светлой/тёмной теме. Фиксированно тёмные ячейки в колонке classic — маркер изменения размера (`rgba(0, 0, 0, .5/.8)`), обычный контур изображения, тень bubble-меню и тени elevation у меню и диалогов — сделаны намеренно: классический вид рисует нейтральную тёмную оболочку в обеих темах, а замеренная эталонная версия это фиксирует. Пользовательский скин может свободно ссылаться на переменные темы — см. таблицу токенов.

## Концепция {#concept}

### Токены {#tokens}

Токен — это CSS custom property с именем `--tf-*`. Ключ каталога — это camelCase суффикса CSS: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Значения — обычные строки: цвета, полные сокращённые записи границ, тени, отступы, радиусы.

Каждое правило скина в библиотеке существует **один раз** и читает свой токен с запасным значением, равным классическому (базовому):

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Разрешённый скин выводит в виде переменных только свои **переопределения**; базовые значения несут CSS-фолбэки. Переменные попадают в корневой элемент редактора — а так как меню и диалоги телепортируются из него, то и в обёртку `SkinScope` каждого меню и в саму карточку диалога, поэтому токены действуют на каждой поверхности.

### Форма {#shape}

Шесть флагов определяют, какие наборы правил применяются; токены их окрашивают:

| флаг | значения | что переключает |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbar с elevation и без внутренней тонкой линии или плоская тонированная панель |
| `groups` | `box` · `flat` | секции панели инструментов как приподнятые блоки **VBtnGroup** (разметка 0.3.2: соединённые кнопки, блок окрашивают токены группы) или обычные flex-ряды div |
| `buttons` | `vuetify` · `quiet` | нативные кнопки Vuetify или «призрачные» кнопки с нейтральным состоянием нажатия |
| `bubble` | `card` · `flat` | оставлен для совместимости: bubble-меню — это один ряд кнопок-иконок, окрашенный токенами, в обеих формах (их кнопки следуют `buttons`) |
| `dialog` | `classic` · `soft` | разделитель под заголовком и приподнятая кнопка закрытия или мягкая карточка и текстовая кнопка закрытия |
| `menu` | `vuetify` · `soft` | выпадающие меню: список Vuetify или светлая карточка с отступами |

Разрешённая форма кодируется в корневом элементе редактора шестью классами `.tiptapify-shape-{flag}-{value}` и доступна как `shape: ComputedRef<ResolvedShape>` в [`useTiptapifyConfig()`](/ru/api/types#usetiptapifyconfig) для пользовательских компонентов панели инструментов.

### Extends {#extends}

Скин разрешается поверх классической базы, затем по цепочке `extends` от корня, затем по собственным членам:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Отсутствующие звенья разрешаются в накопленную цепочку (с предупреждением в dev-режиме); цикл разрешается в classic (также с предупреждением в dev-режиме). Зарегистрированный скин указывается по имени; инлайн-объект скина может делать `extends` от зарегистрированного имени и никогда не попадает в глобальный реестр — пользовательские скины никогда не «утекают» между редакторами. Неизвестные ключи токенов игнорируются с предупреждением в dev-режиме.

Живые демо всех трёх форм есть на [странице примеров скинов](/ru/examples/skins).

## Каталог токенов {#token-catalog}

Таблицы ниже — это **контракт v1**: ключи каталога (`TiptapifySkinColors` / `TiptapifySkinMetrics`) — это имена, которые можно задавать. Ячейки classic — это CSS-фолбэки: значение, которое рисуют базовые правила, когда скин не переопределяет токен.

### Панель инструментов / полоса {#toolbar-bar}

| токен | CSS-переменная | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Элементы / группы / разделители {#items-groups-dividers}

| токен | CSS-переменная | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify elevation 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (распорка: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Замеренное значение classic — `normal`, нативное flex-значение Vuetify, которое и несёт CSS-фолбэк. Базовое значение каталога `0px` — это равнозначная явная длина для переопределений скина.

<a id="shadow-cells"></a>² Ячейки «Vuetify elevation *n*» носят описательный характер: точная строка из трёх теней — это замеренное значение в зафиксированном эталонном файле (`src/skins/__fixtures__/skin-baseline.json`), и оно же служит CSS-фолбэком. Для `groupShadow` это **elevation 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — при `groups: 'box'` секция является VBtnGroup (`elevation="4"`), и правило токена окрашивает блок этой тройной тенью поверх собственного elevation группы: блок владеет elevation, а соединённые дочерние кнопки его не имеют.

### Кнопки {#buttons}

Эти токены используются **только при `buttons: 'quiet'`** — см. [Достижимость](#reachability).

| токен | CSS-переменная | значение quiet (classic: нативный Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Bubble-меню (выделение, пустая строка, изображение) {#bubble-menus-selection-empty-line-image}

| токен | CSS-переменная | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | то же |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | то же |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | то же |

### Выпадающие меню {#dropdown-menus}

| токен | CSS-переменная | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify elevation 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Блок **списка** (радиус, тень, отступы списка) классического меню сегодня является правилом скина: обёртка токенов `SkinScope` стоит между собственным дочерним правилом Vuetify и списком, поэтому библиотека восстанавливает эти пиксели как правила скина, читающие токены выше. Пиксели **элементов** остаются нативными для Vuetify (эталонный файл фиксирует там значения Vuetify по умолчанию): четыре токена элементов не действуют, пока `menu: 'vuetify'`.

### Диалоги {#dialogs}

| токен | CSS-переменная | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard elevation [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | значение поля по умолчанию (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Рамка (обёртка границы редактора) {#frame-editor-border-wrapper}

| токен | CSS-переменная | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, без верхней границы | полная граница |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

При плоской форме панели инструментов рамка также рисует дельту по сторонам (верхняя граница и нижняя граница с 1.6× прозрачности границы). Эта дельта принадлежит форме, а не токену: через токен до неё не добраться.

### Изображения и маркеры изменения размера {#images-and-resize-handles}

| токен | CSS-переменная | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (выделено) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (при наведении) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Панель инструментов изображения следует флагу `buttons`: при тихой форме она получает тихую поверхность — её отступы 2px/4px читают `--tf-bubble-gap` / `--tf-bubble-padding` с фолбэками меню изображения; отдельного токена панели инструментов изображения нет.

### Нет в каталоге (территория запасного выхода) {#not-in-the-catalog-escape-hatch-territory}

Для некоторых размеров, упомянутых в обзоре дизайна, в v1 нет токена каталога: **высота панели инструментов, ширина рамки, радиус рамки, ширина кнопки, отступы кнопки, ширина диалога**. Таблицы каталога выше — это контракт; для этих пикселей откройте [запасной выход](#escape-hatch-the-root-class) и оформляйте стабильные классы напрямую.

## Достижимость {#reachability}

Контракт, сформулированный один раз и соблюдаемый каждой группой выше:

> Токен окрашивает поверхность, только если форма эту поверхность активирует; нативный внешний вид Vuetify оформляется цветами темы Vuetify.

По группам:

- **Панель инструментов, рамка, оформление изображений и маркеров** — активны в любой форме; токены их окрашивают, ячейки classic — это нативный вид, к которому токены возвращаются как к фолбэку.
- **Блок групп** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — при `groups: 'box'` секция является VBtnGroup (структура 0.3.2: кнопки соединены, блок несёт elevation); правила блока окрашивают его токенами группы, а `--tf-group-height` удерживает контракт в 32px с помощью `!important` (правило плотности Vuetify с ним конфликтует, как и в 0.3.2). При `groups: 'flat'` секции — обычные ряды div (прозрачные, без тени, радиус 0 — база этой формы).
- **Тонкие линии разделителей** (`dividerWidth/Height/Color`) — видимая тонкая линия доступна при `groups: 'flat'`; в форме box разделитель — это распорка нулевого размера (`margin: 0 4px` из базового правила).
- **Отступы и промежутки элементов** — компактный ряд `6px 8px` включается только на плоской полосе (`toolbar: 'flat'`), промежутки групп — на плоских секциях (`groups: 'flat'`); приподнятая полоса сохраняет классические метрики.
- **Кнопки** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — не действуют при `buttons: 'vuetify'`: нативные кнопки Vuetify сами рисуют свои состояния. Оформляйте их цветами темы Vuetify (`primary`, `surface`, …) — классические формы намеренно их наследуют.
- **Метрики элементов меню** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — не действуют при `menu: 'vuetify'`; пиксели этих элементов принадлежат Vuetify. Блок **списка** меню (радиус/тень/отступы) окрашивается скином в обеих формах (см. [примечание о меню](#menu-classic-note)).
- **Мягкое оформление диалога** (`dialogActionBtn*`, `dialogFieldRadius`, мягкие отступы, отсутствующий разделитель) — рисуется при `dialog: 'soft'`; при `dialog: 'classic'` диалог — это VCard с классическими отступами.
- **Оформление bubble-меню** — меню выделения, пустой строки и изображения представляют собой один ряд кнопок-иконок в обеих формах, окрашенный токенами bubble; `bubble` больше не меняет их разметку.

Переопределение, равное базовому значению каталога, **не выводится** — при не классической форме базу формы рисует CSS-фолбэк, поэтому «восстановление» классического значения (например, возврат `buttonActiveBg` к `rgb(var(--v-theme-primary))` при `buttons: 'quiet'`) молча ничего не делает. Чтобы принудительно задать классическое значение при не классической форме, задайте переопределение, отличающееся от базы каталога: равнозначный литерал вроде `rgba(var(--v-theme-primary), 1)` рисуется так же и проходит проверку на пропуск.

Токены намеренно не подключены к нативным путям — именно это сохраняет `default` пиксель-в-пиксель идентичным классическому виду, пока всё проходит через каталог.

## Рецепты {#recipes}

### Расширение pastel {#extend-pastel}

Унаследуйте тихую форму и перекрасьте несколько поверхностей. Зарегистрированные имена работают в любом редакторе:

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

Форма (flat/quiet/soft) берётся из pastel; нетронутые токены сохраняют значения pastel — тихая заливка кнопок остаётся нейтральной, меняется только то, что вы переопределили. Это скин, показанный вживую на [странице примеров](/ru/examples/skins#custom-mint).

### Расширение default {#extend-default}

Сохраните классическую структуру, настройте оформление:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` — неявный корень, поэтому ключ можно опустить: `{ toolbar: 'flat', … }` тоже начинается с classic.

### Полностью свой скин {#full-custom}

Без `extends` и без регистрации: передайте объект в prop `skin` и свободно задавайте флаги формы и токены. `name` ставит вашу собственную метку на корневой класс (см. ниже); без него класс — `tiptapify-skin-inline`.

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

`defineSkin` — вспомогательная identity-функция для типизированных const-определений (в реестр она ничего не добавляет). Флаги формы можно задавать по отдельности — каждый пропущенный флаг остаётся классическим.

## Запасной выход: корневой класс {#escape-hatch-the-root-class}

Корневой элемент каждого редактора несёт `tiptapify-skin-{name}` (`tiptapify-skin-inline` для инлайн-объекта без имени). Библиотека **никогда не привязывает правила к имени скина** — этот класс ваш:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Стабильные хуки, на которые можно опираться:

| класс | где |
|---|---|
| `tiptapify-skin-{name}` | корневой элемент редактора |
| `tiptapify-shape-{flag}-{value}` ×6 | корневой элемент редактора — разрешённая форма |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | панель инструментов и её секции |
| `tiptapify-quiet-buttons` | корневые элементы панели инструментов и bubble-меню при `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | ряд каждого bubble-меню и тонкая линия между его группами |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | ряды меню выделения, пустой строки и изображения |
| `tiptapify-btn--active` | нажатая кнопка bubble-меню (активная метка, обтекание изображения) |
| `tiptapify-menu` · `tiptapify-menu--soft` | содержимое оверлея выпадающего меню, носитель правил мягкого меню |
| `tiptapify-skin-scope` | div области токенов внутри телепортированных меню |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | карточка диалога и её мягкий носитель |
| `tiptapify-frame` | обёртка границы редактора |

**Защита от тем потребителя.** Слой скинов рассчитан на то, чтобы выживать в админских темах, которые добавляют отступы и перекрашивают внутренние элементы Vuetify: правила привязаны к классам формы/носителя, используют удвоенные классы (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) для специфичности и сохраняют `!important` только там, где это оказалось необходимым в случае админской темы в базовом коммите (набор защиты menu.css). Соглашения, которые сохраняют работоспособность ваших собственных переопределений на том же поле боя:

- ограничивайте свой CSS областью `.tiptapify-skin-{name}` (или класса формы) — никогда не пишите правила на голые внутренние элементы Vuetify;
- для размеров из каталога предпочитайте токены (`--tf-*`), для остального — классы;
- повторяйте удвоение при переопределении компонентов Vuetify (одиночный `.v-list-item` проигрывает правилам скина).

## Визуальный контракт (заметка для контрибьюторов) {#visual-contract-contributor-note}

Вычисляемые стили встроенных скинов зафиксированы эталонным файлом `src/skins/__fixtures__/skin-baseline.json` (13 секций × светлая/тёмная): CSS-слой готов, когда замеренная матрица с ним совпадает. Примечания к чтению файла:

- Размеры при наведении/нажатии нельзя принудительно вызвать со страницы, поэтому при записи читается **текст объявления первого найденного в CSSOM правила** для каждого hover-селектора и разрешается через probe-элемент внутри корня скина (поле `resolved`) — это контракт победившего правила, а не живой снимок `:hover`.
- `_meta.selectors.menu` хранит текст селектора до появления `SkinScope`. Файл заморожен (нормативные значения), поэтому поле устарело намеренно; пакет записи фиксирует текущий селектор.
- Файл несёт свои санкционированные изменения в `_meta.notes`: восстановление 2026-10-18 разметки VBtnGroup при `groups: 'box'` заново измерило поля дочерних кнопок classic `groupBtn`/`buttonsActive` (соединённые углы, блок владеет elevation). Поля pastel не тронуты — намеренное визуальное изменение обновляет только затронутые ячейки classic, записывает заметку и сопровождается строкой в CHANGELOG.

## См. также {#see-also}

- [Примеры скинов](/ru/examples/skins) — classic, pastel и пользовательский скин mint вживую.
- [prop `skin`](/ru/api/props#skin) · [типы скинов](/ru/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/ru/api/types#tiptapifyskininput).
