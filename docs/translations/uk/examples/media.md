# Медіа {#media}

## Зображення {#images}

Вставляйте зображення за URL:

```vue
<script setup lang="ts">
const onEditorReady = (options) => {
  // Insert an image programmatically
  options.editor.commands.setImage({ src: 'https://picsum.photos/600/300' })
}
</script>

<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']"
    @editor-ready="onEditorReady"
  />
</template>
```

Кнопка зображення відкриває діалог зображення:

- **За посиланням** або **Завантажити**. Без [endpoint завантаження](/uk/guide/uploads) вибраний файл вбудовується як base64 data URL; з ним файл надсилається на ваш сервер.
- **Альтернативний текст** (діалог нагадує, коли він порожній) і **підпис** під зображенням.
- **Розмір**: оригінал, ширина тексту або власні ширина × висота із блокуванням пропорцій.
- **Розташування**: по центру на окремому рядку або обтікання ліворуч чи праворуч від тексту.

Вибране зображення має маркери зміни розміру (кожна зміна розміру — один крок скасування) і панель над ним: обтікання ліворуч або праворуч, завантаження, редагування, видалення. Подвійне клацання відкриває діалог.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Відео {#videos}

Вбудовуйте відео YouTube і Vimeo або відеофайл:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Кнопка відео відкриває діалог відео:

- **Посилання на YouTube чи Vimeo** перетворюється на їхній програвач; діалог показує розпізнаного провайдера та попередній перегляд, а також **Почати з** (заповнюється з `?t=`), де програвач це підтримує.
- **Посилання на відеофайл** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) перетворюється на `<video>` з постером, елементами керування, автовідтворенням (без звуку) та циклом. Посилання має містити протокол (`https://`, `http://`), `//host` або `/path`: діалог ніколи його не вгадує.
- **Завантажити** надсилає відеофайл на ваш сервер; з'являється лише за наявності [endpoint завантаження](/uk/guide/uploads).
- **Розмір**: адаптивний 16:9 або власні ширина × висота із блокуванням пропорцій.

URL YouTube, вставлений у текст, також вбудовується. Клацання по програвачу виділяє його, а не запускає відтворення, тож кнопка панелі інструментів його показує; подвійне клацання відкриває діалог.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Вставте URL YouTube, щоб вбудувати відео..." />

## Iframe {#iframes}

Вбудуйте сторінку за її адресою або за кодом iframe з меню «Поділитися» чи «Вбудувати»:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Діалог iframe читає вставлений код (адресу, розмір, заголовок, дозволи, sandbox, відкладене завантаження, повноекранний режим) і повідомляє, що з нього взято; код зі скриптами чи іншими тегами відхиляється. Він показує попередній перегляд і має **заголовок для екранних читачів**, розмір (адаптивний у пропорціях коду або власний із блокуванням пропорцій), а в розділі **Додатково** — ім'я, `allow`, `sandbox`, відкладене завантаження та рамку. Адреса має починатися з `https://` або `http://`. Подвійне клацання по вбудовуванню відкриває діалог.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Введіть URL для вбудовування як iframe..." />

## Таблиці {#tables}

Вставляйте та редагуйте таблиці:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

Після вставлення таблиці можна:
- Додавати/видаляти рядки й стовпці
- Виділяти клітинки
- Видалити всю таблицю

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Скористайтеся кнопкою таблиці, щоб вставити таблицю..." />

## Посилання {#links}

Вставляйте гіперпосилання:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Діалог посилання приймає адресу в тому вигляді, як її введено: `https://…`, будь-яку іншу схему (`ftp://`, `ssh://`, внутрішню), `mailto:`, `tel:`, `#anchor` або `/page`. Він ніколи сам не додає протокол: адреса без нього (`example.com`, `internal.host:8080`) отримує чипи для додавання `https://`, `http://` або `ftp://` і лишається як введена, якщо ви нічого не додали. Адреси `javascript:`, `vbscript:` і `data:` відхиляються.

У діалозі також є текст посилання, **Відкривати в новій вкладці** (додає `noopener noreferrer`), а в розділі **Додатково** — значення `rel` у вигляді чипів (будь-яке значення: Enter, пробіл або кома додають його) і CSS-клас.

З пропом [`linkPreview`](/uk/api/props#linkpreview) той самий діалог показує посилання як картку із зображенням сторінки, заголовком і описом, а URL, вставлений у порожній рядок, пропонує **Посилання / Картка** — див. [Картки посилань](/uk/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Виділіть текст і натисніть кнопку посилання, щоб додати гіперпосилання..." />

## Емодзі {#emoji}

Вставляйте емодзі зі вбудованого вибору з 10 категоріями:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

Вибір емодзі містить поле пошуку/фільтра для швидкого пошуку потрібного емодзі.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Натисніть кнопку емодзі, щоб вставити емодзі..." />

## Спеціальні символи (Charmap) {#special-characters-charmap}

Вставляйте спеціальні символи, стрілки, грецькі літери, математичні символи та інше:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Категорії включають:
- Стрілки
- Валюти
- Грецькі літери
- Математичні символи
- Різне

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Натисніть charmap, щоб вставити спеціальні символи..." />

## Поєднання медіаінструментів {#combining-media-tools}

Повнофункціональна медіапанель:

```vue
<template>
  <Tiptapify
    :items="[
      'bold', 'italic', 'underline',
      '|',
      'link', 'image', 'video', 'iframe',
      '|',
      'emoji', 'charmap', 'table',
      '|',
      'undo', 'redo'
    ]"
    placeholder="Full media toolbar..."
  />
</template>
```

<InteractiveEditor :items="[
'bold', 'italic', 'underline',
'|',
'link', 'image', 'video', 'iframe',
'|',
'emoji', 'charmap', 'table',
'|',
'undo', 'redo'
]"
placeholder="Повна медіапанель..." />
