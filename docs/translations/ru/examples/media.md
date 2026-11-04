# Медиа {#media}

## Изображения {#images}

Вставка изображений по URL:

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

Кнопка изображения открывает диалог изображения:

- **По ссылке** или **Загрузить**. Без [endpoint для загрузки](/ru/guide/uploads) выбранный файл встраивается как base64 data URL; с ним файл отправляется на ваш сервер.
- **Альтернативный текст** (диалог напоминает, если он пуст) и **подпись** под изображением.
- **Размер**: исходный, по ширине текста или произвольные ширина × высота с блокировкой пропорций.
- **Положение**: по центру на отдельной строке или обтекание слева или справа от текста.

У выделенного изображения есть маркеры изменения размера (каждое изменение размера — один шаг отмены) и панель над ним: обтекание слева или справа, скачивание, редактирование, удаление. Двойной щелчок открывает диалог.

<InteractiveEditor :items="['bold', 'italic', '|', 'image', '|', 'undo', 'redo']" />

## Видео {#videos}

Встраивание видео с YouTube и Vimeo или видеофайла:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
    placeholder="Paste a YouTube URL to embed a video..."
  />
</template>
```

Кнопка видео открывает диалог видео:

- **Ссылка на YouTube или Vimeo** превращается в их плеер; диалог показывает распознанного провайдера и превью, а также **Начать с** (заполняется из `?t=`), если плеер это поддерживает.
- **Ссылка на видеофайл** (`.mp4`, `.m4v`, `.webm`, `.ogv`, `.ogg`, `.mov`) превращается в `<video>` с обложкой, элементами управления, автозапуском (без звука) и повтором. В ссылке нужен протокол (`https://`, `http://`), `//host` или `/path`: диалог никогда не угадывает его.
- **Загрузить** отправляет видеофайл на ваш сервер; эта опция показывается только при наличии [endpoint для загрузки](/ru/guide/uploads).
- **Размер**: адаптивный 16:9 или произвольные ширина × высота с блокировкой пропорций.

URL YouTube, вставленный в текст, тоже встраивается. Щелчок по плееру выделяет его, а не запускает воспроизведение, поэтому кнопка на панели инструментов его показывает; двойной щелчок открывает диалог.

<InteractiveEditor :items="['bold', 'italic', '|', 'video', '|', 'undo', 'redo']"
placeholder="Вставьте URL YouTube, чтобы встроить видео..." />

## Iframe {#iframes}

Встройте страницу по её адресу или по коду iframe из меню «Поделиться» или «Встроить»:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
    placeholder="Enter a URL to embed as iframe..."
  />
</template>
```

Диалог iframe разбирает вставленный код (адрес, размер, заголовок, разрешения, sandbox, отложенную загрузку, полноэкранный режим) и сообщает, что из него взято; код со скриптами или другими тегами отклоняется. Он показывает превью и содержит **заголовок для экранных дикторов**, размер (адаптивный в пропорциях кода или произвольный с блокировкой пропорций), а в разделе **Дополнительно** — имя, `allow`, `sandbox`, отложенную загрузку и рамку. Адрес должен начинаться с `https://` или `http://`. Двойной щелчок по встраиванию открывает диалог.

<InteractiveEditor :items="['bold', 'italic', '|', 'iframe', '|', 'undo', 'redo']"
placeholder="Введите URL для встраивания как iframe..." />

## Таблицы {#tables}

Вставка и редактирование таблиц:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
    placeholder="Use the table button to insert a table..."
  />
</template>
```

После вставки таблицы вы можете:
- Добавлять и удалять строки и столбцы
- Выделять ячейки
- Удалить таблицу целиком

<InteractiveEditor :items="['bold', 'italic', '|', 'table', '|', 'undo', 'redo']"
placeholder="Нажмите кнопку таблицы, чтобы вставить таблицу..." />

## Ссылки {#links}

Вставка гиперссылок:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
    placeholder="Select text and click link to add a hyperlink..."
  />
</template>
```

Диалог ссылки принимает адрес в том виде, в каком он введён: `https://…`, любую другую схему (`ftp://`, `ssh://`, внутреннюю), `mailto:`, `tel:`, `#anchor` или `/page`. Протокол он сам никогда не добавляет: для адреса без протокола (`example.com`, `internal.host:8080`) появляются чипы для добавления `https://`, `http://` или `ftp://`, а если ни один не выбран, адрес остаётся как введён. Адреса `javascript:`, `vbscript:` и `data:` отклоняются.

В диалоге также есть текст ссылки, **Открывать в новой вкладке** (добавляет `noopener noreferrer`), а в разделе **Дополнительно** — значения `rel` в виде чипов (подходит любое значение: Enter, пробел или запятая добавляют его) и CSS-класс.

С prop [`linkPreview`](/ru/api/props#linkpreview) тот же диалог показывает ссылку в виде карточки с изображением, заголовком и описанием страницы, а URL, вставленный в пустую строку, предлагает **Ссылка / Карточка** — см. [Карточки ссылок](/ru/guide/link-cards).

<InteractiveEditor :items="['bold', 'italic', '|', 'link', '|', 'undo', 'redo']"
placeholder="Выделите текст и нажмите кнопку ссылки, чтобы добавить гиперссылку..." />

## Эмодзи {#emoji}

Вставка эмодзи из встроенного выбора с 10 категориями:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
    placeholder="Click the emoji button to insert an emoji..."
  />
</template>
```

В выборе эмодзи есть поле поиска и фильтрации, чтобы быстро находить нужные эмодзи.

<InteractiveEditor :items="['bold', 'italic', '|', 'emoji', '|', 'undo', 'redo']"
placeholder="Нажмите кнопку эмодзи, чтобы вставить эмодзи..." />

## Специальные символы (Charmap) {#special-characters-charmap}

Вставка специальных символов, стрелок, греческих букв, математических символов и многого другого:

```vue
<template>
  <Tiptapify
    :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
    placeholder="Click charmap to insert special characters..."
  />
</template>
```

Категории:
- Стрелки
- Валюты
- Греческие буквы
- Математические символы
- Разное

<InteractiveEditor :items="['bold', 'italic', '|', 'charmap', '|', 'undo', 'redo']"
placeholder="Нажмите charmap, чтобы вставить специальные символы..." />

## Совместное использование медиа-инструментов {#combining-media-tools}

Полнофункциональная медиа-панель инструментов:

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
placeholder="Полная медиа-панель инструментов..." />
