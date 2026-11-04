# Стили содержимого {#content-styles}

Некоторым из того, что сохраняет редактор, нужен собственный внешний вид на странице, которая это показывает: карточки-ссылки, изображения с подписью и обтеканием, видео и встраивания, подогнанные под ширину текста, списки задач с флажком у каждого пункта. Без этого карточка-ссылка — голая ссылка, в которой изображение и тексты сливаются.

Проп `contentStyles` определяет, как сохранённый HTML несёт этот внешний вид:

| `contentStyles` | сохранённый HTML | на сайте |
|---|---|---|
| `inline` (по умолчанию) | внешний вид записан в атрибуты `style` этих элементов | ничего подключать не нужно: HTML показывается как есть |
| `classes` | только классы и атрибуты `data-` | подключите `tiptapify/content.css` и поместите HTML в элемент с классом `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

Оба варианта несут одни и те же правила, те, которыми сам редактор показывает содержимое, поэтому страница выглядит как редактор в любом случае. Их получают только эти элементы: заголовки, абзацы, списки, таблицы и остальной текст сохраняют стили самого сайта.

## Встроенные стили {#inline-styles}

Режим по умолчанию. Компактная карточка-ссылка сохраняется так:

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

- **Цвета остаются сайтовыми.** Текст наследует свой цвет; приглушённый текст и границы используют прозрачность и полупрозрачный серый, поэтому одинаково работают на светлой и на тёмной странице. Цвет текста для темы задайте на сайте как обычно.
- **Медиазапросы не нужны.** Компактная карточка сама ставит изображение над текстами в узкой колонке; видео и встраивания никогда не становятся шире текста.
- **Сайт всё равно может изменить их вид**, классы остаются. Встроенный стиль приоритетнее правила класса, поэтому такому правилу нужен `!important`.
- **Санитайзер должен сохранять атрибут `style`** у этих элементов, иначе они потеряют свой вид.

## Классы и content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` невелик и не содержит ни Vue, ни Vuetify. Его правила обёрнуты в `:where(.tiptapify-content)`, поэтому ничего не весят: любое правило сайта побеждает их без `!important`. Используйте это, когда сайту нужен внешний вид в одном месте или он сам стилизует своё содержимое.

`contentCss(scope)` возвращает ту же таблицу стилей строкой, для другого класса, чем `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Обратная загрузка HTML {#loading-html-back}

Редактор читает эти элементы только по их атрибутам и классам: карточку-ссылку по `data-link-card`, изображение по `src`, размеру и обтеканию, задачу по `data-checked`. Их встроенные стили игнорируются при загрузке HTML и записываются снова при сохранении. Поэтому один и тот же HTML ходит туда и обратно без изменений, документ, сохранённый с `inline`, чисто загружается с `classes` и наоборот, а более поздняя версия редактора обновляет вид документа при следующем сохранении.

Форматирование текста не затрагивается: цвет или размер текста и выравнивание абзаца являются содержимым, и редактор по-прежнему читает их из стилей.

Чтобы превратить HTML с классами в HTML со встроенными стилями вне редактора (старый документ, письмо), используйте `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Ему нужен DOM (браузер или jsdom на сервере); без него он возвращает HTML как есть.

## Слайдеры изображений {#image-sliders}

Редактор помечает изображения в одном ряду как слайдер, пока вы пишете (см. проп `imageSlider`); сохранённый HTML хранит их как фигуры одну за другой. Показывать их как слайдер — дело собственного скрипта сайта.
