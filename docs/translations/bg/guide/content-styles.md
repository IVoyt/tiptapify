# Стилове на съдържанието {#content-styles}

Част от това, което редакторът запазва, се нуждае от собствен външен вид на страницата, която го показва: карти с връзки, изображения с надпис и обтичане, видеа и вграждания, които се побират в ширината на текста, списъци със задачи с отметка до всеки елемент. Без него картата с връзка е гола връзка, в която изображението и текстовете са слепени.

Пропсът `contentStyles` определя как запазеният HTML носи този външен вид:

| `contentStyles` | запазеният HTML | на сайта |
|---|---|---|
| `inline` (по подразбиране) | външният вид е записан в атрибутите `style` на тези елементи | няма какво да се зарежда: HTML се показва както е |
| `classes` | само класове и атрибути `data-` | заредете `tiptapify/content.css` и поставете HTML в елемент с клас `tiptapify-content` |

```vue
<Tiptapify v-model="html" content-styles="inline" />
```

И двата вида носят едни и същи правила, с които самият редактор показва съдържанието, така че страницата изглежда като редактора и в двата случая. Само тези елементи ги получават: заглавията, абзаците, списъците, таблиците и останалият текст запазват стиловете на сайта.

## Вградени стилове {#inline-styles}

Стойността по подразбиране. Компактна карта с връзка се запазва така:

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

- **Цветовете остават на сайта.** Текстът наследява цвета си; приглушеният текст и рамките използват прозрачност и полупрозрачно сиво, така че работят еднакво на светла и на тъмна страница. Цвета на текста за дадена тема задайте на сайта както обикновено.
- **Не са нужни медийни заявки.** Компактната карта сама поставя изображението си над текстовете в тясна колона; видеата и вгражданията никога не стават по-широки от текста.
- **Сайтът все пак може да ги преоформи**, класовете остават. Вграденият стил има предимство пред правило за клас, затова такова правило се нуждае от `!important`.
- **Санитайзерът трябва да запазва атрибута `style`** на тези елементи, иначе те губят външния си вид.

## Класове и content.css {#classes-and-content-css}

```vue
<Tiptapify v-model="html" content-styles="classes" />
```

```js
import 'tiptapify/content.css'
```

```html
<article class="tiptapify-content" v-html="html"></article>
```

`content.css` е малък и няма Vue или Vuetify в себе си. Правилата му са обвити в `:where(.tiptapify-content)`, така че нямат тежест: всяко правило на сайта има предимство пред тях без `!important`. Използвайте го, когато сайтът иска външният вид на едно място или оформя съдържанието си сам.

`contentCss(scope)` връща същия стилов лист като низ, за друг клас освен `tiptapify-content`:

```js
import { contentCss } from 'tiptapify'

const css = contentCss('.article-body')
```

## Зареждане на HTML обратно {#loading-html-back}

Редакторът чете тези елементи само по атрибутите и класовете им: картата с връзка по `data-link-card`, изображението по `src`, размера и обтичането, задачата по `data-checked`. Вградените им стилове се игнорират при зареждане на HTML и се записват отново при запазване. Така един и същ HTML се движи напред-назад непроменен, документ, запазен с `inline`, се зарежда чисто с `classes` и обратно, а по-нова версия на редактора обновява външния вид на документа при следващото му запазване.

Форматирането на текста не се пипа: цветът или размерът на текста и подравняването на абзаца са съдържание, и редакторът продължава да ги чете от стиловете им.

За да превърнете HTML с класове във HTML с вградени стилове извън редактора (по-стар документ, имейл), използвайте `inlineContentStyles`:

```js
import { inlineContentStyles } from 'tiptapify'

const styled = inlineContentStyles(html)
```

Изисква DOM (браузър или jsdom на сървър) и без такъв връща HTML както е.

## Слайдери с изображения {#image-sliders}

Редакторът отбелязва изображенията в ред като слайдер, докато пишете (вижте пропса `imageSlider`); запазеният HTML ги държи като фигури една след друга. Показването им като слайдер зависи от собствения скрипт на сайта.
