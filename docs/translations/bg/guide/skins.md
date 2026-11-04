# Скинове {#skins}

**Скинът** е един външен вид на рамката на редактора: лентата, бутоните и групите в нея, bubble менютата, падащите менюта, диалозите, рамката около съдържанието и рамката за избор на изображение. Пропъртито `skin` го избира:

```vue
<Tiptapify skin="pastel" />
```

Скинът се състои от две неща: **токени** (цветове и размери като CSS променливи) и **форма** (структурни варианти, които токенът не може да изрази). Двата вградени скина са `default` — класическият вид, издигната лента с инструменти с издигнати групи бутони — и `pastel`, спокойният вид. Персонализираните скинове са равностойни: `registerSkin()` и вградените обекти на скинове се разрешават по абсолютно същия механизъм, а вградените скинове са регистрирани скинове, не специални случаи.

## Терминология: скин срещу тема на Vuetify {#terminology-skin-vs-vuetify-theme}

- **skin (скин)** — терминът за потребителя за един външен вид на рамката на редактора: токени + форма. Пропъртито е `skin`, типовете са `TiptapifySkin*`, регистърът е `registerSkin()`, коренният клас е `tiptapify-skin-{name}`.
- **theme (тема)** — запазен за светлата/тъмната тема на Vuetify. Компонентите на Tiptapify пазят пропъртитата си `theme`, захранвани от името на текущата тема на Vuetify; системата за скинове никога не ги докосва.

Те се комбинират: повечето вградени цветови токени сочат към променливите на темата на Vuetify (`rgb(var(--v-theme-surface))`, …), така че скиновете следват светлия/тъмния режим автоматично. Клетките с фиксиран тъмен цвят в колоната classic — дръжката за преоразмеряване (`rgba(0, 0, 0, .5/.8)`), простият контур на изображението, сянката на bubble менюто и сенките на издигането на менютата/диалозите — са умишлени: класическият вид боядисва неутрална тъмна рамка и в двете теми, а измерената базова линия ги фиксира. Собствен скин може свободно да сочи към променливи на темата — вижте таблицата с токени.

## Концепция {#concept}

### Токени {#tokens}

Токенът е CSS custom property с име `--tf-*`. Ключът в каталога е camelCase формата на CSS суфикса: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`. Стойностите са обикновени низове — цветове, пълни съкратени записи на рамки, сенки, отстъпи, радиуси.

Всяко правило за скин в библиотеката съществува **веднъж** и чете своя токен със стойност по подразбиране, равна на класическата (базова) стойност:

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

Разрешеният скин излъчва като променливи само своите **преопределения**; CSS стойностите по подразбиране носят базата. Променливите попадат в корена на редактора — и, тъй като менютата и диалозите се телепортират извън него, в обвивката `SkinScope` на всяко меню и в самата карта на диалога, така че токените следват всяка повърхност.

### Форма {#shape}

Шест флага решават кои набори правила се прилагат; токените ги боядисват:

| флаг | стойности | какво превключва |
|---|---|---|
| `toolbar` | `raised` · `flat` | издигане на VToolbar + без вътрешна тънка линия срещу плоска оцветена лента |
| `groups` | `box` · `flat` | секциите на лентата като издигнати кутии **VBtnGroup** (маркиране от 0.3.2: свързани бутони, токените на групата боядисват кутията) срещу обикновени flex div редове |
| `buttons` | `vuetify` · `quiet` | родни бутони на Vuetify срещу ghost бутони с неутрално състояние при натискане |
| `bubble` | `card` · `flat` | запазен за съвместимост: bubble менютата са един боядисан с токени ред икони-бутони и в двете форми (бутоните им следват `buttons`) |
| `dialog` | `classic` · `soft` | разделител под заглавието, издигнато затваряне срещу мека карта, текстово затваряне |
| `menu` | `vuetify` · `soft` | падащи менюта: списък на Vuetify срещу лека карта с отстъпи |

Разрешената форма е кодирана в корена на редактора като шест класа `.tiptapify-shape-{flag}-{value}` и е достъпна като `shape: ComputedRef<ResolvedShape>` в [`useTiptapifyConfig()`](/bg/api/types#usetiptapifyconfig) за собствени компоненти на лентата.

### Extends {#extends}

Скинът се разрешава върху класическата база, после по веригата си `extends` от корена нататък, после по собствените си членове:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

Липсващите звена се разрешават до натрупаната верига (с предупреждение в dev); цикълът се разрешава до classic (с предупреждение в dev). Регистриран скин се сочи по име; вграден обект на скин може да има `extends` към регистрирано име и никога не влиза в глобалния регистър — собствените скинове никога не изтичат между редакторите. Неизвестните ключове на токени се игнорират с предупреждение в dev.

Демонстрации на живо на трите форми има на [страницата с примери за скинове](/bg/examples/skins).

## Каталог на токените {#token-catalog}

Таблиците по-долу са **договорът v1**: ключовете на каталога (`TiptapifySkinColors` / `TiptapifySkinMetrics`) са имената, които можете да задавате. Клетките classic са CSS стойностите по подразбиране — стойността, която базовите правила боядисват, когато никой скин не преопределя токена.

### Лента / бар {#toolbar-bar}

| токен | CSS променлива | classic | pastel |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### Елементи / групи / разделители {#items-groups-dividers}

| токен | CSS променлива | classic | pastel |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify elevation 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (спейсър: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ Измерената класическа клетка е `normal` — родната flex стойност на Vuetify, която носи CSS стойността по подразбиране. Базовата стойност в каталога `0px` е равностойната изрична дължина за преопределения в скин.

<a id="shadow-cells"></a>² Клетките с текст „Vuetify elevation *n*“ са описателни: точният низ с тройната сянка е измерената стойност във фиксирания baseline fixture (`src/skins/__fixtures__/skin-baseline.json`) и е CSS стойността по подразбиране. За `groupShadow` това е **elevation 2** (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — при `groups: 'box'` секцията е VBtnGroup (`elevation="4"`), а правилото на токена боядисва кутията с тази тройка върху собственото издигане на групата: кутията притежава издигането, а свързаните дъщерни бутони не носят такова.

### Бутони {#buttons}

Тези токени се консумират **само при `buttons: 'quiet'`** — вижте [Достижимост](#reachability).

| токен | CSS променлива | стойност при quiet (classic: родна за Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### Bubble менюта (селекция, празен ред, изображение) {#bubble-menus-selection-empty-line-image}

| токен | CSS променлива | classic | pastel |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | същото |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | същото |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | същото |

### Падащи менюта {#dropdown-menus}

| токен | CSS променлива | classic | pastel |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify elevation 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ Кутията на **списъка** (радиус, сянка, отстъп на списъка) на класическото меню днес е правило на скина — обвивката с токени `SkinScope` стои между собственото дъщерно правило на Vuetify и списъка, затова библиотеката възстановява тези пиксели като правила на скина, четящи токените по-горе. Пикселите на **елементите** остават родни за Vuetify (fixture измерва там стойностите по подразбиране на Vuetify): четирите токена на елементите са неактивни при `menu: 'vuetify'`.

### Диалози {#dialogs}

| токен | CSS променлива | classic | pastel |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard elevation [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | стойност на полето по подразбиране (`4px`) | `8px` (outlined) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### Рамка (обвивка с граница на редактора) {#frame-editor-border-wrapper}

| токен | CSS променлива | classic | pastel |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, без горен ръб | пълна рамка |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

При плоската форма на лентата рамката боядисва и делта по страни (горен ръб и долен ръб с 1.6× непрозрачност на границата). Тази делта принадлежи на формата, а не на токен: тя не е достижима с токен.

### Изображения и дръжки за преоразмеряване {#images-and-resize-handles}

| токен | CSS променлива | classic | pastel |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (избрано) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (hover) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

Лентата на изображението следва флага `buttons`: при тихата форма получава тихата повърхност — отстъпите ѝ от 2px/4px четат `--tf-bubble-gap` / `--tf-bubble-padding` със стойности по подразбиране от менюто на изображението; няма отделен токен за лентата на изображението.

### Извън каталога (територия на запасния изход) {#not-in-the-catalog-escape-hatch-territory}

Някои размери, назовани в дизайнерския преглед, нямат токен в каталога във v1: **височина на лентата, ширина на рамката, радиус на рамката, ширина на бутона, отстъп на бутона, ширина на диалога**. Таблиците в каталога по-горе са договорът; за тези пиксели отворете [запасния изход](#escape-hatch-the-root-class) и стилизирайте директно стабилните класове.

## Достижимост {#reachability}

Договорът, формулиран веднъж и спазван от всяка група по-горе:

> Токенът боядисва повърхност само когато формата активира тази повърхност; родните визуални елементи на Vuetify се стилизират чрез цветовете на темата на Vuetify.

По групи:

- **Лента, рамка, рамка на изображение/дръжка** — активни във всяка форма; токените ги боядисват, клетките classic са родният вид, към който токените се връщат.
- **Кутия на групите** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — при `groups: 'box'` секцията е VBtnGroup (структурата от 0.3.2: бутоните се свързват, кутията носи издигането); правилата на кутията я боядисват с токените на групата, а `--tf-group-height` пази договора от 32px с `!important` (правилото за плътност на Vuetify се бори с него, както в 0.3.2). При `groups: 'flat'` секциите са обикновени div редове (прозрачни, без сянка, радиус 0 е базата на формата).
- **Тънки линии на разделителите** (`dividerWidth/Height/Color`) — видимата тънка линия е възможност на `groups: 'flat'`; във формата box разделителят е спейсър с нулев размер (`margin: 0 4px` от базовото правило).
- **Отстъпи/разстояния на елементите** — компактният ред `6px 8px` е ограничен до плоската лента (`toolbar: 'flat'`), разстоянията между групите — до плоските секции (`groups: 'flat'`); издигнатата лента запазва класическите метрики.
- **Бутони** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — неактивни при `buttons: 'vuetify'`: родните бутони на Vuetify боядисват собствените си състояния. Стилизирайте ги с цветовете на темата на Vuetify (`primary`, `surface`, …) — класическите форми умишлено ги наследяват.
- **Метрики на елементите на менюто** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — неактивни при `menu: 'vuetify'`; Vuetify притежава тези пиксели на елементите. Кутията на **списъка** на менюто (радиус/сянка/отстъп) се боядисва от скина и в двете форми (вижте [бележката за менюто](#menu-classic-note)).
- **Меко оформление на диалога** (`dialogActionBtn*`, `dialogFieldRadius`, меките отстъпи, липсващият разделител) — боядисва се при `dialog: 'soft'`; при `dialog: 'classic'` диалогът е VCard с класическите отстъпи.
- **Оформление на bubble менюто** — менюта за селекция, празен ред и изображение са един ред икони-бутони и в двете форми, боядисани от токените на bubble; `bubble` вече не променя тяхното маркиране.

Преопределение, равно на базата в каталога, **не се излъчва** — при форма, различна от classic, собствената база на формата се боядисва чрез CSS стойността по подразбиране, така че „възстановяването“ на класическа стойност (напр. връщане на `buttonActiveBg` към `rgb(var(--v-theme-primary))` при `buttons: 'quiet'`) тихо не прави нищо. За да наложите класическа стойност при форма, различна от classic, задайте преопределение, което се различава от базата в каталога — равностоен литерал като `rgba(var(--v-theme-primary), 1)` боядисва идентично и преживява пропускането.

Токените умишлено не са вързани към родните пътища — това пази `default` пиксел по пиксел идентичен с класическия вид, докато всичко минава през каталога.

## Рецепти {#recipes}

### Разширяване на pastel {#extend-pastel}

Наследете тихата форма и прекрасете няколко повърхности. Регистрираните имена работят във всеки редактор:

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

Формата (flat/quiet/soft) идва от pastel; недокоснатите токени запазват стойностите на pastel — тихият оттенък на бутоните остава неутрален, мърда само онова, което преопределите. Това е скинът, рендиран на живо на [страницата с примери](/bg/examples/skins#custom-mint).

### Разширяване на default {#extend-default}

Запазете класическата структура, настройте боята:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` е неявният корен, така че ключът може да се пропусне: `{ toolbar: 'flat', … }` също тръгва от classic.

### Изцяло собствен {#full-custom}

Без `extends`, без регистрация: подайте обекта на пропъртито `skin` и задайте свободно флагове на формата и токени. `name` слага ваш собствен етикет на коренния клас (вижте по-долу); без него е `tiptapify-skin-inline`.

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

`defineSkin` е помощна функция за идентичност за типизирани const дефиниции (не влиза в никакъв регистър). Флаговете на формата могат да се задават поотделно — всеки пропуснат флаг остава classic.

## Запасен изход: коренният клас {#escape-hatch-the-root-class}

Всеки корен на редактор носи `tiptapify-skin-{name}` (`tiptapify-skin-inline` за вграден обект без име). Библиотеката **никога не насочва правило по име на скин** — класът е ваш:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

Стабилните куки, срещу които да пишете:

| клас | къде |
|---|---|
| `tiptapify-skin-{name}` | корен на редактора |
| `tiptapify-shape-{flag}-{value}` ×6 | корен на редактора — разрешената форма |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | лентата и нейните секции |
| `tiptapify-quiet-buttons` | корени на лентата и bubble менюто при `buttons: 'quiet'` |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | редът на всяко bubble меню и тънката линия между неговите групи |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | редовете на менютата за селекция, празен ред и изображение |
| `tiptapify-btn--active` | натиснат бутон на bubble меню (активен маркер, плаване на изображение) |
| `tiptapify-menu` · `tiptapify-menu--soft` | съдържание на падащото меню, носител на правилата за меко меню |
| `tiptapify-skin-scope` | div на обхвата на токените вътре в телепортирани менюта |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | картата на диалога и нейният мек носител |
| `tiptapify-frame` | обвивката с граница на редактора |

**Защита срещу теми на потребителя.** Слоят на скиновете е изграден да оцелява при администраторски теми, които добавят отстъпи и пребоядисват вътрешността на Vuetify: правилата се ограничават по класове на формата/носителя, използват удвоени класове (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) за специфичност и пазят `!important` само там, където случаят с администраторска тема в базовия commit е доказал, че е необходимо (наборът за защита в menu.css). Конвенции, които държат вашите собствени преопределения работещи на същото бойно поле:

- ограничавайте вашия CSS под `.tiptapify-skin-{name}` (или клас на форма) — никога върху голи вътрешности на Vuetify;
- предпочитайте токени (`--tf-*`) за размерите от каталога, класове за останалото;
- повтаряйте удвояването при преопределяне на компоненти на Vuetify (единичен `.v-list-item` губи от правилата на скина).

## Визуален договор (бележка за контрибутори) {#visual-contract-contributor-note}

Изчислените стилове на вградените скинове са фиксирани от baseline fixture `src/skins/__fixtures__/skin-baseline.json` (13 секции × светло/тъмно): CSS слоят е готов, когато измерената матрица съвпадне с него. Бележки за четене на fixture:

- Размерите при hover/active не могат да се форсират от страницата, затова записът чете **текста на декларацията на първото попаднало CSSOM правило** за всеки hover селектор и го разрешава през сонда в корена на скина (полето `resolved`) — това е договорът на печелившото правило, а не жива снимка на `:hover`.
- `_meta.selectors.menu` записва текста на селектора преди `SkinScope`. Fixture е замразен (нормативни стойности), така че полето е остаряло нарочно; пакетът на записа фиксира текущия селектор.
- Fixture носи своите разрешени промени в `_meta.notes`: възстановяването на маркирането VBtnGroup на 2026-10-18 при `groups: 'box'` преизмери полетата на класическите дъщерни бутони `groupBtn`/`buttonsActive` (свързани ъгли, кутията притежава издигането). Полетата на pastel не са пипани — умишлена визуална промяна обновява само засегнатите класически клетки, записва бележка и излиза с ред в CHANGELOG.

## Вижте също {#see-also}

- [Примери за скинове](/bg/examples/skins) — classic, pastel и собственият скин mint, на живо.
- [Пропърти `skin`](/bg/api/props#skin) · [типове на скина](/bg/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/bg/api/types#tiptapifyskininput).
