# Стилі вмісту {#content-styles}

Дещо з того, що зберігає редактор, потребує власного вигляду на сторінці, яка це показує: картки-посилання, зображення з підписом і обтіканням, відео та вбудовування, що вписуються в ширину тексту, списки завдань із прапорцем біля кожного пункту. Без цього картка-посилання — це голе посилання, у якому зображення й тексти зливаються.

Проп `contentStyles` визначає, як збережений HTML передає цей вигляд:

| `contentStyles` | збережений HTML | на сайті |
|---|---|---|
| `inline` (типово) | вигляд записано в атрибути `style` цих елементів | нічого підключати не треба: HTML показується як є |
| `classes` | лише класи та атрибути `data-` | підключіть `tiptapify/content.css` і помістіть HTML в елемент із класом `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Обидва варіанти несуть однакові правила, ті самі, якими редактор показує вміст, тож сторінка виглядає як редактор у будь-якому разі. Їх отримують лише ці елементи: заголовки, абзаци, списки, таблиці та решта тексту зберігають стилі самого сайту.

## Вбудовані стилі {#inline-styles}

Типовий режим. Компактна картка-посилання зберігається так:

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

- **Кольори лишаються сайтовими.** Текст успадковує свій колір; приглушений текст і рамки використовують прозорість і напівпрозорий сірий, тож однаково працюють на світлій і на темній сторінці. Колір тексту для теми задайте на сайті як звичайно.
- **Медіазапити не потрібні.** Компактна картка сама ставить зображення над текстами у вузькій колонці; відео та вбудовування ніколи не стають ширшими за текст.
- **Сайт усе ще може змінити їхній вигляд**, класи лишаються. Вбудований стиль має перевагу над правилом класу, тому таке правило потребує `!important`.
- **Санітайзер має зберігати атрибут `style`** на цих елементах, інакше вони втратять свій вигляд.

## Класи та content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` невеликий і не містить ні Vue, ні Vuetify. Його правила обгорнуто в `:where(.tiptapify-content)`, тож вони нічого не важать: будь-яке правило сайту перемагає їх без `!important`. Користуйтеся цим, коли сайт хоче мати вигляд в одному місці або сам стилізує свій вміст.

`contentCss(scope)` повертає ту саму таблицю стилів рядком, для іншого класу, ніж `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Зворотне завантаження HTML {#loading-html-back}

Редактор читає ці елементи лише за їхніми атрибутами та класами: картку-посилання за `data-link-card`, зображення за `src`, розміром і обтіканням, завдання за `data-checked`. Їхні вбудовані стилі ігноруються під час завантаження HTML і записуються знову під час збереження. Тож той самий HTML ходить туди й назад без змін, документ, збережений з `inline`, чисто завантажується з `classes` і навпаки, а пізніша версія редактора оновлює вигляд документа під час наступного збереження.

Форматування тексту не змінюється: колір чи розмір тексту та вирівнювання абзацу є вмістом, і редактор і далі читає їх зі стилів.

Щоб перетворити HTML із класами на HTML із вбудованими стилями поза редактором (старіший документ, лист), скористайтеся `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Їй потрібен DOM (браузер або jsdom на сервері); без нього вона повертає HTML як є.

## Слайдери зображень {#image-sliders}

Редактор позначає зображення в одному ряду як слайдер, поки ви пишете (див. проп `imageSlider`); збережений HTML тримає їх як фігури одна за одною. Показувати їх як слайдер — справа власного скрипта сайту.
